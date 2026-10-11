import { spellingQuestions } from "./year1Practice.js";

/** Year 1: "Adding the endings –ing, –ed and –er to verbs where no change is needed to the root word".
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
    "answer": "helping",
    "root": "help",
    "ending": "ing",
    "pattern": "ing",
    "prompt": "Add ing to help. Spell the new word.",
    "sentence": "Leo is ___.",
    "speak": "helping. Add ing to help. Spell the new word.",
    "wrong": [
      "help",
      "helpin"
    ],
    "hint": "Keep all the letters of the starting word."
  },
  {
    "answer": "helped",
    "root": "help",
    "ending": "ed",
    "pattern": "ed",
    "prompt": "Add ed to help. Spell the new word.",
    "sentence": "Yesterday Leo ___.",
    "speak": "helped. Add ed to help. Spell the new word.",
    "wrong": [
      "help",
      "helpe"
    ],
    "hint": "Keep all the letters of the starting word."
  },
  {
    "answer": "helper",
    "root": "help",
    "ending": "er",
    "pattern": "er",
    "prompt": "Add er to help. Spell the new word.",
    "sentence": "Leo is a ___.",
    "speak": "helper. Add er to help. Spell the new word.",
    "wrong": [
      "help",
      "helpe"
    ],
    "hint": "Keep all the letters of the starting word."
  },
  {
    "answer": "jumping",
    "root": "jump",
    "ending": "ing",
    "pattern": "ing",
    "prompt": "Add ing to jump. Spell the new word.",
    "sentence": "Leo is ___.",
    "speak": "jumping. Add ing to jump. Spell the new word.",
    "wrong": [
      "jump",
      "jumpin"
    ],
    "hint": "Keep all the letters of the starting word."
  },
  {
    "answer": "jumped",
    "root": "jump",
    "ending": "ed",
    "pattern": "ed",
    "prompt": "Add ed to jump. Spell the new word.",
    "sentence": "Yesterday Leo ___.",
    "speak": "jumped. Add ed to jump. Spell the new word.",
    "wrong": [
      "jump",
      "jumpe"
    ],
    "hint": "Keep all the letters of the starting word."
  },
  {
    "answer": "jumper",
    "root": "jump",
    "ending": "er",
    "pattern": "er",
    "prompt": "Add er to jump. Spell the new word.",
    "sentence": "Leo is a ___.",
    "speak": "jumper. Add er to jump. Spell the new word.",
    "wrong": [
      "jump",
      "jumpe"
    ],
    "hint": "Keep all the letters of the starting word."
  },
  {
    "answer": "hunting",
    "root": "hunt",
    "ending": "ing",
    "pattern": "ing",
    "prompt": "Add ing to hunt. Spell the new word.",
    "sentence": "Leo is ___.",
    "speak": "hunting. Add ing to hunt. Spell the new word.",
    "wrong": [
      "hunt",
      "huntin"
    ],
    "hint": "Keep all the letters of the starting word."
  },
  {
    "answer": "hunted",
    "root": "hunt",
    "ending": "ed",
    "pattern": "ed",
    "prompt": "Add ed to hunt. Spell the new word.",
    "sentence": "Yesterday Leo ___.",
    "speak": "hunted. Add ed to hunt. Spell the new word.",
    "wrong": [
      "hunt",
      "hunte"
    ],
    "hint": "Keep all the letters of the starting word."
  },
  {
    "answer": "hunter",
    "root": "hunt",
    "ending": "er",
    "pattern": "er",
    "prompt": "Add er to hunt. Spell the new word.",
    "sentence": "Leo is a ___.",
    "speak": "hunter. Add er to hunt. Spell the new word.",
    "wrong": [
      "hunt",
      "hunte"
    ],
    "hint": "Keep all the letters of the starting word."
  },
  {
    "answer": "buzzing",
    "root": "buzz",
    "ending": "ing",
    "pattern": "ing",
    "prompt": "Add ing to buzz. Spell the new word.",
    "sentence": "The bee is ___.",
    "speak": "buzzing. Add ing to buzz. Spell the new word.",
    "wrong": [
      "buzz",
      "buzzin"
    ],
    "hint": "Keep all the letters of the starting word."
  },
  {
    "answer": "buzzed",
    "root": "buzz",
    "ending": "ed",
    "pattern": "ed",
    "prompt": "Add ed to buzz. Spell the new word.",
    "sentence": "Yesterday the bee ___.",
    "speak": "buzzed. Add ed to buzz. Spell the new word.",
    "wrong": [
      "buzz",
      "buzze"
    ],
    "hint": "Keep all the letters of the starting word."
  },
  {
    "answer": "buzzer",
    "root": "buzz",
    "ending": "er",
    "pattern": "er",
    "prompt": "Add er to buzz. Spell the new word.",
    "sentence": "Press the ___ to make a sound.",
    "speak": "buzzer. Add er to buzz. Spell the new word.",
    "wrong": [
      "buzz",
      "buzze"
    ],
    "hint": "Keep all the letters of the starting word."
  },
  {
    "answer": "painting",
    "root": "paint",
    "ending": "ing",
    "pattern": "ing",
    "prompt": "Add ing to paint. Spell the new word.",
    "sentence": "Leo is ___.",
    "speak": "painting. Add ing to paint. Spell the new word.",
    "wrong": [
      "paint",
      "paintin"
    ],
    "hint": "Keep all the letters of the starting word."
  },
  {
    "answer": "painted",
    "root": "paint",
    "ending": "ed",
    "pattern": "ed",
    "prompt": "Add ed to paint. Spell the new word.",
    "sentence": "Yesterday Leo ___.",
    "speak": "painted. Add ed to paint. Spell the new word.",
    "wrong": [
      "paint",
      "painte"
    ],
    "hint": "Keep all the letters of the starting word."
  },
  {
    "answer": "painter",
    "root": "paint",
    "ending": "er",
    "pattern": "er",
    "prompt": "Add er to paint. Spell the new word.",
    "sentence": "Leo is a ___.",
    "speak": "painter. Add er to paint. Spell the new word.",
    "wrong": [
      "paint",
      "painte"
    ],
    "hint": "Keep all the letters of the starting word."
  },
  {
    "answer": "farming",
    "root": "farm",
    "ending": "ing",
    "pattern": "ing",
    "prompt": "Add ing to farm. Spell the new word.",
    "sentence": "Leo is ___.",
    "speak": "farming. Add ing to farm. Spell the new word.",
    "wrong": [
      "farm",
      "farmin"
    ],
    "hint": "Keep all the letters of the starting word."
  },
  {
    "answer": "farmed",
    "root": "farm",
    "ending": "ed",
    "pattern": "ed",
    "prompt": "Add ed to farm. Spell the new word.",
    "sentence": "Yesterday Leo ___.",
    "speak": "farmed. Add ed to farm. Spell the new word.",
    "wrong": [
      "farm",
      "farme"
    ],
    "hint": "Keep all the letters of the starting word."
  },
  {
    "answer": "farmer",
    "root": "farm",
    "ending": "er",
    "pattern": "er",
    "prompt": "Add er to farm. Spell the new word.",
    "sentence": "Leo is a ___.",
    "speak": "farmer. Add er to farm. Spell the new word.",
    "wrong": [
      "farm",
      "farme"
    ],
    "hint": "Keep all the letters of the starting word."
  }
];
export function buildAddingIngEdAndEr(level, rng) {
  return spellingQuestions(BANK, "Keep the starting word. Add ing, ed or er.", level, rng);
}
