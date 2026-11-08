import DataChallenge from "../../../../../../components/challenge/data/DataChallenge.jsx";
import { TITLES } from "../../../../../../data/challenges/topicBank.js";
import QuestionVisual from "../../../../../../components/challenge/visual/EnglishQuestionVisual.jsx";
import { buildBulletPointPunctuation } from "../../../../../../data/challenges/authored/year6/english/bullet-point-punctuation.js";

export default function Challenge({ onComplete }) {
  return <DataChallenge level={3} build={buildBulletPointPunctuation} titles={TITLES} renderVisual={question => <QuestionVisual question={question} />} illustrate onComplete={onComplete} />;
}
