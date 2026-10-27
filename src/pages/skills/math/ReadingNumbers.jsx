import { useMemo, useState } from "react";
import FreePlayShell from "../../../components/skills/FreePlayShell";
import SpeakButton from "../../../components/challenge/SpeakButton";
import { isNarrationSupported } from "../../../utils/speech";
import {
  LEVELS,
  PLACE_NAMES,
  dialCount,
  formatNumber,
  makeReadingQuestion,
  numberWords,
  placeParts,
} from "../../../data/freePlay/readingNumbers";
import "../../../components/challenge/challenge-kit.css";
import "./ReadingNumbers.css";

/**
 * Reading Numbers — three ways to practise saying and writing numbers.
 *
 *   Mixed    digits → words, words → digits, or listen → digits; tap the answer
 *   Build    read the words, then set a dial for each digit
 *   Explore  play with the dials and watch the words appear piece by piece
 *
 * Mixed and Build are FreePlayShell games; the number range is its level
 * picker. Switching mode remounts the shell (keyed), so no stale question,
 * combo or half-built number survives the switch.
 */

const MODES = [
  { id: "mixed", icon: "🎯", label: "Mixed", hint: "Tap the right answer" },
  { id: "build", icon: "🏗️", label: "Build", hint: "Set the digit dials" },
  { id: "explore", icon: "🔍", label: "Explore", hint: "See how numbers work" },
];

const INTROS = {
  mixed: "Match numbers with their words. Tap the answer you think is right.",
  build: "Read the number in words, then turn the dials to build it in digits.",
  explore: "Turn the dials and watch the number turn into words.",
};

const SHORT_PLACES = ["1s", "10s", "100s", "1,000s", "10,000s", "100,000s"];

function ReadingNumbers() {
  const [mode, setMode] = useState("mixed");
  const [level, setLevel] = useState(1);
  const canHear = isNarrationSupported();

  const makeQuestion = useMemo(
    () => (rng, lvl) => makeReadingQuestion(rng, lvl, mode, { canHear }),
    [mode, canHear]
  );

  const modeTabs = <ModeTabs mode={mode} onChange={setMode} />;

  if (mode === "explore") {
    return (
      <div className="free-play-page rn-page">
        <GameHeader intro={INTROS.explore} />
        {modeTabs}
        <Explore level={level} onLevelChange={setLevel} onTest={() => setMode("mixed")} />
      </div>
    );
  }

  return (
    <div className="rn-page">
      <FreePlayShell
        key={mode}
        title="Reading Numbers"
        icon="🔢"
        intro={INTROS[mode]}
        levels={LEVELS}
        initialLevel={level}
        onLevelChange={setLevel}
        beforeGame={modeTabs}
        makeQuestion={makeQuestion}
        render={(props) =>
          props.question.kind === "build" ? <BuildRound {...props} /> : <PickRound {...props} />
        }
      />
    </div>
  );
}

function GameHeader({ intro }) {
  return (
    <header className="free-play-header">
      <h1 className="free-play-title">
        <span aria-hidden="true">🔢 </span>Reading Numbers
      </h1>
      <p className="free-play-intro">{intro}</p>
    </header>
  );
}

function ModeTabs({ mode, onChange }) {
  return (
    <div className="rn-modes" role="group" aria-label="Choose how to play">
      {MODES.map((option) => (
        <button
          key={option.id}
          type="button"
          className={`rn-mode ${option.id === mode ? "is-active" : ""}`}
          aria-pressed={option.id === mode}
          onClick={() => option.id !== mode && onChange(option.id)}
        >
          <span className="rn-mode-icon" aria-hidden="true">{option.icon}</span>
          <span className="rn-mode-label">{option.label}</span>
          <span className="rn-mode-hint">{option.hint}</span>
        </button>
      ))}
    </div>
  );
}

/** The big question card: the number, the words, or a speaker to press. */
function QuestionCard({ question, solved }) {
  if (question.kind === "toWords") {
    return (
      <div className="rn-card">
        <p className="rn-card-number">{question.digits}</p>
      </div>
    );
  }
  if (question.kind === "hear") {
    return (
      <div className="rn-card rn-card-hear">
        <SpeakButton text={question.words} label="Hear the number" className="rn-speak" />
        <p className="rn-card-number" aria-live="polite">
          {solved ? question.digits : "?"}
        </p>
      </div>
    );
  }
  return (
    <div className="rn-card">
      <p className="rn-card-words">{question.words}</p>
    </div>
  );
}

function PickRound({ question, submit, locked }) {
  const [wrong, setWrong] = useState([]);
  const [right, setRight] = useState(null);
  const wordy = question.kind === "toWords";

  const tap = (option) => {
    if (locked || right !== null || wrong.includes(option)) return;
    const correct = option === question.answer;
    if (correct) setRight(option);
    else setWrong((prev) => [...prev, option]);
    submit(correct);
  };

  return (
    <>
      <QuestionCard question={question} solved={right !== null} />
      <div className={`rn-tiles ${wordy ? "is-wordy" : ""}`} role="group" aria-label="Answers">
        {question.options.map((option) => {
          const isWrong = wrong.includes(option);
          const isRight = right === option;
          return (
            <button
              key={option}
              type="button"
              className={`rn-tile ${isWrong ? "is-wrong" : ""} ${isRight ? "is-right" : ""}`}
              disabled={locked || isWrong}
              aria-label={isWrong ? `${option}, not this one` : option}
              onClick={() => tap(option)}
            >
              {option}
              {isRight && <span aria-hidden="true"> ✓</span>}
            </button>
          );
        })}
      </div>
    </>
  );
}

