import { ch, bd, od, st, ty, nm, some } from "../topicBank.js";
import { shuffle } from "../year1Math/shared.js";
import { fr } from "./shared.js";

/** A short French text, its own 🔊 voice, and a helper for each kind of question about it. */
const text = (title, lines, kind = "story") => {
  const passage = { title, kind, lang: "fr-FR", blocks: lines.map((line) => ({ type: "p", text: line })) };
  return {
    passage,
    ask: (prompt, answer, wrong) => ch(prompt, answer, wrong, { passage }),
    judge: (prompt, trues, falses) => st(prompt, ["True", "False"], [...trues.map((x) => [x, 0]), ...falses.map((x) => [x, 1])], { passage }),
    sequence: (prompt, labels) => od(prompt, labels, { passage }),
    sentence: (prompt, answer) => bd(prompt, answer, { passage }),
    word: (prompt, answer) => ty(prompt, answer, { passage }),
    count: (prompt, answer) => nm(prompt, answer, { passage }),
  };
};
/** One entry that gives a text's questions in a random order. */
const many = (questions) => (rng) => shuffle(rng, questions);

const t1 = text("Léa", ["Je m'appelle Léa. J'ai dix ans. J'habite à Londres. J'ai un chien. Il s'appelle Max."]);
const t2 = text("Ma famille", ["Voici ma famille. Mon père s'appelle Paul. Ma mère s'appelle Claire. J'ai un frère et une sœur. Mon frère a huit ans."]);
const t3 = text("Aujourd'hui", ["Aujourd'hui, il fait beau. Il y a du soleil. Je joue au football dans le parc avec mon ami Tom."]);
const t4 = text("Au café", ["Au café, Tom dit : « Je voudrais un jus d'orange, s'il vous plaît. » Léa dit : « Je voudrais une glace. » Le jus d'orange coûte deux euros."]);
const t5 = text("À l'école", ["Ma matière préférée est le sport. J'aime la musique. Je n'aime pas les maths. C'est difficile."]);
const t6 = text("Mon frère Paul", ["Mon frère Paul a douze ans. Il aime le sport. Le samedi, il joue au tennis et le dimanche, il fait du vélo. Il n'aime pas les maths."]);
const t7 = text("Ma ville", ["Ma ville s'appelle Lyon. Il y a un grand parc et une piscine. La gare est près de l'école. Le cinéma est à côté de la poste."]);
const t8 = text("Les saisons", ["En hiver, il fait froid et il neige. Je porte un manteau, une écharpe et des gants. En été, il fait chaud. Je porte un tee-shirt et une casquette."]);
const t9 = text("À la maison", ["Léa est dans la cuisine. Elle mange du pain et du fromage. Elle boit du lait. Elle regarde la télé."]);
const t10 = text("Mon anniversaire", ["Mon anniversaire est le quinze mars. J'ai dix ans. Je mange un gâteau au chocolat avec mes amis."]);
const day = text("Ma journée", ["Le matin, je mange du pain. L'après-midi, je joue au football. Le soir, je regarde la télé. La nuit, je dors."], "diary");
const week = text("Le temps", ["Le lundi, il pleut. Le mardi, il y a du vent. Le mercredi, il fait beau."], "diary");
const t11 = text("Une lettre", ["Salut Tom !", "Je m'appelle Chloé et j'ai dix ans. J'habite à Marseille. J'aime lire et dessiner. Je n'aime pas le sport. Ma couleur préférée est le violet. Et toi ?"], "letter");
const t12 = text("Au restaurant", ["Client : Bonjour ! Je voudrais une soupe et du pain, s'il vous plaît.", "Serveur : Voilà.", "Client : C'est combien ?", "Serveur : Cinq euros."], "diary");
const t13 = text("Le journal du temps", ["Lundi : il pleut.", "Mardi : il y a du vent.", "Mercredi : il fait beau et il y a du soleil.", "Jeudi : il neige !", "Vendredi : il fait froid."], "diary");
const t14 = text("Pour aller à la bibliothèque", ["Allez tout droit. Tournez à gauche. La bibliothèque est en face du parc, à côté de la poste."], "diary");
const t15 = text("Nous sommes quatre", ["Nous sommes quatre dans ma famille. Mon père joue de la guitare. Ma mère fait de la natation. Mon frère déteste le sport mais il adore lire. Moi, je regarde la télé."]);

