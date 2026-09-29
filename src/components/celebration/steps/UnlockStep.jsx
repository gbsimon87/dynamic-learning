/** A badge that opens up a new profile picture says so on its own beat. */
export default function UnlockStep({ step, headingRef, focalRef }) {
  return (
    <>
      <p className="completion-celebration-eyebrow">A reward from {step.badge.name}</p>
      <h2 ref={headingRef} tabIndex={-1}>New picture unlocked!</h2>

      <div className="celebration-avatar" ref={focalRef} aria-hidden="true">
        {step.avatar}
      </div>

      <p className="completion-celebration-message">
        You can now choose it as your profile picture.
      </p>
    </>
  );
}
