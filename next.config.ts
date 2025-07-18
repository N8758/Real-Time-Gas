import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // This will ignore ESLint errors during builds on Vercel
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
