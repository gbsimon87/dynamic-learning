import Mascot from "../../mascot/Mascot";
import SpeakButton from "../SpeakButton";
import GeographyVisual from "./GeographyVisual";

export default function FieldNotesCard({ notes, showVisual = true }) {
  return <section className="geo-notes" aria-label="Bix's field notes">
    <div className="geo-notes-heading"><Mascot className="mascot-small" decorative /><h4>Bix's field notes</h4><SpeakButton text={notes.lines.join(" ")} label="Read Bix's field notes" compact /></div>
    {notes.lines.map((line, i) => <p key={i}>{line}</p>)}
    {showVisual && <GeographyVisual visual={notes.visual} />}
  </section>;
}
