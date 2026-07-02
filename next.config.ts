import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    // Les visuels sont immuables (media kit) : cache long cote optimiseur.
    minimumCacheTTL: 31536000,
  },
  experimental: {
    // Tree-shaking agressif des barrels — reduit le JS client.
    optimizePackageImports: ["framer-motion", "lucide-react"],
  },
  async redirects() {
    return [
      { source: "/accueil", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
