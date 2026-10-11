import DictationPractice from "../year3/DictationGame";
import { buildQuestions, TITLES } from "../../../../../data/challenges/english/year1Dictation";
export default function DictationGame({ level, onComplete }) {
  return <DictationPractice level={level} build={buildQuestions} titles={TITLES} onComplete={onComplete} />;
}
