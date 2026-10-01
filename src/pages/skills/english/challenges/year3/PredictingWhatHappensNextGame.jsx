import ReadingTopicGame from "./ReadingTopicGame";
import { buildPredictingQuestions } from "../../../../../data/challenges/english/predictingWhatHappensNext";

const TITLES = [
  "Use the clues to predict: what will probably happen next?",
  "Clues help us predict. Sort each clue to the prediction it supports.",
  "Tap the sentence that gives the clue.",
  "Read the story, then predict.",
];

function PredictingWhatHappensNextGame({ level, onComplete }) {
  return <ReadingTopicGame level={level} titles={TITLES} build={buildPredictingQuestions} onComplete={onComplete} />;
}

export default PredictingWhatHappensNextGame;
