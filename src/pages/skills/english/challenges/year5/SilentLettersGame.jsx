import EnglishPracticeGame from "../EnglishPracticeGame";
import { buildSilentLettersQuestions } from "../../../../../data/challenges/english/year5SilentLetters";
const TITLES = [
  "Use the rule to choose.",
  "Sort the examples.",
  "Build the missing part.",
  "Apply what you know."
];
export default function SilentLettersGame({ level, onComplete }) {
  return <EnglishPracticeGame level={level} build={buildSilentLettersQuestions} titles={TITLES} onComplete={onComplete} />;
}
