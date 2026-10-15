import { useState, useEffect, useMemo, useContext, useRef, useSyncExternalStore } from 'react';
import { ThemeContext } from '../../../context/theme-context';
import './FlagFinder.css';
import { flagCountriesStore } from '../../../data/flagCountries';
import SpeakButton from '../../../components/challenge/SpeakButton';
import AnswerFeedbackLine from '../../../components/skills/AnswerFeedbackLine';
import { useAnswerFeedback } from '../../../components/skills/useAnswerFeedback';

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

export default function FlagFinder({ countryStore = flagCountriesStore }) {
  const { theme } = useContext(ThemeContext);

  const { countries, loading, error } = useSyncExternalStore(
    countryStore.subscribe, countryStore.getSnapshot
  );
  const [continent, setContinent] = useState(ALL_CONTINENTS);
  const [question, setQuestion] = useState(null);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const fb = useAnswerFeedback();
  const selectedRef = useRef(false);
  const clearFeedback = fb.clear;
  useEffect(() => { countryStore.start(); }, [countryStore]);

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

  const poolRef = useRef(pool);
  useEffect(() => {
    poolRef.current = pool;
    // Background pages expand the pool without replacing an active question.
    setQuestion((current) => current ?? generateQuestion(pool));
  }, [pool]);

  useEffect(() => {
    if (selected === null) return;
    const timer = setTimeout(() => {
      const next = generateQuestion(poolRef.current);
      if (next) {
        setQuestion(next);
        setSelected(null);
        selectedRef.current = false;
        clearFeedback();
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [selected, clearFeedback]);

  const handleSelect = (option) => {
    if (selectedRef.current || selected !== null) return;
    selectedRef.current = true;

    setSelected(option);
    fb.answer(option === question.correct.name);
    setTotal((prev) => prev + 1);

    if (option === question.correct.name) {
      setScore((prev) => prev + 1);
    }
  };

  const handleContinentChange = (next) => {
    fb.reset();
    selectedRef.current = false;
    setContinent(next);
    setQuestion(generateQuestion(next === ALL_CONTINENTS ? countries
      : countries.filter((country) => country.continents.includes(next))));
    setSelected(null);
    setScore(0);
    setTotal(0);
  };

  // --- Loading state ---
  if (countries.length < 4 && !error) {
    return (
      <div className={`flag-wrapper ${theme}`}>
        <div className="flag-loading" role="status">
          Loading flags...
        </div>
      </div>
    );
  }

  // --- Error state ---
  if (countries.length < 4 && error) {
    return (
      <div className={`flag-wrapper ${theme}`}>
        <div className="flag-error">
          {error}
        </div>
        <button className="flag-optionBtn" type="button" onClick={countryStore.retry}>Try again</button>
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
      {loading && <p className="flag-loadStatus" role="status">Finding more flags… You can play now!</p>}
      {error && <div className="flag-loadStatus" role="status">
        Some flags couldn’t load. You can keep playing.
        <button className="flag-optionBtn" type="button" onClick={countryStore.retry}>Try again</button>
      </div>}

      <h2 className="flag-prompt">
        Which country’s flag is this?
        {' '}<SpeakButton text={`Which country's flag is this? Choose from ${question.options.map((option) => option.name).join(', ')}`} label="Hear the question and choices" compact />
      </h2>

      <div className="flag-card" ref={fb.answerRef}>
        <img
          src={question.correct.flag}
          alt={question.correct.alt}
          className="flag-image"
        />
      </div>

      {selected !== null && !isCorrect && <p className="answer-reveal">That flag belongs to {question.correct.name}.</p>}
      <AnswerFeedbackLine feedback={fb.feedback} ref={fb.feedbackRef} />

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
