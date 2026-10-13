import { useState } from "react";
import maps from "../../../assets/geography/maps.json";
import manifest from "../../../assets/geography/manifest.json";
import { GEOGRAPHY_SOURCES } from "../../../data/challenges/geography/sources";
import { project } from "../../../data/challenges/geography/geometry";
import { geographyEvidenceSpeech } from "../../../data/challenges/geography/speech";
import SpeakButton from "../SpeakButton";

const images = import.meta.glob("../../../assets/geography/images/*.webp", { eager: true, query: "?url", import: "default" });

function bundledImage(id) {
  const asset = Object.hasOwn(manifest.images, id) ? manifest.images[id] : null;
  return { asset, url: asset ? images[`../../../assets/geography/${asset.file}`] : undefined };
}

// A fresh URL bypasses a cached error response. Only bundled URLs can be retried.
const retryUrl = (url, attempt) => attempt ? `${url}${url.includes("?") ? "&" : "?"}geo_retry=${attempt}` : url;

function SourceImage({ id, alt }) {
  return <BundledImage key={id} id={id} alt={alt} />;
}

function BundledImage({ id, alt }) {
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const { asset, url } = bundledImage(id);
  return <div className="geo-source-image">
    {failed || !url ? <div role="status"><p>The picture could not load. You can use its description below.</p><p>{asset?.alt ?? alt}</p>
      {url && <button type="button" onClick={() => { setFailed(false); setAttempt((n) => n + 1); }}>Try the picture again</button>}
    </div> : <img key={attempt} src={retryUrl(url, attempt)} alt={asset.alt} onError={() => setFailed(true)} />}
    {asset && <p className="geo-credit">{asset.attribution} {asset.date}.</p>}
  </div>;
}

function path(geometry, extent, width, height) {
  const polygons = geometry.type === "Polygon" ? [geometry.coordinates] : geometry.coordinates;
  return polygons.map((polygon) => polygon.map((ring) => ring.map((p, i) => `${i ? "L" : "M"}${project(p, extent, width, height).map((n) => n.toFixed(2)).join(",")}`).join(" ") + " Z").join(" ")).join(" ");
}

function MapDrawing({ visual: v }) {
  const map = Object.hasOwn(maps, v.view) ? maps[v.view] : null;
  if (!map) return <p role="status">The map could not load. Use the description: {v.alt}</p>;
  // Keep the regional outline's proportions using a local equirectangular projection.
  const [west,south,east,north]=map.extent;
  const lonSpan=(east-west)*Math.cos((north+south)/2*Math.PI/180),latSpan=north-south;
  const scale=Math.min(480/lonSpan,320/latSpan),width=lonSpan*scale,height=latSpan*scale;
  const markers=[];
  for (const marker of v.markers) {
    const [x,y]=project(marker.point,map.extent,width,height);
    const offsets=[[0,0],[28,0],[-28,0],[0,28],[0,-28],[28,28],[-28,-28],[56,0],[-56,0]];
    const [dx,dy]=offsets.find(([dx,dy])=>markers.every(m=>Math.hypot(m.labelX-x-dx,m.labelY-y-dy)>=29))??[0,28];
    markers.push({...marker,x,y,labelX:x+dx,labelY:y+dy});
  }
  return <>
    <svg viewBox="0 0 480 320" role="img" aria-label={v.alt}>
      <defs><clipPath id={`geo-${v.view}-clip`}><rect width="480" height="320" /></clipPath></defs>
      <rect className="geo-water" width="480" height="320" />
      <g clipPath={`url(#geo-${v.view}-clip)`}>
        <g transform={`translate(${(480-width)/2},${(320-height)/2})`}>
        {map.features.map((f, i) => <path className={["Campania","Lake District National Park"].includes(f.name) ? "geo-region" : "geo-land"} key={`${f.name}-${i}`} d={path(f.geometry, map.extent, width, height)} fillRule="evenodd" />)}
        {v.equator && <line className="geo-reference" x1="0" x2={width} y1={project([0, 0], map.extent,width,height)[1]} y2={project([0, 0], map.extent,width,height)[1]} />}
        {v.boundaries?.map((points,i)=><path className="geo-plate-boundary" key={i} d={points.map((p,j)=>`${j?"L":"M"}${project(p,map.extent,width,height).join(",")}`).join(" ")} />)}
        {markers.map((m) => <g key={m.id}>
          {(m.x!==m.labelX||m.y!==m.labelY)&&<><line className="geo-outline" x1={m.x} y1={m.y} x2={m.labelX} y2={m.labelY} /><circle className="geo-marker" cx={m.x} cy={m.y} r="3" /></>}
          <circle className="geo-marker" cx={m.labelX} cy={m.labelY} r="14" /><text className="geo-marker-text" x={m.labelX} y={m.labelY+7} textAnchor="middle">{m.id}</text>
        </g>)}
        </g>
      </g>
      <g className="geo-north" transform="translate(452,30)"><path d="M0,22 L0,0 M-6,8 L0,0 L6,8" /><text x="-5" y="-9">N</text></g>
    </svg>
    <p className="geo-small">Simplified teaching map. North is up. Locations are labelled markers.</p>
    {["lake","campania"].includes(v.view) && <p className="geo-small">Dashed outline: {v.view==="lake"?"National Park":"Campania region"} boundary. Surrounding land is shown too.</p>}
    {v.boundaries && <p className="geo-small">Dashed lines: selected, simplified plate boundaries. Other boundaries are not shown.</p>}
    <ul className="geo-key" aria-label="Map key">{v.markers.map((m) => <li key={m.id}><b>{m.id}</b> {m.label}</li>)}</ul>
  </>;
}

