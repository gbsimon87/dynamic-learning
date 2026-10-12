import { Link } from "react-router";
import Mascot from "../mascot/Mascot";
import "./InfoPage.css";

/**
 * Shell for the grown-up reading pages (/privacy, /credits): the homepage's
 * rose-sky header with a quiet Bix, one reading sheet, and a way home.
 * Each page brings its own sections and the styles inside them.
 */
export default function InfoPage({ title, intro, className = "", children }) {
  return (
    <div className={`info-page ${className}`.trim()}>
      <header className="info-hero">
        <div className="info-hero-copy">
          <h1 className="info-title">{title}</h1>
          {intro}
        </div>
        <Mascot className="mascot-medium info-hero-bix" decorative />
      </header>

      <div className="info-sheet">{children}</div>

      <Link className="info-home" to="/">
        <span aria-hidden="true">←</span> Back to home
      </Link>
    </div>
  );
}
