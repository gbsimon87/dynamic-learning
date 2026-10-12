import HistoryChallenge from "../../../../../components/challenge/history/HistoryChallenge";
import { YEAR3_HISTORY_BUILDERS } from "../../../../../data/challenges/history/year3/index";

export default function Year3HistoryGame({ topicId, level, onComplete }) {
  return <HistoryChallenge build={YEAR3_HISTORY_BUILDERS[topicId]} year={3} level={level} onComplete={onComplete} />;
}
