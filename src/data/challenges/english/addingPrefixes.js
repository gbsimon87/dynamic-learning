import { PATTERNS } from "../../english/appendix1.js";
import { sample, shuffle } from "./shared.js";

/**
 * Year 3 Adding Prefixes: "use further prefixes and suffixes and understand
 * how to add them" (Appendix 1, "More prefixes": dis–, mis–, in– meaning
 * "not", re–, sub–, inter–).
 *
 *   1 pick    the meanings are shown; pick the prefix that makes the word
 *   2 sort    sort prefixed words by what the prefix means (inferred)
 *   3 build   build the word from a prefix tile and a root tile; a trap tile
 *             spells the common mistake (mispell, dissappear)
 *   4 type    a sentence and a root word in brackets: type the whole word
 *             (applied, no meanings shown)
 *
 * The appendix's point is that a prefix is added WITHOUT changing the root:
 * mis + spell = misspell, two s's. Level 3 is built around that.
 *
 * il–, im– and ir– (illegal, impossible, irregular) are Year 4 and never
 * appear (addingPrefixes.test.js checks).
 */
export const QUESTIONS_PER_CHALLENGE = 5;

export const PREFIXES = ["dis", "mis", "in", "re", "sub", "inter"];

/**
 * What each meaning group is called on screen. dis– and in– both make the
 * opposite ("not"); mis– is "wrongly or badly". The appendix groups dis– and
 * mis– as "negative", but a seven-year-old can only sort by a meaning they
 * can test: dislike is "not like", misspell is "spell wrongly".
 */
export const MEANINGS = {
  not: "not, or the opposite",
  wrongly: "wrongly or badly",
  again: "again or back",
  under: "under",
  between: "between or among",
};

export const PREFIX_MEANING = {
  dis: "not",
  in: "not",
  mis: "wrongly",
  re: "again",
  sub: "under",
  inter: "between",
};

/**
 * Every prefixed word the topic uses: prefix + root, exactly. Appendix 1's
 * own examples are all here (the test checks), plus age-appropriate words
 * that follow the same rule.
 */
export const PREFIXED_WORDS = [
  // dis– (not, the opposite)
  { word: "disappear", prefix: "dis", root: "appear" },
  { word: "disagree", prefix: "dis", root: "agree" },
  { word: "disobey", prefix: "dis", root: "obey" },
  { word: "disappoint", prefix: "dis", root: "appoint" },
  { word: "dislike", prefix: "dis", root: "like" },
  { word: "dishonest", prefix: "dis", root: "honest" },
  { word: "disconnect", prefix: "dis", root: "connect" },
  // in– (not)
  { word: "inactive", prefix: "in", root: "active" },
  { word: "incorrect", prefix: "in", root: "correct" },
  { word: "invisible", prefix: "in", root: "visible" },
  { word: "incomplete", prefix: "in", root: "complete" },
  // mis– (wrongly, badly)
  { word: "misbehave", prefix: "mis", root: "behave" },
  { word: "mislead", prefix: "mis", root: "lead" },
  { word: "misspell", prefix: "mis", root: "spell" },
  { word: "misread", prefix: "mis", root: "read" },
  { word: "misplace", prefix: "mis", root: "place" },
  { word: "misunderstand", prefix: "mis", root: "understand" },
  // re– (again, back)
  { word: "redo", prefix: "re", root: "do" },
  { word: "refresh", prefix: "re", root: "fresh" },
  { word: "return", prefix: "re", root: "turn" },
  { word: "reappear", prefix: "re", root: "appear" },
  { word: "redecorate", prefix: "re", root: "decorate" },
  { word: "rebuild", prefix: "re", root: "build" },
  { word: "refill", prefix: "re", root: "fill" },
  { word: "replay", prefix: "re", root: "play" },
  // sub– (under)
  { word: "subdivide", prefix: "sub", root: "divide" },
  { word: "subheading", prefix: "sub", root: "heading" },
  { word: "submarine", prefix: "sub", root: "marine" },
  { word: "submerge", prefix: "sub", root: "merge" },
  { word: "subway", prefix: "sub", root: "way" },
  { word: "subtitle", prefix: "sub", root: "title" },
  // inter– (between, among)
  { word: "interact", prefix: "inter", root: "act" },
  { word: "intercity", prefix: "inter", root: "city" },
  { word: "international", prefix: "inter", root: "national" },
  { word: "interrelated", prefix: "inter", root: "related" },
  { word: "interlink", prefix: "inter", root: "link" },
  { word: "interchange", prefix: "inter", root: "change" },
];

