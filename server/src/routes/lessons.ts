import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import { requireAuth, type AuthenticatedRequest } from "../middleware/auth.js";
import {
  calculateStreak,
  evaluateAnswer,
  getLevelFromXp,
  strictSpeakingMatches
} from "../lib/progress.js";

const router = Router();

router.get("/", requireAuth, async (req: AuthenticatedRequest, res) => {
  const [lessons, progress] = await Promise.all([
    prisma.lesson.findMany({
      include: {
        questions: true
      },
      orderBy: [{ level: "asc" }, { createdAt: "asc" }]
    }),
    prisma.userProgress.findMany({
      where: { userId: req.user!.userId }
    })
  ]);

  const progressMap = new Map(progress.map((item) => [item.lessonId, item]));

  return res.json(
    lessons.map((lesson) => {
      const lessonProgress = progressMap.get(lesson.id);
      return {
        id: lesson.id,
        title: lesson.title,
        description: lesson.description,
        level: lesson.level,
        type: lesson.type,
        xpReward: lesson.xpReward,
        questionCount: lesson.questions.length,
        completed: lessonProgress?.completed ?? false,
        xpEarned: lessonProgress?.xpEarned ?? 0,
        isLocked: false
      };
    })
  );
});

router.get("/:id", requireAuth, async (req, res) => {
  const lesson = await prisma.lesson.findUnique({
    where: { id: req.params.id },
    include: {
      questions: true
    }
  });

  if (!lesson) {
    return res.status(404).json({ message: "Lesson not found" });
  }

  return res.json(lesson);
});

router.post("/:id/complete", requireAuth, async (req: AuthenticatedRequest, res) => {
  const { answers, speechScores } = req.body as {
    answers?: string[];
    speechScores?: Array<number | null>;
  };

  if (!answers || !Array.isArray(answers)) {
    return res.status(400).json({ message: "Answers are required" });
  }

  const lesson = await prisma.lesson.findUnique({
    where: { id: req.params.id },
    include: {
      questions: {
        orderBy: {
          createdAt: "asc"
        }
      }
    }
  });

  if (!lesson) {
    return res.status(404).json({ message: "Lesson not found" });
  }

  let correctAnswers = 0;
  const review = lesson.questions.map((question, index) => {
    const answer = answers[index] ?? "";
    const speechScore =
      Array.isArray(speechScores) && typeof speechScores[index] === "number"
        ? speechScores[index]
        : null;
    const isSpeakingQuestion = (question.type as string) === "speaking";
    const isCorrect = isSpeakingQuestion
      ? strictSpeakingMatches(question.correctAnswer, answer) && (speechScore ?? 0) >= 90
      : evaluateAnswer(question, answer);

    if (isCorrect) correctAnswers += 1;

    return {
      questionId: question.id,
      questionText: question.questionText,
      userAnswer: answer,
      correctAnswer: question.correctAnswer,
      isCorrect,
      speechScore
    };
  });

  const xpEarned = Math.min(correctAnswers * 10, lesson.xpReward);

  const user = await prisma.user.findUnique({
    where: { id: req.user!.userId }
  });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const now = new Date();
  const streak = calculateStreak(user.lastLogin, now, user.streak);
  const totalXp = user.xp + xpEarned;
  const level = getLevelFromXp(totalXp);

  await prisma.$transaction([
    prisma.userProgress.upsert({
      where: {
        userId_lessonId: {
          userId: user.id,
          lessonId: lesson.id
        }
      },
      update: {
        completed: true,
        xpEarned,
        completedAt: now
      },
      create: {
        userId: user.id,
        lessonId: lesson.id,
        completed: true,
        xpEarned,
        completedAt: now
      }
    }),
    prisma.user.update({
      where: { id: user.id },
      data: {
        xp: totalXp,
        level,
        streak,
        lastLogin: now
      }
    })
  ]);

  return res.json({
    lessonId: lesson.id,
    xpEarned,
    correctAnswers,
    totalQuestions: lesson.questions.length,
    heartsRemaining: Math.max(0, 3 - (lesson.questions.length - correctAnswers)),
    level,
    review
  });
});

export default router;
