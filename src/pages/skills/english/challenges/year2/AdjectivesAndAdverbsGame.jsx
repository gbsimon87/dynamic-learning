import DataChallenge from "../../../../../components/challenge/data/DataChallenge";
import { buildQuestions } from "../../../../../data/challenges/english/year2AdjectivesAndAdverbs";
const TITLES = ["Adjectives and Adverbs: Choose the spelling.", "Adjectives and Adverbs: Sort the spellings.", "Adjectives and Adverbs: Build the word.", "Adjectives and Adverbs: Spell the word."];
export default function AdjectivesAndAdverbsGame({ level, onComplete }) {
  return <DataChallenge level={level} build={buildQuestions} titles={TITLES} onComplete={onComplete} />;
}
