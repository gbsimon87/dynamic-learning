import EnglishPracticeGame from "../EnglishPracticeGame";
import { buildCommasToAvoidAmbiguityQuestions } from "../../../../../data/challenges/english/year5CommasToAvoidAmbiguity";
const TITLES = [
  "Use the rule to choose.",
  "Sort the examples.",
  "Build the missing part.",
  "Apply what you know."
];
export default function CommasToAvoidAmbiguityGame({ level, onComplete }) {
  return <EnglishPracticeGame level={level} build={buildCommasToAvoidAmbiguityQuestions} titles={TITLES} onComplete={onComplete} />;
}
