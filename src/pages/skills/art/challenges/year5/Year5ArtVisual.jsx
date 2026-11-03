import { YEAR5_ART_VISUAL_TYPES } from "../../../../../data/challenges/year5Art/visualTypes.js";
import { Arrow, BlocksFigure, Chip, Figure, PictogramFigure, Txt } from "../../../creative/figureKit.jsx";
import { PICTURES } from "./Year5ArtPictures.jsx";
import "./Year5ArtVisual.css";

// eslint-disable-next-line react-refresh/only-export-components -- the coordinator imports VISUAL_TYPES by name
export const VISUAL_TYPES = YEAR5_ART_VISUAL_TYPES;
const ROOT = "y5-art-visual";

// ---- Colour helpers ---------------------------------------------------------------
const TOKEN = { red: "roof", yellow: "sun", blue: "roof2", green: "leaf", orange: "autumn", purple: "door", pink: "blossom", brown: "trunk", white: "foam", black: "on" };
const col = (name) => (name === "grey" ? "color-mix(in srgb, var(--v-foam) 50%, var(--v-on))" : `var(--v-${TOKEN[name]})`);
const mixc = (a, pa, b) => `color-mix(in srgb, ${a} ${pa}%, ${b})`;
const STEP = { tint: (b) => mixc(col(b), 38, col("white")), shade: (b) => mixc(col(b), 52, col("black")), tone: (b) => mixc(col(b), 55, col("grey")) };

// ---- Colour wheel -------------------------------------------------------------------
const ORDER6 = ["yellow", "green", "blue", "purple", "red", "orange"];
const ORDER12 = ["yellow", "yellow-green", "green", "blue-green", "blue", "blue-purple", "purple", "red-purple", "red", "red-orange", "orange", "yellow-orange"];
const OPPOSITE = { red: "green", green: "red", blue: "orange", orange: "blue", yellow: "purple", purple: "yellow" };

function Wheel({ v }) {
  const names = v.twelve ? ORDER12 : ORDER6, n = names.length, step = 360 / n, cx = 200, cy = 138, r = 68;
  const fills = names.map((name, i) => TOKEN[name] ? col(name) : mixc(col(names[i - 1]), 50, col(names[(i + 1) % n])));
  const hl = new Set(v.highlight ?? []);
  if (v.opposite) { hl.add(v.opposite); hl.add(OPPOSITE[v.opposite]); }
  const pt = (a, rad) => [cx + rad * Math.sin((a * Math.PI) / 180), cy - rad * Math.cos((a * Math.PI) / 180)];
  const hidden = v.opposite ? OPPOSITE[v.opposite] : null;
  return <Figure root={ROOT} h={256} caption={v.caption} label={`A colour wheel of ${n} colours, in order clockwise from the top: ${names.map((c) => (c === hidden ? "one colour hidden by a question mark" : c)).join(", ")}.${v.pairs ? " Opposite colours are joined by dashed lines: red and green, blue and orange, yellow and purple." : ""}${v.opposite ? ` ${v.opposite} is highlighted.` : ""}`}>
    {names.map((name, i) => {
      const a0 = (i - 0.5) * step, a1 = (i + 0.5) * step, [x0, y0] = pt(a0, r), [x1, y1] = pt(a1, r);
      return <path key={name} d={`M${cx} ${cy} L${x0.toFixed(1)} ${y0.toFixed(1)} A${r} ${r} 0 0 1 ${x1.toFixed(1)} ${y1.toFixed(1)}Z`} style={{ fill: fills[i] }} className="k" opacity={hl.size && !hl.has(name) ? 0.3 : 1} />;
    })}
    <circle className="paper k" cx={cx} cy={cy} r="20" />
    {v.pairs && [0, 1, 2].map((i) => { const [x0, y0] = pt(i * 2 * step, r), [x1, y1] = pt(i * 2 * step + 180, r); return <line key={i} className="ln1 dash s-ink" style={{ strokeWidth: 2.5 }} x1={x0} y1={y0} x2={x1} y2={y1} />; })}
    {v.opposite && (() => { const a = names.indexOf(v.opposite) * step, [x0, y0] = pt(a, r), [x1, y1] = pt(a + 180, r); return <line className="ln1 dash s-ink" style={{ strokeWidth: 2.5 }} x1={x0} y1={y0} x2={x1} y2={y1} />; })()}
    {names.map((name, i) => {
      const a = i * step, s = Math.sin((a * Math.PI) / 180), c = Math.cos((a * Math.PI) / 180);
      const [x, y] = pt(a, r + 8);
      const text = name === hidden ? "?" : name;
      const anchor = s > 0.3 ? "start" : s < -0.3 ? "end" : "middle";
      const yy = Math.abs(s) <= 0.3 ? (c > 0 ? y - 4 : y + 16) : y + 5;
      return <Txt key={name} x={anchor === "middle" ? x : x + (s > 0 ? 4 : -4)} y={yy} anchor={anchor} bold={hl.has(name) || !hl.size}>{text}</Txt>;
    })}
  </Figure>;
}

