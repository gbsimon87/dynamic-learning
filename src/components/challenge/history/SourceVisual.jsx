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
      <figcaption className="history-source-credit">
        {picture.credit} · <Link to="/credits">All credits</Link>
      </figcaption>
    </figure>
  );
}
