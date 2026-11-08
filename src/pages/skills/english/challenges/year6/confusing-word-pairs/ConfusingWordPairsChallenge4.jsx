import DataChallenge from "../../../../../../components/challenge/data/DataChallenge.jsx";
import { TITLES } from "../../../../../../data/challenges/topicBank.js";
import QuestionVisual from "../../../../../../components/challenge/visual/EnglishQuestionVisual.jsx";
import { buildConfusingWordPairs } from "../../../../../../data/challenges/authored/year6/english/confusing-word-pairs.js";

export default function Challenge({ onComplete }) {
  return <DataChallenge level={4} build={buildConfusingWordPairs} titles={TITLES} renderVisual={question => <QuestionVisual question={question} />} illustrate onComplete={onComplete} />;
}
