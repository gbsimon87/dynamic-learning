import DataChallenge from "../../../../../components/challenge/data/DataChallenge";
import { buildQuestions } from "../../../../../data/challenges/english/year2TheSuffixesMentNessFulLessAndLy";
const TITLES = ["The Suffixes ment, ness, ful, less and ly: Choose the spelling.", "The Suffixes ment, ness, ful, less and ly: Sort the spellings.", "The Suffixes ment, ness, ful, less and ly: Build the word.", "The Suffixes ment, ness, ful, less and ly: Spell the word."];
export default function TheSuffixesMentNessFulLessAndLyGame({ level, onComplete }) {
  return <DataChallenge level={level} build={buildQuestions} titles={TITLES} onComplete={onComplete} />;
}
