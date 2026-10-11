import DataChallenge from "../../../../../components/challenge/data/DataChallenge";
import { YEAR1_MATH_BUILDERS, YEAR1_MATH_TITLES } from "../../../../../data/challenges/year1Math/index";
import Year1MathVisual from "./Year1MathVisual";

const renderVisual = question => <Year1MathVisual visual={question.visual} />;

export default function Year1MathGame({ topicId, level, onComplete }) {
  return <DataChallenge level={level} build={YEAR1_MATH_BUILDERS[topicId]} titles={YEAR1_MATH_TITLES} renderVisual={renderVisual} onComplete={onComplete} />;
}
