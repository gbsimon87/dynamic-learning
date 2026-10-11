import DataChallenge from "../../../../../../components/challenge/data/DataChallenge";
import { TITLES, buildTheSpellingsPhWhAndK } from "../../../../../../data/challenges/english/year1TheSpellingsPhWhAndK";
export default function TheSpellingsPhWhAndKChallenge1({ onComplete }) {
  return <DataChallenge level={1} build={buildTheSpellingsPhWhAndK} titles={TITLES} onComplete={onComplete} />;
}
