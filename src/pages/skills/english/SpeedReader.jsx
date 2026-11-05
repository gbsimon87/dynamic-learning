import { useEffect, useMemo, useRef, useState } from "react";
import stories from "../../../data/stories.json";
import {
  SPEED_READER_LEVELS,
  levelById,
  speedName,
  storiesForLevel,
} from "../../../data/freePlay/speedReader";
import {
  MAX_TEXT_CHARS,
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
import SpeakButton from '../../../components/challenge/SpeakButton';

const SPEED_ICONS = { Slow: "🐢", Steady: "🚶", Fast: "🐇", Super: "🚀" };
const FIRST_LEVEL = SPEED_READER_LEVELS[0];

function SpeedReader() {
  const [screen, setScreen] = useState("setup");
  const [levelId, setLevelId] = useState(FIRST_LEVEL.id);
  const [storyId, setStoryId] = useState(() => storiesForLevel(FIRST_LEVEL.id, stories)[0].id);
  const [useCustom, setUseCustom] = useState(false);
  const [customText, setCustomText] = useState("");
  const [wpm, setWpm] = useState(FIRST_LEVEL.wpm);
  const [chunkSize, setChunkSize] = useState(FIRST_LEVEL.chunkSize);
  const [showPivot, setShowPivot] = useState(true);
  const [score, setScore] = useState(0);
  const [stats, setStats] = useState({ words: 0, elapsedMs: 0 });
  const [run, setRun] = useState(0);
  const finishHeadingRef = useRef(null);

  const level = levelById(levelId);
  const levelStories = useMemo(() => storiesForLevel(levelId, stories), [levelId]);
  const story = stories.find((item) => item.id === storyId) ?? levelStories[0];
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
  const pace = speedName(wpm);

  useEffect(() => {
    if (screen === "finish") finishHeadingRef.current?.focus();
  }, [screen]);

  // A new level is a fresh start: its stories, its pace and its chunk size.
  const chooseLevel = (nextId) => {
    if (nextId === levelId) return;
    const next = levelById(nextId);
    setLevelId(nextId);
    setStoryId(storiesForLevel(nextId, stories)[0].id);
    setWpm(next.wpm);
    setChunkSize(next.chunkSize);
  };

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
      <div className="free-play-page sr-page">
        <header className="free-play-header">
          <h1 className="free-play-title"><span aria-hidden="true">⚡ </span>Speed Reader</h1>
          <p className="free-play-intro">
            Words flash one at a time. Keep your eyes still and read!
          </p>
        </header>

        <div className="challenge-container sr-panel">
          <section className="sr-group" aria-labelledby="sr-level-label">
            <h2 id="sr-level-label" className="sr-label">How tricky?</h2>
            <div className="free-play-levels" role="group" aria-labelledby="sr-level-label">
              {SPEED_READER_LEVELS.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  className={`free-play-level ${option.id === levelId ? "is-active" : ""}`}
                  aria-pressed={option.id === levelId}
                  onClick={() => chooseLevel(option.id)}
                >
                  <span aria-hidden="true">{option.emoji} </span>{option.label}
                </button>
              ))}
            </div>
            <p className="sr-hint">{level.hint}</p>
          </section>

          <section className="sr-group" aria-labelledby="sr-source-label">
            <h2 id="sr-source-label" className="sr-label">What will you read?</h2>
            <div className="sr-sources" role="group" aria-labelledby="sr-source-label">
              <button
                type="button"
                className={`sr-source ${!useCustom ? "is-active" : ""}`}
                aria-pressed={!useCustom}
                onClick={() => setUseCustom(false)}
              >
                <span className="sr-source-emoji" aria-hidden="true">📚</span>
                <span className="sr-source-title">A Bix story</span>
                <small>With questions after</small>
              </button>
              <button
                type="button"
                className={`sr-source ${useCustom ? "is-active" : ""}`}
                aria-pressed={useCustom}
                onClick={() => setUseCustom(true)}
              >
                <span className="sr-source-emoji" aria-hidden="true">✍️</span>
                <span className="sr-source-title">Your own story</span>
                <small>Type or paste it</small>
              </button>
            </div>

            {!useCustom && (
              <>
                <div className="sr-stories" role="group" aria-label="Pick a story">
                  {levelStories.map((item) => {
                    const active = item.id === story.id;
                    return (
                      <button
                        type="button"
                        className={`sr-story ${active ? "is-active" : ""}`}
                        key={item.id}
                        aria-pressed={active}
                        onClick={() => setStoryId(item.id)}
                      >
                        <span className="sr-story-emoji" aria-hidden="true">{item.emoji}</span>
                        <span className="sr-story-title">{item.title}</span>
                        <span className="sr-story-meta">{tokenize(item.text).length} words</span>
                      </button>
                    );
                  })}
                </div>
                {screen === "setup" && (
                  <SpeakButton text={activeText} resetKey={story.id} label="Hear this story" />
                )}
              </>
            )}

            {useCustom && (
              <div className="sr-custom">
                <label className="sr-textarea-label" htmlFor="sr-custom-text">
                  Your story
                </label>
                <textarea
                  id="sr-custom-text"
                  className="sr-textarea"
                  rows="6"
                  maxLength={MAX_TEXT_CHARS}
                  value={customText}
                  placeholder="Type or paste your story here…"
                  onChange={(event) => setCustomText(event.target.value.slice(0, MAX_TEXT_CHARS))}
                />
                {capped && (
                  <p className="sr-note">
                    That is {customWordCount} words — we will read the first {MAX_WORDS}.
                  </p>
                )}
                {!canStart && (
                  <p className="sr-note" role="status">Add some words to start reading.</p>
                )}
                {canStart && (
                  <p className="sr-note">{customWordCount} words. Your own story skips the questions.</p>
                )}
                {screen === "setup" && canStart && (
                  <SpeakButton text={activeText} resetKey={customText} label="Hear this story" />
                )}
              </div>
            )}
          </section>

          <section className="sr-group" aria-labelledby="sr-speed-label">
            <h2 id="sr-speed-label" className="sr-label">How fast?</h2>
            <div className="free-play-levels" role="group" aria-label="Quick speeds">
              {SPEED_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  className={`free-play-level ${wpm === preset.wpm ? "is-active" : ""}`}
                  aria-pressed={wpm === preset.wpm}
                  onClick={() => setWpm(preset.wpm)}
                >
                  <span aria-hidden="true">{preset.emoji} </span>{preset.label}
                </button>
              ))}
            </div>
            <p className="sr-readout" aria-live="polite">
              <span aria-hidden="true">{SPEED_ICONS[pace]} </span>
              <strong>{wpm}</strong> words a minute
            </p>
            <SpeedSlider value={wpm} min={WPM_MIN} max={WPM_MAX} onChange={setWpm} />
          </section>

          <section className="sr-group" aria-labelledby="sr-chunk-label">
            <h2 id="sr-chunk-label" className="sr-label">Words at a time</h2>
            <div className="free-play-levels" role="group" aria-labelledby="sr-chunk-label">
              {[1, 2, 3].map((size) => (
                <button
                  key={size}
                  type="button"
                  className={`free-play-level ${chunkSize === size ? "is-active" : ""}`}
                  aria-pressed={chunkSize === size}
                  onClick={() => setChunkSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
            <label className="sr-switch">
              <input
                type="checkbox"
                checked={showPivot}
                onChange={(event) => setShowPivot(event.target.checked)}
              />
              <span className="sr-switch-track" aria-hidden="true" />
              <span>Highlight the focus letter</span>
            </label>
          </section>

          <button
            type="button"
            className="sr-start"
            disabled={!canStart}
            onClick={startReading}
          >
            Start Reading ➡️
          </button>
        </div>

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
      </div>
    );
  }

  const seconds = stats.elapsedMs > 0 ? Math.max(1, Math.round(stats.elapsedMs / 1000)) : 0;
  const measuredWpm = stats.elapsedMs > 0
    ? Math.round((stats.words / stats.elapsedMs) * 60000)
    : 0;
  const faster = nextSpeed(wpm);
  const canGoFaster = faster > wpm;

  return (
    <div className="free-play-page sr-page">
      <header className="free-play-header">
        <h1 className="free-play-title"><span aria-hidden="true">⚡ </span>Speed Reader</h1>
      </header>

      <div className="challenge-container sr-panel">
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
      </div>
    </div>
  );
}

/**
 * One big, friendly thumb on a filled track (the same look as the number
 * slider in Arithmetic Practice), with a tortoise and a rocket at the ends.
 */
function SpeedSlider({ value, min, max, onChange }) {
  const fill = (value - min) / (max - min);
  return (
    <div className="sr-slider" style={{ "--fill": fill }}>
      <span className="sr-slider-end" aria-hidden="true">🐢</span>
      <div className="sr-slider-body">
        <div className="sr-slider-track" aria-hidden="true">
          <div className="sr-slider-fill" />
        </div>
        <input
          type="range"
          className="sr-slider-input"
          aria-label="Reading speed in words a minute"
          aria-valuetext={`${value} words a minute`}
          min={min}
          max={max}
          step="5"
          value={value}
          onChange={(event) => onChange(Number(event.target.value))}
        />
      </div>
      <span className="sr-slider-end" aria-hidden="true">🚀</span>
    </div>
  );
}

export default SpeedReader;
