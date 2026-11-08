import DataChallenge from "../../../../../../components/challenge/data/DataChallenge.jsx";
import { TITLES } from "../../../../../../data/challenges/topicBank.js";
import QuestionVisual from "../../../../../../components/challenge/visual/EnglishQuestionVisual.jsx";
import { buildSemicolonsColonsAndDashes } from "../../../../../../data/challenges/authored/year6/english/semicolons-colons-and-dashes.js";

export default function Challenge({ onComplete }) {
  return <DataChallenge level={2} build={buildSemicolonsColonsAndDashes} titles={TITLES} renderVisual={question => <QuestionVisual question={question} />} illustrate onComplete={onComplete} />;
}
