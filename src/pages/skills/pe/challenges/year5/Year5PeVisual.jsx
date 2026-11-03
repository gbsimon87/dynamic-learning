import { YEAR5_PE_VISUAL_TYPES } from "../../../../../data/challenges/year5Pe/visualTypes.js";
import { Arrow, BlocksFigure, Chip, Figure, PictogramFigure, Stick, Txt } from "../../../creative/figureKit.jsx";
import "./Year5PeVisual.css";

// eslint-disable-next-line react-refresh/only-export-components -- the coordinator imports VISUAL_TYPES by name
export const VISUAL_TYPES = YEAR5_PE_VISUAL_TYPES;
const ROOT = "y5-pe-visual";

// ---- Pitches and courts ---------------------------------------------------------------
// Positions are 0-100 across and down the playing area, which sits at x 20-380, y 30-210.
const X0 = 20, Y0 = 30, W = 360, H = 180;
const at = ([x, y]) => [X0 + (x / 100) * W, Y0 + (y / 100) * H];
const line = "ln s-ink";

function Markings({ sport }) {
  const cx = X0 + W / 2, cy = Y0 + H / 2;
  switch (sport) {
    case "football": return <g className="nofill">
      <rect className="f-grass k" x={X0} y={Y0} width={W} height={H} />
      <line className={line} x1={cx} y1={Y0} x2={cx} y2={Y0 + H} /><circle className={line} cx={cx} cy={cy} r="24" />
      {[0, 1].map((s) => { const x = s ? X0 + W : X0, d = s ? -1 : 1; return <g key={s}>
        <rect className={line} x={s ? x - 56 : x} y="77" width="56" height="106" /><rect className={line} x={s ? x - 19 : x} y="105" width="19" height="50" />
        <rect className="paper k" x={s ? x : x - 10} y="108" width="10" height="44" /><circle className="ink" cx={x + d * 38} cy={cy} r="2.5" /></g>; })}
    </g>;
    case "netball": return <g className="nofill">
      <rect className="f-sand k" x={X0} y={Y0} width={W} height={H} />
      <line className={line} x1={X0 + 120} y1={Y0} x2={X0 + 120} y2={Y0 + H} /><line className={line} x1={X0 + 240} y1={Y0} x2={X0 + 240} y2={Y0 + H} /><circle className={line} cx={cx} cy={cy} r="9" />
      <path className={`${line} f-roof`} style={{ fillOpacity: 0.18 }} d={`M${X0} ${cy - 56} A56 56 0 0 1 ${X0} ${cy + 56}Z`} /><path className={`${line} f-roof`} style={{ fillOpacity: 0.18 }} d={`M${X0 + W} ${cy - 56} A56 56 0 0 0 ${X0 + W} ${cy + 56}Z`} />
      {[X0, X0 + W].map((x) => <circle key={x} className="f-sun k" cx={x} cy={cy} r="5" />)}
    </g>;
    case "basketball": return <g className="nofill">
      <rect className="f-wall2 k" x={X0} y={Y0} width={W} height={H} />
      <line className={line} x1={cx} y1={Y0} x2={cx} y2={Y0 + H} /><circle className={line} cx={cx} cy={cy} r="22" />
      {[0, 1].map((s) => { const x = s ? X0 + W : X0, d = s ? -1 : 1; return <g key={s}>
        <rect className={line} x={s ? x - 72 : x} y={cy - 30} width="72" height="60" /><path className={line} d={`M${x} ${cy - 84} H${x + d * 20} A90 90 0 0 ${s ? 0 : 1} ${x + d * 20} ${cy + 84} H${x}`} />
        <circle className="f-roof k" cx={x + d * 20} cy={cy} r="5" /></g>; })}
    </g>;
    case "tennis": return <g className="nofill">
      <rect className="f-sea k" x={X0} y={Y0} width={W} height={H} /><rect className={line} x={X0} y={Y0 + 22} width={W} height={H - 44} />
      <line className={line} x1={cx - 97} y1={Y0 + 22} x2={cx - 97} y2={Y0 + H - 22} /><line className={line} x1={cx + 97} y1={Y0 + 22} x2={cx + 97} y2={Y0 + H - 22} /><line className={line} x1={cx - 97} y1={cy} x2={cx + 97} y2={cy} />
      <line className="ln5 s-ink" x1={cx} y1={Y0 - 6} x2={cx} y2={Y0 + H + 6} style={{ strokeDasharray: "3 4" }} />
    </g>;
    case "badminton": return <g className="nofill">
      <rect className="f-leaf k" x={X0} y={Y0} width={W} height={H} /><rect className={line} x={X0} y={Y0 + 14} width={W} height={H - 28} /><rect className={line} x={X0} y={Y0 + 25} width={W} height={H - 50} />
      <line className={line} x1={cx - 54} y1={Y0 + 14} x2={cx - 54} y2={Y0 + H - 14} /><line className={line} x1={cx + 54} y1={Y0 + 14} x2={cx + 54} y2={Y0 + H - 14} />
      <line className={line} x1={X0} y1={cy} x2={cx - 54} y2={cy} /><line className={line} x1={cx + 54} y1={cy} x2={X0 + W} y2={cy} />
      <line className="ln5 s-ink" x1={cx} y1={Y0 - 6} x2={cx} y2={Y0 + H + 6} style={{ strokeDasharray: "3 4" }} />
    </g>;
    case "cricket": return <g className="nofill">
      <ellipse className="f-grass k" cx={cx} cy={cy} rx="176" ry="92" /><ellipse className="ln s-ink dash" cx={cx} cy={cy} rx="170" ry="87" />
      <rect className="f-sand k" x={cx - 26} y={cy - 8} width="52" height="16" />
      {[cx - 26, cx + 26].map((x) => [-4, 0, 4].map((d) => <line key={`${x}${d}`} className="ln s-ink" style={{ strokeWidth: 2 }} x1={x} y1={cy + d - 1.5} x2={x} y2={cy + d + 1.5} />))}
    </g>;
    default: return <g className="nofill">
      <rect className="f-grass k" x={X0} y={Y0} width={W} height={H} />
      <path className="ln s-ink dash" d={`M${cx} ${Y0 + 162} L${X0 + 300} ${cy + 10} L${cx} ${Y0 + 24} L${X0 + 60} ${cy + 10}Z`} />
      {[[cx, Y0 + 162], [X0 + 300, cy + 10], [cx, Y0 + 24], [X0 + 60, cy + 10]].map(([x, y], i) => <g key={i}><rect className="f-roof k" x={x - 4} y={y - 15} width="8" height="26" rx="2" /></g>)}
      <rect className="f-sand k" x={cx - 11} y={Y0 + 150} width="22" height="22" /><rect className="f-sand k" x={cx - 9} y={cy - 9} width="18" height="18" />
    </g>;
  }
}

