import { PATTERNS } from "../../english/appendix1.js";
import { bareWord, sample, shuffle, tokenise } from "./shared.js";

/**
 * Year 3 The Prefixes Super, Anti and Auto. Appendix 2, Year 3: "Formation of
 * nouns using a range of prefixes [for example super–, anti–, auto–]";
 * Appendix 1 gives the meanings: super– "above", anti– "against", auto–
 * "self or own".
 *
 *   1 meaning  the meanings are shown; pick the word that matches a picture
 *              and a definition
 *   2 odd      three words have the prefix; one only looks as if it does
 *              (antique, autumn, supper): which? (inferred)
 *   3 tap      a sentence with two prefixed words (or one and a look-alike):
 *              tap the one whose prefix means "against" / "self" / "above"
 *   4 type     type the missing prefix in a sentence (applied, no meanings)
 *
 * "anti" in antique and antics is NOT the prefix; those words are only ever
 * the odd one out (the test checks).
 */
export const QUESTIONS_PER_CHALLENGE = 5;

export const PREFIXES = ["super", "anti", "auto"];

export const MEANINGS = {
  super: "above",
  anti: "against",
  auto: "self or own",
};

/** Every prefixed word. Appendix 1's examples are all here (tested). */
export const WORDS = [
  { word: "supermarket", prefix: "super", emoji: "🛒", definition: "a very big shop that sells food and lots of other things" },
  { word: "superman", prefix: "super", emoji: "💪", definition: "a man with powers far above anyone else’s" },
  { word: "superstar", prefix: "super", emoji: "🌟", definition: "a singer or actor who is more famous than other stars" },
  { word: "superhero", prefix: "super", emoji: "🦸", definition: "a hero in a cape with amazing powers" },
  { word: "superpower", prefix: "super", emoji: "⚡", definition: "an amazing power, like flying" },
  { word: "supersonic", prefix: "super", emoji: "🚀", definition: "going faster than the speed of sound" },
  { word: "antiseptic", prefix: "anti", emoji: "🩹", definition: "a cream that works against germs in a cut" },
  { word: "anti-clockwise", prefix: "anti", emoji: "🔄", definition: "turning the opposite way to a clock’s hands" },
  { word: "antisocial", prefix: "anti", emoji: "😤", definition: "behaving in a way that upsets the people around you" },
  { word: "antifreeze", prefix: "anti", emoji: "🧊", definition: "a liquid that stops a car’s water from freezing" },
  { word: "anti-slip", prefix: "anti", emoji: "🛁", definition: "made to stop you slipping, like a bath mat" },
  { word: "anti-bullying", prefix: "anti", emoji: "🤝", definition: "working against bullying in a school" },
  { word: "autobiography", prefix: "auto", emoji: "📖", definition: "the story of a person’s life, written by that person" },
  { word: "autograph", prefix: "auto", emoji: "✍️", definition: "a famous person’s own name, signed by them" },
  { word: "autopilot", prefix: "auto", emoji: "✈️", definition: "a machine that flies a plane by itself" },
  { word: "automatic", prefix: "auto", emoji: "🚪", definition: "working by itself, like a door that opens on its own" },
  { word: "autocorrect", prefix: "auto", emoji: "📱", definition: "a tool that fixes your spelling by itself" },
];

/**
 * Words that start like a prefix but have none: take the letters away and
 * no root word with a matching meaning is left. Each is grouped with the
 * prefix it imitates.
 */
export const LOOK_ALIKES = [
  { word: "antique", looksLike: "anti" },
  { word: "antics", looksLike: "anti" },
  { word: "ants", looksLike: "anti" },
  { word: "antelope", looksLike: "anti" },
  { word: "antler", looksLike: "anti" },
  { word: "anteater", looksLike: "anti" },
  { word: "anthill", looksLike: "anti" },
  { word: "antenna", looksLike: "anti" },
  { word: "autumn", looksLike: "auto" },
  { word: "author", looksLike: "auto" },
  { word: "supper", looksLike: "super" },
];

/**
 * Level 3. `targets` names each prefixed word in the sentence by its prefix;
 * a question asks for one of them. Look-alikes are there on purpose.
 */
export const TAP_SENTENCES = [
  { text: "The superstar signed an autograph for Leo.", targets: { super: "superstar", auto: "autograph" } },
  { text: "Mum bought antiseptic cream at the supermarket.", targets: { anti: "antiseptic", super: "supermarket" } },
  { text: "Zayn read the autobiography of a famous superhero.", targets: { auto: "autobiography", super: "superhero" } },
  { text: "The pilot switched on the autopilot and the plane turned anti-clockwise.", targets: { auto: "autopilot", anti: "anti-clockwise" } },
  { text: "Priya put antiseptic on her cut, then looked at the antique clock.", targets: { anti: "antiseptic" } },
  { text: "The automatic doors opened and a superhero walked in.", targets: { auto: "automatic", super: "superhero" } },
  { text: "Amara’s superpower is talking to anteaters.", targets: { super: "superpower" } },
  { text: "Our school starts its anti-bullying club every autumn.", targets: { anti: "anti-bullying" } },
  { text: "Leo wrote his autobiography and drew an antelope on the cover.", targets: { auto: "autobiography" } },
  { text: "The supersonic jet zoomed over the anthill.", targets: { super: "supersonic" } },
  { text: "Ellie asked a famous author for her autograph.", targets: { auto: "autograph" } },
  { text: "The supermarket sells antifreeze for cars.", targets: { super: "supermarket", anti: "antifreeze" } },
  { text: "Biscuit chased the automatic lawnmower round the garden in autumn.", targets: { auto: "automatic" } },
  { text: "The superhero flew anti-clockwise around the tower.", targets: { super: "superhero", anti: "anti-clockwise" } },
  { text: "The robot’s antics were funny, and it was fully automatic.", targets: { auto: "automatic" } },
  { text: "We sang along with the superstar until supper time.", targets: { super: "superstar" } },
  { text: "The superstar slipped in the bath, so she bought an anti-slip mat.", targets: { super: "superstar", anti: "anti-slip" } },
  { text: "Pushing in at the supermarket is antisocial.", targets: { super: "supermarket", anti: "antisocial" } },
];

