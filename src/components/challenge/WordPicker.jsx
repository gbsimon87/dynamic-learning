import "./english-kit.css";

/**
 * A sentence (or passage line) the child answers by tapping it.
 *
 * mode="word"  every token is a button: tap the conjunction, the misspelt
 *              word, the evidence for a feeling. `selected` is a token index.
 * mode="gap"   the tokens are plain text and the GAPS are buttons: tap where
 *              the speech marks go, where a new paragraph starts. `selected`
 *              is a gap index, 0 (before the first token) to tokens.length
 *              (after the last).
 *
 * `tokens`    strings, shown in order with a space between them. A token
 *             may carry its punctuation ("park,"); the content decides.
 * `pickable`  optional (index) => boolean; a token that is not pickable shows
 *             as plain text in word mode (so "the" can't be tapped when the
 *             question is about verbs and that would be noise).
 * `hinted`    optional Set of token indices to underline as a hint.
 */
function WordPicker({ tokens, selected, onSelect, disabled, mode = "word", pickable, hinted, label = "Sentence" }) {
  if (mode === "gap") {
    return (
      <p className="word-picker is-gaps" role="group" aria-label={label}>
        {tokens.map((token, index) => (
          <span key={index} className="word-picker-run">
            <GapButton index={index} selected={selected} onSelect={onSelect} disabled={disabled} before={token} />
            <span className={`word-picker-text ${hinted?.has(index) ? "is-hinted" : ""}`}>{token}</span>
          </span>
        ))}
        <GapButton index={tokens.length} selected={selected} onSelect={onSelect} disabled={disabled} />
      </p>
    );
  }

  return (
    <p className="word-picker" role="group" aria-label={label}>
      {tokens.map((token, index) =>
        pickable && !pickable(index) ? (
          <span key={index} className="word-picker-text">{token}</span>
        ) : (
          <button
            key={index}
            type="button"
            className={`word-picker-word word-pick ${selected === index ? "selected" : ""} ${hinted?.has(index) ? "is-hinted" : ""}`}
            aria-pressed={selected === index}
            disabled={disabled}
            onClick={() => onSelect(index)}
          >
            {token}
          </button>
        )
      )}
    </p>
  );
}

function GapButton({ index, selected, onSelect, disabled, before }) {
  const where = before === undefined ? "at the end" : `before “${before}”`;
  return (
    <button
      type="button"
      className={`word-picker-gap word-gap ${selected === index ? "selected" : ""}`}
      aria-pressed={selected === index}
      aria-label={`The gap ${where}`}
      disabled={disabled}
      onClick={() => onSelect(index)}
    >
      <span aria-hidden="true">{selected === index ? "▼" : "·"}</span>
    </button>
  );
}

export default WordPicker;
