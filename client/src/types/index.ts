export type Level = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
export type QuestionType = "vocabulary" | "translation" | "listening" | "fillblank" | "speaking";

export type UserProfile = {
  id: string;
  email: string;
  username: string;
  xp: number;
  level: Level;
  streak: number;
  nextLevelXp: number;
  recentActivity: Array<{
    id: string;
    lessonTitle: string;
    xpEarned: number;
    completedAt: string | null;
  }>;
};

export type AuthPayload = {
  token: string;
  user: {
    id: string;
    email: string;
    username: string;
    xp: number;
    level: Level;
    streak: number;
  };
};

export type LessonSummary = {
  id: string;
  title: string;
  description: string;
  level: Level;
  type: QuestionType;
  xpReward: number;
  questionCount: number;
  completed: boolean;
  xpEarned: number;
  isLocked: boolean;
};

export type Question = {
  id: string;
  type: QuestionType;
  questionText: string;
  correctAnswer: string;
  options: string[];
  audioText?: string | null;
};

export type LessonDetail = {
  id: string;
  title: string;
  description: string;
  level: Level;
  type: QuestionType;
  xpReward: number;
  questions: Question[];
};

export type LessonResult = {
  lessonId: string;
  xpEarned: number;
  correctAnswers: number;
  totalQuestions: number;
  heartsRemaining: number;
  level: Level;
  review: Array<{
    questionId: string;
    questionText: string;
    userAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
    speechScore?: number | null;
  }>;
};

export type LeaderboardEntry = {
  id: string;
  username: string;
  xp: number;
  level: Level;
  streak: number;
};
