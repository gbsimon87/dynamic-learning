import { sample, shuffle } from "./shared.js";

/**
 * Year 3 The Present Perfect: "using the present perfect form of verbs in
 * contrast to the past tense". Appendix 2 (Year 3): "He has gone out to play
 * contrasted with He went out to play".
 *
 *   1 has/have  choose has or have (the rule is shown)
 *   2 sort      sort sentences: present perfect or simple past? (inferred)
 *   3 build     build a present perfect sentence from tiles (4 of 6 used)
 *   4 diary     one short text, four gaps: past or present perfect, decided
 *               by the time clue (no gloss)
 *
 * Participles are regular, or one of gone, seen, eaten, done, been, written,
 * taken. Time clues are only those that settle the tense in British English:
 * yesterday, last …, … ago take the simple past; since, so far, already and
 * not … yet take the present perfect. "ever", "never" and "just" are left
 * out, because "I never saw one" and "I just ate" are also heard.
 */

/**
 * The core verb bank, used by levels 1–3. `wrong` is the level 3 distractor
 * tile: the simple past for an irregular verb (has ate), the bare verb for a
 * regular one (whose simple past is the participle). `past` is the simple
 * past, for level 2.
 */
export const VERB_ITEMS = [
  { who: "Amara", aux: "has", participle: "finished", wrong: "finish", past: "finished", rest: "her book." },
  { who: "We", aux: "have", participle: "painted", wrong: "paint", past: "painted", rest: "a picture of the sea." },
  { who: "Biscuit", aux: "has", participle: "eaten", wrong: "ate", past: "ate", rest: "my sandwich." },
  { who: "I", aux: "have", participle: "seen", wrong: "saw", past: "saw", rest: "a shooting star." },
  { who: "Leo and Zayn", aux: "have", participle: "gone", wrong: "went", past: "went", rest: "to the park." },
  { who: "Priya", aux: "has", participle: "climbed", wrong: "climb", past: "climbed", rest: "the tall tree." },
  { who: "They", aux: "have", participle: "done", wrong: "did", past: "did", rest: "their homework." },
  { who: "Zayn", aux: "has", participle: "written", wrong: "wrote", past: "wrote", rest: "a poem about the sea." },
  { who: "The children", aux: "have", participle: "taken", wrong: "took", past: "took", rest: "their coats off." },
  { who: "Ellie", aux: "has", participle: "been", wrong: "was", past: "went", rest: "to the seaside." },
  { who: "You", aux: "have", participle: "tidied", wrong: "tidy", past: "tidied", rest: "your room." },
  { who: "Grandma", aux: "has", participle: "baked", wrong: "bake", past: "baked", rest: "a chocolate cake." },
  { who: "The rain", aux: "has", participle: "stopped", wrong: "stop", past: "stopped", rest: "at last." },
  { who: "My friends", aux: "have", participle: "eaten", wrong: "ate", past: "ate", rest: "all the crisps." },
  { who: "Leo", aux: "has", participle: "scored", wrong: "score", past: "scored", rest: "a goal." },
  { who: "The puppy", aux: "has", participle: "gone", wrong: "went", past: "went", rest: "to sleep." },
  { who: "I", aux: "have", participle: "written", wrong: "wrote", past: "wrote", rest: "a letter to Grandad." },
  { who: "Amara and Ellie", aux: "have", participle: "planted", wrong: "plant", past: "planted", rest: "some seeds." },
];

export const ALLOWED_IRREGULAR = ["gone", "seen", "eaten", "done", "been", "written", "taken"];

/**
 * Simple past sentences with "had" as the main verb: a near-miss in the sort,
 * because "had" is not "has" or "have".
 */
export const HAD_SENTENCES = [
  "Biscuit had a bath last night.",
  "Leo had a cold last week.",
  "Priya had pasta for tea.",
];

/**
 * Level 4. `[past|perfect]` marks a gap; `answer` names the right form, which
 * the clue in the same sentence decides.
 */
export const DIARY_SETS = [
  {
    title: "Leo’s Football Diary",
    kind: "diary",
    sentences: [
      { text: "Last Sunday I {joined|have joined} the Tigers football team.", answer: "past", clue: "Last Sunday" },
      { text: "We {played|have played} our first match two days ago.", answer: "past", clue: "two days ago" },
      { text: "I {scored|have scored} three goals so far.", answer: "perfect", clue: "so far" },
      { text: "I {did not miss|have not missed} a single training session yet.", answer: "perfect", clue: "yet" },
    ],
  },
  {
    title: "A Letter to Grandma",
    kind: "letter",
    sentences: [
      { text: "Last week our class {visited|has visited} the science museum.", answer: "past", clue: "Last week" },
      { text: "Since then I {read|have read} four books about space.", answer: "perfect", clue: "Since then" },
      { text: "Yesterday I {wrote|have written} a story about a trip to the Moon.", answer: "past", clue: "Yesterday" },
      { text: "I {did not decide|have not decided} which planet is my favourite yet.", answer: "perfect", clue: "yet" },
    ],
  },
  {
    title: "Biscuit Goes to Puppy School",
    kind: "diary",
    sentences: [
      { text: "Ellie {took|has taken} Biscuit to puppy school last Saturday.", answer: "past", clue: "last Saturday" },
      { text: "Since then he {stopped|has stopped} chewing the cushions.", answer: "perfect", clue: "Since then" },
      { text: "Yesterday he {fetched|has fetched} his ball ten times.", answer: "past", clue: "Yesterday" },
      { text: "But he {did not stop|has not stopped} stealing socks yet!", answer: "perfect", clue: "yet" },
    ],
  },
  {
    title: "Zayn’s Castle",
    kind: "diary",
    sentences: [
      { text: "Zayn {started|has started} building a model castle two weeks ago.", answer: "past", clue: "two weeks ago" },
      { text: "He {painted|has painted} four towers so far.", answer: "perfect", clue: "so far" },
      { text: "Last night he {glued|has glued} the drawbridge on.", answer: "past", clue: "Last night" },
      { text: "He {did not finish|has not finished} the flag yet.", answer: "perfect", clue: "yet" },
    ],
  },
];

