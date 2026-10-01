import ReadingTopicGame from "./ReadingTopicGame";
import { buildFairyStoriesQuestions } from "../../../../../data/challenges/english/fairyStoriesMythsAndLegends";

const TITLES = [
  "Fairy stories, myths and legends have special features. Which one fits?",
  "Fairy story, myth or legend? Sort the stories.",
  "Tap the sentence that shows the fairy story feature.",
  "Read the story, then answer the questions.",
];

function FairyStoriesMythsAndLegendsGame({ level, onComplete }) {
  return <ReadingTopicGame level={level} titles={TITLES} build={buildFairyStoriesQuestions} onComplete={onComplete} />;
}

export default FairyStoriesMythsAndLegendsGame;
