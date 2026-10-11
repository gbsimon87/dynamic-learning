import DataChallenge from "../../../../../components/challenge/data/DataChallenge";
import { buildQuestions } from "../../../../../data/challenges/english/year2PoemsAndRepeatedPhrases";
const TITLES = ["Poems and Repeated Phrases: Read and choose.", "Poems and Repeated Phrases: Read the whole text.", "Poems and Repeated Phrases: Find the evidence (clue in the text).", "Poems and Repeated Phrases: Use the whole text."];
export default function PoemsAndRepeatedPhrasesGame({ level, onComplete }) {
  return <DataChallenge level={level} build={buildQuestions} titles={TITLES} onComplete={onComplete} />;
}
