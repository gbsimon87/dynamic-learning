import DataChallenge from "../../../../../../components/challenge/data/DataChallenge";
import { TITLES, buildCheckingItMakesSense } from "../../../../../../data/challenges/english/year1CheckingItMakesSense";
export default function CheckingItMakesSenseChallenge4({ onComplete }) {
  return <DataChallenge level={4} build={buildCheckingItMakesSense} titles={TITLES} onComplete={onComplete} />;
}
