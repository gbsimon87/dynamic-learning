import EnglishPracticeGame from "../EnglishPracticeGame";
import { buildCommasAfterFrontedAdverbialsQuestions } from "../../../../../data/challenges/english/year4CommasAfterFrontedAdverbials";
const TITLES = [
  "Use the rule to choose.",
  "Sort the examples.",
  "Build the missing part.",
  "Apply what you know."
];
export default function CommasAfterFrontedAdverbialsGame({ level, onComplete }) {
  return <EnglishPracticeGame level={level} build={buildCommasAfterFrontedAdverbialsQuestions} titles={TITLES} onComplete={onComplete} />;
}
