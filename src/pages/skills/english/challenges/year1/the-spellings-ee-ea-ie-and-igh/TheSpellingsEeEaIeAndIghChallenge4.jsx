import DataChallenge from "../../../../../../components/challenge/data/DataChallenge";
import { TITLES, buildTheSpellingsEeEaIeAndIgh } from "../../../../../../data/challenges/english/year1TheSpellingsEeEaIeAndIgh";
export default function TheSpellingsEeEaIeAndIghChallenge4({ onComplete }) {
  return <DataChallenge level={4} build={buildTheSpellingsEeEaIeAndIgh} titles={TITLES} onComplete={onComplete} />;
}
