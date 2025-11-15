"use client";

import { TranslucentButton } from "@/components/TranslucentButton";
import ContactModal from "@/components/modals/contact-us-modal";
import { type Plan, getFeatureRows } from "@/utils/features";
import {
  BellDot,
  Check,
  CheckCircle,
  ChevronDown,
  FileText,
  HandCoins,
  LifeBuoy,
  Monitor,
  Package,
  Receipt,
  Smartphone,
  Users,
  Wrench,
  X,
  XCircle,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import PaymentModal from "./PaymentModal";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useCountryDetection } from "@/hooks/useCountryDetection";
import { AlgeriaFlag, FranceFlag } from "@/components/icons/svg";
import { getPlans } from "@/utils/plansData";

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
];

export const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY || "");

export default function RPLanding() {
  return (
    <Elements stripe={stripePromise}>
      <RepairProLanding />
    </Elements>
  );
}

type Countries = "dz" | "fr";

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
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(to_bottom,white_5%,transparent_90%)]"></div>
        <div className="relative max-w-7xl mx-auto text-center pt-8">
          <div className="mb-2">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-full text-blue-300 text-sm font-medium mb-6">
              🚀 Le partenaire de croissance pour les réparateurs
            </span>
          </div>
          <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Un Logiciel Qui Évolue
            <span className="block bg-gradient-to-r from-custom-teal to-custom-teal bg-clip-text text-transparent">
              Avec Votre Atelier
            </span>
          </h1>
          <p className="md:text-xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed">
            Arrêtez de subir un outil figé. Gérez réparations, stock, clients et factures avec un
            logiciel toujours à jour, sécurisé et supporté par une équipe dédiée.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button
              onClick={() => scrollTo("pricing")}
              className="sm:w-auto flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-full text-white bg-custom-teal/70 hover:bg-custom-teal/80 transition-all transform hover:scale-105 md:py-4 md:text-lg md:px-10"
            >
              Découvrir nos offres <HandCoins className="ml-2 w-5 h-5" />
            </button>
            <TranslucentButton
              className="select-none"
              onClick={() => {
                scrollTo("free-version");
              }}
            >
              <span>Commencer Gratuitement</span>
            </TranslucentButton>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
              <Monitor className="w-5 h-5 text-blue-400" />
              <span className="text-white">Windows</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
              <Monitor className="w-5 h-5 text-orange-400" />
              <span className="text-white">Linux</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20 opacity-60">
              <Smartphone className="w-5 h-5 text-green-400" />
              <span className="text-white">Android (Bientôt)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Tout ce dont vous avez besoin pour
              <span className="block text-custom-teal mt-2">Gérer vos Reparations</span>
            </h2>
            <p className="md:text-xl text-white/70 max-w-3xl mx-auto">
              De la prise en charge du client à la facturation, REPAIR PRO gère entièrement votre
              flux de travail.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:border-custom-teal/50 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="inline-block p-3 bg-custom-teal/10 rounded-lg border border-custom-teal/30 mb-4">
                  {React.cloneElement(feature.icon, { className: "w-8 h-8 text-custom-teal" })}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-white/70 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Comparison Section */}
      <section id="value-comparison" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Un Investissement, Pas une Dépense
              <span className="block text-custom-teal mt-2">La Vraie Différence</span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Comprenez pourquoi un partenariat continu surpasse de loin un achat unique et risqué.
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-red-900/10 border border-red-500/50 rounded-2xl p-8 h-full flex flex-col">
              <h3 className="text-2xl font-bold text-white mb-4">
                Licence &apos;à Vie&apos; (Le Piège)
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <XCircle className="w-6 h-6 text-red-400 mr-3 flex-shrink-0 mt-1" />
                  <span className="text-white/80">
                    Support technique lent, payant ou inexistant.
                  </span>
                </li>
                <li className="flex items-start">
                  <XCircle className="w-6 h-6 text-red-400 mr-3 flex-shrink-0 mt-1" />
                  <span className="text-white/80">
                    Aucune mise à jour, le logiciel devient vite obsolète.
                  </span>
                </li>
                <li className="flex items-start">
                  <XCircle className="w-6 h-6 text-red-400 mr-3 flex-shrink-0 mt-1" />
                  <span className="text-white/80">
                    Vulnérable aux nouveaux bugs et failles de sécurité.
                  </span>
                </li>
                <li className="flex items-start">
                  <XCircle className="w-6 h-6 text-red-400 mr-3 flex-shrink-0 mt-1" />
                  <span className="text-white/80">
                    Données locales : risque de perte totale en cas de panne.
                  </span>
                </li>
                <li className="flex items-start">
                  <XCircle className="w-6 h-6 text-red-400 mr-3 flex-shrink-0 mt-1" />
                  <span className="text-white/80">
                    Vous force à racheter une &apos;V2&apos; pour toute nouveauté.
                  </span>
                </li>
              </ul>
            </div>
            <div className="bg-custom-teal/10 border border-custom-teal/30 rounded-2xl p-8 h-full flex flex-col">
              <h3 className="text-2xl font-bold text-white mb-4">
                Notre Abonnement (Le Partenariat)
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-custom-teal mr-3 flex-shrink-0 mt-1" />
                  <span className="text-white/80">
                    Support WhatsApp prioritaire et ultra-réactif inclus.
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-custom-teal mr-3 flex-shrink-0 mt-1" />
                  <span className="text-white/80">
                    Mises à jour mensuelles avec de nouvelles fonctionnalités.
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-custom-teal mr-3 flex-shrink-0 mt-1" />
                  <span className="text-white/80">
                    Sécurité et performances constamment améliorées.
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-custom-teal mr-3 flex-shrink-0 mt-1" />
                  <span className="text-white/80">
                    Sauvegardes automatiques et sécurisées de vos données.
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-custom-teal mr-3 flex-shrink-0 mt-1" />
                  <span className="text-white/80">
                    Un outil qui grandit avec vous, sans surcoût.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION DE TARIFICATION (AVEC LES CARTES) --- */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Simple et Transparente
              <span className="block text-custom-teal mt-2">Tarification</span>
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Choisissez le plan qui correspond à vos besoins et commencez à transformer votre
              atelier dès aujourd&apos;hui.
            </p>

            <div className="flex justify-center mt-8">
              {countryError ||
                (country === null && !loading && (
                  <div className="bg-white/10 backdrop-blur-sm rounded-full p-1 flex items-center border border-white/20">
                    <>
                      <button
                        onClick={() => setSelectedCountry("dz")}
                        className={`px-6 py-2 rounded-full transition-all 
                    ${selectedCountry === "dz" ? "bg-custom-teal text-white" : "text-white/70"}
                    
                    `}
                      >
                        <div className="flex items-center gap-2">
                          <span>DZ</span>
                          <span>
                            <AlgeriaFlag />
                          </span>
                        </div>
                      </button>
                      <button
                        onClick={() => setSelectedCountry("fr")}
                        className={`px-6 py-2 rounded-full transition-all ${
                          selectedCountry === "fr" ? "bg-custom-teal text-white" : "text-white/70"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span>FR</span>
                          <span>
                            <FranceFlag />
                          </span>
                        </div>
                      </button>
                    </>
                  </div>
                ))}
            </div>
          </div>

          <div className="max-w-[80%] mx-auto">
            {loading ? (
              <>
                <p className="text-center">{"Chargement..."}</p>
              </>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
                {getPlans((selectedCountry as Countries) || "dz").map((plan) => (
                  <div
                    key={plan.id}
                    className={`relative flex flex-col justify-between rounded-2xl border border-gray-600 bg-gray-900/40 p-8 backdrop-blur-sm transition-transform hover:-translate-y-1 hover:border-gray-700 ${plan.popular ? "ring-2 ring-custom-teal scale-105" : ""}`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-custom-teal text-xs font-bold px-3 py-1 rounded-full uppercase">
                        Populaire
                      </div>
                    )}
                    <div>
                      <h2 className="text-xl text-center font-semibold text-gray-300">
                        {plan.name}
                      </h2>
                      <div className="flex flex-row items-end justify-center gap-x-2">
                        <p className="text-2xl md:text-4xl text-center font-bold mt-2 text-white">
                          {`${plan.price} ${plan.currency.toUpperCase()}`}
                        </p>
                        <p className="text-sm text-gray-400">/ {plan.period}</p>
                      </div>
                      <p className="mt-4 text-gray-400 text-sm">{plan.description}</p>
                      <ul className="mt-6 space-y-2 text-gray-300">
                        {getFeatureRows(plan).map((feature, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <span className={feature.active ? "text-green-500" : "text-red-500"}>
                              {feature.active ? <Check /> : <X />}
                            </span>
                            <span>{feature.label}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleChoosePlan(plan)}
                      className={`mt-8 w-full py-3 rounded-xl transition-colors text-white ${plan.popular ? "bg-custom-teal/70 hover:bg-custom-teal/50" : "bg-gray-500 hover:bg-gray-700"}`}
                    >
                      {plan.popular ? "Choisir le plan PRO" : "Choisir ce plan"}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Vous Hésitez Encore ?
              <span className="block text-custom-teal mt-2">Vos Questions, Nos Réponses</span>
            </h2>
            <p className="md:text-xl text-white/70 max-w-3xl mx-auto">
              Nous croyons en la transparence totale. Voici ce que vous devez savoir.
            </p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white/10 border border-white/20 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex justify-between items-center p-6 text-left"
                >
                  <h3 className="md:text-lg font-semibold text-white">
                    {" "}
                    {decodeHtml(faq.question)}
                  </h3>
                  <span>
                    <ChevronDown
                      className={`w-6 h-6 text-custom-teal transition-transform duration-300 ${openFaq === index ? "rotate-180" : ""}`}
                    />
                  </span>
                </button>
                <div
                  className={`transition-all duration-500 ease-in-out ${openFaq === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
                >
                  <p className="text-white/80 p-6 pt-0 text-justify">{decodeHtml(faq.answer)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactModal isOpen={isContactUsOpen} onClose={() => setContactUsOpen(false)} />

      {/* Free Version Section */}
      <section id="free-version" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto text-center items-center justify-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Vous hésitez ?
            <span className="block text-custom-teal">Tester une Version&nbsp;Gratuite</span>
          </h2>

          <p className="md:text-xl text-white/80 mb-8 max-w-3xl mx-auto">
            Profitez d’une version gratuite avec des fonctionnalités de base pour tester et gérer
            vos réparations sans frais.
          </p>

          <div className="mt-12 items-center justify-center flex">
            <TranslucentButton onClick={() => setContactUsOpen(true)}>
              <span>{"Essayer la version gratuite"}</span>
            </TranslucentButton>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Prêt à Choisir la Tranquillité ?
            <span className="block text-custom-teal mt-2">Rejoignez les Pros</span>
          </h2>
          <p className="md:text-xl text-white/80 mb-8">
            Rejoignez la communauté des réparateurs qui ont choisi un partenaire de croissance
            plutôt qu&apos;un simple outil.
          </p>
          <button
            onClick={() => scrollTo("pricing")}
            className="px-10 py-4 text-lg text-white bg-custom-teal/60 rounded-full hover:bg-custom-teal/90 transition-all transform hover:scale-105"
          >
            Voir les Plans et Démarrer
          </button>
        </div>
        <div className="mt-12 mx-auto md:flex md:flex-row grid grid-cols-2 items-center justify-center md:gap-8 text-white/60">
          <div className="flex flex-col items-center gap-y-2 md:gap-x-2">
            <LifeBuoy />
            <p className="font-bold mx-1 text-center">Support Inclus</p>
          </div>
          <div className="flex flex-col items-center gap-y-2 md:gap-x-2">
            <Users />
            <p className="font-bold mx-1 text-center">200+ Clients Satisfaits</p>
          </div>
        </div>
      </section>

      {/* La modale est appelée ici, à la fin du composant, en dehors du flux de la page. */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        plan={selectedPlan}
        currentCountry={(selectedCountry as Countries) || "dz"}
      />
    </div>
  );
}
