import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import lessonsRoutes from "./routes/lessons.js";
import leaderboardRoutes from "./routes/leaderboard.js";

dotenv.config({ path: fileURLToPath(new URL("../../.env", import.meta.url)) });

const app = express();
const PORT = Number(process.env.PORT || 4000);
const allowedOrigins = [
  ...(process.env.CLIENT_URL ? process.env.CLIENT_URL.split(",").map((item) => item.trim()) : []),
  "http://127.0.0.1:5173",
  "http://localhost:5173"
].filter(Boolean);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientDistPath = path.resolve(__dirname, "../../client/dist");
const hasClientBuild = fs.existsSync(clientDistPath);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error("Not allowed by CORS"));
    }
  })
);
app.use(express.json());
app.use(morgan("dev"));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/lessons", lessonsRoutes);
app.use("/api/leaderboard", leaderboardRoutes);

if (hasClientBuild) {
  app.use(express.static(clientDistPath));

  app.get("*", (req, res, next) => {
    if (req.path.startsWith("/api")) {
      next();
      return;
    }

    res.sendFile(path.join(clientDistPath, "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