/**
 * Level 1: the meaning decides the prefix. `wrong` is chosen by hand: never
 * the other "not" prefix (discorrect, inagree) beside a "not" word, so the
 * meanings table alone is enough to answer.
 */
export const PICK_ITEMS = [
  { root: "appear", answer: "dis", meaning: "to go out of sight", emoji: "🎩", wrong: ["re", "sub", "inter"] },
  { root: "spell", answer: "mis", meaning: "to spell a word wrongly", emoji: "✏️", wrong: ["re", "sub", "inter"] },
  { root: "correct", answer: "in", meaning: "not correct", emoji: "❌", wrong: ["re", "mis", "sub"] },
  { root: "do", answer: "re", meaning: "to do something again", emoji: "🔁", wrong: ["dis", "sub", "inter"] },
  { root: "marine", answer: "sub", meaning: "a boat that goes under the sea", emoji: "🌊", wrong: ["re", "inter", "dis"] },
  { root: "national", answer: "inter", meaning: "between different nations (countries)", emoji: "🌍", wrong: ["sub", "re", "mis"] },
  { root: "agree", answer: "dis", meaning: "to not agree", emoji: "🙅", wrong: ["re", "sub", "inter"] },
  { root: "behave", answer: "mis", meaning: "to behave badly", emoji: "😈", wrong: ["re", "sub", "inter"] },
  { root: "active", answer: "in", meaning: "not active", emoji: "😴", wrong: ["re", "sub", "inter"] },
  { root: "build", answer: "re", meaning: "to build something again", emoji: "🧱", wrong: ["dis", "sub", "inter"] },
  { root: "heading", answer: "sub", meaning: "a small heading under a big one", emoji: "📰", wrong: ["re", "mis", "inter"] },
  { root: "city", answer: "inter", meaning: "going between cities", emoji: "🚆", wrong: ["sub", "re", "dis"] },
  { root: "obey", answer: "dis", meaning: "to not obey", emoji: "🐶", wrong: ["re", "sub", "inter"] },
  { root: "lead", answer: "mis", meaning: "to lead someone the wrong way", emoji: "🧭", wrong: ["re", "sub", "inter"] },
  { root: "visible", answer: "in", meaning: "not able to be seen", emoji: "👻", wrong: ["re", "sub", "mis"] },
  { root: "turn", answer: "re", meaning: "to come back", emoji: "↩️", wrong: ["dis", "sub", "inter"] },
  { root: "merge", answer: "sub", meaning: "to go under the water", emoji: "🤿", wrong: ["re", "inter", "mis"] },
  { root: "act", answer: "inter", meaning: "to act with each other", emoji: "🤝", wrong: ["sub", "dis", "mis"] },
  { root: "like", answer: "dis", meaning: "to not like", emoji: "👎", wrong: ["re", "sub", "inter"] },
  { root: "fill", answer: "re", meaning: "to fill something again", emoji: "🥤", wrong: ["dis", "sub", "inter"] },
];

/**
 * Level 3: prefix + root, plus a TRAP root tile that spells the mistake
 * children make most: dropping a letter where the prefix ends with the
 * root's first letter (mis + pell), or doubling one that should not be
 * (dis + sappear).
 */
