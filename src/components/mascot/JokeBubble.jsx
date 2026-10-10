/**
 * Bix's speech bubble: the setup, then — when the child asks — the punchline.
 *
 * One action button that keeps its place: "Tell me!" reveals the punchline and
 * then becomes "Tell me another", so keyboard focus never falls off a button
 * that vanished. The screen-reader announcement lives in the caller's
 * persistent live region (a region mounted with its text already in it is not
 * reliably read), so this is just the visible half. Escape is handled by the
 * caller, so it works wherever focus is.
 */
export default function JokeBubble({ joke, revealed, onReveal, onAnother, onClose, actionRef }) {
  return (
    <section className="mascot-joke-bubble" aria-label="Bix's joke">
      <p className="mascot-joke-setup">{joke.setup}</p>
      {revealed && (
        <p className="mascot-joke-punchline">
          {joke.punchline} <span aria-hidden="true">😄</span>
        </p>
      )}

      <div className="mascot-joke-actions">
        <button
          type="button"
          ref={actionRef}
          className="mascot-joke-action"
          onClick={revealed ? onAnother : onReveal}
        >
          {revealed ? "Tell me another" : "Tell me!"}
        </button>
        <button
          type="button"
          className="mascot-joke-close"
          onClick={onClose}
          aria-label="Close Bix's joke"
        >
          <span aria-hidden="true">✕</span>
        </button>
      </div>
    </section>
  );
}
