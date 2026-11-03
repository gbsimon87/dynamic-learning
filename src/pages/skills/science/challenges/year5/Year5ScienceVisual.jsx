import { useId } from "react";
import Year4ScienceVisual from "../year4/Year4ScienceVisual";
import { VISUAL_TYPES } from "../../../../../data/challenges/year5Science/visualTypes.js";
import { Fig, Root, Scene, Counters, Emoji, Arrow, Lines, wrap } from "../../../year5Pictures/Pictures";
import "./Year5ScienceVisual.css";

// The figure types are also exported here so a frame can read them next to the component.
// eslint-disable-next-line react-refresh/only-export-components
export { VISUAL_TYPES };

const Earth = ({ cx, cy, r }) => <g>
  <circle className="y5v-earth" cx={cx} cy={cy} r={r} />
  <ellipse className="y5v-land" cx={cx - r * 0.25} cy={cy - r * 0.2} rx={r * 0.38} ry={r * 0.26} />
  <ellipse className="y5v-land" cx={cx + r * 0.3} cy={cy + r * 0.38} rx={r * 0.3} ry={r * 0.18} />
</g>;

function Orbit({ bodies = "sun-earth-moon", labels = true, alt, caption }) {
  const sun = bodies.includes("sun");
  const moon = bodies.includes("moon");
  const earth = sun ? { x: 215, y: 62 } : { x: 200, y: 120 };
  const label = (text, x, y, anchor = "middle") => labels && <text x={x} y={y} textAnchor={anchor}>{text}</text>;
  return <Fig label={alt} caption={caption}>
    <rect className="y5v-night" width="400" height="240" />
    {sun && <g>
      <circle className="y5v-orbit" cx="110" cy="120" r="105" style={{ stroke: "var(--v-on-night)" }} />
      <circle className="y5v-sun" cx="110" cy="120" r="34" />
      {label("Sun", 110, 124)}
    </g>}
    <Earth cx={earth.x} cy={earth.y} r={sun ? 22 : 38} />
    {label("Earth", earth.x, earth.y + (sun ? 44 : 68))}
    {moon && <g>
      <circle className="y5v-orbit" cx={earth.x} cy={earth.y} r={sun ? 46 : 84} style={{ stroke: "var(--v-on-night)" }} />
      <circle className="y5v-moon" cx={earth.x + (sun ? 33 : 59)} cy={earth.y - (sun ? 33 : 59)} r={sun ? 9 : 13} />
      {label("Moon", earth.x + (sun ? 33 : 59) + (sun ? 16 : 22), earth.y - (sun ? 33 : 59) + 6, "start")}
    </g>}
  </Fig>;
}

const PLANETS = [[4, "stone"], [7, "wall-2"], [7.5, "sea"], [5, "roof"], [20, "autumn"], [16, "sand"], [11, "window"], [11, "roof-2"]];
const PLANET_X = [95, 128, 160, 191, 240, 300, 348, 380];
function SolarSystem({ alt, caption }) {
  return <Fig label={alt} caption={caption}>
    <rect className="y5v-night" width="400" height="240" />
    {PLANET_X.map((x) => <circle key={x} className="y5v-orbit" cx="-20" cy="120" r={x + 20} style={{ stroke: "var(--v-on-night)" }} />)}
    <circle className="y5v-sun" cx="-20" cy="120" r="74" />
    <text className="y5v-small" x="6" y="124" textAnchor="start">Sun</text>
    {PLANETS.map(([r, tone], i) => <g key={i}>
      <circle cx={PLANET_X[i]} cy="120" r={r} fill={`var(--v-${tone})`} stroke="var(--v-ink)" strokeWidth="2" />
      {i === 5 && <ellipse cx={PLANET_X[i]} cy="120" rx="27" ry="6" fill="none" stroke="var(--v-ink)" strokeWidth="2.5" />}
    </g>)}
  </Fig>;
}

