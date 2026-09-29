/** A topic's sticker drops onto the page, as if stuck into a book. */
export default function StickerStep({ step, headingRef, focalRef }) {
  const { sticker } = step;

  return (
    <>
      <p className="completion-celebration-eyebrow">For your sticker book</p>
      <h2 ref={headingRef} tabIndex={-1}>New sticker!</h2>

      <div className="celebration-sticker" ref={focalRef}>
        <span className="celebration-sticker-icon" aria-hidden="true">{sticker.icon}</span>
      </div>

      <p className="celebration-reward-name">{sticker.name}</p>
      <p className="completion-celebration-message">
        You earned it by finishing every challenge in this topic.
      </p>
    </>
  );
}
