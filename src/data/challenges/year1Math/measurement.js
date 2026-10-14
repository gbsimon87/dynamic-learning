import { DAYS, int, MONTHS, numericOptions, order, shuffle } from "./shared.js";

export const COINS = [1, 2, 5, 10, 20, 50, 100, 200];
export const NOTES = [5, 10, 20, 50];
export const moneyName = n => n < 100 ? `${n}p` : `£${n / 100}`;
const take = (rng, items, n) => shuffle(rng, items).slice(0, n);
const range = (min, max) => Array.from({ length: max - min + 1 }, (_, k) => min + k);
/** Five flags, three of one and two of the other, shuffled: answers never simply alternate. */
const mixed = rng => shuffle(rng, [true, true, false, false, rng() < 0.5]);
/** Plain choice that keeps its options in the order given (letters A, B, C). */
const letterChoice = (prompt, answer, count, extra) => ({ kind: "choice", prompt, answer, options: ["A", "B", "C", "D"].slice(0, count), variant: "wordy", ...extra });
const wordy = (rng, prompt, answer, options, extra = {}) => ({ kind: "choice", prompt, answer, options: shuffle(rng, options), variant: "wordy", ...extra });

/**
 * Builds five questions with `make(rng, i)` and never repeats one in a run:
 * `key` names what makes two questions the same.
 */
function unique(rng, make, key = q => JSON.stringify([q.prompt, q.visual, q.answer])) {
  const seen = new Set(), questions = [];
  for (let attempt = 0; questions.length < 5 && attempt < 200; attempt++) {
    const q = make(rng, questions.length);
    if (seen.has(key(q))) continue;
    seen.add(key(q));
    questions.push(q);
  }
  return questions;
}

/* ---------- lengths, mass and capacity ---------- */

const COLOURS = ["Red", "Blue", "Green", "Yellow"];
const MEASURE = {
  length: { thing: "ribbon", unit: "blocks", one: "block", more: "longer", less: "shorter", most: "longest", least: "shortest",
    compare: word => `Which ribbon is ${word}?`, count: name => `How many blocks long is the ${name}?` },
  mass: { thing: "bag", unit: "cubes", one: "cube", more: "heavier", less: "lighter", most: "heaviest", least: "lightest",
    compare: word => `Which bag is ${word}?`, count: name => `How many cubes balance the ${name}?` },
  capacity: { thing: "jug", unit: "cups", one: "cup", more: "more", less: "less", most: "most water", least: "least water",
    compare: word => `Which jug holds ${word}?`, count: name => `How many cups fill the ${name}?` },
};

/** Real things on real scales. Mass and capacity are read in whole units on a 0–10 or 0–1000 scale. */
const WEIGHED = [
  { name: "pumpkin", icon: "🎃", unit: "kg", min: 2, max: 7 }, { name: "watermelon", icon: "🍉", unit: "kg", min: 3, max: 6 },
  { name: "bag of potatoes", icon: "🥔", unit: "kg", min: 2, max: 5 }, { name: "box of books", icon: "📚", unit: "kg", min: 4, max: 9 },
  { name: "bag of apples", icon: "🍎", unit: "kg", min: 1, max: 3 },
  { name: "bag of pasta", icon: "🍝", unit: "g", min: 3, max: 9 }, { name: "bag of grapes", icon: "🍇", unit: "g", min: 2, max: 6 },
  { name: "block of cheese", icon: "🧀", unit: "g", min: 2, max: 5 }, { name: "tin of beans", icon: "🥫", unit: "g", min: 3, max: 5 },
];
const FILLED = [
  { name: "bucket", icon: "🪣", unit: "litres", min: 2, max: 9 }, { name: "fish tank", icon: "🐠", unit: "litres", min: 3, max: 9 },
  { name: "sink", icon: "🚰", unit: "litres", min: 2, max: 8 },
  { name: "jug of milk", icon: "🥛", unit: "ml", min: 2, max: 9 }, { name: "jug of juice", icon: "🧃", unit: "ml", min: 2, max: 9 },
  { name: "jug of water", icon: "💧", unit: "ml", min: 1, max: 9 },
];
const SCALE = {
  kg: { max: 10, step: 1, words: "Kilograms", label: "A scale marked in kilograms" },
  g: { max: 1000, step: 100, words: "Grams", label: "A kitchen scale marked in grams" },
  litres: { max: 10, step: 1, words: "Litres", label: "A container marked in litres" },
  ml: { max: 1000, step: 100, words: "Millilitres", label: "A measuring jug marked in millilitres" },
};

