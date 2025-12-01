import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import DynamicFooter from "@/components/Footer";
import { NavBar } from "@/components/Navbar";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Repair Pro - Solutions de Réparation Professionnelles",
  description: "Plateforme de gestion de réparations professionnelle",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        {/* Google Tag Manager  */}
        <Script id="gtm">
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
      </body>

      <GoogleAnalytics />
    </html>
  );
}