function GlobeDrawing({ visual: v }) {
  const lines = v.referenceLines ?? [{ label: "Equator", lat: 0 }];
  return <>
    <svg viewBox="0 0 480 400" role="img" aria-label={v.alt}>
      <circle className="geo-water" cx="240" cy="200" r="175" />
      <ellipse className="geo-outline" cx="240" cy="200" rx="70" ry="175" />
      {lines.map((line, i) => { const y = 200 - line.lat / 90 * 175; const dx = Math.sqrt(175 ** 2 - (y - 200) ** 2); return <g key={line.label}>
        <line className="geo-reference" x1={240 - dx} x2={240 + dx} y1={y} y2={y} />
        <text className="geo-label" x="240" y={y - 8} textAnchor="middle">{String.fromCharCode(65 + i)}</text>
      </g>; })}
      {(v.points ?? []).map((p, i) => <g key={p.label} transform={`translate(${240 + (p.lon ?? 0)},${200 - p.lat / 90 * 175})`}><circle className="geo-marker" r="12" /><text className="geo-marker-text" textAnchor="middle" y="5">{i + 1}</text></g>)}
      <text className="geo-label" x="240" y="18" textAnchor="middle">North Pole</text>
      <text className="geo-label" x="240" y="398" textAnchor="middle">South Pole</text>
    </svg>
    <ul className="geo-key" aria-label="Globe key">{lines.map((l, i) => <li key={l.label}><b>{String.fromCharCode(65 + i)}</b> {l.label} ({Math.abs(l.lat)}° {l.lat > 0 ? "N" : l.lat < 0 ? "S" : ""})</li>)}{(v.points ?? []).map((p, i) => <li key={p.label}><b>{i + 1}</b> {p.label}</li>)}</ul>
  </>;
}

