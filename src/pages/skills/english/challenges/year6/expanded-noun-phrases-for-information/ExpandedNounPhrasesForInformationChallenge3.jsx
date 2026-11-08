import DataChallenge from "../../../../../../components/challenge/data/DataChallenge.jsx";
import { TITLES } from "../../../../../../data/challenges/topicBank.js";
import QuestionVisual from "../../../../../../components/challenge/visual/EnglishQuestionVisual.jsx";
import { buildExpandedNounPhrasesForInformation } from "../../../../../../data/challenges/authored/year6/english/expanded-noun-phrases-for-information.js";

export default function Challenge({ onComplete }) {
  return <DataChallenge level={3} build={buildExpandedNounPhrasesForInformation} titles={TITLES} renderVisual={question => <QuestionVisual question={question} />} illustrate onComplete={onComplete} />;
}
