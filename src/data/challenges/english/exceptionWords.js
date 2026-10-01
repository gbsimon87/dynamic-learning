import { sample, shuffle } from "./shared.js";

/**
 * Year 3 Exception Words: "read further exception words, noting the unusual
 * correspondences between spelling and sound, and where these occur in the
 * word".
 *
 *   1 sound   the tricky letters are marked; choose what they say (shown)
 *   2 which   given letters and a sound, choose the word where those letters
 *             make that sound (inferred, nothing marked)
 *   3 tap     tap the letters in the word that make a given sound (where in
 *             the word it occurs)
 *   4 read    read a sentence and choose the exception word that fits it
 *             (applied: the child must read the words to choose)
 *
 * Every target word comes from the Year 3 half of the statutory word list
 * (WORD_LIST[3]); the tests check it. A question always names the sound it is
 * about, so a word with two unusual parts (centre, circle) still has one
 * answer. Speech is offered, never needed: every question is answered by
 * reading.
 */
export const QUESTIONS_PER_CHALLENGE = 5;

/** How each sound is written for a child: the sound, then a word it is in. */
export const SOUNDS = {
  silent: "no sound at all",
  ar: "“ar”, as in car",
  e: "“e”, as in bed",
  ee: "“ee”, as in see",
  i: "“i”, as in pin",
  or: "“or”, as in fork",
  uff: "“uff”, as in puff",
  ay: "“ay”, as in day",
  er: "“er”, as in her",
  ear: "“ear”, as in hear",
  air: "“air”, as in hair",
  s: "“s”, as in sun",
  k: "“k”, as in kite",
  oo: "“oo”, as in moon",
  ow: "“ow”, as in cow",
  u: "“u”, as in cup",
  eye: "“eye”, as in my",
  arf: "“arf”, as in half",
  z: "“z”, as in zoo",
  w: "“w”, as in wet",
};

/**
 * The words. `chunks` spell the word; `at` is the index of the tricky chunk;
 * `says` is the sound it makes (a SOUNDS key) and `wrong` two sounds it does
 * NOT make there, chosen as near-misses (ear in heart is not "ear" or "er").
 */
export const WORDS = [
  { word: "answer", chunks: ["a", "n", "s", "w", "er"], at: 3, says: "silent", wrong: ["w", "oo"] },
  { word: "guard", chunks: ["g", "u", "ar", "d"], at: 1, says: "silent", wrong: ["u", "oo"] },
  { word: "guide", chunks: ["g", "u", "ide"], at: 1, says: "silent", wrong: ["u", "oo"] },
  { word: "heart", chunks: ["h", "ear", "t"], at: 1, says: "ar", wrong: ["ear", "er"] },
  { word: "breath", chunks: ["b", "r", "ea", "th"], at: 2, says: "e", wrong: ["ee", "ay"] },
  { word: "busy", chunks: ["b", "u", "s", "y"], at: 1, says: "i", wrong: ["u", "oo"] },
  { word: "business", chunks: ["b", "u", "s", "i", "n", "e", "ss"], at: 1, says: "i", wrong: ["u", "oo"] },
  { word: "build", chunks: ["b", "ui", "l", "d"], at: 1, says: "i", wrong: ["oo", "eye"] },
  { word: "caught", chunks: ["c", "augh", "t"], at: 1, says: "or", wrong: ["arf", "ow"] },
  { word: "enough", chunks: ["e", "n", "ough"], at: 2, says: "uff", wrong: ["ow", "oo"] },
  { word: "eight", chunks: ["eigh", "t"], at: 0, says: "ay", wrong: ["eye", "ee"] },
  { word: "eighth", chunks: ["eigh", "th"], at: 0, says: "ay", wrong: ["eye", "ee"] },
  { word: "early", chunks: ["ear", "l", "y"], at: 0, says: "er", wrong: ["ear", "ar"] },
  { word: "earth", chunks: ["ear", "th"], at: 0, says: "er", wrong: ["ear", "air"] },
  { word: "heard", chunks: ["h", "ear", "d"], at: 1, says: "er", wrong: ["ear", "air"] },
  { word: "certain", chunks: ["c", "er", "t", "ai", "n"], at: 0, says: "s", wrong: ["k", "ee"] },
  { word: "centre", chunks: ["c", "e", "n", "t", "re"], at: 0, says: "s", wrong: ["k", "ee"] },
  { word: "circle", chunks: ["c", "ir", "c", "le"], at: 0, says: "s", wrong: ["k", "ee"] },
  { word: "bicycle", chunks: ["b", "i", "c", "y", "c", "le"], at: 2, says: "s", wrong: ["k", "ee"] },
  { word: "fruit", chunks: ["f", "r", "ui", "t"], at: 2, says: "oo", wrong: ["i", "eye"] },
  { word: "group", chunks: ["g", "r", "ou", "p"], at: 2, says: "oo", wrong: ["ow", "u"] },
  { word: "height", chunks: ["h", "eigh", "t"], at: 1, says: "eye", wrong: ["ay", "ee"] },
];

