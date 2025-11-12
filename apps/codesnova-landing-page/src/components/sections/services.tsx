import { Card } from "../cards/card";

export default function ServicesCards() {
  const steps = [
    {
      number: "01",
      title: "Stratégie",
      description:
        "Nous aidons nos clients à définir des stratégies numériques solides, basées sur une analyse approfondie du marché et de la concurrence. Nos recommandations sont alignées sur vos objectifs à long terme pour maximiser les opportunités de croissance et d'innovation.",
      icon: "/images/strategy.png",
    },
    {
      number: "02",
      title: "Design",
      description:
        "Notre équipe de designers élabore des solutions visuelles uniques qui allient esthétique et fonctionnalité. Nous mettons un point d'honneur à créer des expériences utilisateur intuitives et engageantes, en veillant à ce que chaque interaction renforce l'identité de votre marque.",
      icon: "/images/design.png",
    },
    {
      number: "03",
      title: "Développement",
      description:
        "Nos développeurs maîtrisent les technologies les plus récentes pour offrir des solutions robustes et évolutives. Que ce soit pour des sites web, des applications mobiles ou des plateformes complexes, nous construisons des infrastructures performantes et sécurisées.",
      icon: "/images/dev.png",
    },
  ];

  return (
    <section>
      <div className="max-w-6xl">
        <div className="grid grid-cols-1 group pointer-events-none md:pointer-events-auto w-full md:grid-cols-2 xl:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <Card
              key={`demarche_card_${index}`}
              title={step.title}
              description={step.description}
              image={`${step.icon}`}
              color={"white"}
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
