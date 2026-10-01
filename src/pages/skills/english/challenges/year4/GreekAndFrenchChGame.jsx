import EnglishPracticeGame from "../EnglishPracticeGame";
import { buildGreekAndFrenchChQuestions } from "../../../../../data/challenges/english/year4GreekAndFrenchCh";
const TITLES = [
  "Use the rule to choose.",
  "Sort the examples.",
  "Build the missing part.",
  "Apply what you know."
];
export default function GreekAndFrenchChGame({ level, onComplete }) {
  return <EnglishPracticeGame level={level} build={buildGreekAndFrenchChQuestions} titles={TITLES} onComplete={onComplete} />;
}
