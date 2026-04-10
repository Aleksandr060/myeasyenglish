import type { Level } from "@prisma/client";
import type { SeedLesson, SeedQuestion } from "./intonationLessons.js";

type MatrixType = SeedLesson["type"];

type BankItem = {
  label: string;
  wordEn: string;
  wordRu: string;
  english: string;
  russian: string;
  blankSentence: string;
  blankAnswer: string;
};

const TARGET_COUNT = 10;
const levels: Level[] = ["A1", "A2", "B1", "B2", "C1", "C2"];
const types: MatrixType[] = ["vocabulary", "translation", "listening", "fillblank", "speaking"];

const xpRewardByLevel: Record<Level, number> = {
  A1: 100,
  A2: 120,
  B1: 140,
  B2: 150,
  C1: 170,
  C2: 180
};

const typeTitle: Record<MatrixType, string> = {
  vocabulary: "Vocabulary",
  translation: "Translation",
  listening: "Listening",
  fillblank: "Fillblank",
  speaking: "Speaking"
};

const typeDescription: Record<MatrixType, string> = {
  vocabulary: "Build key vocabulary with focused topic practice.",
  translation: "Translate natural phrases for this level and topic.",
  listening: "Recognize the target phrases by ear and choose accurately.",
  fillblank: "Complete the sentence with the right word in context.",
  speaking: "Say the phrase aloud and practice clear pronunciation."
};

