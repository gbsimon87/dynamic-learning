import "./challenge-kit.css";

/**
 * A bar split into equal parts, some of them shaded.
 *
 * The programme of study asks for fractions "of a length, shape, set of
 * objects or quantity", and a bar is the one picture that covers length and
 * shape at once. Parts are equal by construction — flex: 1 each — because a
 * fraction of unequal parts is not a fraction at all.
 */
function FractionBar({ parts, label }) {
  return (
    <div className="fraction-bar" role="img" aria-label={label}>
      {parts.map((shaded, i) => (
        <span
          key={i}
          className={`fraction-part ${shaded ? "shaded" : ""}`}
        />
      ))}
    </div>
  );
}

export default FractionBar;
