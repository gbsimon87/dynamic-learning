import ReadingTopicGame from "../year3/ReadingTopicGame";
import { buildRetrievingAndRecordingInformationQuestions } from "../../../../../data/challenges/english/year5RetrievingAndRecordingInformation";
const TITLES = [
  "Read the short extract.",
  "Sort the details.",
  "Tap the evidence in the text.",
  "Read the whole text and apply what you know."
];
export default function RetrievingAndRecordingInformationGame({ level, onComplete }) {
  return <ReadingTopicGame illustrate level={level} build={buildRetrievingAndRecordingInformationQuestions} titles={TITLES} onComplete={onComplete} />;
}
