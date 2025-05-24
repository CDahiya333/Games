/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // Suppress hydration warnings for browser extension attributes
    suppressHydrationWarning: true,
  },
  // Additional configuration to handle browser extension attributes
  compiler: {
    removeConsole: false,
  },
}

module.exports = nextConfig 