import DataChallenge from "../../../../../../components/challenge/data/DataChallenge";
import { TITLES, buildTheSpellingsEeEaIeAndIgh } from "../../../../../../data/challenges/english/year1TheSpellingsEeEaIeAndIgh";
export default function TheSpellingsEeEaIeAndIghChallenge3({ onComplete }) {
  return <DataChallenge level={3} build={buildTheSpellingsEeEaIeAndIgh} titles={TITLES} onComplete={onComplete} />;
}
