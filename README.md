# ttush-push-landing

Landing page for [Ttush Push](https://github.com/AndrewDongminYoo/ttush_push), a push-and-fall board game whose rules live in a Rust engine.

Next.js App Router, `ko` and `en` under `app/[locale]`, legal text as Markdown under `content/legal`. Same shape as `prism-defense-landing` and `quest-keeper-landing`.

The hero is a five-by-five board that plays three moves of a round on a loop, drawn with the sprites the app itself ships. The frames are hard-coded from the rules in `engine/src/lib.rs`, not simulated here — see [the design spec](docs/specs/2026-09-02-promotional-landing-design.md) for the sequence and why it is data rather than a re-implementation.

```sh
pnpm install
pnpm dev      # http://localhost:3000 → redirects to /ko
pnpm build
pnpm lint
```

## What is real and what is a placeholder

The privacy policy is accurate and load-bearing: Google Play requires the URL, and its central claim was verified rather than assumed. From Ttush Push 1.3.0 the released Android bundle declares `android.permission.INTERNET` and `ACCESS_NETWORK_STATE` for Firebase Crashlytics, and from 1.4.0 Google Analytics for Firebase and the Google Mobile Ads SDK add the advertising ID and ad services permissions; the policy names those permissions, and `docs/notes/store-privacy-declarations.md` in the app repository owns the list. That those three SDKs are the only things that open a connection is read from the app's source and dependencies, as `CLAUDE.md` describes, because a declared permission does not say who uses it.

`public/app-ads.txt` names the AdMob publisher of the native ads in the app repository's `docs/specs/0018-native-admob-ads/spec.md`. AdMob reads it from the developer website each store lists, one subdomain level deep, so it belongs on this host rather than on `donminzzi.kr`.

Deliberately absent, each for a reason rather than as an oversight:

| Missing                   | Why                                                                                                                                                                                                                                                                            |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Play link and `/download` | Google Play is in closed testing on the way to production and has no public page, so its link would 404 and `lib/site.ts` exports `null` instead of guessing a URL. The App Store page is public and linked; `/download` waits until it can send each platform to its store.   |
| `.well-known` asset links | The Android manifest declares no App Links intent filter, so a Digital Asset Links statement would assert an association the app does not claim. Play App Signing also re-signs with its own certificate, so the fingerprint to publish is Play's, not the local upload key's. |
| Screenshots               | None taken from a release build on a real device yet. The hero board stands in: it is the app's own art, so it is honest about how the game looks, but it is not a capture of the running app.                                                                                 |
| `llms.txt`                | It would have to restate the rules that `lib/dictionaries.ts` already owns, and a second copy drifts. Add one when there is a fact it can carry that the page does not.                                                                                                        |
| Terms of service          | Not written. Play requires a privacy policy, not terms, and inventing legal text is worse than having none.                                                                                                                                                                    |

Add store links and the `/download` redirect together, in `lib/site.ts` and `next.config.ts`; the sibling repositories show the shape.

## Keeping this in step with the app

The app repository's release checklist has a step that points here. When a release changes what a player sees, this page's rules and status text are part of that release, not a follow-up.

Two things here are copies of something the app owns, and copies drift:

- `public/board/` and `public/sky/` are the app's sprites and background. Re-copy them when the art changes.
- The hero's move sequence encodes how `engine/src/lib.rs` resolves a push and decays a foothold. A change to move resolution makes it a stale claim, the same way a permission the policy does not name would make the privacy policy one.
