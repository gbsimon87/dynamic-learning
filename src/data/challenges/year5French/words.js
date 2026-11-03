import { ch, nm, od, st, some } from "../topicBank.js";
import { fr, wordTopic } from "./shared.js";

const pairs = (rows, bin) => rows.map((r) => [r[0], bin]);

/* ---------- greetings and family ---------- */
const GREET = [["bonjour", "hello", "👋"], ["bonsoir", "good evening", "🌆"], ["bonne nuit", "good night", "🌙"], ["au revoir", "goodbye"], ["merci", "thank you", "🙏"], ["oui", "yes", "✅"], ["non", "no", "❌"], ["ça va bien", "I am well"], ["je m'appelle", "my name is"], ["enchanté", "pleased to meet you"]];
const FAMILY = [["la mère", "mother", "👩"], ["le père", "father", "👨"], ["le frère", "brother", "👦"], ["la sœur", "sister", "👧"], ["la grand-mère", "grandmother", "👵"], ["le grand-père", "grandfather", "👴"], ["l'oncle", "uncle"], ["la tante", "aunt"], ["le bébé", "baby", "👶"]];
export const greetingsAndFamily = wordTopic({
  rule: "Say bonjour in the day, bonsoir in the evening and bonne nuit at bedtime. To say your name, say je m'appelle. Family words have le for a man and la for a woman.",
  hint: "Think about when you would say it, or whether it is a man or a woman.",
  groups: [GREET, FAMILY],
  builds: [["Je m'appelle Léa.", "My name is Léa."], ["Comment tu t'appelles ?", "What are you called?"], ["J'ai dix ans.", "I am ten years old."], ["J'habite à Londres.", "I live in London."], ["Voici ma mère.", "Here is my mother."], ["Voici mon père.", "Here is my father."], ["J'ai un frère.", "I have a brother."], ["J'ai une sœur.", "I have a sister."], ["Mon oncle s'appelle Paul.", "My uncle is called Paul."], ["Ma tante habite à Paris.", "My aunt lives in Paris."], ["Le bébé s'appelle Louis.", "The baby is called Louis."], ["Ma grand-mère est petite.", "My grandmother is small."]],
  sorts: [
    st("Is it a greeting or a family word?", ["Greeting or polite word", "Family word"], [...pairs(GREET.slice(0, 5), 0), ...pairs(FAMILY, 1)]),
    st("Is it a man or a woman?", ["A man", "A woman"], [["le père", 0], ["le frère", 0], ["l'oncle", 0], ["le grand-père", 0], ["la mère", 1], ["la sœur", 1], ["la tante", 1], ["la grand-mère", 1]]),
  ],
  orders: [
    od("Put the greetings in order through the day, morning first.", ["Bonjour", "Bonsoir", "Bonne nuit"]),
    od("Put this chat in order.", ["Bonjour !", "Comment tu t'appelles ?", "Je m'appelle Léa.", "Enchanté, Léa.", "Au revoir !"]),
  ],
  applied: [
    ch("Someone asks **Comment tu t'appelles ?** What do you answer?", "Je m'appelle Léa.", ["J'ai dix ans.", "J'habite à Paris.", "Voici ma mère."], fr("Comment tu t'appelles ?")),
    ch("Someone asks **Quel âge as-tu ?** What do you answer?", "J'ai dix ans.", ["Je m'appelle Léa.", "J'habite à Paris.", "Voici ma mère."], fr("Quel âge as-tu ?")),
    ch("Someone asks **Où habites-tu ?** What do you answer?", "J'habite à Londres.", ["J'ai dix ans.", "Je m'appelle Léa.", "J'ai un frère."], fr("Où habites-tu ?")),
    ch("You are leaving. What do you say?", "Au revoir", ["Bonjour", "Enchanté", "Merci"]),
  ],
});

