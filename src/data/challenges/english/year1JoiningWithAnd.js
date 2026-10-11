import { sentenceQuestions } from "./year1Practice.js";

/** Year 1: "joining words and joining clauses using and".
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
    "prompt": "Join both ideas using and.",
    "context": "Leo has a hat. Leo has a coat.",
    "answer": "Leo has a hat and a coat.",
    "wrong": [
      "Leo has a hat a coat.",
      "Leo has a hat or a coat."
    ],
    "caseSensitive": true,
    "speak": "Join both ideas using and.",
    "hint": "Keep both ideas. The joining word goes between them."
  },
  {
    "prompt": "Join both ideas using and.",
    "context": "We eat peas. We eat rice.",
    "answer": "We eat peas and rice.",
    "wrong": [
      "We eat peas rice.",
      "We eat peas or rice."
    ],
    "caseSensitive": true,
    "speak": "Join both ideas using and.",
    "hint": "Keep both ideas. The joining word goes between them."
  },
  {
    "prompt": "Join both ideas using and.",
    "context": "Amara has a pen. Amara has a book.",
    "answer": "Amara has a pen and a book.",
    "wrong": [
      "Amara has a pen a book.",
      "Amara has a pen or a book."
    ],
    "caseSensitive": true,
    "speak": "Join both ideas using and.",
    "hint": "Keep both ideas. The joining word goes between them."
  },
  {
    "prompt": "Join both ideas using and.",
    "context": "I see a cat. I see a dog.",
    "answer": "I see a cat and a dog.",
    "wrong": [
      "I see a cat a dog.",
      "I see a cat or a dog."
    ],
    "caseSensitive": true,
    "speak": "Join both ideas using and.",
    "hint": "Keep both ideas. The joining word goes between them."
  },
  {
    "prompt": "Join both ideas using and.",
    "context": "The flag is red. The flag is blue.",
    "answer": "The flag is red and blue.",
    "wrong": [
      "The flag is red blue.",
      "The flag is red or blue."
    ],
    "caseSensitive": true,
    "speak": "Join both ideas using and.",
    "hint": "Keep both ideas. The joining word goes between them."
  },
  {
    "prompt": "Join both ideas using and.",
    "context": "Priya likes cake. Priya likes pie.",
    "answer": "Priya likes cake and pie.",
    "wrong": [
      "Priya likes cake pie.",
      "Priya likes cake or pie."
    ],
    "caseSensitive": true,
    "speak": "Join both ideas using and.",
    "hint": "Keep both ideas. The joining word goes between them."
  },
  {
    "prompt": "Join both ideas using and.",
    "context": "Zayn packs socks. Zayn packs shoes.",
    "answer": "Zayn packs socks and shoes.",
    "wrong": [
      "Zayn packs socks shoes.",
      "Zayn packs socks or shoes."
    ],
    "caseSensitive": true,
    "speak": "Join both ideas using and.",
    "hint": "Keep both ideas. The joining word goes between them."
  },
  {
    "prompt": "Join both ideas using and.",
    "context": "We hear bells. We hear drums.",
    "answer": "We hear bells and drums.",
    "wrong": [
      "We hear bells drums.",
      "We hear bells or drums."
    ],
    "caseSensitive": true,
    "speak": "Join both ideas using and.",
    "hint": "Keep both ideas. The joining word goes between them."
  },
  {
    "prompt": "Join both ideas using and.",
    "context": "Leo runs. Amara jumps.",
    "answer": "Leo runs and Amara jumps.",
    "wrong": [
      "Leo runs Amara jumps.",
      "Leo runs or Amara jumps."
    ],
    "caseSensitive": true,
    "speak": "Join both ideas using and.",
    "hint": "Keep both ideas. The joining word goes between them."
  },
  {
    "prompt": "Join both ideas using and.",
    "context": "Priya sings. Zayn claps.",
    "answer": "Priya sings and Zayn claps.",
    "wrong": [
      "Priya sings Zayn claps.",
      "Priya sings or Zayn claps."
    ],
    "caseSensitive": true,
    "speak": "Join both ideas using and.",
    "hint": "Keep both ideas. The joining word goes between them."
  },
  {
    "prompt": "Join both ideas using and.",
    "context": "Ellie reads. Biscuit rests.",
    "answer": "Ellie reads and Biscuit rests.",
    "wrong": [
      "Ellie reads Biscuit rests.",
      "Ellie reads or Biscuit rests."
    ],
    "caseSensitive": true,
    "speak": "Join both ideas using and.",
    "hint": "Keep both ideas. The joining word goes between them."
  },
  {
    "prompt": "Join both ideas using and.",
    "context": "The sun shines. The bird sings.",
    "answer": "The sun shines and the bird sings.",
    "wrong": [
      "The sun shines the bird sings.",
      "The sun shines or the bird sings."
    ],
    "caseSensitive": true,
    "speak": "Join both ideas using and.",
    "hint": "Keep both ideas. The joining word goes between them."
  },
  {
    "prompt": "Join both ideas using and.",
    "context": "Mum cooks. Dad helps.",
    "answer": "Mum cooks and Dad helps.",
    "wrong": [
      "Mum cooks Dad helps.",
      "Mum cooks or Dad helps."
    ],
    "caseSensitive": true,
    "speak": "Join both ideas using and.",
    "hint": "Keep both ideas. The joining word goes between them."
  },
  {
    "prompt": "Join both ideas using and.",
    "context": "I paint. Leo draws.",
    "answer": "I paint and Leo draws.",
    "wrong": [
      "I paint Leo draws.",
      "I paint or Leo draws."
    ],
    "caseSensitive": true,
    "speak": "Join both ideas using and.",
    "hint": "Keep both ideas. The joining word goes between them."
  },
  {
    "prompt": "Join both ideas using and.",
    "context": "The cat sleeps. The dog plays.",
    "answer": "The cat sleeps and the dog plays.",
    "wrong": [
      "The cat sleeps the dog plays.",
      "The cat sleeps or the dog plays."
    ],
    "caseSensitive": true,
    "speak": "Join both ideas using and.",
    "hint": "Keep both ideas. The joining word goes between them."
  },
  {
    "prompt": "Join both ideas using and.",
    "context": "We plant seeds. We water them.",
    "answer": "We plant seeds and we water them.",
    "wrong": [
      "We plant seeds we water them.",
      "We plant seeds or we water them."
    ],
    "caseSensitive": true,
    "speak": "Join both ideas using and.",
    "hint": "Keep both ideas. The joining word goes between them."
  }
];
export function buildJoiningWithAnd(level, rng) {
  return sentenceQuestions(BANK, "And joins words or two ideas.", level, rng);
}