function measureBuilder(type) {
  const m = MEASURE[type];
  const rows = (names, values) => names.map((name, j) => ({ label: `${name} ${m.thing}`, value: values[j] }));
  return (level, rng) => {
    if (level === 1) {
      const larger = mixed(rng);
      return unique(rng, (r, i) => {
        const names = take(r, COLOURS, 2), values = take(r, range(2, 8), 2);
        const pair = rows(names, values), word = larger[i] ? m.more : m.less;
        const answer = [...pair].sort((a, b) => a.value - b.value)[larger[i] ? 1 : 0].label;
        return wordy(r, m.compare(word), answer, pair.map(row => row.label), {
          visual: { type: "measure", measure: type, unit: m.unit, rows: pair }, hint: `Count the ${m.unit}. More ${m.unit} means ${m.more}.` });
      });
    }
    if (level === 2) {
      const values = take(rng, range(3, 10), 5);
      return values.map((value, i) => {
        const name = `${COLOURS[(i + int(rng, 0, 3)) % 4]} ${m.thing}`;
        return { kind: "choice", prompt: m.count(name.toLowerCase()), answer: value, options: numericOptions(rng, value, 12, { min: 1 }),
          visual: { type: "measure", measure: type, unit: m.unit, rows: [{ label: name, value }] },
          hint: `Touch each ${m.one} once as you count.` };
      });
    }
    if (level === 3) return unique(rng, r => {
      const names = take(r, COLOURS, 3), values = take(r, range(2, 9), 3);
      const shown = rows(names, values);
      const sorted = [...shown].sort((a, b) => a.value - b.value);
      return { ...order(r, `Put the ${m.thing}s in order. ${m.least[0].toUpperCase()}${m.least.slice(1)} first.`, sorted.map(row => row.label), sorted.map(row => row.value)),
        visual: { type: "measure", measure: type, unit: m.unit, rows: shown },
        hint: `Count the ${m.unit} for each one. Fewest ${m.unit} goes first.` };
    }, q => JSON.stringify(q.visual.rows));
    if (type === "length") {
      const values = take(rng, range(2, 14), 5), tall = mixed(rng);
      const things = shuffle(rng, ["ribbon", "pencil", "straw", "crayon", "worm"]);
      return values.map((value, i) => ({
        kind: "number", prompt: tall[i] ? "How tall is the tower? Read the ruler." : `How long is the ${things[i]}? Read the ruler.`,
        answer: value, maxDigits: 2, label: "Centimetres",
        visual: { type: "ruler", value, max: 15, vertical: tall[i], object: tall[i] ? "tower" : things[i] },
        hint: "Start at 0. Read the number where it ends.",
      }));
    }
    const items = take(rng, type === "mass" ? WEIGHED : FILLED, 5);
    return items.map(item => {
      const scale = SCALE[item.unit], value = int(rng, item.min, item.max) * scale.step;
      return { kind: "number", prompt: type === "mass" ? `How heavy is the ${item.name}?` : `How much is in the ${item.name}?`,
        answer: value, maxDigits: 3, label: scale.words,
        visual: { type: "instrument", value, unit: item.unit, max: scale.max, step: scale.step, vertical: type === "capacity", icon: item.icon, label: scale.label },
        hint: type === "mass" ? "Find the number the pointer is on." : "Find the top of the water. Read the number there." };
    });
  };
}

const FILL_WORDS = { 0: "empty", 1: "quarter full", 2: "half full", 4: "full" };