// Phase 0 new, 1 waxing crescent, 2 first quarter, 3 waxing gibbous, 4 full, 5 waning gibbous, 6 last quarter, 7 waning crescent.
function litPath(cx, cy, r, phase) {
  const flip = phase > 4;
  const p = flip ? 8 - phase : phase;
  const theta = (p * Math.PI) / 4;
  const rx = Math.abs(Math.cos(theta)) * r;
  const bulge = Math.cos(theta) > 0 ? 0 : 1;
  const d = `M${cx} ${cy - r} A${r} ${r} 0 0 1 ${cx} ${cy + r} A${rx} ${r} 0 0 ${bulge} ${cx} ${cy - r}Z`;
  return { d, flip };
}
function MoonPhases({ phases = [], alt, caption }) {
  const n = phases.length;
  const r = Math.min(40, 360 / n / 2 - 6);
  const gap = 380 / n;
  return <Fig label={alt} caption={caption}>
    <rect className="y5v-night" width="400" height="240" />
    {phases.map((phase, i) => {
      const cx = 10 + gap * (i + 0.5);
      if (phase === "?") return <g key={i}><circle cx={cx} cy="120" r={r} fill="none" stroke="var(--v-on-night)" strokeWidth="3" strokeDasharray="6 6" /><text className="y5v-on-night" x={cx} y="126" textAnchor="middle" style={{ fontSize: 30 }}>?</text></g>;
      const { d, flip } = litPath(cx, 120, r, phase);
      return <g key={i}>
        <circle className="y5v-moon-dark" cx={cx} cy="120" r={r} style={{ stroke: "var(--v-on-night)" }} />
        {phase === 4 ? <circle className="y5v-moon" cx={cx} cy="120" r={r} /> : phase !== 0 && <path className="y5v-moon" d={d} transform={flip ? `translate(${cx * 2} 0) scale(-1 1)` : undefined} />}
      </g>;
    })}
  </Fig>;
}

function DayNight({ pin, torch, alt, caption }) {
  const id = useId().replace(/:/g, "");
  const cx = 250;
  const cy = 120;
  const r = 74;
  return <Fig label={alt} caption={caption}>
    <rect className="y5v-night" width="400" height="240" />
    <clipPath id={id}><circle cx={cx} cy={cy} r={r} /></clipPath>
    <Earth cx={cx} cy={cy} r={r} />
    <rect clipPath={`url(#${id})`} x={cx} y={cy - r} width={r} height={2 * r} fill="var(--v-night)" opacity=".7" />
    <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--v-ink)" strokeWidth="3" />
    {[70, 120, 170].map((y) => <Arrow key={y} x1="70" y1={y} x2="165" y2={y} head={12} className="y5v-arrow y5v-light-arrow" />)}
    {torch ? <Emoji e="🔦" x="42" y="120" size="44" /> : <circle className="y5v-sun" cx="36" cy="120" r="20" />}
    <text className="y5v-on-night" x="42" y="40" textAnchor="start">{torch ? "Torch light" : "Sunlight"}</text>
    {pin && <g><Emoji e="📍" x={pin === "day" ? cx - r * 0.7 : cx + r * 0.7} y={cy - 6} size="34" /></g>}
    <text className="y5v-on-night" x={cx} y="222" textAnchor="middle">{torch ? "Globe" : "Earth"}</text>
  </Fig>;
}

function Forces({ emoji, backdrop = "sky", arrows = [], size = 64, alt, caption, ground }) {
  const vec = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] };
  const cx = 200;
  const cy = 118;
  return <Scene backdrop={backdrop} alt={alt} caption={caption}>
    {ground && <rect className="y5v-bench" x="40" y={cy + 38} width="320" height="14" rx="6" />}
    <Emoji e={emoji} x={cx} y={cy} size={size} />
    {arrows.map(([dir, label, len = 62], i) => {
      const [dx, dy] = vec[dir];
      const start = [cx + dx * (size * 0.55), cy + dy * (size * 0.55)];
      const end = [start[0] + dx * len, start[1] + dy * len];
      const at = [end[0] + dx * 8 + (dx > 0 ? 6 : dx < 0 ? -6 : 0), end[1] + dy * 12];
      return <g key={i}>
        <Arrow x1={start[0]} y1={start[1]} x2={end[0]} y2={end[1]} head={14} className="y5v-arrow y5v-thick" />
        {label && <text x={at[0]} y={at[1]} textAnchor={dx > 0 ? "start" : dx < 0 ? "end" : "middle"} dominantBaseline="central">{label}</text>}
      </g>;
    })}
  </Scene>;
}

function Lever({ pivotAt = 0.5, pushAt = 0.9, load = "📦", labels, alt, caption }) {
  const px = 60 + 280 * pivotAt;
  const pushX = 60 + 280 * pushAt;
  return <Fig label={alt} caption={caption}>
    <rect className="y5v-paper" width="400" height="240" />
    <rect className="y5v-bench" x="0" y="196" width="400" height="44" />
    <polygon className="y5v-pivot" points={`${px - 24},196 ${px + 24},196 ${px},158`} />
    <rect className="y5v-plank" x="60" y="146" width="280" height="14" rx="5" />
    <Emoji e={load} x="84" y="116" size="46" />
    <Arrow x1={pushX} y1="52" x2={pushX} y2="138" head={16} className="y5v-arrow y5v-thick" />
    {labels && <g><text x={px} y="224" textAnchor="middle">Pivot</text><text x="84" y="84" textAnchor="middle">Load</text><text x={pushX} y="40" textAnchor="middle">Push</text></g>}
  </Fig>;
}

