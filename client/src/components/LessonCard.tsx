import { Link } from "react-router-dom";
import type { LessonSummary } from "../types";
import { getQuestionTypeLabel, t } from "../lib/i18n";
import { useLanguageStore } from "../store/language";

export function LessonCard({ lesson }: { lesson: LessonSummary }) {
  const language = useLanguageStore((state) => state.language);
  const typeIcon = {
    speaking: "🗣",
    translation: "🌍",
    listening: "🎧",
    vocabulary: "📚",
    fillblank: "✍️"
  }[lesson.type];

  return (
    <article
      className="lesson-card-glow animate-slide-up flex h-full flex-col rounded-[28px] border p-5 shadow-card transition hover:-translate-y-1 hover:shadow-2xl"
      data-surface="base"
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-brand/70">
            {lesson.level} • {typeIcon} {getQuestionTypeLabel(lesson.type, language)}
          </p>
          <h3 className="mt-2 text-xl font-extrabold">{lesson.title}</h3>
          <p className="mt-2 text-sm" data-text="muted">
            {lesson.description}
          </p>
        </div>
        <div className="rounded-full bg-brand/10 px-3 py-1 text-sm font-extrabold text-brand">
          ⭐ {lesson.xpReward} XP
        </div>
      </div>

      <div className="mt-auto flex items-center justify-between text-sm" data-text="muted">
        <span>🧩 {t(language, "questionCount", { count: lesson.questionCount })}</span>
        <span>
          {lesson.completed
            ? `✅ ${t(language, "doneXp", { xp: lesson.xpEarned })}`
            : `✨ ${t(language, "readyToPlay")}`}
        </span>
      </div>

      <Link
        to={`/lesson/${lesson.id}`}
        className="mt-4 inline-flex items-center justify-center rounded-2xl bg-brand px-4 py-3 text-sm font-extrabold text-white transition hover:bg-indigo-500"
      >
        {lesson.completed ? `🔁 ${t(language, "replayLesson")}` : `🚀 ${t(language, "startLesson")}`}
      </Link>
    </article>
  );
}
