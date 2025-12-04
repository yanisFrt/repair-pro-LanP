import { LifeBuoy, Users } from "lucide-react";
import { TranslucentButton } from "../TranslucentButton";

export const FreeVersionSection = ({
  setContactUsOpen,
}: {
  setContactUsOpen: (value: React.SetStateAction<boolean>) => void;
}) => {
  return (
    <section id="free-version" className="py-20 px-4 sm:px-6 lg:px-8 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto text-center items-center justify-center">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
          Vous hésitez encore?
          <span className="block text-custom-teal">Tester une Version&nbsp;Gratuite</span>
        </h2>

        <p className="md:text-xl text-white/80 mb-8 max-w-3xl mx-auto">
          Profitez d’une version gratuite avec des fonctionnalités de base pour tester et gérer vos
          réparations sans frais.
        </p>

        <div className="mt-12 items-center justify-center flex">
          <TranslucentButton onClick={() => setContactUsOpen(true)}>
            <span>{"Essayer la version gratuite"}</span>
          </TranslucentButton>
        </div>
        {/* <div className="mt-12 mx-auto md:flex md:flex-row grid grid-cols-2 items-center justify-center md:gap-8 text-white/60">
          <div className="flex flex-col items-center gap-y-2 md:gap-x-2">
            <LifeBuoy />
            <p className="font-bold mx-1 text-center">Support Inclus</p>
          </div>
          <div className="flex flex-col items-center gap-y-2 md:gap-x-2">
            <Users />
            <p className="font-bold mx-1 text-center">200+ Clients Satisfaits</p>
          </div>
        </div> */}
      </div>
    </section>
  );
};
