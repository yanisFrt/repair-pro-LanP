// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",

  // Configuration des images optimisées
  images: {
    unoptimized: true, // Temporaire pour export statique
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    domains: ['repair-pro.tech', 'localhost'],
    minimumCacheTTL: 60,
  },

  // Optimisations de production
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  generateEtags: true,

  // Optimisation du bundle
  swcMinify: true,
  productionBrowserSourceMaps: false,

  compiler: {
    // Supprime les console.log en production
    removeConsole: process.env.NODE_ENV === "production" ? {
      exclude: ["error", "warn"],
    } : false,
    // Optimise les composants React
    reactRemoveProperties: process.env.NODE_ENV === "production",
  },

  // NOTE: Headers et Redirects ne fonctionnent pas avec output: "export"
  // Ces configurations doivent être gérées au niveau du serveur web (nginx, apache, CDN)
  // ou via un fichier _redirects pour Netlify, vercel.json pour Vercel, etc.

  // Pour activer headers et redirects, retirez "output: export" et utilisez un déploiement serveur
  // headers: async () => { ... },
  // redirects: async () => { ... },

  // Note: i18n config incompatible avec output: "export"
  // La gestion des langues se fait via LanguageContext

  // Optimisation des modules externes
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "react-icons",
      "framer-motion",
      "@headlessui/react",
    ],
  },

  // Variables d'environnement publiques
  env: {
    NEXT_PUBLIC_SITE_URL: 'https://repair-pro.tech',
    NEXT_PUBLIC_GTM_ID: 'GTM-WC4SPBV4',
  },

  // Configuration webpack personnalisée
  webpack: (config, { isServer }) => {
    // Optimisations côté client
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      }
    }

    // Optimisation des chunks
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          vendor: {
            name: 'vendor',
            chunks: 'all',
            test: /node_modules/,
            priority: 20,
          },
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            priority: 10,
            reuseExistingChunk: true,
            enforce: true,
          },
        },
      },
    }

    return config
  },
};

export default nextConfig;
