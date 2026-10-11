import { choice, DAYS, int, MONTHS, numberQuestion, order, run, shuffle } from "./shared.js";

const COINS = [1, 2, 5, 10, 20, 50, 100, 200];
const NOTES = [5, 10, 20, 50];
const moneyName = n => n < 100 ? `${n}p` : `£${n / 100}`;

function measureBuilder(type) {
  const names = type === "length" ? ["Red ribbon", "Blue ribbon", "Green ribbon"] : type === "mass" ? ["Red bag", "Blue bag", "Green bag"] : ["Red jug", "Blue jug", "Green jug"];
  const unit = type === "length" ? "blocks" : type === "mass" ? "cubes" : "cups";
  return (level, rng) => run((l, r, i) => {
    const a = int(r, 2, 5), b = a + int(r, 1, 3);
    if (l === 1) {
      const larger = i % 2 === 0;
      const rows = shuffle(r, [{ label: names[0], value: a }, { label: names[1], value: b }]);
      const word = type === "length" ? (larger ? "longer" : "shorter") : type === "mass" ? (larger ? "heavier" : "lighter") : (larger ? "more" : "less");
      return choice(r, type === "capacity" ? `Which jug holds ${word}?` : `Which is ${word}?`, names[larger ? 1 : 0], names.slice(0, 2), {
        visual: { type: "measure", measure: type, unit, rows }, hint: `Compare how many equal ${unit} each needs.` });
    }
    if (l === 3) {
      const values = [a, a + 1, a + 3];
      return { ...order(r, type === "length" ? "Order the ribbons: shortest first." : type === "mass" ? "Order the bags: lightest first." : "Order the jugs: least water first.", names, values),
        visual: { type: "measure", measure: type, unit, rows: names.map((label, j) => ({ label, value: values[j] })) } };
    }
    if (type === "length" && l === 4) {
      const height = i % 2 === 1;
      return { kind: "number", prompt: height ? "How tall is the tower? Read the ruler in cm." : "How long is the ribbon? Read the ruler in cm.", answer: b,
        visual: { type: "ruler", value: b, vertical: height }, label: "Centimetres", hint: "Start at zero. Read the mark at the end." };
    }
    if (l === 4 && i % 2 === 0) return { kind: "number", prompt: type === "mass" ? "Read the kitchen scale. Record the mass in grams." : "Read the jug. Record the water in litres.", answer: b,
      visual: { type: "instrument", value: b, unit: type === "mass" ? "g" : "litres", vertical: type === "capacity" },
      label: type === "mass" ? "Grams" : "Litres", hint: "Find the mark reached by the pointer." };
    return numberQuestion(r, l, l === 4 ? `Bix measures the ${type === "mass" ? "bag" : "water"}. Record how many ${unit} it measures.` : `How many ${unit} measure the ${names[0].toLowerCase()}?`, b, {
      visual: { type: "measure", measure: type, unit, rows: [{ label: names[0], value: b }] }, label: unit,
      hint: `Count each equal ${unit === "cubes" ? "cube" : unit === "cups" ? "cup" : "block"} once.` }, 10);
  }, level, rng);
}

