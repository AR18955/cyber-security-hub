/** @type {import('next').NextConfig} */
const repo = 'cyber-security-hub'

const nextConfig = {
  output: 'export',
  basePath: `/${repo}`,
  assetPrefix: `/${repo}/`,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
