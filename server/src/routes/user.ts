import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import { requireAuth, type AuthenticatedRequest } from "../middleware/auth.js";
import { getNextLevelTarget } from "../lib/progress.js";

const router = Router();

router.get("/me", requireAuth, async (req: AuthenticatedRequest, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user!.userId },
    include: {
      progress: {
        where: { completed: true },
        include: {
          lesson: true
        },
        orderBy: {
          completedAt: "desc"
        },
        take: 5
      }
    }
  });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.json({
    id: user.id,
    email: user.email,
    username: user.username,
    xp: user.xp,
    level: user.level,
    streak: user.streak,
    nextLevelXp: getNextLevelTarget(user.level),
    recentActivity: user.progress.map((item) => ({
      id: item.id,
      lessonTitle: item.lesson.title,
      xpEarned: item.xpEarned,
      completedAt: item.completedAt
    }))
  });
});

export default router;
