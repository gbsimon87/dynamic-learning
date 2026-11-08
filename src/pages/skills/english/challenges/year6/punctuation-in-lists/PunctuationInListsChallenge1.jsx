import DataChallenge from "../../../../../../components/challenge/data/DataChallenge.jsx";
import { TITLES } from "../../../../../../data/challenges/topicBank.js";
import QuestionVisual from "../../../../../../components/challenge/visual/EnglishQuestionVisual.jsx";
import { buildPunctuationInLists } from "../../../../../../data/challenges/authored/year6/english/punctuation-in-lists.js";

export default function Challenge({ onComplete }) {
  return <DataChallenge level={1} build={buildPunctuationInLists} titles={TITLES} renderVisual={question => <QuestionVisual question={question} />} illustrate onComplete={onComplete} />;
}
