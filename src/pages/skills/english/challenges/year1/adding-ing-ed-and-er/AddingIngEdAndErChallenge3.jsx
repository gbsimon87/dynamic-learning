import DataChallenge from "../../../../../../components/challenge/data/DataChallenge";
import { TITLES, buildAddingIngEdAndEr } from "../../../../../../data/challenges/english/year1AddingIngEdAndEr";
export default function AddingIngEdAndErChallenge3({ onComplete }) {
  return <DataChallenge level={3} build={buildAddingIngEdAndEr} titles={TITLES} onComplete={onComplete} />;
}
