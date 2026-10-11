import { wordQuestions } from "./year2Practice.js";

/** Soft c and Silent Letters: see its mapping in docs/curriculum/year-2-english.md. */
export const RULE = "In city, c sounds like s. In knee, the k is silent. In write, the w is silent.";
export const BANK = [
  {
    "answer": "race",
    "wrong": [
      "rase",
      "raice"
    ],
    "clue": "Spell the word for a contest to see who is fastest."
  },
  {
    "answer": "ice",
    "wrong": [
      "ise",
      "eyce"
    ],
    "clue": "Spell frozen water."
  },
  {
    "answer": "cell",
    "wrong": [
      "selll",
      "cel"
    ],
    "clue": "Spell the word for a tiny unit in a living thing."
  },
  {
    "answer": "city",
    "wrong": [
      "sitty",
      "citty"
    ],
    "clue": "Spell the word for a large place with many buildings."
  },
  {
    "answer": "fancy",
    "wrong": [
      "fansy",
      "fancey"
    ],
    "clue": "Spell the word meaning very decorative."
  },
  {
    "answer": "knock",
    "wrong": [
      "nock",
      "knok"
    ],
    "clue": "Spell what you do on a door to ask to come in."
  },
  {
    "answer": "know",
    "wrong": [
      "noe",
      "kno"
    ],
    "clue": "Spell the word meaning to have learnt a fact."
  },
  {
    "answer": "knee",
    "wrong": [
      "nee",
      "kne"
    ],
    "clue": "Spell the joint in the middle of your leg."
  },
  {
    "answer": "gnat",
    "wrong": [
      "nat",
      "gnatt"
    ],
    "clue": "Spell the tiny flying insect."
  },
  {
    "answer": "gnaw",
    "wrong": [
      "naw",
      "gnor"
    ],
    "clue": "Spell the word meaning to bite again and again."
  },
  {
    "answer": "write",
    "wrong": [
      "rite",
      "writ"
    ],
    "clue": "Spell the word meaning to put words on paper."
  },
  {
    "answer": "written",
    "wrong": [
      "ritten",
      "writen"
    ],
    "clue": "Spell the missing word: I have ___ a letter."
  },
  {
    "answer": "wrote",
    "wrong": [
      "rote",
      "wrot"
    ],
    "clue": "Spell the missing word: Yesterday I ___ a letter."
  },
  {
    "answer": "wrong",
    "wrong": [
      "rong",
      "wron"
    ],
    "clue": "Spell the word meaning not correct."
  },
  {
    "answer": "wrap",
    "wrong": [
      "rap",
      "wrapp"
    ],
    "clue": "Spell the word meaning to cover a gift with paper."
  }
];
export function buildQuestions(level, rng) {
  return wordQuestions(BANK, RULE, level, rng);
}