function Mix({ v }) {
  const circle = (x, name, fill) => <g>
    <circle className="k" cx={x} cy="112" r="40" style={{ fill }} />
    <Chip x={x} y={186} w={String(name).length * 10.4 + 22}>{name}</Chip>
  </g>;
  return <Figure root={ROOT} label={`Mixing paint: ${v.a} plus ${v.b} makes ${v.result ?? "a new colour hidden by a question mark"}.`} caption={v.caption}>
    {circle(66, v.a, col(v.a))}
    <Txt x={128} y={122} big bold>+</Txt>
    {circle(190, v.b, col(v.b))}
    <Txt x={252} y={122} big bold>=</Txt>
    {v.result ? circle(330, v.result, col(v.result)) : <g><circle className="soft k dash" cx="330" cy="112" r="40" /><Txt x={330} y={124} big bold>?</Txt></g>}
  </Figure>;
}

function Chips({ v }) {
  const n = v.names.length, w = Math.min(110, 370 / n), x0 = 200 - (n * w) / 2;
  return <Figure root={ROOT} label={`Colour swatches side by side: ${v.names.join(", ")}.`} caption={v.caption}>
    {v.names.map((name, i) => <g key={name}>
      <rect className="k" x={x0 + i * w} y="50" width={w} height="110" style={{ fill: col(name) }} />
      <Chip x={x0 + i * w + w / 2} y={186} w={Math.min(w - 4, name.length * 10.4 + 20)}>{name}</Chip>
    </g>)}
  </Figure>;
}

function Swatches({ v }) {
  return <Figure root={ROOT} label={`Paint swatches: ${v.fromLabel ?? v.from} on the left, ${v.toLabel} on the right. A question mark asks what was added.`} caption={v.caption}>
    <rect className="k" x="24" y="50" width="120" height="110" rx="14" style={{ fill: col(v.from) }} />
    <Chip x={84} y={186} w={String(v.fromLabel ?? v.from).length * 10.4 + 22}>{v.fromLabel ?? v.from}</Chip>
    <Arrow x1={160} y1={105} x2={240} y2={105} cls="ln" />
    <Chip x={200} y={78} w={64}>+ ?</Chip>
    <rect className="k" x="256" y="50" width="120" height="110" rx="14" style={{ fill: STEP[v.to](v.from) }} />
    <Chip x={316} y={186} w={String(v.toLabel).length * 10.4 + 22}>{v.toLabel}</Chip>
  </Figure>;
}

