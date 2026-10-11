import DataChallenge from "../../../../../components/challenge/data/DataChallenge";
import { buildQuestions } from "../../../../../data/challenges/english/year2PresentAndPastTense";
const TITLES = ["Present and Past Tense: Read and choose.", "Present and Past Tense: Sort the answers.", "Present and Past Tense: Build the missing part.", "Present and Past Tense: Try it yourself."];
export default function PresentAndPastTenseGame({ level, onComplete }) {
  return <DataChallenge level={level} build={buildQuestions} titles={TITLES} onComplete={onComplete} />;
}
