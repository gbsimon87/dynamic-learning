import ReadingTopicGame from "./ReadingTopicGame";
import { buildSparkWordsQuestions } from "../../../../../data/challenges/english/wordsThatSparkTheImagination";

const TITLES = [
  "Some words help you picture exactly what happens. Choose the word that paints the best picture and still fits.",
  "Does the phrase help you see, hear or feel it? Sort the phrases.",
  "Tap the word that brings the scene to life.",
  "Read the story. Which words spark your imagination?",
];

function WordsThatSparkTheImaginationGame({ level, onComplete }) {
  return <ReadingTopicGame level={level} titles={TITLES} build={buildSparkWordsQuestions} onComplete={onComplete} />;
}

export default WordsThatSparkTheImaginationGame;
