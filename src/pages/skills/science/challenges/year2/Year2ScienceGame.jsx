import DataChallenge from "../../../../../components/challenge/data/DataChallenge";
import { YEAR2_SCIENCE_BUILDERS, YEAR2_SCIENCE_TITLES } from "../../../../../data/challenges/year2Science/index";
import Year2ScienceVisual from "./Year2ScienceVisual";

const renderVisual = question => <Year2ScienceVisual visual={question.visual} />;

// Science prompts are longer than maths ones, so "Read it to me" is always offered.
export default function Year2ScienceGame({ topicId, level, onComplete }) {
  return <DataChallenge level={level} build={YEAR2_SCIENCE_BUILDERS[topicId]} titles={YEAR2_SCIENCE_TITLES} renderVisual={renderVisual} readAloud onComplete={onComplete} />;
}
