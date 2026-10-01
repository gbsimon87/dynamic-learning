import { sample, shuffle } from "./shared.js";

/**
 * Year 3 Root Words: "apply their growing knowledge of root words, prefixes
 * and suffixes … both to read aloud and to understand the meaning of new
 * words they meet".
 *
 *   1 find    the prefix and suffix are marked; choose the root word (shown)
 *   2 odd     three words share a root word; tap the one that does not
 *             (inferred)
 *   3 build   build the word that matches a meaning from a root and affix
 *             tiles (whole word)
 *   4 meaning read a new word in a sentence and choose what it means
 *             (applied, no gloss)
 *
 * Only prefixes and suffixes a Year 3 child has met are used: un, dis, mis,
 * re, sub, inter, super, in; -ful, -less, -ness, -ment, -er, -est, -ing, -ed,
 * -ly, -ation. Where the root's spelling changes, the item says so (`note`).
 */
export const QUESTIONS_PER_CHALLENGE = 5;

export const YEAR3_PREFIXES = ["un", "dis", "mis", "re", "sub", "inter", "super", "in"];
export const YEAR3_SUFFIXES = ["ful", "less", "ness", "ment", "er", "est", "ing", "ed", "ly", "ation"];

/**
 * Level 1. `parts` spells the word exactly, each part tagged; the root part
 * is shown as written in the word, which may differ from `root` (happi →
 * happy), and then `note` explains the change. `wrong` are hand-picked:
 * the word with one affix still on, or a smaller word hiding inside.
 */
export const FIND_ITEMS = [
  { parts: [["un", "prefix"], ["help", "root"], ["ful", "suffix"]], root: "help", wrong: ["helpful", "unhelp"] },
  { parts: [["dis", "prefix"], ["appear", "root"], ["ing", "suffix"]], root: "appear", wrong: ["disappear", "appearing"] },
  { parts: [["re", "prefix"], ["play", "root"], ["ed", "suffix"]], root: "play", wrong: ["replay", "played"] },
  { parts: [["un", "prefix"], ["kind", "root"], ["ness", "suffix"]], root: "kind", wrong: ["unkind", "kindness"] },
  { parts: [["happi", "root"], ["ness", "suffix"]], root: "happy", wrong: ["happi", "ness"], note: "The y at the end of happy changes to i before -ness." },
  { parts: [["care", "root"], ["less", "suffix"]], root: "care", wrong: ["car", "less"] },
  { parts: [["mis", "prefix"], ["behav", "root"], ["ing", "suffix"]], root: "behave", wrong: ["behav", "misbehave"], note: "The e at the end of behave is dropped before -ing." },
  { parts: [["re", "prefix"], ["build", "root"], ["ing", "suffix"]], root: "build", wrong: ["rebuild", "building"] },
  { parts: [["teach", "root"], ["er", "suffix"]], root: "teach", wrong: ["tea", "her"] },
  { parts: [["re", "prefix"], ["heat", "root"], ["ed", "suffix"]], root: "heat", wrong: ["eat", "reheat"] },
  { parts: [["inter", "prefix"], ["act", "root"], ["ing", "suffix"]], root: "act", wrong: ["interact", "acting"] },
  { parts: [["super", "prefix"], ["star", "root"]], root: "star", wrong: ["super", "tar"] },
  { parts: [["sad", "root"], ["ness", "suffix"]], root: "sad", wrong: ["ad", "ness"] },
  { parts: [["hope", "root"], ["less", "suffix"]], root: "hope", wrong: ["hop", "less"] },
  { parts: [["un", "prefix"], ["lock", "root"], ["ed", "suffix"]], root: "lock", wrong: ["unlock", "locked"] },
  { parts: [["final", "root"], ["ly", "suffix"]], root: "final", wrong: ["fin", "ally"] },
  { parts: [["prepar", "root"], ["ation", "suffix"]], root: "prepare", wrong: ["prepar", "ration"], note: "The e at the end of prepare is dropped before -ation." },
  { parts: [["in", "prefix"], ["correct", "root"]], root: "correct", wrong: ["in", "rect"] },
  { parts: [["dis", "prefix"], ["agree", "root"], ["ment", "suffix"]], root: "agree", wrong: ["disagree", "agreement"] },
];

/**
 * Level 2. `family` share the root; `odd` only LOOKS like it (it shares the
 * first letters, not the root word). Words like "delight" or "painting",
 * which fool even grown-ups, are left out on purpose.
 */
