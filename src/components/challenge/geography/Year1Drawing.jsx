import { useId } from "react";
import year1Maps from "../../../assets/geography/year1-maps.json";
import { Sprite, Tree, House, Cloud, Sun, Boat, Waves } from "./Year1Sprites";
import "./year1.css";

/**
 * Year 1 Geography pictures: bright, original, read-only illustrations for 5–6
 * year olds. `visual.art` picks the drawing; letters on markers and cards are
 * the only thing an answer refers to, so colour never carries an answer alone.
 * Every drawing sits inside GeographyVisual, which supplies the title, the
 * read-aloud evidence and the text description.
 */

const LETTER = ({ x, y, id, r = 15 }) => <g className="y1-pin" transform={`translate(${x},${y})`}>
  <circle r={r} /><text y={r * 0.38} textAnchor="middle" style={{ fontSize: r * 1.15 }}>{id}</text>
</g>;

// ——— Picture cards ———
function Cards({ visual: v }) {
  return <ul className={`y1-cards y1-cards-${Math.min(v.items.length, 4)}`}>
    {v.items.map((item, i) => <li key={item.code ?? i} className="y1-card">
      <svg viewBox="0 0 100 100" aria-hidden="true"><Sprite name={item.s} /></svg>
      {(item.code || item.label) && <p>{item.code && <b className="y1-chip">{item.code}</b>}{item.label && <span>{item.label}</span>}</p>}
    </li>)}
  </ul>;
}