/** Slot 2: describe one jug four times (each fill once) and once find the jug that matches a word. */
function capacityWords(rng) {
  const fills = shuffle(rng, [0, 1, 2, 4]), findAt = int(rng, 0, 4);
  const options = Object.values(FILL_WORDS);
  return Array.from({ length: 5 }, (_, i) => {
    if (i === findAt) {
      const jugs = take(rng, [0, 1, 2, 4], 3).map((fill, j) => ({ label: "ABC"[j], fill }));
      const target = jugs[int(rng, 0, 2)];
      return letterChoice(`Which jug is ${FILL_WORDS[target.fill]}?`, target.label, 3, {
        visual: { type: "capacity", jugs }, hint: "Look how high the water is in each jug." });
    }
    const fill = fills[i < findAt ? i : i - 1];
    return wordy(rng, "How full is the jug?", FILL_WORDS[fill], options, {
      visual: { type: "capacity", fill }, hint: "Look how high the water is. Half full is up to the middle." });
  });
}

/* ---------- time ---------- */

const DURATIONS = {
  seconds: ["A sneeze", "A clap", "Blowing out a candle", "One big jump"],
  minutes: ["Brushing your teeth", "Having a bath", "Reading a short book", "Eating a snack"],
  hours: ["A night's sleep", "A school day", "A long car trip", "A day at the beach"],
};
const PEOPLE = ["Bix", "Maya", "Leo"];

function timeBuilder(level, rng) {
  if (level === 1) {
    const units = Object.keys(DURATIONS);
    const picks = units.map(unit => [unit, take(rng, DURATIONS[unit], 1)[0]]);
    const rest = take(rng, units.flatMap(unit => DURATIONS[unit].map(thing => [unit, thing])).filter(([, t]) => !picks.some(([, p]) => p === t)), 2);
    return shuffle(rng, [...picks, ...rest]).map(([unit, thing]) => wordy(rng, `${thing} takes a few…`, unit, units,
      { hint: "Quick things take seconds. Long things take hours." }));
  }
  if (level === 2) {
    const quicker = mixed(rng);
    return unique(rng, (r, i) => {
      const [a, b] = take(r, PEOPLE, 2), [ta, tb] = take(r, range(2, 12), 2), unit = r() < 0.5 ? "minutes" : "seconds";
      const answer = (quicker[i] ? ta < tb : ta > tb) ? a : b;
      return wordy(r, `${a} takes ${ta} ${unit}. ${b} takes ${tb} ${unit}. Who is ${quicker[i] ? "quicker" : "slower"}?`, answer, [a, b],
        { hint: "Quicker means less time. Slower means more time." });
    }, q => q.prompt);
  }
  if (level === 3) {
    const quickest = mixed(rng);
    return unique(rng, (r, i) => {
      const unit = r() < 0.5 ? "minutes" : "seconds", values = take(r, range(2, 15), 3).sort((x, y) => x - y);
      if (!quickest[i]) values.reverse();
      return { ...order(r, `Put the times in order. ${quickest[i] ? "Quickest" : "Slowest"} first.`, values.map(v => `${v} ${unit}`), values),
        hint: quickest[i] ? "The quickest takes the least time." : "The slowest takes the most time." };
    }, q => q.prompt + q.items.map(item => item.label).sort().join());
  }
  // Applied: work out and record how long something took.
  return unique(rng, (r, i) => {
    const form = (i + int(r, 0, 2)) % 3;
    if (form === 0) {
      const start = int(r, 1, 8), hours = int(r, 1, 4);
      return { kind: "number", prompt: `Bix plays from ${start} o'clock to ${start + hours} o'clock. How many hours is that?`, answer: hours,
        maxDigits: 2, label: "Hours", hint: "Count on from the start, one hour at a time." };
    }
    const [a, b] = take(r, PEOPLE, 2), [fast, slow] = take(r, range(3, 12), 2).sort((x, y) => x - y);
    if (form === 1) return { kind: "number", prompt: `${a} runs in ${fast} seconds. ${b} runs in ${slow} seconds. How many seconds quicker is ${a}?`,
      answer: slow - fast, maxDigits: 2, label: "Seconds", hint: "Count on from the smaller number to the bigger one." };
    const first = int(r, 2, 10), more = int(r, 2, 10);
    return { kind: "number", prompt: `${a} reads for ${first} minutes, then ${more} more minutes. How many minutes in all?`,
      answer: first + more, maxDigits: 2, label: "Minutes", hint: "Add the two times together." };
  }, q => q.prompt);
}

