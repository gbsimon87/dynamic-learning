import Mascot from "../../mascot/Mascot";

/** A new level, with Bix cheering it in. */
export default function LevelUpStep({ step, headingRef, focalRef }) {
  return (
    <>
      <p className="completion-celebration-eyebrow">You levelled up</p>
      <h2 ref={headingRef} tabIndex={-1}>Level {step.level}!</h2>
      <div className="celebration-levelup" ref={focalRef}>
        <Mascot className="mascot-medium" cheerOn={step.level} decorative />
        <span className="celebration-level-badge" aria-hidden="true">{step.level}</span>
      </div>
      <p className="completion-celebration-message">Every challenge makes you stronger. Keep going!</p>
    </>
  );
}
