import EnglishPracticeGame from "../EnglishPracticeGame";
import { buildRelativeClausesQuestions } from "../../../../../data/challenges/english/year5RelativeClauses";
const TITLES = [
  "Use the rule to choose.",
  "Sort the examples.",
  "Build the missing part.",
  "Apply what you know."
];
export default function RelativeClausesGame({ level, onComplete }) {
  return <EnglishPracticeGame level={level} build={buildRelativeClausesQuestions} titles={TITLES} onComplete={onComplete} />;
}
