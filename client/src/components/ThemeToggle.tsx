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
      className="rounded-full border border-white/20 bg-white/80 px-4 py-2 text-sm font-bold text-slate-700 transition hover:-translate-y-0.5 hover:bg-white dark:bg-slate-900/70 dark:text-slate-100"
    >
      {theme === "light" ? t(language, "darkMode") : t(language, "lightMode")}
    </button>
  );
}
