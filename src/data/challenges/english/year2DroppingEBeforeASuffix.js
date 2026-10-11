import { wordQuestions } from "./year2Practice.js";

/** Dropping e before a Suffix: see its mapping in docs/curriculum/year-2-english.md. */
export const RULE = "Drop the final e before a suffix (ending) that starts with a vowel. Hike becomes hiking.";
export const BANK = [
  {
    "answer": "hiking",
    "wrong": [
      "hikeing",
      "hikking"
    ],
    "clue": "Add ing to hike."
  },
  {
    "answer": "hiked",
    "wrong": [
      "hikeed",
      "hikd"
    ],
    "clue": "Add ed to hike."
  },
  {
    "answer": "hiker",
    "wrong": [
      "hikeer",
      "hikr"
    ],
    "clue": "Add er to hike to name a person who hikes."
  },
  {
    "answer": "nicer",
    "wrong": [
      "niceer",
      "nicr"
    ],
    "clue": "Add er to nice."
  },
  {
    "answer": "nicest",
    "wrong": [
      "niceest",
      "nicist"
    ],
    "clue": "Add est to nice."
  },
  {
    "answer": "shiny",
    "wrong": [
      "shiney",
      "shinny"
    ],
    "clue": "Add y to shine."
  },
  {
    "answer": "making",
    "wrong": [
      "makeing",
      "makking"
    ],
    "clue": "Add ing to make."
  },
  {
    "answer": "taking",
    "wrong": [
      "takeing",
      "takking"
    ],
    "clue": "Add ing to take."
  },
  {
    "answer": "smiling",
    "wrong": [
      "smileing",
      "smilling"
    ],
    "clue": "Add ing to smile."
  },
  {
    "answer": "smiled",
    "wrong": [
      "smileed",
      "smild"
    ],
    "clue": "Add ed to smile."
  },
  {
    "answer": "baking",
    "wrong": [
      "bakeing",
      "bakking"
    ],
    "clue": "Add ing to bake."
  },
  {
    "answer": "baked",
    "wrong": [
      "bakeed",
      "bakd"
    ],
    "clue": "Add ed to bake."
  },
  {
    "answer": "closer",
    "wrong": [
      "closeer",
      "closr"
    ],
    "clue": "Add er to close."
  },
  {
    "answer": "closest",
    "wrong": [
      "closeest",
      "closist"
    ],
    "clue": "Add est to close."
  },
  {
    "answer": "being",
    "wrong": [
      "bing",
      "beeing"
    ],
    "clue": "Add ing to be. This word is an exception: keep the e."
  }
];
export function buildQuestions(level, rng) {
  return wordQuestions(BANK, RULE, level, rng);
}
