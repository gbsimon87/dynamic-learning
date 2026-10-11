import DataChallenge from "../../../../../components/challenge/data/DataChallenge";
import { buildQuestions } from "../../../../../data/challenges/english/year2ReadingWordsWithSuffixes";
const TITLES = ["Reading Words with Suffixes: Choose the spelling.", "Reading Words with Suffixes: Sort the spellings.", "Reading Words with Suffixes: Build the word.", "Reading Words with Suffixes: Spell the word."];
export default function ReadingWordsWithSuffixesGame({ level, onComplete }) {
  return <DataChallenge level={level} build={buildQuestions} titles={TITLES} onComplete={onComplete} />;
}
