// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // Optimisations de production
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,

  // Optimisation du bundle
  swcMinify: true,

  compiler: {
    // Supprime les console.log en production
    removeConsole: process.env.NODE_ENV === "production" ? {
      exclude: ["error", "warn"],
    } : false,
  },

  // Optimisation des modules externes
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "react-icons",
      "framer-motion",
    ],
  },
};

export default nextConfig;
