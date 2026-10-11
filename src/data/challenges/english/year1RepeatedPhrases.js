import { readingQuestions } from "./year1Practice.js";

/** Year 1: "recognising and joining in with predictable phrases".
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
    "title": "Tap tap tap",
    "lines": [
      "Leo tapped on the door. Tap tap tap!",
      "Amara tapped on the gate. Tap tap tap!",
      "Priya tapped on the desk. Tap tap tap!"
    ],
    "questions": [
      {
        "prompt": "Which phrase repeats?",
        "answer": "Tap tap tap!",
        "wrong": [
          "Open the gate!",
          "Run run run!"
        ],
        "line": 0,
        "evidencePrompt": "Tap the line about Leo and the repeated phrase."
      },
      {
        "prompt": "What did Amara tap?",
        "answer": "the gate",
        "wrong": [
          "the desk",
          "the door"
        ],
        "line": 1,
        "evidencePrompt": "Tap the line about Amara tapping."
      },
      {
        "prompt": "What did Priya tap?",
        "answer": "the desk",
        "wrong": [
          "the gate",
          "the door"
        ],
        "line": 2,
        "evidencePrompt": "Tap the line about Priya tapping."
      }
    ],
    "order": [
      "Leo tapped on the door. Tap tap tap!",
      "Amara tapped on the gate. Tap tap tap!",
      "Priya tapped on the desk. Tap tap tap!"
    ]
  },
  {
    "title": "Off we go",
    "lines": [
      "Zayn put on his coat. Off we go!",
      "Ellie packed the bag. Off we go!",
      "Biscuit ran to the gate. Off we go!"
    ],
    "questions": [
      {
        "prompt": "Which phrase repeats?",
        "answer": "Off we go!",
        "wrong": [
          "Here we stay!",
          "In we jump!"
        ],
        "line": 0,
        "evidencePrompt": "Tap the line about Zayn and the repeated phrase."
      },
      {
        "prompt": "Who packed the bag?",
        "answer": "Ellie",
        "wrong": [
          "Zayn",
          "Biscuit"
        ],
        "line": 1,
        "evidencePrompt": "Tap the line about packing the bag."
      },
      {
        "prompt": "Where did Biscuit run?",
        "answer": "to the gate",
        "wrong": [
          "to the desk",
          "to the pond"
        ],
        "line": 2,
        "evidencePrompt": "Tap the line about Biscuit running."
      }
    ],
    "order": [
      "Zayn put on his coat. Off we go!",
      "Ellie packed the bag. Off we go!",
      "Biscuit ran to the gate. Off we go!"
    ]
  },
  {
    "title": "One more step",
    "lines": [
      "Amara climbed past the first rock. One more step!",
      "Leo climbed past a small tree. One more step!",
      "Priya reached the top of the hill. No more steps!"
    ],
    "questions": [
      {
        "prompt": "Which phrase repeats in the first two lines?",
        "answer": "One more step!",
        "wrong": [
          "No more steps!",
          "One more tree!"
        ],
        "line": 0,
        "evidencePrompt": "Tap the first line with the repeated phrase."
      },
      {
        "prompt": "What did Leo pass?",
        "answer": "a small tree",
        "wrong": [
          "a big pond",
          "a red gate"
        ],
        "line": 1,
        "evidencePrompt": "Tap the line about Leo climbing."
      },
      {
        "prompt": "Why does the last phrase change?",
        "answer": "Priya reached the top",
        "wrong": [
          "Priya lost a shoe",
          "Priya went home"
        ],
        "line": 2,
        "evidencePrompt": "Tap the line explaining why no steps remain."
      }
    ],
    "order": [
      "Amara climbed past the first rock. One more step!",
      "Leo climbed past a small tree. One more step!",
      "Priya reached the top of the hill. No more steps!"
    ]
  }
];
export function buildRepeatedPhrases(level, rng) {
  return readingQuestions(BANK, "Look for words that come again. Join in with the repeated phrase.", level, rng);
}
