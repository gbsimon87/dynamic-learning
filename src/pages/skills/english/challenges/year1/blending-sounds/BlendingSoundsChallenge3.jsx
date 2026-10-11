import DataChallenge from "../../../../../../components/challenge/data/DataChallenge";
import { TITLES, buildBlendingSounds } from "../../../../../../data/challenges/english/year1BlendingSounds";
export default function BlendingSoundsChallenge3({ onComplete }) {
  return <DataChallenge level={3} build={buildBlendingSounds} titles={TITLES} onComplete={onComplete} />;
}
