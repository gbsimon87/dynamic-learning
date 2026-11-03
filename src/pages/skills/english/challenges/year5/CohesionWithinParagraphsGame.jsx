import EnglishPracticeGame from "../EnglishPracticeGame";
import { buildCohesionWithinParagraphsQuestions } from "../../../../../data/challenges/english/year5CohesionWithinParagraphs";
const TITLES = [
  "Use the rule to choose.",
  "Sort the examples.",
  "Build the missing part.",
  "Apply what you know."
];
export default function CohesionWithinParagraphsGame({ level, onComplete }) {
  return <EnglishPracticeGame level={level} build={buildCohesionWithinParagraphsQuestions} titles={TITLES} onComplete={onComplete} />;
}