function GridDrawing({ visual: v }) {
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const { url } = bundledImage(v.image);
  const unavailable = v.image && (failed || !url);
  const [e0, n0] = v.origin;
  const cells = v.size ?? 3, span = 360 / cells;
  const px = ([e, n]) => [60 + (e - e0) * span, 390 - (n - n0) * span];
  return <>
    <svg viewBox="0 0 480 450" role="img" aria-label={v.alt}>
      {url && !failed ? <image key={attempt} onError={() => setFailed(true)} href={retryUrl(url, attempt)} x="60" y="30" width="360" height="360" /> : <rect className="geo-paper" x="60" y="30" width="360" height="360" />}
      {v.route && <>{v.route.slice(1).map((p, i) => { const a = px(v.route[i]), b = px(p); return <g key={i}><line className="geo-reference" x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} /><text className="geo-label" x={(a[0]+b[0])/2+12} y={(a[1]+b[1])/2-12}>{i+1}</text></g>; })}</>}
      {Array.from({ length: cells + 1 }, (_, i) => <g key={i}>
        <line className="geo-grid-line" x1={60 + i * span} x2={60 + i * span} y1="30" y2="390" />
        <line className="geo-grid-line" x1="60" x2="420" y1={390 - i * span} y2={390 - i * span} />
        <text className="geo-label" x={60 + i * span} y="418" textAnchor="middle">{e0 + i}</text>
        <text className="geo-label" x="43" y={396 - i * span} textAnchor="end">{n0 + i}</text>
      </g>)}
      {(v.markers ?? []).map((m) => { const [x, y] = px(m.point); return <g transform={`translate(${x},${y})`} key={m.id}><circle className="geo-marker" r="12" /><text className="geo-marker-text" y="5" textAnchor="middle">{m.id}</text></g>; })}
      <text className="geo-label" x="240" y="445" textAnchor="middle">Eastings →</text>
      <text className="geo-label" x="425" y="24">N ↑</text>
    </svg>
    <ul className="geo-key">{(v.markers ?? []).map((m) => <li key={m.id}><b>{m.id}</b> {m.label}</li>)}</ul>
    {unavailable && <div className="geo-source-image" role="status"><p>The map could not load. Use the description: {v.alt}</p>{url && <button type="button" onClick={() => { setFailed(false); setAttempt((n) => n + 1); }}>Try the map again</button>}</div>}
    {v.image && <><p className="geo-credit">Contains OS data © Crown copyright and database right 2026. NY square. Added 1 km grid.</p>
      <SourceImage id="os-water-key" /><SourceImage id="os-land-key" /></>}
  </>;
}

function CompassDrawing({ visual: v }) {
  return <svg viewBox="0 0 480 340" role="img" aria-label={v.alt}>
    {["N","NE","E","SE","S","SW","W","NW"].map((name,i) => { const angle=i*Math.PI/4; const x=240+140*Math.sin(angle), y=170-140*Math.cos(angle);return <g key={name}><line className="geo-outline" x1="240" y1="170" x2={x} y2={y} /><text className="geo-label" textAnchor="middle" x={240+160*Math.sin(angle)} y={175-160*Math.cos(angle)}>{name}</text></g>; })}
    <circle className="geo-marker" cx="240" cy="170" r="8" />
  </svg>;
}

function ClimateTable({ visual: v }) {
  return <div className="geo-climate"><table><caption>NASA POWER, 1991–2020; rounded model grid-cell means</caption><thead><tr><th>Month</th><th>Ambleside-area</th><th>Naples-area</th></tr></thead><tbody>{v.rows.map((r) => <tr key={r.month}><th scope="row">{r.month}</th><td>{r.lake.temperatureC}°C<br />{r.lake.rainfallMm} mm rain</td><td>{r.naples.temperatureC}°C<br />{r.naples.rainfallMm} mm rain</td></tr>)}</tbody></table></div>;
}

function CoordinateDrawing({ visual: v }) {
  const [lon, lat] = v.point;
  return <svg viewBox="0 0 480 390" role="img" aria-label={v.alt}>
    <rect className="geo-water" x="65" y="30" width="350" height="280" />
    {[-40, -20, 0, 20, 40].map((n) => <g key={n}>
      <line className={n ? "geo-grid-line" : "geo-reference"} x1="65" x2="415" y1={170 - n * 3.5} y2={170 - n * 3.5} />
      <line className={n ? "geo-grid-line" : "geo-reference"} x1={240 + n * 4.375} x2={240 + n * 4.375} y1="30" y2="310" />
      <text className="geo-label" x="55" y={176 - n * 3.5} textAnchor="end">{Math.abs(n)}{n > 0 ? "N" : n < 0 ? "S" : "°"}</text>
      <text className="geo-label" x={240 + n * 4.375} y="337" textAnchor="middle">{Math.abs(n)}{n > 0 ? "E" : n < 0 ? "W" : "°"}</text>
    </g>)}
    <circle className="geo-marker" cx={240 + lon * 4.375} cy={170 - lat * 3.5} r="12" /><text className="geo-marker-text" x={240 + lon * 4.375} y={175 - lat * 3.5} textAnchor="middle">P</text>
    <text className="geo-label" x="240" y="370" textAnchor="middle">Practice latitude / longitude grid</text>
  </svg>;
}

