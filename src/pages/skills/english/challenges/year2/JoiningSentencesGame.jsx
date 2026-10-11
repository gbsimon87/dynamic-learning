import DataChallenge from "../../../../../components/challenge/data/DataChallenge";
import { buildQuestions } from "../../../../../data/challenges/english/year2JoiningSentences";
const TITLES = ["Joining Sentences: Read and choose.", "Joining Sentences: Sort the answers.", "Joining Sentences: Build the missing part.", "Joining Sentences: Try it yourself."];
export default function JoiningSentencesGame({ level, onComplete }) {
  return <DataChallenge level={level} build={buildQuestions} titles={TITLES} onComplete={onComplete} />;
}
