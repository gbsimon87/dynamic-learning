import DataChallenge from "../../../../../../components/challenge/data/DataChallenge";
import { TITLES, buildJoiningWithAnd } from "../../../../../../data/challenges/english/year1JoiningWithAnd";
export default function JoiningWithAndChallenge2({ onComplete }) {
  return <DataChallenge level={2} build={buildJoiningWithAnd} titles={TITLES} onComplete={onComplete} />;
}
