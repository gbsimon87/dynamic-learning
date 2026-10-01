import { sample, shuffle, tokenise } from "./shared.js";

/**
 * Year 3 Proofreading: "proofread for spelling and punctuation errors" and
 * "proposing changes to grammar and vocabulary to improve consistency".
 *
 *   1 correct  the mistake is marked: choose the right spelling (rule shown)
 *   2 spell    tap the misspelt word (not marked)
 *   3 check    tap the missing capital letter or the wrong end mark, or tap
 *              the sentence that slips out of the past tense
 *   4 hunt     a short paragraph with three mistakes: find them one by one
 *              (no gloss)
 *
 * Spelling mistakes are in words from the Year 3 half of the Appendix 1 word
 * list (appendix1.js WORD_LIST[3]), or a Year 3 homophone. Every sentence has
 * exactly ONE mistake, except the level 4 paragraphs, which say they have
 * three.
 */

/** Level 1. `shown` is the mistake in the sentence; `wrong` are other wrong spellings. */
export const CORRECT_ITEMS = [
  { sentence: "We posted the letter to the right ___.", word: "address", shown: "adress", wrong: ["addres", "adres"] },
  { sentence: "Leo could not ___ the question.", word: "answer", shown: "anser", wrong: ["awnser", "ansur"] },
  { sentence: "Priya rode her ___ to school.", word: "bicycle", shown: "bicicle", wrong: ["bycicle", "bisycle"] },
  { sentence: "Zayn wants to ___ a tree house.", word: "build", shown: "bild", wrong: ["biuld", "buld"] },
  { sentence: "Mum is very ___ today.", word: "busy", shown: "bizzy", wrong: ["buisy", "bisy"] },
  { sentence: "Amara ___ the ball with one hand.", word: "caught", shown: "cought", wrong: ["cawt", "caugt"] },
  { sentence: "Leo drew a big ___ on the page.", word: "circle", shown: "circel", wrong: ["sircle", "circul"] },
  { sentence: "It is ___ to swim in a cold sea.", word: "difficult", shown: "dificult", wrong: ["difficalt", "diffikult"] },
  { sentence: "We got up ___ on Saturday.", word: "early", shown: "erly", wrong: ["urly", "earley"] },
  { sentence: "Have you got ___ pencils?", word: "enough", shown: "enuf", wrong: ["enouf", "enugh"] },
  { sentence: "Strawberries are my ___ fruit.", word: "favourite", shown: "favrite", wrong: ["favourit", "faverite"] },
  { sentence: "Ellie’s birthday is in ___.", word: "February", shown: "Febuary", wrong: ["Februery", "Febrary"] },
  { sentence: "I ___ a noise outside.", word: "heard", shown: "herd", wrong: ["hurd", "heared"] },
  { sentence: "The magician made the rabbit ___.", word: "disappear", shown: "disapear", wrong: ["dissapear", "disapeer"] },
  { sentence: "Bananas and apples are ___.", word: "fruit", shown: "froot", wrong: ["frute", "fruite"] },
  { sentence: "I ___ in fairies.", word: "believe", shown: "beleive", wrong: ["belive", "beleave"] },
  { sentence: "Our class learnt about Roman ___.", word: "history", shown: "histery", wrong: ["histry", "historie"] },
  { sentence: "Can you ___ a purple dragon?", word: "imagine", shown: "imagin", wrong: ["imajine", "imaggine"] },
  { sentence: "It is ___ to wash your hands.", word: "important", shown: "importent", wrong: ["impotant", "importint"] },
  { sentence: "We worked in a small ___.", word: "group", shown: "groop", wrong: ["grupe", "grup"] },
];

