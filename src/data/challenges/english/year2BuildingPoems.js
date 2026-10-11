import { sentenceQuestions } from "./year2Practice.js";

/** Building Poems: see its mapping in docs/curriculum/year-2-english.md. */
export const RULE = "Use rhyme and carefully chosen words to build a poem line. Rhyme words sound alike at the end.";
export const BANK = [
  {
    "prompt": "Build the poem line with a last word that rhymes with cat.",
    "sentence": "___",
    "answer": "The sleepy cat sits on the mat.",
    "wrong": [
      "The sleepy cat sits on the book.",
      "The sleepy cat sits on the fish."
    ]
  },
  {
    "prompt": "Build the poem line with a last word that rhymes with dog.",
    "sentence": "___",
    "answer": "The muddy dog jumps over a log.",
    "wrong": [
      "The muddy dog jumps over a book.",
      "The muddy dog jumps over a fish."
    ]
  },
  {
    "prompt": "Build the poem line with a last word that rhymes with sun.",
    "sentence": "___",
    "answer": "We play in the sun and have lots of fun.",
    "wrong": [
      "We play in the sun and have lots of book.",
      "We play in the sun and have lots of fish."
    ]
  },
  {
    "prompt": "Build the poem line with a last word that rhymes with tree.",
    "sentence": "___",
    "answer": "High in the tree buzzes a bee.",
    "wrong": [
      "High in the tree buzzes a book.",
      "High in the tree buzzes a fish."
    ]
  },
  {
    "prompt": "Build the poem line with a last word that rhymes with light.",
    "sentence": "___",
    "answer": "A tiny light shines in the night.",
    "wrong": [
      "A tiny light shines in the book.",
      "A tiny light shines in the fish."
    ]
  },
  {
    "prompt": "Build the poem line with a last word that rhymes with rain.",
    "sentence": "___",
    "answer": "Through the rain comes a red train.",
    "wrong": [
      "Through the rain comes a red book.",
      "Through the rain comes a red fish."
    ]
  },
  {
    "prompt": "Build the poem line with a last word that rhymes with boat.",
    "sentence": "___",
    "answer": "The little boat is ready to float.",
    "wrong": [
      "The little boat is ready to book.",
      "The little boat is ready to fish."
    ]
  },
  {
    "prompt": "Build the poem line with a last word that rhymes with blue.",
    "sentence": "___",
    "answer": "My coat is blue and so is my shoe.",
    "wrong": [
      "My coat is blue and so is my book.",
      "My coat is blue and so is my fish."
    ]
  },
  {
    "prompt": "Build the poem line with a last word that rhymes with day.",
    "sentence": "___",
    "answer": "On a sunny day we go out to play.",
    "wrong": [
      "On a sunny day we go out to book.",
      "On a sunny day we go out to fish."
    ]
  },
  {
    "prompt": "Build the poem line with a last word that rhymes with moon.",
    "sentence": "___",
    "answer": "We look at the moon and sleep quite soon.",
    "wrong": [
      "We look at the moon and sleep quite book.",
      "We look at the moon and sleep quite fish."
    ]
  },
  {
    "prompt": "Build the poem line with a last word that rhymes with star.",
    "sentence": "___",
    "answer": "A bright little star shines very far.",
    "wrong": [
      "A bright little star shines very book.",
      "A bright little star shines very fish."
    ]
  },
  {
    "prompt": "Build the poem line with a last word that rhymes with bed.",
    "sentence": "___",
    "answer": "I lie in bed and rest my head.",
    "wrong": [
      "I lie in bed and rest my book.",
      "I lie in bed and rest my fish."
    ]
  },
  {
    "prompt": "Build the poem line with a last word that rhymes with feet.",
    "sentence": "___",
    "answer": "We stamp our feet along the street.",
    "wrong": [
      "We stamp our feet along the book.",
      "We stamp our feet along the fish."
    ]
  },
  {
    "prompt": "Build the poem line with a last word that rhymes with hill.",
    "sentence": "___",
    "answer": "On top of the hill the air is still.",
    "wrong": [
      "On top of the hill the air is book.",
      "On top of the hill the air is fish."
    ]
  },
  {
    "prompt": "Build the poem line with a last word that rhymes with high.",
    "sentence": "___",
    "answer": "The bird flies high into the sky.",
    "wrong": [
      "The bird flies high into the book.",
      "The bird flies high into the fish."
    ]
  }
];
export function buildQuestions(level, rng) {
  return sentenceQuestions(BANK, RULE, level, rng);
}
