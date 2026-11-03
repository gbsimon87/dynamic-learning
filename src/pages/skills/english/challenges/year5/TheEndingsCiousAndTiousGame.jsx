import EnglishPracticeGame from "../EnglishPracticeGame";
import { buildTheEndingsCiousAndTiousQuestions } from "../../../../../data/challenges/english/year5TheEndingsCiousAndTious";
const TITLES = [
  "Use the rule to choose.",
  "Sort the examples.",
  "Build the missing part.",
  "Apply what you know."
];
export default function TheEndingsCiousAndTiousGame({ level, onComplete }) {
  return <EnglishPracticeGame level={level} build={buildTheEndingsCiousAndTiousQuestions} titles={TITLES} onComplete={onComplete} />;
}
