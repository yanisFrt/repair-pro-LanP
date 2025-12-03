// app/blog/page.tsx
import { Metadata } from "next";
import { Monitor, Smartphone, Apple } from "lucide-react";
import React from "react";
import { DownloadButton } from "@/components/DownloadButton";

// Composants d'icônes pour les plateformes
const WindowsIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
  </svg>
);

const LinuxIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.581 19.049c-.55-.446-.336-1.431-.907-1.917.553-3.365-.997-6.331-2.845-8.232-1.551-1.595-1.051-3.147-1.051-4.49 0-2.146-.881-4.41-3.55-4.41-2.853 0-3.635 2.38-3.663 3.738-.068 3.262.659 4.11-1.25 6.484-2.246 2.793-2.577 5.579-2.07 7.057-.237.276-.557.582-1.155.835-1.652.72-.441 1.925-.898 2.78-.13.243-.192.497-.192.74 0 .75.596 1.399 1.679 1.302 1.461-.13 2.809.905 3.681.905.77 0 1.402-.438 1.696-1.041 1.377-.339 3.077-.296 4.453.059.247.691.917 1.141 1.662 1.141 1.631 0 1.945-1.849 3.816-2.475.674-.225 1.013-.879 1.013-1.488 0-.39-.139-.761-.419-.988zM11.434 2.714c.483 0 .875.438.875 1.071 0 .633-.392 1.071-.875 1.071-.483 0-.875-.438-.875-1.071 0-.633.392-1.071.875-1.071zm-2.264 1.071c0-.633.392-1.071.875-1.071.483 0 .875.438.875 1.071 0 .633-.392 1.071-.875 1.071-.483 0-.875-.438-.875-1.071zm8.022 12.331c-.069.008-.135.019-.202.031-2.045-.138-3.566-.495-5.107-.495-1.637 0-3.238.33-5.435.495a1.101 1.101 0 0 1-.203-.031c-.868-.11-1.354-.856-1.354-1.837 0-.817.395-1.707 1.094-2.426.7-.719 1.648-1.125 2.594-1.125 1.042 0 2.007.457 2.638 1.251.631-.794 1.596-1.251 2.638-1.251.946 0 1.894.406 2.594 1.125.699.719 1.094 1.609 1.094 2.426 0 .981-.486 1.727-1.354 1.837z" />
  </svg>
);

// SEO Metadata
export const metadata: Metadata = {
  title: "Repair PRO - Télécharger l&apos;Application de Gestion d&apos;Atelier",
  description:
    "Téléchargez notre application Repair PRO pour gérer efficacement votre atelier de réparation de téléphones. Solutions innovantes pour la maintenance et l&apos;économie circulaire.",
  keywords:
    "Repair PRO, application réparation, gestion atelier, réparation smartphone, économie circulaire",
  openGraph: {
    title: "Repair PRO - Télécharger l&apos;Application",
    description:
      "Téléchargez l&apos;application Repair PRO pour optimiser la gestion de votre atelier de réparation.",
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
    icon: <WindowsIcon className="w-8 h-8" />,
    title: "Windows x64 Bit",
    description: "Télécharger la version x64 pour windows. Compatible avec windows 11.",
    link: "https://cdn.repair-pro.cloud-db.pro/download/latest/windows",
    size: "~18 MB",
  },
  {
    enabled: true,
    platform: "linux",
    icon: <LinuxIcon className="w-8 h-8" />,
    title: "Linux",
    description:
      "Télécharger la version x64 pour Linux. Compatible avec les distributions récentes.",
    link: "#",
    size: "~18 MB",
  },
  {
    enabled: false,
    platform: "android",
    icon: <Smartphone className="w-8 h-8" />,
    title: "Android (Bientôt disponible)",
    description: "Télécharger la version Android. Compatible avec les appareils récents.",
    link: "#",
    size: "0 mb",
  },
  {
    enabled: false,
    platform: "ios",
    icon: <Apple className="w-8 h-8" />,
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
              d&apos;exploitation.
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
                    <DownloadButton link={feature.link} name={feature.platform} />
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
                  <li>• 100 Mo d&apos;espace disque disponible</li>
                  <li>• .NET Framework 4.8 ou version ultérieure</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Linux</h3>
                <ul className="space-y-1 text-sm">
                  <li>• Ubuntu 18.04+, Fedora 35+, Debian 11+</li>
                  <li>• 4 Go de RAM minimum</li>
                  <li>• 100 Mo d&apos;espace disque disponible</li>
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
