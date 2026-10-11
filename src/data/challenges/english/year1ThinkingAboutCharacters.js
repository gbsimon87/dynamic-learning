import { readingQuestions } from "./year1Practice.js";

/** Year 1: "making inferences on the basis of what is being said and done".
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
    "title": "A kind friend",
    "lines": [
      "Leo dropped his books and looked down.",
      "Amara stopped her game to help him pick them up.",
      "Leo smiled and thanked her."
    ],
    "questions": [
      {
        "prompt": "How did Leo feel at first?",
        "answer": "upset",
        "wrong": [
          "excited",
          "sleepy"
        ],
        "line": 0,
        "evidencePrompt": "Tap the line that shows Leo’s problem."
      },
      {
        "prompt": "What shows Amara was kind?",
        "answer": "she stopped to help",
        "wrong": [
          "she hid the books",
          "she laughed at Leo"
        ],
        "line": 1,
        "evidencePrompt": "Tap the line that shows Amara being kind."
      },
      {
        "prompt": "How did Leo feel at the end?",
        "answer": "glad",
        "wrong": [
          "angry",
          "afraid"
        ],
        "line": 2,
        "evidencePrompt": "Tap the line that shows Leo’s thanks."
      }
    ],
    "order": [
      "Leo dropped his books and looked down.",
      "Amara stopped her game to help him pick them up.",
      "Leo smiled and thanked her."
    ]
  },
  {
    "title": "The dark shed",
    "lines": [
      "Priya paused at the dark shed and held Mum’s hand.",
      "Mum put on a light and stayed beside her.",
      "Priya let go of Mum’s hand and went inside."
    ],
    "questions": [
      {
        "prompt": "How did Priya feel at first?",
        "answer": "afraid",
        "wrong": [
          "cross",
          "bored"
        ],
        "line": 0,
        "evidencePrompt": "Tap the line that shows Priya feeling afraid."
      },
      {
        "prompt": "What did Mum do to help?",
        "answer": "she stayed and lit the shed",
        "wrong": [
          "she shut Priya out",
          "she hid the light"
        ],
        "line": 1,
        "evidencePrompt": "Tap the line that shows Mum helping."
      },
      {
        "prompt": "How did Priya feel at the end?",
        "answer": "safer",
        "wrong": [
          "more afraid",
          "angry with Mum"
        ],
        "line": 2,
        "evidencePrompt": "Tap the line that shows Priya going inside."
      }
    ],
    "order": [
      "Priya paused at the dark shed and held Mum’s hand.",
      "Mum put on a light and stayed beside her.",
      "Priya let go of Mum’s hand and went inside."
    ]
  },
  {
    "title": "A game for two",
    "lines": [
      "Zayn sat alone and watched a game.",
      "Ellie waved him over and gave him a bat.",
      "Zayn grinned and joined the game."
    ],
    "questions": [
      {
        "prompt": "What was Zayn doing at first?",
        "answer": "watching on his own",
        "wrong": [
          "playing with Ellie",
          "sleeping at home"
        ],
        "line": 0,
        "evidencePrompt": "Tap the line about Zayn being alone."
      },
      {
        "prompt": "What shows Ellie welcomed him?",
        "answer": "she gave him a bat",
        "wrong": [
          "she took his coat",
          "she hid the ball"
        ],
        "line": 1,
        "evidencePrompt": "Tap the line about Ellie welcoming Zayn."
      },
      {
        "prompt": "How did Zayn feel when he joined?",
        "answer": "happy",
        "wrong": [
          "sad",
          "worried"
        ],
        "line": 2,
        "evidencePrompt": "Tap the line that shows Zayn feeling happy."
      }
    ],
    "order": [
      "Zayn sat alone and watched a game.",
      "Ellie waved him over and gave him a bat.",
      "Zayn grinned and joined the game."
    ]
  }
];
export function buildThinkingAboutCharacters(level, rng) {
  return readingQuestions(BANK, "What people say and do gives clues to their feelings.", level, rng);
}
