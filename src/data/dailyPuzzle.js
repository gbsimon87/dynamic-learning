/**
 * The Daily Bix puzzle: one puzzle per local day, chosen by a generator seeded
 * from the date, so every device shows the same puzzle with no backend.
 *
 * Four kinds rotate: what comes next (number or picture patterns), odd one
 * out, a small riddle, and a missing number. Every puzzle is pick-one-of-
 * three-or-four, answerable in well under two minutes, and checked by tests
 * across whole years of dates: one answer, present in the options, options
 * distinct, nothing negative.
 *
 * Pure: no React, no storage, no clock (callers pass the day).
 */

/** mulberry32: small, fast, good enough to pick puzzles. */
function seeded(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hash(text) {
  let h = 2166136261;
  for (const char of text) {
    h ^= char.codePointAt(0);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

const pick = (rng, list) => list[Math.floor(rng() * list.length)];
const int = (rng, min, max) => min + Math.floor(rng() * (max - min + 1));

function shuffle(list, rng) {
  const out = [...list];
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/* ---------- what comes next ---------- */

const PICTURE_PATTERNS = [
  ["🍎", "🍌"],
  ["⭐", "🌙"],
  ["🐶", "🐱", "🐭"],
  ["🔴", "🔵", "🔵"],
  ["🌞", "🌞", "☁️"],
  ["🚗", "🚌", "🚲"],
  ["🐸", "🐸", "🦆"],
  ["🍓", "🍇", "🍋"],
];

function nextInPattern(rng) {
  if (rng() < 0.5) {
    const unit = pick(rng, PICTURE_PATTERNS);
    // At least one and a half repeats on show, so the rule is visible.
    const shown = unit.length === 2 ? 5 : 6;
    const sequence = Array.from({ length: shown }, (_, i) => unit[i % unit.length]);
    const answer = unit[shown % unit.length];
    const pool = [...new Set([...unit, "🎈", "🐢", "🌸", "🍕"])].filter((x) => x !== answer);
    const options = shuffle([answer, ...shuffle(pool, rng).slice(0, 2)], rng);
    return {
      kind: "next",
      title: "What comes next?",
      show: sequence,
      question: "Which picture comes next in the pattern?",
      speak: "What comes next in the pattern?",
      options,
      answer,
    };
  }
  const step = pick(rng, [2, 3, 5, 10]);
  const start = step === 10 ? int(rng, 0, 5) * 10 : int(rng, 0, 10);
  const sequence = [0, 1, 2, 3].map((i) => start + i * step);
  const answer = start + 4 * step;
  const options = shuffle([answer, answer + step, answer - 1], rng);
  return {
    kind: "next",
    title: "What comes next?",
    show: sequence.map(String),
    question: `The numbers go up in ${step}s. What comes next?`,
    speak: `${sequence.join(", ")}. What comes next?`,
    options: options.map(String),
    answer: String(answer),
  };
}

/* ---------- odd one out ---------- */

const GROUPS = [
  { name: "fruit", items: ["🍎", "🍌", "🍇", "🍓", "🍐"] },
  { name: "animals", items: ["🐶", "🐱", "🐰", "🐻", "🦊"] },
  { name: "vehicles", items: ["🚗", "🚌", "🚲", "🚂", "🚀"] },
  { name: "weather", items: ["☀️", "🌧️", "❄️", "⛅", "🌈"] },
  { name: "sea creatures", items: ["🐟", "🐙", "🦀", "🐬", "🐳"] },
  { name: "shapes", items: ["🔺", "🟦", "🟢", "🔶", "⬛"] },
];

// A fish IS an animal: never ask a child to separate groups that overlap.
const OVERLAPS = { animals: ["sea creatures"], "sea creatures": ["animals"] };

function oddOneOut(rng) {
  const group = pick(rng, GROUPS);
  const other = pick(rng, GROUPS.filter((g) => g !== group && !(OVERLAPS[group.name] ?? []).includes(g.name)));
  const three = shuffle(group.items, rng).slice(0, 3);
  const odd = pick(rng, other.items);
  return {
    kind: "odd",
    title: "Odd one out",
    question: "Which one does not belong?",
    speak: "Which one does not belong with the others?",
    options: shuffle([...three, odd], rng),
    answer: odd,
    explain: `The others are all ${group.name}.`,
  };
}

/* ---------- riddles ---------- */

export const RIDDLES = [
  { q: "I have hands but I cannot clap. What am I?", answer: "A clock", others: ["A glove", "A tree"] },
  { q: "I have a face and two hands, and I tell you the time. What am I?", answer: "A clock", others: ["A spoon", "A cloud"] },
  { q: "What has to be broken before you can use it?", answer: "An egg", others: ["A chair", "A book"] },
  { q: "I go up and down the stairs without moving. What am I?", answer: "A carpet", others: ["A cat", "A ball"] },
  { q: "What has lots of keys but cannot open a door?", answer: "A piano", others: ["A teapot", "A sock"] },
  { q: "I am full of holes but I can still hold water. What am I?", answer: "A sponge", others: ["A bucket", "A stone"] },
  { q: "What gets wetter the more it dries?", answer: "A towel", others: ["A hat", "A crayon"] },
  { q: "What has one eye but cannot see?", answer: "A needle", others: ["A pirate", "An owl"] },
  { q: "What has a neck but no head?", answer: "A bottle", others: ["A snake", "A snowman"] },
  { q: "What can you catch but never throw?", answer: "A cold", others: ["A ball", "A frisbee"] },
  { q: "I have four legs but I cannot walk. What am I?", answer: "A table", others: ["A dog", "A spider"] },
  { q: "What has a thumb and four fingers but is not alive?", answer: "A glove", others: ["A hand", "A fork"] },
  { q: "What goes up when the rain comes down?", answer: "An umbrella", others: ["A puddle", "A worm"] },
  { q: "What has stripes and says roar?", answer: "A tiger", others: ["A zebra", "A bee"] },
  { q: "I am yellow, I shine in the sky and I keep you warm. What am I?", answer: "The Sun", others: ["The Moon", "A banana"] },
  { q: "What has a bark but no bite?", answer: "A tree", others: ["A puppy", "A fox"] },
];

function riddle(rng) {
  const item = pick(rng, RIDDLES);
  return {
    kind: "riddle",
    title: "Riddle time",
    question: item.q,
    speak: item.q,
    options: shuffle([item.answer, ...item.others], rng),
    answer: item.answer,
  };
}

/* ---------- missing number ---------- */

function missingNumber(rng) {
  const total = int(rng, 6, 20);
  const known = int(rng, 1, total - 1);
  const answer = total - known;
  const first = rng() < 0.5;
  const sentence = first ? `? + ${known} = ${total}` : `${known} + ? = ${total}`;
  const near = [answer + 1, answer - 1, answer + 2].filter((n) => n >= 0 && n !== answer);
  return {
    kind: "missing",
    title: "Missing number",
    show: [sentence],
    question: "Which number is hiding behind the question mark?",
    speak: `${first ? "What" : known} plus ${first ? known : "what"} equals ${total}?`,
    options: shuffle([answer, ...near.slice(0, 2)], rng).map(String),
    answer: String(answer),
  };
}

const KINDS = [nextInPattern, oddOneOut, riddle, missingNumber];

/** The puzzle for a local day ("YYYY-MM-DD"). Same day, same puzzle, everywhere. */
export function puzzleForDay(day) {
  const rng = seeded(hash(`bix-puzzle:${day}`));
  // Rotate the kind by day so the same kind never comes twice running.
  const dayNumber = Math.floor(Date.parse(`${day}T12:00:00Z`) / 86400000);
  const make = KINDS[((dayNumber % KINDS.length) + KINDS.length) % KINDS.length];
  return { day, ...make(rng) };
}

/** Problems with a puzzle, for tests: an empty list means it is fair. */
export function puzzleProblems(puzzle) {
  const problems = [];
  if (!puzzle.question) problems.push("no question");
  if (!Array.isArray(puzzle.options) || puzzle.options.length < 3) problems.push("too few options");
  if (new Set(puzzle.options).size !== puzzle.options.length) problems.push("duplicate options");
  if (puzzle.options.filter((o) => o === puzzle.answer).length !== 1) problems.push("answer not exactly once");
  if (puzzle.options.some((o) => /^-\d/.test(String(o)))) problems.push("negative option");
  return problems;
}

/* ---------- the reward: one puzzle star per day, never random ---------- */

const KEEP_DAYS = 60;

/** Whether this day's puzzle star is already held. */
export function solvedOn(rewards, day) {
  return (rewards?.puzzles?.days ?? []).includes(day);
}

/**
 * Records a solved day. Fixed reward: one star per day, however many times it
 * is played. Returns the SAME object when the day is already counted.
 */
export function recordPuzzle(rewards, day) {
  if (solvedOn(rewards, day)) return rewards;
  const days = [...(rewards.puzzles?.days ?? []), day].sort().slice(-KEEP_DAYS);
  return { ...rewards, puzzles: { ...rewards.puzzles, days, total: (rewards.puzzles?.total ?? 0) + 1 } };
}