// ——— Illustrated scenes with named anchors for letter markers ———
const SCENES = {
  school: {
    anchors: { building: [150, 110], path: [250, 225], tree: [390, 120], soil: [80, 230], gate: [456, 158], grass: [330, 240], playground: [335, 225] },
    draw: () => <>
      <rect className="y1-sky" width="480" height="280" /><Cloud x={70} y={40} s={1.2} /><Cloud x={300} y={30} />
      <path className="y1-grass" d="M0,150 L480,150 L480,280 L0,280 Z" />
      <rect className="y1-wall-2" x="70" y="72" width="160" height="88" /><path className="y1-roof" d="M60,76 L150,30 L240,76 Z" />
      <rect className="y1-window" x="86" y="92" width="30" height="22" /><rect className="y1-window" x="184" y="92" width="30" height="22" /><rect className="y1-door" x="136" y="118" width="28" height="42" />
      <path className="y1-path" d="M136,160 L164,160 L300,280 L230,280 Z" />
      <rect className="y1-soil" x="30" y="206" width="100" height="44" rx="10" />{[48, 72, 96, 116].map((x) => <g key={x}><path className="y1-leaf" d={`M${x},214 l0,-10`} /><circle className="y1-blossom" cx={x} cy="204" r="5" /></g>)}
      <Tree x={380} y={150} s={2.2} /><Tree x={440} y={140} s={1.4} />
      <rect className="y1-path" x="290" y="196" width="96" height="58" rx="8" /><path className="y1-ink-line" d="M300,248 L316,206 L332,248 M316,206 L352,206 L352,248" /><path className="y1-slide" d="M360,248 L360,214 L366,214 L382,248 Z" />
      <rect className="y1-trunk" x="436" y="170" width="6" height="54" /><rect className="y1-trunk" x="470" y="170" width="6" height="54" /><path className="y1-gate" d="M442,184 L470,184 M442,200 L470,200" />
    </>,
  },
  coast: {
    anchors: { sea: [90, 200], beach: [250, 230], cliff: [410, 150], harbour: [150, 120], village: [380, 60], boat: [80, 160], port: [150, 120] },
    draw: () => <>
      <rect className="y1-sky" width="480" height="280" /><Sun x={60} y={44} s={1.2} />
      <rect className="y1-sea" y="110" width="480" height="170" /><Waves y={150} /><Waves y={190} /><g transform="translate(100,0)"><Waves y={230} /></g>
      <path className="y1-sand" d="M180,280 Q220,200 330,190 L360,280 Z" />
      <path className="y1-rock" d="M320,280 L330,170 L350,120 L340,90 L480,80 L480,280 Z" /><path className="y1-grass" d="M336,96 L480,84 L480,74 L332,86 Z" />
      <House x={380} y={84} s={0.9} /><House x={430} y={80} s={0.8} roof="y1-roof-2" />
      <rect className="y1-stone" x="100" y="120" width="130" height="14" /><Boat x={150} y={150} s={1.4} /><Boat x={70} y={170} s={1.2} /><House x={130} y={120} s={0.8} /><House x={190} y={120} s={0.8} roof="y1-roof-2" />
    </>,
  },
  country: {
    anchors: { mountain: [110, 50], hill: [380, 110], valley: [240, 160], river: [250, 230], forest: [80, 200], farm: [400, 210], soil: [330, 255] },
    draw: () => <>
      <rect className="y1-sky" width="480" height="280" /><Cloud x={300} y={36} />
      <path className="y1-mountain" d="M0,170 L110,30 L190,140 L240,170 Z" /><path className="y1-snow" d="M85,62 L110,30 L135,62 L120,56 L110,66 L98,56 Z" />
      <path className="y1-hill" d="M240,170 Q380,40 480,150 L480,170 Z" />
      <path className="y1-grass" d="M0,160 L480,150 L480,280 L0,280 Z" />
      <path className="y1-water" d="M232,160 Q220,200 250,220 Q284,244 262,280 L300,280 Q316,236 280,214 Q256,196 252,160 Z" />
      {[[30, 205], [60, 190], [90, 210], [120, 195], [50, 235], [100, 240]].map(([x, y]) => <g key={`${x}${y}`} transform={`translate(${x},${y}) scale(1.4)`}><rect className="y1-trunk" x="-2.5" y="-2" width="5" height="10" /><path className="y1-leaf-dark" d="M0,-30 L12,-10 L6,-10 L15,2 L-15,2 L-6,-10 L-12,-10 Z" /></g>)}
      <rect className="y1-barn" x="370" y="180" width="60" height="40" /><path className="y1-roof" d="M362,182 L400,156 L438,182 Z" />
      <path className="y1-soil" d="M310,240 L480,232 L480,280 L320,280 Z" /><path className="y1-soil-dark" d="M320,252 L480,246 M326,266 L480,260" />
    </>,
  },
  town: {
    anchors: { house: [60, 150], shop: [170, 140], office: [270, 70], factory: [400, 110], road: [240, 240], tree: [340, 190] },
    draw: () => <>
      <rect className="y1-sky" width="480" height="280" /><Cloud x={90} y={40} /><Cloud x={420} y={30} s={0.8} cls="y1-smoke" />
      <path className="y1-grass" d="M0,200 L480,200 L480,280 L0,280 Z" /><rect className="y1-road" y="216" width="480" height="44" /><path className="y1-road-line" d="M10,238 L60,238 M100,238 L150,238 M190,238 L240,238 M280,238 L330,238 M370,238 L420,238" />
      <House x={60} y={200} s={2} />
      <rect className="y1-wall-2" x="122" y="120" width="96" height="80" /><path className="y1-awning" d="M116,124 L224,124 L218,142 L122,142 Z" /><rect className="y1-window" x="132" y="152" width="40" height="30" /><rect className="y1-door" x="182" y="152" width="26" height="48" />
      <rect className="y1-glass" x="236" y="30" width="70" height="170" />{[44, 70, 96, 122, 148].map((y) => <g key={y}><rect className="y1-window" x="244" y={y} width="24" height="14" /><rect className="y1-window" x="274" y={y} width="24" height="14" /></g>)}
      <Tree x={340} y={200} s={1.4} />
      <rect className="y1-stone" x="360" y="120" width="110" height="80" /><path className="y1-stone" d="M360,120 L385,100 L385,120 L410,100 L410,120 L435,100 L435,120 Z" /><rect className="y1-stone-dark" x="446" y="50" width="16" height="70" /><rect className="y1-door" x="400" y="160" width="30" height="40" />
    </>,
  },
};
function Scene({ visual: v }) {
  const scene = SCENES[v.scene];
  return <svg viewBox="0 0 480 280" role="img" aria-label={v.alt} className="y1-svg">
    {scene.draw()}
    {Object.entries(v.pins ?? {}).map(([id, at]) => { const [x, y] = scene.anchors[at]; return <LETTER key={id} id={id} x={x} y={y} r={18} />; })}
    {(v.labels ?? []).map((at) => { const [x, y] = scene.anchors[at]; return <text key={at} className="y1-tag" x={x} y={y + 34} textAnchor="middle">{at[0].toUpperCase() + at.slice(1)}</text>; })}
  </svg>;
}

