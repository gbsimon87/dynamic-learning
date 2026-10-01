import EnglishPracticeGame from "../EnglishPracticeGame";
import { buildTheLettersScQuestions } from "../../../../../data/challenges/english/year4TheLettersSc";
const TITLES = [
  "Use the rule to choose.",
  "Sort the examples.",
  "Build the missing part.",
  "Apply what you know."
];
export default function TheLettersScGame({ level, onComplete }) {
  return <EnglishPracticeGame level={level} build={buildTheLettersScQuestions} titles={TITLES} onComplete={onComplete} />;
}
