import type { NextFunction, Request, Response } from "express";
import { verifyToken } from "../lib/auth.js";

export type AuthenticatedRequest = Request & {
  user?: {
    userId: string;
    email: string;
  };
};

export const requireAuth = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers.authorization;

  if (!header?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const token = header.replace("Bearer ", "");
    req.user = verifyToken(token);
    return next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
};
