import { PrismaClient } from "@prisma/client";
import { buildLessonCatalog } from "./seed.js";

const prisma = new PrismaClient();

async function upsertLesson(lesson: ReturnType<typeof buildLessonCatalog>[number]) {
  const existing = await prisma.lesson.findFirst({
    where: { title: lesson.title }
  });

  if (existing) {
    await prisma.question.deleteMany({ where: { lessonId: existing.id } });
    await prisma.lesson.update({
      where: { id: existing.id },
      data: {
        description: lesson.description,
        level: lesson.level,
        type: lesson.type,
        xpReward: lesson.xpReward,
        questions: {
          create: lesson.questions.map((question) => ({
            type: question.type,
            questionText: question.questionText,
            correctAnswer: question.correctAnswer,
            options: question.options,
            audioText: question.audioText
          }))
        }
      }
    });
    return;
  }

  await prisma.lesson.create({
    data: {
      title: lesson.title,
      description: lesson.description,
      level: lesson.level,
      type: lesson.type,
      xpReward: lesson.xpReward,
      questions: {
        create: lesson.questions.map((question) => ({
          type: question.type,
          questionText: question.questionText,
          correctAnswer: question.correctAnswer,
          options: question.options,
          audioText: question.audioText
        }))
      }
    }
  });
}

async function main() {
  const lessons = buildLessonCatalog();
  const targetTitles = new Set(lessons.map((lesson) => lesson.title));

  const existingLessons = await prisma.lesson.findMany({
    select: { id: true, title: true, createdAt: true },
    orderBy: [{ title: "asc" }, { createdAt: "asc" }]
  });

  const duplicateLessonIds: string[] = [];
  const seenTitles = new Set<string>();

  for (const lesson of existingLessons) {
    if (seenTitles.has(lesson.title)) {
      duplicateLessonIds.push(lesson.id);
      continue;
    }

    seenTitles.add(lesson.title);
  }

  if (duplicateLessonIds.length) {
    await prisma.userProgress.deleteMany({
      where: { lessonId: { in: duplicateLessonIds } }
    });
    await prisma.lesson.deleteMany({
      where: { id: { in: duplicateLessonIds } }
    });
  }

  const staleLessonIds = existingLessons
    .filter((lesson) => !targetTitles.has(lesson.title) && !duplicateLessonIds.includes(lesson.id))
    .map((lesson) => lesson.id);

  if (staleLessonIds.length) {
    await prisma.userProgress.deleteMany({
      where: { lessonId: { in: staleLessonIds } }
    });
    await prisma.lesson.deleteMany({
      where: { id: { in: staleLessonIds } }
    });
  }

  for (const lesson of lessons) {
    await upsertLesson(lesson);
  }

  const matrix = await prisma.lesson.groupBy({
    by: ["level", "type"],
    _count: { _all: true },
    orderBy: [{ level: "asc" }, { type: "asc" }]
  });

  console.log(JSON.stringify(matrix, null, 2));
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
