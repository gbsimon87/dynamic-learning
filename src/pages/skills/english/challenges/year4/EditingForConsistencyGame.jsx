import EnglishPracticeGame from "../EnglishPracticeGame";
import { buildEditingForConsistencyQuestions } from "../../../../../data/challenges/english/year4EditingForConsistency";
const TITLES = [
  "Use the rule to choose.",
  "Sort the examples.",
  "Build the missing part.",
  "Apply what you know."
];
export default function EditingForConsistencyGame({ level, onComplete }) {
  return <EnglishPracticeGame level={level} build={buildEditingForConsistencyQuestions} titles={TITLES} onComplete={onComplete} />;
}
