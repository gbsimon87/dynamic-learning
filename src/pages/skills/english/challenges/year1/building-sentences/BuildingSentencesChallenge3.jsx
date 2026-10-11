import DataChallenge from "../../../../../../components/challenge/data/DataChallenge";
import { TITLES, buildBuildingSentences } from "../../../../../../data/challenges/english/year1BuildingSentences";
export default function BuildingSentencesChallenge3({ onComplete }) {
  return <DataChallenge level={3} build={buildBuildingSentences} titles={TITLES} onComplete={onComplete} />;
}
