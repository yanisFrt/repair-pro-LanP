import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./rtl.css";
import DynamicFooter from "@/components/Footer";
import { NavBar } from "@/components/Navbar";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Script from "next/script";
import StructuredData, {
  organizationSchema,
  softwareApplicationSchema,
} from "@/components/StructuredData";
import dynamic from "next/dynamic";

// Import dynamique pour le monitoring de performance (client-side only)
const PerformanceMonitor = dynamic(() => import("@/components/PerformanceMonitor"), {
  ssr: false,
});

// Optimisation de la police avec préchargement et display swap
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://repair-pro.tech"),
  title: {
    default: "Repair Pro - Logiciel de Gestion d'Atelier de Réparation #1 en France",
    template: "%s | Repair Pro",
  },
  description:
    "Optimisez votre atelier de réparation avec Repair Pro : gestion des clients, suivi des réparations, facturation automatisée. Solution professionnelle pour téléphones, tablettes et ordinateurs. Essai gratuit disponible.",
  keywords: [
    "logiciel gestion atelier réparation",
    "repair pro",
    "gestion réparation téléphone",
    "logiciel atelier informatique",
    "solution réparation smartphone",
    "gestion stock pièces détachées",
    "facturation atelier réparation",
    "suivi réparation client",
    "logiciel SAV informatique",
    "CRM atelier réparation",
    "gestion boutique réparation",
    "repair management software",
    "téléphone",
    "smartphone",
  ],
  authors: [{ name: "Repair Pro Team" }],
  creator: "Repair Pro",
  publisher: "Repair Pro",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/LOGO-V2-nobg.png", sizes: "32x32", type: "image/png" },
      { url: "/LOGO-V2-nobg.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/LOGO-V2-nobg.png",
    apple: "/LOGO-V2-nobg.png",
  },
  manifest: "/manifest.json",
  alternates: {
    canonical: "https://repair-pro.tech",
    languages: {
      "fr-FR": "https://repair-pro.tech",
      "en-US": "https://repair-pro.tech/en",
      "es-ES": "https://repair-pro.tech/es",
      "ar-SA": "https://repair-pro.tech/ar",
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    alternateLocale: ["en_US", "es_ES", "ar_SA"],
    url: "https://repair-pro.tech",
    siteName: "Repair Pro",
    title: "Repair Pro - Logiciel de Gestion d'Atelier de Réparation #1",
    description:
      "Solution complète pour gérer votre atelier de réparation : clients, stock, facturation. Interface intuitive, rapports détaillés. Essai gratuit 30 jours.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Repair Pro - Dashboard de gestion d'atelier",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Repair Pro - Gestion d'Atelier de Réparation",
    description:
      "Optimisez votre atelier avec notre solution tout-en-un. Essai gratuit disponible.",
    images: ["/twitter-image.jpg"],
    creator: "@repairpro",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "YOUR_GOOGLE_VERIFICATION_CODE",
    yandex: "YOUR_YANDEX_VERIFICATION_CODE",
    yahoo: "YOUR_YAHOO_VERIFICATION_CODE",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        {/* Préchargement des ressources critiques */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://js.stripe.com" />
        <link rel="dns-prefetch" href="https://js.stripe.com" />

        {/* Préchargement des ressources critiques above-the-fold */}
        <link rel="preload" href="/LOGO-V2-nobg.png" as="image" type="image/png" fetchPriority="high" />

        {/* Structured Data */}
        <StructuredData data={organizationSchema} />
        <StructuredData data={softwareApplicationSchema} />

        {/* Google Tag Manager  */}
        <Script id="gtm" strategy="afterInteractive">
          {`
  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-WC4SPBV4');
  `}
        </Script>
        {/* End Google Tag Manager  */}
      </head>
      <body className={inter.className}>
        <LanguageProvider>
          <NavBar />
          {children}
          <DynamicFooter />

          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-WC4SPBV4"
              height="0"
              width="0"
              style={{
                display: "none",
                visibility: "hidden",
              }}
            ></iframe>
          </noscript>
        </LanguageProvider>
        <PerformanceMonitor />
      </body>

      <GoogleAnalytics />
    </html>
  );
}
