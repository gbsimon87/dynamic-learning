import { useEffect, useRef, useState } from "react";
import FreePlayShell from "../../../components/skills/FreePlayShell";
import { LEVELS, makeSynonymQuestion } from "../../../data/freePlay/synonyms";
import "./SynonymSafari.css";

/**
 * Synonym Safari — free play on words that mean the same. Flip two cards: a
 * right pair stays face up in a shared colour, a wrong pair shakes and turns
 * back over so the child can remember where the words were. Harder levels add
 * more pairs and longer words.
 */
function SynonymSafari() {
  return (
    <FreePlayShell
      title="Synonym Safari"
      icon="🦁"
      intro="Flip the cards and find the words that mean the same: big and large."
      makeQuestion={makeSynonymQuestion}
      levels={LEVELS}
      render={(props) => <Question {...props} />}
    />
  );
}

const COLOURS = 5;
const PEEK_MS = 1000;

function Question({ question, submit, locked }) {
  const [up, setUp] = useState([]); // card ids turned over and not yet matched
  const [matched, setMatched] = useState([]); // pair indices, in the order matched
  const [miss, setMiss] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const flip = (card) => {
    if (locked || miss || up.includes(card.id) || matched.includes(card.pair)) return;
    const next = [...up, card.id];
    setUp(next);
    if (next.length < 2) return;

    const [first, second] = next.map((id) => question.cards.find((c) => c.id === id));
    if (first.pair === second.pair) {
      setMatched((prev) => [...prev, first.pair]);
      setUp([]);
      if (matched.length + 1 === question.pairs.length) submit(true);
    } else {
      setMiss(true);
      submit(false);
      timer.current = window.setTimeout(() => {
        setUp([]);
        setMiss(false);
      }, PEEK_MS);
    }
  };

  return (
    <div className={`sa-board is-${question.pairs.length}`} role="group" aria-label="Word cards">
      {question.cards.map((card) => {
        const order = matched.indexOf(card.pair);
        const isMatched = order !== -1;
        const isUp = isMatched || up.includes(card.id);
        const partner = question.pairs[card.pair].find((w) => w !== card.word);
        return (
          <button
            key={card.id}
            type="button"
            className={[
              "sa-card",
              isUp ? "is-up" : "",
              isMatched ? `is-matched sa-colour-${order % COLOURS}` : "",
              miss && up.includes(card.id) ? "is-miss" : "",
            ].join(" ")}
            aria-label={isMatched ? `${card.word}, matched with ${partner}` : isUp ? card.word : "Hidden word card"}
            disabled={locked || isMatched}
            onClick={() => flip(card)}
          >
            <span className="sa-inner" aria-hidden="true">
              <span className="sa-face sa-front">🐾</span>
              <span className="sa-face sa-back">
                <span className="sa-word">{card.word}</span>
                {isMatched && <span className="sa-check">✓</span>}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default SynonymSafari;
