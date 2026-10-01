import { WORD_LIST } from "../../english/appendix1.js";
import { sample, shuffle } from "./shared.js";

/**
 * Year 3 Words Often Misspelt: "spell words that are often misspelt", the
 * Year 3 half of the statutory word list (WORD_LIST[3], accident(ally) to
 * important). Every target word comes from that list; the tests check it.
 *
 *   1 pick   picture, meaning and a spelling tip: choose the right spelling
 *            of three (the tip is the rule shown)
 *   2 sort   sort six spellings into "spelt right" and "spelt wrong"
 *            (inferred: no tips)
 *   3 build  build the word from its letter tiles (whole word)
 *   4 type   read or hear a sentence and type the missing word (applied)
 *
 * The wrong spellings are the ones children really write (beleive,
 * diffrent, Febuary), never another real word: "herd" for heard or "ate"
 * for eight would be a homophone, not a misspelling. US spellings ("center")
 * are left out too, so a British classroom never sees them as an option.
 */
export const QUESTIONS_PER_CHALLENGE = 5;

/** Level 3 keeps to words a seven-year-old can build from loose letters. */
export const MAX_BUILD_LETTERS = 8;

export const WORDS = [
  { word: "accident", emoji: "🩹", meaning: "something bad that happens by mistake", sentence: "Spilling the paint was an ___.", tip: "It has a double c.", wrong: ["acident", "accidant"] },
  { word: "accidentally", emoji: "🙊", meaning: "by mistake", sentence: "Leo ___ knocked over his drink.", tip: "It ends with -ally, not -ly.", wrong: ["accidently", "acidentally"] },
  { word: "actually", emoji: "🤔", meaning: "really, in fact", sentence: "I thought it was a cat, but it was ___ a fox.", tip: "It has two l’s near the end.", wrong: ["actualy", "actully"] },
  { word: "address", emoji: "🏠", meaning: "where someone lives", sentence: "Write your ___ on the envelope.", tip: "It has a double d and a double s.", wrong: ["adress", "addres"] },
  { word: "answer", emoji: "💬", meaning: "what you say back to a question", sentence: "Put up your hand if you know the ___.", tip: "It has a silent w.", wrong: ["anser", "answar"] },
  { word: "appear", emoji: "🎩", meaning: "to come into sight", sentence: "A rabbit will ___ out of the hat.", tip: "It has a double p.", wrong: ["apear", "appeer"] },
  { word: "arrive", emoji: "🚉", meaning: "to get to a place", sentence: "The train will ___ at six o’clock.", tip: "It has a double r.", wrong: ["arive", "arrieve"] },
  { word: "believe", emoji: "🧚", meaning: "to think something is true", sentence: "Do you ___ in fairies?", tip: "i comes before e in the middle.", wrong: ["beleive", "belive"] },
  { word: "bicycle", emoji: "🚲", meaning: "a bike with two wheels", sentence: "Priya rode her ___ to the park.", tip: "The y comes in the middle, after bic.", wrong: ["bycicle", "bicycel"] },
  { word: "breath", emoji: "😮‍💨", meaning: "the air that goes in and out of your body", sentence: "Take a deep ___ before you dive in.", tip: "There is no e on the end.", wrong: ["breth", "brath"] },
  { word: "breathe", emoji: "🫁", meaning: "to take air in and let it out", sentence: "Fish ___ through their gills.", tip: "It ends with an e.", wrong: ["breethe", "brethe"] },
  { word: "build", emoji: "🧱", meaning: "to make something by putting parts together", sentence: "Let’s ___ a sandcastle on the beach.", tip: "u comes before i.", wrong: ["biuld", "bild"] },
  { word: "busy", emoji: "🐝", meaning: "having lots to do", sentence: "Mum is too ___ to play right now.", tip: "The “i” sound is spelt with a u.", wrong: ["bizzy", "buisy"] },
  { word: "business", emoji: "🏪", meaning: "a shop or a company", sentence: "Grandma runs a cake ___.", tip: "Start with busy, change the y to i, then add ness.", wrong: ["buisness", "busness"] },
  { word: "calendar", emoji: "📅", meaning: "a chart that shows the days and months", sentence: "Mark the party on the ___.", tip: "It ends with -ar.", wrong: ["calender", "calandar"] },
  { word: "caught", emoji: "🧤", meaning: "took hold of something that was moving", sentence: "Leo ___ the ball with one hand.", tip: "It has augh in the middle.", wrong: ["cawt", "cought"] },
  { word: "centre", emoji: "🎯", meaning: "the middle of something", sentence: "Aim for the ___ of the target.", tip: "It starts with c and ends with -re.", wrong: ["sentre", "centir"] },
  { word: "century", emoji: "⏳", meaning: "one hundred years", sentence: "The castle is more than a ___ old.", tip: "It starts with c, not s.", wrong: ["sentury", "centery"] },
  { word: "certain", emoji: "✅", meaning: "sure", sentence: "Are you ___ that the door is locked?", tip: "It ends with -ain.", wrong: ["certin", "sertain"] },
  { word: "circle", emoji: "⭕", meaning: "a perfectly round shape", sentence: "Draw a ___ round the right word.", tip: "It starts with c, not s, and ends with -le.", wrong: ["sircle", "circel"] },
  { word: "complete", emoji: "🧩", meaning: "to finish", sentence: "Can you ___ the jigsaw before tea?", tip: "It ends with -ete.", wrong: ["compleet", "complet"] },
  { word: "consider", emoji: "🧐", meaning: "to think carefully about", sentence: "Please ___ my idea before you say no.", tip: "The middle “s” sound is spelt s.", wrong: ["concider", "considder"] },
  { word: "continue", emoji: "▶️", meaning: "to keep going", sentence: "After lunch, we will ___ with our story.", tip: "It ends with -ue.", wrong: ["continu", "contineu"] },
  { word: "decide", emoji: "🤷", meaning: "to make up your mind", sentence: "Zayn could not ___ which cake to choose.", tip: "The “s” sound in the middle is spelt c.", wrong: ["deside", "decied"] },
  { word: "describe", emoji: "🗣️", meaning: "to say what something is like", sentence: "Can you ___ the monster you saw?", tip: "It starts with de-.", wrong: ["discribe", "descibe"] },
  { word: "different", emoji: "🔀", meaning: "not the same", sentence: "The twins wore ___ hats.", tip: "Say every part: dif-fer-ent.", wrong: ["diffrent", "diferent"] },
  { word: "difficult", emoji: "🧗", meaning: "hard to do", sentence: "The climb up the hill was very ___.", tip: "It has a double f.", wrong: ["dificult", "difficalt"] },
  { word: "disappear", emoji: "🫥", meaning: "to go out of sight", sentence: "Watch the coin ___ into the hat!", tip: "dis + appear: one s, two p’s.", wrong: ["dissapear", "disapear"] },
  { word: "early", emoji: "🌅", meaning: "before the usual time", sentence: "We got up ___ to watch the sunrise.", tip: "It starts with ear.", wrong: ["erly", "urly"] },
  { word: "earth", emoji: "🪱", meaning: "the soil that plants grow in", sentence: "The worm wriggled down into the ___.", tip: "It starts with ear.", wrong: ["erth", "urth"] },
  { word: "eight", emoji: "🕷️", meaning: "the number 8", sentence: "A spider has ___ legs.", tip: "It starts with eigh.", wrong: ["eihgt", "eigt"] },
  { word: "eighth", emoji: "🏅", meaning: "number 8 in a line or a race", sentence: "Ellie came ___ in the race.", tip: "It is eight with an h on the end.", wrong: ["eigth", "eith"] },
  { word: "enough", emoji: "🍽️", meaning: "as much as you need", sentence: "Have you had ___ to eat?", tip: "The “uff” sound is spelt ough.", wrong: ["enuff", "enouf"] },
  { word: "exercise", emoji: "🏃", meaning: "moving your body to keep fit", sentence: "Running is good ___.", tip: "There is no c straight after the x.", wrong: ["excercise", "exersise"] },
  { word: "experiment", emoji: "🧪", meaning: "a test to find something out", sentence: "We did a science ___ with magnets.", tip: "Say every part: ex-per-i-ment.", wrong: ["experement", "expiriment"] },
  { word: "extreme", emoji: "🌋", meaning: "very great or very strong", sentence: "The desert has ___ heat in the day.", tip: "It ends with -eme.", wrong: ["extreem", "extream"] },
  { word: "famous", emoji: "🌟", meaning: "known by lots of people", sentence: "The singer was very ___.", tip: "It ends with ous.", wrong: ["famus", "fameous"] },
  { word: "favourite", emoji: "❤️", meaning: "the one you like best", sentence: "Blue is my ___ colour.", tip: "It has our in it, like colour.", wrong: ["faverite", "favrite"] },
  { word: "February", emoji: "❄️", meaning: "the second month of the year", sentence: "My birthday is in ___.", tip: "Say both r’s: Feb-ru-ar-y.", wrong: ["Febuary", "Febrary"] },
  { word: "forward", emoji: "⏩", meaning: "towards the front", sentence: "Take one big step ___.", tip: "It starts with for.", wrong: ["foward", "forwerd"] },
  { word: "fruit", emoji: "🍎", meaning: "apples, pears and bananas", sentence: "Have a piece of ___ for your snack.", tip: "u comes before i.", wrong: ["friut", "froot"] },
  { word: "grammar", emoji: "📘", meaning: "the rules for putting words together", sentence: "In our ___ lesson, we learnt about conjunctions.", tip: "It ends with -ar.", wrong: ["grammer", "gramar"] },
  { word: "group", emoji: "👥", meaning: "a few people or things together", sentence: "Sit with your ___ on the carpet.", tip: "The “oo” sound is spelt ou.", wrong: ["groop", "grup"] },
  { word: "guard", emoji: "💂", meaning: "someone who keeps a place safe", sentence: "The ___ stood by the palace gate.", tip: "There is a silent u after the g.", wrong: ["gard", "gaurd"] },
  { word: "guide", emoji: "🧭", meaning: "someone who shows you the way", sentence: "Our ___ showed us round the castle.", tip: "There is a silent u after the g.", wrong: ["gide", "giude"] },
  { word: "heard", emoji: "👂", meaning: "listened to a sound (in the past)", sentence: "I ___ an owl hooting last night.", tip: "It is hear with a d on the end.", wrong: ["hurd", "heared"] },
  { word: "heart", emoji: "🫀", meaning: "the part of your body that pumps blood", sentence: "Your ___ beats faster when you run.", tip: "It has ear in it.", wrong: ["harte", "heert"] },
  { word: "height", emoji: "🦒", meaning: "how tall something is", sentence: "The giraffe’s ___ amazed us.", tip: "It has eigh, then t.", wrong: ["hight", "hieght"] },
  { word: "history", emoji: "🏰", meaning: "learning about the past", sentence: "In ___, we learnt about the Romans.", tip: "It has or in the middle.", wrong: ["histery", "histry"] },
  { word: "imagine", emoji: "💭", meaning: "to make a picture in your mind", sentence: "___ that you can fly!", tip: "It ends with -ine.", wrong: ["imagin", "emagine"] },
  { word: "increase", emoji: "📈", meaning: "to make bigger or more", sentence: "Please ___ the volume so we can hear.", tip: "It ends with -ease.", wrong: ["increese", "incresse"] },
  { word: "important", emoji: "❗", meaning: "it really matters", sentence: "It is ___ to wash your hands.", tip: "It ends with -ant.", wrong: ["importent", "importunt"] },
];

