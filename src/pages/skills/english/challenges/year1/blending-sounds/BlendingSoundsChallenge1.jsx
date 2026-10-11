import DataChallenge from "../../../../../../components/challenge/data/DataChallenge";
import { TITLES, buildBlendingSounds } from "../../../../../../data/challenges/english/year1BlendingSounds";
export default function BlendingSoundsChallenge1({ onComplete }) {
  return <DataChallenge level={1} build={buildBlendingSounds} titles={TITLES} onComplete={onComplete} />;
}
