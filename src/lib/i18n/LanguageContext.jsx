import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { translations, LANGUAGES } from "./translations";

const LanguageContext = createContext({
  lang: "ro",
  t: translations.ro,
  translations,
  changeLanguage: () => {},
  languages: LANGUAGES,
});

const STORAGE_KEY = "alexia_lang";

function detectLanguage() {
  if (typeof window === "undefined") return "ro";
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored && (stored === "ro" || stored === "ru")) return stored;
  const nav = navigator.language || "ro";
  const lower = nav.toLowerCase();
  if (lower.startsWith("ru")) return "ru";
  return "ro";
}

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState("ro");

  useEffect(() => {
    setLang(detectLanguage());
  }, []);

  const changeLanguage = useCallback((code) => {
    if (code !== "ro" && code !== "ru") {
      console.warn(`[i18n] Invalid language code: ${code}`);
      return;
    }
    setLang(code);
    try {
      localStorage.setItem(STORAGE_KEY, code);
    } catch (e) {
      console.warn("[i18n] Failed to save language preference:", e);
    }
  }, []);

  const value = {
    lang,
    t: translations[lang],
    translations,
    changeLanguage,
    languages: LANGUAGES,
  };

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    console.warn("[i18n] LanguageContext not found, using default (ro)");
    return {
      lang: "ro",
      t: translations.ro,
      translations,
      changeLanguage: () => {},
      languages: LANGUAGES,
    };
  }
  return ctx;
};

/**
 * Safe translation accessor with nested key support and fallback
 * @param {any} obj - The translation object to access
 * @param {string} path - Dot-separated path to the translation key (e.g., 'nav.pricing')
 * @param {string} fallback - Fallback value if key not found
 * @returns {string} The translation value or fallback
 *
 * Usage: getValue(t, 'nested.key.path', 'fallback')
 * Safely handles missing translation keys with console warnings
 */
export const getValue = (obj, path, fallback = "") => {
  try {
    if (!obj || !path) return fallback;
    const value = path.split(".").reduce((acc, part) => acc?.[part], obj);
    return value ?? fallback;
  } catch (e) {
    console.warn(`[i18n] Translation key not found: ${path}`);
    return fallback;
  }
};
