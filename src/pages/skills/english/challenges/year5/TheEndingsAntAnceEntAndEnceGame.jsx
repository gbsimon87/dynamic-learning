import EnglishPracticeGame from "../EnglishPracticeGame";
import { buildTheEndingsAntAnceEntAndEnceQuestions } from "../../../../../data/challenges/english/year5TheEndingsAntAnceEntAndEnce";
const TITLES = [
  "Use the rule to choose.",
  "Sort the examples.",
  "Build the missing part.",
  "Apply what you know."
];
export default function TheEndingsAntAnceEntAndEnceGame({ level, onComplete }) {
  return <EnglishPracticeGame level={level} build={buildTheEndingsAntAnceEntAndEnceQuestions} titles={TITLES} onComplete={onComplete} />;
}
