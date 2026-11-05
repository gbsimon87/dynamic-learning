import { useState, useEffect, useRef } from 'react';
import './MathPractice.css';
import { generateQuestion, OPERATIONS } from './generateQuestion';
import { mathToSpeech } from '../../../data/mathSpeech';
import SpeakButton from '../../../components/challenge/SpeakButton';
import AnswerFeedbackLine from '../../../components/skills/AnswerFeedbackLine';
import { useAnswerFeedback } from '../../../components/skills/useAnswerFeedback';

const VALUE_FLOOR = 1;
const VALUE_CEILING = 100;

const OPERATION_SIGNS = {
  addition: '+',
  subtraction: '−',
  multiplication: '×',
  division: '÷',
};

const OPERAND_CHOICES = [2, 3, 4];
const RANGE_PRESETS = [10, 20, 50, 100];

const OPERATION_LABELS = {
  addition: 'Addition',
  subtraction: 'Subtraction',
  multiplication: 'Multiplication',
  division: 'Division',
};

function MathPractice() {
  const [settings, setSettings] = useState({
    types: ['addition'],
    mixOperations: false,
    operands: 2,
    min: 1,
    max: 10,
  });

  const [started, setStarted] = useState(false);
  const [question, setQuestion] = useState(null);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const fb = useAnswerFeedback();
  const selectedRef = useRef(false);
  const clearFeedback = fb.clear;

  useEffect(() => {
    if (started && selected !== null) {
      const timer = setTimeout(() => {
        setQuestion(generateQuestion(settings));
        setSelected(null);
        selectedRef.current = false;
        clearFeedback();
      }, 1500);
      return () => clearTimeout(timer);
    }
    // Safe dep: settings can't change mid-run (sliders are pre-start only).
  }, [selected, started, settings, clearFeedback]);

  // Keep at least one operation selected.
  function toggleOperation(operation) {
    setSettings((prev) => {
      const types = prev.types.includes(operation)
        ? prev.types.filter((t) => t !== operation)
        : [...prev.types, operation];
      if (types.length === 0) return prev;
      return {
        ...prev,
        types,
        // Mixing needs two or more operations.
        mixOperations: types.length < 2 ? false : prev.mixOperations,
      };
    });
  }

  // Both sliders share one track; clamp in state, never via a reactive DOM min.
  function handleMinChange(nextMin) {
    setSettings((prev) => ({
      ...prev,
      min: nextMin,
      // Nudge Max only when Min would overtake it.
      max: Math.max(prev.max, nextMin),
    }));
  }

  function handleMaxChange(nextMax) {
    setSettings((prev) => ({
      ...prev,
      max: nextMax,
      min: Math.min(prev.min, nextMax),
    }));
  }

  function startPractice() {
    fb.reset();
    selectedRef.current = false;
    setStarted(true);
    setScore(0);
    setTotal(0);
    setQuestion(generateQuestion(settings));
  }

  function handleSelect(option) {
    if (selectedRef.current || selected !== null) return;
    selectedRef.current = true;
    setSelected(option);
    fb.answer(option === question.correctAnswer);
    setTotal(total + 1);
    if (option === question.correctAnswer) {
      setScore(score + 1);
    }
  }

  function handleRestart() {
    fb.reset();
    selectedRef.current = false;
    setStarted(false);
    setQuestion(null);
    setSelected(null);
  }

  if (!started) {
    const mixDisabled = settings.types.length < 2;
    return (
      <div className="free-play-page ap">
        <header className="free-play-header">
          <h1 className="free-play-title">Arithmetic Practice</h1>
          <p className="free-play-intro">Choose what to practise, then start.</p>
        </header>

        <div className="challenge-container ap-panel">
          <section className="ap-group" aria-labelledby="ap-ops-label">
            <h2 id="ap-ops-label" className="ap-label">What do you want to practise?</h2>
            <div className="ap-chips">
              {OPERATIONS.map((operation) => (
                <label key={operation} className="ap-chip">
                  <input
                    type="checkbox"
                    checked={settings.types.includes(operation)}
                    onChange={() => toggleOperation(operation)}
                  />
                  <span className="ap-chip-face">
                    <span className="ap-chip-sign" aria-hidden="true">{OPERATION_SIGNS[operation]}</span>
                    {OPERATION_LABELS[operation]}
                  </span>
                </label>
              ))}
            </div>
            <label className={`ap-switch${mixDisabled ? ' is-disabled' : ''}`}>
              <input
                type="checkbox"
                checked={settings.mixOperations}
                disabled={mixDisabled}
                onChange={(e) =>
                  setSettings({ ...settings, mixOperations: e.target.checked })
                }
              />
              <span className="ap-switch-track" aria-hidden="true" />
              Mix operations in one question
            </label>
            <p className="ap-hint">
              {mixDisabled
                ? 'Pick two or more operations to mix them.'
                : 'Questions like 4 + (5 × 2). Brackets show what to work out first.'}
            </p>
          </section>

          <section className="ap-group" aria-labelledby="ap-operands-label">
            <h2 id="ap-operands-label" className="ap-label">How many numbers in each question?</h2>
            <div className="free-play-levels" role="group" aria-labelledby="ap-operands-label">
              {OPERAND_CHOICES.map((count) => (
                <button
                  key={count}
                  type="button"
                  className={`free-play-level${settings.operands === count ? ' is-active' : ''}`}
                  aria-pressed={settings.operands === count}
                  onClick={() => setSettings({ ...settings, operands: count })}
                >
                  {count}
                </button>
              ))}
            </div>
          </section>

          <section className="ap-group" aria-labelledby="ap-size-label">
            <h2 id="ap-size-label" className="ap-label">How big are the numbers?</h2>
            <div className="free-play-levels" role="group" aria-label="Quick choices">
              {RANGE_PRESETS.map((top) => {
                const active = settings.min === VALUE_FLOOR && settings.max === top;
                return (
                  <button
                    key={top}
                    type="button"
                    className={`free-play-level${active ? ' is-active' : ''}`}
                    aria-pressed={active}
                    onClick={() => setSettings({ ...settings, min: VALUE_FLOOR, max: top })}
                  >
                    Up to {top}
                  </button>
                );
              })}
            </div>

            <p className="ap-readout" aria-live="polite">
              From <strong>{settings.min}</strong> to <strong>{settings.max}</strong>
            </p>
            <RangeSlider
              min={settings.min}
              max={settings.max}
              floor={VALUE_FLOOR}
              ceiling={VALUE_CEILING}
              onMinChange={handleMinChange}
              onMaxChange={handleMaxChange}
            />
          </section>

          <button type="button" className="submit-btn ap-start" onClick={startPractice}>
            Start Practice
          </button>
        </div>
      </div>
    );
  }

  const isCorrect = selected === question?.correctAnswer;

  return (
    <div className="free-play-page ap">
      <div className="challenge-container ap-panel ap-play">
        <p className="ap-score" aria-live="polite">
          Score: {score} / {total}
        </p>

        <h1 className="ap-solve">Solve:</h1>

        <div className="ap-question" ref={fb.answerRef}>
          <span className="ap-question-text">{question?.questionText} = ?</span>
          <SpeakButton text={mathToSpeech(`${question?.questionText} = ?`)} label="Hear the question" compact />
        </div>

        {selected !== null && !isCorrect && <p className="ap-reveal">The answer was {question.correctAnswer}.</p>}
        <AnswerFeedbackLine feedback={fb.feedback} ref={fb.feedbackRef} />

        <div className="ap-options">
          {question?.options.map((option) => {
            const isThisCorrect = option === question.correctAnswer;
            const isThisSelected = option === selected;

            let className = 'ap-option';
            if (selected !== null) {
              if (isThisCorrect) className += ' is-correct';
              else if (isThisSelected) className += ' is-wrong';
              else className += ' is-dimmed';
            }

            return (
              <button
                key={option}
                type="button"
                className={className}
                onClick={() => handleSelect(option)}
                disabled={selected !== null}
              >
                {option}
              </button>
            );
          })}
        </div>

        <button type="button" className="ap-restart" onClick={handleRestart}>
          Change settings
        </button>
      </div>
    </div>
  );
}

