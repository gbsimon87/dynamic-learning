import DataChallenge from "../../../../../components/challenge/data/DataChallenge";
import { buildQuestions } from "../../../../../data/challenges/english/year2BuildingPoems";
const TITLES = ["Building Poems: Read and choose.", "Building Poems: Sort the answers.", "Building Poems: Build the missing part.", "Building Poems: Try it yourself."];
export default function BuildingPoemsGame({ level, onComplete }) {
  return <DataChallenge level={level} build={buildQuestions} titles={TITLES} onComplete={onComplete} />;
}
