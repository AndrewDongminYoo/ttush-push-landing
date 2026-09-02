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
 * Frame 0 opens part-way through a round. `apply_resolved_move` decays exactly
 * one square per move — the mover's departure, never the pushed piece's origin
 * — and turns alternate from First, so the opening position has to be reachable
 * in as many moves as it shows cracks, with Azure on turn after an even count.
 * These four get there:
 *
 *   Azure (1,0) → (1,1) · Ember (3,4) → (3,3) · Azure (3,0) → (3,1) ·
 *   Ember (3,3) → (3,4)
 *
 * Ember's second explorer never moves, so it keeps `initialExplorerFacing`,
 * which is `down` for Second and `up` for First.
 *
 * The three moves the loop then plays:
 *
 *   1. Azure moves (3,1) → (3,2). Its departure square cracks.
 *   2. Ember moves (3,4) → (3,3). Its departure square was already cracked,
 *      so it collapses — Ember has opened a hole directly behind itself.
 *   3. Azure moves (3,2) → (3,3), pushing Ember one square down into that
 *      hole. `resolve_move` reports a knockout, and the round is Azure's.
 *
 * Positions are (x, y) in the engine's own coordinates, matching
 * `BoardConfig::rectangular`. They are NOT screen coordinates: the app draws
 * y = 0 at the BOTTOM of the board, per `_visualRowFor` in
 * `lib/game/view/round_board.dart`, so Azure starts nearest the viewer. This
 * file keeps engine coordinates in the data and flips once at render, the way
 * the app does. An earlier version drew y = 0 at the top, which mirrored the
 * whole board and left every sprite facing the wrong way.
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
    tiles: [".x.x.", ".....", ".....", "...x.", "...x."],
    pieces: [
      { id: "a1", team: "azure", x: 1, y: 1, facing: "up" },
      { id: "a2", team: "azure", x: 3, y: 1, facing: "up" },
      { id: "e1", team: "ember", x: 1, y: 4, facing: "down" },
      { id: "e2", team: "ember", x: 3, y: 4, facing: "up" },
    ],
    hold: 1600,
  },
  {
    tiles: [".x.x.", "...x.", ".....", "...x.", "...x."],
    pieces: [
      { id: "a1", team: "azure", x: 1, y: 1, facing: "up" },
      { id: "a2", team: "azure", x: 3, y: 2, facing: "up" },
      { id: "e1", team: "ember", x: 1, y: 4, facing: "down" },
      { id: "e2", team: "ember", x: 3, y: 4, facing: "up" },
    ],
    hold: 1400,
  },
  {
    tiles: [".x.x.", "...x.", ".....", "...x.", "...o."],
    pieces: [
      { id: "a1", team: "azure", x: 1, y: 1, facing: "up" },
      { id: "a2", team: "azure", x: 3, y: 2, facing: "up" },
      { id: "e1", team: "ember", x: 1, y: 4, facing: "down" },
      { id: "e2", team: "ember", x: 3, y: 3, facing: "down" },
    ],
    hold: 1400,
  },
  {
    tiles: [".x.x.", "...x.", "...x.", "...x.", "...o."],
    pieces: [
      { id: "a1", team: "azure", x: 1, y: 1, facing: "up" },
      { id: "a2", team: "azure", x: 3, y: 3, facing: "up" },
      { id: "e1", team: "ember", x: 1, y: 4, facing: "down" },
      // A pushed piece takes the facing of its travel like any other, per
      // `_updateFacingFor`; it does not keep the way it was looking.
      { id: "e2", team: "ember", x: 3, y: 4, facing: "up", fallen: true },
    ],
    hold: 2600,
  },
];

/** How many moves the opening position took to reach. Even, so Azure is on
 *  turn in frame 0; each later frame adds exactly one move. */
const OPENING_MOVES = 4;

if (process.env.NODE_ENV !== "production") {
  // The invariant a hand-written frame set breaks silently: one foothold decays
  // per move, so decay steps on the board equal moves played, and Azure is on
  // turn only after an even count. Getting this wrong renders perfectly and
  // simply depicts a position no rules engine could produce.
  const decaySteps = (frame: Frame) =>
    [...frame.tiles.join("")].reduce((n, c) => n + (c === "o" ? 2 : c === "x" ? 1 : 0), 0);
  frames.forEach((frame, i) => {
    const steps = decaySteps(frame);
    if (steps !== OPENING_MOVES + i) {
      throw new Error(
        `board-replay frame ${i} shows ${steps} decay steps but ${OPENING_MOVES + i} moves have been played`
      );
    }
  });

  // The second invariant, and the one that shipped wrong: a sprite faces the
  // way it travelled, under the app's `_visualFacingForTravel`, where a larger
  // destination y is the `up` sprite because the board is drawn with y = 0 at
  // the bottom. Getting this backwards also renders perfectly.
  const facingForTravel = (from: Piece, to: Piece): Facing | null => {
    if (to.x > from.x) return "right";
    if (to.x < from.x) return "left";
    if (to.y > from.y) return "up";
    if (to.y < from.y) return "down";
    return null;
  };
  frames.slice(1).forEach((frame, i) => {
    for (const piece of frame.pieces) {
      const before = frames[i].pieces.find((it) => it.id === piece.id);
      if (!before) continue;
      const expected = facingForTravel(before, piece);
      if (expected && piece.facing !== expected) {
        throw new Error(
          `board-replay frame ${i + 1}: ${piece.id} travelled to (${piece.x},${piece.y}) so it faces ${expected}, not ${piece.facing}`
        );
      }
    }
  });
}

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
 * Engine row to screen row. The app's `_visualRowFor` is
 * `rowCount - 1 - (y - minY)`, so engine y = 0 is the bottom row and Azure,
 * which starts there, is the side nearest the viewer. Everything drawn below
 * goes through this; nothing indexes a screen row directly.
 */
function visualRow(y: number): number {
  return SIZE - 1 - y;
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
              style={{ left: `${x * 20}%`, top: `${visualRow(y) * 20}%` }}
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
            // A knocked-out explorer sinks through the hole it is standing on
            // rather than sliding off the board, because the hole is wherever
            // the round put it and is not always at the near edge.
            transform: piece.fallen
              ? `translate(${piece.x * 100}%, ${visualRow(piece.y) * 100 + 16}%) scale(0.34) rotate(12deg)`
              : `translate(${piece.x * 100}%, ${visualRow(piece.y) * 100}%)`,
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
