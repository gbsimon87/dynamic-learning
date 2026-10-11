import { bareWord, sample, shuffle, tokenise } from "./shared.js";

export const BANK = [
  {
    "text": "Leo caught a ball.",
    "key": "ball",
    "swap": [
      "ball",
      "bal"
    ]
  },
  {
    "text": "Amara has a blue coat.",
    "key": "blue",
    "swap": [
      "blue",
      "blew"
    ]
  },
  {
    "text": "Can you hear the bell?",
    "key": "hear",
    "swap": [
      "hear",
      "here"
    ]
  },
  {
    "text": "The children are playing.",
    "key": "children",
    "swap": [
      "children",
      "childrin"
    ]
  },
  {
    "text": "We walked to the park.",
    "key": "walked",
    "swap": [
      "walked",
      "walkt"
    ]
  },
  {
    "text": "Ellie has a little dog.",
    "key": "little",
    "swap": [
      "little",
      "littel"
    ]
  },
  {
    "text": "The monkey is in the tree.",
    "key": "monkey",
    "swap": [
      "monkey",
      "monky"
    ]
  },
  {
    "text": "We bought bread, milk and eggs.",
    "key": "bread",
    "swap": [
      "bread",
      "bred"
    ]
  },
  {
    "text": "What a beautiful day it is!",
    "key": "beautiful",
    "swap": [
      "beautiful",
      "beautifull"
    ]
  },
  {
    "text": "I can't find my hat.",
    "key": "can't",
    "swap": [
      "can't",
      "cant"
    ]
  },
  {
    "text": "Priya's bag is red.",
    "key": "Priya's",
    "swap": [
      "Priya's",
      "Priyas"
    ]
  },
  {
    "text": "The baby cried.",
    "key": "cried",
    "swap": [
      "cried",
      "cryed"
    ]
  },
  {
    "text": "Zayn is running.",
    "key": "running",
    "swap": [
      "running",
      "runing"
    ]
  },
  {
    "text": "Please close the door.",
    "key": "door",
    "swap": [
      "door",
      "dor"
    ]
  },
  {
    "text": "There are two apples.",
    "key": "two",
    "swap": [
      "two",
      "too"
    ]
  },
  {
    "text": "My mother is at home.",
    "key": "mother",
    "swap": [
      "mother",
      "muther"
    ]
  },
  {
    "text": "The keys are on the table.",
    "key": "keys",
    "swap": [
      "keys",
      "keyes"
    ]
  },
  {
    "text": "We saw a rabbit.",
    "key": "rabbit",
    "swap": [
      "rabbit",
      "rabit"
    ]
  },
  {
    "text": "We have warm clothes.",
    "key": "clothes",
    "swap": [
      "clothes",
      "cloths"
    ]
  },
  {
    "text": "Biscuit sleeps on the floor.",
    "key": "floor",
    "swap": [
      "floor",
      "flor"
    ]
  }
];

// Punctuation is a tile, preserving commas and singular possessive apostrophes.
const parts = (text) => text.match(/[A-Za-z]+(?:[’'][A-Za-z]+|[’'])?|[,.!?]/g);
export function buildQuestions(level, rng) {
  if (![1, 2, 3, 4].includes(level)) throw new Error(`Unknown Year 2 dictation level ${level}`);
  return sample(BANK, 5, rng).map((row) => {
    if (level === 1) {
      const slip = row.text[0].toLowerCase() + row.text.slice(1);
      const wrong = row.text.replace(row.swap[0], row.swap[1]);
      return { kind: "choose", text: row.text, answer: row.text, struck: slip,
        options: shuffle([row.text, slip, wrong], rng) };
    }
    if (level === 2) {
      const tokens = tokenise(row.text);
      const at = tokens.findIndex((token) => bareWord(token) === row.key.toLowerCase());
      const token = tokens[at];
      const start = token.toLowerCase().indexOf(row.key.toLowerCase());
      const head = tokens.slice(0, at).join(" ");
      const tail = tokens.slice(at + 1).join(" ");
      return { kind: "type", text: row.text, answer: row.key,
        before: `${head}${head ? " " : ""}${token.slice(0, start)}`,
        after: `${token.slice(start + row.key.length)}${tail ? " " : ""}${tail}`,
        hint: row.key[0] + " _".repeat(row.key.length - 1) };
    }
    const answer = parts(row.text);
    const extra = [row.swap[1], ...[".", "?", "!"].filter((mark) => !answer.includes(mark))];
    if (level === 4) extra.push(answer[0].toLowerCase());
    return { kind: level === 3 ? "build" : "write", text: row.text, answer, swap: row.swap,
      tiles: shuffle([...answer, ...extra].map((label, i) => ({ id: String(i), label })), rng) };
  });
}
