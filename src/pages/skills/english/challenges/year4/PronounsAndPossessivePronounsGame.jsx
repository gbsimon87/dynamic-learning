import EnglishPracticeGame from "../EnglishPracticeGame";
import { buildPronounsAndPossessivePronounsQuestions } from "../../../../../data/challenges/english/year4PronounsAndPossessivePronouns";
const TITLES = [
  "Use the rule to choose.",
  "Sort the examples.",
  "Build the missing part.",
  "Apply what you know."
];
export default function PronounsAndPossessivePronounsGame({ level, onComplete }) {
  return <EnglishPracticeGame level={level} build={buildPronounsAndPossessivePronounsQuestions} titles={TITLES} onComplete={onComplete} />;
}
