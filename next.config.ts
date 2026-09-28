import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@portabletext/react", "@portabletext/toolkit"],
};

export default nextConfig;
