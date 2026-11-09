import { useEffect, useRef, useState } from "react";
import NumberInput from "../../../components/challenge/NumberInput";
import AnswerFeedbackLine from "../../../components/skills/AnswerFeedbackLine";
import { useAnswerFeedback } from "../../../components/skills/useAnswerFeedback";
import { createSubmissionGate } from "../../../data/submissionGate";
import {
  COUNTDOWN_SECONDS, PENALTY_MS, ROUND_SIZES, TABLE_CHOICES, answerOf, buildFacts, createDeck, describeTables,
  factLabel, formatSeconds, missed, slowest, summarise, toggleTable, trickyFacts,
} from "../../../data/freePlay/timesTables";
import "../../../components/challenge/challenge-kit.css";
import "../../../components/skills/FreePlayShell.css";
import "./TimesTablesRace.css";

/**
 * Times Tables Race — tap the tables, then race the clock.
 *
 * Two ways to play: a round of 10, 20 or 30 questions timed overall (a wrong
 * try adds 3 seconds), or a countdown scored by how many are right. Answers
 * are typed on the kit's keypad or a physical keyboard. The results screen
 * shows the slowest and missed facts and can replay just those.
 *
 * Skills Mode is untracked: nothing is stored. Each game is its own mounted
 * <Play>, so starting again or changing the tables can never leak state.
 */

const NEXT_DELAY = 650;
const TICK_MS = 100;
const MODES = [
  { value: "countdown", icon: "⏱️", title: "Beat the clock", blurb: "Get as many right as you can before time runs out." },
  { value: "round", icon: "🏁", title: "Finish the race", blurb: "Answer them all as fast as you can. A wrong try adds 3 seconds." },
];

const DEFAULTS = { tables: [2, 5, 10], mode: "countdown", roundSize: 10, seconds: 60 };

function TimesTablesRace() {
  const [settings, setSettings] = useState(DEFAULTS);
  const [game, setGame] = useState(null);
  const [results, setResults] = useState(null);

  const start = (config) => {
    setResults(null);
    setGame({ id: (game?.id ?? 0) + 1, ...config });
  };
  const startFromSettings = () => {
    const { tables, mode, roundSize, seconds } = settings;
    start({ facts: buildFacts(tables), mode, size: mode === "round" ? roundSize : seconds, practice: false });
  };
  const backToSetup = () => {
    setGame(null);
    setResults(null);
  };

  return (
    <div className="free-play-page">
      <header className="free-play-header">
        <h1 className="free-play-title">
          <span aria-hidden="true">✖️ </span>Times Tables Race
        </h1>
        <p className="free-play-intro">Tap your times tables, pick a race, then answer as fast as you can.</p>
      </header>

      <div className="challenge-container free-play ttr">
        {!game && <Setup settings={settings} onChange={setSettings} onStart={startFromSettings} />}
        {game && !results && (
          <Play key={game.id} facts={game.facts} mode={game.mode} size={game.size} onFinish={setResults} />
        )}
        {game && results && (
          <Results
            results={results}
            game={game}
            onAgain={() => start(game)}
            onPractise={() => start({ facts: trickyFacts(results), mode: "round", size: 10, practice: true })}
            onChange={backToSetup}
          />
        )}
      </div>
    </div>
  );
}

