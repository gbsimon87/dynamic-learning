import "./english-kit.css";

/**
 * The hint a challenge shows after two misses on one question (hints.js).
 * Children pass the words; this keeps every hint looking the same.
 */
function HintNote({ children }) {
  return (
    <p className="challenge-hint" role="note">
      <span aria-hidden="true">💡 </span>
      {children}
    </p>
  );
}

export default HintNote;
