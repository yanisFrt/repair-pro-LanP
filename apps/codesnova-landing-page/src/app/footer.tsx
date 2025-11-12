import React from "react";
import { FaFacebook, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Section de gauche */}
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-bold md:text-left text-center">Codes Nova</h2>
            <p className="mt-2 md:text-left text-center">
              Développé avec passion par l&apos;équipe de Codes Nova
            </p>
          </div>

          {/* Section des liens sociaux */}
          <div className="flex space-x-6">
            <a
              href="https://www.facebook.com/share/12Hr65azQLE/"
              className="text-gray-100 hover:text-gray-400"
              aria-label="Facebook"
            >
              <FaFacebook size={24} />
            </a>

            <a
              href="https://www.linkedin.com/company/codesnova/?viewAsMember=true"
              className="text-gray-100 hover:text-gray-400"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>

        {/* Ligne de séparation */}
        <hr className="my-6 border-gray-700" />

        {/* Section de bas de page */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">© {new Date().getFullYear()} All rights reserved.</p>
          {/* <div className="text-gray-400">
            <a href="/privacy" className="hover:text-gray-300">
              Privacy Policy
            </a>
            <span className="mx-2">|</span>
            <a href="/terms" className="hover:text-gray-300">
              Terms of Service
            </a>
          </div> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
