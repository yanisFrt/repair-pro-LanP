import { ConfirmationModalPopup } from "@/components/ConfirmationModal";
import RPLanding from "./contentPage";
import { Suspense } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accueil - Logiciel de Gestion d'Atelier de Réparation",
  description: "Repair Pro révolutionne la gestion de votre atelier de réparation. Interface intuitive, suivi en temps réel, facturation automatisée. Plus de 1000 ateliers nous font confiance. Démarrez votre essai gratuit de 30 jours.",
  keywords: [
    "repair pro accueil",
    "logiciel réparation téléphone",
    "gestion atelier informatique",
    "solution SAV professionnel",
    "logiciel boutique réparation",
    "essai gratuit repair pro",
    "meilleur logiciel réparation",
    "gestion stock pièces détachées",
    "CRM atelier réparation France",
    "tableau de bord réparation"
  ],
  openGraph: {
    title: "Repair Pro - La Solution N°1 pour Votre Atelier de Réparation",
    description: "Gérez efficacement votre atelier avec Repair Pro. Suivi des réparations, gestion des clients, facturation automatisée. Interface moderne et intuitive. Essai gratuit 30 jours.",
    images: [
      {
        url: '/homepage-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Repair Pro - Interface de gestion moderne',
      }
    ],
  },
  twitter: {
    title: "Repair Pro - Gérez Votre Atelier Comme un Pro",
    description: "La solution tout-en-un pour les ateliers de réparation modernes. Essai gratuit disponible.",
    images: ['/homepage-twitter.jpg'],
  },
};

export default async function Page() {
  return (
    <>
      <RPLanding />

      <Suspense>
        <ConfirmationModalPopup />
      </Suspense>
    </>
  );
}
