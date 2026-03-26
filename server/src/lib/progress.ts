import { Level, type Question } from "@prisma/client";

const levelThresholds: Record<Level, number> = {
  A1: 0,
  A2: 300,
  B1: 800,
  B2: 1400,
  C1: 2200,
  C2: 3200
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

const fuzzyMatches = (expected: string, received: string) => {
  const left = normalizeText(expected);
  const right = normalizeText(received);

  if (!left || !right) return false;
  if (left === right) return true;

  const distance = levenshtein(left, right);
  const maxLength = Math.max(left.length, right.length);

  return 1 - distance / maxLength >= 0.8;
};

export const normalizeAnswerText = (value: string) => normalizeText(value);

export const strictSpeakingMatches = (expected: string, received: string) => {
  const left = normalizeText(expected);
  const right = normalizeText(received);

  if (!left || !right) return false;
  if (left === right) return true;

  const distance = levenshtein(left, right);
  const maxLength = Math.max(left.length, right.length);

  return 1 - distance / maxLength >= 0.93;
};

export const evaluateAnswer = (question: Question, answer: string) => {
  if ((question.type as string) === "translation") {
    return fuzzyMatches(question.correctAnswer, answer);
  }

  if ((question.type as string) === "speaking") {
    return strictSpeakingMatches(question.correctAnswer, answer);
  }

  return normalizeText(question.correctAnswer) === normalizeText(answer);
};

export const getLevelFromXp = (xp: number): Level => {
  if (xp >= levelThresholds.C2) return "C2";
  if (xp >= levelThresholds.C1) return "C1";
  if (xp >= levelThresholds.B2) return "B2";
  if (xp >= levelThresholds.B1) return "B1";
  if (xp >= levelThresholds.A2) return "A2";
  return "A1";
};

export const getNextLevelTarget = (level: Level) => {
  if (level === "A1") return levelThresholds.A2;
  if (level === "A2") return levelThresholds.B1;
  if (level === "B1") return levelThresholds.B2;
  if (level === "B2") return levelThresholds.C1;
  if (level === "C1") return levelThresholds.C2;
  return levelThresholds.C2;
};

export const calculateStreak = (
  previousLogin: Date | null,
  now: Date,
  currentStreak: number
) => {
  if (!previousLogin) return 1;

  const prev = new Date(previousLogin);
  prev.setHours(0, 0, 0, 0);

  const today = new Date(now);
  today.setHours(0, 0, 0, 0);

  const diffInDays = Math.round(
    (today.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffInDays <= 0) return currentStreak || 1;
  if (diffInDays === 1) return currentStreak + 1;
  return 1;
};
