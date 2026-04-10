import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { PrismaClient, QuestionType, Level } from "@prisma/client";
import { fileURLToPath } from "url";
import path from "path";
import { buildAdvancedLessons } from "./advancedLessons.js";
import { buildEmotionLessons } from "./emotionLessons.js";
import { buildIntermediateSpeakingLessons } from "./intermediateSpeakingLessons.js";
import { buildIntonationLessons, type SeedLesson, type SeedQuestion } from "./intonationLessons.js";
import { normalizeLessonMatrix } from "./normalizeLessonMatrix.js";

dotenv.config({ path: fileURLToPath(new URL("../../.env", import.meta.url)) });

const prisma = new PrismaClient();

const shuffle = <T,>(items: T[]) => {
  const copy = [...items];

  for (let index = copy.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[randomIndex]] = [copy[randomIndex], copy[index]];
  }

  return copy;
};

const vocabulary = (
  english: string,
  correctRu: string,
  wrongOptions: string[]
): SeedQuestion => ({
  type: "vocabulary",
  questionText: `Choose the Russian translation for "${english}"`,
  correctAnswer: correctRu,
  options: shuffle([correctRu, ...wrongOptions].slice(0, 4))
});

const translation = (
  russianText: string,
  englishText: string,
  helperOptions: string[]
): SeedQuestion => ({
  type: "translation",
  questionText: `Translate into English: "${russianText}"`,
  correctAnswer: englishText,
  options: helperOptions
});

const speaking = (
  russianText: string,
  englishText: string,
  helperOptions: string[]
): SeedQuestion => ({
  type: "speaking",
  questionText: `Say in English: "${russianText}"`,
  correctAnswer: englishText,
  options: shuffle(helperOptions)
});

const listening = (
  promptText: string,
  correctWord: string,
  wrongOptions: string[]
): SeedQuestion => ({
  type: "listening",
  questionText: "Listen and choose the correct word",
  correctAnswer: correctWord,
  options: shuffle([correctWord, ...wrongOptions].slice(0, 4)),
  audioText: promptText
});

const fillBlank = (
  sentence: string,
  correctWord: string,
  wrongOptions: string[]
): SeedQuestion => ({
  type: "fillblank",
  questionText: sentence,
  correctAnswer: correctWord,
  options: shuffle([correctWord, ...wrongOptions].slice(0, 3))
});

