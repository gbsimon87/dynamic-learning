import { useEffect, useRef, useState } from "react";
import FreePlayShell from "../../../components/skills/FreePlayShell";
import { CATEGORIES, LEVELS, makeWordSorterQuestion } from "../../../data/freePlay/wordSorter";
import "./WordSorter.css";

/**
 * Word Sorter — free play on word classes. Tap a word, then tap the box it
 * belongs in. A right box keeps the word; a wrong box shakes and the word
 * stays in the bank so the child tries again. Harder levels add more boxes.
 */
function WordSorter() {
  return (
    <FreePlayShell
      title="Word Sorter"
      icon="🗂️"
      intro="Sort each word into the box where it belongs: nouns, verbs, adjectives and adverbs."
      makeQuestion={makeWordSorterQuestion}
      levels={LEVELS}
      render={(props) => <Question {...props} />}
    />
  );
}

function Question({ question, submit, locked }) {
  const [placed, setPlaced] = useState({}); // word -> class it was sorted into
  const [selected, setSelected] = useState(null);
  const [shaking, setShaking] = useState(null);
  const shakeTimer = useRef(null);

  useEffect(() => () => window.clearTimeout(shakeTimer.current), []);

  const bank = question.words.filter((item) => !placed[item.word]);

  const pickWord = (word) => {
    if (locked) return;
    setSelected((current) => (current === word ? null : word));
  };

  const dropInto = (type) => {
    if (locked || !selected) return;
    const item = question.words.find((w) => w.word === selected);
    if (!item) return;
    if (item.type === type) {
      setPlaced((prev) => ({ ...prev, [item.word]: type }));
      setSelected(null);
      if (bank.length === 1) submit(true);
    } else {
      setShaking(type);
      window.clearTimeout(shakeTimer.current);
      shakeTimer.current = window.setTimeout(() => setShaking(null), 500);
      submit(false);
    }
  };

  return (
    <div className="ws-board">
      <div className="ws-bank" role="group" aria-label="Words to sort">
        {bank.length === 0 && <span className="ws-bank-done">All sorted!</span>}
        {bank.map((item) => (
          <button
            key={item.word}
            type="button"
            className={`ws-tile ${selected === item.word ? "is-selected" : ""}`}
            aria-pressed={selected === item.word}
            disabled={locked}
            onClick={() => pickWord(item.word)}
          >
            {item.word}
          </button>
        ))}
      </div>

      <div className={`ws-boxes ws-boxes-${question.types.length}`}>
        {question.types.map((type) => {
          const inside = question.words.filter((w) => placed[w.word] === type);
          const { label, hint } = CATEGORIES[type];
          return (
            <button
              key={type}
              type="button"
              className={`ws-box ws-${type} ${selected ? "is-ready" : ""} ${shaking === type ? "is-shaking" : ""}`}
              aria-label={`${label}, ${hint}${inside.length ? `. Sorted here: ${inside.map((w) => w.word).join(", ")}` : ""}`}
              onClick={() => dropInto(type)}
            >
              <span className="ws-box-title">{label}</span>
              <span className="ws-box-hint">{hint}</span>
              <span className="ws-box-words" aria-hidden="true">
                {inside.map((item) => (
                  <span key={item.word} className="ws-chip">{item.word}</span>
                ))}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default WordSorter;
