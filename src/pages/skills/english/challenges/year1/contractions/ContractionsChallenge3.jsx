import DataChallenge from "../../../../../../components/challenge/data/DataChallenge";
import { TITLES, buildContractions } from "../../../../../../data/challenges/english/year1Contractions";
export default function ContractionsChallenge3({ onComplete }) {
  return <DataChallenge level={3} build={buildContractions} titles={TITLES} onComplete={onComplete} />;
}
