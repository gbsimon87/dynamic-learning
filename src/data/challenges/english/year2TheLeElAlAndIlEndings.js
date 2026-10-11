import { wordQuestions } from "./year2Practice.js";

/** The le, el, al and il Endings: see its mapping in docs/curriculum/year-2-english.md. */
export const RULE = "These endings can sound alike. Learn the ending that belongs to each word.";
export const BANK = [
  {
    "answer": "table",
    "wrong": [
      "tabel",
      "tabal"
    ],
    "clue": "Spell the furniture used for eating meals."
  },
  {
    "answer": "apple",
    "wrong": [
      "appel",
      "appil"
    ],
    "clue": "Spell the fruit that can be red or green."
  },
  {
    "answer": "bottle",
    "wrong": [
      "bottel",
      "bottal"
    ],
    "clue": "Spell the container for a drink."
  },
  {
    "answer": "little",
    "wrong": [
      "littel",
      "littal"
    ],
    "clue": "Spell the word meaning small."
  },
  {
    "answer": "middle",
    "wrong": [
      "middel",
      "middil"
    ],
    "clue": "Spell the word meaning the centre."
  },
  {
    "answer": "camel",
    "wrong": [
      "camle",
      "camal"
    ],
    "clue": "Spell the animal with humps."
  },
  {
    "answer": "tunnel",
    "wrong": [
      "tunnle",
      "tunnal"
    ],
    "clue": "Spell the passage under the ground."
  },
  {
    "answer": "squirrel",
    "wrong": [
      "squirrele",
      "squirral"
    ],
    "clue": "Spell the animal with a bushy tail that gathers nuts."
  },
  {
    "answer": "travel",
    "wrong": [
      "travle",
      "traval"
    ],
    "clue": "Spell the word meaning to go on a journey."
  },
  {
    "answer": "towel",
    "wrong": [
      "towle",
      "towal"
    ],
    "clue": "Spell what you use to dry yourself."
  },
  {
    "answer": "tinsel",
    "wrong": [
      "tinsle",
      "tinsal"
    ],
    "clue": "Spell the shiny decoration used at Christmas."
  },
  {
    "answer": "metal",
    "wrong": [
      "metle",
      "metel"
    ],
    "clue": "Spell the material used to make an iron gate."
  },
  {
    "answer": "pedal",
    "wrong": [
      "pedle",
      "pedel"
    ],
    "clue": "Spell the bicycle part you push with your foot."
  },
  {
    "answer": "capital",
    "wrong": [
      "capitle",
      "capitel"
    ],
    "clue": "Spell the word for the main city of a country."
  },
  {
    "answer": "hospital",
    "wrong": [
      "hospitle",
      "hospitel"
    ],
    "clue": "Spell the place where doctors care for ill people."
  },
  {
    "answer": "animal",
    "wrong": [
      "animle",
      "animel"
    ],
    "clue": "Spell the word for a living creature such as a dog."
  },
  {
    "answer": "pencil",
    "wrong": [
      "pencle",
      "pencel"
    ],
    "clue": "Spell what you use to draw and rub out."
  },
  {
    "answer": "fossil",
    "wrong": [
      "fossle",
      "fossel"
    ],
    "clue": "Spell a trace of an ancient living thing in rock."
  },
  {
    "answer": "nostril",
    "wrong": [
      "nostrle",
      "nostrel"
    ],
    "clue": "Spell one of the two openings in your nose."
  }
];
export function buildQuestions(level, rng) {
  return wordQuestions(BANK, RULE, level, rng);
}
