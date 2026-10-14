import { int, numericOptions, order, pick, shuffle, tiles, WORDS } from "./shared.js";

// Every builder plans a whole run of 5 at once, so no question repeats inside
// a run and answers/directions are balanced rather than alternating.
const RUN = 5;

/** `count` distinct things from `make(i)`, keyed by `key`. */
function distinct(rng, make, key = q => JSON.stringify(q)) {
  const seen = new Set(), out = [];
  for (let tries = 0; out.length < RUN && tries < 500; tries++) {
    const item = make(out.length, rng);
    const k = key(item);
    if (!seen.has(k)) { seen.add(k); out.push(item); }
  }
  return out;
}

/** A shuffled run of RUN values using every one of `values` at least once. */
const balanced = (rng, values) => shuffle(rng, [...values, ...Array.from({ length: RUN - values.length }, () => pick(rng, values))]);

const THINGS = [
  { icon: "🦆", one: "duck", many: "ducks" }, { icon: "⭐", one: "star", many: "stars" },
  { icon: "🐞", one: "ladybird", many: "ladybirds" }, { icon: "🐟", one: "fish", many: "fish" },
  { icon: "🚗", one: "car", many: "cars" }, { icon: "🌸", one: "flower", many: "flowers" },
  { icon: "🎈", one: "balloon", many: "balloons" }, { icon: "🐝", one: "bee", many: "bees" },
];
const PACKED = [
  { icon: "🍎", one: "apple", many: "apples" }, { icon: "🥚", one: "egg", many: "eggs" },
  { icon: "🍊", one: "orange", many: "oranges" }, { icon: "🥕", one: "carrot", many: "carrots" },
];
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
/** Counters a learner must count: a screen reader hears one item at a time, never the total. */
const things = (groups) => ({ type: "objects", countable: true, groups: groups.map(g => ({ rowSize: 5, ...g })) });
const LETTERS = ["A", "B", "C"];

/** Counts for groups A, B, C that are all different and not already in A-B-C order. */
function unorderedCounts(rng, min, max) {
  for (;;) {
    const counts = shuffle(rng, Array.from({ length: max - min + 1 }, (_, i) => min + i)).slice(0, 3);
    const up = counts[0] < counts[1] && counts[1] < counts[2], down = counts[0] > counts[1] && counts[1] > counts[2];
    if (!up && !down) return counts;
  }
}

export function countingObjects(level, rng) {
  if (level === 1) {
    const counts = shuffle(rng, Array.from({ length: 10 }, (_, i) => i + 1)).slice(0, RUN);
    const kinds = shuffle(rng, THINGS);
    return counts.map((n, i) => ({
      kind: "choice", prompt: `How many ${kinds[i].many}?`, answer: n, options: numericOptions(rng, n, 10, { min: 1 }),
      visual: things([{ count: n, label: cap(kinds[i].many), icon: kinds[i].icon, noun: kinds[i].one }]),
      hint: "Touch each picture once as you count.",
    }));
  }
  if (level === 2) {
    const targets = shuffle(rng, [3, 4, 5, 6, 7, 8, 9, 10]).slice(0, RUN);
    const slots = balanced(rng, [0, 1, 2]);
    return targets.map((t, i) => {
      const others = shuffle(rng, [t - 2, t - 1, t + 1, t + 2].filter(n => n >= 1)).slice(0, 2);
      const counts = [...others];
      counts.splice(slots[i], 0, t);
      const kind = pick(rng, THINGS);
      return { kind: "choice", prompt: `Which group has **${t}**?`, answer: LETTERS[slots[i]], options: LETTERS,
        visual: things(counts.map((count, g) => ({ count, label: LETTERS[g], icon: kind.icon, noun: kind.one }))),
        hint: "Count each group. Stop when you find the number." };
    });
  }
  if (level === 3) {
    return distinct(rng, (i, r) => {
      const counts = unorderedCounts(r, 2, 12);
      const kind = pick(r, THINGS);
      const sorted = [0, 1, 2].sort((a, b) => counts[a] - counts[b]);
      return { ...order(r, "Count each group. Put them in order: **fewest** first.", sorted.map(g => LETTERS[g]), sorted.map(g => counts[g])),
        visual: things(counts.map((count, g) => ({ count, label: LETTERS[g], icon: kind.icon, noun: kind.one }))),
        hint: "Fewest means the smallest number." };
    }, q => q.items.map(item => item.value).join());
  }
  const counts = shuffle(rng, Array.from({ length: 10 }, (_, i) => 11 + i)).slice(0, RUN);
  return counts.map(n => {
    const kind = pick(rng, PACKED);
    return { kind: "number", prompt: `Bix packs some ${kind.many}. How many ${kind.many}?`, answer: n, maxDigits: 2,
      visual: things([{ count: n, label: cap(kind.many), icon: kind.icon, noun: kind.one }]),
      hint: "Each row has 5. Touch each one as you count." };
  });
}

