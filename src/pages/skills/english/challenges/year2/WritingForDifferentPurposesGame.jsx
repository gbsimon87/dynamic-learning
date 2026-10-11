import DataChallenge from "../../../../../components/challenge/data/DataChallenge";
import { buildQuestions } from "../../../../../data/challenges/english/year2WritingForDifferentPurposes";
const TITLES = ["Writing for Different Purposes: Read and choose.", "Writing for Different Purposes: Sort the answers.", "Writing for Different Purposes: Build the missing part.", "Writing for Different Purposes: Try it yourself."];
export default function WritingForDifferentPurposesGame({ level, onComplete }) {
  return <DataChallenge level={level} build={buildQuestions} titles={TITLES} onComplete={onComplete} />;
}
