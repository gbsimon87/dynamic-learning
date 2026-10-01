import ReadingTopicGame from "../year3/ReadingTopicGame";
import { buildHowStructureAndPresentationHelpQuestions } from "../../../../../data/challenges/english/year4HowStructureAndPresentationHelp";
const TITLES = [
  "Read the short extract.",
  "Group related details.",
  "Tap the evidence in the text.",
  "Read the whole text and apply what you know."
];
export default function HowStructureAndPresentationHelpGame({ level, onComplete }) {
  return <ReadingTopicGame level={level} build={buildHowStructureAndPresentationHelpQuestions} titles={TITLES} onComplete={onComplete} />;
}
