import DataChallenge from "../../../../../components/challenge/data/DataChallenge";
import { buildQuestions } from "../../../../../data/challenges/english/year2ReadingLongerWords";
const TITLES = ["Reading Longer Words: Choose the spelling.", "Reading Longer Words: Sort the spellings.", "Reading Longer Words: Build the word.", "Reading Longer Words: Spell the word."];
export default function ReadingLongerWordsGame({ level, onComplete }) {
  return <DataChallenge level={level} build={buildQuestions} titles={TITLES} onComplete={onComplete} />;
}
