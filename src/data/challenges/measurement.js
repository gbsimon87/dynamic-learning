/**
 * Pure question data for the "Measurement" category.
 *
 * Statutory scope (docs/curriculum/year-2-maths.md): standard units for
 * length/height (m/cm), mass (kg/g), temperature (°C) and capacity
 * (litres/ml); comparing and ordering with >, < and =; £ and p, combining
 * amounts and finding different coin combinations; money problems within ONE
 * unit, including change; comparing and sequencing intervals of time; telling
 * the time TO FIVE MINUTES including quarter past and quarter to; and knowing
 * the minutes in an hour and hours in a day.
 *
 * Two boundaries are easy to drift past and are enforced here: time never goes
 * finer than five minutes, and money never mixes pounds with pence in one
 * calculation.
 */

import { shuffle } from "./countingInSteps.js";

/** UK coins in pence. */
export const COINS = [1, 2, 5, 10, 20, 50, 100, 200];

/**
 * Money as it is written and said.
 *
 * Under a pound it is "47p"; whole pounds are "£1"; anything else is "£1.05"
 * with two digits, because "£1.5" misreads as one pound fifty.
 */
export function formatMoney(pence) {
  if (pence < 100) return `${pence}p`;
  const pounds = Math.floor(pence / 100);
  const rest = pence % 100;
  if (rest === 0) return `£${pounds}`;
  return `£${pounds}.${String(rest).padStart(2, "0")}`;
}

export function totalOf(coins) {
  return coins.reduce((sum, coin) => sum + coin, 0);
}

/**
 * True when these coins make exactly the target.
 *
 * Deliberately not "the fewest coins": the statutory requirement is to find
 * DIFFERENT combinations that equal the same amount, so 20+20+10 and 50 are
 * both right for 50p.
 */
export function isValidCoinCombination(coins, target) {
  return coins.length > 0 && totalOf(coins) === target;
}

/** The labelled values of a scale, from `min` to `max` every `step`. */
export function tickValues(min, max, step) {
  const ticks = [];
  for (let v = min; v <= max; v += step) ticks.push(v);
  return ticks;
}

/** The symbol that makes `a ? b` true. */
export function compareMeasures(a, b) {
  if (a < b) return "<";
  if (a > b) return ">";
  return "=";
}

const NEXT_HOUR = (hour) => (hour === 12 ? 1 : hour + 1);

/** An hour on a 12-hour clock face, wrapped into 1..12. */
const wrapHour = (hour) => ((((hour - 1) % 12) + 12) % 12) + 1;

/**
 * Turn the clock's long hand by `minutes` (negative turns it back), the way a
 * real clock behaves: the short hand follows, so going back 15 minutes from
 * 3 o'clock lands on quarter to 3 (2:45) without the learner having to work
 * out that "quarter to 3" lives in the hour before.
 */
export function stepClock(time, minutes) {
  const raw = time.minute + minutes;
  const minute = ((raw % 60) + 60) % 60;
  return { hour: wrapHour(time.hour + Math.floor(raw / 60)), minute };
}

/**
 * The time as a child reads it aloud.
 *
 * Past the half hour the time is said "to" the NEXT hour, which is the part
 * that has to be taught rather than derived.
 */
export function timeToWords(hour, minute) {
  if (minute === 0) return `${hour} o'clock`;
  if (minute === 15) return `quarter past ${hour}`;
  if (minute === 30) return `half past ${hour}`;
  if (minute === 45) return `quarter to ${NEXT_HOUR(hour)}`;
  if (minute < 30) return `${minute} past ${hour}`;
  return `${60 - minute} to ${NEXT_HOUR(hour)}`;
}

/** How many minutes until the hour. On the hour, a whole hour remains. */
export function minutesToNextHour(minute) {
  return minute === 0 ? 60 : 60 - minute;
}

/** The unit relationships Year 2 is expected to know. */
export const CONVERSIONS = [
  { from: "cm", to: "m", perUnit: 100 },
  { from: "g", to: "kg", perUnit: 1000 },
  { from: "ml", to: "litre", perUnit: 1000 },
  { from: "min", to: "hour", perUnit: 60 },
  { from: "hour", to: "day", perUnit: 24 },
];

/** 200 cm -> 2 m. Callers keep to amounts that convert exactly. */
export function convert(amount, from) {
  const rule = CONVERSIONS.find((c) => c.from === from);
  return amount / rule.perUnit;
}

/**
 * Answer options for "read the scale", always `count` of them.
 *
 * The obvious version — take the value either side and drop any that fall off
 * the scale — quietly gives only TWO options at the ends, and a two-option
 * question about a thermometer reading −10 °C is a coin flip. This walks
 * outwards a step at a time and keeps going until it has enough, so a reading
 * at either end is as hard as one in the middle.
 *
 * Every option is a whole number of steps from the answer, so each one can be
 * read off the scale rather than being an impossible value.
 */