function ProcessDrawing({ visual: v }) {
  if (v.type === "mountain") return <svg viewBox="0 0 480 260" role="img" aria-label={v.alt}>
    <path className="geo-land" d="M0,235 L110,30 L220,220 Q275,140 330,190 Q370,90 480,235 Z" />
    <text className="geo-label" x="110" y="25" textAnchor="middle">Mountain</text><text className="geo-label" x="240" y="248" textAnchor="middle">Valley</text><text className="geo-label" x="380" y="118" textAnchor="middle">Hill</text>
  </svg>;
  if (v.type === "volcano") return <svg viewBox="0 0 480 300" role="img" aria-label={v.alt}>
    <path className="geo-land" d="M0,250 L210,55 L240,78 L270,55 L480,250 Z" />
    <path className="geo-magma" d="M208,265 Q210,210 233,218 L233,78 L247,78 L247,218 Q280,210 280,265 Z" />
    <path className="geo-hot-line" d="M246,78 L269,58 L341,128" />
    <text className="geo-label" x="241" y="45" textAnchor="middle">Crater</text><text className="geo-label" x="270" y="165">Vent</text><text className="geo-label" x="360" y="128">Lava</text><text className="geo-label" x="145" y="284">Magma below ground</text><text className="geo-label" x="40" y="237">Crust</text>
  </svg>;
  if (v.type === "fault") return <svg viewBox="0 0 480 250" role="img" aria-label={v.alt}>
    <path className="geo-land" d="M20,90 L220,90 L190,225 L20,225 Z M235,75 L460,75 L460,225 L205,225 Z" />
    <path className="geo-reference" d="M227,75 L197,225" /><path className="geo-outline" d="M125,125 L115,175 L109,163 M345,175 L355,125 L360,137" />
    <text className="geo-label" x="120" y="65" textAnchor="middle">Crust / plate</text><text className="geo-label" x="340" y="50" textAnchor="middle">Crust / plate</text><text className="geo-label" x="227" y="245" textAnchor="middle">Fault</text>
  </svg>;
  return <><ol className="geo-flow" aria-label="Diagram steps">{(v.steps ?? []).map((step, i) => <li key={i}><b>{i + 1}</b><span>{step}</span>{i < v.steps.length - 1 && <span aria-hidden="true">↓</span>}</li>)}</ol>{v.cycle && <p>↻ Water keeps moving. This is one route through a repeating cycle.</p>}</>;
}

/** Every drawing has the same visible text equivalent for narration and screen readers. */
export default function GeographyVisual({ visual: v, sources = [] }) {
  return <figure className="geo-visual">
    <div className="geo-visual-heading"><h4>{v.title}</h4><SpeakButton text={geographyEvidenceSpeech(v)} label="Read the evidence" compact /></div>
    {v.type === "map" && <MapDrawing visual={v} />}
    {v.maps && <div className="geo-paired-maps">{v.maps.map((m) => <section key={m.view}><h5>{m.title}</h5><MapDrawing visual={m} /></section>)}</div>}
    {v.type === "globe" && <GlobeDrawing visual={v} />}
    {["grid", "plan"].includes(v.type) && <GridDrawing key={v.image ?? "plain-grid"} visual={v} />}
    {v.type === "compass" && <CompassDrawing visual={v} />}
    {v.type === "climate" && <ClimateTable visual={v} />}
    {v.type === "coordinates" && <CoordinateDrawing visual={v} />}
    {["flow", "mountain", "volcano", "fault"].includes(v.type) && <ProcessDrawing visual={v} />}
    {v.type === "photo" && <SourceImage id={v.image} alt={v.alt} />}
    <figcaption>
      {v.lines.map((line, i) => <p className="geo-evidence-line" key={i}>{line}</p>)}
      <details className="geo-description"><summary>Map or picture description</summary><p>{v.alt}</p></details>
      {sources.length > 0 && <details className="geo-sources"><summary>Sources</summary><ul>{sources.map((id) => { const s = Object.hasOwn(GEOGRAPHY_SOURCES, id) ? GEOGRAPHY_SOURCES[id] : null; return <li key={id}>{s ? (s.url?.startsWith("https://") ? <a href={s.url}>{s.title}</a> : s.title) : "Source unavailable"}</li>; })}</ul></details>}
    </figcaption>
  </figure>;
}
