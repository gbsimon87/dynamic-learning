import DataChallenge from "../../../../../../components/challenge/data/DataChallenge";
import { TITLES, buildBuildingSentences } from "../../../../../../data/challenges/english/year1BuildingSentences";
export default function BuildingSentencesChallenge1({ onComplete }) {
  return <DataChallenge level={1} build={buildBuildingSentences} titles={TITLES} onComplete={onComplete} />;
}
