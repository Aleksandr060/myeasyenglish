import { useLanguageStore } from "../store/language";
import { useThemeStore } from "../store/theme";

export function LanguageToggle() {
  const { language, toggleLanguage } = useLanguageStore();
  const theme = useThemeStore((state) => state.theme);

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      className={`rounded-full px-4 py-2 text-sm font-bold shadow-sm transition hover:-translate-y-0.5 ${
        theme === "light"
          ? "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
          : "border border-white/20 bg-slate-900/70 text-slate-100 hover:bg-slate-800"
      }`}
    >
      {language === "en" ? "RU" : "EN"}
    </button>
  );
}