/* ---------- money ---------- */

/** Coins children mix up: the same digits in pence and pounds, or a 0 more or less. */
const COIN_MIXUPS = { 1: [10, 100, 2], 2: [20, 200, 1], 5: [50, 2, 10], 10: [1, 100, 20], 20: [2, 200, 50], 50: [5, 20, 100], 100: [1, 10, 200], 200: [2, 20, 100] };
const MONEY_ITEMS = [...COINS.slice(4).map(value => ({ value, note: false })), ...NOTES.map(value => ({ value: value * 100, note: true }))];
const itemName = item => `${moneyName(item.value)} ${item.note ? "note" : "coin"}`;

function coinsBuilder(level, rng) {
  if (level === 1) {
    const targets = take(rng, COINS.slice(0, 6), 5);
    return targets.map(coin => {
      const values = shuffle(rng, [coin, ...take(rng, COIN_MIXUPS[coin].filter(n => n < 100), 2)]);
      while (values.length < 3) values.push(...take(rng, COINS.slice(0, 6).filter(n => !values.includes(n)), 1));
      return letterChoice(`Which coin is ${moneyName(coin)}?`, "ABC"[values.indexOf(coin)], 3, {
        visual: { type: "moneySet", values, notes: false, labels: ["A", "B", "C"] }, hint: "Look at the number and the p on each coin." });
    });
  }
  if (level === 2) {
    const pounds = shuffle(rng, [100, 200]), pence = take(rng, COINS.slice(0, 6), 3);
    const coins = shuffle(rng, [...pounds, ...pence]);
    return coins.map(coin => wordy(rng, "What is this coin worth?", moneyName(coin), [coin, ...COIN_MIXUPS[coin]].map(moneyName), {
      visual: { type: "money", value: coin, note: false }, hint: "Look for p or £. p means pence. £ means pounds." }));
  }
  if (level === 3) return unique(rng, r => {
    const values = shuffle(r, [...take(r, [100, 200], int(r, 1, 2)), ...take(r, COINS.slice(0, 6), 3)]);
    return { kind: "sort", prompt: "Sort the coins. Pence or pounds?",
      bins: [{ id: "p", label: "Pence (p)" }, { id: "pound", label: "Pounds (£)" }],
      cards: values.map(n => ({ id: `c-${n}`, label: moneyName(n), bin: n < 100 ? "p" : "pound" })),
      visual: { type: "moneySet", values, notes: false }, hint: "A p means pence. A £ means pounds." };
  }, q => [...q.visual.values].sort((a, b) => a - b).join());
  // Applied: which coin is worth the most or least? Sets hold the coins children mix up.
  const most = mixed(rng);
  return unique(rng, (r, i) => {
    const coin = take(r, COINS, 1)[0];
    const values = shuffle(r, [coin, ...take(r, COIN_MIXUPS[coin], 2)]);
    const answer = moneyName(most[i] ? Math.max(...values) : Math.min(...values));
    return wordy(r, `Bix can keep one coin. Which coin is worth the ${most[i] ? "most" : "least"}?`, answer, values.map(moneyName), {
      visual: { type: "moneySet", values, notes: false }, hint: "£1 is 100p. A pound coin is worth more than any pence coin." });
  }, q => q.prompt + q.options.slice().sort().join());
}

