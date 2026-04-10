import { PrismaClient } from "@prisma/client";
import { buildAdvancedLessons } from "./advancedLessons.js";
import { buildIntermediateSpeakingLessons } from "./intermediateSpeakingLessons.js";

const prisma = new PrismaClient();

async function upsertLesson(lesson: ReturnType<typeof buildAdvancedLessons>[number]) {
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
  const upperSpeakingLessons = [
    ...buildIntermediateSpeakingLessons().filter(
      (lesson) => lesson.type === "speaking" && lesson.level === "B2"
    ),
    ...buildAdvancedLessons().filter(
      (lesson) =>
        lesson.type === "speaking" &&
        (lesson.level === "C1" || lesson.level === "C2")
    )
  ];

  for (const lesson of upperSpeakingLessons) {
    await upsertLesson(lesson);
  }

  const summary = await prisma.lesson.findMany({
    where: {
      type: "speaking",
      level: { in: ["B2", "C1", "C2"] }
    },
    include: { questions: true },
    orderBy: [{ level: "asc" }, { title: "asc" }]
  });

  console.log(
    JSON.stringify(
      summary.map((lesson) => ({
        level: lesson.level,
        title: lesson.title,
        questions: lesson.questions.length
      })),
      null,
      2
    )
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
