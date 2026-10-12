export const siteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://ttush-push.donminzzi.kr"
);

export const androidPackage = "kr.donminzzi.ttush_push";

// The share card lives in `public/` rather than as a `opengraph-image` route
// segment: a static image file inside `app/[locale]/` collapses to a single
// `/-/opengraph-image.jpg` URL that nothing else can reference, and the page's
// JSON-LD needs to name the same image the meta tags do.
export const ogImage = { path: "/og.jpg", width: 1200, height: 630 } as const;

// The App Store listing has been public since 2026-09-19, and the Google Play
// listing since 1.5.0 passed production review; both were checked to answer
// 200 on 2026-10-12. The /download redirect that would pick between them is
// still absent, for the reason next.config.ts gives.
export const playStoreUrl: string | null =
  `https://play.google.com/store/apps/details?id=${androidPackage}`;
export const appStoreUrl: string | null = "https://apps.apple.com/app/id6808835874";
