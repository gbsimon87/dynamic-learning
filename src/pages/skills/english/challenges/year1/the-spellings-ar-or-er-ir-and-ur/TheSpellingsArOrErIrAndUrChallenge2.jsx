import DataChallenge from "../../../../../../components/challenge/data/DataChallenge";
import { TITLES, buildTheSpellingsArOrErIrAndUr } from "../../../../../../data/challenges/english/year1TheSpellingsArOrErIrAndUr";
export default function TheSpellingsArOrErIrAndUrChallenge2({ onComplete }) {
  return <DataChallenge level={2} build={buildTheSpellingsArOrErIrAndUr} titles={TITLES} onComplete={onComplete} />;
}