const SPORT_NAME = { football: "football pitch", netball: "netball court", basketball: "basketball court", tennis: "tennis court", badminton: "badminton court", cricket: "cricket field", rounders: "rounders field" };

function Dot({ p }) {
  const [x, y] = at(p.at), team = p.team ?? "a", t = p.t ?? "", w = Math.max(32, t.length * 11 + 14);
  return <g>
    <rect className="paper" x={x - w / 2} y={y - 16} width={w} height="32" rx={team === "a" ? 16 : 7} style={{ stroke: team === "a" ? "var(--v-roof)" : "var(--v-roof2)", strokeWidth: 4 }} />
    <text x={x} y={y + 6} textAnchor="middle" className="v-t v-b">{t}</text>
  </g>;
}

function Pitch({ v }) {
  const players = v.players ?? [];
  const desc = players.length ? ` Players: ${players.map((p) => `${p.name ?? p.t}`).join(", ")}.` : "";
  return <Figure root={ROOT} label={`A top-down drawing of a ${SPORT_NAME[v.sport]}.${desc}${v.alt ? ` ${v.alt}` : ""}`} caption={v.caption}>
    <Markings sport={v.sport} />
    {(v.arrows ?? []).map((a, i) => { const [x1, y1] = at(a.from), [x2, y2] = at(a.to); return <Arrow key={i} x1={x1} y1={y1} x2={x2} y2={y2} cls={a.kind === "pass" ? "ln dash s-roof" : "ln s-roof"} />; })}
    {players.map((p, i) => <Dot key={i} p={p} />)}
    {(v.ball ? [v.ball] : []).map((b, i) => { const [x, y] = at(b); return <circle key={i} className="f-foam k" cx={x} cy={y} r="7" />; })}
    {(v.labels ?? []).map((l, i) => { const [x, y] = at(l.at); return <Chip key={i} x={x} y={y} w={l.text.length * 10.4 + 20}>{l.text}</Chip>; })}
  </Figure>;
}

