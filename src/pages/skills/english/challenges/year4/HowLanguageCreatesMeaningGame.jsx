import ReadingTopicGame from "../year3/ReadingTopicGame";
import { buildHowLanguageCreatesMeaningQuestions } from "../../../../../data/challenges/english/year4HowLanguageCreatesMeaning";
const TITLES = [
  "Read the short extract.",
  "Group related details.",
  "Tap the evidence in the text.",
  "Read the whole text and apply what you know."
];
export default function HowLanguageCreatesMeaningGame({ level, onComplete }) {
  return <ReadingTopicGame level={level} build={buildHowLanguageCreatesMeaningQuestions} titles={TITLES} onComplete={onComplete} />;
}
