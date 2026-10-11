import { wordQuestions } from "./year2Practice.js";

/** Homophones and Near Homophones: see its mapping in docs/curriculum/year-2-english.md. */
export const RULE = "Homophones (sound-alike words) have different meanings. Read the whole sentence.";
export const BANK = [
  {
    "answer": "there",
    "wrong": [
      "their",
      "they're"
    ],
    "clue": "Choose the sound-alike word: Put the bag over ___."
  },
  {
    "answer": "their",
    "wrong": [
      "there",
      "they're"
    ],
    "clue": "Choose the sound-alike word: The children put on ___ coats."
  },
  {
    "answer": "they're",
    "wrong": [
      "their",
      "there"
    ],
    "clue": "Choose the sound-alike word: ___ going to the park means they are going."
  },
  {
    "answer": "here",
    "wrong": [
      "hear",
      "heer"
    ],
    "clue": "Choose the sound-alike word: Come and sit ___ beside me."
  },
  {
    "answer": "hear",
    "wrong": [
      "here",
      "heer"
    ],
    "clue": "Choose the sound-alike word: I can ___ the bell ringing."
  },
  {
    "answer": "quiet",
    "wrong": [
      "quite",
      "quyet"
    ],
    "clue": "Choose the correct word: Be ___ while the baby sleeps."
  },
  {
    "answer": "quite",
    "wrong": [
      "quiet",
      "quyte"
    ],
    "clue": "Choose the correct word: This box is ___ heavy, but I can lift it."
  },
  {
    "answer": "see",
    "wrong": [
      "sea",
      "cee"
    ],
    "clue": "Choose the sound-alike word: I can ___ a bird with my eyes."
  },
  {
    "answer": "sea",
    "wrong": [
      "see",
      "cee"
    ],
    "clue": "Choose the sound-alike word: The boat sailed on the ___."
  },
  {
    "answer": "bare",
    "wrong": [
      "bear",
      "baer"
    ],
    "clue": "Choose the sound-alike word: My ___ feet have no shoes on."
  },
  {
    "answer": "bear",
    "wrong": [
      "bare",
      "baer"
    ],
    "clue": "Choose the sound-alike word: A big brown ___ lives in the forest."
  },
  {
    "answer": "one",
    "wrong": [
      "won",
      "wun"
    ],
    "clue": "Choose the sound-alike word: I have ___ pencil, not two."
  },
  {
    "answer": "won",
    "wrong": [
      "one",
      "wun"
    ],
    "clue": "Choose the sound-alike word: Leo ___ the race and got a medal."
  },
  {
    "answer": "sun",
    "wrong": [
      "son",
      "sunn"
    ],
    "clue": "Choose the sound-alike word: The ___ shines in the sky."
  },
  {
    "answer": "son",
    "wrong": [
      "sun",
      "sunn"
    ],
    "clue": "Choose the sound-alike word: A parent's boy is their ___."
  },
  {
    "answer": "to",
    "wrong": [
      "too",
      "two"
    ],
    "clue": "Choose the sound-alike word: We walked ___ the shop."
  },
  {
    "answer": "too",
    "wrong": [
      "to",
      "two"
    ],
    "clue": "Choose the sound-alike word: This coat is ___ big to fit me."
  },
  {
    "answer": "two",
    "wrong": [
      "to",
      "too"
    ],
    "clue": "Choose the sound-alike word: One and one make ___."
  },
  {
    "answer": "be",
    "wrong": [
      "bee",
      "bea"
    ],
    "clue": "Choose the sound-alike word: Please ___ kind to your friend."
  },
  {
    "answer": "bee",
    "wrong": [
      "be",
      "bea"
    ],
    "clue": "Choose the sound-alike word: A ___ makes honey."
  },
  {
    "answer": "blue",
    "wrong": [
      "blew",
      "bloo"
    ],
    "clue": "Choose the sound-alike word: The clear sky is ___."
  },
  {
    "answer": "blew",
    "wrong": [
      "blue",
      "bloo"
    ],
    "clue": "Choose the sound-alike word: The wind ___ my hat away yesterday."
  },
  {
    "answer": "night",
    "wrong": [
      "knight",
      "nite"
    ],
    "clue": "Choose the sound-alike word: Stars shine at ___."
  },
  {
    "answer": "knight",
    "wrong": [
      "night",
      "nite"
    ],
    "clue": "Choose the sound-alike word: The ___ wore armour in the tale."
  }
];
export function buildQuestions(level, rng) {
  return wordQuestions(BANK, RULE, level, rng);
}
