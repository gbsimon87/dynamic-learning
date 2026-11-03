import { sentenceQuestions } from "./year5Practice.js";
/** Giving Reasons for Your Views: docs/curriculum/year-5-and-6-english.md, Year 5 mapping (reading: reasoned justifications; spoken language: articulate and justify). */
export const RULE = "A reasoned view says what you think and why. Join the view to its reason with because, and point to evidence with words such as for example or this shows that.";
const P = "Choose the best reason or linking phrase.";
export const BANK = [
  { sentence: "Amara says the book is exciting ___ the hero takes a risk on every page.", answer: "because", wrong: ["but", "so"], prompt: P },
  { context: "Leo thinks school uniform is a good idea.", sentence: "I think uniform is a good idea because ___.", answer: "everyone looks equal and nobody worries about clothes", wrong: ["I like wearing socks", "it rained yesterday"], prompt: "Choose the reason that supports his view." },
  { context: "In the story, Zayn shares his lunch with a new boy.", sentence: "Zayn is kind because ___.", answer: "he shares his lunch with a new boy", wrong: ["he has a red lunchbox", "the story is short"], prompt: "Choose the evidence from the story." },
  { sentence: "The poem is sad. ___, the last line says ‘nobody came’.", answer: "For example", wrong: ["However", "Meanwhile"], prompt: P },
  { context: "Priya wants the class to read more poetry.", sentence: "Poetry is worth reading ___ it helps us notice small details.", answer: "because", wrong: ["although", "unless"], prompt: P },
  { context: "Ellie says the film was better than the book.", sentence: "I prefer the film because ___.", answer: "the music made the scary parts more exciting", wrong: ["it is a film", "I saw it on Tuesday"], prompt: "Choose the reason that supports her view." },
  { sentence: "Leo grins every time he wins. ___ he enjoys a challenge.", answer: "This shows that", wrong: ["For example", "Because"], prompt: P },
  { context: "Zayn thinks the school should have a garden.", sentence: "A garden would help the school because ___.", answer: "pupils could grow food and learn about plants", wrong: ["gardens are green", "it might snow"], prompt: "Choose the reason that supports his view." },
  { context: "Amara says Priya is a brave character.", sentence: "I know Priya is brave because ___.", answer: "she climbs the tower even though she is afraid", wrong: ["she wears a blue coat", "the tower is tall"], prompt: "Choose the reason that gives evidence from the story." },
  { sentence: "I think the ending was too sudden. ___, there was no time to find out what happened to Biscuit.", answer: "For instance", wrong: ["Nevertheless", "Meanwhile"], prompt: P },
  { context: "Leo is giving his opinion about a new playground game.", sentence: "In my opinion, the game is fair ___ everyone gets a turn.", answer: "because", wrong: ["unless", "although"], prompt: P },
  { context: "Ellie says Biscuit is the funniest character.", sentence: "Biscuit is funny because ___.", answer: "he keeps stealing socks and looks proud of it", wrong: ["he is a dog", "the book has twelve chapters"], prompt: "Choose the reason that supports her view." },
  { context: "Priya is explaining why she agrees with Zayn.", sentence: "I agree with Zayn ___ his plan is the safest.", answer: "because", wrong: ["until", "unless"], prompt: P },
  { context: "The class is discussing a text about recycling.", sentence: "The writer wants us to recycle. ___ she says it saves energy.", answer: "This is clear because", wrong: ["This is rainy because", "Recycle is clear because"], prompt: P },
  { context: "Amara thinks the mystery book is the best one this term.", sentence: "It is the best because ___.", answer: "the clues are surprising and I could not guess the ending", wrong: ["it has a cover", "I read it in a chair"], prompt: "Choose the reason that supports her view." },
  { context: "Leo explains why he chose the red kite.", sentence: "I chose the red kite ___ it is easiest to see in the sky.", answer: "because", wrong: ["but", "unless"], prompt: P },
  { sentence: "Zayn says the author uses short sentences to build tension. ___, ‘Silence. Then a click.’", answer: "For example", wrong: ["In conclusion", "Furthermore, however"], prompt: P },
  { context: "Priya is explaining her opinion of the museum trip.", sentence: "The trip was worthwhile ___ we learnt something new about each exhibit.", answer: "because", wrong: ["unless", "while not"], prompt: P },
];
export function buildGivingReasonsForYourViewsQuestions(level, rng) {
  return sentenceQuestions(BANK, RULE, level, rng, "A good reason is linked to the view and uses evidence. Which one does that?");
}