// ---- Athletics ---------------------------------------------------------------------------
function Athletics({ v }) {
  if (v.kind === "pit") {
    return <Figure root={ROOT} label="A long jump runway leading to a sand pit. An athlete runs up and jumps into the sand." caption={v.caption}>
      <rect className="f-grass" x="2" y="2" width="396" height="236" rx="16" /><rect className="f-road k" x="20" y="96" width="230" height="48" style={{ fill: "var(--v-stonedark)" }} /><rect className="paper k" x="238" y="96" width="14" height="48" />
      <rect className="f-sand k" x="252" y="86" width="128" height="68" rx="6" /><Stick x={190} y={142} s={0.8} pose="jog" cls="ln s-foam" /><path className="ln s-ink dash nofill" d="M232 70 Q290 20 340 70" /><Arrow x1={320} y1={56} x2={346} y2={80} cls="ln1" head={8} />
    </Figure>;
  }
  if (v.kind === "relay") {
    return <Figure root={ROOT} label="A running track with two lanes. A runner in each lane meets in a marked zone, and the first runner passes a baton to the second." caption={v.caption}>
      <rect className="f-roof" x="2" y="40" width="396" height="150" rx="14" opacity=".6" />
      {[0, 1, 2].map((i) => <line key={i} className="ln s-foam" x1="2" y1={65 + i * 50} x2="398" y2={65 + i * 50} style={{ strokeWidth: 3 }} />)}
      <rect className="f-sun" x="150" y="65" width="100" height="100" opacity=".5" /><rect className="nofill s-ink dash" x="150" y="65" width="100" height="100" style={{ strokeWidth: 2 }} />
      <Stick x={170} y={112} s={0.6} pose="jog" cls="ln s-ink" /><Stick x={236} y={162} s={0.6} pose="jog" cls="ln s-ink" />
      <rect className="f-sun k" x="196" y="116" width="26" height="7" rx="3" transform="rotate(-20 209 120)" />
      <Chip x={200} y={214} w={170}>Passing zone</Chip>
    </Figure>;
  }
  return <Figure root={ROOT} h={250} label="Track events and field events. Track: four runners in lanes racing to the finish line. Field: a sand pit for jumping and a circle and arc for throwing." caption="The best time wins a track event. The best distance or height wins a field event.">
    <Txt x={12} y={26} anchor="start" bold>Track events: races</Txt>
    <rect className="f-roof" x="12" y="36" width="376" height="76" rx="8" opacity=".6" />{[0, 1, 2, 3].map((i) => <line key={i} className="ln s-foam" x1="12" y1={36 + i * 19} x2="388" y2={36 + i * 19} style={{ strokeWidth: 2 }} />)}
    {[0, 1, 2, 3].map((i) => <circle key={i} className="paper k" cx={230 + i * 18 - (i % 2) * 40} cy={45 + i * 19} r="7" />)}
    {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => <rect key={i} className={i % 2 ? "ink" : "paper"} x="364" y={36 + i * 9.5} width="10" height="9.5" />)}
    <Txt x={12} y={146} anchor="start" bold>Field events: jumps and throws</Txt>
    <rect className="f-grass" x="12" y="156" width="376" height="82" rx="8" /><rect className="f-sand k" x="30" y="176" width="100" height="40" rx="4" />
    <circle className="paper k" cx="250" cy="200" r="16" /><path className="ln s-ink dash nofill" d="M250 200 L350 160 M250 200 L350 240" /><circle className="f-stonedark k" cx="256" cy="194" r="6" />
  </Figure>;
}

