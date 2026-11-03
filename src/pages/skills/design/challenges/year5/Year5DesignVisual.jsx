import { YEAR5_DESIGN_VISUAL_TYPES } from "../../../../../data/challenges/year5Design/visualTypes.js";
import { Arrow, BlocksFigure, Chip, Figure, PictogramFigure, Txt } from "../../../creative/figureKit.jsx";
import { PICTURES } from "./Year5DesignPictures.jsx";
import "./Year5DesignVisual.css";

// eslint-disable-next-line react-refresh/only-export-components -- the coordinator imports VISUAL_TYPES by name
export const VISUAL_TYPES = YEAR5_DESIGN_VISUAL_TYPES;
const ROOT = "y5-design-visual";
const TONES = ["sea", "leaf", "sun", "roof", "door"];

// ---- Lists and flows ------------------------------------------------------------------
function Clipboard({ v }) {
  return <Figure root={ROOT} label={`A clipboard titled ${v.title} with a ticked checklist: ${v.items.join("; ")}.`} caption={v.caption}>
    <rect className="f-wall2 k" x="50" y="14" width="300" height="218" rx="14" /><rect className="paper k1" x="62" y="40" width="276" height="180" rx="6" />
    <rect className="f-stone k" x="160" y="6" width="80" height="24" rx="8" />
    <Txt x={200} y={62} bold>{v.title}</Txt>
    {v.items.map((item, i) => <g key={item}>
      <rect className="paper k" x="74" y={74 + i * 28} width="20" height="20" rx="4" /><path className="ln s-leafdark nofill" d={`M78 ${84 + i * 28} l5 6 l9 -12`} style={{ strokeWidth: 3 }} />
      <Txt x={104} y={91 + i * 28} anchor="start">{item}</Txt>
    </g>)}
  </Figure>;
}

function Flow({ v }) {
  const n = v.steps.length, w = Math.min(120, (372 - (n - 1) * 20) / n), x0 = 200 - (n * w + (n - 1) * 20) / 2;
  return <Figure root={ROOT} label={`Steps in order: ${v.steps.map((s) => s.join(" ")).join(", then ")}.`} caption={v.caption}>
    {v.steps.map((lines, i) => <g key={i}>
      <rect className={`f-${TONES[i % 5]} k`} x={x0 + i * (w + 20)} y="50" width={w} height="124" rx="14" />
      {i > 0 && <Arrow x1={x0 + i * (w + 20) - 18} y1={112} x2={x0 + i * (w + 20) - 2} y2={112} cls="ln" head={7} />}
      <rect className="paper" x={x0 + i * (w + 20) + 5} y="56" width={w - 10} height="112" rx="10" opacity=".92" />
      {lines.map((l, k) => <Txt key={l} x={x0 + i * (w + 20) + w / 2} y={112 + (k - (lines.length - 1) / 2) * 22 + 6} bold={k === 0}>{l}</Txt>)}
    </g>)}
    <Txt x={200} y={214} bold>{v.footer ?? ""}</Txt>
  </Figure>;
}

