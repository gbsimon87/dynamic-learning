import { sentenceQuestions } from "./year5Practice.js";
/** Modal Verbs and Possibility: docs/curriculum/year-5-and-6-english.md, Year 5 mapping. */
export const RULE = "A modal verb (a helper verb such as might, should, will or must) and an adverb (such as perhaps or surely) show how likely something is.";
export const BANK = [
  { context: "Dark clouds are gathering, but Leo is not sure.", sentence: "It ___ rain soon.", answer: "might", wrong: ["will", "must"], prompt: "Choose the word that shows it is only a possibility." },
  { context: "Leo has checked the sign: the shop is definitely open.", sentence: "The shop ___ be open.", answer: "will", wrong: ["might", "could"], prompt: "Choose the word that shows it is certain." },
  { context: "Amara cannot remember where her boots are.", sentence: "They ___ be in the shed.", answer: "might", wrong: ["must", "will"], prompt: "Choose the word that shows she is guessing." },
  { context: "Priya is not sure what to do.", sentence: "“___ we should ask Zayn,” she said.", answer: "Perhaps", wrong: ["Definitely", "Certainly"], prompt: "Choose the adverb that shows she is unsure." },
  { context: "The bin lid is off and Biscuit has rubbish on his nose. Ellie is almost certain.", sentence: "“___ Biscuit has been in the bin again!” said Ellie.", answer: "Surely", wrong: ["Perhaps", "Possibly"], prompt: "Choose the adverb that shows Ellie is almost certain." },
  { context: "The teacher says everyone has to wear a helmet on the trip.", sentence: "You ___ wear a helmet.", answer: "must", wrong: ["might", "could"], prompt: "Choose the modal verb that shows it is a rule." },
  { context: "Mum gives Zayn some advice about his project.", sentence: "You ___ start your poster early.", answer: "should", wrong: ["might not", "will not"], prompt: "Choose the modal verb that gives advice." },
  { context: "The weather forecast is very unsure about tomorrow.", sentence: "It ___ be sunny, or it might be wet.", answer: "could", wrong: ["must", "will"], prompt: "Choose the modal verb that shows a possible outcome." },
  { context: "Leo’s team has scored ten goals in a row.", sentence: "They will ___ win the match.", answer: "definitely", wrong: ["perhaps", "possibly"], prompt: "Choose the adverb that shows it is almost certain." },
  { context: "Amara has not yet read the end of the book.", sentence: "The hero ___ escape, but I cannot be sure.", answer: "might", wrong: ["must", "will"], prompt: "Choose the modal verb that shows she is not sure." },
  { context: "Priya is checking the footprints in the snow.", sentence: "These ___ be fox prints; they are too small for a dog.", answer: "must", wrong: ["might not", "could never"], prompt: "Choose the modal verb that shows she is nearly certain." },
  { context: "Zayn is not sure the bus will come on time.", sentence: "___ it will be late again.", answer: "Perhaps", wrong: ["Certainly", "Definitely"], prompt: "Choose the adverb that shows he is unsure." },
  { context: "Ellie knows for certain that the library shuts at five.", sentence: "The library ___ close at five.", answer: "will", wrong: ["might", "may"], prompt: "Choose the modal verb that shows it is certain." },
  { context: "The pilot says there is only a small chance of fog.", sentence: "There ___ be fog, but it is unlikely.", answer: "may", wrong: ["must", "will"], prompt: "Choose the modal verb that shows a small chance." },
  { context: "Leo knows he made a promise.", sentence: "I ___ keep my promise to Amara.", answer: "will", wrong: ["might", "could"], prompt: "Choose the modal verb that shows he is certain." },
  { context: "The boat leaves at noon and the children are late.", sentence: "We ___ hurry, or we will miss it!", answer: "must", wrong: ["might", "could"], prompt: "Choose the modal verb that shows it is urgent and necessary." },
  { context: "Priya does not know the answer, but she has an idea.", sentence: "It is ___ a trick question.", answer: "possibly", wrong: ["certainly", "definitely"], prompt: "Choose the adverb that shows she is unsure." },
  { context: "Amara is sure the answer is right. She has checked it twice.", sentence: "The answer is ___ twelve.", answer: "certainly", wrong: ["possibly", "perhaps"], prompt: "Choose the adverb that shows she is sure." },
];
export function buildModalVerbsAndPossibilityQuestions(level, rng) {
  return sentenceQuestions(BANK, RULE, level, rng, "Ask yourself how sure the speaker is: certain, nearly certain, or only a possibility?");
}
