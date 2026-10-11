import DataChallenge from "../../../../../../components/challenge/data/DataChallenge";
import { TITLES, buildAddingErAndEst } from "../../../../../../data/challenges/english/year1AddingErAndEst";
export default function AddingErAndEstChallenge1({ onComplete }) {
  return <DataChallenge level={1} build={buildAddingErAndEst} titles={TITLES} onComplete={onComplete} />;
}