// ——— Maps ———
const fit = (extent, W, H, pad = 10) => {
  const [w, s, e, n] = extent, k = Math.cos(((n + s) / 2) * Math.PI / 180);
  const scale = Math.min((W - 2 * pad) / ((e - w) * k), (H - 2 * pad) / (n - s));
  const ox = (W - (e - w) * k * scale) / 2, oy = (H - (n - s) * scale) / 2;
  return ([lon, lat]) => [ox + (lon - w) * k * scale, oy + (n - lat) * scale];
};
const ringPath = (rings, at) => rings.map((r) => r.map((p, i) => `${i ? "L" : "M"}${at(p).slice(0, 2).map((n) => n.toFixed(1)).join(",")}`).join("") + "Z").join("");

const NATIONS = { england: "England", scotland: "Scotland", wales: "Wales", northernIreland: "Northern Ireland" };
const NATION_LABEL = { england: [-1.0, 53.0], scotland: [-4.6, 56.55], wales: [-3.75, 52.35], northernIreland: [-6.7, 54.65] };
const CAPITALS = { London: [-0.13, 51.51], Edinburgh: [-3.19, 55.95], Cardiff: [-3.18, 51.48], Belfast: [-5.93, 54.6] };
const SEAS = { "North Sea": [0.4, 56.4], "Irish Sea": [-4.95, 53.75], "English Channel": [-2.6, 50.15], "Atlantic Ocean": [-9.2, 57.2] };

function UkMap({ visual: v }) {
  const W = 380, H = 460, at = fit(year1Maps.ukNations.extent, W, H, 6);
  const focus = new Set(v.highlight ?? []);
  return <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={v.alt} className="y1-svg y1-map-uk">
    <rect className="y1-sea" width={W} height={H} />
    {v.seas && <g className="y1-sea-waves">{[[40, 90], [300, 330], [320, 140], [80, 400]].map(([x, y]) => <path key={x} className="y1-foam" d={`M${x},${y} q8,-6 16,0 t16,0`} />)}</g>}
    {year1Maps.ukNations.features.filter((f) => !v.only || v.only.includes(f.id)).map((f) => {
      const nation = Object.hasOwn(NATIONS, f.id);
      const cls = nation ? (v.plain ? "y1-uk-plain" : `y1-nation y1-nation-${f.id}`) : "y1-neighbour";
      return <path key={f.id} className={`${cls}${focus.size && nation && !focus.has(f.id) ? " y1-dim" : ""}`} d={ringPath(f.rings, at)} />;
    })}
    {v.neighbours && <><text className="y1-map-note" {...xy(at([-8.3, 53.1]))} textAnchor="middle">Republic of</text><text className="y1-map-note" {...xy(at([-8.3, 52.75]))} textAnchor="middle">Ireland</text><text className="y1-map-note" {...xy(at([1.2, 49.95]))} textAnchor="middle">France</text></>}
    {v.names && Object.entries(NATION_LABEL).map(([id, p]) => <text key={id} className="y1-map-label" {...xy(at(p))} textAnchor="middle">{NATIONS[id]}</text>)}
    {v.seas && Object.entries(SEAS).map(([name, p]) => <text key={name} className="y1-sea-label" {...xy(at(p))} textAnchor="middle">{name}</text>)}
    {v.capitals && Object.entries(CAPITALS).map(([name, p]) => { const [x, y] = at(p); return <g key={name}><path className="y1-star" transform={`translate(${x},${y}) scale(.5)`} d={STAR} />{v.capitals === "names" && <text className="y1-city-label" x={x + (name === "Cardiff" ? -12 : name === "Belfast" ? 0 : 12)} y={y + (name === "Belfast" ? 24 : 5)} textAnchor={name === "Cardiff" ? "end" : name === "Belfast" ? "middle" : "start"}>{name}</text>}</g>; })}
    {(v.markers ?? []).map((m) => { const [x, y] = at(m.point); return <LETTER key={m.id} id={m.id} x={x} y={y} r={16} />; })}
    <NorthArrow x={W - 34} y={40} />
  </svg>;
}
const xy = ([x, y]) => ({ x, y });
const STAR = "M0,-20 L6,-6 L21,-6 L9,3 L13,18 L0,9 L-13,18 L-9,3 L-21,-6 L-6,-6 Z";
function NorthArrow({ x, y, rotate = 0 }) {
  return <g className="y1-north" transform={`translate(${x},${y}) rotate(${rotate})`}>
    <circle r="22" /><path d="M0,-15 L7,6 L0,2 L-7,6 Z" /><text y="-26" textAnchor="middle" transform={`rotate(${-rotate} 0 -30)`}>N</text>
  </g>;
}