const level1 = [
  many([
    t1.ask("What is the girl called?", "Léa", ["Max", "Claire", "Louise"]),
    t1.ask("How old is Léa?", "Ten years old", ["Nine years old", "Eleven years old", "Twelve years old"]),
    t1.ask("Where does Léa live?", "In London", ["In Paris", "In Lyon", "In Marseille"]),
    t1.ask("What pet has Léa got?", "A dog", ["A cat", "A rabbit", "A fish"]),
    t1.ask("What is the pet called?", "Max", ["Tom", "Paul", "Louis"]),
  ]),
  many([
    t2.ask("Who is Paul?", "The writer's father", ["The writer's mother", "The writer's brother", "The writer's uncle"]),
    t2.ask("Who is Claire?", "The writer's mother", ["The writer's father", "The writer's sister", "The writer's aunt"]),
    t2.ask("How many brothers and sisters has the writer got?", "One brother and one sister", ["Two brothers", "One sister only", "Two sisters"]),
    t2.ask("How old is the writer's brother?", "Eight", ["Six", "Nine", "Ten"]),
  ]),
  many([
    t3.ask("What is the weather like?", "Nice and sunny", ["Cold and snowy", "Rainy", "Windy and foggy"]),
    t3.ask("What does the writer play?", "Football", ["Tennis", "The piano", "The guitar"]),
    t3.ask("Where does the writer play?", "In the park", ["At school", "At the cinema", "At the swimming pool"]),
    t3.ask("Who does the writer play with?", "Tom", ["Paul", "Max", "Léa"]),
  ]),
  many([
    t4.ask("What does Tom want?", "An orange juice", ["A milk", "A water", "An ice cream"]),
    t4.ask("What does Léa want?", "An ice cream", ["A cake", "Some bread", "An orange juice"]),
    t4.ask("How much is the orange juice?", "Two euros", ["One euro", "Three euros", "Ten euros"]),
  ]),
  many([
    t5.ask("What is the writer's favourite subject?", "PE", ["Maths", "Music", "History"]),
    t5.ask("Which subject does the writer like?", "Music", ["Maths", "History", "Science"]),
    t5.ask("Which subject does the writer not like?", "Maths", ["Music", "PE", "Art"]),
    t5.ask("What does the writer say about maths?", "It is difficult", ["It is boring", "It is fun", "It is easy"]),
  ]),
];

const level2 = [
  many([
    t6.ask("What does Paul play on Saturday?", "Tennis", ["Football", "Basketball", "The guitar"]),
    t6.ask("What does Paul do on Sunday?", "He goes cycling", ["He plays tennis", "He reads", "He dances"]),
    t6.ask("What does Paul not like?", "Maths", ["Sport", "Tennis", "Cycling"]),
    t6.ask("Who is Paul?", "The writer's brother", ["The writer's father", "The writer's friend", "The writer's uncle"]),
    t6.ask("How old is Paul?", "Twelve", ["Ten", "Eleven", "Thirteen"]),
  ]),
  many([
    t7.ask("What is near the school?", "The station", ["The swimming pool", "The post office", "The cinema"]),
    t7.ask("What is next to the post office?", "The cinema", ["The park", "The school", "The station"]),
    t7.ask("What is in the town?", "A big park and a swimming pool", ["A castle and a library", "A bakery and a zoo", "A beach and a castle"]),
    t7.ask("What is the town called?", "Lyon", ["Paris", "Nice", "London"]),
  ]),
  many([
    t8.ask("What does the writer wear in winter?", "A coat, a scarf and gloves", ["A T-shirt and a cap", "A dress and shoes", "A hat and socks"]),
    t8.ask("What does the writer wear in summer?", "A T-shirt and a cap", ["A coat and gloves", "A scarf and a hat", "Trousers and boots"]),
    t8.ask("When does it snow?", "In winter", ["In summer", "In spring", "In autumn"]),
    t8.ask("What is the weather like in summer?", "Hot", ["Cold", "Snowy", "Rainy"]),
  ]),
  many([
    t9.ask("Where is Léa?", "In the kitchen", ["In the garden", "At school", "In the park"]),
    t9.ask("What does Léa drink?", "Milk", ["Water", "Orange juice", "Tea"]),
    t9.ask("What does Léa watch?", "TV", ["A book", "A game", "A film at the cinema"]),
    t9.ask("What does Léa eat?", "Bread and cheese", ["Soup and rice", "Chicken and chips", "Cake and ice cream"]),
  ]),
  many([
    t10.ask("When is the birthday?", "15 March", ["15 May", "12 March", "16 March"]),
    t10.ask("How old is the writer?", "Ten", ["Nine", "Eleven", "Twelve"]),
    t10.ask("What does the writer eat?", "A chocolate cake", ["An ice cream", "Some soup", "An apple"]),
    t10.ask("Who is with the writer?", "Friends", ["A teacher", "Nobody", "A dog"]),
  ]),
];

