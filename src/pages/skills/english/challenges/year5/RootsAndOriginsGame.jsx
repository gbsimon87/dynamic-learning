import EnglishPracticeGame from "../EnglishPracticeGame";
import { buildRootsAndOriginsQuestions } from "../../../../../data/challenges/english/year5RootsAndOrigins";
const TITLES = [
  "Use the rule to choose.",
  "Sort the examples.",
  "Build the missing part.",
  "Apply what you know."
];
export default function RootsAndOriginsGame({ level, onComplete }) {
  return <EnglishPracticeGame level={level} build={buildRootsAndOriginsQuestions} titles={TITLES} onComplete={onComplete} />;
}
