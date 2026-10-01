import DictationPractice from "../year3/DictationGame";
import { buildDictationQuestions } from "../../../../../data/challenges/english/year4Dictation";
export default function DictationGame({ level, onComplete }) {
  return <DictationPractice level={level} build={buildDictationQuestions} onComplete={onComplete} />;
}
