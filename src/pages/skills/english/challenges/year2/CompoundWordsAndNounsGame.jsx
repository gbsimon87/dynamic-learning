import DataChallenge from "../../../../../components/challenge/data/DataChallenge";
import { buildQuestions } from "../../../../../data/challenges/english/year2CompoundWordsAndNouns";
const TITLES = ["Compound Words and Nouns: Choose the spelling.", "Compound Words and Nouns: Sort the spellings.", "Compound Words and Nouns: Build the word.", "Compound Words and Nouns: Spell the word."];
export default function CompoundWordsAndNounsGame({ level, onComplete }) {
  return <DataChallenge level={level} build={buildQuestions} titles={TITLES} onComplete={onComplete} />;
}
