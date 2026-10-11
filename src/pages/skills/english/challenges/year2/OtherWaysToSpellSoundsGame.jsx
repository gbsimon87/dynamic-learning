import DataChallenge from "../../../../../components/challenge/data/DataChallenge";
import { buildQuestions } from "../../../../../data/challenges/english/year2OtherWaysToSpellSounds";
const TITLES = ["Other Ways to Spell Sounds: Choose the spelling.", "Other Ways to Spell Sounds: Sort the spellings.", "Other Ways to Spell Sounds: Build the word.", "Other Ways to Spell Sounds: Spell the word."];
export default function OtherWaysToSpellSoundsGame({ level, onComplete }) {
  return <DataChallenge level={level} build={buildQuestions} titles={TITLES} onComplete={onComplete} />;
}
