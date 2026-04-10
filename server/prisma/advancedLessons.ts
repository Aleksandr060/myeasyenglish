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
    title: "C1 Speaking Debate Room",
    description: "Practice nuanced disagreement, rebuttal and structured spoken reasoning.",
    level: "C1",
    type: "speaking",
    xpReward: 170,
    questions: [
      speaking("Я бы оспорил это предположение.", "I would challenge that assumption.", [
        "I would challenge that assumption.",
        "I would summarize that section.",
        "I would postpone that decision."
      ]),
      speaking("Ваш тезис интересен, но логически уязвим.", "Your thesis is interesting, but logically vulnerable.", [
        "Your thesis is interesting, but logically vulnerable.",
        "Your comment is helpful, but emotionally intense.",
        "Your example is clear, but slightly repetitive."
      ]),
      speaking("Позвольте предложить альтернативную интерпретацию.", "Let me offer an alternative interpretation.", [
        "Let me offer an alternative interpretation.",
        "Let me repeat the earlier explanation.",
        "Let me describe the visual impression."
      ]),
      speaking("Это утверждение не вполне подтверждается фактами.", "That claim is not fully supported by the facts.", [
        "That claim is not fully supported by the facts.",
        "That sentence is not clearly heard by the class.",
        "That answer is not especially hard to remember."
      ]),
      speaking("Мы смешиваем причину и следствие.", "We are confusing cause and effect.", [
        "We are confusing cause and effect.",
        "We are combining tone and grammar.",
        "We are repeating points and phrases."
      ]),
      speaking("Я не думаю, что этот вывод неизбежен.", "I do not think that conclusion is inevitable.", [
        "I do not think that conclusion is inevitable.",
        "I do not think that answer is memorable.",
        "I do not think that speaker is nervous."
      ]),
      speaking("Стоит различать мнение и доказательство.", "It is worth distinguishing between opinion and evidence.", [
        "It is worth distinguishing between opinion and evidence.",
        "It is worth comparing the first and last tasks.",
        "It is worth repeating the phrase more slowly."
      ]),
      speaking("Этот аргумент звучит убедительно лишь на первый взгляд.", "That argument sounds convincing only at first glance.", [
        "That argument sounds convincing only at first glance.",
        "That explanation sounds detailed only in writing.",
        "That expression sounds natural only in context."
      ]),
      speaking("Нам нужно точнее определить рамки обсуждения.", "We need to define the scope of the discussion more precisely.", [
        "We need to define the scope of the discussion more precisely.",
        "We need to describe the mood of the speaker more clearly.",
        "We need to divide the lesson into shorter sections."
      ]),
      speaking("Я согласен с принципом, но не с реализацией.", "I agree with the principle, but not with the implementation.", [
        "I agree with the principle, but not with the implementation.",
        "I agree with the answer, but not with the accent.",
        "I agree with the topic, but not with the title."
      ])
    ]
  },
  {
    title: "C1 Speaking Strategic Tone",
    description: "Control tone, register and precision in sensitive spoken interactions.",
    level: "C1",
    type: "speaking",
    xpReward: 170,
    questions: [
      speaking("Важно выразить несогласие без излишней резкости.", "It is important to express disagreement without unnecessary harshness.", [
        "It is important to express disagreement without unnecessary harshness.",
        "It is important to describe the process without extra detail.",
        "It is important to complete the exercise without much delay."
      ]),
      speaking("Я постараюсь сформулировать это более дипломатично.", "I will try to phrase that more diplomatically.", [
        "I will try to phrase that more diplomatically.",
        "I will try to explain that more enthusiastically.",
        "I will try to memorize that more accurately."
      ]),
      speaking("Такой тон может быть воспринят как снисходительный.", "That tone may be perceived as condescending.", [
        "That tone may be perceived as condescending.",
        "That style may be described as traditional.",
        "That sentence may be remembered as unusual."
      ]),
      speaking("Нам следует смягчить формулировку.", "We should soften the wording.", [
        "We should soften the wording.",
        "We should shorten the answer.",
        "We should brighten the design."
      ]),
      speaking("Я не хотел бы звучать категорично.", "I would not like to sound overly categorical.", [
        "I would not like to sound overly categorical.",
        "I would not like to sound too academic.",
        "I would not like to sound completely unfamiliar."
      ]),
      speaking("Контекст требует более осторожного языка.", "The context calls for more careful language.", [
        "The context calls for more careful language.",
        "The audience asks for more direct answers.",
        "The exercise needs more flexible timing."
      ]),
      speaking("Это замечание уместно, но не в такой форме.", "That point is valid, but not in that form.", [
        "That point is valid, but not in that form.",
        "That task is useful, but not at this level.",
        "That phrase is clear, but not very common."
      ]),
      speaking("Лучше оставить пространство для интерпретации.", "It is better to leave room for interpretation.", [
        "It is better to leave room for interpretation.",
        "It is better to use more energy in speaking.",
        "It is better to choose shorter sentences in class."
      ]),
      speaking("Такая подача может ослабить доверие аудитории.", "That delivery may weaken the audience's trust.", [
        "That delivery may weaken the audience's trust.",
        "That example may improve the listener's focus.",
        "That response may change the student's pace."
      ]),
      speaking("Я бы сделал акцент на ясности, а не на эффектности.", "I would emphasize clarity rather than impact.", [
        "I would emphasize clarity rather than impact.",
        "I would emphasize grammar rather than fluency.",
        "I would emphasize speed rather than tone."
      ])
    ]
  },
  {
    title: "C1 Speaking Mediation Lab",
    description: "Rephrase, mediate and balance viewpoints in advanced conversation.",
    level: "C1",
    type: "speaking",
    xpReward: 170,
    questions: [
      speaking("Позвольте мне переформулировать вашу мысль.", "Let me rephrase your point.", [
        "Let me rephrase your point.",
        "Let me reduce your argument.",
        "Let me repeat your example."
      ]),
      speaking("Если я правильно понял, вы имеете в виду следующее.", "If I understood correctly, you mean the following.", [
        "If I understood correctly, you mean the following.",
        "If I remember correctly, you wrote the summary.",
        "If I explained correctly, you solved the issue."
      ]),
      speaking("Обе позиции содержат рациональное зерно.", "Both positions contain a rational core.", [
        "Both positions contain a rational core.",
        "Both lessons include a speaking task.",
        "Both answers follow a similar pattern."
      ]),
      speaking("Нам нужно найти формулировку, приемлемую для всех.", "We need to find wording that is acceptable to everyone.", [
        "We need to find wording that is acceptable to everyone.",
        "We need to choose a phrase that is easier to memorize.",
        "We need to build a lesson that is shorter than usual."
      ]),
      speaking("Я вижу здесь скорее недопонимание, чем конфликт.", "I see more misunderstanding here than conflict.", [
        "I see more misunderstanding here than conflict.",
        "I see more emotion here than structure.",
        "I see more grammar here than vocabulary."
      ]),
      speaking("Стоит отделить факты от эмоциональной реакции.", "It is worth separating the facts from the emotional response.", [
        "It is worth separating the facts from the emotional response.",
        "It is worth comparing the answers with the examples.",
        "It is worth revising the phrases after the lesson."
      ]),
      speaking("Давайте сосредоточимся на том, в чём мы согласны.", "Let us focus on what we agree on.", [
        "Let us focus on what we agree on.",
        "Let us return to what we translated first.",
        "Let us decide which sentence sounds better."
      ]),
      speaking("Я постараюсь передать вашу мысль более нейтрально.", "I will try to convey your idea in a more neutral way.", [
        "I will try to convey your idea in a more neutral way.",
        "I will try to explain your answer in a faster way.",
        "I will try to present your feedback in a shorter way."
      ]),
      speaking("Нам нужен язык, который не обостряет ситуацию.", "We need language that does not escalate the situation.", [
        "We need language that does not escalate the situation.",
        "We need intonation that does not slow down the speech.",
        "We need grammar that does not confuse the learner."
      ]),
      speaking("Смысл можно сохранить, даже изменив тон.", "The meaning can be preserved even if the tone changes.", [
        "The meaning can be preserved even if the tone changes.",
        "The structure can be improved even if the task grows.",
        "The answer can be repeated even if the sound fails."
      ])
    ]
  },
  {
    title: "C1 Speaking Professional Framing",
    description: "Frame recommendations, criticism and decisions with advanced clarity.",
    level: "C1",
    type: "speaking",
    xpReward: 170,
    questions: [
      speaking("Я бы представил это как долгосрочную инвестицию.", "I would frame this as a long-term investment.", [
        "I would frame this as a long-term investment.",
        "I would describe this as a short classroom task.",
        "I would repeat this as a familiar speaking line."
      ]),
      speaking("Нам следует подчеркнуть потенциальную выгоду.", "We should highlight the potential benefit.", [
        "We should highlight the potential benefit.",
        "We should memorize the optional phrase.",
        "We should simplify the opening sentence."
      ]),
      speaking("Критика будет воспринята лучше в конструктивной форме.", "Criticism will be received better in a constructive form.", [
        "Criticism will be received better in a constructive form.",
        "Feedback will be repeated better in a louder voice.",
        "Grammar will be remembered better in a shorter list."
      ]),
      speaking("Я бы избегал слишком категоричных формулировок.", "I would avoid overly categorical wording.", [
        "I would avoid overly categorical wording.",
        "I would avoid unusually difficult grammar.",
        "I would avoid very energetic delivery."
      ]),
      speaking("Это решение нужно представить как обоснованный выбор.", "This decision should be presented as a reasoned choice.", [
        "This decision should be presented as a reasoned choice.",
        "This answer should be described as a simple mistake.",
        "This exercise should be translated as a daily phrase."
      ]),
      speaking("Нам стоит заранее обозначить ограничения.", "We should outline the limitations in advance.", [
        "We should outline the limitations in advance.",
        "We should analyze the emotions in detail.",
        "We should compare the examples again."
      ]),
      speaking("Я бы начал с общего вывода, а затем перешёл к деталям.", "I would start with the overall conclusion and then move to the details.", [
        "I would start with the overall conclusion and then move to the details.",
        "I would start with the shortest sentence and then add examples.",
        "I would start with the translation and then repeat the question."
      ]),
      speaking("Важно показать, что выбор был осознанным.", "It is important to show that the choice was deliberate.", [
        "It is important to show that the choice was deliberate.",
        "It is important to hear that the answer was correct.",
        "It is important to know that the speaker was nervous."
      ]),
      speaking("Такое объяснение помогает снизить сопротивление.", "That explanation helps reduce resistance.", [
        "That explanation helps reduce resistance.",
        "That intonation helps improve pronunciation.",
        "That structure helps organize revision."
      ]),
      speaking("Нам нужен более убедительный способ подать идею.", "We need a more persuasive way to present the idea.", [
        "We need a more persuasive way to present the idea.",
        "We need a more traditional way to teach the phrase.",
        "We need a more relaxed way to read the text."
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
  },
  {
    title: "C2 Speaking Subtext Control",
    description: "Work with implication, understatement and subtle shades of meaning.",
    level: "C2",
    type: "speaking",
    xpReward: 190,
    questions: [
      speaking("Её слова звучали одобрительно, но подтекст был холодным.", "Her words sounded approving, but the subtext was cold.", [
        "Her words sounded approving, but the subtext was cold.",
        "Her answer sounded formal, but the grammar was clear.",
        "Her tone sounded softer, but the message was shorter."
      ]),
      speaking("Он согласился слишком быстро, чтобы это казалось искренним.", "He agreed too quickly for it to seem sincere.", [
        "He agreed too quickly for it to seem sincere.",
        "He replied too calmly for it to feel urgent.",
        "He paused too long for it to sound natural."
      ]),
      speaking("Молчание оказалось красноречивее любого ответа.", "The silence proved more eloquent than any answer.", [
        "The silence proved more eloquent than any answer.",
        "The example sounded more useful than the theory.",
        "The lesson felt more difficult than the review."
      ]),
      speaking("Это замечание выглядело нейтральным лишь формально.", "That remark was neutral only on the surface.", [
        "That remark was neutral only on the surface.",
        "That response was helpful only at first.",
        "That phrase was natural only in writing."
      ]),
      speaking("За вежливостью скрывалось явное раздражение.", "Obvious irritation lay beneath the politeness.", [
        "Obvious irritation lay beneath the politeness.",
        "Strong confidence appeared during the speech.",
        "Clear structure emerged from the answer."
      ]),
      speaking("Он намеренно оставил фразу двусмысленной.", "He deliberately left the sentence ambiguous.", [
        "He deliberately left the sentence ambiguous.",
        "He accidentally made the question shorter.",
        "He carefully changed the order of ideas."
      ]),
      speaking("Подобная ирония требует очень точного слуха.", "That kind of irony requires a very precise ear.", [
        "That kind of irony requires a very precise ear.",
        "That type of speaking needs a slower rhythm.",
        "That kind of grammar takes a longer explanation."
      ]),
      speaking("Формально это был комплимент, но по сути упрёк.", "Formally it was a compliment, but in essence a reproach.", [
        "Formally it was a compliment, but in essence a reproach.",
        "Technically it was a question, but in style a summary.",
        "Visually it was a chart, but in purpose a reminder."
      ]),
      speaking("Тон менял смысл сильнее, чем сами слова.", "The tone altered the meaning more than the words themselves.", [
        "The tone altered the meaning more than the words themselves.",
        "The speed improved the answer more than the examples.",
        "The accent changed the task more than the grammar."
      ]),
      speaking("Важно уловить не только сказанное, но и подразумеваемое.", "It is important to grasp not only what is said but also what is implied.", [
        "It is important to grasp not only what is said but also what is implied.",
        "It is important to learn not only the rules but also the exceptions.",
        "It is important to repeat not only the phrase but also the translation."
      ])
    ]
  },
  {
    title: "C2 Speaking Rhetorical Nuance",
    description: "Sharpen persuasive speech, rhetorical contrast and elegant emphasis.",
    level: "C2",
    type: "speaking",
    xpReward: 190,
    questions: [
      speaking("Сила аргумента заключалась в его сдержанности.", "The strength of the argument lay in its restraint.", [
        "The strength of the argument lay in its restraint.",
        "The value of the lesson lay in its simplicity.",
        "The rhythm of the speech lay in its repetition."
      ]),
      speaking("Он усилил эффект, ничего не сказав напрямую.", "He intensified the effect without saying anything directly.", [
        "He intensified the effect without saying anything directly.",
        "He improved the answer without changing the grammar.",
        "He shortened the lesson without removing the tasks."
      ]),
      speaking("Такой контраст делает мысль особенно выразительной.", "That contrast makes the idea especially vivid.", [
        "That contrast makes the idea especially vivid.",
        "That topic makes the exercise especially useful.",
        "That accent makes the sentence especially clear."
      ]),
      speaking("Её речь была изысканной, но не вычурной.", "Her speech was refined without being pretentious.", [
        "Her speech was refined without being pretentious.",
        "Her answer was careful without being formal.",
        "Her tone was soft without being uncertain."
      ]),
      speaking("Убедительность здесь строится на точной дозировке эмоций.", "Persuasiveness here depends on a precise balance of emotion.", [
        "Persuasiveness here depends on a precise balance of emotion.",
        "Confidence here depends on a strong memory of phrases.",
        "Fluency here depends on a quick pace of speaking."
      ]),
      speaking("Риторический вопрос прозвучал скорее как обвинение.", "The rhetorical question sounded more like an accusation.", [
        "The rhetorical question sounded more like an accusation.",
        "The opening sentence sounded more like a summary.",
        "The final answer sounded more like a translation."
      ]),
      speaking("Лаконичность придала высказыванию дополнительный вес.", "Brevity gave the statement additional weight.", [
        "Brevity gave the statement additional weight.",
        "Clarity gave the lesson additional value.",
        "Practice gave the learner additional confidence."
      ]),
      speaking("Эта метафора работает именно из-за своей тонкости.", "That metaphor works precisely because of its subtlety.", [
        "That metaphor works precisely because of its subtlety.",
        "That example works mainly because of its structure.",
        "That sentence works partly because of its rhythm."
      ]),
      speaking("Избыточная драматизация разрушила бы эффект.", "Excessive dramatization would have ruined the effect.", [
        "Excessive dramatization would have ruined the effect.",
        "Unusual pronunciation would have changed the answer.",
        "Longer instructions would have slowed the lesson."
      ]),
      speaking("В этом случае нам важнее намёк, чем прямое утверждение.", "In this case, suggestion matters more than direct assertion.", [
        "In this case, suggestion matters more than direct assertion.",
        "In this case, grammar matters more than pronunciation.",
        "In this case, translation matters more than listening."
      ])
    ]
  },
  {
    title: "C2 Speaking Interpretive Response",
    description: "Respond to ambiguity, layered intent and complex communicative signals.",
    level: "C2",
    type: "speaking",
    xpReward: 190,
    questions: [
      speaking("Я бы прочитал это как завуалированное предупреждение.", "I would read that as a veiled warning.", [
        "I would read that as a veiled warning.",
        "I would describe that as a helpful note.",
        "I would repeat that as a clear instruction."
      ]),
      speaking("Его осторожность, вероятно, была стратегической.", "His caution was probably strategic.", [
        "His caution was probably strategic.",
        "His answer was probably incomplete.",
        "His accent was probably regional."
      ]),
      speaking("Буквальный смысл здесь вводит в заблуждение.", "The literal meaning is misleading here.", [
        "The literal meaning is misleading here.",
        "The final example is confusing here.",
        "The slower version is easier here."
      ]),
      speaking("Мне кажется, это скорее попытка дистанцироваться.", "It seems to me more like an attempt to distance himself.", [
        "It seems to me more like an attempt to distance himself.",
        "It seems to me more like a chance to explain the rule.",
        "It seems to me more like a reason to repeat the answer."
      ]),
      speaking("Подобная сдержанность может скрывать несогласие.", "Such restraint may conceal disagreement.", [
        "Such restraint may conceal disagreement.",
        "Such grammar may create confusion.",
        "Such feedback may sound repetitive."
      ]),
      speaking("Её ответ оставил пространство для двоякого толкования.", "Her reply left room for two interpretations.", [
        "Her reply left room for two interpretations.",
        "Her example left room for more revision.",
        "Her lecture left room for fewer questions."
      ]),
      speaking("Контекст подсказывает более сложное чтение ситуации.", "The context suggests a more layered reading of the situation.", [
        "The context suggests a more layered reading of the situation.",
        "The exercise suggests a more careful pace of speaking.",
        "The task suggests a more direct style of writing."
      ]),
      speaking("Нам следует учитывать скрытый коммуникативный сигнал.", "We should take the implicit communicative signal into account.", [
        "We should take the implicit communicative signal into account.",
        "We should keep the original sentence in mind.",
        "We should put the difficult phrase on screen."
      ]),
      speaking("Я не уверен, что его нейтралитет был подлинным.", "I am not convinced that his neutrality was genuine.", [
        "I am not convinced that his neutrality was genuine.",
        "I am not convinced that his answer was wrong.",
        "I am not convinced that his accent was natural."
      ]),
      speaking("Такие детали радикально меняют интерпретацию.", "Such details radically change the interpretation.", [
        "Such details radically change the interpretation.",
        "Such questions gradually improve pronunciation.",
        "Such answers occasionally reduce confusion."
      ])
    ]
  },
  {
    title: "C2 Speaking Register Mastery",
    description: "Master register shifts, precision and high-level spoken control.",
    level: "C2",
    type: "speaking",
    xpReward: 190,
    questions: [
      speaking("Смена регистра здесь была намеренной и очень точной.", "The shift in register here was deliberate and highly precise.", [
        "The shift in register here was deliberate and highly precise.",
        "The change in rhythm here was simple and quite natural.",
        "The use of grammar here was careful and rather formal."
      ]),
      speaking("Он сознательно выбрал более официальный тон.", "He deliberately adopted a more formal tone.", [
        "He deliberately adopted a more formal tone.",
        "He unexpectedly repeated a more familiar phrase.",
        "He gradually developed a more confident style."
      ]),
      speaking("Такое слово уместно лишь в узком контексте.", "That word is appropriate only in a narrow context.", [
        "That word is appropriate only in a narrow context.",
        "That answer is acceptable only in the review.",
        "That phrase is memorable only in the textbook."
      ]),
      speaking("Высокий уровень требует контроля над каждым оттенком смысла.", "A high level requires control over every shade of meaning.", [
        "A high level requires control over every shade of meaning.",
        "A difficult task requires attention to every word on screen.",
        "A good answer requires practice with every type of question."
      ]),
      speaking("Неподходящий регистр может подорвать доверие мгновенно.", "An inappropriate register can undermine trust instantly.", [
        "An inappropriate register can undermine trust instantly.",
        "An unusual structure can improve rhythm unexpectedly.",
        "An extended pause can change timing completely."
      ]),
      speaking("Здесь точность важнее стилистического блеска.", "Precision matters more here than stylistic flair.", [
        "Precision matters more here than stylistic flair.",
        "Pronunciation matters more here than vocabulary range.",
        "Speed matters more here than careful listening."
      ]),
      speaking("Даже сильный аргумент ослабевает при неудачной подаче.", "Even a strong argument weakens with poor delivery.", [
        "Even a strong argument weakens with poor delivery.",
        "Even a short lesson improves with more examples.",
        "Even a correct answer sounds better with practice."
      ]),
      speaking("Нам нужно не только звучать точно, но и восприниматься уместно.", "We need not only to sound precise but also to come across as appropriate.", [
        "We need not only to sound precise but also to come across as appropriate.",
        "We need not only to speak clearly but also to finish on time.",
        "We need not only to read quickly but also to answer first."
      ]),
      speaking("Такая формулировка слишком разговорная для этой ситуации.", "That wording is too informal for this situation.", [
        "That wording is too informal for this situation.",
        "That sentence is too difficult for this unit.",
        "That example is too short for this lesson."
      ]),
      speaking("Настоящее мастерство проявляется в управлении нюансами.", "True mastery shows itself in the control of nuance.", [
        "True mastery shows itself in the control of nuance.",
        "Real progress shows itself in the review score.",
        "Clear improvement shows itself in the final result."
      ])
    ]
  }
];