/**
 * Two thumbs on one track: two native range inputs laid over each other, so
 * keyboard, screen readers and touch all keep working. Only the thumbs take
 * pointer events; the track underneath is drawn here.
 */
function RangeSlider({ min, max, floor, ceiling, onMinChange, onMaxChange }) {
  const span = ceiling - floor;
  const lo = (min - floor) / span;
  const hi = (max - floor) / span;
  // Near the top end the Min thumb must sit above Max, or it can't be dragged back.
  const minOnTop = min > floor + span / 2;

  return (
    <div className="ap-slider" style={{ '--lo': lo, '--hi': hi }}>
      <div className="ap-slider-track" aria-hidden="true">
        <div className="ap-slider-fill" />
      </div>
      <input
        type="range"
        className="ap-slider-input"
        style={{ zIndex: minOnTop ? 3 : 2 }}
        aria-label="Smallest number"
        min={floor}
        max={ceiling}
        value={min}
        onChange={(e) => onMinChange(parseInt(e.target.value, 10))}
      />
      <input
        type="range"
        className="ap-slider-input"
        style={{ zIndex: minOnTop ? 2 : 3 }}
        aria-label="Biggest number"
        min={floor}
        max={ceiling}
        value={max}
        onChange={(e) => onMaxChange(parseInt(e.target.value, 10))}
      />
      <div className="ap-slider-ends" aria-hidden="true">
        <span>{floor}</span>
        <span>{ceiling}</span>
      </div>
    </div>
  );
}

export default MathPractice;
