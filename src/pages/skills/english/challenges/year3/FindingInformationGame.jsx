import ReadingTopicGame from "./ReadingTopicGame";
import { buildFindingInformationQuestions } from "../../../../../data/challenges/english/findingInformation";

const TITLES = [
  "A contents page lists the chapters in order. Which page should you turn to?",
  "An index lists topics in alphabetical order. Which page should you turn to?",
  "Build the index: put the words in alphabetical order.",
  "Read the information text, then fill in the fact file.",
];

function FindingInformationGame({ level, onComplete }) {
  return <ReadingTopicGame level={level} titles={TITLES} build={buildFindingInformationQuestions} onComplete={onComplete} />;
}

export default FindingInformationGame;
