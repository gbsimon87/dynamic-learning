import EnglishPracticeGame from "../EnglishPracticeGame";
import { buildLinkingParagraphsQuestions } from "../../../../../data/challenges/english/year5LinkingParagraphs";
const TITLES = [
  "Use the rule to choose.",
  "Sort the examples.",
  "Build the missing part.",
  "Apply what you know."
];
export default function LinkingParagraphsGame({ level, onComplete }) {
  return <EnglishPracticeGame level={level} build={buildLinkingParagraphsQuestions} titles={TITLES} onComplete={onComplete} />;
}