/** Level 2. One misspelt word (`wrong`) in an otherwise correct sentence. */
export const SPELL_ITEMS = [
  { sentence: "Biscuit ran forwerd to catch the ball.", wrong: "forwerd", word: "forward" },
  { sentence: "We did an experimint with magnets in class.", wrong: "experimint", word: "experiment" },
  { sentence: "Leo had an acident in the playground.", wrong: "acident", word: "accident" },
  { sentence: "Our teacher taught us some new gramar.", wrong: "gramar", word: "grammar" },
  { sentence: "Amara wants to be a famus singer.", wrong: "famus", word: "famous" },
  { sentence: "Please arive at school by nine o’clock.", wrong: "arive", word: "arrive" },
  { sentence: "The castle had a gard at the gate.", wrong: "gard", word: "guard" },
  { sentence: "Zayn could not deside which book to read.", wrong: "deside", word: "decide" },
  { sentence: "My hart beats fast when I run.", wrong: "hart", word: "heart" },
  { sentence: "Priya looked at the calender to find the date.", wrong: "calender", word: "calendar" },
  { sentence: "Ellie was sertain that she had seen a fox.", wrong: "sertain", word: "certain" },
  { sentence: "Take a deep breth before you dive.", wrong: "breth", word: "breath" },
  { sentence: "The tour gide showed us the old tower.", wrong: "gide", word: "guide" },
  { sentence: "The nurse measured Leo’s hight.", wrong: "hight", word: "height" },
  { sentence: "Can you discribe the monster?", wrong: "discribe", word: "describe" },
  { sentence: "The Erth goes around the Sun.", wrong: "Erth", word: "earth" },
  { sentence: "We will continew the story tomorrow.", wrong: "continew", word: "continue" },
  { sentence: "The two pictures look very diffrent.", wrong: "diffrent", word: "different" },
  { sentence: "It was an extreem storm.", wrong: "extreem", word: "extreme" },
  { sentence: "The maths test was not as dificult as Zayn thought.", wrong: "dificult", word: "difficult" },
];

/**
 * Level 3 (capital letters and end marks). `wrong` is the one token to tap,
 * `fixed` how it should read.
 */
export const MARK_ITEMS = [
  { sentence: "we went to the park after lunch.", wrong: "we", fixed: "We" },
  { sentence: "Leo and priya played football.", wrong: "priya", fixed: "Priya" },
  { sentence: "Where is my coat.", wrong: "coat.", fixed: "coat?" },
  { sentence: "Ellie’s dog is called biscuit.", wrong: "biscuit.", fixed: "Biscuit." },
  { sentence: "Can I have a drink, please.", wrong: "please.", fixed: "please?" },
  { sentence: "Yesterday i went swimming.", wrong: "i", fixed: "I" },
  { sentence: "What a brilliant goal.", wrong: "goal.", fixed: "goal!" },
  { sentence: "Amara lives in london.", wrong: "london.", fixed: "London." },
  { sentence: "the bus was late again.", wrong: "the", fixed: "The" },
  { sentence: "How old are you.", wrong: "you.", fixed: "you?" },
  { sentence: "Zayn’s birthday is in july.", wrong: "july.", fixed: "July." },
  { sentence: "We saw a tiger at the zoo?", wrong: "zoo?", fixed: "zoo." },
  { sentence: "Ellie and i made a den.", wrong: "i", fixed: "I" },
  { sentence: "Do you like chocolate cake.", wrong: "cake.", fixed: "cake?" },
  { sentence: "my favourite colour is green.", wrong: "my", fixed: "My" },
  { sentence: "Have you seen my blue pencil.", wrong: "pencil.", fixed: "pencil?" },
];

/**
 * Level 3 (consistency). Three sentences in the past tense; one slips into
 * the present. `answer` is its index.
 */
export const TENSE_ITEMS = [
  { sentences: ["Leo went to the park.", "He kicks his ball into the pond.", "His dad helped him to get it out."], answer: 1 },
  { sentences: ["Priya climbed the big tree.", "She saw a nest with three eggs.", "She climbs down very carefully."], answer: 2 },
  { sentences: ["Zayn opens his new paint set.", "He painted a picture of a rocket.", "Then he hung it on the wall."], answer: 0 },
  { sentences: ["Ellie baked some biscuits.", "Biscuit the dog tried to eat them.", "Ellie puts them on a high shelf."], answer: 2 },
  { sentences: ["Amara visited the museum.", "She looks at the dinosaur bones.", "Her favourite part was the giant skeleton."], answer: 1 },
  { sentences: ["We walk to the beach.", "We built a huge sandcastle.", "The sea washed it away."], answer: 0 },
  { sentences: ["It snowed all night.", "Leo builds a snowman in the garden.", "Biscuit knocked it over."], answer: 1 },
  { sentences: ["The class went on a trip.", "They saw lots of animals.", "Priya feeds the goats."], answer: 2 },
  { sentences: ["Zayn’s grandma came to stay.", "She brings a big box of toys.", "They played games all afternoon."], answer: 1 },
];

/**
 * Level 4. `{shown|fixed}` marks a mistake: one spelling, one capital
 * letter and one end mark per paragraph.
 */
