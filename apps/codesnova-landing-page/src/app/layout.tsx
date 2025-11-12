import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";
import Footer from "./footer";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});
export const metadata: Metadata = {
  title: "Codes Nova – Solutions Logicielles Innovantes",
  description:
    "Codes Nova est une entreprise spécialisée dans le développement de logiciels, d'applications web et mobiles. Nous créons des solutions performantes, évolutives et adaptées aux besoins de nos clients.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} bg-custom-radial`}>
        {children}
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}