export const QUESTIONS_PER_CHALLENGE = 5;

export const perfectSentence = (item) => `${item.who} ${item.aux} ${item.participle} ${item.rest}`;
export const pastSentence = (item) => `${item.who} ${item.past} ${item.rest}`;

function hasHaveQuestion(item) {
  return {
    kind: "hasHave",
    sentence: `${item.who} ___ ${item.participle} ${item.rest}`,
    who: item.who,
    answer: item.aux,
    options: ["has", "have"],
  };
}

export const SORT_BINS = [
  { id: "perfect", label: "🎁 present perfect (has or have + verb)" },
  { id: "past", label: "🕰️ simple past" },
];

/**
 * Level 2: two present perfect and two simple past cards a question. A verb
 * item gives one card or the other, never both, and no card repeats in a run.
 */
function buildSortQuestions(rng) {
  const items = shuffle(VERB_ITEMS, rng);
  const perfect = items.slice(0, QUESTIONS_PER_CHALLENGE * 2).map(perfectSentence);
  const past = sample([...items.slice(QUESTIONS_PER_CHALLENGE * 2).map(pastSentence), ...HAD_SENTENCES], QUESTIONS_PER_CHALLENGE * 2, rng);
  return Array.from({ length: QUESTIONS_PER_CHALLENGE }, (_, index) => {
    const cards = [
      ...perfect.slice(index * 2, index * 2 + 2).map((label, n) => ({ id: `p${n}`, label, bin: "perfect" })),
      ...past.slice(index * 2, index * 2 + 2).map((label, n) => ({ id: `s${n}`, label, bin: "past" })),
    ];
    return { kind: "sort", bins: SORT_BINS, cards: shuffle(cards, rng) };
  });
}

function buildQuestion(item, rng) {
  const tiles = [
    { id: "who", label: item.who },
    { id: "aux", label: item.aux },
    { id: "other", label: item.aux === "has" ? "have" : "has" },
    { id: "verb", label: item.participle },
    { id: "wrong", label: item.wrong },
    { id: "rest", label: item.rest },
  ];
  return {
    kind: "build",
    tiles: shuffle(tiles, rng),
    answerOrder: ["who", "aux", "verb", "rest"],
    who: item.who,
    aux: item.aux,
  };
}

const GAP = /\{([^|}]+)\|([^}]+)\}/;

/** Splits "I {scored|have scored} three goals." into its parts. */
export function parseGap(text) {
  const match = text.match(GAP);
  return { before: text.slice(0, match.index), past: match[1], perfect: match[2], after: text.slice(match.index + match[0].length) };
}

/** A sentence with its gap filled by the right form. */
export function solved(sentence) {
  const gap = parseGap(sentence.text);
  return `${gap.before}${gap[sentence.answer]}${gap.after}`;
}

function diaryQuestions(set, rng) {
  return set.sentences.map((sentence, index) => {
    const gap = parseGap(sentence.text);
    return {
      kind: "diary",
      title: set.title,
      passageKind: set.kind,
      sentences: set.sentences,
      step: index,
      gap,
      clue: sentence.clue,
      answer: gap[sentence.answer],
      options: shuffle([gap.past, gap.perfect], rng),
    };
  });
}

export function buildPresentPerfectQuestions(level, rng) {
  if (level === 1) return sample(VERB_ITEMS, QUESTIONS_PER_CHALLENGE, rng).map(hasHaveQuestion);
  if (level === 2) return buildSortQuestions(rng);
  if (level === 3) return sample(VERB_ITEMS, QUESTIONS_PER_CHALLENGE, rng).map((item) => buildQuestion(item, rng));
  if (level === 4) return diaryQuestions(sample(DIARY_SETS, 1, rng)[0], rng);
  throw new Error(`no present perfect level ${level}`);
}

export function isSortCorrect(question, placement) {
  return question.cards.every((card) => placement[card.id] === card.bin);
}

export function isBuildCorrect(question, placed) {
  return placed.length === question.answerOrder.length && placed.every((id, index) => id === question.answerOrder[index]);
}
