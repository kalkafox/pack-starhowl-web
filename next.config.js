/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    swcMinify: true,
    optimizeCss: true,
  },
  images: {
    domains: ['randomfox.ca'],
  },
}

module.exports = nextConfig
