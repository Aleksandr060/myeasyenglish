import type { Level, QuestionType } from "@prisma/client";

export type SeedQuestion = {
  type: QuestionType;
  questionText: string;
  correctAnswer: string;
  options: string[];
  audioText?: string;
};

export type SeedLesson = {
  title: string;
  description: string;
  level: Level;
  type: QuestionType;
  xpReward: number;
  questions: SeedQuestion[];
};

const shuffle = <T,>(items: T[]) => {
  const copy = [...items];

  for (let index = copy.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[randomIndex]] = [copy[randomIndex], copy[index]];
  }

  return copy;
};

const vocabulary = (
  english: string,
  correctRu: string,
  wrongOptions: string[]
): SeedQuestion => ({
  type: "vocabulary",
  questionText: `Choose the Russian translation for "${english}"`,
  correctAnswer: correctRu,
  options: shuffle([correctRu, ...wrongOptions].slice(0, 4))
});

const translation = (
  russianText: string,
  englishText: string,
  helperOptions: string[]
): SeedQuestion => ({
  type: "translation",
  questionText: `Translate into English: "${russianText}"`,
  correctAnswer: englishText,
  options: shuffle(helperOptions)
});

const listening = (
  promptText: string,
  correctWord: string,
  wrongOptions: string[]
): SeedQuestion => ({
  type: "listening",
  questionText: "Listen and choose the correct phrase",
  correctAnswer: correctWord,
  options: shuffle([correctWord, ...wrongOptions].slice(0, 4)),
  audioText: promptText
});

const fillBlank = (
  sentence: string,
  correctWord: string,
  wrongOptions: string[]
): SeedQuestion => ({
  type: "fillblank",
  questionText: sentence,
  correctAnswer: correctWord,
  options: shuffle([correctWord, ...wrongOptions].slice(0, 3))
});

type EmotionSpec = {
  nameEn: string;
  nameRu: string;
  adjectiveEn: string;
  adjectiveRu: string;
  phrase: string;
  phraseWrongs: string[];
  sentence: string;
  blankWord: string;
  blankWrongs: string[];
};

type ContextSpec = {
  nameEn: string;
  nameRu: string;
  responseRu: string;
  responseEn: string;
  wrongResponses: string[];
};

const emotions: EmotionSpec[] = [
  {
    nameEn: "Joy",
    nameRu: "радость",
    adjectiveEn: "delighted",
    adjectiveRu: "в восторге",
    phrase: "That's amazing!",
    phraseWrongs: ["That is routine.", "That sounds average.", "That is expected."],
    sentence: "Her voice sounds warm and ___ after the good news.",
    blankWord: "bright",
    blankWrongs: ["cold", "flat"]
  },
  {
    nameEn: "Frustration",
    nameRu: "раздражение",
    adjectiveEn: "frustrated",
    adjectiveRu: "раздражённый",
    phrase: "This is so annoying.",
    phraseWrongs: ["This is so relaxing.", "This is very polite.", "This is completely simple."],
    sentence: "His tone becomes more ___ when the problem repeats.",
    blankWord: "sharp",
    blankWrongs: ["gentle", "sleepy"]
  },
  {
    nameEn: "Relief",
    nameRu: "облегчение",
    adjectiveEn: "relieved",
    adjectiveRu: "испытывающий облегчение",
    phrase: "What a relief!",
    phraseWrongs: ["What a rule!", "What a delay!", "What a question!"],
    sentence: "After the danger passes, her voice sounds more ___.",
    blankWord: "calm",
    blankWrongs: ["tense", "harsh"]
  },
  {
    nameEn: "Concern",
    nameRu: "озабоченность",
    adjectiveEn: "concerned",
    adjectiveRu: "обеспокоенный",
    phrase: "Are you all right?",
    phraseWrongs: ["Are you always late?", "Do you know the answer?", "Will you clean the room?"],
    sentence: "A concerned speaker often sounds more ___.",
    blankWord: "careful",
    blankWrongs: ["careless", "cheerful"]
  },
  {
    nameEn: "Disappointment",
    nameRu: "разочарование",
    adjectiveEn: "disappointed",
    adjectiveRu: "разочарованный",
    phrase: "That's not what I expected.",
    phraseWrongs: ["That is exactly my project.", "That was a useful question.", "That sounds completely joyful."],
    sentence: "Disappointment often makes your ending sound more ___.",
    blankWord: "heavy",
    blankWrongs: ["playful", "light"]
  }
];

