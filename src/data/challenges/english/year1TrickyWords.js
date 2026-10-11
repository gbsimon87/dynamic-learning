import { spellingQuestions } from "./year1Practice.js";

/** Year 1: "read common exception words, noting unusual correspondences between spelling and sound and where these occur in the word · spell: common exception words".
 * Source: docs/curriculum/year-1-english.md and english-appendix-1-year-1.md.
 * 1 supported choice; 2 independent choice; 3 whole-structure work; 4 applied building/spelling.
 */
export const TITLES = [
  "Read the clue.",
  "Try without the rule.",
  "Build it with tiles.",
  "Use what you know."
];
export const BANK = [
  {
    "answer": "said",
    "pattern": "ai",
    "picture": "💬",
    "sentence": "Mum ___ hello to me.",
    "prompt": "Spell the missing word.",
    "speak": "said. Mum said hello to me.",
    "wrong": [
      "sed",
      "sai"
    ],
    "hint": "It has 4 letters. Listen for each part."
  },
  {
    "answer": "says",
    "pattern": "ay",
    "picture": "💬",
    "sentence": "Leo ___ hello each day.",
    "prompt": "Spell the missing word.",
    "speak": "says. Leo says hello each day.",
    "wrong": [
      "sez",
      "say"
    ],
    "hint": "It has 4 letters. Listen for each part."
  },
  {
    "answer": "was",
    "pattern": "a",
    "picture": "📅",
    "sentence": "Yesterday it ___ cold.",
    "prompt": "Spell the missing word.",
    "speak": "was. Yesterday it was cold.",
    "wrong": [
      "woz",
      "wa"
    ],
    "hint": "It has 3 letters. Listen for each part."
  },
  {
    "answer": "were",
    "pattern": "e",
    "picture": "👫",
    "sentence": "Yesterday we ___ at school.",
    "prompt": "Spell the missing word.",
    "speak": "were. Yesterday we were at school.",
    "wrong": [
      "wer",
      "weree"
    ],
    "hint": "It has 4 letters. Listen for each part."
  },
  {
    "answer": "one",
    "pattern": "o",
    "picture": "1️⃣",
    "sentence": "I have just ___ apple.",
    "prompt": "Spell the missing word.",
    "speak": "one. I have just one apple.",
    "wrong": [
      "wun",
      "on"
    ],
    "hint": "It has 3 letters. Listen for each part."
  },
  {
    "answer": "friend",
    "pattern": "ie",
    "picture": "🤝",
    "sentence": "Amara is my ___.",
    "prompt": "Spell the missing word.",
    "speak": "friend. Amara is my friend.",
    "wrong": [
      "frend",
      "frien"
    ],
    "hint": "It has 6 letters. Listen for each part."
  },
  {
    "answer": "school",
    "pattern": "oo",
    "picture": "🏫",
    "sentence": "We learn at ___.",
    "prompt": "Spell the missing word.",
    "speak": "school. We learn at school.",
    "wrong": [
      "skool",
      "schoo"
    ],
    "hint": "It has 6 letters. Listen for each part."
  },
  {
    "answer": "house",
    "pattern": "ou",
    "picture": "🏠",
    "sentence": "We live in a ___.",
    "prompt": "Spell the missing word.",
    "speak": "house. We live in a house.",
    "wrong": [
      "hous",
      "housee"
    ],
    "hint": "It has 5 letters. Listen for each part."
  },
  {
    "answer": "love",
    "pattern": "o",
    "picture": "❤️",
    "sentence": "I ___ my family.",
    "prompt": "Spell the missing word.",
    "speak": "love. I love my family.",
    "wrong": [
      "luv",
      "lov"
    ],
    "hint": "It has 4 letters. Listen for each part."
  },
  {
    "answer": "come",
    "pattern": "o",
    "picture": "👋",
    "sentence": "Please ___ here to me.",
    "prompt": "Spell the missing word.",
    "speak": "come. Please come here to me.",
    "wrong": [
      "cum",
      "com"
    ],
    "hint": "It has 4 letters. Listen for each part."
  },
  {
    "answer": "some",
    "pattern": "o",
    "picture": "🍎",
    "sentence": "I have ___ apples.",
    "prompt": "Spell the missing word.",
    "speak": "some. I have some apples.",
    "wrong": [
      "sum",
      "som"
    ],
    "hint": "It has 4 letters. Listen for each part."
  },
  {
    "answer": "push",
    "pattern": "u",
    "picture": "👐",
    "sentence": "I ___ the door away from me.",
    "prompt": "Spell the missing word.",
    "speak": "push. I push the door away from me.",
    "wrong": [
      "poosh",
      "pus"
    ],
    "hint": "It has 4 letters. Listen for each part."
  },
  {
    "answer": "pull",
    "pattern": "u",
    "picture": "🤲",
    "sentence": "I ___ the door towards me.",
    "prompt": "Spell the missing word.",
    "speak": "pull. I pull the door towards me.",
    "wrong": [
      "pool",
      "pul"
    ],
    "hint": "It has 4 letters. Listen for each part."
  },
  {
    "answer": "full",
    "pattern": "u",
    "picture": "🥛",
    "sentence": "This cup is ___ to the top.",
    "prompt": "Spell the missing word.",
    "speak": "full. This cup is full to the top.",
    "wrong": [
      "ful",
      "fulll"
    ],
    "hint": "It has 4 letters. Listen for each part."
  },
  {
    "answer": "today",
    "pattern": "ay",
    "picture": "📅",
    "sentence": "Yesterday has gone. Now it is ___.",
    "prompt": "Spell the missing word.",
    "speak": "today. Yesterday has gone. Now it is today.",
    "wrong": [
      "tuday",
      "toda"
    ],
    "hint": "It has 5 letters. Listen for each part."
  },
  {
    "answer": "where",
    "pattern": "e",
    "picture": "🗺️",
    "sentence": "Tell me ___ you live.",
    "prompt": "Spell the missing word.",
    "speak": "where. Tell me where you live.",
    "wrong": [
      "wair",
      "wher"
    ],
    "hint": "It has 5 letters. Listen for each part."
  }
];
export function buildTrickyWords(level, rng) {
  const questions = spellingQuestions(BANK, "Some parts of these words do not sound as you expect.", level, rng);
  if (level <= 2) for (const q of questions) {
    q.prompt = "Read the clue. Choose the word.";
    q.speak = q.prompt;
  }
  return questions;
}
