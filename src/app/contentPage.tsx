"use client";

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
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";

// Lazy load des modales pour optimiser le chargement initial
const ContactModal = dynamic(() => import("@/components/modals/contact-us-modal"), {
  ssr: false,
});
const PaymentModal = dynamic(() => import("./PaymentModal"), {
  ssr: false,
});

// Lazy load des sections non critiques (below the fold)
const FAQSection = dynamic(() => import("@/components/sections/FaqSection").then(mod => ({ default: mod.FAQSection })), {
  ssr: true,
  loading: () => <div className="min-h-screen" />,
});
const FreeVersionSection = dynamic(() => import("@/components/sections/FreeVersionSection").then(mod => ({ default: mod.FreeVersionSection })), {
  ssr: true,
  loading: () => <div className="min-h-[400px]" />,
});
const CTASection = dynamic(() => import("@/components/sections/CtaSection").then(mod => ({ default: mod.CTASection })), {
  ssr: true,
  loading: () => <div className="min-h-[300px]" />,
});

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useCountryDetection } from "@/hooks/useCountryDetection";
import { useTranslation } from "@/hooks/useTranslation";
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
  const { t } = useTranslation();

  useEffect(() => {
    if (country) {
      setSelectedCountry(country.toLowerCase() as Countries);
    }
  }, [country]);

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // États pour contrôler la modale de paiement
  const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  const faqs = [
    {
      question: t("faq.questions.q1.question"),
      answer: t("faq.questions.q1.answer"),
    },
    {
      question: t("faq.questions.q2.question"),
      answer: t("faq.questions.q2.answer"),
    },
    {
      question: t("faq.questions.q3.question"),
      answer: t("faq.questions.q3.answer"),
    },
    {
      question: t("faq.questions.q4.question"),
      answer: t("faq.questions.q4.answer"),
    },
  ];

  const features = [
    {
      icon: <Wrench className="w-8 h-8" />,
      title: t("features.list.repairs.title"),
      description: t("features.list.repairs.description"),
    },
    {
      icon: <Package className="w-8 h-8" />,
      title: t("features.list.stock.title"),
      description: t("features.list.stock.description"),
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: t("features.list.clients.title"),
      description: t("features.list.clients.description"),
    },
    {
      icon: <Receipt className="w-8 h-8" />,
      title: t("features.list.billing.title"),
      description: t("features.list.billing.description"),
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: t("features.list.tickets.title"),
      description: t("features.list.tickets.description"),
    },
    {
      icon: <BellDot className="w-8 h-8" />,
      title: t("features.list.notifications.title"),
      description: t("features.list.notifications.description"),
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: t("features.list.parts.title"),
      description: t("features.list.parts.description"),
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: t("features.list.analytics.title"),
      description: t("features.list.analytics.description"),
    },
    {
      icon: <Cloud className="w-8 h-8" />,
      title: t("features.list.backup.title"),
      description: t("features.list.backup.description"),
    },
  ];

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

      {/* CTA Section */}
      <CTASection scrollTo={scrollTo} />

      {/* Free Version Section */}
      <FreeVersionSection setContactUsOpen={setContactUsOpen} />

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
