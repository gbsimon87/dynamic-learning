import { readingQuestions } from "./year1Practice.js";

/** Year 1: "predicting what might happen on the basis of what has been read so far".
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
    "title": "Dark clouds",
    "lines": [
      "Amara packed a picnic and went to the park.",
      "Dark clouds came over the park.",
      "Amara felt drops on her hand and took out an umbrella."
    ],
    "questions": [
      {
        "prompt": "What was Amara planning?",
        "answer": "a picnic",
        "wrong": [
          "a swim",
          "a train ride"
        ],
        "line": 0,
        "evidencePrompt": "Tap the line about Amara’s plan."
      },
      {
        "prompt": "What might the clouds bring?",
        "answer": "rain",
        "wrong": [
          "a sunny night",
          "a snowman"
        ],
        "line": 1,
        "evidencePrompt": "Tap the line with a clue about the weather."
      },
      {
        "prompt": "What will Amara most likely do next?",
        "answer": "open the umbrella",
        "wrong": [
          "put the umbrella away",
          "sit down with no cover"
        ],
        "line": 2,
        "evidencePrompt": "Tap the line that helps predict Amara’s next action."
      }
    ],
    "order": [
      "Amara packed a picnic and went to the park.",
      "Dark clouds came over the park.",
      "Amara felt drops on her hand and took out an umbrella."
    ]
  },
  {
    "title": "The hungry dog",
    "lines": [
      "Ellie came home with Biscuit.",
      "Biscuit sniffed his empty bowl.",
      "Ellie picked up his food and put it in the bowl."
    ],
    "questions": [
      {
        "prompt": "Who came home with Ellie?",
        "answer": "Biscuit",
        "wrong": [
          "a hen",
          "a goat"
        ],
        "line": 0,
        "evidencePrompt": "Tap the line about who came home."
      },
      {
        "prompt": "Why might Biscuit sniff the bowl?",
        "answer": "he is hungry",
        "wrong": [
          "he wants to read",
          "he wants a hat"
        ],
        "line": 1,
        "evidencePrompt": "Tap the line with a clue about Biscuit being hungry."
      },
      {
        "prompt": "What will Biscuit most likely do next?",
        "answer": "eat his food",
        "wrong": [
          "leave the full bowl",
          "go back outside"
        ],
        "line": 2,
        "evidencePrompt": "Tap the line that helps predict Biscuit’s next action."
      }
    ],
    "order": [
      "Ellie came home with Biscuit.",
      "Biscuit sniffed his empty bowl.",
      "Ellie picked up his food and put it in the bowl."
    ]
  },
  {
    "title": "The loose wheel",
    "lines": [
      "Leo sent his toy car down a ramp.",
      "The car stopped. One wheel was loose.",
      "Zayn brought a tool and sat beside the car."
    ],
    "questions": [
      {
        "prompt": "What did Leo send down the ramp?",
        "answer": "a toy car",
        "wrong": [
          "a toy boat",
          "a ball"
        ],
        "line": 0,
        "evidencePrompt": "Tap the line about Leo’s toy."
      },
      {
        "prompt": "Why might the car have stopped?",
        "answer": "a wheel was loose",
        "wrong": [
          "it grew wings",
          "it was hungry"
        ],
        "line": 1,
        "evidencePrompt": "Tap the line with a clue about the problem."
      },
      {
        "prompt": "What will Zayn most likely do next?",
        "answer": "fix the wheel",
        "wrong": [
          "put the tool away",
          "ride the broken car"
        ],
        "line": 2,
        "evidencePrompt": "Tap the line that helps predict Zayn’s next action."
      }
    ],
    "order": [
      "Leo sent his toy car down a ramp.",
      "The car stopped. One wheel was loose.",
      "Zayn brought a tool and sat beside the car."
    ]
  }
];
export function buildWhatHappensNext(level, rng) {
  return readingQuestions(BANK, "Use clues in the story to say what might happen next.", level, rng);
}
