import { wordQuestions } from "./year2Practice.js";

/** Common Exception Words: see its mapping in docs/curriculum/year-2-english.md. */
export const RULE = "Some common words have unusual spellings. Look closely at the tricky letters.";
export const BANK = [
  {
    "answer": "door",
    "wrong": [
      "dor",
      "doore"
    ],
    "clue": "Spell what you open to enter a room."
  },
  {
    "answer": "floor",
    "wrong": [
      "flor",
      "floore"
    ],
    "clue": "Spell the surface under your feet indoors."
  },
  {
    "answer": "poor",
    "wrong": [
      "por",
      "poore"
    ],
    "clue": "Spell the word meaning having very little money."
  },
  {
    "answer": "because",
    "wrong": [
      "becaus",
      "becose"
    ],
    "clue": "Spell the joining word that gives a reason."
  },
  {
    "answer": "find",
    "wrong": [
      "fynd",
      "fiind"
    ],
    "clue": "Spell the word meaning to discover where something is."
  },
  {
    "answer": "kind",
    "wrong": [
      "kynd",
      "kiind"
    ],
    "clue": "Spell the word meaning caring and helpful."
  },
  {
    "answer": "mind",
    "wrong": [
      "mynd",
      "miind"
    ],
    "clue": "Spell the word for the part of you that thinks."
  },
  {
    "answer": "behind",
    "wrong": [
      "behynd",
      "behiind"
    ],
    "clue": "Spell the word meaning at the back of."
  },
  {
    "answer": "child",
    "wrong": [
      "chyld",
      "chiild"
    ],
    "clue": "Spell the word for a young person."
  },
  {
    "answer": "children",
    "wrong": [
      "childrin",
      "childern"
    ],
    "clue": "Spell the plural of child."
  },
  {
    "answer": "wild",
    "wrong": [
      "wyld",
      "wiild"
    ],
    "clue": "Spell the word meaning living freely in nature."
  },
  {
    "answer": "climb",
    "wrong": [
      "clime",
      "clim"
    ],
    "clue": "Spell what you do to go up a tree."
  },
  {
    "answer": "most",
    "wrong": [
      "mowst",
      "moast"
    ],
    "clue": "Spell the word meaning the greatest amount."
  },
  {
    "answer": "only",
    "wrong": [
      "onely",
      "ownly"
    ],
    "clue": "Spell the word meaning just one or no others."
  },
  {
    "answer": "both",
    "wrong": [
      "boath",
      "bowth"
    ],
    "clue": "Spell the word meaning the two together."
  },
  {
    "answer": "old",
    "wrong": [
      "owld",
      "oald"
    ],
    "clue": "Spell the word meaning having lived for many years."
  },
  {
    "answer": "cold",
    "wrong": [
      "coald",
      "cowld"
    ],
    "clue": "Spell the opposite of hot."
  },
  {
    "answer": "gold",
    "wrong": [
      "goald",
      "gowld"
    ],
    "clue": "Spell the yellow metal used for some rings."
  },
  {
    "answer": "hold",
    "wrong": [
      "hoald",
      "howld"
    ],
    "clue": "Spell the word meaning to keep something in your hands."
  },
  {
    "answer": "told",
    "wrong": [
      "toald",
      "towld"
    ],
    "clue": "Spell the missing word: Leo ___ us a story yesterday."
  },
  {
    "answer": "every",
    "wrong": [
      "evry",
      "everey"
    ],
    "clue": "Spell the word meaning each one."
  },
  {
    "answer": "everybody",
    "wrong": [
      "evrybody",
      "everybodey"
    ],
    "clue": "Spell the word meaning all the people."
  },
  {
    "answer": "even",
    "wrong": [
      "eeven",
      "eaven"
    ],
    "clue": "Spell the word for a number that divides exactly by two."
  },
  {
    "answer": "great",
    "wrong": [
      "grate",
      "grait"
    ],
    "clue": "Spell the word meaning very good or very large."
  },
  {
    "answer": "break",
    "wrong": [
      "brake",
      "braik"
    ],
    "clue": "Spell the word meaning to make something come apart."
  },
  {
    "answer": "steak",
    "wrong": [
      "stake",
      "staik"
    ],
    "clue": "Spell the piece of meat cooked for a meal."
  },
  {
    "answer": "pretty",
    "wrong": [
      "pritty",
      "prety"
    ],
    "clue": "Spell the word meaning lovely to look at."
  },
  {
    "answer": "beautiful",
    "wrong": [
      "beautifull",
      "beutiful"
    ],
    "clue": "Spell the word meaning very lovely."
  },
  {
    "answer": "after",
    "wrong": [
      "aftur",
      "affter"
    ],
    "clue": "Spell the opposite of before."
  },
  {
    "answer": "fast",
    "wrong": [
      "faast",
      "fasst"
    ],
    "clue": "Spell the opposite of slow."
  },
  {
    "answer": "last",
    "wrong": [
      "laast",
      "lasst"
    ],
    "clue": "Spell the opposite of first."
  },
  {
    "answer": "past",
    "wrong": [
      "paast",
      "passte"
    ],
    "clue": "Spell the word for time that has already happened."
  },
  {
    "answer": "father",
    "wrong": [
      "fathur",
      "farther"
    ],
    "clue": "Spell the word for a male parent."
  },
  {
    "answer": "class",
    "wrong": [
      "claas",
      "cllas"
    ],
    "clue": "Spell a group of pupils taught together."
  },
  {
    "answer": "grass",
    "wrong": [
      "graas",
      "grais"
    ],
    "clue": "Spell the green plants in a lawn."
  },
  {
    "answer": "pass",
    "wrong": [
      "paas",
      "passe"
    ],
    "clue": "Spell the word meaning to go by something."
  },
  {
    "answer": "plant",
    "wrong": [
      "plaant",
      "pllant"
    ],
    "clue": "Spell a living thing that grows in soil."
  },
  {
    "answer": "path",
    "wrong": [
      "paath",
      "pathe"
    ],
    "clue": "Spell a narrow way to walk along."
  },
  {
    "answer": "bath",
    "wrong": [
      "baath",
      "bathe"
    ],
    "clue": "Spell what you fill with water to wash in."
  },
  {
    "answer": "hour",
    "wrong": [
      "our",
      "houre"
    ],
    "clue": "Spell the word for sixty minutes."
  },
  {
    "answer": "move",
    "wrong": [
      "moove",
      "mouve"
    ],
    "clue": "Spell the word meaning to change position."
  },
  {
    "answer": "prove",
    "wrong": [
      "proove",
      "prouve"
    ],
    "clue": "Spell the word meaning to show something is true."
  },
  {
    "answer": "improve",
    "wrong": [
      "improove",
      "improuve"
    ],
    "clue": "Spell the word meaning to get better."
  },
  {
    "answer": "sure",
    "wrong": [
      "shure",
      "suure"
    ],
    "clue": "Spell the word meaning certain."
  },
  {
    "answer": "sugar",
    "wrong": [
      "shugar",
      "suggar"
    ],
    "clue": "Spell the sweet ingredient added to some cakes."
  },
  {
    "answer": "eye",
    "wrong": [
      "iy",
      "ey"
    ],
    "clue": "Spell the body part you see with."
  },
  {
    "answer": "could",
    "wrong": [
      "coud",
      "cood"
    ],
    "clue": "Spell the missing word: When I was little, I ___ not swim."
  },
  {
    "answer": "should",
    "wrong": [
      "shoud",
      "shood"
    ],
    "clue": "Spell the missing word: You ___ wash your hands before eating."
  },
  {
    "answer": "would",
    "wrong": [
      "woud",
      "wood"
    ],
    "clue": "Spell the missing word: I ___ like some water, please."
  },
  {
    "answer": "who",
    "wrong": [
      "hoo",
      "whow"
    ],
    "clue": "Spell the question word for a person."
  },
  {
    "answer": "whole",
    "wrong": [
      "hole",
      "wholle"
    ],
    "clue": "Spell the word meaning all of something."
  },
  {
    "answer": "any",
    "wrong": [
      "enny",
      "aney"
    ],
    "clue": "Spell the missing word: Are there ___ apples left?"
  },
  {
    "answer": "many",
    "wrong": [
      "menny",
      "maney"
    ],
    "clue": "Spell the word meaning a lot of."
  },
  {
    "answer": "clothes",
    "wrong": [
      "cloths",
      "cloathes"
    ],
    "clue": "Spell what you wear."
  },
  {
    "answer": "busy",
    "wrong": [
      "bisy",
      "buzzy"
    ],
    "clue": "Spell the word meaning having lots to do."
  },
  {
    "answer": "people",
    "wrong": [
      "peple",
      "peeple"
    ],
    "clue": "Spell the word for human beings."
  },
  {
    "answer": "water",
    "wrong": [
      "warter",
      "watre"
    ],
    "clue": "Spell the clear liquid we drink."
  },
  {
    "answer": "again",
    "wrong": [
      "agen",
      "agin"
    ],
    "clue": "Spell the word meaning one more time."
  },
  {
    "answer": "half",
    "wrong": [
      "haff",
      "halfe"
    ],
    "clue": "Spell one of two equal parts."
  },
  {
    "answer": "money",
    "wrong": [
      "munny",
      "monee"
    ],
    "clue": "Spell what we use to buy things."
  },
  {
    "answer": "Mr",
    "wrong": [
      "Mrr",
      "Misterr"
    ],
    "clue": "Spell the short title before a man's surname, with two letters."
  },
  {
    "answer": "Mrs",
    "wrong": [
      "Mrrs",
      "Missus"
    ],
    "clue": "Spell the short title often used by a married woman, with three letters."
  },
  {
    "answer": "parents",
    "wrong": [
      "parrents",
      "parentts"
    ],
    "clue": "Spell the word for a child's mother and father."
  },
  {
    "answer": "Christmas",
    "wrong": [
      "Chrismas",
      "Cristmas"
    ],
    "clue": "Spell the festival celebrated on 25 December."
  }
];
export function buildQuestions(level, rng) {
  return wordQuestions(BANK, RULE, level, rng);
}
