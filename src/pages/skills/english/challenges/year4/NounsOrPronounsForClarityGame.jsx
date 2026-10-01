import EnglishPracticeGame from "../EnglishPracticeGame";
import { buildNounsOrPronounsForClarityQuestions } from "../../../../../data/challenges/english/year4NounsOrPronounsForClarity";
const TITLES = [
  "Use the rule to choose.",
  "Sort the examples.",
  "Build the missing part.",
  "Apply what you know."
];
export default function NounsOrPronounsForClarityGame({ level, onComplete }) {
  return <EnglishPracticeGame level={level} build={buildNounsOrPronounsForClarityQuestions} titles={TITLES} onComplete={onComplete} />;
}
