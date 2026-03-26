import type { Level } from "@prisma/client";

type SeedQuestionType =
  | "vocabulary"
  | "translation"
  | "listening"
  | "fillblank"
  | "speaking";

export type SeedQuestion = {
  type: SeedQuestionType;
  questionText: string;
  correctAnswer: string;
  options: string[];
  audioText?: string;
};

export type SeedLesson = {
  title: string;
  description: string;
  level: Level;
  type: SeedQuestionType;
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
  questionText: "Listen and choose the correct word",
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

type ContextSpec = {
  nameEn: string;
  nameRu: string;
  questionPhrase: string;
  statementPhrase: string;
  emotionPhrase: string;
  questionWrongs: string[];
  emotionWrongs: string[];
};

type FocusSpec = {
  titlePrefix: string;
  descriptionLead: string;
  risingEn: string;
  risingRu: string;
  fallingEn: string;
  fallingRu: string;
  toneWordEn: string;
  toneWordRu: string;
  toneWordWrongRu: string[];
  qualityEn: string;
  qualityWrongEn: string[];
};

const contexts: ContextSpec[] = [
  {
    nameEn: "Classroom English",
    nameRu: "общение на уроке",
    questionPhrase: "Are you ready for class?",
    statementPhrase: "The lesson starts now.",
    emotionPhrase: "Really?",
    questionWrongs: ["Are you reading in class?", "Do you like this glass?", "Were you ready last time?"],
    emotionWrongs: ["Ready?", "Rarely?", "Replay?"]
  },
  {
    nameEn: "Office Talk",
    nameRu: "офисное общение",
    questionPhrase: "Can we meet at ten?",
    statementPhrase: "The report is ready.",
    emotionPhrase: "Oh no!",
    questionWrongs: ["Can we leave at ten?", "Do we read at ten?", "Will we eat at ten?"],
    emotionWrongs: ["Hello!", "All right!", "No way!"]
  },
  {
    nameEn: "Travel English",
    nameRu: "поездки и путешествия",
    questionPhrase: "Is this the right platform?",
    statementPhrase: "The train leaves at six.",
    emotionPhrase: "Excuse me!",
    questionWrongs: ["Is this a bright postcard?", "Was this the late station?", "Is this your travel bag?"],
    emotionWrongs: ["Thank you!", "See you!", "Enjoy it!"]
  },
  {
    nameEn: "Phone Calls",
    nameRu: "разговоры по телефону",
    questionPhrase: "Can you hear me?",
    statementPhrase: "I am calling from the office.",
    emotionPhrase: "Hello?",
    questionWrongs: ["Can you help me?", "Do you call me?", "Can you see me?"],
    emotionWrongs: ["Yellow?", "Follow?", "Holiday?"]
  },
  {
    nameEn: "Friend Chats",
    nameRu: "разговоры с друзьями",
    questionPhrase: "Are you coming tonight?",
    statementPhrase: "I am already here.",
    emotionPhrase: "No way!",
    questionWrongs: ["Are you cooking tonight?", "Will you call tonight?", "Are you cleaning tonight?"],
    emotionWrongs: ["Okay!", "All day!", "So late!"]
  },
  {
    nameEn: "Family Conversations",
    nameRu: "семейное общение",
    questionPhrase: "Are you hungry?",
    statementPhrase: "Dinner is on the table.",
    emotionPhrase: "Thanks, Mom!",
    questionWrongs: ["Are you angry?", "Do you hurry?", "Were you younger?"],
    emotionWrongs: ["Call me, Mom!", "See you, Mom!", "Help me, Mom!"]
  },
  {
    nameEn: "Shopping Moments",
    nameRu: "разговоры в магазине",
    questionPhrase: "Do you have this in blue?",
    statementPhrase: "This one costs twenty dollars.",
    emotionPhrase: "That's great!",
    questionWrongs: ["Do you like this old shoe?", "Can you wash this at home?", "Do you know this small rule?"],
    emotionWrongs: ["Take this!", "That's late!", "That is small!"]
  },
  {
    nameEn: "Restaurant English",
    nameRu: "общение в ресторане",
    questionPhrase: "May we have the menu?",
    statementPhrase: "The soup is hot.",
    emotionPhrase: "Sounds good!",
    questionWrongs: ["Can we clean the table?", "May we leave the window?", "Will we take the bus?"],
    emotionWrongs: ["Looks big!", "Smells nice!", "Feels warm!"]
  },
  {
    nameEn: "Presentations",
    nameRu: "выступления и презентации",
    questionPhrase: "Can everyone see the slide?",
    statementPhrase: "Today I will show our plan.",
    emotionPhrase: "Good morning!",
    questionWrongs: ["Can anyone read the line?", "Do you know the guide?", "Can everyone hear the song?"],
    emotionWrongs: ["Good evening!", "Good afternoon!", "Good weekend!"]
  },
  {
    nameEn: "Online Meetings",
    nameRu: "онлайн-встречи",
    questionPhrase: "Can you see my screen?",
    statementPhrase: "The meeting will begin now.",
    emotionPhrase: "One second!",
    questionWrongs: ["Can you read my dream?", "Can you send my file?", "Will you see my friend?"],
    emotionWrongs: ["One minute!", "Just a moment!", "Wait right there!"]
  }
];

const focuses: FocusSpec[] = [
  {
    titlePrefix: "Surprise Signals",
    descriptionLead: "Use intonation to sound surprised without losing clarity",
    risingEn: "surprise and curiosity",
    risingRu: "удивление и любопытство",
    fallingEn: "clear and complete",
    fallingRu: "ясно и законченно",
    toneWordEn: "expressive tone",
    toneWordRu: "выразительный тон",
    toneWordWrongRu: ["Сухой ответ", "Робкий голос", "Длинная пауза"],
    qualityEn: "bright",
    qualityWrongEn: ["cold", "heavy"]
  },
  {
    titlePrefix: "Polite Voice",
    descriptionLead: "Practice polite English with softer rises and calm endings",
    risingEn: "politeness and openness",
    risingRu: "вежливость и открытость",
    fallingEn: "respectful and calm",
    fallingRu: "уважительно и спокойно",
    toneWordEn: "polite tone",
    toneWordRu: "вежливый тон",
    toneWordWrongRu: ["Жёсткий приказ", "Скучный ответ", "Быстрый шёпот"],
    qualityEn: "soft",
    qualityWrongEn: ["sharp", "angry"]
  },
  {
    titlePrefix: "Uncertain Tone",
    descriptionLead: "Show doubt and hesitation through controlled intonation",
    risingEn: "doubt and uncertainty",
    risingRu: "сомнение и неуверенность",
    fallingEn: "careful and controlled",
    fallingRu: "осторожно и собранно",
    toneWordEn: "careful tone",
    toneWordRu: "осторожный тон",
    toneWordWrongRu: ["Громкий смех", "Весёлый крик", "Грубый ответ"],
    qualityEn: "gentle",
    qualityWrongEn: ["wild", "flat"]
  },
  {
    titlePrefix: "Confident Delivery",
    descriptionLead: "Sound sure and steady in everyday English",
    risingEn: "interest before a reply",
    risingRu: "интерес перед ответом",
    fallingEn: "confident and certain",
    fallingRu: "уверенно и определённо",
    toneWordEn: "confident tone",
    toneWordRu: "уверенный тон",
    toneWordWrongRu: ["Потерянный голос", "Сомневающийся шёпот", "Нервный смех"],
    qualityEn: "firm",
    qualityWrongEn: ["weak", "shaky"]
  },
  {
    titlePrefix: "Friendly Energy",
    descriptionLead: "Make your English sound warmer and more welcoming",
    risingEn: "warm interest and engagement",
    risingRu: "тёплый интерес и вовлечённость",
    fallingEn: "relaxed and friendly",
    fallingRu: "расслабленно и дружелюбно",
    toneWordEn: "friendly tone",
    toneWordRu: "дружелюбный тон",
    toneWordWrongRu: ["Сухой комментарий", "Резкий приказ", "Долгая тишина"],
    qualityEn: "warm",
    qualityWrongEn: ["cold", "hard"]
  }
];

const buildIntonationLesson = (
  focus: FocusSpec,
  context: ContextSpec,
  index: number
): SeedLesson => {
  const level: Level = index < 25 ? "A2" : "B1";
  const title = `${focus.titlePrefix}: ${context.nameEn}`;
  const description = `${focus.descriptionLead} in ${context.nameEn.toLowerCase()} conversations.`;

  return {
    title,
    description,
    level,
    type: "listening",
    xpReward: 100,
    questions: [
      vocabulary("Rising intonation", "Восходящая интонация", [
        "Нисходящая интонация",
        "Тихий голос",
        "Сильный акцент"
      ]),
      vocabulary("Falling intonation", "Нисходящая интонация", [
        "Восходящая интонация",
        "Быстрый темп",
        "Длинная пауза"
      ]),
      translation(
        `В теме "${context.nameRu}" восходящая интонация часто выражает ${focus.risingRu}.`,
        `In ${context.nameEn.toLowerCase()}, rising intonation often shows ${focus.risingEn}.`,
        [
          `In ${context.nameEn.toLowerCase()}, rising intonation often shows ${focus.risingEn}.`,
          `In ${context.nameEn.toLowerCase()}, falling intonation often sounds angry.`,
          `In ${context.nameEn.toLowerCase()}, long pauses always sound polite.`
        ]
      ),
      translation(
        `Нисходящая интонация помогает звучать ${focus.fallingRu}.`,
        `Falling intonation helps you sound ${focus.fallingEn}.`,
        [
          `Falling intonation helps you sound ${focus.fallingEn}.`,
          "Falling intonation always sounds like a question.",
          "Falling intonation means you are speaking faster."
        ]
      ),
      fillBlank(`In "${context.questionPhrase}", your voice often goes ___.`, "up", [
        "down",
        "flat"
      ]),
      fillBlank(`In "${context.statementPhrase}", your voice usually goes ___.`, "down", [
        "up",
        "sideways"
      ]),
      listening(context.questionPhrase, context.questionPhrase, context.questionWrongs),
      listening(context.emotionPhrase, context.emotionPhrase, context.emotionWrongs),
      vocabulary(focus.toneWordEn, focus.toneWordRu, focus.toneWordWrongRu),
      fillBlank(
        `A ${focus.toneWordEn.toLowerCase()} often sounds more ___.`,
        focus.qualityEn,
        focus.qualityWrongEn
      )
    ]
  };
};

export const buildIntonationLessons = (): SeedLesson[] => {
  const generated: SeedLesson[] = [];
  let lessonIndex = 0;

  for (const focus of focuses) {
    for (const context of contexts) {
      generated.push(buildIntonationLesson(focus, context, lessonIndex));
      lessonIndex += 1;
    }
  }

  return generated;
};
