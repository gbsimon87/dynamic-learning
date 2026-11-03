import ReadingTopicGame from "../year3/ReadingTopicGame";
import { buildProofreadingSpellingAndPunctuationQuestions } from "../../../../../data/challenges/english/year5ProofreadingSpellingAndPunctuation";
const TITLES = [
  "Proofread (check carefully) the sentence.",
  "Sort correct sentences and sentences needing a correction.",
  "Find the error named in the question.",
  "Proofread the longer text."
];
export default function ProofreadingSpellingAndPunctuationGame({ level, onComplete }) {
  return <ReadingTopicGame illustrate level={level} build={buildProofreadingSpellingAndPunctuationQuestions} titles={TITLES} onComplete={onComplete} />;
}
