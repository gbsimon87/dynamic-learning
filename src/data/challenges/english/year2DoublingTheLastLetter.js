import { wordQuestions } from "./year2Practice.js";

/** Doubling the Last Letter: see its mapping in docs/curriculum/year-2-english.md. */
export const RULE = "In a short word like pat, double the last consonant before ing or ed. Never double x.";
export const BANK = [
  {
    "answer": "patting",
    "wrong": [
      "pating",
      "pattingg"
    ],
    "clue": "Add ing to pat."
  },
  {
    "answer": "patted",
    "wrong": [
      "pated",
      "pattid"
    ],
    "clue": "Add ed to pat."
  },
  {
    "answer": "humming",
    "wrong": [
      "huming",
      "hummng"
    ],
    "clue": "Add ing to hum."
  },
  {
    "answer": "hummed",
    "wrong": [
      "humed",
      "hummd"
    ],
    "clue": "Add ed to hum."
  },
  {
    "answer": "dropping",
    "wrong": [
      "droping",
      "droppng"
    ],
    "clue": "Add ing to drop."
  },
  {
    "answer": "dropped",
    "wrong": [
      "droped",
      "droppd"
    ],
    "clue": "Add ed to drop."
  },
  {
    "answer": "sadder",
    "wrong": [
      "sader",
      "saddar"
    ],
    "clue": "Add er to sad."
  },
  {
    "answer": "saddest",
    "wrong": [
      "sadest",
      "saddist"
    ],
    "clue": "Add est to sad."
  },
  {
    "answer": "fatter",
    "wrong": [
      "fater",
      "fattar"
    ],
    "clue": "Add er to fat."
  },
  {
    "answer": "fattest",
    "wrong": [
      "fatest",
      "fattist"
    ],
    "clue": "Add est to fat."
  },
  {
    "answer": "runner",
    "wrong": [
      "runer",
      "runnar"
    ],
    "clue": "Add er to run to name a person who runs."
  },
  {
    "answer": "runny",
    "wrong": [
      "runy",
      "runnie"
    ],
    "clue": "Add y to run to describe a liquid."
  },
  {
    "answer": "mixing",
    "wrong": [
      "mixxing",
      "mixng"
    ],
    "clue": "Add ing to mix. Never double x."
  },
  {
    "answer": "mixed",
    "wrong": [
      "mixxed",
      "mixd"
    ],
    "clue": "Add ed to mix. Never double x."
  },
  {
    "answer": "boxer",
    "wrong": [
      "boxxer",
      "boxar"
    ],
    "clue": "Add er to box. Never double x."
  },
  {
    "answer": "sixes",
    "wrong": [
      "sixxes",
      "sixs"
    ],
    "clue": "Add es to six. Never double x."
  }
];
export function buildQuestions(level, rng) {
  return wordQuestions(BANK, RULE, level, rng);
}