/* ---------- numbers ---------- */
const UNITS = ["zéro", "un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf", "dix", "onze", "douze", "treize", "quatorze", "quinze", "seize", "dix-sept", "dix-huit", "dix-neuf"];
const TENS = ["", "", "vingt", "trente", "quarante", "cinquante", "soixante"];
export function numberWord(n) {
  if (n < 20) return UNITS[n];
  if (n === 100) return "cent";
  const t = Math.floor(n / 10);
  const u = n % 10;
  if (t <= 6) return u === 0 ? TENS[t] : u === 1 ? `${TENS[t]} et un` : `${TENS[t]}-${UNITS[u]}`;
  if (t === 7) return n === 71 ? "soixante et onze" : `soixante-${UNITS[n - 60]}`;
  if (t === 8) return u === 0 ? "quatre-vingts" : `quatre-vingt-${UNITS[u]}`;
  return `quatre-vingt-${UNITS[10 + u]}`;
}
const intIn = (rng, lo, hi) => lo + Math.floor(rng() * (hi - lo + 1));
const near = (n, extras = []) => [...new Set([n + 1, n - 1, n + 10, n - 10, ...extras])].filter((x) => x >= 1 && x <= 100 && x !== n);
const L1_NUMBERS = [...Array.from({ length: 20 }, (_, i) => i + 1), 30, 40, 50, 60, 100];
const L2_NUMBERS = [21, 22, 25, 31, 33, 37, 41, 44, 48, 52, 55, 59, 61, 66, 68, 71, 73, 77, 79, 80, 82, 85, 91, 94, 99];
const repeat = (templates, times) => Array.from({ length: times }, () => templates).flat();
const swapDigits = (n) => (n >= 10 && n < 100 && n % 10 !== 0 ? Number(String(n).split("").reverse().join("")) : null);
const NUM_BINS = ["Under 20", "20 to 69", "70 to 100"];
const numBin = (n) => (n < 20 ? 0 : n < 70 ? 1 : 2);
const SORT_NUMBERS = [3, 8, 12, 17, 24, 31, 42, 56, 65, 68, 72, 77, 80, 85, 91, 96];

export const numbersTo100 = {
  rule: "French counts 1 to 16 with words of their own, then 17, 18, 19 are dix-sept, dix-huit, dix-neuf. Tens: vingt, trente, quarante, cinquante, soixante. Then it gets tricky: 70 is soixante-dix (60 + 10) and 80 is quatre-vingts (4 × 20).",
  hint: "Break the long number into parts: soixante-douze is 60 + 12.",
  levels: {
    1: L1_NUMBERS.map((n) => (rng) => ch(`What number is **${numberWord(n)}**?`, String(n), some(rng, near(n, [swapDigits(n)].filter(Boolean)), 3).map(String), fr(numberWord(n)))),
    2: [
      ...L2_NUMBERS.map((n) => (rng) => ch(`How do you say **${n}** in French?`, numberWord(n), some(rng, near(n), 3).map(numberWord))),
      st("Sort the French numbers by size.", NUM_BINS, SORT_NUMBERS.map((n) => [numberWord(n), numBin(n)])),
      st("Odd or even? Sort the French numbers.", ["Odd", "Even"], SORT_NUMBERS.map((n) => [numberWord(n), n % 2])),
    ],
    3: [
      ...Array.from({ length: 14 }, () => (rng) => { const n = intIn(rng, 21, 99); return nm(`Write the number: **${numberWord(n)}**`, n, { ...fr(numberWord(n)) }); }),
      ...Array.from({ length: 6 }, () => (rng) => {
        const set = new Set();
        while (set.size < 4) set.add(intIn(rng, 1, 100));
        const sorted = [...set].sort((a, b) => a - b);
        return od("Put these French numbers in order, smallest first.", sorted.map(numberWord));
      }),
      st("Sort the French numbers by size.", NUM_BINS, SORT_NUMBERS.map((n) => [numberWord(n), numBin(n)])),
    ],
    4: repeat([
      (rng) => { const a = intIn(rng, 2, 40); const b = intIn(rng, 2, 40); return nm(`**${numberWord(a)}** plus **${numberWord(b)}** equals what? Write the number.`, a + b); },
      (rng) => { const a = intIn(rng, 30, 99); const b = intIn(rng, 2, 29); return nm(`**${numberWord(a)}** moins **${numberWord(b)}** (take away) equals what? Write the number.`, a - b); },
      (rng) => { const n = intIn(rng, 21, 99); return nm(`Un livre coûte **${numberWord(n)}** euros. How many euros is that?`, n); },
      (rng) => { const n = intIn(rng, 21, 99); return nm(`Tom dit : « J'ai **${numberWord(n)}** billes. » How many marbles has Tom?`, n); },
      (rng) => { const n = intIn(rng, 61, 99); return nm(`La page **${numberWord(n)}** : which page number is it?`, n); },
    ], 4),
  },
};

