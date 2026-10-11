import { readingQuestions } from "./year1Practice.js";

/** Year 1: "becoming very familiar with key stories, fairy stories and traditional tales, retelling them and considering their particular characteristics".
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
    "title": "The three goats",
    "lines": [
      "A small goat crossed a bridge. A troll stopped him.",
      "The small goat said a bigger goat would come.",
      "The biggest goat came last and sent the troll away."
    ],
    "questions": [
      {
        "prompt": "Who stopped the small goat?",
        "answer": "a troll",
        "wrong": [
          "a duck",
          "a fox"
        ],
        "line": 0,
        "evidencePrompt": "Tap the line about who stopped the goat."
      },
      {
        "prompt": "What did the small goat say?",
        "answer": "a bigger goat would come",
        "wrong": [
          "the bridge was gone",
          "the troll was asleep"
        ],
        "line": 1,
        "evidencePrompt": "Tap the line with the small goat’s words."
      },
      {
        "prompt": "Who came last?",
        "answer": "the biggest goat",
        "wrong": [
          "the small goat",
          "the troll"
        ],
        "line": 2,
        "evidencePrompt": "Tap the line about who came last."
      }
    ],
    "order": [
      "A small goat crossed a bridge. A troll stopped him.",
      "The small goat said a bigger goat would come.",
      "The biggest goat came last and sent the troll away."
    ]
  },
  {
    "title": "The little red hen",
    "lines": [
      "A hen asked for help to plant some seeds. No one helped.",
      "The hen grew wheat and made bread on her own.",
      "When the bread was done, the hen ate it herself."
    ],
    "questions": [
      {
        "prompt": "What did the hen ask for?",
        "answer": "help to plant seeds",
        "wrong": [
          "help to find a coat",
          "help to cross a bridge"
        ],
        "line": 0,
        "evidencePrompt": "Tap the line about what the hen asked for."
      },
      {
        "prompt": "What did the hen make?",
        "answer": "bread",
        "wrong": [
          "soup",
          "a hat"
        ],
        "line": 1,
        "evidencePrompt": "Tap the line about what the hen made."
      },
      {
        "prompt": "Who ate the bread?",
        "answer": "the hen",
        "wrong": [
          "a troll",
          "a goat"
        ],
        "line": 2,
        "evidencePrompt": "Tap the line about who ate the bread."
      }
    ],
    "order": [
      "A hen asked for help to plant some seeds. No one helped.",
      "The hen grew wheat and made bread on her own.",
      "When the bread was done, the hen ate it herself."
    ]
  },
  {
    "title": "The lost mitten",
    "lines": [
      "A mouse found a lost mitten in the snow.",
      "A frog joined the mouse in the warm mitten.",
      "A big bear tried to fit inside. The mitten split."
    ],
    "questions": [
      {
        "prompt": "What did the mouse find?",
        "answer": "a mitten",
        "wrong": [
          "a shoe",
          "a shell"
        ],
        "line": 0,
        "evidencePrompt": "Tap the line about what the mouse found."
      },
      {
        "prompt": "Who joined the mouse?",
        "answer": "a frog",
        "wrong": [
          "a goat",
          "a hen"
        ],
        "line": 1,
        "evidencePrompt": "Tap the line about who joined the mouse."
      },
      {
        "prompt": "What happened to the mitten?",
        "answer": "it split",
        "wrong": [
          "it flew away",
          "it turned into bread"
        ],
        "line": 2,
        "evidencePrompt": "Tap the line about what happened to the mitten."
      }
    ],
    "order": [
      "A mouse found a lost mitten in the snow.",
      "A frog joined the mouse in the warm mitten.",
      "A big bear tried to fit inside. The mitten split."
    ]
  }
];
export function buildTraditionalTales(level, rng) {
  return readingQuestions(BANK, "A tale often has repeated events and an ending.", level, rng);
}
