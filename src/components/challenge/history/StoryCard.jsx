import Mascot from "../../mascot/Mascot";
import SpeakButton from "../SpeakButton";
import SourceVisual from "./SourceVisual";
import HistoryIllustration from "./HistoryIllustration";
import TimelineVisual from "./TimelineVisual";
import "./history.css";

/**
 * Bix explains: the few sentences every question in this challenge is answered from.
 * `hideImage` leaves out the story's photo when the round already shows it.
 */
export default function StoryCard({ story, hideImage = false, hideTimeline = false }) {
  return (
    <section className="history-story" aria-label="Bix's story">
      <div className="history-story-head">
        <Mascot className="mascot-small" decorative />
        <p className="history-story-heading">Bix explains</p>
        <SpeakButton text={story.lines.join(" ")} compact label="Read Bix's story" />
      </div>
      {story.scene && !hideImage && <HistoryIllustration scene={story.scene} />}
      {story.timeline && !hideTimeline && <TimelineVisual timeline={story.timeline} />}
      {story.image
        ? (!hideImage && <SourceVisual image={story.image} />)
        : !story.scene && <span className="history-story-picture" role="img" aria-label={story.pictureLabel}>{story.picture}</span>}
      {story.lines.map((line, i) => <p key={i} className="history-story-line">{line}</p>)}
    </section>
  );
}