export const measurementBuilders = {
  "comparing-and-measuring-lengths-and-heights": measureBuilder("length"),
  "comparing-and-measuring-mass": measureBuilder("mass"),
  "comparing-and-measuring-capacity": (level, rng) => {
    if (level !== 2) return measureBuilder("capacity")(level, rng);
    return run((l, r, i) => {
      const fill = [0, 1, 2, 4, 2][i], labels = { 0: "empty", 1: "quarter full", 2: "half full", 4: "full" };
      return choice(r, "Describe the water in the jug.", labels[fill], Object.values(labels), {
        visual: { type: "capacity", fill }, hint: "Compare the water with the whole jug." });
    }, level, rng);
  },

  "measuring-and-comparing-time": (level, rng) => run((l, r, i) => {
    const duration = int(r, 2, 8), other = duration + int(r, 1, 3);
    if (l === 1) {
      const bank = [
        ["A blink takes about one…", "second"], ["A school lesson takes many…", "minutes"],
        ["A night's sleep takes several…", "hours"], ["A short race is timed in…", "seconds"], ["Eating lunch takes several…", "minutes"],
      ];
      const [prompt, answer] = bank[i];
      return choice(r, prompt, answer, answer === "second" ? ["second", "minute", "hour"] : ["seconds", "minutes", "hours"]);
    }
    if (l === 3) return order(r, "Put these times in order: quickest first.", [`${duration} seconds`, `${duration + 1} seconds`, `${duration + 3} seconds`], [duration, duration + 1, duration + 3]);
    if (l === 4) return { kind: "number", prompt: "Bix times a race. Record the seconds on the timer.", answer: duration,
      visual: { type: "timer", seconds: duration }, label: "Seconds" };
    const quicker = i % 2 === 0;
    return choice(r, `Leo takes ${duration} minutes. Maya takes ${other} minutes. Who is ${quicker ? "quicker" : "slower"}?`, quicker ? "Leo" : "Maya", ["Leo", "Maya"], {
      hint: "A quicker activity takes less time." });
  }, level, rng),

  "recognising-coins": (level, rng) => run((l, r, i) => {
    const pool = l === 1 ? COINS.slice(0, 4) : COINS;
    const coin = pool[(i + int(r, 0, pool.length - 1)) % pool.length];
    if (l === 3) return { kind: "sort", prompt: "Sort the coins by the unit written on them.",
      bins: [{ id: "p", label: "Pence (p)" }, { id: "pound", label: "Pounds (£)" }],
      cards: shuffle(r, [2, 20, 50, 100, 200].map(n => ({ id: `c-${n}`, label: moneyName(n), bin: n < 100 ? "p" : "pound" }))),
      visual: { type: "moneySet", values: [2, 20, 50, 100, 200], notes: false } };
    const options = [...new Set([coin, ...shuffle(r, COINS).filter(n => n !== coin).slice(0, 3)])].map(moneyName);
    return choice(r, l === 4 ? "Bix finds this coin in his pocket. What is its value?" : "What is the value of this coin?", moneyName(coin), options, {
      visual: { type: "money", value: coin, note: false }, hint: "Look at the number and its unit on the coin." });
  }, level, rng),

  "recognising-notes": (level, rng) => run((l, r, i) => {
    const value = NOTES[(i + int(r, 0, 3)) % 4];
    if (l === 3) return { kind: "sort", prompt: "Sort the notes by their value.", bins: [{ id: "small", label: "Less than £20" }, { id: "large", label: "£20 or more" }],
      cards: shuffle(r, NOTES.map(n => ({ id: `n-${n}`, label: `£${n}`, bin: n < 20 ? "small" : "large" }))), visual: { type: "moneySet", values: NOTES, notes: true } };
    return choice(r, l === 4 ? `Maya needs a £${value} note. Does this note have that value?` : "What is the value of this note?", l === 4 ? "Yes" : `£${value}`, l === 4 ? ["Yes", "No"] : NOTES.map(n => `£${n}`),
      { visual: { type: "money", value: l === 4 && i % 2 ? NOTES[(NOTES.indexOf(value) + 1) % 4] : value, note: true },
        ...(l === 4 && i % 2 ? { answer: "No" } : {}), hint: "Look for the £ sign and the number." });
  }, level, rng),

  "sequencing-events": (level, rng) => run((l, r, i) => {
    if (l === 3) {
      const events = [
        ["Wake up", "Eat breakfast", "Go to school", "Go to bed"],
        ["Pick up a cup", "Pour water into it", "Drink the water"],
        ["Put on socks", "Put on shoes", "Walk outside"],
        ["Plant a seed", "Water it", "See a shoot grow"],
        ["Wash your hands", "Eat your sandwich", "Wash your plate"],
      ];
      return { ...order(r, "Put the events in order: first to last.", events[i]), direction: "vertical" };
    }
    const bank = l === 1 ? [
      ["What comes before afternoon?", "morning", ["morning", "evening"]],
      ["What comes after afternoon?", "evening", ["morning", "evening"]],
      ["You put on socks. Next you put on…", "shoes", ["shoes", "socks"]],
      ["Before drinking, you…", "fill the cup", ["fill the cup", "empty the cup"]],
      ["Which comes first?", "wake up", ["go to school", "wake up"]],
    ] : [
      ["Today is Tuesday. What day was yesterday?", "Monday", DAYS],
      ["Today is Thursday. What day is tomorrow?", "Friday", DAYS],
      ["Yesterday was Sunday. What day is today?", "Monday", DAYS],
      ["Tomorrow is Wednesday. What day is today?", "Tuesday", DAYS],
      ["Bix starts lunch at 12 noon. Maya starts at 1 in the afternoon. Who starts earlier?", "Bix", ["Bix", "Maya"]],
    ];
    const [prompt, answer, options] = bank[(i + int(r, 0, 4)) % 5];
    return choice(r, prompt, answer, options, { hint: "Think about what happens before and after." });
  }, level, rng),

  "days-months-and-years": (level, rng) => run((l, r, i) => {
    if (l === 1) {
      const index = int(r, 0, 6), next = (index + 1) % 7;
      return choice(r, `Which day comes after ${DAYS[index]}?`, DAYS[next], DAYS, { hint: "Say the days of the week in order." });
    }
    if (l === 2) {
      const index = int(r, 0, 11);
      return choice(r, `Which month comes after ${MONTHS[index]}?`, MONTHS[(index + 1) % 12], [MONTHS[(index + 1) % 12], MONTHS[index], MONTHS[(index + 2) % 12]], { hint: "Say the months in order. After December a new year starts." });
    }
    if (l === 3) {
      const start = int(r, 0, 8);
      return order(r, "Put these months in order within one year.", MONTHS.slice(start, start + 4));
    }
    const bank = [
      ["How many days are in one week?", 7], ["How many months are in one year?", 12],
      ["How many days are in two weeks?", 14], ["January is the first month. What number month is March?", 3],
      ["Friday is the fifth day when we start at Monday. What number day is Sunday?", 7],
    ];
    const [prompt, answer] = bank[i];
    return { kind: "number", prompt, answer, hint: "Use the order of the days or months." };
  }, level, rng),

  "oclock-and-half-past": (level, rng) => run((l, r, i) => {
    const hour = int(r, 1, 12), minute = l === 1 ? 0 : i % 2 ? 30 : 0;
    const name = minute ? `half past ${hour}` : `${hour} o'clock`;
    if (l === 3) return { kind: "clock", mode: "set", time: { hour, minute }, start: { hour: hour % 12 + 1, minute: minute ? 0 : 30 }, minuteStep: 30,
      prompt: `Set the hands to ${name}.`, hint: "For o'clock the long hand points to 12. For half past it points to 6." };
    return { kind: "clock", mode: "read", time: { hour, minute }, answer: name,
      options: shuffle(r, [`${hour} o'clock`, `half past ${hour}`, `${hour % 12 + 1} o'clock`, `half past ${hour % 12 + 1}`]),
      prompt: l === 4 ? "Bix starts a game at this time. What time does Bix start?" : "What time is shown?", hint: "Read the short hand first. Then look at the long hand." };
  }, level, rng),
};
