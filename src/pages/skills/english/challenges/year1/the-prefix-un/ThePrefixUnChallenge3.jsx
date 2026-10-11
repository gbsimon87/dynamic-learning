import DataChallenge from "../../../../../../components/challenge/data/DataChallenge";
import { TITLES, buildThePrefixUn } from "../../../../../../data/challenges/english/year1ThePrefixUn";
export default function ThePrefixUnChallenge3({ onComplete }) {
  return <DataChallenge level={3} build={buildThePrefixUn} titles={TITLES} onComplete={onComplete} />;
}