const CONTINENT_NAMES = { northAmerica: "North America", southAmerica: "South America", europe: "Europe", africa: "Africa", asia: "Asia", australia: "Australia", antarctica: "Antarctica" };
const CONTINENT_LABEL = { northAmerica: [-102, 46], southAmerica: [-60, -14], europe: [18, 54], africa: [18, 6], asia: [92, 48], australia: [134, -25], antarctica: [20, -80] };
const OCEAN_POINTS = { pacificEast: [-140, 2], pacificWest: [160, 8], atlantic: [-34, 18], indian: [76, -22], arctic: [-20, 80], southern: [-60, -62] };
const OCEAN_LABEL = { pacificEast: "Pacific", pacificWest: "Pacific", atlantic: "Atlantic", indian: "Indian", arctic: "Arctic", southern: "Southern" };

function WorldMap({ visual: v }) {
  const W = 480, H = 250, [w, s, e, n] = year1Maps.world.extent;
  const at = ([lon, lat]) => [((lon - w) / (e - w)) * W, ((n - lat) / (n - s)) * H];
  const focus = new Set(v.highlight ?? []);
  return <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={v.alt} className="y1-svg">
    <rect className="y1-sea" width={W} height={H} />
    {v.equator && <><line className="y1-equator" x1="0" x2={W} y1={at([0, 0])[1]} y2={at([0, 0])[1]} /><text className="y1-line-label" x="6" y={at([0, 0])[1] - 6}>Equator</text></>}
    {Object.entries(year1Maps.world.continents).map(([id, rings]) => <path key={id} className={`y1-continent y1-c-${id}${focus.size && !focus.has(id) ? " y1-dim" : ""}`} d={ringPath(rings, at)} />)}
    {v.names && Object.entries(CONTINENT_LABEL).filter(([id]) => v.names === true || v.names.includes(id)).map(([id, p]) => <text key={id} className="y1-map-label y1-small" {...xy(at(p))} textAnchor="middle">{CONTINENT_NAMES[id]}</text>)}
    {v.oceans && Object.entries(OCEAN_LABEL).filter(([id]) => v.oceans === true || v.oceans.includes(id)).map(([id, name]) => <text key={id} className="y1-sea-label y1-small" {...xy(at(OCEAN_POINTS[id]))} textAnchor="middle">{name}</text>)}
    {v.poles && <><text className="y1-line-label" x={W / 2} y="12" textAnchor="middle">North Pole ↑</text><text className="y1-line-label" x={W / 2} y={H - 4} textAnchor="middle">South Pole ↓</text></>}
    {(v.markers ?? []).map((m) => { const [x, y] = at(m.point); return <LETTER key={m.id} id={m.id} x={x} y={y} r={13} />; })}
  </svg>;
}

