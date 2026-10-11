import { wordQuestions } from "./year2Practice.js";

/** Reading Words with Suffixes: see its mapping in docs/curriculum/year-2-english.md. */
export const RULE = "A suffix (word ending) adds to a root word. Read the root, then the ending.";
export const BANK = [
  {
    "answer": "playing",
    "wrong": [
      "playng",
      "plaing"
    ],
    "clue": "Read play + ing. What are the children doing with their toys?"
  },
  {
    "answer": "jumped",
    "wrong": [
      "jumpt",
      "jumpd"
    ],
    "clue": "Read jump + ed. What did Leo do over the log?"
  },
  {
    "answer": "helper",
    "wrong": [
      "helpar",
      "helpr"
    ],
    "clue": "Read help + er. What do we call someone who helps?"
  },
  {
    "answer": "smallest",
    "wrong": [
      "smalest",
      "smallist"
    ],
    "clue": "Read small + est. Which word means smaller than all the others?"
  },
  {
    "answer": "careful",
    "wrong": [
      "carefull",
      "carful"
    ],
    "clue": "Read care + ful. Which word means taking care?"
  },
  {
    "answer": "careless",
    "wrong": [
      "careles",
      "carless"
    ],
    "clue": "Read care + less. Which word means not taking care?"
  },
  {
    "answer": "quickly",
    "wrong": [
      "quickley",
      "quikly"
    ],
    "clue": "Read quick + ly. Which word tells us something is done fast?"
  },
  {
    "answer": "kindness",
    "wrong": [
      "kindnes",
      "kindniss"
    ],
    "clue": "Read kind + ness. What is the noun for being kind?"
  },
  {
    "answer": "enjoyment",
    "wrong": [
      "enjoymint",
      "enjoymment"
    ],
    "clue": "Read enjoy + ment. What is the noun for enjoying something?"
  },
  {
    "answer": "hopeful",
    "wrong": [
      "hopefull",
      "hopful"
    ],
    "clue": "Read hope + ful. Which word means full of hope?"
  },
  {
    "answer": "hopeless",
    "wrong": [
      "hopeles",
      "hopless"
    ],
    "clue": "Read hope + less. Which word means without hope?"
  },
  {
    "answer": "slowly",
    "wrong": [
      "slowley",
      "sloly"
    ],
    "clue": "Read slow + ly. Which word tells us something is done at a slow speed?"
  },
  {
    "answer": "faster",
    "wrong": [
      "fastar",
      "fastr"
    ],
    "clue": "Read fast + er. Which word means more fast?"
  },
  {
    "answer": "longest",
    "wrong": [
      "longist",
      "longgest"
    ],
    "clue": "Read long + est. Which word means longer than all the others?"
  },
  {
    "answer": "reader",
    "wrong": [
      "readar",
      "reedr"
    ],
    "clue": "Read read + er. What do we call someone who reads?"
  }
];
export function buildQuestions(level, rng) {
  return wordQuestions(BANK, RULE, level, rng);
}
