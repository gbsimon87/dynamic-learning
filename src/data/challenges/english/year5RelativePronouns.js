import { sentenceQuestions } from "./year5Practice.js";
/** Relative Pronouns: docs/curriculum/year-5-and-6-english.md, Year 5 mapping. */
export const RULE = "A relative pronoun (a joining word such as who, which, where, when, whose or that) begins a clause that tells us more about a noun.";
const P = "Choose the relative pronoun that fits.";
const H = "Is the noun a person, a thing, a place, a time, or does something belong to it?";
export const BANK = [
  { sentence: "Leo’s friend, ___ lives next door, has a pet rabbit.", answer: "who", wrong: ["which", "whose"], prompt: P, hint: H },
  { sentence: "The book, ___ was on the top shelf, was very old.", answer: "which", wrong: ["who", "where"], prompt: P, hint: H },
  { sentence: "That is the park ___ we play football every Saturday.", answer: "where", wrong: ["who", "whose"], prompt: P, hint: H },
  { sentence: "I remember the day ___ Biscuit stole my sock.", answer: "when", wrong: ["where", "who"], prompt: P, hint: H },
  { sentence: "The girl ___ bike was stolen called the police.", answer: "whose", wrong: ["who", "which"], prompt: P, hint: H },
  { sentence: "The box ___ Amara carried was very heavy.", answer: "that", wrong: ["who", "whose"], prompt: P, hint: H },
  { sentence: "Zayn, ___ is quiet in class, drew a brilliant map.", answer: "who", wrong: ["which", "where"], prompt: P, hint: H },
  { sentence: "We visited a castle ___ towers were crumbling.", answer: "whose", wrong: ["who", "when"], prompt: P, hint: H },
  { sentence: "Summer is the time ___ the days are longest.", answer: "when", wrong: ["who", "whose"], prompt: P, hint: H },
  { sentence: "The teacher ___ taught us last year has retired.", answer: "who", wrong: ["where", "whose"], prompt: P, hint: H },
  { sentence: "The dog ___ barked all night is called Rex.", answer: "that", wrong: ["whose", "where"], prompt: P, hint: H },
  { sentence: "This is the café ___ Priya’s dad works.", answer: "where", wrong: ["who", "whose"], prompt: P, hint: H },
  { sentence: "Ellie, ___ dog is called Biscuit, loves long walks.", answer: "whose", wrong: ["who", "which"], prompt: P, hint: H },
  { sentence: "The planet ___ is closest to the sun is Mercury.", answer: "that", wrong: ["who", "whose"], prompt: P, hint: H },
  { sentence: "Amara found the torch, ___ had been missing for weeks.", answer: "which", wrong: ["who", "whose"], prompt: P, hint: H },
  { sentence: "I will never forget the moment ___ we reached the summit.", answer: "when", wrong: ["who", "whose"], prompt: P, hint: H },
  { sentence: "The museum, ___ opens at nine, has a new dinosaur.", answer: "which", wrong: ["who", "whose"], prompt: P, hint: H },
  { sentence: "The boy ___ won the race is my cousin.", answer: "who", wrong: ["where", "whose"], prompt: P, hint: H },
];
export function buildRelativePronounsQuestions(level, rng) {
  return sentenceQuestions(BANK, RULE, level, rng, H);
}
