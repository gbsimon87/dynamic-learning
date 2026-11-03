import EnglishPracticeGame from "../EnglishPracticeGame";
import { buildWordsOftenMisspeltQuestions } from "../../../../../data/challenges/english/year5WordsOftenMisspelt";
const TITLES = [
  "Use the rule to choose.",
  "Sort the examples.",
  "Build the missing part.",
  "Apply what you know."
];
export default function WordsOftenMisspeltGame({ level, onComplete }) {
  return <EnglishPracticeGame level={level} build={buildWordsOftenMisspeltQuestions} titles={TITLES} onComplete={onComplete} />;
}
