import EnglishPracticeGame from "../EnglishPracticeGame";
import { buildTheEndingsCialAndTialQuestions } from "../../../../../data/challenges/english/year5TheEndingsCialAndTial";
const TITLES = [
  "Use the rule to choose.",
  "Sort the examples.",
  "Build the missing part.",
  "Apply what you know."
];
export default function TheEndingsCialAndTialGame({ level, onComplete }) {
  return <EnglishPracticeGame level={level} build={buildTheEndingsCialAndTialQuestions} titles={TITLES} onComplete={onComplete} />;
}
