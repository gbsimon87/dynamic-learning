import DataChallenge from "../../../../../../components/challenge/data/DataChallenge";
import { TITLES, buildTheSpellingsAirEarAndAre } from "../../../../../../data/challenges/english/year1TheSpellingsAirEarAndAre";
export default function TheSpellingsAirEarAndAreChallenge2({ onComplete }) {
  return <DataChallenge level={2} build={buildTheSpellingsAirEarAndAre} titles={TITLES} onComplete={onComplete} />;
}
