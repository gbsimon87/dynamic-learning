import DataChallenge from "../../../../../../components/challenge/data/DataChallenge.jsx";
import { TITLES } from "../../../../../../data/challenges/topicBank.js";
import QuestionVisual from "../../../../../../components/challenge/visual/EnglishQuestionVisual.jsx";
import { buildYear6WordListPart2 } from "../../../../../../data/challenges/authored/year6/english/year-6-word-list-part-2.js";

export default function Challenge({ onComplete }) {
  return <DataChallenge level={2} build={buildYear6WordListPart2} titles={TITLES} renderVisual={question => <QuestionVisual question={question} />} illustrate onComplete={onComplete} />;
}
