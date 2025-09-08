import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // domains: ["localhost"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "metallugy.runflare.run",
        port: '',
        pathname: "/**",
      },]
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;