export function scaleOptions(value, step, min, max, count) {
  const options = [value];

  for (let distance = 1; options.length < count; distance += 1) {
    for (const candidate of [value - distance * step, value + distance * step]) {
      if (candidate < min || candidate > max) continue;
      if (options.includes(candidate)) continue;
      options.push(candidate);
      if (options.length === count) break;
    }
    // Nothing left within the scale; stop rather than loop forever.
    if (value - distance * step < min && value + distance * step > max) break;
  }

  return options;
}

/* ------------------------------------------------------------------------ *
 * Question builders, one per challenge slot. Each takes `rng` so a challenge
 * varies between attempts while the tests stay deterministic. Every builder
 * returns 6 questions with no repeats.
 * ------------------------------------------------------------------------ */

const randInt = (rng, low, high) => low + Math.floor(rng() * (high - low + 1));
const pick = (rng, list) => list[Math.floor(rng() * list.length)];
const sample = (rng, list, n) => shuffle(list, rng).slice(0, n);
const range = (low, high, step = 1) => tickValues(low, high, step);

/** "20 °C", "12 cm", "300 g" — a measure always carries its unit. */
export function withUnit(value, unit) {
  return `${value} ${unit}`;
}

/** "1 litre" but "2 litres"; cm, g, ml, m and kg do not change. */
export function unitLabel(amount, unit) {
  if (unit === "litre") return amount === 1 ? "1 litre" : `${amount} litres`;
  return withUnit(amount, unit);
}

/**
 * The answer plus `count - 1` distractors drawn at RANDOM from `candidates`
 * (not always the two neighbours), shuffled, so the right answer is not
 * always the middle of three consecutive values.
 */
export function optionsFrom(answer, candidates, count, rng, keep = () => true) {
  const pool = [...new Set(candidates)].filter((c) => c !== answer && keep(c));
  return shuffle([answer, ...shuffle(pool, rng).slice(0, count - 1)], rng);
}

/** Two digits the other way round: 12 -> 21. Null when that is not a different two-digit number. */
function swapDigits(n) {
  if (n < 10 || n > 99 || n % 10 === 0 || n % 11 === 0) return null;
  return (n % 10) * 10 + Math.floor(n / 10);
}

/** Numeric distractors for reading a scale, as labelled strings. */
function scaleChoice(value, offsets, min, max, unit, rng, extra = []) {
  const candidates = [...offsets.map((d) => value + d), ...extra].filter(
    (v) => v !== null && v >= min && v <= max
  );
  const options = optionsFrom(value, candidates, 3, rng);
  return { answer: withUnit(value, unit), options: options.map((v) => withUnit(v, unit)) };
}

/* --- Measuring Length and Height --- */

const RULER_OBJECTS = ["pencil", "ribbon", "crayon", "leaf", "feather", "straw", "key", "spoon", "worm", "twig"];

/** Slot 1: read a ruler. Three readings on a numbered mark, then three on a small 1 cm mark. */
export function buildRulerReadQuestions(rng) {
  const onLabel = sample(rng, range(5, 30, 5), 3);
  const between = sample(rng, range(1, 29).filter((v) => v % 5 !== 0), 3);
  const objects = sample(rng, RULER_OBJECTS, 6);
  return [...onLabel, ...between].map((value, i) => ({
    value,
    object: objects[i],
    ...scaleChoice(value, [-1, 1, -2, 2, -5, 5], 0, 30, "cm", rng, [swapDigits(value)]),
  }));
}

/** Slot 2: put the marker on a length. Never on a numbered mark, so every one is counted on. */
export function buildRulerSetQuestions(rng) {
  return sample(rng, range(1, 29).filter((v) => v % 5 !== 0), 6).map((target) => ({ target }));
}

const UNIT_THINGS = {
  cm: ["the length of a pencil", "the width of a stamp", "the height of a cup", "the length of a spoon", "the length of your hand", "the width of a book", "the length of a shoe"],
  m: ["the height of a door", "the length of a playground", "the length of a bus", "the height of a tree", "the length of a swimming pool", "the height of a house", "the length of a football pitch"],
};

/** Slot 3: choose cm or m. Always three of each, so guessing one unit cannot pass. */
export function buildUnitChoiceQuestions(rng) {
  return shuffle(
    [
      ...sample(rng, UNIT_THINGS.cm, 3).map((thing) => ({ thing, answer: "cm" })),
      ...sample(rng, UNIT_THINGS.m, 3).map((thing) => ({ thing, answer: "m" })),
    ],
    rng
  );
}

