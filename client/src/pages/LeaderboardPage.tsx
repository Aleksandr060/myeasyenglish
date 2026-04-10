import { useEffect, useState } from "react";
import { leaderboardApi } from "../api/client";
import { t } from "../lib/i18n";
import { useLanguageStore } from "../store/language";
import type { LeaderboardEntry } from "../types";

export function LeaderboardPage() {
  const language = useLanguageStore((state) => state.language);
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    leaderboardApi().then(setEntries);
  }, []);

  return (
    <div className="space-y-6">
      <section className="animate-pop-in rounded-[32px] bg-gradient-to-r from-success to-brand p-6 text-white shadow-card">
        <p className="text-sm font-black uppercase tracking-[0.28em] text-white/70">{t(language, "top10")}</p>
        <h2 className="mt-3 text-3xl font-extrabold">🏆 {t(language, "leaderboard")}</h2>
        <p className="mt-2 max-w-2xl text-white/85">
          {t(language, "leaderboardSub")}
        </p>
      </section>

      <section className="animate-slide-up rounded-[32px] border border-white/40 bg-[var(--panel)] p-5 shadow-card">
        <div className="space-y-3">
          {entries.map((entry, index) => (
            <div
              key={entry.id}
              className="flex items-center justify-between rounded-3xl border px-4 py-4"
              data-surface="soft"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/10 font-black text-brand">
                  {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : `#${index + 1}`}
                </div>
                <div>
                  <div className="text-lg font-extrabold">{entry.username}</div>
                  <div className="text-sm" data-text="muted">
                    {t(language, "levelShort")} {entry.level} • {entry.streak} {t(language, "dayStreak")}
                  </div>
                </div>
              </div>
              <div className="rounded-full bg-success/10 px-4 py-2 text-sm font-extrabold text-success">
                ⭐ {entry.xp} XP
              </div>
            </div>
          ))}

          {!entries.length ? (
            <div className="rounded-3xl border px-4 py-6 text-sm" data-surface="soft" data-text="muted">
              {t(language, "leaderboardEmpty")}
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}
