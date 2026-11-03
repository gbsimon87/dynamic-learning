import { sentenceQuestions } from "./year5Practice.js";
/** Roots and origins: docs/curriculum/year-5-and-6-english.md, Year 5 mapping. */
export const RULE = "A root (the main part of a word) keeps its meaning when a prefix or suffix is added. Knowing the root helps you work out new words and spell them.";
const DEFAULT_HINT = "Use the root’s meaning to work out which word fits the sentence.";
export const BANK = [
  {
    "context": "The Latin root ‘aqua’ means water.",
    "sentence": "A fish tank is called an ___.",
    "answer": "aquarium",
    "wrong": [
      "arboretum",
      "aviary"
    ],
    "prompt": "Which word is built on the root ‘aqua’?",
    "hint": "Which word has the root that means water?"
  },
  {
    "context": "‘Tele’ is Greek for far away.",
    "sentence": "A ___ lets you see faraway stars.",
    "answer": "telescope",
    "wrong": [
      "microscope",
      "periscope"
    ],
    "prompt": "Which word is built from ‘tele’?",
    "hint": "Look for the word that starts with the root meaning far away."
  },
  {
    "context": "‘Phone’ means sound and ‘tele’ means far away.",
    "sentence": "A ___ carries sound over a long distance.",
    "answer": "telephone",
    "wrong": [
      "telescope",
      "microscope"
    ],
    "prompt": "Join the two roots to make a word.",
    "hint": "Put ‘tele’ and ‘phone’ together."
  },
  {
    "context": "‘Photo’ means light and ‘graph’ means write or draw.",
    "sentence": "A picture made with light is called a ___.",
    "answer": "photograph",
    "wrong": [
      "autograph",
      "paragraph"
    ],
    "prompt": "Which word joins ‘photo’ and ‘graph’?",
    "hint": "Both roots are in the answer: light and write."
  },
  {
    "context": "‘Bio’ is Greek for life.",
    "sentence": "The study of living things is called ___.",
    "answer": "biology",
    "wrong": [
      "geology",
      "technology"
    ],
    "prompt": "Which word is built on the root ‘bio’?",
    "hint": "The root for life comes at the start."
  },
  {
    "context": "‘Geo’ is Greek for earth.",
    "sentence": "A scientist who studies rocks and the Earth is a ___.",
    "answer": "geologist",
    "wrong": [
      "biologist",
      "astronomer"
    ],
    "prompt": "Which word is built on the root ‘geo’?",
    "hint": "Find the word that starts with the root meaning earth."
  },
  {
    "context": "‘Micro’ means small.",
    "sentence": "A ___ lets you see tiny things such as germs.",
    "answer": "microscope",
    "wrong": [
      "telescope",
      "kaleidoscope"
    ],
    "prompt": "Which word is built from ‘micro’?",
    "hint": "Which root means small?"
  },
  {
    "context": "The prefix ex- means out and ‘port’ means carry.",
    "sentence": "To ___ goods is to send them out of a country.",
    "answer": "export",
    "wrong": [
      "import",
      "report"
    ],
    "prompt": "Which word joins ‘ex’ and ‘port’?",
    "hint": "Out plus carry."
  },
  {
    "context": "‘Spect’ means look.",
    "sentence": "A ___ is a person who watches a football match.",
    "answer": "spectator",
    "wrong": [
      "spectacle",
      "inspector"
    ],
    "prompt": "Which word is a person who looks on?",
    "hint": "A spectacle is a thing to see. We want the person."
  },
  {
    "context": "‘Script’ comes from the Latin for write.",
    "sentence": "The written words of a play are called a ___.",
    "answer": "script",
    "wrong": [
      "scribble",
      "inscription"
    ],
    "prompt": "Which word comes from the root ‘script’?",
    "hint": "Which one is the actors’ written words?"
  },
  {
    "context": "‘Dict’ means say.",
    "sentence": "To ___ a story is to say it aloud for someone else to write down.",
    "answer": "dictate",
    "wrong": [
      "predict",
      "contradict"
    ],
    "prompt": "Which word fits the meaning of ‘dict’?",
    "hint": "Say it aloud so another person can write it."
  },
  {
    "context": "‘Tract’ means pull.",
    "sentence": "A ___ is a farm vehicle that pulls heavy loads.",
    "answer": "tractor",
    "wrong": [
      "tracker",
      "traitor"
    ],
    "prompt": "Which word is built on the root ‘tract’?",
    "hint": "It pulls. Look for the root ‘tract’."
  },
  {
    "context": "‘Struct’ means build.",
    "sentence": "A ___ worker builds houses and roads.",
    "answer": "construction",
    "wrong": [
      "instruction",
      "destruction"
    ],
    "prompt": "Which word is built on the root ‘struct’?",
    "hint": "Which word means building things up?"
  },
  {
    "context": "‘Aud’ means hear.",
    "sentence": "An ___ is a group of people who listen to a show.",
    "answer": "audience",
    "wrong": [
      "audition",
      "audible"
    ],
    "prompt": "Which word fits the root ‘aud’?",
    "hint": "Many people together who hear the show."
  },
  {
    "context": "‘Vis’ means see.",
    "sentence": "A star that you can see in the night sky is ___.",
    "answer": "visible",
    "wrong": [
      "vision",
      "visor"
    ],
    "prompt": "Which word fits the root ‘vis’ and describes a star?",
    "hint": "It must describe the star, so it is an adjective."
  },
  {
    "context": "‘Ject’ means throw.",
    "sentence": "A ___ throws pictures from a computer onto a big screen.",
    "answer": "projector",
    "wrong": [
      "protector",
      "inspector"
    ],
    "prompt": "Which word is built on the root ‘ject’?",
    "hint": "Pick the word that contains ject."
  },
  {
    "context": "‘Man’ means hand.",
    "sentence": "Work done by hand is called ___ work.",
    "answer": "manual",
    "wrong": [
      "manner",
      "mammal"
    ],
    "prompt": "Which word is built on the root ‘man’?",
    "hint": "The root means hand."
  },
  {
    "context": "‘Terra’ is Latin for land or earth.",
    "sentence": "A glass tank of soil for a pet lizard is a ___.",
    "answer": "terrarium",
    "wrong": [
      "aquarium",
      "terrace"
    ],
    "prompt": "Which word is built on the root ‘terra’?",
    "hint": "Water tank is aquarium. Land tank is the answer."
  },
  {
    "context": "‘Sol’ means sun.",
    "sentence": "The ___ system is the Sun and the planets around it.",
    "answer": "solar",
    "wrong": [
      "lunar",
      "polar"
    ],
    "prompt": "Which word is built on the root ‘sol’?",
    "hint": "Which root means sun?"
  },
  {
    "context": "‘Luna’ means moon.",
    "sentence": "A ___ eclipse is when Earth’s shadow falls on the Moon.",
    "answer": "lunar",
    "wrong": [
      "solar",
      "polar"
    ],
    "prompt": "Which word is built on the root ‘luna’?",
    "hint": "Which root means moon?"
  },
  {
    "context": "‘Ann’ is from a Latin word for year.",
    "sentence": "Something that happens once a year is ___.",
    "answer": "annual",
    "wrong": [
      "annoying",
      "animal"
    ],
    "prompt": "Which word is built from ‘ann’ meaning year?",
    "hint": "Once a year."
  },
  {
    "context": "Bix is taking the word ‘happy’ and adding an ending and a start.",
    "sentence": "Add the prefix un and the suffix ness to ‘happy’: ___.",
    "answer": "unhappiness",
    "wrong": [
      "unhappyness",
      "unhapiness"
    ],
    "prompt": "Add the prefix and suffix, and remember to change the y.",
    "hint": "A y after a consonant letter changes to i before a suffix."
  },
  {
    "context": "Bix is adding a prefix and a suffix to ‘kind’.",
    "sentence": "Add the prefix un and the suffix ly to ‘kind’: ___.",
    "answer": "unkindly",
    "wrong": [
      "unkindness",
      "kindly"
    ],
    "prompt": "Add both parts to the root word.",
    "hint": "You need un at the start and ly at the end."
  },
  {
    "context": "Bix is exploring a word family. They all come from the Latin ‘signum’, a mark.",
    "sentence": "Sign, signal and ___ are in one word family.",
    "answer": "signature",
    "wrong": [
      "singer",
      "single"
    ],
    "prompt": "Which word belongs to the same family as sign?",
    "hint": "Your name written by hand is a mark."
  },
  {
    "context": "Bix is exploring a word family about healing.",
    "sentence": "Medic, medicine and ___ belong together.",
    "answer": "medical",
    "wrong": [
      "medium",
      "media"
    ],
    "prompt": "Which word belongs to the same family as medicine?",
    "hint": "Think of a medical doctor."
  },
  {
    "context": "The Latin ‘scio’ means I know. ‘Con’ plus ‘science’ makes a word.",
    "sentence": "The inner voice that tells you right from wrong is your ___.",
    "answer": "conscience",
    "wrong": [
      "conscious",
      "science"
    ],
    "prompt": "Which word is science with the prefix con added?",
    "hint": "Look for the word that is a noun about right and wrong."
  },
  {
    "context": "The Latin ‘scio’ means I know.",
    "sentence": "Someone who is awake and knows what is going on is ___.",
    "answer": "conscious",
    "wrong": [
      "conscience",
      "science"
    ],
    "prompt": "Which word means awake and aware?",
    "hint": "It is an adjective: it describes a person."
  },
  {
    "context": "The word family is a clue to the spelling.",
    "sentence": "Because it comes from ‘family’, the word meaning well known is spelt ___.",
    "answer": "familiar",
    "wrong": [
      "familar",
      "familier"
    ],
    "prompt": "Use the word family to spell it.",
    "hint": "It ends in iar, like the middle of family."
  },
  {
    "context": "The Latin ‘spero’ means I hope.",
    "sentence": "Someone who has almost no hope feels ___.",
    "answer": "desperate",
    "wrong": [
      "desparate",
      "despirate"
    ],
    "prompt": "Spell the word using its Latin root.",
    "hint": "The root has the letters sper, with an e."
  },
  {
    "context": "The prefix re- means again.",
    "sentence": "To rewrite a story means to write it ___.",
    "answer": "again",
    "wrong": [
      "never",
      "backwards"
    ],
    "prompt": "What does re- add to the root word?",
    "hint": "Think of replay and rebuild."
  },
  {
    "context": "The prefix un- means not.",
    "sentence": "‘Unfair’ means ___ fair.",
    "answer": "not",
    "wrong": [
      "very",
      "more"
    ],
    "prompt": "What does the prefix un- add?",
    "hint": "Think of unhappy and unlucky."
  },
  {
    "context": "‘Port’ means carry.",
    "sentence": "A ___ speaker is small enough to carry anywhere.",
    "answer": "portable",
    "wrong": [
      "portrait",
      "porridge"
    ],
    "prompt": "Which word is built on the root ‘port’?",
    "hint": "You can carry it easily."
  }
];
export function buildRootsAndOriginsQuestions(level, rng) {
  return sentenceQuestions(BANK, RULE, level, rng, DEFAULT_HINT);
}
