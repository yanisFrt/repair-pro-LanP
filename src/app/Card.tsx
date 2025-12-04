import React, { useState, useRef } from "react";
import {
  Upload,
  CheckCircle,
  Clock,
  AlertCircle,
  Copy,
  Check,
  Phone,
  Mail,
  MessageCircle,
  Download,
  QrCode,
} from "lucide-react";

interface Plan {
  id: string;
  name: string;
  price: number;
  popular?: boolean;
  features: string[];
}

interface PaymentMethod {
  id: "baridimob" | "ccp" | "cheque" | "cash";
  name: string;
  icon: string;
  description: string;
  duration: string;
  recommended?: boolean;
}

interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  businessName: string;
}

// interface PaymentConfig {
//   baridiMob: {
//     rip: string;
//     accountName: string;
//     qrCodeUrl: string;
//   };
//   ccp: {
//     accountNumber: string;
//     key: string;
//     accountName: string;
//   };
//   contact: {
//     whatsapp: string;
//     phone: string;
//     email: string;
//   };
//   office: {
//     address: string;
//     hours: string;
//   };
// }

// Configuration - À personnaliser
const PAYMENT_CONFIG = {
  baridiMob: {
    rip: "00799999XXXXXXXXXX",
    accountName: "CodesNova",
    qrCodeUrl: "/path/to/qr-code.png",
  },
  ccp: {
    accountNumber: "XXXXXXXXXX",
    key: "XX",
    accountName: "Codes Nova",
  },
  contact: {
    whatsapp: "213540960479",
    phone: "0540 96 04 79",
    email: "paiement@codesnova.com",
  },
  office: {
    address: "Imb makhkouf Bureau N° 94, Bd Krim Belkacem, Tizi Ouzou, Algerie",
    hours: "Sam-Jeu: 9h-18h, Ven: 9h-12h",
  },
};

