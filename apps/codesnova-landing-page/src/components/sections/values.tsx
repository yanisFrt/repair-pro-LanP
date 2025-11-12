import { Card } from "../cards/card";
// import TeamSvg from "../../../public/svg/team.svg";

const steps = [
  {
    number: "01",
    title: "Équipe jeune et dynamique",
    description:
      "Nous croyons au potentiel des jeunes talents. Notre équipe est composée de développeurs passionnés et motivés, prêts à relever les défis avec enthousiasme.",
    icon: "/svg/team.svg",
  },
  {
    number: "02",
    title: "Maintien et suivi",
    description:
      "Chez Codes Nova, notre engagement ne s'arrête pas à la livraison. Nous assurons un suivi rigoureux pour garantir le succès à long terme des solutions que nous implémentons.",
    icon: "/svg/box.svg",
  },
  {
    number: "03",
    title: "Expertise et innovation",
    description:
      "Nous privilégions l'innovation et l'efficacité pour répondre aux attentes variées de nos clients, assurant des résultats optimisés et parfaitement adaptés à leurs besoins spécifiques.",
    icon: "/images/solutionspersonnalise.png",
  },
  {
    number: "04",
    title: "Qualité et fiabilité",
    description:
      "Nous nous engageons à fournir des services de haute qualité, en respectant les délais et les normes, afin de gagner la confiance de nos clients.",
    icon: "/images/maintien.png",
  },
  {
    number: "05",
    title: "Solutions personalisées",
    description:
      "Nous comprenons que chaque client a des besoins uniques. C'est pourquoi nous nous efforçons de proposer des solutions sur mesure, parfaitement adaptées à leurs attentes.",
    icon: "/images/fiabilite.png",
  },
  {
    number: "06",
    title: "Communication transparente",
    description:
      "La transparence est au cœur de nos relations. Nous croyons qu'une communication ouverte et honnête est essentielle pour bâtir des partenariats solides et durables.",
    icon: "/images/communication.png",
  },
];

export default function ValuesCards() {
  return (
    <section>
      <div className="max-w-6xl ">
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
