import DataChallenge from "../../../../../components/challenge/data/DataChallenge";
import { buildQuestions } from "../../../../../data/challenges/english/year2WritingAboutRealEvents";
const TITLES = ["Writing about Real Events: Read and choose.", "Writing about Real Events: Sort the answers.", "Writing about Real Events: Build the missing part.", "Writing about Real Events: Try it yourself."];
export default function WritingAboutRealEventsGame({ level, onComplete }) {
  return <DataChallenge level={level} build={buildQuestions} titles={TITLES} onComplete={onComplete} />;
}
