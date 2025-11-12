import { useState } from "react";

type CustomerInfo = {
  name: string;
  email: string;
  phone: string;
};

type ResponseAPI = {
  message: string;
  reference: string;
  success: boolean;
};

export const useSubmitPayment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<ResponseAPI | null>(null);

  /**
   * Submit a payment.
   *
   * @param customerInfo - Customer details
   * @param reference     - Payment reference (e.g. RP-MGRXSIRDIBCRD4VA)
   * @param plan          - Plan name (e.g. "Pro")
   * @param amount        - Amount in cents / smallest currency unit
   * @param paymentMethod - e.g. "CCP"
   * @param proofFile     - Optional File object for the proof of payment image/receipt
   */
  const submitPayment = async (
    customerInfo: CustomerInfo,
    reference: string,
    plan: string,
    amount: number | string,
    paymentMethod: string,
    proofFile?: File
  ) => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const form = new FormData();
      form.append("customerInfo", JSON.stringify(customerInfo));
      form.append("reference", reference);
      form.append("plan", plan);
      form.append("amount", amount.toString().trim().replace(" ", ""));
      form.append("paymentMethod", paymentMethod);

      if (proofFile) {
        form.append("proof", proofFile);
      }

      // await new Promise(r => setTimeout(r, 1500));

      // throw new Error();
      const url = `${process.env.NEXT_PUBLIC_PAYMENT_API_EP || "http://localhost:3007"}/payments/submit`;

      const res = await fetch(url, {
        method: "POST",
        headers: {
          accept: "*/*",
        },
        body: form,
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`HTTP ${res.status}: ${errText}`);
      }

      const data = await res.json();
      setResponse(data);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("Erreur inconnue.");
      }
    } finally {
      setLoading(false);
    }
  };

  return { submitPayment, loading, error, response };
};
