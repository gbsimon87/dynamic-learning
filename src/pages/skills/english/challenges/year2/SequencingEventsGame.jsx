import DataChallenge from "../../../../../components/challenge/data/DataChallenge";
import { buildQuestions } from "../../../../../data/challenges/english/year2SequencingEvents";
const TITLES = ["Sequencing Events: Read and choose.", "Sequencing Events: Read the whole text.", "Sequencing Events: Find the evidence (clue in the text).", "Sequencing Events: Use the whole text."];
export default function SequencingEventsGame({ level, onComplete }) {
  return <DataChallenge level={level} build={buildQuestions} titles={TITLES} onComplete={onComplete} />;
}
