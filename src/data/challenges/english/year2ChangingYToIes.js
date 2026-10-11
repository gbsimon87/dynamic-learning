import { wordQuestions } from "./year2Practice.js";

/** Changing y to ies: see its mapping in docs/curriculum/year-2-english.md. */
export const RULE = "After a consonant, change y to i before adding es. Baby becomes babies.";
export const BANK = [
  {
    "answer": "flies",
    "wrong": [
      "flys",
      "flyes"
    ],
    "clue": "Make fly mean more than one insect."
  },
  {
    "answer": "tries",
    "wrong": [
      "trys",
      "tryes"
    ],
    "clue": "Make try fit: Leo ___ again."
  },
  {
    "answer": "replies",
    "wrong": [
      "replys",
      "replyes"
    ],
    "clue": "Make reply fit: Amara ___ to the letter."
  },
  {
    "answer": "copies",
    "wrong": [
      "copys",
      "copyes"
    ],
    "clue": "Make copy mean more than one copy."
  },
  {
    "answer": "babies",
    "wrong": [
      "babys",
      "babyes"
    ],
    "clue": "Make baby mean more than one baby."
  },
  {
    "answer": "carries",
    "wrong": [
      "carrys",
      "carryes"
    ],
    "clue": "Make carry fit: Priya ___ the bag."
  },
  {
    "answer": "cries",
    "wrong": [
      "crys",
      "cryes"
    ],
    "clue": "Make cry fit: The baby ___ loudly."
  },
  {
    "answer": "dries",
    "wrong": [
      "drys",
      "dryes"
    ],
    "clue": "Make dry fit: The towel ___ in the sun."
  },
  {
    "answer": "families",
    "wrong": [
      "familys",
      "familyes"
    ],
    "clue": "Make family mean more than one family."
  },
  {
    "answer": "stories",
    "wrong": [
      "storys",
      "storyes"
    ],
    "clue": "Make story mean more than one story."
  },
  {
    "answer": "cities",
    "wrong": [
      "citys",
      "cityes"
    ],
    "clue": "Make city mean more than one city."
  },
  {
    "answer": "ponies",
    "wrong": [
      "ponys",
      "ponyes"
    ],
    "clue": "Make pony mean more than one pony."
  },
  {
    "answer": "puppies",
    "wrong": [
      "puppys",
      "puppyes"
    ],
    "clue": "Make puppy mean more than one puppy."
  },
  {
    "answer": "lorries",
    "wrong": [
      "lorrys",
      "lorryes"
    ],
    "clue": "Make lorry mean more than one lorry."
  },
  {
    "answer": "parties",
    "wrong": [
      "partys",
      "partyes"
    ],
    "clue": "Make party mean more than one party."
  }
];
export function buildQuestions(level, rng) {
  return wordQuestions(BANK, RULE, level, rng);
}
