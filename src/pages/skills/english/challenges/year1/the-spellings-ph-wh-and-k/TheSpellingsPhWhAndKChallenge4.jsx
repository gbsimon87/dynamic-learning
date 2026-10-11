import DataChallenge from "../../../../../../components/challenge/data/DataChallenge";
import { TITLES, buildTheSpellingsPhWhAndK } from "../../../../../../data/challenges/english/year1TheSpellingsPhWhAndK";
export default function TheSpellingsPhWhAndKChallenge4({ onComplete }) {
  return <DataChallenge level={4} build={buildTheSpellingsPhWhAndK} titles={TITLES} onComplete={onComplete} />;
}