const level3 = [
  t1.judge("Are the sentences true or false?", ["Léa is ten", "Léa has a dog", "Léa lives in London"], ["Léa has a cat", "Léa is eleven", "Léa lives in Paris"]),
  t2.judge("Are the sentences true or false?", ["The father is called Paul", "There is a sister", "The brother is eight"], ["There are two brothers", "The brother is ten", "The father is called Claire"]),
  t3.judge("Are the sentences true or false?", ["The weather is nice", "The writer plays football", "Tom is a friend"], ["It is snowing", "The writer plays tennis", "The game is at school"]),
  t6.judge("Are the sentences true or false?", ["Paul is twelve", "Paul plays tennis on Saturday", "Paul goes cycling on Sunday"], ["Paul likes maths", "Paul plays football on Saturday", "Paul is ten"]),
  t7.judge("Are the sentences true or false?", ["Lyon has a big park", "The station is near the school", "The cinema is next to the post office"], ["The station is far from the school", "Lyon has no swimming pool", "The park is small"]),
  t8.judge("Are the sentences true or false?", ["It snows in winter", "The writer wears gloves in winter", "It is hot in summer"], ["It is hot in winter", "The writer wears a coat in summer", "The writer wears a cap in winter"]),
  t9.judge("Are the sentences true or false?", ["Léa eats bread", "Léa drinks milk", "Léa watches TV"], ["Léa drinks water", "Léa is at school", "Léa eats chicken"]),
  t10.judge("Are the sentences true or false?", ["The birthday is in March", "The writer is ten", "There is a chocolate cake"], ["The birthday is in May", "The writer is twelve", "The writer eats an ice cream"]),
  day.sequence("Put the day in order, from morning to night. (le matin = morning, l'après-midi = afternoon, le soir = evening, la nuit = night)", ["I eat bread", "I play football", "I watch TV", "I sleep"]),
  week.sequence("Put the weather in order, from Monday to Wednesday.", ["Rain", "Wind", "Sunshine"]),
  t1.sentence("Build the sentence from the text that tells you where Léa lives.", "J'habite à Londres."),
  t1.sentence("Build the sentence from the text that says: He is called Max.", "Il s'appelle Max."),
  t2.sentence("Build the sentence from the text that says: My father is called Paul.", "Mon père s'appelle Paul."),
  t4.sentence("Build the sentence from the text that says: I would like an ice cream.", "Je voudrais une glace."),
  t5.sentence("Build the sentence from the text that says: I do not like maths.", "Je n'aime pas les maths."),
  t7.sentence("Build the sentence from the text that says: The station is near the school.", "La gare est près de l'école."),
  t8.sentence("Build the sentence from the text that says: I wear a coat, a scarf and gloves.", "Je porte un manteau, une écharpe et des gants."),
  t9.sentence("Build the sentence from the text that says: She drinks milk.", "Elle boit du lait."),
  t10.sentence("Build the sentence from the text that says: I am ten.", "J'ai dix ans."),
];

const level4 = [
  many([
    t11.ask("Where does Chloé live?", "In Marseille", ["In Paris", "In Lyon", "In Nice"]),
    t11.ask("What are Chloé's hobbies?", "Reading and drawing", ["Reading and swimming", "Singing and drawing", "Cooking and dancing"]),
    t11.word("Type the French word for Chloé's favourite colour.", "violet"),
    t11.ask("What does Chloé say about sport?", "She does not like it", ["She loves it", "She plays it every day", "She likes it a little"]),
  ]),
  many([
    t12.ask("What does the customer order?", "Soup and bread", ["Cake and milk", "Chicken and chips", "Juice and ice cream"]),
    t12.count("How many euros does it cost?", 5),
    t12.ask("What does the customer ask?", "How much it costs", ["Where the station is", "What time it is", "What the weather is like"]),
    t12.word("Type the French word the waiter uses for the number five.", "cinq"),
  ]),
  many([
    t13.word("Type the French day when it snows.", "jeudi"),
    t13.ask("What is the weather on Monday?", "Rain", ["Sun", "Wind", "Snow"]),
    t13.ask("Which day is sunny?", "Wednesday", ["Tuesday", "Thursday", "Friday"]),
    t13.ask("What is the weather on Tuesday?", "Windy", ["Rainy", "Snowy", "Sunny"]),
  ]),
  many([
    t14.ask("What do you do first?", "Go straight on", ["Turn left", "Turn right", "Cross the park"]),
    t14.ask("What do you do next?", "Turn left", ["Turn right", "Go straight on", "Go home"]),
    t14.ask("What is opposite the library?", "The park", ["The post office", "The station", "The school"]),
    t14.ask("What is next to the library?", "The post office", ["The park", "The station", "The cinema"]),
  ]),
  many([
    t15.count("How many people are in the family?", 4),
    t15.ask("Who plays the guitar?", "The father", ["The mother", "The brother", "The writer"]),
    t15.ask("What does the mother do?", "She goes swimming", ["She plays the guitar", "She reads", "She watches TV"]),
    t15.ask("What does the brother love?", "Reading", ["Sport", "Swimming", "TV"]),
  ]),
];

