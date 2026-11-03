import { sentenceQuestions } from "./year5Practice.js";
/** Brackets, Dashes and Commas: docs/curriculum/year-5-and-6-english.md, Year 5 mapping. */
export const RULE = "Parenthesis (extra information added to a sentence) can go inside brackets, between two dashes or between two commas. You can take it out and the sentence still makes sense.";
const P = "Choose the extra information punctuated correctly.";
const H = "Parenthesis needs a matching pair: two commas, two dashes or an opening and closing bracket.";
export const BANK = [
  { sentence: "My cousin ___ lives in Leeds.", answer: "(who is a chef)", wrong: ["who is a chef)", "(who is a chef"], prompt: P },
  { sentence: "My cousin, ___ lives in Leeds.", answer: "who is a chef,", wrong: ["who is a chef", "who is a chef."], prompt: P },
  { sentence: "The old lighthouse ___ stands on the cliff.", answer: "– built in 1820 –", wrong: ["– built in 1820", "built in 1820 –"], prompt: P },
  { sentence: "Our teacher, Mr Okoye, ___ taught us how to code.", answer: "(who loves robots)", wrong: ["(who loves robots", "who loves robots)"], prompt: P },
  { sentence: "Biscuit, ___ barked at the postman.", answer: "Ellie’s dog,", wrong: ["Ellie’s dog", "(Ellie’s dog"], prompt: P },
  { sentence: "Amara’s new bike ___ is bright orange.", answer: "– a birthday present –", wrong: ["– a birthday present", "a birthday present –"], prompt: P },
  { sentence: "The school fair ___ was a great success.", answer: "(held in May)", wrong: ["(held in May", "held in May)"], prompt: P },
  { sentence: "Zayn ___ was the first to finish.", answer: "– the quietest boy in the class –", wrong: ["– the quietest boy in the class", "the quietest boy in the class –"], prompt: P },
  { sentence: "The cake, ___ was made by Priya.", answer: "which was delicious,", wrong: ["which was delicious", "which was delicious."], prompt: P },
  { sentence: "Leo’s grandad ___ is eighty today.", answer: "(my favourite person)", wrong: ["(my favourite person", "my favourite person)"], prompt: P },
  { sentence: "The museum, ___ is free on Sundays.", answer: "which is in town,", wrong: ["which is in town", "which is in town."], prompt: P },
  { sentence: "The comet ___ will appear again in 2061.", answer: "– seen only twice in a lifetime –", wrong: ["– seen only twice in a lifetime", "seen only twice in a lifetime –"], prompt: P },
  { sentence: "Ellie’s gran, ___ makes the best jam.", answer: "who is ninety,", wrong: ["who is ninety", "who is ninety."], prompt: P },
  { sentence: "We saw a golden eagle ___ at the wildlife park.", answer: "(a rare sight)", wrong: ["(a rare sight", "a rare sight)"], prompt: P },
  { sentence: "The rocket ___ rose slowly into the sky.", answer: "– all five metres of it –", wrong: ["– all five metres of it", "all five metres of it –"], prompt: P },
  { sentence: "Priya’s brother, ___ plays the drums.", answer: "who is only seven,", wrong: ["who is only seven", "(who is only seven"], prompt: P },
  { sentence: "The old oak ___ fell in the storm.", answer: "(over 300 years old)", wrong: ["(over 300 years old", "over 300 years old)"], prompt: P },
  { sentence: "Zayn’s model ___ won first prize.", answer: "– a tiny wooden bridge –", wrong: ["– a tiny wooden bridge", "a tiny wooden bridge –"], prompt: P },
];
export function buildBracketsDashesAndCommasQuestions(level, rng) {
  return sentenceQuestions(BANK, RULE, level, rng, H);
}
