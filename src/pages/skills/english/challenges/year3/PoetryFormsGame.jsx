import ReadingTopicGame from "./ReadingTopicGame";
import { buildPoetryFormsQuestions } from "../../../../../data/challenges/english/poetryForms";

const TITLES = [
  "Rhyming words end with the same sound, like cat and hat. Tap the rhyming word.",
  "Sort clues about rhyming poems and free verse.",
  "If it tells events in order, choose narrative poem. Otherwise, choose rhyming poem or free verse.",
  "Read the poem, then answer the questions.",
];

function PoetryFormsGame({ level, onComplete }) {
  return <ReadingTopicGame level={level} titles={TITLES} build={buildPoetryFormsQuestions} onComplete={onComplete} />;
}

export default PoetryFormsGame;
