import DataChallenge from "../../../../../../components/challenge/data/DataChallenge";
import { TITLES, buildTheSpellingsAirEarAndAre } from "../../../../../../data/challenges/english/year1TheSpellingsAirEarAndAre";
export default function TheSpellingsAirEarAndAreChallenge1({ onComplete }) {
  return <DataChallenge level={1} build={buildTheSpellingsAirEarAndAre} titles={TITLES} onComplete={onComplete} />;
}
