import type { NextConfig } from "next";

// The sibling landing sites redirect /download to the right store and serve
// an apple-app-site-association file. Neither is here yet, although both store
// pages are public: Ttush Push's Android manifest declares no App Links intent
// filter, so a Digital Asset Links statement would assert an association the
// app does not claim. Add both together, not separately.
const nextConfig: NextConfig = {
  async redirects() {
    return [{ source: "/", destination: "/ko", permanent: false }];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Strict-Transport-Security", value: "max-age=63072000" },
        ],
      },
    ];
  },
  agentRules: false,
};

export default nextConfig;
