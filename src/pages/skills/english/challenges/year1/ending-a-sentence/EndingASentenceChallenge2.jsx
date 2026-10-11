import DataChallenge from "../../../../../../components/challenge/data/DataChallenge";
import { TITLES, buildEndingASentence } from "../../../../../../data/challenges/english/year1EndingASentence";
export default function EndingASentenceChallenge2({ onComplete }) {
  return <DataChallenge level={2} build={buildEndingASentence} titles={TITLES} onComplete={onComplete} />;
}
