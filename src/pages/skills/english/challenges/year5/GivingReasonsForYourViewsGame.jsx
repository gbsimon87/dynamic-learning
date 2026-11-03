import EnglishPracticeGame from "../EnglishPracticeGame";
import { buildGivingReasonsForYourViewsQuestions } from "../../../../../data/challenges/english/year5GivingReasonsForYourViews";
const TITLES = [
  "Use the rule to choose.",
  "Sort the examples.",
  "Build the missing part.",
  "Apply what you know."
];
export default function GivingReasonsForYourViewsGame({ level, onComplete }) {
  return <EnglishPracticeGame level={level} build={buildGivingReasonsForYourViewsQuestions} titles={TITLES} onComplete={onComplete} />;
}
