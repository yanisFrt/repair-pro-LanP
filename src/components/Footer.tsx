"use client";

import React from "react";
import { Twitter, Linkedin, Github } from "lucide-react";
import { useCountryDetection } from "@/hooks/useCountryDetection";
import { useTranslation } from "@/hooks/useTranslation";

export default function DynamicFooter() {
  const { country } = useCountryDetection();
  const { t } = useTranslation();
  const showCodesNovaLabel = country?.toLowerCase() === "dz";

  return (
    <footer className="bg-gray-800 text-slate-300 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-16">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/LOGO-V2-nobg.png"
                alt="Repair PRO Logo"
                width="64"
                height="64"
                className="w-16 h-16 object-contain"
                loading="lazy"
                decoding="async"
              />
              <span className="text-white font-semibold text-lg">Repair PRO</span>
            </div>
            <p className="text-sm text-slate-400 mb-6 leading-relaxed">
              {t("footer.tagline")}
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="bg-slate-800 hover:bg-slate-700 transition-colors rounded-lg p-2"
                aria-label="Suivez-nous sur Twitter"
                title="Suivez-nous sur Twitter"
              >
                <Twitter className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href="#"
                className="bg-slate-800 hover:bg-slate-700 transition-colors rounded-lg p-2"
                aria-label="Suivez-nous sur LinkedIn"
                title="Suivez-nous sur LinkedIn"
              >
                <Linkedin className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href="#"
                className="bg-slate-800 hover:bg-slate-700 transition-colors rounded-lg p-2"
                aria-label="Visitez notre GitHub"
                title="Visitez notre GitHub"
              >
                <Github className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t("footer.product")}</h3>
            <ul className="space-y-3">
              <li>
                <a href="/#features" className="text-sm hover:text-white transition-colors">
                  {t("footer.links.features")}
                </a>
              </li>
              <li>
                <a href="/#pricing" className="text-sm hover:text-white transition-colors">
                  {t("footer.links.pricing")}
                </a>
              </li>
              <li>
                <a href="/download" className="text-sm hover:text-white transition-colors">
                  {t("footer.links.downloads")}
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t("footer.company")}</h3>
            <ul className="space-y-3">
              <li>
                <a href="/#about" className="text-sm hover:text-white transition-colors">
                  {t("footer.links.about")}
                </a>
              </li>
              <li>
                <a href="/blog" className="text-sm hover:text-white transition-colors">
                  {t("footer.links.blog")}
                </a>
              </li>
              <li>
                <a href="/#contact" className="text-sm hover:text-white transition-colors">
                  {t("footer.links.contact")}
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t("footer.resources")}</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm hover:text-white transition-colors">
                  {t("footer.links.documentation")}
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-white transition-colors">
                  {t("footer.links.support")}
                </a>
              </li>
              <li>
                <a href="/status" className="text-sm hover:text-white transition-colors">
                  {t("footer.links.status")}
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t("footer.legal")}</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm hover:text-white transition-colors">
                  {t("footer.links.privacy")}
                </a>
              </li>
              <li>
                <a href="/terms" className="text-sm hover:text-white transition-colors">
                  {t("footer.links.terms")}
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-white transition-colors">
                  {t("footer.links.cookies")}
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-white transition-colors">
                  {t("footer.links.gdpr")}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-900/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-400">© 2025 Repair Pro. {t("footer.rights")}</p>

          {showCodesNovaLabel && (
            <p className="text-sm text-slate-400">
              {t("footer.createdBy")}{" "}
              <a
                href="https://codesnova.com/"
                target="__blank"
                className="text-white hover:underline duration-200 transition-all"
              >
                Codes Nova
              </a>
            </p>
          )}
        </div>
      </div>
    </footer>
  );
}
