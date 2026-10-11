import { readingQuestions } from "./year1Practice.js";

/** Year 1: "discussing the significance of the title and events".
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
    "title": "The lost hat",
    "lines": [
      "Leo could not find his red hat.",
      "Amara saw something red under a bench.",
      "She picked up the hat and gave it to Leo."
    ],
    "questions": [
      {
        "prompt": "Why is the title The lost hat?",
        "answer": "Leo cannot find his hat",
        "wrong": [
          "Leo bakes a cake",
          "Leo plants a seed"
        ],
        "line": 0,
        "evidencePrompt": "Tap the line that explains the title."
      },
      {
        "prompt": "Where was the hat?",
        "answer": "under a bench",
        "wrong": [
          "in a pond",
          "on a bus"
        ],
        "line": 1,
        "evidencePrompt": "Tap the line that shows where the hat was."
      },
      {
        "prompt": "What solved the problem?",
        "answer": "Amara gave Leo his hat",
        "wrong": [
          "Leo went home",
          "Amara bought a coat"
        ],
        "line": 2,
        "evidencePrompt": "Tap the line that solves the problem."
      }
    ],
    "order": [
      "Leo could not find his red hat.",
      "Amara saw something red under a bench.",
      "She picked up the hat and gave it to Leo."
    ]
  },
  {
    "title": "The tall tower",
    "lines": [
      "Priya built a tower with blocks.",
      "Zayn put one more block on top. The tower fell.",
      "They built it again with a wider base."
    ],
    "questions": [
      {
        "prompt": "Why does the title mention a tower?",
        "answer": "Priya builds a tower",
        "wrong": [
          "Priya buys a book",
          "Priya rides a horse"
        ],
        "line": 0,
        "evidencePrompt": "Tap the line that explains the title."
      },
      {
        "prompt": "What happened after the extra block?",
        "answer": "the tower fell",
        "wrong": [
          "the tower flew",
          "the tower sang"
        ],
        "line": 1,
        "evidencePrompt": "Tap the line about the extra block."
      },
      {
        "prompt": "How did they change the tower?",
        "answer": "they made a wider base",
        "wrong": [
          "they used no blocks",
          "they put it in water"
        ],
        "line": 2,
        "evidencePrompt": "Tap the line about the new tower."
      }
    ],
    "order": [
      "Priya built a tower with blocks.",
      "Zayn put one more block on top. The tower fell.",
      "They built it again with a wider base."
    ]
  },
  {
    "title": "A gift for Biscuit",
    "lines": [
      "Ellie made a ball from an old sock.",
      "She gave the ball to Biscuit.",
      "Biscuit ran after the ball and wagged his tail."
    ],
    "questions": [
      {
        "prompt": "What was the gift?",
        "answer": "a ball",
        "wrong": [
          "a cake",
          "a coat"
        ],
        "line": 0,
        "evidencePrompt": "Tap the line about what Ellie made."
      },
      {
        "prompt": "Who got the gift?",
        "answer": "Biscuit",
        "wrong": [
          "Zayn",
          "Leo"
        ],
        "line": 1,
        "evidencePrompt": "Tap the line about who got the gift."
      },
      {
        "prompt": "What did Biscuit do?",
        "answer": "he ran after the ball",
        "wrong": [
          "he read a book",
          "he shut the gate"
        ],
        "line": 2,
        "evidencePrompt": "Tap the line about Biscuit playing."
      }
    ],
    "order": [
      "Ellie made a ball from an old sock.",
      "She gave the ball to Biscuit.",
      "Biscuit ran after the ball and wagged his tail."
    ]
  }
];
export function buildTitlesAndEvents(level, rng) {
  return readingQuestions(BANK, "A title gives a clue about the main event.", level, rng);
}
