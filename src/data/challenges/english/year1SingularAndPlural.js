import { spellingQuestions } from "./year1Practice.js";

/** Year 1: "Regular plural noun suffixes –s or –es".
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
    "answer": "cats",
    "root": "cat",
    "ending": "s",
    "pattern": "s",
    "prompt": "Spell the plural (more than one) of cat.",
    "sentence": "There are two ___.",
    "speak": "cats. More than one cat.",
    "wrong": [
      "cat",
      "cates"
    ],
    "hint": "Does the ending need one letter or two?"
  },
  {
    "answer": "dogs",
    "root": "dog",
    "ending": "s",
    "pattern": "s",
    "prompt": "Spell the plural (more than one) of dog.",
    "sentence": "There are two ___.",
    "speak": "dogs. More than one dog.",
    "wrong": [
      "dog",
      "doges"
    ],
    "hint": "Does the ending need one letter or two?"
  },
  {
    "answer": "rocks",
    "root": "rock",
    "ending": "s",
    "pattern": "s",
    "prompt": "Spell the plural (more than one) of rock.",
    "sentence": "There are two ___.",
    "speak": "rocks. More than one rock.",
    "wrong": [
      "rock",
      "rockes"
    ],
    "hint": "Does the ending need one letter or two?"
  },
  {
    "answer": "books",
    "root": "book",
    "ending": "s",
    "pattern": "s",
    "prompt": "Spell the plural (more than one) of book.",
    "sentence": "There are two ___.",
    "speak": "books. More than one book.",
    "wrong": [
      "book",
      "bookes"
    ],
    "hint": "Does the ending need one letter or two?"
  },
  {
    "answer": "cups",
    "root": "cup",
    "ending": "s",
    "pattern": "s",
    "prompt": "Spell the plural (more than one) of cup.",
    "sentence": "There are two ___.",
    "speak": "cups. More than one cup.",
    "wrong": [
      "cup",
      "cupes"
    ],
    "hint": "Does the ending need one letter or two?"
  },
  {
    "answer": "hats",
    "root": "hat",
    "ending": "s",
    "pattern": "s",
    "prompt": "Spell the plural (more than one) of hat.",
    "sentence": "There are two ___.",
    "speak": "hats. More than one hat.",
    "wrong": [
      "hat",
      "hates"
    ],
    "hint": "Does the ending need one letter or two?"
  },
  {
    "answer": "bells",
    "root": "bell",
    "ending": "s",
    "pattern": "s",
    "prompt": "Spell the plural (more than one) of bell.",
    "sentence": "There are two ___.",
    "speak": "bells. More than one bell.",
    "wrong": [
      "bell",
      "belles"
    ],
    "hint": "Does the ending need one letter or two?"
  },
  {
    "answer": "socks",
    "root": "sock",
    "ending": "s",
    "pattern": "s",
    "prompt": "Spell the plural (more than one) of sock.",
    "sentence": "There are two ___.",
    "speak": "socks. More than one sock.",
    "wrong": [
      "sock",
      "sockes"
    ],
    "hint": "Does the ending need one letter or two?"
  },
  {
    "answer": "ducks",
    "root": "duck",
    "ending": "s",
    "pattern": "s",
    "prompt": "Spell the plural (more than one) of duck.",
    "sentence": "There are two ___.",
    "speak": "ducks. More than one duck.",
    "wrong": [
      "duck",
      "duckes"
    ],
    "hint": "Does the ending need one letter or two?"
  },
  {
    "answer": "trains",
    "root": "train",
    "ending": "s",
    "pattern": "s",
    "prompt": "Spell the plural (more than one) of train.",
    "sentence": "There are two ___.",
    "speak": "trains. More than one train.",
    "wrong": [
      "train",
      "traines"
    ],
    "hint": "Does the ending need one letter or two?"
  },
  {
    "answer": "wishes",
    "root": "wish",
    "ending": "es",
    "pattern": "es",
    "prompt": "Spell the plural (more than one) of wish.",
    "sentence": "There are two ___.",
    "speak": "wishes. More than one wish.",
    "wrong": [
      "wish",
      "wishs"
    ],
    "hint": "Does the ending need one letter or two?"
  },
  {
    "answer": "boxes",
    "root": "box",
    "ending": "es",
    "pattern": "es",
    "prompt": "Spell the plural (more than one) of box.",
    "sentence": "There are two ___.",
    "speak": "boxes. More than one box.",
    "wrong": [
      "box",
      "boxs"
    ],
    "hint": "Does the ending need one letter or two?"
  },
  {
    "answer": "buses",
    "root": "bus",
    "ending": "es",
    "pattern": "es",
    "prompt": "Spell the plural (more than one) of bus.",
    "sentence": "There are two ___.",
    "speak": "buses. More than one bus.",
    "wrong": [
      "bus",
      "buss"
    ],
    "hint": "Does the ending need one letter or two?"
  },
  {
    "answer": "foxes",
    "root": "fox",
    "ending": "es",
    "pattern": "es",
    "prompt": "Spell the plural (more than one) of fox.",
    "sentence": "There are two ___.",
    "speak": "foxes. More than one fox.",
    "wrong": [
      "fox",
      "foxs"
    ],
    "hint": "Does the ending need one letter or two?"
  },
  {
    "answer": "dishes",
    "root": "dish",
    "ending": "es",
    "pattern": "es",
    "prompt": "Spell the plural (more than one) of dish.",
    "sentence": "There are two ___.",
    "speak": "dishes. More than one dish.",
    "wrong": [
      "dish",
      "dishs"
    ],
    "hint": "Does the ending need one letter or two?"
  },
  {
    "answer": "catches",
    "root": "catch",
    "ending": "es",
    "pattern": "es",
    "prompt": "Spell the plural (more than one) of catch.",
    "sentence": "There are two ___.",
    "speak": "catches. More than one catch.",
    "wrong": [
      "catch",
      "catchs"
    ],
    "hint": "Does the ending need one letter or two?"
  },
  {
    "answer": "jumps",
    "root": "jump",
    "ending": "s",
    "pattern": "s",
    "prompt": "Add the right ending to jump.",
    "sentence": "Leo ___ each day.",
    "speak": "jumps. Leo jumps each day.",
    "wrong": [
      "jump",
      "jumpes"
    ],
    "hint": "The doing word needs an ending for Leo."
  },
  {
    "answer": "wishes",
    "root": "wish",
    "ending": "es",
    "pattern": "es",
    "prompt": "Add the right ending to wish.",
    "sentence": "Leo ___ each day.",
    "speak": "wishes. Leo wishes each day.",
    "wrong": [
      "wish",
      "wishs"
    ],
    "hint": "The doing word needs an ending for Leo."
  },
  {
    "answer": "catches",
    "root": "catch",
    "ending": "es",
    "pattern": "es",
    "prompt": "Add the right ending to catch.",
    "sentence": "Leo ___ each day.",
    "speak": "catches. Leo catches each day.",
    "wrong": [
      "catch",
      "catchs"
    ],
    "hint": "The doing word needs an ending for Leo."
  },
  {
    "answer": "spends",
    "root": "spend",
    "ending": "s",
    "pattern": "s",
    "prompt": "Add the right ending to spend.",
    "sentence": "Leo ___ each day.",
    "speak": "spends. Leo spends each day.",
    "wrong": [
      "spend",
      "spendes"
    ],
    "hint": "The doing word needs an ending for Leo."
  },
  {
    "answer": "thanks",
    "root": "thank",
    "ending": "s",
    "pattern": "s",
    "prompt": "Add the right ending to thank.",
    "sentence": "Leo ___ each day.",
    "speak": "thanks. Leo thanks each day.",
    "wrong": [
      "thank",
      "thankes"
    ],
    "hint": "The doing word needs an ending for Leo."
  }
];
export function buildSingularAndPlural(level, rng) {
  return spellingQuestions(BANK, "Singular means one. Plural means more than one. Add s or es.", level, rng);
}
