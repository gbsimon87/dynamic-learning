import { sentenceQuestions } from "./year1Practice.js";

/** Year 1: "re-reading what they have written to check that it makes sense".
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
    "prompt": "Which sentence makes sense and matches the idea?",
    "context": "Amara gives food to a cat.",
    "answer": "Amara feeds the cat.",
    "wrong": [
      "feeds Amara the cat.",
      "feeds the cat. Amara"
    ],
    "caseSensitive": true,
    "speak": "Read the sentences again. Which one makes sense?",
    "hint": "Who does the action? Read from the beginning."
  },
  {
    "prompt": "Which sentence makes sense and matches the idea?",
    "context": "Leo uses his foot to kick a ball.",
    "answer": "Leo kicks the ball.",
    "wrong": [
      "kicks Leo the ball.",
      "kicks the ball. Leo"
    ],
    "caseSensitive": true,
    "speak": "Read the sentences again. Which one makes sense?",
    "hint": "Who does the action? Read from the beginning."
  },
  {
    "prompt": "Which sentence makes sense and matches the idea?",
    "context": "Priya looks at words in a book.",
    "answer": "Priya reads a book.",
    "wrong": [
      "reads Priya a book.",
      "reads a book. Priya"
    ],
    "caseSensitive": true,
    "speak": "Read the sentences again. Which one makes sense?",
    "hint": "Who does the action? Read from the beginning."
  },
  {
    "prompt": "Which sentence makes sense and matches the idea?",
    "context": "Zayn closes a gate.",
    "answer": "Zayn shuts the gate.",
    "wrong": [
      "shuts Zayn the gate.",
      "shuts the gate. Zayn"
    ],
    "caseSensitive": true,
    "speak": "Read the sentences again. Which one makes sense?",
    "hint": "Who does the action? Read from the beginning."
  },
  {
    "prompt": "Which sentence makes sense and matches the idea?",
    "context": "Ellie gives Biscuit a hug.",
    "answer": "Ellie hugs Biscuit.",
    "wrong": [
      "hugs Ellie Biscuit.",
      "hugs Biscuit. Ellie"
    ],
    "caseSensitive": true,
    "speak": "Read the sentences again. Which one makes sense?",
    "hint": "Who does the action? Read from the beginning."
  },
  {
    "prompt": "Which sentence makes sense and matches the idea?",
    "context": "Biscuit moves his tail.",
    "answer": "Biscuit wags his tail.",
    "wrong": [
      "wags Biscuit his tail.",
      "wags his tail. Biscuit"
    ],
    "caseSensitive": true,
    "speak": "Read the sentences again. Which one makes sense?",
    "hint": "Who does the action? Read from the beginning."
  },
  {
    "prompt": "Which sentence makes sense and matches the idea?",
    "context": "A frog jumps upwards.",
    "answer": "The frog jumps up.",
    "wrong": [
      "frog The jumps up.",
      "frog jumps up. The"
    ],
    "caseSensitive": true,
    "speak": "Read the sentences again. Which one makes sense?",
    "hint": "Who does the action? Read from the beginning."
  },
  {
    "prompt": "Which sentence makes sense and matches the idea?",
    "context": "A bird makes a tune.",
    "answer": "The bird sings a song.",
    "wrong": [
      "bird The sings a song.",
      "bird sings a song. The"
    ],
    "caseSensitive": true,
    "speak": "Read the sentences again. Which one makes sense?",
    "hint": "Who does the action? Read from the beginning."
  },
  {
    "prompt": "Which sentence makes sense and matches the idea?",
    "context": "A fish moves through water.",
    "answer": "The fish swims in water.",
    "wrong": [
      "fish The swims in water.",
      "fish swims in water. The"
    ],
    "caseSensitive": true,
    "speak": "Read the sentences again. Which one makes sense?",
    "hint": "Who does the action? Read from the beginning."
  },
  {
    "prompt": "Which sentence makes sense and matches the idea?",
    "context": "A duck rests on grass.",
    "answer": "The duck sits on grass.",
    "wrong": [
      "duck The sits on grass.",
      "duck sits on grass. The"
    ],
    "caseSensitive": true,
    "speak": "Read the sentences again. Which one makes sense?",
    "hint": "Who does the action? Read from the beginning."
  },
  {
    "prompt": "Which sentence makes sense and matches the idea?",
    "context": "Mum opens a door.",
    "answer": "Mum opens the door.",
    "wrong": [
      "opens Mum the door.",
      "opens the door. Mum"
    ],
    "caseSensitive": true,
    "speak": "Read the sentences again. Which one makes sense?",
    "hint": "Who does the action? Read from the beginning."
  },
  {
    "prompt": "Which sentence makes sense and matches the idea?",
    "context": "Dad makes food for lunch.",
    "answer": "Dad cooks the lunch.",
    "wrong": [
      "cooks Dad the lunch.",
      "cooks the lunch. Dad"
    ],
    "caseSensitive": true,
    "speak": "Read the sentences again. Which one makes sense?",
    "hint": "Who does the action? Read from the beginning."
  },
  {
    "prompt": "Which sentence makes sense and matches the idea?",
    "context": "The sun is bright today.",
    "answer": "The sun shines today.",
    "wrong": [
      "sun The shines today.",
      "sun shines today. The"
    ],
    "caseSensitive": true,
    "speak": "Read the sentences again. Which one makes sense?",
    "hint": "Who does the action? Read from the beginning."
  },
  {
    "prompt": "Which sentence makes sense and matches the idea?",
    "context": "Rain makes my coat wet.",
    "answer": "The rain wets my coat.",
    "wrong": [
      "rain The wets my coat.",
      "rain wets my coat. The"
    ],
    "caseSensitive": true,
    "speak": "Read the sentences again. Which one makes sense?",
    "hint": "Who does the action? Read from the beginning."
  },
  {
    "prompt": "Which sentence makes sense and matches the idea?",
    "context": "We put a seed in soil.",
    "answer": "We plant a seed.",
    "wrong": [
      "plant We a seed.",
      "plant a seed. We"
    ],
    "caseSensitive": true,
    "speak": "Read the sentences again. Which one makes sense?",
    "hint": "Who does the action? Read from the beginning."
  },
  {
    "prompt": "Which sentence makes sense and matches the idea?",
    "context": "I make a picture of a star.",
    "answer": "I draw a star.",
    "wrong": [
      "draw I a star.",
      "draw a star. I"
    ],
    "caseSensitive": true,
    "speak": "Read the sentences again. Which one makes sense?",
    "hint": "Who does the action? Read from the beginning."
  }
];
export function buildCheckingItMakesSense(level, rng) {
  return sentenceQuestions(BANK, "Read the whole sentence again. Check who does what.", level, rng);
}
