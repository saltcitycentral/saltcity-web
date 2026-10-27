import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
  // Short links to specific Next Steps forms. Each keeps its own URL in the
  // address bar and opens the matching form (see PATH_TO_FORM in next-steps).
  async rewrites() {
    return [
      // Opens the homepage "First Time Here?" form directly.
      { source: "/new-here", destination: "/" },
      { source: "/thanksgiving", destination: "/next-steps" },
      { source: "/dedication", destination: "/next-steps" },
      { source: "/marriage", destination: "/next-steps" },
      { source: "/membership", destination: "/next-steps" },
      { source: "/discipleship", destination: "/next-steps" },
      { source: "/company", destination: "/next-steps" },
      { source: "/serve", destination: "/next-steps" },
      { source: "/prayer", destination: "/next-steps" },
      // The Faith Convention 2026 lives at /tfc
      { source: "/multiply", destination: "/tfc" },
    ];
  },

  async redirects() {
    return [
      // The convention page moved to the short URL people are given.
      { source: "/the-faith-convention", destination: "/tfc", permanent: true },
    ];
  },
};

export default nextConfig;