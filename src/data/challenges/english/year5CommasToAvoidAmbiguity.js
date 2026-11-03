import { sentenceQuestions } from "./year5Practice.js";
/** Commas to Avoid Ambiguity: docs/curriculum/year-5-and-6-english.md, Year 5 mapping. */
export const RULE = "A comma can stop a sentence being ambiguous (having two possible meanings). Check which meaning the writer wants, then place the comma to match.";
const P = "Choose the sentence that matches the meaning in the box.";
const H = "Read each sentence aloud and listen for where you pause. Which one means what the box says?";
const row = (context, answer, wrong, spare) => ({ context, sentence: "___", answer, wrong, prompt: P, build: { sentence: "___", answer, spare, prompt: "Build the sentence that matches the meaning. Leave the spare tiles." } });
export const BANK = [
  row("Leo is asking his grandad to come and eat.", "Let’s eat, Grandad!", ["Let’s eat Grandad!", "Let’s, eat Grandad!"], ["eat", ","]),
  row("Amara loves three things: cooking, her family and her dog.", "I love cooking, my family and my dog.", ["I love cooking my family and my dog.", "I love cooking my family, and my dog."], ["family", "dog,"]),
  row("Priya is speaking to a girl called Zoe.", "Come and see this, Zoe.", ["Come and see this Zoe.", "Come, and see this Zoe."], ["Zoe", "this,"]),
  row("The sentence says the tall man walked in and then the boy spoke.", "After the tall man walked in, the boy spoke.", ["After the tall man walked, in the boy spoke.", "After the tall, man walked in the boy spoke."], ["tall,", "in,"]),
  row("Ellie is telling Amara to stop and listen to Dad.", "Stop, Amara, and listen to Dad.", ["Stop Amara and listen, to Dad.", "Stop, Amara and listen to, Dad."], ["Dad,", "and,"]),
  row("The writer means that Zayn, who is tall, scored.", "Zayn, who is tall, scored.", ["Zayn who is, tall scored.", "Zayn, who is tall scored."], ["tall,", "is,"]),
  row("A shopping list: apples, bread, cheese and milk.", "We need apples, bread, cheese and milk.", ["We need apples bread, cheese and milk.", "We need apples, bread cheese, and milk."], ["bread,", "cheese,"]),
  row("The dog ran away, and then Leo chased it.", "As the dog ran away, Leo chased it.", ["As the dog ran, away Leo chased it.", "As the dog ran away Leo, chased it."], ["away,", "Leo,"]),
  row("Someone is thanking two people, her mum and her teacher.", "I would like to thank my mum and my teacher.", ["I would like to thank, my mum and my teacher.", "I would, like to thank my mum and my teacher."], ["thank,", "like,"]),
  row("Priya is calling to her friend Ravi.", "Ravi, please pass the ball.", ["Ravi please, pass the ball.", "Ravi please pass, the ball."], ["please,", "pass,"]),
  row("The sentence means that the cat which is on the wall is black.", "The cat on the wall, which is black, is mine.", ["The cat, on the wall which is black, is mine.", "The cat on the wall which is, black is mine."], ["wall,", "is,"]),
  row("The children had a picnic, then they played football.", "When the picnic ended, the children played football.", ["When the picnic ended the children, played football.", "When the picnic, ended the children played football."], ["children,", "picnic,"]),
  row("Zayn is saying thank you to Priya.", "Thank you, Priya, for the card.", ["Thank, you Priya for the card.", "Thank you Priya, for, the card."], ["for,", "you,"]),
  row("The sentence means that Amara bought a pen, a ruler and a rubber.", "Amara bought a pen, a ruler and a rubber.", ["Amara bought a pen a ruler, and a rubber.", "Amara bought, a pen a ruler and a rubber."], ["ruler,", "bought,"]),
  row("In the story, the dog was inside the shed.", "Inside, the dog was asleep.", ["Inside the, dog was asleep.", "Inside the dog, was asleep."], ["the,", "dog,"]),
  row("Leo wants Mum to come and watch the match.", "Come and watch, Mum!", ["Come and watch Mum!", "Come, and watch Mum!"], ["watch,", "and,"]),
  row("The sentence says that Ellie, not anyone else, is the speaker’s best friend.", "My best friend, Ellie, is coming.", ["My best, friend Ellie is coming.", "My best friend Ellie, is coming."], ["best,", "friend,"]),
  row("The sentence means that when it rained, the match stopped.", "Since it rained, the match stopped.", ["Since it, rained the match stopped.", "Since it rained the match, stopped."], ["it,", "match,"]),
];
export function buildCommasToAvoidAmbiguityQuestions(level, rng) {
  return sentenceQuestions(BANK, RULE, level, rng, H);
}
