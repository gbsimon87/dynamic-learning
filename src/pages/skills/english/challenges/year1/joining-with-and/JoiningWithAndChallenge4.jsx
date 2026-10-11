import DataChallenge from "../../../../../../components/challenge/data/DataChallenge";
import { TITLES, buildJoiningWithAnd } from "../../../../../../data/challenges/english/year1JoiningWithAnd";
export default function JoiningWithAndChallenge4({ onComplete }) {
  return <DataChallenge level={4} build={buildJoiningWithAnd} titles={TITLES} onComplete={onComplete} />;
}
