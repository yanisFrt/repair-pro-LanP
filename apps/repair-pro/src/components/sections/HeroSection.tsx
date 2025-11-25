import { HandCoins, Monitor, Smartphone } from "lucide-react";
import { TranslucentButton } from "../TranslucentButton";

export const HeroSection = ({ scrollTo }: { scrollTo: (target: string) => void }) => {
  return (
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
  );
};