/** The letters a question is about. */
export function trickyLetters(entry) {
  return entry.chunks[entry.at];
}

/**
 * Level 2. Which word has these letters making this sound? `answer` is a
 * Year 3 list word; the wrong words are everyday words (or list words) where
 * the same letters make a DIFFERENT sound, or that do not have them, so only
 * reading each one gets it right.
 */
export const WHICH_ITEMS = [
  { letters: "ear", sound: "er", answer: "earth", wrong: ["heart", "near"] },
  { letters: "ear", sound: "ar", answer: "heart", wrong: ["early", "hear"] },
  { letters: "ear", sound: "er", answer: "heard", wrong: ["heart", "fear"] },
  { letters: "ear", sound: "er", answer: "early", wrong: ["year", "pear"] },
  { letters: "ea", sound: "e", answer: "breath", wrong: ["breathe", "team"] },
  { letters: "u", sound: "i", answer: "busy", wrong: ["bus", "push"] },
  { letters: "u", sound: "i", answer: "business", wrong: ["bush", "under"] },
  { letters: "ui", sound: "i", answer: "build", wrong: ["fruit", "juice"] },
  { letters: "ui", sound: "oo", answer: "fruit", wrong: ["build", "biscuit"] },
  { letters: "ou", sound: "oo", answer: "group", wrong: ["shout", "round"] },
  { letters: "augh", sound: "or", answer: "caught", wrong: ["laugh", "catch"] },
  { letters: "ough", sound: "uff", answer: "enough", wrong: ["through", "plough"] },
  { letters: "eigh", sound: "ay", answer: "eight", wrong: ["height", "eat"] },
  { letters: "eigh", sound: "eye", answer: "height", wrong: ["eight", "eighth"] },
  { letters: "c", sound: "s", answer: "bicycle", wrong: ["cabbage", "cupboard"] },
  { letters: "w", sound: "silent", answer: "answer", wrong: ["swing", "sweep"] },
  { letters: "u", sound: "silent", answer: "guard", wrong: ["gum", "gull"] },
  { letters: "u", sound: "silent", answer: "guide", wrong: ["glue", "gum"] },
  { letters: "c", sound: "s", answer: "centre", wrong: ["castle", "cobweb"] },
  { letters: "c", sound: "s", answer: "circle", wrong: ["cuddle", "crab"] },
  { letters: "c", sound: "s", answer: "certain", wrong: ["curtain", "carton"] },
];

/**
 * Level 4. A sentence with a blank and three Year 3 list words. Only the
 * answer fits; the wrong words were chosen so none could be defended
 * ("Mum is very early today" would be, so early is never offered there).
 */
