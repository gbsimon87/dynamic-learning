import DataChallenge from "../../../../../components/challenge/data/DataChallenge";
import { buildQuestions } from "../../../../../data/challenges/english/year2TheLeElAlAndIlEndings";
const TITLES = ["The le, el, al and il Endings: Choose the spelling.", "The le, el, al and il Endings: Sort the spellings.", "The le, el, al and il Endings: Build the word.", "The le, el, al and il Endings: Spell the word."];
export default function TheLeElAlAndIlEndingsGame({ level, onComplete }) {
  return <DataChallenge level={level} build={buildQuestions} titles={TITLES} onComplete={onComplete} />;
}
