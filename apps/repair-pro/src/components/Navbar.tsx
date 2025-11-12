"use client";
import Image from "next/image";

export const NavBar = () => {
  const scrollTo = (target: string) => {
    const aboutSection = document.getElementById(target);
    aboutSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="sticky top-2 z-50 mx-auto w-fit max-w-7xl px-4">
      <nav className="rounded-full items-center flex flex-row p-4 border border-gray-100/35 bg-white/25 shadow-black/2 shadow-sm backdrop-blur-sm">
        <a href="/" className="mx-8">
          <Image
            src="/images/logolight.png"
            alt="logo codesnova"
            width={80}
            height={80}
            className=""
          />
        </a>

        <div className=" mx-auto flex flex-row gap-x-6 text-white text-xs sm:text-sm md:text-base">
          <a href="/#about" className="cursor-pointer">
            {"A Propos"}
          </a>
          <a href="/#contact" onKeyDown={() => scrollTo("contact")} className="cursor-pointer">
            {"Nous contacter"}
          </a>
        </div>
      </nav>
    </div>
  );
};
