import ReadingTopicGame from "../year3/ReadingTopicGame";
import { buildHeadingsBulletPointsAndUnderliningQuestions } from "../../../../../data/challenges/english/year5HeadingsBulletPointsAndUnderlining";
const TITLES = [
  "Read the short extract.",
  "Sort the details.",
  "Tap the evidence in the text.",
  "Read the whole text and apply what you know."
];
export default function HeadingsBulletPointsAndUnderliningGame({ level, onComplete }) {
  return <ReadingTopicGame level={level} build={buildHeadingsBulletPointsAndUnderliningQuestions} titles={TITLES} onComplete={onComplete} />;
}
