import EnglishPracticeGame from "../EnglishPracticeGame";
import { buildMakingVerbsWithAteIseAndIfyQuestions } from "../../../../../data/challenges/english/year5MakingVerbsWithAteIseAndIfy";
const TITLES = [
  "Use the rule to choose.",
  "Sort the examples.",
  "Build the missing part.",
  "Apply what you know."
];
export default function MakingVerbsWithAteIseAndIfyGame({ level, onComplete }) {
  return <EnglishPracticeGame level={level} build={buildMakingVerbsWithAteIseAndIfyQuestions} titles={TITLES} onComplete={onComplete} />;
}
