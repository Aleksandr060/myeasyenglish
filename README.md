# My Easy English

Full-stack web app for learning English in a game-like flow with lessons, XP, streaks, hearts, levels and a leaderboard.

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
- 15 seeded lessons with Russian and English content
- 4 exercise types: vocabulary, translation, listening and fill-in-the-blank
- XP, streak, hearts, lesson progress and CEFR-style levels (`A1 -> A2 -> B1 -> B2`)
- Dark/light theme toggle
- Lesson completion confetti with `canvas-confetti`
- Top-10 leaderboard by XP

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
cd server
npx prisma migrate dev --name init
cd ..
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

## Notes

- Lesson completion awards up to `100 XP` per lesson, based on correct answers.
- Translation exercises use fuzzy matching on both client and server.
- Seed data was structured so `options` are always stored as JSON arrays, which is the field most likely to break in Prisma seed scripts.
