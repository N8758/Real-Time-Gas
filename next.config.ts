// next.config.ts
import type { NextConfig } from 'next';
import type { Configuration as WebpackConfig } from 'webpack';

const nextConfig: NextConfig = {
  reactStrictMode: true,

  images: {
    domains: ['assets.coingecko.com', 'example.com'],
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  webpack(config: WebpackConfig) {
    // Example: Add aliases or custom loaders
    return config;
  },

  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