/* ---------- days, months, weather and seasons ---------- */
const DAYS = [["lundi", "Monday"], ["mardi", "Tuesday"], ["mercredi", "Wednesday"], ["jeudi", "Thursday"], ["vendredi", "Friday"], ["samedi", "Saturday"], ["dimanche", "Sunday"]];
const MONTHS = [["janvier", "January"], ["février", "February"], ["mars", "March"], ["avril", "April"], ["mai", "May"], ["juin", "June"], ["juillet", "July"], ["août", "August"], ["septembre", "September"], ["octobre", "October"], ["novembre", "November"], ["décembre", "December"]];
const WEATHER = [["il pleut", "it is raining", "☔"], ["il neige", "it is snowing", "❄️"], ["il fait chaud", "it is hot"], ["il fait froid", "it is cold"], ["il fait beau", "the weather is nice"], ["il y a du soleil", "it is sunny", "☀️"], ["il y a du vent", "it is windy", "💨"], ["il y a du brouillard", "it is foggy", "🌫️"], ["il y a des nuages", "it is cloudy", "☁️"]];
const SEASONS = [["le printemps", "spring", "🌷"], ["l'été", "summer", "🏖️"], ["l'automne", "autumn", "🍂"], ["l'hiver", "winter", "⛄"]];
const slice = (list, rng, n) => { const at = intIn(rng, 0, list.length - n); return list.slice(at, at + n).map((r) => r[0]); };
const sky = (emoji, label, answer, wrong) => ch(`Quel temps fait-il ? ${emoji} (${label})`, answer, wrong, { picture: emoji, pictureLabel: label });
export const daysMonthsAndWeather = wordTopic({
  rule: "The days (lundi, mardi…) and months (janvier, février…) start with a small letter in French. For weather, say il fait for hot, cold and nice, il y a du for wind and sun, and il pleut or il neige for rain and snow. Say en for most seasons: en été, en automne, en hiver, but au printemps.",
  hint: "Say the days or months in a row until you reach the one you need.",
  groups: [DAYS, MONTHS, WEATHER, SEASONS],
  builds: [["Aujourd'hui, c'est lundi.", "Today is Monday."], ["Mon anniversaire est en mai.", "My birthday is in May."], ["Il fait chaud en été.", "It is hot in summer."], ["Il neige en hiver.", "It snows in winter."], ["Il fait froid en janvier.", "It is cold in January."], ["Aujourd'hui il fait beau.", "Today the weather is nice."], ["Il y a du vent aujourd'hui.", "It is windy today."], ["Le samedi je joue au football.", "On Saturdays I play football."], ["Il y a du soleil en juillet.", "It is sunny in July."], ["Il y a du brouillard en automne.", "It is foggy in autumn."], ["Au printemps il pleut.", "In spring it rains."], ["Le dimanche je suis à la maison.", "On Sundays I am at home."]],
  sorts: [
    st("Day, month or season?", ["A day", "A month", "A season"], [...pairs(DAYS, 0), ...pairs(MONTHS, 1), ...pairs(SEASONS, 2)]),
    st("Weekday or weekend?", ["Weekday", "Weekend"], [...DAYS.slice(0, 5).map((d) => [d[0], 0]), ["samedi", 1], ["dimanche", 1]]),
  ],
  orders: [
    (rng) => od("Put the days in order.", slice(DAYS, rng, 4)),
    (rng) => od("Put the months in order.", slice(MONTHS, rng, 5)),
    od("Put the seasons in order, starting with spring.", SEASONS.map((s) => s[0])),
  ].map((entry) => (typeof entry === "function" ? entry : () => entry)),
  applied: [
    ...DAYS.slice(0, 6).map(([d, , ], i) => ch(`Which day comes after **${d}**?`, DAYS[i + 1][0], DAYS.filter((_, j) => j !== i + 1 && j !== i).slice(0, 3).map((x) => x[0]), fr(d))),
    ...MONTHS.slice(0, 11).map(([m], i) => ch(`Which month comes after **${m}**?`, MONTHS[i + 1][0], MONTHS.filter((_, j) => ![i, i + 1].includes(j)).slice(i % 3, (i % 3) + 3).map((x) => x[0]), fr(m))),
    sky("☀️", "sun shining", "Il y a du soleil", ["Il neige", "Il pleut", "Il y a du brouillard"]),
    sky("❄️", "snow falling", "Il neige", ["Il y a du soleil", "Il y a du vent", "Il fait chaud"]),
    sky("☔", "rain falling", "Il pleut", ["Il y a du soleil", "Il neige", "Il y a du vent"]),
    sky("💨", "strong wind", "Il y a du vent", ["Il pleut", "Il neige", "Il y a du soleil"]),
  ],
});