function Control({ v }) {
  if (v.kind === "if") {
    return <Figure root={ROOT} label={`A decision diagram: if ${v.cond.join(" ")}, then ${v.yes.join(" ")}. Otherwise, carry on.`} caption={v.caption}>
      <path className="f-sun k" d="M110 50 L200 120 L110 190 L20 120Z" />
      {v.cond.map((l, k) => <Txt key={l} x={110} y={116 + k * 20} bold cls="v-on">{l}</Txt>)}
      <Arrow x1={202} y1={120} x2={262} y2={120} cls="ln" /><Chip x={232} y={104} w={52}>yes</Chip>
      <rect className="f-leaf k" x="266" y="84" width="122" height="72" rx="14" />{v.yes.map((l, k) => <Txt key={l} x={327} y={116 + k * 20} bold cls="v-on">{l}</Txt>)}
      <Arrow x1={110} y1={192} x2={110} y2={226} cls="ln" /><Chip x={150} y={212} w={44}>no</Chip>
    </Figure>;
  }
  if (v.kind === "loop") {
    return <Figure root={ROOT} label={`A loop: ${v.action} is repeated ${v.times} times, drawn as an arrow that goes back to the start.`} caption={v.caption}>
      <rect className="f-sea k" x="130" y="90" width="140" height="64" rx="14" /><Txt x={200} y={129} bold cls="v-on">{v.action}</Txt>
      <path className="ln nofill s-ink" d="M270 122 H310 V50 H90 V122 H130" /><path className="ln nofill s-ink" d="M122 114 L130 122 L122 130" />
      <Chip x={200} y={36} w={170}>{`repeat ${v.times} times`}</Chip>
    </Figure>;
  }
  const ex = v.examples;
  const cols = [["Input", ex ? ["sensor", "reading"] : []], ["Process", ex ? ["the", "program"] : []], ["Output", ex ? ["light,", "buzzer or", "motor"] : []]];
  return <Figure root={ROOT} label={`A control system with three steps in order: input${ex ? ", a sensor reading" : ""}, process${ex ? ", the program" : ""}, output${ex ? ", such as a light, buzzer or motor" : ""}.`} caption={v.caption}>
    {cols.map(([name, lines], i) => <g key={name}>
      <rect className={`f-${["sea", "sun", "leaf"][i]} k`} x={12 + i * 132} y="60" width="112" height="110" rx="14" />
      {i > 0 && <Arrow x1={12 + i * 132 - 18} y1={115} x2={12 + i * 132 - 2} y2={115} cls="ln" head={7} />}
      <Chip x={68 + i * 132} y={92} w={92}>{name}</Chip>
      {lines.map((l, k) => <text key={l} x={68 + i * 132} y={124 + k * 20} textAnchor="middle" className="v-t v-on">{l}</text>)}
    </g>)}
  </Figure>;
}

// ---- Mechanisms --------------------------------------------------------------------------
function Lever({ v }) {
  if (v.kind === "seesaw") {
    return <Figure root={ROOT} label={`A seesaw ${v.length} long, balanced on a pivot in the middle with a child at each end.`} caption={v.caption}>
      <path className="f-stone k" d="M200 150 L176 200 H224Z" /><path className="f-wall2 k" d="M40 130 L360 130 V144 H40Z" />
      <Arrow x1={44} y1={96} x2={356} y2={96} cls="ln1" head={7} /><Arrow x1={356} y1={96} x2={44} y2={96} cls="ln1" head={7} /><Chip x={200} y={82} w={70}>{v.length}</Chip>
      {[70, 330].map((x) => <g key={x}><circle className="f-wall k" cx={x} cy="94" r="0" /><circle className="f-roof k" cx={x} cy="102" r="12" /><rect className="f-roof k" x={x - 9} y="112" width="18" height="18" /></g>)}
    </Figure>;
  }
  return <Figure root={ROOT} label="A lever: a bar resting on a pivot. The load sits on the left end, the pivot is the point it turns around, and you push down on the effort on the right end." caption="A lever turns around a pivot.">
    <path className="f-stone k" d="M170 150 L146 202 H194Z" /><path className="f-wall2 k" d="M30 134 L330 108 V122 L30 148Z" />
    <rect className="f-roof2 k" x="38" y="86" width="52" height="50" rx="4" />
    <Arrow x1={310} y1={46} x2={310} y2={100} cls="ln5" head={11} />
    <Chip x={64} y={70} w={66}>Load</Chip><Chip x={170} y={226} w={72}>Pivot</Chip><Chip x={310} y={28} w={86}>Effort</Chip>
  </Figure>;
}

function GearsFig({ v }) {
  const [a, b] = v.teeth, r = (t) => 10 + t * 1.2, ra = r(a), rb = r(b), total = 2 * ra + 2 * rb, x1 = 200 - total / 2 + ra, x2 = x1 + ra + rb, y = 110;
  const gear = (cx, rad, t, cls) => <g>
    {Array.from({ length: t }, (_, i) => <rect key={i} className={`${cls} kk`} x={cx - Math.max(1.4, (Math.PI * rad) / t / 2)} y={y - rad - 4.5} width={Math.max(2.8, (Math.PI * rad) / t)} height="6" transform={`rotate(${(360 / t) * i + (cx === x2 ? 180 / t : 0)} ${cx} ${y})`} />)}
    <circle className={`${cls} kk`} cx={cx} cy={y} r={rad} /><circle className="paper kk" cx={cx} cy={y} r={rad / 4} />
  </g>;
  return <Figure root={ROOT} label={`Two gears with their teeth meshed: a gear with ${a} teeth on the left and a gear with ${b} teeth on the right.`} caption={v.caption}>
    {gear(x1, ra, a, "f-sun")}{gear(x2, rb, b, "f-roof2")}
    <Chip x={x1} y={192} w={String(a).length * 10.4 + 82}>{`${a} teeth`}</Chip><Chip x={x2} y={222} w={String(b).length * 10.4 + 82}>{`${b} teeth`}</Chip>
  </Figure>;
}