function notesBuilder(level, rng) {
  if (level === 1) {
    // Four "read this note" and four "find this note" questions; five of them each run.
    const kinds = take(rng, NOTES.flatMap(value => [["find", value], ["read", value]]), 5);
    return kinds.map(([kind, value]) => {
      if (kind === "read") return wordy(rng, "What is this note worth?", `£${value}`, NOTES.map(n => `£${n}`), {
        visual: { type: "money", value, note: true }, hint: "Find the £ sign and the number." });
      const values = shuffle(rng, [value, ...take(rng, NOTES.filter(n => n !== value), 2)]);
      return letterChoice(`Which note is £${value}?`, "ABC"[values.indexOf(value)], 3, {
        visual: { type: "moneySet", values, notes: true, labels: ["A", "B", "C"] }, hint: "Read the number on each note." });
    });
  }
  if (level === 2) {
    // Any two or three of the four notes, so the answer is not always £5 or £50.
    const subsets = range(1, 15).map(mask => NOTES.filter((_, k) => mask & (1 << k))).filter(set => set.length === 2 || set.length === 3);
    const sets = take(rng, subsets.flatMap(set => [[set, true], [set, false]]), 5);
    return sets.map(([values, most]) => {
      const shown = shuffle(rng, values);
      return wordy(rng, `Which note is worth the ${most ? "most" : "least"}?`, `£${most ? Math.max(...values) : Math.min(...values)}`, shown.map(n => `£${n}`), {
        visual: { type: "moneySet", values: shown, notes: true }, hint: "Bigger number, bigger value." });
    });
  }
  if (level === 3) return unique(rng, r => {
    const coins = take(r, MONEY_ITEMS.filter(item => !item.note), int(r, 1, 2));
    const items = [...coins, ...take(r, MONEY_ITEMS.filter(item => item.note), 4 - coins.length)].sort((a, b) => a.value - b.value);
    const q = order(r, "Put the money in order. Smallest value first.", items.map(itemName), items.map(item => item.value));
    return { ...q, visual: { type: "moneySet", items: q.items.map(shown => items[Number(shown.id.slice(5))]).map(item => ({ value: item.note ? item.value / 100 : item.value, note: item.note })) },
      hint: "Notes are worth more than coins. £1 is more than 50p." };
  }, q => q.items.map(item => item.label).sort().join());
  // Applied: several notes of one kind; count in fives or tens.
  return unique(rng, r => {
    const value = r() < 0.5 ? 5 : 10, count = int(r, 2, 5);
    return { kind: "number", prompt: "Bix has these notes. How many pounds is that?", answer: value * count, maxDigits: 2, label: "Pounds",
      visual: { type: "moneySet", values: Array(count).fill(value), notes: true }, hint: `Count in ${value === 5 ? "fives" : "tens"}: ${value}, ${value * 2}…` };
  }, q => q.answer + "/" + q.visual.values.length);
}

/* ---------- events, dates and clocks ---------- */

