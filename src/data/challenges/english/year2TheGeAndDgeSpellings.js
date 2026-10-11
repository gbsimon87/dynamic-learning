import { wordQuestions } from "./year2Practice.js";

/** The ge and dge Spellings: see its mapping in docs/curriculum/year-2-english.md. */
export const RULE = "After a short vowel, the sound at the end of badge is spelt dge. Other words use ge.";
export const BANK = [
  {
    "answer": "badge",
    "wrong": [
      "badje",
      "bage"
    ],
    "clue": "Spell the word for a small sign pinned to a coat."
  },
  {
    "answer": "edge",
    "wrong": [
      "eje",
      "ege"
    ],
    "clue": "Spell the word for the side of a table."
  },
  {
    "answer": "bridge",
    "wrong": [
      "brige",
      "bridj"
    ],
    "clue": "Spell the word for a way across a river."
  },
  {
    "answer": "dodge",
    "wrong": [
      "doge",
      "dodj"
    ],
    "clue": "Spell the word meaning to move out of the way."
  },
  {
    "answer": "fudge",
    "wrong": [
      "fuge",
      "fudj"
    ],
    "clue": "Spell the sweet made with milk and sugar."
  },
  {
    "answer": "age",
    "wrong": [
      "aige",
      "aj"
    ],
    "clue": "Spell the word meaning how old someone is."
  },
  {
    "answer": "huge",
    "wrong": [
      "hudge",
      "huj"
    ],
    "clue": "Spell the word meaning very big."
  },
  {
    "answer": "change",
    "wrong": [
      "chandge",
      "chanj"
    ],
    "clue": "Spell the word meaning to become different."
  },
  {
    "answer": "charge",
    "wrong": [
      "chardge",
      "charj"
    ],
    "clue": "Spell the word meaning to fill a battery with power."
  },
  {
    "answer": "bulge",
    "wrong": [
      "buldge",
      "bulj"
    ],
    "clue": "Spell the word for a part that sticks out."
  },
  {
    "answer": "village",
    "wrong": [
      "villadge",
      "villaj"
    ],
    "clue": "Spell the word for a small place with homes."
  },
  {
    "answer": "gem",
    "wrong": [
      "jemm",
      "ghem"
    ],
    "clue": "Spell the word for a precious stone."
  },
  {
    "answer": "giant",
    "wrong": [
      "jiant",
      "gient"
    ],
    "clue": "Spell the word for a very big person in a tale."
  },
  {
    "answer": "magic",
    "wrong": [
      "majic",
      "magik"
    ],
    "clue": "Spell the word for a wizard's special power."
  },
  {
    "answer": "giraffe",
    "wrong": [
      "jiraffe",
      "girafe"
    ],
    "clue": "Spell the animal with a very long neck."
  },
  {
    "answer": "jacket",
    "wrong": [
      "gacket",
      "jaket"
    ],
    "clue": "Spell the coat worn over your clothes."
  },
  {
    "answer": "jar",
    "wrong": [
      "gar",
      "jarr"
    ],
    "clue": "Spell the pot with a lid."
  },
  {
    "answer": "jog",
    "wrong": [
      "gog",
      "jogg"
    ],
    "clue": "Spell the word meaning to run slowly."
  },
  {
    "answer": "join",
    "wrong": [
      "goin",
      "joyn"
    ],
    "clue": "Spell the word meaning to put two things together."
  },
  {
    "answer": "energy",
    "wrong": [
      "enerjy",
      "ennergi"
    ],
    "clue": "Spell the word meaning the power to be active."
  },
  {
    "answer": "adjust",
    "wrong": [
      "adgust",
      "ajust"
    ],
    "clue": "Spell the word meaning to change something a little."
  }
];
export function buildQuestions(level, rng) {
  return wordQuestions(BANK, RULE, level, rng);
}
