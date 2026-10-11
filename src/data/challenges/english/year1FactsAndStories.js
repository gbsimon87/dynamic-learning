import { readingQuestions } from "./year1Practice.js";

/** Year 1: "listening to and discussing a wide range of poems, stories and non-fiction".
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
    "title": "Dogs: fact and story",
    "lines": [
      "Fact: Dogs have a strong sense of smell. They sniff.",
      "Story: Biscuit sniffed a box. He found Ellie’s red sock.",
      "Ellie laughed and put the sock away."
    ],
    "questions": [
      {
        "prompt": "Which line teaches a fact about dogs?",
        "answer": "Dogs have a strong sense of smell.",
        "wrong": [
          "Biscuit found Ellie’s red sock.",
          "Ellie put the sock away."
        ],
        "line": 0,
        "evidencePrompt": "Tap the line that teaches a fact about dogs."
      },
      {
        "prompt": "What did Biscuit find in the story?",
        "answer": "a red sock",
        "wrong": [
          "a blue hat",
          "a green cup"
        ],
        "line": 1,
        "evidencePrompt": "Tap the line about what Biscuit found."
      },
      {
        "prompt": "What happened at the end of the story?",
        "answer": "Ellie put the sock away",
        "wrong": [
          "Biscuit planted a seed",
          "Ellie rode a bike"
        ],
        "line": 2,
        "evidencePrompt": "Tap the line about the story’s ending."
      }
    ],
    "order": [
      "Fact: Dogs have a strong sense of smell. They sniff.",
      "Story: Biscuit sniffed a box. He found Ellie’s red sock.",
      "Ellie laughed and put the sock away."
    ]
  },
  {
    "title": "Seeds: fact and story",
    "lines": [
      "Fact: A seed needs water to grow into a plant.",
      "Story: Priya planted a seed and watered it each day.",
      "One day Priya saw a little green shoot."
    ],
    "questions": [
      {
        "prompt": "Which line teaches a fact about seeds?",
        "answer": "A seed needs water to grow.",
        "wrong": [
          "Priya planted a seed.",
          "Priya saw a little shoot."
        ],
        "line": 0,
        "evidencePrompt": "Tap the line that teaches a fact about seeds."
      },
      {
        "prompt": "What did Priya do each day?",
        "answer": "watered the seed",
        "wrong": [
          "painted the seed",
          "hid the seed"
        ],
        "line": 1,
        "evidencePrompt": "Tap the line about Priya’s daily action."
      },
      {
        "prompt": "What did Priya see at the end?",
        "answer": "a green shoot",
        "wrong": [
          "a red ball",
          "a blue cup"
        ],
        "line": 2,
        "evidencePrompt": "Tap the line about the story’s ending."
      }
    ],
    "order": [
      "Fact: A seed needs water to grow into a plant.",
      "Story: Priya planted a seed and watered it each day.",
      "One day Priya saw a little green shoot."
    ]
  },
  {
    "title": "Birds: fact and story",
    "lines": [
      "Fact: Birds have feathers. Many birds can fly.",
      "Story: Leo saw a robin on a fence.",
      "The robin flapped its wings and flew to a tree."
    ],
    "questions": [
      {
        "prompt": "Which line teaches a fact about birds?",
        "answer": "Birds have feathers.",
        "wrong": [
          "Leo saw a robin.",
          "The robin flew to a tree."
        ],
        "line": 0,
        "evidencePrompt": "Tap the line that teaches a fact about birds."
      },
      {
        "prompt": "Where did Leo first see the robin?",
        "answer": "on a fence",
        "wrong": [
          "in a pond",
          "on a train"
        ],
        "line": 1,
        "evidencePrompt": "Tap the line about where Leo saw the robin."
      },
      {
        "prompt": "Where did the robin go?",
        "answer": "to a tree",
        "wrong": [
          "to a cave",
          "to a shed"
        ],
        "line": 2,
        "evidencePrompt": "Tap the line about the robin’s flight."
      }
    ],
    "order": [
      "Fact: Birds have feathers. Many birds can fly.",
      "Story: Leo saw a robin on a fence.",
      "The robin flapped its wings and flew to a tree."
    ]
  }
];
export function buildFactsAndStories(level, rng) {
  return readingQuestions(BANK, "A fact text teaches about the world. A story tells what happens.", level, rng);
}
