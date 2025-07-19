// next.config.ts

import type { NextConfig } from 'next';
import type { Configuration as WebpackConfig } from 'webpack';

const nextConfig: NextConfig = {
  reactStrictMode: true,

  images: {
    domains: ['assets.coingecko.com', 'example.com'], // Add image domains
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  webpack: (config: WebpackConfig): WebpackConfig => {
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
