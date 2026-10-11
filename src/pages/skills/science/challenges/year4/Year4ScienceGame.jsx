import DataChallenge from "../../../../../components/challenge/data/DataChallenge";
import { YEAR4_SCIENCE_BUILDERS, YEAR4_SCIENCE_TITLES } from "../../../../../data/challenges/year4Science/index.js";
import Year4ScienceVisual from "./Year4ScienceVisual";
import { isScienceAnswerCorrect } from "../../../../../data/challenges/year4Science/engine.js";

const renderVisual = question => <Year4ScienceVisual question={question} />;

export default function Year4ScienceGame({ topicId, level, onComplete }) {
  return <DataChallenge level={level} build={YEAR4_SCIENCE_BUILDERS[topicId]} titles={YEAR4_SCIENCE_TITLES} renderVisual={renderVisual} checkAnswer={isScienceAnswerCorrect} readAloud onComplete={onComplete} />;
}
