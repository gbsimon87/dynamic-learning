import { sentenceQuestions } from "./year4Practice.js";
/** Editing for Consistency: docs/curriculum/year-3-and-4-english.md, Year 4 mapping. */
export const RULE = "When editing (improving writing), keep the time and the verb forms consistent. Use the time clues.";
export const BANK = [
  {
    "sentence": "Yesterday, Leo ___ to the park.",
    "answer": "walked",
    "wrong": [
      "walks",
      "walking"
    ],
    "hint": "Find the time clue and check who is doing the action."
  },
  {
    "sentence": "Last night, Priya ___ a book.",
    "answer": "read",
    "wrong": [
      "reads",
      "reading"
    ],
    "hint": "Find the time clue and check who is doing the action."
  },
  {
    "sentence": "Tomorrow, Amara ___ the museum.",
    "answer": "will visit",
    "wrong": [
      "visited",
      "visiting"
    ],
    "hint": "Find the time clue and check who is doing the action."
  },
  {
    "sentence": "Every morning, Biscuit ___ for breakfast.",
    "answer": "waits",
    "wrong": [
      "wait",
      "waiting"
    ],
    "hint": "Find the time clue and check who is doing the action."
  },
  {
    "sentence": "The two girls ___ ready now.",
    "answer": "are",
    "wrong": [
      "is",
      "am"
    ],
    "hint": "Find the time clue and check who is doing the action."
  },
  {
    "sentence": "The three boys ___ a kite yesterday.",
    "answer": "flew",
    "wrong": [
      "flies",
      "flying"
    ],
    "hint": "Find the time clue and check who is doing the action."
  },
  {
    "sentence": "Ellie ___ her homework last night.",
    "answer": "finished",
    "wrong": [
      "finishes",
      "finishing"
    ],
    "hint": "Find the time clue and check who is doing the action."
  },
  {
    "sentence": "We ___ our coats yesterday.",
    "answer": "wore",
    "wrong": [
      "wears",
      "wearing"
    ],
    "hint": "Find the time clue and check who is doing the action."
  },
  {
    "sentence": "The children ___ the bell yesterday.",
    "answer": "heard",
    "wrong": [
      "hears",
      "hearing"
    ],
    "hint": "Find the time clue and check who is doing the action."
  },
  {
    "sentence": "Priya ___ the window every morning.",
    "answer": "opens",
    "wrong": [
      "open",
      "opening"
    ],
    "hint": "Find the time clue and check who is doing the action."
  },
  {
    "sentence": "Tomorrow, Zayn ___ a model.",
    "answer": "will build",
    "wrong": [
      "built",
      "building"
    ],
    "hint": "Find the time clue and check who is doing the action."
  },
  {
    "sentence": "The dogs ___ in the garden now.",
    "answer": "are",
    "wrong": [
      "is",
      "am"
    ],
    "hint": "Find the time clue and check who is doing the action."
  },
  {
    "sentence": "Last week, Amara ___ the library.",
    "answer": "visited",
    "wrong": [
      "visits",
      "visiting"
    ],
    "hint": "Find the time clue and check who is doing the action."
  },
  {
    "sentence": "Every afternoon, Leo ___ football.",
    "answer": "plays",
    "wrong": [
      "play",
      "playing"
    ],
    "hint": "Find the time clue and check who is doing the action."
  },
  {
    "sentence": "Yesterday, Ellie ___ a letter.",
    "answer": "wrote",
    "wrong": [
      "writes",
      "writing"
    ],
    "hint": "Find the time clue and check who is doing the action."
  }
];
export function buildEditingForConsistencyQuestions(level, rng) {
  return sentenceQuestions(BANK, RULE, level, rng);
}
