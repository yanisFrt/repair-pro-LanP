"use client";

import { TranslucentButton } from "../TranslucentButton";
import { useTranslation } from "@/hooks/useTranslation";

export const FreeVersionSection = ({
  setContactUsOpen,
}: {
  setContactUsOpen: (value: React.SetStateAction<boolean>) => void;
}) => {
  const { t } = useTranslation();

  return (
    <section id="free-version" className="py-20 px-4 sm:px-6 lg:px-8 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto text-center items-center justify-center">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
          {t("freeVersion.title")}
          <span className="block text-custom-teal">{t("freeVersion.titleHighlight")}</span>
        </h2>

        <p className="md:text-xl text-white/80 mb-8 max-w-3xl mx-auto">
          {t("freeVersion.subtitle")}
        </p>

        <div className="mt-12 items-center justify-center flex">
          <TranslucentButton onClick={() => setContactUsOpen(true)}>
            <span>{t("freeVersion.button")}</span>
          </TranslucentButton>
        </div>
      </div>
    </section>
  );
};
