import { wordQuestions } from "./year2Practice.js";

/** Suffixes after y: see its mapping in docs/curriculum/year-2-english.md. */
export const RULE = "After a consonant, change y to i for ed, er and est. Keep y before ing.";
export const BANK = [
  {
    "answer": "copied",
    "wrong": [
      "copyed",
      "copid"
    ],
    "clue": "Add ed to copy."
  },
  {
    "answer": "copier",
    "wrong": [
      "copyer",
      "copyier"
    ],
    "clue": "Add er to copy to name a copying machine."
  },
  {
    "answer": "happier",
    "wrong": [
      "happyer",
      "happyr"
    ],
    "clue": "Add er to happy to mean more happy."
  },
  {
    "answer": "happiest",
    "wrong": [
      "happyest",
      "happiist"
    ],
    "clue": "Add est to happy to mean most happy."
  },
  {
    "answer": "cried",
    "wrong": [
      "cryed",
      "crid"
    ],
    "clue": "Add ed to cry."
  },
  {
    "answer": "replied",
    "wrong": [
      "replyed",
      "replyd"
    ],
    "clue": "Add ed to reply."
  },
  {
    "answer": "copying",
    "wrong": [
      "copiing",
      "copyng"
    ],
    "clue": "Add ing to copy."
  },
  {
    "answer": "crying",
    "wrong": [
      "criing",
      "cryng"
    ],
    "clue": "Add ing to cry."
  },
  {
    "answer": "replying",
    "wrong": [
      "repliing",
      "replyng"
    ],
    "clue": "Add ing to reply."
  },
  {
    "answer": "tried",
    "wrong": [
      "tryed",
      "trid"
    ],
    "clue": "Add ed to try."
  },
  {
    "answer": "trying",
    "wrong": [
      "triing",
      "tryng"
    ],
    "clue": "Add ing to try."
  },
  {
    "answer": "dried",
    "wrong": [
      "dryed",
      "drid"
    ],
    "clue": "Add ed to dry."
  },
  {
    "answer": "drying",
    "wrong": [
      "driing",
      "dryng"
    ],
    "clue": "Add ing to dry."
  },
  {
    "answer": "funnier",
    "wrong": [
      "funnyer",
      "funnir"
    ],
    "clue": "Add er to funny."
  },
  {
    "answer": "funniest",
    "wrong": [
      "funnyest",
      "funniist"
    ],
    "clue": "Add est to funny."
  }
];
export function buildQuestions(level, rng) {
  return wordQuestions(BANK, RULE, level, rng);
}
