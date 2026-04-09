import { t } from "../lib/i18n";
import { useLanguageStore } from "../store/language";
import { useThemeStore } from "../store/theme";

export function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore();
  const language = useLanguageStore((state) => state.language);

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`rounded-full px-4 py-2 text-sm font-bold shadow-sm transition hover:-translate-y-0.5 ${
        theme === "light"
          ? "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
          : "border border-white/20 bg-slate-900/70 text-slate-100 hover:bg-slate-800"
      }`}
    >
      {theme === "light" ? t(language, "darkMode") : t(language, "lightMode")}
    </button>
  );
}
