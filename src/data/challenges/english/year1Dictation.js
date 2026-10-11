import { bareWord, sample, shuffle, tokenise } from "./shared.js";
/** Year 1: "write from memory simple sentences dictated by the teacher".
 * 1 choose; 2 type a missing word; 3 build with words; 4 build with end marks.
 * Tap-to-hear, with the existing look/cover fallback when sound is unavailable.
 */
export const TITLES = ["Choose the sentence.", "Spell the missing word.", "Build the sentence.", "Build the whole sentence."];
export const BANK = [
  {
    "text": "Leo has a cat.",
    "key": "cat",
    "swap": [
      "cat",
      "kat"
    ]
  },
  {
    "text": "Amara has a shell.",
    "key": "shell",
    "swap": [
      "shell",
      "shel"
    ]
  },
  {
    "text": "Priya can help.",
    "key": "help",
    "swap": [
      "help",
      "hellp"
    ]
  },
  {
    "text": "Zayn has a book.",
    "key": "book",
    "swap": [
      "book",
      "buk"
    ]
  },
  {
    "text": "Ellie feeds the dog.",
    "key": "dog",
    "swap": [
      "dog",
      "dogg"
    ]
  },
  {
    "text": "Biscuit has a ball.",
    "key": "ball",
    "swap": [
      "ball",
      "bal"
    ]
  },
  {
    "text": "The rain is cold.",
    "key": "rain",
    "swap": [
      "rain",
      "rane"
    ]
  },
  {
    "text": "I can see the moon.",
    "key": "moon",
    "swap": [
      "moon",
      "moan"
    ]
  },
  {
    "text": "We go to school.",
    "key": "school",
    "swap": [
      "school",
      "skool"
    ]
  },
  {
    "text": "The bird sings.",
    "key": "bird",
    "swap": [
      "bird",
      "burd"
    ]
  },
  {
    "text": "Mum has a coat.",
    "key": "coat",
    "swap": [
      "coat",
      "cote"
    ]
  },
  {
    "text": "Dad has a shirt.",
    "key": "shirt",
    "swap": [
      "shirt",
      "shurt"
    ]
  },
  {
    "text": "We play in the park.",
    "key": "park",
    "swap": [
      "park",
      "parc"
    ]
  },
  {
    "text": "Can you see the boat?",
    "key": "boat",
    "swap": [
      "boat",
      "bote"
    ]
  },
  {
    "text": "Where is my sock?",
    "key": "sock",
    "swap": [
      "sock",
      "sok"
    ]
  },
  {
    "text": "We have a toy.",
    "key": "toy",
    "swap": [
      "toy",
      "toi"
    ]
  },
  {
    "text": "I said hello.",
    "key": "said",
    "swap": [
      "said",
      "sed"
    ]
  },
  {
    "text": "The light is on.",
    "key": "light",
    "swap": [
      "light",
      "lite"
    ]
  }
];

// End marks are separate tiles; all target words stay within Year 1.
const parts = (text) => text.match(/[A-Za-z]+(?:[’'][A-Za-z]+|[’'])?|[,.!?]/g);
export function buildQuestions(level, rng) {
  if (![1, 2, 3, 4].includes(level)) throw new Error(`Unknown Year 1 dictation level ${level}`);
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

export const buildDictation = buildQuestions;
