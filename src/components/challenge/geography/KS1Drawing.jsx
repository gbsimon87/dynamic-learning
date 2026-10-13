import "./ks1.css";
import { ks1SymbolName } from "../../../data/challenges/geography/year2/symbolNames";

function Symbol({ name }) {
  if (name === "house") return <><rect className="geo-land ks1-wall" x="-19" y="-12" width="38" height="32" /><path className="geo-outline ks1-roof" d="M-24,-12 L0,-32 L24,-12" /></>;
  if (name === "shop") return <path className="geo-land ks1-shop" d="M0,-25 L25,0 L0,25 L-25,0 Z" />;
  if (name === "tree") return <><circle className="geo-land ks1-tree" cy="-9" r="21" /><path className="geo-outline ks1-trunk" d="M0,11 L0,29" /></>;
  if (name === "gate") return <path className="geo-outline ks1-gate" d="M-18,20 L-18,-20 M18,20 L18,-20 M-18,-8 L18,-8 M-18,8 L18,8" />;
  if (name === "jetty") return <><rect className="geo-land ks1-wood" x="-25" y="-8" width="50" height="16" /><path className="geo-outline ks1-gate" d="M-18,8 L-18,28 M0,8 L0,28 M18,8 L18,28" /></>;
  if (name === "water") return <path className="geo-river ks1-water" d="M-24,-10 Q-12,-22 0,-10 T24,-10 M-24,10 Q-12,-2 0,10 T24,10" />;
  return <path className="geo-reference" d="M-25,0 L25,0" />;
}

/** Four directions and large labelled landmarks; no KS2 grid-reference overlay. */
export default function KS1Drawing({ visual: v }) {
  const cx = x => 65 + x * 87.5, cy = y => 55 + y * 70;
  const directions = v.north === "right" ? [["North", 410, 175], ["East", 240, 310], ["South", 65, 175], ["West", 240, 45]] : [["North", 240, 45], ["East", 410, 175], ["South", 240, 310], ["West", 65, 175]];
  return <>
    <svg viewBox="0 0 480 380" role="img" aria-label={v.alt}>
      <rect className={`geo-paper ${v.variant === "compass" ? "ks1-compass-ground" : "ks1-ground"}`} width="480" height="380" />
      {v.variant === "compass" ? <>{directions.map(([name, x, y]) => <g key={name}><line className="geo-outline" x1="240" y1="175" x2={x} y2={y} /><text className="geo-label geo-halo" x={x} y={y + 6} textAnchor="middle">{name}</text></g>)}<circle className="geo-marker" cx="240" cy="175" r="9" /></> : <>
        {v.water === "whitby" && <><rect className="geo-water" x="0" y="0" width="480" height="65" /><path className="geo-water" d="M195,65 L280,65 L275,380 L220,380 Z" /><text className="geo-label geo-small-label" x="18" y="30">North Sea</text></>}
        {v.water === "peramu" && <rect className="geo-water" x="0" y="120" width="480" height="260" />}
        {(v.paths ?? []).map(([x1, y1, x2, y2], i) => <line key={i} className="geo-reference ks1-route" x1={cx(x1)} y1={cy(y1)} x2={cx(x2)} y2={cy(y2)} />)}
        {v.features.map(f => <g key={f.code} transform={`translate(${cx(f.x)},${cy(f.y)})`}><Symbol name={f.symbol} /><text className="geo-label geo-halo" textAnchor="middle" y="53">{f.code}</text></g>)}
        {v.orientationKnown !== false && <g className="geo-north" transform="translate(445,22)"><path d={v.north === "right" ? "M-22,0 L0,0 M-8,-6 L0,0 L-8,6" : "M0,22 L0,0 M-6,8 L0,0 L6,8"} /><text x="-10" y={v.north === "right" ? 25 : -7}>N</text></g>}
      </>}
    </svg>
    {v.features.length > 0 && <ul className="geo-key" aria-label="Map key">{v.features.map(f => <li key={f.code}><span className="geo-ks1-key-symbol" aria-hidden="true"><svg viewBox="-35 -35 70 70"><Symbol name={f.symbol} /></svg></span><b>{f.code}</b> {f.label} ({ks1SymbolName(f.symbol)})</li>)}</ul>}
    <p className="geo-small">{v.variant === "compass" ? `North points ${v.north}. Read the labelled directions.` : `Simplified teaching ${v.orientationKnown === false ? "arrangement sketch" : "plan"}. ${v.orientationKnown === false ? "No compass orientation is assigned." : `North points ${v.north}.`} ${v.extent ?? "Example area; not to scale."}`}</p>
  </>;
}
