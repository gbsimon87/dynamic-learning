import EnglishPracticeGame from "../EnglishPracticeGame";
import { buildTheEndingsGueAndQueQuestions } from "../../../../../data/challenges/english/year4TheEndingsGueAndQue";
const TITLES = [
  "Use the rule to choose.",
  "Sort the examples.",
  "Build the missing part.",
  "Apply what you know."
];
export default function TheEndingsGueAndQueGame({ level, onComplete }) {
  return <EnglishPracticeGame level={level} build={buildTheEndingsGueAndQueQuestions} titles={TITLES} onComplete={onComplete} />;
}
