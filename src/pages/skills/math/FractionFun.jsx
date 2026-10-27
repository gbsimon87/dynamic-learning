import { useState, useEffect, useContext, useRef } from 'react';
import { ThemeContext } from '../../../context/theme-context';
import './FractionFun.css';
import SpeakButton from '../../../components/challenge/SpeakButton';
import AnswerFeedbackLine from '../../../components/skills/AnswerFeedbackLine';
import { useAnswerFeedback } from '../../../components/skills/useAnswerFeedback';
import { makeFractionQuestion } from '../../../data/freePlay/fractionFun';
import { SHAPES, shapeParts } from '../../../data/freePlay/fractionShapes';

const LEVELS = [
  { id: 1, label: 'Easy', ages: 'ages 6–7' },
  { id: 2, label: 'Medium', ages: 'ages 8–10' },
  { id: 3, label: 'Challenge', ages: 'ages 11+' },
];
const KINDS = [
  { id: 'shade', label: 'Shade it' },
  { id: 'name', label: 'Name it' },
];

function Fraction({ n, d }) {
  const [top, bottom] = [n, d];
  return (
    <span className="frac" role="img" aria-label={`${top} out of ${bottom}`}>
      <span className="frac-top">{top}</span>
      <span className="frac-bottom">{bottom}</span>
    </span>
  );
}

function FractionText({ value }) {
  const [n, d] = value.split('/');
  return <Fraction n={n} d={d} />;
}

export default function FractionFun() {
  const { theme } = useContext(ThemeContext);
  const [level, setLevel] = useState(1);
  const [kind, setKind] = useState('shade');
  const [question, setQuestion] = useState(() => makeFractionQuestion(Math.random, 1, 'shade'));
  const [selected, setSelected] = useState(new Set());
  const [feedback, setFeedback] = useState(null);
  const [missed, setMissed] = useState(false);
  const fb = useAnswerFeedback();
  const missedRef = useRef(false);
  const lockedRef = useRef(false);
  // Tracked so a pending timer can be cancelled on unmount or a mode change,
  // and so a second check can't stack timers.
  const timerRef = useRef(null);

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    },
    []
  );

  const schedule = (action, delay) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      timerRef.current = null;
      action();
    }, delay);
  };

  // A level or mode change starts a fresh game: no stale selection, lock,
  // timer, miss or combo carried over.
  const restart = (nextLevel, nextKind) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = null;
    lockedRef.current = false;
    missedRef.current = false;
    setMissed(false);
    setSelected(new Set());
    setFeedback(null);
    fb.reset();
    setLevel(nextLevel);
    setKind(nextKind);
    setQuestion(makeFractionQuestion(Math.random, nextLevel, nextKind));
  };

  const next = () => {
    setQuestion((q) => makeFractionQuestion(Math.random, level, kind, q.shape));
    setSelected(new Set());
    setFeedback(null);
    setMissed(false);
    missedRef.current = false;
    lockedRef.current = false;
    fb.clear();
  };

  const settle = (isCorrect) => {
    if (isCorrect) {
      lockedRef.current = true;
      fb.answer(true, { firstTry: !missedRef.current });
      setFeedback('correct');
      schedule(next, 1400);
    } else {
      fb.answer(false);
      missedRef.current = true;
      setMissed(true);
      setFeedback('wrong');
      schedule(() => { setFeedback(null); fb.clear(); }, 1000);
    }
  };

  const handleSelect = (index) => {
    if (lockedRef.current || question.kind !== 'shade') return;
    const copy = new Set(selected);
    if (copy.has(index)) copy.delete(index);
    else copy.add(index);
    setSelected(copy);
  };

  const handleCheck = () => {
    if (lockedRef.current || selected.size === 0) return;
    settle(selected.size === question.target);
  };

  const handlePick = (option) => {
    if (lockedRef.current) return;
    settle(option === question.answer);
  };

  const { width, height, paths } = shapeParts(question.shape, question.parts);
  const shadedSet = question.kind === 'shade' ? selected : new Set(question.shaded);
  const interactive = question.kind === 'shade';
  const done = feedback === 'correct';

  return (
    <div className={`fraction-wrapper ${theme}`}>
      <h2 className="fraction-title">🍫 Fraction Fun</h2>

      <div className="fraction-controls">
        <div className="fraction-tabs" role="group" aria-label="Game type">
          {KINDS.map((k) => (
            <button
              type="button"
              key={k.id}
              className={`fraction-tab ${kind === k.id ? 'active' : ''}`}
              aria-pressed={kind === k.id}
              onClick={() => kind !== k.id && restart(level, k.id)}
            >
              {k.label}
            </button>
          ))}
        </div>
        <div className="fraction-tabs" role="group" aria-label="Level">
          {LEVELS.map((l) => (
            <button
              type="button"
              key={l.id}
              className={`fraction-tab ${level === l.id ? 'active' : ''}`}
              aria-pressed={level === l.id}
              onClick={() => level !== l.id && restart(l.id, kind)}
            >
              {l.label}
              <small>{l.ages}</small>
            </button>
          ))}
        </div>
      </div>

      <p className="fraction-prompt">
        {question.kind === 'shade' ? (
          <>Shade <Fraction n={question.numerator} d={question.denominator} /> of the {SHAPES[question.shape].label}</>
        ) : (
          question.prompt
        )}
        {' '}<SpeakButton text={question.speech} label="Hear the question" compact />
      </p>
      {question.hint && <p className="fraction-hint">{question.hint}</p>}

      <svg
        className={`fraction-shape shape-${question.shape}`}
        viewBox={`0 0 ${width} ${height}`}
        style={{ aspectRatio: `${width} / ${height}` }}
        role="group"
        aria-label={`A ${SHAPES[question.shape].label} cut into ${question.parts} equal parts`}
        ref={fb.answerRef}
      >
        {paths.map((d, i) => {
          const on = shadedSet.has(i);
          const props = interactive
            ? {
                role: 'button',
                tabIndex: 0,
                'aria-pressed': on,
                'aria-label': `Part ${i + 1} of ${question.parts}, ${on ? 'shaded' : 'unshaded'}`,
                onClick: () => handleSelect(i),
                onKeyDown: (e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleSelect(i);
                  }
                },
              }
            : { 'aria-hidden': true };
          return (
            <path
              key={i}
              d={d}
              className={`fraction-part ${on ? 'filled' : ''} ${interactive ? 'tappable' : ''}`}
              {...props}
            />
          );
        })}
      </svg>

      {interactive ? (
        <>
          <p className="fraction-count" aria-live="polite">
            Shaded: <strong>{selected.size}</strong> of {question.parts} parts
          </p>
          {missed && feedback === null && (
            <p className="fraction-hint">Count the equal parts again — how many make the fraction?</p>
          )}
          <div className="fraction-actions">
            <button
              type="button"
              className="fraction-btn secondary"
              onClick={() => setSelected(new Set())}
              disabled={selected.size === 0 || done}
            >
              Clear
            </button>
            <button type="button" onClick={handleCheck} className="fraction-btn" disabled={selected.size === 0 || done}>
              Check
            </button>
          </div>
        </>
      ) : (
        <div className="fraction-options" role="group" aria-label="Choose the fraction">
          {question.options.map((option) => (
            <button
              type="button"
              key={option}
              className="fraction-option"
              onClick={() => handlePick(option)}
              disabled={done}
            >
              <FractionText value={option} />
            </button>
          ))}
        </div>
      )}

      <AnswerFeedbackLine feedback={fb.feedback} ref={fb.feedbackRef} />
    </div>
  );
}