function BuildRound({ question, submit, locked, misses }) {
  const [digits, setDigits] = useState(() => Array(question.dials).fill(0));
  const value = Number(digits.join(""));

  return (
    <>
      <QuestionCard question={question} />
      <DigitDials
        digits={digits}
        disabled={locked}
        onStep={(index, delta) =>
          setDigits((prev) => prev.map((d, i) => (i === index ? (d + delta + 10) % 10 : d)))
        }
      />
      <p className="rn-built" aria-live="off">
        You built <strong>{formatNumber(value)}</strong>
      </p>
      {misses >= 2 && !locked && (
        <p className="rn-hint">Hint: the number has {String(question.answer).length} digits.</p>
      )}
      <button
        type="button"
        className="submit-btn"
        disabled={locked || value === 0}
        onClick={() => submit(value === question.answer)}
      >
        Check my answer
      </button>
    </>
  );
}

/** One ▲ digit ▼ dial per place, most significant first, grouped in threes. */
function DigitDials({ digits, onStep, disabled, tinted = true }) {
  return (
    <div className="rn-dials" role="group" aria-label="Digit dials">
      {digits.map((digit, index) => {
        const place = digits.length - 1 - index;
        return (
          <div
            key={place}
            className={`rn-dial ${tinted ? `rn-place-${place % 3}` : ""} ${
              place % 3 === 2 && index > 0 ? "has-gap" : ""
            }`}
          >
            <span className="rn-dial-label" aria-hidden="true">{SHORT_PLACES[place]}</span>
            <button
              type="button"
              className="rn-dial-btn"
              disabled={disabled}
              aria-label={`More ${PLACE_NAMES[place]}, now ${digit}`}
              onClick={() => onStep(index, 1)}
            >
              ▲
            </button>
            <output className="rn-dial-digit" aria-label={`${PLACE_NAMES[place]}: ${digit}`}>{digit}</output>
            <button
              type="button"
              className="rn-dial-btn"
              disabled={disabled}
              aria-label={`Fewer ${PLACE_NAMES[place]}, now ${digit}`}
              onClick={() => onStep(index, -1)}
            >
              ▼
            </button>
          </div>
        );
      })}
    </div>
  );
}

function randomIn(level) {
  const [low, high] = LEVELS.find((option) => option.id === level).range;
  return low + Math.floor(Math.random() * (high - low + 1));
}

function Explore({ level, onLevelChange, onTest }) {
  const [value, setValue] = useState(() => randomIn(level));
  const width = dialCount(level);
  const digits = String(value).padStart(width, "0").split("").map(Number);
  const parts = placeParts(value);
  const words = value === 0 ? "zero" : numberWords(value);

  const step = (index, delta) =>
    setValue((prev) => {
      const next = String(prev).padStart(width, "0").split("").map(Number);
      next[index] = (next[index] + delta + 10) % 10;
      return Number(next.join(""));
    });

  const pickLevel = (next) => {
    if (next === level) return;
    onLevelChange(next);
    setValue(randomIn(next));
  };

  return (
    <div className="challenge-container free-play rn-explore">
      <div className="free-play-toolbar">
        <div className="free-play-levels" role="group" aria-label="Choose a number range">
          {LEVELS.map((option) => (
            <button
              key={option.id}
              type="button"
              className={`free-play-level ${option.id === level ? "is-active" : ""}`}
              aria-pressed={option.id === level}
              onClick={() => pickLevel(option.id)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="rn-card">
        <p className="rn-card-number" aria-live="polite">{formatNumber(value)}</p>
      </div>

      <DigitDials digits={digits} onStep={step} />

      <div className="rn-parts" aria-label="What each digit is worth">
        {parts.length === 0 && <span className="rn-part rn-place-0">zero</span>}
        {parts.map((part) => (
          <span key={`${part.place}-${part.value}`} className={`rn-part rn-place-${part.place % 3}`}>
            <span className="rn-part-value">{formatNumber(part.value)}</span>
            <span className="rn-part-words">{part.words}</span>
          </span>
        ))}
      </div>

      <div className="rn-explore-words">
        <p className="rn-card-words">{words}</p>
        <SpeakButton text={words} label="Hear the number" compact />
      </div>

      <div className="rn-explore-actions">
        <button type="button" className="rn-action" onClick={() => setValue(randomIn(level))}>
          🎲 Surprise me
        </button>
        <button type="button" className="rn-action is-primary" onClick={onTest}>
          🎯 Test me
        </button>
      </div>
    </div>
  );
}

export default ReadingNumbers;
