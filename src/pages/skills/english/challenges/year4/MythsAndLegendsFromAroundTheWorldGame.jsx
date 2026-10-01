import ReadingTopicGame from "../year3/ReadingTopicGame";
import { buildMythsAndLegendsFromAroundTheWorldQuestions } from "../../../../../data/challenges/english/year4MythsAndLegendsFromAroundTheWorld";
const TITLES = [
  "Read the short extract.",
  "Group related details.",
  "Tap the evidence in the text.",
  "Read the whole text and apply what you know."
];
export default function MythsAndLegendsFromAroundTheWorldGame({ level, onComplete }) {
  return <ReadingTopicGame level={level} build={buildMythsAndLegendsFromAroundTheWorldQuestions} titles={TITLES} onComplete={onComplete} />;
}
