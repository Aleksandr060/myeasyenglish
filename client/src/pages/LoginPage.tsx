import { FormEvent, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { isAxiosError } from "axios";
import { loginApi, meApi } from "../api/client";
import { LanguageToggle } from "../components/LanguageToggle";
import { ThemeToggle } from "../components/ThemeToggle";
import { t } from "../lib/i18n";
import { useAuthStore } from "../store/auth";
import { useLanguageStore } from "../store/language";
import { useThemeStore } from "../store/theme";

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const setAuth = useAuthStore((state) => state.setAuth);
  const language = useLanguageStore((state) => state.language);
  const theme = useThemeStore((state) => state.theme);
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const from = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname || "/";

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const auth = await loginApi(form);
      localStorage.setItem("easy-english-token", auth.token);
      const user = await meApi();
      setAuth(auth.token, user);
      navigate(from, { replace: true });
    } catch (err) {
      localStorage.removeItem("easy-english-token");
      if (isAxiosError(err)) {
        setError(
            err.response?.data?.message ||
            err.message ||
            "Unable to sign in."
        );
      } else {
        setError("Unable to sign in.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--bg)] px-4 py-10 text-[var(--text)]">
      <div className="absolute right-4 top-4">
        <div className="flex items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </div>
      <div className="w-full max-w-5xl">
        <div className="auth-grid grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
        <section className="animate-pop-in relative overflow-hidden rounded-[36px] bg-gradient-to-br from-brand via-indigo-500 to-success p-8 text-white shadow-card">
          <div className="decor-orb animate-float absolute -right-6 top-10 h-20 w-20 bg-white/20" />
          <p className="text-sm font-black uppercase tracking-[0.3em] text-white/70">My Easy English</p>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight">
            {t(language, "heroTitle")}
          </h1>
          <p className="mt-4 max-w-xl text-base text-white/85">
            {t(language, "heroSub")}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <span className="edu-chip">📚 smart lessons</span>
            <span className="edu-chip">🗣 voice practice</span>
            <span className="edu-chip">🌍 English journey</span>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <div className="rounded-3xl bg-white/15 p-4">
              <div className="feature-dot">📘</div>
              <div className="mt-3 text-2xl font-black">15</div>
              <div className="text-sm text-white/80">{t(language, "seededLessons")}</div>
            </div>
            <div className="rounded-3xl bg-white/15 p-4">
              <div className="feature-dot">🎧</div>
              <div className="mt-3 text-2xl font-black">4</div>
              <div className="text-sm text-white/80">{t(language, "exerciseModes")}</div>
            </div>
            <div className="rounded-3xl bg-white/15 p-4">
              <div className="feature-dot">🔥</div>
              <div className="mt-3 text-2xl font-black">3</div>
              <div className="text-sm text-white/80">{t(language, "sessionHearts")}</div>
            </div>
          </div>
        </section>

        <section className="animate-slide-up rounded-[36px] border border-white/40 bg-[var(--panel)] p-6 shadow-card">
          <h2 className="text-3xl font-extrabold">{t(language, "welcomeBack")}</h2>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <label className="block">
              <span className="mb-2 block text-sm font-bold">{t(language, "email")}</span>
              <input
                type="email"
                value={form.email}
                onChange={(event) => setForm((state) => ({ ...state, email: event.target.value }))}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-brand dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                required
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-bold">{t(language, "password")}</span>
              <input
                type="password"
                value={form.password}
                onChange={(event) => setForm((state) => ({ ...state, password: event.target.value }))}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-brand dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                required
              />
            </label>

            {error ? (
              <div className="rounded-2xl bg-danger/10 px-4 py-3 text-sm font-bold text-danger">{error}</div>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-brand px-4 py-3 text-base font-extrabold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? t(language, "signingIn") : t(language, "signIn")}
            </button>
          </form>

          <p
            className="mt-4 text-sm"
            style={{ color: theme === "dark" ? "#cbd5e1" : "#000000" }}
          >
            {t(language, "newHere")}{" "}
            <Link className="font-extrabold text-brand" to="/register">
              {t(language, "createAccount")}
            </Link>
          </p>
        </section>
        </div>

        <footer className="pt-6 text-center text-xs font-bold tracking-[0.16em] text-slate-500 dark:text-slate-400">
          Powered by Kutuzov Aleksandr
        </footer>
      </div>
    </div>
  );
}
