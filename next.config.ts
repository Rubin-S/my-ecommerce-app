import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '', // Optional: usually not needed unless specific port
        pathname: '/**', // Optional: allows any path under this hostname
      },
    ],
  },
};

export default nextConfig;
