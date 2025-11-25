"use client";

import ContactModal from "@/components/modals/contact-us-modal";
import { type Plan } from "@/utils/features";
import {
  BarChart3,
  BellDot,
  Cloud,
  Database,
  FileText,
  Package,
  Receipt,
  Users,
  Wrench,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import PaymentModal from "./PaymentModal";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useCountryDetection } from "@/hooks/useCountryDetection";
import { FAQSection } from "@/components/sections/FaqSection";
import { FreeVersionSection } from "@/components/sections/FreeVersionSection";
import { CTASection } from "@/components/sections/CtaSection";
import { ValuesSection } from "@/components/sections/ValuesSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { Countries, PricingSection } from "@/components/sections/PricingSection";

//décodage manuel avec un dictionnaire
const decodeHtml = (text: string): string => {
  if (!text) return "";
  return text
    .replace(/&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
};

const faqs = [
  {
    question: "Pourquoi un abonnement et pas une licence 'à vie' moins chère ?",
    answer:
      "Une licence 'à vie' est souvent un piège : elle est valable pour une version figée de logiciel. Face à un bug, une nouvelle technologie ou un simple besoin d'évolution, vous êtes seul. Notre abonnement est un partenariat : il finance l&apos;amélioration continue, un support réactif et la garantie que votre outil de travail ne deviendra JAMAIS obsolète. Vous n'achetez pas un produit, vous investissez dans votre tranquillité et votre croissance.",
  },
  {
    question: "Que se passe-t-il si j&apos;ai un problème technique ?",
    answer:
      "C&apos;est notre plus grande force. Avec une licence à vie, le support est souvent payant, lent ou inexistant. Nos abonnés bénéficient d'un support prioritaire sur WhatsApp avec une réponse garantie en moins de 2 heures. Fini le stress : un expert est toujours là pour vous débloquer et vous permettre de vous concentrer sur vos clients.",
  },
  {
    question: "Mes données sont-elles en sécurité ?",
    answer:
      "Absolument. Un logiciel installé localement est vulnérable au vol, à la panne de votre ordinateur. Vous risquez de tout perdre. Notre solution sauvegarde automatiquement et quotidiennement vos données sur des serveurs sécurisés. C'est l&apos;assurance que votre actif le plus précieux — l&apos;historique de vos clients et réparations — est toujours en sécurité.",
  },
  {
    question: "Comment se passent les mises à jour ?",
    answer:
      "Elles sont automatiques, transparentes et incluses dans votre abonnement. Chaque mois, nous déployons des améliorations, des correctifs de sécurité et de nouvelles fonctionnalités, souvent inspirées par les retours de nos utilisateurs. Votre logiciel devient plus performant avec le temps, sans aucun effort ni coût supplémentaire de votre part.",
  },
];

const features = [
  {
    icon: <Wrench className="w-8 h-8" />,
    title: "Gestion des réparations",
    description:
      "Suivez le statut de chaque réparation, attribuez des techniciens et optimisez votre workflow de A à Z.",
  },
  {
    icon: <Package className="w-8 h-8" />,
    title: "Gestion des stocks",
    description:
      "Surveillez vos niveaux d'inventaire en temps réel, suivez l'utilisation des pièces et évitez les ruptures.",
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Gestion des clients",
    description:
      "Conservez un historique complet des clients, de leurs appareils et de toutes leurs réparations passées.",
  },
  {
    icon: <Receipt className="w-8 h-8" />,
    title: "Facturation simplifiée",
    description:
      "Créez des factures et des devis professionnels en quelques clics, personnalisés avec votre logo.",
  },
  {
    icon: <FileText className="w-8 h-8" />,
    title: "Système de tickets",
    description:
      "Générez des tickets de réparation clairs pour vos clients et suivez chaque étape du processus interne.",
  },
  {
    icon: <BellDot className="w-8 h-8" />,
    title: "Notifications Multicanal",
    description:
      "Gardez les clients informés avec des notifications par Email, SMS et WhatsApp pour chaque étape de réparation.",
  },
  {
    icon: <Database className="w-8 h-8" />,
    title: "Gestion de la casse",
    description:
      "Recensez et gérez les pièces d'un téléphone ou appareil en détail, avec suivi des stocks et coûts.",
  },
  {
    icon: <BarChart3 className="w-8 h-8" />,
    title: "Analytique complète",
    description:
      "Accédez à des rapports journaliers et personnalisés par date pour suivre les performances de votre atelier.",
  },
  {
    icon: <Cloud className="w-8 h-8" />,
    title: "Sauvegarde Cloud",
    description:
      "Sauvegardez votre base de données dans le cloud pour protéger vos données contre toute perte accidentelle.",
  },
];

export const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY || "");

export default function RPLanding() {
  return (
    <Elements stripe={stripePromise}>
      <RepairProLanding />
    </Elements>
  );
}

export function RepairProLanding() {
  const [isContactUsOpen, setContactUsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Countries>("dz");
  const { country, loading, error: countryError } = useCountryDetection();

  useEffect(() => {
    if (country) {
      setSelectedCountry(country.toLowerCase() as Countries);
    }
  }, [country]);

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // États pour contrôler la modale de paiement
  const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  const handleChoosePlan = (plan: Plan) => {
    setSelectedPlan(plan);
    setPaymentModalOpen(true);
  };

  const scrollTo = (target: string) => {
    const section = document.getElementById(target);
    section?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="bg-gray-900 text-white">
      {/* Hero Section */}
      <HeroSection scrollTo={scrollTo} />

      {/* Features Section */}
      <FeaturesSection features={features} />

      {/* Value Comparison Section */}
      <ValuesSection />

      {/* Pricing Section */}
      <PricingSection
        country={country}
        countryError={countryError}
        handleChoosePlan={handleChoosePlan}
        loading={loading}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
      />

      {/* FAQ Section */}
      <FAQSection decodeHtml={decodeHtml} faqs={faqs} openFaq={openFaq} toggleFaq={toggleFaq} />

      {/* Free Version Section */}
      <FreeVersionSection setContactUsOpen={setContactUsOpen} />

      {/* CTA Section */}
      <CTASection scrollTo={scrollTo} />

      {/* Contact Modal */}
      <ContactModal isOpen={isContactUsOpen} onClose={() => setContactUsOpen(false)} />

      {/* Payment Modal */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        plan={selectedPlan}
        currentCountry={(selectedCountry as Countries) || "dz"}
      />
    </div>
  );
}