// ---- Times and distances ------------------------------------------------------------------
function Measure() {
  return <Figure root={ROOT} label="A stopwatch for timing races in seconds, where the smallest time wins, and a tape measure for jumps and throws in metres and centimetres, where the greatest distance wins." caption="Races are timed. Jumps and throws are measured.">
    <circle className="f-stone k" cx="96" cy="108" r="62" /><circle className="paper k" cx="96" cy="108" r="52" /><rect className="f-stone k" x="86" y="34" width="20" height="12" rx="3" />
    {Array.from({ length: 12 }, (_, i) => <line key={i} className="ln s-ink" x1={96 + 44 * Math.sin((i * Math.PI) / 6)} y1={108 - 44 * Math.cos((i * Math.PI) / 6)} x2={96 + 51 * Math.sin((i * Math.PI) / 6)} y2={108 - 51 * Math.cos((i * Math.PI) / 6)} style={{ strokeWidth: i % 3 ? 2 : 4 }} />)}
    <path className="ln s-roof nofill" d="M96 108 L120 80" style={{ strokeWidth: 4 }} /><circle className="ink" cx="96" cy="108" r="5" />
    <Txt x={96} y={202} bold>seconds</Txt><Txt x={96} y={224}>smallest time wins</Txt>
    <rect className="f-sun k" x="190" y="76" width="196" height="40" rx="6" />{Array.from({ length: 18 }, (_, i) => <line key={i} className="ln s-ink" x1={202 + i * 10.4} y1="76" x2={202 + i * 10.4} y2={i % 5 === 0 ? 100 : 90} style={{ strokeWidth: 1.6 }} />)}
    <Txt x={288} y={160} bold>metres and centimetres</Txt><Txt x={288} y={184}>greatest distance wins</Txt>
  </Figure>;
}

function Bars({ v }) {
  const max = Math.max(...v.rows.map((r) => r.value)), step = Math.min(50, 190 / v.rows.length);
  return <Figure root={ROOT} label={`A bar chart in ${v.unit}: ${v.rows.map((r) => `${r.label}, ${r.value}`).join("; ")}.`} caption={`Bars show ${v.unit}.`}>
    {v.rows.map((r, i) => {
      const y = 22 + i * step, w = (r.value / max) * 190;
      return <g key={r.label}><Txt x={12} y={y + 22} anchor="start" bold>{r.label}</Txt>
        <rect className={`f-${["sea", "sun", "leaf", "roof"][i % 4]} k`} x="132" y={y + 4} width={w} height={step - 12} rx="6" />
        <Txt x={132 + w + 8} y={y + 22} anchor="start" bold>{r.value}</Txt></g>;
    })}
    <Txt x={200} y={228}>{v.unit}</Txt>
  </Figure>;
}

// ---- Stick figures --------------------------------------------------------------------------
function Poses({ v }) {
  const items = v.items, n = items.length;
  if (v.row) {
    return <Figure root={ROOT} h={214} label={v.alt} caption={v.caption}>
      {items.map((it, i) => <Stick key={i} x={n === 1 ? 200 : 60 + i * (280 / (n - 1))} y={176} s={1.5} pose={it.pose} cls="ln s-ink" />)}
      <line className="ln1 s-mute" x1="20" y1="182" x2="380" y2="182" />
    </Figure>;
  }
  const four = n === 4, w = four ? 188 : n === 2 ? 192 : 124;
  return <Figure root={ROOT} h={four ? 244 : 214} label={v.alt} caption={v.caption}>
    {items.map((it, i) => {
      const X = four ? 6 + (i % 2) * 196 : 4 + i * (w + 8), Y = four ? 8 + Math.floor(i / 2) * 118 : 8, h = four ? 110 : 198;
      const fx = four ? X + 44 : X + w / 2, fy = four ? Y + 98 : Y + 112;
      return <g key={i}><rect className="soft k1" x={X} y={Y} width={w} height={h} rx="12" />
        <Stick x={fx} y={fy} s={four ? 0.8 : 1} pose={it.pose} cls="ln s-ink" />
        {it.ball && <circle className="f-autumn k" cx={fx + it.ball[0]} cy={fy + it.ball[1]} r="9" />}
        {it.lines.map((l, k) => <Txt key={l} x={four ? X + 98 : X + w / 2} y={four ? Y + 34 + k * 22 : Y + 144 + k * 22} anchor={four ? "start" : "middle"} bold={k === 0}>{l}</Txt>)}</g>;
    })}
  </Figure>;
}