/** Slot 4: length stories, typed. One of each kind of story, numbers made fresh each time. */
export function buildLengthStoryQuestions(rng) {
  const together = () => {
    const a = randInt(rng, 12, 48);
    const b = randInt(rng, 11, 98 - a > 48 ? 48 : 98 - a);
    return { prompt: `A red ribbon is ${a} cm long. A blue ribbon is ${b} cm long. How long are they together?`, answer: a + b, unit: "cm" };
  };
  const cut = () => {
    const a = randInt(rng, 40, 95);
    const b = randInt(rng, 11, a - 15);
    return { prompt: `A stick is ${a} cm long. You cut off ${b} cm. How long is it now?`, answer: a - b, unit: "cm" };
  };
  const grows = () => {
    const a = randInt(rng, 25, 70);
    const b = randInt(rng, 11, 99 - a);
    return { prompt: `A sunflower is ${a} cm tall. It grows ${b} cm more. How tall is it now?`, answer: a + b, unit: "cm" };
  };
  const longer = () => {
    const a = randInt(rng, 45, 95);
    const b = randInt(rng, 12, a - 15);
    return { prompt: `A snake is ${a} cm long. A worm is ${b} cm long. How much longer is the snake?`, answer: a - b, unit: "cm" };
  };
  const toCm = () => {
    const n = randInt(rng, 2, 5);
    return { prompt: `How many centimetres are in ${n} metres?`, answer: n * 100, unit: "cm" };
  };
  const toM = () => {
    const n = randInt(rng, 2, 5);
    return { prompt: `A rope is ${n * 100} cm long. How many metres is that?`, answer: n, unit: "m" };
  };
  return shuffle([together, cut, grows, longer, toCm, toM], rng).map((make) => make());
}

/* --- Measuring Weight and Volume --- */

const SCALE_THINGS = ["flour", "sugar", "apples", "rice", "potatoes", "sand", "pasta", "carrots", "oats"];
const JUG_DRINKS = ["water", "juice", "milk", "squash"];

/** Slot 1: read a kitchen scale numbered every 100 g. */
export function buildScaleReadQuestions(rng) {
  const things = sample(rng, SCALE_THINGS, 6);
  return sample(rng, range(100, 900, 100), 6).map((value, i) => ({
    value,
    thing: things[i],
    ...scaleChoice(value, [-100, 100, -200, 200], 0, 1000, "g", rng),
  }));
}

/** Slot 2: read a measuring jug numbered every 100 ml, from the bottom up. */
export function buildJugReadQuestions(rng) {
  return sample(rng, range(100, 1000, 100), 6).map((value) => ({
    value,
    drink: pick(rng, JUG_DRINKS),
    ...scaleChoice(value, [-100, 100, -200, 200], 0, 1000, "ml", rng),
  }));
}

/** The fill-the-jug scale: numbered every 100 ml (like slots 1 and 2), with a small line at every 50 ml. */
export const FILL_JUG_SCALE = { min: 0, max: 1000, majorStep: 100, minorStep: 50, step: 50 };

/** Slot 3: fill the jug. Four targets sit halfway between numbered lines, two on one. */
export function buildJugFillQuestions(rng) {
  const halfway = sample(rng, range(150, 950, 100), 4);
  const onLine = sample(rng, range(200, 900, 100), 2);
  return shuffle([...halfway, ...onLine], rng).map((target) => ({ target }));
}

/** Slot 4: mass and capacity stories, typed. */
export function buildMassCapacityStoryQuestions(rng) {
  const fact = () =>
    pick(rng, [
      { prompt: "How many grams are in 1 kilogram?", answer: 1000, unit: "g" },
      { prompt: "How many millilitres are in 1 litre?", answer: 1000, unit: "ml" },
    ]);
  const addMass = () => {
    const a = randInt(rng, 2, 6) * 100;
    const b = randInt(rng, 1, 7) * 50;
    return { prompt: `A bag of flour weighs ${a} g. You add ${b} g more. What does it weigh now?`, answer: a + b, unit: "g" };
  };
  const drink = () => {
    const a = randInt(rng, 5, 10) * 100;
    const b = randInt(rng, 2, a / 50 - 2) * 50;
    return { prompt: `A bottle holds ${a} ml of water. You drink ${b} ml. How much is left?`, answer: a - b, unit: "ml" };
  };
  const together = () => {
    const a = randInt(rng, 2, 5) * 50;
    const b = randInt(rng, 2, 8) * 50;
    return { prompt: `A cup holds ${a} ml. A mug holds ${b} ml. How much do they hold altogether?`, answer: a + b, unit: "ml" };
  };
  const pair = () => {
    const a = randInt(rng, 6, 15) * 10;
    return { prompt: `Two apples weigh ${a} g each. How much do they weigh together?`, answer: 2 * a, unit: "g" };
  };
  const takeOut = () => {
    const a = randInt(rng, 5, 9) * 100;
    const b = randInt(rng, 1, a / 100 - 2) * 100;
    return { prompt: `A box of toys weighs ${a} g. You take out toys weighing ${b} g. What does it weigh now?`, answer: a - b, unit: "g" };
  };
  return shuffle([fact, addMass, drink, together, pair, takeOut], rng).map((make) => make());
}