// ---- Circuits ---------------------------------------------------------------------------------
function Bulb({ x }) { return <g><circle className="paper k" cx={x} cy="170" r="20" /><path className="ln s-ink nofill" d={`M${x - 8} 176 l4 -10 l4 8 l4 -10 l4 8`} style={{ strokeWidth: 2 }} /></g>; }
function Buzzer({ x }) { return <g><rect className="f-roof k" x={x - 22} y="154" width="44" height="32" rx="8" /><path className="ln s-ink nofill" d={`M${x - 8} 150 q8 -10 16 0 M${x - 14} 142 q14 -16 28 0`} style={{ strokeWidth: 2 }} /></g>; }
function Motor({ x }) { return <g><circle className="f-sea k" cx={x} cy="170" r="22" /><circle className="paper k1" cx={x} cy="170" r="12" /><text x={x} y="176" textAnchor="middle" className="v-t v-b">M</text></g>; }
const PART = { bulb: ["Bulb", Bulb], buzzer: ["Buzzer", Buzzer], motor: ["Motor", Motor] };

function Circuit({ v }) {
  const parts = v.parts ?? ["bulb"], n = parts.length, xs = parts.map((_, i) => (n === 1 ? 200 : 110 + (i * 180) / (n - 1)));
  const cells = v.cells ?? 1;
  const label = `A series circuit drawn as one loop: ${cells} cell${cells > 1 ? "s" : ""}${v.switch ? `, a switch that is ${v.switch}` : ""}, ${parts.join(" and ")}${v.gap ? ", and a gap in the wire on the left side" : ", all joined by wire with no gaps"}.`;
  return <Figure root={ROOT} label={label} caption={v.caption}>
    <path className="ln5 s-ink nofill" d="M50 112 V70 H150 M250 70 H350 V112 M350 128 V170 H50 V128" style={{ strokeWidth: 4 }} />
    {v.gap ? null : <path className="ln5 s-ink nofill" d="M50 112 V128" style={{ strokeWidth: 4 }} />}
    {v.gap && [112, 128].map((y) => <circle key={y} className="f-roof k" cx="50" cy={y} r="4" />)}
    {Array.from({ length: cells }, (_, i) => <g key={i} transform={`translate(${200 - (cells * 54) / 2 + i * 54 + 27} 70)`}><rect className="f-sun k" x="-24" y="-18" width="48" height="36" rx="6" /><text x="-12" y="6" textAnchor="middle" className="v-t v-b v-on">−</text><text x="12" y="6" textAnchor="middle" className="v-t v-b v-on">+</text></g>)}
    {v.switch && <g>
      <circle className="f-sun k" cx="350" cy="112" r="5" /><circle className="f-sun k" cx="350" cy="128" r="5" />
      <path className="ln s-ink nofill" d={v.switch === "closed" ? "M350 112 V128" : "M350 128 L378 106"} style={{ strokeWidth: 4 }} />
    </g>}
    {parts.map((p, i) => { const Part = PART[p][1]; return <Part key={`${p}${i}`} x={xs[i]} />; })}
    {v.labels && <g>
      <Txt x={200} y={30} bold>Cell</Txt>{v.switch && <Txt x={342} y={150} anchor="end" bold>Switch</Txt>}
      {parts.map((p, i) => <Txt key={`${p}${i}`} x={xs[i]} y={212} bold>{PART[p][0]}</Txt>)}
    </g>}
    {v.arrows && <g><Arrow x1={110} y1={70} x2={140} y2={70} cls="ln" head={8} /><Arrow x1={350} y1={150} x2={350} y2={170} cls="ln" head={8} /><Arrow x1={140} y1={170} x2={100} y2={170} cls="ln" head={8} /></g>}
  </Figure>;
}

