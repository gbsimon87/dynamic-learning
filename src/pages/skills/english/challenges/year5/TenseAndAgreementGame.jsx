import EnglishPracticeGame from "../EnglishPracticeGame";
import { buildTenseAndAgreementQuestions } from "../../../../../data/challenges/english/year5TenseAndAgreement";
const TITLES = [
  "Use the rule to choose.",
  "Sort the examples.",
  "Build the missing part.",
  "Apply what you know."
];
export default function TenseAndAgreementGame({ level, onComplete }) {
  return <EnglishPracticeGame level={level} build={buildTenseAndAgreementQuestions} titles={TITLES} onComplete={onComplete} />;
}
