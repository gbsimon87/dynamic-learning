import EnglishPracticeGame from "../EnglishPracticeGame";
import { buildTheSoundsEiEighAndEyQuestions } from "../../../../../data/challenges/english/year4TheSoundsEiEighAndEy";
const TITLES = [
  "Use the rule to choose.",
  "Sort the examples.",
  "Build the missing part.",
  "Apply what you know."
];
export default function TheSoundsEiEighAndEyGame({ level, onComplete }) {
  return <EnglishPracticeGame level={level} build={buildTheSoundsEiEighAndEyQuestions} titles={TITLES} onComplete={onComplete} />;
}
