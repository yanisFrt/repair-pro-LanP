// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // ✅ remplace "next export"
  images: {
    unoptimized: true, // obligatoire pour export statique si tu utilises <Image>
  },
};

export default nextConfig;
