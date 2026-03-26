import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isAxiosError } from "axios";
import { meApi, registerApi } from "../api/client";
import { LanguageToggle } from "../components/LanguageToggle";
import { ThemeToggle } from "../components/ThemeToggle";
import { t } from "../lib/i18n";
import { useAuthStore } from "../store/auth";
import { useLanguageStore } from "../store/language";

export function RegisterPage() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const language = useLanguageStore((state) => state.language);
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const auth = await registerApi(form);
      localStorage.setItem("easy-english-token", auth.token);
      const user = await meApi();
      setAuth(auth.token, user);
      navigate("/", { replace: true });
    } catch (err) {
      localStorage.removeItem("easy-english-token");
      if (isAxiosError(err)) {
        setError(
          err.response?.data?.message ||
            err.message ||
            "Unable to create account."
        );
      } else {
        setError("Unable to create account.");
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
      <div className="w-full max-w-xl rounded-[36px] border border-white/40 bg-[var(--panel)] p-6 shadow-card">
        <p className="text-sm font-black uppercase tracking-[0.28em] text-brand/70">{t(language, "startStreak")}</p>
        <h1 className="mt-3 text-3xl font-extrabold">{t(language, "createProfile")}</h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">
          {t(language, "jumpIntoA1")}
        </p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <label className="block">
            <span className="mb-2 block text-sm font-bold">{t(language, "username")}</span>
            <input
              type="text"
              value={form.username}
              onChange={(event) => setForm((state) => ({ ...state, username: event.target.value }))}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-brand dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              required
            />
          </label>
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
            className="w-full rounded-2xl bg-success px-4 py-3 text-base font-extrabold text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? t(language, "creatingAccount") : t(language, "createAccount")}
          </button>
        </form>

        <p className="mt-4 text-sm text-slate-500 dark:text-slate-300">
          {t(language, "alreadyHaveAccount")}{" "}
          <Link className="font-extrabold text-brand" to="/login">
            {t(language, "signIn")}
          </Link>
        </p>
      </div>
    </div>
  );
}