function ColourMix() {
  const warm = ["red", "orange", "yellow"], cool = ["blue", "green", "purple"];
  const strips = [["Tint", "tint", "+ white"], ["Shade", "shade", "+ black"], ["Tone", "tone", "+ grey"]];
  return <Figure root={ROOT} label="Warm colours are red, orange and yellow. Cool colours are blue, green and purple. Below, three strips of blue: a tint is blue plus white, a shade is blue plus black, and a tone is blue plus grey." caption="Warm colours feel hot and lively. Cool colours feel calm.">
    {[["Warm", warm, 10], ["Cool", cool, 56]].map(([label, names, y]) => <g key={label}>
      <Txt x={12} y={y + 28} anchor="start" bold>{label}</Txt>
      {names.map((nm, i) => <g key={nm}><rect className="k" x={86 + i * 100} y={y} width="96" height="40" rx="8" style={{ fill: col(nm) }} /><Chip x={134 + i * 100} y={y + 20} w={nm.length * 10.4 + 18}>{nm}</Chip></g>)}
    </g>)}
    {strips.map(([label, key, note], r) => <g key={key}>
      <Txt x={12} y={128 + r * 38} anchor="start" bold>{label}</Txt><Txt x={72} y={128 + r * 38} anchor="start">{note}</Txt>
      {[0, 1, 2, 3, 4].map((i) => <rect key={i} className="k1" x={160 + i * 46} y={106 + r * 38} width="46" height="30" style={{ fill: i === 0 ? col("blue") : mixc(col("blue"), 100 - i * 20, i === 0 ? col("blue") : key === "tint" ? col("white") : key === "shade" ? col("black") : col("grey")) }} />)}
    </g>)}
  </Figure>;
}

// ---- Tone and pencils ------------------------------------------------------------------
function Pencils() {
  const grades = [["2H", 0.14], ["H", 0.28], ["HB", 0.5], ["B", 0.75], ["6B", 0.96]];
  return <Figure root={ROOT} label="Five pencil grades from hard and pale to soft and dark: 2H, H, HB, B and 6B. The marks they make get darker from left to right." caption="H pencils are hard and pale. B pencils are soft and dark.">
    {grades.map(([g, o], i) => <g key={g}>
      <Chip x={52 + i * 74} y={36} w={52}>{g}</Chip>
      <rect className="sheet k" x={18 + i * 74} y="62" width="68" height="100" rx="8" />
      <rect className="graphite" x={22 + i * 74} y="66" width="60" height="92" rx="5" opacity={o} />
    </g>)}
    <Arrow x1={190} y1={196} x2={30} y2={196} cls="ln" /><Txt x={30} y={226} anchor="start" bold>harder, paler</Txt>
    <Arrow x1={210} y1={196} x2={370} y2={196} cls="ln" /><Txt x={370} y={226} anchor="end" bold>softer, darker</Txt>
  </Figure>;
}

// ---- Sketchbook ---------------------------------------------------------------------------
function SketchSubject({ kind }) {
  if (kind === "leaf") return <g className="gl"><path d="M110 150 C60 110 80 56 110 40 C140 56 160 110 110 150Z" /><path d="M110 150 V52 M110 70 L90 86 M110 92 L130 76 M110 112 L88 126" /></g>;
  if (kind === "vase") return <g className="gl"><path d="M92 170 C80 140 84 128 98 118 H122 C136 128 140 140 128 170Z" />{[[86, 64], [130, 56], [110, 84]].map(([x, y]) => <g key={x}><circle cx={x} cy={y} r="14" /><circle cx={x} cy={y} r="5" /><path d={`M${x} ${y + 14} L110 118`} /></g>)}</g>;
  return <g className="gl"><path d="M110 70 C80 54 56 86 70 124 C80 150 100 154 110 148 C120 154 140 150 150 124 C164 86 140 54 110 70Z" /><path d="M110 70 C110 60 112 52 120 46" /></g>;
}

