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
    title: "B1 Speaking Work Life",
    description: "Talk about work tasks, responsibilities and practical communication.",
    level: "B1",
    type: "speaking",
    xpReward: 140,
    questions: [
      speaking("Сегодня мне нужно закончить отчёт", "I need to finish the report today", ["I need to finish the report today", "I need to send the letter today", "I need to join the class today"]),
      speaking("Мы обсудили проблему на встрече", "We discussed the problem during the meeting", ["We discussed the problem during the meeting", "We solved the task after the lesson", "We repeated the question in the office"]),
      speaking("Мне часто приходится отвечать на письма", "I often have to reply to emails", ["I often have to reply to emails", "I often have to write reports", "I often have to call clients"]),
      speaking("Его объяснение было очень понятным", "His explanation was very clear", ["His explanation was very clear", "His message was very short", "His opinion was very strong"]),
      speaking("Нам нужно подготовиться заранее", "We need to prepare in advance", ["We need to prepare in advance", "We need to travel in comfort", "We need to respond with care"]),
      speaking("Я постараюсь закончить это к пятнице", "I will try to finish it by Friday", ["I will try to finish it by Friday", "I will try to send it on Monday", "I will try to explain it tomorrow"]),
      speaking("Она хорошо справляется с давлением", "She handles pressure well", ["She handles pressure well", "She answers questions fast", "She solves problems alone"]),
      speaking("Иногда нам приходится менять планы", "Sometimes we have to change our plans", ["Sometimes we have to change our plans", "Sometimes we have to miss the train", "Sometimes we have to start again"]),
      speaking("Я думаю, это более практичное решение", "I think this is a more practical solution", ["I think this is a more practical solution", "I think this is a more formal answer", "I think this is a more common question"]),
      speaking("Мы должны быть готовы к изменениям", "We should be ready for changes", ["We should be ready for changes", "We should be known for quality", "We should be open to visitors"])
    ]
  },
  {
    title: "B1 Speaking Travel Stories",
    description: "Describe trips, delays, plans and travel situations in fuller spoken English.",
    level: "B1",
    type: "speaking",
    xpReward: 140,
    questions: [
      speaking("Поездка заняла больше времени, чем мы ожидали", "The trip took longer than we expected", ["The trip took longer than we expected", "The lesson felt shorter than we expected", "The road looked better than we expected"]),
      speaking("Мы чуть не опоздали на поезд", "We almost missed the train", ["We almost missed the train", "We nearly changed the plan", "We quickly found the station"]),
      speaking("Мне особенно понравилась атмосфера города", "I especially liked the atmosphere of the city", ["I especially liked the atmosphere of the city", "I really noticed the color of the buildings", "I mostly remembered the sound of the music"]),
      speaking("Погода испортилась во второй половине дня", "The weather got worse later in the day", ["The weather got worse later in the day", "The traffic became lighter in the evening", "The hotel looked better in the morning"]),
      speaking("Мы решили изменить маршрут в последний момент", "We decided to change the route at the last moment", ["We decided to change the route at the last moment", "We decided to cancel the lesson after lunch", "We decided to return the tickets the next day"]),
      speaking("Мне было трудно объяснить, куда мы едем", "It was difficult for me to explain where we were going", ["It was difficult for me to explain where we were going", "It was important for me to remember where we were staying", "It was easy for me to understand why we were waiting"]),
      speaking("Этот опыт научил меня быть терпеливее", "This experience taught me to be more patient", ["This experience taught me to be more patient", "This journey helped me to be more careful", "This problem forced me to be more active"]),
      speaking("В итоге всё прошло довольно хорошо", "In the end, everything went quite well", ["In the end, everything went quite well", "At first, everything seemed too slow", "After that, everything became more difficult"]),
      speaking("Я бы с удовольствием поехал туда снова", "I would gladly go there again", ["I would gladly go there again", "I would happily stay here tonight", "I would certainly leave early tomorrow"]),
      speaking("Это было одно из самых запоминающихся путешествий", "It was one of the most memorable trips", ["It was one of the most memorable trips", "It was one of the most difficult tasks", "It was one of the most interesting meetings"])
    ]
  },
  {
    title: "B1 Speaking Problem Solving",
    description: "Practice spoken responses for problems, solutions and decision-making.",
    level: "B1",
    type: "speaking",
    xpReward: 140,
    questions: [
      speaking("Нам нужно найти более эффективный способ", "We need to find a more effective way", ["We need to find a more effective way", "We need to choose a more formal tone", "We need to build a more careful plan"]),
      speaking("Эту ошибку можно исправить довольно быстро", "This mistake can be fixed quite quickly", ["This mistake can be fixed quite quickly", "This problem can be solved quite easily", "This issue can be discussed very openly"]),
      speaking("Я предлагаю начать с самой важной части", "I suggest starting with the most important part", ["I suggest starting with the most important part", "I suggest repeating the first question first", "I suggest checking the final answer again"]),
      speaking("Мы столкнулись с неожиданной трудностью", "We ran into an unexpected difficulty", ["We ran into an unexpected difficulty", "We came across an unusual place", "We looked for a different result"]),
      speaking("Лучше обсудить это спокойно и честно", "It is better to discuss this calmly and honestly", ["It is better to discuss this calmly and honestly", "It is better to answer this clearly and politely", "It is better to describe this fully and carefully"]),
      speaking("Я не уверен, что это сработает в долгосрочной перспективе", "I am not sure this will work in the long term", ["I am not sure this will work in the long term", "I am not sure this will help in every case", "I am not sure this will sound completely right"]),
      speaking("Нам пришлось принять решение очень быстро", "We had to make a decision very quickly", ["We had to make a decision very quickly", "We had to change the schedule rather suddenly", "We had to explain the reason more clearly"]),
      speaking("Важно учитывать все возможные последствия", "It is important to consider all possible consequences", ["It is important to consider all possible consequences", "It is important to compare all available answers", "It is important to remember all useful expressions"]),
      speaking("Это решение кажется наиболее разумным", "This solution seems the most reasonable", ["This solution seems the most reasonable", "This example sounds the most convincing", "This answer looks the most complete"]),
      speaking("В такой ситуации нужно сохранять ясность мышления", "In this situation, you need to stay clear-headed", ["In this situation, you need to stay clear-headed", "In this situation, you need to sound more formal", "In this situation, you need to answer more quickly"])
    ]
  },
  {
    title: "B1 Speaking Feelings",
    description: "Express emotions, reactions and personal reflections in natural B1 speech.",
    level: "B1",
    type: "speaking",
    xpReward: 140,
    questions: [
      speaking("Я был приятно удивлён её реакцией", "I was pleasantly surprised by her reaction", ["I was pleasantly surprised by her reaction", "I was deeply impressed by her answer", "I was slightly confused by her decision"]),
      speaking("Честно говоря, я чувствовал себя немного неловко", "To be honest, I felt a little uncomfortable", ["To be honest, I felt a little uncomfortable", "To be honest, I felt a bit uncertain", "To be honest, I felt rather tired"]),
      speaking("Эта новость принесла мне большое облегчение", "This news brought me great relief", ["This news brought me great relief", "This idea gave me more confidence", "This message caused me some stress"]),
      speaking("Сначала я расстроился, но потом успокоился", "At first I was upset, but then I calmed down", ["At first I was upset, but then I calmed down", "At first I was worried, but then I relaxed", "At first I was angry, but then I smiled"]),
      speaking("Мне было трудно скрыть разочарование", "It was hard for me to hide my disappointment", ["It was hard for me to hide my disappointment", "It was hard for me to explain my opinion", "It was hard for me to understand his reaction"]),
      speaking("Я действительно горжусь этим результатом", "I am really proud of this result", ["I am really proud of this result", "I am truly satisfied with this outcome", "I am especially happy with this progress"]),
      speaking("Её слова заставили меня почувствовать уверенность", "Her words made me feel confident", ["Her words made me feel confident", "Her support helped me stay calm", "Her advice made me think carefully"]),
      speaking("Иногда мне сложно говорить о своих чувствах", "Sometimes it is hard for me to talk about my feelings", ["Sometimes it is hard for me to talk about my feelings", "Sometimes it is easier for me to write my thoughts", "Sometimes it is better for me to stay quiet"]),
      speaking("Я благодарен за поддержку в трудный момент", "I am grateful for the support at a difficult moment", ["I am grateful for the support at a difficult moment", "I am thankful for the help during the process", "I am happy about the advice I received"]),
      speaking("Это был важный момент для моего роста", "It was an important moment for my growth", ["It was an important moment for my growth", "It was a meaningful step in my progress", "It was a useful lesson for my future"])
    ]
  },
  {
    title: "B1 Speaking Social Situations",
    description: "Handle invitations, polite disagreement and everyday social interactions.",
    level: "B1",
    type: "speaking",
    xpReward: 140,
    questions: [
      speaking("Спасибо за приглашение, но я не смогу прийти", "Thank you for the invitation, but I will not be able to come", ["Thank you for the invitation, but I will not be able to come", "Thank you for the message, but I need to leave early", "Thank you for the offer, but I already have plans"]),
      speaking("Я понимаю твою точку зрения, хотя думаю иначе", "I understand your point of view, although I think differently", ["I understand your point of view, although I think differently", "I respect your opinion, but I see it another way", "I accept your argument, but I need more time"]),
      speaking("Было бы неплохо встретиться на следующей неделе", "It would be nice to meet next week", ["It would be nice to meet next week", "It would be helpful to talk in person", "It would be easier to decide tomorrow"]),
      speaking("Я не хотел показаться грубым", "I did not mean to sound rude", ["I did not mean to sound rude", "I did not want to seem impolite", "I did not intend to offend anyone"]),
      speaking("Нам стоит заранее уточнить детали", "We should confirm the details in advance", ["We should confirm the details in advance", "We should discuss the topic more openly", "We should explain the reason more clearly"]),
      speaking("Извини, если я неправильно тебя понял", "I am sorry if I misunderstood you", ["I am sorry if I misunderstood you", "I am sorry if I interrupted you", "I am sorry if I sounded too direct"]),
      speaking("Мне понравилось, как ты всё организовал", "I liked the way you organized everything", ["I liked the way you organized everything", "I appreciated how clearly you explained it", "I noticed how calmly you handled it"]),
      speaking("Давай найдём решение, которое устроит всех", "Let us find a solution that works for everyone", ["Let us find a solution that works for everyone", "Let us choose an option that feels more balanced", "Let us think of an answer that seems fair"]),
      speaking("Я постараюсь выразиться точнее", "I will try to express myself more clearly", ["I will try to express myself more clearly", "I will try to explain my point more simply", "I will try to answer your question more directly"]),
      speaking("Такие разговоры помогают лучше понимать друг друга", "These conversations help us understand each other better", ["These conversations help us understand each other better", "These moments make us feel more comfortable together", "These discussions allow us to share different views"])
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
  },
  {
    title: "B2 Speaking Negotiation",
    description: "Negotiate, compromise and respond diplomatically in spoken English.",
    level: "B2",
    type: "speaking",
    xpReward: 150,
    questions: [
      speaking("Я готов пойти на компромисс, если мы согласуем сроки", "I am willing to compromise if we agree on the timeline", ["I am willing to compromise if we agree on the timeline", "I am planning to cancel the meeting before the deadline", "I am trying to summarize the report before lunch"]),
      speaking("Нам нужно найти решение, которое устроит обе стороны", "We need to find a solution that works for both sides", ["We need to find a solution that works for both sides", "We need to choose a speaker who knows both topics", "We need to explain the problem with more examples"]),
      speaking("С вашей идеей можно согласиться лишь частично", "I can only partly agree with your idea", ["I can only partly agree with your idea", "I can already clearly explain your decision", "I can quickly change the order of the slides"]),
      speaking("Давайте обсудим это более прагматично", "Let us discuss this in a more practical way", ["Let us discuss this in a more practical way", "Let us describe this in a more emotional tone", "Let us repeat this in a more formal style"]),
      speaking("Ваше предложение звучит разумно, но есть риски", "Your proposal sounds reasonable, but there are risks", ["Your proposal sounds reasonable, but there are risks", "Your presentation sounds impressive, but rather long", "Your opinion sounds honest, but very unusual"]),
      speaking("Я бы предпочёл более гибкие условия", "I would prefer more flexible terms", ["I would prefer more flexible terms", "I would prepare more careful notes", "I would repeat more useful phrases"]),
      speaking("Это может привести к ненужным задержкам", "This could lead to unnecessary delays", ["This could lead to unnecessary delays", "This could create a stronger impression", "This could become a useful exercise"]),
      speaking("Если мы разделим задачи, работа пойдёт быстрее", "If we divide the tasks, the work will move faster", ["If we divide the tasks, the work will move faster", "If we review the slides, the idea will sound better", "If we postpone the call, the team will feel calmer"]),
      speaking("Нам важно сохранить профессиональный тон", "It is important for us to maintain a professional tone", ["It is important for us to maintain a professional tone", "It is important for us to remember the final answer", "It is important for us to practice the opening lines"]),
      speaking("Я думаю, нам стоит пересмотреть приоритеты", "I think we should reconsider the priorities", ["I think we should reconsider the priorities", "I think we should describe the details more slowly", "I think we should repeat the previous example"])
    ]
  },
  {
    title: "B2 Speaking Problem Analysis",
    description: "Explain causes, consequences and realistic solutions with clarity.",
    level: "B2",
    type: "speaking",
    xpReward: 150,
    questions: [
      speaking("Основная проблема заключается в недостатке координации", "The main problem lies in the lack of coordination", ["The main problem lies in the lack of coordination", "The final lesson starts with a brief introduction", "The best solution comes from a quick discussion"]),
      speaking("Мы слишком поздно заметили первые признаки", "We noticed the first signs too late", ["We noticed the first signs too late", "We recorded the last part too early", "We repeated the same point too often"]),
      speaking("Ситуация ухудшилась из-за плохой коммуникации", "The situation got worse because of poor communication", ["The situation got worse because of poor communication", "The discussion got calmer because of better planning", "The meeting got shorter because of clear timing"]),
      speaking("Нам нужно выяснить коренную причину", "We need to identify the root cause", ["We need to identify the root cause", "We need to describe the closing remarks", "We need to improve the written summary"]),
      speaking("Это решение может иметь непредвиденные последствия", "This decision may have unintended consequences", ["This decision may have unintended consequences", "This answer may contain unusual expressions", "This version may sound more natural aloud"]),
      speaking("Лучше действовать постепенно, а не резко", "It is better to act gradually rather than abruptly", ["It is better to act gradually rather than abruptly", "It is better to speak formally rather than casually", "It is better to answer directly rather than vaguely"]),
      speaking("Нам нужно опираться на факты, а не на предположения", "We need to rely on facts rather than assumptions", ["We need to rely on facts rather than assumptions", "We need to focus on style rather than grammar", "We need to compare questions rather than answers"]),
      speaking("Если мы проигнорируем это, проблема повторится", "If we ignore this, the problem will happen again", ["If we ignore this, the problem will happen again", "If we discuss this, the project will sound better", "If we rewrite this, the page will feel cleaner"]),
      speaking("Нам стоит подготовить запасной план", "We should prepare a backup plan", ["We should prepare a backup plan", "We should present a longer speech", "We should memorize a stronger phrase"]),
      speaking("Важно оценить ситуацию объективно", "It is important to assess the situation objectively", ["It is important to assess the situation objectively", "It is important to explain the lesson persuasively", "It is important to answer the task immediately"])
    ]
  },
  {
    title: "B2 Speaking Workplace Dialogue",
    description: "Handle meetings, feedback and teamwork in a professional register.",
    level: "B2",
    type: "speaking",
    xpReward: 150,
    questions: [
      speaking("Я хотел бы прояснить наши ожидания на этот квартал", "I would like to clarify our expectations for this quarter", ["I would like to clarify our expectations for this quarter", "I would like to compare our emotions after the lesson", "I would like to shorten our conversation before dinner"]),
      speaking("Нам нужно распределить обязанности более чётко", "We need to assign responsibilities more clearly", ["We need to assign responsibilities more clearly", "We need to repeat the instructions more slowly", "We need to discuss the greeting more politely"]),
      speaking("Я ценю вашу обратную связь, даже если она критическая", "I appreciate your feedback even when it is critical", ["I appreciate your feedback even when it is critical", "I appreciate your support even when it is silent", "I appreciate your answer even when it is brief"]),
      speaking("Давайте сосредоточимся на достижимых целях", "Let us focus on achievable goals", ["Let us focus on achievable goals", "Let us return to familiar phrases", "Let us comment on every detail"]),
      speaking("Эту задачу лучше делегировать человеку с опытом", "This task is better delegated to someone with experience", ["This task is better delegated to someone with experience", "This lesson is better completed with extra notes", "This speech is better repeated with more energy"]),
      speaking("Мне кажется, сроки были изначально нереалистичными", "I think the deadlines were unrealistic from the beginning", ["I think the deadlines were unrealistic from the beginning", "I think the examples were unusual from the textbook", "I think the answers were difficult for the speaker"]),
      speaking("Нам стоит заранее сообщать о возможных рисках", "We should communicate possible risks in advance", ["We should communicate possible risks in advance", "We should summarize the key points in private", "We should memorize the short phrases in class"]),
      speaking("Я предлагаю обсудить это один на один", "I suggest discussing this one on one", ["I suggest discussing this one on one", "I suggest describing this step by step", "I suggest repeating this line by line"]),
      speaking("Команда сработала эффективно в сложных условиях", "The team performed effectively under difficult conditions", ["The team performed effectively under difficult conditions", "The group responded politely during the workshop", "The class progressed steadily through the module"]),
      speaking("Нам нужно выстроить более устойчивый процесс", "We need to build a more sustainable process", ["We need to build a more sustainable process", "We need to choose a more creative answer", "We need to learn a more advanced accent"])
    ]
  },
  {
    title: "B2 Speaking Public Response",
    description: "Respond to questions, defend ideas and sound composed in public settings.",
    level: "B2",
    type: "speaking",
    xpReward: 150,
    questions: [
      speaking("Позвольте мне ответить на этот вопрос поэтапно", "Let me answer that question step by step", ["Let me answer that question step by step", "Let me repeat that sentence word for word", "Let me translate that phrase into Russian"]),
      speaking("Я понимаю вашу обеспокоенность, и она вполне оправданна", "I understand your concern, and it is entirely valid", ["I understand your concern, and it is entirely valid", "I understand your summary, and it is rather brief", "I understand your opinion, and it is mostly formal"]),
      speaking("Важно смотреть на проблему в более широком контексте", "It is important to view the issue in a broader context", ["It is important to view the issue in a broader context", "It is important to hear the answer in a softer tone", "It is important to keep the example in a simpler form"]),
      speaking("Эти данные не дают полной картины", "These data do not provide the full picture", ["These data do not provide the full picture", "These notes do not repeat the main structure", "These words do not improve the final answer"]),
      speaking("Я бы не делал таких поспешных выводов", "I would not jump to such hasty conclusions", ["I would not jump to such hasty conclusions", "I would not return to such easy examples", "I would not react to such formal language"]),
      speaking("Нам нужно различать факты и интерпретации", "We need to distinguish between facts and interpretations", ["We need to distinguish between facts and interpretations", "We need to compare the tasks and translations", "We need to rewrite the hints and sentences"]),
      speaking("Я согласен с направлением, но не с методом", "I agree with the direction but not with the method", ["I agree with the direction but not with the method", "I agree with the speaker but not with the accent", "I agree with the lesson but not with the title"]),
      speaking("Этот аргумент требует более серьёзного обоснования", "This argument requires stronger justification", ["This argument requires stronger justification", "This answer requires calmer pronunciation", "This exercise requires shorter instructions"]),
      speaking("Позвольте мне уточнить, что я имею в виду", "Let me clarify what I mean", ["Let me clarify what I mean", "Let me repeat what I heard", "Let me simplify what I wrote"]),
      speaking("Я постараюсь ответить максимально ясно", "I will try to answer as clearly as possible", ["I will try to answer as clearly as possible", "I will try to speak as quickly as possible", "I will try to memorize as much as possible"])
    ]
  }
];