const baseLessons: SeedLesson[] = [
  {
    title: "Greetings Spark",
    description: "Learn everyday greetings and polite phrases.",
    level: "A1",
    type: "vocabulary",
    xpReward: 100,
    questions: [
      vocabulary("Hello", "Привет", ["Пока", "Спасибо", "Пожалуйста"]),
      vocabulary("Good morning", "Доброе утро", ["Добрый вечер", "Доброй ночи", "До свидания"]),
      vocabulary("Goodbye", "До свидания", ["Здравствуйте", "Добро пожаловать", "Извините"]),
      vocabulary("Please", "Пожалуйста", ["Спасибо", "Прости", "Конечно"]),
      vocabulary("Thank you", "Спасибо", ["Привет", "Да", "Нет"]),
      vocabulary("Sorry", "Извините", ["Пожалуйста", "Хорошо", "Завтра"]),
      translation("Как дела?", "How are you?", ["How are you?", "What is this?", "Where are you?"]),
      translation("Я в порядке.", "I am fine.", ["I am fine.", "I am late.", "I am hungry."]),
      fillBlank("Nice to ___ you!", "meet", ["eat", "see"]),
      listening("Nice to meet you", "meet", ["eat", "sleep", "read"])
    ]
  },
  {
    title: "A1 Speaking Start",
    description: "Say simple everyday phrases and hear how close your pronunciation is.",
    level: "A1",
    type: "speaking",
    xpReward: 110,
    questions: [
      speaking("Привет", "Hello", ["Hello", "Goodbye", "Thank you"]),
      speaking("Доброе утро", "Good morning", ["Good morning", "Good evening", "Good night"]),
      speaking("Как дела?", "How are you?", ["How are you?", "Where are you?", "Who are you?"]),
      speaking("Я в порядке", "I am fine", ["I am fine", "I am late", "I am hungry"]),
      speaking("Спасибо", "Thank you", ["Thank you", "Excuse me", "Please"]),
      speaking("Пожалуйста", "Please", ["Please", "Sorry", "Maybe"]),
      speaking("До свидания", "Goodbye", ["Goodbye", "Good morning", "See"]),
      speaking("Меня зовут Анна", "My name is Anna", ["My name is Anna", "I am from Anna", "This is Anna"]),
      speaking("Рад познакомиться", "Nice to meet you", ["Nice to meet you", "Good to see you", "Happy to know you"]),
      speaking("Увидимся завтра", "See you tomorrow", ["See you tomorrow", "See you today", "Meet you later"])
    ]
  },
  {
    title: "Number Jump",
    description: "Count confidently from one to ten.",
    level: "A1",
    type: "vocabulary",
    xpReward: 100,
    questions: [
      vocabulary("One", "Один", ["Два", "Три", "Пять"]),
      vocabulary("Two", "Два", ["Один", "Десять", "Семь"]),
      vocabulary("Three", "Три", ["Четыре", "Пять", "Один"]),
      vocabulary("Five", "Пять", ["Шесть", "Девять", "Два"]),
      vocabulary("Ten", "Десять", ["Восемь", "Один", "Четыре"]),
      translation("У меня есть три яблока.", "I have three apples.", ["I have three apples.", "I see two apples.", "I like red apples."]),
      fillBlank("She has ___ books.", "seven", ["green", "small"]),
      listening("eight", "eight", ["eighty", "eighteen", "ate"]),
      fillBlank("There are ___ days in a week.", "seven", ["six", "ten"]),
      translation("Это номер девять.", "It is number nine.", ["It is number nine.", "It is a table.", "It is very nice."])
    ]
  },
  {
    title: "Color Splash",
    description: "Build your color vocabulary with quick choices.",
    level: "A1",
    type: "listening",
    xpReward: 100,
    questions: [
      vocabulary("Red", "Красный", ["Синий", "Зелёный", "Белый"]),
      vocabulary("Blue", "Синий", ["Чёрный", "Жёлтый", "Розовый"]),
      vocabulary("Green", "Зелёный", ["Фиолетовый", "Серый", "Красный"]),
      vocabulary("Yellow", "Жёлтый", ["Оранжевый", "Синий", "Коричневый"]),
      listening("black", "black", ["blue", "blank", "block"]),
      listening("white", "white", ["wide", "wait", "winter"]),
      fillBlank("The sky is ___.", "blue", ["green", "orange"]),
      fillBlank("Bananas are usually ___.", "yellow", ["purple", "brown"]),
      translation("Моя машина красная.", "My car is red.", ["My car is red.", "My cat is sad.", "My bag is new."]),
      translation("Трава зелёная.", "The grass is green.", ["The grass is green.", "The glass is clean.", "The tree is tall."])
    ]
  },
  {
    title: "Family Circle",
    description: "Talk about family members and relationships.",
    level: "A1",
    type: "vocabulary",
    xpReward: 100,
    questions: [
      vocabulary("Mother", "Мама", ["Папа", "Брат", "Сестра"]),
      vocabulary("Father", "Папа", ["Дедушка", "Тётя", "Мама"]),
      vocabulary("Brother", "Брат", ["Сестра", "Племянник", "Кузен"]),
      vocabulary("Sister", "Сестра", ["Бабушка", "Мама", "Брат"]),
      vocabulary("Grandmother", "Бабушка", ["Девочка", "Тётя", "Дочь"]),
      translation("Это мой брат.", "This is my brother.", ["This is my brother.", "This is my teacher.", "This is my house."]),
      translation("Моя мама добрая.", "My mother is kind.", ["My mother is kind.", "My mother is busy.", "My mother is a doctor."]),
      fillBlank("My ___ is my father's brother.", "uncle", ["mother", "daughter"]),
      fillBlank("Her ___ is ten years old.", "sister", ["kitchen", "table"]),
      listening("family", "family", ["famous", "farmer", "fantasy"])
    ]
  },
  {
    title: "Food Quest",
    description: "Practice food words and simple meal sentences.",
    level: "A1",
    type: "fillblank",
    xpReward: 100,
    questions: [
      vocabulary("Bread", "Хлеб", ["Молоко", "Суп", "Сыр"]),
      vocabulary("Milk", "Молоко", ["Вода", "Яйцо", "Масло"]),
      vocabulary("Apple", "Яблоко", ["Груша", "Банан", "Мясо"]),
      vocabulary("Cheese", "Сыр", ["Рис", "Соль", "Рыба"]),
      fillBlank("We eat ___ for breakfast.", "bread", ["milk", "rice"]),
      fillBlank("He drinks ___ with dinner.", "water", ["bread", "cheese"]),
      translation("Мы любим пиццу.", "We like pizza.", ["We like pizza.", "We cook dinner.", "We buy tea."]),
      translation("Он хочет воды.", "He wants water.", ["He wants water.", "He wants coffee.", "He wants breakfast."]),
      listening("banana", "banana", ["bandana", "cabana", "balloon"]),
      listening("breakfast", "breakfast", ["bread", "broccoli", "brave"])
    ]
  },
  {
    title: "Time Builder",
    description: "Tell the time and describe parts of the day.",
    level: "A1",
    type: "fillblank",
    xpReward: 100,
    questions: [
      vocabulary("Morning", "Утро", ["Вечер", "Ночь", "Неделя"]),
      vocabulary("Evening", "Вечер", ["Завтрак", "Урок", "Утро"]),
      vocabulary("Night", "Ночь", ["Полдень", "Час", "Минута"]),
      translation("Сейчас три часа.", "It is three o'clock.", ["It is three o'clock.", "It is five o'clock.", "It is lunch time."]),
      translation("Я встаю в семь.", "I get up at seven.", ["I get up at seven.", "I go home at six.", "I go to bed at nine."]),
      fillBlank("We have lunch at twelve ___", "o'clock", ["tomorrow", "friends"]),
      fillBlank("She goes to bed at ___", "night", ["table", "street"]),
      listening("minute", "minute", ["morning", "mirror", "market"]),
      listening("clock", "clock", ["cloud", "close", "class"]),
      fillBlank("It is ___ in the afternoon.", "one", ["bread", "green"])
    ]
  },
  {
    title: "Weekday Groove",
    description: "Move through the week in English.",
    level: "A1",
    type: "vocabulary",
    xpReward: 100,
    questions: [
      vocabulary("Monday", "Понедельник", ["Пятница", "Вторник", "Суббота"]),
      vocabulary("Tuesday", "Вторник", ["Среда", "Четверг", "Воскресенье"]),
      vocabulary("Wednesday", "Среда", ["Понедельник", "Суббота", "Пятница"]),
      vocabulary("Friday", "Пятница", ["Вторник", "Среда", "Четверг"]),
      vocabulary("Sunday", "Воскресенье", ["Понедельник", "Пятница", "Суббота"]),
      translation("Сегодня понедельник.", "Today is Monday.", ["Today is Monday.", "Tomorrow is Friday.", "Yesterday was Sunday."]),
      translation("Мы работаем в среду.", "We work on Wednesday.", ["We work on Wednesday.", "We rest on Sunday.", "We study on Monday."]),
      fillBlank("School starts on ___.", "Monday", ["summer", "apple"]),
      fillBlank("The weekend includes Saturday and ___.", "Sunday", ["Tuesday", "Thursday"]),
      listening("Thursday", "Thursday", ["Tuesday", "thirty", "teacher"])
    ]
  },
  {
    title: "A1 Speaking Around Me",
    description: "Practice short spoken sentences about daily life, time and family.",
    level: "A1",
    type: "speaking",
    xpReward: 110,
    questions: [
      speaking("Это моя мама", "This is my mother", ["This is my mother", "This is my teacher", "This is my sister"]),
      speaking("У меня есть брат", "I have a brother", ["I have a brother", "I am a brother", "He has a brother"]),
      speaking("Сегодня понедельник", "Today is Monday", ["Today is Monday", "Tomorrow is Monday", "It is Sunday"]),
      speaking("Сейчас три часа", "It is three o'clock", ["It is three o'clock", "It is three days", "I am three"]),
      speaking("Я иду домой", "I go home", ["I go home", "I stay home", "I see home"]),
      speaking("Мы любим пиццу", "We like pizza", ["We like pizza", "We make pizza", "We need pizza"]),
      speaking("Он пьёт воду", "He drinks water", ["He drinks water", "He drinks coffee", "He needs water"]),
      speaking("Небо синее", "The sky is blue", ["The sky is blue", "The sky is green", "The sea is blue"]),
      speaking("Трава зелёная", "The grass is green", ["The grass is green", "The tree is green", "The grass is small"]),
      speaking("Я читаю книгу", "I read a book", ["I read a book", "I buy a book", "I write a book"])
    ]
  },
  {
    title: "Verb Motion",
    description: "Use common action verbs in simple sentences.",
    level: "A1",
    type: "translation",
    xpReward: 100,
    questions: [
      vocabulary("Run", "Бежать", ["Прыгать", "Читать", "Писать"]),
      vocabulary("Read", "Читать", ["Петь", "Готовить", "Спать"]),
      vocabulary("Write", "Писать", ["Смотреть", "Пить", "Покупать"]),
      translation("Я читаю книгу.", "I read a book.", ["I read a book.", "I buy a book.", "I see a book."]),
      translation("Она пишет письмо.", "She writes a letter.", ["She writes a letter.", "She reads a letter.", "She brings a letter."]),
      translation("Мы идём домой.", "We go home.", ["We go home.", "We go shopping.", "We go swimming."]),
      fillBlank("He ___ to school every day.", "goes", ["go", "going"]),
      fillBlank("They ___ football on Sunday.", "play", ["plays", "playing"]),
      listening("sleep", "sleep", ["slip", "ship", "soup"]),
      listening("speak", "speak", ["space", "sport", "speed"])
    ]
  },
  {
    title: "Adjective Pop",
    description: "Describe things with easy adjectives.",
    level: "A1",
    type: "fillblank",
    xpReward: 100,
    questions: [
      vocabulary("Big", "Большой", ["Маленький", "Новый", "Длинный"]),
      vocabulary("Small", "Маленький", ["Старый", "Горячий", "Красивый"]),
      vocabulary("Happy", "Счастливый", ["Грустный", "Сильный", "Быстрый"]),
      vocabulary("Cold", "Холодный", ["Тёплый", "Сладкий", "Мягкий"]),
      fillBlank("The elephant is very ___.", "big", ["small", "cold"]),
      fillBlank("The coffee is too ___.", "hot", ["sad", "short"]),
      translation("Моя кошка маленькая.", "My cat is small.", ["My cat is small.", "My cat is hungry.", "My cat is black."]),
      translation("Он счастлив сегодня.", "He is happy today.", ["He is happy today.", "He is busy today.", "He is angry today."]),
      listening("beautiful", "beautiful", ["busy", "careful", "wonderful"]),
      listening("strong", "strong", ["street", "strange", "song"])
    ]
  },
  {
    title: "Useful Phrases",
    description: "Survive daily situations with quick phrases.",
    level: "A1",
    type: "translation",
    xpReward: 100,
    questions: [
      translation("Мне нужна помощь.", "I need help.", ["I need help.", "I need tea.", "I need time."]),
      translation("Где туалет?", "Where is the bathroom?", ["Where is the bathroom?", "Where is the bank?", "Where is the station?"]),
      translation("Я не понимаю.", "I do not understand.", ["I do not understand.", "I do not remember.", "I do not agree."]),
      translation("Повторите, пожалуйста.", "Please repeat.", ["Please repeat.", "Please sit down.", "Please be quiet."]),
      translation("Сколько это стоит?", "How much is it?", ["How much is it?", "How old is he?", "How big is it?"]),
      fillBlank("Can you ___ me?", "help", ["drink", "close"]),
      fillBlank("I am ___, thank you.", "fine", ["late", "open"]),
      listening("excuse me", "excuse me", ["thank you", "see you", "good night"]),
      listening("welcome", "welcome", ["window", "winter", "wallet"]),
      vocabulary("Ticket", "Билет", ["Сумка", "Ключ", "Письмо"])
    ]
  },
  {
    title: "A1 Speaking Daily Phrases",
    description: "Use short survival phrases with voice practice and instant feedback.",
    level: "A1",
    type: "speaking",
    xpReward: 110,
    questions: [
      speaking("Мне нужна помощь", "I need help", ["I need help", "I need water", "I need time"]),
      speaking("Где туалет?", "Where is the bathroom?", ["Where is the bathroom?", "Where is the station?", "Where is the bank?"]),
      speaking("Я не понимаю", "I do not understand", ["I do not understand", "I do not remember", "I do not agree"]),
      speaking("Повторите, пожалуйста", "Please repeat", ["Please repeat", "Please sit down", "Please be quiet"]),
      speaking("Сколько это стоит?", "How much is it?", ["How much is it?", "How old is it?", "How big is it?"]),
      speaking("Я хочу воды", "I want water", ["I want water", "I need coffee", "I drink tea"]),
      speaking("Можно меню?", "Can I have the menu?", ["Can I have the menu?", "Can I open the window?", "Can I take the train?"]),
      speaking("Где автобусная остановка?", "Where is the bus stop?", ["Where is the bus stop?", "Where is the bus?", "Where is the taxi?"]),
      speaking("Мне нужен билет", "I need a ticket", ["I need a ticket", "I buy a ticket", "I have a ticket"]),
      speaking("Извините", "Excuse me", ["Excuse me", "Thank you", "See you"])
    ]
  },
  {
    title: "Daily Routine",
    description: "Talk about your everyday schedule.",
    level: "A2",
    type: "translation",
    xpReward: 100,
    questions: [
      translation("Я обычно просыпаюсь в шесть.", "I usually wake up at six.", ["I usually wake up at six.", "I usually work at six.", "I usually leave at six."]),
      translation("После завтрака я иду на работу.", "After breakfast I go to work.", ["After breakfast I go to work.", "After breakfast I read a book.", "After breakfast I watch TV."]),
      translation("Вечером она делает домашнее задание.", "She does her homework in the evening.", ["She does her homework in the evening.", "She cooks dinner in the evening.", "She cleans the room in the evening."]),
      fillBlank("He ___ a shower before work.", "takes", ["take", "taking"]),
      fillBlank("We ___ dinner at seven.", "have", ["has", "having"]),
      listening("routine", "routine", ["running", "reading", "writing"]),
      listening("homework", "homework", ["housework", "holiday", "hallway"]),
      vocabulary("Wake up", "Просыпаться", ["Засыпать", "Выходить", "Возвращаться"]),
      vocabulary("Breakfast", "Завтрак", ["Обед", "Ужин", "Перекус"]),
      translation("Он ложится спать поздно.", "He goes to bed late.", ["He goes to bed late.", "He gets up early.", "He leaves home late."])
    ]
  },
  {
    title: "Around Town",
    description: "Navigate the city with location words.",
    level: "A2",
    type: "vocabulary",
    xpReward: 100,
    questions: [
      vocabulary("Library", "Библиотека", ["Магазин", "Больница", "Парк"]),
      vocabulary("Hospital", "Больница", ["Школа", "Кафе", "Пляж"]),
      vocabulary("Bridge", "Мост", ["Дорога", "Окно", "Площадь"]),
      translation("Банк рядом с почтой.", "The bank is next to the post office.", ["The bank is next to the post office.", "The bank is behind the school.", "The bank is near the river."]),
      translation("Поверните налево на светофоре.", "Turn left at the traffic light.", ["Turn left at the traffic light.", "Turn right at the corner.", "Go straight to the station."]),
      fillBlank("The supermarket is ___ the street.", "across", ["sleep", "clean"]),
      fillBlank("The bus stop is ___ the museum.", "near", ["slow", "late"]),
      listening("station", "station", ["situation", "section", "student"]),
      listening("square", "square", ["school", "scarf", "score"]),
      vocabulary("Corner", "Угол", ["Потолок", "Подушка", "Дверь"])
    ]
  },
  {
    title: "Travel Talk",
    description: "Handle basic travel situations in English.",
    level: "A2",
    type: "listening",
    xpReward: 100,
    questions: [
      translation("Мне нужен билет до Лондона.", "I need a ticket to London.", ["I need a ticket to London.", "I need a train in London.", "I need a room in London."]),
      translation("Во сколько отправляется поезд?", "What time does the train leave?", ["What time does the train leave?", "Where does the train stop?", "Why is the train late?"]),
      vocabulary("Passport", "Паспорт", ["Кошелёк", "Карта", "Телефон"]),
      vocabulary("Airport", "Аэропорт", ["Вокзал", "Рынок", "Стадион"]),
      fillBlank("Please show me your ___.", "passport", ["picture", "jacket"]),
      fillBlank("Our flight is ___ two hours.", "in", ["on", "at"]),
      listening("boarding pass", "boarding pass", ["birthday card", "bus ticket", "travel bag"]),
      listening("luggage", "luggage", ["language", "village", "message"]),
      translation("Мы ждём автобус на остановке.", "We are waiting for the bus at the stop.", ["We are waiting for the bus at the stop.", "We are taking a bus to the stop.", "We are looking for the bus station."]),
      vocabulary("Map", "Карта", ["Кружка", "Лампа", "Кнопка"])
    ]
  },
  {
    title: "Work Chat",
    description: "Talk about meetings, tasks and jobs.",
    level: "A2",
    type: "translation",
    xpReward: 100,
    questions: [
      vocabulary("Meeting", "Встреча", ["Отпуск", "Обед", "Сумка"]),
      vocabulary("Manager", "Менеджер", ["Повар", "Друг", "Сосед"]),
      translation("У меня встреча в десять.", "I have a meeting at ten.", ["I have a meeting at ten.", "I have a lesson at ten.", "I have a doctor at ten."]),
      translation("Она работает в офисе.", "She works in an office.", ["She works in an office.", "She lives in an office.", "She studies in an office."]),
      translation("Мы заканчиваем проект сегодня.", "We finish the project today.", ["We finish the project today.", "We start the project today.", "We discuss the project today."]),
      fillBlank("Please send the ___ by email.", "report", ["window", "table"]),
      fillBlank("The ___ starts at nine.", "meeting", ["coffee", "garden"]),
      listening("deadline", "deadline", ["daylight", "design", "doorway"]),
      listening("office", "office", ["offer", "often", "order"]),
      vocabulary("Task", "Задача", ["Письмо", "Шкаф", "Рубашка"])
    ]
  },
  {
    title: "Weekend Stories",
    description: "Describe plans and simple past events.",
    level: "A2",
    type: "translation",
    xpReward: 100,
    questions: [
      translation("Вчера мы смотрели фильм.", "Yesterday we watched a movie.", ["Yesterday we watched a movie.", "Yesterday we visited a friend.", "Yesterday we played a game."]),
      translation("На выходных я поеду к бабушке.", "I will visit my grandmother this weekend.", ["I will visit my grandmother this weekend.", "I visited my grandmother last weekend.", "I call my grandmother every weekend."]),
      vocabulary("Yesterday", "Вчера", ["Сегодня", "Завтра", "Утром"]),
      vocabulary("Weekend", "Выходные", ["Месяц", "Четверг", "Урок"]),
      fillBlank("They ___ football last Saturday.", "played", ["play", "plays"]),
      fillBlank("I will ___ at home tomorrow.", "stay", ["stayed", "stays"]),
      listening("cinema", "cinema", ["center", "circle", "camera"]),
      listening("picnic", "picnic", ["picture", "panic", "plastic"]),
      translation("Мы гуляли в парке.", "We walked in the park.", ["We walked in the park.", "We worked in the park.", "We waited in the park."]),
      vocabulary("Visit", "Навещать", ["Мыть", "Прыгать", "Рисовать"])
    ]
  },
  ...buildIntonationLessons(),
  ...buildIntermediateSpeakingLessons(),
  ...buildEmotionLessons(),
  ...buildAdvancedLessons()
];

export const buildLessonCatalog = () => normalizeLessonMatrix(baseLessons);

async function main() {
  const lessons = buildLessonCatalog();
  await prisma.userProgress.deleteMany();
  await prisma.question.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.user.deleteMany();

  for (const lesson of lessons) {
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

  const demoPassword = await bcrypt.hash("demo1234", 10);
  await prisma.user.create({
    data: {
      email: "demo@easyenglish.dev",
      username: "Demo Learner",
      password: demoPassword,
      xp: 0,
      level: "A1",
      streak: 0,
      lastLogin: null
    }
  });

  console.log(`Seeded ${lessons.length} lessons and a demo user.`);
}

const isDirectRun = process.argv[1]
  ? path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
  : false;

if (isDirectRun) {
  main()
    .catch((error) => {
      console.error(error);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
