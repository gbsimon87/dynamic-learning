import EnglishPracticeGame from "../EnglishPracticeGame";
import { buildTheLettersEiAfterCQuestions } from "../../../../../data/challenges/english/year5TheLettersEiAfterC";
const TITLES = [
  "Use the rule to choose.",
  "Sort the examples.",
  "Build the missing part.",
  "Apply what you know."
];
export default function TheLettersEiAfterCGame({ level, onComplete }) {
  return <EnglishPracticeGame level={level} build={buildTheLettersEiAfterCQuestions} titles={TITLES} onComplete={onComplete} />;
}
