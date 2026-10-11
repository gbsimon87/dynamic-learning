import DataChallenge from "../../../../../components/challenge/data/DataChallenge";
import { buildQuestions } from "../../../../../data/challenges/english/year2UnderstandingCharacters";
const TITLES = ["Understanding Characters: Read and choose.", "Understanding Characters: Read the whole text.", "Understanding Characters: Find the evidence (clue in the text).", "Understanding Characters: Use the whole text."];
export default function UnderstandingCharactersGame({ level, onComplete }) {
  return <DataChallenge level={level} build={buildQuestions} titles={TITLES} onComplete={onComplete} />;
}
