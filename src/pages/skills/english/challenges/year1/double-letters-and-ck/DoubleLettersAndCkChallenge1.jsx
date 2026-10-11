import DataChallenge from "../../../../../../components/challenge/data/DataChallenge";
import { TITLES, buildDoubleLettersAndCk } from "../../../../../../data/challenges/english/year1DoubleLettersAndCk";
export default function DoubleLettersAndCkChallenge1({ onComplete }) {
  return <DataChallenge level={1} build={buildDoubleLettersAndCk} titles={TITLES} onComplete={onComplete} />;
}
