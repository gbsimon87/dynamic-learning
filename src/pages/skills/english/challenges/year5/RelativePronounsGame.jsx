import EnglishPracticeGame from "../EnglishPracticeGame";
import { buildRelativePronounsQuestions } from "../../../../../data/challenges/english/year5RelativePronouns";
const TITLES = [
  "Use the rule to choose.",
  "Sort the examples.",
  "Build the missing part.",
  "Apply what you know."
];
export default function RelativePronounsGame({ level, onComplete }) {
  return <EnglishPracticeGame level={level} build={buildRelativePronounsQuestions} titles={TITLES} onComplete={onComplete} />;
}
