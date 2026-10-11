import DataChallenge from "../../../../../../components/challenge/data/DataChallenge";
import { TITLES, buildTheSpellingsEeEaIeAndIgh } from "../../../../../../data/challenges/english/year1TheSpellingsEeEaIeAndIgh";
export default function TheSpellingsEeEaIeAndIghChallenge1({ onComplete }) {
  return <DataChallenge level={1} build={buildTheSpellingsEeEaIeAndIgh} titles={TITLES} onComplete={onComplete} />;
}