function Pulley({ load = "📦", alt, caption }) {
  return <Fig label={alt} caption={caption}>
    <rect className="y5v-paper" width="400" height="240" />
    <rect className="y5v-bench" x="0" y="206" width="400" height="34" />
    <rect className="y5v-plank" x="140" y="20" width="120" height="14" rx="5" />
    <line className="y5v-ink" x1="200" y1="34" x2="200" y2="52" />
    <circle className="y5v-metal" cx="200" cy="76" r="26" />
    <circle className="y5v-fill-ink" cx="200" cy="76" r="5" />
    <path className="y5v-rope" d="M174 76 V150 M226 76 V170" />
    <Emoji e={load} x="174" y="176" size="44" />
    <Arrow x1="226" y1="150" x2="226" y2="196" head={16} className="y5v-arrow y5v-thick" />
    <Emoji e="✋" x="226" y="130" size="34" />
  </Fig>;
}

function gearPath(cx, cy, r, teeth, phase = 0) {
  const out = r + 9;
  const pts = [];
  for (let i = 0; i < teeth; i += 1) {
    const a = phase + (i / teeth) * Math.PI * 2;
    const w = Math.PI / teeth / 2;
    [[a - w * 1.1, r], [a - w * 0.6, out], [a + w * 0.6, out], [a + w * 1.1, r]].forEach(([t, rad]) => pts.push(`${(cx + Math.cos(t) * rad).toFixed(1)},${(cy + Math.sin(t) * rad).toFixed(1)}`));
  }
  return pts.join(" ");
}
function Gears({ small = 10, large = 20, labels = true, alt, caption }) {
  const rs = Math.min(46, small * 4.2);
  const rl = Math.min(86, large * 4.2);
  const x1 = 28 + rs + 12;
  const x2 = x1 + rs + rl + 8;
  return <Fig label={alt} caption={caption}>
    <rect className="y5v-paper" width="400" height="240" />
    <polygon className="y5v-metal" points={gearPath(x1, 120, rs, small, 0)} />
    <circle className="y5v-paper" cx={x1} cy="120" r="8" stroke="var(--v-ink)" strokeWidth="3" />
    <polygon className="y5v-metal" points={gearPath(x2, 120, rl, large, Math.PI / large)} />
    <circle className="y5v-paper" cx={x2} cy="120" r="10" stroke="var(--v-ink)" strokeWidth="3" />
    {labels && <g><text x={x1} y="204" textAnchor="middle">{small} teeth</text><text x={x2} y="226" textAnchor="middle">{large} teeth</text></g>}
  </Fig>;
}

function Cups({ cups = [], alt, caption }) {
  const n = cups.length;
  const gap = 400 / n;
  return <Fig label={alt} caption={caption}>
    <rect className="y5v-paper" width="400" height="240" />
    <rect className="y5v-bench" x="0" y="150" width="400" height="90" />
    {cups.map((cup, i) => {
      const cx = gap * (i + 0.5);
      const big = cup.size !== "small";
      const w = big ? 78 : 56;
      const h = big ? 92 : 64;
      const top = 150 - h;
      return <g key={i}>
        <path className="y5v-liquid" d={`M${cx - w / 2 + 3} ${top + 20} H${cx + w / 2 - 3} V146 H${cx - w / 2 + 3}Z`} />
        <path className="y5v-glass" d={`M${cx - w / 2} ${top} L${cx - w / 2 + 6} 150 H${cx + w / 2 - 6} L${cx + w / 2} ${top}`} />
        {cup.add && <g>{[-14, 0, 14].map((o, k) => <circle key={k} className="y5v-solid" cx={cx + o} cy={146 - 6 - (k % 2) * 4} r="4" />)}<ellipse className="y5v-solid" cx={cx} cy={top - 6} rx="14" ry="6" /></g>}
        <Lines x={cx} y="186" lines={wrap(cup.title, 12)} />
        {cup.note && <Lines x={cx} y={186 + 26 * wrap(cup.title, 12).length} lines={wrap(cup.note, 13)} className="y5v-small" gap={20} />}
      </g>;
    })}
  </Fig>;
}

