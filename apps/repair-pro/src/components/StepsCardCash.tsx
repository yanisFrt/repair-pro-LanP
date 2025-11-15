import type React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Copy } from "lucide-react";
import { CustomerInfo } from "@/app/PaymentModal";

interface Props {
    customerInfo: CustomerInfo;
    orderReference: string;
}

export const StepsCardCash: React.FC<Props> = ({ customerInfo, orderReference }: Props) => {
    const [copied, setCopied] = useState<string | null>(null);

    const copyToClipboard = (text: string, id: string) => {
        navigator.clipboard.writeText(text);
        setCopied(id);
        setTimeout(() => setCopied(null), 2000);
    };

    return (
        <div className="flex flex-col gap-y-4">
            <div className="bg-gray-200/10 border border-gray-200 rounded-lg p-4">
                <h2 className="text-base md:text-xl font-semibold mb-4 text-left">
                    Étape 01 : Vérification de vos données
                </h2>
                <div className="flex flex-row gap-x-2 my-2 text-xs sm:text-sm md:text-base">
                    <p className="text-white/60">{"Nom :"}</p>
                    <span>{customerInfo.name}</span>
                </div>

                <div className="flex flex-row gap-x-2 my-2 text-xs sm:text-sm md:text-base">
                    <p className="text-white/60">{"Email :"}</p>
                    <span>{customerInfo.email}</span>
                </div>

                <p className="text-white/60 mt-4 text-sm md:text-base">
                    {
                        "Veuillez bien vérifier votre email, il sera utilisé pour vous envoyé votre clé de license."
                    }
                </p>
            </div>

            <div className="bg-gray-200/10 border border-gray-200 rounded-lg p-4">
                <h2 className="text-base md:text-xl font-semibold mb-4 text-left">
                    Étape 02 : Réference de votre commande
                </h2>

                <div className="mt-2 flex items-center gap-2">
                    <code className="bg-white/60 px-4 py-2 rounded border border-blue-300 font-mono font-bold flex-1 text-black/60 text-xs sm:text-sm md:text-lg">
                        {orderReference}
                    </code>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => copyToClipboard(orderReference, "ref")}
                        className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                        title="Copier"
                    >
                        {copied === "ref" ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                    </motion.button>
                </div>

                <p className="text-white/60 mt-4 text-sm md:text-base">
                    {
                        "Veuillez copier et garder cette réference pour simplifier la transaction lors de votre déplacement."
                    }
                </p>
            </div>

            <div className="bg-gray-200/10 border border-gray-200 rounded-lg p-4">
                <h2 className="text-base md:text-xl font-semibold mb-4 text-left">
                    Étape 03 : Déplacement au bureau
                </h2>

                <p className="text-white/60 text-sm md:text-base">
                    {
                        "Afin de finaliser votre transaction en espèces, nous vous invitons à passer au bureau de réception situé à l'addresse suivante le plus tôt possible."
                    }
                </p>

                <div className="flex flex-row gap-x-2 my-2 text-xs md:text-base">
                    <p className="text-white/60">{"Addresse :"}</p>
                    <span>{"Immeuble Makhkouf Bureau N°94, Bd Krim Belkacem, Tizi Ouzou, Algérie."}</span>
                </div>
                <div className="flex flex-row md:gap-x-2 my-2 text-xs md:text-base">
                    <p className="text-white/60">{"Numéro de téléphone :"}</p>
                    <span>{"+213 554 31 99 03"}</span>
                </div>
                <div className="flex flex-row gap-x-2 my-2 text-xs md:text-base">
                    <p className="text-white/60">{"Email :"}</p>
                    <span>{"contacts@codesnova.com"}</span>
                </div>
            </div>
        </div>
    );
};
