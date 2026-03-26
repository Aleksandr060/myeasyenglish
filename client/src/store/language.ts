import { create } from "zustand";

export type Language = "en" | "ru";

type LanguageState = {
  language: Language;
  toggleLanguage: () => void;
  setLanguage: (language: Language) => void;
};

const defaultLanguage =
  (localStorage.getItem("easy-english-language") as Language | null) || "en";

export const useLanguageStore = create<LanguageState>((set) => ({
  language: defaultLanguage,
  toggleLanguage: () =>
    set((state) => {
      const nextLanguage: Language = state.language === "en" ? "ru" : "en";
      localStorage.setItem("easy-english-language", nextLanguage);
      return { language: nextLanguage };
    }),
  setLanguage: (language) => {
    localStorage.setItem("easy-english-language", language);
    set({ language });
  }
}));
