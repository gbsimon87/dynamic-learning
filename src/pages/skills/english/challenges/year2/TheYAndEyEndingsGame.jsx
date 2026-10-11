import DataChallenge from "../../../../../components/challenge/data/DataChallenge";
import { buildQuestions } from "../../../../../data/challenges/english/year2TheYAndEyEndings";
const TITLES = ["The y and ey Endings: Choose the spelling.", "The y and ey Endings: Sort the spellings.", "The y and ey Endings: Build the word.", "The y and ey Endings: Spell the word."];
export default function TheYAndEyEndingsGame({ level, onComplete }) {
  return <DataChallenge level={level} build={buildQuestions} titles={TITLES} onComplete={onComplete} />;
}
