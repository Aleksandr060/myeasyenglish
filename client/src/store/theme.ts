import { create } from "zustand";

type Theme = "light" | "dark";

type ThemeState = {
  theme: Theme;
  toggleTheme: () => void;
};

const defaultTheme = (localStorage.getItem("easy-english-theme") as Theme | null) || "light";

export const useThemeStore = create<ThemeState>((set) => ({
  theme: defaultTheme,
  toggleTheme: () =>
    set((state) => {
      const nextTheme: Theme = state.theme === "light" ? "dark" : "light";
      localStorage.setItem("easy-english-theme", nextTheme);
      return { theme: nextTheme };
    })
}));
