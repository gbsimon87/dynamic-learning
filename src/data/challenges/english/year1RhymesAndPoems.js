import { readingQuestions } from "./year1Practice.js";

/** Year 1: "learning to appreciate rhymes and poems, and to recite some by heart".
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
    "title": "The cat and the hat",
    "lines": [
      "A little cat sat on a mat.",
      "It hid its paws beneath a hat.",
      "It saw the moon and gave a croon."
    ],
    "questions": [
      {
        "prompt": "Which word rhymes with cat?",
        "answer": "hat",
        "wrong": [
          "moon",
          "paws"
        ],
        "line": 1,
        "evidencePrompt": "Tap the line ending with a rhyme for cat."
      },
      {
        "prompt": "Which words rhyme in the last line?",
        "answer": "moon and croon",
        "wrong": [
          "saw and gave",
          "it and the"
        ],
        "line": 2,
        "evidencePrompt": "Tap the line with moon and its rhyme."
      },
      {
        "prompt": "Where did the cat sit?",
        "answer": "on a mat",
        "wrong": [
          "in a tree",
          "in a boat"
        ],
        "line": 0,
        "evidencePrompt": "Tap the line about where the cat sat."
      }
    ],
    "order": [
      "A little cat sat on a mat.",
      "It hid its paws beneath a hat.",
      "It saw the moon and gave a croon."
    ],
    "poem": true,
    "orderPrompt": "Put the poem’s lines in their printed order."
  },
  {
    "title": "A little boat",
    "lines": [
      "We set a little boat afloat.",
      "A duck swam past and brushed my coat.",
      "The sky was bright with golden light."
    ],
    "questions": [
      {
        "prompt": "Which word rhymes with boat?",
        "answer": "coat",
        "wrong": [
          "duck",
          "sky"
        ],
        "line": 1,
        "evidencePrompt": "Tap the line ending with a rhyme for boat."
      },
      {
        "prompt": "Which words rhyme in the last line?",
        "answer": "bright and light",
        "wrong": [
          "sky and golden",
          "the and with"
        ],
        "line": 2,
        "evidencePrompt": "Tap the line with bright and its rhyme."
      },
      {
        "prompt": "What did we set afloat?",
        "answer": "a boat",
        "wrong": [
          "a train",
          "a kite"
        ],
        "line": 0,
        "evidencePrompt": "Tap the line about what we set afloat."
      }
    ],
    "order": [
      "We set a little boat afloat.",
      "A duck swam past and brushed my coat.",
      "The sky was bright with golden light."
    ],
    "poem": true,
    "orderPrompt": "Put the poem’s lines in their printed order."
  },
  {
    "title": "The frog’s song",
    "lines": [
      "A green frog sat upon a log.",
      "It sang a tune beside a dog.",
      "A bee flew by up in the sky."
    ],
    "questions": [
      {
        "prompt": "Which word rhymes with log?",
        "answer": "dog",
        "wrong": [
          "tune",
          "bee"
        ],
        "line": 1,
        "evidencePrompt": "Tap the line ending with a rhyme for log."
      },
      {
        "prompt": "Which words rhyme in the last line?",
        "answer": "by and sky",
        "wrong": [
          "bee and flew",
          "up and the"
        ],
        "line": 2,
        "evidencePrompt": "Tap the line with by and its rhyme."
      },
      {
        "prompt": "Where did the frog sit?",
        "answer": "on a log",
        "wrong": [
          "on a chair",
          "in a box"
        ],
        "line": 0,
        "evidencePrompt": "Tap the line about where the frog sat."
      }
    ],
    "order": [
      "A green frog sat upon a log.",
      "It sang a tune beside a dog.",
      "A bee flew by up in the sky."
    ],
    "poem": true,
    "orderPrompt": "Put the poem’s lines in their printed order."
  }
];
export function buildRhymesAndPoems(level, rng) {
  return readingQuestions(BANK, "Rhyming words have the same ending sound. Read a poem aloud together.", level, rng);
}
