import DataChallenge from "../../../../../../components/challenge/data/DataChallenge";
import { TITLES, buildThePrefixUn } from "../../../../../../data/challenges/english/year1ThePrefixUn";
export default function ThePrefixUnChallenge2({ onComplete }) {
  return <DataChallenge level={2} build={buildThePrefixUn} titles={TITLES} onComplete={onComplete} />;
}
