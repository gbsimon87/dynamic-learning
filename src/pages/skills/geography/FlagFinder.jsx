import { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../../../context/ThemeContext';
import './FlagFinder.css';

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

    if (!options.find((option) => option.name === random.name)) {
      options.push(random);
    }
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- Fetch flag data once ---
  useEffect(() => {
    async function loadCountries() {
      try {
        setLoading(true);
        setError(null);

        const apiKey = import.meta.env.VITE_REST_COUNTRIES_API_KEY;

        const response = await fetch(
          `https://api.restcountries.com/countries/v5?api-key=${apiKey}&response_fields=names.common,flag.url_png`
        );

        if (!response.ok) {
          throw new Error(
            `REST Countries API returned ${response.status}`
          );
        }

        const payload = await response.json();

        const data = payload?.data?.objects ?? [];

        const formatted = data
          .filter(
            (country) =>
              country?.names?.common?.trim() &&
              country?.flag?.url_png
          )
          .map((country) => ({
            name: country.names.common.trim(),
            flag: country.flag.url_png,
            alt: `Flag of ${country.names.common}`,
          }));

        if (formatted.length < 4) {
          throw new Error(
            'Not enough countries returned by the API.'
          );
        }

        setCountries(formatted);
        setQuestion(generateQuestion(formatted));
      } catch (err) {
        console.error('Error loading flags:', err);
        setError('Unable to load flags.');
      } finally {
        setLoading(false);
      }
    }

    loadCountries();
  }, []);

  // --- Auto-advance after selection ---
  useEffect(() => {
    if (selected !== null && countries.length >= 4) {
      const timer = setTimeout(() => {
        setQuestion(generateQuestion(countries));
        setSelected(null);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [selected, countries]);

  const handleSelect = (option) => {
    if (selected !== null) return;

    setSelected(option);
    setTotal((prev) => prev + 1);

    if (option === question.correct.name) {
      setScore((prev) => prev + 1);
    }
  };

  // --- Loading state ---
  if (loading) {
    return (
      <div className={`flag-wrapper ${theme}`}>
        <div className="flag-loading">
          Loading flags...
        </div>
      </div>
    );
  }

  // --- Error state ---
  if (error) {
    return (
      <div className={`flag-wrapper ${theme}`}>
        <div className="flag-error">
          {error}
        </div>
      </div>
    );
  }

  // --- Safety fallback ---
  if (!question) {
    return (
      <div className={`flag-wrapper ${theme}`}>
        <div className="flag-loading">
          Preparing game...
        </div>
      </div>
    );
  }

  const isCorrect = selected === question.correct.name;

  return (
    <div className={`flag-wrapper ${theme}`}>
      <div className="flag-score">
        Score: {score} / {total}
      </div>

      <h2 className="flag-prompt">
        Which country’s flag is this?
      </h2>

      <div className="flag-card">
        <img
          src={question.correct.flag}
          alt={question.correct.alt}
          className="flag-image"
        />
      </div>

      {selected !== null && (
        <div
          className={`flag-feedback ${isCorrect ? 'correct' : 'wrong'
            }`}
        >
          {isCorrect
            ? '✓ Correct!'
            : `✗ Wrong! It was ${question.correct.name}`}
        </div>
      )}

      <div className="flag-options">
        {question.options.map((option) => {
          const isThisCorrect =
            option.name === question.correct.name;

          const isThisSelected =
            option.name === selected;

          let className = 'flag-optionBtn';

          if (selected !== null) {
            if (isThisCorrect) {
              className += ' correct';
            } else if (isThisSelected) {
              className += ' wrong';
            } else {
              className += ' dimmed';
            }
          }

          return (
            <button
              type="button"
              key={option.name}
              onClick={() => handleSelect(option.name)}
              className={className}
              disabled={selected !== null}
            >
              {option.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
