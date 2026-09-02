import type { NextConfig } from "next";

// The sibling landing sites redirect /download to the right store and serve
// an apple-app-site-association file. Neither is here yet: Ttush Push has no
// public store page, and its Android manifest declares no App Links intent
// filter, so a Digital Asset Links statement would assert an association the
// app does not claim. Add both together, not separately.
const nextConfig: NextConfig = {
  async redirects() {
    return [{ source: "/", destination: "/ko", permanent: false }];
  },
};

export default nextConfig;
