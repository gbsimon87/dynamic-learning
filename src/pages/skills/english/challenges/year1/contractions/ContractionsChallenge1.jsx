import DataChallenge from "../../../../../../components/challenge/data/DataChallenge";
import { TITLES, buildContractions } from "../../../../../../data/challenges/english/year1Contractions";
export default function ContractionsChallenge1({ onComplete }) {
  return <DataChallenge level={1} build={buildContractions} titles={TITLES} onComplete={onComplete} />;
}
