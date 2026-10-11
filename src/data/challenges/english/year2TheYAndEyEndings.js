import { wordQuestions } from "./year2Practice.js";

/** The y and ey Endings: see its mapping in docs/curriculum/year-2-english.md. */
export const RULE = "At the end of cry, y sounds like eye. At the end of key, ey sounds like ee.";
export const BANK = [
  {
    "answer": "cry",
    "wrong": [
      "crie",
      "cryy"
    ],
    "clue": "Spell the word meaning to shed tears."
  },
  {
    "answer": "fly",
    "wrong": [
      "flie",
      "flye"
    ],
    "clue": "Spell what a bird does in the air."
  },
  {
    "answer": "dry",
    "wrong": [
      "drie",
      "drye"
    ],
    "clue": "Spell the word meaning not wet."
  },
  {
    "answer": "try",
    "wrong": [
      "trie",
      "trye"
    ],
    "clue": "Spell the word meaning to make an attempt."
  },
  {
    "answer": "reply",
    "wrong": [
      "replie",
      "replye"
    ],
    "clue": "Spell the word meaning to answer a message."
  },
  {
    "answer": "July",
    "wrong": [
      "Juley",
      "Jully"
    ],
    "clue": "Spell the month after June."
  },
  {
    "answer": "key",
    "wrong": [
      "kee",
      "kiy"
    ],
    "clue": "Spell the thing used to unlock a door."
  },
  {
    "answer": "donkey",
    "wrong": [
      "donkee",
      "donky"
    ],
    "clue": "Spell the animal like a small horse with long ears."
  },
  {
    "answer": "monkey",
    "wrong": [
      "monkee",
      "monky"
    ],
    "clue": "Spell the animal that often climbs trees."
  },
  {
    "answer": "chimney",
    "wrong": [
      "chimnee",
      "chimny"
    ],
    "clue": "Spell the part of a house that carries smoke away."
  },
  {
    "answer": "valley",
    "wrong": [
      "vallee",
      "vally"
    ],
    "clue": "Spell the low land between hills."
  },
  {
    "answer": "keys",
    "wrong": [
      "kees",
      "keyes"
    ],
    "clue": "Spell the plural of key."
  },
  {
    "answer": "donkeys",
    "wrong": [
      "donkies",
      "donkeyes"
    ],
    "clue": "Spell the plural of donkey."
  },
  {
    "answer": "monkeys",
    "wrong": [
      "monkies",
      "monkeyes"
    ],
    "clue": "Spell the plural of monkey."
  },
  {
    "answer": "chimneys",
    "wrong": [
      "chimnies",
      "chimneyes"
    ],
    "clue": "Spell the plural of chimney."
  },
  {
    "answer": "valleys",
    "wrong": [
      "vallies",
      "valleyes"
    ],
    "clue": "Spell the plural of valley."
  }
];
export function buildQuestions(level, rng) {
  return wordQuestions(BANK, RULE, level, rng);
}
