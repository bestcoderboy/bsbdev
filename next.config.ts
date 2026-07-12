import type { NextConfig } from "next";
import createMDX from '@next/mdx';

const nextConfig: NextConfig = {
    pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx']
};

const withMdx = createMDX({
    extension: /\.(md|mdx)$/
});

export default withMdx(nextConfig);
