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

If the engine's move resolution changes, this sequence is a claim that has to be re-checked, the same way the privacy policy's network claim is.

**Reduced motion holds frame 2** — the hole is open and Ember is cornered, which is the position the whole sequence exists to set up.
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

One bold element, the rest quiet.

- The foothold triptych is a legend, not decoration: the rules below it use the words it defines.
- The rules are separated by hairlines and carry no step numbers, because they are six statements rather than a sequence.
- The explorer turnaround is the whole four-direction sprite set, shown because the facing is a real rule: the sprite looks the way it just moved. The accompanying copy names the silhouette difference, which is what tells the teams apart when the colours cannot.
- The page closes on two quiet statements side by side: what decides the rules, and what a visitor can do today.

## Verified

Rendered through the installed Chrome under `puppeteer-core` at 1440, 390 and 320 CSS pixels, in both locales, with the overflow probe proved against a deliberately over-wide node first.
No horizontal overflow and no clipped text at any width.
The loop was sampled from the live DOM: four distinct frames under normal motion, exactly one under `prefers-reduced-motion: reduce`.

macOS Chrome refuses a window narrower than 500 pixels and crops the screenshot to whatever `--window-size` asked for, so a plain headless capture at 390 shows a 500-pixel layout in a 390-pixel image and invents an overflow bug that is not there.
Drive the viewport through the DevTools protocol, not the window size.