/** "b _ _ _ _ _ _": the first letter and the letter count. */
export function letterHint(word) {
  return [word[0], ...Array.from(word.slice(1), () => "_")].join(" ");
}

export function fillBlank(sentence, word) {
  return sentence.replace("___", word);
}

/** Lower-case, so "February" and "february" are the same word. */
const lower = (word) => word.toLowerCase();

export const YEAR3_WORDS = new Set(WORD_LIST[3].map(lower));

function pickQuestion(entry, rng) {
  return {
    kind: "pick",
    word: entry.word,
    emoji: entry.emoji,
    meaning: entry.meaning,
    sentence: entry.sentence,
    tip: entry.tip,
    answer: entry.word,
    options: shuffle([entry.word, ...entry.wrong], rng),
  };
}

/** Level 2: six spellings of six different words, three right and three wrong. */
function sortQuestion(rng) {
  const words = sample(WORDS, 6, rng);
  const cards = words.map((entry, index) => {
    const right = index < 3;
    const [wrong] = sample(entry.wrong, 1, rng);
    return { id: `c${index}`, label: right ? entry.word : wrong, bin: right ? "right" : "wrong", word: entry.word };
  });
  return {
    kind: "sort",
    bins: [
      { id: "right", label: "✓ Spelt right" },
      { id: "wrong", label: "✗ Spelt wrong" },
    ],
    cards: shuffle(cards, rng),
  };
}

