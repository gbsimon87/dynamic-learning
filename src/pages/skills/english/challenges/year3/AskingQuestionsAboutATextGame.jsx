import ReadingTopicGame from "./ReadingTopicGame";
import { buildAskingQuestionsQuestions } from "../../../../../data/challenges/english/askingQuestionsAboutAText";

const TITLES = [
  "Question words: who (a person), where (a place), when (a time), why (a reason), how (the way). Which one fits?",
  "Can the text answer the question? Sort the questions.",
  "Tap the part of the sentence that answers the question.",
  "Read the story. Ask questions to understand it.",
];

function AskingQuestionsAboutATextGame({ level, onComplete }) {
  return <ReadingTopicGame level={level} titles={TITLES} build={buildAskingQuestionsQuestions} onComplete={onComplete} />;
}

export default AskingQuestionsAboutATextGame;
