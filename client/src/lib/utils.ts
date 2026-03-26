import type { Level, Question } from "../types";

export const levelOrder: Level[] = ["A1", "A2", "B1", "B2", "C1", "C2"];

export const shuffle = <T,>(items: T[]) => {
  const copy = [...items];

  for (let index = copy.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[randomIndex]] = [copy[randomIndex], copy[index]];
  }

  return copy;
};

export const getLevelProgress = (level: Level, xp: number, nextLevelXp: number) => {
  const currentLevelFloor =
    level === "A1"
      ? 0
      : level === "A2"
        ? 300
        : level === "B1"
          ? 800
          : level === "B2"
            ? 1400
            : level === "C1"
              ? 2200
              : 3200;
  const span = Math.max(1, nextLevelXp - currentLevelFloor);
  return Math.min(100, Math.round(((xp - currentLevelFloor) / span) * 100));
};

const normalizeText = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s']/gu, "")
    .replace(/\s+/g, " ")
    .trim();

const levenshtein = (a: string, b: string) => {
  const rows = a.length + 1;
  const cols = b.length + 1;
  const matrix = Array.from({ length: rows }, () => Array(cols).fill(0));

  for (let i = 0; i < rows; i += 1) matrix[i][0] = i;
  for (let j = 0; j < cols; j += 1) matrix[0][j] = j;

  for (let i = 1; i < rows; i += 1) {
    for (let j = 1; j < cols; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }

  return matrix[a.length][b.length];
};

export const strictSpeakingMatches = (expected: string, actual: string) => {
  const normalizedExpected = normalizeText(expected);
  const normalizedActual = normalizeText(actual);

  if (!normalizedExpected || !normalizedActual) return false;
  if (normalizedExpected === normalizedActual) return true;

  const distance = levenshtein(normalizedExpected, normalizedActual);
  return 1 - distance / Math.max(normalizedExpected.length, normalizedActual.length) >= 0.93;
};

export const assessPronunciation = (expected: string, actual: string) => {
  const normalizedExpected = normalizeText(expected);
  const normalizedActual = normalizeText(actual);

  if (!normalizedExpected || !normalizedActual) {
    return {
      score: 0,
      missingWords: [] as string[],
      extraWords: [] as string[],
      exactMatch: false
    };
  }

  const expectedWords = normalizedExpected.split(" ");
  const actualWords = normalizedActual.split(" ");
  const actualWordSet = new Set(actualWords);
  const expectedWordSet = new Set(expectedWords);
  const missingWords = expectedWords.filter((word) => !actualWordSet.has(word));
  const extraWords = actualWords.filter((word) => !expectedWordSet.has(word));

  const distance = levenshtein(normalizedExpected, normalizedActual);
  const distanceScore = 1 - distance / Math.max(normalizedExpected.length, normalizedActual.length);
  const wordCoverage = 1 - missingWords.length / Math.max(1, expectedWords.length);
  const score = Math.max(
    0,
    Math.min(100, Math.round((distanceScore * 0.65 + wordCoverage * 0.35) * 100))
  );

  return {
    score,
    missingWords,
    extraWords,
    exactMatch: normalizedExpected === normalizedActual
  };
};

export const matchesQuestion = (question: Question, value: string) => {
  const expected = normalizeText(question.correctAnswer);
  const actual = normalizeText(value);

  if (!expected || !actual) return false;
  if (question.type !== "translation" && question.type !== "speaking") {
    return expected === actual;
  }

  if (question.type === "speaking") {
    return strictSpeakingMatches(question.correctAnswer, value);
  }

  if (expected === actual) return true;

  const distance = levenshtein(expected, actual);
  return 1 - distance / Math.max(expected.length, actual.length) >= 0.8;
};

export const questionTypeLabel: Record<Question["type"], string> = {
  vocabulary: "Vocabulary Quiz",
  translation: "Translation Drill",
  listening: "Listening",
  fillblank: "Fill in the Blank"
};

export const formatDate = (value: string | null) => {
  if (!value) return "Just now";
  return new Date(value).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "short"
  });
};
