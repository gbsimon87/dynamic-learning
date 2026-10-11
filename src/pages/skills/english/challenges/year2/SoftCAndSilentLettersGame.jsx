import DataChallenge from "../../../../../components/challenge/data/DataChallenge";
import { buildQuestions } from "../../../../../data/challenges/english/year2SoftCAndSilentLetters";
const TITLES = ["Soft c and Silent Letters: Choose the spelling.", "Soft c and Silent Letters: Sort the spellings.", "Soft c and Silent Letters: Build the word.", "Soft c and Silent Letters: Spell the word."];
export default function SoftCAndSilentLettersGame({ level, onComplete }) {
  return <DataChallenge level={level} build={buildQuestions} titles={TITLES} onComplete={onComplete} />;
}
