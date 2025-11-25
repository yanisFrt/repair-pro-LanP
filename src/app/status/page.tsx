// pages/status.tsx
"use client";

import { Bell, DatabaseIcon, Globe, ServerIcon } from "lucide-react";
import ShimmerGrid from "@/components/ShimmerGrid";
import { useUptimeStatus } from "@/hooks/useUptimeStatus";

const services = [
  {
    name: "Réseau de distribution de contenu",
    url: "https://cdn.repair-pro.cloud-db.pro/health",
  },
  {
    name: "Services de fonctionnement de l'application",
    url: "https://license.cloud-db.pro/healthz",
  },
];

const StatusPage = () => {
  const { serviceStatuses, loading } = useUptimeStatus(services);

  const getIcon = (name: string) => {
    switch (name) {
      case "API Services":
        return <ServerIcon className="w-8 h-8 text-blue-500" />;
      case "Database":
        return <DatabaseIcon className="w-8 h-8 text-green-500" />;
      case "Web Application":
        return <Globe className="w-8 h-8 text-purple-500" />;
      case "Notification System":
        return <Bell className="w-8 h-8 text-yellow-500" />;
      default:
        return <ServerIcon className="w-8 h-8 text-blue-500" />;
    }
  };

  const STATUS = {
    down: "En panne",
    operational: "Opérationnel",
  };

  const allOperational = serviceStatuses.every((service) => service.status === "Operational");

  return (
    <div>
      <main className="min-h-screen bg-slate-900">
        {/* Hero Section */}
        <section className="flex flex-col bg-gradient-to-br  from-slate-900 via-slate-800 to-slate-900 text-white pt-20 pb-10 px-6">
          <div className="flex flex-col max-w-4xl mx-auto text-center">
            <h1 className="text-2xl md:text-6xl font-bold mb-6">
              État de la plateforme et disponibilité
            </h1>
            <p className="md:text-xl text-slate-300 max-w-2xl mx-auto">
              {
                "Informations en temps réel sur l'état du système et la disponibilité. Nous nous engageons à maintenir RepairFlow en parfait fonctionnement."
              }
            </p>
          </div>
        </section>

        <div className="flex flex-col items-center justify-center mx-auto w-[90%] md:w-[67%] py-[2%]">
          <div className="flex flex-col items-center bg-white/10 border border-custom-teal/20 p-6 rounded-lg w-full">
            <div className="flex items-center w-full">
              <div
                className={`w-4 h-4 rounded-full mr-3 ${allOperational ? "bg-green-500" : "bg-red-500"}`}
              ></div>

              {loading ? (
                <p className="text-md md:text-4xl font-bold text-white/80">{"Chargement..."}</p>
              ) : (
                <h1 className="text-md md:text-4xl font-bold text-white/80">
                  {allOperational
                    ? "Tous les systèmes sont opérationnels"
                    : "Panne de service détectée"}
                </h1>
              )}
            </div>

            <div className="grid grid-cols-1 gap-6 my-10 w-full">
              {serviceStatuses.map((service) => (
                <div key={service.name} className={`bg-white/10 rounded-xl p-6 hover:shadow-lg `}>
                  <div className="flex flex-col md:flex-row items-start md:items-center ">
                    <div className="mr-4 mt-1">{getIcon(service.name)}</div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start my-2 md:mb-2">
                        <h2 className="text-base md:text-xl font-semibold text-white/80">
                          {service.name}
                        </h2>
                        <span
                          className={`hidden md:block px-3 py-1 rounded-full text-xs font-medium ${
                            service.status === "Operational"
                              ? "bg-green-900 text-green-300"
                              : "bg-red-900 text-red-300"
                          }`}
                        >
                          {STATUS[service?.status?.toLowerCase()]}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div
                            className={`w-3 h-3 rounded-full mr-2 ${
                              service.status === "Operational" ? "bg-green-500" : "bg-red-500"
                            }`}
                          ></div>
                          <span className="text-gray-300">Disponibilité: {service.uptime}</span>
                        </div>
                        {service.responseTime && (
                          <span className="text-gray-400 text-sm">{service.responseTime}ms</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {loading && <ShimmerGrid />}
            </div>

            <p className="text-white/60">{"L'état du service s'actualise toutes les heures."}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StatusPage;