/** Five consecutive counting numbers in `dir` (1 or −1) that cross a tens number, inside 0–100. */
function crossingRun(rng, dir) {
  for (;;) {
    const ten = 10 * int(rng, 1, 10), at = int(rng, 1, 4);
    const start = ten - dir * at;
    const terms = Array.from({ length: 5 }, (_, j) => start + dir * j);
    if (terms.every(n => n >= 0 && n <= 100)) return { terms, crossing: at };
  }
}

export function countingForwardsBackwards(level, rng) {
  const dirs = balanced(rng, [1, -1]);
  const word = dir => (dir > 0 ? "forwards" : "backwards");
  if (level === 1) {
    const gaps = balanced(rng, [1, 2, 3, 4]);
    return distinct(rng, (i, r) => {
      const dir = dirs[i];
      const start = dir > 0 ? int(r, 0, 16) : int(r, 5, 20);
      const terms = Array.from({ length: 5 }, (_, j) => start + dir * j);
      return { kind: "sequence", prompt: `Count **${word(dir)}**. Fill the gap.`, terms, gaps: [gaps[i]],
        rule: dir > 0 ? "Forwards means one more each time." : "Backwards means one less each time.", hint: "Say the numbers in order." };
    }, q => q.terms.join());
  }
  if (level === 2) {
    return distinct(rng, (i, r) => {
      const { terms, crossing } = crossingRun(r, dirs[i]);
      const other = pick(r, [0, 1, 2, 3, 4].filter(g => Math.abs(g - crossing) > 1));
      return { kind: "sequence", prompt: "Up or down? Fill the gaps.", terms, gaps: [crossing, other].sort((a, b) => a - b),
        hint: "Look at two numbers next to each other. Do they go up or down?" };
    }, q => q.terms.join());
  }
  if (level === 3) {
    return distinct(rng, (i, r) => {
      const { terms } = crossingRun(r, dirs[i]);
      return order(r, `Count **${word(dirs[i])}**. Put the numbers in order.`, terms, terms);
    }, q => q.items.map(item => item.value).sort((a, b) => a - b).join());
  }
  return distinct(rng, (i, r) => {
    const dir = dirs[i], hops = int(r, 2, 5);
    const start = dir > 0 ? int(r, 5, 100 - hops) : int(r, hops, 95);
    return { kind: "number", prompt: `Bix is on ${start}. He jumps ${hops} ${dir > 0 ? "forwards" : "back"}. Where does he land?`,
      answer: start + dir * hops, maxDigits: 3,
      visual: { type: "numberTrack", terms: [start], blanks: hops - 1, reverse: dir < 0 },
      hint: `Start on ${start}. Say one number for each jump.` };
  }, q => q.prompt);
}

const swapDigits = n => (n % 10) * 10 + Math.floor(n / 10);
/** Two-digit numbers whose digits differ and are non-zero, so a tens/ones swap is a different number. */
const swappable = n => n >= 12 && n <= 98 && n % 10 !== 0 && n % 10 !== Math.floor(n / 10);

