import ReadingTopicGame from "./ReadingTopicGame";
import { buildPoetryFormsQuestions } from "../../../../../data/challenges/english/poetryForms";

const TITLES = [
  "Rhyming words end with the same sound, like cat and hat. Tap the rhyming word.",
  "Do the lines rhyme, or are they free verse? Sort them.",
  "A narrative poem tells a story. Which poem tells a story?",
  "Read the poem. What kind of poem is it?",
];

function PoetryFormsGame({ level, onComplete }) {
  return <ReadingTopicGame level={level} titles={TITLES} build={buildPoetryFormsQuestions} onComplete={onComplete} />;
}

export default PoetryFormsGame;
