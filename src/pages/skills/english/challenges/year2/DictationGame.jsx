import DictationPractice from "../year3/DictationGame";
import { buildQuestions } from "../../../../../data/challenges/english/year2Dictation";
export default function DictationGame({ level, onComplete }) {
  return <DictationPractice level={level} build={buildQuestions} onComplete={onComplete} />;
}
