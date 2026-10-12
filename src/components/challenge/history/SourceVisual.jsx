import { useState } from "react";
import { Link } from "react-router";
import { historyImage } from "./historyImages";
import "./history.css";

/** A real historical source: the photo, then who made and kept it. */
export default function SourceVisual({ image }) {
  const picture = historyImage(image);
  if (!picture) {
    return <p className="history-source-missing" role="note">Sorry, this picture could not load. Ask a grown-up for help.</p>;
  }
  // A different source starts with its own load state; reopening a story or
  // switching questions must not carry a failed picture into the next source.
  return <SourcePicture key={picture.src} picture={picture} />;
}

function SourcePicture({ picture }) {
  const [failed, setFailed] = useState(false);
  return (
    <figure className="history-source">
      {failed ? <div className="history-source-missing" role="note">
        <p>This picture could not load. You can try again.</p>
        <p>{picture.alt}</p>
        <button type="button" className="history-story-button" onClick={() => setFailed(false)}>Try loading the picture again</button>
      </div> : <img className="history-source-img" src={picture.src} alt={picture.alt} onError={() => setFailed(true)} />}
      {/* Credits are for grown-ups; "Read it to me" skips them. */}
      <figcaption className="history-source-credit" data-read-aloud="skip">
        {picture.credit} · <Link to="/credits">All credits</Link>
      </figcaption>
    </figure>
  );
}
