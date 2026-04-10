import { useEffect, useMemo, useState } from "react";
import { lessonsApi, meApi } from "../api/client";
import { LessonCard } from "../components/LessonCard";
import { ProgressBar } from "../components/ProgressBar";
import { formatLocalizedDate, getQuestionTypeLabel, t } from "../lib/i18n";
import { getLevelProgress, levelOrder } from "../lib/utils";
import { useAuthStore } from "../store/auth";
import { useLanguageStore } from "../store/language";
import type { LessonSummary, Level, QuestionType } from "../types";

export function DashboardPage() {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const language = useLanguageStore((state) => state.language);
  const [lessons, setLessons] = useState<LessonSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [levelFilter, setLevelFilter] = useState<Level | "all">("all");
  const [typeFilter, setTypeFilter] = useState<QuestionType | "all">("all");

  useEffect(() => {
    const loadDashboard = async () => {
      setLoading(true);
      const [profile, lessonList] = await Promise.all([meApi(), lessonsApi()]);
      setUser(profile);
      setLessons(lessonList);
      setLoading(false);
    };

    loadDashboard();
  }, [setUser]);

  if (!user) return null;

  const progressValue = getLevelProgress(user.level, user.xp, user.nextLevelXp);
  const completedLessons = lessons.filter((lesson) => lesson.completed).length;
  const lessonTypes: Array<QuestionType | "all"> = [
    "all",
    "speaking",
    "translation",
    "listening",
    "vocabulary",
    "fillblank"
  ];

  const filteredLessons = useMemo(
    () =>
      lessons.filter((lesson) => {
        const levelMatches = levelFilter === "all" || lesson.level === levelFilter;
        const typeMatches = typeFilter === "all" || lesson.type === typeFilter;
        return levelMatches && typeMatches;
      }),
    [lessons, levelFilter, typeFilter]
  );

  const groupedLessons = useMemo(
    () =>
      levelOrder
        .map((level) => ({
          level,
          lessons: filteredLessons.filter((lesson) => lesson.level === level)
        }))
        .filter((group) => group.lessons.length > 0),
    [filteredLessons]
  );
  return (
    <div className="space-y-6">
      <section className="grid gap-4 lg:grid-cols-[1.2fr,0.8fr]">
        <div className="animate-pop-in relative overflow-hidden rounded-[32px] bg-gradient-to-br from-brand via-indigo-500 to-success p-6 text-white shadow-card">
          <div className="decor-orb animate-float absolute -right-8 top-12 h-20 w-20 bg-white/20" />
          <p className="text-sm font-black uppercase tracking-[0.3em] text-white/70">{t(language, "dashboard")}</p>
          <h2 className="mt-3 text-3xl font-extrabold">{t(language, "dashboardHero")}</h2>
          <p className="mt-2 max-w-2xl text-white/85">
            {t(language, "dashboardSub", { level: user.level })}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <span className="edu-chip">🎯 focused practice</span>
            <span className="edu-chip">🗣 confident speaking</span>
            <span className="edu-chip">✨ steady growth</span>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-3xl bg-white/15 p-4 backdrop-blur">
              <div className="feature-dot">🏅</div>
              <div className="text-sm font-bold text-white/90">{t(language, "currentLevel")}</div>
              <div className="mt-1 text-3xl font-black">{user.level}</div>
            </div>
            <div className="rounded-3xl bg-white/15 p-4 backdrop-blur">
              <div className="feature-dot">⭐</div>
              <div className="text-sm font-bold text-white/90">XP</div>
              <div className="mt-1 text-3xl font-black">{user.xp}</div>
            </div>
            <div className="rounded-3xl bg-white/15 p-4 backdrop-blur">
              <div className="feature-dot">🔥</div>
              <div className="text-sm font-bold text-white/90">{t(language, "streak")}</div>
              <div className="mt-1 text-3xl font-black">{user.streak} {language === "ru" ? "дн." : "days"}</div>
            </div>
          </div>

          <div className="mt-6 rounded-3xl bg-white/10 p-4">
            <ProgressBar
              value={progressValue}
              label={t(language, "progressToXp", { xp: user.nextLevelXp })}
              colorClass="from-white to-emerald-200"
              labelClassName="text-white/90"
              trackClassName="bg-white/90"
            />
          </div>
        </div>

        <div className="grid gap-4">
          <div className="animate-slide-up rounded-[28px] border border-white/40 bg-[var(--panel)] p-5 shadow-card">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-brand/70">{t(language, "today")}</p>
            <h3 className="mt-2 text-2xl font-black leading-tight">☀️ {t(language, "dailyBoost")}</h3>
            <p className="mt-2 text-base font-bold leading-8 text-slate-500 dark:text-slate-300">
              {t(language, "completeOne")}
            </p>
          </div>
          <div className="animate-slide-up rounded-[28px] border border-white/40 bg-[var(--panel)] p-5 shadow-card">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-success/70">{t(language, "completed")}</p>
            <div className="mt-2 text-3xl font-black leading-none">🎉 {completedLessons}</div>
            <p className="mt-2 text-base font-bold leading-8 text-slate-500 dark:text-slate-300">
              {t(language, "lessonsFinished")}
            </p>
          </div>
        </div>
      </section>

      <section
        className="animate-slide-up rounded-[32px] border p-6 shadow-card"
        data-surface="base"
      >
        <div className="grid gap-5 lg:grid-cols-[1.15fr,0.85fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.24em] text-brand/70">
              {t(language, "intonationLabel")}
            </p>
            <h3 className="mt-2 text-2xl font-extrabold">🎼 {t(language, "intonationTitle")}</h3>
            <p className="mt-3 max-w-3xl text-sm leading-7" data-text="muted">
              {t(language, "intonationBody")}
            </p>
          </div>

          <div className="grid gap-3">
            <div className="rounded-3xl border p-4" data-surface="soft">
              <p className="text-sm font-bold">🫧 {t(language, "intonationTipOne")}</p>
            </div>
            <div className="rounded-3xl border p-4" data-surface="soft">
              <p className="text-sm font-bold">🎤 {t(language, "intonationTipTwo")}</p>
            </div>
            <div className="rounded-3xl border p-4" data-surface="soft">
              <p className="text-sm font-bold">🌊 {t(language, "intonationTipThree")}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr] lg:items-start">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.24em] text-brand/70">{t(language, "lessons")}</p>
              <h3 className="text-2xl font-extrabold">🧭 {t(language, "availableAdventures")}</h3>
            </div>
            <span className="rounded-full bg-slate-100 px-3 py-2 text-sm font-bold text-slate-500 dark:bg-slate-800 dark:text-slate-200">
              ✨ {filteredLessons.length} {t(language, "total")}
            </span>
          </div>

          <div className="rounded-[28px] border p-4 shadow-card" data-surface="base">
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.22em] text-brand/70">
                  {t(language, "browseLessons")}
                </p>
                <div className="mt-1 text-sm" data-text="muted">
                  {t(language, "groupedByLevel")}
                </div>
              </div>

              <div className="grid gap-4 lg:grid-cols-2">
                <div>
                  <div className="mb-2 text-xs font-black uppercase tracking-[0.18em]" data-text="muted">
                    {t(language, "filterByLevel")}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => setLevelFilter("all")}
                      className={`rounded-full px-3 py-2 text-sm font-bold transition ${
                        levelFilter === "all" ? "bg-brand text-white" : ""
                      }`}
                      data-surface={levelFilter === "all" ? undefined : "soft"}
                    >
                      {t(language, "allLevels")}
                    </button>
                    {levelOrder.map((level) => (
                      <button
                        key={level}
                        type="button"
                        onClick={() => setLevelFilter(level)}
                        className={`rounded-full px-3 py-2 text-sm font-bold transition ${
                          levelFilter === level ? "bg-brand text-white" : ""
                        }`}
                        data-surface={levelFilter === level ? undefined : "soft"}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="mb-2 text-xs font-black uppercase tracking-[0.18em]" data-text="muted">
                    {t(language, "filterByType")}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {lessonTypes.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setTypeFilter(type)}
                        className={`rounded-full px-3 py-2 text-sm font-bold transition ${
                          typeFilter === type ? "bg-success text-white" : ""
                        }`}
                        data-surface={typeFilter === type ? undefined : "soft"}
                      >
                        {type === "all" ? t(language, "allTypes") : getQuestionTypeLabel(type, language)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="rounded-[28px] border border-white/40 bg-[var(--panel)] p-8 text-center shadow-card">
              {t(language, "loadingLessons")}
            </div>
          ) : groupedLessons.length === 0 ? (
            <div className="rounded-[28px] border p-8 text-center shadow-card" data-surface="base">
              {t(language, "noLessonsMatch")}
            </div>
          ) : (
            <div className="space-y-6">
              {groupedLessons.map((group) => (
                <section key={group.level} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="text-lg font-extrabold">📍 {group.level}</div>
                    <div className="rounded-full px-3 py-1 text-xs font-black uppercase tracking-[0.16em]" data-surface="soft">
                      {group.lessons.length} {t(language, "total")}
                    </div>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    {group.lessons.map((lesson) => (
                      <LessonCard key={lesson.id} lesson={lesson} />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}
        </div>

        <div className="animate-slide-up self-start rounded-[32px] border border-white/40 bg-[var(--panel)] p-5 shadow-card">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-brand/70">{t(language, "recentActivity")}</p>
          <h3 className="mt-2 text-2xl font-extrabold">🌟 {t(language, "lastWins")}</h3>
          <div className="mt-4 space-y-3">
            {user.recentActivity.length ? (
              user.recentActivity.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-3xl border px-4 py-3"
                  data-surface="soft"
                >
                  <div>
                    <div className="font-bold">{item.lessonTitle}</div>
                    <div className="text-sm" data-text="muted">
                      {formatLocalizedDate(item.completedAt, language)}
                    </div>
                  </div>
                  <div className="rounded-full bg-success/10 px-3 py-1 text-sm font-extrabold text-success">
                    +{item.xpEarned} XP ⭐
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-3xl border px-4 py-6 text-sm" data-surface="soft">
                {t(language, "noActivity")}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
