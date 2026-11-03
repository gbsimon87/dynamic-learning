import ReadingTopicGame from "../year3/ReadingTopicGame";
import { buildComparingCharactersAndSettingsQuestions } from "../../../../../data/challenges/english/year5ComparingCharactersAndSettings";
const TITLES = [
  "Read the short extract.",
  "Sort the details.",
  "Tap the evidence in the text.",
  "Read the whole text and apply what you know."
];
export default function ComparingCharactersAndSettingsGame({ level, onComplete }) {
  return <ReadingTopicGame level={level} build={buildComparingCharactersAndSettingsQuestions} titles={TITLES} onComplete={onComplete} />;
}
