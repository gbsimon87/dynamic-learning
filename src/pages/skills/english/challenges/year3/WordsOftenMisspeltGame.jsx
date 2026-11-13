import EnglishPracticeGame from "../EnglishPracticeGame";
import { buildWordsOftenMisspeltPractice } from "../../../../../data/challenges/english/wordsOftenMisspelt";

const TITLES = [
  "These words are often spelt wrong. Use the tip to pick the right spelling.",
  "Which words are spelt right, and which are spelt wrong?",
  "Build the word from the letter tiles.",
  "Type the missing word.",
];

export default function WordsOftenMisspeltGame({ level, onComplete }) {
  return <EnglishPracticeGame level={level} build={buildWordsOftenMisspeltPractice} titles={TITLES} onComplete={onComplete} />;
}
