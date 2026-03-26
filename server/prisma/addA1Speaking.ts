import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const lessons = [
  {
    title: "A1 Speaking Start",
    description: "Say simple everyday phrases and hear how close your pronunciation is.",
    level: "A1",
    type: "speaking",
    xpReward: 110,
    questions: [
      ["Say in English: \"Привет\"", "Hello", ["Hello", "Goodbye", "Thank you"]],
      ["Say in English: \"Доброе утро\"", "Good morning", ["Good morning", "Good evening", "Good night"]],
      ["Say in English: \"Как дела?\"", "How are you?", ["How are you?", "Where are you?", "Who are you?"]],
      ["Say in English: \"Я в порядке\"", "I am fine", ["I am fine", "I am late", "I am hungry"]],
      ["Say in English: \"Спасибо\"", "Thank you", ["Thank you", "Excuse me", "Please"]],
      ["Say in English: \"Пожалуйста\"", "Please", ["Please", "Sorry", "Maybe"]],
      ["Say in English: \"До свидания\"", "Goodbye", ["Goodbye", "Good morning", "See"]],
      ["Say in English: \"Меня зовут Анна\"", "My name is Anna", ["My name is Anna", "I am from Anna", "This is Anna"]],
      ["Say in English: \"Рад познакомиться\"", "Nice to meet you", ["Nice to meet you", "Good to see you", "Happy to know you"]],
      ["Say in English: \"Увидимся завтра\"", "See you tomorrow", ["See you tomorrow", "See you today", "Meet you later"]]
    ]
  },
  {
    title: "A1 Speaking Around Me",
    description: "Practice short spoken sentences about daily life, time and family.",
    level: "A1",
    type: "speaking",
    xpReward: 110,
    questions: [
      ["Say in English: \"Это моя мама\"", "This is my mother", ["This is my mother", "This is my teacher", "This is my sister"]],
      ["Say in English: \"У меня есть брат\"", "I have a brother", ["I have a brother", "I am a brother", "He has a brother"]],
      ["Say in English: \"Сегодня понедельник\"", "Today is Monday", ["Today is Monday", "Tomorrow is Monday", "It is Sunday"]],
      ["Say in English: \"Сейчас три часа\"", "It is three o'clock", ["It is three o'clock", "It is three days", "I am three"]],
      ["Say in English: \"Я иду домой\"", "I go home", ["I go home", "I stay home", "I see home"]],
      ["Say in English: \"Мы любим пиццу\"", "We like pizza", ["We like pizza", "We make pizza", "We need pizza"]],
      ["Say in English: \"Он пьёт воду\"", "He drinks water", ["He drinks water", "He drinks coffee", "He needs water"]],
      ["Say in English: \"Небо синее\"", "The sky is blue", ["The sky is blue", "The sky is green", "The sea is blue"]],
      ["Say in English: \"Трава зелёная\"", "The grass is green", ["The grass is green", "The tree is green", "The grass is small"]],
      ["Say in English: \"Я читаю книгу\"", "I read a book", ["I read a book", "I buy a book", "I write a book"]]
    ]
  },
  {
    title: "A1 Speaking Daily Phrases",
    description: "Use short survival phrases with voice practice and instant feedback.",
    level: "A1",
    type: "speaking",
    xpReward: 110,
    questions: [
      ["Say in English: \"Мне нужна помощь\"", "I need help", ["I need help", "I need water", "I need time"]],
      ["Say in English: \"Где туалет?\"", "Where is the bathroom?", ["Where is the bathroom?", "Where is the station?", "Where is the bank?"]],
      ["Say in English: \"Я не понимаю\"", "I do not understand", ["I do not understand", "I do not remember", "I do not agree"]],
      ["Say in English: \"Повторите, пожалуйста\"", "Please repeat", ["Please repeat", "Please sit down", "Please be quiet"]],
      ["Say in English: \"Сколько это стоит?\"", "How much is it?", ["How much is it?", "How old is it?", "How big is it?"]],
      ["Say in English: \"Я хочу воды\"", "I want water", ["I want water", "I need coffee", "I drink tea"]],
      ["Say in English: \"Можно меню?\"", "Can I have the menu?", ["Can I have the menu?", "Can I open the window?", "Can I take the train?"]],
      ["Say in English: \"Где автобусная остановка?\"", "Where is the bus stop?", ["Where is the bus stop?", "Where is the bus?", "Where is the taxi?"]],
      ["Say in English: \"Мне нужен билет\"", "I need a ticket", ["I need a ticket", "I buy a ticket", "I have a ticket"]],
      ["Say in English: \"Извините\"", "Excuse me", ["Excuse me", "Thank you", "See you"]]
    ]
  }
] as const;

async function main() {
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
            create: lesson.questions.map(([questionText, correctAnswer, options]) => ({
              type: "speaking",
              questionText,
              correctAnswer,
              options
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
            create: lesson.questions.map(([questionText, correctAnswer, options]) => ({
              type: "speaking",
              questionText,
              correctAnswer,
              options
            }))
          }
        }
      });
    }
  }

  const speakingA1 = await prisma.lesson.findMany({
    where: { level: "A1", type: "speaking" },
    include: { questions: true },
    orderBy: { title: "asc" }
  });

  console.log(
    JSON.stringify(
      speakingA1.map((lesson) => ({
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
