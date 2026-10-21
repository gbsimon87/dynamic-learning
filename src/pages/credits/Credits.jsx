import { NOTICES } from "../../data/thirdPartyNotices";
import historyManifest from "../../assets/history/manifest.json";
import geographyManifest from "../../assets/geography/manifest.json";
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
          Some Science, History and Geography pictures and maps were shared by other people under these licences. Thank you!
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
      <h2 className="credits-heading">Geography maps and pictures</h2>
      <ul className="credits-list">
        <li className="info-section credits-item"><h3>Natural Earth teaching maps</h3><p>Public-domain Natural Earth v5.1.2. Country boundaries simplified; Campania provinces combined.</p><p><a href={geographyManifest.maps.sourceUrl}>Source data</a> · <a href="https://www.naturalearthdata.com/about/terms-of-use/">Public-domain terms</a></p></li>
        <li className="info-section credits-item"><h3>Lake District National Park boundary</h3><p>ONS boundary supplied by Planning Data. Contains OS data © Crown copyright and database right 2026.</p><p><a href="https://www.planning.data.gov.uk/entity/520011">Source</a> · <a href="https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/">OGL v3</a></p></li>
        <li className="info-section credits-item"><h3>Climate records, 1991–2020</h3><p>NASA POWER MERRA-2 monthly records for model cells near Ambleside and Naples. Rounded summaries are location examples, not whole-region averages.</p><p><a href="https://power.larc.nasa.gov/docs/services/api/temporal/monthly/">NASA POWER data documentation</a></p></li>
        <li className="info-section credits-item"><h3>Climate records, 2001–2025</h3><p>NASA POWER climatology (MERRA-2) for model cells near eleven example places. Rounded summaries are location examples, not whole-region averages.</p><p><a href="https://power.larc.nasa.gov/docs/services/api/temporal/climatology/">NASA POWER climatology documentation</a></p></li>
        <li className="info-section credits-item"><h3>Year 1 Geography maps and pictures</h3><p>UK countries, continents and globe views from public-domain Natural Earth v5.1.2 (map units and countries), simplified for teaching. Year 1 picture drawings are original to Learn with Bix.</p><p><a href="https://www.naturalearthdata.com/downloads/50m-cultural-vectors/50m-admin-0-details/">Source data</a></p></li>
        <li id="solar-system-scope" className="info-section credits-item"><h3>Solar System pictures</h3><p>Sun, Mercury, Venus, Earth, Moon, Mars and Uranus surface maps, Earth clouds and night lights, Saturn ring map and the Milky Way sky by Solar System Scope (INOVE). The Milky Way sky is also used at a smaller size.</p><p><a href="https://www.solarsystemscope.com/textures/">Source</a> · <a href={LICENCES["CC-BY-4.0"].url}>{LICENCES["CC-BY-4.0"].name}</a></p></li>
        <li className="info-section credits-item"><h3>Year 4 river lines</h3><p>Selected rivers from public-domain Natural Earth v5.1.2 (rivers and lake centerlines), simplified for teaching.</p><p><a href="https://www.naturalearthdata.com/downloads/10m-physical-vectors/10m-rivers-lake-centerlines/">Source data</a></p></li>
        {Object.entries(geographyManifest.images).map(([id, asset]) => <li key={id} id={`geography-${id}`} className="info-section credits-item"><h3>{asset.title}</h3><p>{asset.attribution} {asset.place}, {asset.date}.</p><p>{asset.adapted}</p><p><a href={asset.sourceUrl}>Source</a> · <a href={asset.licenceUrl}>{asset.licence}</a></p></li>)}
      </ul>
    </InfoPage>
  );
}
