import "./history.css";

function MapPanel({ modern }) {
  const label = modern ? "New map" : "Old map";
  return <svg className="history-practice-map" viewBox="0 0 260 200" role="img" aria-label={`${label}: ${modern ? "shop" : "house"} and church on the same street`}>
    <rect x="2" y="2" width="256" height="196" rx="12" fill="var(--ck-panel)" stroke="var(--ck-border)" strokeWidth="3" />
    <text x="130" y="28" textAnchor="middle" fill="var(--ck-text)" fontSize="18">{label}</text>
    <path d="M15 142H245" stroke="var(--ck-muted)" strokeWidth="26" />
    <text x="130" y="148" textAnchor="middle" fill="var(--ck-text)" fontSize="14">Same street</text>
    <path d="M30 115V75L67 50L105 75V115Z" fill="var(--ck-muted)" stroke="var(--ck-text)" strokeWidth="2" />
    <text x="68" y="100" textAnchor="middle" fill="var(--ck-text)" fontSize="16">{modern ? "Shop" : "House"}</text>
    <path d="M159 115V75H179V52H199V75H224V115Z" fill="var(--ck-muted)" stroke="var(--ck-text)" strokeWidth="2" />
    <text x="191" y="101" textAnchor="middle" fill="var(--ck-text)" fontSize="14">Church</text>
  </svg>;
}

/** Original practice sources, explicitly labelled so they cannot be mistaken
 * for a photo of a real artefact or a map of the child's locality. */
export default function HistoryIllustration({ scene }) {
  if (scene === "maps") return <figure className="history-illustration">
    <div className="history-map-pair"><MapPanel /><MapPanel modern /></div>
    <figcaption>Practice maps of a made-up street. Drawn for Learn with Bix.</figcaption>
  </figure>;
  if (scene === "plaque") return <figure className="history-illustration">
    <svg viewBox="0 0 320 240" role="img" aria-label="Practice plaque: Florence Nightingale, nurse, lived here">
      <circle cx="160" cy="120" r="112" fill="var(--ck-muted)" stroke="var(--ck-text)" strokeWidth="3" />
      <g fill="var(--ck-text)" textAnchor="middle" fontSize="20">
        <text x="160" y="83">Florence</text><text x="160" y="110">Nightingale</text>
        <text x="160" y="145">Nurse</text><text x="160" y="178">Lived here</text>
      </g>
    </svg>
    <figcaption>Practice plaque. Our drawing, not a photo of a real plaque.</figcaption>
  </figure>;
  if (scene === "sharing") return <figure className="history-illustration">
    <svg viewBox="0 0 420 190" role="img" aria-label="Illustration: a paper book and linked web pages on a computer">
      <g fill="var(--ck-panel)" stroke="var(--ck-text)" strokeWidth="3">
        <path d="M20 30Q65 12 105 30Q150 12 190 30V142Q150 124 105 142Q65 124 20 142Z" />
        <path d="M105 30V142M35 54H84M35 76H84M125 54H170M125 76H170" />
        <rect x="234" y="26" width="166" height="115" rx="8" />
        <path d="M315 141V164M276 164H355M253 49H372M253 73H337M253 95H356" />
      </g>
      <g fill="var(--ck-text)" textAnchor="middle" fontSize="17"><text x="105" y="180">Paper book</text><text x="316" y="185">Linked web pages</text></g>
    </svg>
    <figcaption>Our illustration of two ways to share words.</figcaption>
  </figure>;
  return null;
}