/* ---------- food and ordering ---------- */
const FOOD = [["le pain", "bread", "🥖"], ["le fromage", "cheese", "🧀"], ["le lait", "milk", "🥛"], ["le jus d'orange", "orange juice", "🧃"], ["l'eau", "water", "💧"], ["la pomme", "apple", "🍎"], ["la banane", "banana", "🍌"], ["la fraise", "strawberry", "🍓"], ["le poulet", "chicken", "🍗"], ["les frites", "chips", "🍟"], ["la glace", "ice cream", "🍦"], ["le gâteau", "cake", "🍰"], ["le chocolat", "chocolate", "🍫"], ["la soupe", "soup", "🍲"], ["le riz", "rice", "🍚"], ["l'œuf", "egg", "🥚"]];
const ASK = [["je voudrais", "I would like"], ["s'il vous plaît", "please"], ["l'addition", "the bill"], ["c'est combien ?", "how much is it?"], ["voilà", "here you are"]];
export const foodAndOrdering = wordTopic({
  rule: "To order politely say je voudrais (I would like) and finish with s'il vous plaît. Use du for some bread or cheese, de la for some soup, and de l' before a vowel: du pain, de la soupe, de l'eau.",
  hint: "Picture the food on a plate, or imagine you are ordering in a café.",
  groups: [FOOD, ASK],
  builds: [["Je voudrais un gâteau, s'il vous plaît.", "I would like a cake, please."], ["Je voudrais de l'eau, s'il vous plaît.", "I would like some water, please."], ["Je voudrais du pain.", "I would like some bread."], ["Je voudrais une glace.", "I would like an ice cream."], ["Je mange une pomme.", "I am eating an apple."], ["J'aime le chocolat.", "I like chocolate."], ["Je n'aime pas le poisson.", "I do not like fish."], ["Le poulet est bon.", "The chicken is good."], ["Je bois du lait.", "I drink some milk."], ["Tu veux des frites ?", "Do you want some chips?"], ["L'addition, s'il vous plaît.", "The bill, please."], ["C'est combien ?", "How much is it?"], ["Je prends une banane.", "I am having a banana."]],
  sorts: [
    st("Is it a food or a drink?", ["A drink", "Food"], [["le lait", 0], ["l'eau", 0], ["le jus d'orange", 0], ["le pain", 1], ["le fromage", 1], ["la pomme", 1], ["le poulet", 1], ["les frites", 1]]),
    st("Sort the food.", ["Fruit", "Sweet treat", "Savoury"], [["la pomme", 0], ["la banane", 0], ["la fraise", 0], ["la glace", 1], ["le gâteau", 1], ["le chocolat", 1], ["le fromage", 2], ["le poulet", 2], ["la soupe", 2], ["le riz", 2]]),
  ],
  orders: [od("Put this café chat in order.", ["Bonjour, monsieur.", "Je voudrais un jus d'orange, s'il vous plaît.", "C'est combien ?", "Merci, au revoir !"])],
  applied: [
    ch("You want to ask for the bill. What do you say?", "L'addition, s'il vous plaît.", ["Je voudrais du pain.", "Bonne nuit.", "Il pleut."]),
    ch("How do you ask how much something costs?", "C'est combien ?", ["Je voudrais un gâteau.", "Voilà.", "J'aime le chocolat."]),
    ch("Which sentence says that you **like** chocolate?", "J'aime le chocolat.", ["Je déteste le chocolat.", "Je n'aime pas le chocolat.", "Je voudrais l'addition."]),
    ch("Which sentence is a polite way to ask for some water?", "Je voudrais de l'eau, s'il vous plaît.", ["Je déteste l'eau.", "L'eau est froide.", "J'ai de l'eau."]),
  ],
});

