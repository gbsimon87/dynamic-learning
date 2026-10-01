import EnglishPracticeGame from "../EnglishPracticeGame";
import { buildPluralOrPossessiveQuestions } from "../../../../../data/challenges/english/year4PluralOrPossessive";
const TITLES = [
  "Use the rule to choose.",
  "Sort the examples.",
  "Build the missing part.",
  "Apply what you know."
];
export default function PluralOrPossessiveGame({ level, onComplete }) {
  return <EnglishPracticeGame level={level} build={buildPluralOrPossessiveQuestions} titles={TITLES} onComplete={onComplete} />;
}
