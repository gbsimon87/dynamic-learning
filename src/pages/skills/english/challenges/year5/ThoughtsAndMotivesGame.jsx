import ReadingTopicGame from "../year3/ReadingTopicGame";
import { buildThoughtsAndMotivesQuestions } from "../../../../../data/challenges/english/year5ThoughtsAndMotives";
const TITLES = [
  "Read the short extract.",
  "Sort the details.",
  "Tap the evidence in the text.",
  "Read the whole text and apply what you know."
];
export default function ThoughtsAndMotivesGame({ level, onComplete }) {
  return <ReadingTopicGame level={level} build={buildThoughtsAndMotivesQuestions} titles={TITLES} onComplete={onComplete} />;
}
