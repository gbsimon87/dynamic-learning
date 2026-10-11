import DataChallenge from "../../../../../../components/challenge/data/DataChallenge";
import { TITLES, buildTheSpellingsAiAyOiAndOy } from "../../../../../../data/challenges/english/year1TheSpellingsAiAyOiAndOy";
export default function TheSpellingsAiAyOiAndOyChallenge3({ onComplete }) {
  return <DataChallenge level={3} build={buildTheSpellingsAiAyOiAndOy} titles={TITLES} onComplete={onComplete} />;
}
