import ReadingTopicGame from "../year3/ReadingTopicGame";
import { buildReadingPlayScriptsQuestions } from "../../../../../data/challenges/english/year5ReadingPlayScripts";
const TITLES = [
  "Read the short extract.",
  "Sort the details.",
  "Tap the evidence in the text.",
  "Read the whole text and apply what you know."
];
export default function ReadingPlayScriptsGame({ level, onComplete }) {
  return <ReadingTopicGame illustrate level={level} build={buildReadingPlayScriptsQuestions} titles={TITLES} onComplete={onComplete} />;
}
