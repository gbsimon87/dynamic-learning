import { PATTERNS } from "../../english/appendix1.js";
import { bareWord, sample, shuffle, tokenise } from "./shared.js";

/**
 * Year 3 The sure and ture Endings (Appendix 1): "The ending sounding like
 * /ʒə/ is always spelt –sure." "The ending sounding like /tʃə/ is often spelt
 * –ture, but check that the word is not a root word ending in (t)ch with an
 * er ending – e.g. teacher, catcher, richer, stretcher."
 *
 *   1 ending  picture + start of the word: choose -sure, -ture or -cher
 *             (the rule is on screen)
 *   2 sort    sort word starts into -sure, -ture and -cher bins (inferred)
 *   3 spot    tap the word with the wrong ending in a sentence
 *   4 type    read or hear a sentence and type the missing word (applied)
 *
 * The appendix's own example words (PATTERNS.sure / PATTERNS.ture) are all
 * in the bank; the tests check. Extra -ture words follow the same rule and
 * are ones a Year 3 child meets; the -cher words are root + er, as the
 * appendix's warning lists them.
 */
export const QUESTIONS_PER_CHALLENGE = 5;

export const ENDINGS = ["sure", "ture", "cher"];

/**
 * `stem` + `ending` spells `word`. `root` is given for the -cher words (the
 * word the er was added to). Each word has two sentences with one blank.
 */
export const WORDS = [
  { word: "measure", ending: "sure", emoji: "📏", meaning: "to find out how long or how heavy something is", sentences: ["Use a ruler to ___ the line.", "Amara helped Grandad ___ the flour for the cake."] },
  { word: "treasure", ending: "sure", emoji: "💰", meaning: "gold and jewels, often hidden", sentences: ["The pirates buried their ___ on the island.", "Leo found a box of ___ under the old tree."] },
  { word: "pleasure", ending: "sure", emoji: "😊", meaning: "a happy feeling of enjoying something", sentences: ["It was a ___ to meet you.", "Reading gives Zayn a lot of ___."] },
  { word: "enclosure", ending: "sure", emoji: "🦒", meaning: "a space with a fence round it, where animals are kept", sentences: ["The giraffes walked round their ___ at the zoo.", "The farmer built a new ___ for the goats."] },
  { word: "creature", ending: "ture", emoji: "🐉", meaning: "any living animal", sentences: ["A strange ___ crawled out of the pond.", "The dragon was a scary ___ with green scales."] },
  { word: "furniture", ending: "ture", emoji: "🛋️", meaning: "tables, chairs, beds and sofas", sentences: ["We moved all the ___ to paint the room.", "The new ___ arrived in a big van."] },
  { word: "picture", ending: "ture", emoji: "🖼️", meaning: "a drawing, painting or photo", sentences: ["Zayn drew a ___ of his house.", "Mum hung the ___ on the wall."] },
  { word: "nature", ending: "ture", emoji: "🌳", meaning: "plants, animals and the world around us", sentences: ["We went on a ___ walk in the woods.", "Ellie loves watching ___ programmes about animals."] },
  { word: "adventure", ending: "ture", emoji: "🧭", meaning: "an exciting trip or event", sentences: ["The camping trip was a real ___.", "Priya read a book about an ___ in the jungle."] },
  { word: "mixture", ending: "ture", emoji: "🥣", meaning: "things stirred together", sentences: ["Stir the cake ___ with a wooden spoon.", "The ___ of paint turned a muddy brown."] },
  { word: "capture", ending: "ture", emoji: "🪤", meaning: "to catch and keep", sentences: ["The knights tried to ___ the castle.", "Biscuit could not ___ the cheeky squirrel."] },
  { word: "future", ending: "ture", emoji: "🔮", meaning: "the time that has not happened yet", sentences: ["In the ___, Amara wants to be a scientist.", "Nobody knows what will happen in the ___."] },
  { word: "sculpture", ending: "ture", emoji: "🗿", meaning: "a model carved or shaped from stone, wood or clay", sentences: ["There was a stone ___ of a lion in the park.", "Zayn made a clay ___ of Biscuit."] },
  { word: "puncture", ending: "ture", emoji: "🛞", meaning: "a small hole in a tyre", sentences: ["Leo’s bike tyre had a ___.", "A sharp nail made a ___ in the tyre."] },
  { word: "departure", ending: "ture", emoji: "🛫", meaning: "leaving on a journey", sentences: ["The board showed the ___ time of our train.", "We waited in the ___ lounge at the airport."] },
  { word: "temperature", ending: "ture", emoji: "🌡️", meaning: "how hot or cold something is", sentences: ["The nurse checked Ellie’s ___.", "The ___ dropped below zero last night."] },
  { word: "teacher", ending: "cher", root: "teach", emoji: "👩‍🏫", meaning: "a person who teaches", sentences: ["Our ___ read us a story.", "The ___ wrote the date on the board."] },
  { word: "catcher", ending: "cher", root: "catch", emoji: "🧤", meaning: "a person who catches", sentences: ["Priya is the best ___ in the team.", "The ___ dived and held on to the ball."] },
  { word: "richer", ending: "cher", root: "rich", emoji: "💷", meaning: "having more money", sentences: ["The king grew ___ every year.", "The farmer was ___ than all his neighbours."] },
  { word: "stretcher", ending: "cher", root: "stretch", emoji: "🚑", meaning: "a bed for carrying someone who is hurt", sentences: ["The hurt player was carried off on a ___.", "Two helpers lifted the ___ into the ambulance."] },
  { word: "watcher", ending: "cher", root: "watch", emoji: "🔭", meaning: "a person who watches", sentences: ["The ___ in the tower looked out for ships.", "A quiet ___ sat by the pond all day, looking for otters."] },
];

