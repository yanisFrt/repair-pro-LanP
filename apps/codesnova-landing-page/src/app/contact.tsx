"use client";
// biome-ignore lint/style/useImportType: <explanation>
import React, { useState, ChangeEvent, FormEvent } from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import Image from "next/image";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    console.log(`Changement dans le champ ${name}:`, value); // Log de chaque changement
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log("Données du formulaire soumises:", formData); // Log des données avant envoi

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log("Réponse du serveur:", res); // Log de la réponse du serveur

      if (res.ok) {
        alert("Votre message a été envoyé avec succès !");
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        const errorData = await res.json();
        console.log("Erreur lors de l'envoi du message:", errorData); // Log des erreurs renvoyées par l'API
        alert("Une erreur est survenue lors de l'envoi du message.");
      }
    } catch (error) {
      console.error("Erreur réseau ou interne:", error); // Log en cas de problème réseau ou interne
      alert("Une erreur est survenue.");
    }
  };

  return (
    <div className="flex w-full h-full bg-gradient-to-b from-slate-900 via-slate-950/50 to-slate-900">
      <section
        id="contact"
        className="max-w-5xl mx-auto my-32 p-8 backdrop-blur-lg bg-slate-900 rounded-lg shadow-lg grid md:grid-cols-2 gap-8"
      >
        {/* Section des informations de contact */}
        <div className="text-gray-200 space-y-6">
          <h2 className="text-3xl font-semibold mb-6">Nous contacter</h2>
          <div className="flex items-center space-x-4">
            <FaMapMarkerAlt className="text-custom-teal text-xl" />
            <a
              href="https://www.google.com/maps/place/Codes+Nova/@36.7025213,4.0614157,15z/data=!4m6!3m5!1s0x128dc905099c67ef:0x47263b929bf72b7!8m2!3d36.7025213!4d4.0614157!16s%2Fg%2F11jrmdtw1y?entry=ttu&g_ep=EgoyMDI0MTAwNS4yIKXMDSoASAFQAw%3D%3D"
              target="_blank" // Ouvre le lien dans un nouvel onglet
              rel="noopener noreferrer" // Sécurité pour ouvrir dans un nouvel onglet
              className="text-custom-teal " // Styles supplémentaires pour le lien
            >
              Imb makhkouf, Bd Krim Belkacem, Tizi Ouzou, Algerie
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <FaPhoneAlt className="text-custom-teal text-xl" />
            <p>+213 554 319 903</p>
          </div>
          <div className="flex items-center space-x-4">
            <FaEnvelope className="text-custom-teal text-xl" />
            <p>contact@codesnova.com</p>
          </div>
          <div className="items-center my-12">
            <Image
              src="/images/logolight.png"
              alt="logo codesnova"
              width={150}
              height={80}
              className="my-12"
            />
          </div>
        </div>

        {/* Formulaire de contact */}
        <div>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Input Name */}
            <div>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Votre Nom"
                className="w-full px-4 py-2 text-gray-100 bg-transparent border-0 border-b border-gray-600 focus:ring-0 focus:border-white placeholder-gray-400"
                required
              />
            </div>

            {/* Input Email */}
            <div>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Votre email"
                className="w-full px-4 py-2 text-gray-100 bg-transparent border-0 border-b border-gray-600 focus:ring-0 focus:border-white placeholder-gray-400"
                required
              />
            </div>

            {/* Input Subject */}
            <div>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Objet"
                className="w-full px-4 py-2 text-gray-100 bg-transparent border-0 border-b border-gray-600 focus:ring-0 focus:border-white placeholder-gray-400"
                required
              />
            </div>

            {/* Input Message */}
            <div>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Votre Message"
                rows={4}
                className="w-full px-4 py-2 text-gray-100 bg-transparent border-0 border-b border-gray-600 focus:ring-0 focus:border-white placeholder-gray-400"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="w-full py-3 px-6 bg-custom-teal text-white font-semibold rounded-lg hover:bg-custom-teal/50 transition duration-300"
              >
                Envoyer le message
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Contact;
