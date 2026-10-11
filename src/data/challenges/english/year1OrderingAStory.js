import { readingQuestions } from "./year1Practice.js";

/** Year 1: "sequencing sentences to form short narratives".
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
    "title": "Growing a plant",
    "lines": [
      "First, Amara put a seed in a pot of soil.",
      "Next, she watered the soil each day.",
      "At last, a green shoot grew from the seed."
    ],
    "questions": [
      {
        "prompt": "What happened first?",
        "answer": "Amara put a seed in soil",
        "wrong": [
          "Amara saw a shoot",
          "Amara picked a flower"
        ],
        "line": 0,
        "evidencePrompt": "Tap the line about what happened first."
      },
      {
        "prompt": "What happened next?",
        "answer": "Amara watered the soil",
        "wrong": [
          "Amara ate the seed",
          "Amara hid the pot"
        ],
        "line": 1,
        "evidencePrompt": "Tap the line about what happened next."
      },
      {
        "prompt": "What happened at last?",
        "answer": "a shoot grew",
        "wrong": [
          "the pot broke",
          "a bird sang"
        ],
        "line": 2,
        "evidencePrompt": "Tap the line about what happened at last."
      }
    ],
    "order": [
      "First, Amara put a seed in a pot of soil.",
      "Next, she watered the soil each day.",
      "At last, a green shoot grew from the seed."
    ]
  },
  {
    "title": "A picnic",
    "lines": [
      "First, Leo packed food in a bag.",
      "Next, he took the bag to the park.",
      "At last, he sat on the grass and ate."
    ],
    "questions": [
      {
        "prompt": "What happened first?",
        "answer": "Leo packed the food",
        "wrong": [
          "Leo ate the food",
          "Leo sat on the grass"
        ],
        "line": 0,
        "evidencePrompt": "Tap the line about what happened first."
      },
      {
        "prompt": "What happened next?",
        "answer": "Leo went to the park",
        "wrong": [
          "Leo washed the bag",
          "Leo went to bed"
        ],
        "line": 1,
        "evidencePrompt": "Tap the line about what happened next."
      },
      {
        "prompt": "What happened at last?",
        "answer": "Leo ate on the grass",
        "wrong": [
          "Leo climbed a tree",
          "Leo bought a bag"
        ],
        "line": 2,
        "evidencePrompt": "Tap the line about what happened at last."
      }
    ],
    "order": [
      "First, Leo packed food in a bag.",
      "Next, he took the bag to the park.",
      "At last, he sat on the grass and ate."
    ]
  },
  {
    "title": "A paper boat",
    "lines": [
      "First, Priya folded paper into a boat.",
      "Next, she put the boat in a pond.",
      "At last, a breeze pushed the boat across the water."
    ],
    "questions": [
      {
        "prompt": "What happened first?",
        "answer": "Priya made the boat",
        "wrong": [
          "Priya lost the boat",
          "Priya went swimming"
        ],
        "line": 0,
        "evidencePrompt": "Tap the line about what happened first."
      },
      {
        "prompt": "What happened next?",
        "answer": "Priya put the boat in water",
        "wrong": [
          "Priya ate the paper",
          "Priya took a train"
        ],
        "line": 1,
        "evidencePrompt": "Tap the line about what happened next."
      },
      {
        "prompt": "What happened at last?",
        "answer": "the boat moved across the water",
        "wrong": [
          "the boat turned into a car",
          "the pond dried up"
        ],
        "line": 2,
        "evidencePrompt": "Tap the line about what happened at last."
      }
    ],
    "order": [
      "First, Priya folded paper into a boat.",
      "Next, she put the boat in a pond.",
      "At last, a breeze pushed the boat across the water."
    ]
  }
];
export function buildOrderingAStory(level, rng) {
  return readingQuestions(BANK, "A story has a start, something next, and an ending.", level, rng);
}
