import ReadingTopicGame from "../year3/ReadingTopicGame";
import { buildMainIdeasAndSummariesQuestions } from "../../../../../data/challenges/english/year4MainIdeasAndSummaries";
const TITLES = [
  "Read the short extract.",
  "Group related details.",
  "Tap the evidence in the text.",
  "Read the whole text and apply what you know."
];
export default function MainIdeasAndSummariesGame({ level, onComplete }) {
  return <ReadingTopicGame level={level} build={buildMainIdeasAndSummariesQuestions} titles={TITLES} onComplete={onComplete} />;
}
