"use client";

import { StepsCardCash } from "@/components/StepsCardCash";
import { useSubmitPayment } from "@/hooks/usePayment";
import { type Plan } from "@/utils/features";
import { isPhoneNumber } from "@/utils/utils";
import { AnimatePresence, type Variants, motion } from "framer-motion";
import {
  AlertCircle,
  Check,
  CheckCircle,
  Clock,
  Copy,
  Loader2Icon,
  MessageCircle,
  QrCode,
  Download,
  Upload,
} from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import { BiLock } from "react-icons/bi";
import { CiWarning } from "react-icons/ci";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { GenerateReadableRef } from "@/utils/hash";
import { checkUserExists } from "@/utils/api";


const PAYMENT_CONFIG = {
  baridiMob: {
    qrCodeUrl: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Example",
    rip: "00799999002373591467",
    accountName: "HAMADACHE LYZA",
  },
  ccp: {
    accountNumber: "0023735914",
    key: "67",
    accountName: "HAMADACHE LYZA",
  },
  office: {
    address: "Alger Centre, Algérie",
    hours: "Dim-Jeu: 9h-17h",
  },
  contact: {
    phone: "+213 554 31 99 03",
    whatsapp: "213554319903",
    email: "contact@codesnova.com",
    paymentEmail: "paiement@codesnova.com",
  },
};

const paymentMethods = [
  {
    id: "baridimob",
    name: "BaridiMob",
    icon: "📱",
    description: "Paiement instantané par mobile",
    duration: "Instantané",
    recommended: true,
    isDisabled: true,
  },
  {
    id: "ccp",
    name: "Virement CCP",
    icon: "🏦",
    description: "Virement compte postal",
    duration: "24-48h",
    isDisabled: false,
  },
  {
    id: "cheque",
    name: "Chèque",
    icon: "📝",
    description: "Paiement par chèque bancaire",
    duration: "2-3 jours",
    isDisabled: true,
  },
  {
    id: "cash",
    name: "Espèces",
    icon: "💵",
    description: "Paiement en main propre",
    duration: "Immédiat",
    isDisabled: false,
  },
  {
    id: "stripe",
    name: "Stripe (En Ligne)",
    icon: "💳",
    description: "Paiement instantané et securisé",
    duration: "Immédiat",
    isDisabled: false,
  },
];

// --- ANIMATIONS ---
const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

const dialogVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", damping: 25, stiffness: 300, duration: 0.3 },
  },
  exit: { opacity: 0, scale: 0.95, y: 10, transition: { duration: 0.2 } },
};

const slideVariants: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", damping: 20, stiffness: 300 },
  },
  exit: { opacity: 0, x: -50, transition: { duration: 0.2 } },
};

export type CustomerInfo = {
  name: string;
  email: string;
  phone: string;
  businessName: string;
};

export type CustomerError = {
  name: {
    error: boolean;
    message?: string;
  };
  email: {
    error: boolean;
    message?: string;
  };
  phone: {
    error: boolean;
    message?: string;
  };
  businessName: {
    error: boolean;
    message?: string;
  };
};

type PaymentMethod = (typeof paymentMethods)[0];

// Définition des props que le composant attend
type PaymentModalProps = {
  isOpen: boolean;
  onClose: () => void;
  plan: Plan | null;
  currentCountry: "dz" | "fr";
};

