import type frTranslations from "@/locales/fr.json";

// Type pour les traductions basé sur le fichier français (référence)
export type TranslationKeys = typeof frTranslations;

// Type utilitaire pour générer les chemins de clés possibles
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PathImpl<T, K extends keyof T> = K extends string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ? T[K] extends Record<string, any>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ? T[K] extends ArrayLike<any>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ? K | `${K}.${PathImpl<T[K], Exclude<keyof T[K], keyof any[]>>}`
      : K | `${K}.${PathImpl<T[K], keyof T[K]>}`
    : K
  : never;

type Path<T> = PathImpl<T, keyof T> | keyof T;

// Type pour toutes les clés de traduction possibles
export type TranslationKey = Path<TranslationKeys>;

// Exemples de clés valides (autocomplétion):
// - "common.download"
// - "nav.home"
// - "hero.title"
// - "pricing.free"