/* ---------- school and town ---------- */
const THINGS = [["le stylo", "pen", "🖊️"], ["le cahier", "exercise book", "📓"], ["le livre", "book", "📖"], ["la règle", "ruler", "📏"], ["la gomme", "rubber"], ["le sac", "schoolbag", "🎒"], ["la trousse", "pencil case"], ["le crayon", "pencil", "✏️"], ["l'ordinateur", "computer", "💻"]];
const SUBJECTS = [["les maths", "maths"], ["le français", "French"], ["l'anglais", "English"], ["les sciences", "science"], ["l'histoire", "history"], ["la géographie", "geography"], ["le sport", "PE"], ["la musique", "music"]];
const PLACES = [["la bibliothèque", "library"], ["la boulangerie", "bakery"], ["la piscine", "swimming pool", "🏊"], ["le parc", "park", "🌳"], ["le cinéma", "cinema", "🎬"], ["la gare", "station", "🚉"], ["la poste", "post office"], ["le supermarché", "supermarket", "🛒"], ["le château", "castle", "🏰"]];
const WAYS = [["tout droit", "straight on"], ["à gauche", "on the left"], ["à droite", "on the right"], ["près de", "near"], ["loin de", "far from"], ["en face de", "opposite"], ["à côté de", "next to"]];
const go = (fra, answer, wrong) => ch(`Someone says **${fra}** Which way do you go?`, answer, wrong, fr(fra));
export const schoolAndTown = wordTopic({
  rule: "À gauche is left and à droite is right; tout droit is straight on. To ask where something is, say où est…? and to give directions say tournez (turn) or allez (go). À + le becomes au, and de + le becomes du: près du parc.",
  hint: "For directions, picture a map and say left, right or straight on out loud.",
  groups: [THINGS, SUBJECTS, PLACES, WAYS],
  builds: [["J'ai un stylo dans ma trousse.", "I have a pen in my pencil case."], ["Le livre est dans le sac.", "The book is in the bag."], ["J'aime les maths.", "I like maths."], ["Ma matière préférée est le sport.", "My favourite subject is PE."], ["La bibliothèque est à gauche.", "The library is on the left."], ["La piscine est à droite.", "The swimming pool is on the right."], ["Allez tout droit.", "Go straight on."], ["Tournez à gauche.", "Turn left."], ["Le parc est près de l'école.", "The park is near the school."], ["La poste est à côté de la gare.", "The post office is next to the station."], ["Le cinéma est en face du parc.", "The cinema is opposite the park."], ["Où est la piscine ?", "Where is the swimming pool?"]],
  sorts: [
    st("Sort the words.", ["In my school bag", "A school subject", "A place in town"], [["le stylo", 0], ["le cahier", 0], ["la règle", 0], ["le crayon", 0], ["les maths", 1], ["l'histoire", 1], ["la musique", 1], ["la gare", 2], ["la piscine", 2], ["le cinéma", 2]]),
    st("Is it a thing in a classroom or a place in town?", ["In the classroom", "In town"], [["le stylo", 0], ["le livre", 0], ["la gomme", 0], ["la bibliothèque", 1], ["la boulangerie", 1], ["le parc", 1], ["la poste", 1]]),
  ],
  orders: [od("Put this conversation in order.", ["Excusez-moi, où est la bibliothèque ?", "Allez tout droit.", "Tournez à gauche.", "Merci beaucoup !"])],
  applied: [
    go("Tournez à gauche.", "Left", ["Right", "Straight on", "Back to school"]),
    go("Tournez à droite.", "Right", ["Left", "Straight on", "Back to school"]),
    go("Allez tout droit.", "Straight on", ["Left", "Right", "Back to school"]),
    ch("Where do you go to borrow a book?", "la bibliothèque", ["la piscine", "la boulangerie", "la gare"]),
    ch("Where do you go to buy bread?", "la boulangerie", ["la bibliothèque", "la piscine", "la gare"]),
    ch("Where do you go to swim?", "la piscine", ["la bibliothèque", "la boulangerie", "la poste"]),
    ch("Where do you go to catch a train?", "la gare", ["la piscine", "la bibliothèque", "le cinéma"]),
    ch("Where do you go to watch a film?", "le cinéma", ["la poste", "la boulangerie", "la gare"]),
  ],
});

