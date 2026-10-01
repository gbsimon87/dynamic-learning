import ReadingTopicGame from "./ReadingTopicGame";
import { buildKindsOfWritingQuestions } from "../../../../../data/challenges/english/kindsOfWriting";

const TITLES = [
  "Different kinds of writing have different features. What kind of writing is this?",
  "Sort the pieces of writing by kind.",
  "Find the feature: tap it.",
  "Read the text. What kind of writing is it, and why was it written?",
];

function KindsOfWritingGame({ level, onComplete }) {
  return <ReadingTopicGame level={level} titles={TITLES} build={buildKindsOfWritingQuestions} onComplete={onComplete} />;
}

export default KindsOfWritingGame;
