import DataChallenge from "../../../../../../components/challenge/data/DataChallenge.jsx";
import { TITLES } from "../../../../../../data/challenges/topicBank.js";
import QuestionVisual from "../../../../../../components/challenge/visual/EnglishQuestionVisual.jsx";
import { buildTheLetterStringOugh } from "../../../../../../data/challenges/authored/year6/english/the-letter-string-ough.js";

export default function Challenge({ onComplete }) {
  return <DataChallenge level={3} build={buildTheLetterStringOugh} titles={TITLES} renderVisual={question => <QuestionVisual question={question} />} illustrate onComplete={onComplete} />;
}
