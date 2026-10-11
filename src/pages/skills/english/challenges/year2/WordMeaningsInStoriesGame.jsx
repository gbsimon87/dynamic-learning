import DataChallenge from "../../../../../components/challenge/data/DataChallenge";
import { buildQuestions } from "../../../../../data/challenges/english/year2WordMeaningsInStories";
const TITLES = ["Word Meanings in Stories: Read and choose.", "Word Meanings in Stories: Read the whole text.", "Word Meanings in Stories: Find the evidence (clue in the text).", "Word Meanings in Stories: Use the whole text."];
export default function WordMeaningsInStoriesGame({ level, onComplete }) {
  return <DataChallenge level={level} build={buildQuestions} titles={TITLES} onComplete={onComplete} />;
}
