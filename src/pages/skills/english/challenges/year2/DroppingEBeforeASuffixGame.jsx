import DataChallenge from "../../../../../components/challenge/data/DataChallenge";
import { buildQuestions } from "../../../../../data/challenges/english/year2DroppingEBeforeASuffix";
const TITLES = ["Dropping e before a Suffix: Choose the spelling.", "Dropping e before a Suffix: Sort the spellings.", "Dropping e before a Suffix: Build the word.", "Dropping e before a Suffix: Spell the word."];
export default function DroppingEBeforeASuffixGame({ level, onComplete }) {
  return <DataChallenge level={level} build={buildQuestions} titles={TITLES} onComplete={onComplete} />;
}
