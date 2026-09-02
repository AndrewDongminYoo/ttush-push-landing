export const siteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://ttush-push.donminzzi.kr"
);

export const androidPackage = "kr.donminzzi.ttush_push";

// Deliberately not exported as links yet. The app is a draft on Google Play
// with an internal testing track only, and there is no App Store record at
// all, so both of these would 404 for a visitor. Add them, and the /download
// redirect in next.config.ts, when a store page actually exists.
export const playStoreUrl: string | null = null;
export const appStoreUrl: string | null = null;
