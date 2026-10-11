import DataChallenge from "../../../../../../components/challenge/data/DataChallenge";
import { TITLES, buildEndingASentence } from "../../../../../../data/challenges/english/year1EndingASentence";
export default function EndingASentenceChallenge3({ onComplete }) {
  return <DataChallenge level={3} build={buildEndingASentence} titles={TITLES} onComplete={onComplete} />;
}
