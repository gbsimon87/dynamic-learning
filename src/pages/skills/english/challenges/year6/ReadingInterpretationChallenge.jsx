import DataChallenge from "../../../../../components/challenge/data/DataChallenge.jsx";
import { TITLES } from "../../../../../data/challenges/topicBank.js";
import QuestionVisual from "../../../../../components/challenge/visual/EnglishQuestionVisual.jsx";

/** The shared, text-first frame for the Year 6 Interpretation and Comparison quest. */
export default function ReadingInterpretationChallenge({ level, build, onComplete }) {
  return <DataChallenge level={level} build={build} titles={TITLES}
    renderVisual={question => <QuestionVisual question={question} />} illustrate onComplete={onComplete} />;
}
