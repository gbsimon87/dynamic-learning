import ReadingTopicGame from "./ReadingTopicGame";
import { buildDoesItMakeSenseQuestions } from "../../../../../data/challenges/english/doesItMakeSense";

const TITLES = [
  "A sentence must make sense. Choose the word that makes it make sense.",
  "Sort the sentences: do they make sense?",
  "One word does not make sense. Tap it.",
  "Read the story. Does it all make sense?",
];

function DoesItMakeSenseGame({ level, onComplete }) {
  return <ReadingTopicGame level={level} titles={TITLES} build={buildDoesItMakeSenseQuestions} onComplete={onComplete} />;
}

export default DoesItMakeSenseGame;
