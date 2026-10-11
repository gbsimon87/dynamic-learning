import DataChallenge from "../../../../../components/challenge/data/DataChallenge";
import { buildQuestions } from "../../../../../data/challenges/english/year2PredictingFromAStory";
const TITLES = ["Predicting from a Story: Read and choose.", "Predicting from a Story: Read the whole text.", "Predicting from a Story: Find the evidence (clue in the text).", "Predicting from a Story: Use the whole text."];
export default function PredictingFromAStoryGame({ level, onComplete }) {
  return <DataChallenge level={level} build={buildQuestions} titles={TITLES} onComplete={onComplete} />;
}