const PARTS = ["morning", "afternoon", "evening"];
const WHEN = ["yesterday", "today", "tomorrow"];
const FIRST_NEXT = [
  ["What comes after morning?", "afternoon", PARTS], ["What comes before evening?", "afternoon", PARTS],
  ["What comes before afternoon?", "morning", PARTS], ["What comes after afternoon?", "evening", PARTS],
  ["You put on socks. Next you put on…", "shoes", ["shoes", "socks", "pyjamas"]],
  ["What do you do first in the day?", "wake up", ["wake up", "eat lunch", "go to bed"]],
  ["What do you do last in the day?", "go to bed", ["wake up", "eat lunch", "go to bed"]],
  ["You dig a hole. Next you…", "plant the seed", ["plant the seed", "pick the flower", "dig a hole"]],
];
const DAY_WORDS = [
  ["The day before today is…", "yesterday", WHEN], ["The day after today is…", "tomorrow", WHEN],
  ["Bix's party is the day after today. It is…", "tomorrow", WHEN], ["Maya swam the day before today. She swam…", "yesterday", WHEN],
  ["Today is Monday. Tuesday is…", "tomorrow", WHEN], ["Today is Monday. Sunday was…", "yesterday", WHEN],
  ["Bix eats breakfast in the…", "morning", PARTS], ["Bix goes to bed in the…", "evening", PARTS],
  ["Bix plays after lunch. That is in the…", "afternoon", PARTS],
];
const EVENTS = [
  ["Wake up", "Eat breakfast", "Go to school", "Go to bed"], ["Pick up a cup", "Pour in water", "Drink the water"],
  ["Put on socks", "Put on shoes", "Walk outside"], ["Plant a seed", "Water it", "See a shoot grow"],
  ["Wash your hands", "Eat your sandwich", "Wash your plate"], ["Get in the bath", "Wash", "Dry with a towel"],
  ["Crack the egg", "Cook the egg", "Eat the egg"], ["Open the book", "Read the story", "Close the book"],
  ["Blow up a balloon", "Tie a knot", "Play with it"],
];
/** Two times for one activity, in order: [words, hour on a 24-hour day]. */
const TIMES = [
  ["wakes up", [["7 in the morning", 7], ["8 in the morning", 8]]], ["has lunch", [["12 noon", 12], ["1 in the afternoon", 13]]],
  ["goes swimming", [["2 in the afternoon", 14], ["4 in the afternoon", 16]]], ["goes to bed", [["7 in the evening", 19], ["8 in the evening", 20]]],
  ["goes to the park", [["10 in the morning", 10], ["3 in the afternoon", 15]]], ["eats dinner", [["5 in the evening", 17], ["6 in the evening", 18]]],
];

function sequencingBuilder(level, rng) {
  if (level === 1 || level === 2) return take(rng, level === 1 ? FIRST_NEXT : DAY_WORDS, 5).map(([prompt, answer, options]) =>
    wordy(rng, prompt, answer, options, { hint: level === 1 ? "Think what happens before and after." : "Yesterday is before today. Tomorrow is after today." }));
  if (level === 3) return take(rng, EVENTS, 5).map(events => ({ ...order(rng, "Put the events in order. First to last.", events), direction: "vertical",
    hint: "What must happen first?" }));
  const earlier = mixed(rng);
  return take(rng, TIMES, 5).map(([verb, times], i) => {
    const [a, b] = take(rng, PEOPLE, 2), [ta, tb] = shuffle(rng, times);
    const answer = (earlier[i] ? ta[1] < tb[1] : ta[1] > tb[1]) ? a : b;
    return wordy(rng, `${a} ${verb} at ${ta[0]}. ${b} ${verb} at ${tb[0]}. Who is ${earlier[i] ? "earlier" : "later"}?`, answer, [a, b],
      { hint: "Morning comes first, then afternoon, then evening." });
  });
}

function datesBuilder(level, rng) {
  if (level === 1) return take(rng, range(0, 6), 5).map(d => {
    const day = k => DAYS[(d + k + 7) % 7];
    return wordy(rng, `Which day comes after ${day(0)}?`, day(1), [day(1), day(0), day(-1), day(2)], { hint: "Say the days of the week in order." });
  });
  if (level === 2) {
    const after = mixed(rng);
    return take(rng, range(0, 11), 5).map((m, i) => {
      const month = k => MONTHS[(m + k + 12) % 12], step = after[i] ? 1 : -1;
      return wordy(rng, `Which month comes ${after[i] ? "after" : "before"} ${month(0)}?`, month(step), [month(step), month(0), month(-step), month(2 * step)],
        { hint: "Say the months in order. After December a new year starts." });
    });
  }
  if (level === 3) {
    const lists = take(rng, [...range(0, 3).map(s => DAYS.slice(s, s + 4)), ...range(0, 8).map(s => MONTHS.slice(s, s + 4))], 5);
    return lists.map(list => ({ ...order(rng, `Put the ${DAYS.includes(list[0]) ? "days" : "months"} in order.`, list), hint: "Say them in order from the start." }));
  }
  const templates = [
    r => { const m = int(r, 1, 6); return [`January is month 1. What number month is ${MONTHS[m]}?`, m + 1]; },
    r => { const d = int(r, 2, 6); return [`Monday is day 1. What number day is ${DAYS[d]}?`, d + 1]; },
    r => { const w = int(r, 1, 2); return [`How many days are in ${w === 1 ? "1 week" : "2 weeks"}?`, 7 * w]; },
    () => ["How many months are in 1 year?", 12],
    r => { const d = int(r, 2, 5); return [`Today is Monday. How many days until ${DAYS[d]}?`, d]; },
    r => { const m = int(r, 2, 6); return [`It is January. How many months until ${MONTHS[m]}?`, m]; },
  ];
  return take(rng, templates, 5).map(make => {
    const [prompt, answer] = make(rng);
    return { kind: "number", prompt, answer, maxDigits: 2, hint: "Say the days or months in order and count." };
  });
}

