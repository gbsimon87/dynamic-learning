import { Link } from "react-router";
import { NOTICES } from "../../data/thirdPartyNotices";
import "./Credits.css";

/** Third-party notices: who made the borrowed Science pictures, and their licences. */
export default function Credits() {
  return (
    <div className="credits-page">
      <h1 className="credits-title">Picture credits and licences</h1>
      <p className="credits-intro">
        Some Science pictures were made by other people, who shared them under these licences. Thank you!
      </p>
      <ul className="credits-list">
        {NOTICES.map((notice) => (
          <li key={notice.id} id={notice.id} className="credits-card">
            <h2>{notice.name}</h2>
            <p>{notice.attribution}</p>
            {notice.adapted && <p><strong>Adapted:</strong> {notice.adapted}</p>}
            <p>
              Licence: <a className="credits-link" href={notice.licenseUrl}>{notice.licenseName}</a>
              {" · "}
              <a className="credits-link" href={notice.repo}>Source</a>
            </p>
            {notice.noticeText && (
              <details>
                <summary>NOTICE</summary>
                <pre>{notice.noticeText}</pre>
              </details>
            )}
            {notice.licenseText && (
              <details>
                <summary>Full licence text</summary>
                <pre>{notice.licenseText}</pre>
              </details>
            )}
          </li>
        ))}
      </ul>
      <Link className="credits-link credits-home" to="/">Back to home</Link>
    </div>
  );
}