/**
 * Level 4: type the missing prefix. "___" sits right against the rest of the
 * word, and only one of the three prefixes makes a real word there.
 */
export const TYPE_ITEMS = [
  { sentence: "We bought bread and milk at the ___market.", answer: "super", emoji: "🛒" },
  { sentence: "The ___star sang her new song on stage.", answer: "super", emoji: "🌟" },
  { sentence: "Leo dressed up as a ___hero with a red cape.", answer: "super", emoji: "🦸" },
  { sentence: "Zayn’s hero has a ___power: she can fly over the city.", answer: "super", emoji: "⚡" },
  { sentence: "The ___sonic jet flew faster than sound.", answer: "super", emoji: "🚀" },
  { sentence: "Ellie put ___septic cream on the cut.", answer: "anti", emoji: "🩹" },
  { sentence: "Turn the lid ___-clockwise to open the jar.", answer: "anti", emoji: "🔄" },
  { sentence: "Dad put ___freeze in the car before the cold winter.", answer: "anti", emoji: "🧊" },
  { sentence: "Our school has an ___-bullying week every November.", answer: "anti", emoji: "🤝" },
  { sentence: "Put the ___-slip mat in the bath so you do not fall.", answer: "anti", emoji: "🛁" },
  { sentence: "It is ___social to push in front of everyone in the queue.", answer: "anti", emoji: "😤" },
  { sentence: "The footballer signed his ___graph on my shirt.", answer: "auto", emoji: "✍️" },
  { sentence: "The pilot had a rest and switched on the ___pilot.", answer: "auto", emoji: "✈️" },
  { sentence: "Gran wrote an ___biography all about her own life.", answer: "auto", emoji: "📖" },
  { sentence: "The doors are ___matic, so they open by themselves.", answer: "auto", emoji: "🚪" },
  { sentence: "My tablet has ___correct, so it fixes my spelling.", answer: "auto", emoji: "📱" },
];

export function letterHint(word) {
  return [word[0], ...Array.from(word.slice(1), () => "_")].join(" ");
}

export function fillBlank(sentence, word) {
  return sentence.replace("___", word);
}

const byPrefix = (prefix) => WORDS.filter((item) => item.prefix === prefix);

function meaningQuestion(item, rng) {
  const others = PREFIXES.filter((prefix) => prefix !== item.prefix).map(
    (prefix) => sample(byPrefix(prefix), 1, rng)[0].word
  );
  return {
    kind: "meaning",
    emoji: item.emoji,
    definition: item.definition,
    answer: item.word,
    options: shuffle([item.word, ...others], rng),
  };
}

function oddQuestion(lookAlike, rng) {
  const real = sample(byPrefix(lookAlike.looksLike), 3, rng).map((item) => item.word);
  return {
    kind: "odd",
    prefix: lookAlike.looksLike,
    answer: lookAlike.word,
    options: shuffle([lookAlike.word, ...real], rng),
  };
}

function tapQuestion(sentence, rng) {
  const tokens = tokenise(sentence.text);
  const [prefix] = sample(Object.keys(sentence.targets), 1, rng);
  const target = sentence.targets[prefix];
  const answerIndex = tokens.findIndex((token) => bareWord(token) === target);
  // The hint underlines every word that starts like a prefix (the answer and
  // the other prefixed word or look-alike), so it narrows without telling.
  const hinted = new Set(
    tokens
      .map((token, index) => (/^(super|anti|auto|ant|aut|supp)/.test(bareWord(token)) ? index : -1))
      .filter((index) => index >= 0)
  );
  return { kind: "tap", tokens, prefix, meaning: MEANINGS[prefix], target, answerIndex, hinted };
}

function typeQuestion(item) {
  return {
    kind: "type",
    sentence: item.sentence,
    emoji: item.emoji,
    answer: item.answer,
    // The gap is read as "blank": hearing "supermarket" would give it away.
    spoken: fillBlank(item.sentence, "blank "),
    filled: fillBlank(item.sentence, item.answer),
    hint: letterHint(item.answer),
  };
}

const LEVELS = {
  1: [WORDS, meaningQuestion],
  2: [LOOK_ALIKES, oddQuestion],
  3: [TAP_SENTENCES, tapQuestion],
  4: [TYPE_ITEMS, typeQuestion],
};

export function buildSuperAntiAutoQuestions(level, rng) {
  const entry = LEVELS[level];
  if (!entry) throw new Error(`no super, anti and auto level ${level}`);
  const [bank, build] = entry;
  return sample(bank, QUESTIONS_PER_CHALLENGE, rng).map((item) => build(item, rng));
}

/** Appendix 1's examples for these three prefixes, for the test. */
export const APPENDIX_EXAMPLES = PREFIXES.flatMap((prefix) => PATTERNS.prefixes.words[prefix]);
