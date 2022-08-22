/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['via.placeholder.com'],
  },
  experimental: {
    externalDir: true,
  },
};

module.exports = nextConfig;
