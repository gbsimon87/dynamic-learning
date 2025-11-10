import { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../../../context/ThemeContext';
import './NumberBonds.css';

// Utility: shuffle array
function shuffle(array) {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

// Generate number bond cards
function generateCards(target) {
  const nums = Array.from({ length: target }, (_, i) => i + 1);
  const pairs = nums
    .filter(n => n < target)
    .map(n => [n, target - n])
    .filter(([a, b]) => a <= b);

  const selected = shuffle(pairs).slice(0, 6);
  const cards = selected.flatMap(([a, b]) => [
    { id: `${a}-${Math.random()}`, value: a, pair: b },
    { id: `${b}-${Math.random()}`, value: b, pair: a },
  ]);
  return shuffle(cards);
}

export default function NumberBonds() {
  const { theme } = useContext(ThemeContext);
  const [target, setTarget] = useState(10);
  const [isCustom, setIsCustom] = useState(false);  // ← ADD THIS LINE
  const [mode, setMode] = useState('match');
  const [cards, setCards] = useState(() => generateCards(10));
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [tries, setTries] = useState(0);
  const [matches, setMatches] = useState(0);
  const [feedback, setFeedback] = useState(null);

  // Practice mode state
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState('');
  const [practiceFeedback, setPracticeFeedback] = useState(null);

  // 🎯 Generate new question for Practice Mode
  const generateQuestion = () => {
    const a = Math.floor(Math.random() * (target - 1)) + 1;
    const correct = target - a;
    setQuestion({ a, correct });
    setAnswer('');
    setPracticeFeedback(null);
  };

  // Reset when target or mode changes
  useEffect(() => {
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
  }, [target, mode]);

  // 🔹 Flip logic for Match Mode
  const handleFlip = (id) => {
    if (flipped.length === 2 || flipped.includes(id) || matched.includes(id)) return;
    setFlipped(prev => [...prev, id]);
  };

  useEffect(() => {
    if (mode !== 'match' || flipped.length !== 2) return;
    const [first, second] = flipped.map(id => cards.find(c => c.id === id));
    setTries(t => t + 1);

    if (first && second && first.value + second.value === target) {
      setMatched(m => [...m, first.id, second.id]);
      setMatches(prev => prev + 1);
      setFeedback('correct');
      setFlipped([]);
    } else {
      setFeedback('wrong');
      const timer = setTimeout(() => setFlipped([]), 1000);
      return () => clearTimeout(timer);
    }
  }, [flipped, cards, target, mode]);

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
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [matched, cards, target, mode]);

  // 🔢 Practice mode submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (parseInt(answer) === question.correct) {
      setPracticeFeedback('correct');
      setTimeout(() => generateQuestion(), 1000);
    } else {
      setPracticeFeedback('wrong');
    }
  };

  return (
    <div className={`bonds-wrapper ${theme}`}>
      {/* Header */}
      <div className="bonds-header">
        <h2 className="bonds-title">🔢 Number Bonds</h2>

        <div className="bonds-controls">
          <div className="bonds-select">
            <label htmlFor="target">Target:</label>
            <select
              id="target"
              value={isCustom ? 'custom' : String(target)}  // ← FIX: use isCustom flag
              onChange={(e) => {
                const val = e.target.value;
                if (val === 'custom') {
                  setIsCustom(true);  // ← FIX: set flag instead
                } else {
                  setIsCustom(false);  // ← FIX: clear flag for preset values
                  setTarget(parseInt(val));
                }
              }}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="custom">Custom</option>
            </select>

            {isCustom && (    // ← CHANGE THIS LINE ONLY
              <input
                type="number"
                min="2"
                max="100"
                placeholder="Enter number"
                className="bonds-custom-input"
                onChange={(e) => {
                  const customVal = parseInt(e.target.value);
                  if (!isNaN(customVal) && customVal > 1) setTarget(customVal);
                }}
              />
            )}
          </div>

          <div className="bonds-select">
            <label htmlFor="mode">Mode:</label>
            <select
              id="mode"
              value={mode}
              onChange={(e) => setMode(e.target.value)}
            >
              <option value="match">Match Mode</option>
              <option value="practice">Practice Mode</option>
            </select>
          </div>
        </div>
      </div>

      {/* Match Mode */}
      {mode === 'match' && (
        <>
          <div className="bonds-score">
            Pairs: {matches} / {cards.length / 2} | Tries: {tries}
          </div>

          <p className="bonds-prompt">Find two numbers that add up to <strong>{target}</strong></p>

          <div className="bonds-grid">
            {cards.map((card) => {
              const isFlipped = flipped.includes(card.id) || matched.includes(card.id);
              return (
                <div
                  key={card.id}
                  className={`bonds-card ${isFlipped ? 'flipped' : ''} ${matched.includes(card.id) ? 'matched' : ''
                    }`}
                  onClick={() => handleFlip(card.id)}
                >
                  <div className="bonds-card-inner">
                    <div className="bonds-card-front">❓</div>
                    <div className="bonds-card-back">{card.value}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {feedback && feedback !== 'done' && (
            <div className={`bonds-feedback ${feedback}`}>
              {feedback === 'correct' ? '✅ Great job!' : '❌ Try again!'}
            </div>
          )}

          {feedback === 'done' && (
            <div className="bonds-feedback correct">🎉 You matched them all!</div>
          )}
        </>
      )}

      {/* Practice Mode */}
      {mode === 'practice' && question && (
        <div className="practice-container">
          <div className="practice-equation">
            <span>{question.a}</span>
            <span> + </span>
            <div className="practice-input-group">
              <input
                type="number"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSubmit(e);
                }}
                className="practice-input"
                min="0"
                placeholder="?"
              />
              <button
                type="button"
                onClick={handleSubmit}
                className="practice-btn"
                disabled={!answer}
              >
                Check
              </button>
            </div>

            <span> = {target}</span>
          </div>

          {practiceFeedback && (
            <div className={`bonds-feedback ${practiceFeedback}`}>
              {practiceFeedback === 'correct'
                ? '✅ Correct!'
                : `❌ Try again!`}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