/* --- Comparing Measurements --- */

/** The scale each measure is shown on in slot 1. */
export const COMPARE_SCALES = {
  cm: { max: 30, step: 5, orientation: "horizontal", variant: "", noun: "length" },
  g: { max: 1000, step: 100, orientation: "horizontal", variant: "", noun: "mass" },
  ml: { max: 1000, step: 100, orientation: "vertical", variant: "jug", noun: "capacity" },
};

/** A pair `a ? b` on one scale that makes `relation` true. */
function pairFor(relation, values, rng) {
  if (relation === "=") {
    const v = pick(rng, values);
    return [v, v];
  }
  const [low, high] = sample(rng, values, 2).sort((x, y) => x - y);
  return relation === "<" ? [low, high] : [high, low];
}

/** Slot 1: compare two measures you can see — 2 lengths, 2 masses, 2 capacities. */
export function buildVisualCompareQuestions(rng) {
  const relations = shuffle(["<", ">", "=", "<", ">", pick(rng, ["<", ">"])], rng);
  const units = shuffle(["cm", "cm", "g", "g", "ml", "ml"], rng);
  const seen = new Set();
  return units.map((unit, i) => {
    const scale = COMPARE_SCALES[unit];
    const values = range(scale.step, scale.max, scale.step);
    let a;
    let b;
    do {
      [a, b] = pairFor(relations[i], values, rng);
    } while (seen.has(`${unit}${a}-${b}`));
    seen.add(`${unit}${a}-${b}`);
    return { a, b, unit, ...scale, answer: compareMeasures(a, b) };
  });
}

const FAMILIES = {
  length: { big: "m", small: "cm", per: 100, step: 10 },
  mass: { big: "kg", small: "g", per: 1000, step: 100 },
  capacity: { big: "litre", small: "ml", per: 1000, step: 100 },
};

/**
 * Slot 2: compare across units, with no picture. Kilograms and litres stay
 * at 1, so grams and millilitres stay within 1000.
 */
export function buildCrossUnitCompareQuestions(rng) {
  const families = shuffle(["length", "length", "mass", "mass", "capacity", "capacity"], rng);
  const equalAt = randInt(rng, 0, 5);
  const seen = new Set();
  const out = [];
  families.forEach((name, i) => {
    const f = FAMILIES[name];
    for (;;) {
      const n = name === "length" ? randInt(rng, 1, 2) : 1;
      let small;
      if (i === equalAt) small = n * f.per;
      else if (name === "length") small = n * f.per + pick(rng, [-1, 1]) * randInt(rng, 1, 9) * f.step;
      else small = randInt(rng, 1, 9) * f.step;
      const bigSide = { label: unitLabel(n, f.big), v: n * f.per };
      const smallSide = { label: withUnit(small, f.small), v: small };
      const [left, right] = rng() < 0.5 ? [bigSide, smallSide] : [smallSide, bigSide];
      const key = `${left.label}|${right.label}`;
      if (seen.has(key)) continue;
      seen.add(key);
      out.push({ left: left.label, right: right.label, a: left.v, b: right.v, answer: compareMeasures(left.v, right.v) });
      return;
    }
  });
  return out;
}

/** Four distinct measures from one family, at least one in each unit. */
function mixedSet(name, rng) {
  const f = FAMILIES[name];
  const bigs = name === "length" ? sample(rng, [1, 2, 3], randInt(rng, 1, 2)) : sample(rng, [1, 2], randInt(rng, 1, 2));
  const smallPool =
    name === "length"
      ? range(10, 290, 10).filter((v) => v % 100 !== 0)
      : range(50, 950, 50);
  const smalls = sample(rng, smallPool, 4 - bigs.length);
  return [
    ...bigs.map((n) => ({ label: unitLabel(n, f.big), v: n * f.per })),
    ...smalls.map((v) => ({ label: withUnit(v, f.small), v })),
  ];
}

