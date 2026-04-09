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
    title: "A2 Speaking Travel",
    description: "Practice spoken travel phrases for tickets, directions and hotel check-in.",
    level: "A2",
    type: "speaking",
    xpReward: 120,
    questions: [
      speaking("Я хотел бы забронировать номер на две ночи", "I would like to book a room for two nights", ["I would like to book a room for two nights", "I would like to clean the room tonight", "I would like to visit the room tomorrow"]),
      speaking("Во сколько начинается посадка?", "What time does boarding start?", ["What time does boarding start?", "What time does the airport close?", "What time does the bus stop?"]),
      speaking("Можете показать мне это на карте?", "Can you show me that on the map?", ["Can you show me that on the map?", "Can you write me a long message?", "Can you call me in the morning?"]),
      speaking("Мне нужен столик у окна", "I need a table by the window", ["I need a table by the window", "I need a taxi near the station", "I need a room with a kitchen"]),
      speaking("Мы ищем музей в центре города", "We are looking for the museum in the city center", ["We are looking for the museum in the city center", "We are visiting the museum after dinner", "We are leaving the city very early"]),
      speaking("Сколько времени займет поездка?", "How long will the trip take?", ["How long will the trip take?", "How much does the ticket cost?", "How often does the train leave?"]),
      speaking("Я потерял свой багаж", "I lost my luggage", ["I lost my luggage", "I packed my luggage", "I checked my luggage"]),
      speaking("Есть ли поблизости аптека?", "Is there a pharmacy nearby?", ["Is there a pharmacy nearby?", "Is there a station abroad?", "Is there a market inside?"]),
      speaking("Нам нужно выйти на следующей остановке", "We need to get off at the next stop", ["We need to get off at the next stop", "We need to wait at the main station", "We need to buy tickets after lunch"]),
      speaking("Можно оплатить картой?", "Can I pay by card?", ["Can I pay by card?", "Can I stay in the park?", "Can I travel tomorrow?"])
    ]
  },
  {
    title: "A2 Speaking Home Life",
    description: "Talk about home routines, chores, family plans and everyday activities.",
    level: "A2",
    type: "speaking",
    xpReward: 120,
    questions: [
      speaking("Я убираю комнату каждую субботу", "I clean my room every Saturday", ["I clean my room every Saturday", "I paint my room every Sunday", "I leave my room every morning"]),
      speaking("Мой отец готовит ужин по пятницам", "My father cooks dinner on Fridays", ["My father cooks dinner on Fridays", "My father orders lunch on Fridays", "My father watches films on Fridays"]),
      speaking("После работы мы гуляем с собакой", "After work we walk the dog", ["After work we walk the dog", "After work we feed the cat", "After work we wash the car"]),
      speaking("Сегодня вечером я стираю одежду", "I am doing the laundry this evening", ["I am doing the laundry this evening", "I am cleaning the kitchen tomorrow", "I am buying new clothes tonight"]),
      speaking("Моя сестра часто помогает мне на кухне", "My sister often helps me in the kitchen", ["My sister often helps me in the kitchen", "My sister always studies in the bedroom", "My sister usually waits for me outside"]),
      speaking("На этой неделе к нам приедут гости", "We will have guests this week", ["We will have guests this week", "We had guests last month", "We invite guests every day"]),
      speaking("Я хочу купить новую лампу для гостиной", "I want to buy a new lamp for the living room", ["I want to buy a new lamp for the living room", "I want to move the sofa to the bedroom", "I want to paint the kitchen wall"]),
      speaking("Обычно я накрываю на стол", "I usually set the table", ["I usually set the table", "I usually wash the dishes", "I usually open the window"]),
      speaking("Мы собираемся смотреть фильм после ужина", "We are going to watch a film after dinner", ["We are going to watch a film after dinner", "We are going to cook dinner after work", "We are going to visit friends after school"]),
      speaking("Я должен вынести мусор", "I have to take out the trash", ["I have to take out the trash", "I have to clean the carpet", "I have to repair the chair"])
    ]
  },
  {
    title: "A2 Speaking Plans",
    description: "Speak about shopping, appointments, future plans and everyday errands.",
    level: "A2",
    type: "speaking",
    xpReward: 120,
    questions: [
      speaking("Завтра я собираюсь купить новые туфли", "Tomorrow I am going to buy new shoes", ["Tomorrow I am going to buy new shoes", "Tomorrow I am going to wear old shoes", "Tomorrow I am going to clean my shoes"]),
      speaking("Мне нужно записаться к стоматологу", "I need to make an appointment with the dentist", ["I need to make an appointment with the dentist", "I need to visit the doctor after dinner", "I need to buy medicine at the market"]),
      speaking("После обеда мы встретимся в торговом центре", "We will meet at the shopping mall after lunch", ["We will meet at the shopping mall after lunch", "We will work at the shopping mall tomorrow", "We will stay at the shopping mall all night"]),
      speaking("Я ищу куртку на зиму", "I am looking for a jacket for winter", ["I am looking for a jacket for winter", "I am looking for a bag for school", "I am looking for a gift for Anna"]),
      speaking("Она хочет вернуть это платье", "She wants to return this dress", ["She wants to return this dress", "She wants to try on this dress", "She wants to wash this dress"]),
      speaking("Я опоздаю на встречу на пять минут", "I will be five minutes late for the meeting", ["I will be five minutes late for the meeting", "I will be ten minutes early for the lesson", "I will be free after the meeting"]),
      speaking("Нам нужно купить овощи на ужин", "We need to buy vegetables for dinner", ["We need to buy vegetables for dinner", "We need to cook breakfast for guests", "We need to order coffee for work"]),
      speaking("В следующем месяце я начну новый курс", "I will start a new course next month", ["I will start a new course next month", "I will finish this course next week", "I will repeat the lesson tomorrow"]),
      speaking("Можно примерить эту рубашку?", "Can I try on this shirt?", ["Can I try on this shirt?", "Can I pay for this shirt?", "Can I wash this shirt?"]),
      speaking("Я собираюсь встретиться с другом после работы", "I am going to meet a friend after work", ["I am going to meet a friend after work", "I am going to call my boss after lunch", "I am going to study at home this evening"])
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
