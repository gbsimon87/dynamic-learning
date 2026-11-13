import EnglishPracticeGame from "../EnglishPracticeGame";
import { buildSuffixPractice } from "../../../../../data/challenges/english/theSuffixesAtionAndLy";

const TITLES = [
  "Add the suffix (word ending) ation or ly.",
  "Sort the root words by how the suffix (word ending) is added.",
  "Build the new word with the suffix (word ending).",
  "Add ation or ly to the word in brackets. Type the whole word.",
];

export default function TheSuffixesAtionAndLyGame({ level, onComplete }) {
  return <EnglishPracticeGame level={level} build={buildSuffixPractice} titles={TITLES} onComplete={onComplete} />;
}