export function readingWritingNumerals(level, rng) {
  if (level === 1) {
    const values = shuffle(rng, Array.from({ length: 87 }, (_, i) => 12 + i).filter(swappable)).slice(0, RUN);
    return values.map(n => ({ kind: "choice", prompt: "Which number do the blocks show?", answer: n,
      options: numericOptions(rng, n, 99, { min: 1, near: [swapDigits(n), n + pick(rng, [10, -10])] }),
      visual: { type: "blocks", number: n }, hint: "Count the rods in tens first. Then count on the cubes." }));
  }
  if (level === 2) {
    const values = shuffle(rng, Array.from({ length: 89 }, (_, i) => 11 + i)).slice(0, RUN);
    return values.map(n => ({ kind: "placeValue", mode: "build", exact: true, columns: ["tens", "ones"], prompt: `Make **${n}** with blocks.`, answer: n,
      hint: "The first digit is how many rods. The last digit is how many cubes." }));
  }
  if (level === 3) {
    const smallest = balanced(rng, [true, false]);
    return distinct(rng, (i, r) => {
      const a = pick(r, Array.from({ length: 87 }, (_, k) => 12 + k).filter(swappable));
      const pool = new Set([a, swapDigits(a)]);
      while (pool.size < 3) pool.add(Math.floor(a / 10) * 10 + int(r, 0, 9));
      while (pool.size < 4) pool.add(int(r, 1, 100));
      const sorted = [...pool].sort((x, y) => (smallest[i] ? x - y : y - x));
      return order(r, `Put the numbers in order: **${smallest[i] ? "smallest" : "biggest"}** first.`, sorted, sorted);
    }, q => q.items.map(item => item.value).sort((a, b) => a - b).join());
  }
  const values = shuffle(rng, Array.from({ length: 89 }, (_, i) => 11 + i)).slice(0, RUN);
  return values.map(n => {
    const tens = Math.floor(n / 10), ones = n % 10;
    const story = pick(rng, [
      { pack: "📦", packName: "box", packPlural: "boxes", packs: "Boxes of 10", item: "🥚", one: "egg", many: "eggs" },
      { pack: "👜", packName: "bag", packPlural: "bags", packs: "Bags of 10", item: "🍬", one: "sweet", many: "sweets" },
    ]);
    const groups = [{ count: tens, label: story.packs, icon: story.pack, noun: story.packName }];
    if (ones) groups.push({ count: ones, label: cap(story.many), icon: story.item, noun: story.one });
    return { kind: "number", prompt: `Each ${story.packName} has 10 ${story.many}. How many ${story.many} in all?`, answer: n, maxDigits: 2,
      visual: things(groups), hint: `Count the ${story.packPlural} in tens: 10, 20, 30. Then count on in ones.` };
  });
}

export function countingInSteps(level, rng) {
  const steps = balanced(rng, [2, 5, 10]);
  const terms = (start, step) => Array.from({ length: 5 }, (_, j) => start + j * step);
  if (level === 1) {
    const gaps = balanced(rng, [1, 2, 3, 4]);
    return distinct(rng, (i, r) => {
      const step = steps[i];
      return { kind: "sequence", rule: `Count in ${step}s. Add ${step} each time.`, prompt: "Fill the gap.",
        terms: terms(int(r, 0, 3) * step, step), gaps: [gaps[i]], hint: `Add ${step} to the number before the gap.` };
    }, q => q.terms.join() + q.gaps);
  }
  if (level === 2) {
    // Never gaps 1 and 3: two numbers next to each other must show the step.
    const gapSets = [[0, 2], [0, 3], [0, 4], [1, 4], [2, 4], [2, 3], [1, 2]];
    return distinct(rng, (i, r) => {
      const step = steps[i];
      return { kind: "sequence", prompt: "Are we counting in 2s, 5s or 10s? Fill the gaps.",
        terms: terms(int(r, 0, 100 / step - 4) * step, step), gaps: pick(r, gapSets),
        hint: "Find two numbers next to each other. How far apart are they?" };
    }, q => q.terms.join());
  }
  if (level === 3) {
    return distinct(rng, (i, r) => {
      const step = steps[i], line = terms(int(r, 0, 100 / step - 4) * step, step);
      return order(r, `Count in ${step}s. Put the numbers in order.`, line, line);
    }, q => q.items.map(item => item.value).sort((a, b) => a - b).join());
  }
  return distinct(rng, (i, r) => {
    const step = steps[i], bags = int(r, 2, step === 2 ? 8 : step === 5 ? 6 : 5);
    return { kind: "number", prompt: `${bags} bags. Each bag has ${step} beads. How many beads?`,
      answer: bags * step, maxDigits: 2, visual: { type: "groups", rows: bags, columns: step },
      hint: `Count one row at a time in ${step}s.` };
  }, q => q.prompt);
}

const ONE_MORE_STORIES = [
  { max: 40, text: (n, more) => `There are ${n} children on a bus. One ${more ? "gets on" : "gets off"}. How many now?` },
  { max: 99, text: (n, more) => `There are ${n} sweets in a jar. Bix ${more ? "adds one more" : "eats one"}. How many now?` },
  { max: 99, text: (n, more) => `There are ${n} books on a shelf. Maya ${more ? "adds one" : "takes one away"}. How many now?` },
];

