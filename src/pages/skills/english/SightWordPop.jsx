import { useEffect, useMemo, useRef, useState } from "react";
import "./SightWordPop.css";

const SIGHT_WORDS = [
  "the", "and", "is", "you", "it", "to", "in", "he", "was", "for",
  "on", "are", "as", "with", "his", "they", "I", "at", "be", "this", "of", "that", "have", "from"
];

// util
const rand = (n) => Math.floor(Math.random() * n);
const pickRandom = (arr) => arr[rand(arr.length)];

function SightWordPop() {
  // ---------- SETTINGS (Options screen) ----------
  const [settings, setSettings] = useState({
    duration: 45,      // seconds
    targetTotal: 12,   // how many target bubbles to SHOW
    spawnEveryMs: 900, // bubble cadence
    bubbleLifeMs: 3000 // float duration
  });

  // ---------- GAME STATE ----------
  const [started, setStarted] = useState(false); // false | true | "end"
  const [timeLeft, setTimeLeft] = useState(settings.duration);
  const [score, setScore] = useState(0);
  const [targetsShown, setTargetsShown] = useState(0);

  const [targetWord, setTargetWord] = useState(() => pickRandom(SIGHT_WORDS));
  const [bubbles, setBubbles] = useState([]); // {id, word, isTarget, lane, createdAt}

  // lanes prevent overlap (even spacing + tiny jitter)
  const lanes = useMemo(() => {
    // 5 lanes across 10%..90%
    const base = [12, 30, 48, 66, 84];
    return base;
  }, []);
  const laneBusyRef = useRef(new Set()); // lane indexes with active bubbles
  const fieldRef = useRef(null);

  // internal refs for intervals/timeouts
  const spawnRef = useRef(null);
  const timerRef = useRef(null);
  const idCounter = useRef(0);
  const sinceTargetRef = useRef(0); // to ensure a target appears at least every ~5 bubbles

  // ---------- HELPERS ----------
  // Removal timers by bubble id, so they can be cancelled on pop/unmount.
  const removeTimersRef = useRef(new Map());

  // lane -> owning bubble id, so a stale timeout can't free a reused lane.
  const laneOwnerRef = useRef(new Map());

  const releaseLane = (lane, id) => {
    if (laneOwnerRef.current.get(lane) === id) {
      laneOwnerRef.current.delete(lane);
      laneBusyRef.current.delete(lane);
    }
  };

  const scheduleRemove = (id, lane, lifeMs) => {
    const timer = setTimeout(() => {
      removeTimersRef.current.delete(id);
      setBubbles((prev) => prev.filter((b) => b.id !== id));
      releaseLane(lane, id);
    }, lifeMs);
    removeTimersRef.current.set(id, timer);
  };

  const chooseLane = () => {
    // pick a free lane; if none free, skip spawn this tick
    const free = lanes
      .map((_, idx) => idx)
      .filter((idx) => !laneBusyRef.current.has(idx));
    if (free.length === 0) return null;
    return pickRandom(free);
  };

  const nextTargetWord = () => {
    setTargetWord((prev) => {
      const others = SIGHT_WORDS.filter((w) => w !== prev);
      return pickRandom(others);
    });
  };

  // Read by the spawn loop via refs, so the interval isn't rebuilt on each tick.
  const timeLeftRef = useRef(timeLeft);
  const targetsShownRef = useRef(targetsShown);
  const targetWordRef = useRef(targetWord);
  useEffect(() => { timeLeftRef.current = timeLeft; }, [timeLeft]);
  useEffect(() => { targetsShownRef.current = targetsShown; }, [targetsShown]);
  useEffect(() => { targetWordRef.current = targetWord; }, [targetWord]);

  // ---------- SPAWNING LOOP ----------
  useEffect(() => {
    if (!started || started === "end") return;

    // spawn loop
    spawnRef.current = setInterval(() => {
      if (timeLeftRef.current <= 0 || targetsShownRef.current >= settings.targetTotal) return;

      const lane = chooseLane();
      if (lane === null) return; // wait for a lane to free to avoid overlap

      // Decide if this bubble is the target
      // Base probability ~0.3, but guarantee at least one every 5 bubbles.
      let isTarget = Math.random() < 0.3;
      if (sinceTargetRef.current >= 4) isTarget = true;

      // If we already showed all targets we needed, stop spawning target bubbles.
      if (targetsShownRef.current >= settings.targetTotal) isTarget = false;

      const currentTarget = targetWordRef.current;
      const word = isTarget
        ? currentTarget
        : pickRandom(SIGHT_WORDS.filter((w) => w !== currentTarget));

      const id = ++idCounter.current;
      const createdAt = Date.now();

      // mark lane busy, recording which bubble owns it
      laneBusyRef.current.add(lane);
      laneOwnerRef.current.set(lane, id);

      // small horizontal jitter (±2.5%)
      const jitter = (Math.random() * 5) - 2.5;
      const bubbleWidthPx = Math.max(70, word.length * 18);
      // Clamp against the field, not the viewport.
      const fieldWidthPx = fieldRef.current?.clientWidth || window.innerWidth;
      const bubbleHalfPct = (bubbleWidthPx / fieldWidthPx) * 50;
      const baseLeft = lanes[lane] + jitter;

      // Clamp so bubble never leaves the screen
      const safeLeft = Math.max(bubbleHalfPct, Math.min(100 - bubbleHalfPct, baseLeft));

      setBubbles((prev) => [
        ...prev,
        { id, word, isTarget, lane, leftPct: safeLeft, createdAt }
      ]);


      // schedule cleanup
      scheduleRemove(id, lane, settings.bubbleLifeMs);

      // track target scheduling
      if (isTarget) {
        sinceTargetRef.current = 0;
        setTargetsShown((n) => n + 1);
      } else {
        sinceTargetRef.current += 1;
      }

    }, settings.spawnEveryMs);

    return () => clearInterval(spawnRef.current);
    // timeLeft/targetsShown/targetWord are read via refs, deliberately not deps.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started, settings]);

  // Cancel every pending bubble-removal timer on unmount.
  useEffect(
    () => () => {
      removeTimersRef.current.forEach((t) => clearTimeout(t));
      removeTimersRef.current.clear();
    },
    []
  );

  // ---------- TIMER LOOP ----------
  useEffect(() => {
    if (!started || started === "end") return;

    setTimeLeft(settings.duration); // reset each new start
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [started, settings.duration]);

  // End conditions
  useEffect(() => {
    if (!started || started === "end") return;

    if (timeLeft <= 0 || targetsShown >= settings.targetTotal) {
      setStarted("end");
      // clear any remaining bubbles & lanes
      setBubbles([]);
      laneBusyRef.current.clear();
    }
  }, [timeLeft, targetsShown, settings.targetTotal, started]);

  // ---------- ACTIONS ----------
  const handleStart = () => {
    setScore(0);
    setTargetsShown(0);
    sinceTargetRef.current = 0;
    setTargetWord(pickRandom(SIGHT_WORDS));
    setBubbles([]);
    laneBusyRef.current.clear();
    setTimeLeft(settings.duration);
    setStarted(true);
  };

  const handleRestart = () => {
    setStarted(false);
    setBubbles([]);
    laneBusyRef.current.clear();
  };

  const handleBubbleClick = (bubble) => {
    // prevent double scoring; remove bubble and free lane immediately
    setBubbles((prev) => prev.filter((b) => b.id !== bubble.id));

    // Cancel the pending removal so it can't free a reused lane.
    const pending = removeTimersRef.current.get(bubble.id);
    if (pending) {
      clearTimeout(pending);
      removeTimersRef.current.delete(bubble.id);
    }
    releaseLane(bubble.lane, bubble.id);

    if (bubble.isTarget) {
      setScore((s) => s + 1);
      // pick a new target once a target bubble is successfully popped
      nextTargetWord();
      sinceTargetRef.current = 0;
    }
  };

  // size helper so bubble grows with word length (keeps circle shape)
  const bubbleMin = (w) => Math.max(70, w.length * 18); // px

  // ---------- UI ----------
  if (!started) {
    return (
      <div className="wrapper">
        <h2 className="prompt">👀 Sight Word Pop</h2>
        <p className="instructions">Bubbles float up. Pop the target word when you see it!</p>

        <div className="settingsGroup">
          <label>Time (seconds): {settings.duration}</label>
          <input
            type="range"
            min="20"
            max="90"
            step="5"
            value={settings.duration}
            onChange={(e) => setSettings((s) => ({ ...s, duration: parseInt(e.target.value, 10) }))}
          />
        </div>

        <div className="settingsGroup">
          <label>Targets to show: {settings.targetTotal}</label>
          <input
            type="range"
            min="5"
            max="25"
            step="1"
            value={settings.targetTotal}
            onChange={(e) => setSettings((s) => ({ ...s, targetTotal: parseInt(e.target.value, 10) }))}
          />
        </div>

        <button className="startBtn" onClick={handleStart}>Start Game ➡️</button>
      </div>
    );
  }

  if (started === "end") {
    return (
      <div className="wrapper">
        <h2 className="prompt">🎉 Game Over!</h2>
        <div className="score">Score: {score} / {settings.targetTotal}</div>
        <div className="score">Time: {Math.max(0, timeLeft)}s</div>
        <button className="restartBtn" onClick={handleRestart}>⏮ Back</button>
      </div>
    );
  }

  return (
    <div className="wrapper">
      <div className="score">
        Time: {Math.max(0, timeLeft)}s &nbsp; | &nbsp; Targets: {targetsShown}/{settings.targetTotal} &nbsp; | &nbsp; Score: {score}
      </div>

      <h2 className="prompt">
        Pop the word: <span className="targetWord">{targetWord}</span>
      </h2>

      <div className="bubbleField" ref={fieldRef}>
        {bubbles.map((b) => (
          <button
            key={b.id}
            className={`bubbleBtn`}
            onClick={() => handleBubbleClick(b)}
            style={{
              left: `${b.leftPct}%`,
              // grow by content while staying circular
              minWidth: `${bubbleMin(b.word)}px`,
              // aspect-ratio keeps it a circle as it grows
              aspectRatio: "1 / 1",
              // tiny stagger so flows feel organic
              animationDelay: `${(b.createdAt % 500) / 1000}s`
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
