import { useState, useEffect, useRef, useCallback } from 'react';
import './NumberBonds.css';
import SpeakButton from '../../../components/challenge/SpeakButton';
import AnswerFeedbackLine from '../../../components/skills/AnswerFeedbackLine';
import { useAnswerFeedback } from '../../../components/skills/useAnswerFeedback';

// Utility: shuffle array
function shuffle(array) {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

const MAX_PAIRS = 6;
const MIN_TARGET = 2;
const MAX_TARGET = 100;
const PRESET_TARGETS = [5, 10, 20];
const MODES = [
  { id: 'match', label: 'Match cards' },
  { id: 'practice', label: 'Practice' },
];
// Below this many pairs the memory game is trivial, so the UI warns instead.
const MIN_USEFUL_PAIRS = 3;

/** How many distinct bond pairs a target actually has. */
function pairCountForTarget(target) {
  let count = 0;
  for (let a = 1; a < target; a += 1) {
    if (a <= target - a) count += 1;
  }
  return count;
}

// Generate number bond cards
function generateCards(target) {
  const nums = Array.from({ length: target }, (_, i) => i + 1);
  const pairs = nums
    .filter(n => n < target)
    .map(n => [n, target - n])
    .filter(([a, b]) => a <= b);

  // Cap by what actually exists. `slice(0, 6)` assumed 6 pairs were always
  // available, but target 5 has only 2 and targets 2-3 have just 1 - producing a
  // 2-card "memory game" that auto-completes on the first flip.
  const selected = shuffle(pairs).slice(0, Math.min(MAX_PAIRS, pairs.length));
  const cards = selected.flatMap(([a, b]) => [
    { id: `${a}-${Math.random()}`, value: a, pair: b },
    { id: `${b}-${Math.random()}`, value: b, pair: a },
  ]);
  return shuffle(cards);
}

export default function NumberBonds() {
  const [target, setTarget] = useState(10);
  const [isCustom, setIsCustom] = useState(false);
  // Draft text for the custom-target box. The input used to be uncontrolled and
  // committed on every keystroke, so typing "100" regenerated the board three
  // times (target 1 -> 10 -> 100) and the practice question visibly flickered.
  const [customDraft, setCustomDraft] = useState('');
  const practiceTimerRef = useRef(null);

  useEffect(
    () => () => {
      if (practiceTimerRef.current) clearTimeout(practiceTimerRef.current);
    },
    []
  );

  // Commit the draft on blur/Enter, clamped to the range the input advertises
  // (min/max attributes alone are not enforced).
  const commitCustomTarget = () => {
    const parsed = parseInt(customDraft, 10);
    if (Number.isNaN(parsed)) return;
    const clamped = Math.min(MAX_TARGET, Math.max(MIN_TARGET, parsed));
    setCustomDraft(String(clamped));
    setTarget(clamped);
  };
  const [mode, setMode] = useState('match');
  const [cards, setCards] = useState(() => generateCards(10));
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [tries, setTries] = useState(0);
  const [matches, setMatches] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const fb = useAnswerFeedback();
  const missedRef = useRef(false);
  const practiceLockedRef = useRef(false);
  const pendingFlipsRef = useRef([]);
  const evaluatedPairRef = useRef('');
  const clearFeedback = fb.clear;
  const resetFeedback = fb.reset;
  const answerFeedback = fb.answer;

  // Practice mode state
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState('');

  // 🎯 Generate new question for Practice Mode
  const generateQuestion = useCallback(() => {
    const a = Math.floor(Math.random() * (target - 1)) + 1;
    const correct = target - a;
    setQuestion({ a, correct });
    setAnswer('');
    missedRef.current = false;
    practiceLockedRef.current = false;
    clearFeedback();
  }, [target, clearFeedback]);

  // Reset when target or mode changes
  useEffect(() => {
    resetFeedback();
    missedRef.current = false;
    pendingFlipsRef.current = [];
    evaluatedPairRef.current = '';
    if (practiceTimerRef.current) {
      clearTimeout(practiceTimerRef.current);
      practiceTimerRef.current = null;
    }

    if (mode === 'match') {
      setCards(generateCards(target));
      setFlipped([]);
      setMatched([]);
      setTries(0);
      setMatches(0);
      setFeedback(null);
    } else {
      generateQuestion();
    }
  }, [target, mode, generateQuestion, resetFeedback]);

  // 🔹 Flip logic for Match Mode
  const handleFlip = (id) => {
    if (pendingFlipsRef.current.length === 2 || pendingFlipsRef.current.includes(id) || matched.includes(id)) return;
    pendingFlipsRef.current = [...pendingFlipsRef.current, id];
    setFlipped(pendingFlipsRef.current);
  };

  useEffect(() => {
    if (mode !== 'match' || flipped.length !== 2) return;
    const pairKey = flipped.join(':');
    if (evaluatedPairRef.current === pairKey) return;
    evaluatedPairRef.current = pairKey;
    const [first, second] = flipped.map(id => cards.find(c => c.id === id));
    setTries(t => t + 1);

    if (first && second && first.value + second.value === target) {
      setMatched(m => [...m, first.id, second.id]);
      setMatches(prev => prev + 1);
      setFeedback('correct');
      answerFeedback(true, { firstTry: !missedRef.current });
      missedRef.current = false;
      setFlipped([]);
      pendingFlipsRef.current = [];
    } else {
      setFeedback('wrong');
      answerFeedback(false);
      missedRef.current = true;
      const timer = setTimeout(() => { setFlipped([]); pendingFlipsRef.current = []; evaluatedPairRef.current = ''; }, 1000);
      return () => clearTimeout(timer);
    }
  }, [flipped, cards, target, mode, answerFeedback]);

  // Feedback reset
  useEffect(() => {
    if (!feedback) return;
    const timer = setTimeout(() => setFeedback(null), 800);
    return () => clearTimeout(timer);
  }, [feedback]);

  // 🎉 New round when complete
  useEffect(() => {
    if (mode === 'match' && matched.length && matched.length === cards.length) {
      setFeedback('done');
      const timer = setTimeout(() => {
        setCards(generateCards(target));
        setFlipped([]);
        setMatched([]);
        setTries(0);
        setMatches(0);
        setFeedback(null);
        clearFeedback();
        missedRef.current = false;
        pendingFlipsRef.current = [];
        evaluatedPairRef.current = '';
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [matched, cards, target, mode, clearFeedback]);

  // 🔢 Practice mode submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!question || practiceLockedRef.current || !answer) return;
    if (parseInt(answer) === question.correct) {
      practiceLockedRef.current = true;
      fb.answer(true, { firstTry: !missedRef.current });
      // Tracked: previously this fired even after switching to Match Mode,
      // calling setQuestion on a component no longer showing a question.
      if (practiceTimerRef.current) clearTimeout(practiceTimerRef.current);
      practiceTimerRef.current = setTimeout(() => {
        practiceTimerRef.current = null;
        generateQuestion();
      }, 1000);
    } else {
      fb.answer(false);
      missedRef.current = true;
    }
  };

  const pairCount = pairCountForTarget(target);
  const presetActive = (n) => !isCustom && target === n;

  const chooseMode = (next) => {
    if (next !== mode) setMode(next);
  };

  const stepCustom = (delta) => {
    const base = Number.isNaN(parseInt(customDraft, 10)) ? target : parseInt(customDraft, 10);
    const next = Math.min(MAX_TARGET, Math.max(MIN_TARGET, base + delta));
    setCustomDraft(String(next));
    setTarget(next);
  };

  return (
    <div className="free-play-page nb">
      <header className="free-play-header">
        <h1 className="free-play-title">Number Bonds</h1>
        <p className="free-play-intro">Two numbers that add up to your target.</p>
      </header>

      <div className="challenge-container nb-panel">
        <div className="nb-controls">
          <section className="nb-group" aria-labelledby="nb-target-label">
            <h2 id="nb-target-label" className="nb-label">Target</h2>
            <div className="free-play-levels" role="group" aria-labelledby="nb-target-label">
              {PRESET_TARGETS.map((n) => (
                <button
                  key={n}
                  type="button"
                  className={`free-play-level${presetActive(n) ? ' is-active' : ''}`}
                  aria-pressed={presetActive(n)}
                  onClick={() => { setIsCustom(false); setTarget(n); }}
                >
                  {n}
                </button>
              ))}
              <button
                type="button"
                className={`free-play-level${isCustom ? ' is-active' : ''}`}
                aria-pressed={isCustom}
                onClick={() => {
                  setIsCustom(true);
                  setCustomDraft(String(target));
                }}
              >
                Custom
              </button>
            </div>
            {isCustom && (
              <div className="nb-stepper" role="group" aria-label="Custom target">
                <button type="button" className="nb-step" aria-label="One less" onClick={() => stepCustom(-1)} disabled={target <= MIN_TARGET}>−</button>
                <input
                  type="number"
                  inputMode="numeric"
                  min={MIN_TARGET}
                  max={MAX_TARGET}
                  placeholder="?"
                  aria-label="Custom target number"
                  className="nb-stepper-input"
                  value={customDraft}
                  onChange={(e) => setCustomDraft(e.target.value)}
                  onBlur={commitCustomTarget}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      commitCustomTarget();
                    }
                  }}
                />
                <button type="button" className="nb-step" aria-label="One more" onClick={() => stepCustom(1)} disabled={target >= MAX_TARGET}>+</button>
              </div>
            )}
          </section>

          <section className="nb-group" aria-labelledby="nb-mode-label">
            <h2 id="nb-mode-label" className="nb-label">Mode</h2>
            <div className="free-play-levels" role="group" aria-labelledby="nb-mode-label">
              {MODES.map(({ id, label }) => (
                <button
                  key={id}
                  type="button"
                  className={`free-play-level${mode === id ? ' is-active' : ''}`}
                  aria-pressed={mode === id}
                  onClick={() => chooseMode(id)}
                >
                  {label}
                </button>
              ))}
            </div>
          </section>
        </div>

        {/* Match Mode */}
        {mode === 'match' && (
          <>
            <div className="nb-score" aria-live="polite">
              <span className="nb-stat">Pairs <strong>{matches} / {cards.length / 2}</strong></span>
              <span className="nb-stat">Tries <strong>{tries}</strong></span>
            </div>

            <p className="nb-prompt">
              Find two numbers that add up to <strong>{target}</strong>{' '}
              <SpeakButton getText={() => `Find two numbers that add up to ${target}. Shown numbers: ${cards.filter((card) => flipped.includes(card.id) || matched.includes(card.id)).map((card) => card.value).join(', ') || 'Flip a card first'}.`} resetKey={cards.map((card) => card.id).join('|')} label="Hear shown numbers" compact />
            </p>

            {pairCount < MIN_USEFUL_PAIRS && (
              <p className="nb-notice">
                Only {pairCount} {pairCount === 1 ? 'pair adds' : 'pairs add'} up to {target} — pick a bigger target for a longer game.
              </p>
            )}

            <div className="nb-grid" ref={fb.answerRef}>
              {cards.map((card) => {
                const isMatched = matched.includes(card.id);
                const isFlipped = flipped.includes(card.id) || isMatched;
                return (
                  <button
                    type="button"
                    key={card.id}
                    className={`nb-card${isFlipped ? ' flipped' : ''}${isMatched ? ' matched' : ''}`}
                    onClick={() => handleFlip(card.id)}
                    disabled={isMatched || flipped.length === 2}
                    aria-label={isFlipped ? `Number ${card.value}` : 'Hidden number card'}
                  >
                    <span className="nb-card-inner">
                      <span className="nb-card-front">?</span>
                      <span className="nb-card-back">{card.value}</span>
                    </span>
                  </button>
                );
              })}
            </div>
            <AnswerFeedbackLine feedback={fb.feedback} ref={fb.feedbackRef} />

            {feedback === 'done' && (
              <p className="nb-done" role="status">🎉 You matched them all!</p>
            )}
          </>
        )}

        {/* Practice Mode */}
        {mode === 'practice' && question && (
          <div className="nb-practice" ref={fb.answerRef}>
            <div className="nb-equation">
              <span className="nb-eq-num">{question.a}</span>
              <span className="nb-eq-sign" aria-hidden="true">+</span>
              <input
                type="number"
                inputMode="numeric"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSubmit(e);
                }}
                className="nb-answer"
                min="0"
                placeholder="?"
                aria-label="Missing number"
              />
              <span className="nb-eq-sign" aria-hidden="true">=</span>
              <span className="nb-eq-num">{target}</span>
              <SpeakButton text={`${question.a} plus what equals ${target}?`} label="Hear the equation" compact />
            </div>
            <button type="button" onClick={handleSubmit} className="submit-btn nb-check" disabled={!answer}>
              Check
            </button>
            <AnswerFeedbackLine feedback={fb.feedback} ref={fb.feedbackRef} />
          </div>
        )}
      </div>
    </div>
  );
}
