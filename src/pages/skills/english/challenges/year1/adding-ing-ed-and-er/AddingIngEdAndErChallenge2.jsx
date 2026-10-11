import DataChallenge from "../../../../../../components/challenge/data/DataChallenge";
import { TITLES, buildAddingIngEdAndEr } from "../../../../../../data/challenges/english/year1AddingIngEdAndEr";
export default function AddingIngEdAndErChallenge2({ onComplete }) {
  return <DataChallenge level={2} build={buildAddingIngEdAndEr} titles={TITLES} onComplete={onComplete} />;
}
