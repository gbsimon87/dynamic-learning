import EnglishPracticeGame from "../EnglishPracticeGame";
import { buildVerbPrefixesQuestions } from "../../../../../data/challenges/english/year5VerbPrefixes";
const TITLES = [
  "Use the rule to choose.",
  "Sort the examples.",
  "Build the missing part.",
  "Apply what you know."
];
export default function VerbPrefixesGame({ level, onComplete }) {
  return <EnglishPracticeGame level={level} build={buildVerbPrefixesQuestions} titles={TITLES} onComplete={onComplete} />;
}