export const ODD_SETS = [
  { root: "help", family: ["helpful", "unhelpful", "helper"], odd: "helmet" },
  { root: "play", family: ["replay", "playful", "player"], odd: "place" },
  { root: "kind", family: ["unkind", "kindness", "kindly"], odd: "king" },
  { root: "appear", family: ["disappear", "appearing", "reappear"], odd: "apple" },
  { root: "care", family: ["careful", "careless", "cared"], odd: "carpet" },
  { root: "agree", family: ["disagree", "agreement", "agreeing"], odd: "again" },
  { root: "happy", family: ["happiness", "unhappy", "happily"], odd: "hippo" },
  { root: "fear", family: ["fearful", "fearless", "feared"], odd: "feather" },
  { root: "hope", family: ["hopeful", "hopeless", "hoped"], odd: "hoops" },
  { root: "teach", family: ["teacher", "teaching", "teaches"], odd: "teapot" },
  { root: "light", family: ["lighter", "lightly", "sunlight"], odd: "lift" },
  { root: "friend", family: ["friendly", "unfriendly", "friendship"], odd: "fridge" },
  { root: "cook", family: ["cooker", "cooking", "uncooked"], odd: "cool" },
  { root: "read", family: ["reader", "reread", "reading"], odd: "reach" },
  { root: "heat", family: ["reheat", "heater", "heated"], odd: "heart" },
  { root: "sleep", family: ["sleepy", "sleepless", "sleeping"], odd: "sleeve" },
  { root: "lock", family: ["unlock", "locked", "locker"], odd: "lorry" },
  { root: "paint", family: ["painter", "repaint", "painted"], odd: "palm" },
];

/**
 * Level 3. Build the word from the root and affix tiles. `answer` lists the
 * parts in order; `extra` are tiles that make no word with that meaning.
 * No item needs a spelling change, so the tiles simply join.
 */
export const BUILD_ITEMS = [
  { meaning: "to write something again", answer: ["re", "write"], extra: ["un", "er", "ing"] },
  { meaning: "full of hope", answer: ["hope", "ful"], extra: ["less", "un", "re"] },
  { meaning: "without any fear", answer: ["fear", "less"], extra: ["ful", "un", "er"] },
  { meaning: "not kind", answer: ["un", "kind"], extra: ["ness", "ly", "re"] },
  { meaning: "a person who teaches", answer: ["teach", "er"], extra: ["re", "ing", "ful"] },
  { meaning: "to play a game again", answer: ["re", "play"], extra: ["er", "ful", "dis"] },
  { meaning: "to not agree", answer: ["dis", "agree"], extra: ["re", "ment", "ing"] },
  { meaning: "being kind to others", answer: ["kind", "ness"], extra: ["un", "ly", "er"] },
  { meaning: "in a quick way", answer: ["quick", "ly"], extra: ["er", "est", "ness"] },
  { meaning: "to behave badly", answer: ["mis", "behave"], extra: ["re", "un", "ing"] },
  { meaning: "not happy", answer: ["un", "happy"], extra: ["re", "dis", "er"] },
  { meaning: "to appear again", answer: ["re", "appear"], extra: ["dis", "ing", "ed"] },
  { meaning: "the most cold", answer: ["cold", "est"], extra: ["er", "ly", "ness"] },
  { meaning: "to take things out of a bag or a box", answer: ["un", "pack"], extra: ["re", "er", "ing"] },
  { meaning: "a person who paints", answer: ["paint", "er"], extra: ["re", "ing", "ful"] },
  { meaning: "without any pain", answer: ["pain", "less"], extra: ["ful", "er", "re"] },
  { meaning: "to open something with a key", answer: ["un", "lock"], extra: ["re", "er", "ed"] },
  { meaning: "the feeling of enjoying something", answer: ["enjoy", "ment"], extra: ["er", "ful", "re"] },
];

/** The meaning each prefix and suffix adds, for the level 3 and 4 hints. */
export const AFFIX_MEANINGS = {
  un: "not, or undo",
  dis: "not",
  mis: "wrongly or badly",
  re: "again",
  in: "not",
  inter: "between",
  sub: "under",
  super: "very big or more than",
  ful: "full of",
  less: "without",
  ness: "being something",
  ment: "the act or feeling of",
  er: "a person who does it, or more",
  est: "the most",
  ing: "doing it now",
  ed: "it happened before",
  ly: "in that way",
  ation: "the act of",
};

/**
 * Level 4. A new word in a sentence; `parts` split it for the hint. Wrong
 * meanings use the wrong prefix or suffix (re for mis, ful for less), so
 * only reading the parts gets it right. `note` flags a spelling change.
 */
