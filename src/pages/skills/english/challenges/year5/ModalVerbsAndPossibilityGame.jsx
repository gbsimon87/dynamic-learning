import EnglishPracticeGame from "../EnglishPracticeGame";
import { buildModalVerbsAndPossibilityQuestions } from "../../../../../data/challenges/english/year5ModalVerbsAndPossibility";
const TITLES = [
  "Use the rule to choose.",
  "Sort the examples.",
  "Build the missing part.",
  "Apply what you know."
];
export default function ModalVerbsAndPossibilityGame({ level, onComplete }) {
  return <EnglishPracticeGame level={level} build={buildModalVerbsAndPossibilityQuestions} titles={TITLES} onComplete={onComplete} />;
}
