import { useEffect, useRef, useState } from "react";
import FreePlayShell from "../../../components/skills/FreePlayShell";
import { LEVELS, makeOppositeQuestion } from "../../../data/freePlay/opposites";
import "./OppositeMatch.css";

/**
 * Opposite Match — free play on opposites. Tap a word, then tap its opposite
 * in the other column. A right match locks both words in a shared colour; a
 * wrong tap shakes that word and the first word stays chosen, so the child
 * tries again. Harder levels add more pairs and longer words.
 */
function OppositeMatch() {
  return (
    <FreePlayShell
      title="Opposite Match"
      icon="↔️"
      intro="Match each word with its opposite: hot and cold, up and down."
      makeQuestion={makeOppositeQuestion}
      levels={LEVELS}
      render={(props) => <Question {...props} />}
    />
  );
}

const COLOURS = 5;

function Question({ question, submit, locked }) {
  const [matched, setMatched] = useState([]); // pair indices, in the order matched
  const [selected, setSelected] = useState(null); // { side: "left" | "right", word }
  const [shaking, setShaking] = useState(null);
  const shakeTimer = useRef(null);

  useEffect(() => () => window.clearTimeout(shakeTimer.current), []);

  const pairIndexOf = (side, word) => question.pairs.findIndex((p) => p[side === "left" ? 0 : 1] === word);
  const colourOf = (side, word) => {
    const order = matched.indexOf(pairIndexOf(side, word));
    return order === -1 ? null : order % COLOURS;
  };

  const tap = (side, word) => {
    if (locked || colourOf(side, word) !== null) return;

    if (!selected || selected.side === side) {
      setSelected((current) => (current && current.side === side && current.word === word ? null : { side, word }));
      return;
    }

    const [leftWord, rightWord] = side === "right" ? [selected.word, word] : [word, selected.word];
    const index = question.pairs.findIndex((p) => p[0] === leftWord && p[1] === rightWord);
    if (index !== -1) {
      setMatched((prev) => [...prev, index]);
      setSelected(null);
      if (matched.length + 1 === question.pairs.length) submit(true);
    } else {
      setShaking(`${side}:${word}`);
      window.clearTimeout(shakeTimer.current);
      shakeTimer.current = window.setTimeout(() => setShaking(null), 500);
      submit(false);
    }
  };

  const renderColumn = (side, words, label) => (
    <div className="om-column" role="group" aria-label={label}>
      {words.map((word) => {
        const colour = colourOf(side, word);
        const isMatched = colour !== null;
        const isSelected = selected?.side === side && selected.word === word;
        const partner = question.pairs[pairIndexOf(side, word)][side === "left" ? 1 : 0];
        return (
          <button
            key={word}
            type="button"
            className={[
              "om-tile",
              isMatched ? `is-matched om-colour-${colour}` : "",
              isSelected ? "is-selected" : "",
              shaking === `${side}:${word}` ? "is-shaking" : "",
            ].join(" ")}
            aria-pressed={isMatched ? undefined : isSelected}
            aria-label={isMatched ? `${word}, matched with ${partner}` : word}
            disabled={locked || isMatched}
            onClick={() => tap(side, word)}
          >
            <span>{word}</span>
            {isMatched && <span className="om-check" aria-hidden="true">✓</span>}
          </button>
        );
      })}
    </div>
  );

  return (
    <div className="om-board">
      {renderColumn("left", question.left, "Words")}
      <span className="om-divider" aria-hidden="true">↔</span>
      {renderColumn("right", question.right, "Opposites")}
    </div>
  );
}

export default OppositeMatch;
