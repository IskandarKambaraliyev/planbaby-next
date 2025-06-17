import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "cp.plan-baby.uz",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
    ],
  },
  devIndicators: false,
  allowedDevOrigins: ["192.168.0.102"],
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