const banksByLevel: Record<Level, BankItem[]> = {
  A1: [
    { label: "Introductions", wordEn: "name", wordRu: "имя", english: "My name is Alex.", russian: "Меня зовут Алекс.", blankSentence: "My ___ is Alex.", blankAnswer: "name" },
    { label: "Family", wordEn: "mother", wordRu: "мама", english: "This is my mother.", russian: "Это моя мама.", blankSentence: "This is my ___.", blankAnswer: "mother" },
    { label: "Home", wordEn: "kitchen", wordRu: "кухня", english: "The kitchen is clean.", russian: "Кухня чистая.", blankSentence: "The ___ is clean.", blankAnswer: "kitchen" },
    { label: "Food", wordEn: "apple", wordRu: "яблоко", english: "I have an apple.", russian: "У меня есть яблоко.", blankSentence: "I have an ___.", blankAnswer: "apple" },
    { label: "Colors", wordEn: "blue", wordRu: "синий", english: "The sky is blue.", russian: "Небо синее.", blankSentence: "The sky is ___.", blankAnswer: "blue" },
    { label: "Numbers", wordEn: "seven", wordRu: "семь", english: "I have seven books.", russian: "У меня семь книг.", blankSentence: "I have ___ books.", blankAnswer: "seven" },
    { label: "Weekdays", wordEn: "Monday", wordRu: "понедельник", english: "Today is Monday.", russian: "Сегодня понедельник.", blankSentence: "Today is ___.", blankAnswer: "Monday" },
    { label: "Time", wordEn: "morning", wordRu: "утро", english: "I study in the morning.", russian: "Я учусь утром.", blankSentence: "I study in the ___.", blankAnswer: "morning" },
    { label: "School", wordEn: "teacher", wordRu: "учитель", english: "The teacher is kind.", russian: "Учитель добрый.", blankSentence: "The ___ is kind.", blankAnswer: "teacher" },
    { label: "Actions", wordEn: "read", wordRu: "читать", english: "I read every day.", russian: "Я читаю каждый день.", blankSentence: "I ___ every day.", blankAnswer: "read" }
  ],
  A2: [
    { label: "Travel", wordEn: "ticket", wordRu: "билет", english: "I need a train ticket.", russian: "Мне нужен билет на поезд.", blankSentence: "I need a train ___.", blankAnswer: "ticket" },
    { label: "Shopping", wordEn: "market", wordRu: "рынок", english: "We are going to the market.", russian: "Мы идем на рынок.", blankSentence: "We are going to the ___.", blankAnswer: "market" },
    { label: "Daily Routine", wordEn: "breakfast", wordRu: "завтрак", english: "I make breakfast at seven.", russian: "Я готовлю завтрак в семь.", blankSentence: "I make ___ at seven.", blankAnswer: "breakfast" },
    { label: "Work", wordEn: "office", wordRu: "офис", english: "She works in an office.", russian: "Она работает в офисе.", blankSentence: "She works in an ___.", blankAnswer: "office" },
    { label: "Plans", wordEn: "weekend", wordRu: "выходные", english: "We will travel this weekend.", russian: "Мы поедем в путешествие на выходных.", blankSentence: "We will travel this ___.", blankAnswer: "weekend" },
    { label: "Health", wordEn: "doctor", wordRu: "врач", english: "I need to see a doctor.", russian: "Мне нужно обратиться к врачу.", blankSentence: "I need to see a ___.", blankAnswer: "doctor" },
    { label: "Transport", wordEn: "station", wordRu: "станция", english: "The station is nearby.", russian: "Станция рядом.", blankSentence: "The ___ is nearby.", blankAnswer: "station" },
    { label: "Friends", wordEn: "invite", wordRu: "приглашать", english: "I want to invite my friend.", russian: "Я хочу пригласить своего друга.", blankSentence: "I want to ___ my friend.", blankAnswer: "invite" },
    { label: "Weather", wordEn: "rainy", wordRu: "дождливый", english: "It is rainy today.", russian: "Сегодня дождливо.", blankSentence: "It is ___ today.", blankAnswer: "rainy" },
    { label: "Directions", wordEn: "corner", wordRu: "угол", english: "Turn left at the corner.", russian: "Поверните налево на углу.", blankSentence: "Turn left at the ___.", blankAnswer: "corner" }
  ],
  B1: [
    { label: "Opinions", wordEn: "opinion", wordRu: "мнение", english: "In my opinion, this plan is realistic.", russian: "По моему мнению, этот план реалистичен.", blankSentence: "In my ___, this plan is realistic.", blankAnswer: "opinion" },
    { label: "Travel Stories", wordEn: "journey", wordRu: "путешествие", english: "The journey was longer than expected.", russian: "Путешествие оказалось дольше, чем ожидалось.", blankSentence: "The ___ was longer than expected.", blankAnswer: "journey" },
    { label: "Problem Solving", wordEn: "solution", wordRu: "решение", english: "We need a practical solution.", russian: "Нам нужно практичное решение.", blankSentence: "We need a practical ___.", blankAnswer: "solution" },
    { label: "Work Life", wordEn: "report", wordRu: "отчет", english: "I finished the report on time.", russian: "Я закончил отчет вовремя.", blankSentence: "I finished the ___ on time.", blankAnswer: "report" },
    { label: "Feelings", wordEn: "relief", wordRu: "облегчение", english: "The news brought me relief.", russian: "Эта новость принесла мне облегчение.", blankSentence: "The news brought me ___.", blankAnswer: "relief" },
    { label: "Communication", wordEn: "message", wordRu: "сообщение", english: "Your message was very clear.", russian: "Твое сообщение было очень ясным.", blankSentence: "Your ___ was very clear.", blankAnswer: "message" },
    { label: "Learning", wordEn: "progress", wordRu: "прогресс", english: "I can see real progress now.", russian: "Теперь я вижу реальный прогресс.", blankSentence: "I can see real ___ now.", blankAnswer: "progress" },
    { label: "Decisions", wordEn: "choice", wordRu: "выбор", english: "It was not an easy choice.", russian: "Это был нелегкий выбор.", blankSentence: "It was not an easy ___.", blankAnswer: "choice" },
    { label: "Social Situations", wordEn: "apology", wordRu: "извинение", english: "Her apology sounded sincere.", russian: "Ее извинение звучало искренне.", blankSentence: "Her ___ sounded sincere.", blankAnswer: "apology" },
    { label: "Goals", wordEn: "goal", wordRu: "цель", english: "My goal is to speak more confidently.", russian: "Моя цель — говорить увереннее.", blankSentence: "My ___ is to speak more confidently.", blankAnswer: "goal" }
  ],
  B2: [
    { label: "Negotiation", wordEn: "compromise", wordRu: "компромисс", english: "We should look for a compromise.", russian: "Нам стоит искать компромисс.", blankSentence: "We should look for a ___.", blankAnswer: "compromise" },
    { label: "Analysis", wordEn: "evidence", wordRu: "доказательство", english: "The evidence supports this view.", russian: "Доказательства поддерживают эту точку зрения.", blankSentence: "The ___ supports this view.", blankAnswer: "evidence" },
    { label: "Teamwork", wordEn: "priority", wordRu: "приоритет", english: "This task is our top priority.", russian: "Эта задача — наш главный приоритет.", blankSentence: "This task is our top ___.", blankAnswer: "priority" },
    { label: "Planning", wordEn: "deadline", wordRu: "срок", english: "The deadline is too close.", russian: "Срок слишком близок.", blankSentence: "The ___ is too close.", blankAnswer: "deadline" },
    { label: "Conflict", wordEn: "tension", wordRu: "напряжение", english: "You could feel the tension in the room.", russian: "В комнате чувствовалось напряжение.", blankSentence: "You could feel the ___ in the room.", blankAnswer: "tension" },
    { label: "Feedback", wordEn: "recommendation", wordRu: "рекомендация", english: "I appreciate your recommendation.", russian: "Я ценю вашу рекомендацию.", blankSentence: "I appreciate your ___.", blankAnswer: "recommendation" },
    { label: "Decision Making", wordEn: "approach", wordRu: "подход", english: "We need a more balanced approach.", russian: "Нам нужен более сбалансированный подход.", blankSentence: "We need a more balanced ___.", blankAnswer: "approach" },
    { label: "Public Response", wordEn: "reaction", wordRu: "реакция", english: "Their reaction was predictable.", russian: "Их реакция была предсказуемой.", blankSentence: "Their ___ was predictable.", blankAnswer: "reaction" },
    { label: "Meetings", wordEn: "agenda", wordRu: "повестка", english: "Let us return to the agenda.", russian: "Давайте вернемся к повестке.", blankSentence: "Let us return to the ___.", blankAnswer: "agenda" },
    { label: "Workplace Dialogue", wordEn: "proposal", wordRu: "предложение", english: "Your proposal is worth discussing.", russian: "Ваше предложение стоит обсудить.", blankSentence: "Your ___ is worth discussing.", blankAnswer: "proposal" }
  ],
  C1: [
    { label: "Debate", wordEn: "assumption", wordRu: "предположение", english: "That assumption needs to be challenged.", russian: "Это предположение нужно оспорить.", blankSentence: "That ___ needs to be challenged.", blankAnswer: "assumption" },
    { label: "Mediation", wordEn: "wording", wordRu: "формулировка", english: "We need wording that sounds neutral.", russian: "Нам нужна формулировка, которая звучит нейтрально.", blankSentence: "We need ___ that sounds neutral.", blankAnswer: "wording" },
    { label: "Professional Tone", wordEn: "credibility", wordRu: "достоверность", english: "A calm tone increases credibility.", russian: "Спокойный тон повышает достоверность.", blankSentence: "A calm tone increases ___.", blankAnswer: "credibility" },
    { label: "Framing", wordEn: "implication", wordRu: "следствие", english: "We should explain the implication clearly.", russian: "Нам следует ясно объяснить следствие.", blankSentence: "We should explain the ___ clearly.", blankAnswer: "implication" },
    { label: "Argumentation", wordEn: "claim", wordRu: "утверждение", english: "The claim is not fully justified.", russian: "Это утверждение не полностью обосновано.", blankSentence: "The ___ is not fully justified.", blankAnswer: "claim" },
    { label: "Register", wordEn: "register", wordRu: "регистр", english: "The register should match the audience.", russian: "Регистр должен соответствовать аудитории.", blankSentence: "The ___ should match the audience.", blankAnswer: "register" },
    { label: "Presentations", wordEn: "transition", wordRu: "переход", english: "The transition felt smooth and natural.", russian: "Переход получился плавным и естественным.", blankSentence: "The ___ felt smooth and natural.", blankAnswer: "transition" },
    { label: "Precision", wordEn: "nuance", wordRu: "нюанс", english: "The nuance is easy to miss.", russian: "Этот нюанс легко упустить.", blankSentence: "The ___ is easy to miss.", blankAnswer: "nuance" },
    { label: "Workplace Influence", wordEn: "consensus", wordRu: "консенсус", english: "The team reached a consensus.", russian: "Команда пришла к консенсусу.", blankSentence: "The team reached a ___.", blankAnswer: "consensus" },
    { label: "Critical Response", wordEn: "interpretation", wordRu: "интерпретация", english: "Your interpretation is too narrow.", russian: "Ваша интерпретация слишком узкая.", blankSentence: "Your ___ is too narrow.", blankAnswer: "interpretation" }
  ],
  C2: [
    { label: "Precision", wordEn: "ambiguity", wordRu: "двусмысленность", english: "Precise language removes ambiguity.", russian: "Точный язык устраняет двусмысленность.", blankSentence: "Precise language removes ___.", blankAnswer: "ambiguity" },
    { label: "Subtext", wordEn: "subtext", wordRu: "подтекст", english: "The subtext matters more than the words.", russian: "Подтекст важнее самих слов.", blankSentence: "The ___ matters more than the words.", blankAnswer: "subtext" },
    { label: "Rhetoric", wordEn: "restraint", wordRu: "сдержанность", english: "Good rhetoric requires restraint.", russian: "Хорошая риторика требует сдержанности.", blankSentence: "Good rhetoric requires ___.", blankAnswer: "restraint" },
    { label: "Inference", wordEn: "inference", wordRu: "вывод", english: "That inference is logically weak.", russian: "Этот вывод логически слаб.", blankSentence: "That ___ is logically weak.", blankAnswer: "inference" },
    { label: "Interpretation", wordEn: "connotation", wordRu: "коннотация", english: "The phrase carries a negative connotation.", russian: "Фраза несет отрицательную коннотацию.", blankSentence: "The phrase carries a negative ___.", blankAnswer: "connotation" },
    { label: "Tone Control", wordEn: "precision", wordRu: "точность", english: "His reply showed remarkable precision.", russian: "Его ответ показал поразительную точность.", blankSentence: "His reply showed remarkable ___.", blankAnswer: "precision" },
    { label: "Register Mastery", wordEn: "register", wordRu: "регистр", english: "Her register shifted effortlessly.", russian: "Ее регистр сменился без усилий.", blankSentence: "Her ___ shifted effortlessly.", blankAnswer: "register" },
    { label: "Discourse", wordEn: "coherence", wordRu: "связность", english: "The argument lost coherence halfway through.", russian: "Аргумент потерял связность на середине.", blankSentence: "The argument lost ___ halfway through.", blankAnswer: "coherence" },
    { label: "Positioning", wordEn: "stance", wordRu: "позиция", english: "His stance remained deliberately vague.", russian: "Его позиция оставалась намеренно расплывчатой.", blankSentence: "His ___ remained deliberately vague.", blankAnswer: "stance" },
    { label: "Advanced Response", wordEn: "dismissive", wordRu: "пренебрежительный", english: "The reply sounded subtly dismissive.", russian: "Ответ звучал тонко пренебрежительно.", blankSentence: "The reply sounded subtly ___.", blankAnswer: "dismissive" }
  ]
};

