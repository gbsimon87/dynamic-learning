import DataChallenge from "../../../../../../components/challenge/data/DataChallenge";
import { TITLES, buildTheSpellingsAiAyOiAndOy } from "../../../../../../data/challenges/english/year1TheSpellingsAiAyOiAndOy";
export default function TheSpellingsAiAyOiAndOyChallenge4({ onComplete }) {
  return <DataChallenge level={4} build={buildTheSpellingsAiAyOiAndOy} titles={TITLES} onComplete={onComplete} />;
}
