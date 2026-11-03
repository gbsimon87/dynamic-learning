import EnglishPracticeGame from "../EnglishPracticeGame";
import { buildTheEndingsAbleAndIbleQuestions } from "../../../../../data/challenges/english/year5TheEndingsAbleAndIble";
const TITLES = [
  "Use the rule to choose.",
  "Sort the examples.",
  "Build the missing part.",
  "Apply what you know."
];
export default function TheEndingsAbleAndIbleGame({ level, onComplete }) {
  return <EnglishPracticeGame level={level} build={buildTheEndingsAbleAndIbleQuestions} titles={TITLES} onComplete={onComplete} />;
}
