import type { SeedLesson, SeedQuestion } from "./intonationLessons.js";

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

const speaking = (
  russianText: string,
  englishText: string,
  helperOptions: string[]
): SeedQuestion => ({
  type: "speaking",
  questionText: `Say in English: "${russianText}"`,
  correctAnswer: englishText,
  options: shuffle(helperOptions)
});

const listening = (
  promptText: string,
  correctPhrase: string,
  wrongOptions: string[]
): SeedQuestion => ({
  type: "listening",
  questionText: "Listen and choose the correct phrase",
  correctAnswer: correctPhrase,
  options: shuffle([correctPhrase, ...wrongOptions].slice(0, 4)),
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

type C1Spec = {
  title: string;
  description: string;
  focusWord: string;
  focusRu: string;
  adjective: string;
  adjectiveRu: string;
  statement: string;
  statementRu: string;
  sentence: string;
  blank: string;
  phrase: string;
};

type C2Spec = {
  title: string;
  description: string;
  concept: string;
  conceptRu: string;
  adjective: string;
  adjectiveRu: string;
  statement: string;
  statementRu: string;
  sentence: string;
  blank: string;
  phrase: string;
};

const c1Specs: C1Spec[] = [
  {
    title: "C1 Nuance Builder",
    description: "Handle subtle meaning, diplomacy and advanced phrasing.",
    focusWord: "nuance",
    focusRu: "оттенок значения",
    adjective: "compelling",
    adjectiveRu: "убедительный",
    statement: "Her argument was compelling without sounding too harsh.",
    statementRu: "Её аргумент был убедительным, но не слишком резким.",
    sentence: "A diplomatic reply should remain ___ even when the topic is sensitive.",
    blank: "measured",
    phrase: "That interpretation seems slightly oversimplified."
  },
  {
    title: "C1 Diplomatic English",
    description: "Express disagreement professionally and with tact.",
    focusWord: "diplomacy",
    focusRu: "дипломатичность",
    adjective: "tactful",
    adjectiveRu: "тактичный",
    statement: "A tactful reply can challenge the idea without attacking the person.",
    statementRu: "Тактичный ответ может оспаривать идею, не нападая на человека.",
    sentence: "When feedback is difficult, your tone should stay ___.",
    blank: "respectful",
    phrase: "I see your point, but I would frame it differently."
  },
  {
    title: "C1 Academic Discussion",
    description: "Work with argumentation, evidence and balanced claims.",
    focusWord: "evidence",
    focusRu: "доказательство",
    adjective: "balanced",
    adjectiveRu: "взвешенный",
    statement: "A balanced claim sounds stronger when it is supported by evidence.",
    statementRu: "Взвешенное утверждение звучит сильнее, когда оно подкреплено доказательствами.",
    sentence: "Academic arguments become more convincing when they are ___.",
    blank: "substantiated",
    phrase: "The evidence does not fully support that conclusion."
  },
  {
    title: "C1 Workplace Influence",
    description: "Speak persuasively in meetings and negotiations.",
    focusWord: "consensus",
    focusRu: "согласие",
    adjective: "persuasive",
    adjectiveRu: "убедительный",
    statement: "A persuasive speaker can move the discussion toward consensus.",
    statementRu: "Убедительный спикер может направить обсуждение к согласию.",
    sentence: "In negotiations, the most effective language is usually ___.",
    blank: "strategic",
    phrase: "Let us align on the priorities before we make a decision."
  },
  {
    title: "C1 Register Shift",
    description: "Choose the right level of formality in context.",
    focusWord: "register",
    focusRu: "регистр речи",
    adjective: "appropriate",
    adjectiveRu: "уместный",
    statement: "An appropriate register depends on the audience and the purpose.",
    statementRu: "Уместный регистр зависит от аудитории и цели высказывания.",
    sentence: "In formal writing, slang usually sounds ___.",
    blank: "inappropriate",
    phrase: "That wording may be too informal for this audience."
  },
  {
    title: "C1 Presentation Language",
    description: "Refine transitions, emphasis and audience engagement.",
    focusWord: "transition",
    focusRu: "переход",
    adjective: "cohesive",
    adjectiveRu: "связный",
    statement: "A cohesive presentation guides the audience from one point to the next.",
    statementRu: "Связная презентация ведёт аудиторию от одной мысли к следующей.",
    sentence: "Clear transitions make a talk feel more ___.",
    blank: "structured",
    phrase: "Let me highlight the key implication of this result."
  },
  {
    title: "C1 Mediation Skills",
    description: "Rephrase ideas clearly when viewpoints differ.",
    focusWord: "mediation",
    focusRu: "посредничество",
    adjective: "constructive",
    adjectiveRu: "конструктивный",
    statement: "Constructive mediation reduces tension and clarifies the real issue.",
    statementRu: "Конструктивное посредничество снижает напряжение и проясняет суть проблемы.",
    sentence: "A mediator should sound calm, neutral and ___.",
    blank: "helpful",
    phrase: "Let me rephrase that so both sides are clear."
  },
  {
    title: "C1 Critical Response",
    description: "Respond thoughtfully to complex claims and assumptions.",
    focusWord: "assumption",
    focusRu: "предположение",
    adjective: "analytical",
    adjectiveRu: "аналитический",
    statement: "An analytical response questions hidden assumptions without sounding defensive.",
    statementRu: "Аналитический ответ ставит под вопрос скрытые предположения, не звуча оборонительно.",
    sentence: "A strong critical reply should be precise rather than ___.",
    blank: "reactive",
    phrase: "That conclusion seems to rest on a narrow assumption."
  },
  {
    title: "C1 Professional Tone",
    description: "Sound confident, polished and credible in formal settings.",
    focusWord: "credibility",
    focusRu: "достоверность",
    adjective: "credible",
    adjectiveRu: "заслуживающий доверия",
    statement: "Credible language combines confidence with restraint.",
    statementRu: "Достоверная речь сочетает уверенность с сдержанностью.",
    sentence: "Professional communication should feel confident but never ___.",
    blank: "arrogant",
    phrase: "I am confident this approach is both practical and sustainable."
  }
];

const c2Specs: C2Spec[] = [
  {
    title: "C2 Precision Mastery",
    description: "Work with subtle register shifts, inference and highly precise expression.",
    concept: "implicit meaning",
    conceptRu: "подразумеваемый смысл",
    adjective: "eloquent",
    adjectiveRu: "красноречивый",
    statement: "His wording was so precise that it left no room for misinterpretation.",
    statementRu: "Его формулировка была настолько точной, что не оставляла места для неверного толкования.",
    sentence: "A truly sophisticated speaker can sound critical without being ___.",
    blank: "abrasive",
    phrase: "Her response was courteous on the surface but unmistakably dismissive underneath."
  },
  {
    title: "C2 Subtext Mastery",
    description: "Track what is implied rather than stated openly.",
    concept: "subtext",
    conceptRu: "подтекст",
    adjective: "layered",
    adjectiveRu: "многослойный",
    statement: "The subtext mattered more than the literal wording in that exchange.",
    statementRu: "В том разговоре подтекст имел большее значение, чем буквальная формулировка.",
    sentence: "To interpret subtext well, a listener must be highly ___.",
    blank: "attentive",
    phrase: "He sounded supportive, yet his wording subtly distanced him from the idea."
  },
  {
    title: "C2 Rhetorical Control",
    description: "Use rhetoric with accuracy, restraint and impact.",
    concept: "rhetorical nuance",
    conceptRu: "риторический оттенок",
    adjective: "sophisticated",
    adjectiveRu: "утончённый",
    statement: "Sophisticated rhetoric persuades without appearing manipulative.",
    statementRu: "Утончённая риторика убеждает, не выглядя манипулятивной.",
    sentence: "At C2, persuasive language should sound elegant rather than ___.",
    blank: "forceful",
    phrase: "The contrast was subtle, but rhetorically very effective."
  },
  {
    title: "C2 Interpretive Reading",
    description: "Distinguish literal meaning from interpretation and tone.",
    concept: "interpretation",
    conceptRu: "интерпретация",
    adjective: "discerning",
    adjectiveRu: "проницательный",
    statement: "A discerning reader notices both tone and implication at once.",
    statementRu: "Проницательный читатель замечает и тон, и подтекст одновременно.",
    sentence: "Interpretive reading requires a highly ___ sense of language.",
    blank: "refined",
    phrase: "That remark can be interpreted in several equally plausible ways."
  },
  {
    title: "C2 Editorial Voice",
    description: "Develop concise, elegant and authoritative language.",
    concept: "editorial clarity",
    conceptRu: "редакторская ясность",
    adjective: "authoritative",
    adjectiveRu: "авторитетный",
    statement: "Authoritative prose sounds confident because every word earns its place.",
    statementRu: "Авторитетная проза звучит уверенно, потому что каждое слово на своём месте.",
    sentence: "Strong editorial writing should be concise, precise and ___.",
    blank: "controlled",
    phrase: "The revised paragraph is sharper, leaner and far more effective."
  },
  {
    title: "C2 Intellectual Debate",
    description: "Argue complex positions with nuance and precision.",
    concept: "intellectual rigor",
    conceptRu: "интеллектуальная строгость",
    adjective: "rigorous",
    adjectiveRu: "строгий",
    statement: "Rigorous debate tests ideas without simplifying them unfairly.",
    statementRu: "Строгая дискуссия проверяет идеи, не упрощая их несправедливо.",
    sentence: "A serious debate becomes weaker when the framing is too ___.",
    blank: "simplistic",
    phrase: "That position is defensible, but only under carefully defined conditions."
  },
  {
    title: "C2 Stylistic Precision",
    description: "Choose exact wording for tone, texture and emphasis.",
    concept: "stylistic precision",
    conceptRu: "стилистическая точность",
    adjective: "exact",
    adjectiveRu: "точный",
    statement: "Exact wording shapes not only meaning but also the reader's response.",
    statementRu: "Точная формулировка формирует не только смысл, но и реакцию читателя.",
    sentence: "Stylistic control depends on selecting the most ___ word available.",
    blank: "apt",
    phrase: "A minor change in diction can transform the tone completely."
  },
  {
    title: "C2 Discourse Analysis",
    description: "Read coherence, stance and positioning at an advanced level.",
    concept: "stance",
    conceptRu: "позиционирование автора",
    adjective: "nuanced",
    adjectiveRu: "тонкий",
    statement: "A nuanced stance may sound cautious while still being decisive.",
    statementRu: "Тонкая авторская позиция может звучать осторожно, оставаясь при этом решительной.",
    sentence: "Advanced discourse analysis requires a deeply ___ understanding of context.",
    blank: "contextual",
    phrase: "The speaker aligned himself with the proposal while quietly limiting its scope."
  },
  {
    title: "C2 Elegant Expression",
    description: "Refine fluency into polished, natural and exact communication.",
    concept: "elegant expression",
    conceptRu: "изящное выражение мысли",
    adjective: "polished",
    adjectiveRu: "отточенный",
    statement: "Polished communication feels effortless precisely because it is carefully crafted.",
    statementRu: "Отточенная речь кажется лёгкой именно потому, что она тщательно выстроена.",
    sentence: "At the highest level, fluency should sound natural, precise and ___.",
    blank: "effortless",
    phrase: "She articulated a difficult idea with remarkable clarity and grace."
  }
];

const buildC1Lesson = (spec: C1Spec): SeedLesson => ({
  title: spec.title,
  description: spec.description,
  level: "C1",
  type: "translation",
  xpReward: 160,
  questions: [
    vocabulary(spec.focusWord, spec.focusRu, [
      "короткий ответ",
      "резкий комментарий",
      "простое правило"
    ]),
    vocabulary(spec.adjective, spec.adjectiveRu, [
      "равнодушный",
      "поспешный",
      "неясный"
    ]),
    translation(spec.statementRu, spec.statement, [
      spec.statement,
      "The message sounded strong, but nobody understood the point.",
      "The idea felt interesting, yet it lacked any real support."
    ]),
    translation(
      `В общении уровня C1 важно говорить точно и ${spec.adjectiveRu}.`,
      `At C1, it is important to speak precisely and in a ${spec.adjective} way.`,
      [
        `At C1, it is important to speak precisely and in a ${spec.adjective} way.`,
        "At C1, it is enough to speak quickly and confidently.",
        "At C1, long sentences always sound more intelligent."
      ]
    ),
    fillBlank(spec.sentence, spec.blank, ["casual", "vague"]),
    fillBlank(
      "Advanced speakers often revise a sentence to make it more ___.",
      "precise",
      ["dramatic", "random"]
    ),
    listening(spec.phrase, spec.phrase, [
      "The report sounded serious, but the schedule changed unexpectedly.",
      "The explanation was polite, although the point remained unclear.",
      "The speaker finished early because the audience looked confused."
    ]),
    listening("I understand your concern, but the evidence suggests another conclusion.", "I understand your concern, but the evidence suggests another conclusion.", [
      "I understand your point, so we can ignore the details for now.",
      "I understand the report, but the timing still feels uncertain.",
      "I understand the audience, and the room sounds much calmer."
    ]),
    translation(
      "Продвинутый ответ должен звучать уверенно, но не агрессивно.",
      "An advanced reply should sound confident without sounding aggressive.",
      [
        "An advanced reply should sound confident without sounding aggressive.",
        "An advanced reply should always sound friendly and informal.",
        "An advanced reply should avoid detail in order to stay brief."
      ]
    ),
    translation(
      "Точный язык помогает избежать лишней двусмысленности.",
      "Precise language helps avoid unnecessary ambiguity.",
      [
        "Precise language helps avoid unnecessary ambiguity.",
        "Precise language makes every discussion shorter and easier.",
        "Precise language matters only in academic writing."
      ]
    )
  ]
});

const buildC2Lesson = (spec: C2Spec): SeedLesson => ({
  title: spec.title,
  description: spec.description,
  level: "C2",
  type: "translation",
  xpReward: 180,
  questions: [
    vocabulary(spec.concept, spec.conceptRu, [
      "буквальная ошибка",
      "короткая фраза",
      "громкое замечание"
    ]),
    vocabulary(spec.adjective, spec.adjectiveRu, [
      "поверхностный",
      "поспешный",
      "небрежный"
    ]),
    translation(spec.statementRu, spec.statement, [
      spec.statement,
      "The wording sounded elegant, but the main point stayed unclear.",
      "The audience appreciated the tone, although the logic was weak."
    ]),
    translation(
      `На уровне C2 нужно улавливать не только смысл, но и ${spec.conceptRu}.`,
      `At C2, you need to catch not only meaning but also ${spec.concept}.`,
      [
        `At C2, you need to catch not only meaning but also ${spec.concept}.`,
        "At C2, fast answers matter more than subtle shades of tone.",
        "At C2, the safest strategy is to avoid complex interpretation."
      ]
    ),
    fillBlank(spec.sentence, spec.blank, ["obvious", "casual"]),
    fillBlank(
      "At the highest level, your phrasing should feel deliberate and ___.",
      "refined",
      ["careless", "noisy"]
    ),
    listening(spec.phrase, spec.phrase, [
      "The comment sounded clear, but it lacked any deeper resonance.",
      "The speaker seemed relaxed, though the message was too direct.",
      "The audience remained quiet because the conclusion felt unfinished."
    ]),
    listening("A highly advanced speaker can imply criticism without stating it openly.", "A highly advanced speaker can imply criticism without stating it openly.", [
      "A highly advanced writer can simplify every topic within seconds.",
      "A highly advanced learner can memorize phrases without reflection.",
      "A highly advanced speaker should always sound formal and distant."
    ]),
    translation(
      "С2 требует точности, тонкости и уверенного владения регистром.",
      "C2 requires precision, subtlety and confident control of register.",
      [
        "C2 requires precision, subtlety and confident control of register.",
        "C2 requires speed, confidence and very short answers.",
        "C2 requires complex words even when they reduce clarity."
      ]
    ),
    translation(
      "Даже небольшое изменение формулировки может полностью изменить подтекст.",
      "Even a slight change in wording can completely alter the subtext.",
      [
        "Even a slight change in wording can completely alter the subtext.",
        "Even a slight pause in speech can always improve the argument.",
        "Even a slight mistake in grammar can destroy the entire meaning."
      ]
    )
  ]
});

export const buildAdvancedLessons = (): SeedLesson[] => [
  ...c1Specs.map(buildC1Lesson),
  ...c2Specs.map(buildC2Lesson),
  {
    title: "C1 Speaking Studio",
    description: "Practice advanced spoken responses with pronunciation feedback.",
    level: "C1",
    type: "speaking",
    xpReward: 170,
    questions: [
      speaking("Я бы сформулировал это осторожнее.", "I would phrase that more carefully.", [
        "I would phrase that more carefully.",
        "I would repeat that more quickly.",
        "I would explain that more loudly."
      ]),
      speaking("Позвольте мне уточнить основную мысль.", "Let me clarify the main point.", [
        "Let me clarify the main point.",
        "Let me finish the whole project.",
        "Let me compare the last report."
      ]),
      speaking("Ваш аргумент убедителен, но требует доказательств.", "Your argument is compelling, but it needs evidence.", [
        "Your argument is compelling, but it needs evidence.",
        "Your argument is interesting, but it feels shorter.",
        "Your argument is possible, but it sounds friendlier."
      ]),
      speaking("Я понимаю вашу позицию, но вижу это иначе.", "I understand your position, but I see it differently.", [
        "I understand your position, but I see it differently.",
        "I understand your project, but I wrote it already.",
        "I understand your question, but I missed the deadline."
      ]),
      speaking("Этот вывод кажется слишком упрощённым.", "That conclusion seems overly simplified.", [
        "That conclusion seems overly simplified.",
        "That conclusion sounds unusually optimistic.",
        "That conclusion feels entirely predictable."
      ]),
      speaking("Давайте сначала согласуем приоритеты.", "Let us align on the priorities first.", [
        "Let us align on the priorities first.",
        "Let us revise all the policies now.",
        "Let us shorten the proposal soon."
      ]),
      speaking("Нам нужно более точное определение.", "We need a more precise definition.", [
        "We need a more precise definition.",
        "We need a much longer presentation.",
        "We need a broader final decision."
      ]),
      speaking("Это может вызвать недопонимание у аудитории.", "That may create confusion for the audience.", [
        "That may create confusion for the audience.",
        "That may improve the rhythm of the meeting.",
        "That may reduce the length of the report."
      ]),
      speaking("Я бы предпочёл более нейтральную формулировку.", "I would prefer more neutral wording.", [
        "I would prefer more neutral wording.",
        "I would prepare a more detailed answer.",
        "I would repeat the original version."
      ]),
      speaking("Точный язык помогает избежать двусмысленности.", "Precise language helps avoid ambiguity.", [
        "Precise language helps avoid ambiguity.",
        "Careful timing helps improve attention.",
        "Formal style helps increase authority."
      ])
    ]
  },
  {
    title: "C2 Speaking Precision Lab",
    description: "Train high-level fluency, subtext and exact spoken delivery.",
    level: "C2",
    type: "speaking",
    xpReward: 190,
    questions: [
      speaking("Её интонация выдавала скрытое раздражение.", "Her intonation revealed concealed irritation.", [
        "Her intonation revealed concealed irritation.",
        "Her explanation reduced visible hesitation.",
        "Her expression suggested careful reflection."
      ]),
      speaking("Это замечание можно трактовать по-разному.", "That remark can be interpreted in multiple ways.", [
        "That remark can be interpreted in multiple ways.",
        "That response can be repeated with minor changes.",
        "That speaker can be understood by everyone."
      ]),
      speaking("Его формулировка не оставляла места для сомнений.", "His wording left no room for doubt.", [
        "His wording left no room for doubt.",
        "His answer gave us time to reflect.",
        "His argument sounded both formal and calm."
      ]),
      speaking("Подтекст был важнее буквального смысла.", "The subtext mattered more than the literal meaning.", [
        "The subtext mattered more than the literal meaning.",
        "The structure mattered more than the final result.",
        "The context mattered more than the opening line."
      ]),
      speaking("Её ответ звучал вежливо, но отстранённо.", "Her reply sounded polite, yet detached.", [
        "Her reply sounded polite, yet detached.",
        "Her response sounded warm, but uncertain.",
        "Her opinion sounded brief, though thoughtful."
      ]),
      speaking("Даже небольшое изменение слова меняет подтекст.", "Even a slight change in wording alters the subtext.", [
        "Even a slight change in wording alters the subtext.",
        "Even a brief pause in speaking improves the rhythm.",
        "Even a minor mistake in grammar changes the register."
      ]),
      speaking("На этом уровне важен не только смысл, но и регистр.", "At this level, not only meaning but also register matters.", [
        "At this level, not only meaning but also register matters.",
        "At this level, not only grammar but also speed matters.",
        "At this level, not only tone but also memory matters."
      ]),
      speaking("Его ирония была настолько тонкой, что её почти не заметили.", "His irony was so subtle that it was barely noticed.", [
        "His irony was so subtle that it was barely noticed.",
        "His argument was so formal that it sounded persuasive.",
        "His feedback was so direct that it felt abrupt."
      ]),
      speaking("Точная речь требует контроля тона и намерения.", "Precise speech requires control of tone and intention.", [
        "Precise speech requires control of tone and intention.",
        "Clear speech requires a strong sense of timing.",
        "Formal speech requires a slower pace of delivery."
      ]),
      speaking("Продвинутый говорящий умеет критиковать без резкости.", "An advanced speaker can criticize without sounding abrasive.", [
        "An advanced speaker can criticize without sounding abrasive.",
        "An advanced writer can simplify without losing detail.",
        "An advanced learner can summarize without preparation."
      ])
    ]
  }
];