/** Slot 3: order mixed-unit measures, smallest first. Two sets from each of length, mass and capacity. */
export function buildMixedUnitOrderQuestions(rng) {
  const seen = new Set();
  return shuffle(["length", "length", "mass", "mass", "capacity", "capacity"], rng).map((name) => {
    let set;
    do {
      set = mixedSet(name, rng);
    } while (seen.has(set.map((m) => m.v).sort((a, b) => a - b).join()));
    seen.add(set.map((m) => m.v).sort((a, b) => a - b).join());
    const ordered = [...set].sort((a, b) => a.v - b.v).map((m) => m.label);
    let cards = shuffle(set.map((m) => ({ id: m.label, label: m.label })), rng);
    if (cards.every((card, i) => card.id === ordered[i])) cards = [...cards].reverse();
    return { ordered, cards };
  });
}

/** Slot 4: how much more, half as much, twice as much — typed. */
export function buildMeasureDifferenceQuestions(rng) {
  const longer = () => {
    const a = randInt(rng, 35, 95);
    const b = randInt(rng, 12, a - 11);
    return { prompt: `A red ribbon is ${a} cm long. A blue ribbon is ${b} cm long. How much longer is the red one?`, answer: a - b, unit: "cm" };
  };
  const heavier = () => {
    const a = randInt(rng, 5, 9) * 100;
    const b = randInt(rng, 2, a / 50 - 2) * 50;
    return { prompt: `A melon weighs ${a} g. An apple weighs ${b} g. How much heavier is the melon?`, answer: a - b, unit: "g" };
  };
  const more = () => {
    const a = randInt(rng, 6, 10) * 100;
    const b = randInt(rng, 1, 5) * 50;
    return { prompt: `A jug holds ${a} ml. A cup holds ${b} ml. How much more does the jug hold?`, answer: a - b, unit: "ml" };
  };
  const half = () => {
    const a = randInt(rng, 5, 10) * 10;
    return { prompt: `A wall is ${a} cm high. A fence is half as high. How high is the fence?`, answer: a / 2, unit: "cm" };
  };
  const twiceWide = () => {
    const a = randInt(rng, 15, 45);
    return { prompt: `A book is ${a} cm wide. A desk is twice as wide. How wide is the desk?`, answer: 2 * a, unit: "cm" };
  };
  const twiceMl = () => {
    const a = randInt(rng, 2, 5) * 100;
    return { prompt: `A bottle holds ${a} ml. A flask holds twice as much. How much does the flask hold?`, answer: 2 * a, unit: "ml" };
  };
  return shuffle([longer, heavier, more, half, twiceWide, twiceMl], rng).map((make) => make());
}

/* --- Measuring Temperature (Year 2: 0 °C and above only) --- */

/** The thermometer every temperature slot uses: 0 to 50 °C, numbered every 10, small marks every 5. */
export const THERMOMETER = { min: 0, max: 50, majorStep: 10, minorStep: 5 };

/** Slot 1: read a thermometer. Three readings on a numbered mark, then three on a small mark. */
export function buildThermometerReadQuestions(rng) {
  const onLabel = sample(rng, range(0, 50, 10), 3);
  const between = sample(rng, range(5, 45, 10), 3);
  return [...onLabel, ...between].map((value) => ({
    value,
    ...scaleChoice(value, [-5, 5, -10, 10, -20, 20], THERMOMETER.min, THERMOMETER.max, "°C", rng),
  }));
}

/** Slot 2: set the thermometer. Three on a numbered mark, three in between; never 0, where it starts. */
export function buildThermometerSetQuestions(rng) {
  const onLabel = sample(rng, range(10, 50, 10), 3);
  const between = sample(rng, range(5, 45, 10), 3);
  return shuffle([...onLabel, ...between], rng).map((target) => ({ target }));
}

/**
 * Slot 3: order temperatures. The first three ask coldest first, the last
 * three hottest first, so the learner has to read the instruction too.
 */
export function buildTemperatureOrderQuestions(rng) {
  const seen = new Set();
  return ["coldest", "coldest", "coldest", "hottest", "hottest", "hottest"].map((first) => {
    let set;
    do {
      set = sample(rng, range(0, 50, 5), 4);
    } while (seen.has([...set].sort((a, b) => a - b).join()));
    seen.add([...set].sort((a, b) => a - b).join());
    const sorted = [...set].sort((a, b) => (first === "coldest" ? a - b : b - a));
    const ordered = sorted.map((n) => withUnit(n, "°C"));
    let cards = shuffle(set.map((n) => ({ id: withUnit(n, "°C"), label: withUnit(n, "°C") })), rng);
    if (cards.every((card, i) => card.id === ordered[i])) cards = [...cards].reverse();
    return { first, ordered, cards };
  });
}

/**
 * Situations with the temperature that fits and wrong ones far enough away
 * that this is judgement, not arithmetic. No negatives: Year 2 reads
 * thermometers at 0 °C and above.
 */