// ---- Food -----------------------------------------------------------------------------------------
function Eatwell() {
  const groups = [["Fruit and", "vegetables", 140, "leaf"], ["Starchy", "foods", 128, "sun"], ["Beans, pulses,", "fish, eggs, meat", 46, "roof"], ["Dairy and", "alternatives", 32, "sea"], ["Oils and", "spreads", 14, "sand"]];
  const cx = 100, cy = 108, r = 78;
  const pt = (a, rad) => [cx + rad * Math.sin((a * Math.PI) / 180), cy - rad * Math.cos((a * Math.PI) / 180)];
  let at = 0;
  return <Figure root={ROOT} h={290} label="The Eatwell Guide as a plate split into five parts. Fruit and vegetables is the biggest part, then starchy foods, then beans, pulses, fish, eggs and meat, then dairy and alternatives, and a very small part for oils and spreads. Below it: fewer foods high in fat, salt and sugar." caption="Bigger slices mean eat more of that group.">
    {groups.map(([a, b, deg, tone], i) => {
      const a0 = at, a1 = at + deg; at = a1;
      const [x0, y0] = pt(a0, r), [x1, y1] = pt(a1, r), [mx, my] = pt((a0 + a1) / 2, i === 4 ? r + 14 : r * 0.62);
      return <g key={a}>
        <path className={`f-${tone} k`} d={`M${cx} ${cy} L${x0.toFixed(1)} ${y0.toFixed(1)} A${r} ${r} 0 ${deg > 180 ? 1 : 0} 1 ${x1.toFixed(1)} ${y1.toFixed(1)}Z`} />
        <circle className="paper k" cx={mx} cy={my} r="11" /><text x={mx} y={my + 6} textAnchor="middle" className="v-t v-b">{i + 1}</text>
        <circle className={`f-${tone} k`} cx="208" cy={30 + i * 46} r="13" /><text x="208" y={36 + i * 46} textAnchor="middle" className="v-t v-b v-on">{i + 1}</text>
        <Txt x={230} y={26 + i * 46} anchor="start" bold>{a}</Txt><Txt x={230} y={46 + i * 46} anchor="start">{b}</Txt>
      </g>;
    })}
    <Chip x={200} y={266} w={388}>Fewer foods high in fat, salt and sugar</Chip>
  </Figure>;
}

function SeasonIcon({ kind, x, y }) {
  const t = `translate(${x} ${y})`;
  switch (kind) {
    case "asparagus": return <g transform={t}>{[-8, 0, 8].map((d) => <g key={d}><rect className="f-leaf k1" x={d - 2.5} y="-12" width="5" height="26" rx="2" /><path className="f-leafdark" d={`M${d - 2.5} -12 l2.5 -6 l2.5 6Z`} /></g>)}</g>;
    case "strawberry": return <g transform={t}><path className="f-roof k" d="M-12 -8 Q0 20 12 -8Z" /><path className="f-leaf k1" d="M-8 -8 l8 -8 l8 8Z" /></g>;
    case "tomato": return <g transform={t}><circle className="f-roof k" cx="0" cy="0" r="13" /><path className="f-leaf k1" d="M-8 -10 l8 4 l8 -4 l-8 -6Z" /></g>;
    case "apple": return <g transform={t}><path className="f-leaf k" d="M0 -8 C-16 -14 -18 8 -8 14 C-3 17 3 17 8 14 C18 8 16 -14 0 -8Z" /><path className="ln s-trunk nofill" d="M0 -8 q2 -6 6 -8" style={{ strokeWidth: 2 }} /></g>;
    case "pumpkin": return <g transform={t}><ellipse className="f-autumn k" cx="0" cy="2" rx="16" ry="12" /><path className="ln1 s-ink nofill" d="M-6 -9 Q-10 2 -6 13 M6 -9 Q10 2 6 13" style={{ strokeWidth: 1.2 }} /><rect className="f-leafdark k1" x="-2" y="-14" width="4" height="6" /></g>;
    default: return <g transform={t}><rect className="paper k" x="-5" y="-4" width="10" height="20" rx="3" /><path className="f-leaf k" d="M-5 -4 L-10 -16 L0 -10 L10 -16 L5 -4Z" /></g>;
  }
}
function Seasons() {
  const seasons = [["Spring", "leaflight", [["asparagus", "asparagus"]]], ["Summer", "sun", [["strawberry", "strawberries"], ["tomato", "tomatoes"]]], ["Autumn", "autumn", [["apple", "apples"], ["pumpkin", "pumpkins"]]], ["Winter", "sky", [["leek", "leeks"]]]];
  return <Figure root={ROOT} label="Four seasons and UK foods that are ready to pick in each. Spring: asparagus. Summer: strawberries and tomatoes grown outdoors. Autumn: apples and pumpkins. Winter: leeks." caption="Seasonal food is ready to harvest at that time of year.">
    {seasons.map(([name, tone, foods], i) => {
      const X = 6 + (i % 2) * 196, Y = 8 + Math.floor(i / 2) * 118;
      return <g key={name}><rect className={`f-${tone} k`} x={X} y={Y} width="188" height="110" rx="12" opacity=".4" /><rect className="nofill k" x={X} y={Y} width="188" height="110" rx="12" />
        <Txt x={X + 94} y={Y + 24} bold>{name}</Txt>
        {foods.map(([kind, label], k) => { const cx = foods.length === 1 ? X + 94 : X + 47 + k * 94; return <g key={kind}><SeasonIcon kind={kind} x={cx} y={Y + 50} /><Txt x={cx} y={Y + (foods.length === 1 ? 94 : 82 + k * 20)}>{label}</Txt></g>; })}
      </g>;
    })}
  </Figure>;
}

