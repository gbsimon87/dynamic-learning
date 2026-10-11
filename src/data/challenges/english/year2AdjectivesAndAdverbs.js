import { wordQuestions } from "./year2Practice.js";

/** Adjectives and Adverbs: see its mapping in docs/curriculum/year-2-english.md. */
export const RULE = "An adjective (describing word) describes a noun. An adverb tells us how something happens. Suffixes include ful, less, er, est and ly.";
export const BANK = [
  {
    "answer": "careful",
    "wrong": [
      "carefull",
      "carful"
    ],
    "clue": "Make care into an adjective meaning taking care. Add ful."
  },
  {
    "answer": "careless",
    "wrong": [
      "careles",
      "carless"
    ],
    "clue": "Make care into an adjective meaning without care. Add less."
  },
  {
    "answer": "helpful",
    "wrong": [
      "helpfull",
      "helful"
    ],
    "clue": "Make help into an adjective meaning giving help. Add ful."
  },
  {
    "answer": "helpless",
    "wrong": [
      "helples",
      "hellpless"
    ],
    "clue": "Make help into an adjective meaning unable to help yourself. Add less."
  },
  {
    "answer": "joyful",
    "wrong": [
      "joyfull",
      "joiful"
    ],
    "clue": "Make joy into an adjective meaning full of joy. Add ful."
  },
  {
    "answer": "hopeful",
    "wrong": [
      "hopefull",
      "hopful"
    ],
    "clue": "Make hope into an adjective meaning full of hope. Add ful."
  },
  {
    "answer": "smaller",
    "wrong": [
      "smallar",
      "smaler"
    ],
    "clue": "Make small mean more small. Add er."
  },
  {
    "answer": "smallest",
    "wrong": [
      "smallist",
      "smalest"
    ],
    "clue": "Make small mean most small. Add est."
  },
  {
    "answer": "taller",
    "wrong": [
      "tallar",
      "taler"
    ],
    "clue": "Make tall mean more tall. Add er."
  },
  {
    "answer": "tallest",
    "wrong": [
      "tallist",
      "talest"
    ],
    "clue": "Make tall mean most tall. Add est."
  },
  {
    "answer": "quicker",
    "wrong": [
      "quickar",
      "quiker"
    ],
    "clue": "Make quick mean more quick. Add er."
  },
  {
    "answer": "quickest",
    "wrong": [
      "quickist",
      "quikest"
    ],
    "clue": "Make quick mean most quick. Add est."
  },
  {
    "answer": "slowly",
    "wrong": [
      "slowley",
      "slowlly"
    ],
    "clue": "Turn slow into an adverb to tell how the tortoise moves. Add ly."
  },
  {
    "answer": "quickly",
    "wrong": [
      "quickley",
      "quikly"
    ],
    "clue": "Turn quick into an adverb to tell how the rabbit moves. Add ly."
  },
  {
    "answer": "softly",
    "wrong": [
      "softley",
      "softlly"
    ],
    "clue": "Turn soft into an adverb to tell how Ellie speaks. Add ly."
  }
];
export function buildQuestions(level, rng) {
  return wordQuestions(BANK, RULE, level, rng);
}
