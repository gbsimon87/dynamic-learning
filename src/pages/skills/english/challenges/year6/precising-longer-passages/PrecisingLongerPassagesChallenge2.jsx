import DataChallenge from "../../../../../../components/challenge/data/DataChallenge.jsx";
import { TITLES } from "../../../../../../data/challenges/topicBank.js";
import QuestionVisual from "../../../../../../components/challenge/visual/EnglishQuestionVisual.jsx";
import { buildPrecisingLongerPassages } from "../../../../../../data/challenges/authored/year6/english/precising-longer-passages.js";

export default function Challenge({ onComplete }) {
  return <DataChallenge level={2} build={buildPrecisingLongerPassages} titles={TITLES} renderVisual={question => <QuestionVisual question={question} />} illustrate onComplete={onComplete} />;
}