function Sketchbook({ v }) {
  return <Figure root={ROOT} label={`An open sketchbook. On the left page there is a pencil sketch of ${v.subject === "leaf" ? "a leaf" : v.subject === "vase" ? "sunflowers in a vase" : "an apple"}${v.note ? ` with a note beside it: ${v.note}` : v.notes ? " with lines of notes beside it" : ""}. On the right page there are small quick sketches.${v.labels ? " The pages are labelled: record what you see, and try out ideas." : ""}`} caption={v.caption}>
    <rect className="sheet k" x="14" y="12" width="182" height="216" rx="8" /><rect className="sheet k" x="204" y="12" width="182" height="216" rx="8" />
    <SketchSubject kind={v.subject ?? "apple"} />
    {(v.note || v.notes || v.labels) && <g>
      <line className="gl" x1="30" x2="180" y1="190" y2="190" /><line className="gl" x1="30" x2="150" y1="206" y2="206" />
      {v.note && <text x="30" y="186" className="v-t v-on">{v.note}</text>}
    </g>}
    {v.labels ? <g><Txt x={105} y={222} bold cls="v-on">See and record</Txt><Txt x={295} y={222} bold cls="v-on">Try out ideas</Txt></g> : null}
    {[0, 1, 2].map((i) => <g key={i}><rect className="gl" x={226 + (i % 2) * 74} y={28 + Math.floor(i / 2) * 82} width="64" height="72" rx="3" /><circle className="gl" cx={258 + (i % 2) * 74} cy={64 + Math.floor(i / 2) * 82} r={12 + i * 4} /></g>)}
    {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => <circle key={i} className="ink" cx="200" cy={30 + i * 26} r="3.5" />)}
  </Figure>;
}

// ---- Elements of art ---------------------------------------------------------------------------
function Elements() {
  const icons = {
    Line: <path className="ln s-ink" style={{ strokeWidth: 4 }} d="M8 40 L22 10 L36 40 L50 10 L62 36" />,
    Shape: <g><circle className="f-sea k" cx="22" cy="26" r="16" /><path className="f-sun k" d="M38 44 L52 12 L66 44Z" /></g>,
    Colour: <g>{["roof", "sun", "sea"].map((c, i) => <circle key={c} className={`f-${c} k`} cx={16 + i * 20} cy="28" r="12" />)}</g>,
    Tone: <g>{[0.12, 0.35, 0.6, 0.9].map((o, i) => <g key={o}><rect className="sheet" x={4 + i * 16} y="10" width="16" height="36" /><rect className="graphite" x={4 + i * 16} y="10" width="16" height="36" opacity={o} /></g>)}<rect className="ln1 s-ink" x="4" y="10" width="64" height="36" style={{ fill: "none" }} /></g>,
    Texture: <path className="ln s-ink" style={{ strokeWidth: 3 }} d="M6 30 l6 -12 l6 14 l6 -14 l6 14 l6 -14 l6 14 l6 -14 l6 12" />,
    Pattern: <g>{[0, 1, 2, 3].map((i) => i % 2 ? <rect key={i} className="f-sea k" x={4 + i * 16} y="14" width="14" height="14" /> : <circle key={i} className="f-roof k" cx={11 + i * 16} cy="21" r="7.5" />)}{[0, 1, 2, 3].map((i) => i % 2 ? <circle key={i} className="f-roof k" cx={11 + i * 16} cy="42" r="7.5" /> : <rect key={i} className="f-sea k" x={4 + i * 16} y="35" width="14" height="14" />)}</g>,
    Form: <g><path className="f-sun k" d="M10 20 L34 10 L58 20 L34 30Z" /><path className="f-roof k" d="M10 20 L34 30 V54 L10 44Z" /><path className="f-sea k" d="M58 20 L34 30 V54 L58 44Z" /></g>,
    Space: <g><rect className="ln1 s-ink" x="4" y="6" width="64" height="44" rx="4" style={{ fill: "none" }} /><circle className="f-roof k" cx="24" cy="36" r="10" /><circle className="f-roof k" cx="52" cy="18" r="4" /></g>,
  };
  return <Figure root={ROOT} label="The eight words artists use to describe art, each with a small picture: line, shape, colour, tone, texture, pattern, form and space." caption="Say what you see, then what you think and why.">
    {Object.entries(icons).map(([name, icon], i) => {
      const X = 6 + (i % 4) * 98, Y = 10 + Math.floor(i / 4) * 112;
      return <g key={name}><rect className="soft k1" x={X} y={Y} width="92" height="102" rx="12" /><g transform={`translate(${X + 10} ${Y + 12})`}>{icon}</g><Txt x={X + 46} y={Y + 90} bold>{name}</Txt></g>;
    })}
  </Figure>;
}

