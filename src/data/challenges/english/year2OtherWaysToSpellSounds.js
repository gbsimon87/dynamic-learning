import { wordQuestions } from "./year2Practice.js";

/** Other Ways to Spell Sounds: see its mapping in docs/curriculum/year-2-english.md. */
export const RULE = "Some familiar sounds have surprising spellings. Learn each word and its meaning.";
export const BANK = [
  {
    "answer": "all",
    "wrong": [
      "orl",
      "awl"
    ],
    "clue": "Spell the word meaning every one."
  },
  {
    "answer": "ball",
    "wrong": [
      "borl",
      "bawl"
    ],
    "clue": "Spell the round thing used in football."
  },
  {
    "answer": "call",
    "wrong": [
      "corl",
      "cawl"
    ],
    "clue": "Spell what you do when you ask someone to come."
  },
  {
    "answer": "walk",
    "wrong": [
      "wawk",
      "wolk"
    ],
    "clue": "Spell the word meaning to move on foot."
  },
  {
    "answer": "talk",
    "wrong": [
      "tawk",
      "tolk"
    ],
    "clue": "Spell the word meaning to speak to someone."
  },
  {
    "answer": "always",
    "wrong": [
      "allways",
      "orlways"
    ],
    "clue": "Spell the word meaning every time."
  },
  {
    "answer": "other",
    "wrong": [
      "uther",
      "othar"
    ],
    "clue": "Spell the missing word: one sock and the ___ sock."
  },
  {
    "answer": "mother",
    "wrong": [
      "muther",
      "mothar"
    ],
    "clue": "Spell the word for a female parent."
  },
  {
    "answer": "brother",
    "wrong": [
      "bruther",
      "brothar"
    ],
    "clue": "Spell the word for a boy with the same parents as you."
  },
  {
    "answer": "nothing",
    "wrong": [
      "nuthing",
      "nothin"
    ],
    "clue": "Spell the word meaning not anything."
  },
  {
    "answer": "Monday",
    "wrong": [
      "Munday",
      "Mondai"
    ],
    "clue": "Spell the day after Sunday."
  },
  {
    "answer": "want",
    "wrong": [
      "wont",
      "whant"
    ],
    "clue": "Spell the word meaning to wish to have something."
  },
  {
    "answer": "watch",
    "wrong": [
      "wotch",
      "wacht"
    ],
    "clue": "Spell the small clock worn on your wrist."
  },
  {
    "answer": "wander",
    "wrong": [
      "wonder",
      "wandar"
    ],
    "clue": "Spell the word meaning to walk without a fixed plan."
  },
  {
    "answer": "quantity",
    "wrong": [
      "quontity",
      "quantety"
    ],
    "clue": "Spell the word meaning an amount."
  },
  {
    "answer": "squash",
    "wrong": [
      "squosh",
      "squasch"
    ],
    "clue": "Spell the word meaning to press flat."
  },
  {
    "answer": "word",
    "wrong": [
      "werd",
      "wurd"
    ],
    "clue": "Spell a unit of language such as cat."
  },
  {
    "answer": "work",
    "wrong": [
      "werk",
      "wurk"
    ],
    "clue": "Spell the word for doing a job."
  },
  {
    "answer": "worm",
    "wrong": [
      "werm",
      "wurm"
    ],
    "clue": "Spell the small animal that wriggles in soil."
  },
  {
    "answer": "world",
    "wrong": [
      "werld",
      "wurld"
    ],
    "clue": "Spell the word for the Earth and everyone on it."
  },
  {
    "answer": "worth",
    "wrong": [
      "werth",
      "wurth"
    ],
    "clue": "Spell the word meaning the value of something."
  },
  {
    "answer": "war",
    "wrong": [
      "wor",
      "warr"
    ],
    "clue": "Spell the word for fighting between countries."
  },
  {
    "answer": "warm",
    "wrong": [
      "worm",
      "wawm"
    ],
    "clue": "Spell the word meaning a little hot."
  },
  {
    "answer": "towards",
    "wrong": [
      "towords",
      "toawards"
    ],
    "clue": "Spell the word meaning in the direction of."
  },
  {
    "answer": "television",
    "wrong": [
      "televizion",
      "televison"
    ],
    "clue": "Spell the screen used to watch programmes."
  },
  {
    "answer": "treasure",
    "wrong": [
      "treazure",
      "tresure"
    ],
    "clue": "Spell the valuable things a pirate might hide."
  },
  {
    "answer": "usual",
    "wrong": [
      "uzual",
      "ushual"
    ],
    "clue": "Spell the word meaning normal or familiar."
  },
  {
    "answer": "station",
    "wrong": [
      "stashion",
      "staition"
    ],
    "clue": "Spell the place where trains stop."
  },
  {
    "answer": "fiction",
    "wrong": [
      "ficshun",
      "fiktion"
    ],
    "clue": "Spell the word for invented stories."
  },
  {
    "answer": "motion",
    "wrong": [
      "moshun",
      "motiun"
    ],
    "clue": "Spell the word meaning movement."
  },
  {
    "answer": "national",
    "wrong": [
      "nashonal",
      "natiunal"
    ],
    "clue": "Spell the word meaning belonging to a whole country."
  },
  {
    "answer": "section",
    "wrong": [
      "secshun",
      "sektion"
    ],
    "clue": "Spell the word for one part of something."
  }
];
export function buildQuestions(level, rng) {
  return wordQuestions(BANK, RULE, level, rng);
}
