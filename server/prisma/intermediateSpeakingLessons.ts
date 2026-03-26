import type { SeedLesson, SeedQuestion } from "./intonationLessons.js";

const shuffle = <T,>(items: T[]) => {
  const copy = [...items];

  for (let index = copy.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[randomIndex]] = [copy[randomIndex], copy[index]];
  }

  return copy;
};

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

export const buildIntermediateSpeakingLessons = (): SeedLesson[] => [
  {
    title: "A2 Speaking Routine",
    description: "Speak about your day, work and simple plans in natural English.",
    level: "A2",
    type: "speaking",
    xpReward: 120,
    questions: [
      speaking("Я обычно просыпаюсь в шесть", "I usually wake up at six", ["I usually wake up at six", "I usually work at six", "I usually leave at six"]),
      speaking("После завтрака я иду на работу", "After breakfast I go to work", ["After breakfast I go to work", "After breakfast I watch TV", "After breakfast I read a book"]),
      speaking("Вечером она делает домашнее задание", "She does her homework in the evening", ["She does her homework in the evening", "She cooks dinner in the evening", "She cleans the room in the evening"]),
      speaking("У меня встреча в десять", "I have a meeting at ten", ["I have a meeting at ten", "I have a lesson at ten", "I have a doctor at ten"]),
      speaking("Она работает в офисе", "She works in an office", ["She works in an office", "She studies in an office", "She lives in an office"]),
      speaking("Мы заканчиваем проект сегодня", "We finish the project today", ["We finish the project today", "We start the project today", "We discuss the project today"]),
      speaking("Мне нужен билет до Лондона", "I need a ticket to London", ["I need a ticket to London", "I need a room in London", "I need a train in London"]),
      speaking("Во сколько отправляется поезд?", "What time does the train leave?", ["What time does the train leave?", "Where does the train stop?", "Why is the train late?"]),
      speaking("Мы ждём автобус на остановке", "We are waiting for the bus at the stop", ["We are waiting for the bus at the stop", "We are taking the bus to the stop", "We are looking for the bus station"]),
      speaking("На выходных я навещу бабушку", "I will visit my grandmother this weekend", ["I will visit my grandmother this weekend", "I visited my grandmother last weekend", "I call my grandmother every weekend"])
    ]
  },
  {
    title: "B1 Speaking Opinions",
    description: "Practice longer spoken answers about ideas, choices and daily opinions.",
    level: "B1",
    type: "speaking",
    xpReward: 140,
    questions: [
      speaking("Я думаю, что эта идея довольно полезна", "I think this idea is quite useful", ["I think this idea is quite useful", "I know this answer is rather simple", "I feel this lesson is much longer"]),
      speaking("По моему мнению, нам нужно больше времени", "In my opinion, we need more time", ["In my opinion, we need more time", "In my opinion, we need more coffee", "In my opinion, we need more people"]),
      speaking("Я предпочитаю работать утром, а не вечером", "I prefer to work in the morning rather than in the evening", ["I prefer to work in the morning rather than in the evening", "I prefer to study at the station rather than at home", "I prefer to travel in the spring rather than in the summer"]),
      speaking("Эта задача оказалась сложнее, чем я ожидал", "This task turned out to be more difficult than I expected", ["This task turned out to be more difficult than I expected", "This lesson turned out to be more exciting than I expected", "This meeting turned out to be much shorter than I expected"]),
      speaking("Нам следует обсудить это более подробно", "We should discuss this in more detail", ["We should discuss this in more detail", "We should explain this with more humor", "We should repeat this with more care"]),
      speaking("Мне было трудно понять его точку зрения", "It was hard for me to understand his point of view", ["It was hard for me to understand his point of view", "It was easy for me to remember his schedule", "It was strange for me to accept his invitation"]),
      speaking("Я стараюсь говорить спокойнее в стрессовых ситуациях", "I try to speak more calmly in stressful situations", ["I try to speak more calmly in stressful situations", "I try to work more quickly in difficult meetings", "I try to think more clearly in quiet places"]),
      speaking("Этот фильм заставил меня задуматься", "This film made me think", ["This film made me think", "This book helped me study", "This song made me laugh"]),
      speaking("Я не полностью согласен с этим решением", "I do not completely agree with this decision", ["I do not completely agree with this decision", "I do not immediately accept this invitation", "I do not usually remember this expression"]),
      speaking("Важно объяснять свои мысли ясно", "It is important to explain your ideas clearly", ["It is important to explain your ideas clearly", "It is important to write your answers quickly", "It is important to finish your task early"])
    ]
  },
  {
    title: "B2 Speaking Confidence",
    description: "Build confident spoken arguments, explanations and reactions.",
    level: "B2",
    type: "speaking",
    xpReward: 150,
    questions: [
      speaking("Я понимаю твою точку зрения, но вижу ситуацию иначе", "I understand your point of view, but I see the situation differently", ["I understand your point of view, but I see the situation differently", "I understand your report, but I prefer a different schedule", "I understand your question, but I need another example"]),
      speaking("Эта стратегия может сработать в краткосрочной перспективе", "This strategy may work in the short term", ["This strategy may work in the short term", "This solution may sound better in the first draft", "This project may feel easier in the final stage"]),
      speaking("Нам нужно более гибкое решение", "We need a more flexible solution", ["We need a more flexible solution", "We need a more formal direction", "We need a more detailed introduction"]),
      speaking("Его объяснение звучало убедительно, но не полностью", "His explanation sounded convincing, but not entirely", ["His explanation sounded convincing, but not entirely", "His conclusion sounded polite, but unexpectedly brief", "His answer sounded calm, but unusually formal"]),
      speaking("Я бы предложил рассмотреть другой подход", "I would suggest considering another approach", ["I would suggest considering another approach", "I would prefer repeating the original version", "I would support finishing the current project"]),
      speaking("Важно сохранять спокойствие под давлением", "It is important to remain calm under pressure", ["It is important to remain calm under pressure", "It is important to respond quickly during conflict", "It is important to sound formal in meetings"]),
      speaking("Мы должны объяснить это более убедительно", "We should explain this more persuasively", ["We should explain this more persuasively", "We should describe this more briefly", "We should compare this more carefully"]),
      speaking("Эта реакция была вполне предсказуемой", "That reaction was quite predictable", ["That reaction was quite predictable", "That decision was rather practical", "That response was mostly emotional"]),
      speaking("Я не уверен, что это лучший вариант", "I am not convinced this is the best option", ["I am not convinced this is the best option", "I am not certain this is the right answer", "I am not aware this is the final version"]),
      speaking("Нам стоит сосредоточиться на главной проблеме", "We should focus on the main issue", ["We should focus on the main issue", "We should return to the first example", "We should respond to the last question"])
    ]
  }
];