// ---- Orienteering ----------------------------------------------------------------------------
const DIRS = { N: [0, -1], E: [1, 0], S: [0, 1], W: [-1, 0] };
function Compass({ cx = 200, cy = 118, r = 74, show = [], facing }) {
  return <g>
    <circle className="f-wall k" cx={cx} cy={cy} r={r} /><circle className="nofill k1" cx={cx} cy={cy} r={r - 10} />
    <path className="f-roof k" d={`M${cx} ${cy - r + 12} L${cx - 12} ${cy} L${cx + 12} ${cy}Z`} /><path className="paper k" d={`M${cx} ${cy + r - 12} L${cx - 12} ${cy} L${cx + 12} ${cy}Z`} />
    {["N", "E", "S", "W"].map((d) => show.includes(d) && <Txt key={d} x={cx + DIRS[d][0] * (r + 16)} y={cy + DIRS[d][1] * (r + 16) + 6} bold>{d}</Txt>)}
    {facing && <Arrow x1={cx} y1={cy} x2={cx + DIRS[facing][0] * (r - 14)} y2={cy + DIRS[facing][1] * (r - 14)} cls="ln5 s-roof2" head={12} />}
  </g>;
}

function Orienteering({ v }) {
  if (v.kind === "compass") {
    return <Figure root={ROOT} h={250} label={`A compass rose${v.show.length ? ` with ${v.show.join(" and ")} marked` : ""}. A person faces ${v.facing} and the arrow shows the way they face.`} caption={v.caption}>
      <Compass cy={128} show={v.show} facing={v.facing} />
    </Figure>;
  }
  const steep = v.kind === "steep", water = v.kind === "water";
  return <Figure root={ROOT} label={v.alt ?? "An orienteering map with a start triangle, controls joined by a purple line, a blue pond and contour lines for a hill, and a compass pointing north."} caption={v.caption}>
    <rect className="f-sun k" x="14" y="14" width="372" height="212" rx="10" opacity=".55" />
    {!steep && !water && <g>
      <ellipse className="f-sea k" cx="118" cy="168" rx="50" ry="28" /><path className="f-leaf" d="M250 150 q30 -30 70 -10 q20 30 -20 50 q-40 4 -50 -40Z" opacity=".7" />
    </g>}
    {water && <ellipse className="f-sea k" cx="200" cy="120" rx="120" ry="70" />}
    {steep ? [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => <ellipse key={i} className="nofill s-trunk" cx="200" cy="120" rx={160 - i * 13} ry={90 - i * 7} style={{ strokeWidth: 2 }} />)
      : water ? null : <g className="nofill s-trunk">{[0, 1, 2].map((i) => <ellipse key={i} className="nofill s-trunk" cx="280" cy="76" rx={60 - i * 18} ry={34 - i * 10} style={{ strokeWidth: 2 }} />)}</g>}
    {!steep && !water && <g>
      <path className="ln s-door nofill" d="M50 70 L160 100 L250 190 L350 190" style={{ strokeWidth: 3 }} />
      <path className="f-door k" d="M50 56 L62 78 H38Z" />
      {[[160, 100, 1], [250, 190, 2], [350, 190, 3]].map(([x, y, n]) => <g key={n}><circle className="nofill s-door" cx={x} cy={y} r="14" style={{ strokeWidth: 3 }} /><text x={x + 22} y={y - 10} className="v-t v-b" textAnchor="middle">{n}</text></g>)}
      <g transform="translate(350 50)"><Arrow x1={0} y1={22} x2={0} y2={-14} cls="ln5 s-roof" head={11} /><Txt x={0} y={-22} bold>N</Txt></g>
    </g>}
  </Figure>;
}

