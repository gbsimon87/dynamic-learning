import EnglishPracticeGame from "../EnglishPracticeGame";
import { buildFrontedAdverbialsQuestions } from "../../../../../data/challenges/english/year4FrontedAdverbials";
const TITLES = [
  "Use the rule to choose.",
  "Sort the examples.",
  "Build the missing part.",
  "Apply what you know."
];
export default function FrontedAdverbialsGame({ level, onComplete }) {
  return <EnglishPracticeGame level={level} build={buildFrontedAdverbialsQuestions} titles={TITLES} onComplete={onComplete} />;
}
