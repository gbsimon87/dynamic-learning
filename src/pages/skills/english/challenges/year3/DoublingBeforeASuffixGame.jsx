import EnglishPracticeGame from "../EnglishPracticeGame";
import { buildDoublingPractice } from "../../../../../data/challenges/english/doublingBeforeASuffix";

const TITLES = [
  "Adding a suffix (word ending) that starts with a vowel: double the last letter, or not?",
  "Say each word aloud. Does it double before the suffix (word ending)?",
  "Build the word. Use the extra letter only if it doubles.",
  "Add the ending and type the whole word.",
];

export default function DoublingBeforeASuffixGame({ level, onComplete }) {
  return <EnglishPracticeGame level={level} build={buildDoublingPractice} titles={TITLES} onComplete={onComplete} />;
}
