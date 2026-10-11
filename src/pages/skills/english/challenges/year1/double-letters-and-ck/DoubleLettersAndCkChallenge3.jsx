import DataChallenge from "../../../../../../components/challenge/data/DataChallenge";
import { TITLES, buildDoubleLettersAndCk } from "../../../../../../data/challenges/english/year1DoubleLettersAndCk";
export default function DoubleLettersAndCkChallenge3({ onComplete }) {
  return <DataChallenge level={3} build={buildDoubleLettersAndCk} titles={TITLES} onComplete={onComplete} />;
}
