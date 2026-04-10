import { Link, NavLink, Outlet } from "react-router-dom";
import { LanguageToggle } from "./LanguageToggle";
import { ThemeToggle } from "./ThemeToggle";
import { useAuthStore } from "../store/auth";
import { useLanguageStore } from "../store/language";
import { t } from "../lib/i18n";

export function AppShell() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const language = useLanguageStore((state) => state.language);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-4 sm:px-6 lg:px-8">
        <header className="animate-pop-in mb-6 rounded-[28px] border border-white/40 bg-[var(--panel)] px-5 py-4 shadow-card backdrop-blur">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <Link
                to="/"
                className="animate-float flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-success text-lg font-extrabold text-white"
              >
                📘
              </Link>
              <div>
                <h1 className="text-xl font-extrabold">My Easy English</h1>
                <p className="text-sm" data-text="muted">
                  {t(language, "learnBurst")}
                </p>
                <div className="mt-2 flex flex-wrap gap-2 text-xs">
                  <span className="rounded-full bg-brand/10 px-2.5 py-1 font-extrabold text-brand">🗣 Speaking</span>
                  <span className="rounded-full bg-cyan-500/10 px-2.5 py-1 font-extrabold text-cyan-700 dark:text-cyan-200">🎧 Listening</span>
                  <span className="rounded-full bg-amber-400/15 px-2.5 py-1 font-extrabold text-amber-700 dark:text-amber-200">✨ CEFR path</span>
                </div>
              </div>
            </div>

            <div className="flex min-w-0 flex-col gap-3 sm:items-end">
              <nav
                className="flex w-full min-w-0 flex-nowrap items-center gap-2 overflow-x-auto rounded-full p-1 sm:w-auto"
                data-surface="soft"
              >
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                    `shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-sm font-bold transition ${
                      isActive
                        ? "bg-[var(--surface)] text-brand shadow"
                        : "text-[var(--text-muted)] hover:text-[var(--text)]"
                    }`
                  }
                >
                  {t(language, "dashboard")}
                </NavLink>
                <NavLink
                  to="/leaderboard"
                  className={({ isActive }) =>
                    `shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-sm font-bold transition ${
                      isActive
                        ? "bg-[var(--surface)] text-brand shadow"
                        : "text-[var(--text-muted)] hover:text-[var(--text)]"
                    }`
                  }
                >
                  {t(language, "leaderboard")}
                </NavLink>
                <NavLink
                  to="/practice"
                  className={({ isActive }) =>
                    `shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-sm font-bold transition ${
                      isActive
                        ? "bg-[var(--surface)] text-brand shadow"
                        : "text-[var(--text-muted)] hover:text-[var(--text)]"
                    }`
                  }
                >
                  {language === "ru" ? "Практика" : "Practice"}
                </NavLink>
                <NavLink
                  to="/theory"
                  className={({ isActive }) =>
                    `shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-sm font-bold transition ${
                      isActive
                        ? "bg-[var(--surface)] text-brand shadow"
                        : "text-[var(--text-muted)] hover:text-[var(--text)]"
                    }`
                  }
                >
                  {t(language, "theory")}
                </NavLink>
                <NavLink
                  to="/lexical"
                  className={({ isActive }) =>
                    `shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-sm font-bold transition ${
                      isActive
                        ? "bg-[var(--surface)] text-brand shadow"
                        : "text-[var(--text-muted)] hover:text-[var(--text)]"
                    }`
                  }
                >
                  {t(language, "lexicalBlock")}
                </NavLink>
              </nav>
              <div className="flex flex-wrap items-center justify-end gap-3">
                <button
                  type="button"
                  aria-label="Telegram channel"
                  title="Telegram channel"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-sky-700/40 bg-sky-700 text-white shadow-card transition hover:scale-105 hover:bg-sky-600"
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="h-5 w-5 fill-current"
                  >
                    <path d="M21.5 4.5 18.4 19c-.2 1-.8 1.3-1.6.8l-4.7-3.5-2.3 2.2c-.3.3-.5.5-1 .5l.3-4.8 8.8-8c.4-.3-.1-.5-.5-.2L6.6 12.8 2 11.4c-1-.3-1-1 .2-1.4l17.8-6.8c.8-.3 1.6.2 1.5 1.3Z" />
                  </svg>
                </button>
                <LanguageToggle />
                <ThemeToggle />
                <button
                  type="button"
                  onClick={logout}
                  className="rounded-full bg-danger px-4 py-2 text-sm font-extrabold text-white"
                >
                  {t(language, "logout")}
                </button>
              </div>
            </div>
          </div>

          {user ? (
            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
              <div className="rounded-full bg-brand/10 px-3 py-1 font-extrabold text-brand">
                👋 {user.username}
              </div>
              <div className="rounded-full bg-success/10 px-3 py-1 font-extrabold text-success">
                ⭐ {user.xp} XP
              </div>
              <div className="rounded-full bg-orange-100 px-3 py-1 font-extrabold text-orange-600 dark:bg-orange-500/10 dark:text-orange-300">
                🔥 {user.streak} {t(language, "dayStreak")}
              </div>
            </div>
          ) : null}
        </header>

        <main className="flex-1">
          <Outlet />
        </main>

        <footer className="pt-6 text-center">
          <div className="text-xs font-bold tracking-[0.16em] text-slate-500 dark:text-slate-400">
            Powered by Kutuzov Aleksandr
          </div>
        </footer>
      </div>
    </div>
  );
}
