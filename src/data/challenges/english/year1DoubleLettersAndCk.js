import { spellingQuestions } from "./year1Practice.js";

/** Year 1: "The sounds /f/, /l/, /s/, /z/ and /k/ spelt ff, ll, ss, zz and ck".
 * Source: docs/curriculum/year-1-english.md and english-appendix-1-year-1.md.
 * 1 supported choice; 2 independent choice; 3 whole-structure work; 4 applied building/spelling.
 */
export const TITLES = [
  "Read the clue.",
  "Try without the rule.",
  "Build it with tiles.",
  "Use what you know."
];
export const BANK = [
  {
    "answer": "off",
    "pattern": "ff",
    "picture": "💡",
    "sentence": "The light is ___.",
    "prompt": "Spell the missing word.",
    "speak": "off. The light is off.",
    "wrong": [
      "of",
      "offf"
    ],
    "hint": "It has 3 letters. Listen for each part."
  },
  {
    "answer": "cliff",
    "pattern": "ff",
    "picture": "⛰️",
    "sentence": "The ___ is a steep rock face.",
    "prompt": "Spell the missing word.",
    "speak": "cliff. The cliff is a steep rock face.",
    "wrong": [
      "clif",
      "clifff"
    ],
    "hint": "It has 5 letters. Listen for each part."
  },
  {
    "answer": "puff",
    "pattern": "ff",
    "picture": "💨",
    "sentence": "Blow a ___ of air.",
    "prompt": "Spell the missing word.",
    "speak": "puff. Blow a puff of air.",
    "wrong": [
      "puf",
      "pufff"
    ],
    "hint": "It has 4 letters. Listen for each part."
  },
  {
    "answer": "bell",
    "pattern": "ll",
    "picture": "🔔",
    "sentence": "Ring the ___.",
    "prompt": "Spell the missing word.",
    "speak": "bell. Ring the bell.",
    "wrong": [
      "bel",
      "belll"
    ],
    "hint": "It has 4 letters. Listen for each part."
  },
  {
    "answer": "hill",
    "pattern": "ll",
    "picture": "⛰️",
    "sentence": "We walk up the ___.",
    "prompt": "Spell the missing word.",
    "speak": "hill. We walk up the hill.",
    "wrong": [
      "hil",
      "hilll"
    ],
    "hint": "It has 4 letters. Listen for each part."
  },
  {
    "answer": "doll",
    "pattern": "ll",
    "picture": "🪆",
    "sentence": "Ellie plays with a ___.",
    "prompt": "Spell the missing word.",
    "speak": "doll. Ellie plays with a doll.",
    "wrong": [
      "dol",
      "dolll"
    ],
    "hint": "It has 4 letters. Listen for each part."
  },
  {
    "answer": "shell",
    "pattern": "ll",
    "picture": "🐚",
    "sentence": "I found a ___ on the beach.",
    "prompt": "Spell the missing word.",
    "speak": "shell. I found a shell on the beach.",
    "wrong": [
      "shel",
      "shelll"
    ],
    "hint": "It has 5 letters. Listen for each part."
  },
  {
    "answer": "miss",
    "pattern": "ss",
    "picture": "🎯",
    "sentence": "Try not to ___ the target.",
    "prompt": "Spell the missing word.",
    "speak": "miss. Try not to miss the target.",
    "wrong": [
      "mis",
      "misss"
    ],
    "hint": "It has 4 letters. Listen for each part."
  },
  {
    "answer": "kiss",
    "pattern": "ss",
    "picture": "😘",
    "sentence": "Mum gave me a ___.",
    "prompt": "Spell the missing word.",
    "speak": "kiss. Mum gave me a kiss.",
    "wrong": [
      "kis",
      "kisss"
    ],
    "hint": "It has 4 letters. Listen for each part."
  },
  {
    "answer": "mess",
    "pattern": "ss",
    "picture": "🧹",
    "sentence": "Help tidy this ___.",
    "prompt": "Spell the missing word.",
    "speak": "mess. Help tidy this mess.",
    "wrong": [
      "mes",
      "messs"
    ],
    "hint": "It has 4 letters. Listen for each part."
  },
  {
    "answer": "buzz",
    "pattern": "zz",
    "picture": "🐝",
    "sentence": "Bees ___ near the flowers.",
    "prompt": "Spell the missing word.",
    "speak": "buzz. Bees buzz near the flowers.",
    "wrong": [
      "buz",
      "buzzz"
    ],
    "hint": "It has 4 letters. Listen for each part."
  },
  {
    "answer": "fizz",
    "pattern": "zz",
    "picture": "🥤",
    "sentence": "The drink has lots of ___.",
    "prompt": "Spell the missing word.",
    "speak": "fizz. The drink has lots of fizz.",
    "wrong": [
      "fiz",
      "fizzz"
    ],
    "hint": "It has 4 letters. Listen for each part."
  },
  {
    "answer": "duck",
    "pattern": "ck",
    "picture": "🦆",
    "sentence": "The ___ swims in the pond.",
    "prompt": "Spell the missing word.",
    "speak": "duck. The duck swims in the pond.",
    "wrong": [
      "duk",
      "duc"
    ],
    "hint": "It has 4 letters. Listen for each part."
  },
  {
    "answer": "sock",
    "pattern": "ck",
    "picture": "🧦",
    "sentence": "I put a ___ on my foot.",
    "prompt": "Spell the missing word.",
    "speak": "sock. I put a sock on my foot.",
    "wrong": [
      "sok",
      "soc"
    ],
    "hint": "It has 4 letters. Listen for each part."
  },
  {
    "answer": "back",
    "pattern": "ck",
    "picture": "🔙",
    "sentence": "Come ___ to me.",
    "prompt": "Spell the missing word.",
    "speak": "back. Come back to me.",
    "wrong": [
      "bak",
      "bac"
    ],
    "hint": "It has 4 letters. Listen for each part."
  },
  {
    "answer": "lock",
    "pattern": "ck",
    "picture": "🔒",
    "sentence": "Turn the key in the ___.",
    "prompt": "Spell the missing word.",
    "speak": "lock. Turn the key in the lock.",
    "wrong": [
      "lok",
      "loc"
    ],
    "hint": "It has 4 letters. Listen for each part."
  }
];
export function buildDoubleLettersAndCk(level, rng) {
  return spellingQuestions(BANK, "Short words often end in ff, ll, ss, zz or ck.", level, rng);
}
