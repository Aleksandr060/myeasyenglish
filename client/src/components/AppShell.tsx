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
        <header className="mb-6 rounded-[28px] border border-white/40 bg-[var(--panel)] px-5 py-4 shadow-card backdrop-blur">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <Link
                to="/"
                className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-success text-lg font-extrabold text-white"
              >
                EE
              </Link>
              <div>
                <h1 className="text-xl font-extrabold">My Easy English</h1>
                <p className="text-sm" data-text="muted">
                  {t(language, "learnBurst")}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <nav className="flex items-center gap-2 rounded-full p-1" data-surface="soft">
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                    `rounded-full px-4 py-2 text-sm font-bold transition ${
                      isActive ? "bg-white text-brand shadow dark:bg-slate-700" : "text-slate-500"
                    }`
                  }
                >
                  {t(language, "dashboard")}
                </NavLink>
                <NavLink
                  to="/leaderboard"
                  className={({ isActive }) =>
                    `rounded-full px-4 py-2 text-sm font-bold transition ${
                      isActive ? "bg-white text-brand shadow dark:bg-slate-700" : "text-slate-500"
                    }`
                  }
                >
                  {t(language, "leaderboard")}
                </NavLink>
              </nav>
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

          {user ? (
            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
              <div className="rounded-full bg-brand/10 px-3 py-1 font-extrabold text-brand">
                {user.username}
              </div>
              <div className="rounded-full bg-success/10 px-3 py-1 font-extrabold text-success">
                {user.xp} XP
              </div>
              <div className="rounded-full bg-orange-100 px-3 py-1 font-extrabold text-orange-600 dark:bg-orange-500/10 dark:text-orange-300">
                {user.streak} {t(language, "dayStreak")}
              </div>
            </div>
          ) : null}
        </header>

        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
