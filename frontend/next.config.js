/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'randomuser.me'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
