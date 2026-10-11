import DataChallenge from "../../../../../components/challenge/data/DataChallenge";
import { buildQuestions } from "../../../../../data/challenges/english/year2HomophonesAndNearHomophones";
const TITLES = ["Homophones and Near Homophones: Choose the spelling.", "Homophones and Near Homophones: Sort the spellings.", "Homophones and Near Homophones: Build the word.", "Homophones and Near Homophones: Spell the word."];
export default function HomophonesAndNearHomophonesGame({ level, onComplete }) {
  return <DataChallenge level={level} build={buildQuestions} titles={TITLES} onComplete={onComplete} />;
}
