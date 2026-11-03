import { sentenceQuestions } from "./year5Practice.js";
/** Tense and Agreement: docs/curriculum/year-5-and-6-english.md, Year 5 mapping. */
export const RULE = "Use one tense (the time of the verb) all the way through. A verb must also agree with its subject (the person or thing doing the action): the dogs are, the dog is.";
const P = "Choose the word that keeps the tense and agreement correct.";
export const BANK = [
  { sentence: "Yesterday, Leo ___ to the shop and bought some bread.", answer: "went", wrong: ["goes", "will go"], prompt: P },
  { sentence: "The children in the class ___ excited about the trip.", answer: "are", wrong: ["is", "am"], prompt: P },
  { sentence: "Each of the girls ___ a medal.", answer: "has", wrong: ["have", "are"], prompt: P },
  { sentence: "The box of pencils ___ on the shelf right now.", answer: "is", wrong: ["are", "were"], prompt: P },
  { sentence: "Priya opened the door and ___ inside.", answer: "peered", wrong: ["peers", "will peer"], prompt: P },
  { sentence: "Every morning, Biscuit barks at the gate and ___ for Ellie.", answer: "waits", wrong: ["waited", "will wait"], prompt: P },
  { sentence: "Yesterday there ___ two cats on the wall.", answer: "were", wrong: ["are", "was"], prompt: P },
  { sentence: "Leo and Zayn ___ building a den right now.", answer: "are", wrong: ["is", "was"], prompt: P },
  { sentence: "The dogs ___ barking when the postman came.", answer: "were", wrong: ["was", "is"], prompt: P },
  { sentence: "Last week, we ___ lucky to win the quiz.", answer: "were", wrong: ["was", "are"], prompt: P },
  { sentence: "Amara walked to the gate and ___ her friends.", answer: "waved to", wrong: ["waves to", "will wave to"], prompt: P },
  { sentence: "Zayn’s drawings ___ on the classroom wall.", answer: "are", wrong: ["is", "was"], prompt: P, context: "It is true now." },
  { sentence: "The teacher smiled while the class ___ their reading.", answer: "finished", wrong: ["finish", "will finish"], prompt: P },
  { sentence: "The pupils ___ their work and handed it in yesterday.", answer: "checked", wrong: ["check", "will check"], prompt: P },
  { sentence: "She ___ to school every day.", answer: "walks", wrong: ["walk", "walked"], prompt: P, context: "This is her daily habit." },
  { sentence: "They ___ to the park every Saturday.", answer: "go", wrong: ["goes", "went"], prompt: P, context: "This is their weekly habit." },
];
export function buildTenseAndAgreementQuestions(level, rng) {
  return sentenceQuestions(BANK, RULE, level, rng, "Find the time clue and the subject. Does the verb match both?");
}
