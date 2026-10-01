import ReadingTopicGame from "../year3/ReadingTopicGame";
import { buildThemesInStoriesQuestions } from "../../../../../data/challenges/english/year4ThemesInStories";
const TITLES = [
  "Read the short extract.",
  "Group related details.",
  "Tap the evidence in the text.",
  "Read the whole text and apply what you know."
];
export default function ThemesInStoriesGame({ level, onComplete }) {
  return <ReadingTopicGame level={level} build={buildThemesInStoriesQuestions} titles={TITLES} onComplete={onComplete} />;
}
