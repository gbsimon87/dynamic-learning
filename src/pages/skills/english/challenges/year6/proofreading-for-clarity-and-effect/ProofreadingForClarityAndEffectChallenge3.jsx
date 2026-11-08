import DataChallenge from "../../../../../../components/challenge/data/DataChallenge.jsx";
import { TITLES } from "../../../../../../data/challenges/topicBank.js";
import QuestionVisual from "../../../../../../components/challenge/visual/EnglishQuestionVisual.jsx";
import { buildProofreadingForClarityAndEffect } from "../../../../../../data/challenges/authored/year6/english/proofreading-for-clarity-and-effect.js";

export default function Challenge({ onComplete }) {
  return <DataChallenge level={3} build={buildProofreadingForClarityAndEffect} titles={TITLES} renderVisual={question => <QuestionVisual question={question} />} illustrate onComplete={onComplete} />;
}
