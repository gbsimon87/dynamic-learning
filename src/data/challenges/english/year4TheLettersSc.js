import { wordQuestions } from "./year4Practice.js";
/** The Letters sc: docs/curriculum/year-3-and-4-english.md, Year 4 mapping. */
export const RULE = "In some Latin origin words, sc makes an s sound: science, scene, discipline, fascinate and crescent.";
export const BANK = [
  {
    "word": "science",
    "meaning": "study of the natural world",
    "sentence": "Priya enjoys ___.",
    "wrong": [
      "sience",
      "sciense"
    ]
  },
  {
    "word": "scene",
    "meaning": "a place or part of a play",
    "sentence": "The opening ___ was in a forest.",
    "wrong": [
      "sene",
      "sceen"
    ]
  },
  {
    "word": "discipline",
    "meaning": "following rules or training carefully",
    "sentence": "Learning music takes ___.",
    "wrong": [
      "disipline",
      "disscipline"
    ]
  },
  {
    "word": "fascinate",
    "meaning": "to interest someone greatly",
    "sentence": "The stars ___ Zayn.",
    "wrong": [
      "fasinate",
      "fasscinate"
    ]
  },
  {
    "word": "crescent",
    "meaning": "a curved shape like a thin moon",
    "sentence": "The moon looked like a ___.",
    "wrong": [
      "cresent",
      "cresscent"
    ]
  },
  {
    "word": "scissors",
    "meaning": "a tool for cutting",
    "sentence": "Ellie cut the paper with ___.",
    "wrong": [
      "sissors",
      "scissers"
    ]
  },
  {
    "word": "scent",
    "meaning": "a smell",
    "sentence": "The rose had a lovely ___.",
    "wrong": [
      "scentt",
      "scente"
    ]
  },
  {
    "word": "scenery",
    "meaning": "the natural view around you",
    "sentence": "The mountain ___ was beautiful.",
    "wrong": [
      "senery",
      "scenerry"
    ]
  },
  {
    "word": "scientist",
    "meaning": "someone who studies science",
    "sentence": "Amara met a ___.",
    "wrong": [
      "sientist",
      "scienntist"
    ]
  },
  {
    "word": "fascinating",
    "meaning": "very interesting",
    "sentence": "The museum was ___.",
    "wrong": [
      "fasinating",
      "fascinnating"
    ]
  },
  {
    "word": "disciplinary",
    "meaning": "about rules and behaviour",
    "sentence": "The headteacher explained the ___ rules.",
    "wrong": [
      "disiplinary",
      "disciplinery"
    ]
  },
  {
    "word": "descend",
    "meaning": "to go down",
    "sentence": "The walkers began to ___ the hill.",
    "wrong": [
      "desend",
      "desscend"
    ]
  },
  {
    "word": "ascent",
    "meaning": "a climb upwards",
    "sentence": "The ___ took an hour.",
    "wrong": [
      "asscent",
      "ascente"
    ]
  },
  {
    "word": "scenic",
    "meaning": "having attractive natural views",
    "sentence": "The walkers took a ___ route.",
    "wrong": [
      "senic",
      "scenik"
    ]
  },
  {
    "word": "conscience",
    "meaning": "your sense of right and wrong",
    "sentence": "His ___ told him to return the coin.",
    "wrong": [
      "consience",
      "consciense"
    ]
  }
];
export function buildTheLettersScQuestions(level, rng) {
  return wordQuestions(BANK, RULE, level, rng);
}
