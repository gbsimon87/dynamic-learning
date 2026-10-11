import DataChallenge from "../../../../../../components/challenge/data/DataChallenge";
import { TITLES, buildWordsAndSentences } from "../../../../../../data/challenges/english/year1WordsAndSentences";
export default function WordsAndSentencesChallenge2({ onComplete }) {
  return <DataChallenge level={2} build={buildWordsAndSentences} titles={TITLES} onComplete={onComplete} />;
}
