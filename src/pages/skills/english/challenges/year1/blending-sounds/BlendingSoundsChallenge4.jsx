import DataChallenge from "../../../../../../components/challenge/data/DataChallenge";
import { TITLES, buildBlendingSounds } from "../../../../../../data/challenges/english/year1BlendingSounds";
export default function BlendingSoundsChallenge4({ onComplete }) {
  return <DataChallenge level={4} build={buildBlendingSounds} titles={TITLES} onComplete={onComplete} />;
}
