import EnglishPracticeGame from "../EnglishPracticeGame";
import { buildDeterminersQuestions } from "../../../../../data/challenges/english/year4Determiners";
const TITLES = [
  "Use the rule to choose.",
  "Sort the examples.",
  "Build the missing part.",
  "Apply what you know."
];
export default function DeterminersGame({ level, onComplete }) {
  return <EnglishPracticeGame level={level} build={buildDeterminersQuestions} titles={TITLES} onComplete={onComplete} />;
}
