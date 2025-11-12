"use client";

import { TranslucentButton } from "@/components/TranslucentButton";
import { BrowserComponent } from "@/components/browser";
import DemarcheCards from "@/components/demarches";
import ServicesCards from "@/components/sections/services";
import ValuesCards from "@/components/sections/values";
import { Smartphone } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FaLinux, FaMoneyBill1Wave } from "react-icons/fa6";
import { IoLogoWindows } from "react-icons/io";

export default function About() {
  const [activeTab, setActiveTab] = useState("about");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const aboutRef = useRef(null);
  const valuesRef = useRef(null);
  const servicesRef = useRef(null);
  const demarchesRef = useRef(null);
  const projetsRef = useRef(null);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    section?.scrollIntoView({ behavior: "smooth" });
    setActiveTab(sectionId);
  };

  useEffect(() => {
    const hash = window.location.hash;
    if (hash === "#about") {
      setActiveTab("about");
      scrollToSection("about");
    }

    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 10,
        y: (e.clientY / window.innerHeight - 0.5) * 10,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const sectionRefs = [
      { id: "about", ref: aboutRef },
      { id: "values", ref: valuesRef },
      { id: "services", ref: servicesRef },
      { id: "demarches", ref: demarchesRef },
      { id: "projets", ref: projetsRef },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        // biome-ignore lint/complexity/noForEach: <explanation>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveTab(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-50% 0px -50% 0px",
        threshold: 0,
      }
    );

    // biome-ignore lint/complexity/noForEach: <explanation>
    sectionRefs.forEach(({ ref }) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      // biome-ignore lint/complexity/noForEach: <explanation>
      sectionRefs.forEach(({ ref }) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);

  return (
    <div className="h-full w-screen lg:w-full flex flex-col-reverse lg:flex-row gap-0 relative bg-gradient-to-b from-slate-900 via-slate-950/50 to-slate-900">
      <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse pointer-events-none -z-10" />

      <div
        className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse pointer-events-none -z-10"
        style={{ animationDelay: "1s" }}
      />

      <div
        className="w-full lg:w-4/5 h-full overflow-scroll md:overflow-hidden flex flex-col lg:flex-col  snap-x snap-mandatory  shadow-2xl transition-transform duration-300 ease-out"
        style={{
          transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
        }}
      >
        <section
          id="about"
          ref={aboutRef}
          className="min-w-full lg:min-h-screen flex flex-col justify-start lg:justify-center snap-end px-4 mt-8 relative"
        >
          <div className="flex flex-col-reverse lg:flex-row items-center w-full lg:max-w-5xl mx-auto lg:gap-16 opacity-0 animate-fade-in-up">
            <div className="w-full lg:w-1/3 mb-6 lg:mb-0 relative">
              <div className="absolute inset-0 bg-cyan-500/20 blur-2xl rounded-full" />
              <Image
                src="/images/langage.png"
                alt="Langage"
                width={500}
                height={500}
                priority={true}
                className="max-w-[50%] mx-auto lg:max-w-full h-auto object-cover relative z-10 drop-shadow-2xl hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="w-full lg:w-2/3 p-4 text-white">
              <div className="flex sm:flex-row justify-between border-b border-b-custom-teal/40 pb-2 mb-6">
                <h1 className="text-xl sm:text-2xl font-medium text-transparent bg-clip-text  bg-custom-teal ">
                  Qui sommes-nous ?
                </h1>
                <h1 className="text-lg sm:text-2xl font-medium text-custom-teal/30">ⴼⴻⵍⵍⴰⵖ</h1>
              </div>
              <p className="text-sm sm:text-base md:text-lg font-light leading-relaxed backdrop-blur-sm bg-white/5 p-4 rounded-lg border border-white/10 hover:border-custom-teal/30 transition-colors duration-300 text-justify">
                Codes Nova est une jeune entreprise de développement fondée en 2020 par une équipe
                de jeunes développeurs passionnés. En tant que start-up en pleine croissance, nous
                sommes engagés à apprendre, innover, et offrir des solutions créatives malgré notre
                expérience encore limitée. Notre objectif est de développer des compétences solides
                et d&apos;évoluer rapidement dans le secteur technologique en offrant des services
                de qualité et adaptés aux besoins de nos clients.
              </p>
            </div>
          </div>
        </section>

        {/* Section Nos valeurs */}
        <section
          id="values"
          ref={valuesRef}
          className="min-w-full lg:min-h-screen flex flex-col justify-center snap-start xl:my-8 relative"
        >
          <div
            className="flex flex-col items-center justify-center w-4/5 mx-auto lg:gap-2 xl:gap-8 md:gap-16 opacity-0 animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="flex sm:flex-row items-center w-full justify-between border-b border-b-cyan-400/40 pb-2">
              <h1 className="text-xl sm:text-2xl font-medium text-transparent bg-clip-text bg-custom-teal">
                Nos valeurs
              </h1>
              <h1 className="text-lg sm:text-2xl font-medium text-custom-teal/30">ⴰⵣⴰⵍⴻⵏⵏⵏⴻⵖ</h1>
            </div>
            <div className="flex flex-col md:flex-row w-full justify-center gap-4 md:gap-7 mb-4 mt-6 sm:mt-8 md:mt-9">
              <ValuesCards />
            </div>
          </div>
        </section>

        {/* Section Nos services */}
        <section
          id="services"
          ref={servicesRef}
          className="min-w-full lg:min-h-screen flex flex-col justify-center snap-start my-8 relative"
        >
          <div
            className="flex flex-col md:items-start items-center justify-center w-4/5 mx-auto md:gap-8 lg:gap-4 xl:gap-8 opacity-0 animate-fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="flex sm:flex-row items-center w-full justify-between border-b border-b-custom-teal/40 pb-2">
              <h1 className="text-xl sm:text-2xl font-medium text-transparent bg-clip-text bg-custom-teal">
                Nos services
              </h1>
              <h1 className="text-lg sm:text-2xl font-medium text-custom-teal/30">ⵉⵎⴻⵥⵍⴰⵏⵏⴻⵖ</h1>
            </div>
            <p className="text-sm my-4 lg:my-0 xl:text-base font-normal md:text-left text-justify text-white/90">
              Nous offrons à nos clients la meilleure expérience digitale afin de leur proposer des
              services de qualité.
            </p>
            <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-8">
              <ServicesCards />
            </div>
          </div>
        </section>

        {/* Section Nos démarches */}
        <section
          id="demarches"
          ref={demarchesRef}
          className="min-w-full lg:min-h-screen flex flex-col justify-center snap-start my-8 relative"
        >
          <div
            className="flex flex-col items-center justify-center w-4/5 mx-auto gap-8 opacity-0 animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="flex sm:flex-row items-center w-full justify-between border-b border-b-custom-teal/40 lg:pt-4 xl:pt-0 pb-2">
              <h1 className="text-xl sm:text-2xl font-semibold text-transparent bg-clip-text bg-custom-teal">
                Notre démarche
              </h1>
              <h1 className="text-lg sm:text-2xl font-semibold text-custom-teal/30">ⵜⵉⴽⵍⵉⵏⵏⴻⵖ</h1>
            </div>
            <div className="w-full">
              <div className="w-full flex flex-col">
                <DemarcheCards />
              </div>
            </div>
          </div>
        </section>

        {/* Section Nos projets */}
        <section
          id="projets"
          ref={projetsRef}
          className="min-w-full lg:min-h-screen flex flex-col justify-start snap-start py-8 relative"
        >
          <div
            className="flex flex-col items-center justify-center mx-auto h-full opacity-0 animate-fade-in-up"
            style={{ animationDelay: "0.5s" }}
          >
            <div className="flex w-[80%] sm:flex-row items-center justify-between border-b border-b-custom-teal/40 lg:pt-4 xl:pt-0 pb-2">
              <h1 className="text-xl sm:text-2xl font-semibold text-transparent bg-clip-text bg-custom-teal">
                Nos projets
              </h1>
              <h1 className="text-lg sm:text-2xl font-normal text-custom-teal/30">ⵉⵙⴻⵏⴼⴰⵔⴻⵏⵏⵏⴻⵖ</h1>
            </div>
            <div className="flex flex-col items-center overflow-y-auto">
              <div className="flex flex-col md:flex-row w-[80%] mx-auto">
                <div className="flex flex-col md:flex-row mt-6 xl:mt-24 justify-center backdrop-blur-sm bg-white/5 p-6 rounded-lg border border-white/10 hover:border-custom-teal/30 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20 overflow-hidden">
                  <div className="flex flex-col">
                    <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-custom-teal w-full mb-6">
                      DISPOO
                    </h2>

                    <p className="text-gray-200 text-sm md:text-base text-justify w-full mb-4">
                      Dispoo est une application qui facilite la prise de rendez-vous entre clients
                      et prestataires de services. Que vous soyez un particulier à la recherche
                      d&apos;un expert ou un professionnel souhaitant organiser vos disponibilités,
                      cette plateforme vous permet de gérer facilement vos échanges et plannings.
                      Avec une interface intuitive, elle garantit une connexion rapide et efficace
                      pour répondre aux besoins de chacun, tout en optimisant la gestion du temps
                      pour les deux parties.
                    </p>

                    <TranslucentButton
                      title="En Savoir Plus"
                      link="https://dispoo.pro/"
                      className={"mt-2 py-2 md:py-4"}
                    />

                    <div className="flex-1" />

                    <div className="md:flex hidden flex-row gap-x-4 mt-6 md:mt-0">
                      <div className="flex items-center w-fit gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20 opacity-60">
                        <Smartphone className="w-5 h-5 text-green-400" />
                        <span className="text-white">Android</span>
                      </div>

                      <div className="flex items-center w-fit gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20 opacity-60">
                        <FaMoneyBill1Wave className="w-5 h-5 text-blue-400" />
                        <span className="text-white">Gratuit</span>
                      </div>
                    </div>
                  </div>

                  <Image
                    src="/images/dispoo_showcase.png"
                    alt="App Client"
                    width={250}
                    height={250}
                    className="w-[400px] md:mr-14 items-end self-end mt-12 drop-shadow-2xl  transition-transform duration-300 -z-10"
                    // priority={true}
                  />

                  <div className="flex md:hidden flex-row gap-x-4 mt-6 md:mt-0">
                    <div className="flex items-center w-fit gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20 opacity-60">
                      <Smartphone className="w-5 h-5 text-green-400" />
                      <span className="text-white text-sm md:text-base">Android</span>
                    </div>

                    <div className="flex items-center w-fit gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20 opacity-60">
                      <FaMoneyBill1Wave className="w-5 h-5 text-blue-400" />
                      <span className="text-white text-sm md:text-base">Gratuit</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col md:flex-row w-[80%] md:mx-auto mt-8">
                <div className="flex flex-col mt-6 xl:mt-24 justify-center  backdrop-blur-sm bg-white/5 p-6 rounded-lg border border-white/10 hover:border-custom-teal/30 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20">
                  <div>
                    <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-custom-teal w-full mb-4">
                      REPAIR PRO
                    </h2>

                    <p className="text-gray-200 text-sm md:text-base text-justify w-full mb-4">
                      {
                        "Maîtrisez vos interventions ! Gérez efficacement vos réparations, stock, clients et factures. Générez des tickets, des factures et des bons de commande en un clic. Optimisez votre activité avec REPAIR - PRO."
                      }
                    </p>
                    <TranslucentButton
                      title="En Savoir Plus"
                      link="/repair-pro"
                      className={"mt-2 py-2 md:py-4"}
                    />
                  </div>

                  <BrowserComponent />

                  <div className="flex flex-row gap-x-4 mt-10">
                    <div className="flex items-center w-fit gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20 opacity-60">
                      <IoLogoWindows className="w-5 h-5 text-blue-400" />
                      <span className="text-white text-sm md:text-base">Windows</span>
                    </div>

                    <div className="flex items-center w-fit gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20 opacity-60">
                      <FaLinux className="w-5 h-5 text-white" />
                      <span className="text-white text-sm md:text-base">Linux</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <aside className="w-full lg:w-1/5 h-screen lg:overflow-hidden sticky top-0 hidden lg:flex-col lg:flex justify-center z-20 mt-4">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950/50 to-slate-900 pointer-events-none" />
        <Tab
          label="À propos"
          isActive={activeTab === "about"}
          onClick={() => scrollToSection("about")}
        />
        <Tab
          label="Nos valeurs"
          isActive={activeTab === "values"}
          onClick={() => scrollToSection("values")}
        />
        <Tab
          label="Nos services"
          isActive={activeTab === "services"}
          onClick={() => scrollToSection("services")}
        />
        <Tab
          label="Notre démarche"
          isActive={activeTab === "demarches"}
          onClick={() => scrollToSection("demarches")}
        />
        <Tab
          label="Nos projets"
          isActive={activeTab === "projets"}
          onClick={() => scrollToSection("projets")}
        />
      </aside>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

function Tab({ label, isActive, onClick }) {
  return (
    <div
      onKeyDown={onClick}
      onClick={onClick}
      className="flex items-center cursor-pointer group relative my-4"
    >
      {/* <div className={`absolute inset-0 bg-cyan-500/10 blur-xl rounded-full transition-opacity duration-300 ${isActive ? &apos;opacity-100&apos; : &apos;opacity-0 group-hover:opacity-50&apos;}`} /> */}

      <span
        className={`w-[50%] lg:w-[80%] xl:w-[60%] duration-300 transition-all relative z-10 select-none text-sm md:text-base ${
          isActive
            ? "lg:shadow-lg text-white bg-custom-teal/80 backdrop-blur-md rounded-tl-3xl rounded-tr-3xl lg:rounded-tr-3xl lg:rounded-br-3xl lg:rounded-tl-none py-3 pl-10 border-custom-teal/20 font-bold"
            : "text-white/40 font-semibold hover:text-custom-teal px-5 lg:hover:px-10 py-3 hover:bg-white/5 rounded-lg"
        }`}
      >
        {label}
      </span>
    </div>
  );
}