export function oneMoreOneLess(level, rng) {
  const more = balanced(rng, [true, false]);
  if (level === 1) {
    return distinct(rng, (i, r) => {
      const n = more[i] ? int(r, 1, 9) : int(r, 2, 10), answer = n + (more[i] ? 1 : -1);
      const kind = pick(r, THINGS);
      const near = r() < 0.5 ? [n, n - (answer - n)] : [n];
      return { kind: "choice", prompt: `What is one **${more[i] ? "more" : "less"}** than ${n}?`, answer,
        options: numericOptions(r, answer, 11, { min: 0, near }),
        visual: things([{ count: n, label: cap(kind.many), icon: kind.icon, noun: kind.one }]),
        hint: more[i] ? "Add one more picture in your head. Count again." : "Cover one picture. Count again." };
    }, q => q.prompt);
  }
  if (level === 2) {
    return distinct(rng, (i, r) => {
      const crossTen = r() < 0.6;
      const n = more[i] ? (crossTen ? 10 * int(r, 1, 9) - 1 : int(r, 10, 99)) : (crossTen ? 10 * int(r, 1, 9) : int(r, 11, 99));
      const answer = n + (more[i] ? 1 : -1);
      // The tens slip: 39 + 1 read as 30, 40 − 1 read as 49.
      const slip = more[i] && n % 10 === 9 ? n - 9 : !more[i] && n % 10 === 0 ? n + 9 : answer + pick(r, [10, -10]);
      return { kind: "choice", prompt: `What is one **${more[i] ? "more" : "less"}** than ${n}?`, answer,
        options: numericOptions(r, answer, 100, { min: 0, near: [slip, n] }),
        hint: more[i] ? "One more is the next number when you count." : "One less is the number just before." };
    }, q => q.prompt);
  }
  if (level === 3) {
    return distinct(rng, (i, r) => {
      const n = r() < 0.5 ? 10 * int(r, 1, 9) + pick(r, [-1, 0]) : int(r, 2, 98);
      const before = r() < 0.5;
      return before
        ? { kind: "sequence", prompt: "Fill in one less and one more than the Start number.", terms: [n - 2, n - 1, n, n + 1], gaps: [1, 3],
          captions: ["Before", "One less", "Start", "One more"], hint: "One less comes just before. One more comes just after." }
        : { kind: "sequence", prompt: "Fill in one less and one more than the Start number.", terms: [n - 1, n, n + 1, n + 2], gaps: [0, 2],
          captions: ["One less", "Start", "One more", "Next"], hint: "One less comes just before. One more comes just after." };
    }, q => String(q.terms[q.captions.indexOf("Start")]));
  }
  return distinct(rng, (i, r) => {
    const story = pick(r, ONE_MORE_STORIES);
    const n = int(r, 2, story.max);
    return { kind: "number", prompt: story.text(n, more[i]), answer: n + (more[i] ? 1 : -1), maxDigits: 3,
      hint: `${more[i] ? "One more" : "One less"} than ${n}. Count one step ${more[i] ? "forwards" : "backwards"}.` };
  }, q => q.prompt);
}

const RELATION = { more: "more than", fewer: "fewer than", equal: "equal to" };
const NAMES = ["Leo", "Maya", "Sam", "Zara"];
const COLLECT = [
  { icon: "🐚", one: "shell", many: "shells" }, { icon: "🌟", one: "sticker", many: "stickers" },
  { icon: "🔮", one: "marble", many: "marbles" }, { icon: "🌰", one: "conker", many: "conkers" },
];

/** Two counts whose comparison is `outcome` ("more" means a > b). */
function comparedPair(rng, outcome, min, max, gap = 3) {
  const a = int(rng, min + (outcome === "more" ? 1 : 0), max - (outcome === "fewer" ? 1 : 0));
  if (outcome === "equal") return [a, a];
  const d = int(rng, 1, gap);
  const b = outcome === "more" ? Math.max(min, a - d) : Math.min(max, a + d);
  return [a, b];
}

