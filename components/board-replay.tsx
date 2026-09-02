"use client";

import Image from "next/image";
import { useEffect, useState, useSyncExternalStore } from "react";

/**
 * The hero board: four frames of one round, played on a loop.
 *
 * The frames are data, not a simulation. Re-deriving the rules in TypeScript
 * would put a second rules authority on a page whose whole claim is that there
 * is only one — so the sequence below was worked out by hand against
 * `engine/src/lib.rs` in AndrewDongminYoo/ttush_push and then frozen.
 *
 * The moves, from a position part-way through a round with Azure to play:
 *
 *   1. Azure moves (3,1) → (3,2). Its departure square cracks.
 *   2. Ember moves (3,4) → (3,3). Its departure square was already cracked,
 *      so it collapses — Ember has opened a hole directly behind itself.
 *   3. Azure moves (3,2) → (3,3), pushing Ember one square down into that
 *      hole. `resolve_move` reports a knockout, and the round is Azure's.
 *
 * Positions are (x, y) with y counting down from the top row, matching
 * `BoardConfig::rectangular` and the app's own board definition.
 */

const SIZE = 5;

type TileState = 0 | 1 | 2; // intact, cracked, collapsed
type Team = "azure" | "ember";
type Facing = "up" | "down" | "left" | "right";

type Piece = {
  id: string;
  team: Team;
  x: number;
  y: number;
  facing: Facing;
  fallen?: boolean;
};

type Frame = {
  /** One string per row, left to right: `.` intact, `x` cracked, `o` collapsed. */
  tiles: readonly string[];
  pieces: readonly Piece[];
  /** How long this frame holds before the next one, in milliseconds. */
  hold: number;
};

const frames: readonly Frame[] = [
  {
    tiles: [".x.x.", ".....", ".....", "...x.", ".x.x."],
    pieces: [
      { id: "a1", team: "azure", x: 1, y: 1, facing: "down" },
      { id: "a2", team: "azure", x: 3, y: 1, facing: "down" },
      { id: "e1", team: "ember", x: 1, y: 3, facing: "up" },
      { id: "e2", team: "ember", x: 3, y: 4, facing: "up" },
    ],
    hold: 1600,
  },
  {
    tiles: [".x.x.", "...x.", ".....", "...x.", ".x.x."],
    pieces: [
      { id: "a1", team: "azure", x: 1, y: 1, facing: "down" },
      { id: "a2", team: "azure", x: 3, y: 2, facing: "down" },
      { id: "e1", team: "ember", x: 1, y: 3, facing: "up" },
      { id: "e2", team: "ember", x: 3, y: 4, facing: "up" },
    ],
    hold: 1400,
  },
  {
    tiles: [".x.x.", "...x.", ".....", "...x.", ".x.o."],
    pieces: [
      { id: "a1", team: "azure", x: 1, y: 1, facing: "down" },
      { id: "a2", team: "azure", x: 3, y: 2, facing: "down" },
      { id: "e1", team: "ember", x: 1, y: 3, facing: "up" },
      { id: "e2", team: "ember", x: 3, y: 3, facing: "up" },
    ],
    hold: 1400,
  },
  {
    tiles: [".x.x.", "...x.", "...x.", "...x.", ".x.o."],
    pieces: [
      { id: "a1", team: "azure", x: 1, y: 1, facing: "down" },
      { id: "a2", team: "azure", x: 3, y: 3, facing: "down" },
      { id: "e1", team: "ember", x: 1, y: 3, facing: "up" },
      // Pushed downward while still facing up: the shove came from behind.
      { id: "e2", team: "ember", x: 3, y: 4, facing: "up", fallen: true },
    ],
    hold: 2600,
  },
];

/** The frame shown when the visitor asked for no motion: the hole is open and
 *  Ember is cornered, which is the position the whole sequence exists to set up. */
const STILL_FRAME = 2;

const tileSrc = [
  "/board/foothold-intact.png",
  "/board/foothold-damaged.png",
  "/board/foothold-hole.png",
];

function tileStateAt(frame: Frame, x: number, y: number): TileState {
  const cell = frame.tiles[y][x];
  return cell === "o" ? 2 : cell === "x" ? 1 : 0;
}

/**
 * Which stacked foothold images are lit for a given state.
 *
 * The collapsed sprite is a rim with a genuinely transparent centre, so the two
 * solid ones underneath it have to go dark or the hole shows stone through it.
 * Cracked keeps intact lit underneath, which is what makes that crossfade read
 * as the surface splitting rather than the tile blinking.
 */
function layerOpacity(state: TileState, layer: number): 0 | 1 {
  if (layer === 0) return state < 2 ? 1 : 0;
  return state === layer ? 1 : 0;
}

/**
 * Subscribes to the motion preference rather than reading it once in an effect,
 * so the server renders the still frame and a visitor who changes the setting
 * gets the change without a reload.
 */
function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const query = window.matchMedia("(prefers-reduced-motion: reduce)");
      query.addEventListener("change", onChange);
      return () => query.removeEventListener("change", onChange);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => true
  );
}

export function BoardReplay({ label, stillLabel }: { label: string; stillLabel: string }) {
  const reduced = usePrefersReducedMotion();
  // The loop starts on the still frame rather than on frame 0: it is the frame
  // the server renders and the one reduced motion stops at, and where a loop
  // begins does not matter once it is running.
  const [step, setStep] = useState(STILL_FRAME);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const timer = window.setTimeout(() => {
      if (step === frames.length - 1) {
        // Remount on the reset so the pieces do not slide back across the
        // board; a new cycle key means new nodes and no transition.
        setCycle((it) => it + 1);
        setStep(0);
      } else {
        setStep(step + 1);
      }
    }, frames[step].hold);
    return () => window.clearTimeout(timer);
  }, [reduced, step]);

  const frame = frames[step];

  return (
    <div
      key={cycle}
      role="img"
      aria-label={reduced ? stillLabel : label}
      className="relative aspect-square w-full drop-shadow-[0_24px_48px_rgba(0,0,0,0.55)]"
    >
      {Array.from({ length: SIZE }, (_, y) =>
        Array.from({ length: SIZE }, (_, x) => {
          const state = tileStateAt(frame, x, y);
          return (
            <div
              key={`${x}-${y}`}
              className="absolute h-1/5 w-1/5"
              style={{ left: `${x * 20}%`, top: `${y * 20}%` }}
              aria-hidden
            >
              {tileSrc.map((src, layer) => (
                <Image
                  key={src}
                  src={src}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 18vw, 110px"
                  loading="eager"
                  // The sprite's stone fills about 76% of its square canvas,
                  // so at cell size the tiles read as scattered rather than as
                  // one field. Scaling them up closes the seams to the width
                  // the app's own board draws.
                  className="tile-layer scale-[1.24] object-contain"
                  style={{ opacity: layerOpacity(state, layer) }}
                />
              ))}
            </div>
          );
        })
      )}

      {frame.pieces.map((piece) => (
        <div
          key={piece.id}
          aria-hidden
          className={`piece ${piece.fallen ? "piece-fallen" : ""}`}
          style={{
            transform: piece.fallen
              ? `translate(${piece.x * 100}%, ${piece.y * 100 + 78}%) scale(0.5) rotate(14deg)`
              : `translate(${piece.x * 100}%, ${piece.y * 100}%)`,
          }}
        >
          <Image
            src={`/board/${piece.team}-${piece.facing}.png`}
            alt=""
            fill
            sizes="(max-width: 640px) 18vw, 110px"
            loading="eager"
            className="object-contain"
          />
        </div>
      ))}
    </div>
  );
}
