import { useEffect, useState, useContext } from 'react';
import { ThemeContext } from '../../../context/ThemeContext';
import './SynonymSafari.css';

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
  ['hot', 'warm'],
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

  // 🔧 Combine both: regenerate + persist difficulty
  useEffect(() => {
    localStorage.setItem('difficulty', difficulty);
    setCards(generateCards(pairCount));
    setFlipped([]);
    setMatched([]);
    setTries(0);
    setMatches(0);
    setFeedback(null);
  }, [difficulty, pairCount]);

  // 🧠 Flip handler
  const handleFlip = (id) => {
    if (flipped.length === 2 || flipped.includes(id) || matched.includes(id)) return;
    setFlipped((prev) => [...prev, id]);
  };

  // 🧩 Handle match logic
  useEffect(() => {
    if (flipped.length === 2) {
      const [first, second] = flipped.map((id) => cards.find((c) => c.id === id));
      setTries((t) => t + 1);

      if (first && second && first.pair === second.word) {
        // ✅ correct match
        setMatched((m) => [...m, first.id, second.id]);
        setMatches((prev) => prev + 1);
        setFeedback('correct');
        setFlipped([]);
      } else {
        // ❌ wrong match
        setFeedback('wrong');
        const timer = setTimeout(() => setFlipped([]), 1000);
        return () => clearTimeout(timer);
      }
    }
  }, [flipped, cards]);

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
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [matched, cards, pairCount]);

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

      <p className="safari-prompt">Flip the cards to find matching synonyms</p>

      <div
        className="safari-grid"
        style={{
          gridTemplateColumns:
            cards.length <= 8 ? 'repeat(4, 1fr)' : 'repeat(4, 1fr)',
        }}
      >
        {cards.map((card) => {
          const isFlipped = flipped.includes(card.id) || matched.includes(card.id);
          return (
            <div
              key={card.id}
              className={`safari-card ${isFlipped ? 'flipped' : ''} ${
                matched.includes(card.id) ? 'matched' : ''
              }`}
              onClick={() => handleFlip(card.id)}
            >
              <div className="safari-card-inner">
                <div className="safari-card-front">🦓</div>
                <div className="safari-card-back">{card.word}</div>
              </div>
            </div>
          );
        })}
      </div>

      {feedback && feedback !== 'done' && (
        <div className={`safari-feedback ${feedback}`}>
          {feedback === 'correct' ? '✅ Match found!' : '❌ Try again!'}
        </div>
      )}

      {feedback === 'done' && (
        <div className="safari-feedback correct">🎉 Well done, explorer!</div>
      )}
    </div>
  );
}
