import { sentenceQuestions } from "./year5Practice.js";
/** Relative Clauses: docs/curriculum/year-5-and-6-english.md, Year 5 mapping. */
export const RULE = "A relative clause (a clause that adds detail about a noun) often starts with who, which, where, when, whose or that. The relative pronoun can be left out when it is not the subject: the cake Amara baked.";
const P = "Complete the sentence with the correct relative clause.";
export const BANK = [
  { sentence: "Leo’s cousin, ___, is visiting this week.", answer: "who lives in Spain", wrong: ["which lives in Spain", "who live in Spain"], prompt: P, build: { sentence: "Leo’s cousin, ___, is visiting this week.", answer: "who lives in Spain", spare: ["which", "live"] } },
  { sentence: "The cake ___ was delicious.", answer: "Amara baked", wrong: ["baked Amara", "Amara bake"], prompt: "Complete the sentence. The relative pronoun has been left out.", build: { sentence: "The cake ___ was delicious.", answer: "Amara baked", spare: ["bake", "who"] } },
  { sentence: "We stayed in a village ___.", answer: "where the roads were narrow", wrong: ["who the roads were narrow", "when the roads were narrow"], prompt: P },
  { sentence: "The boy ___ won the race.", answer: "who trains every day", wrong: ["which trains every day", "where trains every day"], prompt: P },
  { sentence: "The torch ___ has a cracked lens.", answer: "that Zayn found", wrong: ["who Zayn found", "where Zayn found"], prompt: P },
  { sentence: "Priya remembered the evening ___.", answer: "when the lights went out", wrong: ["where the lights went out", "who the lights went out"], prompt: P },
  { sentence: "The author, ___, signed my book.", answer: "whose stories I love", wrong: ["who stories I love", "which stories I love"], prompt: P },
  { sentence: "The film ___ was too scary for Ellie.", answer: "we watched last night", wrong: ["watched we last night", "we watching last night"], prompt: "Complete the sentence. The relative pronoun has been left out." },
  { sentence: "Amara waved to the girl ___.", answer: "who was sitting by the window", wrong: ["which was sitting by the window", "whose sitting by the window"], prompt: P },
  { sentence: "The bridge, ___, was built in 1850.", answer: "which crosses the river", wrong: ["who crosses the river", "where crosses the river"], prompt: P },
  { sentence: "The picture ___ hung in the hall.", answer: "Zayn painted", wrong: ["painted Zayn", "Zayn paint"], prompt: "Complete the sentence. The relative pronoun has been left out." },
  { sentence: "The pupils ___ were given a certificate.", answer: "who read the most books", wrong: ["which read the most books", "where read the most books"], prompt: P },
  { sentence: "Leo’s grandad, ___, taught him to fish.", answer: "who is eighty", wrong: ["which is eighty", "who are eighty"], prompt: P },
  { sentence: "This is the field ___.", answer: "where the festival was held", wrong: ["who the festival was held", "when the festival was held"], prompt: P },
  { sentence: "The dog ___ barked at the postman.", answer: "that lives next door", wrong: ["where lives next door", "whose lives next door"], prompt: P },
  { sentence: "The scarf ___ kept her warm.", answer: "Ellie knitted", wrong: ["knitted Ellie", "Ellie knit it"], prompt: "Complete the sentence. The relative pronoun has been left out." },
  { sentence: "Spring is the season ___.", answer: "when the lambs are born", wrong: ["where the lambs are born", "who the lambs are born"], prompt: P },
  { sentence: "The museum, ___, is closed on Mondays.", answer: "which we visited in May", wrong: ["who we visited in May", "where we visited in May"], prompt: P },
];
export function buildRelativeClausesQuestions(level, rng) {
  return sentenceQuestions(BANK, RULE, level, rng, "Match the joining word to the noun, and check the verb agrees with it.");
}
