import { useState } from "react";
import FreePlayShell from "../../../components/skills/FreePlayShell";
import { LEVELS, makeCityQuestion } from "../../../data/freePlay/citySpotlight";
import "./CitySpotlight.css";

const MISSING_PICTURE =
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23ddd" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" fill="%23666"%3EPicture not found%3C/text%3E%3C/svg%3E';

/**
 * City Spotlight — a famous place appears and the child names its city.
 * Endless rounds on the free-play loop. A wrong tap greys that city out and the
 * child tries again; the right one lights up and the next picture follows.
 * Harder levels offer more cities to choose from. Finding cities on a map is
 * its own game: see FindTheCity.jsx.
 */
function CitySpotlight() {
  return (
    <FreePlayShell
      title="City Spotlight"
      icon="🏙️"
      intro="Look at the picture and pick the city."
      makeQuestion={makeCityQuestion}
      levels={LEVELS}
      className="city-spotlight-page"
      render={(props) => <Question {...props} />}
    />
  );
}

function Question({ question, submit, locked }) {
  const [missed, setMissed] = useState([]);

  const choose = (name) => {
    if (locked || missed.includes(name)) return;
    const correct = name === question.answer;
    if (!correct) setMissed((names) => [...names, name]);
    submit(correct);
  };

  return (
    <div className="cs-board">
      <img
        className="cs-image"
        src={question.image}
        alt="A famous place in the city"
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = MISSING_PICTURE;
        }}
      />

      <div className="cs-side">
        <p className="cs-clue">{question.hint}</p>
        <div className="cs-options" data-count={question.choices.length} role="group" aria-label="Choose the city">
          {question.choices.map((name) => {
            const state = locked ? (name === question.answer ? "is-correct" : "is-dimmed") : missed.includes(name) ? "is-wrong" : "";
            return (
              <button
                key={name}
                type="button"
                className={`cs-option ${state}`.trim()}
                disabled={locked || missed.includes(name)}
                onClick={() => choose(name)}
              >
                {name}
                {state === "is-correct" && <span className="cs-tick" aria-hidden="true"> ✓</span>}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default CitySpotlight;
