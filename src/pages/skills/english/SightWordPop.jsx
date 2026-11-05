import { useEffect, useRef, useState } from "react";
import "./SightWordPop.css";
import SpeakButton from "../../../components/challenge/SpeakButton";
import AnswerFeedbackLine from "../../../components/skills/AnswerFeedbackLine";
import { useAnswerFeedback } from "../../../components/skills/useAnswerFeedback";

const SIGHT_WORDS = [
  "the", "and", "is", "you", "it", "to", "in", "he", "was", "for",
  "on", "are", "as", "with", "his", "they", "I", "at", "be", "this", "of", "that", "have", "from"
];

// Each level sets how long the game runs, how many words to find, how often
// bubbles appear and how long each one floats.
const LEVELS = [
  { id: "easy", label: "Easier", icon: "🐢", hint: "Slow bubbles", duration: 60, goal: 8, spawnEveryMs: 1300, bubbleLifeMs: 6500 },
  { id: "medium", label: "Medium", icon: "🐇", hint: "Steady bubbles", duration: 50, goal: 10, spawnEveryMs: 1050, bubbleLifeMs: 5200 },
  { id: "hard", label: "Harder", icon: "🚀", hint: "Fast bubbles", duration: 45, goal: 12, spawnEveryMs: 850, bubbleLifeMs: 4200 }
];

// Five bubble colours, drawn from the theme tokens in SightWordPop.css.
const TINTS = 5;
// Four lanes keep neighbouring bubbles apart on a phone-width field.
const LANES = [15, 38, 62, 85];

const rand = (n) => Math.floor(Math.random() * n);
const pickRandom = (arr) => arr[rand(arr.length)];
const bubbleSize = (word) => 84 + Math.max(0, word.length - 3) * 7; // px

function stars(score, goal) {
  const ratio = goal ? score / goal : 0;
  if (ratio >= 1) return 3;
  if (ratio >= 0.6) return 2;
  return score > 0 ? 1 : 0;
}

