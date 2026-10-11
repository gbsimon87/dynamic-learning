import DataChallenge from "../../../../../../components/challenge/data/DataChallenge";
import { TITLES, buildContractions } from "../../../../../../data/challenges/english/year1Contractions";
export default function ContractionsChallenge2({ onComplete }) {
  return <DataChallenge level={2} build={buildContractions} titles={TITLES} onComplete={onComplete} />;
}