function Ramp({ surfaces = [], alt, caption }) {
  const n = Math.max(surfaces.length, 1);
  const w = 200 / n;
  return <Fig label={alt} caption={caption}>
    <rect className="y5v-paper" width="400" height="240" />
    <polygon className="y5v-plank" points="30,200 30,70 170,170 170,200" />
    <Emoji e="🚗" x="62" y="62" size="40" />
    <Arrow x1="86" y1="86" x2="124" y2="118" head={14} className="y5v-arrow y5v-thick" />
    <rect className="y5v-bench" x="170" y="170" width="200" height="30" />
    {surfaces.map((name, i) => <g key={name}>
      {i > 0 && <line className="y5v-ink-thin" x1={170 + w * i} y1="170" x2={170 + w * i} y2="200" />}
      {/* Names sit above and below in turn so three of them never touch. */}
      <Lines x={170 + w * (i + 0.5)} y={n < 3 || i % 2 === 0 ? 224 : 138} lines={wrap(name, 10)} />
    </g>)}
  </Fig>;
}

function Balloon({ alt, caption }) {
  return <Fig label={alt} caption={caption}>
    <rect className="y5v-paper" width="400" height="240" />
    <rect className="y5v-bench" x="0" y="196" width="400" height="44" />
    <path className="y5v-glass" d="M170 196 V120 Q170 108 182 100 V74 H218 V100 Q230 108 230 120 V196Z" />
    <path className="y5v-liquid" d="M173 196 V150 H227 V196Z" />
    {[[190, 140], [208, 128], [196, 110], [214, 156], [186, 168]].map(([x, y]) => <circle key={x} cx={x} cy={y} r="5" fill="var(--v-paper)" stroke="var(--v-ink)" strokeWidth="2" />)}
    <rect className="y5v-pivot" x="178" y="66" width="44" height="14" rx="5" />
    <ellipse className="y5v-sunny" cx="200" cy="32" rx="40" ry="38" style={{ fill: "var(--v-roof)" }} />
    <path className="y5v-ink-thin" d="M200 70 V64" />
  </Fig>;
}

function Filter({ mixture = "salty water", alt, caption }) {
  return <Fig label={alt} caption={caption}>
    <rect className="y5v-paper" width="400" height="240" />
    <rect className="y5v-bench" x="0" y="204" width="400" height="36" />
    <path className="y5v-glass" d="M120 40 H280 L214 124 V136 H186 V124Z" />
    <path className="y5v-liquid" d="M135 58 H265 L222 110 H178Z" />
    <path className="y5v-ink" d="M140 40 L200 118 L260 40" style={{ strokeDasharray: "2 0" }} />
    <path className="y5v-glass" d="M162 150 H238 L232 204 H168Z" />
    <path className="y5v-liquid" d="M166 178 H234 L232 204 H168Z" />
    {[148, 160].map((y) => <circle key={y} cx="200" cy={y} r="3.5" fill="var(--v-sea)" stroke="var(--v-ink)" strokeWidth="1.5" />)}
    <Lines x="330" y="62" lines={wrap(mixture, 10)} />
    <text x="62" y="80" textAnchor="middle">Filter</text>
    <text x="62" y="102" textAnchor="middle">paper</text>
    <path className="y5v-ink-thin" d="M92 92 L150 92" />
  </Fig>;
}

const FIGURES = {
  scene: (v) => <Scene {...v} />,
  orbit: (v) => <Orbit {...v} />,
  solarSystem: (v) => <SolarSystem {...v} />,
  moonPhases: (v) => <MoonPhases {...v} />,
  dayNight: (v) => <DayNight {...v} />,
  forces: (v) => <Forces {...v} />,
  lever: (v) => <Lever {...v} />,
  pulley: (v) => <Pulley {...v} />,
  gears: (v) => <Gears {...v} />,
  cups: (v) => <Cups {...v} />,
  ramp: (v) => <Ramp {...v} />,
  balloon: (v) => <Balloon {...v} />,
  filter: (v) => <Filter {...v} />,
  counters: (v) => <Counters {...v} />,
};

/**
 * The picture for a Year 5 Science question: `question.visual` is `{ type, ...params }`.
 * A supplied results table (`question.table`) and the Year 4 figures are drawn by Year4ScienceVisual.
 * Returns null when there is nothing to draw.
 */
export default function Year5ScienceVisual({ question }) {
  const v = question?.visual;
  const draw = v && Object.hasOwn(FIGURES, v.type) ? FIGURES[v.type] : null;
  const old = question?.table || (v && !draw);
  if (!draw && !old) return null;
  return <Root name="y5-sci-visual">
    {old && <Year4ScienceVisual question={question} />}
    {draw && draw(v)}
  </Root>;
}
