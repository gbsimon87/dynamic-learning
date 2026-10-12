import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import DataChallenge from "../data/DataChallenge";
import { HISTORY_TITLES } from "../../../data/challenges/history/engine";
import StoryCard from "./StoryCard";
import HistoryVisual from "./HistoryVisual";
import "./history.css";

/**
 * Story first, then the rounds (docs/history-curriculum/shared-design-spec.md §4).
 * The run is built once per mount; DataChallenge gets a stable builder that
 * returns that same run, so it never re-randomises. Progress is untouched:
 * DataChallenge → ChallengeShell calls onComplete exactly as everywhere else.
 */
export default function HistoryChallenge({ build, year, level, onComplete }) {
  const run = useMemo(() => build(level, Math.random), [build, level]);
  const questions = useCallback(() => run.questions, [run]);
  const renderVisual = useCallback((q) => <HistoryVisual story={run.story} visual={q.visual} />, [run]);
  const [started, setStarted] = useState(false);
  const titles = HISTORY_TITLES[year];
  const roundsRef = useRef(null);

  // "Let's go!" unmounts itself; send keyboard focus to the challenge title
  // rather than letting it fall back to the top of the page.
  useEffect(() => {
    const title = started ? roundsRef.current?.querySelector(".challenge-title") : null;
    if (!title) return;
    title.setAttribute("tabindex", "-1");
    title.focus();
  }, [started]);

  if (!started) {
    return (
      <div className="challenge-container history-story-phase">
        <h3 className="challenge-title">{titles[level - 1]}</h3>
        <StoryCard story={run.story} />
        <button type="button" className="submit-btn history-start" onClick={() => setStarted(true)}>Let's go!</button>
      </div>
    );
  }
  return (
    <div ref={roundsRef}>
      <DataChallenge level={level} build={questions} titles={titles} renderVisual={renderVisual} readAloud onComplete={onComplete} />
    </div>
  );
}
