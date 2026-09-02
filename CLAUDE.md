# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```sh
pnpm install
pnpm dev      # next dev --webpack
pnpm build
pnpm lint     # eslint
```

## What this repository is for

The landing page for Ttush Push, and the host for anything the stores need served from a domain rather than shipped in the app: the privacy policy, and later the Digital Asset Links and Apple App Site Association files. The app itself lives in `AndrewDongminYoo/ttush_push`.

That split is deliberate. Files under `.well-known` only mean something when served from the site's own domain, so putting them in the Flutter repository would leave them present and unreachable.

## Layout

`app/[locale]` holds the two locales, `ko` and `en`, and `lib/i18n.ts` is the only place that list appears. Copy lives in `lib/dictionaries.ts` as a `Record<Locale, Dictionary>`, so a missing translation fails to compile instead of falling back to English silently.

Legal text is Markdown under `content/legal`, read at build time and rendered through `react-markdown` by `components/policy-layout.tsx`. Keep it Markdown: it is the form a store reviewer and a person both read, and it diffs. Its heading and list styles live in the `.policy` block in `app/globals.css`, because Tailwind's preflight strips them and this project carries no typography plugin.

`public/board` and `public/sky` are copies of the app's sprites and background, and `app/icon.png` and `public/og.jpg` derive from its branded launch assets. Nothing on this page is generated art; the app's `assets/images/branding/README.md` states that identity uses no image-model output, and adding some here would split it.

## Claims about the app must be verified against the app

This page describes software in another repository, which is exactly the shape that goes stale. Three rules:

- Before changing a sentence about what the game does, check it against `ttush_push` at `main`, not against this page's previous wording.
- The privacy policy's central claim — that the app cannot reach the network — rests on the released Android bundle declaring no `android.permission.INTERNET`. That is checkable: read `base/manifest/AndroidManifest.xml` out of the AAB. If a future version adds the permission, this policy is wrong the moment that version ships.
- The hero board in `components/board-replay.tsx` is a claim too. Its four frames were derived by hand from `engine/src/lib.rs`, so a change to `resolve_move` or to the tile decay makes them wrong. Do not replace them with a simulation: a second rules authority on this page contradicts the sentence the page itself prints about the engine.

## Do not invent

No store links until a store page exists; `lib/site.ts` exports `null` rather than a plausible URL. No Digital Asset Links statement until the app declares an App Links intent filter, and when it does, the fingerprint to publish is Play App Signing's certificate rather than the local upload key. No terms of service unless someone writes them. See the README table for the full list and the reason for each.
