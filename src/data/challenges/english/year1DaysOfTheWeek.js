import { spellingQuestions } from "./year1Practice.js";

/** Year 1: "spell: the days of the week".
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
    "answer": "Monday",
    "pattern": "day",
    "index": 0,
    "clueKind": 0,
    "prompt": "Which day comes next?",
    "context": "The day after Sunday.",
    "sentence": "The day is ___.",
    "speak": "Monday. Which day comes next?",
    "wrong": [
      "monday",
      "Mondy"
    ],
    "caseSensitive": true,
    "hint": "Days start with a capital letter. Think about the order of the week."
  },
  {
    "answer": "Monday",
    "pattern": "day",
    "index": 0,
    "clueKind": 1,
    "prompt": "Which day came just before?",
    "context": "The day before Tuesday.",
    "sentence": "The day is ___.",
    "speak": "Monday. Which day came just before?",
    "wrong": [
      "monday",
      "Mondy"
    ],
    "caseSensitive": true,
    "hint": "Days start with a capital letter. Think about the order of the week."
  },
  {
    "answer": "Monday",
    "pattern": "day",
    "index": 0,
    "clueKind": 2,
    "prompt": "Spell the day in the clue.",
    "context": "Mo… is day 1 of a Monday-start week.",
    "sentence": "The day is ___.",
    "speak": "Monday. Spell the day in the clue.",
    "wrong": [
      "monday",
      "Mondy"
    ],
    "caseSensitive": true,
    "hint": "Days start with a capital letter. Think about the order of the week."
  },
  {
    "answer": "Tuesday",
    "pattern": "day",
    "index": 1,
    "clueKind": 0,
    "prompt": "Which day comes next?",
    "context": "The day after Monday.",
    "sentence": "The day is ___.",
    "speak": "Tuesday. Which day comes next?",
    "wrong": [
      "tuesday",
      "Tuesdy"
    ],
    "caseSensitive": true,
    "hint": "Days start with a capital letter. Think about the order of the week."
  },
  {
    "answer": "Tuesday",
    "pattern": "day",
    "index": 1,
    "clueKind": 1,
    "prompt": "Which day came just before?",
    "context": "The day before Wednesday.",
    "sentence": "The day is ___.",
    "speak": "Tuesday. Which day came just before?",
    "wrong": [
      "tuesday",
      "Tuesdy"
    ],
    "caseSensitive": true,
    "hint": "Days start with a capital letter. Think about the order of the week."
  },
  {
    "answer": "Tuesday",
    "pattern": "day",
    "index": 1,
    "clueKind": 2,
    "prompt": "Spell the day in the clue.",
    "context": "Tu… is day 2 of a Monday-start week.",
    "sentence": "The day is ___.",
    "speak": "Tuesday. Spell the day in the clue.",
    "wrong": [
      "tuesday",
      "Tuesdy"
    ],
    "caseSensitive": true,
    "hint": "Days start with a capital letter. Think about the order of the week."
  },
  {
    "answer": "Wednesday",
    "pattern": "day",
    "index": 2,
    "clueKind": 0,
    "prompt": "Which day comes next?",
    "context": "The day after Tuesday.",
    "sentence": "The day is ___.",
    "speak": "Wednesday. Which day comes next?",
    "wrong": [
      "wednesday",
      "Wednesdy"
    ],
    "caseSensitive": true,
    "hint": "Days start with a capital letter. Think about the order of the week."
  },
  {
    "answer": "Wednesday",
    "pattern": "day",
    "index": 2,
    "clueKind": 1,
    "prompt": "Which day came just before?",
    "context": "The day before Thursday.",
    "sentence": "The day is ___.",
    "speak": "Wednesday. Which day came just before?",
    "wrong": [
      "wednesday",
      "Wednesdy"
    ],
    "caseSensitive": true,
    "hint": "Days start with a capital letter. Think about the order of the week."
  },
  {
    "answer": "Wednesday",
    "pattern": "day",
    "index": 2,
    "clueKind": 2,
    "prompt": "Spell the day in the clue.",
    "context": "We… is day 3 of a Monday-start week.",
    "sentence": "The day is ___.",
    "speak": "Wednesday. Spell the day in the clue.",
    "wrong": [
      "wednesday",
      "Wednesdy"
    ],
    "caseSensitive": true,
    "hint": "Days start with a capital letter. Think about the order of the week."
  },
  {
    "answer": "Thursday",
    "pattern": "day",
    "index": 3,
    "clueKind": 0,
    "prompt": "Which day comes next?",
    "context": "The day after Wednesday.",
    "sentence": "The day is ___.",
    "speak": "Thursday. Which day comes next?",
    "wrong": [
      "thursday",
      "Thursdy"
    ],
    "caseSensitive": true,
    "hint": "Days start with a capital letter. Think about the order of the week."
  },
  {
    "answer": "Thursday",
    "pattern": "day",
    "index": 3,
    "clueKind": 1,
    "prompt": "Which day came just before?",
    "context": "The day before Friday.",
    "sentence": "The day is ___.",
    "speak": "Thursday. Which day came just before?",
    "wrong": [
      "thursday",
      "Thursdy"
    ],
    "caseSensitive": true,
    "hint": "Days start with a capital letter. Think about the order of the week."
  },
  {
    "answer": "Thursday",
    "pattern": "day",
    "index": 3,
    "clueKind": 2,
    "prompt": "Spell the day in the clue.",
    "context": "Th… is day 4 of a Monday-start week.",
    "sentence": "The day is ___.",
    "speak": "Thursday. Spell the day in the clue.",
    "wrong": [
      "thursday",
      "Thursdy"
    ],
    "caseSensitive": true,
    "hint": "Days start with a capital letter. Think about the order of the week."
  },
  {
    "answer": "Friday",
    "pattern": "day",
    "index": 4,
    "clueKind": 0,
    "prompt": "Which day comes next?",
    "context": "The day after Thursday.",
    "sentence": "The day is ___.",
    "speak": "Friday. Which day comes next?",
    "wrong": [
      "friday",
      "Fridy"
    ],
    "caseSensitive": true,
    "hint": "Days start with a capital letter. Think about the order of the week."
  },
  {
    "answer": "Friday",
    "pattern": "day",
    "index": 4,
    "clueKind": 1,
    "prompt": "Which day came just before?",
    "context": "The day before Saturday.",
    "sentence": "The day is ___.",
    "speak": "Friday. Which day came just before?",
    "wrong": [
      "friday",
      "Fridy"
    ],
    "caseSensitive": true,
    "hint": "Days start with a capital letter. Think about the order of the week."
  },
  {
    "answer": "Friday",
    "pattern": "day",
    "index": 4,
    "clueKind": 2,
    "prompt": "Spell the day in the clue.",
    "context": "Fr… is day 5 of a Monday-start week.",
    "sentence": "The day is ___.",
    "speak": "Friday. Spell the day in the clue.",
    "wrong": [
      "friday",
      "Fridy"
    ],
    "caseSensitive": true,
    "hint": "Days start with a capital letter. Think about the order of the week."
  },
  {
    "answer": "Saturday",
    "pattern": "day",
    "index": 5,
    "clueKind": 0,
    "prompt": "Which day comes next?",
    "context": "The day after Friday.",
    "sentence": "The day is ___.",
    "speak": "Saturday. Which day comes next?",
    "wrong": [
      "saturday",
      "Saturdy"
    ],
    "caseSensitive": true,
    "hint": "Days start with a capital letter. Think about the order of the week."
  },
  {
    "answer": "Saturday",
    "pattern": "day",
    "index": 5,
    "clueKind": 1,
    "prompt": "Which day came just before?",
    "context": "The day before Sunday.",
    "sentence": "The day is ___.",
    "speak": "Saturday. Which day came just before?",
    "wrong": [
      "saturday",
      "Saturdy"
    ],
    "caseSensitive": true,
    "hint": "Days start with a capital letter. Think about the order of the week."
  },
  {
    "answer": "Saturday",
    "pattern": "day",
    "index": 5,
    "clueKind": 2,
    "prompt": "Spell the day in the clue.",
    "context": "Sa… is day 6 of a Monday-start week.",
    "sentence": "The day is ___.",
    "speak": "Saturday. Spell the day in the clue.",
    "wrong": [
      "saturday",
      "Saturdy"
    ],
    "caseSensitive": true,
    "hint": "Days start with a capital letter. Think about the order of the week."
  },
  {
    "answer": "Sunday",
    "pattern": "day",
    "index": 6,
    "clueKind": 0,
    "prompt": "Which day comes next?",
    "context": "The day after Saturday.",
    "sentence": "The day is ___.",
    "speak": "Sunday. Which day comes next?",
    "wrong": [
      "sunday",
      "Sundy"
    ],
    "caseSensitive": true,
    "hint": "Days start with a capital letter. Think about the order of the week."
  },
  {
    "answer": "Sunday",
    "pattern": "day",
    "index": 6,
    "clueKind": 1,
    "prompt": "Which day came just before?",
    "context": "The day before Monday.",
    "sentence": "The day is ___.",
    "speak": "Sunday. Which day came just before?",
    "wrong": [
      "sunday",
      "Sundy"
    ],
    "caseSensitive": true,
    "hint": "Days start with a capital letter. Think about the order of the week."
  },
  {
    "answer": "Sunday",
    "pattern": "day",
    "index": 6,
    "clueKind": 2,
    "prompt": "Spell the day in the clue.",
    "context": "Su… is day 7 of a Monday-start week.",
    "sentence": "The day is ___.",
    "speak": "Sunday. Spell the day in the clue.",
    "wrong": [
      "sunday",
      "Sundy"
    ],
    "caseSensitive": true,
    "hint": "Days start with a capital letter. Think about the order of the week."
  }
];
export function buildDaysOfTheWeek(level, rng) {
  return spellingQuestions(BANK, "Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday. Days start with capitals.", level, rng);
}
