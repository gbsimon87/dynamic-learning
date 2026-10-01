import ReadingTopicGame from "../year3/ReadingTopicGame";
import { buildJustifyingInferencesQuestions } from "../../../../../data/challenges/english/year4JustifyingInferences";
const TITLES = [
  "Read the short extract.",
  "Group related details.",
  "Tap the evidence in the text.",
  "Read the whole text and apply what you know."
];
export default function JustifyingInferencesGame({ level, onComplete }) {
  return <ReadingTopicGame level={level} build={buildJustifyingInferencesQuestions} titles={TITLES} onComplete={onComplete} />;
}
