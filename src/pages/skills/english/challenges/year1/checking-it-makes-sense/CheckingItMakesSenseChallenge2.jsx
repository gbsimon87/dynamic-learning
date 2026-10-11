import DataChallenge from "../../../../../../components/challenge/data/DataChallenge";
import { TITLES, buildCheckingItMakesSense } from "../../../../../../data/challenges/english/year1CheckingItMakesSense";
export default function CheckingItMakesSenseChallenge2({ onComplete }) {
  return <DataChallenge level={2} build={buildCheckingItMakesSense} titles={TITLES} onComplete={onComplete} />;
}
