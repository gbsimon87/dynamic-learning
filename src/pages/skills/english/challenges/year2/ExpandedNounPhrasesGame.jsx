import DataChallenge from "../../../../../components/challenge/data/DataChallenge";
import { buildQuestions } from "../../../../../data/challenges/english/year2ExpandedNounPhrases";
const TITLES = ["Expanded Noun Phrases: Read and choose.", "Expanded Noun Phrases: Sort the answers.", "Expanded Noun Phrases: Build the missing part.", "Expanded Noun Phrases: Try it yourself."];
export default function ExpandedNounPhrasesGame({ level, onComplete }) {
  return <DataChallenge level={level} build={buildQuestions} titles={TITLES} onComplete={onComplete} />;
}
