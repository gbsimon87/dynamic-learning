import DataChallenge from "../../../../../components/challenge/data/DataChallenge";
import { buildQuestions } from "../../../../../data/challenges/english/year2ApostrophesForOwnership";
const TITLES = ["Apostrophes for Ownership: Choose the spelling.", "Apostrophes for Ownership: Sort the spellings.", "Apostrophes for Ownership: Build the word.", "Apostrophes for Ownership: Spell the word."];
export default function ApostrophesForOwnershipGame({ level, onComplete }) {
  return <DataChallenge level={level} build={buildQuestions} titles={TITLES} onComplete={onComplete} />;
}
