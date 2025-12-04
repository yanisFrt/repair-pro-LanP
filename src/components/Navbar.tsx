"use client";

import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useGtagEvent } from "@/hooks/useGTagEvent";
import { CLICK_LOCATIONS } from "@/utils/analytics";

export const NavBar = () => {
  const pathname = usePathname();
  const isRoot = pathname === "/";

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const trackEvent = useGtagEvent();

  const navItems = [
    { name: "Acceuil", href: "/", target: "#" },
    { name: "Fonctionnalitées", href: "/#features", target: "features" },
    { name: "Tarifs", href: "/#pricing", target: "pricing" },
    { name: "Blog", href: "/blog", target: null },
    { name: "Téléchargements", href: "/download", target: null },
  ];

  const scrollTo = (target: string) => {
    trackEvent(CLICK_LOCATIONS.navbar, {
      page_title: `NavBar ScrollTo Page ${target}`,
    });
    const section = document.getElementById(target);
    section?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav className="bg-[#111827] border-b border-[#1f2937] px-4 py-3">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <a href="/" className="flex items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/LOGO-V2-nobg.png"
                alt="Repair PRO Logo"
                className="w-16 h-16 object-contain"
              />
              <span className="text-white font-semibold text-lg">Repair PRO</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              if (isRoot && item.target)
                return (
                  <p
                    key={item.name}
                    onClick={() => scrollTo(item.target)}
                    className={`
                    transition-colors duration-200 font-medium cursor-pointer
                  ${item.href === pathname ? "text-custom-teal" : "text-gray-300 hover:text-[#6abbb2]"} 
                  `}
                  >
                    {item.name}
                  </p>
                );

              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={`
                    transition-colors duration-200 font-medium
                  ${item.href === pathname ? "text-custom-teal" : "text-gray-300 hover:text-[#6abbb2]"} 
                  `}
                >
                  {item.name}
                </a>
              );
            })}
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-300 hover:text-[#6abbb2] transition-colors duration-200"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden mt-4 py-4 border-t border-[#1f2937]"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-gray-300 hover:text-[#6abbb2] transition-colors duration-200 font-medium py-2 px-4 rounded-lg hover:bg-[#1d2432]"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};
