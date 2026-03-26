import { Router } from "express";
import { prisma } from "../lib/prisma.js";

const router = Router();

router.get("/", async (_req, res) => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      xp: true,
      level: true,
      streak: true
    },
    orderBy: [{ xp: "desc" }, { createdAt: "asc" }],
    take: 10
  });

  return res.json(users);
});

export default router;
