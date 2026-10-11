import DataChallenge from "../../../../../../components/challenge/data/DataChallenge";
import { TITLES, buildCheckingItMakesSense } from "../../../../../../data/challenges/english/year1CheckingItMakesSense";
export default function CheckingItMakesSenseChallenge1({ onComplete }) {
  return <DataChallenge level={1} build={buildCheckingItMakesSense} titles={TITLES} onComplete={onComplete} />;
}
