import { NOTICES } from "../../data/thirdPartyNotices";
import historyManifest from "../../assets/history/manifest.json";
import { LICENCES } from "../../data/licences";
import InfoPage from "../../components/ui/InfoPage";
import "./Credits.css";

/** Third-party notices: who made the borrowed Science pictures and kept the History ones, and their licences. */
export default function Credits() {
  return (
    <InfoPage
      title="Picture credits and licences"
      intro={
        <p className="info-intro">
          Some Science and History pictures were made or kept by other people, who shared them under these licences. Thank you!
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
      <h2 className="credits-heading">History pictures</h2>
      <ul className="credits-list">
        {Object.entries(historyManifest.images).map(([id, image]) => (
          <li key={id} id={`history-${id}`} className="info-section credits-item">
            <h3>{image.title}</h3>
            <p>{[image.creator, image.date, image.institution].filter(Boolean).join(", ")}</p>
            <p className="credits-links">
              <span className="credits-links-label">Licence</span>
              <a className="credits-chip" href={LICENCES[image.licence].url}>{LICENCES[image.licence].name}</a>
              <a className="credits-source" href={image.objectUrl}>Source</a>
            </p>
          </li>
        ))}
      </ul>
    </InfoPage>
  );
}
