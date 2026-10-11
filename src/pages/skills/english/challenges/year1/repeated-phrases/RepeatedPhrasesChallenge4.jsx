import DataChallenge from "../../../../../../components/challenge/data/DataChallenge";
import { TITLES, buildRepeatedPhrases } from "../../../../../../data/challenges/english/year1RepeatedPhrases";
export default function RepeatedPhrasesChallenge4({ onComplete }) {
  return <DataChallenge level={4} build={buildRepeatedPhrases} titles={TITLES} onComplete={onComplete} />;
}
