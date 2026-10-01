import { findReadingPassage } from "../../english/passagesReading.js";
import { sample } from "./shared.js";
import { choiceQuestion, shuffledOrder } from "./readingKit.js";

/**
 * Year 3 Finding Information: "retrieve and record information from
 * non-fiction" (notes and guidance: contents pages and indexes).
 *
 *   1 contents  a contents page: which page would tell you about …?
 *   2 index     an index (alphabetical): which page? The question
 *               describes the thing, so the child must find the key word.
 *   3 order     build an index: put the words in alphabetical order
 *   4 record    read an information text with headings and fill in a
 *               fact file from it
 *
 * Every entry in a contents page or index is a different kind of thing,
 * so each question matches exactly one row.
 */

export const CONTENTS_BOOKS = [
  {
    title: "All About Dogs",
    rows: [
      { label: "Choosing a puppy", page: 4 },
      { label: "Food and water", page: 8 },
      { label: "Walks and exercise", page: 12 },
      { label: "Brushing and bathing", page: 16 },
      { label: "Visiting the vet", page: 20 },
    ],
    questions: [
      { about: "how often to feed your dog", page: 8 },
      { about: "how to give your dog a bath", page: 16 },
      { about: "what to do when your dog is ill", page: 20 },
      { about: "how far to walk your dog each day", page: 12 },
      { about: "how to pick a puppy to take home", page: 4 },
    ],
  },
  {
    title: "Into Space",
    rows: [
      { label: "The Sun", page: 3 },
      { label: "The Moon", page: 7 },
      { label: "The planets", page: 11 },
      { label: "Astronauts", page: 15 },
      { label: "Rockets", page: 19 },
    ],
    questions: [
      { about: "what astronauts eat in space", page: 15 },
      { about: "how a rocket takes off", page: 19 },
      { about: "how hot the Sun is", page: 3 },
      { about: "how many planets there are", page: 11 },
      { about: "why the Moon seems to change shape", page: 7 },
    ],
  },
  {
    title: "Minibeasts",
    rows: [
      { label: "Spiders", page: 2 },
      { label: "Butterflies", page: 6 },
      { label: "Ants", page: 10 },
      { label: "Snails", page: 14 },
      { label: "Bees", page: 18 },
    ],
    questions: [
      { about: "how bees make honey", page: 18 },
      { about: "how a caterpillar turns into a butterfly", page: 6 },
      { about: "how spiders spin their webs", page: 2 },
      { about: "how snails carry their shells", page: 14 },
      { about: "how ants live together in a nest", page: 10 },
    ],
  },
  {
    title: "Castles",
    rows: [
      { label: "Building a castle", page: 3 },
      { label: "Knights and their armour", page: 8 },
      { label: "Food and feasts", page: 12 },
      { label: "Attack and defence", page: 16 },
      { label: "Castles today", page: 20 },
    ],
    questions: [
      { about: "what people ate at a castle banquet", page: 12 },
      { about: "what a knight wore into battle", page: 8 },
      { about: "how the castle walls were built", page: 3 },
      { about: "castles you can visit now", page: 20 },
      { about: "how a castle was protected from attack", page: 16 },
    ],
  },
];

/** Index rows must be in alphabetical order (the test checks it). */
export const INDEX_BOOKS = [
  {
    title: "Pond Life",
    rows: [
      { label: "dragonflies", page: 9 },
      { label: "ducks", page: 4 },
      { label: "fish", page: 11 },
      { label: "frogs", page: 6 },
      { label: "pondweed", page: 15 },
    ],
    questions: [
      { about: "a bird that swims on the pond", page: 4 },
      { about: "a plant that grows under the water", page: 15 },
      { about: "what swims under the water using its fins", page: 11 },
      { about: "an insect with shiny wings", page: 9 },
      { about: "an animal that croaks and hops", page: 6 },
    ],
  },
  {
    title: "At the Seaside",
    rows: [
      { label: "crabs", page: 5 },
      { label: "lighthouses", page: 14 },
      { label: "rock pools", page: 8 },
      { label: "sandcastles", page: 3 },
      { label: "seagulls", page: 10 },
    ],
    questions: [
      { about: "birds that try to steal your chips", page: 10 },
      { about: "a tall tower with a light that warns ships", page: 14 },
      { about: "animals that walk sideways", page: 5 },
      { about: "what you can build with a bucket and spade", page: 3 },
      { about: "little pools of water left between the rocks", page: 8 },
    ],
  },
  {
    title: "Your Amazing Body",
    rows: [
      { label: "bones", page: 4 },
      { label: "brain", page: 9 },
      { label: "heart", page: 6 },
      { label: "lungs", page: 11 },
      { label: "teeth", page: 2 },
    ],
    questions: [
      { about: "what helps you breathe", page: 11 },
      { about: "what pumps blood around your body", page: 6 },
      { about: "what you use to chew your food", page: 2 },
      { about: "what you think with", page: 9 },
      { about: "what your skeleton is made of", page: 4 },
    ],
  },
  {
    title: "Wild Weather",
    rows: [
      { label: "lightning", page: 12 },
      { label: "rainbows", page: 8 },
      { label: "snow", page: 10 },
      { label: "wind", page: 14 },
    ],
    questions: [
      { about: "a bright flash in a thunderstorm", page: 12 },
      { about: "an arch of colours in the sky", page: 8 },
      { about: "what makes kites fly and trees sway", page: 14 },
      { about: "white flakes that fall when it is very cold", page: 10 },
    ],
  },
];

