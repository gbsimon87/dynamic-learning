import DataChallenge from "../../../../../components/challenge/data/DataChallenge";
import { buildQuestions } from "../../../../../data/challenges/english/year2FindingFactsInNonFiction";
const TITLES = ["Finding Facts in Non-Fiction: Read and choose.", "Finding Facts in Non-Fiction: Read the whole text.", "Finding Facts in Non-Fiction: Find the evidence (clue in the text).", "Finding Facts in Non-Fiction: Use the whole text."];
export default function FindingFactsInNonFictionGame({ level, onComplete }) {
  return <DataChallenge level={level} build={buildQuestions} titles={TITLES} onComplete={onComplete} />;
}
