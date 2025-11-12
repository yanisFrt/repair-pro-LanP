// import Image from "next/image";
import { Card } from "./cards/card";

export default function DemarcheCards() {
  const steps = [
    {
      number: "01",
      title: "Analyse des besoins",
      description:
        "Nous identifions les objectifs, les utilisateurs et les contraintes du projet pour poser des bases solides.",
      icon: "analyse.svg",
    },
    {
      number: "02",
      title: "Conception",
      description:
        "Nous structurons l’architecture fonctionnelle, les parcours utilisateurs et les maquettes interactives.",
      icon: "conception.png",
    },
    {
      number: "03",
      title: "Design",
      description:
        "Nous concevons une interface esthétique, intuitive et alignée avec votre image de marque.",
      icon: "designer.png",
    },
    {
      number: "04",
      title: "Développement",
      description:
        "Nous transformons les maquettes en applications performantes, sécurisées et évolutives.",
      icon: "code.png",
    },
    {
      number: "05",
      title: "Test",
      description:
        "Nous validons chaque fonctionnalité pour garantir qualité, performance et satisfaction utilisateur.",
      icon: "validate.png",
    },
  ];

  return (
    <section>
      <div className="max-w-6xl ">
        <div className="grid grid-cols-1 group pointer-events-none md:pointer-events-auto w-full md:grid-cols-2 xl:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <Card
              key={`demarche_card_${index}`}
              title={step.title}
              description={step.description}
              image={`/svg/${step.icon}`}
            />
          ))}
          <style jsx>{`
            .group:has(.card:hover) .card {
              filter: blur(2px);
              opacity: 0.8;
              transform: scale(0.95);
            }

            .group:has(.card:hover) .card:hover {
              filter: none;
              opacity: 1;
              transform: scale(1.05);
            }
          `}</style>
        </div>
      </div>
    </section>
  );
}
