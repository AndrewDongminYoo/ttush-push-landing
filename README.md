# ttush-push-landing

Landing page for [Ttush Push](https://github.com/AndrewDongminYoo/ttush_push), a push-and-fall board game whose rules live in a Rust engine.

Next.js App Router, `ko` and `en` under `app/[locale]`, legal text as Markdown under `content/legal`. Same shape as `prism-defense-landing` and `quest-keeper-landing`.

```sh
pnpm install
pnpm dev      # http://localhost:3000 → redirects to /ko
pnpm build
pnpm lint
```

## What is real and what is a placeholder

The privacy policy is accurate and load-bearing: Google Play requires the URL, and its central claim was verified against the shipped artifact rather than assumed. The released Android bundle declares no `android.permission.INTERNET`, so the app cannot open a network connection; the permission appears only in the debug and profile manifests that Flutter uses for hot reload.

Deliberately absent, each for a reason rather than as an oversight:

| Missing                     | Why                                                                                                                                                                                                                                                                            |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Store links and `/download` | The app is a Play draft with an internal testing track. Both links would 404, so `lib/site.ts` exports `null` instead of guessing a URL.                                                                                                                                       |
| `.well-known` asset links   | The Android manifest declares no App Links intent filter, so a Digital Asset Links statement would assert an association the app does not claim. Play App Signing also re-signs with its own certificate, so the fingerprint to publish is Play's, not the local upload key's. |
| Screenshots                 | None taken from a release build on a real device yet.                                                                                                                                                                                                                          |
| Terms of service            | Not written. Play requires a privacy policy, not terms, and inventing legal text is worse than having none.                                                                                                                                                                    |
| `app-ads.txt`               | Only meaningful for an app that serves ads. This one does not.                                                                                                                                                                                                                 |

Add store links and the `/download` redirect together, in `lib/site.ts` and `next.config.ts`; the sibling repositories show the shape.

## Keeping this in step with the app

The app repository's release checklist has a step that points here. When a release changes what a player sees, this page's rules and status text are part of that release, not a follow-up.
