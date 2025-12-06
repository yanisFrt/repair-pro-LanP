"use client";

import { ChevronDown } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

export const FAQSection = ({
  faqs,
  toggleFaq,
  decodeHtml,
  openFaq,
}: {
  faqs: {
    question: string;
    answer: string;
  }[];
  toggleFaq: (index: number) => void;
  decodeHtml: (text: string) => string;
  openFaq: number | null;
}) => {
  const { t } = useTranslation();

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            {t("faq.title")}
            <span className="block text-custom-teal mt-2">{t("faq.titleHighlight")}</span>
          </h2>
          <p className="md:text-xl text-white/70 max-w-3xl mx-auto">
            {t("faq.subtitle")}
          </p>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white/10 border border-white/20 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex justify-between items-center p-6 text-left"
              >
                <h3 className="md:text-lg font-semibold text-white"> {decodeHtml(faq.question)}</h3>
                <span>
                  <ChevronDown
                    className={`w-6 h-6 text-custom-teal transition-transform duration-300 ${openFaq === index ? "rotate-180" : ""}`}
                  />
                </span>
              </button>
              <div
                className={`transition-all duration-500 ease-in-out ${openFaq === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
              >
                <p className="text-white/80 p-6 pt-0 text-justify">{decodeHtml(faq.answer)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
