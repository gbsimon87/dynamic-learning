import DataChallenge from "../../../../../components/challenge/data/DataChallenge";
import { buildQuestions } from "../../../../../data/challenges/english/year2FairyStoriesAndTraditionalTales";
const TITLES = ["Fairy Stories and Traditional Tales: Read and choose.", "Fairy Stories and Traditional Tales: Read the whole text.", "Fairy Stories and Traditional Tales: Find the evidence (clue in the text).", "Fairy Stories and Traditional Tales: Use the whole text."];
export default function FairyStoriesAndTraditionalTalesGame({ level, onComplete }) {
  return <DataChallenge level={level} build={buildQuestions} titles={TITLES} onComplete={onComplete} />;
}
