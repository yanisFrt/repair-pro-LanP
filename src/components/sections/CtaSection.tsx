import { LifeBuoy, Users } from "lucide-react";

export const CTASection = ({ scrollTo }: { scrollTo: (target: string) => void }) => {
  // <section className="py-20 px-4 sm:px-6 lg:px-8 backdrop-blur-sm">
  {
    /* bg-white/5 backdrop-blur-sm */
  }
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/5 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
          Prêt à Choisir la Tranquillité ?
          <span className="block text-custom-teal mt-2">Rejoignez les Pros</span>
        </h2>
        <p className="md:text-xl text-white/80 mb-8">
          Rejoignez la communauté des réparateurs qui ont choisi un partenaire de croissance plutôt
          qu&apos;un simple outil.
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
  );
};