export function comparingQuantities(level, rng) {
  const outcomes = balanced(rng, ["more", "fewer", "equal"]);
  if (level === 1) {
    return distinct(rng, (i, r) => {
      const [red, blue] = comparedPair(r, outcomes[i], 1, 8);
      return { kind: "choice", prompt: "Match red to blue. What do you notice?", sentence: "Red has ___ blue.",
        answer: RELATION[outcomes[i]], options: shuffle(r, [RELATION.more, RELATION.fewer, RELATION.equal]), variant: "wordy",
        visual: things([{ count: red, label: "Red", icon: "🔴", noun: "red counter" }, { count: blue, label: "Blue", icon: "🔵", noun: "blue counter" }]),
        hint: "Match one red to one blue. Are any left over?" };
    }, q => q.visual.groups.map(g => g.count).join());
  }
  if (level === 2) {
    return distinct(rng, (i, r) => {
      const target = int(r, 5, 15);
      // Close neighbours, so the sort needs a real comparison.
      const below = shuffle(r, [1, 2, 3, 4, 5].map(d => target - d)), above = shuffle(r, [1, 2, 3, 4, 5].map(d => target + d));
      const lessCount = int(r, 1, 3);
      const values = shuffle(r, [...below.slice(0, lessCount), ...above.slice(0, 4 - lessCount)]);
      return { kind: "sort", prompt: `Is it more or less than **${target}**? Sort the numbers.`,
        bins: [{ id: "less", label: `Less than ${target}` }, { id: "more", label: `More than ${target}` }],
        cards: values.map((n, k) => ({ id: `card-${k}`, label: String(n), bin: n < target ? "less" : "more" })),
        hint: `Count up to ${target}. Numbers you say before it are less.` };
    }, q => q.prompt + q.cards.map(c => c.label).sort().join());
  }
  if (level === 3) {
    const asks = balanced(rng, ["most", "least"]);
    return distinct(rng, (i, r) => {
      const counts = shuffle(r, Array.from({ length: 9 }, (_, k) => 2 + k)).slice(0, 3);
      const names = shuffle(r, NAMES).slice(0, 3), thing = pick(r, COLLECT);
      const best = counts.indexOf(asks[i] === "most" ? Math.max(...counts) : Math.min(...counts));
      return { kind: "choice", prompt: `Who has the **${asks[i]}** ${thing.many}?`, answer: names[best], options: names,
        visual: things(names.map((name, g) => ({ count: counts[g], label: name, icon: thing.icon, noun: thing.one }))),
        hint: asks[i] === "most" ? "Count each group. Most is the biggest number." : "Count each group. Least is the smallest number." };
    }, q => q.visual.groups.map(g => g.count).join());
  }
  const asks = balanced(rng, ["more", "fewer"]);
  return distinct(rng, (i, r) => {
    const [a, b] = comparedPair(r, outcomes[i], 2, 20, 4);
    const [p, q] = shuffle(r, NAMES).slice(0, 2), thing = pick(r, COLLECT);
    const answer = a === b ? "The same" : (asks[i] === "more") === (a > b) ? p : q;
    return { kind: "choice", prompt: `${p} has ${a} ${thing.many}. ${q} has ${b} ${thing.many}. Who has **${asks[i]}**?`, answer,
      options: [p, q, "The same"], variant: "wordy", hint: "Which number comes later when you count? That one is more." };
  }, q => q.prompt.replace(/[A-Z][a-z]+ has/g, "has"));
}

/** Words a child might mix up with WORDS[n]: same first sound, or its teen. */
const LOOK_ALIKE = { 1: [11], 2: [3, 12], 3: [13, 2], 4: [14, 5], 5: [15, 4], 6: [16, 7], 7: [17, 11], 8: [18], 9: [19], 10: [2, 12] };

export function numberWords(level, rng) {
  if (level === 1) {
    const values = shuffle(rng, Array.from({ length: 10 }, (_, i) => i + 1)).slice(0, RUN);
    return values.map(n => {
      const kind = pick(rng, THINGS);
      return { kind: "choice", prompt: `Find the word for **${n}**.`, answer: WORDS[n], variant: "wordy",
        options: numericOptions(rng, n, 20, { min: 1, near: shuffle(rng, LOOK_ALIKE[n]) }).map(x => WORDS[x]),
        visual: things([{ count: n, label: cap(kind.many), icon: kind.icon, noun: kind.one }]),
        hint: "Say the number. Which word starts with that sound?" };
    });
  }
  // Teens are the tricky words, so at least three of every later run are 11–20.
  const values = shuffle(rng, [...shuffle(rng, Array.from({ length: 10 }, (_, i) => 11 + i)).slice(0, 3),
    ...shuffle(rng, Array.from({ length: 10 }, (_, i) => 1 + i)).slice(0, 2)]);
  return values.map(n => {
    const word = WORDS[n];
    if (level === 2) return { kind: "number", prompt: `Write this word as a number: **${word}**.`, answer: n, maxDigits: 2,
      hint: "A teen word is 10 and some more. Teen numbers start with 1." };
    if (level === 3) return { kind: "build", letters: true, prompt: `Build the word for ${n}.`, answer: word,
      tiles: tiles(rng, [...word], true), hint: "Say the number word, then put its letters in order." };
    return { kind: "type", prompt: `Write ${n} in words.`, answer: word, maxLength: 9, apostrophe: false,
      hint: "Say the word slowly. Which letters do you hear?" };
  });
}

export const numberBuilders = {
  "counting-objects": countingObjects,
  "counting-forwards-and-backwards-to-100": countingForwardsBackwards,
  "reading-and-writing-numerals-to-100": readingWritingNumerals,
  "counting-in-twos-fives-and-tens": countingInSteps,
  "one-more-and-one-less": oneMoreOneLess,
  "comparing-and-ordering-quantities": comparingQuantities,
  "number-words-to-20": numberWords,
};
