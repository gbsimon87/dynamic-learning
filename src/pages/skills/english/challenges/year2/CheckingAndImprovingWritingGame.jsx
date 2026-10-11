import DataChallenge from "../../../../../components/challenge/data/DataChallenge";
import { buildQuestions } from "../../../../../data/challenges/english/year2CheckingAndImprovingWriting";
const TITLES = ["Checking and Improving Writing: Read and choose.", "Checking and Improving Writing: Sort the answers.", "Checking and Improving Writing: Build the missing part.", "Checking and Improving Writing: Try it yourself."];
export default function CheckingAndImprovingWritingGame({ level, onComplete }) {
  return <DataChallenge level={level} build={buildQuestions} titles={TITLES} onComplete={onComplete} />;
}
