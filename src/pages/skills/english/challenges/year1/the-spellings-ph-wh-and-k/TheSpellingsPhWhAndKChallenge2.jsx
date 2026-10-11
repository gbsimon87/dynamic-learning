import DataChallenge from "../../../../../../components/challenge/data/DataChallenge";
import { TITLES, buildTheSpellingsPhWhAndK } from "../../../../../../data/challenges/english/year1TheSpellingsPhWhAndK";
export default function TheSpellingsPhWhAndKChallenge2({ onComplete }) {
  return <DataChallenge level={2} build={buildTheSpellingsPhWhAndK} titles={TITLES} onComplete={onComplete} />;
}
