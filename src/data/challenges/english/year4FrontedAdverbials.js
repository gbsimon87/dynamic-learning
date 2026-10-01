import { sample, shuffle } from "./shared.js";
/** Fronted Adverbials: docs/curriculum/year-3-and-4-english.md, Year 4 mapping. */
export const RULE = "A fronted adverbial (phrase at the start) tells us when, where or how. Put a comma after it.";
export const BANK = [
  {
    "sentence": "___ Leo finished the model.",
    "answer": "Later that day,",
    "wrong": [
      "Later that day",
      "Later , that day"
    ],
    "prompt": "Put the complete adverbial at the front, with its comma.",
    "hint": "Read the whole opening phrase before placing the comma."
  },
  {
    "sentence": "___ Priya fed the cat.",
    "answer": "Before breakfast,",
    "wrong": [
      "Before breakfast",
      "Before , breakfast"
    ],
    "prompt": "Put the complete adverbial at the front, with its comma.",
    "hint": "Read the whole opening phrase before placing the comma."
  },
  {
    "sentence": "___ Zayn checked the garden.",
    "answer": "After the storm,",
    "wrong": [
      "After the storm",
      "After , the storm"
    ],
    "prompt": "Put the complete adverbial at the front, with its comma.",
    "hint": "Read the whole opening phrase before placing the comma."
  },
  {
    "sentence": "___ Amara opened the curtains.",
    "answer": "Early in the morning,",
    "wrong": [
      "Early in the morning",
      "Early , in the morning"
    ],
    "prompt": "Put the complete adverbial at the front, with its comma.",
    "hint": "Read the whole opening phrase before placing the comma."
  },
  {
    "sentence": "___ Ellie walked home.",
    "answer": "At sunset,",
    "wrong": [
      "At sunset",
      "At , sunset"
    ],
    "prompt": "Put the complete adverbial at the front, with its comma.",
    "hint": "Read the whole opening phrase before placing the comma."
  },
  {
    "sentence": "___ Biscuit waited patiently.",
    "answer": "Near the gate,",
    "wrong": [
      "Near the gate",
      "Near , the gate"
    ],
    "prompt": "Put the complete adverbial at the front, with its comma.",
    "hint": "Read the whole opening phrase before placing the comma."
  },
  {
    "sentence": "___ the river flowed quietly.",
    "answer": "Under the bridge,",
    "wrong": [
      "Under the bridge",
      "Under , the bridge"
    ],
    "prompt": "Put the complete adverbial at the front, with its comma.",
    "hint": "Read the whole opening phrase before placing the comma."
  },
  {
    "sentence": "___ Priya found a feather.",
    "answer": "Beside the pond,",
    "wrong": [
      "Beside the pond",
      "Beside , the pond"
    ],
    "prompt": "Put the complete adverbial at the front, with its comma.",
    "hint": "Read the whole opening phrase before placing the comma."
  },
  {
    "sentence": "___ Leo spotted the kite.",
    "answer": "Across the field,",
    "wrong": [
      "Across the field",
      "Across , the field"
    ],
    "prompt": "Put the complete adverbial at the front, with its comma.",
    "hint": "Read the whole opening phrase before placing the comma."
  },
  {
    "sentence": "___ Zayn heard an echo.",
    "answer": "Inside the cave,",
    "wrong": [
      "Inside the cave",
      "Inside , the cave"
    ],
    "prompt": "Put the complete adverbial at the front, with its comma.",
    "hint": "Read the whole opening phrase before placing the comma."
  },
  {
    "sentence": "___ Amara carried the vase.",
    "answer": "With great care,",
    "wrong": [
      "With great care",
      "With , great care"
    ],
    "prompt": "Put the complete adverbial at the front, with its comma.",
    "hint": "Read the whole opening phrase before placing the comma."
  },
  {
    "sentence": "___ Ellie opened the door.",
    "answer": "Without a sound,",
    "wrong": [
      "Without a sound",
      "Without , a sound"
    ],
    "prompt": "Put the complete adverbial at the front, with its comma.",
    "hint": "Read the whole opening phrase before placing the comma."
  },
  {
    "sentence": "___ Leo ran to the station.",
    "answer": "As fast as he could,",
    "wrong": [
      "As fast as he could",
      "As , fast as he could"
    ],
    "prompt": "Put the complete adverbial at the front, with its comma.",
    "hint": "Read the whole opening phrase before placing the comma."
  },
  {
    "sentence": "___ Priya welcomed everyone.",
    "answer": "With a cheerful smile,",
    "wrong": [
      "With a cheerful smile",
      "With , a cheerful smile"
    ],
    "prompt": "Put the complete adverbial at the front, with its comma.",
    "hint": "Read the whole opening phrase before placing the comma."
  },
  {
    "sentence": "___ Zayn answered the question.",
    "answer": "After a short pause,",
    "wrong": [
      "After a short pause",
      "After , a short pause"
    ],
    "prompt": "Put the complete adverbial at the front, with its comma.",
    "hint": "Read the whole opening phrase before placing the comma."
  }
];
const GROUPS = [
  { id: "time", label: "When" }, { id: "place", label: "Where" }, { id: "manner", label: "How" }
];
const entries = BANK.map((row, index) => ({ ...row, group: index < 5 ? "time" : index < 10 ? "place" : "manner" }));
export function buildFrontedAdverbialsQuestions(level, rng) {
  if (![1, 2, 3, 4].includes(level)) throw new Error(`no fronted adverbials level ${level}`);
  if (level === 2) return Array.from({ length: 5 }, () => ({ kind: "sort",
    prompt: "Does each opening tell when, where or how?", bins: GROUPS,
    cards: shuffle(GROUPS.flatMap((group) => sample(entries.filter((row) => row.group === group.id), 2, rng)
      .map((row) => ({ id: row.answer, label: row.answer, bin: group.id }))), rng),
    hint: "Time openings answer when; place openings answer where; manner openings answer how." }));
  return sample(entries, 5, rng).map((row) => {
    const group = GROUPS.find((g) => g.id === row.group);
    const wrong = GROUPS.filter((g) => g.id !== row.group).map((g) => sample(entries.filter((e) => e.group === g.id), 1, rng)[0].answer);
    const base = { sentence: row.sentence, answer: row.answer,
      prompt: `Choose a fronted adverbial${level < 4 ? " (opening phrase)" : ""} telling ${group.label.toLowerCase()}.`,
      hint: "Think about the question asked: when, where or how? Read the whole opening." };
    if (level === 3) return { ...base, kind: "build", letters: false,
      tiles: shuffle([...row.answer.split(" "), ...wrong].map((label, i) => ({ id: String(i), label })), rng) };
    return { ...base, kind: "choice", rule: level === 1 ? RULE : undefined,
      options: shuffle([row.answer, ...wrong], rng) };
  });
}
