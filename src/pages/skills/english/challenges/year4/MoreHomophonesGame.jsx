import EnglishPracticeGame from "../EnglishPracticeGame";
import { buildMoreHomophonesQuestions } from "../../../../../data/challenges/english/year4MoreHomophones";
const TITLES = [
  "Use the rule to choose.",
  "Sort the examples.",
  "Build the missing part.",
  "Apply what you know."
];
export default function MoreHomophonesGame({ level, onComplete }) {
  return <EnglishPracticeGame level={level} build={buildMoreHomophonesQuestions} titles={TITLES} onComplete={onComplete} />;
}