const PaymentModal = ({
  isOpen,
  onClose,
  plan: selectedPlan,
  currentCountry,
}: PaymentModalProps) => {
  const [step, setStep] = useState<"customer" | "payment" | "upload" | "confirmation">("customer");
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: "",
    email: "",
    phone: "",
    businessName: "",
  });
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null);
  const [orderReference, setRefOrder] = useState("");
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [phoneValid, setPhoneValid] = useState(true);
  const [isUserCheckingLoading, setUserCheckingLoading] = useState(false);
  const [isStripeLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { submitPayment, loading: isLoading, response } = useSubmitPayment();

  useEffect(() => {
    if (isOpen) {
      setRefOrder(`RP-${GenerateReadableRef(8)}`);
      setStep("customer");
      setPaymentMethod(null);
      setCustomerInfo({ name: "", email: "", phone: "", businessName: "" });
      setProofFile(null);
      setPhoneValid(true);
      setErrorMessage("");
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleCustomerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setUserCheckingLoading(true);

      const isUserExist = await checkUserExists(customerInfo.email);

      if (isUserExist) {
        toast.error(`L'utilisateur ${customerInfo.email} existe déja !`)
        return;
      }
    } catch (error) {
      toast.error(`Une erreur est survenur lors de l'opération.`)
      return;
    } finally {

      setUserCheckingLoading(false)
    }


    if (!phoneValid || !customerInfo.name || !customerInfo.email || !customerInfo.phone) return;
    if (currentCountry.toLowerCase() === "fr") {
      setPaymentMethod(paymentMethods.filter((i) => i.id === "stripe")[0]);
      setStep("upload");
      return;
    }
    setStep("payment");
  };

  const handlePaymentMethodSelect = (method: PaymentMethod) => {
    if (method.isDisabled) return;

    setPaymentMethod(method);

    setStep("upload");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.size <= 5 * 1024 * 1024) {
      setProofFile(file);
    } else if (file) {
      toast.error("Le fichier est trop volumineux (max 5MB).");
    }
  };

  const handleSubmitProof = async () => {
    if (!selectedPlan) return;
    if (!customerInfo.name || !customerInfo.email) {
      setStep("customer");
      return;
    }
    if (!paymentMethod) {
      setStep("payment");
      return;
    }

    if (
      !proofFile &&
      paymentMethod.id !== "cash" &&
      paymentMethod.id !== "ccp" &&
      paymentMethod.id !== "stripe"
    ) {
      setStep("upload");
      return;
    }

    setStep("confirmation");
    try {
      const result = await submitPayment(
        customerInfo,
        orderReference,
        selectedPlan.name,
        selectedPlan.price,
        paymentMethod.id,
        proofFile ?? undefined
      );

      if (paymentMethod.id === "stripe") {
        window.open((result as any)?.url, "_blank");
      }
    } catch (error) {
      toast.error("Une erreur est survenue lors de l'opération.");
      setStep("upload");
    }
  };

  const sendToWhatsApp = () => {
    if (!selectedPlan) return;
    const message = `Bonjour, je souhaite commander le ${selectedPlan.name}. Référence: ${orderReference}`;
    window.open(
      `https://wa.me/${PAYMENT_CONFIG.contact.whatsapp}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  if (!selectedPlan) {
    return null;
  }

  const generateCcpPdf = () => {
    if (!selectedPlan || !customerInfo) {
      toast.error("Les informations de la commande sont manquantes.");
      return;
    }

    const doc = new jsPDF();
    const paymentEmail = PAYMENT_CONFIG.contact.paymentEmail;
    const whatsappLink = `https://wa.me/${PAYMENT_CONFIG.contact.whatsapp}`;
    const pageHeight = doc.internal.pageSize.getHeight();
    const pageWidth = doc.internal.pageSize.getWidth();

    // --- EN-TÊTE ---
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("Instructions de Paiement", pageWidth / 2, 20, { align: "center" });
    doc.setFontSize(14);
    doc.text("Virement CCP", pageWidth / 2, 28, { align: "center" });

    // --- INTRODUCTION ---
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text(`Bonjour ${customerInfo.name},`, 14, 45);
    doc.text(
      "Veuillez trouver ci-dessous les détails pour finaliser votre commande. Conservez ce document précieusement.",
      14,
      52,
      { maxWidth: pageWidth - 28 }
    );

    // --- TABLEAU DES COORDONNÉES BANCAIRES ---
    autoTable(doc, {
      startY: 62,
      head: [["Information", "Détail"]],
      // CORRECTION ICI : La structure du body est maintenant un simple tableau de tableaux.
      body: [
        ["Référence de commande (Obligatoire)", orderReference],
        ["Plan sélectionné", selectedPlan.name],
        ["Montant à payer", `${selectedPlan.price} DA`],
        ["Bénéficiaire", PAYMENT_CONFIG.ccp.accountName],
        ["Numéro de compte CCP", PAYMENT_CONFIG.ccp.accountNumber],
        ["Clé", PAYMENT_CONFIG.ccp.key],
      ],
      theme: "grid",
      headStyles: { fillColor: [13, 148, 136] }, // Votre couleur custom-teal
      // HOOK DE STYLE SIMPLIFIÉ ET CORRECT : Applique le style à la première ligne (index 0).
      didParseCell: (data) => {
        if (data.row.index === 0) {
          data.cell.styles.fontStyle = "bold";
          data.cell.styles.fillColor = "#f2f2f2"; // Un gris clair pour la mise en évidence
          data.cell.styles.textColor = "#333333"; // Texte plus foncé pour le contraste
        }
      },
    });

    // Le reste de la fonction reste identique car il est déjà bien structuré.
    let currentY = (doc as any).lastAutoTable.finalY + 15;

    // --- PROCHAINES ÉTAPES ---
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("Prochaines Étapes Cruciales", 14, currentY);
    currentY += 8;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);

    doc.text(
      "1. Effectuez le virement du montant exact en utilisant les coordonnées ci-dessus.",
      14,
      currentY,
      { maxWidth: pageWidth - 28 }
    );
    currentY += 10;

    const step2Text = `2. IMPORTANT : Incluez votre référence de commande "${orderReference}" dans le libellé ou le motif du virement. C'est essentiel pour que nous puissions lier votre paiement à votre commande.`;
    const splitStep2 = doc.splitTextToSize(step2Text, pageWidth - 28);
    doc.text(splitStep2, 14, currentY);
    currentY += splitStep2.length * 4 + 6;

    doc.text(
      "3. Une fois le virement effectué, envoyez une preuve (photo, capture d'écran du reçu) à l'un des contacts suivants :",
      14,
      currentY,
      { maxWidth: pageWidth - 28 }
    );
    currentY += 8;

    autoTable(doc, {
      startY: currentY,
      body: [
        ["Email", paymentEmail],
        ["WhatsApp", PAYMENT_CONFIG.contact.phone],
      ],
      theme: "plain",
      styles: { fontSize: 10, cellPadding: 1 },
      columnStyles: { 0: { fontStyle: "bold" } },
    });

    currentY = (doc as any).lastAutoTable.finalY + 6;

    doc.text(
      "Pour plus de facilité, vous pouvez nous contacter directement via ce lien :",
      14,
      currentY
    );
    currentY += 5;
    doc.setTextColor(40, 100, 245);
    doc.textWithLink("Ouvrir la discussion WhatsApp", 14, currentY, { url: whatsappLink });
    doc.setTextColor(0, 0, 0);
    currentY += 10;

    doc.setFont("helvetica", "normal");
    doc.text(
      "4. Votre commande sera activée dès la validation de votre paiement par notre équipe (généralement sous 24h à 48h).",
      14,
      currentY,
      { maxWidth: pageWidth - 28 }
    );

    // --- PIED DE PAGE ---
    doc.setLineCap(2);
    doc.setDrawColor(200, 200, 200);
    doc.line(14, pageHeight - 20, pageWidth - 14, pageHeight - 20);
    doc.setFontSize(9);
    doc.setTextColor(150);
    doc.text("Merci pour votre confiance.", 14, pageHeight - 12);
    doc.text("CodesNova Services", pageWidth - 14, pageHeight - 12, { align: "right" });

    // --- SAUVEGARDE ---
    doc.save(`Instructions_Paiement_RepairPro_CCP_${orderReference}.pdf`);
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            key="modal-content"
            variants={dialogVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg bg-gray-900/80 border border-gray-950 p-6 text-white shadow-xl"
          >
            {/* ÉTAPE CLIENT */}
            {step === "customer" && (
              <motion.div
                key="customer"
                variants={slideVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <h2 className="text-2xl font-bold text-white mb-2">Vos informations</h2>
                <p>
                  Plan sélectionné : <strong>{selectedPlan.name}</strong> - {selectedPlan.price} {selectedPlan.currency}
                </p>
                <p className="text-sm text-white/50 mt-1">
                  Référence: <span className="font-mono font-semibold">{orderReference}</span>
                </p>
                <form onSubmit={handleCustomerSubmit} className="space-y-4 mt-6">
                  {(["name", "email", "phone", "businessName"] as const).map((field) => (
                    <div key={field}>
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
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-400/50 text-white ${!phoneValid && field === "phone" ? "border-red-500" : "border-gray-300/60"
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
                      {!phoneValid && field === "phone" && (
                        <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
                      )}
                    </div>
                  ))}
                  <div className="flex gap-4 pt-4">
                    <button
                      type="button"
                      onClick={onClose}
                      className="flex-1 py-3 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-700 transition"
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      disabled={
                        !phoneValid ||
                        !customerInfo.name ||
                        !customerInfo.email ||
                        !customerInfo.phone ||
                        isUserCheckingLoading
                      }
                      className={`flex flex-1 py-3 rounded-lg items-center justify-center font-semibold transition ${!phoneValid || !customerInfo.name || !customerInfo.email || !customerInfo.phone || isUserCheckingLoading ? "bg-custom-teal/20 text-white/40 cursor-not-allowed " : "bg-custom-teal text-white hover:bg-custom-teal/80"}`}
                    >
                      {isUserCheckingLoading ? <Loader2Icon className="animate-spin self-center" /> : "Continuer"}

                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* ÉTAPE PAIEMENT */}
            {step === "payment" && (
              <motion.div
                key="payment"
                variants={slideVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <h2 className="text-2xl font-bold text-white/90 mb-2">
                  Choisissez votre méthode de paiement
                </h2>
                <p className="text-white/60">
                  Montant à payer:{" "}
                  <strong className="text-custom-teal text-2xl">{selectedPlan.price} DA</strong>
                </p>
                <div className="grid md:grid-cols-2 gap-4 my-6">
                  {paymentMethods.map((method, idx) => (
                    <motion.button
                      key={method.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.1 }}
                      whileHover={!method.isDisabled ? { scale: 1.03, y: -3 } : {}}
                      whileTap={{ scale: 0.98 }}
                      disabled={method.isDisabled}
                      onClick={() => handlePaymentMethodSelect(method)}
                      className={`relative p-6 border-2 rounded-xl text-left transition-colors ${method.recommended ? "border-custom-teal bg-custom-teal/5 shadow-lg" : "border-gray-500 hover:border-gray-400"} ${method.isDisabled ? "text-white/50 cursor-not-allowed bg-gray-500/10" : "hover:bg-gray-500/10"}`}
                    >
                      {method.recommended && (
                        <div className="absolute top-0 right-0 bg-custom-teal text-white px-3 py-1 text-xs rounded-bl-lg rounded-tr-lg font-bold">
                          RECOMMANDÉ
                        </div>
                      )}
                      <div className="flex items-start gap-4">
                        <div className="text-4xl">{method.icon}</div>
                        <div className="flex-1">
                          <h3 className="font-bold text-lg mb-1">{method.name}</h3>
                          <p className="text-sm text-white/60 mb-2">{method.description}</p>
                          {method.isDisabled ? (
                            <div className="flex items-center gap-2 text-sm">
                              <BiLock className="w-4 h-4 text-gray-400" />
                              <span>Bientôt Disponible</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 text-sm">
                              <Clock className="w-4 h-4 text-gray-400" />
                              <span>{method.duration}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
                <button
                  onClick={() => setStep("customer")}
                  className="px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-700 transition"
                >
                  Retour
                </button>
              </motion.div>
            )}

            {/* ÉTAPE UPLOAD / INSTRUCTIONS */}
            {step === "upload" && paymentMethod && (
              <motion.div
                key="upload"
                variants={slideVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <h2 className="text-2xl font-bold text-white/90 mb-4">
                  Instructions de paiement - {paymentMethod.name}
                </h2>
                {paymentMethod.id !== "cash" && paymentMethod.id !== "stripe" && (
                  <div className="bg-blue-900/40 border border-blue-700 rounded-lg p-4 mb-6">
                    <div className="flex items-center gap-2 text-blue-300 font-semibold mb-1">
                      <AlertCircle className="w-5 h-5" />
                      <span>Référence importante</span>
                    </div>
                    <p className="text-sm text-blue-400">
                      Indiquez cette référence dans le libellé de votre paiement:
                    </p>
                    <div className="mt-2 flex sm:flex-nowrap flex-wrap items-center gap-2">
                      <code className="bg-gray-700 px-4 py-2 rounded border border-blue-500 font-mono text-lg font-bold flex-1 text-white">
                        {orderReference}
                      </code>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => copyToClipboard(orderReference, "ref")}
                        className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                        title="Copier"
                      >
                        {copied === "ref" ? (
                          <Check className="w-5 h-5" />
                        ) : (
                          <Copy className="w-5 h-5" />
                        )}
                      </motion.button>
                    </div>
                  </div>
                )}
                {paymentMethod.id === "cash" && (
                  <StepsCardCash customerInfo={customerInfo} orderReference={orderReference} />
                )}
                {paymentMethod.id === "baridimob" && (
                  <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 mb-6">
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                      <QrCode className="w-6 h-6" />
                      Paiement BaridiMob
                    </h3>
                    <p className="text-center text-gray-400">QR Code bientôt disponible</p>
                    <div className="mt-4 space-y-3">
                      <div>
                        <label className="text-sm text-white/60">RIP BaridiMob:</label>
                        <div className="flex gap-2 mt-1">
                          <input
                            type="text"
                            value={PAYMENT_CONFIG.baridiMob.rip}
                            readOnly
                            className="flex-1 px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded font-mono text-sm"
                          />
                          <button
                            onClick={() => copyToClipboard(PAYMENT_CONFIG.baridiMob.rip, "rip")}
                            className="p-2 bg-blue-600 text-white rounded"
                          >
                            {copied === "rip" ? (
                              <Check className="w-5 h-5" />
                            ) : (
                              <Copy className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm text-white/60">Bénéficiaire:</label>
                        <input
                          type="text"
                          value={PAYMENT_CONFIG.baridiMob.accountName}
                          readOnly
                          className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-white/60">Montant:</label>
                        <input
                          type="text"
                          value={`${selectedPlan.price} DA`}
                          readOnly
                          className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded font-mono"
                        />
                      </div>
                    </div>
                  </div>
                )}
                {paymentMethod.id === "ccp" && (
                  <>
                    {/* BLOC DE TÉLÉCHARGEMENT */}
                    <div className="text-center border border-gray-700 rounded-lg p-8 bg-gray-800/50">
                      <h3 className="text-xl font-bold text-white/90 mb-2">
                        Finalisez votre commande
                      </h3>
                      <p className="text-white/60 mb-6 max-w-md mx-auto">
                        Téléchargez le document PDF contenant toutes les instructions et les
                        coordonnées bancaires pour effectuer votre virement.
                      </p>
                      <motion.button
                        onClick={generateCcpPdf}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-3 px-8 py-4 bg-custom-teal text-white rounded-lg font-semibold shadow-lg transition-transform"
                      >
                        <Download className="w-6 h-6" />
                        Télécharger mes instructions de paiement
                      </motion.button>
                    </div>

                    {/* BLOC D'INFORMATION MIS À JOUR */}
                    <div className="bg-yellow-900/40 border border-yellow-700 rounded-lg p-4 mt-6">
                      <div className="flex items-start gap-3">
                        <CiWarning className="w-6 h-6 text-yellow-300 flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="font-bold text-yellow-200">
                            Action requise après le téléchargement
                          </h3>
                          <p className="text-sm text-yellow-300 mt-1">
                            Après avoir téléchargé et suivi les instructions, cliquez sur "Valider
                            ma commande" pour que nous puissions l'enregistrer. Elle sera activée
                            dès réception de votre paiement.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Les boutons d'action restent les mêmes que dans la solution précédente */}
                    <div className="flex gap-4 pt-6 border-t border-gray-700 mt-6">
                      <button
                        onClick={() => setStep("payment")}
                        className="flex-1 py-3 border-2 border-gray-500 rounded-lg font-semibold hover:bg-gray-700 transition"
                      >
                        Retour
                      </button>
                      <button
                        onClick={handleSubmitProof}
                        className="flex-1 py-3 rounded-lg font-semibold transition bg-custom-teal text-white hover:bg-custom-teal/80"
                      >
                        J'ai téléchargé, valider ma commande
                      </button>
                    </div>
                  </>
                )}
                {paymentMethod.id === "baridimob" && (
                  <div className="border-t border-gray-700 pt-6">
                    <h3 className="font-bold text-lg mb-4">Envoyez votre preuve de paiement</h3>
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-custom-teal hover:bg-custom-teal/10 transition cursor-pointer mb-4"
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*,.pdf"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      {proofFile ? (
                        <div className="space-y-2">
                          <CheckCircle className="w-12 h-12 mx-auto text-green-500" />
                          <p className="font-semibold text-green-400">{proofFile.name}</p>
                          <p className="text-sm text-gray-400">
                            {(proofFile.size / 1024).toFixed(2)} KB
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <Upload className="w-12 h-12 mx-auto text-gray-400" />
                          <p className="font-semibold text-gray-300">Cliquez pour télécharger</p>
                          <p className="text-sm text-gray-500">
                            Screenshot ou photo (JPG, PNG, PDF - Max 5MB)
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-4">
                      <button
                        onClick={() => setStep("payment")}
                        className="flex-1 py-3 border-2 border-gray-500 rounded-lg font-semibold hover:bg-gray-700"
                      >
                        Retour
                      </button>
                      <button
                        onClick={handleSubmitProof}
                        disabled={!proofFile}
                        className={`flex-1 py-3 rounded-lg font-semibold transition ${proofFile ? "bg-custom-teal text-white hover:bg-custom-teal/80" : "bg-gray-600 text-gray-400 cursor-not-allowed"}`}
                      >
                        Envoyer ma preuve
                      </button>
                    </div>
                  </div>
                )}
                {(paymentMethod.id === "cheque" || paymentMethod.id === "cash") && (
                  <div className="flex justify-between gap-4 pt-6 border-t border-gray-700">
                    <button
                      onClick={() => setStep("payment")}
                      className="px-6 py-3 border-2 border-gray-500 rounded-lg font-semibold hover:bg-gray-700"
                    >
                      Retour
                    </button>
                    <button
                      onClick={handleSubmitProof}
                      className="px-6 py-3 bg-custom-teal text-white rounded-lg font-semibold hover:bg-custom-teal/80"
                    >
                      Confirmer la commande
                    </button>
                  </div>
                )}

                {paymentMethod.id === "stripe" && (
                  <div className="flex flex-col items-center">
                    <p className="text-center my-4">
                      {"Vous allez étre redigé vers un lien securisé pour terminer la transaction."}
                    </p>

                    <div className="flex flex-row gap-x-4">
                      <button
                        onClick={() => onClose()}
                        className="bg-transparent border border-blue-500 px-4 py-2 rounded-lg"
                      >
                        {"Annuler"}
                      </button>

                      <button
                        onClick={() => handleSubmitProof()}
                        className="bg-blue-500 px-4 py-2 rounded-lg"
                      >
                        {"Continuer"}
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* ÉTAPE CONFIRMATION */}
            {step === "confirmation" && (
              <motion.div
                key="confirmation"
                variants={dialogVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {isLoading ? (
                  <div className="p-8 text-center">
                    <Loader2Icon className="animate-spin mx-auto" size={40} />
                    <p className="font-bold mt-4">Chargement...</p>
                  </div>
                ) : response?.success ? (
                  <div className="p-6 text-center">
                    <div className="w-20 h-20 bg-green-900/50 border border-green-700 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-12 h-12 text-green-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-white/90 mb-2">
                      {paymentMethod?.id === "ccp" || paymentMethod?.id === "cash"
                        ? "Précommande confirmée"
                        : "Paiement en cours de vérification"}
                    </h2>
                    <p className="text-white/60 mb-6">Nous avons bien reçu votre demande</p>
                    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 mb-6">
                      <div className="space-y-2 text-left text-sm">
                        <div className="flex justify-between">
                          <span className="text-white/60">Référence:</span>
                          <span className="font-mono font-bold">{orderReference}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/60">Plan:</span>
                          <span className="font-semibold">{selectedPlan.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/60">Montant:</span>
                          <span className="font-semibold">{selectedPlan.price} DA</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <button
                        onClick={onClose}
                        className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 flex items-center justify-center gap-2 transition-colors"
                      >
                        <Check className="w-5 h-5" />
                        Terminer
                      </button>
                      <button
                        onClick={sendToWhatsApp}
                        className="flex-1 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 flex items-center justify-center gap-2 transition-colors"
                      >
                        <MessageCircle className="w-5 h-5" />
                        Nous contacter
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-6 text-center">
                    <CiWarning className="text-red-500 mx-auto" size={50} />
                    <p className="mt-4">Une erreur est survenue. Veuillez réessayer.</p>
                    <button
                      onClick={handleSubmitProof}
                      className="mt-4 py-3 px-6 bg-custom-teal/80 text-white rounded-lg font-semibold hover:bg-custom-teal"
                    >
                      Réessayer
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PaymentModal;
