export const siteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://ttush-push.donminzzi.kr"
);

export const androidPackage = "kr.donminzzi.ttush_push";

// The share card lives in `public/` rather than as a `opengraph-image` route
// segment: a static image file inside `app/[locale]/` collapses to a single
// `/-/opengraph-image.jpg` URL that nothing else can reference, and the page's
// JSON-LD needs to name the same image the meta tags do.
export const ogImage = { path: "/og.jpg", width: 1200, height: 630 } as const;

// The App Store listing has been public since 2026-09-19. Google Play finished
// closed testing and has been in production review since 2026-10-10, with the
// closed Alpha track still open to testers, so it has no public page yet and
// its link would 404 for a visitor. Add it, and the /download
// redirect in next.config.ts, when that page actually exists.
export const playStoreUrl: string | null = null;
export const appStoreUrl: string | null = "https://apps.apple.com/app/id6808835874";
