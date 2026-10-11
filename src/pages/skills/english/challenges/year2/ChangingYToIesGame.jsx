import DataChallenge from "../../../../../components/challenge/data/DataChallenge";
import { buildQuestions } from "../../../../../data/challenges/english/year2ChangingYToIes";
const TITLES = ["Changing y to ies: Choose the spelling.", "Changing y to ies: Sort the spellings.", "Changing y to ies: Build the word.", "Changing y to ies: Spell the word."];
export default function ChangingYToIesGame({ level, onComplete }) {
  return <DataChallenge level={level} build={buildQuestions} titles={TITLES} onComplete={onComplete} />;
}
