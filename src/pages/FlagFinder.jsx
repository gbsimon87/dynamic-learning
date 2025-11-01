import { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import './FlagFinder.css'; // We'll mirror your WordBuilder.css approach

function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

// Generate a single question from country list
function generateQuestion(list) {
  const correct = list[Math.floor(Math.random() * list.length)];
  const options = [correct];

  while (options.length < 4) {
    const random = list[Math.floor(Math.random() * list.length)];
    if (!options.find(o => o.name === random.name)) options.push(random);
  }

  return {
    correct,
    options: shuffleArray(options),
  };
}

export default function FlagFinder() {
  const { theme } = useContext(ThemeContext);
  const [countries, setCountries] = useState([]);
  const [question, setQuestion] = useState(null);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);

  // --- Fetch flag data once ---
  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all?fields=name,flags')
      .then(res => res.json())
      .then(data => {
        const formatted = data
          .filter(c => c?.name?.common && c?.flags?.svg)
          .map(c => ({
            name: c.name.common.trim(),
            flag: c.flags.svg,
            alt: c.flags.alt || `Flag of ${c.name.common}`,
          }));
        setCountries(formatted);
        setQuestion(generateQuestion(formatted));
      })
      .catch(err => console.error('Error loading flags:', err));
  }, []);

  // --- Auto-advance after selection ---
  useEffect(() => {
    if (selected !== null) {
      const timer = setTimeout(() => {
        setQuestion(generateQuestion(countries));
        setSelected(null);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [selected, countries]);

  const handleSelect = (option) => {
    if (selected !== null) return; // ignore multiple clicks
    setSelected(option);
    setTotal(prev => prev + 1);
    if (option === question.correct.name) {
      setScore(prev => prev + 1);
    }
  };

  if (!question) return <div className="flag-loading">Loading flags...</div>;

  const isCorrect = selected === question.correct.name;
  const isWrong = selected !== null && !isCorrect;

  return (
    <div className={`flag-wrapper ${theme}`}>
      <div className="flag-score">Score: {score} / {total}</div>

      <h2 className="flag-prompt">Which country’s flag is this?</h2>

      <div className="flag-card">
        <img
          src={question.correct.flag}
          alt={question.correct.alt}
          className="flag-image"
        />
      </div>

      {selected !== null && (
        <div className={`flag-feedback ${isCorrect ? 'correct' : 'wrong'}`}>
          {isCorrect ? '✓ Correct!' : `✗ Wrong! It was ${question.correct.name}`}
        </div>
      )}

      <div className="flag-options">
        {question.options.map((opt) => {
          const isThisCorrect = opt.name === question.correct.name;
          const isThisSelected = opt.name === selected;

          let className = 'flag-optionBtn';
          if (selected !== null) {
            if (isThisCorrect) className += ' correct';
            else if (isThisSelected) className += ' wrong';
            else className += ' dimmed';
          }

          return (
            <button
              key={opt.name}
              onClick={() => handleSelect(opt.name)}
              className={className}
              disabled={selected !== null}
            >
              {opt.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
