import { sentenceQuestions } from "./year2Practice.js";

/** Checking and Improving Writing: see its mapping in docs/curriculum/year-2-english.md. */
export const RULE = "Re-read writing. Check that it makes sense, stays in the same tense and has correct spelling and punctuation.";
export const BANK = [
  {
    "prompt": "Correct the spelling in: I have a red bal.",
    "sentence": "___",
    "caseSensitive": true,
    "answer": "I have a red ball.",
    "wrong": [
      "I have a red bal.",
      "I have a red bowl."
    ]
  },
  {
    "prompt": "Add the missing capital letter and full stop: we went home",
    "sentence": "___",
    "caseSensitive": true,
    "answer": "We went home.",
    "wrong": [
      "we went home.",
      "We went home?"
    ]
  },
  {
    "prompt": "Keep the past tense: Yesterday we walked and play.",
    "sentence": "___",
    "caseSensitive": true,
    "answer": "Yesterday we walked and played.",
    "wrong": [
      "Yesterday we walked and play.",
      "Tomorrow we walk and play."
    ]
  },
  {
    "prompt": "Correct the spelling in: The baby cryed.",
    "sentence": "___",
    "caseSensitive": true,
    "answer": "The baby cried.",
    "wrong": [
      "The baby cryed.",
      "The baby tried."
    ]
  },
  {
    "prompt": "Add the missing question mark: Where is my hat",
    "sentence": "___",
    "caseSensitive": true,
    "answer": "Where is my hat?",
    "wrong": [
      "Where is my hat.",
      "where is my hat?"
    ]
  },
  {
    "prompt": "Use commas for the list: I packed socks hats and boots.",
    "sentence": "___",
    "caseSensitive": true,
    "answer": "I packed socks, hats and boots.",
    "wrong": [
      "I packed socks hats and boots.",
      "I packed socks, hats boots."
    ]
  },
  {
    "prompt": "Add the contraction apostrophe: I cant swim.",
    "sentence": "___",
    "caseSensitive": true,
    "answer": "I can't swim.",
    "wrong": [
      "I cant swim.",
      "I can swim."
    ]
  },
  {
    "prompt": "Show that the bag belongs to one girl: The girls bag is blue.",
    "sentence": "___",
    "caseSensitive": true,
    "answer": "The girl's bag is blue.",
    "wrong": [
      "The girls bag is blue.",
      "The girls' bag is blue."
    ]
  },
  {
    "prompt": "Keep the past tense: We saw a bird and wave.",
    "sentence": "___",
    "caseSensitive": true,
    "answer": "We saw a bird and waved.",
    "wrong": [
      "We saw a bird and wave.",
      "We see a bird and wave."
    ]
  },
  {
    "prompt": "Correct the word for hearing: I can here the bell.",
    "sentence": "___",
    "caseSensitive": true,
    "answer": "I can hear the bell.",
    "wrong": [
      "I can here the bell.",
      "I cannot hear the bell."
    ]
  },
  {
    "prompt": "Correct the spelling in: Amara is runing.",
    "sentence": "___",
    "caseSensitive": true,
    "answer": "Amara is running.",
    "wrong": [
      "Amara is runing.",
      "Amara is resting."
    ]
  },
  {
    "prompt": "Add an exclamation mark to: What a huge dog it is",
    "sentence": "___",
    "caseSensitive": true,
    "answer": "What a huge dog it is!",
    "wrong": [
      "What a huge dog it is?",
      "what a huge dog it is!"
    ]
  },
  {
    "prompt": "Keep the present tense: Every day I walk and talked.",
    "sentence": "___",
    "caseSensitive": true,
    "answer": "Every day I walk and talk.",
    "wrong": [
      "Every day I walk and talked.",
      "Yesterday I walked and talked."
    ]
  },
  {
    "prompt": "Correct the spelling in: The monky is climbing.",
    "sentence": "___",
    "caseSensitive": true,
    "answer": "The monkey is climbing.",
    "wrong": [
      "The monky is climbing.",
      "The donkey is climbing."
    ]
  },
  {
    "prompt": "Make sense: The fish swims in the sky. Keep the fish swimming.",
    "sentence": "___",
    "caseSensitive": true,
    "answer": "The fish swims in the pond.",
    "wrong": [
      "The fish swims in the sky.",
      "The fish flies in the sky."
    ]
  }
];
export function buildQuestions(level, rng) {
  return sentenceQuestions(BANK, RULE, level, rng);
}
