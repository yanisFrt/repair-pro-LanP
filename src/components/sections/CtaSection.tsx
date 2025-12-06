"use client";

import { LifeBuoy, Users } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

export const CTASection = ({ scrollTo }: { scrollTo: (target: string) => void }) => {
  const { t } = useTranslation();

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/5 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
          {t("cta.title")}
          <span className="block text-custom-teal mt-2">{t("cta.titleHighlight")}</span>
        </h2>
        <p className="md:text-xl text-white/80 mb-8">
          {t("cta.subtitle")}
        </p>
        <button
          onClick={() => scrollTo("pricing")}
          className="px-10 py-4 text-lg text-white bg-custom-teal/60 rounded-full hover:bg-custom-teal/90 transition-all transform hover:scale-105"
        >
          {t("cta.button")}
        </button>
      </div>
      <div className="mt-12 mx-auto md:flex md:flex-row grid grid-cols-2 items-center justify-center md:gap-8 text-white/60">
        <div className="flex flex-col items-center gap-y-2 md:gap-x-2">
          <LifeBuoy />
          <p className="font-bold mx-1 text-center">{t("cta.supportIncluded")}</p>
        </div>
        <div className="flex flex-col items-center gap-y-2 md:gap-x-2">
          <Users />
          <p className="font-bold mx-1 text-center">{t("cta.happyClients")}</p>
        </div>
      </div>
    </section>
  );
};