function GlobeMap({ visual: v }) {
  const clip = `y1-globe${useId().replace(/:/g, "")}`;
  const R = 150, CX = 200, CY = 185, [l0, p0] = (v.center ?? [10, 20]).map((d) => d * Math.PI / 180);
  const at = ([lon, lat]) => {
    const l = lon * Math.PI / 180 - l0, p = lat * Math.PI / 180;
    let x = Math.cos(p) * Math.sin(l), y = Math.cos(p0) * Math.sin(p) - Math.sin(p0) * Math.cos(p) * Math.cos(l);
    const visible = Math.sin(p0) * Math.sin(p) + Math.cos(p0) * Math.cos(p) * Math.cos(l) >= 0;
    if (!visible) { const k = Math.hypot(x, y) || 1; x /= k; y /= k; }
    return [CX + R * x, CY - R * y, visible];
  };
  const shown = (rings) => rings.filter((r) => r.some((p) => at(p)[2]));
  const points = (lat) => Array.from({ length: 181 }, (_, i) => at([-180 + i * 2, lat])).filter((p) => p[2]).sort((a, b) => a[0] - b[0]);
  const trace = (pts) => pts.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join("");
  const line = (lat) => trace(points(lat));
  const focus = new Set(v.highlight ?? []);
  const pole = (lat) => at([0, lat]);
  return <svg viewBox="0 0 400 380" role="img" aria-label={v.alt} className="y1-svg y1-globe-svg">
    <defs><clipPath id={clip}><circle cx={CX} cy={CY} r={R} /></clipPath>
      <radialGradient id={`${clip}-shine`} cx="35%" cy="30%" r="75%"><stop offset="0" className="y1-shine-a" /><stop offset="1" className="y1-shine-b" /></radialGradient></defs>
    <circle className="y1-sea" cx={CX} cy={CY} r={R} />
    <g clipPath={`url(#${clip})`}>
      {v.zones && <><path className="y1-zone-warm" d={`${trace(points(18))}${trace(points(-18).reverse()).replace("M", "L")}Z`} /><rect className="y1-zone-cold" x="0" y="0" width="400" height={at([0, 64])[1]} /><rect className="y1-zone-cold" x="0" y={at([0, -64])[1]} width="400" height="380" /></>}
      {Object.entries(year1Maps.world.continents).map(([id, rings]) => <path key={id} className={`y1-continent y1-c-${id}${focus.size && !focus.has(id) ? " y1-dim" : ""}`} d={ringPath(shown(rings), (p) => at(p))} />)}
      {v.equator && <path className="y1-equator" d={line(0)} />}
    </g>
    <circle cx={CX} cy={CY} r={R} fill={`url(#${clip}-shine)`} className="y1-globe-rim" />
    {v.poles && <>{[[90, "North Pole", -1], [-90, "South Pole", 1]].map(([lat, name, dir]) => { const [x, y] = pole(lat); return <g key={name}><circle className="y1-pole" cx={x} cy={y} r="6" /><text className="y1-line-label" x={x} y={y + dir * 22 + (dir > 0 ? 6 : 0)} textAnchor="middle">{name}</text></g>; })}</>}
    {v.equator && v.equatorLabel !== false && (() => { const left = points(0)[0]; return left && <text className="y1-line-label" x={left[0] + 8} y={left[1] - 8} textAnchor="start">Equator</text>; })()}
    {(v.markers ?? []).map((m) => { const [x, y] = at(m.point); return <LETTER key={m.id} id={m.id} x={x} y={y} r={15} />; })}
  </svg>;
}

