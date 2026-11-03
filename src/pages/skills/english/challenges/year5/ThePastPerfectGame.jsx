import EnglishPracticeGame from "../EnglishPracticeGame";
import { buildThePastPerfectQuestions } from "../../../../../data/challenges/english/year5ThePastPerfect";
const TITLES = [
  "Use the rule to choose.",
  "Sort the examples.",
  "Build the missing part.",
  "Apply what you know."
];
export default function ThePastPerfectGame({ level, onComplete }) {
  return <EnglishPracticeGame level={level} build={buildThePastPerfectQuestions} titles={TITLES} onComplete={onComplete} />;
}
