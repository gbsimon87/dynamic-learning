import DataChallenge from "../../../../../components/challenge/data/DataChallenge";
import { buildQuestions } from "../../../../../data/challenges/english/year2AskingQuestionsAndDiscussingBooks";
const TITLES = ["Asking Questions and Discussing Books: Read and choose.", "Asking Questions and Discussing Books: Read the whole text.", "Asking Questions and Discussing Books: Find the evidence (clue in the text).", "Asking Questions and Discussing Books: Use the whole text."];
export default function AskingQuestionsAndDiscussingBooksGame({ level, onComplete }) {
  return <DataChallenge level={level} build={buildQuestions} titles={TITLES} onComplete={onComplete} />;
}
