import DataChallenge from "../../../../../components/challenge/data/DataChallenge";
import { buildQuestions } from "../../../../../data/challenges/english/year2CommonExceptionWords";
const TITLES = ["Common Exception Words: Choose the spelling.", "Common Exception Words: Sort the spellings.", "Common Exception Words: Build the word.", "Common Exception Words: Spell the word."];
export default function CommonExceptionWordsGame({ level, onComplete }) {
  return <DataChallenge level={level} build={buildQuestions} titles={TITLES} onComplete={onComplete} />;
}
