import { t } from "../lib/i18n";
import { useLanguageStore } from "../store/language";

export function TheoryPage() {
  const language = useLanguageStore((state) => state.language);

  const sections = [
    {
      title: t(language, "theoryDefinitionTitle"),
      body: t(language, "theoryDefinitionBody"),
      accent: "text-brand"
    },
    {
      title: t(language, "theoryPhoneticTitle"),
      body: t(language, "theoryPhoneticBody"),
      accent: "text-success",
      points: [
        t(language, "theoryPhoneticPointOne"),
        t(language, "theoryPhoneticPointTwo"),
        t(language, "theoryPhoneticPointThree")
      ]
    },
    {
      title: t(language, "theorySemanticTitle"),
      body: t(language, "theorySemanticBody"),
      accent: "text-orange-500",
      points: [
        t(language, "theorySemanticPointOne"),
        t(language, "theorySemanticPointTwo"),
        t(language, "theorySemanticPointThree"),
        t(language, "theorySemanticPointFour")
      ]
    },
    {
      title: t(language, "theoryPragmaticTitle"),
      body: t(language, "theoryPragmaticBody"),
      accent: "text-pink-500",
      points: [
        t(language, "theoryPragmaticPointOne"),
        t(language, "theoryPragmaticPointTwo"),
        t(language, "theoryPragmaticPointThree")
      ]
    }
  ];

  const practicePoints = [
    t(language, "theoryPracticePointOne"),
    t(language, "theoryPracticePointTwo"),
    t(language, "theoryPracticePointThree")
  ];

  return (
    <div className="space-y-6">
      <section className="rounded-[32px] bg-gradient-to-br from-brand via-indigo-500 to-success p-6 text-white shadow-card">
        <p className="text-sm font-black uppercase tracking-[0.28em] text-white/70">
          {t(language, "theoryHeroLabel")}
        </p>
        <h2 className="mt-3 max-w-4xl text-3xl font-extrabold">
          {t(language, "theoryHeroTitle")}
        </h2>
        <p className="mt-3 max-w-3xl text-white/85">
          {t(language, "theoryHeroBody")}
        </p>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        {sections.map((section) => (
          <article
            key={section.title}
            className="rounded-[28px] border p-5 shadow-card"
            data-surface="base"
          >
            <div className={`text-sm font-black uppercase tracking-[0.22em] ${section.accent}`}>
              {section.title}
            </div>
            <p className="mt-3 text-sm leading-7" data-text="muted">
              {section.body}
            </p>
            {"points" in section && section.points ? (
              <div className="mt-4 space-y-3">
                {section.points.map((point) => (
                  <div key={point} className="rounded-2xl border px-4 py-3 text-sm leading-6" data-surface="soft">
                    {point}
                  </div>
                ))}
              </div>
            ) : null}
          </article>
        ))}
      </section>

      <section className="rounded-[32px] border p-6 shadow-card" data-surface="base">
        <p className="text-sm font-black uppercase tracking-[0.24em] text-brand/70">
          {t(language, "theoryPracticeTitle")}
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {practicePoints.map((point) => (
            <div key={point} className="rounded-3xl border p-4 text-sm leading-6" data-surface="soft">
              {point}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
