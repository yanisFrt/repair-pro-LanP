"use client";

import { AnimatePresence, motion, Variants } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const ConfirmationModalPopup = () => {
  const searchParams = useSearchParams();

  const reference = searchParams.get("reference");

  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!searchParams) return null;

  useEffect(() => {
    if (reference && reference.length > 5) {
      setIsModalOpen(true);
    }
  }, [reference]);

  const closeModal = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete("reference");
    window.history.replaceState({}, "", url);
    setIsModalOpen(false);
  };

  const modalVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 50,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.2,
      },
    },
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          key="backdrop"
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={backdropVariants}
          onClick={closeModal}
        >
          <motion.div
            key="modal-content"
            className="bg-gray-900 text-white/80 p-6 max-w-screen-md rounded-lg shadow-lg text-center relative"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4 select-none">Commande Confirmé !</h2>
            <p className="select-none">{"Nous avons bien reçu votre paiement."}</p>
            <p className="mb-4 select-none">
              {"Veuillez vérifier votre boîte de réception pour plus d'instructions."}
            </p>
            <p className="mb-4 select-none">
              La référence de paiement est:
              <span className="p-2 rounded-lg bg-gray-600/20 mx-2 select-text">{reference}</span>
            </p>
            <button
              onClick={closeModal}
              className="bg-custom-teal text-white px-4 py-2 rounded duration-200 transition-colors hover:bg-custom-teal/40"
            >
              Compris
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
