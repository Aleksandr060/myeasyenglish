import { useMemo, useRef, useState } from "react";
import { ProgressBar } from "../components/ProgressBar";
import { assessPronunciation, shuffle } from "../lib/utils";
import { useLanguageStore } from "../store/language";

type PracticeQuestion = {
  prompt: string;
  options: string[];
  correctAnswer: string;
};

type EmotionPractice = {
  id: string;
  colorClass: string;
  titleRu: string;
  titleEn: string;
  emoji: string;
  pronunciationTarget: string;
  pronunciationRu: string;
  variants: Array<{
    labelRu: string;
    labelEn: string;
    text: string;
    rate: number;
    pitch: number;
  }>;
  questionsRu: PracticeQuestion[];
  questionsEn: PracticeQuestion[];
};

const emotionPractices: EmotionPractice[] = [
  {
    id: "surprise",
    colorClass: "from-amber-400 to-yellow-500",
    titleRu: "Удивление",
    titleEn: "Surprise",
    emoji: "😮",
    pronunciationTarget: "I can't believe it!",
    pronunciationRu: "Не могу в это поверить!",
    variants: [
      { labelRu: "Вариант 1", labelEn: "Variant 1", text: "Really?", rate: 1.02, pitch: 1.5 },
      { labelRu: "Вариант 2", labelEn: "Variant 2", text: "You did what?", rate: 0.98, pitch: 1.56 },
      { labelRu: "Вариант 3", labelEn: "Variant 3", text: "I can't believe it!", rate: 1.04, pitch: 1.44 }
    ],
    questionsRu: [
      {
        prompt: "Какая интонация лучше всего подходит для удивления?",
        options: ["Высокий старт и заметный подъём", "Ровный монотонный тон", "Очень медленный и низкий тон"],
        correctAnswer: "Высокий старт и заметный подъём"
      },
      {
        prompt: "Какая фраза звучит как эмоциональное удивление?",
        options: ["You did what?", "Please sit down.", "I go to school every day."],
        correctAnswer: "You did what?"
      },
      {
        prompt: "Что чаще слышно в речи при удивлении?",
        options: ["Яркий акцент на ключевом слове", "Полное отсутствие ударения", "Очень тихая финальная часть"],
        correctAnswer: "Яркий акцент на ключевом слове"
      },
      {
        prompt: "Какой цвет в концепции проекта связан с удивлением?",
        options: ["Жёлтый", "Серый", "Синий"],
        correctAnswer: "Жёлтый"
      },
      {
        prompt: "Какой вариант ближе к распознаванию удивления по интонации?",
        options: ["Слушать контраст высоты и энергии", "Игнорировать тон и темп", "Оценивать только длину предложения"],
        correctAnswer: "Слушать контраст высоты и энергии"
      }
    ],
    questionsEn: [
      {
        prompt: "Which intonation pattern best matches surprise?",
        options: ["A high start with clear pitch movement", "A flat monotone", "A very slow low tone"],
        correctAnswer: "A high start with clear pitch movement"
      },
      {
        prompt: "Which phrase sounds emotionally surprised?",
        options: ["You did what?", "Please sit down.", "I go to school every day."],
        correctAnswer: "You did what?"
      },
      {
        prompt: "What is common in surprised speech?",
        options: ["A strong accent on the key word", "No stress at all", "A very quiet ending"],
        correctAnswer: "A strong accent on the key word"
      },
      {
        prompt: "Which color in the project concept is linked to surprise?",
        options: ["Yellow", "Grey", "Blue"],
        correctAnswer: "Yellow"
      },
      {
        prompt: "What helps recognize surprise by intonation?",
        options: ["Listening for contrast in pitch and energy", "Ignoring tone and tempo", "Checking only sentence length"],
        correctAnswer: "Listening for contrast in pitch and energy"
      }
    ]
  },
  {
    id: "joy",
    colorClass: "from-emerald-400 to-green-500",
    titleRu: "Радость",
    titleEn: "Joy",
    emoji: "😊",
    pronunciationTarget: "That's amazing!",
    pronunciationRu: "Это потрясающе!",
    variants: [
      { labelRu: "Вариант 1", labelEn: "Variant 1", text: "That's amazing!", rate: 1.05, pitch: 1.34 },
      { labelRu: "Вариант 2", labelEn: "Variant 2", text: "I am so happy for you!", rate: 1.02, pitch: 1.28 },
      { labelRu: "Вариант 3", labelEn: "Variant 3", text: "What wonderful news!", rate: 1.04, pitch: 1.32 }
    ],
    questionsRu: [
      {
        prompt: "Как звучит радость в речи?",
        options: ["Тепло, ярко и немного быстрее", "Очень резко и рублено", "Слишком ровно и холодно"],
        correctAnswer: "Тепло, ярко и немного быстрее"
      },
      {
        prompt: "Какая фраза лучше всего передаёт радость?",
        options: ["That's amazing!", "Leave me alone.", "I am not sure."],
        correctAnswer: "That's amazing!"
      },
      {
        prompt: "Какой цвет в концепции проекта связан с радостью?",
        options: ["Зелёный", "Красный", "Серый"],
        correctAnswer: "Зелёный"
      },
      {
        prompt: "Что важно при распознавании радости?",
        options: ["Слышать более светлый тембр", "Искать только низкий тон", "Слушать отсутствие эмоций"],
        correctAnswer: "Слышать более светлый тембр"
      },
      {
        prompt: "Какой акцент чаще встречается в радостной фразе?",
        options: ["Живой и открытый", "Тяжёлый и отстранённый", "Резкий и конфликтный"],
        correctAnswer: "Живой и открытый"
      }
    ],
    questionsEn: [
      {
        prompt: "How does joy usually sound in speech?",
        options: ["Warm, bright and slightly quicker", "Sharp and chopped", "Flat and cold"],
        correctAnswer: "Warm, bright and slightly quicker"
      },
      {
        prompt: "Which phrase best expresses joy?",
        options: ["That's amazing!", "Leave me alone.", "I am not sure."],
        correctAnswer: "That's amazing!"
      },
      {
        prompt: "Which color in the project concept is linked to joy?",
        options: ["Green", "Red", "Grey"],
        correctAnswer: "Green"
      },
      {
        prompt: "What matters when recognizing joy?",
        options: ["Hearing a brighter voice quality", "Listening only for a low tone", "Looking for no emotion at all"],
        correctAnswer: "Hearing a brighter voice quality"
      },
      {
        prompt: "What kind of accent is common in joyful speech?",
        options: ["Lively and open", "Heavy and detached", "Harsh and conflict-driven"],
        correctAnswer: "Lively and open"
      }
    ]
  },
  {
    id: "anger",
    colorClass: "from-red-500 to-rose-600",
    titleRu: "Гнев",
    titleEn: "Anger",
    emoji: "😠",
    pronunciationTarget: "Stop that now.",
    pronunciationRu: "Прекрати это сейчас.",
    variants: [
      { labelRu: "Вариант 1", labelEn: "Variant 1", text: "Stop that now.", rate: 0.92, pitch: 0.76 },
      { labelRu: "Вариант 2", labelEn: "Variant 2", text: "I told you to stop.", rate: 0.9, pitch: 0.72 },
      { labelRu: "Вариант 3", labelEn: "Variant 3", text: "Do not do that again.", rate: 0.91, pitch: 0.74 }
    ],
    questionsRu: [
      {
        prompt: "Как чаще звучит гнев?",
        options: ["Резко и с сильным ударением", "Мягко и нерешительно", "Спокойно и нейтрально"],
        correctAnswer: "Резко и с сильным ударением"
      },
      {
        prompt: "Какая фраза лучше всего передаёт гнев?",
        options: ["Stop that now.", "What a lovely idea.", "Could you help me?"],
        correctAnswer: "Stop that now."
      },
      {
        prompt: "Какой цвет в концепции проекта связан с гневом?",
        options: ["Красный", "Зелёный", "Жёлтый"],
        correctAnswer: "Красный"
      },
      {
        prompt: "Что важно распознавать в сердитой речи?",
        options: ["Сильный нажим на ключевые слова", "Очень плавную мелодию", "Полное отсутствие стресса"],
        correctAnswer: "Сильный нажим на ключевые слова"
      },
      {
        prompt: "Как обычно завершается фраза при гневе?",
        options: ["Более жёстко и твёрдо", "Очень мягко и открыто", "Случайным подъёмом без смысла"],
        correctAnswer: "Более жёстко и твёрдо"
      }
    ],
    questionsEn: [
      {
        prompt: "How does anger often sound?",
        options: ["Sharp with strong stress", "Soft and hesitant", "Calm and neutral"],
        correctAnswer: "Sharp with strong stress"
      },
      {
        prompt: "Which phrase best expresses anger?",
        options: ["Stop that now.", "What a lovely idea.", "Could you help me?"],
        correctAnswer: "Stop that now."
      },
      {
        prompt: "Which color in the project concept is linked to anger?",
        options: ["Red", "Green", "Yellow"],
        correctAnswer: "Red"
      },
      {
        prompt: "What matters in angry speech recognition?",
        options: ["Strong pressure on the key words", "A very smooth melody", "No stress at all"],
        correctAnswer: "Strong pressure on the key words"
      },
      {
        prompt: "How does an angry phrase often end?",
        options: ["More firmly and sharply", "Very softly and openly", "With a random rise"],
        correctAnswer: "More firmly and sharply"
      }
    ]
  }
];

