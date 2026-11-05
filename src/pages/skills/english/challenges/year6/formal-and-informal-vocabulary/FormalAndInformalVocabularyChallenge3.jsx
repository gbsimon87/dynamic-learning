import DataChallenge from "../../../../../../components/challenge/data/DataChallenge.jsx";
import { TITLES } from "../../../../../../data/challenges/topicBank.js";
import QuestionVisual from "../../../../../../components/challenge/visual/EnglishQuestionVisual.jsx";
import { buildFormalAndInformalVocabulary } from "../../../../../../data/challenges/authored/year6/english/formal-and-informal-vocabulary.js";

export default function Challenge({ onComplete }) {
  return <DataChallenge level={3} build={buildFormalAndInformalVocabulary} titles={TITLES} renderVisual={question => <QuestionVisual question={question} />} illustrate onComplete={onComplete} />;
}