export const READ_ITEMS = [
  { sentence: "Fish ___ under water through their gills.", answer: "breathe", wrong: ["breath", "heart"] },
  { sentence: "Leo put up his hand to ___ the question.", answer: "answer", wrong: ["build", "guide"] },
  { sentence: "A ___ stood outside the castle gate all night.", answer: "guard", wrong: ["breath", "eighth"] },
  { sentence: "Our ___ showed us the way round the museum.", answer: "guide", wrong: ["heart", "eighth"] },
  { sentence: "Amara could feel her ___ beating fast after the race.", answer: "heart", wrong: ["centre", "group"] },
  { sentence: "It was so cold that we could see our ___ in the air.", answer: "breath", wrong: ["answer", "centre"] },
  { sentence: "Mum is very ___ today, so Dad is cooking tea.", answer: "busy", wrong: ["heart", "guide"] },
  { sentence: "Zayn wants to ___ a den at the bottom of the garden.", answer: "build", wrong: ["caught", "eighth"] },
  { sentence: "Priya ___ the ball with one hand.", answer: "caught", wrong: ["early", "fruit"] },
  { sentence: "Is there ___ cake for everyone?", answer: "enough", wrong: ["centre", "circle"] },
  { sentence: "A spider has ___ legs.", answer: "eight", wrong: ["eighth", "heart"] },
  { sentence: "Ellie came ___ in the race, after seven other runners.", answer: "eighth", wrong: ["eight", "enough"] },
  { sentence: "The birds start singing ___ in the morning, before the sun is up.", answer: "early", wrong: ["earth", "heard"] },
  { sentence: "Worms wriggle through the soft ___ in the garden.", answer: "earth", wrong: ["heart", "breath"] },
  { sentence: "I ___ a strange noise in the night.", answer: "heard", wrong: ["guide", "fruit"] },
  { sentence: "Are you ___ that you shut the door?", answer: "certain", wrong: ["early", "circle"] },
  { sentence: "The bus stops in the ___ of the town.", answer: "centre", wrong: ["breath", "eighth"] },
  { sentence: "We sat in a ___ on the carpet for the story.", answer: "circle", wrong: ["heart", "enough"] },
  { sentence: "Leo rides his ___ to school.", answer: "bicycle", wrong: ["fruit", "guide"] },
  { sentence: "An apple is a kind of ___.", answer: "fruit", wrong: ["group", "guard"] },
  { sentence: "We worked in a ___ of four.", answer: "group", wrong: ["fruit", "heart"] },
  { sentence: "The giant was so tall that nobody could measure his ___.", answer: "height", wrong: ["answer", "eighth"] },
  { sentence: "Dad has his own ___ selling cakes.", answer: "business", wrong: ["busy", "build"] },
];

function soundQuestion(entry, rng) {
  const answer = SOUNDS[entry.says];
  return {
    kind: "sound",
    word: entry.word,
    chunks: entry.chunks,
    at: entry.at,
    letters: trickyLetters(entry),
    answer,
    options: shuffle([answer, ...entry.wrong.map((key) => SOUNDS[key])], rng),
  };
}

function whichQuestion(item, rng) {
  return {
    kind: "which",
    letters: item.letters,
    sound: SOUNDS[item.sound],
    silent: item.sound === "silent",
    answer: item.answer,
    options: shuffle([item.answer, ...item.wrong], rng),
  };
}

/** Level 3 hint: the tricky chunk and up to two others, underlined, never all of them. */
function tapQuestion(entry, rng) {
  const others = entry.chunks.map((_, index) => index).filter((index) => index !== entry.at);
  return {
    kind: "tap",
    word: entry.word,
    chunks: entry.chunks,
    at: entry.at,
    letters: trickyLetters(entry),
    sound: SOUNDS[entry.says],
    silent: entry.says === "silent",
    // A two-part word (eight, earth) cannot be narrowed without giving the
    // answer away, so it gets a spoken-word hint instead (null here).
    hinted: others.length < 2 ? null : new Set([entry.at, ...sample(others, Math.min(2, others.length - 1), rng)]),
  };
}

function readQuestion(item, rng) {
  return {
    kind: "read",
    sentence: item.sentence,
    answer: item.answer,
    options: shuffle([item.answer, ...item.wrong], rng),
  };
}

const LEVELS = {
  1: [WORDS, soundQuestion],
  2: [WHICH_ITEMS, whichQuestion],
  3: [WORDS, tapQuestion],
  4: [READ_ITEMS, readQuestion],
};

export function buildExceptionWordsQuestions(level, rng) {
  const entry = LEVELS[level];
  if (!entry) throw new Error(`no exception words level ${level}`);
  const [bank, make] = entry;
  return sample(bank, QUESTIONS_PER_CHALLENGE, rng).map((item) => make(item, rng));
}
