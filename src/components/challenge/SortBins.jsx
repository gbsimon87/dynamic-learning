import { useState } from "react";
import "./english-kit.css";

/**
 * Sort cards into two or three labelled bins: "a" or "an", -sure or -ture,
 * sounds like "right" or like "rain".
 *
 * Tap a card, then tap a bin. A card already in a bin can be tapped to send
 * it back to the pile. Everything is a button, so it works by keyboard, and
 * nothing depends on dragging accurately.
 *
 * `bins`       [{ id, label }]
 * `cards`      [{ id, label }]
 * `placement`  { [cardId]: binId } (the caller's state)
 * `onPlace`    (cardId, binId | null), null returning it to the pile
 */
function SortBins({ bins, cards, placement, onPlace, disabled }) {
  const [held, setHeld] = useState(null);
  const pile = cards.filter((card) => !placement[card.id]);

  const pick = (cardId) => setHeld((current) => (current === cardId ? null : cardId));
  const drop = (binId) => {
    if (held === null) return;
    onPlace(held, binId);
    setHeld(null);
  };

  return (
    <div className="sort-bins">
      <div className="sort-pile" role="group" aria-label="Cards to sort">
        {pile.length === 0 ? (
          <span className="sort-pile-empty">All sorted! Look them over, then press Check.</span>
        ) : (
          pile.map((card) => (
            <button
              key={card.id}
              type="button"
              className={`sort-pile-card sort-card ${held === card.id ? "selected" : ""}`}
              aria-pressed={held === card.id}
              disabled={disabled}
              onClick={() => pick(card.id)}
            >
              {card.label}
            </button>
          ))
        )}
      </div>

      <p className="sort-instruction" aria-live="polite">
        {pile.length === 0
          ? "Tap a card in a box to take it back out."
          : held === null
            ? "Tap a card, then tap the box it belongs in."
            : `Now tap a box for “${cards.find((card) => card.id === held)?.label}”.`}
      </p>

      <div className={`sort-bin-row has-${bins.length}`}>
        {bins.map((bin) => (
          <div key={bin.id} className="sort-bin">
            <button
              type="button"
              className={`sort-bin-target sort-bin-label ${held !== null ? "is-ready" : ""}`}
              disabled={disabled || held === null}
              onClick={() => drop(bin.id)}
            >
              {bin.label}
            </button>
            <div className="sort-bin-cards">
              {cards
                .filter((card) => placement[card.id] === bin.id)
                .map((card) => (
                  <button
                    key={card.id}
                    type="button"
                    className="sort-bin-card sort-card is-placed"
                    disabled={disabled}
                    onClick={() => onPlace(card.id, null)}
                    aria-label={`${card.label}, in ${bin.label}. Tap to take it out`}
                  >
                    {card.label}
                  </button>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SortBins;
