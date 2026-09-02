# Promotional landing design

Written 2026-09-02, when the page went from a text skeleton to the promotional page.
Records the decisions that are not visible in the diff, so a later change knows what it is overturning.

## What the page is for

Two audiences, in this order.

1. Someone who has never heard of the game and needs to understand the mechanic before deciding whether to care.
1. A store reviewer, who needs the privacy policy at a stable URL.

There is no third audience yet, because there is no store page to send anyone to.
That absence shapes the page: it ends in an invitation to mail rather than in a download button.

## The hero is the board, and the board is data

The most characteristic thing about Ttush Push is not its art and not its Rust engine.
It is that the floor you walk on is the weapon: the square you leave cracks, the second time it collapses, and the hole you opened is where the other side gets pushed.
That is a motion, so the hero moves.

`components/board-replay.tsx` plays four frames of one round on a loop.
The frames are hard-coded, not simulated.
Re-deriving the rules in TypeScript would put a second rules authority on a page whose own copy says there is exactly one, and a demo that drifted from the engine would be a false advertisement of the rules.
So the three moves were worked out by hand against `engine/src/lib.rs` in `AndrewDongminYoo/ttush_push` and frozen:

1. Azure moves `(3,1)` to `(3,2)`; the departure square cracks.
1. Ember moves `(3,4)` to `(3,3)`; its departure square was already cracked, so it collapses. Ember has opened a hole behind itself.
1. Azure moves `(3,2)` to `(3,3)`, pushing Ember down into that hole. `resolve_move` reports a knockout and the round is Azure's.

The opening position is part-way through a round rather than at the reset, because a board that already carries damage reads as a game in progress and needs fewer moves to reach the payoff.
That freedom comes with an arithmetic constraint that is easy to miss, and the first version of these frames missed it.

`apply_resolved_move` decays exactly one square per move, always the mover's departure and never the pushed piece's origin, and turns alternate from First.
So **the decay steps on the board equal the moves played, and Azure is on turn only after an even count.**
Frame 0 shows four cracks, reachable as Azure `(1,0)→(1,1)`, Ember `(3,4)→(3,3)`, Azure `(3,0)→(3,1)`, Ember `(3,3)→(3,4)`, which leaves Azure to play.
Ember's second explorer never moves, so it keeps `initialExplorerFacing`: `down` for Second, `up` for First.

The first draft opened with five cracks and Azure to play, a position no rules engine could produce.
It rendered perfectly, which is the whole problem, so `board-replay.tsx` now checks the invariant on module load outside production builds and throws with the frame index and both counts.
The check was proved by breaking frame 0 and watching `pnpm dev` fail before trusting it.

If the engine's move resolution changes, this sequence is a claim that has to be re-checked, the same way the privacy policy's network claim is.

**Reduced motion holds frame 2.** The hole is open and Ember is cornered, which is the position the whole sequence exists to set up.
`usePrefersReducedMotion` subscribes through `useSyncExternalStore` rather than reading the media query once in an effect, so the server renders that frame and a visitor who changes the setting is not left on the wrong branch.

## Art

Every image is an asset the app ships.
Nothing was generated for this page, and nothing should be: `assets/images/branding/README.md` in the app repository states that no image-model output was used for that identity, and adding some here would split it.

`public/board/` and `public/sky/` are copies from `ttush_push`.
They are duplicates and can drift.
Refresh them from the app repository when the sprites change; `tool/generate_brand_assets.sh` there regenerates the branded set that `app/icon.png` and `public/og.jpg` come from.

`public/og.jpg` was composed once with ImageMagick from the air-ruins painting and the app's own launch mark, with the wordmark set in the Poppins the app licenses.
It carries no tagline, so one file serves both locales; the localized sentence lives in `og:description` instead.

## Colour and type

Both are lifted rather than chosen.

The palette in `app/globals.css` is copied from `lib/game/view/game_page.dart` and `lib/game/view/round_board.dart`, so a screenshot of the game and a screenshot of this page belong to the same product.
Two additions are not in the app: `--azure-ink` and `--ember-ink`.
The app's player colours are picked to be told apart on a board, not to be read as text on a dark background, so the page uses lifted tints where a team name appears in prose.

Poppins is the face the app ships and licenses under the OFL.
Korean is the default locale and Poppins has no Hangul, so Gothic A1 carries it: geometric where Noto Sans KR is humanist, which is what keeps it next to Poppins rather than beside it.
`word-break: keep-all` with `overflow-wrap: break-word` keeps 어절 whole while still breaking a word that cannot fit at all.

