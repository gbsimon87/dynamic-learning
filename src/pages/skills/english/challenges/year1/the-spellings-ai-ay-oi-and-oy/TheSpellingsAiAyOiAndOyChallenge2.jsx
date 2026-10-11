import DataChallenge from "../../../../../../components/challenge/data/DataChallenge";
import { TITLES, buildTheSpellingsAiAyOiAndOy } from "../../../../../../data/challenges/english/year1TheSpellingsAiAyOiAndOy";
export default function TheSpellingsAiAyOiAndOyChallenge2({ onComplete }) {
  return <DataChallenge level={2} build={buildTheSpellingsAiAyOiAndOy} titles={TITLES} onComplete={onComplete} />;
}
