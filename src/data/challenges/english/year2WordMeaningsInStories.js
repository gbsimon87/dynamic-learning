import { readingQuestions } from "./year2Practice.js";

/** Word Meanings in Stories: see its mapping in docs/curriculum/year-2-english.md. */
export const RULE = "Use the words around a new word to work out its meaning.";
export const BANK = [
  {
    "title": "A tiny visitor",
    "blocks": [
      {
        "type": "p",
        "text": "Amara found a tiny beetle, smaller than her fingernail."
      },
      {
        "type": "p",
        "text": "It crept slowly across the leaf."
      },
      {
        "type": "p",
        "text": "Amara watched without touching it."
      },
      {
        "type": "p",
        "text": "Then the beetle vanished under a stone."
      }
    ],
    "evidence": [
      "Amara found a tiny beetle, smaller than her fingernail.",
      "It crept slowly across the leaf.",
      "Amara watched without touching it.",
      "Then the beetle vanished under a stone."
    ],
    "questions": [
      {
        "prompt": "What does tiny mean?",
        "answer": "Very small",
        "wrong": [
          "Very loud",
          "Very heavy"
        ],
        "evidence": "Amara found a tiny beetle, smaller than her fingernail.",
        "evidencePrompt": "Tap the clue explaining tiny."
      },
      {
        "prompt": "What does crept mean here?",
        "answer": "Moved slowly",
        "wrong": [
          "Shouted loudly",
          "Flew very high"
        ],
        "evidence": "It crept slowly across the leaf.",
        "evidencePrompt": "Tap the sentence showing a slow movement."
      },
      {
        "prompt": "What does vanished mean?",
        "answer": "Disappeared from view",
        "wrong": [
          "Grew much bigger",
          "Started singing"
        ],
        "evidence": "Then the beetle vanished under a stone.",
        "evidencePrompt": "Tap the sentence explaining where the beetle disappeared."
      },
      {
        "prompt": "Why did Amara stop seeing the beetle?",
        "answer": "It went under a stone",
        "wrong": [
          "It turned into a bird",
          "She put it in her pocket"
        ],
        "evidence": "Then the beetle vanished under a stone.",
        "evidencePrompt": "Tap the clue about the beetle's hiding place."
      }
    ],
    "order": [
      "Amara found a tiny beetle, smaller than her fingernail.",
      "It crept slowly across the leaf.",
      "Amara watched without touching it."
    ],
    "orderPrompt": "Put the events in the order they happen in the story."
  },
  {
    "title": "A chilly morning",
    "blocks": [
      {
        "type": "p",
        "text": "Leo felt chilly, so he pulled on a warm coat."
      },
      {
        "type": "p",
        "text": "He trudged slowly through the deep snow."
      },
      {
        "type": "p",
        "text": "At school he shook snow from his boots."
      },
      {
        "type": "p",
        "text": "His coat was damp where the snow had melted."
      }
    ],
    "evidence": [
      "Leo felt chilly, so he pulled on a warm coat.",
      "He trudged slowly through the deep snow.",
      "At school he shook snow from his boots.",
      "His coat was damp where the snow had melted."
    ],
    "questions": [
      {
        "prompt": "What does chilly mean?",
        "answer": "Cold",
        "wrong": [
          "Hungry",
          "Angry"
        ],
        "evidence": "Leo felt chilly, so he pulled on a warm coat.",
        "evidencePrompt": "Tap the clue that Leo felt cold."
      },
      {
        "prompt": "What does trudged mean here?",
        "answer": "Walked slowly with effort",
        "wrong": [
          "Danced quickly",
          "Swam under water"
        ],
        "evidence": "He trudged slowly through the deep snow.",
        "evidencePrompt": "Tap the sentence about walking through snow."
      },
      {
        "prompt": "What does damp mean?",
        "answer": "A little wet",
        "wrong": [
          "Completely dry",
          "Very noisy"
        ],
        "evidence": "His coat was damp where the snow had melted.",
        "evidencePrompt": "Tap the clue that melted snow made the coat wet."
      },
      {
        "prompt": "Why might walking take effort?",
        "answer": "The snow was deep",
        "wrong": [
          "The path was dry and clear",
          "Leo was on a bus"
        ],
        "evidence": "He trudged slowly through the deep snow.",
        "evidencePrompt": "Tap the clue that made walking difficult."
      }
    ],
    "order": [
      "Leo felt chilly, so he pulled on a warm coat.",
      "He trudged slowly through the deep snow.",
      "At school he shook snow from his boots."
    ],
    "orderPrompt": "Put the events in the order they happen in the story."
  },
  {
    "title": "The bright shell",
    "blocks": [
      {
        "type": "p",
        "text": "Priya spotted a shiny shell that glittered in the sun."
      },
      {
        "type": "p",
        "text": "She gently picked it up without squeezing it."
      },
      {
        "type": "p",
        "text": "A huge wave rushed towards her feet."
      },
      {
        "type": "p",
        "text": "She hurried back, moving quickly away from the water."
      }
    ],
    "evidence": [
      "Priya spotted a shiny shell that glittered in the sun.",
      "She gently picked it up without squeezing it.",
      "A huge wave rushed towards her feet.",
      "She hurried back, moving quickly away from the water."
    ],
    "questions": [
      {
        "prompt": "What does glittered mean?",
        "answer": "Shone brightly",
        "wrong": [
          "Made a loud noise",
          "Smelt sweet"
        ],
        "evidence": "Priya spotted a shiny shell that glittered in the sun.",
        "evidencePrompt": "Tap the sentence about the bright shell."
      },
      {
        "prompt": "What does gently mean here?",
        "answer": "With care",
        "wrong": [
          "With a hard squeeze",
          "As loudly as possible"
        ],
        "evidence": "She gently picked it up without squeezing it.",
        "evidencePrompt": "Tap the clue about taking care."
      },
      {
        "prompt": "What does hurried mean?",
        "answer": "Moved quickly",
        "wrong": [
          "Stayed still",
          "Fell asleep"
        ],
        "evidence": "She hurried back, moving quickly away from the water.",
        "evidencePrompt": "Tap the sentence explaining hurried."
      },
      {
        "prompt": "Why did Priya move back quickly?",
        "answer": "A huge wave was coming",
        "wrong": [
          "The shell was singing",
          "It had started snowing"
        ],
        "evidence": "A huge wave rushed towards her feet.",
        "evidencePrompt": "Tap the clue explaining why Priya moved."
      }
    ],
    "order": [
      "Priya spotted a shiny shell that glittered in the sun.",
      "She gently picked it up without squeezing it.",
      "A huge wave rushed towards her feet."
    ],
    "orderPrompt": "Put the events in the order they happen in the story."
  }
];
export function buildQuestions(level, rng) {
  return readingQuestions(BANK, RULE, level, rng);
}