const SITUATIONS = [
  { thing: "a glass of iced water", answer: 0, wrong: [25, 40, 60] },
  { thing: "a snowy day", answer: 0, wrong: [20, 30, 45] },
  { thing: "a cold winter morning", answer: 5, wrong: [30, 45, 70] },
  { thing: "a warm classroom", answer: 20, wrong: [0, 50, 80] },
  { thing: "a hot summer day", answer: 30, wrong: [0, 5, 80] },
  { thing: "a hot bath", answer: 40, wrong: [0, 10, 90] },
  { thing: "a cup of hot cocoa", answer: 70, wrong: [0, 10, 25] },
  { thing: "a sunny day at the beach", answer: 25, wrong: [0, 60, 90] },
];

/** Slot 4: which temperature fits? Options carry °C. */
export function buildTemperatureSenseQuestions(rng) {
  const chosen = [];
  for (const s of shuffle(SITUATIONS, rng)) {
    // Two situations with the same answer in one run would read as a repeat.
    if (chosen.some((c) => c.answer === s.answer)) continue;
    chosen.push(s);
    if (chosen.length === 6) break;
  }
  return chosen.map((s) => ({
    thing: s.thing,
    answer: withUnit(s.answer, "°C"),
    options: shuffle([s.answer, ...sample(rng, s.wrong, 2)], rng).map((v) => withUnit(v, "°C")),
  }));
}

/* --- Measuring Time --- */

/**
 * Mistakes a learner really makes reading a clock, as distractor times:
 * hands swapped, the hour one out either way, past and to mixed up.
 */
export function clockDistractors(hour, minute) {
  const swappedHour = minute === 0 ? 12 : minute / 5;
  const swappedMinute = (hour * 5) % 60;
  return [
    timeToWords(swappedHour, swappedMinute),
    timeToWords(wrapHour(hour + 1), minute),
    timeToWords(wrapHour(hour - 1), minute),
    // Same long hand read the other way: quarter past <-> quarter to.
    minute !== 0 && minute !== 30 ? timeToWords(hour, 60 - minute) : timeToWords(hour, (minute + 30) % 60),
    // Past and to mixed up while keeping the hour that was said:
    // 9:15 read as "quarter to 9", 5:45 read as "quarter past 6".
    ...(minute !== 0 && minute !== 30
      ? [timeToWords(wrapHour(minute < 30 ? hour - 1 : hour + 1), 60 - minute)]
      : []),
  ];
}

function clockQuestion(hour, minute, rng) {
  const answer = timeToWords(hour, minute);
  return { hour, minute, answer, options: optionsFrom(answer, clockDistractors(hour, minute), 3, rng) };
}

/** Slot 1: read o'clock, half past, quarter past and quarter to — each at least once. */
export function buildClockReadQuestions(rng) {
  const minutes = shuffle([0, 15, 30, 45, pick(rng, [0, 15, 30, 45]), pick(rng, [0, 15, 30, 45])], rng);
  const hours = sample(rng, range(1, 12), 6);
  return minutes.map((minute, i) => clockQuestion(hours[i], minute, rng));
}

/** Slot 2: read five-minute times — three past the hour, three to the next hour. */
export function buildFiveMinuteReadQuestions(rng) {
  const minutes = shuffle([...sample(rng, [5, 10, 20, 25], 3), ...sample(rng, [35, 40, 50, 55], 3)], rng);
  const hours = sample(rng, range(1, 12), 6);
  return minutes.map((minute, i) => clockQuestion(hours[i], minute, rng));
}

/**
 * Slot 3: set the clock. The four landmark times first, then a five-minute
 * time past and one to the hour. The clock starts at 12 o'clock, so 12 is
 * never a target hour (it would already be showing).
 */
export function buildClockSetQuestions(rng) {
  const hours = sample(rng, range(1, 11), 6);
  const minutes = [...shuffle([0, 15, 30, 45], rng), pick(rng, [5, 10, 20, 25]), pick(rng, [35, 40, 50, 55])];
  return minutes.map((minute, i) => {
    const target = { hour: hours[i], minute };
    return { target, words: timeToWords(target.hour, target.minute) };
  });
}

