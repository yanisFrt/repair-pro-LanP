/* eslint-disable */

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, Loader2Icon } from "lucide-react";
import type { CustomerError, CustomerInfo } from "@/app/PaymentModal";
import { GenerateReadableRef } from "@/utils/hash";
import { isEmailValid, isPhoneNumber } from "@/utils/utils";
import { useSubmitPayment } from "@/hooks/usePayment";
import { CiWarning } from "react-icons/ci";

const ContactModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {

  const FREE_PLAN = {
    name: "free",
    price: 0,
    paymentMethod: "free",
  };

  const [orderReference, setRefOrder] = useState(`RP-${GenerateReadableRef(8)}`);
  const [phoneValid, setPhoneValid] = useState(true);
  const [isFormCompleted, setFormCompleted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: "",
    email: "",
    phone: "",
    businessName: "",
  });

  const [customerError, setCustomerError] = useState<CustomerError>({
    name: {
      error: false,
      message: ""
    },
    email: {
      error: false,
      message: ""
    },
    phone: {
      error: false,
      message: ""
    },
    businessName: {
      error: false,
      message: ""
    },
  });

  const { submitPayment, loading: isLoading, error, response } = useSubmitPayment();

  const backdropVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  const modalVariants = {
    hidden: {
      // y: "-100vh",
      opacity: 0,
      scale: 0.5,
    },
    visible: {
      // y: "0",
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        type: "spring" as const,
        damping: 25,
        stiffness: 500,
      },
    },
    exit: {
      // y: "100vh",
      opacity: 0,
      scale: 0.5,
      transition: {
        duration: 0.3,
      },
    },
  };

  const cleanForms = (close?: boolean) => {
    setFormCompleted(false);
    setCustomerInfo({
      name: "",
      email: "",
      phone: "",
      businessName: "",
    });
    if (close)
      onClose?.();
    setErrorMessage("");
    setPhoneValid(false);
  };

  useEffect(() => {
    if (isOpen) {
      setRefOrder(`RP-${GenerateReadableRef(8)}`);
      cleanForms(false);

      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
      cleanForms(true);
    }
    return () => document.body.classList.remove("modal-open");
  }, [isOpen]);


  useEffect(() => {
    setCustomerError((prev) => ({
      ...prev,
      name: {
        error: customerInfo.name?.length < 3,
        message: "Veuillez saisir votre nom."
      },
      email: {
        error: !isEmailValid(customerInfo.email),
        message: "Veuillez saisir un email valide."
      },
      phone: {
        error: !isPhoneNumber(customerInfo.phone),
        message: "Veuillez saisir un numéro de téléphone valide."
      },
    }));
  }, [customerInfo])

  const handleCustomerSubmit = async (e) => {
    e.preventDefault();

    if (!customerInfo.email || !customerInfo.name || !customerInfo.phone) return;

    setFormCompleted(true);
    await submitPayment(
      customerInfo,
      orderReference,
      FREE_PLAN.name,
      FREE_PLAN.price,
      FREE_PLAN.paymentMethod
    );


  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 backdrop-blur-sm justify-center bg-black/30 bg-opacity-50 flex items-center p-4 z-50"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
          >
            {!isFormCompleted ? (
              <motion.div
                className="bg-gray-900 text-white rounded-2xl shadow-2xl max-w-md w-full mx-4 relative overflow-hidden"
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="px-6 py-4">
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex flex-col items-center justify-center text-center">
                      <h2 className="text-2xl font-bold text-center w-full">Repair Pro</h2>
                      <p className="text-white/50 w-[80%] my-2">
                        {"Veuillez renseigner vos informations pour accéder au logiciel."}
                      </p>
                    </div>
                    <motion.button
                      onClick={onClose}
                      className="p-1 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors duration-200"
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <X size={24} />
                    </motion.button>
                  </div>
                  {/* <p className="text-black mt-2">{"Appelez-nous pour avoir plus d'informations"}</p> */}
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                  <form onSubmit={handleCustomerSubmit} className="space-y-4">
                    {["name", "email", "phone", "businessName"].map((field, idx) => (
                      <motion.div
                        key={field}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * idx }}
                      >
                        <label className="block text-sm font-semibold text-white/70 mb-2">
                          {field === "name" && "Nom complet *"}
                          {field === "email" && "Email *"}
                          {field === "phone" && "Téléphone *"}
                          {field === "businessName" && "Nom entreprise"}
                        </label>
                        <input
                          type={field === "email" ? "email" : field === "phone" ? "tel" : "text"}
                          required={field !== "businessName"}
                          value={customerInfo[field]}
                          onChange={(e) => {
                            setCustomerInfo({
                              ...customerInfo,
                              [field]: e.target.value,
                            });
                            if (field === "phone") {
                              const isValid = isPhoneNumber(e.target.value);
                              setPhoneValid(isValid);
                              setErrorMessage(isValid ? "" : "Numéro de téléphone invalide");
                            }
                          }}
                          className={`w-full px-4 py-3 border border-gray-300/60 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-gray-400/50 text-white ${customerError[field]?.error && "border-red-500"
                            }`}
                          placeholder={
                            field === "name"
                              ? "Ex: Ahmed Benali"
                              : field === "email"
                                ? "contact@codesnova.com"
                                : field === "phone"
                                  ? "0555 12 34 56"
                                  : "Ex: Mobile Repair Pro"
                          }
                        />
                        {customerError[field]?.error && (
                          <p className="text-red-500">{customerError[field]?.message}</p>
                        )}
                      </motion.div>
                    ))}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="flex gap-4 pt-4"
                    >
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        // type="submit"
                        onClick={handleCustomerSubmit}
                        // disabled={!phoneValid}
                        className={`flex-1 py-3  text-white rounded-lg font-semibold  transition ${customerInfo.name && customerInfo.phone && customerInfo.email
                          ? "bg-custom-teal"
                          : "bg-gray-700 text-white/40" //"hover:bg-gray-700/80"
                          }`

                        }
                      >
                        Confirmer
                      </motion.button>
                    </motion.div>
                  </form>
                </div>

                {/* Footer */}
                <motion.div
                  className="bg-gray-900/80 px-6 py-4 border-t border-gray-700"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <p className="text-white/80 text-sm text-center">
                    Un mail vous sera envoyé contenant les instructions.
                  </p>
                </motion.div>
              </motion.div>
            ) : isLoading ? (
              <motion.div
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={(e) => e.stopPropagation()}
                className="bg-gray-900 text-white rounded-2xl shadow-2xl max-w-md w-full mx-4 relative overflow-hidden"
              >
                <div className="p-8 text-center flex items-center flex-col">
                  <Loader2Icon className="animate-spin" size={40} />
                  <p className="font-bold mt-4">{"Chargement..."}</p>
                </div>
              </motion.div>
            ) : !response?.success ? (
              <motion.div
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={(e) => e.stopPropagation()}
                className="bg-gray-900 text-white rounded-2xl shadow-2xl max-w-md w-full mx-4 relative overflow-hidden"
              >
                <div className="flex flex-col items-center justify-center text-center py-4 gap-y-4">
                  <CiWarning className="text-red-500" size={50} />
                  <p>{"Une erreur est survenue. Veuillez réessayez."}</p>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleCustomerSubmit}
                    className="flex-1 py-3 px-4 bg-custom-teal/80 text-white rounded-lg font-semibold hover:bg-custom-teal/80"
                  >
                    Réessayer
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                className="bg-gray-900 text-white rounded-2xl shadow-2xl max-w-md w-full mx-4 relative overflow-hidden"
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="px-6">
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex flex-col items-center justify-center text-center">
                      <h2 className="text-2xl font-bold text-center w-full">Repair Pro</h2>
                      <p className="text-white/50 w-[80%] my-2">
                        {"Un mail vous a été envoyé contenant les instructions."}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                  <div className="text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        damping: 15,
                        stiffness: 300,
                        delay: 0.2,
                      }}
                      className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                      <CheckCircle className="w-12 h-12 text-green-600" />
                    </motion.div>

                    <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-3xl font-bold text-white/90 mb-2"
                    >
                      Demande confirmée
                    </motion.h2>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="text-white/60 mb-6"
                    >
                      Nous avons bien reçu votre demande, veuillez verifier votre boite email pour
                      poursuivre.
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="bg-gray-50/10 border border-blue-200 rounded-lg p-6 mb-6"
                    >
                      <div className="space-y-3 text-left">
                        <div className="flex justify-between">
                          <span className="text-white/60">Référence:</span>
                          <span className="font-mono font-bold">{orderReference}</span>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-white/60">Votre Email :</span>
                          <span className="font-mono font-bold">{customerInfo.email}</span>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className="flex gap-4"
                    >
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={(() => cleanForms(true))}
                        className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2"
                      >
                        J'ai compris
                      </motion.button>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ContactModal;
