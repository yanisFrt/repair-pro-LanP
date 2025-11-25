// src/utils/features.ts

export interface Feature {
  /** A unique key – used for look‑ups and as an object property */
  key: string;
  /** Human readable label that will be rendered in the UI */
  label: string;
}

/** Add a new feature here once, then use it in any plan. */
export const ALL_FEATURES: Feature[] = [
  { key: "pcs", label: "PC" },
  { key: "offlineUse", label: "Fonctionne Hors-ligne" },
  { key: "supportEmail", label: "Support Email" },
  { key: "backupLocal", label: "Sauvegarde locale" },
  { key: "historyBasic", label: "Historique Basique" },
  { key: "historyAdv", label: "Historique Avancé" },
  { key: "supportWhatsApp", label: "Support Whatsapp" },
  { key: "techAdvanced", label: "Support Technique avancé" },
  { key: "backupCloud", label: "Sauvegarde Cloud" }, // quantity will be stored in `value`
  { key: "emailClientNotif", label: "Notifications Email Client" },
];

export interface PlanFeatureFlags {
  /** Map feature key → boolean (enabled / disabled) */
  [featureKey: string]: boolean;
}

export interface Plan {
  id: string;
  name: string;
  price: string;
  period: string; // e.g. "An"
  currency: string;
  description: string;
  pcsQty?: number | string;
  featureValues?: { [featureKey: string]: number | string };
  flags?: PlanFeatureFlags; // e.g. { supportEmail: true, supportVIP: false }
  popular?: boolean;
}

export const baseFlags = Object.fromEntries(
  ALL_FEATURES.map((f) => [f.key, false]) // default all off
);

/**
 * Returns an array of objects ready for rendering.
 * Each object contains the label and whether the plan has it enabled.
 */
export function getFeatureRows(plan: Plan) {
  return ALL_FEATURES.map((feature) => {
    // --- CORRECTION APPLIQUÉE ICI ---
    // Utilise l'optional chaining (?.) pour accéder à la propriété en toute sécurité.
    const isActive = !!plan.flags?.[feature.key];

    let labelWithValue = feature.label;
    if (plan.featureValues && plan.featureValues[feature.key] !== undefined) {
      labelWithValue = `${String(plan.featureValues[feature.key])} ${feature.label}`;
    }

    return {
      key: feature.key,
      label: labelWithValue,
      active: isActive,
      value: plan.featureValues?.[feature.key]
        ? String(plan.featureValues[feature.key])
        : undefined,
    };
  });
}
