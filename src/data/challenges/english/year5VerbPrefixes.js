import { sentenceQuestions } from "./year5Practice.js";
/** Verb Prefixes: docs/curriculum/year-5-and-6-english.md, Year 5 mapping. */
export const RULE = "A prefix (letters added to the front of a word) changes its meaning. dis- and de- often undo, mis- means wrongly, over- means too much and re- means again.";
export const BANK = [
  { sentence: "Leo did not mean to ___ the instructions.", answer: "misread", wrong: ["disread", "deread"], prompt: "Which verb means ‘to read wrongly’?" },
  { sentence: "The magician made the rabbit ___.", answer: "disappear", wrong: ["misappear", "deappear"], prompt: "Which verb means ‘to go out of sight’?" },
  { sentence: "Amara will ___ her picture because it smudged.", answer: "redraw", wrong: ["dedraw", "disdraw"], prompt: "Which verb means ‘to draw again’?" },
  { sentence: "Do not let the bath ___.", answer: "overflow", wrong: ["deflow", "misflow"], prompt: "Which verb means ‘to flow over the edge’?" },
  { sentence: "Dad took the pizza out of the freezer to ___ it.", answer: "defrost", wrong: ["refrost", "misfrost"], prompt: "Which verb means ‘to remove the ice’?" },
  { sentence: "Zayn did not want to ___ the word ‘necessary’.", answer: "misspell", wrong: ["despell", "overspell"], prompt: "Which verb means ‘to spell wrongly’?" },
  { sentence: "Do not ___ the pasta, or it will go soggy.", answer: "overcook", wrong: ["decook", "discook"], prompt: "Which verb means ‘to cook for too long’?" },
  { sentence: "Priya had to ___ the secret message.", answer: "decode", wrong: ["miscode", "discode"], prompt: "Which verb means ‘to turn a code back into ordinary words’?" },
  { sentence: "Biscuit will always ___ his bath.", answer: "dislike", wrong: ["delike", "overlike"], prompt: "Which verb means ‘to not like’?" },
  { sentence: "The children were told not to ___ their teacher.", answer: "disobey", wrong: ["reobey", "deobey"], prompt: "Which verb means ‘to refuse to do what you are told’?" },
  { sentence: "Ellie will ___ the tower of bricks that fell down.", answer: "rebuild", wrong: ["misbuild", "debuild"], prompt: "Which verb means ‘to build again’?" },
  { sentence: "Leo tried to ___ the cyclist on the hill.", answer: "overtake", wrong: ["retake", "distake"], prompt: "Which verb means ‘to pass someone going the same way’?" },
  { sentence: "Amara did not mean to ___ the babysitter’s name.", answer: "mispronounce", wrong: ["repronounce", "depronounce"], prompt: "Which verb means ‘to say a word wrongly’?" },
  { sentence: "The firefighter had to ___ the bomb in the story.", answer: "defuse", wrong: ["misfuse", "overfuse"], prompt: "Which verb means ‘to make something safe by removing its fuse’?" },
  { sentence: "I will ___ the water bottle at the tap.", answer: "refill", wrong: ["misfill", "defill"], prompt: "Which verb means ‘to fill again’?" },
  { sentence: "Zayn will ___ his shoes before he goes out.", answer: "retie", wrong: ["detie", "overtie"], prompt: "Which verb means ‘to tie again’?" },
  { sentence: "If you ___ your breakfast, you may feel sleepy.", answer: "overeat", wrong: ["deeat", "miseat"], prompt: "Which verb means ‘to eat too much’?" },
  { sentence: "Priya had to ___ the sums because her answers were wrong.", answer: "redo", wrong: ["misdo", "dedo"], prompt: "Which verb means ‘to do again’?" },
];
export function buildVerbPrefixesQuestions(level, rng) {
  return sentenceQuestions(BANK, RULE, level, rng, "Work out the meaning the prefix gives: again, wrongly, too much, or undo.");
}
