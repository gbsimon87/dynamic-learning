import { useState, useEffect, useRef } from 'react';
import './MathPractice.css';
import { generateQuestion, generateReverseQuestion } from './generateQuestion';
import RangeSlider from '../../../components/skills/RangeSlider';
import {
  DEFAULT_PRACTICE_SETTINGS, FIND_CHOICES, OPERAND_CHOICES, OPERATIONS, OPERATION_LABELS, OPERATION_SIGNS, RANGE_PRESETS,
  VALUE_CEILING, VALUE_FLOOR, withMax, withMin, withOperationToggled,
} from './practiceSettings';
import { mathToSpeech } from '../../../data/mathSpeech';
import SpeakButton from '../../../components/challenge/SpeakButton';
import AnswerFeedbackLine from '../../../components/skills/AnswerFeedbackLine';
import { useAnswerFeedback } from '../../../components/skills/useAnswerFeedback';

// One shape for both ways round: "3 + 4 = ?" (pick the answer) or
// "? = 7" (pick the calculation that makes it).
function makeQuestion(settings) {
  if (settings.find === 'sum') {
    const q = generateReverseQuestion(settings);
    return {
      text: `? = ${q.target}`, spoken: `Which sum makes ${q.target}?`, correctAnswer: q.correctAnswer, options: q.options,
      reveal: `The right one was ${q.correctAnswer} = ${q.target}.`, sums: true,
    };
  }
  const q = generateQuestion(settings);
  return {
    text: `${q.questionText} = ?`, spoken: mathToSpeech(`${q.questionText} = ?`), correctAnswer: q.correctAnswer, options: q.options,
    reveal: `The answer was ${q.correctAnswer}.`, sums: false,
  };
}

function MathPractice() {
  const [settings, setSettings] = useState(DEFAULT_PRACTICE_SETTINGS);

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
        setQuestion(makeQuestion(settings));
        setSelected(null);
        selectedRef.current = false;
        clearFeedback();
      }, 1500);
      return () => clearTimeout(timer);
    }
    // Safe dep: settings can't change mid-run (sliders are pre-start only).
  }, [selected, started, settings, clearFeedback]);

  // Keep at least one operation selected.
  const toggleOperation = (operation) => setSettings((prev) => withOperationToggled(prev, operation));
  const handleMinChange = (nextMin) => setSettings((prev) => withMin(prev, nextMin));
  const handleMaxChange = (nextMax) => setSettings((prev) => withMax(prev, nextMax));

  function startPractice() {
    fb.reset();
    selectedRef.current = false;
    setStarted(true);
    setScore(0);
    setTotal(0);
    setQuestion(makeQuestion(settings));
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
          <section className="ap-group" aria-labelledby="ap-find-label">
            <h2 id="ap-find-label" className="ap-label">What do you want to find?</h2>
            <div className="free-play-levels" role="group" aria-labelledby="ap-find-label">
              {FIND_CHOICES.map(({ id, label, example }) => (
                <button
                  key={id}
                  type="button"
                  className={`free-play-level ap-find${settings.find === id ? ' is-active' : ''}`}
                  aria-pressed={settings.find === id}
                  onClick={() => setSettings({ ...settings, find: id })}
                >
                  {label}
                  <span className="ap-find-example" aria-hidden="true">{example}</span>
                </button>
              ))}
            </div>
          </section>

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

        <h1 className="ap-solve">{question?.sums ? 'Which sum makes it?' : 'Solve:'}</h1>

        <div className="ap-question" ref={fb.answerRef}>
          <span className="ap-question-text">{question?.text}</span>
          <SpeakButton text={question?.spoken} label="Hear the question" compact />
        </div>

        {selected !== null && !isCorrect && <p className="ap-reveal">{question.reveal}</p>}
        <AnswerFeedbackLine feedback={fb.feedback} ref={fb.feedbackRef} />

        <div className={`ap-options${question?.sums ? ' is-sums' : ''}`}>
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

export default MathPractice;
