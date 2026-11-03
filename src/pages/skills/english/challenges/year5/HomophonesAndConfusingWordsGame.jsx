import EnglishPracticeGame from "../EnglishPracticeGame";
import { buildHomophonesAndConfusingWordsQuestions } from "../../../../../data/challenges/english/year5HomophonesAndConfusingWords";
const TITLES = [
  "Use the rule to choose.",
  "Sort the examples.",
  "Build the missing part.",
  "Apply what you know."
];
export default function HomophonesAndConfusingWordsGame({ level, onComplete }) {
  return <EnglishPracticeGame level={level} build={buildHomophonesAndConfusingWordsQuestions} titles={TITLES} onComplete={onComplete} />;
}
