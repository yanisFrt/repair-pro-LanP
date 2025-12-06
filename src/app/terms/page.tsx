"use client";

import React, { useEffect } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { Shield, Calendar, Printer, Download } from "lucide-react";
import "./print.css";

// Metadata will be set in layout or this can be server component wrapper
export const dynamic = "force-dynamic";

export default function TermsOfUsePage() {
  const { t, tRaw, language } = useTranslation();
  const isRTL = language === "ar";

  // Set page title based on language
  useEffect(() => {
    const titles = {
      fr: "Conditions d'Utilisation - Repair Pro",
      en: "Terms of Use - Repair Pro",
      es: "Términos de Uso - Repair Pro",
      ar: "شروط الاستخدام - Repair Pro",
    };
    document.title = titles[language] || titles.fr;
  }, [language]);

  // Handle print
  const handlePrint = () => {
    window.print();
  };

  // Handle download as PDF (browser's print to PDF feature)
  const handleDownload = () => {
    window.print();
  };

  // Récupérer les sections des conditions d'utilisation
  const termsData = tRaw("terms");

  if (!termsData || !termsData.sections) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  const sections = termsData.sections;
  const sectionKeys = Object.keys(sections);

  return (
    <div className={`min-h-screen bg-custom-radial ${isRTL ? "rtl" : ""}`}>
      {/* Hero Section */}
      <div className="relative py-20 px-6 print:py-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-custom-teal/20 to-purple-500/20"></div>
        <div className="absolute inset-0 bg-grid-white/5"></div>
        <div className="relative max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6 justify-center">
            <Shield className="w-12 h-12 text-custom-teal" />
            <h1 className="text-4xl md:text-5xl font-bold text-white">{termsData.title}</h1>
          </div>
          <div className="flex items-center justify-center gap-2 text-white/70 mb-6">
            <Calendar className="w-5 h-5 text-custom-teal" />
            <p className="text-lg">
              {termsData.lastUpdated}: {termsData.effectiveDate}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center print:hidden">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-2 rounded-lg font-semibold hover:bg-white/20 transition-all"
            >
              <Printer className="w-5 h-5" />
              {language === "fr" && "Imprimer"}
              {language === "en" && "Print"}
              {language === "es" && "Imprimir"}
              {language === "ar" && "طباعة"}
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 bg-custom-teal/70 text-white px-6 py-2 rounded-lg font-semibold hover:bg-custom-teal/80 transition-all"
            >
              <Download className="w-5 h-5" />
              {language === "fr" && "Télécharger PDF"}
              {language === "en" && "Download PDF"}
              {language === "es" && "Descargar PDF"}
              {language === "ar" && "تحميل PDF"}
            </button>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Introduction */}
        <div className="bg-white/5 backdrop-blur-sm border-l-4 border-custom-teal p-6 rounded-r-lg mb-12">
          <p className="text-white/80 leading-relaxed">
            {t("terms.sections.acceptance.content")}
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-12">
          {sectionKeys.map((key, index) => {
            const section = sections[key];
            return (
              <section
                key={key}
                id={key}
                className="scroll-mt-20 transition-all duration-300 hover:translate-x-1"
              >
                {/* Section Title */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-custom-teal text-white rounded-full flex items-center justify-center font-bold text-lg">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-white mb-4">
                      {section.title}
                    </h2>
                    <div className="prose prose-lg max-w-none">
                      <p className="text-white/70 leading-relaxed whitespace-pre-line">
                        {section.content}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                {index < sectionKeys.length - 1 && (
                  <div className="mt-8 border-b border-white/10"></div>
                )}
              </section>
            );
          })}
        </div>

        {/* Footer CTA */}
        <div className="mt-16 bg-gradient-to-r from-custom-teal/20 to-purple-500/20 border border-white/20 backdrop-blur-sm text-white rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">
            {language === "fr" && "Des questions sur nos conditions ?"}
            {language === "en" && "Questions about our terms?"}
            {language === "es" && "¿Preguntas sobre nuestros términos?"}
            {language === "ar" && "أسئلة حول شروطنا؟"}
          </h3>
          <p className="text-white/70 mb-6">
            {language === "fr" &&
              "Notre équipe est là pour vous aider. Contactez-nous via email ou WhatsApp."}
            {language === "en" &&
              "Our team is here to help. Contact us via email or WhatsApp."}
            {language === "es" &&
              "Nuestro equipo está aquí para ayudar. Contáctenos por correo electrónico o WhatsApp."}
            {language === "ar" &&
              "فريقنا هنا للمساعدة. اتصل بنا عبر البريد الإلكتروني أو واتساب."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:support@repairpro.com"
              className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/20 transition-all"
            >
              support@repairpro.com
            </a>
            <a
              href="https://wa.me/213554319903"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-custom-teal/70 text-white px-6 py-3 rounded-lg font-semibold hover:bg-custom-teal/80 transition-all"
            >
              {language === "fr" && "WhatsApp Support"}
              {language === "en" && "WhatsApp Support"}
              {language === "es" && "Soporte WhatsApp"}
              {language === "ar" && "دعم واتساب"}
            </a>
          </div>
        </div>

        {/* Table of Contents - Sticky Sidebar for larger screens */}
        <aside className="hidden lg:block fixed top-24 right-8 w-64 bg-gray-900/80 backdrop-blur-sm border border-white/20 rounded-lg shadow-lg p-6 max-h-[calc(100vh-8rem)] overflow-y-auto">
          <h3 className="font-bold text-white mb-4 text-lg">
            {language === "fr" && "Sommaire"}
            {language === "en" && "Table of Contents"}
            {language === "es" && "Índice"}
            {language === "ar" && "جدول المحتويات"}
          </h3>
          <nav className="space-y-2">
            {sectionKeys.map((key, index) => {
              const section = sections[key];
              return (
                <a
                  key={key}
                  href={`#${key}`}
                  className="block text-sm text-white/70 hover:text-custom-teal hover:translate-x-1 transition-all duration-200 py-1"
                >
                  <span className="font-semibold">{index + 1}.</span>{" "}
                  {section.title.replace(/^\d+\.\s*/, "")}
                </a>
              );
            })}
          </nav>
        </aside>
      </div>

      {/* Back to Home */}
      <div className="max-w-4xl mx-auto px-6 pb-16">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-custom-teal hover:text-custom-teal/80 font-semibold transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          {language === "fr" && "Retour à l'accueil"}
          {language === "en" && "Back to Home"}
          {language === "es" && "Volver al inicio"}
          {language === "ar" && "العودة إلى الصفحة الرئيسية"}
        </a>
      </div>
    </div>
  );
}