/** Slot 4: intervals and units of time, typed. One of each kind. */
export function buildTimeIntervalQuestions(rng) {
  const fact = () =>
    pick(rng, [
      { prompt: "How many minutes are in 1 hour?", answer: 60, unit: "minutes" },
      { prompt: "How many hours are in 1 day?", answer: 24, unit: "hours" },
      { prompt: "How many minutes are in half an hour?", answer: 30, unit: "minutes" },
    ]);
  const film = () => {
    const start = randInt(rng, 1, 6);
    const hours = randInt(rng, 2, 4);
    return { prompt: `A film starts at ${start} o'clock and ends at ${start + hours} o'clock. How many hours long is it?`, answer: hours, unit: "hours" };
  };
  const playtime = () => {
    const hour = randInt(rng, 9, 11);
    const start = pick(rng, [0, 15, 30]);
    const length = randInt(rng, 2, (55 - start) / 5) * 5;
    return {
      prompt: `Playtime starts at ${timeToWords(hour, start)} and ends at ${timeToWords(hour, start + length)}. How many minutes long is it?`,
      answer: length,
      unit: "minutes",
    };
  };
  const untilHour = () => {
    const hour = randInt(rng, 1, 11);
    const minute = pick(rng, [10, 20, 25, 35, 40, 50]);
    return { prompt: `It is ${timeToWords(hour, minute)}. How many minutes until ${hour + 1} o'clock?`, answer: minutesToNextHour(minute), unit: "minutes" };
  };
  const twoHours = () => {
    const n = randInt(rng, 2, 3);
    return { prompt: `How many minutes are in ${n} hours?`, answer: n * 60, unit: "minutes" };
  };
  const compare = () => {
    const [a, b] = sample(rng, range(10, 55, 5), 2).sort((x, y) => x - y);
    return { prompt: `Ali reads for ${a} minutes. Ben reads for ${b} minutes. How many more minutes does Ben read for?`, answer: b - a, unit: "minutes" };
  };
  return shuffle([fact, film, playtime, untilHour, twoHours, compare], rng).map((make) => make());
}

/* --- Standard Units of Money --- */

function coinWords(coin) {
  if (coin === 1) return "1 penny";
  if (coin < 100) return `${coin} pence`;
  return coin === 100 ? "1 pound" : `${coin / 100} pounds`;
}

/**
 * Slot 1: how a coin is written. Distractors are the real mistakes: the
 * wrong symbol, the symbol on the wrong side, and the coin next door.
 */
export function buildCoinNameQuestions(rng) {
  return sample(rng, COINS, 6).map((coin) => {
    const answer = formatMoney(coin);
    const i = COINS.indexOf(coin);
    const n = coin < 100 ? coin : coin / 100;
    const wrong =
      coin < 100 ? [`£${n}`, `p${n}`] : [`${n}p`, `${n}£`];
    const neighbours = [COINS[i - 1], COINS[i + 1]].filter(Boolean).map(formatMoney);
    return { coin, words: coinWords(coin), answer, options: optionsFrom(answer, [...wrong, ...neighbours], 3, rng) };
  });
}

/** Slot 2: make an amount. Two small, two middling, two near a pound; never a single coin. */
export function buildMakeAmountQuestions(rng) {
  const notCoin = (v) => !COINS.includes(v);
  return [
    ...sample(rng, range(3, 19).filter(notCoin), 2),
    ...sample(rng, range(21, 59).filter(notCoin), 2),
    ...sample(rng, range(61, 99), 2),
  ].map((target) => ({ target }));
}

/** The fewest coins that make `pence`, biggest first. */
export function fewestCoins(pence) {
  const out = [];
  let left = pence;
  for (const coin of [...COINS].reverse()) {
    while (left >= coin) {
      out.push(coin);
      left -= coin;
    }
  }
  return out;
}

/** Slot 3: one way is shown; find a different one. */
export function buildAnotherWayQuestions(rng) {
  return sample(rng, range(15, 95, 5).filter((v) => v !== 50), 6).map((target) => ({
    target,
    shown: fewestCoins(target),
  }));
}

/** Slot 4: total a handful of coins. Three coins at first, then four or five. */
export function buildCoinTotalQuestions(rng) {
  const seen = new Set();
  return [3, 3, 3, 4, 4, 5].map((count) => {
    for (;;) {
      const coins = Array.from({ length: count }, () => pick(rng, [1, 2, 5, 10, 20, 50])).sort((a, b) => b - a);
      const total = totalOf(coins);
      if (total < 10 || total > 99 || seen.has(total)) continue;
      seen.add(total);
      return { coins, answer: total };
    }
  });
}

/* --- Money Problems (one unit at a time: all pence, or all pounds) --- */

const SHOP = ["a pencil", "a rubber", "an apple", "a banana", "a sticker", "a badge", "a pen", "a cake", "a drink", "a card", "a ruler", "a lolly"];

/** Wording for paying with one coin or note. £1 is said as £1, with its 100p alongside. */
export function payWith(pence) {
  if (pence === 100) return "a £1 coin (that is 100p)";
  return `a ${formatMoney(pence)} ${pence >= 500 ? "note" : "coin"}`;
}

