import { PrismaClient } from "@prisma/client";
import { buildIntermediateSpeakingLessons } from "./intermediateSpeakingLessons.js";

const prisma = new PrismaClient();

async function main() {
  const lessons = buildIntermediateSpeakingLessons().filter(
    (lesson) => lesson.level === "A2" && lesson.type === "speaking"
  );

  for (const lesson of lessons) {
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
    } else {
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
  }

  const speakingA2 = await prisma.lesson.findMany({
    where: { level: "A2", type: "speaking" },
    include: { questions: true },
    orderBy: { title: "asc" }
  });

  console.log(
    JSON.stringify(
      speakingA2.map((lesson) => ({
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
