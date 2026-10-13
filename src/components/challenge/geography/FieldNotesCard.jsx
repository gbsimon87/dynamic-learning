import Mascot from "../../mascot/Mascot";
import SpeakButton from "../SpeakButton";
import GeographyVisual from "./GeographyVisual";

/** Bix "says" the notes in a speech bubble; the picture sits underneath as the thing to look at. */
export default function FieldNotesCard({ notes, showVisual = true }) {
  return <section className="geo-notes" aria-label="Bix's field notes">
    <div className="geo-notes-talk">
      <Mascot className="geo-notes-bix" decorative />
      <div className="geo-notes-bubble">
        <div className="geo-notes-heading"><h4>Bix's field notes</h4><SpeakButton text={notes.lines.join(" ")} label="Read Bix's field notes" compact /></div>
        <ol className="geo-notes-lines">{notes.lines.map((line, i) => <li key={i}>{line}</li>)}</ol>
      </div>
    </div>
    {showVisual && <GeographyVisual visual={notes.visual} />}
  </section>;
}
