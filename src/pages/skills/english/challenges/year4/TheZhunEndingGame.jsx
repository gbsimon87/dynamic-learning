import EnglishPracticeGame from "../EnglishPracticeGame";
import { buildTheZhunEndingQuestions } from "../../../../../data/challenges/english/year4TheZhunEnding";
const TITLES = [
  "Use the rule to choose.",
  "Sort the examples.",
  "Build the missing part.",
  "Apply what you know."
];
export default function TheZhunEndingGame({ level, onComplete }) {
  return <EnglishPracticeGame level={level} build={buildTheZhunEndingQuestions} titles={TITLES} onComplete={onComplete} />;
}
