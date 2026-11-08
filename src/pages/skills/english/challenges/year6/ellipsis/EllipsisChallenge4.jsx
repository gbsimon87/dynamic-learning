import DataChallenge from "../../../../../../components/challenge/data/DataChallenge.jsx";
import { TITLES } from "../../../../../../data/challenges/topicBank.js";
import QuestionVisual from "../../../../../../components/challenge/visual/EnglishQuestionVisual.jsx";
import { buildEllipsis } from "../../../../../../data/challenges/authored/year6/english/ellipsis.js";

export default function Challenge({ onComplete }) {
  return <DataChallenge level={4} build={buildEllipsis} titles={TITLES} renderVisual={question => <QuestionVisual question={question} />} illustrate onComplete={onComplete} />;
}
