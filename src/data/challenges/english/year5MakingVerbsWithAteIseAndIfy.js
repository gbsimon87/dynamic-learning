import { sentenceQuestions } from "./year5Practice.js";
/** Making Verbs with ate, ise and ify: docs/curriculum/year-5-and-6-english.md, Year 5 mapping. */
export const RULE = "A suffix (word ending) can turn a noun or an adjective into a verb (an action word): pure becomes purify, memory becomes memorise, active becomes activate.";
export const BANK = [
  { sentence: "The scientists will ___ the pond water before anyone drinks it.", answer: "purify", wrong: ["pure", "purely"], prompt: "Which verb means ‘to make pure’?" },
  { sentence: "Priya wants to ___ the whole poem by Friday.", answer: "memorise", wrong: ["memory", "memorial"], prompt: "Which verb means ‘to learn by heart’? It is made from the noun memory." },
  { sentence: "Press the green button to ___ the alarm.", answer: "activate", wrong: ["active", "activity"], prompt: "Which verb means ‘to make something active’?" },
  { sentence: "The museum plans to ___ its old displays with touch screens.", answer: "modernise", wrong: ["modern", "modernly"], prompt: "Which verb means ‘to make modern’?" },
  { sentence: "Leo rubbed a nail on a magnet to ___ it.", answer: "magnetise", wrong: ["magnetic", "magnetism"], prompt: "Which verb means ‘to make magnetic’?" },
  { sentence: "The vet will ___ Biscuit against illness.", answer: "vaccinate", wrong: ["vaccine", "vaccination"], prompt: "Which verb is made from the noun vaccine?" },
  { sentence: "Zayn tried to ___ the rules so that everyone understood them.", answer: "simplify", wrong: ["simply", "simplicity"], prompt: "Which verb means ‘to make simple’?" },
  { sentence: "Leo scored in the last minute to ___ the match.", answer: "equalise", wrong: ["equal", "equally"], prompt: "Which verb means ‘to make the score equal’?" },
  { sentence: "The storm will ___ overnight, so stay indoors.", answer: "intensify", wrong: ["intense", "intensely"], prompt: "Which verb means ‘to become more intense’?" },
  { sentence: "Please do not ___ my drawing before you have looked at it properly.", answer: "criticise", wrong: ["critic", "critical"], prompt: "Which verb is made from the noun critic?" },
  { sentence: "Leo had to ___ for the muddy footprints.", answer: "apologise", wrong: ["apology", "apologetic"], prompt: "Which verb means ‘to say sorry’? It is made from the noun apology." },
  { sentence: "The coach’s speech will ___ the whole team.", answer: "motivate", wrong: ["motive", "motivation"], prompt: "Which verb means ‘to give someone a reason to try hard’?" },
  { sentence: "The gardener will ___ the soil to help the beans grow.", answer: "fertilise", wrong: ["fertile", "fertility"], prompt: "Which verb means ‘to make soil fertile’?" },
  { sentence: "Ellie wants to ___ her bike with silver stars.", answer: "decorate", wrong: ["decoration", "decorative"], prompt: "Which verb is made from the noun decor?" },
  { sentence: "The jelly will ___ in the fridge.", answer: "solidify", wrong: ["solid", "solidly"], prompt: "Which verb means ‘to become solid’?" },
  { sentence: "The class asked the teacher to ___ the school trip dates.", answer: "finalise", wrong: ["final", "finally"], prompt: "Which verb means ‘to make final’?" },
  { sentence: "Amara needs to ___ her ideas into a neat plan.", answer: "organise", wrong: ["organiser", "organisation"], prompt: "Which verb means ‘to put in order’?" },
  { sentence: "The ice cream will ___ if you leave it in the sun.", answer: "liquefy", wrong: ["liquid", "liquidly"], prompt: "Which verb means ‘to become a liquid’?" },
];
export function buildMakingVerbsWithAteIseAndIfyQuestions(level, rng) {
  return sentenceQuestions(BANK, RULE, level, rng, "Look at the ending the sentence needs: an action word, not a describing word or a thing.");
}
