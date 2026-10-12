import { useState } from "react";
import StoryCard from "./StoryCard";
import SourceVisual from "./SourceVisual";
import HistoryIllustration from "./HistoryIllustration";

/**
 * DataChallenge's renderVisual for History. The story button lives here so it
 * sits inside the round, and its open/closed state is separate from the
 * answer the child has chosen.
 */
export default function HistoryVisual({ story, visual }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="history-story-toggle">
        <button type="button" className="history-story-button" aria-expanded={open} onClick={() => setOpen((was) => !was)}>
          📖 Bix's story
        </button>
        {open && <StoryCard story={story} hideImage={(visual?.type === "source" && visual.image === story.image) || (visual?.type === "scene" && visual.scene === story.scene)} />}
      </div>
      {visual?.type === "source" && <SourceVisual image={visual.image} />}
      {visual?.type === "scene" && <HistoryIllustration scene={visual.scene} />}
    </>
  );
}
