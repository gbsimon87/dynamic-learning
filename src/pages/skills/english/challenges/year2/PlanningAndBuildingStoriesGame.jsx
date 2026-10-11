import DataChallenge from "../../../../../components/challenge/data/DataChallenge";
import { buildQuestions } from "../../../../../data/challenges/english/year2PlanningAndBuildingStories";
const TITLES = ["Planning and Building Stories: Read and choose.", "Planning and Building Stories: Sort the answers.", "Planning and Building Stories: Build the missing part.", "Planning and Building Stories: Try it yourself."];
export default function PlanningAndBuildingStoriesGame({ level, onComplete }) {
  return <DataChallenge level={level} build={buildQuestions} titles={TITLES} onComplete={onComplete} />;
}