// ---- Water ---------------------------------------------------------------------------------------
function Water({ v }) {
  if (v.kind === "code") {
    const cells = [["Stop and", "think"], ["Stay", "together"], ["Float", "to live"], ["Call", "999"]];
    return <Figure root={ROOT} h={244} label="The Water Safety Code in four pictures: Stop and think, with a hand held up. Stay together, with two people holding hands. Float to live, with a person floating on their back. Call 999, with a phone." caption="Learn the code and remember it near water.">
      {cells.map((c, i) => {
        const X = 6 + (i % 2) * 196, Y = 8 + Math.floor(i / 2) * 118;
        return <g key={i}><rect className="soft k1" x={X} y={Y} width="188" height="110" rx="12" />
          {i === 0 && <g><path className="f-roof k" d="M40 40 L58 30 H80 L98 40 V62 L80 72 H58 L40 62Z" /><rect className="paper" x="48" y="48" width="42" height="10" rx="3" /></g>}
          {i === 1 && <g><Stick x={X + 30} y={Y + 94} s={0.8} pose={{ armL: [-20, -10], armR: [75, 85], legL: [-4, 0], legR: [4, 0] }} cls="ln s-ink" /><Stick x={X + 64} y={Y + 94} s={0.8} pose={{ armL: [-75, -85], armR: [20, 10], legL: [-4, 0], legR: [4, 0] }} cls="ln s-ink" /></g>}
          {i === 2 && <g><rect className="f-sea k1" x={X + 8} y={Y + 56} width="76" height="38" rx="6" /><ellipse className="f-wall k" cx={X + 46} cy={Y + 58} rx="26" ry="7" /><circle className="f-wall k" cx={X + 22} cy={Y + 56} r="7" /></g>}
          {i === 3 && <g><rect className="f-stonedark k" x={X + 28} y={Y + 18} width="40" height="74" rx="8" /><rect className="f-window k1" x={X + 33} y={Y + 26} width="30" height="40" rx="3" /></g>}
          {c.map((l, k) => <Txt key={l} x={X + 104} y={Y + 44 + k * 22} anchor="start" bold>{l}</Txt>)}</g>;
      })}
    </Figure>;
  }
  const scene = { river: "A person has fallen into a river and is in the water, with the bank behind them.", pond: "A child stands on the bank of a deep pond. A toy floats out in the middle of the water.", lake: "A friend is in the water of a lake with one arm up, struggling, while another child watches from the bank." }[v.kind];
  return <Figure root={ROOT} label={scene} caption={v.caption}>
    <rect className="f-sky" x="2" y="2" width="396" height="236" rx="16" /><rect className="f-grass" x="2" y="140" width="396" height="12" /><rect className="f-sea" x="2" y="152" width="396" height="86" />
    <path className="ln s-foam nofill" d="M20 178 q12 -8 24 0 t24 0 M240 200 q12 -8 24 0 t24 0 M120 214 q12 -8 24 0 t24 0" style={{ strokeWidth: 3, opacity: 0.8 }} />
    {v.kind === "pond" && <><Stick x={60} y={142} s={0.9} pose="stand" cls="ln s-ink" /><circle className="f-sun k" cx="240" cy="176" r="12" /></>}
    {v.kind === "river" && <><circle className="f-wall2 k" cx="200" cy="168" r="11" /><path className="ln s-ink nofill" d="M200 180 L176 160 M200 180 L224 160" style={{ strokeWidth: 4 }} /></>}
    {v.kind === "lake" && <><Stick x={70} y={142} s={0.9} pose="stand" cls="ln s-ink" /><circle className="f-wall2 k" cx="250" cy="170" r="11" /><path className="ln s-ink nofill" d="M250 182 L226 160 M250 182 L274 134" style={{ strokeWidth: 4 }} /></>}
  </Figure>;
}

