import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "etnebeyvicbczdmwdoss.supabase.co",
      },
    ],
  },
};

export default nextConfig;
