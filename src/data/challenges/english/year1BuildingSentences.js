import { sentenceQuestions } from "./year1Practice.js";

/** Year 1: "composing a sentence orally before writing it".
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
    "prompt": "Build the sentence that matches the idea.",
    "context": "Amara gives food to a cat.",
    "answer": "Amara feeds the cat.",
    "wrong": [
      "feeds Amara the cat.",
      "Amara feeds the."
    ],
    "caseSensitive": true,
    "speak": "Say your sentence aloud before you build it.",
    "hint": "Start with who or what. Then tell what happens."
  },
  {
    "prompt": "Build the sentence that matches the idea.",
    "context": "Leo uses his foot to kick a ball.",
    "answer": "Leo kicks the ball.",
    "wrong": [
      "kicks Leo the ball.",
      "Leo kicks the."
    ],
    "caseSensitive": true,
    "speak": "Say your sentence aloud before you build it.",
    "hint": "Start with who or what. Then tell what happens."
  },
  {
    "prompt": "Build the sentence that matches the idea.",
    "context": "Priya looks at words in a book.",
    "answer": "Priya reads a book.",
    "wrong": [
      "reads Priya a book.",
      "Priya reads a."
    ],
    "caseSensitive": true,
    "speak": "Say your sentence aloud before you build it.",
    "hint": "Start with who or what. Then tell what happens."
  },
  {
    "prompt": "Build the sentence that matches the idea.",
    "context": "Zayn closes a gate.",
    "answer": "Zayn shuts the gate.",
    "wrong": [
      "shuts Zayn the gate.",
      "Zayn shuts the."
    ],
    "caseSensitive": true,
    "speak": "Say your sentence aloud before you build it.",
    "hint": "Start with who or what. Then tell what happens."
  },
  {
    "prompt": "Build the sentence that matches the idea.",
    "context": "Ellie gives Biscuit a hug.",
    "answer": "Ellie hugs Biscuit.",
    "wrong": [
      "hugs Ellie Biscuit.",
      "Ellie hugs."
    ],
    "caseSensitive": true,
    "speak": "Say your sentence aloud before you build it.",
    "hint": "Start with who or what. Then tell what happens."
  },
  {
    "prompt": "Build the sentence that matches the idea.",
    "context": "Biscuit moves his tail.",
    "answer": "Biscuit wags his tail.",
    "wrong": [
      "wags Biscuit his tail.",
      "Biscuit wags his."
    ],
    "caseSensitive": true,
    "speak": "Say your sentence aloud before you build it.",
    "hint": "Start with who or what. Then tell what happens."
  },
  {
    "prompt": "Build the sentence that matches the idea.",
    "context": "A frog jumps upwards.",
    "answer": "The frog jumps up.",
    "wrong": [
      "frog The jumps up.",
      "The frog jumps."
    ],
    "caseSensitive": true,
    "speak": "Say your sentence aloud before you build it.",
    "hint": "Start with who or what. Then tell what happens."
  },
  {
    "prompt": "Build the sentence that matches the idea.",
    "context": "A bird makes a tune.",
    "answer": "The bird sings a song.",
    "wrong": [
      "bird The sings a song.",
      "The bird sings a."
    ],
    "caseSensitive": true,
    "speak": "Say your sentence aloud before you build it.",
    "hint": "Start with who or what. Then tell what happens."
  },
  {
    "prompt": "Build the sentence that matches the idea.",
    "context": "A fish moves through water.",
    "answer": "The fish swims in water.",
    "wrong": [
      "fish The swims in water.",
      "The fish swims in."
    ],
    "caseSensitive": true,
    "speak": "Say your sentence aloud before you build it.",
    "hint": "Start with who or what. Then tell what happens."
  },
  {
    "prompt": "Build the sentence that matches the idea.",
    "context": "A duck rests on grass.",
    "answer": "The duck sits on grass.",
    "wrong": [
      "duck The sits on grass.",
      "The duck sits on."
    ],
    "caseSensitive": true,
    "speak": "Say your sentence aloud before you build it.",
    "hint": "Start with who or what. Then tell what happens."
  },
  {
    "prompt": "Build the sentence that matches the idea.",
    "context": "Mum opens a door.",
    "answer": "Mum opens the door.",
    "wrong": [
      "opens Mum the door.",
      "Mum opens the."
    ],
    "caseSensitive": true,
    "speak": "Say your sentence aloud before you build it.",
    "hint": "Start with who or what. Then tell what happens."
  },
  {
    "prompt": "Build the sentence that matches the idea.",
    "context": "Dad makes food for lunch.",
    "answer": "Dad cooks the lunch.",
    "wrong": [
      "cooks Dad the lunch.",
      "Dad cooks the."
    ],
    "caseSensitive": true,
    "speak": "Say your sentence aloud before you build it.",
    "hint": "Start with who or what. Then tell what happens."
  },
  {
    "prompt": "Build the sentence that matches the idea.",
    "context": "The sun is bright today.",
    "answer": "The sun shines today.",
    "wrong": [
      "sun The shines today.",
      "The sun shines."
    ],
    "caseSensitive": true,
    "speak": "Say your sentence aloud before you build it.",
    "hint": "Start with who or what. Then tell what happens."
  },
  {
    "prompt": "Build the sentence that matches the idea.",
    "context": "Rain makes my coat wet.",
    "answer": "The rain wets my coat.",
    "wrong": [
      "rain The wets my coat.",
      "The rain wets my."
    ],
    "caseSensitive": true,
    "speak": "Say your sentence aloud before you build it.",
    "hint": "Start with who or what. Then tell what happens."
  },
  {
    "prompt": "Build the sentence that matches the idea.",
    "context": "We put a seed in soil.",
    "answer": "We plant a seed.",
    "wrong": [
      "plant We a seed.",
      "We plant a."
    ],
    "caseSensitive": true,
    "speak": "Say your sentence aloud before you build it.",
    "hint": "Start with who or what. Then tell what happens."
  },
  {
    "prompt": "Build the sentence that matches the idea.",
    "context": "I make a picture of a star.",
    "answer": "I draw a star.",
    "wrong": [
      "draw I a star.",
      "I draw a."
    ],
    "caseSensitive": true,
    "speak": "Say your sentence aloud before you build it.",
    "hint": "Start with who or what. Then tell what happens."
  }
];
export function buildBuildingSentences(level, rng) {
  return sentenceQuestions(BANK, "Say the idea aloud, then choose the words in order.", level, rng);
}
