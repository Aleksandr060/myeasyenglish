import { useEffect, useMemo, useRef, useState } from "react";
import confetti from "canvas-confetti";
import { useNavigate, useParams } from "react-router-dom";
import { completeLessonApi, lessonApi, meApi } from "../api/client";
import { ProgressBar } from "../components/ProgressBar";
import { getQuestionTypeLabel, t } from "../lib/i18n";
import { assessPronunciation, matchesQuestion, shuffle, strictSpeakingMatches } from "../lib/utils";
import { useAuthStore } from "../store/auth";
import { useLanguageStore } from "../store/language";
import type { LessonDetail, LessonResult } from "../types";

type FeedbackState = {
  status: "correct" | "wrong";
  message: string;
};

type SpeechStatus = "idle" | "listening" | "error";

type PronunciationState = {
  transcript: string;
  score: number;
  message: string;
  intonationHint: string;
  missingWords: string[];
  extraWords: string[];
};

const speechSupported = typeof window !== "undefined" && "speechSynthesis" in window;
const speechRecognitionSupported =
  typeof window !== "undefined" &&
  ("SpeechRecognition" in window || "webkitSpeechRecognition" in window);

export function LessonPage() {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);
  const language = useLanguageStore((state) => state.language);
  const [lesson, setLesson] = useState<LessonDetail | null>(null);
  const [index, setIndex] = useState(0);
  const [hearts, setHearts] = useState(3);
  const [answers, setAnswers] = useState<string[]>([]);
  const [speechScores, setSpeechScores] = useState<Array<number | null>>([]);
  const [currentValue, setCurrentValue] = useState("");
  const [feedback, setFeedback] = useState<FeedbackState | null>(null);
  const [previewXp, setPreviewXp] = useState(0);
  const [result, setResult] = useState<LessonResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [randomizedOptions, setRandomizedOptions] = useState<Record<string, string[]>>({});
  const [speechStatus, setSpeechStatus] = useState<SpeechStatus>("idle");
  const [pronunciation, setPronunciation] = useState<PronunciationState | null>(null);
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
  const question = lesson?.questions[index];

  useEffect(() => {
    if (!lessonId) return;

    lessonApi(lessonId).then((data) => {
      setLesson(data);
      setLoading(false);
    });
  }, [lessonId]);

  useEffect(() => {
    if (!question) return;

    setPronunciation(null);
    setSpeechStatus("idle");
    recognitionRef.current?.stop();

    setRandomizedOptions((current) => {
      if (current[question.id]) return current;

      return {
        ...current,
        [question.id]: shuffle(question.options)
      };
    });
  }, [question]);

  useEffect(() => {
    return () => {
      recognitionRef.current?.stop();
    };
  }, []);
  const isChoiceQuestion =
    question?.type === "vocabulary" || question?.type === "listening" || question?.type === "fillblank";
  const isSpeechPracticeQuestion =
    question?.type === "translation" || question?.type === "speaking";

  const progress = lesson ? ((index + 1) / lesson.questions.length) * 100 : 0;

  const answerPrompt = useMemo(() => {
    if (!question) return "";
    if (question.type === "translation") return t(language, "typeTranslation");
    if (question.type === "speaking") return t(language, "typeSpeaking");
    return t(language, "chooseCorrect");
  }, [language, question]);

  const displayOptions = question ? randomizedOptions[question.id] ?? question.options : [];

  const playAudio = (text?: string | null) => {
    if (!speechSupported || !text) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  const getIntonationHint = (text: string) => {
    if (text.trim().endsWith("?")) return t(language, "intonationQuestion");
    if (text.trim().endsWith("!")) return t(language, "intonationExclamation");
    return t(language, "intonationStatement");
  };

  const buildPronunciationState = (transcript: string) => {
    const assessment = assessPronunciation(question.correctAnswer, transcript);
    const message =
      assessment.score >= 90 && (question.type !== "speaking" || strictSpeakingMatches(question.correctAnswer, transcript))
        ? t(language, "pronunciationExcellent")
        : assessment.score >= 70
          ? t(language, "pronunciationGood")
          : t(language, "pronunciationNeedsWork");

    return {
      transcript,
      score: assessment.score,
      message,
      intonationHint: getIntonationHint(question.correctAnswer),
      missingWords: assessment.missingWords,
      extraWords: assessment.extraWords
    };
  };

  const startSpeechRecognition = () => {
    if (
      (question.type !== "translation" && question.type !== "speaking") ||
      !speechRecognitionSupported ||
      speechStatus === "listening"
    ) {
      return;
    }

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
      setPronunciation(null);
    };

    recognition.onerror = () => {
      setSpeechStatus("error");
      setPronunciation(null);
    };

    recognition.onend = () => {
      setSpeechStatus((current) => (current === "error" ? "error" : "idle"));
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0]?.[0]?.transcript?.trim() ?? "";

      if (!transcript) {
        setSpeechStatus("error");
        return;
      }

      setCurrentValue(transcript);
      setSpeechStatus("idle");
      setPronunciation(buildPronunciationState(transcript));
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const finishLesson = async (
    submittedAnswers: string[],
    submittedSpeechScores: Array<number | null>
  ) => {
    if (!lessonId) return;

    setSubmitting(true);
    const completion = await completeLessonApi(lessonId, submittedAnswers, submittedSpeechScores);
    const profile = await meApi();
    setUser(profile);
    setResult(completion);
    setSubmitting(false);
    confetti({ particleCount: 120, spread: 90, origin: { y: 0.6 } });
  };

  const stepForward = async (
    nextAnswers: string[],
    nextSpeechScores: Array<number | null>
  ) => {
    const isLastQuestion = !lesson || index >= lesson.questions.length - 1;
    const outOfHearts = hearts <= 0;

    if (isLastQuestion || outOfHearts) {
      await finishLesson(nextAnswers, nextSpeechScores);
      return;
    }

    setIndex((value) => value + 1);
    setCurrentValue("");
    setFeedback(null);
    setPronunciation(null);
    setSpeechStatus("idle");
  };

  const submitAnswer = async () => {
    if (!question || !currentValue.trim()) return;

    const isCorrect = matchesQuestion(question, currentValue);
    const nextAnswers = [...answers, currentValue];
    const nextSpeechScores = [...speechScores, pronunciation?.score ?? null];
    setAnswers(nextAnswers);
    setSpeechScores(nextSpeechScores);

    if (isCorrect) {
      setPreviewXp((value) => value + 10);
      setFeedback({ status: "correct", message: t(language, "niceWork") });
      window.setTimeout(() => {
        void stepForward(nextAnswers, nextSpeechScores);
      }, 750);
      return;
    }

    const nextHearts = Math.max(0, hearts - 1);
    setHearts(nextHearts);
    setFeedback({
      status: "wrong",
      message: t(language, "correctAnswer", { answer: question.correctAnswer })
    });
    window.setTimeout(() => {
      if (nextHearts <= 0) {
        void finishLesson(nextAnswers, nextSpeechScores);
        return;
      }
      void stepForward(nextAnswers, nextSpeechScores);
    }, 1100);
  };

  if (loading) {
    return (
        <div className="rounded-[32px] border border-white/40 bg-[var(--panel)] p-8 text-center shadow-card">
        {t(language, "loadingLesson")}
      </div>
    );
  }

  if (!lesson || !question) {
    return (
        <div className="rounded-[32px] border border-white/40 bg-[var(--panel)] p-8 text-center shadow-card">
        {t(language, "lessonNotFound")}
      </div>
    );
  }

  if (result) {
    return (
      <div className="mx-auto max-w-3xl rounded-[32px] border border-white/40 bg-[var(--panel)] p-6 shadow-card">
        <p className="text-sm font-black uppercase tracking-[0.28em] text-success/70">Lesson complete</p>
        <h2 className="mt-3 text-3xl font-extrabold">{t(language, "greatJob", { title: lesson.title })}</h2>
        <p className="mt-2" data-text="muted">
          {t(language, "lessonSummary", {
            xp: result.xpEarned,
            correct: result.correctAnswers,
            total: result.totalQuestions
          })}
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-3xl bg-success/10 p-4">
            <div className="text-sm font-bold text-success">{t(language, "xpGained")}</div>
            <div className="mt-1 text-3xl font-black text-success">+{result.xpEarned}</div>
          </div>
          <div className="rounded-3xl bg-brand/10 p-4">
            <div className="text-sm font-bold text-brand">{t(language, "score")}</div>
            <div className="mt-1 text-3xl font-black text-brand">
              {result.correctAnswers}/{result.totalQuestions}
            </div>
          </div>
          <div className="rounded-3xl bg-orange-100 p-4 dark:bg-orange-500/10">
            <div className="text-sm font-bold text-orange-600 dark:text-orange-300">{t(language, "heartsLeft")}</div>
            <div className="mt-1 text-3xl font-black text-orange-600 dark:text-orange-300">
              {result.heartsRemaining}
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-[28px] border p-4" data-surface="soft">
          <h3 className="text-lg font-extrabold">{t(language, "answerReview")}</h3>
          <div className="mt-4 space-y-3">
            {result.review.slice(0, 5).map((item) => (
              <div
                key={item.questionId}
                className="rounded-3xl border px-4 py-3"
                data-surface="base"
              >
                <div className="font-bold">{item.questionText}</div>
                <div className="mt-1 text-sm" data-text="muted">
                  {t(language, "yourAnswer", {
                    answer: item.userAnswer || t(language, "noAnswer")
                  })}
                </div>
                {!item.isCorrect ? (
                  <div className="mt-1 text-sm font-bold text-danger">
                    {t(language, "correctAnswer", { answer: item.correctAnswer })}
                  </div>
                ) : (
                  <div className="mt-1 text-sm font-bold text-success">{t(language, "correct")}</div>
                )}
                {typeof item.speechScore === "number" ? (
                  <div className="mt-1 text-sm font-bold text-brand">
                    {t(language, "speechScoreReview", { score: item.speechScore })}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="rounded-2xl bg-brand px-4 py-3 text-sm font-extrabold text-white"
          >
            {t(language, "backToDashboard")}
          </button>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="rounded-2xl border px-4 py-3 text-sm font-extrabold"
            data-surface="soft"
          >
            {t(language, "playAgain")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <section
        className={`rounded-[32px] border border-white/40 bg-[var(--panel)] p-5 shadow-card transition ${
          feedback?.status === "correct"
            ? "animate-flash-right"
            : feedback?.status === "wrong"
              ? "animate-flash-wrong"
              : ""
        }`}
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.28em] text-brand/70">
              {lesson.level} • {getQuestionTypeLabel(question.type, language)}
            </p>
            <h2 className="mt-2 text-3xl font-extrabold">{lesson.title}</h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-success/10 px-4 py-2 text-sm font-extrabold text-success">
              {previewXp} XP
            </div>
            <div className="rounded-full bg-rose-100 px-4 py-2 text-sm font-extrabold text-rose-500 dark:bg-rose-500/10 dark:text-rose-200">
              {"heart ".repeat(hearts).trim() || "0 hearts"}
            </div>
          </div>
        </div>

        <div className="mt-5">
          <ProgressBar
            value={progress}
            label={t(language, "questionProgress", {
              current: index + 1,
              total: lesson.questions.length
            })}
          />
        </div>
      </section>

      <section className="rounded-[32px] border border-white/40 bg-[var(--panel)] p-6 shadow-card">
        <p className="text-sm font-black uppercase tracking-[0.25em]" data-text="muted">
          {answerPrompt}
        </p>
        <h3 className="mt-3 text-2xl font-extrabold">{question.questionText}</h3>

        {question.type === "listening" ? (
          <button
            type="button"
            onClick={() => playAudio(question.audioText)}
            className="mt-4 rounded-2xl bg-brand px-4 py-3 text-sm font-extrabold text-white"
          >
            {t(language, "playAudio")}
          </button>
        ) : null}

        {question.type === "translation" ? (
          <div className="mt-6">
            <input
              type="text"
              value={currentValue}
              onChange={(event) => setCurrentValue(event.target.value)}
              placeholder={t(language, "typeSentence")}
              className="w-full rounded-2xl border bg-white px-4 py-4 text-lg text-slate-900 outline-none transition focus:border-brand dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            />
            {displayOptions.length ? (
              <div className="mt-3 rounded-2xl border px-4 py-3 text-sm" data-surface="soft">
                {t(language, "hintBank")}: {displayOptions.join(" • ")}
              </div>
              ) : null}

            <div className="mt-4 rounded-[28px] border p-4" data-surface="soft">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="text-sm font-black uppercase tracking-[0.22em] text-brand/70">
                    {t(language, "speechCoach")}
                  </div>
                  <p className="mt-2 text-sm" data-text="muted">
                    {speechRecognitionSupported
                      ? t(language, "speechCoachHint")
                      : t(language, "speechNotSupported")}
                  </p>
                  <p className="mt-2 text-xs" data-text="muted">
                    {t(language, "stressLimitNote")}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={startSpeechRecognition}
                    disabled={!speechRecognitionSupported || speechStatus === "listening"}
                    className="rounded-2xl bg-brand px-4 py-3 text-sm font-extrabold text-white disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {speechStatus === "listening"
                      ? t(language, "listeningNow")
                      : t(language, "startSpeaking")}
                  </button>
                  <button
                    type="button"
                    onClick={() => playAudio(question.correctAnswer)}
                    className="rounded-2xl border px-4 py-3 text-sm font-extrabold"
                    data-surface="base"
                  >
                    {t(language, "modelAnswer")}
                  </button>
                </div>
              </div>

              {speechStatus === "error" ? (
                <div className="mt-3 rounded-2xl bg-danger/10 px-4 py-3 text-sm font-bold text-danger">
                  {t(language, "speechError")}
                </div>
              ) : null}

              {pronunciation ? (
                <div className="mt-4 space-y-3">
                  <div className="rounded-2xl border px-4 py-3" data-surface="base">
                    <div className="text-sm font-bold" data-text="muted">
                      {t(language, "heardYou")}
                    </div>
                    <div className="mt-1 text-base font-extrabold">{pronunciation.transcript}</div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-[140px,1fr]">
                    <div className="rounded-2xl bg-success/10 px-4 py-3">
                      <div className="text-xs font-black uppercase tracking-[0.2em] text-success/70">
                        {t(language, "pronunciationScore")}
                      </div>
                      <div className="mt-1 text-3xl font-black text-success">
                        {pronunciation.score}%
                      </div>
                    </div>
                    <div className="rounded-2xl border px-4 py-3" data-surface="base">
                      <div className="text-sm font-bold">{pronunciation.message}</div>
                      <div className="mt-2 text-sm" data-text="muted">
                        {pronunciation.intonationHint}
                      </div>
                      {pronunciation.missingWords.length ? (
                        <div className="mt-2 text-sm font-bold text-danger">
                          {t(language, "missingWords", {
                            words: pronunciation.missingWords.join(", ")
                          })}
                        </div>
                      ) : null}
                      {pronunciation.extraWords.length ? (
                        <div className="mt-2 text-sm font-bold text-orange-500">
                          {t(language, "extraWords", {
                            words: pronunciation.extraWords.join(", ")
                          })}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        ) : question.type === "speaking" ? (
          <div className="mt-6 space-y-4">
            <div className="rounded-2xl border px-4 py-4 text-sm" data-surface="soft">
              {t(language, "speakingPrompt")}
            </div>

            <div className="rounded-[28px] border p-4" data-surface="soft">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="text-sm font-black uppercase tracking-[0.22em] text-brand/70">
                    {t(language, "speechCoach")}
                  </div>
                  <p className="mt-2 text-sm" data-text="muted">
                    {speechRecognitionSupported
                      ? t(language, "speechCoachHint")
                      : t(language, "speechNotSupported")}
                  </p>
                  <p className="mt-2 text-xs" data-text="muted">
                    {t(language, "stressLimitNote")}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={startSpeechRecognition}
                    disabled={!speechRecognitionSupported || speechStatus === "listening"}
                    className="rounded-2xl bg-brand px-4 py-3 text-sm font-extrabold text-white disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {speechStatus === "listening"
                      ? t(language, "listeningNow")
                      : t(language, "startSpeaking")}
                  </button>
                  <button
                    type="button"
                    onClick={() => playAudio(question.correctAnswer)}
                    className="rounded-2xl border px-4 py-3 text-sm font-extrabold"
                    data-surface="base"
                  >
                    {t(language, "modelAnswer")}
                  </button>
                </div>
              </div>

              {speechStatus === "error" ? (
                <div className="mt-3 rounded-2xl bg-danger/10 px-4 py-3 text-sm font-bold text-danger">
                  {t(language, "speechError")}
                </div>
              ) : null}

              {pronunciation ? (
                <div className="mt-4 space-y-3">
                  <div className="rounded-2xl border px-4 py-3" data-surface="base">
                    <div className="text-sm font-bold" data-text="muted">
                      {t(language, "heardYou")}
                    </div>
                    <div className="mt-1 text-base font-extrabold">{pronunciation.transcript}</div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-[140px,1fr]">
                    <div className="rounded-2xl bg-success/10 px-4 py-3">
                      <div className="text-xs font-black uppercase tracking-[0.2em] text-success/70">
                        {t(language, "pronunciationScore")}
                      </div>
                      <div className="mt-1 text-3xl font-black text-success">
                        {pronunciation.score}%
                      </div>
                    </div>
                    <div className="rounded-2xl border px-4 py-3" data-surface="base">
                      <div className="text-sm font-bold">{pronunciation.message}</div>
                      <div className="mt-2 text-sm" data-text="muted">
                        {pronunciation.intonationHint}
                      </div>
                      {pronunciation.missingWords.length ? (
                        <div className="mt-2 text-sm font-bold text-danger">
                          {t(language, "missingWords", {
                            words: pronunciation.missingWords.join(", ")
                          })}
                        </div>
                      ) : null}
                      {pronunciation.extraWords.length ? (
                        <div className="mt-2 text-sm font-bold text-orange-500">
                          {t(language, "extraWords", {
                            words: pronunciation.extraWords.join(", ")
                          })}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        ) : (
          <div className="mt-6 grid gap-3">
            {displayOptions.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setCurrentValue(option)}
                data-answer-option={currentValue === option ? "selected" : "idle"}
                className={`rounded-2xl border px-4 py-4 text-left text-base font-bold transition ${
                  currentValue === option
                    ? "border-brand bg-brand text-white"
                    : "border-slate-300 bg-white text-slate-900 hover:border-brand/40 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        )}

        {feedback ? (
          <div
            className={`mt-4 rounded-2xl px-4 py-3 text-sm font-bold ${
              feedback.status === "correct"
                ? "bg-success/10 text-success"
                : "bg-danger/10 text-danger"
            }`}
          >
            {feedback.message}
          </div>
        ) : null}

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={submitAnswer}
            disabled={!currentValue.trim() || submitting}
            className="rounded-2xl bg-success px-5 py-3 text-sm font-extrabold text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? t(language, "saving") : t(language, "checkAnswer")}
          </button>
          {isChoiceQuestion ? (
            <button
              type="button"
              onClick={() => playAudio(question.audioText)}
              disabled={question.type !== "listening"}
              className="rounded-2xl border px-5 py-3 text-sm font-extrabold disabled:opacity-50"
              data-surface="soft"
            >
              {t(language, "replayAudio")}
            </button>
          ) : null}
        </div>
      </section>
    </div>
  );
}
