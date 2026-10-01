import SpeakButton from "./SpeakButton";
import "./english-kit.css";

/**
 * A short text to read: a story extract, a letter, a diary entry, a set of
 * instructions, a poem.
 *
 * `passage`  { title?, kind?, blocks } where each block is
 *            { type: "p" | "h" | "line" | "item", text }.
 *            "h" is a heading or sub-heading, "line" a line of poetry (kept
 *            on its own line), "item" a numbered step. A "p" may carry a
 *            `label` ("Paragraph 1") shown above it, for questions that
 *            name paragraphs.
 * `speak`    shows a 🔊 "Read it to me" button. It is never automatic: the
 *            reading is the skill, and listening is the child's choice.
 * `highlight` optional Set of block indices to mark, for a hint.
 *
 * Laid out for reading rather than for buttons: left-aligned, a comfortable
 * measure and line height, so a 200-word passage stays readable on a phone.
 */
function ReadingPassage({ passage, speak = true, highlight }) {
  const spoken = [passage.title, ...passage.blocks.map((block) => block.text)]
    .filter(Boolean)
    .join(". ");
  let step = 0;

  return (
    <article className={`reading-passage is-${passage.kind ?? "story"}`}>
      {(passage.title || speak) && (
        <header className="reading-passage-head">
          {passage.title && <h4 className="reading-passage-title">{passage.title}</h4>}
          {speak && <SpeakButton text={spoken} label="Read it to me" />}
        </header>
      )}
      <div className="reading-passage-body">
        {passage.blocks.map((block, index) => {
          const marked = highlight?.has(index) ? "is-highlighted" : "";
          if (block.type === "h") {
            return <h5 key={index} className={`reading-passage-heading ${marked}`}>{block.text}</h5>;
          }
          if (block.type === "line") {
            return <p key={index} className={`reading-passage-line ${marked}`}>{block.text}</p>;
          }
          if (block.type === "item") {
            step += 1;
            return (
              <p key={index} className={`reading-passage-item ${marked}`}>
                <span className="reading-passage-step">{step}.</span> {block.text}
              </p>
            );
          }
          return (
            <p key={index} className={`reading-passage-p ${marked}`}>
              {block.label && <span className="reading-passage-label">{block.label}</span>}
              {block.text}
            </p>
          );
        })}
      </div>
    </article>
  );
}

export default ReadingPassage;
