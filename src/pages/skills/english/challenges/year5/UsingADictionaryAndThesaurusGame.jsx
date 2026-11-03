import EnglishPracticeGame from "../EnglishPracticeGame";
import { buildUsingADictionaryAndThesaurusQuestions } from "../../../../../data/challenges/english/year5UsingADictionaryAndThesaurus";
const TITLES = [
  "Use the rule to choose.",
  "Sort the examples.",
  "Build the missing part.",
  "Apply what you know."
];
export default function UsingADictionaryAndThesaurusGame({ level, onComplete }) {
  return <EnglishPracticeGame level={level} build={buildUsingADictionaryAndThesaurusQuestions} titles={TITLES} onComplete={onComplete} />;
}