// ---- Pictures --------------------------------------------------------------------------------------
function Picture({ v }) {
  const pic = PICTURES[v.kind];
  if (!pic) return null;
  const text = v.text;
  return <Figure root={ROOT} h={text ? 266 : 240} label={`${pic[0]}${text ? ` The note "${text}" is written beside it.` : ""}`} caption={v.caption ?? "A simple drawing."}>
    <svg x="50" y="14" width="300" height="210" viewBox="0 0 100 70">{pic[1]}</svg><rect className="nofill k" x="50" y="14" width="300" height="210" rx="4" />
    {text && <Chip x={200} y={248} w={text.length * 10.4 + 26}>{text}</Chip>}
  </Figure>;
}

function Gallery({ v }) {
  const items = v.items, four = items.length === 4;
  return <Figure root={ROOT} h={four ? 244 : 214} label={`${v.alt} ${items.map((it) => `${PICTURES[it.kind][0]} Words beside it: ${it.lines.join(" ")}.`).join(" ")}`} caption={v.caption}>
    {items.map((it, i) => {
      const [, art] = PICTURES[it.kind];
      if (four) {
        const X = 6 + (i % 2) * 196, Y = 8 + Math.floor(i / 2) * 118;
        return <g key={i}><rect className="soft k1" x={X} y={Y} width="188" height="110" rx="12" />
          <svg x={X + 8} y={Y + 34} width="60" height="42" viewBox="0 0 100 70">{art}</svg><rect className="nofill k1" x={X + 8} y={Y + 34} width="60" height="42" />
          {it.lines.map((l, k) => <Txt key={l} x={X + 76} y={Y + 26 + k * 22} anchor="start" bold={k === 0}>{l}</Txt>)}</g>;
      }
      const w = 124, X = 4 + i * (w + 8);
      return <g key={i}><rect className="soft k1" x={X} y="8" width={w} height="198" rx="12" />
        <svg x={X + 8} y="18" width={w - 16} height={(w - 16) * 0.7} viewBox="0 0 100 70">{art}</svg><rect className="nofill k1" x={X + 8} y="18" width={w - 16} height={(w - 16) * 0.7} />
        {it.lines.map((l, k) => <Txt key={l} x={X + w / 2} y={118 + k * 22} bold={k === 0}>{l}</Txt>)}</g>;
    })}
  </Figure>;
}

const DRAW = {
  clipboard: Clipboard, flow: Flow, gallery: Gallery, picture: Picture, lever: Lever, gears: GearsFig, circuit: Circuit, control: Control, eatwell: Eatwell, seasons: Seasons,
  blocks: ({ v }) => <BlocksFigure root={ROOT} v={v} />, pictogram: ({ v }) => <PictogramFigure root={ROOT} v={v} />,
};

export default function Year5DesignVisual({ question }) {
  const v = question?.visual;
  const Draw = v && DRAW[v.type];
  return Draw ? <Draw v={v} /> : null;
}
