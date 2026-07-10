import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3001",
      },
      {
        protocol: "https",
        hostname: "localhost",
        port: "3000",
      },
      {
        protocol: "https",
        hostname: "localhost",
        port: "3001",
      },
    ],
    unoptimized: true, // Disable image optimization for localhost
  },
  experimental: {
    ssr: true, // Ensure SSR is enabled
  },
};

export default nextConfig;
