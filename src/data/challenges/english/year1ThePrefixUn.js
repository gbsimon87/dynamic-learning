import { spellingQuestions } from "./year1Practice.js";

/** Year 1: "How the prefix un– changes the meaning of verbs and adjectives".
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
    "answer": "unhappy",
    "root": "happy",
    "ending": "",
    "pattern": "un",
    "prompt": "Add un to happy. Spell the new word.",
    "sentence": "The new word is ___.",
    "speak": "unhappy. Add un to happy. Spell the new word.",
    "wrong": [
      "happy",
      "unhapp"
    ],
    "hint": "Keep all the letters of the starting word.",
    "context": "Meaning: not happy."
  },
  {
    "answer": "unfair",
    "root": "fair",
    "ending": "",
    "pattern": "un",
    "prompt": "Add un to fair. Spell the new word.",
    "sentence": "The new word is ___.",
    "speak": "unfair. Add un to fair. Spell the new word.",
    "wrong": [
      "fair",
      "unfai"
    ],
    "hint": "Keep all the letters of the starting word.",
    "context": "Meaning: not fair."
  },
  {
    "answer": "unkind",
    "root": "kind",
    "ending": "",
    "pattern": "un",
    "prompt": "Add un to kind. Spell the new word.",
    "sentence": "The new word is ___.",
    "speak": "unkind. Add un to kind. Spell the new word.",
    "wrong": [
      "kind",
      "unkin"
    ],
    "hint": "Keep all the letters of the starting word.",
    "context": "Meaning: not kind."
  },
  {
    "answer": "unsafe",
    "root": "safe",
    "ending": "",
    "pattern": "un",
    "prompt": "Add un to safe. Spell the new word.",
    "sentence": "The new word is ___.",
    "speak": "unsafe. Add un to safe. Spell the new word.",
    "wrong": [
      "safe",
      "unsaf"
    ],
    "hint": "Keep all the letters of the starting word.",
    "context": "Meaning: not safe."
  },
  {
    "answer": "unwell",
    "root": "well",
    "ending": "",
    "pattern": "un",
    "prompt": "Add un to well. Spell the new word.",
    "sentence": "The new word is ___.",
    "speak": "unwell. Add un to well. Spell the new word.",
    "wrong": [
      "well",
      "unwel"
    ],
    "hint": "Keep all the letters of the starting word.",
    "context": "Meaning: not well."
  },
  {
    "answer": "unfit",
    "root": "fit",
    "ending": "",
    "pattern": "un",
    "prompt": "Add un to fit. Spell the new word.",
    "sentence": "The new word is ___.",
    "speak": "unfit. Add un to fit. Spell the new word.",
    "wrong": [
      "fit",
      "unfi"
    ],
    "hint": "Keep all the letters of the starting word.",
    "context": "Meaning: not fit."
  },
  {
    "answer": "untrue",
    "root": "true",
    "ending": "",
    "pattern": "un",
    "prompt": "Add un to true. Spell the new word.",
    "sentence": "The new word is ___.",
    "speak": "untrue. Add un to true. Spell the new word.",
    "wrong": [
      "true",
      "untru"
    ],
    "hint": "Keep all the letters of the starting word.",
    "context": "Meaning: not true."
  },
  {
    "answer": "untidy",
    "root": "tidy",
    "ending": "",
    "pattern": "un",
    "prompt": "Add un to tidy. Spell the new word.",
    "sentence": "The new word is ___.",
    "speak": "untidy. Add un to tidy. Spell the new word.",
    "wrong": [
      "tidy",
      "untid"
    ],
    "hint": "Keep all the letters of the starting word.",
    "context": "Meaning: not tidy."
  },
  {
    "answer": "unzip",
    "root": "zip",
    "ending": "",
    "pattern": "un",
    "prompt": "Add un to zip. Spell the new word.",
    "sentence": "The new word is ___.",
    "speak": "unzip. Add un to zip. Spell the new word.",
    "wrong": [
      "zip",
      "unzi"
    ],
    "hint": "Keep all the letters of the starting word.",
    "context": "Meaning: open a zip."
  },
  {
    "answer": "unlock",
    "root": "lock",
    "ending": "",
    "pattern": "un",
    "prompt": "Add un to lock. Spell the new word.",
    "sentence": "The new word is ___.",
    "speak": "unlock. Add un to lock. Spell the new word.",
    "wrong": [
      "lock",
      "unloc"
    ],
    "hint": "Keep all the letters of the starting word.",
    "context": "Meaning: open a lock."
  },
  {
    "answer": "unpack",
    "root": "pack",
    "ending": "",
    "pattern": "un",
    "prompt": "Add un to pack. Spell the new word.",
    "sentence": "The new word is ___.",
    "speak": "unpack. Add un to pack. Spell the new word.",
    "wrong": [
      "pack",
      "unpac"
    ],
    "hint": "Keep all the letters of the starting word.",
    "context": "Meaning: take things out of a bag."
  },
  {
    "answer": "untie",
    "root": "tie",
    "ending": "",
    "pattern": "un",
    "prompt": "Add un to tie. Spell the new word.",
    "sentence": "The new word is ___.",
    "speak": "untie. Add un to tie. Spell the new word.",
    "wrong": [
      "tie",
      "unti"
    ],
    "hint": "Keep all the letters of the starting word.",
    "context": "Meaning: undo a knot."
  },
  {
    "answer": "undo",
    "root": "do",
    "ending": "",
    "pattern": "un",
    "prompt": "Add un to do. Spell the new word.",
    "sentence": "The new word is ___.",
    "speak": "undo. Add un to do. Spell the new word.",
    "wrong": [
      "do",
      "und"
    ],
    "hint": "Keep all the letters of the starting word.",
    "context": "Meaning: reverse what was done."
  },
  {
    "answer": "unload",
    "root": "load",
    "ending": "",
    "pattern": "un",
    "prompt": "Add un to load. Spell the new word.",
    "sentence": "The new word is ___.",
    "speak": "unload. Add un to load. Spell the new word.",
    "wrong": [
      "load",
      "unloa"
    ],
    "hint": "Keep all the letters of the starting word.",
    "context": "Meaning: take a load off."
  },
  {
    "answer": "unfold",
    "root": "fold",
    "ending": "",
    "pattern": "un",
    "prompt": "Add un to fold. Spell the new word.",
    "sentence": "The new word is ___.",
    "speak": "unfold. Add un to fold. Spell the new word.",
    "wrong": [
      "fold",
      "unfol"
    ],
    "hint": "Keep all the letters of the starting word.",
    "context": "Meaning: open something folded."
  }
];
export function buildThePrefixUn(level, rng) {
  return spellingQuestions(BANK, "Add un at the start to mean not, or to undo something.", level, rng);
}
