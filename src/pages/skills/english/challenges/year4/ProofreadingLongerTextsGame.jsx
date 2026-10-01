import ReadingTopicGame from "../year3/ReadingTopicGame";
import { buildProofreadingLongerTextsQuestions } from "../../../../../data/challenges/english/year4ProofreadingLongerTexts";
const TITLES = ["Proofread (check carefully) the sentence.", "Sort correct sentences and sentences needing a correction.", "Find the error named in the question.", "Proofread the longer text."];
export default function ProofreadingLongerTextsGame({ level, onComplete }) {
  return <ReadingTopicGame level={level} build={buildProofreadingLongerTextsQuestions} titles={TITLES} onComplete={onComplete} />;
}
