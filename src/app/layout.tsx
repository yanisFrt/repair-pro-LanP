import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import DynamicFooter from "@/components/Footer";
import { NavBar } from "@/components/Navbar";

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
      <body className={inter.className}>
        <NavBar />
        {children}
        <DynamicFooter />
      </body>
    </html>
  );
}
