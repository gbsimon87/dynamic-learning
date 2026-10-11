import DataChallenge from "../../../../../../components/challenge/data/DataChallenge";
import { TITLES, buildTheSpellingsEeEaIeAndIgh } from "../../../../../../data/challenges/english/year1TheSpellingsEeEaIeAndIgh";
export default function TheSpellingsEeEaIeAndIghChallenge2({ onComplete }) {
  return <DataChallenge level={2} build={buildTheSpellingsEeEaIeAndIgh} titles={TITLES} onComplete={onComplete} />;
}
