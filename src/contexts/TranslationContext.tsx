// src/contexts/TranslationContext.tsx

import React, { createContext, useContext, useState, ReactNode } from "react";
import en from "@/locales/en.json";
import id from "@/locales/id.json";

type Language = "en" | "id";
type Texts = typeof en;

interface TranslationContextType {
  text: Texts;
  language: Language;
  handleLanguageChange: (lang: Language) => void;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export const TranslationProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en");
  const [text, setText] = useState<Texts>(en);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setText(lang === "id" ? id : en);
  };

  return (
    <TranslationContext.Provider value={{ text, language, handleLanguageChange }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error("useTranslation must be used within a TranslationProvider");
  }
  return context;
};
