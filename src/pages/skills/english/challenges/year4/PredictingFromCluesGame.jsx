import ReadingTopicGame from "../year3/ReadingTopicGame";
import { buildPredictingFromCluesQuestions } from "../../../../../data/challenges/english/year4PredictingFromClues";
const TITLES = [
  "Read the short extract.",
  "Group related details.",
  "Tap the evidence in the text.",
  "Read the whole text and apply what you know."
];
export default function PredictingFromCluesGame({ level, onComplete }) {
  return <ReadingTopicGame level={level} build={buildPredictingFromCluesQuestions} titles={TITLES} onComplete={onComplete} />;
}
