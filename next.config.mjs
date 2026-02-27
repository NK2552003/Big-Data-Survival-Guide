/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/Big-Data-Survival-Guide',
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  reactStrictMode: true,
  swcMinify: true,
  cacheComponents: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
