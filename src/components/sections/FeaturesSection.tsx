"use client";

import React from "react";
import { useTranslation } from "@/hooks/useTranslation";

export const FeaturesSection = ({
  features,
}: {
  features: {
    icon: React.JSX.Element;
    title: string;
    description: string;
  }[];
}) => {
  const { t } = useTranslation();

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/5 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            {t("features.title")}
            <span className="block text-custom-teal mt-2">{t("features.titleHighlight")}</span>
          </h2>
          <p className="md:text-xl text-white/70 max-w-3xl mx-auto">
            {t("features.subtitle")}
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:border-custom-teal/50 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="inline-block p-3 bg-custom-teal/10 rounded-lg border border-custom-teal/30 mb-4">
                {React.cloneElement(feature.icon, { className: "w-8 h-8 text-custom-teal" })}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-white/70 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
