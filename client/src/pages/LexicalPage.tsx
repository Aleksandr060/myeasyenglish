import { t } from "../lib/i18n";
import { useLanguageStore } from "../store/language";

type LexicalItem = {
  en: string;
  ru: string;
};

export function LexicalPage() {
  const language = useLanguageStore((state) => state.language);

  const groups: Array<{ title: string; accent: string; items: LexicalItem[] }> = [
    {
      title: t(language, "lexicalPositiveTitle"),
      accent: "text-success",
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
      accent: "text-pink-500",
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
      <section className="rounded-[32px] bg-gradient-to-br from-brand via-indigo-500 to-success p-6 text-white shadow-card">
        <p className="text-sm font-black uppercase tracking-[0.28em] text-white/70">
          {t(language, "lexicalHeroLabel")}
        </p>
        <h2 className="mt-3 max-w-4xl text-3xl font-extrabold">
          {t(language, "lexicalHeroTitle")}
        </h2>
        <p className="mt-3 max-w-3xl text-white/85">
          {t(language, "lexicalHeroBody")}
        </p>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        {groups.map((group) => (
          <article
            key={group.title}
            className="rounded-[28px] border p-5 shadow-card"
            data-surface="base"
          >
            <div className={`text-sm font-black uppercase tracking-[0.22em] ${group.accent}`}>
              {group.title}
            </div>
            <div className="mt-4 space-y-3">
              {group.items.map((item) => (
                <div
                  key={`${group.title}-${item.en}`}
                  className="rounded-2xl border px-4 py-3"
                  data-surface="soft"
                >
                  <div className="font-extrabold">{item.en}</div>
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
          {t(language, "lexicalPhrasesTitle")}
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {phrases.map((phrase) => (
            <div key={phrase.en} className="rounded-3xl border p-4" data-surface="soft">
              <div className="font-extrabold">{phrase.en}</div>
              <div className="mt-1 text-sm" data-text="muted">
                {phrase.ru}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