/* ---------- hobbies and opinions ---------- */
const HOBBIES = [["jouer au football", "play football", "⚽"], ["jouer au tennis", "play tennis", "🎾"], ["jouer du piano", "play the piano", "🎹"], ["jouer de la guitare", "play the guitar", "🎸"], ["faire du vélo", "go cycling", "🚴"], ["faire de la natation", "go swimming", "🏊"], ["faire de la danse", "do dance", "💃"], ["lire", "read", "📖"], ["chanter", "sing", "🎤"], ["dessiner", "draw", "🎨"], ["regarder la télé", "watch TV", "📺"], ["écouter de la musique", "listen to music", "🎧"], ["cuisiner", "cook", "🍳"]];
const OPINIONS = [["j'adore", "I love", "❤️"], ["j'aime", "I like", "👍"], ["je n'aime pas", "I do not like", "👎"], ["je déteste", "I hate", "😠"], ["c'est amusant", "it is fun"], ["c'est ennuyeux", "it is boring"], ["c'est génial", "it is great"], ["c'est difficile", "it is difficult"]];
const OP = [["J'adore", "I love"], ["J'aime", "I like"], ["Je n'aime pas", "I do not like"], ["Je déteste", "I hate"]];
const HB = [["nager", "swimming"], ["lire", "reading"], ["chanter", "singing"], ["dessiner", "drawing"], ["cuisiner", "cooking"]];
export const hobbiesAndOpinions = wordTopic({
  rule: "To say what you like, use j'aime, j'adore, je n'aime pas or je déteste, then a verb like nager. For sports say jouer au (jouer au football), for instruments jouer du or de la (jouer du piano), and for other activities faire du or de la (faire du vélo).",
  hint: "Is it a sport, an instrument or an activity? Then check how you feel about it.",
  groups: [HOBBIES, OPINIONS],
  builds: [["J'aime jouer au football.", "I like playing football."], ["J'adore lire.", "I love reading."], ["Je déteste nager.", "I hate swimming."], ["Je n'aime pas dessiner.", "I do not like drawing."], ["Il aime faire du vélo.", "He likes cycling."], ["Elle adore chanter.", "She loves singing."], ["Nous aimons jouer au tennis.", "We like playing tennis."], ["Mon frère joue du piano.", "My brother plays the piano."], ["Ma sœur fait de la danse.", "My sister does dance."], ["Je joue de la guitare.", "I play the guitar."], ["Je regarde la télé le soir.", "I watch TV in the evening."], ["J'écoute de la musique.", "I listen to music."], ["Tu aimes cuisiner ?", "Do you like cooking?"]],
  sorts: [
    st("Is it a positive or a negative opinion?", ["I like it", "I do not like it"], [["j'adore", 0], ["j'aime", 0], ["c'est génial", 0], ["c'est amusant", 0], ["je n'aime pas", 1], ["je déteste", 1], ["c'est ennuyeux", 1]]),
    st("Which verb goes in front?", ["jouer au (sport)", "jouer du / de la (instrument)", "faire du / de la (activity)"], [["football", 0], ["tennis", 0], ["basket", 0], ["piano", 1], ["guitare", 1], ["violon", 1], ["vélo", 2], ["natation", 2], ["danse", 2], ["judo", 2]]),
  ],
  orders: [od("Put the opinions in order, from love to hate.", ["J'adore", "J'aime", "Je n'aime pas", "Je déteste"])],
  applied: OP.flatMap(([op, eop], i) => HB.map(([hb, ehb], j) => (rng) => ch(`What does **${op} ${hb}** mean?`, `${eop} ${ehb}`, [
    ...some(rng, OP.filter((_, k) => k !== i), 2).map(([, e]) => `${e} ${ehb}`),
    `${eop} ${HB[(j + 1) % HB.length][1]}`], fr(`${op} ${hb}`)))),
});

