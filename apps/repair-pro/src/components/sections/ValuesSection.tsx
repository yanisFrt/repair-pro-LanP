import { CheckCircle, XCircle } from "lucide-react";

export const ValuesSection = () => {
  return (
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
                <span className="text-white/80">Support technique lent, payant ou inexistant.</span>
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
                <span className="text-white/80">Un outil qui grandit avec vous, sans surcoût.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
