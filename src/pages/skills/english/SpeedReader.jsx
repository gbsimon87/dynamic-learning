import { useEffect, useMemo, useRef, useState } from "react";
import stories from "../../../data/stories.json";
import {
  MAX_WORDS,
  SPEED_PRESETS,
  WPM_MAX,
  WPM_MIN,
  nextSpeed,
  tokenize,
} from "../../../hooks/spritzTiming";
import ReaderOverlay from "./ReaderOverlay";
import ReadingView from "./ReadingView";
import StoryQuestions from "./StoryQuestions";
import "./SpeedReader.css";

const BAND_DOT = { easy: "🟢", medium: "🟡", longer: "🔴" };

function SpeedReader() {
  const [screen, setScreen] = useState("setup");
  const [storyId, setStoryId] = useState(stories[0].id);
  const [useCustom, setUseCustom] = useState(false);
  const [customText, setCustomText] = useState("");
  const [wpm, setWpm] = useState(100);
  const [chunkSize, setChunkSize] = useState(1);
  const [showPivot, setShowPivot] = useState(true);
  const [score, setScore] = useState(0);
  const [stats, setStats] = useState({ words: 0, elapsedMs: 0 });
  const [run, setRun] = useState(0);
  const finishHeadingRef = useRef(null);

  const story = stories.find((item) => item.id === storyId) ?? stories[0];
  const activeText = useCustom ? customText : story.text;
  const chunks = useMemo(
    () => tokenize(activeText, chunkSize),
    [activeText, chunkSize],
  );
  const customWordCount = useMemo(
    () => String(customText).trim().split(/\s+/).filter(Boolean).length,
    [customText],
  );
  const capped = useCustom && customWordCount > MAX_WORDS;
  const canStart = chunks.length > 0;

  useEffect(() => {
    if (screen === "finish") finishHeadingRef.current?.focus();
  }, [screen]);

  const startReading = () => {
    if (!canStart) return;
    setScore(0);
    setStats({ words: 0, elapsedMs: 0 });
    setRun((value) => value + 1);
    setScreen("reading");
  };

  const finishReading = (sessionStats) => {
    setStats(sessionStats);
    setScreen(useCustom ? "finish" : "questions");
  };

  if (screen === "setup" || screen === "reading") {
    return (
      <main className="sr-page page">
        <h1 className="sr-title">⚡ Speed Reader</h1>
        <p className="sr-intro">
          Words flash one at a time. Keep your eyes still and read!
        </p>

        <fieldset className="sr-group">
          <legend className="sr-legend">Pick a story</legend>
          <div className="sr-stories">
            {stories.map((item) => (
              <label
                className={`sr-story ${!useCustom && item.id === storyId ? "is-active" : ""}`}
                key={item.id}
              >
                <input
                  className="sr-visually-hidden"
                  type="radio"
                  name="speed-reader-story"
                  value={item.id}
                  checked={!useCustom && item.id === storyId}
                  onChange={() => {
                    setStoryId(item.id);
                    setUseCustom(false);
                  }}
                />
                <span className="sr-story-emoji" aria-hidden="true">{item.emoji}</span>
                <span className="sr-story-title">{item.title}</span>
                <span className="sr-story-meta">
                  {BAND_DOT[item.band]} {tokenize(item.text).length} words
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <details
          className="sr-custom"
          open={useCustom}
          onToggle={(event) => setUseCustom(event.currentTarget.open)}
        >
          <summary className="sr-summary">Paste your own story</summary>
          <label className="sr-textarea-label" htmlFor="sr-custom-text">
            Your story
          </label>
          <textarea
            id="sr-custom-text"
            className="sr-textarea"
            rows="5"
            value={customText}
            placeholder="Paste or type a story here…"
            onChange={(event) => setCustomText(event.target.value)}
          />
          {capped && (
            <p className="sr-note">
              That is {customWordCount} words — we will read the first {MAX_WORDS}.
            </p>
          )}
          {useCustom && !canStart && (
            <p className="sr-note" role="status">Add some words to start reading.</p>
          )}
          {useCustom && canStart && (
            <p className="sr-note">Your own story skips the questions.</p>
          )}
        </details>

        <fieldset className="sr-group">
          <legend className="sr-legend">How fast?</legend>
          <div className="sr-speeds">
            {SPEED_PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                className={`sr-speed ${wpm === preset.wpm ? "is-active" : ""}`}
                aria-pressed={wpm === preset.wpm}
                onClick={() => setWpm(preset.wpm)}
              >
                <span aria-hidden="true">{preset.emoji}</span>
                <span>{preset.label}</span>
                <small>{preset.wpm}</small>
              </button>
            ))}
          </div>
          <label className="sr-slider">
            <span>Fine-tune: {wpm} words a minute</span>
            <input
              type="range"
              min={WPM_MIN}
              max={WPM_MAX}
              step="5"
              value={wpm}
              onChange={(event) => setWpm(Number(event.target.value))}
            />
          </label>
        </fieldset>

        <fieldset className="sr-group">
          <legend className="sr-legend">Words at a time</legend>
          <div className="sr-chunks">
            {[1, 2, 3].map((size) => (
              <button
                key={size}
                type="button"
                className={`sr-chunk ${chunkSize === size ? "is-active" : ""}`}
                aria-pressed={chunkSize === size}
                onClick={() => setChunkSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
          <label className="sr-toggle">
            <input
              type="checkbox"
              checked={showPivot}
              onChange={(event) => setShowPivot(event.target.checked)}
            />
            Highlight the focus letter
          </label>
        </fieldset>

        <button
          type="button"
          className="sr-start"
          disabled={!canStart}
          onClick={startReading}
        >
          Start Reading ➡️
        </button>

        {screen === "reading" && (
          <ReaderOverlay onClose={() => setScreen("setup")} label="Speed reading">
            <ReadingView
              key={run}
              text={activeText}
              wpm={wpm}
              chunkSize={chunkSize}
              showPivot={showPivot}
              onWpmChange={setWpm}
              onFinish={finishReading}
            />
          </ReaderOverlay>
        )}
      </main>
    );
  }

  const seconds = stats.elapsedMs > 0 ? Math.max(1, Math.round(stats.elapsedMs / 1000)) : 0;
  const measuredWpm = stats.elapsedMs > 0
    ? Math.round((stats.words / stats.elapsedMs) * 60000)
    : 0;
  const faster = nextSpeed(wpm);
  const canGoFaster = faster > wpm;

  return (
    <main className="sr-page page">
      <h1 className="sr-title">⚡ Speed Reader</h1>

      {screen === "questions" && (
        <StoryQuestions
          key={story.id}
          questions={story.questions}
          onDone={(correct) => {
            setScore(correct);
            setScreen("finish");
          }}
        />
      )}

      {screen === "finish" && (
        <section className="sr-finish" aria-labelledby="sr-finish-title">
          <h2
            className="sr-finish-title"
            id="sr-finish-title"
            ref={finishHeadingRef}
            tabIndex={-1}
          >
            🎉 Great reading!
          </h2>
          <p className="sr-finish-stats">
            {stats.words} words · {seconds} seconds · {measuredWpm} words a minute
          </p>
          {!useCustom && (
            <p className="sr-finish-stats">
              Questions: {score} / {story.questions.length} ✅
            </p>
          )}
          <button
            type="button"
            className="sr-start"
            onClick={() => {
              if (canGoFaster) setWpm(faster);
              setStats({ words: 0, elapsedMs: 0 });
              setRun((value) => value + 1);
              setScreen("reading");
            }}
          >
            {canGoFaster
              ? `⚡ Read it again, faster → ${faster} wpm`
              : "⚡ Read it again"}
          </button>
          <button
            type="button"
            className="sr-secondary"
            onClick={() => setScreen("setup")}
          >
            📖 Pick another story
          </button>
        </section>
      )}
    </main>
  );
}

export default SpeedReader;
