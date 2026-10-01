import ReadingTopicGame from "../year3/ReadingTopicGame";
import { buildParagraphsAroundAThemeQuestions } from "../../../../../data/challenges/english/year4ParagraphsAroundATheme";
const TITLES = [
  "Read the short extract.",
  "Group related details.",
  "Tap the evidence in the text.",
  "Read the whole text and apply what you know."
];
export default function ParagraphsAroundAThemeGame({ level, onComplete }) {
  return <ReadingTopicGame level={level} build={buildParagraphsAroundAThemeQuestions} titles={TITLES} onComplete={onComplete} />;
}
