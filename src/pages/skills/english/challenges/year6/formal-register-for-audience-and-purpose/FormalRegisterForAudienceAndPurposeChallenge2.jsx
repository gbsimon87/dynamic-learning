import DataChallenge from "../../../../../../components/challenge/data/DataChallenge.jsx";
import { TITLES } from "../../../../../../data/challenges/topicBank.js";
import QuestionVisual from "../../../../../../components/challenge/visual/EnglishQuestionVisual.jsx";
import { buildFormalRegisterForAudienceAndPurpose } from "../../../../../../data/challenges/authored/year6/english/formal-register-for-audience-and-purpose.js";

export default function Challenge({ onComplete }) {
  return <DataChallenge level={2} build={buildFormalRegisterForAudienceAndPurpose} titles={TITLES} renderVisual={question => <QuestionVisual question={question} />} illustrate onComplete={onComplete} />;
}
