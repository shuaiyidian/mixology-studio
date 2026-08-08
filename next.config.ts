import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Standalone output: produces a self-contained server with only the deps it needs.
  // Smaller deploy image on Railway, faster cold starts.
  output: "standalone",

  // Trust the X-Forwarded-* headers Railway's proxy sets.
  // Required for `request.ip` and the canonical URL behind the proxy.
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },

  // Allow large JSON bodies for /api/match (max 64 ingredient ids).
  // Not strictly needed for client-side fetches, but documents the intent.
  poweredByHeader: false,

  // We use static JSON + JSON imports; no images in MVP.
  // When we add image-heavy content, configure `images.remotePatterns` here.
};

export default nextConfig;
