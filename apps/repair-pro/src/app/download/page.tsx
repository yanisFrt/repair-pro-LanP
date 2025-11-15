// app/blog/page.tsx
import { Metadata } from "next";
import { Monitor, Smartphone } from "lucide-react";
import React from "react";
import { LiaLinux } from "react-icons/lia";
import { FaWindows } from "react-icons/fa6";
import { BsAndroid, BsApple } from "react-icons/bs";

// SEO Metadata
export const metadata: Metadata = {
  title: "Repair PRO - Télécharger l'Application de Gestion d'Atelier",
  description:
    "Téléchargez notre application Repair PRO pour gérer efficacement votre atelier de réparation de téléphones. Solutions innovantes pour la maintenance et l'économie circulaire.",
  keywords:
    "Repair PRO, application réparation, gestion atelier, réparation smartphone, économie circulaire",
  openGraph: {
    title: "Repair PRO - Télécharger l'Application",
    description:
      "Téléchargez l'application Repair PRO pour optimiser la gestion de votre atelier de réparation.",
    type: "website",
    locale: "fr_FR",
  },
  alternates: {
    canonical: "https://repair-pro.tech/download",
    languages: {
      "fr-FR": "https://repair-pro.tech/download",
    },
  },
};

const platforms = [
  {
    enabled: true,
    platform: "windows",
    icon: <FaWindows className="w-8 h-8" />,
    title: "Windows x64 Bit",
    description: "Télécharger la version x64 pour windows. Compatible avec windows 11.",
    link: "https://cdn.repair-pro.cloud-db.pro/download/latest/windows",
    size: "~18 MB",
  },
  {
    enabled: true,
    platform: "linux",
    icon: <LiaLinux className="w-8 h-8" />,
    title: "Linux",
    description:
      "Télécharger la version x64 pour Linux. Compatible avec les distributions récentes.",
    link: "#",
    size: "~18 MB",
  },
  {
    enabled: false,
    platform: "android",
    icon: <BsAndroid className="w-8 h-8" />,
    title: "Android (Bientôt disponible)",
    description: "Télécharger la version Android. Compatible avec les appareils récents.",
    link: "#",
    size: "0 mb",
  },
  {
    enabled: false,
    platform: "ios",
    icon: <BsApple className="w-8 h-8" />,
    title: "iOS (Non disponible)",
    description: "La version iOS n'est pas encore disponible. Nous travaillons à sa mise en place.",
    link: "#",
    size: "0 mb",
  },
];

export default function BlogPage() {
  return (
    <div>
      <main className="min-h-screen bg-slate-900">
        {/* Hero Section */}
        <section className="flex flex-col bg-gradient-to-br  from-slate-900 via-slate-800 to-slate-900 text-white pt-40 pb-10 px-6">
          <div className="flex flex-col max-w-4xl mx-auto text-center">
            <h1 className="text-2xl md:text-6xl font-bold mb-6">Téléchargements Logiciel</h1>
            <p className="md:text-xl text-slate-300 max-w-2xl mx-auto">
              Vous pouvez télécharger la dernière version de Repair PRO pour votre système
              d'exploitation.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mt-12">
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
        </section>

        <div className="flex flex-col items-center justify-center mx-auto w-[90%] md:w-[80%] py-[2%]">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {platforms.map((feature, index) => (
              <div
                key={index}
                className={`bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:border-custom-teal/50 transition-all duration-300  ${feature.enabled ? "hover:-translate-y-1" : ""}`}
              >
                <div className="inline-block p-3 bg-custom-teal/10 rounded-lg border border-custom-teal/30 mb-4">
                  {React.cloneElement(feature.icon, { className: "w-8 h-8 text-custom-teal" })}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-white/70 leading-relaxed">{feature.description}</p>

                {feature.enabled ? (
                  <div className="mt-4 flex flex-row items-center">
                    <span className="text-gray-400 text-sm flex flex-1">{`Taille: ${feature.size}`}</span>
                    <a
                      href={feature.link}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-custom-teal/70 hover:bg-custom-teal/60 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-custom-teal transition-colors"
                    >
                      Télécharger
                    </a>
                  </div>
                ) : (
                  <div className="mt-6 flex flex-row items-center justify-center">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-700 text-gray-300">
                      Bientôt Disponible
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="h-[2px] w-full my-10 bg-custom-teal/20 items-center rounded-lg" />

          <div className="flex flex-col w-full bg-white/10 rounded-2xl p-8 border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-4">Exigences système</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-300">
              <div>
                <h3 className="font-semibold text-white mb-2">Windows</h3>
                <ul className="space-y-1 text-sm">
                  <li>• Windows 10/11 (64-bit)</li>
                  <li>• 4 Go de RAM minimum</li>
                  <li>• 100 Mo d'espace disque disponible</li>
                  <li>• .NET Framework 4.8 ou version ultérieure</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Linux</h3>
                <ul className="space-y-1 text-sm">
                  <li>• Ubuntu 18.04+, Fedora 35+, Debian 11+</li>
                  <li>• 4 Go de RAM minimum</li>
                  <li>• 100 Mo d'espace disque disponible</li>
                  <li>• GLIBC 2.27 ou version ultérieure</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="my-8 text-center text-gray-400">
            <p>
              Vous recherchez une autre plateforme ? Revenez bientôt car nous continuons à étendre
              notre support.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