// ——— Ground view, aerial photo-style view and plan of one setting ———
const VIEW_FEATURES = {
  building: { ground: (x) => <House x={x} y={150} s={2.4} />, aerial: (x, y) => <g transform={`translate(${x},${y})`}><rect className="y1-shadow" x="-30" y="-20" width="66" height="46" rx="3" /><rect className="y1-roof" x="-34" y="-26" width="66" height="46" rx="3" /><path className="y1-ridge" d="M-34,-3 L32,-3" /></g>, plan: (x, y) => <g transform={`translate(${x},${y})`}><rect className="y1-plan-fill" x="-30" y="-22" width="60" height="44" /></g>, sym: "sym-house", name: "Building" },
  tree: { ground: (x) => <Tree x={x} y={140} s={2.4} />, aerial: (x, y) => <g transform={`translate(${x},${y})`}><circle className="y1-shadow" cx="6" cy="6" r="26" /><circle className="y1-leaf-dark" r="26" /><circle className="y1-leaf" cx="-6" cy="-6" r="14" /></g>, plan: (x, y) => <g transform={`translate(${x},${y})`}><circle className="y1-plan-tree" r="22" /></g>, sym: "sym-tree", name: "Tree" },
  pond: { ground: (x) => <ellipse className="y1-water" cx={x} cy="170" rx="50" ry="8" />, aerial: (x, y) => <g transform={`translate(${x},${y})`}><ellipse className="y1-water" rx="38" ry="26" /><path className="y1-foam" d="M-18,-4 q6,-4 12,0 t12,0" /></g>, plan: (x, y) => <g transform={`translate(${x},${y})`}><ellipse className="y1-plan-water" rx="34" ry="22" /></g>, sym: "sym-pond", name: "Pond" },
  playground: { ground: (x) => <path className="y1-ink-line" transform={`translate(${x - 30},92)`} d="M0,70 L20,0 L40,70 M20,0 L60,0 M40,70 L60,0 L80,70" />, aerial: (x, y) => <g transform={`translate(${x},${y})`}><rect className="y1-path" x="-34" y="-24" width="68" height="48" rx="6" /><path className="y1-ink-line" d="M-20,-10 L20,-10 M-20,10 L20,10" /></g>, plan: (x, y) => <g transform={`translate(${x},${y})`}><rect className="y1-plan-play" x="-30" y="-20" width="60" height="40" /></g>, sym: "sym-play", name: "Playground" },
};
const COLS = [80, 200, 320], ROWS = [60, 150];
function ViewPanel({ kind, layout, id, pins }) {
  const placed = Object.entries(layout);
  return <svg viewBox="0 0 400 200" aria-hidden="true" className="y1-view">
    {kind === "ground" && <><rect className="y1-sky" width="400" height="200" /><rect className="y1-grass" y="160" width="400" height="40" /><Cloud x={330} y={40} />
      {placed.sort((a, b) => b[1][1] - a[1][1]).map(([f, [c]]) => <g key={f}>{VIEW_FEATURES[f].ground(COLS[c])}</g>)}</>}
    {kind === "aerial" && <><rect className="y1-grass" width="400" height="200" /><rect className="y1-path" x="0" y="96" width="400" height="16" />{placed.map(([f, [c, r]]) => <g key={f}>{VIEW_FEATURES[f].aerial(COLS[c], ROWS[r] - 10)}</g>)}</>}
    {kind === "plan" && <><rect className="y1-paper" width="400" height="200" /><path className="y1-sym-path" d="M0,110 L400,110" />{placed.map(([f, [c, r]]) => <g key={f}>{VIEW_FEATURES[f].plan(COLS[c], ROWS[r] - 10)}<text className="y1-plan-label" x={COLS[c]} y={ROWS[r] + 32} textAnchor="middle">{VIEW_FEATURES[f].name}</text></g>)}</>}
    {Object.entries(pins ?? {}).map(([pin, f]) => { const [c, r] = layout[f]; return <LETTER key={pin} id={pin} x={COLS[c] + 34} y={(kind === "ground" ? 70 : ROWS[r] - 10) - 26} r={16} />; })}
    {id && <LETTER id={id} x={26} y={26} r={18} />}
  </svg>;
}
function Views({ visual: v }) {
  return <div className="y1-views">{v.panels.map((p, i) => <figure key={i} className="y1-view-card">
    <ViewPanel kind={p.kind} layout={p.layout ?? v.layout} id={p.id} pins={p.pins} />
    {p.caption && <figcaption>{p.caption}</figcaption>}
  </figure>)}</div>;
}