export const BUILD_ITEMS = [
  { word: "misspell", prefix: "mis", root: "spell", trap: "pell", meaning: "to spell a word wrongly" },
  { word: "disappear", prefix: "dis", root: "appear", trap: "sappear", meaning: "to go out of sight" },
  { word: "disagree", prefix: "dis", root: "agree", trap: "sagree", meaning: "to not agree" },
  { word: "disobey", prefix: "dis", root: "obey", trap: "sobey", meaning: "to not do as you are told" },
  { word: "dislike", prefix: "dis", root: "like", trap: "slike", meaning: "to not like" },
  { word: "disappoint", prefix: "dis", root: "appoint", trap: "sappoint", meaning: "to let someone down" },
  { word: "misbehave", prefix: "mis", root: "behave", trap: "sbehave", meaning: "to behave badly" },
  { word: "mislead", prefix: "mis", root: "lead", trap: "slead", meaning: "to lead someone the wrong way" },
  { word: "misread", prefix: "mis", root: "read", trap: "sread", meaning: "to read something wrongly" },
  { word: "incorrect", prefix: "in", root: "correct", trap: "corect", meaning: "not correct" },
  { word: "inactive", prefix: "in", root: "active", trap: "nactive", meaning: "not active" },
  { word: "invisible", prefix: "in", root: "visible", trap: "visable", meaning: "not able to be seen" },
  { word: "reappear", prefix: "re", root: "appear", trap: "apear", meaning: "to come back into sight" },
  { word: "rebuild", prefix: "re", root: "build", trap: "bild", meaning: "to build something again" },
  { word: "return", prefix: "re", root: "turn", trap: "tern", meaning: "to come back" },
  { word: "subheading", prefix: "sub", root: "heading", trap: "eading", meaning: "a small heading under a big one" },
  { word: "submarine", prefix: "sub", root: "marine", trap: "bmarine", meaning: "a boat that goes under the sea" },
  { word: "interrelated", prefix: "inter", root: "related", trap: "elated", meaning: "linked to each other" },
  { word: "intercity", prefix: "inter", root: "city", trap: "sity", meaning: "going between cities" },
  { word: "interact", prefix: "inter", root: "act", trap: "ract", meaning: "to act with each other" },
];

/**
 * Level 4: the sentence decides the prefix, and only one prefix makes sense.
 * `root` is shown in brackets; the child types the whole word.
 */
export const TYPE_ITEMS = [
  { sentence: "Puff! The coin seemed to ___ into thin air.", root: "appear", answer: "disappear", emoji: "🪙" },
  { sentence: "Leo got the sum wrong, so his answer was ___.", root: "correct", answer: "incorrect", emoji: "❌" },
  { sentence: "Zayn’s tower fell down, so he had to ___ it.", root: "build", answer: "rebuild", emoji: "🧱" },
  { sentence: "The ___ dived deep under the sea.", root: "marine", answer: "submarine", emoji: "🌊" },
  { sentence: "Biscuit chews shoes. He likes to ___ when nobody is looking.", root: "behave", answer: "misbehave", emoji: "🐶" },
  { sentence: "Amara and Ellie never think the same. They always ___.", root: "agree", answer: "disagree", emoji: "🙅" },
  { sentence: "Leo forgot the double letter, so he ___ the word.", root: "spelt", answer: "misspelt", emoji: "✏️" },
  { sentence: "We caught the ___ train from London to Leeds.", root: "city", answer: "intercity", emoji: "🚆" },
  { sentence: "Ellie’s cup was empty, so she went to ___ it.", root: "fill", answer: "refill", emoji: "🥤" },
  { sentence: "The ghost was ___, so nobody could see it.", root: "visible", answer: "invisible", emoji: "👻" },
  { sentence: "Please ___ this book to the library by Friday.", root: "turn", answer: "return", emoji: "📚" },
  { sentence: "The puppy would not sit. He chose to ___ every time.", root: "obey", answer: "disobey", emoji: "🐕" },
  { sentence: "The tortoise slept all winter, so it was ___.", root: "active", answer: "inactive", emoji: "🐢" },
  { sentence: "My painting got wet, so I had to ___ it.", root: "do", answer: "redo", emoji: "🎨" },
  { sentence: "The match was so exciting that we watched the ___ on TV.", root: "play", answer: "replay", emoji: "📺" },
  { sentence: "Teams from many countries play in an ___ match.", root: "national", answer: "international", emoji: "🌍" },
  { sentence: "Priya likes cats, but she ___ spiders.", root: "likes", answer: "dislikes", emoji: "🕷️" },
  { sentence: "I read the sign wrongly. I ___ it.", root: "read", answer: "misread", emoji: "🪧" },
];