function Segmented({ label, options, isActive, onPick }) {
  return (
    <div className="ttr-group" role="group" aria-label={label}>
      <div className="free-play-levels">
        {options.map((option) => (
          <button
            key={option.label}
            type="button"
            className={`free-play-level${isActive(option) ? " is-active" : ""}`}
            aria-pressed={isActive(option)}
            onClick={() => onPick(option)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function Step({ number, title, children }) {
  return (
    <div className="ttr-step">
      <h2 className="ttr-heading">
        <span className="ttr-step-number" aria-hidden="true">{number}</span>
        {title}
      </h2>
      {children}
    </div>
  );
}

function Setup({ settings, onChange, onStart }) {
  const { tables, mode, roundSize, seconds } = settings;
  const set = (patch) => onChange({ ...settings, ...patch });
  const ready = tables.length > 0;

  return (
    <section className="ttr-setup" aria-label="Choose your game">
      <Step number="1" title="Tap your times tables">
        <div className="ttr-tiles" role="group" aria-label="Times tables">
          {TABLE_CHOICES.map((table) => {
            const on = tables.includes(table);
            return (
              <button
                key={table}
                type="button"
                className={`ttr-tile${on ? " is-on" : ""}`}
                aria-pressed={on}
                aria-label={`${table} times table`}
                onClick={() => set({ tables: toggleTable(tables, table) })}
              >
                {table}
                {on && <span className="ttr-tick" aria-hidden="true">✓</span>}
              </button>
            );
          })}
        </div>
        <div className="ttr-tile-actions">
          <button type="button" className="ttr-secondary" onClick={() => set({ tables: TABLE_CHOICES })}>All</button>
          <button type="button" className="ttr-secondary" onClick={() => set({ tables: [] })}>Clear</button>
        </div>
        <p className="ttr-note" aria-live="polite">
          {ready ? `You picked ${describeTables(tables)}.` : "Tap at least one times table."}
        </p>
      </Step>

      <Step number="2" title="How do you want to race?">
        <div className="ttr-modes" role="group" aria-label="Game type">
          {MODES.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`ttr-mode${option.value === mode ? " is-on" : ""}`}
              aria-pressed={option.value === mode}
              aria-label={option.title}
              aria-describedby={`ttr-mode-${option.value}`}
              onClick={() => set({ mode: option.value })}
            >
              <span className="ttr-mode-icon" aria-hidden="true">{option.icon}</span>
              <span className="ttr-mode-title">{option.title}</span>
              <span className="ttr-mode-blurb" id={`ttr-mode-${option.value}`}>{option.blurb}</span>
            </button>
          ))}
        </div>
        {mode === "round" ? (
          <Segmented
            label="Number of questions"
            options={ROUND_SIZES.map((n) => ({ label: `${n} questions`, value: n }))}
            isActive={(option) => option.value === roundSize}
            onPick={(option) => set({ roundSize: option.value })}
          />
        ) : (
          <Segmented
            label="Countdown length"
            options={COUNTDOWN_SECONDS.map((n) => ({ label: `${n} seconds`, value: n }))}
            isActive={(option) => option.value === seconds}
            onPick={(option) => set({ seconds: option.value })}
          />
        )}
      </Step>

      <button type="button" className="submit-btn ttr-start" onClick={onStart} disabled={!ready}>
        <span aria-hidden="true">▶ </span>Start!
      </button>
    </section>
  );
}

function Play({ facts, mode, size, onFinish }) {
  const fb = useAnswerFeedback();
  const deckRef = useRef(null);
  if (!deckRef.current) deckRef.current = createDeck(facts, Math.random);

  const [clockHidden, setClockHidden] = useState(false);
  const [fact, setFact] = useState(() => deckRef.current.next());
  const [n, setN] = useState(0);
  const [answer, setAnswer] = useState("");
  const [misses, setMisses] = useState(0);
  const [locked, setLocked] = useState(false);
  const [results, setResults] = useState([]);
  const [startedAt] = useState(() => Date.now());
  const [questionStart, setQuestionStart] = useState(() => Date.now());
  const [now, setNow] = useState(() => Date.now());

  const resultsRef = useRef([]);
  const timerRef = useRef(null);
  const finishedRef = useRef(false);
  const gateRef = useRef(null);
  if (!gateRef.current) gateRef.current = createSubmissionGate();
  const formRef = useRef(null);
  const submitRef = useRef(null);

  const finish = () => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    window.clearTimeout(timerRef.current);
    onFinish(resultsRef.current);
  };

  // The clock. A countdown also ends the game here when it reaches zero.
  useEffect(() => {
    const id = window.setInterval(() => {
      const current = Date.now();
      setNow(current);
      if (mode === "countdown" && current - startedAt >= size * 1000) finish();
    }, TICK_MS);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  // Focus the answer box for every question, so typing needs no click. The
  // box is disabled between questions, which drops focus; this puts it back.
  useEffect(() => {
    formRef.current?.querySelector("input")?.focus({ preventScroll: true });
  }, [n]);

  const submit = () => {
    if (locked || answer === "") return;
    const correct = Number(answer) === answerOf(fact);
    if (!gateRef.current(n, correct)) return;
    fb.answer(correct, { firstTry: misses === 0 });
    if (!correct) {
      setMisses((count) => count + 1);
      setAnswer("");
      return;
    }

    const result = { fact, ms: Date.now() - questionStart, misses };
    resultsRef.current = [...resultsRef.current, result];
    setResults(resultsRef.current);
    setLocked(true);
    timerRef.current = window.setTimeout(() => {
      if (mode === "round" && resultsRef.current.length >= size) {
        finish();
        return;
      }
      fb.clear();
      setFact(deckRef.current.next());
      setN((index) => index + 1);
      setAnswer("");
      setMisses(0);
      setLocked(false);
      setQuestionStart(Date.now());
    }, NEXT_DELAY);
  };
  submitRef.current = submit;

  // A physical keyboard, wherever focus is on the page (the answer box and
  // buttons keep their own behaviour).
  useEffect(() => {
    const onKey = (event) => {
      if (event.ctrlKey || event.metaKey || event.altKey) return;
      if (event.target.closest?.("input, select, textarea, button")) return;
      if (/^\d$/.test(event.key)) setAnswer((prev) => (prev + event.key).slice(0, 3));
      else if (event.key === "Backspace") setAnswer((prev) => prev.slice(0, -1));
      else if (event.key === "Enter") submitRef.current();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const totals = summarise(results, { penalise: mode === "round" });
  const elapsed = totals.totalMs + (locked ? 0 : now - questionStart) + (mode === "round" ? misses * PENALTY_MS : 0);
  const remaining = Math.max(0, size * 1000 - (now - startedAt));

  return (
    <section className="ttr-play" aria-label="Race">
      <div className="ttr-hud">
        {!clockHidden && (
          <p className="ttr-clock" role="timer" aria-label={mode === "round" ? "Time so far" : "Time left"}>
            <span aria-hidden="true">⏱️ </span>
            {mode === "round" ? formatSeconds(elapsed) : `${Math.ceil(remaining / 1000)}s`}
          </p>
        )}
        <p className="ttr-progress">
          {mode === "round" ? `Question ${Math.min(results.length + 1, size)} of ${size}` : `${results.length} right`}
        </p>
        <button
          type="button"
          className="ttr-clock-toggle"
          aria-pressed={clockHidden}
          onClick={() => setClockHidden((hidden) => !hidden)}
        >
          {clockHidden ? "Show clock" : "Hide clock"}
        </button>
        <button type="button" className="ttr-stop" onClick={finish}>Stop</button>
      </div>

      <form
        ref={formRef}
        className="ttr-question"
        onSubmit={(event) => {
          event.preventDefault();
          submit();
        }}
      >
        <div ref={fb.answerRef}>
          <h2 className="ttr-prompt" aria-label={`${fact.a} times ${fact.b}`}>
            {fact.a} × {fact.b} = ?
          </h2>
          <NumberInput value={answer} onChange={setAnswer} disabled={locked} label="Your answer" maxDigits={3} />
        </div>
        <button type="submit" className="submit-btn ttr-check" disabled={locked || answer === ""}>Check</button>
        <AnswerFeedbackLine feedback={fb.feedback} ref={fb.feedbackRef} />
      </form>
    </section>
  );
}

function Results({ results, game, onAgain, onPractise, onChange }) {
  const round = game.mode === "round";
  const totals = summarise(results, { penalise: round });
  const slow = slowest(results, 3);
  const wrong = missed(results);
  const tricky = trickyFacts(results);
  const penalty = totals.misses * PENALTY_MS;

  return (
    <section className="ttr-results" aria-label="Results">
      <h2 className="ttr-heading">
        {totals.answered === 0
          ? "No answers yet"
          : round
            ? game.practice ? `Practice done in ${formatSeconds(totals.totalMs)}` : `Done in ${formatSeconds(totals.totalMs)}`
            : `${totals.answered} right in ${game.size} seconds`}
      </h2>

      {totals.answered > 0 && (
        <>
          <dl className="ttr-stats">
            <div><dt>Right first time</dt><dd>{totals.accuracy}%</dd></div>
            <div><dt>Questions</dt><dd>{totals.answered}</dd></div>
            <div><dt>Wrong tries</dt><dd>{totals.misses}</dd></div>
          </dl>
          {round && penalty > 0 && (
            <p className="ttr-note">That time includes +{formatSeconds(penalty)} for wrong tries.</p>
          )}

          <div className="ttr-lists">
            <div>
              <h3>Slowest facts</h3>
              <ul>
                {slow.map((r) => (
                  <li key={factLabel(r.fact)}>{factLabel(r.fact)} took {formatSeconds(r.ms)}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3>Facts to practise</h3>
              {wrong.length === 0 ? (
                <p>None missed. Brilliant! 🌟</p>
              ) : (
                <ul>
                  {wrong.map((m) => (
                    <li key={factLabel(m.fact)}>
                      {factLabel(m.fact)} = {answerOf(m.fact)} (missed {m.misses} {m.misses === 1 ? "time" : "times"})
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </>
      )}

      <div className="ttr-actions">
        {tricky.length > 0 && (
          <button type="button" className="submit-btn" onClick={onPractise}>Practise my tricky ones</button>
        )}
        <button type="button" className="submit-btn ttr-again" onClick={onAgain}>Play again</button>
        <button type="button" className="ttr-secondary" onClick={onChange}>Change tables</button>
      </div>
    </section>
  );
}

export default TimesTablesRace;