type SpeechStatus = "idle" | "listening" | "error";

const speechRecognitionSupported =
  typeof window !== "undefined" &&
  ("SpeechRecognition" in window || "webkitSpeechRecognition" in window);

export function PracticePage() {
  const language = useLanguageStore((state) => state.language);
  const [emotionIndex, setEmotionIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [correctCount, setCorrectCount] = useState(0);
  const [answersChecked, setAnswersChecked] = useState(false);
  const [speechStatus, setSpeechStatus] = useState<SpeechStatus>("idle");
  const [transcript, setTranscript] = useState("");
  const [speechScore, setSpeechScore] = useState<number | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const recognitionRef = useRef<{
    start: () => void;
    stop: () => void;
    lang: string;
    interimResults: boolean;
    maxAlternatives: number;
    onstart: null | (() => void);
    onend: null | (() => void);
    onerror: null | (() => void);
    onresult: null | ((event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void);
  } | null>(null);

  const emotion = emotionPractices[emotionIndex];
  const questions = useMemo(
    () => (language === "ru" ? emotion.questionsRu : emotion.questionsEn).map((question) => ({
      ...question,
      options: shuffle(question.options)
    })),
    [emotion, language]
  );
  const currentQuestion = questions[questionIndex];
  const recognitionPercent = Math.round((correctCount / questions.length) * 100);
  const finalPercent =
    speechScore === null ? recognitionPercent : Math.round(recognitionPercent * 0.6 + speechScore * 0.4);
  const lastEmotion = emotionIndex >= emotionPractices.length - 1;

  const playVariant = (id: string, text: string, rate: number, pitch: number) => {
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

  const submitRecognitionAnswer = () => {
    if (!selectedAnswer || answersChecked) return;

    if (selectedAnswer === currentQuestion.correctAnswer) {
      setCorrectCount((value) => value + 1);
    }

    if (questionIndex < questions.length - 1) {
      setQuestionIndex((value) => value + 1);
      setSelectedAnswer("");
      return;
    }

    setAnswersChecked(true);
  };

  const startSpeechRecognition = () => {
    if (!speechRecognitionSupported || speechStatus === "listening") return;

    const SpeechRecognitionCtor = (
      window as Window & {
        SpeechRecognition?: new () => {
          start: () => void;
          stop: () => void;
          lang: string;
          interimResults: boolean;
          maxAlternatives: number;
          onstart: null | (() => void);
          onend: null | (() => void);
          onerror: null | (() => void);
          onresult: null | ((event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void);
        };
        webkitSpeechRecognition?: new () => {
          start: () => void;
          stop: () => void;
          lang: string;
          interimResults: boolean;
          maxAlternatives: number;
          onstart: null | (() => void);
          onend: null | (() => void);
          onerror: null | (() => void);
          onresult: null | ((event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void);
        };
      }
    ).SpeechRecognition ??
      (
        window as Window & {
          webkitSpeechRecognition?: new () => {
            start: () => void;
            stop: () => void;
            lang: string;
            interimResults: boolean;
            maxAlternatives: number;
            onstart: null | (() => void);
            onend: null | (() => void);
            onerror: null | (() => void);
            onresult: null | ((event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void);
          };
        }
      ).webkitSpeechRecognition;

    if (!SpeechRecognitionCtor) {
      setSpeechStatus("error");
      return;
    }

    const recognition = new SpeechRecognitionCtor();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setSpeechStatus("listening");
      setTranscript("");
      setSpeechScore(null);
    };

    recognition.onerror = () => {
      setSpeechStatus("error");
    };

    recognition.onend = () => {
      setSpeechStatus((current) => (current === "error" ? "error" : "idle"));
    };

    recognition.onresult = (event) => {
      const spokenText = Array.from(event.results)
        .map((result) => result?.[0]?.transcript ?? "")
        .join(" ")
        .trim();

      setTranscript(spokenText);
      setSpeechScore(assessPronunciation(emotion.pronunciationTarget, spokenText).score);
      setSpeechStatus("idle");
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const moveNextEmotion = () => {
    if (lastEmotion) {
      setEmotionIndex(0);
    } else {
      setEmotionIndex((value) => value + 1);
    }

    setQuestionIndex(0);
    setSelectedAnswer("");
    setCorrectCount(0);
    setAnswersChecked(false);
    setSpeechStatus("idle");
    setTranscript("");
    setSpeechScore(null);
  };

  return (
    <div className="space-y-6">
      <section className={`rounded-[32px] bg-gradient-to-r ${emotion.colorClass} p-6 text-white shadow-card`}>
        <p className="text-sm font-black uppercase tracking-[0.28em] text-white/75">
          {language === "ru" ? "Практика" : "Practice"}
        </p>
        <h2 className="mt-3 text-3xl font-extrabold">
          {emotion.emoji} {language === "ru" ? `Сценарий: ${emotion.titleRu}` : `Scenario: ${emotion.titleEn}`}
        </h2>
        <p className="mt-3 max-w-3xl text-white/90">
          {language === "ru"
            ? "Слушай 3 варианта произношения, выполняй 5 заданий на распознавание, записывай свою речь и переходи к следующей эмоции."
            : "Listen to 3 pronunciation variants, complete 5 recognition tasks, record your own speech and move to the next emotion."}
        </p>
      </section>

      <section className="rounded-[32px] border p-6 shadow-card" data-surface="base">
        <p className="text-sm font-black uppercase tracking-[0.24em] text-brand/70">
          🎧 {language === "ru" ? "3 варианта произношения" : "3 pronunciation variants"}
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {emotion.variants.map((variant, index) => {
            const variantId = `${emotion.id}-${index}`;
            const isPlaying = playingId === variantId;

            return (
              <button
                key={variantId}
                type="button"
                onClick={() => playVariant(variantId, variant.text, variant.rate, variant.pitch)}
                className="rounded-3xl border p-4 text-left transition hover:-translate-y-0.5"
                data-surface="soft"
              >
                <div className="text-sm font-black uppercase tracking-[0.16em] text-brand/70">
                  {isPlaying ? "🔊" : "▶"} {language === "ru" ? variant.labelRu : variant.labelEn}
                </div>
                <div className="mt-3 text-lg font-extrabold">{variant.text}</div>
              </button>
            );
          })}
        </div>
      </section>

      <section className="rounded-[32px] border p-6 shadow-card" data-surface="base">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-brand/70">
            🧩 {language === "ru" ? "5 заданий на распознавание" : "5 recognition tasks"}
          </p>
          <div className="text-sm font-bold" data-text="muted">
            {questionIndex + 1}/{questions.length}
          </div>
        </div>

        <div className="mt-4 rounded-3xl border p-5" data-surface="soft">
          <div className="text-lg font-extrabold">{currentQuestion.prompt}</div>
          <div className="mt-4 grid gap-3">
            {currentQuestion.options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setSelectedAnswer(option)}
                className={`rounded-2xl border px-4 py-3 text-left text-sm font-bold transition ${
                  selectedAnswer === option ? "border-brand bg-brand/10 text-brand" : ""
                }`}
                data-surface={selectedAnswer === option ? undefined : "base"}
              >
                {option}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={submitRecognitionAnswer}
            disabled={!selectedAnswer || answersChecked}
            className="mt-5 rounded-full bg-brand px-5 py-3 text-sm font-extrabold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {language === "ru" ? "Проверить / дальше" : "Check / next"}
          </button>
        </div>
      </section>

      <section className="rounded-[32px] border p-6 shadow-card" data-surface="base">
        <p className="text-sm font-black uppercase tracking-[0.24em] text-brand/70">
          🎙️ {language === "ru" ? "Запись речи и оценка" : "Speech recording and score"}
        </p>
        <div className="mt-4 grid gap-4 lg:grid-cols-[1.1fr,0.9fr]">
          <div className="rounded-3xl border p-5" data-surface="soft">
            <div className="font-extrabold">
              {language === "ru" ? "Эталонная фраза" : "Reference phrase"}: {emotion.pronunciationTarget}
            </div>
            <div className="mt-2 text-sm" data-text="muted">
              {emotion.pronunciationRu}
            </div>
            <button
              type="button"
              onClick={startSpeechRecognition}
              className="mt-4 rounded-full bg-success px-5 py-3 text-sm font-extrabold text-white transition hover:bg-emerald-500"
            >
              {speechStatus === "listening"
                ? language === "ru"
                  ? "Слушаю..."
                  : "Listening..."
                : language === "ru"
                  ? "Записать речь"
                  : "Record speech"}
            </button>
            {transcript ? (
              <div className="mt-4 text-sm">
                <div className="font-bold">{language === "ru" ? "Система услышала" : "Recognized"}:</div>
                <div className="mt-1" data-text="muted">{transcript}</div>
              </div>
            ) : null}
          </div>

          <div className="rounded-3xl border p-5" data-surface="soft">
            <div className="font-extrabold">
              {language === "ru" ? "Оценка в процентном соотношении" : "Percentage score"}
            </div>
            <div className="mt-4">
              <ProgressBar
                value={finalPercent}
                label={`${finalPercent}%`}
                colorClass={emotion.colorClass}
              />
            </div>
            <div className="mt-4 space-y-2 text-sm" data-text="muted">
              <div>{language === "ru" ? `Распознавание: ${recognitionPercent}%` : `Recognition: ${recognitionPercent}%`}</div>
              <div>{language === "ru" ? `Произношение: ${speechScore ?? 0}%` : `Pronunciation: ${speechScore ?? 0}%`}</div>
            </div>
            <button
              type="button"
              onClick={moveNextEmotion}
              disabled={!answersChecked}
              className="mt-5 rounded-full bg-brand px-5 py-3 text-sm font-extrabold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {language === "ru"
                ? lastEmotion
                  ? "Начать заново"
                  : "Перейти к следующей эмоции"
                : lastEmotion
                  ? "Start again"
                  : "Go to the next emotion"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
