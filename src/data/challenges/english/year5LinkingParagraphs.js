import { sentenceQuestions } from "./year5Practice.js";
/** Linking Paragraphs: docs/curriculum/year-5-and-6-english.md, Year 5 mapping. */
export const RULE = "An adverbial (a word or phrase that adds information to a verb) can link paragraphs: by time (later), by place (nearby) or by number (secondly). A tense choice such as had seen can also show what came before.";
export const BANK = [
  { context: "The children spent the morning building a raft.", sentence: "___, they launched it on the pond.", answer: "Later that afternoon", wrong: ["Nearby", "Secondly"], prompt: "Choose the adverbial of time that links the paragraphs." },
  { context: "The campers set up their tents at the edge of the field.", sentence: "___, a stream ran through the trees.", answer: "Nearby", wrong: ["Later", "Firstly"], prompt: "Choose the adverbial of place that links the paragraphs." },
  { context: "Firstly, the council wants to plant more trees in the park.", sentence: "___, it plans to build a new cycle path.", answer: "Secondly", wrong: ["Nearby", "Yesterday"], prompt: "Choose the adverbial of number that links the paragraphs." },
  { context: "Priya walked into the hall and froze.", sentence: "She ___ seen that dress before.", answer: "had", wrong: ["has", "will"], prompt: "Choose the tense choice that shows this happened earlier." },
  { context: "Leo spent the whole of Monday learning his lines.", sentence: "___, he practised in front of the mirror.", answer: "The next day", wrong: ["Nearby", "Firstly"], prompt: "Choose the adverbial of time that links the paragraphs." },
  { context: "The museum has a huge dinosaur skeleton in the main hall.", sentence: "___, there is a café that sells cakes.", answer: "Next door", wrong: ["Soon after", "Thirdly"], prompt: "Choose the adverbial of place that links the paragraphs." },
  { context: "The first reason to visit is the free entry.", sentence: "___, the exhibits change every month.", answer: "The second reason", wrong: ["The first place", "Meanwhile later"], prompt: "Choose the phrase of number that links the paragraphs." },
  { context: "Zayn locked the shed and walked home through the dark.", sentence: "The next morning, the shed door ___ open.", answer: "was", wrong: ["were", "is"], prompt: "Choose the correct tense and verb." },
  { context: "Ellie found the dog’s lead hanging in the porch.", sentence: "___, she heard a scratching at the back door.", answer: "A moment later", wrong: ["Over there", "Secondly"], prompt: "Choose the adverbial of time that links the paragraphs." },
  { context: "The path wound up the steep hill.", sentence: "___, the wind began to blow harder.", answer: "Higher up", wrong: ["Soon after", "Firstly"], prompt: "Choose the adverbial of place that links the paragraphs." },
  { context: "Amara arrived at the party at six o’clock.", sentence: "By then, the cake ___ eaten.", answer: "had been", wrong: ["has been", "will be"], prompt: "Choose the tense choice that shows what happened before." },
  { context: "Leo has three reasons for wanting a dog. The first is that dogs need walks and he loves the outdoors.", sentence: "___, a dog would be good company when his sister is at school.", answer: "Secondly", wrong: ["Nearby", "Previously"], prompt: "Choose the adverbial of number that links the paragraphs." },
  { context: "The expedition set off at dawn.", sentence: "___, the explorers reached the foot of the mountain.", answer: "By noon", wrong: ["Over there", "Firstly"], prompt: "Choose the adverbial of time that links the paragraphs." },
  { context: "Priya’s house is at the end of a quiet lane.", sentence: "___, there is a small wood where we like to play.", answer: "Beyond the lane", wrong: ["Meanwhile", "Secondly"], prompt: "Choose the adverbial of place that links the paragraphs." },
  { context: "Amara looked at the empty plate in surprise.", sentence: "Someone ___ eaten her sandwich while she was out.", answer: "had", wrong: ["will", "is"], prompt: "Choose the tense choice that shows this happened earlier." },
  { context: "Zayn wrote down his plan for the model bridge.", sentence: "___, he gathered the lolly sticks and glue.", answer: "After lunch", wrong: ["Beside the bridge", "Thirdly"], prompt: "Choose the adverbial of time that links the paragraphs." },
  { context: "The village stands beside a wide, slow river.", sentence: "___, the old mill still turns its wheel.", answer: "Further along the bank", wrong: ["Soon afterwards", "Fourthly"], prompt: "Choose the adverbial of place that links the paragraphs." },
  { context: "Leo found the front door unlocked.", sentence: "He knew he ___ locked it the night before.", answer: "had", wrong: ["has", "will"], prompt: "Choose the tense choice that shows this happened earlier." },
  { context: "The recipe has three stages. The first is to melt the butter.", sentence: "___ add the sugar and stir.", answer: "The second stage is to", wrong: ["The nearest stage is to", "Soon after is to"], prompt: "Choose the phrase that links the paragraphs by number." },
];
export function buildLinkingParagraphsQuestions(level, rng) {
  return sentenceQuestions(BANK, RULE, level, rng, "Ask yourself: does the link show when, where, or which number comes next?");
}
