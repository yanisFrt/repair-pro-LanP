import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions Générales d'Utilisation - Repair Pro",
  description:
    "Consultez les conditions générales d'utilisation de Repair Pro. Informations sur les licences, la protection des données, les paiements et vos droits.",
  openGraph: {
    title: "Conditions d'Utilisation - Repair Pro",
    description:
      "Conditions générales d'utilisation du logiciel de gestion d'atelier Repair Pro",
    type: "website",
  },
  alternates: {
    canonical: "https://repair-pro.tech/terms",
    languages: {
      "fr-FR": "https://repair-pro.tech/terms",
      "en-US": "https://repair-pro.tech/en/terms",
      "es-ES": "https://repair-pro.tech/es/terms",
      "ar-SA": "https://repair-pro.tech/ar/terms",
    },
  },
  robots: {
    index: true,
    follow: true,
  },
};
