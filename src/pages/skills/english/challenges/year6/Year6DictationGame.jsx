import DictationGame from "../year3/DictationGame.jsx";
import { buildYear6Dictation } from "../../../../../data/challenges/authored/year6/english/year-6-dictation.js";

export default function Year6DictationGame({ level, onComplete }) {
  return <DictationGame level={level} build={buildYear6Dictation} onComplete={onComplete} />;
}
