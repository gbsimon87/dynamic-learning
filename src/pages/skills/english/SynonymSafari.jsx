import { useEffect, useState, useContext, useRef } from 'react';
import { ThemeContext } from '../../../context/theme-context';
import './SynonymSafari.css';
import SpeakButton from '../../../components/challenge/SpeakButton';
import AnswerFeedbackLine from '../../../components/skills/AnswerFeedbackLine';
import { useAnswerFeedback } from '../../../components/skills/useAnswerFeedback';

const SYNONYM_PAIRS = [
  ['happy', 'glad'],
  ['fast', 'quick'],
  ['small', 'tiny'],
  ['big', 'large'],
  ['smart', 'clever'],
  ['angry', 'mad'],
  ['begin', 'start'],
  ['end', 'finish'],
  ['buy', 'purchase'],
  ['help', 'assist'],
  ['sad', 'unhappy'],
  ['cold', 'chilly'],
  ['hot', 'boiling'],
  ['easy', 'simple'],
  ['hard', 'difficult'],
  ['old', 'ancient'],
];

// Utility to shuffle
function shuffle(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

// Generate cards based on number of pairs
function generateCards(pairCount) {
  const selectedPairs = shuffle(SYNONYM_PAIRS).slice(0, pairCount);
  const cards = selectedPairs.flatMap(([a, b]) => [
    { id: `${a}-${Math.random()}`, word: a, pair: b },
    { id: `${b}-${Math.random()}`, word: b, pair: a },
  ]);
  return shuffle(cards);
}

export default function SynonymSafari() {
  const { theme } = useContext(ThemeContext);

  // Load difficulty from localStorage (default to medium)
  const [difficulty, setDifficulty] = useState(() => {
    return localStorage.getItem('difficulty') || 'medium';
  });

  const pairCount = difficulty === 'easy' ? 4 : difficulty === 'medium' ? 6 : 8;

  const [cards, setCards] = useState(() => generateCards(pairCount));
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [tries, setTries] = useState(0);
  const [matches, setMatches] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const fb = useAnswerFeedback();
  const missedRef = useRef(false);
  const pendingFlipsRef = useRef([]);
  const evaluatedPairRef = useRef('');
  const resetFeedback = fb.reset;
  const clearFeedback = fb.clear;
  const answerFeedback = fb.answer;

  // 🔧 Combine both: regenerate + persist difficulty
  useEffect(() => {
    localStorage.setItem('difficulty', difficulty);
    setCards(generateCards(pairCount));
    setFlipped([]);
    setMatched([]);
    setTries(0);
    setMatches(0);
    setFeedback(null);
    missedRef.current = false;
    pendingFlipsRef.current = [];
    evaluatedPairRef.current = '';
    resetFeedback();
  }, [difficulty, pairCount, resetFeedback]);

  // 🧠 Flip handler
  const handleFlip = (id) => {
    if (pendingFlipsRef.current.length === 2 || pendingFlipsRef.current.includes(id) || matched.includes(id)) return;
    pendingFlipsRef.current = [...pendingFlipsRef.current, id];
    setFlipped(pendingFlipsRef.current);
  };

  // 🧩 Handle match logic
  useEffect(() => {
    if (flipped.length === 2) {
      const pairKey = flipped.join(':');
      if (evaluatedPairRef.current === pairKey) return;
      evaluatedPairRef.current = pairKey;
      const [first, second] = flipped.map((id) => cards.find((c) => c.id === id));
      setTries((t) => t + 1);

      if (first && second && first.pair === second.word) {
        // ✅ correct match
        setMatched((m) => [...m, first.id, second.id]);
        setMatches((prev) => prev + 1);
        setFeedback('correct');
        answerFeedback(true, { firstTry: !missedRef.current });
        missedRef.current = false;
        setFlipped([]);
        pendingFlipsRef.current = [];
        evaluatedPairRef.current = '';
      } else {
        // ❌ wrong match
        setFeedback('wrong');
        answerFeedback(false);
        missedRef.current = true;
        const timer = setTimeout(() => { setFlipped([]); pendingFlipsRef.current = []; evaluatedPairRef.current = ''; }, 1000);
        return () => clearTimeout(timer);
      }
    }
  }, [flipped, cards, answerFeedback]);

  // 🕓 Reset feedback after a short time
  useEffect(() => {
    if (!feedback) return;
    const timer = setTimeout(() => setFeedback(null), 800);
    return () => clearTimeout(timer);
  }, [feedback]);

  // 🎉 New round when all matched
  useEffect(() => {
    if (matched.length && matched.length === cards.length) {
      setFeedback('done');
      const timer = setTimeout(() => {
        setCards(generateCards(pairCount));
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
  }, [matched, cards, pairCount, clearFeedback]);

  return (
    <div className={`safari-wrapper ${theme}`}>
      {/* Header / Controls */}
      <div className="safari-header">
        <h2 className="safari-title">🦁 Synonym Safari</h2>
        <div className="difficulty-select">
          <label htmlFor="difficulty">Difficulty:</label>
          <select
            id="difficulty"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="easy">Easy (4 pairs)</option>
            <option value="medium">Medium (6 pairs)</option>
            <option value="hard">Hard (8 pairs)</option>
          </select>
        </div>
      </div>

      <div className="safari-score">
        Matches: {matches} / {cards.length / 2} | Tries: {tries}
      </div>

      <p className="safari-prompt">Flip the cards to find matching synonyms <SpeakButton getText={() => `Find matching words with the same meaning. Shown words: ${cards.filter((card) => flipped.includes(card.id) || matched.includes(card.id)).map((card) => card.word).join(', ') || 'Flip a card first'}.`} resetKey={cards.map((card) => card.id).join('|')} label="Hear shown words" compact /></p>

      <div ref={fb.answerRef} className="safari-grid">
        {cards.map((card) => {
          const isFlipped = flipped.includes(card.id) || matched.includes(card.id);
          return (
            <button
              type="button"
              key={card.id}
              className={`safari-card ${isFlipped ? 'flipped' : ''} ${
                matched.includes(card.id) ? 'matched' : ''
              }`}
              onClick={() => handleFlip(card.id)}
              disabled={matched.includes(card.id) || flipped.length === 2}
              aria-label={isFlipped ? card.word : 'Hidden synonym card'}
            >
              <div className="safari-card-inner">
                <div className="safari-card-front">🦓</div>
                <div className="safari-card-back">{card.word}</div>
              </div>
            </button>
          );
        })}
      </div>

      <AnswerFeedbackLine feedback={fb.feedback} ref={fb.feedbackRef} />

      {feedback === 'done' && (
        <div className="safari-feedback correct">🎉 Well done, explorer!</div>
      )}
    </div>
  );
}
