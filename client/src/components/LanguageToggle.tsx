import { useLanguageStore } from "../store/language";

export function LanguageToggle() {
  const { language, toggleLanguage } = useLanguageStore();

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      className="rounded-full border border-white/20 bg-white/80 px-4 py-2 text-sm font-bold text-slate-700 transition hover:-translate-y-0.5 hover:bg-white dark:bg-slate-900/70 dark:text-slate-100"
    >
      {language === "en" ? "RU" : "EN"}
    </button>
  );
}