function SightWordPop() {
  const [levelId, setLevelId] = useState("easy");
  const level = LEVELS.find((l) => l.id === levelId);

  // ---------- GAME STATE ----------
  const [started, setStarted] = useState(false); // false | true | "end"
  const [timeLeft, setTimeLeft] = useState(level.duration);
  const [score, setScore] = useState(0);
  const [targetsShown, setTargetsShown] = useState(0);
  const [targetWord, setTargetWord] = useState(() => pickRandom(SIGHT_WORDS));
  const [bubbles, setBubbles] = useState([]); // {id, word, lane, leftPct, tint, size}
  const fb = useAnswerFeedback();

  const poppedRef = useRef(new Set());
  const missedRef = useRef(false);
  const laneBusyRef = useRef(new Set());
  const laneOwnerRef = useRef(new Map()); // lane -> owning bubble id
  const removeTimersRef = useRef(new Map()); // bubble id -> timeout
  const fieldRef = useRef(null);
  const idCounter = useRef(0);
  const sinceTargetRef = useRef(0); // keeps a target showing at least every ~5 bubbles
  const tintRef = useRef(0);

  // Read by the spawn loop via refs, so the interval isn't rebuilt on each tick.
  const timeLeftRef = useRef(timeLeft);
  const targetsShownRef = useRef(targetsShown);
  const targetWordRef = useRef(targetWord);
  useEffect(() => { timeLeftRef.current = timeLeft; }, [timeLeft]);
  useEffect(() => { targetsShownRef.current = targetsShown; }, [targetsShown]);
  useEffect(() => { targetWordRef.current = targetWord; }, [targetWord]);

  const releaseLane = (lane, id) => {
    if (laneOwnerRef.current.get(lane) === id) {
      laneOwnerRef.current.delete(lane);
      laneBusyRef.current.delete(lane);
    }
  };

  const clearField = () => {
    removeTimersRef.current.forEach((t) => clearTimeout(t));
    removeTimersRef.current.clear();
    laneBusyRef.current.clear();
    laneOwnerRef.current.clear();
    setBubbles([]);
  };

  const scheduleRemove = (id, lane, lifeMs) => {
    const timer = setTimeout(() => {
      removeTimersRef.current.delete(id);
      setBubbles((prev) => prev.filter((b) => b.id !== id));
      releaseLane(lane, id);
    }, lifeMs);
    removeTimersRef.current.set(id, timer);
  };

  const nextTargetWord = () => {
    setTargetWord((prev) => pickRandom(SIGHT_WORDS.filter((w) => w !== prev)));
  };

  // ---------- SPAWNING LOOP ----------
  useEffect(() => {
    if (started !== true) return;

    const spawn = setInterval(() => {
      if (timeLeftRef.current <= 0 || targetsShownRef.current >= level.goal) return;

      const free = LANES.map((_, i) => i).filter((i) => !laneBusyRef.current.has(i));
      if (free.length === 0) return; // wait for a lane to free to avoid overlap
      const lane = pickRandom(free);

      const isTarget = sinceTargetRef.current >= 4 || Math.random() < 0.3;
      const currentTarget = targetWordRef.current;
      const word = isTarget
        ? currentTarget
        : pickRandom(SIGHT_WORDS.filter((w) => w !== currentTarget));

      const id = ++idCounter.current;
      laneBusyRef.current.add(lane);
      laneOwnerRef.current.set(lane, id);

      const size = bubbleSize(word);
      // Clamp against the field so a bubble never leaves it.
      const fieldWidthPx = fieldRef.current?.clientWidth || window.innerWidth;
      const halfPct = (size / fieldWidthPx) * 50;
      const jitter = Math.random() * 4 - 2;
      const leftPct = Math.max(halfPct, Math.min(100 - halfPct, LANES[lane] + jitter));
      const tint = tintRef.current++ % TINTS;

      setBubbles((prev) => [...prev, { id, word, lane, leftPct, tint, size }]);
      scheduleRemove(id, lane, level.bubbleLifeMs);

      if (word === currentTarget) {
        sinceTargetRef.current = 0;
        setTargetsShown((n) => n + 1);
      } else {
        sinceTargetRef.current += 1;
      }
    }, level.spawnEveryMs);

    return () => clearInterval(spawn);
    // timeLeft/targetsShown/targetWord are read via refs, deliberately not deps.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started, level]);

  // Cancel every pending bubble-removal timer on unmount.
  useEffect(() => {
    const timers = removeTimersRef.current;
    return () => {
      timers.forEach((t) => clearTimeout(t));
      timers.clear();
    };
  }, []);

  // ---------- TIMER LOOP ----------
  useEffect(() => {
    if (started !== true) return;
    const tick = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(tick);
  }, [started]);

  // End: time is up, the goal is reached, or every word has shown and none is left to pop.
  useEffect(() => {
    if (started !== true) return;
    const targetOnScreen = bubbles.some((b) => b.word === targetWord);
    const allShown = targetsShown >= level.goal && !targetOnScreen;
    if (timeLeft <= 0 || score >= level.goal || allShown) {
      setStarted("end");
      clearField();
    }
  }, [timeLeft, score, targetsShown, bubbles, targetWord, level.goal, started]);

  // ---------- ACTIONS ----------
  const handleStart = () => {
    fb.reset();
    clearField();
    poppedRef.current.clear();
    missedRef.current = false;
    sinceTargetRef.current = 0;
    setScore(0);
    setTargetsShown(0);
    setTargetWord(pickRandom(SIGHT_WORDS));
    setTimeLeft(level.duration);
    setStarted(true);
  };

  const handleBack = () => {
    fb.reset();
    clearField();
    setStarted(false);
  };

  const handleBubbleClick = (bubble) => {
    if (started !== true || poppedRef.current.has(bubble.id)) return;
    poppedRef.current.add(bubble.id);
    const isTarget = bubble.word === targetWordRef.current;
    fb.answer(isTarget, { firstTry: !missedRef.current });

    setBubbles((prev) => prev.filter((b) => b.id !== bubble.id));
    const pending = removeTimersRef.current.get(bubble.id);
    if (pending) {
      clearTimeout(pending);
      removeTimersRef.current.delete(bubble.id);
    }
    releaseLane(bubble.lane, bubble.id);

    if (isTarget) {
      missedRef.current = false;
      setScore((s) => s + 1);
      nextTargetWord();
      sinceTargetRef.current = 0;
    } else {
      missedRef.current = true;
    }
  };

  // ---------- UI ----------
  if (!started) {
    return (
      <div className="swp">
        <div className="swp-card">
          <h2 className="swp-title">👀 Sight Word Pop</h2>
          <p className="swp-lead">Bubbles float up with words inside. Pop the word you are asked to find!</p>

          <div className="swp-levels" role="radiogroup" aria-label="Choose a level">
            {LEVELS.map((l) => (
              <button
                key={l.id}
                type="button"
                role="radio"
                aria-checked={l.id === levelId}
                className={`swp-level ${l.id === levelId ? "is-active" : ""}`}
                onClick={() => setLevelId(l.id)}
              >
                <span className="swp-level-icon" aria-hidden="true">{l.icon}</span>
                <span className="swp-level-label">{l.label}</span>
                <span className="swp-level-hint">{l.hint}</span>
              </button>
            ))}
          </div>

          <p className="swp-summary">Find {level.goal} words in {level.duration} seconds.</p>
          <button type="button" className="swp-btn swp-btn-go" onClick={handleStart}>Start ▶</button>
        </div>
      </div>
    );
  }

  if (started === "end") {
    const earned = stars(score, level.goal);
    return (
      <div className="swp">
        <div className="swp-card">
          <h2 className="swp-title">{score >= level.goal ? "🎉 You did it!" : "⏰ Time's up!"}</h2>
          <div className="swp-stars" role="img" aria-label={`${earned} out of 3 stars`}>
            {[1, 2, 3].map((n) => (
              <span key={n} className={n <= earned ? "is-earned" : ""} aria-hidden="true">★</span>
            ))}
          </div>
          <p className="swp-result">You popped <strong>{score}</strong> of {level.goal} words.</p>
          <div className="swp-actions">
            <button type="button" className="swp-btn swp-btn-go" onClick={handleStart}>Play again ↻</button>
            <button type="button" className="swp-btn swp-btn-quiet" onClick={handleBack}>Change level</button>
          </div>
        </div>
      </div>
    );
  }

  const timePct = Math.max(0, Math.min(100, (timeLeft / level.duration) * 100));
  return (
    <div className="swp">
      <div className="swp-hud">
        <span className="swp-stat" aria-label={`${Math.max(0, timeLeft)} seconds left`}>⏱ {Math.max(0, timeLeft)}s</span>
        <span className="swp-stat">⭐ {score}/{level.goal}</span>
        <button type="button" className="swp-quit" onClick={handleBack}>✕ Stop</button>
      </div>
      <div className="swp-time" aria-hidden="true">
        <div className={`swp-time-fill ${timePct <= 25 ? "is-low" : ""}`} style={{ width: `${timePct}%` }} />
      </div>

      <div className="swp-target">
        <span className="swp-target-label">Pop this word</span>
        <span className="swp-target-word">{targetWord}</span>
        <SpeakButton text={`Pop the word ${targetWord}`} label="Hear the target word" compact />
      </div>
      <AnswerFeedbackLine feedback={fb.feedback} ref={fb.feedbackRef} />

      <div className="swp-field" ref={(node) => { fieldRef.current = node; fb.answerRef.current = node; }}>
        {bubbles.map((b) => (
          <button
            key={b.id}
            type="button"
            className={`swp-bubble swp-tint-${b.tint}`}
            onClick={() => handleBubbleClick(b)}
            style={{
              left: `${b.leftPct}%`,
              "--size": `${b.size}px`,
              "--life": `${level.bubbleLifeMs}ms`
            }}
          >
            {b.word}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SightWordPop;
