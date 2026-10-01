import EnglishPracticeGame from "../EnglishPracticeGame";
import { buildExpandedNounPhrasesQuestions } from "../../../../../data/challenges/english/year4ExpandedNounPhrases";
const TITLES = [
  "Use the rule to choose.",
  "Sort the examples.",
  "Build the missing part.",
  "Apply what you know."
];
export default function ExpandedNounPhrasesGame({ level, onComplete }) {
  return <EnglishPracticeGame level={level} build={buildExpandedNounPhrasesQuestions} titles={TITLES} onComplete={onComplete} />;
}