const contexts: ContextSpec[] = [
  {
    nameEn: "in professional conversations",
    nameRu: "в профессиональном общении",
    responseRu: "В деловом разговоре важно выражать эмоции ясно, но вежливо.",
    responseEn: "In professional conversations, emotions should sound clear but polite.",
    wrongResponses: [
      "In professional conversations, emotions should always sound loud.",
      "In professional conversations, emotions should disappear completely.",
      "In professional conversations, emotions should always sound humorous."
    ]
  },
  {
    nameEn: "in personal conversations",
    nameRu: "в личном общении",
    responseRu: "В личном разговоре эмоции часто звучат теплее и искреннее.",
    responseEn: "In personal conversations, emotions often sound warmer and more sincere.",
    wrongResponses: [
      "In personal conversations, emotions always sound formal.",
      "In personal conversations, emotions must sound distant.",
      "In personal conversations, emotions usually sound identical."
    ]
  },
  {
    nameEn: "under pressure",
    nameRu: "в напряжённой ситуации",
    responseRu: "Под давлением эмоции легче услышать по тону и ритму речи.",
    responseEn: "Under pressure, emotions are easier to hear in tone and rhythm.",
    wrongResponses: [
      "Under pressure, emotions disappear from speech.",
      "Under pressure, emotions only matter in writing.",
      "Under pressure, emotions always become polite."
    ]
  }
];

const buildEmotionLesson = (
  emotion: EmotionSpec,
  context: ContextSpec
): SeedLesson => ({
  title: `Emotion in English: ${emotion.nameEn} ${context.nameEn}`,
  description: `Express ${emotion.nameEn.toLowerCase()} naturally ${context.nameEn}.`,
  level: "B2",
  type: "translation",
  xpReward: 120,
  questions: [
    vocabulary(emotion.adjectiveEn, emotion.adjectiveRu, [
      "вежливый",
      "уверенный",
      "равнодушный"
    ]),
    vocabulary("emotional nuance", "эмоциональный оттенок", [
      "грамматическая ошибка",
      "быстрый ответ",
      "короткая пауза"
    ]),
    translation(context.responseRu, context.responseEn, [
      context.responseEn,
      ...context.wrongResponses
    ]),
    translation(
      `Она звучала ${emotion.adjectiveRu}, но старалась говорить спокойно.`,
      `She sounded ${emotion.adjectiveEn}, but tried to speak calmly.`,
      [
        `She sounded ${emotion.adjectiveEn}, but tried to speak calmly.`,
        "She sounded cheerful, so she spoke much faster.",
        "She sounded formal, but she stopped listening."
      ]
    ),
    fillBlank(emotion.sentence, emotion.blankWord, emotion.blankWrongs),
    fillBlank(
      `When expressing ${emotion.nameEn.toLowerCase()}, your message should stay ___.`,
      "clear",
      ["confused", "hidden"]
    ),
    listening(emotion.phrase, emotion.phrase, emotion.phraseWrongs),
    listening("I understand how you feel.", "I understand how you feel.", [
      "I forgot what you said.",
      "I explained all the rules.",
      "I expected a different train."
    ]),
    vocabulary("empathetic response", "эмпатичный ответ", [
      "резкий комментарий",
      "холодный приказ",
      "случайное замечание"
    ]),
    translation(
      `В теме ${emotion.nameRu} интонация помогает показать отношение говорящего.`,
      `In ${emotion.nameEn.toLowerCase()}, intonation helps show the speaker's attitude.`,
      [
        `In ${emotion.nameEn.toLowerCase()}, intonation helps show the speaker's attitude.`,
        "In emotion lessons, grammar always matters less than meaning.",
        "In emotional speech, silence always sounds more confident."
      ]
    )
  ]
});

export const buildEmotionLessons = (): SeedLesson[] =>
  emotions.flatMap((emotion) => contexts.map((context) => buildEmotionLesson(emotion, context)));
