import { Router } from "express";
import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma.js";
import { signToken } from "../lib/auth.js";
import { calculateStreak } from "../lib/progress.js";

const router = Router();

router.post("/register", async (req, res) => {
  const { email, password, username } = req.body as {
    email?: string;
    password?: string;
    username?: string;
  };

  if (!email || !password || !username) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return res.status(409).json({ message: "Email already in use" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const now = new Date();

  const user = await prisma.user.create({
    data: {
      email,
      username,
      password: hashedPassword,
      lastLogin: now,
      streak: 1
    }
  });

  const token = signToken({ userId: user.id, email: user.email });

  return res.status(201).json({
    token,
    user: {
      id: user.id,
      email: user.email,
      username: user.username,
      xp: user.xp,
      level: user.level,
      streak: user.streak
    }
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body as {
    email?: string;
    password?: string;
  };

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const now = new Date();
  const streak = calculateStreak(user.lastLogin, now, user.streak);

  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: {
      lastLogin: now,
      streak
    }
  });

  const token = signToken({ userId: user.id, email: user.email });

  return res.json({
    token,
    user: {
      id: updatedUser.id,
      email: updatedUser.email,
      username: updatedUser.username,
      xp: updatedUser.xp,
      level: updatedUser.level,
      streak: updatedUser.streak
    }
  });
});

export default router;
