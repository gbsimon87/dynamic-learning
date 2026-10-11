import DataChallenge from "../../../../../../components/challenge/data/DataChallenge";
import { TITLES, buildTheSpellingsAiAyOiAndOy } from "../../../../../../data/challenges/english/year1TheSpellingsAiAyOiAndOy";
export default function TheSpellingsAiAyOiAndOyChallenge1({ onComplete }) {
  return <DataChallenge level={1} build={buildTheSpellingsAiAyOiAndOy} titles={TITLES} onComplete={onComplete} />;
}