export const MEANING_ITEMS = [
  { sentence: "Zayn had to rewrite his story because it got wet.", word: "rewrite", parts: ["re", "write"], answer: "write it again", wrong: ["write it badly", "not write it at all"] },
  { sentence: "The farmer was careless and left the gate open.", word: "careless", parts: ["care", "less"], answer: "without care", wrong: ["full of care", "caring again"] },
  { sentence: "Amara misread the sign and went the wrong way.", word: "misread", parts: ["mis", "read"], answer: "read it wrongly", wrong: ["read it again", "read it very well"] },
  { sentence: "The heading had a small subheading under it.", word: "subheading", parts: ["sub", "heading"], answer: "a smaller heading under the main one", wrong: ["a heading that is spelt wrongly", "the same heading again"] },
  { sentence: "The computer froze, so Mum had to restart it.", word: "restart", parts: ["re", "start"], answer: "start it again", wrong: ["not start it", "start it wrongly"] },
  { sentence: "Biscuit was fearless and jumped straight into the pond.", word: "fearless", parts: ["fear", "less"], answer: "without fear", wrong: ["full of fear", "scared again"] },
  { sentence: "Ellie was thankful for her friend’s help.", word: "thankful", parts: ["thank", "ful"], answer: "full of thanks", wrong: ["without thanks", "thanking again"] },
  { sentence: "The teacher said the answer was incorrect.", word: "incorrect", parts: ["in", "correct"], answer: "not correct", wrong: ["correct again", "very correct"] },
  { sentence: "Priya disliked the cold, lumpy soup.", word: "disliked", parts: ["dis", "liked"], answer: "did not like it", wrong: ["liked it again", "liked it a lot"] },
  { sentence: "The intercity train goes from London to Leeds.", word: "intercity", parts: ["inter", "city"], answer: "going between cities", wrong: ["staying inside one city", "a city under the ground"] },
  { sentence: "Ellie spoke softly so the baby did not wake.", word: "softly", parts: ["soft", "ly"], answer: "in a soft, quiet way", wrong: ["in a loud way", "without being soft"] },
  { sentence: "Amara’s kindness made everyone smile.", word: "kindness", parts: ["kind", "ness"], answer: "being kind", wrong: ["not being kind", "being kind again"] },
  { sentence: "Leo had to unpack his bag after the trip.", word: "unpack", parts: ["un", "pack"], answer: "take things out of it", wrong: ["pack it again", "pack it badly"] },
  { sentence: "Zayn felt great enjoyment when he finished his model.", word: "enjoyment", parts: ["enjoy", "ment"], answer: "the feeling of enjoying something", wrong: ["not enjoying something", "enjoying it again"] },
  { sentence: "It was the coldest day of the whole year.", word: "coldest", parts: ["cold", "est"], answer: "more cold than any other", wrong: ["a little bit cold", "not cold at all"] },
  { sentence: "Priya repainted the old fence bright blue.", word: "repainted", parts: ["re", "painted"], answer: "painted it again", wrong: ["painted it badly", "took the paint off"] },
  { sentence: "Biscuit disobeyed Ellie and ran off with her sock.", word: "disobeyed", parts: ["dis", "obeyed"], answer: "did not do what he was told", wrong: ["did what he was told again", "did just what he was told"] },
  { sentence: "Leo’s happiness was easy to see when he scored.", word: "happiness", parts: ["happi", "ness"], answer: "being happy", wrong: ["not being happy", "being happy again"], note: "happy changes its y to i: happi + ness." },
  { sentence: "Zayn was the fastest runner in the race.", word: "fastest", parts: ["fast", "est"], answer: "faster than everyone else", wrong: ["a little bit fast", "not fast at all"] },
];

/** The word a level 1 item shows, joined from its parts. */
export function wordOf(item) {
  return item.parts.map(([text]) => text).join("");
}

function findQuestion(item, rng) {
  return {
    kind: "find",
    parts: item.parts,
    word: wordOf(item),
    note: item.note ?? null,
    answer: item.root,
    options: shuffle([item.root, ...item.wrong], rng),
  };
}

function oddQuestion(set, rng) {
  return {
    kind: "odd",
    root: set.root,
    answer: set.odd,
    options: shuffle([...set.family, set.odd], rng),
  };
}

function buildQuestion(item, rng) {
  const tiles = [...item.answer, ...item.extra].map((label, index) => ({ id: `t${index}`, label }));
  return {
    kind: "build",
    meaning: item.meaning,
    answer: item.answer.join(""),
    parts: item.answer,
    affixAt: YEAR3_PREFIXES.includes(item.answer[0]) ? "front" : "end",
    tiles: shuffle(tiles, rng),
  };
}

function meaningQuestion(item, rng) {
  return {
    kind: "meaning",
    sentence: item.sentence,
    word: item.word,
    parts: item.parts,
    note: item.note ?? null,
    answer: item.answer,
    options: shuffle([item.answer, ...item.wrong], rng),
  };
}

const LEVELS = {
  1: [FIND_ITEMS, findQuestion],
  2: [ODD_SETS, oddQuestion],
  3: [BUILD_ITEMS, buildQuestion],
  4: [MEANING_ITEMS, meaningQuestion],
};

export function buildRootWordsQuestions(level, rng) {
  const entry = LEVELS[level];
  if (!entry) throw new Error(`no root words level ${level}`);
  const [bank, make] = entry;
  return sample(bank, QUESTIONS_PER_CHALLENGE, rng).map((item) => make(item, rng));
}

/** Level 3: the placed tiles, joined, must spell the word. */
export function builtWord(question, placed) {
  return placed.map((id) => question.tiles.find((tile) => tile.id === id)?.label ?? "").join("");
}