const shuffle = <T,>(items: T[]) => {
  const copy = [...items];

  for (let index = copy.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[randomIndex]] = [copy[randomIndex], copy[index]];
  }

  return copy;
};

const rotate = <T,>(items: T[], shift: number) =>
  items.map((_, index) => items[(index + shift) % items.length]);

const pickWrongValues = <T,>(
  items: BankItem[],
  currentIndex: number,
  selector: (item: BankItem) => T,
  count: number
) => {
  const values: T[] = [];

  for (let offset = 1; values.length < count && offset < items.length + 3; offset += 1) {
    const candidate = selector(items[(currentIndex + offset) % items.length]);
    if (!values.includes(candidate)) {
      values.push(candidate);
    }
  }

  return values;
};

const buildQuestions = (
  level: Level,
  type: MatrixType,
  lessonIndex: number
): SeedQuestion[] => {
  const items = rotate(banksByLevel[level], lessonIndex);

  return items.map((item, index) => {
    if (type === "vocabulary") {
      const wrongRu = pickWrongValues(items, index, (entry) => entry.wordRu, 3);
      return {
        type,
        questionText: `Choose the Russian translation for "${item.wordEn}"`,
        correctAnswer: item.wordRu,
        options: shuffle([item.wordRu, ...wrongRu])
      };
    }

    if (type === "translation") {
      const wrongEn = pickWrongValues(items, index, (entry) => entry.english, 3);
      return {
        type,
        questionText: `Translate into English: "${item.russian}"`,
        correctAnswer: item.english,
        options: shuffle([item.english, ...wrongEn])
      };
    }

    if (type === "listening") {
      const wrongEn = pickWrongValues(items, index, (entry) => entry.english, 3);
      return {
        type,
        questionText: "Listen and choose the correct phrase",
        correctAnswer: item.english,
        options: shuffle([item.english, ...wrongEn]),
        audioText: item.english
      };
    }

    if (type === "fillblank") {
      const wrongAnswers = pickWrongValues(items, index, (entry) => entry.blankAnswer, 2);
      return {
        type,
        questionText: item.blankSentence,
        correctAnswer: item.blankAnswer,
        options: shuffle([item.blankAnswer, ...wrongAnswers])
      };
    }

    const wrongEn = pickWrongValues(items, index, (entry) => entry.english, 3);
    return {
      type,
      questionText: `Say in English: "${item.russian}"`,
      correctAnswer: item.english,
      options: shuffle([item.english, ...wrongEn])
    };
  });
};

