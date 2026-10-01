import EnglishPracticeGame from "../EnglishPracticeGame";
import { buildApostrophesForPluralPossessionQuestions } from "../../../../../data/challenges/english/year4ApostrophesForPluralPossession";
const TITLES = [
  "Use the rule to choose.",
  "Sort the examples.",
  "Build the missing part.",
  "Apply what you know."
];
export default function ApostrophesForPluralPossessionGame({ level, onComplete }) {
  return <EnglishPracticeGame level={level} build={buildApostrophesForPluralPossessionQuestions} titles={TITLES} onComplete={onComplete} />;
}
