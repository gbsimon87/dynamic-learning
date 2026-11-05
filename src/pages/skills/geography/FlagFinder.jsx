import { useEffect, useMemo, useState, useSyncExternalStore } from 'react';
import FreePlayShell from '../../../components/skills/FreePlayShell';
import { flagCountriesStore } from '../../../data/flagCountries';
import { ALL_CONTINENTS, makeFlagQuestion, playableContinents } from '../../../data/freePlay/flagFinder';
import './FlagFinder.css';

const TITLE = 'Flag Finder';
const INTRO = 'Look at the flag, then tap the country it belongs to.';

/**
 * Flag Finder — free play on flags. Where to play (the whole planet or one
 * continent) is the shell's level picker. A wrong tap greys that country out
 * so the child can try another; the right one lights up and the next flag
 * follows. Flag data loads from REST Countries and keeps arriving while the
 * child plays.
 */
export default function FlagFinder({ countryStore = flagCountriesStore }) {
  const { countries, loading, error } = useSyncExternalStore(
    countryStore.subscribe, countryStore.getSnapshot
  );
  useEffect(() => { countryStore.start(); }, [countryStore]);

  const levels = useMemo(() => [
    { id: ALL_CONTINENTS, label: '🌍 Whole planet' },
    ...playableContinents(countries).map((name) => ({ id: name, label: name })),
  ], [countries]);

  if (countries.length < 4) {
    return (
      <div className="free-play-page ff-page">
        <header className="free-play-header">
          <h1 className="free-play-title"><span aria-hidden="true">🚩 </span>{TITLE}</h1>
        </header>
        {error ? (
          <div className="ff-status">
            <p>{error}</p>
            <button className="ff-retry" type="button" onClick={countryStore.retry}>Try again</button>
          </div>
        ) : (
          <p className="ff-status" role="status">Loading flags...</p>
        )}
      </div>
    );
  }

  // Flags that arrive mid-game join the pool for the next question; the one on
  // screen is never replaced.
  const makeQuestion = (rng, continent) => (
    makeFlagQuestion(rng, countries, continent) ?? makeFlagQuestion(rng, countries)
  );

  return (
    <FreePlayShell
      className="ff-page"
      title={TITLE}
      icon="🚩"
      intro={INTRO}
      initialLevel={ALL_CONTINENTS}
      levels={levels}
      makeQuestion={makeQuestion}
      beforeGame={(loading || error) && (
        <p className="ff-status ff-status-inline" role="status">
          {error ? 'Some flags couldn’t load. You can keep playing.' : 'Finding more flags… You can play now!'}
          {error && <button className="ff-retry" type="button" onClick={countryStore.retry}>Try again</button>}
        </p>
      )}
      render={(props) => <Question {...props} />}
    />
  );
}

function Question({ question, submit, locked }) {
  const [tried, setTried] = useState([]);
  const [won, setWon] = useState(null);

  const choose = (name) => {
    if (locked || tried.includes(name)) return;
    const isCorrect = name === question.correct.name;
    if (isCorrect) setWon(name); else setTried((prev) => [...prev, name]);
    submit(isCorrect);
  };

  return (
    <div className="ff-stage">
      <div className="ff-flag">
        <img className="ff-flag-img" src={question.correct.flag} alt={question.correct.alt} />
      </div>

      <div className="ff-options" role="group" aria-label="Which country?">
        {question.options.map((option) => {
          const state = option.name === won ? 'is-correct' : tried.includes(option.name) ? 'is-wrong' : won ? 'is-dimmed' : '';
          return (
            <button
              key={option.name}
              type="button"
              className={`ff-option ${state}`.trim()}
              disabled={locked || tried.includes(option.name)}
              onClick={() => choose(option.name)}
            >
              {option.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
