import { useState } from "react";
import { t } from "../lib/i18n";
import { useLanguageStore } from "../store/language";

export function TheoryPage() {
  const language = useLanguageStore((state) => state.language);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const modelCards = language === "ru"
    ? [
        { icon: "↘", title: "Нисходящая модель", body: "Звучит завершённо, уверенно и часто используется в утверждениях и чётких ответах." },
        { icon: "↗", title: "Восходящая модель", body: "Передаёт вопросительность, незавершённость, мягкость или ожидание реакции собеседника." },
        { icon: "↘↗", title: "Нисходяще-восходящая модель", body: "Помогает выразить сомнение, скрытый подтекст, осторожность и эмоциональный оттенок." },
        { icon: "↗↘", title: "Восходяще-нисходящая модель", body: "Часто звучит выразительно, эмоционально и может подчёркивать удивление или контраст." }
      ]
    : [
        { icon: "↘", title: "Falling pattern", body: "Sounds complete and confident, and is common in statements and firm answers." },
        { icon: "↗", title: "Rising pattern", body: "Signals a question, incompleteness, politeness or an open expectation from the listener." },
        { icon: "↘↗", title: "Fall-rise pattern", body: "Helps express doubt, subtext, caution and emotional nuance." },
        { icon: "↗↘", title: "Rise-fall pattern", body: "Often sounds expressive and can highlight surprise or strong contrast." }
      ];

  const audioExamples = language === "ru"
    ? [
        {
          id: "joy",
          emoji: "😊",
          title: "Радость",
          cue: "Really!",
          note: "Слушай более светлый тембр, быстрый темп и живой подъём голоса.",
          variants: [
            { label: "Вариант 1", text: "Really!", rate: 1.08, pitch: 1.45 },
            { label: "Вариант 2", text: "Really? That's amazing!", rate: 1.02, pitch: 1.35 },
            { label: "Вариант 3", text: "I am so happy to hear that!", rate: 1.04, pitch: 1.4 }
          ]
        },
        {
          id: "anger",
          emoji: "😠",
          title: "Гнев",
          cue: "Stop that now.",
          note: "Обрати внимание на резкость, более сильное ударение и жёсткое завершение.",
          variants: [
            { label: "Вариант 1", text: "Stop that now.", rate: 0.94, pitch: 0.76 },
            { label: "Вариант 2", text: "I said stop that now.", rate: 0.9, pitch: 0.72 },
            { label: "Вариант 3", text: "Do not do that again.", rate: 0.92, pitch: 0.74 }
          ]
        },
        {
          id: "surprise",
          emoji: "😮",
          title: "Удивление",
          cue: "You did what?",
          note: "Замечай высокий старт, яркий акцент и контрастную интонационную дугу.",
          variants: [
            { label: "Вариант 1", text: "You did what?", rate: 1, pitch: 1.52 },
            { label: "Вариант 2", text: "Wait, you did what?", rate: 0.98, pitch: 1.48 },
            { label: "Вариант 3", text: "I can't believe you did that!", rate: 1.03, pitch: 1.42 }
          ]
        }
      ]
    : [
        {
          id: "joy",
          emoji: "😊",
          title: "Joy",
          cue: "Really!",
          note: "Listen for a brighter voice quality, quicker pace and lively pitch movement.",
          variants: [
            { label: "Variant 1", text: "Really!", rate: 1.08, pitch: 1.45 },
            { label: "Variant 2", text: "Really? That's amazing!", rate: 1.02, pitch: 1.35 },
            { label: "Variant 3", text: "I am so happy to hear that!", rate: 1.04, pitch: 1.4 }
          ]
        },
        {
          id: "anger",
          emoji: "😠",
          title: "Anger",
          cue: "Stop that now.",
          note: "Notice the sharper attack, stronger stress and firmer ending.",
          variants: [
            { label: "Variant 1", text: "Stop that now.", rate: 0.94, pitch: 0.76 },
            { label: "Variant 2", text: "I said stop that now.", rate: 0.9, pitch: 0.72 },
            { label: "Variant 3", text: "Do not do that again.", rate: 0.92, pitch: 0.74 }
          ]
        },
        {
          id: "surprise",
          emoji: "😮",
          title: "Surprise",
          cue: "You did what?",
          note: "Pay attention to the high start, strong accent and contrastive contour.",
          variants: [
            { label: "Variant 1", text: "You did what?", rate: 1, pitch: 1.52 },
            { label: "Variant 2", text: "Wait, you did what?", rate: 0.98, pitch: 1.48 },
            { label: "Variant 3", text: "I can't believe you did that!", rate: 1.03, pitch: 1.42 }
          ]
        }
      ];

  const outcomes = language === "ru"
    ? [
        "Повышение уровня понимания эмоциональной лексики.",
        "Улучшение произносительных навыков и интонационной выразительности.",
        "Развитие навыков аудирования через сочетание визуальных, слуховых и практических методов."
      ]
    : [
        "Better understanding of emotional vocabulary.",
        "Stronger pronunciation skills and intonational expressiveness.",
        "Improved listening through a combination of visual, audio and practical learning methods."
      ];

  const playExample = (id: string, text: string, rate: number, pitch: number) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.onstart = () => setPlayingId(id);
    utterance.onend = () => setPlayingId((current) => (current === id ? null : current));
    utterance.onerror = () => setPlayingId((current) => (current === id ? null : current));
    window.speechSynthesis.speak(utterance);
  };

  const sections = [
    {
      icon: "📘",
      title: t(language, "theoryDefinitionTitle"),
      body: t(language, "theoryDefinitionBody"),
      accent: "text-brand"
    },
    {
      icon: "🎧",
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
      icon: "💡",
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
      icon: "🗣",
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
          🎼 {t(language, "theoryHeroTitle")}
        </h2>
        <p className="mt-3 max-w-3xl text-white/85">
          {t(language, "theoryHeroBody")}
        </p>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          <div className="rounded-3xl bg-white/15 p-4">
            <div className="text-2xl">🔊</div>
            <div className="mt-2 text-sm font-bold text-white/90">intonation</div>
          </div>
          <div className="rounded-3xl bg-white/15 p-4">
            <div className="text-2xl">🌊</div>
            <div className="mt-2 text-sm font-bold text-white/90">rhythm and melody</div>
          </div>
          <div className="rounded-3xl bg-white/15 p-4">
            <div className="text-2xl">✨</div>
            <div className="mt-2 text-sm font-bold text-white/90">meaning and tone</div>
          </div>
        </div>
      </section>

      <section className="rounded-[32px] border p-6 shadow-card" data-surface="base">
        <p className="text-sm font-black uppercase tracking-[0.24em] text-brand/70">
          🔷 {language === "ru" ? "Интонационные модели" : "Intonation models"}
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {modelCards.map((card) => (
            <div key={card.title} className="rounded-3xl border p-4" data-surface="soft">
              <div className="text-2xl font-black text-brand">{card.icon}</div>
              <div className="mt-2 font-extrabold">{card.title}</div>
              <div className="mt-2 text-sm leading-6" data-text="muted">
                {card.body}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        {sections.map((section) => (
          <article
            key={section.title}
            className="rounded-[28px] border p-5 shadow-card"
            data-surface="base"
          >
            <div className={`text-sm font-black uppercase tracking-[0.22em] ${section.accent}`}>
              {section.icon} {section.title}
            </div>
            <p className="mt-3 text-sm leading-7" data-text="muted">
              {section.body}
            </p>
            {"points" in section && section.points ? (
              <div className="mt-4 space-y-3">
                {section.points.map((point) => (
                  <div key={point} className="rounded-2xl border px-4 py-3 text-sm leading-6" data-surface="soft">
                    <span className="mr-2">•</span>
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
          🎧 {language === "ru" ? "Аудиопримеры эмоций" : "Audio emotion examples"}
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {audioExamples.map((example) => (
            <div key={example.title} className="rounded-3xl border p-4" data-surface="soft">
              <div className="text-2xl">{example.emoji}</div>
              <div className="mt-2 font-extrabold">{example.title}</div>
              <div className="mt-2 rounded-2xl bg-white/60 px-3 py-2 text-sm font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-100">
                {example.cue}
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {example.variants.map((variant, index) => {
                  const variantId = `${example.id}-${index}`;
                  const isPlaying = playingId === variantId;

                  return (
                    <button
                      key={variantId}
                      type="button"
                      onClick={() => playExample(variantId, variant.text, variant.rate, variant.pitch)}
                      className={`rounded-full px-3 py-2 text-xs font-extrabold transition ${
                        isPlaying
                          ? "bg-brand text-white"
                          : "bg-white text-slate-700 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
                      }`}
                    >
                      {isPlaying ? "🔊" : "▶"} {variant.label}
                    </button>
                  );
                })}
              </div>
              <div className="mt-3 text-sm leading-6" data-text="muted">
                {example.note}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[32px] border p-6 shadow-card" data-surface="base">
        <p className="text-sm font-black uppercase tracking-[0.24em] text-brand/70">
          🎯 {t(language, "theoryPracticeTitle")}
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {practicePoints.map((point) => (
            <div key={point} className="rounded-3xl border p-4 text-sm leading-6" data-surface="soft">
              <div className="mb-2 text-xl">🎤</div>
              {point}
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[32px] border p-6 shadow-card" data-surface="base">
        <p className="text-sm font-black uppercase tracking-[0.24em] text-brand/70">
          ✅ {language === "ru" ? "Ожидаемые результаты" : "Expected outcomes"}
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {outcomes.map((item) => (
            <div key={item} className="rounded-3xl border p-4 text-sm leading-6" data-surface="soft">
              <div className="mb-2 text-xl">✨</div>
              {item}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