export const HUNT_PARAGRAPHS = [
  {
    title: "A Trip to the Farm",
    text: "Last week our class went to a farm. We saw cows, pigs and {sheep?|sheep.} {priya|Priya} fed a baby lamb with a bottle. The farmer showed us how to {bild|build} a wall from stones. Zayn drew a picture of the big black horse. We all had a picnic by the duck pond. It was the best trip ever!",
  },
  {
    title: "Biscuit’s Bath",
    text: "Ellie decided to give Biscuit a bath. She filled a tub with warm water and bubbles. {biscuit|Biscuit} did not want to get wet. He ran around the garden as fast as he could. It was {dificult|difficult} to catch him. At last Ellie caught him and lifted him into the tub. Do you know what happened {next.|next?} Biscuit shook himself and soaked Ellie!",
  },
  {
    title: "Amara’s Rocket",
    text: "Amara loves learning about space. On Saturday she made a rocket from an old bottle. She painted it red and stuck on three fins. {her|Her} brother helped her launch it in the park. The rocket shot up into the air and {disapeared|disappeared} behind a tree. They searched for it all afternoon. Where do you think it {landed.|landed?}",
  },
  {
    title: "The Big Match",
    text: "Leo’s team played a big match on Sunday. It was cold and windy. Leo scored a goal in the {erly|early} part of the game. Then the other team scored two goals. {zayn|Zayn} passed the ball to Leo near the end. Leo kicked it as hard as he could. Did it go in? Yes, it did! The match ended in a {draw?|draw.}",
  },
];

export const QUESTIONS_PER_CHALLENGE = 5;

/** Tokens of a hunt paragraph as shown, the corrected tokens, and where the mistakes are. */
export function parseHunt(paragraph) {
  const shown = [];
  const fixed = [];
  const errors = [];
  for (const raw of tokenise(paragraph.text)) {
    const match = raw.match(/^\{([^|}]+)\|([^}]+)\}$/);
    if (match) {
      errors.push(shown.length);
      shown.push(match[1]);
      fixed.push(match[2]);
    } else {
      shown.push(raw);
      fixed.push(raw);
    }
  }
  return { shown, fixed, errors };
}

/** Token indices of the sentence holding token `index` (for a hint). */
export function sentenceAround(tokens, index) {
  let start = index;
  while (start > 0 && !/[.!?]$/.test(tokens[start - 1])) start -= 1;
  let end = index;
  while (end < tokens.length - 1 && !/[.!?]$/.test(tokens[end])) end += 1;
  return Array.from({ length: end - start + 1 }, (_, n) => start + n);
}

function correctQuestion(item, rng) {
  const [before, after] = item.sentence.split("___");
  return {
    kind: "correct",
    before,
    after,
    shown: item.shown,
    answer: item.word,
    struck: item.wrong[0],
    options: shuffle([item.word, ...item.wrong], rng),
  };
}

/** The token that is (or, with its end punctuation off, spells) `wrong`. */
export function findToken(tokens, wrong) {
  return tokens.findIndex((token) => token === wrong || token.replace(/[.,!?]+$/, "") === wrong);
}

function tapQuestion(kind, sentence, wrong, rng) {
  const tokens = tokenise(sentence);
  const answerIndex = findToken(tokens, wrong);
  const others = tokens.map((_, index) => index).filter((index) => index !== answerIndex);
  return { kind, tokens, answerIndex, hinted: new Set([answerIndex, ...sample(others, 2, rng)]) };
}

function tenseQuestion(item) {
  return { kind: "tense", sentences: item.sentences, answer: item.answer };
}

function buildCheckQuestions(rng) {
  const marks = sample(MARK_ITEMS, 3, rng).map((item) => ({ ...tapQuestion("mark", item.sentence, item.wrong, rng), fixed: item.fixed }));
  const tenses = sample(TENSE_ITEMS, 2, rng).map(tenseQuestion);
  return shuffle([...marks, ...tenses], rng);
}

function huntQuestions(paragraph) {
  const { shown, fixed, errors } = parseHunt(paragraph);
  return errors.map((_, step) => ({ kind: "hunt", title: paragraph.title, shown, fixed, errors, step }));
}

export function buildProofreadingQuestions(level, rng) {
  if (level === 1) return sample(CORRECT_ITEMS, QUESTIONS_PER_CHALLENGE, rng).map((item) => correctQuestion(item, rng));
  if (level === 2) return sample(SPELL_ITEMS, QUESTIONS_PER_CHALLENGE, rng).map((item) => tapQuestion("spell", item.sentence, item.wrong, rng));
  if (level === 3) return buildCheckQuestions(rng);
  if (level === 4) return huntQuestions(sample(HUNT_PARAGRAPHS, 1, rng)[0]);
  throw new Error(`no proofreading level ${level}`);
}
