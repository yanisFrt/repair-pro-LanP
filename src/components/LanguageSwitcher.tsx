"use client";

import { useLanguage, type Language } from "@/contexts/LanguageContext";
import { Globe } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const languages = [
  { code: "fr" as Language, name: "Français", flag: "🇫🇷" },
  { code: "en" as Language, name: "English", flag: "🇺🇸" },
  { code: "es" as Language, name: "Español", flag: "🇪🇸" },
  { code: "ar" as Language, name: "العربية", flag: "ar" },
];

export const LanguageSwitcher = () => {
  const { language, setLanguage, direction } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentLanguage = languages.find((lang) => lang.code === language);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors text-white"
        aria-label="Select language"
      >
        <Globe className="w-5 h-5" />
        <span className="text-lg">{currentLanguage?.flag}</span>
        <span className="hidden sm:inline text-sm font-medium">{currentLanguage?.name}</span>
      </button>

      {isOpen && (
        <div
          className="absolute top-full mt-2 w-44 sm:w-48 bg-gray-900 rounded-lg shadow-xl border border-gray-700 py-2 z-50"
          style={direction === "rtl" ? { left: 0 } : { right: 0 }}
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code);
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 hover:bg-white/10 transition-colors text-white ${
                language === lang.code ? "bg-white/5" : ""
              }`}
            >
              <span className="text-lg sm:text-xl">{lang.flag}</span>
              <span className="text-xs sm:text-sm font-medium">{lang.name}</span>
              {language === lang.code && (
                <span className={direction === "rtl" ? "mr-auto" : "ml-auto"} style={{ color: "#14b8a6" }}>✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
