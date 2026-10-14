import ReadingTopicGame from "./ReadingTopicGame";
import { buildSparkWordsQuestions } from "../../../../../data/challenges/english/wordsThatSparkTheImagination";

const TITLES = [
  "Some words paint a picture. Choose the word that brings the sentence to life.",
  "Does the phrase help you see, hear or feel it? Sort the phrases.",
  "Tap the word that brings the scene to life.",
  "Read the sentence. What does the phrase help you imagine?",
];

function WordsThatSparkTheImaginationGame({ level, onComplete }) {
  return <ReadingTopicGame level={level} titles={TITLES} build={buildSparkWordsQuestions} onComplete={onComplete} />;
}

export default WordsThatSparkTheImaginationGame;
