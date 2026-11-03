import { sentenceQuestions } from "./year5Practice.js";
/** The Past Perfect: docs/curriculum/year-5-and-6-english.md, Year 5 mapping. */
export const RULE = "The perfect form of a verb (have, has or had plus a past participle) marks time and cause. The past perfect (had + past participle) shows something happened before another past event.";
const P = "Complete the sentence correctly.";
export const BANK = [
  { sentence: "By the time Amara arrived, the film ___.", answer: "had started", wrong: ["has started", "will start"], prompt: P },
  { sentence: "Leo ___ his homework before he went out to play.", answer: "had finished", wrong: ["has finished", "finishes"], prompt: P },
  { sentence: "Priya felt nervous because she ___ never sung on stage before.", answer: "had", wrong: ["has", "was"], prompt: P },
  { sentence: "When the bell rang, the children ___ already packed their bags.", answer: "had", wrong: ["have", "has"], prompt: P },
  { sentence: "After Ellie ___ the dog, she made her own lunch.", answer: "had fed", wrong: ["has fed", "will feed"], prompt: P },
  { sentence: "Right now, Leo ___ just finished his tea.", answer: "has", wrong: ["had", "will have"], prompt: "Choose the correct form. It is happening now." },
  { sentence: "The pitch was flooded because it ___ rained all night.", answer: "had", wrong: ["has", "will have"], prompt: "Explain the cause with the right form." },
  { sentence: "Zayn had ___ the whole cake before anyone noticed.", answer: "eaten", wrong: ["ate", "eat"], prompt: "Choose the correct past participle." },
  { sentence: "Amara realised she had ___ her keys on the bus.", answer: "left", wrong: ["leaved", "leave"], prompt: "Choose the correct past participle." },
  { sentence: "The teacher said that we had ___ the best poems she had ever read.", answer: "written", wrong: ["wrote", "write"], prompt: "Choose the correct past participle." },
  { sentence: "By last Friday, the sunflower ___ grown taller than Leo.", answer: "had", wrong: ["has", "have"], prompt: "Choose the correct form for something that happened before last Friday." },
  { sentence: "Priya had never ___ such a huge spider before.", answer: "seen", wrong: ["saw", "see"], prompt: "Choose the correct past participle." },
  { sentence: "I ___ my breakfast, so I was not hungry at the party.", answer: "had eaten", wrong: ["have eaten", "eat"], prompt: "Show the cause using the right form." },
  { sentence: "The visitors had already ___ when the rain started.", answer: "gone", wrong: ["went", "go"], prompt: "Choose the correct past participle." },
  { sentence: "Ellie asked whether anyone ___ seen her dog.", answer: "had", wrong: ["has", "have"], prompt: "The sentence is told in the past. Choose the correct form." },
  { sentence: "Biscuit looked guilty because he ___ chewed the cushion.", answer: "had", wrong: ["has", "was"], prompt: P },
  { sentence: "Zayn’s model fell apart because he ___ not used enough glue.", answer: "had", wrong: ["has", "have"], prompt: P },
  { sentence: "Amara has ___ the same book three times.", answer: "read", wrong: ["readed", "reads"], prompt: "Choose the correct past participle." },
];
export function buildThePastPerfectQuestions(level, rng) {
  return sentenceQuestions(BANK, RULE, level, rng, "Which event happened first? That one needs had + a past participle.");
}
