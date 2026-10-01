import EnglishPracticeGame from "../EnglishPracticeGame";
import { buildPunctuatingDirectSpeechQuestions } from "../../../../../data/challenges/english/year4PunctuatingDirectSpeech";
const TITLES = [
  "Use the rule to choose.",
  "Sort the examples.",
  "Build the missing part.",
  "Apply what you know."
];
export default function PunctuatingDirectSpeechGame({ level, onComplete }) {
  return <EnglishPracticeGame level={level} build={buildPunctuatingDirectSpeechQuestions} titles={TITLES} onComplete={onComplete} />;
}