// ---- Painting, printing, sculpture, pattern ----------------------------------------------------------
function Paint() {
  return <Figure root={ROOT} label="Three kinds of paint. Watercolour is thin and see-through, so the grid lines show through the paint. Acrylic is flat and dries quickly. Oil paint is thick and dries slowly, so ridges from the brush show." caption="Painters choose the paint for the effect they want.">
    <rect className="sheet k" x="10" y="16" width="118" height="100" rx="8" />
    {[40, 64, 88].map((y) => <line key={y} className="gl" x1="10" x2="128" y1={y} y2={y} />)}{[36, 64, 92].map((x) => <line key={x} className="gl" x1={x} x2={x} y1="16" y2="116" />)}
    <ellipse className="f-sea" cx="52" cy="62" rx="38" ry="30" opacity=".5" /><ellipse className="f-sun" cx="86" cy="72" rx="32" ry="28" opacity=".5" />
    <rect className="f-roof2 k" x="140" y="16" width="118" height="100" rx="8" /><path className="ln s-foam nofill" style={{ strokeWidth: 5, opacity: 0.8 }} d="M156 46 Q196 30 242 50" />
    <rect className="f-roof k" x="270" y="16" width="118" height="100" rx="8" />
    {[34, 52, 70, 88].map((y, i) => <path key={y} className="ln s-sun nofill" style={{ strokeWidth: 8, opacity: 0.9 }} d={`M282 ${y} q${i % 2 ? -8 : 8} -6 30 0 t30 0 t30 0`} />)}
    {[["Watercolour", ["thin and", "see-through"]], ["Acrylic", ["dries", "quickly"]], ["Oil paint", ["dries slowly,", "builds up thick"]]].map(([name, lines], i) => <g key={name}>
      <Txt x={69 + i * 130} y={146} bold>{name}</Txt>{lines.map((l, k) => <Txt key={l} x={69 + i * 130} y={170 + k * 20}>{l}</Txt>)}</g>)}
  </Figure>;
}

const GLYPH_F = "M0 0 H44 V12 H14 V24 H36 V36 H14 V60 H0Z";
function Print() {
  return <Figure root={ROOT} h={252} label="Printmaking. Ink is rolled on a block with the letter F raised on it, then pressed onto paper. The print is a mirror image, so the F faces the other way. One block can make many prints, shown by a row of three small prints." caption="A print is a mirror image of the block.">
    <rect className="f-wall2 k" x="24" y="14" width="110" height="100" rx="6" /><path className="ink" d={GLYPH_F} transform="translate(57 34)" />
    <Chip x={79} y={138} w={70}>Block</Chip>
    <Arrow x1={142} y1={64} x2={194} y2={64} cls="ln" /><Txt x={168} y={52} bold>press</Txt>
    <rect className="sheet k" x="200" y="14" width="110" height="100" rx="3" /><path className="f-roof2" d={GLYPH_F} transform="translate(277 34) scale(-1 1)" />
    <Chip x={255} y={138} w={70}>Print</Chip>
    {[0, 1, 2].map((i) => <g key={i}><rect className="sheet k" x={92 + i * 78} y="168" width="62" height="48" rx="3" /><path className="f-roof2" d={GLYPH_F} transform={`translate(${135 + i * 78} 178) scale(-.6 .6)`} /></g>)}
    <Txt x={200} y={242} bold>One block makes many prints</Txt>
  </Figure>;
}

