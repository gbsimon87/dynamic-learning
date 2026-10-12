import { Link } from "react-router";
import { historyImage } from "./historyImages";
import "./history.css";

/** A real historical source: the photo, then who made and kept it. */
export default function SourceVisual({ image }) {
  const picture = historyImage(image);
  if (!picture) {
    return <p className="history-source-missing" role="note">Sorry, this picture could not load. Ask a grown-up for help.</p>;
  }
  return (
    <figure className="history-source">
      <img className="history-source-img" src={picture.src} alt={picture.alt} />
      {/* Credits are for grown-ups; "Read it to me" skips them. */}
      <figcaption className="history-source-credit" data-read-aloud="skip">
        {picture.credit} · <Link to="/credits">All credits</Link>
      </figcaption>
    </figure>
  );
}
