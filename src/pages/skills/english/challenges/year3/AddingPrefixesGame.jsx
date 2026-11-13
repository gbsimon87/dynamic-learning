import EnglishPracticeGame from "../EnglishPracticeGame";
import { buildAddingPrefixesPractice } from "../../../../../data/challenges/english/addingPrefixes";

// The gloss goes with the term in slots 1–3 and is dropped in 4.
const TITLES = [
  "A prefix (a word part added to the start) changes what a word means.",
  "Sort the words by what their prefix (start part) means.",
  "Build the word: a prefix (start part) and a root word.",
  "Add a prefix to the word in brackets. Type the whole word.",
];

export default function AddingPrefixesGame({ level, onComplete }) {
  return <EnglishPracticeGame level={level} build={buildAddingPrefixesPractice} titles={TITLES} onComplete={onComplete} />;
}
