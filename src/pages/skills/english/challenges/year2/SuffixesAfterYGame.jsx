import DataChallenge from "../../../../../components/challenge/data/DataChallenge";
import { buildQuestions } from "../../../../../data/challenges/english/year2SuffixesAfterY";
const TITLES = ["Suffixes after y: Choose the spelling.", "Suffixes after y: Sort the spellings.", "Suffixes after y: Build the word.", "Suffixes after y: Spell the word."];
export default function SuffixesAfterYGame({ level, onComplete }) {
  return <DataChallenge level={level} build={buildQuestions} titles={TITLES} onComplete={onComplete} />;
}
