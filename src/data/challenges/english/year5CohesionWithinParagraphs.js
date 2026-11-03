import { sentenceQuestions } from "./year5Practice.js";
/** Cohesion within Paragraphs: docs/curriculum/year-5-and-6-english.md, Year 5 mapping. */
export const RULE = "Cohesion (sentences holding together) comes from linking words and phrases such as firstly, then, after that, finally and this, which join ideas inside a paragraph.";
const P = "Choose the word or phrase that links the sentences best.";
export const BANK = [
  { sentence: "Firstly, Amara mixed the flour and the eggs. ___, she poured the mixture into a tin.", answer: "After that", wrong: ["Firstly", "However"], prompt: P },
  { sentence: "Biscuit dug a huge hole in the garden. ___ made Ellie’s mum very cross.", answer: "This", wrong: ["Then", "Firstly"], prompt: P },
  { sentence: "Zayn folded the paper in half. ___, he folded the corners down to the middle.", answer: "Next", wrong: ["Firstly", "This"], prompt: P },
  { sentence: "Leo packed his bag and checked the map. ___, the team set off up the hill.", answer: "Then", wrong: ["This", "However"], prompt: P },
  { sentence: "___, we need to wash our hands. Secondly, we need to dry them properly.", answer: "Firstly", wrong: ["Finally", "After that"], prompt: P },
  { sentence: "The rain stopped and the clouds cleared. ___ made the walk much more fun.", answer: "This", wrong: ["Firstly", "Then"], prompt: P },
  { sentence: "Priya stirred the paint. ___, she dipped her brush in and began to paint the sky.", answer: "Then", wrong: ["This", "Firstly"], prompt: P },
  { sentence: "Firstly, Leo checked the tyres. Secondly, he checked the brakes. ___, he put on his helmet.", answer: "Finally", wrong: ["Firstly", "This"], prompt: P },
  { sentence: "Amara’s kite flew higher and higher. ___, the string snapped.", answer: "Suddenly", wrong: ["Firstly", "This"], prompt: P },
  { sentence: "The boat was leaking badly. ___ the crew had to row back to shore.", answer: "As a result,", wrong: ["Firstly,", "Meanwhile this,"], prompt: P },
  { sentence: "Ellie filled the kettle. ___, she found two clean mugs.", answer: "After that", wrong: ["Firstly", "This"], prompt: P },
  { sentence: "The sun rose over the hills. ___ was the signal for the village to wake.", answer: "This", wrong: ["Next", "Finally"], prompt: P },
  { sentence: "Zayn drew a square on the card. ___, he cut along the lines with scissors.", answer: "After that", wrong: ["Firstly", "This"], prompt: P },
  { sentence: "First, the children lined up. ___, the teacher counted them.", answer: "Then", wrong: ["Firstly", "This"], prompt: P },
  { sentence: "Priya heard a strange scratching noise. ___ noise seemed to come from the attic.", answer: "The", wrong: ["Firstly", "Then"], prompt: "Choose the word that links to the noise already mentioned." },
  { sentence: "Leo scored the winning goal. ___, the crowd roared and the team lifted him into the air.", answer: "Then", wrong: ["Firstly", "This"], prompt: P },
  { sentence: "Amara’s alarm did not ring. ___ she was late for school.", answer: "As a result,", wrong: ["Firstly,", "Meanwhile this,"], prompt: P },
  { sentence: "The recipe has four steps. ___, crack the eggs into a bowl.", answer: "Firstly", wrong: ["Finally", "Lastly"], prompt: P },
];
export function buildCohesionWithinParagraphsQuestions(level, rng) {
  return sentenceQuestions(BANK, RULE, level, rng, "Read the two sentences. Does the second one come next, give a result, or refer back to the first?");
}
