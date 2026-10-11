import { readingQuestions } from "./year1Practice.js";

/** Year 1: "discussing word meanings, linking new meanings to those already known".
 * Source: docs/curriculum/year-1-english.md and english-appendix-1-year-1.md.
 * 1 supported choice; 2 independent choice; 3 whole-structure work; 4 applied building/spelling.
 */
export const TITLES = [
  "Read with a clue.",
  "Read and think.",
  "Find the line.",
  "Put it all together."
];
export const BANK = [
  {
    "title": "A tiny shell",
    "lines": [
      "Ellie found a tiny shell, smaller than her thumb.",
      "She put it in a pouch, a little cloth bag.",
      "She strolled home, taking slow steps."
    ],
    "questions": [
      {
        "prompt": "What does tiny mean here?",
        "answer": "very small",
        "wrong": [
          "very loud",
          "very tall"
        ],
        "line": 0,
        "evidencePrompt": "Tap the line that explains tiny."
      },
      {
        "prompt": "What is a pouch?",
        "answer": "a little bag",
        "wrong": [
          "a tall tree",
          "a long road"
        ],
        "line": 1,
        "evidencePrompt": "Tap the line that explains pouch."
      },
      {
        "prompt": "What does strolled mean here?",
        "answer": "walked slowly",
        "wrong": [
          "ran fast",
          "jumped high"
        ],
        "line": 2,
        "evidencePrompt": "Tap the line that explains strolled."
      }
    ],
    "order": [
      "Ellie found a tiny shell, smaller than her thumb.",
      "She put it in a pouch, a little cloth bag.",
      "She strolled home, taking slow steps."
    ]
  },
  {
    "title": "The damp coat",
    "lines": [
      "Leo came in with a damp coat, wet from rain.",
      "Mum hung it on a peg, a hook on the wall.",
      "The coat dried near the warm fire."
    ],
    "questions": [
      {
        "prompt": "What does damp mean here?",
        "answer": "a bit wet",
        "wrong": [
          "very hot",
          "very old"
        ],
        "line": 0,
        "evidencePrompt": "Tap the line that explains damp."
      },
      {
        "prompt": "What is a peg here?",
        "answer": "a wall hook",
        "wrong": [
          "a soft hat",
          "a small cake"
        ],
        "line": 1,
        "evidencePrompt": "Tap the line that explains peg."
      },
      {
        "prompt": "What does dried mean here?",
        "answer": "became less wet",
        "wrong": [
          "became more wet",
          "became much bigger"
        ],
        "line": 2,
        "evidencePrompt": "Tap the line about the coat drying."
      }
    ],
    "order": [
      "Leo came in with a damp coat, wet from rain.",
      "Mum hung it on a peg, a hook on the wall.",
      "The coat dried near the warm fire."
    ]
  },
  {
    "title": "The dim shed",
    "lines": [
      "The shed was dim, with very little light.",
      "Zayn saw a heap of sacks, piled on each other.",
      "He lifted a sack. It was heavy and hard to lift."
    ],
    "questions": [
      {
        "prompt": "What does dim mean here?",
        "answer": "not very bright",
        "wrong": [
          "very noisy",
          "very warm"
        ],
        "line": 0,
        "evidencePrompt": "Tap the line that explains dim."
      },
      {
        "prompt": "What does heap mean here?",
        "answer": "a pile",
        "wrong": [
          "a hole",
          "a tree"
        ],
        "line": 1,
        "evidencePrompt": "Tap the line that explains heap."
      },
      {
        "prompt": "What does heavy mean here?",
        "answer": "hard to lift",
        "wrong": [
          "easy to lift",
          "easy to see"
        ],
        "line": 2,
        "evidencePrompt": "Tap the line that explains heavy."
      }
    ],
    "order": [
      "The shed was dim, with very little light.",
      "Zayn saw a heap of sacks, piled on each other.",
      "He lifted a sack. It was heavy and hard to lift."
    ]
  }
];
export function buildWhatWordsMean(level, rng) {
  return readingQuestions(BANK, "Use the other words in the sentence to help find a meaning.", level, rng);
}
