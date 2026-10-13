import { useState } from "react";
import maps from "../../../assets/geography/maps.json";
import manifest from "../../../assets/geography/manifest.json";
import { ALL_GEOGRAPHY_SOURCES } from "../../../data/challenges/geography/allSources";
import { project } from "../../../data/challenges/geography/geometry";
import { geographyEvidenceSpeech, geographyVisualDescription } from "../../../data/challenges/geography/speech";
import SpeakButton from "../SpeakButton";
import KS1Drawing from "./KS1Drawing";
import Year1Drawing from "./Year1Drawing";
import { Sprite } from "./Year1Sprites";
import "./year1.css";
import "./bright.css";

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
        {map.features.map((f, i) => <path className={f.region || ["Campania","Lake District National Park"].includes(f.name) ? "geo-region" : "geo-land"} key={`${f.name}-${i}`} d={path(f.geometry, map.extent, width, height)} fillRule="evenodd" />)}
        {v.rivers && (map.lines ?? []).filter((l) => v.rivers.includes(l.name)).map((l, i) => <path className="geo-river" key={`${l.name}-${i}`} d={l.coords.map((p, j) => `${j ? "L" : "M"}${project(p, map.extent, width, height).map((n) => n.toFixed(2)).join(",")}`).join(" ")} />)}
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
    {v.rivers && <p className="geo-small">Blue wavy lines: selected rivers. Other rivers are not shown.</p>}
    {v.view==="washington" && <p className="geo-small">Dashed outline: Washington State. Neighbouring states and British Columbia are shown too.</p>}
    {["lake","campania"].includes(v.view) && <p className="geo-small">Dashed outline: {v.view==="lake"?"National Park":"Campania region"} boundary. Surrounding land is shown too.</p>}
    {v.boundaries && <p className="geo-small">Dashed lines: selected, simplified plate boundaries. Other boundaries are not shown.</p>}
    <ul className="geo-key" aria-label="Map key">{v.markers.map((m) => <li key={m.id}><b>{m.id}</b> {m.label}</li>)}</ul>
  </>;
}

