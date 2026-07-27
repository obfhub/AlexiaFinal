import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { translations, LANGUAGES } from "./translations";

const LanguageContext = createContext();

const STORAGE_KEY = "alexia_lang";

function detectLanguage() {
  if (typeof window === "undefined") return "ro";
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored && translations[stored]) return stored;
  const nav = navigator.language || navigator.userLanguage || "ro";
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
    if (!translations[code]) return;
    setLang(code);
    try {
      localStorage.setItem(STORAGE_KEY, code);
    } catch (e) {
      /* ignore */
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
    return { lang: "ro", t: translations.ro, translations, changeLanguage: () => {}, languages: LANGUAGES };
  }
  return ctx;
};