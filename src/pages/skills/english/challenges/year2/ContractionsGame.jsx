import DataChallenge from "../../../../../components/challenge/data/DataChallenge";
import { buildQuestions } from "../../../../../data/challenges/english/year2Contractions";
const TITLES = ["Contractions: Choose the spelling.", "Contractions: Sort the spellings.", "Contractions: Build the word.", "Contractions: Spell the word."];
export default function ContractionsGame({ level, onComplete }) {
  return <DataChallenge level={level} build={buildQuestions} titles={TITLES} onComplete={onComplete} />;
}
