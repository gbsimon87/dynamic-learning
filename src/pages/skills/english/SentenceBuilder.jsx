import { useEffect, useRef, useState } from "react";
import FreePlayShell from "../../../components/skills/FreePlayShell";
import { LEVELS, makeSentenceBuilderQuestion } from "../../../data/freePlay/sentenceBuilder";
import "./SentenceBuilder.css";

/**
 * Sentence Builder — free play on word order. Tap the scrambled words to fill
 * the numbered slots, tap a placed word to take it back, then check. A wrong
 * order shakes the words that are in the wrong place so the child can fix them.
 */
function SentenceBuilder() {
  return (
    <FreePlayShell
      title="Sentence Builder"
      icon="📝"
      intro="Put the jumbled words in order to build a sentence that makes sense."
      makeQuestion={makeSentenceBuilderQuestion}
      levels={LEVELS}
      render={(props) => <Question {...props} />}
    />
  );
}

// Ids keep repeated words ("the") apart when they move between bank and slots.
const toTiles = (words) => words.map((word, id) => ({ id, word }));

function Question({ question, submit, locked }) {
  const [bank, setBank] = useState(() => toTiles(question.scrambled));
  const [built, setBuilt] = useState([]);
  const [wrongIds, setWrongIds] = useState([]);
  const [solved, setSolved] = useState(false);
  const shakeTimer = useRef(null);

  useEffect(() => () => window.clearTimeout(shakeTimer.current), []);

  const frozen = locked || solved;

  const addWord = (tile) => {
    if (frozen) return;
    setBank((prev) => prev.filter((t) => t.id !== tile.id));
    setBuilt((prev) => [...prev, tile]);
    setWrongIds([]);
  };

  const removeWord = (tile) => {
    if (frozen) return;
    setBuilt((prev) => prev.filter((t) => t.id !== tile.id));
    setBank((prev) => [...prev, tile]);
    setWrongIds([]);
  };

  const check = () => {
    if (frozen || bank.length > 0) return;
    const wrong = built.filter((tile, i) => tile.word !== question.words[i]).map((tile) => tile.id);
    if (wrong.length === 0) {
      setSolved(true);
      submit(true);
      return;
    }
    setWrongIds(wrong);
    window.clearTimeout(shakeTimer.current);
    shakeTimer.current = window.setTimeout(() => setWrongIds([]), 1600);
    submit(false);
  };

  const ready = bank.length === 0 && !frozen;

  return (
    <div className="sb-board">
      <ol className={`sb-slots ${solved ? "is-solved" : ""}`} aria-label="Your sentence">
        {question.words.map((_, i) => {
          const tile = built[i];
          return (
            <li key={i} className={`sb-slot ${tile ? "is-filled" : ""}`}>
              {tile ? (
                <button
                  type="button"
                  className={`sb-tile is-placed ${wrongIds.includes(tile.id) ? "is-wrong" : ""} ${solved ? "is-right" : ""}`}
                  disabled={frozen}
                  aria-label={`${tile.word}, word ${i + 1}. Tap to take it back`}
                  onClick={() => removeWord(tile)}
                >
                  {tile.word}
                </button>
              ) : (
                <span className="sb-slot-number" aria-hidden="true">{i + 1}</span>
              )}
            </li>
          );
        })}
      </ol>

      <div className="sb-bank" role="group" aria-label="Words to use">
        {bank.length === 0 && <span className="sb-bank-done">{solved ? "Well built!" : "All the words are placed"}</span>}
        {bank.map((tile) => (
          <button key={tile.id} type="button" className="sb-tile" disabled={frozen} onClick={() => addWord(tile)}>
            {tile.word}
          </button>
        ))}
      </div>

      <button type="button" className="sb-check" disabled={!ready} onClick={check}>
        ✓ Check my sentence
      </button>
    </div>
  );
}

export default SentenceBuilder;