const hourAfter = (h, k = 1) => (h - 1 + k + 12) % 12 + 1;
const timeName = (hour, minute) => minute ? `half past ${hour}` : `${hour} o'clock`;

function clockBuilder(level, rng) {
  const hours = take(rng, range(1, 12), 5), half = mixed(rng);
  return hours.map((hour, i) => {
    if (level === 1) return { kind: "clock", mode: "read", time: { hour, minute: 0 }, answer: timeName(hour, 0),
      // 12 o'clock is the long-hand mix-up: reading the long hand as the hour.
      options: shuffle(rng, [...new Set([hour, 12, hourAfter(hour), hourAfter(hour, -1), hourAfter(hour, 2)])].slice(0, 4).map(h => timeName(h, 0))),
      prompt: "What time is shown?", hint: "The long hand is on 12. Read the short hand." };
    const minute = half[i] ? 30 : 0;
    if (level === 2) return { kind: "clock", mode: "read", time: { hour, minute }, answer: timeName(hour, minute),
      options: shuffle(rng, minute
        ? [timeName(hour, 30), timeName(hourAfter(hour), 30), timeName(hour, 0), timeName(hourAfter(hour), 0)]
        : [timeName(hour, 0), timeName(hour, 30), timeName(hourAfter(hour, -1), 30), timeName(hourAfter(hour), 0)]),
      prompt: "O'clock or half past? What time is it?", hint: "Long hand on 12: o'clock. Long hand on 6: half past." };
    if (level === 3) return { kind: "clock", mode: "set", time: { hour, minute }, start: { hour: hourAfter(hour, int(rng, 2, 10)), minute: rng() < 0.5 ? 0 : 30 },
      minuteStep: 30, prompt: `Show ${timeName(hour, minute)}.`, hint: "For o'clock the long hand points to 12. For half past it points to 6." };
    // Applied: the clock shows the start; move the hands on by an hour or half an hour.
    const long = rng() < 0.6, endHour = long || minute ? hourAfter(hour) : hour, endMinute = long ? minute : 30 - minute;
    return { kind: "clock", mode: "set", time: { hour: endHour, minute: endMinute }, start: { hour, minute }, minuteStep: 30,
      prompt: `Bix starts at ${timeName(hour, minute)}. He plays for ${long ? "1 hour" : "half an hour"}. Show when he stops.`,
      hint: long ? "1 hour later: the short hand moves on one number." : "Half an hour: the long hand goes half way round." };
  });
}

export const measurementBuilders = {
  "comparing-and-measuring-lengths-and-heights": measureBuilder("length"),
  "comparing-and-measuring-mass": measureBuilder("mass"),
  "comparing-and-measuring-capacity": (level, rng) => level === 2 ? capacityWords(rng) : measureBuilder("capacity")(level, rng),
  "measuring-and-comparing-time": timeBuilder,
  "recognising-coins": coinsBuilder,
  "recognising-notes": notesBuilder,
  "sequencing-events": sequencingBuilder,
  "days-months-and-years": datesBuilder,
  "oclock-and-half-past": clockBuilder,
};
