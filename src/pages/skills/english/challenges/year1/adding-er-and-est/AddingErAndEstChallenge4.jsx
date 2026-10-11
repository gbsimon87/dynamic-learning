import DataChallenge from "../../../../../../components/challenge/data/DataChallenge";
import { TITLES, buildAddingErAndEst } from "../../../../../../data/challenges/english/year1AddingErAndEst";
export default function AddingErAndEstChallenge4({ onComplete }) {
  return <DataChallenge level={4} build={buildAddingErAndEst} titles={TITLES} onComplete={onComplete} />;
}
