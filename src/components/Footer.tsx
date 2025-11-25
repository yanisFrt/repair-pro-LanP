"use client";

import React from "react";
import { Twitter, Linkedin, Github } from "lucide-react";
import { useCountryDetection } from "@/hooks/useCountryDetection";

export default function DynamicFooter() {
  const { country } = useCountryDetection();
  const showCodesNovaLabel = country?.toLowerCase() === "dz";

  return (
    <footer className="bg-gray-800 text-slate-300 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-16">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-white text-slate-950 rounded-lg w-8 h-8 flex items-center justify-center font-bold text-sm">
                RP
              </div>
              <span className="text-white font-semibold text-lg">Repair PRO</span>
            </div>
            <p className="text-sm text-slate-400 mb-6 leading-relaxed">
              {"La plateforme moderne de gestion d'atelier de réparation conçue pour l'efficacité."}
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="bg-slate-800 hover:bg-slate-700 transition-colors rounded-lg p-2"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="bg-slate-800 hover:bg-slate-700 transition-colors rounded-lg p-2"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="bg-slate-800 hover:bg-slate-700 transition-colors rounded-lg p-2"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-white font-semibold mb-4">Produit</h3>
            <ul className="space-y-3">
              <li>
                <a href="/#features" className="text-sm hover:text-white transition-colors">
                  Fonctionnalitées
                </a>
              </li>
              <li>
                <a href="/#pricing" className="text-sm hover:text-white transition-colors">
                  Tarifs
                </a>
              </li>
              <li>
                <a href="/download" className="text-sm hover:text-white transition-colors">
                  Téléchargements
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">Entreprise</h3>
            <ul className="space-y-3">
              <li>
                <a href="/#about" className="text-sm hover:text-white transition-colors">
                  A propos
                </a>
              </li>
              <li>
                <a href="/blog" className="text-sm hover:text-white transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="/#contact" className="text-sm hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm hover:text-white transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-white transition-colors">
                  Support
                </a>
              </li>
              <li>
                <a href="/status" className="text-sm hover:text-white transition-colors">
                  {"Status"}
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm hover:text-white transition-colors">
                  {"Politique de confidentialité"}
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-white transition-colors">
                  {"Conditions d'utilisation"}
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-white transition-colors">
                  {"Politique des cookies"}
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-white transition-colors">
                  {"RGPD"}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-900/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-400">© 2025 Repair Pro. Tous droits réservés.</p>

          {showCodesNovaLabel && (
            <p className="text-sm text-slate-400">
              Créé
              {/* avec <span className="text-red-500">❤</span>  */} par{" "}
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
