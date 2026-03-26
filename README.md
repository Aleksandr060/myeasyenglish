# My Easy English

Full-stack English learning app with lessons, XP, streaks, hearts, leaderboard, speaking practice and CEFR-style levels.

## Stack

- React + TypeScript + Vite
- Tailwind CSS
- Zustand
- React Router v6
- Node.js + Express + TypeScript
- Prisma ORM + SQLite
- JWT auth

## Features

- Email/password registration and login with JWT stored in `localStorage`
- Protected routes for the dashboard, lessons and leaderboard
- Seeded lessons with Russian and English content across `A1 -> C2`
- 5 exercise types: vocabulary, translation, listening, fill-in-the-blank and speaking
- XP, streak, hearts, lesson progress and CEFR-style levels (`A1 -> A2 -> B1 -> B2 -> C1 -> C2`)
- Dark/light theme toggle
- Lesson completion confetti with `canvas-confetti`
- Top-10 leaderboard by XP
- Speaking practice with browser speech recognition and score feedback

## Project Structure

```text
my-easy-english/
  client/
  server/
  package.json
  README.md
```

## Environment

Create runtime env files before starting:

```bash
cp .env.example .env
cp server/.env.example server/.env
```

## Run Locally

1. Install dependencies:

```bash
npm install
```

2. Create the SQLite database and Prisma tables:

```bash
npx prisma db push --schema server/prisma/schema.prisma
```

3. Seed lessons and demo data:

```bash
npm run seed
```

4. Start client and server together:

```bash
npm run dev
```

## Default URLs

- Client: `http://localhost:5173`
- Server: `http://localhost:4000`
- API health check: `http://localhost:4000/api/health`

## Demo Account

- Email: `demo@easyenglish.dev`
- Password: `demo1234`

## API

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/user/me`
- `GET /api/lessons`
- `GET /api/lessons/:id`
- `POST /api/lessons/:id/complete`
- `GET /api/leaderboard`

## Production Deployment

This project is now prepared for a single-server cloud deployment:

- the React client is built into `client/dist`
- Express serves the static frontend in production
- API requests can use relative `/api`
- Docker support is included
- Prisma can initialize the SQLite schema with `db push`

### Option 1: Docker

```bash
docker compose up --build -d
```

The app will be available on:

- `http://localhost:4000`

### Option 2: Node server on a VPS/cloud VM

```bash
npm install
npm run build
npx prisma db push --schema server/prisma/schema.prisma
npm run start --workspace server
```

Then open:

- `http://YOUR_SERVER_IP:4000`

## Notes

- SQLite is fine for a single VPS or one-container deployment. For heavier traffic or multi-instance scaling, switch Prisma to PostgreSQL.
- Lesson completion awards XP based on correct answers.
- Translation and speaking exercises use fuzzy matching, with speaking checked more strictly.
- Browser speech recognition depends on the user's browser and is not a full phoneme-level pronunciation engine.
