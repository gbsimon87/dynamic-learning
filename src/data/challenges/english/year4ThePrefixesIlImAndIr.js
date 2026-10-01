import { wordQuestions } from "./year4Practice.js";
/** The Prefixes il, im and ir: docs/curriculum/year-3-and-4-english.md, Year 4 mapping. */
export const RULE = "A prefix (word beginning) can mean “not”. Use il before l, im before m or p, and ir before r.";
export const BANK = [
  {
    "word": "illegal",
    "meaning": "not allowed by law",
    "sentence": "Parking here is ___.",
    "wrong": [
      "inlegal",
      "imlegal"
    ]
  },
  {
    "word": "illegible",
    "meaning": "too unclear to read",
    "sentence": "The muddy writing was ___.",
    "wrong": [
      "inlegible",
      "irlegible"
    ]
  },
  {
    "word": "illogical",
    "meaning": "not sensible",
    "sentence": "That explanation is ___.",
    "wrong": [
      "inlogical",
      "imlogical"
    ]
  },
  {
    "word": "illiterate",
    "meaning": "unable to read or write",
    "sentence": "The character in the story was ___.",
    "wrong": [
      "inliterate",
      "irliterate"
    ]
  },
  {
    "word": "immature",
    "meaning": "not fully grown or developed",
    "sentence": "The tree is still ___.",
    "wrong": [
      "inmature",
      "irmature"
    ]
  },
  {
    "word": "immortal",
    "meaning": "able to live forever",
    "sentence": "The magical dragon was ___.",
    "wrong": [
      "inmortal",
      "ilmortal"
    ]
  },
  {
    "word": "impossible",
    "meaning": "not able to happen",
    "sentence": "It is ___ to breathe under water without equipment.",
    "wrong": [
      "inpossible",
      "irpossible"
    ]
  },
  {
    "word": "impatient",
    "meaning": "not willing to wait",
    "sentence": "Biscuit was ___ for his dinner.",
    "wrong": [
      "inpatient",
      "ilpatient"
    ]
  },
  {
    "word": "imperfect",
    "meaning": "not completely correct",
    "sentence": "The first drawing was ___.",
    "wrong": [
      "inperfect",
      "irperfect"
    ]
  },
  {
    "word": "impolite",
    "meaning": "not polite",
    "sentence": "Pushing past someone is ___.",
    "wrong": [
      "inpolite",
      "irpolite"
    ]
  },
  {
    "word": "impractical",
    "meaning": "not useful in practice",
    "sentence": "A paper umbrella would be ___.",
    "wrong": [
      "inpractical",
      "ilpractical"
    ]
  },
  {
    "word": "irregular",
    "meaning": "not following a regular pattern",
    "sentence": "The stones formed an ___ shape.",
    "wrong": [
      "inregular",
      "imregular"
    ]
  },
  {
    "word": "irrelevant",
    "meaning": "not connected to the topic",
    "sentence": "That comment about football is ___ to our space lesson.",
    "wrong": [
      "inrelevant",
      "ilrelevant"
    ]
  },
  {
    "word": "irresponsible",
    "meaning": "not taking proper care",
    "sentence": "Leaving the gate open was ___.",
    "wrong": [
      "inresponsible",
      "imresponsible"
    ]
  },
  {
    "word": "irreplaceable",
    "meaning": "not able to be replaced",
    "sentence": "Gran’s only photograph was ___.",
    "wrong": [
      "inreplaceable",
      "imreplaceable"
    ]
  }
];
export function buildThePrefixesIlImAndIrQuestions(level, rng) {
  return wordQuestions(BANK, RULE, level, rng);
}
