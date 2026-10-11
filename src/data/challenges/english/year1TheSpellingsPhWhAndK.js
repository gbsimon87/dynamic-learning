import { spellingQuestions } from "./year1Practice.js";

/** Year 1: "New consonant spellings ph and wh · Using k for the /k/ sound".
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
    "answer": "dolphin",
    "pattern": "ph",
    "picture": "🐬",
    "sentence": "A ___ swims in the sea.",
    "prompt": "Spell the missing word.",
    "speak": "dolphin. A dolphin swims in the sea.",
    "wrong": [
      "dolfin",
      "dolphi"
    ],
    "hint": "It has 7 letters. Listen for each part."
  },
  {
    "answer": "elephant",
    "pattern": "ph",
    "picture": "🐘",
    "sentence": "An ___ has a long trunk.",
    "prompt": "Spell the missing word.",
    "speak": "elephant. An elephant has a long trunk.",
    "wrong": [
      "elefant",
      "elephan"
    ],
    "hint": "It has 8 letters. Listen for each part."
  },
  {
    "answer": "alphabet",
    "pattern": "ph",
    "picture": "🔤",
    "sentence": "We say the ___ from a to z.",
    "prompt": "Spell the missing word.",
    "speak": "alphabet. We say the alphabet from a to z.",
    "wrong": [
      "alfabet",
      "alphabe"
    ],
    "hint": "It has 8 letters. Listen for each part."
  },
  {
    "answer": "phonics",
    "pattern": "ph",
    "picture": "🔤",
    "sentence": "We learn letters and sounds in ___.",
    "prompt": "Spell the missing word.",
    "speak": "phonics. We learn letters and sounds in phonics.",
    "wrong": [
      "fonics",
      "phonic"
    ],
    "hint": "It has 7 letters. Listen for each part."
  },
  {
    "answer": "photo",
    "pattern": "ph",
    "picture": "📷",
    "sentence": "The camera takes a ___.",
    "prompt": "Spell the missing word.",
    "speak": "photo. The camera takes a photo.",
    "wrong": [
      "foto",
      "phot"
    ],
    "hint": "It has 5 letters. Listen for each part."
  },
  {
    "answer": "wheel",
    "pattern": "wh",
    "picture": "🛞",
    "sentence": "A round ___ turns on a car.",
    "prompt": "Spell the missing word.",
    "speak": "wheel. A round wheel turns on a car.",
    "wrong": [
      "weel",
      "whee"
    ],
    "hint": "It has 5 letters. Listen for each part."
  },
  {
    "answer": "when",
    "pattern": "wh",
    "picture": "🕐",
    "sentence": "Tell me ___ it is time to go.",
    "prompt": "Spell the missing word.",
    "speak": "when. Tell me when it is time to go.",
    "wrong": [
      "wen",
      "whe"
    ],
    "hint": "It has 4 letters. Listen for each part."
  },
  {
    "answer": "where",
    "pattern": "wh",
    "picture": "🗺️",
    "sentence": "Tell me ___ you live.",
    "prompt": "Spell the missing word.",
    "speak": "where. Tell me where you live.",
    "wrong": [
      "were",
      "wher"
    ],
    "hint": "It has 5 letters. Listen for each part."
  },
  {
    "answer": "which",
    "pattern": "wh",
    "picture": "👉",
    "sentence": "Tell me ___ hat you want.",
    "prompt": "Spell the missing word.",
    "speak": "which. Tell me which hat you want.",
    "wrong": [
      "wich",
      "whic"
    ],
    "hint": "It has 5 letters. Listen for each part."
  },
  {
    "answer": "white",
    "pattern": "wh",
    "picture": "⚪",
    "sentence": "Snow is ___.",
    "prompt": "Spell the missing word.",
    "speak": "white. Snow is white.",
    "wrong": [
      "wite",
      "whit"
    ],
    "hint": "It has 5 letters. Listen for each part."
  },
  {
    "answer": "kit",
    "pattern": "k",
    "picture": "🎒",
    "sentence": "I pack my sports ___.",
    "prompt": "Spell the missing word.",
    "speak": "kit. I pack my sports kit.",
    "wrong": [
      "cit",
      "ki"
    ],
    "hint": "It has 3 letters. Listen for each part."
  },
  {
    "answer": "skin",
    "pattern": "k",
    "picture": "🖐️",
    "sentence": "My ___ covers my body.",
    "prompt": "Spell the missing word.",
    "speak": "skin. My skin covers my body.",
    "wrong": [
      "scin",
      "ski"
    ],
    "hint": "It has 4 letters. Listen for each part."
  },
  {
    "answer": "sketch",
    "pattern": "k",
    "picture": "✏️",
    "sentence": "A quick drawing is a ___.",
    "prompt": "Spell the missing word.",
    "speak": "sketch. A quick drawing is a sketch.",
    "wrong": [
      "scetch",
      "sketc"
    ],
    "hint": "It has 6 letters. Listen for each part."
  },
  {
    "answer": "skip",
    "pattern": "k",
    "picture": "🪢",
    "sentence": "I ___ with a rope.",
    "prompt": "Spell the missing word.",
    "speak": "skip. I skip with a rope.",
    "wrong": [
      "scip",
      "ski"
    ],
    "hint": "It has 4 letters. Listen for each part."
  },
  {
    "answer": "kid",
    "pattern": "k",
    "picture": "🐐",
    "sentence": "A young goat is a ___.",
    "prompt": "Spell the missing word.",
    "speak": "kid. A young goat is a kid.",
    "wrong": [
      "cid",
      "ki"
    ],
    "hint": "It has 3 letters. Listen for each part."
  },
  {
    "answer": "Kent",
    "pattern": "K",
    "picture": "🗺️",
    "sentence": "We visit ___ in England.",
    "prompt": "Spell the missing word.",
    "speak": "Kent. We visit Kent in England.",
    "wrong": [
      "Cent",
      "Ken"
    ],
    "hint": "It has 4 letters. Listen for each part."
  }
];
export function buildTheSpellingsPhWhAndK(level, rng) {
  return spellingQuestions(BANK, "Some words use ph or wh. Use k before e, i or y.", level, rng);
}
