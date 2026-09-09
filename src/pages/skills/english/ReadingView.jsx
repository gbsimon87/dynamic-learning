import { useEffect, useMemo, useState } from "react";
import { useSpritzReader } from "../../../hooks/useSpritzReader";
import {
  COUNTDOWN_MS,
  WPM_MAX,
  WPM_MIN,
  pivotIndexInText,
} from "../../../hooks/spritzTiming";

const COUNTDOWN_STEPS = ["3", "2", "1", "Go!"];

function PivotWord({ text, showPivot }) {
  if (!showPivot) return <span className="sr-word-plain">{text}</span>;

  const index = pivotIndexInText(text);
  if (index < 0) return <span className="sr-word-plain">{text}</span>;

  return (
    <>
      <span className="sr-word-left">{text.slice(0, index)}</span>
      <span className="sr-word-pivot">{text[index]}</span>
      <span className="sr-word-right">{text.slice(index + 1)}</span>
    </>
  );
}

function ReadingView({ text, wpm, chunkSize, showPivot, onWpmChange, onFinish }) {
  const [countdown, setCountdown] = useState(0);
  const reader = useSpritzReader({ text, wpm, chunkSize, onFinish });

  useEffect(() => {
    if (countdown >= COUNTDOWN_STEPS.length) return undefined;
    const timer = setTimeout(() => setCountdown((value) => value + 1), COUNTDOWN_MS);
    return () => clearTimeout(timer);
  }, [countdown]);

  const counting = countdown < COUNTDOWN_STEPS.length;
  const { play, toggle, next, prev } = reader;

  useEffect(() => {
    if (!counting) play();
  }, [counting, play]);

  useEffect(() => {
    if (counting) return undefined;

    const onKeyDown = (event) => {
      if (event.target instanceof HTMLElement && event.target.closest("button, input, textarea, select, a")) {
        return;
      }
      if (event.key === " ") {
        event.preventDefault();
        toggle();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        next();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        prev();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [counting, next, prev, toggle]);

  const progress = reader.totalWords ? (reader.wordsShown / reader.totalWords) * 100 : 0;
  const status = useMemo(() => {
    if (counting) return "Get ready";
    return reader.isPlaying ? "Reading" : "Paused";
  }, [counting, reader.isPlaying]);

  if (counting) {
    return (
      <div className="sr-countdown" aria-live="polite" aria-atomic="true">
        {COUNTDOWN_STEPS[countdown]}
      </div>
    );
  }

  return (
    <>
      <p className="sr-status" aria-live="polite">{status}</p>
      <div className="sr-stage">
        <div className="sr-crosshair" aria-hidden="true" />
        <div className="sr-word" aria-live="off">
          {reader.chunk && <PivotWord text={reader.chunk.text} showPivot={showPivot} />}
        </div>
      </div>

      <div
        className="sr-progress"
        role="progressbar"
        aria-label="Story progress"
        aria-valuemin="0"
        aria-valuemax={reader.totalWords}
        aria-valuenow={reader.wordsShown}
      >
        <div className="sr-progress-bar" style={{ width: `${progress}%` }} />
      </div>
      <p className="sr-count">{reader.wordsShown} / {reader.totalWords} words</p>

      <div className="sr-controls" aria-label="Reading controls">
        <button
          type="button"
          className="sr-ctrl"
          onClick={prev}
          disabled={reader.index === 0}
          aria-label="Previous words"
        >
          ⏮
        </button>
        <button type="button" className="sr-ctrl is-primary" onClick={toggle}>
          {reader.isPlaying ? "⏸ Pause" : "▶ Play"}
        </button>
        <button
          type="button"
          className="sr-ctrl"
          onClick={next}
          disabled={reader.index >= reader.totalChunks - 1}
          aria-label="Next words"
        >
          ⏭
        </button>
      </div>

      <div className="sr-nudge">
        <button
          type="button"
          className="sr-ctrl"
          onClick={() => onWpmChange(Math.max(WPM_MIN, wpm - 20))}
          disabled={wpm <= WPM_MIN}
          aria-label="Read slower"
        >
          🐢
        </button>
        <span className="sr-nudge-value">{wpm} wpm</span>
        <button
          type="button"
          className="sr-ctrl"
          onClick={() => onWpmChange(Math.min(WPM_MAX, wpm + 20))}
          disabled={wpm >= WPM_MAX}
          aria-label="Read faster"
        >
          🚀
        </button>
      </div>
    </>
  );
}

export default ReadingView;
