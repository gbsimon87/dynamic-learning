import { useState, useEffect, useMemo, useContext } from 'react';
import { ThemeContext } from '../../../context/theme-context';
import './FlagFinder.css';

const ALL_CONTINENTS = 'all';

// Antarctica is excluded deliberately: the API lists only 5 entries for it and
// most have no flag, so it can never fill a 4-option question.
const PLAYABLE_CONTINENTS = [
  'Africa',
  'Asia',
  'Europe',
  'North America',
  'Oceania',
  'South America',
];

// The API pages at 25 records and reports the real total in `data.meta`. Fetching
// once returns only the first 25 countries (alphabetically Abkhazia..Bermuda),
// which is why the game used to ask about A-B countries exclusively.
const PAGE_SIZE = 25;
const MAX_PAGES = 20; // hard stop: 500 records, well past the ~254 that exist
// The API rate-limits bursts of sequential page requests; a small gap avoids it.
const PAGE_DELAY_MS = 120;

function shuffleArray(array) {
  const newArray = [...array];

  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }

  return newArray;
}

// Generate a single question from a country list.
// Returns null if the list can't supply 4 distinct options, so callers show a
// message instead. Distractors are drawn by shuffling rather than by rejection
// sampling: a `while (options.length < 4)` loop over a pool with fewer than 4
// distinct names never terminates, which is the freeze pattern found elsewhere
// in this codebase.
function generateQuestion(list) {
  const byName = new Map(list.map((country) => [country.name, country]));
  const unique = [...byName.values()];
  if (unique.length < 4) return null;

  const correct = unique[Math.floor(Math.random() * unique.length)];
  const distractors = shuffleArray(
    unique.filter((country) => country.name !== correct.name)
  ).slice(0, 3);

  return {
    correct,
    options: shuffleArray([correct, ...distractors]),
  };
}

export default function FlagFinder() {
  const { theme } = useContext(ThemeContext);

  const [countries, setCountries] = useState([]);
  const [continent, setContinent] = useState(ALL_CONTINENTS);
  const [question, setQuestion] = useState(null);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- Fetch flag data once, following the API's pagination ---
  useEffect(() => {
    let cancelled = false;

    async function loadCountries() {
      try {
        setLoading(true);
        setError(null);

        const apiKey = import.meta.env.VITE_REST_COUNTRIES_API_KEY;
        const collected = [];

        for (let pageIndex = 0; pageIndex < MAX_PAGES; pageIndex += 1) {
          const offset = pageIndex * PAGE_SIZE;

          let payload;
          try {
            const response = await fetch(
              `https://api.restcountries.com/countries/v5?api-key=${apiKey}` +
                `&response_fields=names.common,flag.url_png,continents&offset=${offset}`
            );
            if (!response.ok) {
              throw new Error(`REST Countries API returned ${response.status}`);
            }
            payload = await response.json();
          } catch (pageError) {
            // Rate-limited responses carry no CORS headers, so this surfaces as an
            // opaque "Failed to fetch". Keep the pages already loaded.
            console.warn(`Flag Finder: stopped paging at offset ${offset}`, pageError);
            break;
          }

          if (cancelled) return;

          const data = payload?.data?.objects ?? [];
          collected.push(...data);

          // `more` tells us whether another page exists; stop as soon as it doesn't.
          if (!payload?.data?.meta?.more || data.length === 0) break;

          // Be gentle: a short pause between pages keeps us under the rate limit.
          await new Promise((resolve) => setTimeout(resolve, PAGE_DELAY_MS));
        }

        if (cancelled) return;

        const formatted = collected
          .filter(
            (country) =>
              country?.names?.common?.trim() && country?.flag?.url_png
          )
          .map((country) => ({
            name: country.names.common.trim(),
            flag: country.flag.url_png,
            alt: `Flag of ${country.names.common}`,
            continents: Array.isArray(country.continents)
              ? country.continents
              : [],
          }));

        if (formatted.length < 4) {
          throw new Error('Not enough countries returned by the API.');
        }

        setCountries(formatted);
      } catch (err) {
        if (cancelled) return;
        console.error('Error loading flags:', err);
        setError('Unable to load flags.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadCountries();

    return () => {
      cancelled = true;
    };
  }, []);

  // Countries available for the chosen continent.
  const pool = useMemo(() => {
    if (continent === ALL_CONTINENTS) return countries;
    return countries.filter((country) => country.continents.includes(continent));
  }, [countries, continent]);

  // Which continents actually have enough countries to build a question.
  const availableContinents = useMemo(() => {
    return PLAYABLE_CONTINENTS.filter(
      (name) =>
        countries.filter((country) => country.continents.includes(name)).length >= 4
    );
  }, [countries]);

  // Start (or restart) whenever the pool changes - e.g. a new continent choice.
  useEffect(() => {
    setQuestion(generateQuestion(pool));
    setSelected(null);
  }, [pool]);

  // --- Auto-advance after selection ---
  useEffect(() => {
    if (selected !== null && pool.length >= 4) {
      const timer = setTimeout(() => {
        const next = generateQuestion(pool);
        if (next) {
          setQuestion(next);
          setSelected(null);
        }
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [selected, pool]);

  const handleSelect = (option) => {
    if (selected !== null) return;

    setSelected(option);
    setTotal((prev) => prev + 1);

    if (option === question.correct.name) {
      setScore((prev) => prev + 1);
    }
  };

  const handleContinentChange = (next) => {
    setContinent(next);
    setScore(0);
    setTotal(0);
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

  const continentPicker = (
    <div className="flag-continentPicker">
      <label htmlFor="continent">Where in the world?</label>
      <select
        id="continent"
        value={continent}
        onChange={(e) => handleContinentChange(e.target.value)}
      >
        <option value={ALL_CONTINENTS}>🌍 The whole planet ({countries.length})</option>
        {availableContinents.map((name) => (
          <option key={name} value={name}>
            {name} (
            {countries.filter((c) => c.continents.includes(name)).length})
          </option>
        ))}
      </select>
    </div>
  );

  // --- Safety fallback ---
  if (!question) {
    return (
      <div className={`flag-wrapper ${theme}`}>
        {continentPicker}
        <div className="flag-loading">
          Not enough flags for {continent}. Try another choice.
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

      {continentPicker}

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
