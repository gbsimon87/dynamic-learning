import EnglishPracticeGame from "../EnglishPracticeGame";
import { buildAudiencePurposeAndFormQuestions } from "../../../../../data/challenges/english/year5AudiencePurposeAndForm";
const TITLES = [
  "Use the rule to choose.",
  "Sort the examples.",
  "Build the missing part.",
  "Apply what you know."
];
export default function AudiencePurposeAndFormGame({ level, onComplete }) {
  return <EnglishPracticeGame level={level} build={buildAudiencePurposeAndFormQuestions} titles={TITLES} onComplete={onComplete} />;
}