/** Level 3: index words, by book. Five are drawn and put in order. */
export const INDEX_WORDS = [
  { title: "On the Farm", words: ["cows", "ducks", "goats", "hens", "horses", "pigs", "sheep", "tractors"] },
  { title: "Fruit", words: ["apples", "bananas", "cherries", "grapes", "lemons", "mangoes", "oranges", "pears", "plums"] },
  { title: "Toys", words: ["balls", "dolls", "kites", "marbles", "puzzles", "robots", "teddies", "trains"] },
  { title: "Sport", words: ["cricket", "football", "gymnastics", "hockey", "netball", "rugby", "swimming", "tennis"] },
];

/** Level 4: four fact-file boxes, each filled from one paragraph. */
export const FACT_FILES = [
  {
    passage: "hedgehogs",
    facts: [
      { field: "Number of spines", answer: "around 5,000", wrong: ["around 50", "around 500,000"], para: 2 },
      { field: "Food", answer: "beetles, worms, slugs and caterpillars", wrong: ["grass, leaves and berries", "fish and frogs"], para: 4 },
      { field: "When they hunt", answer: "at night", wrong: ["at lunchtime", "only in winter"], para: 4 },
      { field: "Name for their winter sleep", answer: "hibernation", wrong: ["migration", "camouflage"], para: 6 },
    ],
  },
  {
    passage: "honeybees",
    facts: [
      { field: "Name for a group of bees", answer: "a colony", wrong: ["a herd", "a flock"], para: 0 },
      { field: "The queen’s job", answer: "to lay eggs", wrong: ["to make honey", "to guard the hive"], para: 2 },
      { field: "What worker bees collect", answer: "nectar", wrong: ["water", "leaves"], para: 4 },
      { field: "What the waggle dance tells other bees", answer: "which way to fly", wrong: ["when to go to sleep", "who the queen is"], para: 6 },
    ],
  },
  {
    passage: "the-moon",
    facts: [
      { field: "Time to travel round the Earth", answer: "about 27 days", wrong: ["about 7 days", "about 365 days"], para: 0 },
      { field: "Why it shines", answer: "light from the Sun bounces off it", wrong: ["it is on fire", "it makes its own light"], para: 2 },
      { field: "Name for its round holes", answer: "craters", wrong: ["volcanoes", "caves"], para: 4 },
      { field: "Year people first walked on it", answer: "1969", wrong: ["1869", "2019"], para: 6 },
    ],
  },
];

export const QUESTIONS_PER_CHALLENGE = 5;

const pageLabel = (page) => `page ${page}`;

function lookupQuestion(book, item, kind, rng) {
  const others = sample(
    book.rows.map((row) => row.page).filter((page) => page !== item.page),
    2,
    rng
  );
  return choiceQuestion({
    list: { title: book.title, kind, rows: book.rows },
    prompt: `Which page would tell you about ${item.about}?`,
    answer: pageLabel(item.page),
    wrong: others.map(pageLabel),
    hint:
      kind === "index"
        ? "Think of one key word for the question, then find it in the index. The index goes from A to Z."
        : "Read each chapter title. Which chapter is about the same thing as the question?",
    rng,
  });
}

function lookupQuestions(books, kind, rng) {
  const items = books.flatMap((book) => book.questions.map((item) => ({ book, item })));
  return sample(items, QUESTIONS_PER_CHALLENGE, rng).map(({ book, item }) => lookupQuestion(book, item, kind, rng));
}

const alphabetical = (a, b) => a.localeCompare(b, "en");

function orderQuestion(book, rng) {
  const words = sample(book.words, 5, rng).sort(alphabetical);
  const items = words.map((word) => ({ id: word, label: word }));
  return {
    kind: "order",
    prompt: `These words are for the index of a book called “${book.title}”. Put them in alphabetical order, A at the top.`,
    items: shuffledOrder(items, rng),
    answer: words,
    hint: `The first word in the index is “${words[0]}”. If two words start with the same letter, look at the second letter.`,
  };
}

function factQuestions(set, rng) {
  const passage = findReadingPassage(set.passage);
  return set.facts.map((fact) =>
    choiceQuestion({
      passage,
      prompt: "Use the text to fill in the fact file.",
      focus: `📝 ${fact.field}: _____`,
      answer: fact.answer,
      wrong: fact.wrong,
      para: [fact.para],
      hint: "Read the headings first. The fact is in the part with the box around it.",
      rng,
    })
  );
}

export function buildFindingInformationQuestions(level, rng) {
  if (level === 1) return lookupQuestions(CONTENTS_BOOKS, "contents", rng);
  if (level === 2) return lookupQuestions(INDEX_BOOKS, "index", rng);
  if (level === 3) {
    // Five questions from four books: one book is used twice, with fresh words.
    const books = [...sample(INDEX_WORDS, INDEX_WORDS.length, rng), ...sample(INDEX_WORDS, 1, rng)];
    return books.map((book) => orderQuestion(book, rng));
  }
  if (level === 4) return factQuestions(sample(FACT_FILES, 1, rng)[0], rng);
  throw new Error(`no finding information level ${level}`);
}
