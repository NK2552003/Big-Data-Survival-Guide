/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: isProd ? '/Big-Data-Survival-Guide' : '',
  assetPrefix: isProd ? '/Big-Data-Survival-Guide/' : '',
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
