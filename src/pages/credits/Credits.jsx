import { NOTICES } from "../../data/thirdPartyNotices";
import InfoPage from "../../components/ui/InfoPage";
import "./Credits.css";

/** Third-party notices: who made the borrowed Science pictures, and their licences. */
export default function Credits() {
  return (
    <InfoPage
      title="Picture credits and licences"
      intro={
        <p className="info-intro">
          Some Science pictures were made by other people, who shared them under these licences. Thank you!
        </p>
      }
    >
      <ul className="credits-list">
        {NOTICES.map((notice) => (
          <li key={notice.id} id={notice.id} className="info-section credits-item">
            <h2>{notice.name}</h2>
            <p>{notice.attribution}</p>
            {notice.adapted && (
              <p className="credits-adapted"><strong>Adapted:</strong> {notice.adapted}</p>
            )}
            <p className="credits-links">
              <span className="credits-links-label">Licence</span>
              <a className="credits-chip" href={notice.licenseUrl}>{notice.licenseName}</a>
              <a className="credits-source" href={notice.repo}>Source</a>
            </p>
            {notice.noticeText && (
              <details className="credits-text">
                <summary>NOTICE</summary>
                <pre>{notice.noticeText}</pre>
              </details>
            )}
            {notice.licenseText && (
              <details className="credits-text">
                <summary>Full licence text</summary>
                <pre>{notice.licenseText}</pre>
              </details>
            )}
          </li>
        ))}
      </ul>
    </InfoPage>
  );
}
