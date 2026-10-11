import DataChallenge from "../../../../../components/challenge/data/DataChallenge";
import { buildQuestions } from "../../../../../data/challenges/english/year2DoublingTheLastLetter";
const TITLES = ["Doubling the Last Letter: Choose the spelling.", "Doubling the Last Letter: Sort the spellings.", "Doubling the Last Letter: Build the word.", "Doubling the Last Letter: Spell the word."];
export default function DoublingTheLastLetterGame({ level, onComplete }) {
  return <DataChallenge level={level} build={buildQuestions} titles={TITLES} onComplete={onComplete} />;
}
