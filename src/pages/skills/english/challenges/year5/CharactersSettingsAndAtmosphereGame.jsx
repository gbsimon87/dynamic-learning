import ReadingTopicGame from "../year3/ReadingTopicGame";
import { buildCharactersSettingsAndAtmosphereQuestions } from "../../../../../data/challenges/english/year5CharactersSettingsAndAtmosphere";
const TITLES = [
  "Read the short extract.",
  "Sort the details.",
  "Tap the evidence in the text.",
  "Read the whole text and apply what you know."
];
export default function CharactersSettingsAndAtmosphereGame({ level, onComplete }) {
  return <ReadingTopicGame illustrate level={level} build={buildCharactersSettingsAndAtmosphereQuestions} titles={TITLES} onComplete={onComplete} />;
}
