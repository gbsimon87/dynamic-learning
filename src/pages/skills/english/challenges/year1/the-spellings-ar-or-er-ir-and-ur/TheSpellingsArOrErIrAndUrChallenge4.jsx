import DataChallenge from "../../../../../../components/challenge/data/DataChallenge";
import { TITLES, buildTheSpellingsArOrErIrAndUr } from "../../../../../../data/challenges/english/year1TheSpellingsArOrErIrAndUr";
export default function TheSpellingsArOrErIrAndUrChallenge4({ onComplete }) {
  return <DataChallenge level={4} build={buildTheSpellingsArOrErIrAndUr} titles={TITLES} onComplete={onComplete} />;
}
