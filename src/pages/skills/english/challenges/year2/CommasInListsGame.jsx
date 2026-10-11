import DataChallenge from "../../../../../components/challenge/data/DataChallenge";
import { buildQuestions } from "../../../../../data/challenges/english/year2CommasInLists";
const TITLES = ["Commas in Lists: Read and choose.", "Commas in Lists: Sort the answers.", "Commas in Lists: Build the missing part.", "Commas in Lists: Try it yourself."];
export default function CommasInListsGame({ level, onComplete }) {
  return <DataChallenge level={level} build={buildQuestions} titles={TITLES} onComplete={onComplete} />;
}
