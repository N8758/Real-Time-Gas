// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: ['assets.coingecko.com', 'example.com'], // add other external image domains here
  },

  // ✅ Ignore ESLint errors during Vercel builds (temporary fix)
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Optional: Custom Webpack configuration
  webpack: (config) => {
    // Example: Add aliases or custom loaders
    return config;
  },

  // Optional: Redirects example
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

module.exports = nextConfig;