## Structure

One bold element, the rest quiet, and no two sections built the same way.

The first version of this page failed that last clause badly: every content section was `max-w-6xl px-6 py-20` wrapping an n-column grid, four times, so the page read as a document rather than as a designed thing. The five sections now use five layout families, checked against the computed `grid-template-columns` of each rather than by eye.

1. **Hero**, asymmetric split: copy left, the board right, over the sky.
1. **Footholds**, a descent. The three states step down the page by 0, 80 and 160 pixels as they decay, so the offset carries the meaning instead of decorating it. Three equal columns with no offset would be the generic feature row; the stagger is what it is not. Mobile drops the offsets and reads as a plain sequence.
1. **Rules**, two groups at an asymmetric measure. Reference material, so its heading is deliberately the smallest on the page: it is a thing you consult, not a thing you are sold. Each group carries one hairline; an earlier version put a border under all six rows, which is the spec-table shape that makes a page look unedited.
1. **Explorers**, a full-bleed band of the whole eight-sprite set, shown because the facing is a real rule: the sprite looks the way it just moved. The copy names the silhouette difference, which is what tells the teams apart when the colours cannot.
1. **Closing**, full-bleed sky again, one statement and the action. The page opens and closes in the ruins.

The sky appears exactly twice, at those two ends, on different crops of the same painting. Spending it on every section was considered and rejected: carrying six sections of body copy would need a scrim heavy enough to leave the art dimmer everywhere than it is in the hero now, and the contrast between the ruins and the reading ground is what makes either one land.

## The rules said two contradictory things

The rules used to open with "nothing enters a collapsed square, by choice or by push", then immediately add "an explorer pushed into one falls". Both cannot be true, and the engine is clear about which is: `resolve_move` rejects the _mover's_ destination with `IllegalMove::Hole` before any push is resolved, while a _pushed_ piece landing on a hole is not rejected at all, it is the `knockout` branch that ends the round.

So the sentence was two claims welded together, a legality constraint and a termination condition. They are now in different groups, and the knockout half merged into the win rule that already said the same thing. Six rules became five, and the duplicate went away rather than moving.

## Locks

Three page-wide decisions that a later change would break silently, so they are written down rather than left to be inferred:

- **Theme.** Dark, single mode, no section inverting. The app's surface is `#0b0d12` and every asset is lit for a night sky, so a light mode would show the product in a light it never has.
- **Shape.** Radius 0 everywhere, including the one button. The game's world is cut stone and the board is square; a rounded control would be the only soft edge on the site.
- **Accent.** Azure and Ember are spoken for by the two teams, so the page has no third accent. The call to action is off-white on the page's own near-black at 16.4:1 rather than a fourth colour.

## The one action

There is no store link, so the only thing a visitor can do is ask to join the closed test. That used to sit eight screens down. It is now the hero's call to action and the closing one, under a single label in each locale, because two labels for one intent is how a page ends up with "Get in touch" and "Let's talk" on the same screen.

## Verified

Rendered through the installed Chrome under `puppeteer-core` at 1440, 390 and 320 CSS pixels, in both locales.
Read off the live page rather than judged by eye: zero em-dashes and zero en-dashes in visible text, no line carrying more than one middle dot, zero tracked-uppercase eyebrow labels, both calls to action on one line at 16.4:1 contrast with a 2px focus ring and a 0 radius, and five distinct `grid-template-columns` signatures across the five sections.
The foothold descent was measured, not assumed: 0, 80 and 160 pixels of offset at 1440, collapsing to a plain stack at 390.
No horizontal overflow and no clipped text at any width, no console error or warning, and no request that failed or answered 4xx.
Both probes were proved before being trusted: the overflow probe against a deliberately over-wide node, the console probe against an injected error and a 404 sprite.
The loop was sampled from the live DOM: four distinct frames under normal motion, exactly one under `prefers-reduced-motion: reduce`, with the decay counts matching the parity invariant at every frame.
`og:image` resolves absolute, matches the JSON-LD `image`, and `/og.jpg` answers 200.

macOS Chrome refuses a window narrower than 500 pixels and crops the screenshot to whatever `--window-size` asked for, so a plain headless capture at 390 shows a 500-pixel layout in a 390-pixel image and invents an overflow bug that is not there.
Drive the viewport through the DevTools protocol, not the window size.