/** Slot 1: add two prices in pence. The first three need no carrying; the last three do. */
export function buildAddPricesQuestions(rng) {
  const seen = new Set();
  return [false, false, false, true, true, true].map((carry) => {
    for (;;) {
      const a = randInt(rng, 11, 55);
      const b = randInt(rng, 11, 88 - a);
      if ((a % 10) + (b % 10) >= 10 !== carry || seen.has(a + b)) continue;
      seen.add(a + b);
      const [x, y] = sample(rng, SHOP, 2);
      const answer = a + b;
      const options = optionsFrom(answer, [answer - 10, answer + 10, answer - 1, answer + 1, answer + 2, answer - 2], 3, rng, (v) => v > 0 && v < 100);
      return {
        prompt: `${x[0].toUpperCase()}${x.slice(1)} costs ${a}p and ${y} costs ${b}p. How much for both?`,
        answer: formatMoney(answer),
        options: options.map(formatMoney),
      };
    }
  });
}

/** Slot 2: change from one coin or note. Four in pence, two in whole pounds. */
export function buildChangeQuestions(rng) {
  const things = sample(rng, SHOP, 4);
  const costs = new Set();
  const pence = [20, 50, 50, 100].map((paid, i) => {
    let cost;
    do {
      cost = randInt(rng, Math.ceil(paid / 4), paid - 3);
    } while (costs.has(`${paid}-${cost}`));
    costs.add(`${paid}-${cost}`);
    return { prompt: `You pay with ${payWith(paid)} for ${things[i]} costing ${cost}p. How much change do you get?`, answer: paid - cost, unit: "p" };
  });
  const toys = sample(rng, ["a toy car", "a book", "a ball", "a kite", "a puzzle"], 2);
  const pounds = [500, 1000].map((paid, i) => {
    const cost = randInt(rng, 1, paid / 100 - 1);
    return { prompt: `You pay with ${payWith(paid)} for ${toys[i]} costing £${cost}. How much change do you get?`, answer: paid / 100 - cost, unit: "£" };
  });
  return shuffle([...pence, ...pounds], rng);
}

/** Slot 3: hand over the change in coins. Paid with one coin; the change is under £1. */
export function buildCountChangeQuestions(rng) {
  const seen = new Set();
  return [20, 50, 50, 100, 100, 100].map((paid) => {
    for (;;) {
      const cost = paid === 20 ? randInt(rng, 3, 17) : randInt(rng, 2, paid / 5 - 1) * 5;
      if (seen.has(`${paid}-${cost}`)) continue;
      seen.add(`${paid}-${cost}`);
      return { paid, cost, change: paid - cost, payWords: payWith(paid) };
    }
  });
}

/** Slot 4: two-step money stories, typed. Four in pence, two in pounds. */
export function buildTwoStepMoneyQuestions(rng) {
  const [a, b, c, d] = sample(rng, SHOP, 4);
  const buyTwoPay = () => {
    const x = randInt(rng, 2, 6) * 5;
    const y = randInt(rng, 2, 18 - x / 5) * 5;
    return { prompt: `You buy ${a} for ${x}p and ${b} for ${y}p. You pay with ${payWith(100)}. How much change do you get?`, answer: 100 - x - y, unit: "p" };
  };
  const haveBuyTwo = () => {
    const have = pick(rng, [60, 70, 80, 90]);
    const x = randInt(rng, 11, have / 2 - 5);
    const y = randInt(rng, 5, have - x - 5);
    return { prompt: `You have ${have}p. You buy ${c} for ${x}p and ${d} for ${y}p. How much is left?`, answer: have - x - y, unit: "p" };
  };
  const twoSame = () => {
    const x = randInt(rng, 5, 20);
    return { prompt: `Two stickers cost ${x}p each. You pay with ${payWith(50)}. How much change do you get?`, answer: 50 - 2 * x, unit: "p" };
  };
  const spendTwice = () => {
    const have = pick(rng, [70, 80, 90]);
    const x = randInt(rng, 12, 30);
    const y = randInt(rng, 11, have - x - 5);
    return { prompt: `You have ${have}p. You spend ${x}p, then ${y}p. How much is left?`, answer: have - x - y, unit: "p" };
  };
  const bookToy = () => {
    const x = randInt(rng, 2, 6);
    const y = randInt(rng, 2, 18 - x);
    return { prompt: `A book costs £${x} and a toy costs £${y}. You pay with a £20 note. How much change do you get?`, answer: 20 - x - y, unit: "£" };
  };
  const treat = () => {
    const x = randInt(rng, 2, 4);
    const y = randInt(rng, 1, 9 - x);
    return { prompt: `You have £10. You spend £${x} on a kite and £${y} on a ball. How much is left?`, answer: 10 - x - y, unit: "£" };
  };
  return shuffle([buyTwoPay, haveBuyTwo, twoSame, spendTwice, bookToy, treat], rng).map((make) => make());
}
