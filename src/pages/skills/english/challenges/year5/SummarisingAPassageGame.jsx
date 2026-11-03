import ReadingTopicGame from "../year3/ReadingTopicGame";
import { buildSummarisingAPassageQuestions } from "../../../../../data/challenges/english/year5SummarisingAPassage";
const TITLES = [
  "Read the short extract.",
  "Sort the details.",
  "Tap the evidence in the text.",
  "Read the whole text and apply what you know."
];
export default function SummarisingAPassageGame({ level, onComplete }) {
  return <ReadingTopicGame level={level} build={buildSummarisingAPassageQuestions} titles={TITLES} onComplete={onComplete} />;
}
