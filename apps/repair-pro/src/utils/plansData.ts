import { baseFlags, type Plan } from "@/utils/features";

export const PLANS: Plan[] = [
    {
        id: "repair_pro_starter",
        name: "STARTER",
        price: "23 880",
        period: "An",
        currency: "DA",
        description: "Parfait pour débuter",
        pcsQty: 1,
        popular: false,
        flags: {
            ...baseFlags,
            pcs: true,
            supportEmail: true,
            backupLocal: true,
            historyBasic: true,
            supportWhatsApp: true,
            offlineUse: true,
        },
        featureValues: { pcs: "1" },
    },
    {
        id: "repair_pro_pro",
        name: "PRO",
        price: "41 880",
        period: "An",
        currency: "DA",
        description: "Pour les entreprises de réparation en croissance",
        pcsQty: 3,
        flags: {
            ...baseFlags,
            pcs: true,
            supportEmail: true,
            historyBasic: true,
            backupLocal: true,
            historyAdv: true,
            supportWhatsApp: true,
            backupCloud: true,
            emailClientNotif: true,
            offlineUse: true,
        },
        featureValues: { backupCloud: "2 Go", pcs: "3" },
        popular: true,
    },
    {
        id: "repair_pro_business",
        name: "BUSINESS",
        price: "71 880",
        period: "An",
        currency: "DA",
        description: "Pour les opérations de réparation à grande échelle",
        pcsQty: 10,
        flags: {
            ...baseFlags,
            pcs: true,
            supportEmail: true,
            backupLocal: true,
            historyAdv: true,
            supportWhatsApp: true,
            historyBasic: true,
            techAdvanced: true,
            backupCloud: true,
            emailClientNotif: true,
            offlineUse: true,
        },
        featureValues: { backupCloud: "5 Go", pcs: "5" },
        popular: false,
    },
];

export enum PlanId {
    Starter = "repair_pro_starter",
    Pro = "repair_pro_pro",
    Business = "repair_pro_business",
}

export const getPlans = (country: "dz" | "fr"): Plan[] => {
    const euroPrices: Record<PlanId, { price: string; currency: string }> = {
        [PlanId.Starter]: { price: "30", currency: "€" },
        [PlanId.Pro]: { price: "50", currency: "€" },
        [PlanId.Business]: { price: "80", currency: "€" },
    };

    const dzPrices: Record<PlanId, { price: string; currency: string }> = {
        [PlanId.Starter]: { price: "23 880", currency: "DA" },
        [PlanId.Pro]: { price: "41 880", currency: "DA" },
        [PlanId.Business]: { price: "71 880", currency: "DA" },
    };

    return PLANS.map((plan) => {
        const currentPlan =
            country.toLowerCase() === "dz" ? dzPrices[plan.id as PlanId] : euroPrices[plan.id as PlanId];
        if (currentPlan) {
            return {
                ...plan,
                price: currentPlan.price,
                currency: currentPlan.currency,
            };
        }
        return plan;
    });
};
