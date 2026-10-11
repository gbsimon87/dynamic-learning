import DataChallenge from "../../../../../../components/challenge/data/DataChallenge";
import { TITLES, buildJoiningWithAnd } from "../../../../../../data/challenges/english/year1JoiningWithAnd";
export default function JoiningWithAndChallenge3({ onComplete }) {
  return <DataChallenge level={3} build={buildJoiningWithAnd} titles={TITLES} onComplete={onComplete} />;
}
