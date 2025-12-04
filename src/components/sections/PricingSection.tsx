import { getPlans } from "@/utils/plansData";
import { AlgeriaFlag, FranceFlag } from "../icons/svg";
import { getFeatureRows, Plan } from "@/utils/features";
import { Check, X } from "lucide-react";

export type Countries = "dz" | "fr";

export const PricingSection = ({
  countryError,
  country,
  selectedCountry,
  setSelectedCountry,
  loading,
  handleChoosePlan,
}: {
  countryError: string | null;
  country: string | null;
  loading: boolean;
  selectedCountry: Countries;
  setSelectedCountry: (value: React.SetStateAction<Countries>) => void;
  handleChoosePlan: (plan: Plan) => void;
}) => {
  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/5 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Simple et Transparente
            <span className="block text-custom-teal mt-2">Tarification</span>
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Choisissez le plan qui correspond à vos besoins et commencez à transformer votre atelier
            dès aujourd&apos;hui.
          </p>

          <div className="flex justify-center mt-8">
            {countryError ||
              (country === null && !loading && (
                <div className="bg-white/10 backdrop-blur-sm rounded-full p-1 flex items-center border border-white/20">
                  <>
                    <button
                      onClick={() => setSelectedCountry("dz")}
                      className={`px-6 py-2 rounded-full transition-all 
                    ${selectedCountry === "dz" ? "bg-custom-teal text-white" : "text-white/70"}
                    
                    `}
                    >
                      <div className="flex items-center gap-2">
                        <span>DZ</span>
                        <span>
                          <AlgeriaFlag />
                        </span>
                      </div>
                    </button>
                    <button
                      onClick={() => setSelectedCountry("fr")}
                      className={`px-6 py-2 rounded-full transition-all ${
                        selectedCountry === "fr" ? "bg-custom-teal text-white" : "text-white/70"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span>FR</span>
                        <span>
                          <FranceFlag />
                        </span>
                      </div>
                    </button>
                  </>
                </div>
              ))}
          </div>
        </div>

        <div className="max-w-[80%] mx-auto">
          {loading ? (
            <>
              <p className="text-center">{"Chargement..."}</p>
            </>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
              {getPlans((selectedCountry as Countries) || "dz").map((plan) => (
                <div
                  key={plan.id}
                  className={`relative flex flex-col justify-between rounded-2xl border border-gray-600 bg-gray-900/40 p-8 backdrop-blur-sm transition-transform hover:-translate-y-1 hover:border-gray-700 ${plan.popular ? "ring-2 ring-custom-teal scale-105" : ""}`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-custom-teal text-xs font-bold px-3 py-1 rounded-full uppercase">
                      Populaire
                    </div>
                  )}
                  <div>
                    <h2 className="text-xl text-center font-semibold text-gray-300">{plan.name}</h2>
                    <div className="flex flex-row items-end justify-center gap-x-2">
                      <p className="text-2xl md:text-4xl text-center font-bold mt-2 text-white">
                        {`${plan.price} ${plan.currency.toUpperCase()}`}
                      </p>
                      <p className="text-sm text-gray-400">/ {plan.period}</p>
                    </div>
                    <p className="mt-4 text-gray-400 text-sm">{plan.description}</p>
                    <ul className="mt-6 space-y-2 text-gray-300">
                      {getFeatureRows(plan).map((feature, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <span className={feature.active ? "text-green-500" : "text-red-500"}>
                            {feature.active ? <Check /> : <X />}
                          </span>
                          <span>{feature.label}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleChoosePlan(plan)}
                    className={`mt-8 w-full py-3 rounded-xl transition-colors text-white ${plan.popular ? "bg-custom-teal/70 hover:bg-custom-teal/50" : "bg-gray-500 hover:bg-gray-700"}`}
                  >
                    {plan.popular ? "Choisir le plan PRO" : "Choisir ce plan"}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