function Cells({ items, label, caption }) {
  return <Figure root={ROOT} label={label} caption={caption}>
    {items.map(([kind, name, lines], i) => {
      const X = 6 + (i % 2) * 196, Y = 10 + Math.floor(i / 2) * 116;
      return <g key={name}><rect className="soft k1" x={X} y={Y} width="188" height="108" rx="12" />
        <svg x={X + 8} y={Y + 28} width="66" height="46" viewBox="0 0 100 70">{PICTURES[kind][1]}</svg>
        <rect className="nofill k1" x={X + 8} y={Y + 28} width="66" height="46" />
        <Txt x={X + 82} y={Y + 32} anchor="start" bold>{name}</Txt>{lines.map((l, k) => <Txt key={l} x={X + 82} y={Y + 54 + k * 20} anchor="start">{l}</Txt>)}</g>;
    })}
  </Figure>;
}
const Ways = () => <Cells items={[["carve", "Carve", ["cut away"]], ["model", "Model", ["build up"]], ["mould", "Cast", ["pour into", "a mould"]], ["robot", "Assemble", ["join pieces"]]]}
  label="Four ways to make a sculpture: carve by cutting away, model by building up, cast by pouring into a mould, and assemble by joining pieces." caption="A sculpture is art in three dimensions." />;
const PatternPanels = () => <Cells items={[["patternRepeat", "Pattern", ["repeats a", "shape or", "colour"]], ["patternSym", "Symmetry", ["a mirror", "match"]], ["patternTess", "Tessellation", ["no gaps"]], ["patternTex", "Texture", ["how a", "surface", "feels"]]]}
  label="Four ideas in pattern and texture: a pattern repeats a shape or colour, symmetry is a mirror match, a tessellation fits shapes together with no gaps, and texture is how a surface feels." caption="Pattern, symmetry, tessellation and texture." />;

// ---- Perspective ------------------------------------------------------------------------------------
function Perspective({ v }) {
  if (v.kind === "cube") {
    return <Figure root={ROOT} label="A cube drawn from a corner, with a horizon line and a dot at each end of it where the cube's lines are heading." caption={v.caption}>
      <rect className="f-sky" x="2" y="2" width="396" height="98" rx="16" /><rect className="f-grass" x="2" y="100" width="396" height="138" />
      <line className="ln s-ink" x1="2" y1="100" x2="398" y2="100" />
      {[20, 380].map((x) => <circle key={x} className="f-roof k" cx={x} cy="100" r="7" />)}
      <path className="f-wall2 k" d="M200 110 L120 105.6 L120 150 L200 190Z" /><path className="f-sun k" d="M200 110 L290 105 L290 145 L200 190Z" /><path className="f-wall k" d="M200 110 L120 105.6 L213.5 103.6 L290 105Z" />
    </Figure>;
  }
  const open = v.kind === "open";
  const posts = [0.2, 0.42, 0.62].map((t) => [60 + 140 * t, 232 - 132 * t]);
  const posts2 = [0.2, 0.42, 0.62].map((t) => [340 - 140 * t, 232 - 132 * t]);
  return <Figure root={ROOT} label={open ? "A road drawn from the bottom of the picture towards a horizon line. The two road edges stop before they meet." : "A road going away into the distance. The road edges meet at a vanishing point on the horizon line, and the lamp posts get smaller as they go away."} caption={v.caption}>
    <rect className="f-sky" x="2" y="2" width="396" height="98" rx="16" /><rect className="f-grass" x="2" y="100" width="396" height="138" />
    <path className="f-road k" d={open ? "M60 236 L170 150 H230 L340 236Z" : "M60 236 L200 100 L340 236Z"} style={{ fill: "var(--v-stonedark)" }} />
    {!open && <path className="ln1 s-foam dash" style={{ strokeWidth: 3 }} d="M200 236 V104" />}
    <line className="ln s-ink" x1="2" y1="100" x2="398" y2="100" />
    {!open && [...posts, ...posts2].map(([x, y], i) => { const h = (y - 100) * 0.7; return <g key={i}><line className="ln s-ink" style={{ strokeWidth: 3 }} x1={x} y1={y} x2={x} y2={y - h} /><circle className="f-sun k1" cx={x} cy={y - h} r={Math.max(3, h / 10)} /></g>; })}
    {!open && <circle className="f-roof k" cx="200" cy="100" r="6" />}
    <Chip x={72} y={86} w={118}>Horizon line</Chip>
    {!open && <><Chip x={300} y={56} w={146}>Vanishing point</Chip><Arrow x1={270} y1={68} x2={207} y2={95} cls="ln1" head={7} /></>}
  </Figure>;
}

