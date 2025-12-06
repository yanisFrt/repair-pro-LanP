"use client";

import { CheckCircle, XCircle } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/contexts/LanguageContext";

export const ValuesSection = () => {
  const { t, tRaw } = useTranslation();
  const { direction } = useLanguage();

  const lifetimePoints = tRaw("values.lifetime.points") as string[] || [];
  const subscriptionPoints = tRaw("values.subscription.points") as string[] || [];

  return (
    <section id="value-comparison" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t("values.title")}
            <span className="block text-custom-teal mt-2">{t("values.titleHighlight")}</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            {t("values.subtitle")}
          </p>
        </div>
        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="bg-red-900/10 border border-red-500/50 rounded-2xl p-8 h-full flex flex-col">
            <h3 className="text-2xl font-bold text-white mb-4">
              {t("values.lifetime.title")}
            </h3>
            <ul className="space-y-4">
              {lifetimePoints.map((point, index) => (
                <li key={index} className={`flex items-start ${direction === "rtl" ? "flex-row-reverse" : ""}`}>
                  <XCircle className={`w-6 h-6 text-red-400 flex-shrink-0 mt-1 ${direction === "rtl" ? "ml-3" : "mr-3"}`} />
                  <span className="text-white/80">{point}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-custom-teal/10 border border-custom-teal/30 rounded-2xl p-8 h-full flex flex-col">
            <h3 className="text-2xl font-bold text-white mb-4">
              {t("values.subscription.title")}
            </h3>
            <ul className="space-y-4">
              {subscriptionPoints.map((point, index) => (
                <li key={index} className={`flex items-start ${direction === "rtl" ? "flex-row-reverse" : ""}`}>
                  <CheckCircle className={`w-6 h-6 text-custom-teal flex-shrink-0 mt-1 ${direction === "rtl" ? "ml-3" : "mr-3"}`} />
                  <span className="text-white/80">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
