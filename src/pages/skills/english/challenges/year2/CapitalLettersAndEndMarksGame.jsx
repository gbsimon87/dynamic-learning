import DataChallenge from "../../../../../components/challenge/data/DataChallenge";
import { buildQuestions } from "../../../../../data/challenges/english/year2CapitalLettersAndEndMarks";
const TITLES = ["Capital Letters and End Marks: Read and choose.", "Capital Letters and End Marks: Sort the answers.", "Capital Letters and End Marks: Build the missing part.", "Capital Letters and End Marks: Try it yourself."];
export default function CapitalLettersAndEndMarksGame({ level, onComplete }) {
  return <DataChallenge level={level} build={buildQuestions} titles={TITLES} onComplete={onComplete} />;
}
