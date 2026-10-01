import EnglishPracticeGame from "../EnglishPracticeGame";
import { buildThePrefixesIlImAndIrQuestions } from "../../../../../data/challenges/english/year4ThePrefixesIlImAndIr";
const TITLES = [
  "Use the rule to choose.",
  "Sort the examples.",
  "Build the missing part.",
  "Apply what you know."
];
export default function ThePrefixesIlImAndIrGame({ level, onComplete }) {
  return <EnglishPracticeGame level={level} build={buildThePrefixesIlImAndIrQuestions} titles={TITLES} onComplete={onComplete} />;
}
