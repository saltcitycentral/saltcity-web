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
      { source: "/thanksgiving", destination: "/next-steps" },
      { source: "/dedication", destination: "/next-steps" },
      { source: "/marriage", destination: "/next-steps" },
      { source: "/membership", destination: "/next-steps" },
      { source: "/discipleship", destination: "/next-steps" },
      { source: "/company", destination: "/next-steps" },
      { source: "/serve", destination: "/next-steps" },
      { source: "/prayer", destination: "/next-steps" },
    ];
  },
};

export default nextConfig;