import EnglishPracticeGame from "../EnglishPracticeGame";
import { buildTheSuffixOusQuestions } from "../../../../../data/challenges/english/year4TheSuffixOus";
const TITLES = [
  "Use the rule to choose.",
  "Sort the examples.",
  "Build the missing part.",
  "Apply what you know."
];
export default function TheSuffixOusGame({ level, onComplete }) {
  return <EnglishPracticeGame level={level} build={buildTheSuffixOusQuestions} titles={TITLES} onComplete={onComplete} />;
}