export const readingShortTexts = {
  rule: "Read the French once for the main idea, then look for key words. You will know many of them: names, numbers, family words, food, weather and places.",
  hint: "Find the key word from the question in the French text, then read the words around it.",
  levels: { 1: level1, 2: level2, 3: level3, 4: level4 },
};

/* ---------- building and translating sentences ---------- */
// [french, english, a word to type]
const SENTENCES = [
  ["Je mange du pain.", "I eat bread.", "pain"], ["Elle joue au tennis.", "She plays tennis.", "tennis"], ["Nous habitons à Londres.", "We live in London.", "habitons"],
  ["Il a un petit chien.", "He has a small dog.", "petit"], ["Tu aimes les pommes ?", "Do you like apples?", "pommes"], ["Ma sœur est grande.", "My sister is tall.", "grande"],
  ["Le chat ne mange pas de poisson.", "The cat does not eat fish.", "poisson"], ["Ils vont à la piscine.", "They go to the swimming pool.", "piscine"], ["Vous êtes dans le jardin.", "You are in the garden.", "jardin"],
  ["J'ai une robe rouge.", "I have a red dress.", "rouge"], ["Où est ta maison ?", "Where is your house?", "maison"], ["Il fait froid en hiver.", "It is cold in winter.", "froid"],
  ["Mon frère fait du vélo.", "My brother goes cycling.", "frere"], ["Nous regardons la télé le soir.", "We watch TV in the evening.", "regardons"], ["Je n'aime pas les maths.", "I do not like maths.", "maths"],
  ["La boulangerie est près du parc.", "The bakery is near the park.", "parc"], ["Elles chantent bien.", "They sing well.", "chantent"], ["Il y a du soleil aujourd'hui.", "It is sunny today.", "soleil"],
].filter((s) => s[2] !== "frere");
const frWords = [...new Set(SENTENCES.flatMap((s) => s[0].split(" ")))];
const otherEnglish = (rng, s, n) => some(rng, SENTENCES.map((x) => x[1]), n, [s[1]]);
const otherFrench = (rng, s, n) => some(rng, SENTENCES.map((x) => x[0]), n, [s[0]]);
const KIND_BINS = ["A statement", "A question", "A negative sentence"];
const kindOf = (f) => (f.includes("?") ? 1 : f.includes(" ne ") || f.includes(" n'") ? 2 : 0);
const kindSort = st("What kind of sentence is it?", KIND_BINS, SENTENCES.map(([f]) => [f, kindOf(f)]));

export const buildingSentences = {
  rule: "Put a French sentence together like this: who (the subject), what they do (the verb), then the rest. Questions end in a question mark, and a negative sentence has ne … pas around the verb.",
  hint: "Find the subject and the verb first, then add the rest of the words.",
  levels: {
    1: SENTENCES.map((s) => (rng) => ch(`What does this sentence mean? **${s[0]}**`, s[1], otherEnglish(rng, s, 3), fr(s[0]))),
    2: [
      ...SENTENCES.map((s) => (rng) => ch(`How do you say it in French? **${s[1]}**`, s[0], otherFrench(rng, s, 3))),
      kindSort,
    ],
    3: [
      ...SENTENCES.map((s) => bd(`Build the French for: **${s[1]}**`, s[0])),
      kindSort,
    ],
    4: [
      ...SENTENCES.map((s) => (rng) => bd(`Translate into French: **${s[1]}**`, s[0], { more: some(rng, frWords, 2, s[0].split(" ")) })),
      ...SENTENCES.map((s) => ty(`Type the missing French word. English: ${s[1]}`, s[2], { sentence: s[0].replace(s[2], "___") })),
    ],
  },
};
