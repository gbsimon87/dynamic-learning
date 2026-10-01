import EnglishPracticeGame from "../EnglishPracticeGame";
import { buildMoreWordsOftenMisspeltQuestions } from "../../../../../data/challenges/english/year4MoreWordsOftenMisspelt";
const TITLES = [
  "Use the rule to choose.",
  "Sort the examples.",
  "Build the missing part.",
  "Apply what you know."
];
export default function MoreWordsOftenMisspeltGame({ level, onComplete }) {
  return <EnglishPracticeGame level={level} build={buildMoreWordsOftenMisspeltQuestions} titles={TITLES} onComplete={onComplete} />;
}
