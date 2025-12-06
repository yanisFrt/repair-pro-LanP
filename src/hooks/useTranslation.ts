import { useLanguage } from "@/contexts/LanguageContext";
import frTranslations from "@/locales/fr.json";
import enTranslations from "@/locales/en.json";
import esTranslations from "@/locales/es.json";
import arTranslations from "@/locales/ar.json";

const translations = {
  fr: frTranslations,
  en: enTranslations,
  es: esTranslations,
  ar: arTranslations,
};

export const useTranslation = () => {
  const { language } = useLanguage();

  /**
   * Get a translation for the given key
   * @param key - The translation key (e.g., "common.download", "nav.home")
   * @returns The translated string
   *
   * @example
   * const { t } = useTranslation();
   * t("common.download") // Returns "Télécharger" in French, "Download" in English, etc.
   */
  const t = (key: string): string => {
    const keys = key.split(".");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let value: any = translations[language];

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k];
      } else {
        // Fallback to French if key not found
        value = translations.fr;
        for (const fallbackKey of keys) {
          if (value && typeof value === "object" && fallbackKey in value) {
            value = value[fallbackKey];
          } else {
            console.warn(`Translation key not found: ${key}`);
            return key; // Return key if not found in fallback either
          }
        }
        break;
      }
    }

    return typeof value === "string" ? value : key;
  };

  /**
   * Get a raw translation value (can be string, array, or object)
   * @param key - The translation key
   * @returns The raw translation value
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tRaw = (key: string): any => {
    const keys = key.split(".");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let value: any = translations[language];

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k];
      } else {
        // Fallback to French if key not found
        value = translations.fr;
        for (const fallbackKey of keys) {
          if (value && typeof value === "object" && fallbackKey in value) {
            value = value[fallbackKey];
          } else {
            console.warn(`Translation key not found: ${key}`);
            return undefined;
          }
        }
        break;
      }
    }

    return value;
  };

  return { t, tRaw, language };
};