function buildQuestion(entry, rng) {
  const tiles = [...entry.word].map((label, index) => ({ id: `l${index}`, label }));
  let shuffled = shuffle(tiles, rng);
  // Never deal the tiles in the right order already.
  if (shuffled.map((tile) => tile.label).join("") === entry.word) shuffled = [...tiles.slice(1), tiles[0]];
  return {
    kind: "build",
    word: entry.word,
    emoji: entry.emoji,
    meaning: entry.meaning,
    sentence: entry.sentence,
    answer: entry.word,
    tiles: shuffled,
  };
}

function typeQuestion(entry) {
  return {
    kind: "type",
    emoji: entry.emoji,
    meaning: entry.meaning,
    sentence: entry.sentence,
    answer: entry.word,
    spoken: fillBlank(entry.sentence, entry.word),
    hint: letterHint(entry.word),
  };
}

export const BUILDABLE = WORDS.filter((entry) => entry.word.length <= MAX_BUILD_LETTERS);

export function buildWordsOftenMisspeltQuestions(level, rng) {
  if (level === 1) return sample(WORDS, QUESTIONS_PER_CHALLENGE, rng).map((entry) => pickQuestion(entry, rng));
  if (level === 2) return Array.from({ length: QUESTIONS_PER_CHALLENGE }, () => sortQuestion(rng));
  if (level === 3) return sample(BUILDABLE, QUESTIONS_PER_CHALLENGE, rng).map((entry) => buildQuestion(entry, rng));
  if (level === 4) return sample(WORDS, QUESTIONS_PER_CHALLENGE, rng).map(typeQuestion);
  throw new Error(`no words often misspelt level ${level}`);
}

export function isSortCorrect(question, placement) {
  return question.cards.every((card) => placement[card.id] === card.bin);
}

export function builtWord(question, placed) {
  return placed.map((id) => question.tiles.find((tile) => tile.id === id)?.label ?? "").join("");
}
