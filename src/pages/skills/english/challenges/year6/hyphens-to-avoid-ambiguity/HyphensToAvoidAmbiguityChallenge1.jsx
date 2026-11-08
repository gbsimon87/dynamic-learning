import DataChallenge from "../../../../../../components/challenge/data/DataChallenge.jsx";
import { TITLES } from "../../../../../../data/challenges/topicBank.js";
import QuestionVisual from "../../../../../../components/challenge/visual/EnglishQuestionVisual.jsx";
import { buildHyphensToAvoidAmbiguity } from "../../../../../../data/challenges/authored/year6/english/hyphens-to-avoid-ambiguity.js";

export default function Challenge({ onComplete }) {
  return <DataChallenge level={1} build={buildHyphensToAvoidAmbiguity} titles={TITLES} renderVisual={question => <QuestionVisual question={question} />} illustrate onComplete={onComplete} />;
}
