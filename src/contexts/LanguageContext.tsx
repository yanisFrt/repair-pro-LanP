"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export type Language = "fr" | "en" | "es" | "ar";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  direction: "ltr" | "rtl";
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>("fr");

  useEffect(() => {
    // Load language from localStorage on mount
    const savedLanguage = localStorage.getItem("language") as Language;
    if (savedLanguage && ["fr", "en", "es", "ar"].includes(savedLanguage)) {
      setLanguageState(savedLanguage);
    } else {
      // Detect browser language
      const browserLang = navigator.language.split("-")[0];
      if (browserLang === "ar") {
        setLanguageState("ar");
      } else if (browserLang === "en") {
        setLanguageState("en");
      } else if (browserLang === "es") {
        setLanguageState("es");
      }
    }
  }, []);

  useEffect(() => {
    // Update document direction for RTL languages
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
  };

  const direction = language === "ar" ? "rtl" : "ltr";

  return (
    <LanguageContext.Provider value={{ language, setLanguage, direction }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
