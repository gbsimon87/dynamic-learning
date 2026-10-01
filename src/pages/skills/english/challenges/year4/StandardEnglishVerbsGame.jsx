import EnglishPracticeGame from "../EnglishPracticeGame";
import { buildStandardEnglishVerbsQuestions } from "../../../../../data/challenges/english/year4StandardEnglishVerbs";
const TITLES = [
  "Use the rule to choose.",
  "Sort the examples.",
  "Build the missing part.",
  "Apply what you know."
];
export default function StandardEnglishVerbsGame({ level, onComplete }) {
  return <EnglishPracticeGame level={level} build={buildStandardEnglishVerbsQuestions} titles={TITLES} onComplete={onComplete} />;
}
