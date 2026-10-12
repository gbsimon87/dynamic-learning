import HistoryChallenge from "../../../../../components/challenge/history/HistoryChallenge";
import PracticalActivityCard from "../../../../../components/challenge/PracticalActivityCard";
import { YEAR2_HISTORY_BUILDERS } from "../../../../../data/challenges/history/year2/index";
import { HISTORY_ACTIVITIES } from "../../../../../data/historyActivities";

export default function Year2HistoryGame({ topicId, level, onComplete }) {
  return <>
    <HistoryChallenge build={YEAR2_HISTORY_BUILDERS[topicId]} year={2} level={level} onComplete={onComplete} />
    {level === 4 && <PracticalActivityCard activity={HISTORY_ACTIVITIES[topicId]} />}
  </>;
}