/** "m _ _ _": the first letter and how many letters, as the typing hint. */
export function letterHint(word) {
  return [word[0], ...Array.from(word.slice(1), () => "_")].join(" ");
}

/** The sentence with the blank filled, for the speak button. */
export function fillBlank(sentence, word) {
  return sentence.replace("___", word);
}

function pickQuestion(item, rng) {
  return {
    kind: "pick",
    root: item.root,
    meaning: item.meaning,
    emoji: item.emoji,
    answer: item.answer,
    options: shuffle([item.answer, ...item.wrong], rng),
    word: item.answer + item.root,
  };
}

/**
 * Level 2: five questions, each sorting six words into three meaning bins.
 * The five meanings are rotated so each is used three times in a run, and a
 * word is never shown twice in one run.
 */
function sortQuestions(rng) {
  const meanings = shuffle(Object.keys(MEANINGS), rng);
  const pools = Object.fromEntries(
    meanings.map((meaning) => [
      meaning,
      shuffle(PREFIXED_WORDS.filter((item) => PREFIX_MEANING[item.prefix] === meaning), rng),
    ])
  );
  return Array.from({ length: QUESTIONS_PER_CHALLENGE }, (_, q) => {
    const chosen = [0, 1, 2].map((offset) => meanings[(q + offset) % meanings.length]);
    const cards = chosen.flatMap((meaning) =>
      pools[meaning].splice(0, 2).map((item) => ({ id: item.word, label: item.word, bin: meaning }))
    );
    return {
      kind: "sort",
      bins: chosen.map((meaning) => ({ id: meaning, label: MEANINGS[meaning] })),
      cards: shuffle(cards, rng),
    };
  });
}

function buildQuestion(item, rng) {
  const others = sample(PREFIXES.filter((prefix) => prefix !== item.prefix), 2, rng);
  const tiles = [item.prefix, ...others, item.root, item.trap].map((label, index) => ({
    id: `t${index}`,
    label,
  }));
  return {
    kind: "build",
    meaning: item.meaning,
    answer: item.word,
    prefix: item.prefix,
    root: item.root,
    tiles: shuffle(tiles, rng),
  };
}

function typeQuestion(item) {
  return {
    kind: "type",
    sentence: item.sentence,
    root: item.root,
    emoji: item.emoji,
    answer: item.answer,
    // Spoken with the gap left as a gap: hearing "disappear" would answer
    // the meaning half of the question for the child.
    spoken: `${fillBlank(item.sentence, "blank")} The root word is ${item.root}.`,
    filled: fillBlank(item.sentence, item.answer),
    hint: letterHint(item.answer),
  };
}

const LEVELS = {
  1: [PICK_ITEMS, pickQuestion],
  3: [BUILD_ITEMS, buildQuestion],
  4: [TYPE_ITEMS, typeQuestion],
};

export function buildAddingPrefixesQuestions(level, rng) {
  if (level === 2) return sortQuestions(rng);
  const entry = LEVELS[level];
  if (!entry) throw new Error(`no adding prefixes level ${level}`);
  const [bank, build] = entry;
  return sample(bank, QUESTIONS_PER_CHALLENGE, rng).map((item) => build(item, rng));
}

/** Level 2: every card is in its meaning's bin. */
export function isSortCorrect(question, placement) {
  return question.cards.every((card) => placement[card.id] === card.bin);
}

/** Level 3: the placed tiles spell the word (whatever tiles did it). */
export function builtWord(question, placed) {
  return placed.map((id) => question.tiles.find((tile) => tile.id === id)?.label ?? "").join("");
}

export function isBuildCorrect(question, placed) {
  return builtWord(question, placed) === question.answer;
}

/** Appendix 1's own example words for this topic, for the test. */
export const APPENDIX_EXAMPLES = ["dis", "mis", "in", "re", "sub", "inter"].flatMap(
  (prefix) => PATTERNS.prefixes.words[prefix]
);