// ---- Pictures --------------------------------------------------------------------------------------
function Artwork({ v }) {
  const pic = PICTURES[v.kind];
  if (!pic) return null;
  return <Figure root={ROOT} h={v.text ? 266 : 240} label={`${pic[0]}${v.text ? ` The number ${v.text} is written underneath.` : ""}`} caption={v.caption ?? "A simple drawing, not the real work."}>
    <svg x="50" y="14" width="300" height="210" viewBox="0 0 100 70">{pic[1]}</svg>
    <rect className="nofill k" x="50" y="14" width="300" height="210" rx="4" />
    {v.text && <Txt x={200} y={254} bold big>{v.text}</Txt>}
  </Figure>;
}

function Gallery({ v }) {
  const items = v.items, four = items.length === 4;
  return <Figure root={ROOT} h={four ? 244 : 214} label={`${v.alt} ${items.map((it) => `${PICTURES[it.kind][0]} Label: ${it.lines.join(" ")}.`).join(" ")}`} caption={v.caption ?? "Simple drawings inspired by each work, not the real thing."}>
    {items.map((it, i) => {
      const [, art] = PICTURES[it.kind];
      if (four) {
        const X = 6 + (i % 2) * 196, Y = 8 + Math.floor(i / 2) * 118;
        return <g key={i}><rect className="soft k1" x={X} y={Y} width="188" height="110" rx="12" />
          <svg x={X + 8} y={Y + 26} width="74" height="52" viewBox="0 0 100 70">{art}</svg><rect className="nofill k1" x={X + 8} y={Y + 26} width="74" height="52" />
          {it.lines.map((l, k) => <Txt key={l} x={X + 90} y={Y + 34 + k * 22} anchor="start" bold={k === 0}>{l}</Txt>)}</g>;
      }
      const w = 124, X = 4 + i * (w + 8);
      return <g key={i}><rect className="soft k1" x={X} y="8" width={w} height="198" rx="12" />
        <svg x={X + 8} y="18" width={w - 16} height={(w - 16) * 0.7} viewBox="0 0 100 70">{art}</svg><rect className="nofill k1" x={X + 8} y="18" width={w - 16} height={(w - 16) * 0.7} />
        {it.lines.map((l, k) => <Txt key={l} x={X + w / 2} y={118 + k * 22} bold={k === 0}>{l}</Txt>)}</g>;
    })}
  </Figure>;
}

const DRAW = {
  sketchbook: Sketchbook, elements: Elements, pencils: Pencils, wheel: Wheel, mix: Mix, chips: Chips, swatches: Swatches, colourMix: ColourMix,
  paint: Paint, print: Print, ways: Ways, pattern: PatternPanels, perspective: Perspective, artwork: Artwork, gallery: Gallery,
  blocks: ({ v }) => <BlocksFigure root={ROOT} v={v} />, pictogram: ({ v }) => <PictogramFigure root={ROOT} v={v} />,
};

export default function Year5ArtVisual({ question }) {
  const v = question?.visual;
  const Draw = v && DRAW[v.type];
  return Draw ? <Draw v={v} /> : null;
}
