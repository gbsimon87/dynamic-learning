import DataChallenge from "../../../../../components/challenge/data/DataChallenge";
import { YEAR1_SCIENCE_BUILDERS, YEAR1_SCIENCE_TITLES } from "../../../../../data/challenges/year1Science/index";
import Year1ScienceVisual from "./Year1ScienceVisual";

const renderVisual = question => <Year1ScienceVisual visual={question.visual} />;

// Year 1 readers are just starting, so "Read it to me" is always offered.
export default function Year1ScienceGame({ topicId, level, onComplete }) {
  return <DataChallenge level={level} build={YEAR1_SCIENCE_BUILDERS[topicId]} titles={YEAR1_SCIENCE_TITLES} renderVisual={renderVisual} readAloud onComplete={onComplete} />;
}