export default function AlgerianPaymentSystem() {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null);
  const [step, setStep] = useState<"plan" | "customer" | "payment" | "upload" | "confirmation">(
    "plan"
  );
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: "",
    email: "",
    phone: "",
    businessName: "",
  });
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [orderReference, setOrderReference] = useState<string>("");
  const [copied, setCopied] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const plans: Plan[] = [
    {
      id: "starter",
      name: "STARTER",
      price: 23880,
      features: ["1 PC", "Support Email", "Sauvegarde locale"],
    },
    {
      id: "pro",
      name: "PRO",
      price: 41880,
      popular: true,
      features: ["3 PC", "Support WhatsApp", "Cloud 5GB", "SMS inclus"],
    },
    {
      id: "business",
      name: "BUSINESS",
      price: 71880,
      features: ["Illimité", "Support VIP", "Account Manager", "API"],
    },
  ];

  const paymentMethods: PaymentMethod[] = [
    {
      id: "baridimob",
      name: "BaridiMob",
      icon: "📱",
      description: "Paiement instantané par QR Code",
      duration: "5-30 minutes",
      recommended: true,
    },
    {
      id: "ccp",
      name: "Virement CCP",
      icon: "🏦",
      description: "Virement vers compte postal",
      duration: "2-24 heures",
    },
    {
      id: "cheque",
      name: "Chèque",
      icon: "📝",
      description: "Pour entreprises uniquement",
      duration: "3-7 jours",
    },
    {
      id: "cash",
      name: "Espèces",
      icon: "💵",
      description: "Paiement à nos bureaux",
      duration: "Immédiat",
    },
  ];

  const generateOrderRef = (): string => {
    const date = new Date();
    const ref = `ORD-${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
    setOrderReference(ref);
    return ref;
  };

  const handlePlanSelect = (plan: Plan): void => {
    setSelectedPlan(plan);
    setStep("customer");
    generateOrderRef();
  };

  const handleCustomerSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setStep("payment");
  };

  const handlePaymentMethodSelect = (method: PaymentMethod): void => {
    setPaymentMethod(method);
    setStep("upload");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Le fichier est trop volumineux (max 5MB)");
        return;
      }
      setProofFile(file);
    }
  };

  const handleSubmitProof = (): void => {
    console.log("Envoi de la preuve:", {
      plan: selectedPlan,
      customer: customerInfo,
      method: paymentMethod,
      proof: proofFile,
      reference: orderReference,
    });
    setStep("confirmation");
  };

  const copyToClipboard = (text: string, field: string): void => {
    navigator.clipboard.writeText(text);
    setCopied(field);
    setTimeout(() => setCopied(""), 2000);
  };

  const sendToWhatsApp = (): void => {
    const message = encodeURIComponent(
      `Bonjour, je viens d'effectuer un paiement.\n\nRéférence: ${orderReference}\nPlan: ${selectedPlan?.name}\nMontant: ${selectedPlan?.price.toLocaleString()} DA\n\nJe vais envoyer la preuve de paiement.`
    );
    window.open(`https://wa.me/${PAYMENT_CONFIG.contact.whatsapp}?text=${message}`, "_blank");
  };

  if (step === "plan") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Choisissez votre formule</h1>
            <p className="text-gray-600">Paiement sécurisé • Activation en 30 minutes maximum</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`bg-white rounded-xl shadow-lg p-8 relative ${plan.popular ? "ring-2 ring-blue-500 transform scale-105" : ""}`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-blue-500 text-white px-4 py-1 rounded-bl-lg rounded-tr-lg text-sm font-bold">
                    ⭐ POPULAIRE
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="text-3xl font-bold text-blue-600 mb-4">
                  {plan.price.toLocaleString()} DA
                  <span className="text-sm text-gray-500 font-normal">/an</span>
                </div>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-gray-700">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handlePlanSelect(plan)}
                  className={`w-full py-3 rounded-lg font-semibold transition ${plan.popular ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-800 text-white hover:bg-gray-900"}`}
                >
                  Choisir ce plan
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (step === "customer") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Vos informations</h2>
              <p className="text-gray-600">
                Plan sélectionné: <strong>{selectedPlan?.name ?? ""}</strong> -{" "}
                {selectedPlan?.price.toLocaleString() ?? ""} DA
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Référence: <span className="font-mono font-semibold">{orderReference}</span>
              </p>
            </div>
            <form onSubmit={handleCustomerSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nom complet *
                </label>
                <input
                  type="text"
                  required
                  value={customerInfo.name}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ex: Ahmed Benali"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                <input
                  type="email"
                  required
                  value={customerInfo.email}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="contact@codesnova.com"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Votre clé de licence sera envoyée à cette adresse
                </p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Téléphone +213 554 31 99 03
                </label>
                <input
                  type="tel"
                  required
                  value={customerInfo.phone}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0555 12 34 56"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">CodesNova</label>
                <input
                  type="text"
                  value={customerInfo.businessName}
                  onChange={(e) =>
                    setCustomerInfo({ ...customerInfo, businessName: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ex: Mobile Repair Pro"
                />
              </div>
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setStep("plan")}
                  className="flex-1 py-3 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition"
                >
                  Retour
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  Continuer
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  if (step === "payment") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Choisissez votre méthode de paiement
              </h2>
              <p className="text-gray-600">
                Montant à payer:{" "}
                <strong className="text-blue-600 text-2xl">
                  {selectedPlan?.price.toLocaleString() ?? ""} DA
                </strong>
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => handlePaymentMethodSelect(method)}
                  className={`relative p-6 border-2 rounded-xl text-left hover:border-blue-500 hover:bg-blue-50 transition ${method.recommended ? "border-blue-500 bg-blue-50" : "border-gray-200"}`}
                >
                  {method.recommended && (
                    <div className="absolute top-0 right-0 bg-green-500 text-white px-3 py-1 text-xs rounded-bl-lg rounded-tr-lg font-bold">
                      RECOMMANDÉ
                    </div>
                  )}
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{method.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-1">{method.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{method.description}</p>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-500">{method.duration}</span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            <button
              onClick={() => setStep("customer")}
              className="mt-6 px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition"
            >
              Retour
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (step === "upload") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            {/* Instructions de paiement */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Instructions de paiement - {paymentMethod?.name ?? ""}
              </h2>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-2 text-blue-800 font-semibold mb-1">
                  <AlertCircle className="w-5 h-5" />
                  <span>Référence importante</span>
                </div>
                <p className="text-sm text-blue-700">
                  Indiquez cette référence dans le libellé de votre paiement:
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <code className="bg-white px-4 py-2 rounded border border-blue-300 font-mono text-lg font-bold flex-1">
                    {orderReference}
                  </code>
                  <button
                    onClick={() => copyToClipboard(orderReference, "ref")}
                    className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    title="Copier"
                  >
                    {copied === "ref" ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <Copy className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Détails par méthode */}
            <div className="mb-8">
              {paymentMethod?.id === "baridimob" && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-6">
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                      <QrCode className="w-6 h-6" />
                      Paiement BaridiMob
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <p className="font-semibold mb-3">Option 1: Scanner le QR Code</p>
                        <div className="bg-white p-4 rounded-lg border-2 border-dashed border-gray-300 text-center">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={PAYMENT_CONFIG.baridiMob.qrCodeUrl}
                            alt="QR Code BaridiMob"
                            className="w-48 h-48 mx-auto"
                          />
                          <p className="text-sm text-gray-600 mt-2">Scannez avec BaridiMob</p>
                        </div>
                      </div>
                      <div>
                        <p className="font-semibold mb-3">Option 2: RIP manuel</p>
                        <div className="space-y-3">
                          <div>
                            <label className="text-sm text-gray-600">RIP BaridiMob:</label>
                            <div className="flex gap-2 mt-1">
                              <input
                                type="text"
                                value={PAYMENT_CONFIG.baridiMob.rip}
                                readOnly
                                className="flex-1 px-3 py-2 bg-gray-50 border rounded font-mono text-sm"
                              />
                              <button
                                onClick={() => copyToClipboard(PAYMENT_CONFIG.baridiMob.rip, "rip")}
                                className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
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
                            <label className="text-sm text-gray-600">Montant:</label>
                            <div className="flex gap-2 mt-1">
                              <input
                                type="text"
                                value={`${selectedPlan?.price.toLocaleString() ?? ""} DA`}
                                readOnly
                                className="flex-1 px-3 py-2 bg-gray-50 border rounded font-bold"
                              />
                              <button
                                onClick={() =>
                                  copyToClipboard(selectedPlan?.price.toString() ?? "", "amount")
                                }
                                className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                              >
                                {copied === "amount" ? (
                                  <Check className="w-5 h-5" />
                                ) : (
                                  <Copy className="w-5 h-5" />
                                )}
                              </button>
                            </div>
                          </div>
                          <div>
                            <label className="text-sm text-gray-600">Bénéficiaire:</label>
                            <input
                              type="text"
                              value={PAYMENT_CONFIG.baridiMob.accountName}
                              readOnly
                              className="w-full mt-1 px-3 py-2 bg-gray-50 border rounded text-sm"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-white rounded border border-yellow-300">
                      <p className="text-sm font-semibold text-yellow-800 mb-1">
                        N'oubliez pas la référence !
                      </p>
                      <p className="text-sm text-gray-700">
                        Dans le champ Libellé ou Motif, indiquez: <strong>{orderReference}</strong>
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod?.id === "ccp" && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="font-bold text-lg mb-4">Virement CCP</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-gray-600">Numéro de compte:</label>
                      <div className="flex gap-2 mt-1">
                        <input
                          type="text"
                          value={PAYMENT_CONFIG.ccp.accountNumber}
                          readOnly
                          className="flex-1 px-3 py-2 bg-white border rounded font-mono"
                        />
                        <button
                          onClick={() => copyToClipboard(PAYMENT_CONFIG.ccp.accountNumber, "ccp")}
                          className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                          {copied === "ccp" ? (
                            <Check className="w-5 h-5" />
                          ) : (
                            <Copy className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Clé:</label>
                      <input
                        type="text"
                        value={PAYMENT_CONFIG.ccp.key}
                        readOnly
                        className="w-full mt-1 px-3 py-2 bg-white border rounded font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Bénéficiaire:</label>
                      <input
                        type="text"
                        value={PAYMENT_CONFIG.ccp.accountName}
                        readOnly
                        className="w-full mt-1 px-3 py-2 bg-white border rounded"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Montant:</label>
                      <input
                        type="text"
                        value={`${selectedPlan?.price.toLocaleString() ?? ""} DA`}
                        readOnly
                        className="w-full mt-1 px-3 py-2 bg-white border rounded font-bold"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Libellé/Motif:</label>
                      <input
                        type="text"
                        value={orderReference}
                        readOnly
                        className="w-full mt-1 px-3 py-2 bg-white border rounded font-mono font-bold"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod?.id === "cheque" && (
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                  <h3 className="font-bold text-lg mb-4">Paiement par Chèque</h3>
                  <div className="space-y-3">
                    <p className="text-gray-700">Libeller le chèque à l&apos;ordre de:</p>
                    <div className="bg-white p-4 rounded border-2 border-dashed border-purple-300 text-center">
                      <p className="font-bold text-lg">{PAYMENT_CONFIG.ccp.accountName}</p>
                    </div>
                    <p className="text-gray-700">
                      Montant: <strong>{selectedPlan?.price.toLocaleString() ?? ""} DA</strong>
                    </p>
                    <p className="text-sm text-gray-600">
                      Indiquez au verso: <strong>{orderReference}</strong>
                    </p>
                    <div className="mt-4 p-3 bg-white rounded border">
                      <p className="font-semibold mb-2">Déposer ou envoyer à:</p>
                      <p className="text-sm text-gray-700">{PAYMENT_CONFIG.office.address}</p>
                      <p className="text-sm text-gray-600 mt-1">{PAYMENT_CONFIG.office.hours}</p>
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod?.id === "cash" && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h3 className="font-bold text-lg mb-4">Paiement en Espèces</h3>
                  <div className="space-y-3">
                    <div className="bg-white p-4 rounded border">
                      <p className="font-semibold mb-2">Nos bureaux:</p>
                      <p className="text-gray-700">{PAYMENT_CONFIG.office.address}</p>
                      <p className="text-sm text-gray-600 mt-1">{PAYMENT_CONFIG.office.hours}</p>
                    </div>
                    <div className="bg-white p-4 rounded border">
                      <p className="font-semibold mb-2">Montant à prévoir:</p>
                      <p className="text-2xl font-bold text-green-600">
                        {selectedPlan?.price.toLocaleString() ?? ""} DA
                      </p>
                    </div>
                    <div className="bg-yellow-50 p-3 rounded border border-yellow-300">
                      <p className="text-sm text-yellow-800">
                        <strong>Conseil:</strong> Appelez-nous avant de vous déplacer pour confirmer
                        nos disponibilités
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Section pour chèque ou cash */}
            {(paymentMethod?.id === "cheque" || paymentMethod?.id === "cash") && (
              <div className="border-t pt-6">
                <div className="flex gap-4">
                  <button
                    onClick={() => setStep("payment")}
                    className="flex-1 py-3 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition"
                  >
                    Retour
                  </button>
                  <button
                    onClick={() => {
                      sendToWhatsApp();
                      setStep("confirmation");
                    }}
                    className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                  >
                    Contacter sur WhatsApp
                  </button>
                </div>
              </div>
            )}

            {/* Section d'upload de preuve pour BaridiMob et CCP */}
            {(paymentMethod?.id === "baridimob" || paymentMethod?.id === "ccp") && (
              <div className="border-t pt-6">
                <h3 className="font-bold text-lg mb-4">Envoyez votre preuve de paiement</h3>
                <div className="space-y-4">
                  <div
                    onClick={() => fileInputRef.current && fileInputRef.current.click()}
                    className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 hover:bg-blue-50 transition cursor-pointer"
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
                        <p className="font-semibold text-green-700">{proofFile.name}</p>
                        <p className="text-sm text-gray-600">
                          {(proofFile.size / 1024).toFixed(2)} KB
                        </p>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setProofFile(null);
                          }}
                          className="text-sm text-red-600 hover:underline"
                        >
                          Changer de fichier
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Upload className="w-12 h-12 mx-auto text-gray-400" />
                        <p className="font-semibold text-gray-700">Cliquez pour télécharger</p>
                        <p className="text-sm text-gray-500">
                          Screenshot ou photo de la confirmation (JPG, PNG, PDF - Max 5MB)
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => setStep("payment")}
                      className="flex-1 py-3 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition"
                    >
                      Retour
                    </button>
                    <button
                      onClick={handleSubmitProof}
                      disabled={!proofFile}
                      className={`flex-1 py-3 rounded-lg font-semibold transition ${proofFile ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
                    >
                      Envoyer ma preuve
                    </button>
                  </div>
                  <div className="text-center pt-2">
                    <p className="text-sm text-gray-600 mb-2">
                      Ou envoyez la preuve directement par WhatsApp :
                    </p>
                    <button
                      onClick={sendToWhatsApp}
                      className="inline-flex items-center justify-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
                    >
                      <MessageCircle className="w-5 h-5" />
                      Envoyer sur WhatsApp
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Section d'aide */}
          <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
            <h3 className="font-bold text-lg mb-4">Besoin d&apos;aide ?</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <a
                href={`https://wa.me/${PAYMENT_CONFIG.contact.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 border rounded-lg hover:bg-green-50 hover:border-green-500 transition"
              >
                <MessageCircle className="w-6 h-6 text-green-600" />
                <div>
                  <p className="font-semibold text-sm">WhatsApp</p>
                  <p className="text-xs text-gray-600">{PAYMENT_CONFIG.contact.phone}</p>
                </div>
              </a>
              <a
                href={`tel:${PAYMENT_CONFIG.contact.phone}`}
                className="flex items-center gap-3 p-3 border rounded-lg hover:bg-blue-50 hover:border-blue-500 transition"
              >
                <Phone className="w-6 h-6 text-blue-600" />
                <div>
                  <p className="font-semibold text-sm">Téléphone</p>
                  <p className="text-xs text-gray-600">{PAYMENT_CONFIG.contact.phone}</p>
                </div>
              </a>
              <a
                href={`mailto:${PAYMENT_CONFIG.contact.email}`}
                className="flex items-center gap-3 p-3 border rounded-lg hover:bg-purple-50 hover:border-purple-500 transition"
              >
                <Mail className="w-6 h-6 text-purple-600" />
                <div>
                  <p className="font-semibold text-sm">Email</p>
                  <p className="text-xs text-gray-600">{PAYMENT_CONFIG.contact.email}</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === "confirmation") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="mb-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Paiement en cours de vérification
              </h2>
              <p className="text-gray-600">Nous avons bien reçu votre demande</p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
              <div className="space-y-3 text-left">
                <div className="flex justify-between">
                  <span className="text-gray-600">Référence:</span>
                  <span className="font-mono font-bold">{orderReference}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Plan:</span>
                  <span className="font-semibold">{selectedPlan?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Montant:</span>
                  <span className="font-semibold">{selectedPlan?.price.toLocaleString()} DA</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Méthode:</span>
                  <span className="font-semibold">{paymentMethod?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-semibold">{customerInfo.email}</span>
                </div>
              </div>
            </div>
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3 text-left p-4 bg-gray-50 rounded-lg">
                <Clock className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-gray-900 mb-1">
                    Qu&apos;est-ce qui se passe maintenant ?
                  </p>
                  <p className="text-sm text-gray-600">
                    Notre équipe vérifie votre paiement (généralement sous 5-30 minutes pendant les
                    heures ouvrables)
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-left p-4 bg-gray-50 rounded-lg">
                <Mail className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Vous recevrez un email</p>
                  <p className="text-sm text-gray-600">
                    Une fois validé, vous recevrez à <strong>{customerInfo.email}</strong> :
                  </p>
                  <ul className="text-sm text-gray-600 mt-2 space-y-1 list-disc list-inside">
                    <li>Votre clé de licence</li>
                    <li>Le lien de téléchargement</li>
                    <li>Les instructions d&apos;activation</li>
                    <li>Votre facture</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              {/* biome-ignore lint/suspicious/noAssignInExpressions: <explanation> */}
              <button
                onClick={() => (window.location.href = "/download")}
                className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Télécharger le logiciel
              </button>
              <button
                onClick={sendToWhatsApp}
                className="flex-1 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                Nous contacter
              </button>
            </div>
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> Conservez votre référence{" "}
                <span className="font-mono font-bold">{orderReference}</span> pour toute question
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
