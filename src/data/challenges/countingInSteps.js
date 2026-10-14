/**
 * Pure question generators for the "Counting in Steps of 2, 3, 5 and 10" topic.
 *
 * No React and no randomness of its own: every function that needs randomness
 * takes a `rng` so the challenges can randomise per mount while the tests stay
 * deterministic.
 *
 * Year 2 works to 100, so callers must keep starts and lengths inside that.
 */

export const STEPS = [2, 3, 5, 10];

/** `length` terms starting at `start`, moving by `step` (negative counts back). */
export function buildSequence(start, step, length) {
  return Array.from({ length }, (_, i) => start + step * i);
}

/**
 * Which slots to blank out.
 *
 * Index 0 and 1 are always left visible: with fewer than two terms on screen
 * there is no step to infer, and the question becomes a guess.
 */
export function pickGapPositions(length, count, rng) {
  const eligible = [];
  for (let i = 2; i < length; i++) eligible.push(i);

  // Fisher-Yates over the eligible slots, then take the first `count`. Asking
  // for more gaps than slots yields every slot rather than looping forever.
  for (let i = eligible.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [eligible[i], eligible[j]] = [eligible[j], eligible[i]];
  }

  return eligible.slice(0, Math.min(count, eligible.length)).sort((a, b) => a - b);
}

/**
 * Wrong answers a child would plausibly reach: one step out (a term skipped or
 * repeated) and an off-by-one slip. Random numbers would be trivially
 * eliminated and teach nothing.
 *
 * Which side each falls on is chosen by `rng`, so the answer is not always
 * the middle of an evenly spaced three. Options stay within 0 to 100.
 */
export function buildDistractors(answer, step, count, rng = () => 0) {
  const stepSide = rng() < 0.5 ? 1 : -1;
  const slipSide = rng() < 0.5 ? 1 : -1;
  const candidates = [
    answer + stepSide * step,
    answer + slipSide,
    answer - stepSide * step,
    answer - slipSide,
    answer + 2,
    answer - 2,
  ];

  const seen = new Set([answer]);
  const wrong = [];

  for (const candidate of candidates) {
    // A negative option is never a plausible Year 2 answer.
    if (candidate < 0 || candidate > 100) continue;
    if (seen.has(candidate)) continue;
    seen.add(candidate);
    wrong.push(candidate);
    if (wrong.length === count) break;
  }

  return wrong;
}

/** Shuffles a copy of `items`. */
export function shuffle(items, rng) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/** A whole number from `low` to `high`, both included. */
function randInt(rng, low, high) {
  return low + Math.floor(rng() * (high - low + 1));
}

/**
 * A start for `length` terms of `step` (negative counts back) inside 0 to 100.
 *
 * Year 2 counts in 2s, 3s and 5s from 0, so those sequences stay on the
 * multiples; 10s may start from any number.
 */
export function stepStart(step, length, rng) {
  const size = Math.abs(step);
  const span = size * (length - 1);
  if (size === 10) {
    const low = step > 0 ? 0 : span;
    const high = step > 0 ? 100 - span : 100;
    return randInt(rng, Math.max(low, 1), high);
  }
  const most = Math.floor((100 - span) / size);
  const k = randInt(rng, 0, most);
  return step > 0 ? k * size : k * size + span;
}

/** `steps` with any extras drawn from STEPS, shuffled. */
function stepsFor(count, rng) {
  return shuffle([...STEPS, ...shuffle(STEPS, rng).slice(0, count - STEPS.length)], rng);
}

/** Level 1: the step is named, one gap in six terms, counting forwards. */
export function buildNamedStepQuestions(rng) {
  const used = new Set();
  return stepsFor(6, rng).map((step) => {
    let start;
    do start = stepStart(step, 6, rng);
    while (used.has(`${step}:${start}`));
    used.add(`${step}:${start}`);
    const terms = buildSequence(start, step, 6);
    return { step, start, terms, gaps: pickGapPositions(6, 1, rng) };
  });
}

/** Level 2: four terms shown, the step unnamed, two counting back. */
export function buildNextTermQuestions(rng) {
  const back = shuffle([true, true, false, false, false, false], rng);
  const used = new Set();
  return stepsFor(6, rng).map((size, i) => {
    const step = back[i] ? -size : size;
    let start;
    do start = stepStart(step, 5, rng);
    while (used.has(`${step}:${start}`));
    used.add(`${step}:${start}`);
    const terms = buildSequence(start, step, 4);
    const answer = start + step * 4;
    return { step, start, terms, answer, options: shuffle([answer, ...buildDistractors(answer, size, 2, rng)], rng) };
  });
}

/** Level 3: five scattered cards to drag into counting order, two counting back. */
export function buildStepOrderQuestions(rng) {
  const back = shuffle([true, true, false, false, false, false], rng);
  const used = new Set();
  return stepsFor(6, rng).map((size, i) => {
    const step = back[i] ? -size : size;
    let start;
    do start = stepStart(step, 5, rng);
    while (used.has(`${step}:${start}`));
    used.add(`${step}:${start}`);
    const terms = buildSequence(start, step, 5);
    const cards = shuffle(terms.map((value) => ({ id: value, label: value })), rng);
    const solved = cards.every((card, j) => card.id === terms[j]);
    return { step, start, terms, cards: solved ? [...cards].reverse() : cards };
  });
}

/**
 * Things that come in equal groups of 2, 3, 5 or 10. `n` is always 2 or more,
 * so every noun is plural.
 */
const GROUP_STORIES = [
  { step: 2, text: (n) => `Socks come in pairs. How many socks are in ${n} pairs?` },
  { step: 2, text: (n) => `Each bike has 2 wheels. How many wheels do ${n} bikes have?` },
  { step: 2, text: (n) => `A duck has 2 legs. How many legs do ${n} ducks have?` },
  { step: 3, text: (n) => `A tricycle has 3 wheels. How many wheels do ${n} tricycles have?` },
  { step: 3, text: (n) => `Each plate has 3 cakes. How many cakes are on ${n} plates?` },
  { step: 5, text: (n) => `A pack holds 5 stickers. How many stickers are in ${n} packs?` },
  { step: 5, text: (n) => `A starfish has 5 arms. How many arms do ${n} starfish have?` },
  { step: 10, text: (n) => `Each box holds 10 pencils. How many pencils are in ${n} boxes?` },
  { step: 10, text: (n) => `Each bag holds 10 marbles. How many marbles are in ${n} bags?` },
];

/** Level 4: six group stories, at least one per step, typed. */
export function buildGroupStoryQuestions(rng) {
  const byStep = STEPS.map((step) => shuffle(GROUP_STORIES.filter((g) => g.step === step), rng)[0]);
  const rest = shuffle(GROUP_STORIES.filter((g) => !byStep.includes(g)), rng).slice(0, 2);
  return shuffle([...byStep, ...rest], rng).map((story) => {
    const n = randInt(rng, 3, story.step === 3 ? 10 : story.step === 2 ? 12 : 10);
    return { step: story.step, n, prompt: story.text(n), answer: story.step * n };
  });
}
