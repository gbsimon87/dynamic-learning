/**
 * A badge reveal: a mystery disc flips over to show the badge.
 *
 * The badge's name and blurb are in the DOM from the first frame — the flip
 * only changes what is drawn — so a screen reader never waits on an animation.
 */
export default function BadgeStep({ step, headingRef, focalRef }) {
  const { badge } = step;

  return (
    <>
      <p className="completion-celebration-eyebrow">You earned a badge</p>
      <h2 ref={headingRef} tabIndex={-1}>New badge!</h2>

      <div className="celebration-badge" ref={focalRef} aria-hidden="true">
        <div className="celebration-badge-card">
          <span className="celebration-badge-face celebration-badge-front">?</span>
          <span className="celebration-badge-face celebration-badge-back">{badge.icon}</span>
        </div>
      </div>

      <p className="celebration-reward-name">{badge.name}</p>
      <p className="completion-celebration-message">{badge.blurb}</p>
    </>
  );
}
