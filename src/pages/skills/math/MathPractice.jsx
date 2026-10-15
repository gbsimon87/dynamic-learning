import { useState, useEffect, useRef } from 'react';
import './MathPractice.css';
import { generateQuestion, OPERATIONS } from './generateQuestion';
import { mathToSpeech } from '../../../data/mathSpeech';
import SpeakButton from '../../../components/challenge/SpeakButton';
import AnswerFeedbackLine from '../../../components/skills/AnswerFeedbackLine';
import { useAnswerFeedback } from '../../../components/skills/useAnswerFeedback';

const VALUE_FLOOR = 1;
const VALUE_CEILING = 100;

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
    return (
      <div className="wrapper">
        <h2 className="prompt">Arithmetic Setup</h2>

        <div className="settingsGroup">
          <label>Operation Types:</label>
          <div className="opGrid">
            {OPERATIONS.map((operation) => (
              <label key={operation} className="opCheck">
                <input
                  type="checkbox"
                  checked={settings.types.includes(operation)}
                  onChange={() => toggleOperation(operation)}
                />
                {OPERATION_LABELS[operation]}
              </label>
            ))}
          </div>
        </div>

        <div className="settingsGroup">
          <label className="opCheck">
            <input
              type="checkbox"
              checked={settings.mixOperations}
              disabled={settings.types.length < 2}
              onChange={(e) =>
                setSettings({ ...settings, mixOperations: e.target.checked })
              }
            />
            Mix operations in one problem
          </label>
          <small className="settingsHint">
            {settings.types.length < 2
              ? 'Pick two or more operations to mix them.'
              : 'Questions like 4 + (5 × 2). Brackets show what to work out first.'}
          </small>
        </div>

        <div className="settingsGroup">
          <label>Number of Operands: {settings.operands}</label>
          <input
            type="range"
            min="2"
            max="4"
            value={settings.operands}
            onChange={(e) =>
              setSettings({ ...settings, operands: parseInt(e.target.value) })
            }
          />
        </div>

        <div className="settingsGroup">
          <label>Min Value: {settings.min}</label>
          <input
            type="range"
            min={VALUE_FLOOR}
            max={VALUE_CEILING}
            value={settings.min}
            onChange={(e) => handleMinChange(parseInt(e.target.value))}
          />
        </div>

        <div className="settingsGroup">
          <label>Max Value: {settings.max}</label>
          <input
            type="range"
            min={VALUE_FLOOR}
            max={VALUE_CEILING}
            value={settings.max}
            onChange={(e) => handleMaxChange(parseInt(e.target.value))}
          />
        </div>

        <button className="startBtn" onClick={startPractice}>
          Start Practice
        </button>
      </div>
    );
  }

  const isCorrect = selected === question?.correctAnswer;

  return (
    <div className="wrapper">
      <div className="score">
        Score: {score} / {total}
      </div>

      <h2 className="prompt">Solve:</h2>

      <div className="word" ref={fb.answerRef}>{question?.questionText} = ? <SpeakButton text={mathToSpeech(`${question?.questionText} = ?`)} label="Hear the question" compact /></div>

      {selected !== null && !isCorrect && <p className="answer-reveal">The answer was {question.correctAnswer}.</p>}
      <AnswerFeedbackLine feedback={fb.feedback} ref={fb.feedbackRef} />

      <div className="options">
        {question?.options.map((option) => {
          const isThisCorrect = option === question.correctAnswer;
          const isThisSelected = option === selected;

          let className = 'optionBtn';
          if (selected !== null) {
            if (isThisCorrect) className += ' correct';
            else if (isThisSelected) className += ' wrong';
            else className += ' dimmed';
          }

          return (
            <button
              key={option}
              className={className}
              onClick={() => handleSelect(option)}
              disabled={selected !== null}
            >
              {option}
            </button>
          );
        })}
      </div>

      <button className="restartBtn" onClick={handleRestart}>
        ⏮ Restart
      </button>
    </div>
  );
}

export default MathPractice;