/** The word without its ending ("trea" for treasure, "cat" for catcher). */
export function stemOf(entry) {
  return entry.word.slice(0, entry.word.length - entry.ending.length);
}

/** The same start with a different ending: the misspelling a child might write. */
export function wrongSpelling(entry, ending) {
  return stemOf(entry) + ending;
}

/** "m _ _ _ _ _ _": the first letter and the letter count, for the level 4 hint. */
export function letterHint(word) {
  return [word[0], ...Array.from(word.slice(1), () => "_")].join(" ");
}

export function fillBlank(sentence, word) {
  return sentence.replace("___", word);
}

function endingQuestion(entry, rng) {
  return {
    kind: "ending",
    word: entry.word,
    stem: stemOf(entry),
    emoji: entry.emoji,
    meaning: entry.meaning,
    root: entry.root ?? null,
    answer: entry.ending,
    options: shuffle(ENDINGS, rng),
  };
}

/**
 * Level 2: two cards per ending. A card shows the picture and the start of
 * the word with four blanks (every ending is four letters, so the blanks give
 * nothing away). A start shorter than three letters ("ri" for richer) is too
 * little to read, so those words sit out this level.
 */
export const SORTABLE = WORDS.filter((entry) => stemOf(entry).length >= 3);

export function hiddenEnding(entry) {
  return `${stemOf(entry)}____`;
}

function sortQuestion(rng, used) {
  const cards = ENDINGS.flatMap((ending) => {
    const all = SORTABLE.filter((entry) => entry.ending === ending);
    const fresh = all.filter((entry) => !used.has(entry.word));
    const chosen = sample(fresh.length >= 2 ? fresh : all, 2, rng);
    for (const entry of chosen) used.add(entry.word);
    return chosen.map((entry) => ({ id: entry.word, label: `${entry.emoji} ${hiddenEnding(entry)}`, bin: ending }));
  });
  return {
    kind: "sort",
    bins: ENDINGS.map((ending) => ({ id: ending, label: `-${ending}` })),
    cards: shuffle(cards, rng),
  };
}

/**
 * The ending a child is most likely to use instead: -ture for a -sure word,
 * -cher for a -ture word (creacher, furnicher), and -ture for a root + er
 * word. The tests check no swap makes a real word in the bank.
 */
export const SWAP = { sure: "ture", ture: "cher", cher: "ture" };

function spotQuestion(entry, rng) {
  const [sentence] = sample(entry.sentences, 1, rng);
  const wrong = wrongSpelling(entry, SWAP[entry.ending]);
  const tokens = tokenise(fillBlank(sentence, wrong));
  const wrongIndex = tokens.findIndex((token) => bareWord(token) === wrong);
  const others = tokens
    .map((_, index) => index)
    .filter((index) => index !== wrongIndex && bareWord(tokens[index]).length > 2);
  return {
    kind: "spot",
    tokens,
    wrongIndex,
    wrong,
    correct: entry.word,
    hinted: new Set([wrongIndex, ...sample(others, Math.min(2, others.length), rng)]),
  };
}

function typeQuestion(entry, rng) {
  const [sentence] = sample(entry.sentences, 1, rng);
  return {
    kind: "type",
    emoji: entry.emoji,
    sentence,
    answer: entry.word,
    spoken: fillBlank(sentence, entry.word),
    hint: letterHint(entry.word),
  };
}

export function buildTheSureAndTureEndingsQuestions(level, rng) {
  if (level === 1) {
    // At least one of each ending in a run, so the rule is seen whole.
    const picks = ENDINGS.map((ending) => sample(WORDS.filter((entry) => entry.ending === ending), 1, rng)[0]);
    const rest = sample(WORDS.filter((entry) => !picks.includes(entry)), QUESTIONS_PER_CHALLENGE - picks.length, rng);
    return shuffle([...picks, ...rest], rng).map((entry) => endingQuestion(entry, rng));
  }
  if (level === 2) {
    const used = new Set();
    return Array.from({ length: QUESTIONS_PER_CHALLENGE }, () => sortQuestion(rng, used));
  }
  if (level === 3) return sample(WORDS, QUESTIONS_PER_CHALLENGE, rng).map((entry) => spotQuestion(entry, rng));
  if (level === 4) return sample(WORDS, QUESTIONS_PER_CHALLENGE, rng).map((entry) => typeQuestion(entry, rng));
  throw new Error(`no sure and ture level ${level}`);
}

export function isSortCorrect(question, placement) {
  return question.cards.every((card) => placement[card.id] === card.bin);
}

/** For the tests: the appendix's example words. */
export const APPENDIX_WORDS = [...PATTERNS.sure.words, ...PATTERNS.ture.words];
