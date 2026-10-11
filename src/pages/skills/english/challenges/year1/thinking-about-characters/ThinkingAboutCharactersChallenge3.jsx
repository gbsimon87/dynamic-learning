import DataChallenge from "../../../../../../components/challenge/data/DataChallenge";
import { TITLES, buildThinkingAboutCharacters } from "../../../../../../data/challenges/english/year1ThinkingAboutCharacters";
export default function ThinkingAboutCharactersChallenge3({ onComplete }) {
  return <DataChallenge level={3} build={buildThinkingAboutCharacters} titles={TITLES} onComplete={onComplete} />;
}
