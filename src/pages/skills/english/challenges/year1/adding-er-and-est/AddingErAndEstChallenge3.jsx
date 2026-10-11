import DataChallenge from "../../../../../../components/challenge/data/DataChallenge";
import { TITLES, buildAddingErAndEst } from "../../../../../../data/challenges/english/year1AddingErAndEst";
export default function AddingErAndEstChallenge3({ onComplete }) {
  return <DataChallenge level={3} build={buildAddingErAndEst} titles={TITLES} onComplete={onComplete} />;
}
