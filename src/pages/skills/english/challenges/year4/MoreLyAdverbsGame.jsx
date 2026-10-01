import EnglishPracticeGame from "../EnglishPracticeGame";
import { buildMoreLyAdverbsQuestions } from "../../../../../data/challenges/english/year4MoreLyAdverbs";
const TITLES = [
  "Use the rule to choose.",
  "Sort the examples.",
  "Build the missing part.",
  "Apply what you know."
];
export default function MoreLyAdverbsGame({ level, onComplete }) {
  return <EnglishPracticeGame level={level} build={buildMoreLyAdverbsQuestions} titles={TITLES} onComplete={onComplete} />;
}