// ——— Grid map with a north arrow, Bix's start and lettered features ———
const ROT = { up: 0, right: 90, down: 180, left: 270 };
function GridMap({ visual: v }) {
  const [cols, rows] = v.size, S = 72, W = cols * S + 120, H = rows * S + 40;
  const c = ([x, y]) => [20 + x * S + S / 2, 20 + y * S + S / 2];
  return <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={v.alt} className="y1-svg">
    <rect className="y1-grass" x="20" y="20" width={cols * S} height={rows * S} rx="10" />
    {Array.from({ length: cols + 1 }, (_, i) => <line key={`c${i}`} className="y1-grid" x1={20 + i * S} x2={20 + i * S} y1="20" y2={20 + rows * S} />)}
    {Array.from({ length: rows + 1 }, (_, i) => <line key={`r${i}`} className="y1-grid" y1={20 + i * S} y2={20 + i * S} x1="20" x2={20 + cols * S} />)}
    {(v.route ?? []).slice(1).map((p, i) => { const [x1, y1] = c(v.route[i]), [x2, y2] = c(p); return <line key={i} className="y1-route" x1={x1} y1={y1} x2={x2} y2={y2} />; })}
    {(v.features ?? []).map((f) => { const [x, y] = c(f.at); return <g key={f.code}><Sprite name={f.s} x={x - S / 2 + 6} y={y - S / 2 + 6} size={S - 12} />{f.code && <LETTER id={f.code} x={x + S / 2 - 12} y={y - S / 2 + 12} r={11} />}</g>; })}
    {v.start && (() => { const [x, y] = c(v.start); return <g className="y1-bix" transform={`translate(${x},${y})`}><circle r="22" /><text y="8" textAnchor="middle">★</text></g>; })()}
    <g transform={`translate(${W - 50},${H / 2})`}><CompassRose rotate={ROT[v.north ?? "up"]} /></g>
  </svg>;
}
function CompassRose({ rotate = 0, size = 1 }) {
  const pts = [["N", 0], ["E", 90], ["S", 180], ["W", 270]];
  return <g className="y1-rose" transform={`scale(${size})`}>
    <circle r="34" />
    {pts.map(([name, a]) => { const r = (a + rotate) * Math.PI / 180; return <g key={name}>
      <path className={name === "N" ? "y1-rose-n" : "y1-rose-arm"} transform={`rotate(${a + rotate})`} d="M0,-30 L6,-6 L0,0 L-6,-6 Z" />
      <text x={Math.sin(r) * 46} y={-Math.cos(r) * 46 + 6} textAnchor="middle">{name}</text>
    </g>; })}
  </g>;
}
function Compass({ visual: v }) {
  return <svg viewBox="0 0 240 200" role="img" aria-label={v.alt} className="y1-svg y1-compass"><g transform="translate(120,100)"><CompassRose rotate={ROT[v.north ?? "up"]} size={1.6} /></g></svg>;
}

// ——— Near/far and left/right from Bix's own viewpoint (seen from behind) ———
const SPOT = { "left-near": [80, 200, 120], "right-near": [400, 200, 120], "left-far": [150, 70, 60], "right-far": [330, 70, 60], "ahead-far": [240, 50, 60] };
function Viewpoint({ visual: v }) {
  return <svg viewBox="0 0 480 300" role="img" aria-label={v.alt} className="y1-svg">
    <rect className="y1-sky" width="480" height="300" /><path className="y1-grass" d="M0,90 L480,90 L480,300 L0,300 Z" /><path className="y1-path" d="M220,90 L260,90 L330,300 L150,300 Z" />
    {v.items.map((it) => { const [x, y, size] = SPOT[`${it.side}-${it.dist}`]; return <g key={it.code ?? it.s}><Sprite name={it.s} x={x - size / 2} y={y - size / 2} size={size} />{it.code && <LETTER id={it.code} x={x} y={y + size / 2 + 4} r={size > 80 ? 16 : 12} />}</g>; })}
    <g className="y1-child" transform="translate(240,250)"><circle className="y1-hair" cx="0" cy="-44" r="18" /><path className="y1-shirt" d="M-26,24 Q-26,-22 0,-24 Q26,-22 26,24 Z" /><path className="y1-shirt" d="M-24,-10 L-40,18 M24,-10 L40,18" /><text className="y1-tag" y="46" textAnchor="middle">Bix's friend</text></g>
    <text className="y1-side" x="16" y="116">← left</text><text className="y1-side" x="464" y="116" textAnchor="end">right →</text>
  </svg>;
}

