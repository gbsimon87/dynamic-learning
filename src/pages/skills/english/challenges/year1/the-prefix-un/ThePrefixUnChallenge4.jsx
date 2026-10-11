import DataChallenge from "../../../../../../components/challenge/data/DataChallenge";
import { TITLES, buildThePrefixUn } from "../../../../../../data/challenges/english/year1ThePrefixUn";
export default function ThePrefixUnChallenge4({ onComplete }) {
  return <DataChallenge level={4} build={buildThePrefixUn} titles={TITLES} onComplete={onComplete} />;
}
