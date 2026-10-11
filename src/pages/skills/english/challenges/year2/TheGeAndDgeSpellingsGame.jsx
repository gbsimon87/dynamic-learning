import DataChallenge from "../../../../../components/challenge/data/DataChallenge";
import { buildQuestions } from "../../../../../data/challenges/english/year2TheGeAndDgeSpellings";
const TITLES = ["The ge and dge Spellings: Choose the spelling.", "The ge and dge Spellings: Sort the spellings.", "The ge and dge Spellings: Build the word.", "The ge and dge Spellings: Spell the word."];
export default function TheGeAndDgeSpellingsGame({ level, onComplete }) {
  return <DataChallenge level={level} build={buildQuestions} titles={TITLES} onComplete={onComplete} />;
}