/* ---------- clothes and colours ---------- */
const CLOTHES = [["le pantalon", "trousers", "👖"], ["la jupe", "skirt"], ["la robe", "dress", "👗"], ["le pull", "jumper"], ["le tee-shirt", "T-shirt", "👕"], ["les chaussures", "shoes", "👟"], ["les chaussettes", "socks", "🧦"], ["le chapeau", "hat", "🎩"], ["le manteau", "coat"], ["l'écharpe", "scarf", "🧣"], ["les gants", "gloves", "🧤"], ["la casquette", "cap", "🧢"]];
const COLOURS = [["rouge", "red", "🔴"], ["bleu", "blue", "🔵"], ["vert", "green", "🟢"], ["jaune", "yellow", "🟡"], ["noir", "black", "⚫"], ["blanc", "white", "⚪"], ["orange", "orange", "🟠"], ["violet", "purple", "🟣"], ["rose", "pink"], ["gris", "grey"], ["marron", "brown", "🟤"]];
const thing = (what, answer, wrong) => ch(`What colour is ${what}?`, answer, wrong);
export const clothesAndColours = wordTopic({
  rule: "Say je porte for I am wearing. Most colour words come after the clothes: un pantalon bleu, a blue pair of trousers. Colours such as orange, marron and rose do not change.",
  hint: "Picture the item and the colour together, then say the French words.",
  groups: [CLOTHES, COLOURS],
  builds: [["Je porte un pantalon bleu.", "I am wearing blue trousers."], ["Elle porte une robe rouge.", "She is wearing a red dress."], ["Il porte un chapeau noir.", "He is wearing a black hat."], ["J'ai des chaussures blanches.", "I have white shoes."], ["Mon manteau est vert.", "My coat is green."], ["Ma jupe est jaune.", "My skirt is yellow."], ["Quelle est ta couleur préférée ?", "What is your favourite colour?"], ["Ma couleur préférée est le bleu.", "My favourite colour is blue."], ["Les chaussettes sont grises.", "The socks are grey."], ["Il fait froid, je porte un manteau.", "It is cold, I am wearing a coat."], ["Elle porte un pull rose.", "She is wearing a pink jumper."], ["Je porte une casquette orange.", "I am wearing an orange cap."]],
  sorts: [
    st("Where do you wear it?", ["On your feet", "On your head", "On your body"], [["les chaussures", 0], ["les chaussettes", 0], ["le chapeau", 1], ["la casquette", 1], ["le pantalon", 2], ["la jupe", 2], ["la robe", 2], ["le pull", 2], ["le manteau", 2]]),
    st("Is it clothes or a colour?", ["Clothes", "A colour"], [["le pantalon", 0], ["la robe", 0], ["le chapeau", 0], ["les gants", 0], ["rouge", 1], ["bleu", 1], ["vert", 1], ["jaune", 1], ["noir", 1]]),
  ],
  orders: [od("Put the colours of the rainbow in order, starting with red.", ["rouge", "orange", "jaune", "vert", "bleu", "violet"])],
  applied: [
    thing("a banana", "jaune", ["rouge", "bleu", "noir"]),
    thing("snow", "blanc", ["rouge", "vert", "noir"]),
    thing("grass", "vert", ["rouge", "bleu", "jaune"]),
    thing("a clear sky", "bleu", ["rouge", "noir", "orange"]),
    thing("coal", "noir", ["blanc", "jaune", "rose"]),
    thing("chocolate", "marron", ["bleu", "rose", "blanc"]),
    thing("an elephant", "gris", ["jaune", "rose", "violet"]),
    thing("a tomato", "rouge", ["bleu", "noir", "violet"]),
  ],
});

/** English word -> its emoji, for the vocabulary rows that have one (used by the figure rules). */
export const PICTURE_OF = Object.fromEntries([GREET, FAMILY, FOOD, THINGS, PLACES, HOBBIES, OPINIONS, CLOTHES, COLOURS, SEASONS, WEATHER].flat().filter((row) => row[2]).map((row) => [row[1], row[2]]));
