import { wordQuestions } from "./year2Practice.js";

/** The Suffixes ment, ness, ful, less and ly: see its mapping in docs/curriculum/year-2-english.md. */
export const RULE = "A suffix (word ending) changes a word. Most of these endings add straight on. Happy changes y to i.";
export const BANK = [
  {
    "answer": "enjoyment",
    "wrong": [
      "enjoymint",
      "enjoymment"
    ],
    "clue": "Add ment to enjoy."
  },
  {
    "answer": "sadness",
    "wrong": [
      "sadnes",
      "sadniss"
    ],
    "clue": "Add ness to sad."
  },
  {
    "answer": "careful",
    "wrong": [
      "carefull",
      "carful"
    ],
    "clue": "Add ful to care."
  },
  {
    "answer": "playful",
    "wrong": [
      "playfull",
      "plaiful"
    ],
    "clue": "Add ful to play."
  },
  {
    "answer": "hopeless",
    "wrong": [
      "hopeles",
      "hopless"
    ],
    "clue": "Add less to hope."
  },
  {
    "answer": "plainness",
    "wrong": [
      "plainnes",
      "plainniss"
    ],
    "clue": "Add ness to plain."
  },
  {
    "answer": "badly",
    "wrong": [
      "badley",
      "badlly"
    ],
    "clue": "Add ly to bad."
  },
  {
    "answer": "merriment",
    "wrong": [
      "merryment",
      "merrimment"
    ],
    "clue": "Add ment to merry. Change y to i."
  },
  {
    "answer": "happiness",
    "wrong": [
      "happyness",
      "happines"
    ],
    "clue": "Add ness to happy. Change y to i."
  },
  {
    "answer": "plentiful",
    "wrong": [
      "plentyful",
      "plentifull"
    ],
    "clue": "Add ful to plenty. Change y to i."
  },
  {
    "answer": "penniless",
    "wrong": [
      "pennyless",
      "penniles"
    ],
    "clue": "Add less to penny. Change y to i."
  },
  {
    "answer": "happily",
    "wrong": [
      "happyly",
      "happiley"
    ],
    "clue": "Add ly to happy. Change y to i."
  },
  {
    "answer": "argument",
    "wrong": [
      "arguement",
      "argumment"
    ],
    "clue": "Add ment to argue. This word drops the e."
  },
  {
    "answer": "kindness",
    "wrong": [
      "kindnes",
      "kindniss"
    ],
    "clue": "Add ness to kind."
  },
  {
    "answer": "slowly",
    "wrong": [
      "slowley",
      "slowlly"
    ],
    "clue": "Add ly to slow."
  }
];
export function buildQuestions(level, rng) {
  return wordQuestions(BANK, RULE, level, rng);
}
