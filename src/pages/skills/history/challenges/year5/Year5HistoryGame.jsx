import HistoryChallenge from "../../../../../components/challenge/history/HistoryChallenge";
import { YEAR5_HISTORY_BUILDERS } from "../../../../../data/challenges/history/year5/index";

export default function Year5HistoryGame({ topicId, level, onComplete }) {
  return <HistoryChallenge build={YEAR5_HISTORY_BUILDERS[topicId]} year={5} level={level} onComplete={onComplete} />;
}
