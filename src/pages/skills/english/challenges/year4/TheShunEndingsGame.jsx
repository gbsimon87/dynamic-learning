import EnglishPracticeGame from "../EnglishPracticeGame";
import { buildTheShunEndingsQuestions } from "../../../../../data/challenges/english/year4TheShunEndings";
const TITLES = [
  "Use the rule to choose.",
  "Sort the examples.",
  "Build the missing part.",
  "Apply what you know."
];
export default function TheShunEndingsGame({ level, onComplete }) {
  return <EnglishPracticeGame level={level} build={buildTheShunEndingsQuestions} titles={TITLES} onComplete={onComplete} />;
}
