import Mascot from "../../mascot/Mascot";
import SpeakButton from "../SpeakButton";
import SourceVisual from "./SourceVisual";
import "./history.css";

/** Bix explains: the few sentences every question in this challenge is answered from. */
export default function StoryCard({ story }) {
  return (
    <section className="history-story" aria-label="Bix's story">
      <div className="history-story-head">
        <Mascot className="mascot-small" decorative />
        <p className="history-story-heading">Bix explains</p>
        <SpeakButton text={story.lines.join(" ")} compact label="Read Bix's story" />
      </div>
      {story.image
        ? <SourceVisual image={story.image} />
        : <span className="history-story-picture" role="img" aria-label={story.pictureLabel}>{story.picture}</span>}
      {story.lines.map((line) => <p key={line} className="history-story-line">{line}</p>)}
    </section>
  );
}
