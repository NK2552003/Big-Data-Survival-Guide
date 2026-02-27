/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  reactStrictMode: true,
  swcMinify: true,
  cacheComponents: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
