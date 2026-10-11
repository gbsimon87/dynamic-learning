import DataChallenge from "../../../../../../components/challenge/data/DataChallenge";
import { TITLES, buildJoiningWithAnd } from "../../../../../../data/challenges/english/year1JoiningWithAnd";
export default function JoiningWithAndChallenge1({ onComplete }) {
  return <DataChallenge level={1} build={buildJoiningWithAnd} titles={TITLES} onComplete={onComplete} />;
}
