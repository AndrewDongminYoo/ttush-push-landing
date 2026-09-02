export const siteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://ttush-push.donminzzi.kr"
);

export const androidPackage = "kr.donminzzi.ttush_push";

// The share card lives in `public/` rather than as a `opengraph-image` route
// segment: a static image file inside `app/[locale]/` collapses to a single
// `/-/opengraph-image.jpg` URL that nothing else can reference, and the page's
// JSON-LD needs to name the same image the meta tags do.
export const ogImage = { path: "/og.jpg", width: 1200, height: 630 } as const;

// Deliberately not exported as links yet. The app is a draft on Google Play
// with an internal testing track only, and there is no App Store record at
// all, so both of these would 404 for a visitor. Add them, and the /download
// redirect in next.config.ts, when a store page actually exists.
export const playStoreUrl: string | null = null;
export const appStoreUrl: string | null = null;
