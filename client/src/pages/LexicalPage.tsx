import { t } from "../lib/i18n";
import { useLanguageStore } from "../store/language";

type LexicalItem = {
  en: string;
  ru: string;
};

export function LexicalPage() {
  const language = useLanguageStore((state) => state.language);
  const colorConcept = language === "ru"
    ? [
        { color: "bg-emerald-500", label: "Зелёный", note: "радость" },
        { color: "bg-red-500", label: "Красный", note: "гнев" },
        { color: "bg-amber-400", label: "Жёлтый", note: "удивление" },
        { color: "bg-sky-500", label: "Синий", note: "нейтральная теория" },
        { color: "bg-slate-400", label: "Серый", note: "печаль" }
      ]
    : [
        { color: "bg-emerald-500", label: "Green", note: "joy" },
        { color: "bg-red-500", label: "Red", note: "anger" },
        { color: "bg-amber-400", label: "Yellow", note: "surprise" },
        { color: "bg-sky-500", label: "Blue", note: "neutral theory" },
        { color: "bg-slate-400", label: "Grey", note: "sadness" }
      ];

  const dialogues = [
    {
      title: language === "ru" ? "Диалог: удивление" : "Dialogue: surprise",
      lines: [
        {
          en: "A: You already finished the whole project?",
          ru: "A: Ты уже закончил весь проект?"
        },
        {
          en: "B: Yes, this morning.",
          ru: "B: Да, сегодня утром."
        },
        {
          en: "A: Really? That quickly?",
          ru: "A: Серьёзно? Так быстро?"
        },
        {
          en: "B: Yes, because I prepared everything in advance.",
          ru: "B: Да, потому что я подготовил всё заранее."
        }
      ]
    },
    {
      title: language === "ru" ? "Диалог: напряжение и гнев" : "Dialogue: tension and anger",
      lines: [
        {
          en: "A: Why didn't you send the report on time again?",
          ru: "A: Почему ты снова не отправил отчёт вовремя?"
        },
        {
          en: "B: I was waiting for confirmation from the team.",
          ru: "B: Я ждал подтверждения от команды."
        },
        {
          en: "A: But you should have warned us earlier.",
          ru: "A: Но нужно было предупредить заранее."
        },
        {
          en: "B: I understand. Next time I will say it immediately.",
          ru: "B: Понимаю, в следующий раз я сообщу сразу."
        }
      ]
    }
  ];

  const groups: Array<{
    title: string;
    accent: string;
    icon: string;
    panelClass: string;
    badgeClass: string;
    itemClass: string;
    items: LexicalItem[];
  }> = [
    {
      title: t(language, "lexicalPositiveTitle"),
      accent: "text-success",
      icon: "😊",
      panelClass: "border-emerald-400/30 bg-emerald-500/8",
      badgeClass: "bg-emerald-500 text-white",
      itemClass: "border-emerald-300/25 bg-emerald-500/10",
      items: [
        { en: "Happiness", ru: "счастье" },
        { en: "Joy", ru: "радость" },
        { en: "Excitement", ru: "восторг, воодушевление" },
        { en: "Love", ru: "любовь" },
        { en: "Contentment", ru: "удовлетворённость" },
        { en: "Pride", ru: "гордость" },
        { en: "Relief", ru: "облегчение" },
        { en: "Hope", ru: "надежда" },
        { en: "Gratitude", ru: "благодарность" },
        { en: "Amusement", ru: "веселье" }
      ]
    },
    {
      title: t(language, "lexicalNegativeTitle"),
      accent: "text-danger",
      icon: "😟",
      panelClass: "border-red-400/30 bg-red-500/8",
      badgeClass: "bg-red-500 text-white",
      itemClass: "border-red-300/25 bg-red-500/10",
      items: [
        { en: "Sadness", ru: "грусть" },
        { en: "Anger", ru: "злость" },
        { en: "Fear", ru: "страх" },
        { en: "Anxiety", ru: "тревога" },
        { en: "Jealousy", ru: "ревность" },
        { en: "Guilt", ru: "вина" },
        { en: "Shame", ru: "стыд" },
        { en: "Loneliness", ru: "одиночество" },
        { en: "Frustration", ru: "раздражение, фрустрация" },
        { en: "Disappointment", ru: "разочарование" }
      ]
    },
    {
      title: t(language, "lexicalMixedTitle"),
      accent: "text-orange-500",
      icon: "😮",
      panelClass: "border-amber-300/35 bg-amber-400/10",
      badgeClass: "bg-amber-400 text-slate-900",
      itemClass: "border-amber-300/30 bg-amber-400/12",
      items: [
        { en: "Surprise", ru: "удивление" },
        { en: "Shock", ru: "шок" },
        { en: "Confusion", ru: "замешательство" },
        { en: "Amazement", ru: "изумление" },
        { en: "Curiosity", ru: "любопытство" }
      ]
    },
    {
      title: t(language, "lexicalCalmTitle"),
      accent: "text-brand",
      icon: "😌",
      panelClass: "border-sky-400/30 bg-sky-500/8",
      badgeClass: "bg-sky-500 text-white",
      itemClass: "border-sky-300/25 bg-sky-500/10",
      items: [
        { en: "Calmness", ru: "спокойствие" },
        { en: "Relaxation", ru: "расслабление" },
        { en: "Boredom", ru: "скука" },
        { en: "Indifference", ru: "безразличие" },
        { en: "Serenity", ru: "умиротворение" }
      ]
    },
    {
      title: t(language, "lexicalIntenseTitle"),
      accent: "text-red-400",
      icon: "😱",
      panelClass: "border-red-500/35 bg-red-600/10",
      badgeClass: "bg-red-600 text-white",
      itemClass: "border-red-400/25 bg-red-600/12",
      items: [
        { en: "Rage", ru: "ярость" },
        { en: "Panic", ru: "паника" },
        { en: "Despair", ru: "отчаяние" },
        { en: "Euphoria", ru: "эйфория" },
        { en: "Terror", ru: "ужас" }
      ]
    },
    {
      title: t(language, "lexicalSocialTitle"),
      accent: "text-cyan-500",
      icon: "🤝",
      panelClass: "border-slate-400/30 bg-slate-400/10",
      badgeClass: "bg-slate-400 text-slate-900",
      itemClass: "border-slate-300/25 bg-slate-400/10",
      items: [
        { en: "Empathy", ru: "эмпатия" },
        { en: "Compassion", ru: "сострадание" },
        { en: "Affection", ru: "привязанность" },
        { en: "Envy", ru: "зависть" },
        { en: "Admiration", ru: "восхищение" }
      ]
    }
  ];

  const phrases: LexicalItem[] = [
    { en: "I feel happy", ru: "Я чувствую себя счастливым" },
    { en: "She is upset", ru: "Она расстроена" },
    { en: "He looks anxious", ru: "Он выглядит тревожным" },
    { en: "They are excited", ru: "Они взволнованы" },
    { en: "I'm feeling calm today", ru: "Сегодня я чувствую спокойствие" }
  ];

  return (
    <div className="space-y-6">
      <section className="rounded-[32px] bg-gradient-to-r from-emerald-500 via-amber-400 to-red-500 p-[1px] shadow-card">
        <div className="rounded-[31px] bg-gradient-to-br from-brand via-indigo-500 to-success p-6 text-white">
        <p className="text-sm font-black uppercase tracking-[0.28em] text-white/70">
          {t(language, "lexicalHeroLabel")}
        </p>
        <h2 className="mt-3 max-w-4xl text-3xl font-extrabold">
          📚 {t(language, "lexicalHeroTitle")}
        </h2>
        <p className="mt-3 max-w-3xl text-white/85">
          {t(language, "lexicalHeroBody")}
        </p>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          <div className="rounded-3xl bg-emerald-500/18 p-4 ring-1 ring-white/10">
            <div className="text-2xl">💬</div>
            <div className="mt-2 text-sm font-bold text-white/90">emotion words</div>
          </div>
          <div className="rounded-3xl bg-sky-500/18 p-4 ring-1 ring-white/10">
            <div className="text-2xl">🧠</div>
            <div className="mt-2 text-sm font-bold text-white/90">speaking memory</div>
          </div>
          <div className="rounded-3xl bg-amber-400/18 p-4 ring-1 ring-white/10">
            <div className="text-2xl">🌍</div>
            <div className="mt-2 text-sm font-bold text-white/90">real-life phrases</div>
          </div>
        </div>
        </div>
      </section>

      <section className="rounded-[32px] border p-6 shadow-card" data-surface="base">
        <p className="text-sm font-black uppercase tracking-[0.24em] text-brand/70">
          🎨 {language === "ru" ? "Цветовая концепция проекта" : "Project color concept"}
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-5">
          {colorConcept.map((item) => (
            <div key={item.label} className="rounded-3xl border p-4 text-center" data-surface="soft">
              <div className={`mx-auto h-10 w-10 rounded-full ${item.color}`} />
              <div className="mt-3 font-extrabold">{item.label}</div>
              <div className="mt-1 text-sm" data-text="muted">
                {item.note}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        {groups.map((group) => (
          <article
            key={group.title}
            className={`rounded-[28px] border p-5 shadow-card ${group.panelClass}`}
          >
            <div className="flex items-center gap-3">
              <div className={`flex h-11 w-11 items-center justify-center rounded-full text-xl font-black shadow-sm ${group.badgeClass}`}>
                {group.icon}
              </div>
              <div className={`text-sm font-black uppercase tracking-[0.22em] ${group.accent}`}>
                {group.title}
              </div>
            </div>
            <div className="mt-4 space-y-3">
              {group.items.map((item) => (
                <div
                  key={`${group.title}-${item.en}`}
                  className={`rounded-2xl border px-4 py-3 ${group.itemClass}`}
                >
                  <div className="font-extrabold">{group.icon} {item.en}</div>
                  <div className="mt-1 text-sm" data-text="muted">
                    {item.ru}
                  </div>
                </div>
              ))}
            </div>
          </article>
        ))}
      </section>

      <section className="rounded-[32px] border p-6 shadow-card" data-surface="base">
        <p className="text-sm font-black uppercase tracking-[0.24em] text-brand/70">
          ✍️ {t(language, "lexicalPhrasesTitle")}
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {phrases.map((phrase) => (
            <div key={phrase.en} className="rounded-3xl border p-4" data-surface="soft">
              <div className="font-extrabold">💬 {phrase.en}</div>
              <div className="mt-1 text-sm" data-text="muted">
                {phrase.ru}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[32px] border p-6 shadow-card" data-surface="base">
        <p className="text-sm font-black uppercase tracking-[0.24em] text-brand/70">
          🗨️ {language === "ru" ? "Контекстуальные диалоги" : "Contextual dialogues"}
        </p>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          {dialogues.map((dialogue) => (
            <div key={dialogue.title} className="rounded-3xl border p-4" data-surface="soft">
              <div className="font-extrabold">{dialogue.title}</div>
              <div className="mt-3 space-y-2">
                {dialogue.lines.map((line) => (
                  <div key={line.en} className="rounded-2xl bg-white/60 px-3 py-2 text-sm leading-6 dark:bg-slate-800">
                    <div className="font-semibold">{line.en}</div>
                    <div className="mt-1 text-xs" data-text="muted">
                      {line.ru}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