function GlobeDrawing({ visual: v }) {
  const lines = v.referenceLines ?? [{ label: "Equator", lat: 0 }];
  return <>
    <svg viewBox="0 0 480 400" role="img" aria-label={v.alt}>
      <circle className="geo-water geo-globe" cx="240" cy="200" r="175" />
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
  const total = v.size ?? 3, win = v.window ?? { origin: v.origin, size: total };
  const cells = win.size, span = 360 / cells, [we, wn] = win.origin;
  const px = ([e, n]) => [60 + (e - we) * span, 390 - (n - wn) * span];
  const full = total * span, ix = 60 + (e0 - we) * span, iy = 390 - (n0 + total - wn) * span;
  return <>
    <svg viewBox="0 0 480 450" role="img" aria-label={geographyVisualDescription(v)}>
      <clipPath id="geo-grid-window"><rect x="60" y="30" width="360" height="360" /></clipPath>
      {url && !failed ? <image clipPath="url(#geo-grid-window)" key={attempt} onError={() => setFailed(true)} href={retryUrl(url, attempt)} x={ix} y={iy} width={full} height={full} /> : <rect className="geo-paper" x="60" y="30" width="360" height="360" />}
      {v.route && <>{v.route.slice(1).map((p, i) => { const a = px(v.route[i]), b = px(p); return <g key={i}><line className="geo-reference" x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} /><text className="geo-label" x={(a[0]+b[0])/2+12} y={(a[1]+b[1])/2-12}>{i+1}</text></g>; })}</>}
      {Array.from({ length: cells + 1 }, (_, i) => <g key={i}>
        <line className="geo-grid-line" x1={60 + i * span} x2={60 + i * span} y1="30" y2="390" />
        <line className="geo-grid-line" x1="60" x2="420" y1={390 - i * span} y2={390 - i * span} />
        <text className="geo-label" x={60 + i * span} y="418" textAnchor="middle">{we + i}</text>
        <text className="geo-label" x="43" y={396 - i * span} textAnchor="end">{wn + i}</text>
      </g>)}
      {v.tenths && Array.from({ length: cells * 10 + 1 }, (_, i) => i).filter((i) => i % 10).map((i) => <g key={`t${i}`}>
        <line className="geo-tenth-line" x1={60 + i * span / 10} x2={60 + i * span / 10} y1="30" y2="390" />
        <line className="geo-tenth-line" x1="60" x2="420" y1={390 - i * span / 10} y2={390 - i * span / 10} />
      </g>)}
      {v.tenths && Array.from({ length: 9 }, (_, i) => i + 1).map((t) => <g key={`n${t}`}>
        <text className="geo-tenth-label" x={60 + t * span / 10} y="404" textAnchor="middle">{t}</text>
        <text className="geo-tenth-label" x="68" y={393 - t * span / 10} textAnchor="start">{t}</text>
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
    <circle className="geo-rose-back" cx="240" cy="170" r="125" />
    {["N","NE","E","SE","S","SW","W","NW"].map((name,i) => { const angle=i*Math.PI/4; const x=240+140*Math.sin(angle), y=170-140*Math.cos(angle);return <g key={name}><line className={`geo-outline${name === "N" ? " geo-rose-north" : ""}`} x1="240" y1="170" x2={x} y2={y} /><text className="geo-label" textAnchor="middle" x={240+160*Math.sin(angle)} y={175-160*Math.cos(angle)}>{name}</text></g>; })}
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
    <rect className="geo-sky" width="480" height="260" /><Sun x={420} y={42} />
    <path className="geo-land" d="M0,235 L110,30 L220,220 Q275,140 330,190 Q370,90 480,235 Z" />
    <path className="geo-snowcap" d="M110,30 L136,78 L122,70 L110,82 L97,70 L84,78 Z" />
    <rect className="geo-ground" y="235" width="480" height="25" />
    <text className="geo-label" x="110" y="25" textAnchor="middle">Mountain</text><text className="geo-label" x="240" y="248" textAnchor="middle">Valley</text><text className="geo-label" x="380" y="118" textAnchor="middle">Hill</text>
  </svg>;
  if (v.type === "volcano") return <svg viewBox="0 0 480 300" role="img" aria-label={v.alt}>
    <rect className="geo-sky" width="480" height="300" />
    <g className="geo-smoke"><circle cx="232" cy="34" r="14" /><circle cx="252" cy="22" r="11" /><circle cx="270" cy="30" r="9" /></g>
    <rect className="geo-ground" y="250" width="480" height="50" />
    <path className="geo-land geo-rock-land" d="M0,250 L210,55 L240,78 L270,55 L480,250 Z" />
    <path className="geo-magma" d="M208,265 Q210,210 233,218 L233,78 L247,78 L247,218 Q280,210 280,265 Z" />
    <path className="geo-hot-line" d="M246,78 L269,58 L341,128" />
    <text className="geo-label" x="241" y="45" textAnchor="middle">Crater</text><text className="geo-label" x="270" y="165">Vent</text><text className="geo-label" x="360" y="128">Lava</text><text className="geo-label" x="145" y="284">Magma below ground</text><text className="geo-label" x="40" y="237">Crust</text>
  </svg>;
  if (v.type === "fault") return <svg viewBox="0 0 480 250" role="img" aria-label={v.alt}>
    <rect className="geo-sky" width="480" height="250" />
    <path className="geo-land" d="M20,90 L220,90 L190,225 L20,225 Z M235,75 L460,75 L460,225 L205,225 Z" />
    <path className="geo-reference" d="M227,75 L197,225" /><path className="geo-outline" d="M125,125 L115,175 L109,163 M345,175 L355,125 L360,137" />
    <text className="geo-label" x="120" y="65" textAnchor="middle">Crust / plate</text><text className="geo-label" x="340" y="50" textAnchor="middle">Crust / plate</text><text className="geo-label" x="227" y="245" textAnchor="middle">Fault</text>
  </svg>;
  return <><ol className="geo-flow" aria-label="Diagram steps">{(v.steps ?? []).map((step, i) => <li key={i}><b>{i + 1}</b><span>{step}</span>{i < v.steps.length - 1 && <span aria-hidden="true">↓</span>}</li>)}</ol>{v.cycle && <p className="geo-flow-cycle">↻ Water keeps moving. This is one route through a repeating cycle.</p>}</>;
}


function TableDrawing({ visual: v }) {
  return <div className="geo-climate"><table><caption>{v.caption}</caption><thead><tr>{v.columns.map((c) => <th key={c} scope="col">{c}</th>)}</tr></thead><tbody>{v.rows.map((r, i) => <tr key={i}>{r.map((cell, j) => j === 0 ? <th scope="row" key={j}>{cell}</th> : <td key={j}>{cell}</td>)}</tr>)}</tbody></table></div>;
}

function RiverDrawing({ visual: v }) {
  const letters = v.letters ?? false;
  const name = (word, i) => letters ? "ABCDEF"[i] : word;
  const spots = v.variant === "processes"
    ? [[110, 90, "Erosion"], [240, 146, "Transport"], [370, 235, "Deposition"]]
    : [[70, 60, "Source"], [235, 105, "Tributary"], [255, 150, "Confluence"], [310, 195, "Channel"], [405, 258, "Mouth"]];
  return <svg viewBox="0 0 480 300" role="img" aria-label={v.alt}>
    <rect className="geo-sky" width="480" height="300" /><Sun x={440} y={40} />
    <path className="geo-land" d="M0,300 L0,40 Q60,20 100,30 Q200,60 260,110 Q330,170 420,230 L480,250 L480,300 Z" />
    <rect className="geo-water" x="405" y="238" width="75" height="62" />
    <path className="geo-river" d="M70,70 Q130,95 170,115 Q215,140 255,150 Q300,175 330,205 Q370,240 410,262" />
    {v.variant !== "processes" && <path className="geo-river" d="M190,60 Q215,90 255,150" />}
    {v.variant === "route" && [[120, 100], [215, 140], [330, 205]].map(([x, y], i) => <text className="geo-label" key={i} x={x} y={y - 10}>{"→"}</text>)}
    {spots.map(([x, y, w], i) => <g key={w}><circle className="geo-marker" cx={x} cy={y} r="13" /><text className="geo-marker-text" x={x} y={y + 7} textAnchor="middle">{letters ? "ABCDEF"[i] : i + 1}</text>{!letters && <text className="geo-label geo-small-label geo-halo" x={w === "Mouth" || w === "Deposition" ? x - 18 : x + 18} y={y - 14} textAnchor={w === "Mouth" || w === "Deposition" ? "end" : "start"}>{name(w, i)}</text>}</g>)}
    <text className="geo-label geo-small-label" x="415" y="290">Sea</text><text className="geo-label geo-small-label" x="10" y="25">Hills</text>
  </svg>;
}

function DayNightDrawing({ visual: v }) {
  // Earth seen from above the North Pole: the Sun is on the left, Earth turns anticlockwise (east is anticlockwise).
  const at = (lon, r = 140) => { const a = (200 + lon) * Math.PI / 180; return [240 + r * Math.cos(a), 175 - r * Math.sin(a)]; };
  const [gx, gy] = at(0), [lx, ly] = at(0, 172);
  return <svg viewBox="0 0 480 350" role="img" aria-label={v.alt}>
    <circle className="geo-night" cx="240" cy="175" r="140" />
    <path className="geo-day" d="M240,35 A140,140 0 0 0 240,315 Z" />
    <g className="geo-stars" aria-hidden="true">{[[300,90],[330,140],[350,215],[300,260],[365,175],[318,190]].map(([x,y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r="3" />)}</g>
    <Sun x={30} y={300} />
    <g>
      <line className="geo-reference" x1="240" y1="175" x2={gx} y2={gy} />
      <circle className="geo-marker" cx="240" cy="175" r="5" />
      <text className="geo-label geo-small-label geo-halo" x={lx} y={ly + 6} textAnchor="end">Greenwich</text>
      {(v.points ?? []).map((p, i) => { const [x, y] = at(p.lon); return <g key={p.label} transform={`translate(${x},${y})`}><circle className="geo-marker" r="13" /><text className="geo-marker-text" y="7" textAnchor="middle">{"ABCD"[i]}</text></g>; })}
    </g>
    <path className="geo-outline" d="M8,70 L52,70 M42,62 L52,70 L42,78 M8,100 L52,100 M42,92 L52,100 L42,108 M8,130 L52,130 M42,122 L52,130 L42,138" />
    <text className="geo-label geo-small-label" x="8" y="46">Sunlight</text>
    <text className="geo-label geo-small-label" x="140" y="345" textAnchor="middle">Day</text><text className="geo-label geo-small-label" x="340" y="345" textAnchor="middle">Night</text>
    <text className="geo-label geo-small-label" x="472" y="26" textAnchor="end">View from above</text>
    <text className="geo-label geo-small-label" x="472" y="46" textAnchor="end">the North Pole</text>
  </svg>;
}

function LandUseDrawing({ visual: v }) {
  const colour = Object.fromEntries(v.key.map((k, i) => [k.code, i]));
  const size = Math.min(60, 360 / Math.max(v.cells.length, v.cells[0].length));
  return <svg viewBox={`0 0 ${v.cells[0].length * size + 20} ${v.cells.length * size + 30}`} role="img" aria-label={v.alt}>
    {v.cells.map((row, y) => [...row].map((code, x) => <g key={`${x}-${y}`}><rect className={`geo-use geo-use-${colour[code] % 6}`} rx="6" x={10 + x * size} y={20 + y * size} width={size} height={size} /><text className="geo-marker-text geo-use-text" x={10 + x * size + size / 2} y={20 + y * size + size / 2 + 8} textAnchor="middle">{code}</text></g>))}
    <g className="geo-north" transform="translate(4,16)"><text x="0" y="0" style={{ fontSize: 14 }}>N ↑</text></g>
  </svg>;
}

function DiagramPair({ maps }) {
  return <div className="geo-paired-maps">{maps.map((m, i) => <section key={m.view ?? m.title ?? i}><h5>{m.title}</h5><Drawing visual={m} /></section>)}</div>;
}

function MapExplorer({ visual: v }) {
  const [viewId, setViewId] = useState(v.views[0].id);
  const [layerOn, setLayerOn] = useState(false);
  const current = v.views.find((w) => w.id === viewId) ?? v.views[0];
  const layer = v.layers[0];
  const layerHere = layerOn ? layer.markers.filter((m) => !m.views || m.views.includes(current.id)) : [];
  const shown = { type: "map", view: current.view, title: current.label, alt: v.alt, lines: [], markers: [...current.markers, ...layerHere] };
  return <div className="geo-explorer">
    <div className="geo-explorer-controls" role="group" aria-label="Map views">
      {v.views.map((w) => <button type="button" key={w.id} aria-label={`Map view: ${w.label}`} aria-pressed={w.id === current.id} onClick={() => setViewId(w.id)}>{w.label}</button>)}
      <button type="button" aria-label={`Map layer: ${layer.label}`} aria-pressed={layerOn} onClick={() => setLayerOn((on) => !on)}>{layer.label}</button>
    </div>
    <MapDrawing visual={shown} />
    <p className="geo-small">Extent: {current.extentText}. {layerOn ? `Layer on: ${layer.legend}` : "Layer off."}</p>
  </div>;
}

function Sun({ x, y }) {
  return <g className="geo-sun" transform={`translate(${x},${y})`} aria-hidden="true">
    {Array.from({ length: 8 }, (_, i) => <line key={i} x1="0" y1="-30" x2="0" y2="-38" transform={`rotate(${i * 45})`} />)}
    <circle r="22" />
  </g>;
}

// Decorative picture strip for text-only evidence; the words carry the meaning.
const SCENES = [
  [/rain|weather|climate|wet|snow|cloud/i, ["rainy", "cloudy", "sunny"]],
  [/volcan|earthquake|plate|magma/i, ["mountain", "valley", "hill"]],
  [/river|flood|water|lake|dam|canal/i, ["river", "valley", "pond"]],
  [/coast|sea|harbour|port|fish|beach|island|whitby/i, ["harbour", "beach", "cliff"]],
  [/farm|food|crop|trade|apple|land use|land-use/i, ["farm", "village", "factory"]],
  [/mountain|valley|hill|lake district/i, ["mountain", "valley", "hill"]],
  [/forest|biome|vegetation|tree|spruce/i, ["forest", "vegetation", "tree"]],
  [/energy|mineral|resource|factory/i, ["factory", "port", "office"]],
  [/city|cities|town|settlement|village|home|street|journey|school|survey/i, ["town", "city", "village"]],
  [/map|grid|compass|atlas|route|digital/i, ["path", "road", "school"]],
];
const DEFAULT_SCENE = ["hill", "village", "coast"];

function RecordBanner({ visual: v }) {
  const text = `${v.title} ${v.lines.join(" ")}`;
  const names = SCENES.find(([re]) => re.test(text))?.[1] ?? DEFAULT_SCENE;
  return <div className="y1-art geo-record-banner" aria-hidden="true">
    <svg viewBox="0 0 330 100" className="y1-svg">{names.map((name, i) => <Sprite key={name} name={name} x={i * 115} size={100} />)}</svg>
  </div>;
}

function Drawing({ visual: v }) {
  return <>
    {v.type === "record" && !v.maps && <RecordBanner visual={v} />}
    {v.type === "ks1" && <KS1Drawing visual={v} />}
    {v.type === "y1" && <Year1Drawing visual={v} />}
    {v.type === "map" && <MapDrawing visual={v} />}
    {v.maps && <DiagramPair maps={v.maps} />}
    {v.type === "globe" && <GlobeDrawing visual={v} />}
    {["grid", "plan"].includes(v.type) && <GridDrawing key={v.image ?? "plain-grid"} visual={v} />}
    {v.type === "compass" && <CompassDrawing visual={v} />}
    {v.type === "climate" && <ClimateTable visual={v} />}
    {v.type === "table" && <TableDrawing visual={v} />}
    {v.type === "river" && <RiverDrawing visual={v} />}
    {v.type === "daynight" && <DayNightDrawing visual={v} />}
    {v.type === "landuse" && <LandUseDrawing visual={v} />}
    {v.type === "explorer" && <MapExplorer key={v.alt} visual={v} />}
    {v.type === "coordinates" && <CoordinateDrawing visual={v} />}
    {["flow", "mountain", "volcano", "fault"].includes(v.type) && <ProcessDrawing visual={v} />}
    {v.type === "photo" && <SourceImage id={v.image} alt={v.alt} />}
  </>;
}

/** Every drawing has the same visible text equivalent for narration and screen readers. */
export default function GeographyVisual({ visual: v, sources = [] }) {
  return <figure className={`geo-visual geo-visual-${v.type}`}>
    <div className="geo-visual-heading"><h4>{v.title}</h4><SpeakButton text={geographyEvidenceSpeech(v)} label="Read the evidence" compact /></div>
    <Drawing visual={v} />
    <figcaption>
      {v.lines.map((line, i) => <p className="geo-evidence-line" key={i}>{line}</p>)}
      <details className="geo-description"><summary>Map or picture description</summary><p>{geographyVisualDescription(v)}</p></details>
      {sources.length > 0 && <details className="geo-sources"><summary>Sources</summary><ul>{sources.map((id) => { const s = Object.hasOwn(ALL_GEOGRAPHY_SOURCES, id) ? ALL_GEOGRAPHY_SOURCES[id] : null; return <li key={id}>{s ? (s.url?.startsWith("https://") ? <a href={s.url}>{s.title}</a> : s.title) : "Source unavailable"}</li>; })}</ul></details>}
    </figcaption>
  </figure>;
}
