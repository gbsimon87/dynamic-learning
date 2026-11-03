import EnglishPracticeGame from "../EnglishPracticeGame";
import { buildBracketsDashesAndCommasQuestions } from "../../../../../data/challenges/english/year5BracketsDashesAndCommas";
const TITLES = [
  "Use the rule to choose.",
  "Sort the examples.",
  "Build the missing part.",
  "Apply what you know."
];
export default function BracketsDashesAndCommasGame({ level, onComplete }) {
  return <EnglishPracticeGame level={level} build={buildBracketsDashesAndCommasQuestions} titles={TITLES} onComplete={onComplete} />;
}