const buildGeneratedLesson = (
  level: Level,
  type: MatrixType,
  lessonIndex: number
): SeedLesson => {
  const topic = banksByLevel[level][lessonIndex % banksByLevel[level].length];

  return {
    title: `${level} ${typeTitle[type]} Core ${topic.label}`,
    description: `${typeDescription[type]} Topic: ${topic.label}.`,
    level,
    type,
    xpReward: xpRewardByLevel[level],
    questions: buildQuestions(level, type, lessonIndex)
  };
};

export const normalizeLessonMatrix = (baseLessons: SeedLesson[]) => {
  const grouped = new Map<string, SeedLesson[]>();

  for (const lesson of baseLessons) {
    const key = `${lesson.level}:${lesson.type}`;
    const bucket = grouped.get(key) ?? [];
    bucket.push(lesson);
    grouped.set(key, bucket);
  }

  const normalized: SeedLesson[] = [];

  for (const level of levels) {
    for (const type of types) {
      const key = `${level}:${type}`;
      const existing = [...(grouped.get(key) ?? [])].sort((left, right) => left.title.localeCompare(right.title));
      const kept = existing.slice(0, TARGET_COUNT);
      normalized.push(...kept);

      if (kept.length >= TARGET_COUNT) {
        continue;
      }

      const usedTitles = new Set(kept.map((lesson) => lesson.title));

      for (let lessonIndex = 0; normalized.filter((lesson) => lesson.level === level && lesson.type === type).length < TARGET_COUNT; lessonIndex += 1) {
        const generated = buildGeneratedLesson(level, type, lessonIndex);
        if (usedTitles.has(generated.title)) {
          continue;
        }

        usedTitles.add(generated.title);
        normalized.push(generated);
      }
    }
  }

  return normalized;
};
