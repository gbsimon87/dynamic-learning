import DataChallenge from "../../../../../components/challenge/data/DataChallenge";
import { buildQuestions } from "../../../../../data/challenges/english/year2StatementsQuestionsExclamationsAndCommands";
const TITLES = ["Statements, Questions, Exclamations and Commands: Read and choose.", "Statements, Questions, Exclamations and Commands: Sort the answers.", "Statements, Questions, Exclamations and Commands: Build the missing part.", "Statements, Questions, Exclamations and Commands: Try it yourself."];
export default function StatementsQuestionsExclamationsAndCommandsGame({ level, onComplete }) {
  return <DataChallenge level={level} build={buildQuestions} titles={TITLES} onComplete={onComplete} />;
}