// ——— Weather: a record of days, and a view through a window ———
function WeatherRecord({ visual: v }) {
  return <ol className="y1-record" aria-label={v.caption ?? "Example weather record"}>
    {v.days.map((d) => <li key={d.day}><b>{d.day}</b><span className="y1-record-pics">{d.w.map((w) => <svg key={w} viewBox="0 0 100 100" aria-hidden="true"><Sprite name={w} /></svg>)}</span><span className="y1-record-words">{d.w.join(" + ")}</span></li>)}
  </ol>;
}
function Outside({ visual: v }) {
  const w = new Set(v.weather);
  const grey = w.has("rainy") || w.has("cloudy") || w.has("snowy");
  return <svg viewBox="0 0 400 300" role="img" aria-label={v.alt} className="y1-svg">
    <rect className="y1-wall" width="400" height="300" />
    <rect className={grey ? "y1-sky-grey" : "y1-sky-sunny"} x="50" y="30" width="300" height="230" />
    <g transform="translate(50,30)">
      {w.has("sunny") && <Sun x={240} y={50} s={1.4} />}
      {w.has("cloudy") && <><Cloud x={80} y={50} s={1.6} cls="y1-cloud-grey" /><Cloud x={200} y={70} s={1.3} /></>}
      {w.has("rainy") && <><Cloud x={150} y={40} s={1.8} cls="y1-cloud-grey" />{[50, 90, 130, 170, 210, 250].map((x, i) => <path key={x} className="y1-rain" d={`M${x},${80 + (i % 2) * 20} l-6,16 M${x + 14},${120 + (i % 2) * 14} l-6,16`} />)}</>}
      {w.has("snowy") && <><Cloud x={150} y={36} s={1.6} />{[[40, 90], [100, 120], [170, 96], [230, 130], [270, 90], [70, 160], [200, 170]].map(([x, y]) => <g key={x + y} className="y1-flake" transform={`translate(${x},${y})`}>{[0, 60, 120].map((a) => <path key={a} d="M-6,0 L6,0" transform={`rotate(${a})`} />)}</g>)}</>}
      <path className={w.has("snowy") ? "y1-snow" : "y1-grass"} d="M0,190 Q150,176 300,190 L300,230 L0,230 Z" />
      <g transform={w.has("windy") ? "translate(70,192) rotate(14)" : "translate(70,192)"}><Tree s={2} /></g>
      {w.has("windy") && <g><path className="y1-wind" d="M150,120 L230,120 q14,0 14,-10 q0,-10 -10,-10" /><path className="y1-wind" d="M140,146 L250,146 q14,0 14,10 q0,10 -10,10" /></g>}
    </g>
    <path className="y1-frame" d="M50,30 L350,30 L350,260 L50,260 Z M200,30 L200,260 M50,145 L350,145" />
    <rect className="y1-sill" x="36" y="260" width="328" height="16" rx="4" />
  </svg>;
}

// ——— Seasons as a repeating cycle ———
const SEASON_ORDER = ["spring", "summer", "autumn", "winter"];
function Seasons({ visual: v }) {
  const pos = [[150, 70], [290, 170], [150, 270], [10, 170]];
  const hidden = new Set(v.mystery ?? []);
  return <svg viewBox="0 0 440 380" role="img" aria-label={v.alt} className="y1-svg">
    <circle className="y1-cycle" cx="220" cy="210" r="120" />
    {[45, 135, 225, 315].map((a) => <path key={a} className="y1-cycle-arrow" transform={`translate(220,210) rotate(${a}) translate(0,-120)`} d="M-9,-8 L5,0 L-9,8" />)}
    {(v.order ?? SEASON_ORDER).map((s, i) => { const [x, y] = pos[i]; return <g key={s} transform={`translate(${x},${y - 60})`}>
      <rect className={`y1-season-card${v.highlight === s ? " y1-season-on" : ""}`} width="140" height="130" rx="16" />
      {hidden.has(s) ? <text className="y1-mystery" x="70" y="84" textAnchor="middle">?</text> : <Sprite name={s} x={20} y={8} size={100} />}
      {!hidden.has(s) && v.names !== false && <text className="y1-tag" x="70" y="124" textAnchor="middle">{s[0].toUpperCase() + s.slice(1)}</text>}
    </g>; })}
  </svg>;
}

/** Map key: shapes plus words, never colour alone. */
function Key({ items }) {
  return <ul className="y1-key" aria-label="Map key">{items.map((k) => <li key={k.label}><svg viewBox="0 0 100 100" aria-hidden="true"><Sprite name={k.s} /></svg><span>{k.code && <b className="y1-chip">{k.code}</b>}{k.label}</span></li>)}</ul>;
}

const ART = { cards: Cards, scene: Scene, uk: UkMap, world: WorldMap, globe: GlobeMap, views: Views, grid: GridMap, compass: Compass, viewpoint: Viewpoint, weather: WeatherRecord, outside: Outside, seasons: Seasons };

export default function Year1Drawing({ visual: v }) {
  const Art = ART[v.art];
  if (!Art) return <p role="status">This picture could not load. Use the description: {v.alt}</p>;
  return <div className={`y1-art y1-art-${v.art}`}>
    <Art visual={v} />
    {v.key && <Key items={v.key} />}
  </div>;
}
