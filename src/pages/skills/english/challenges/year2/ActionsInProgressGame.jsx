import DataChallenge from "../../../../../components/challenge/data/DataChallenge";
import { buildQuestions } from "../../../../../data/challenges/english/year2ActionsInProgress";
const TITLES = ["Actions in Progress: Read and choose.", "Actions in Progress: Sort the answers.", "Actions in Progress: Build the missing part.", "Actions in Progress: Try it yourself."];
export default function ActionsInProgressGame({ level, onComplete }) {
  return <DataChallenge level={level} build={buildQuestions} titles={TITLES} onComplete={onComplete} />;
}
