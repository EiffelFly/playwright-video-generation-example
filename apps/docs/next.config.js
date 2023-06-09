/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    mdxRs: true,
  },
  reactStrictMode: true,
};

const withMDX = require("@next/mdx")({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});
module.exports = withMDX(nextConfig);