// ---- Fitness and fair play -----------------------------------------------------------------------
function Heart({ x, y, s = 1, cls = "f-roof" }) { return <path className={`${cls} k`} transform={`translate(${x} ${y}) scale(${s})`} d="M0 18 C-30 -4 -18 -26 0 -12 C18 -26 30 -4 0 18Z" />; }
function Fitness() {
  const cells = [["Warm-up", ["gets your", "body ready"]], ["Heart", ["beats faster", "when you", "exercise"]], ["Cool-down", ["helps you", "recover"]]];
  return <Figure root={ROOT} h={214} label="Three pictures. Warm-up: a person jogging gently, which gets the body ready. Heart: a heart that beats faster when you exercise. Cool-down: a person stretching, which helps the body recover." caption="Warm up, exercise, then cool down.">
    {cells.map(([name, lines], i) => <g key={name}>
      <rect className="soft k1" x={4 + i * 132} y="8" width="124" height="198" rx="12" />
      {i === 0 && <Stick x={66} y={108} s={1.2} pose="jog" cls="ln s-ink" />}
      {i === 1 && <g><Heart x={198} y={60} s={1.2} /><path className="ln s-ink nofill" d="M156 102 l10 0 l5 -12 l8 24 l7 -12 l10 0 l5 -8 l7 16 l6 -8 l12 0" style={{ strokeWidth: 2.5 }} /></g>}
      {i === 2 && <Stick x={330} y={108} s={1.2} pose="sideStretch" cls="ln s-ink" />}
      <Txt x={66 + i * 132} y={138} bold>{name}</Txt>{lines.map((l, k) => <Txt key={l} x={66 + i * 132} y={160 + k * 20}>{l}</Txt>)}
    </g>)}
  </Figure>;
}

function FairPlay() {
  return <Figure root={ROOT} h={244} label="Four pictures about fair play. Follow the rules, shown by a rule book with a tick. Respect others, shown by two people shaking hands. Be honest, shown by a speech bubble. Personal best, shown by three bars where the tallest has a flag." caption="Fair play is following the rules, respecting others and being honest.">
    {[0, 1, 2, 3].map((i) => <rect key={i} className="soft k1" x={6 + (i % 2) * 196} y={8 + Math.floor(i / 2) * 118} width="188" height="110" rx="12" />)}
    <g><rect className="f-roof2 k" x="22" y="26" width="46" height="60" rx="4" /><path className="ln s-foam nofill" d="M32 56 l8 9 l16 -20" style={{ strokeWidth: 4 }} /></g>
    <Txt x={80} y={52} anchor="start" bold>Follow</Txt><Txt x={80} y={72} anchor="start" bold>the rules</Txt>
    <g><Stick x={236} y={94} s={0.8} pose={{ armL: [-20, -10], armR: [75, 85], legL: [-4, 0], legR: [4, 0] }} cls="ln s-ink" /><Stick x={266} y={94} s={0.8} pose={{ armL: [-75, -85], armR: [20, 10], legL: [-4, 0], legR: [4, 0] }} cls="ln s-ink" /></g>
    <Txt x={284} y={46} anchor="start" bold>Respect</Txt><Txt x={284} y={66} anchor="start" bold>others</Txt>
    <g><path className="paper k" d="M22 140 h150 v38 h-108 l-12 14 v-14 h-30Z" /><text x="97" y="166" textAnchor="middle" className="v-t v-b">It was out!</text></g>
    <Txt x={97} y={218} bold>Be honest</Txt>
    {[34, 52, 74].map((h, i) => <rect key={i} className={`f-${["sea", "sun", "leaf"][i]} k`} x={222 + i * 26} y={226 - h} width="20" height={h} />)}
    <path className="ln s-roof nofill" d="M284 152 v-16" style={{ strokeWidth: 3 }} /><path className="f-roof k" d="M284 134 l16 6 l-16 6Z" />
    <Txt x={306} y={176} anchor="start" bold>Personal</Txt><Txt x={306} y={196} anchor="start" bold>best</Txt>
  </Figure>;
}

const DRAW = { pitch: Pitch, athletics: Athletics, measure: Measure, bars: Bars, poses: Poses, orienteering: Orienteering, water: Water, fitness: Fitness, fairplay: FairPlay,
  blocks: ({ v }) => <BlocksFigure root={ROOT} v={v} />, pictogram: ({ v }) => <PictogramFigure root={ROOT} v={v} /> };

export default function Year5PeVisual({ question }) {
  const v = question?.visual;
  const Draw = v && DRAW[v.type];
  return Draw ? <Draw v={v} /> : null;
}
