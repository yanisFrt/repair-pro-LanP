"use client";
import { useState, useEffect, useMemo } from "react";

const TranslucentButton = ({ title, onClick, bold, className }) => (
  <button
    type="button"
    onClick={onClick}
    className={`px-8 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:border-white/40 ${bold ? "font-semibold" : ""} ${className}`}
  >
    {title}
  </button>
);

const StarField = () => {
  const stars = useMemo(
    () =>
      Array.from({ length: 100 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 2,
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white animate-pulse"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDuration: `${star.duration}s`,
            animationDelay: `${star.delay}s`,
            opacity: 0.6,
          }}
        />
      ))}
    </div>
  );
};

const FloatingParticles = () => {
  const particles = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        duration: Math.random() * 20 + 10,
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-blue-400/30 blur-sm"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animation: `float ${particle.duration}s infinite ease-in-out`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) translateX(0px);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(-10px) translateX(-10px);
          }
          75% {
            transform: translateY(-30px) translateX(5px);
          }
        }
      `}</style>
    </div>
  );
};

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    aboutSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative bg-gradient-to-b from-slate-950 via-blue-950 to-slate-900 to-100% h-screen flex flex-col items-center justify-center overflow-hidden">
      <StarField />
      <FloatingParticles />

      {/* <div className="absolute w-screen h-[100vh] contrast-200 brightness-50 opacity-15  bg-supernova bg-cover bg-center" /> */}

      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/20 rounded-full blur-3xl animate-pulse" />
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-500/20 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      />

      <div
        className="w-full h-full flex items-center justify-center relative z-10 transition-transform duration-300 ease-out"
        style={{
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
        }}
      >
        <div
          className={
            "text-center mt-10 sm:mt-16 px-4 transition-all duration-1000 opacity-100 translate-y-0 select-none"
          }
        >
          <p className="text-blue-300/80 font-light text-sm sm:text-base md:text-lg mb-2 tracking-widest animate-pulse">
            <span className="mr-8 hidden md:inline-block">إنشاء، ابتكار، تطوير</span>
            ⵙⵏⵓⵍⴼⵓ ⵙⵏⴻⵔⵏⵉ ⵙ ⵛoⴷⴻⵙ ⵏovⴰ
          </p>

          <p className="block md:hidden text-blue-300/80 font-light text-sm sm:text-base md:text-lg mb-6 tracking-widest animate-pulse">
            إنشاء، ابتكار، تطوير
          </p>

          <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-purple-200 text-2xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight sm:leading-snug md:leading-normal lg:leading-80px tracking-wide font-bold mb-2 drop-shadow-2xl animate-fade-in text-center">
            Créer, Innover, Développer
          </h1>

          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-7xl leading-tight sm:leading-snug md:leading-normal lg:leading-80px tracking-wider font-extrabold landscape:mb-10 mb-28 mt-4 drop-shadow-2xl">
            avec{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-custom-teal to-custom-teal/80">
              Codes Nova
            </span>
          </h1>

          <div className="relative inline-block">
            {/* <div className="absolute inset-0 bg-green-500/30 blur-xl rounded-full" /> */}
            <TranslucentButton
              title="Explorez notre expertise"
              onClick={scrollToAbout}
              bold
              className="relative"
            />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 hidden md:block transform -translate-x-1/2 animate-bounce z-10">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
    </div>
  );
}
