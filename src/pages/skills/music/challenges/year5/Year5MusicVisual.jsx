import worldMaps from "../../../../../assets/geography/year1-maps.json";
import { YEAR5_MUSIC_VISUAL_TYPES } from "../../../../../data/challenges/year5Music/visualTypes.js";
import { Arrow, BlocksFigure, Chip, Figure, PictogramFigure, Txt } from "../../../creative/figureKit.jsx";
import "./Year5MusicVisual.css";

// eslint-disable-next-line react-refresh/only-export-components -- the coordinator imports VISUAL_TYPES by name
export const VISUAL_TYPES = YEAR5_MUSIC_VISUAL_TYPES;
const ROOT = "y5-music-visual";
const LETTERS = "CDEFGAB";

// ---- The stave --------------------------------------------------------------
// Treble stave: bottom line E4 sits at y=160 and every step (line or space) is 10 units.
const stepOf = (note) => Number(note.slice(-1)) * 7 + LETTERS.indexOf(note[0]) - 30;
const yOf = (step) => 160 - step * 10;
const TREBLE = "M38 190 C26 190 24 206 36 206 C48 206 49 190 46 170 C43 140 41 100 46 66 C49 46 58 38 63 46 C70 58 54 84 42 104 C26 128 28 156 48 158 C66 160 72 138 58 128 C46 120 32 130 38 144 C42 152 54 152 54 144";

function Notehead({ x, y, open }) {
  return <ellipse cx={x} cy={y} rx="11" ry="8" transform={`rotate(-20 ${x} ${y})`} className={open ? "paper k" : "ink"} />;
}

function Stave({ v }) {
  const notes = v.notes ?? [];
  const steps = notes.map(stepOf);
  const gap = notes.length > 1 ? Math.min(46, 250 / (notes.length - 1)) : 0;
  const xs = notes.map((_, i) => (v.chord ? 220 : notes.length === 1 ? 220 : 110 + i * gap));
  const label = `A treble stave with five lines and a treble clef. ${notes.length ? `It shows ${v.chord ? "a chord of " : ""}${notes.length} note${notes.length === 1 ? "" : "s"}: ${notes.map((n, i) => `${v.names ? n.slice(0, -1) : "a note"} ${describe(steps[i])}`).join(", ")}.` : "No notes are written on it."}`;
  const ledgers = new Set();
  steps.forEach((s, i) => {
    for (let k = -2; k >= s; k -= 2) ledgers.add(`${xs[i]}|${yOf(k)}`);
    for (let k = 10; k <= s; k += 2) ledgers.add(`${xs[i]}|${yOf(k)}`);
  });
  return <Figure root={ROOT} label={label} caption={v.caption}>
    {[80, 100, 120, 140, 160].map((y) => <line key={y} className="ln" style={{ strokeWidth: 2 }} x1="18" x2="382" y1={y} y2={y} />)}
    <line className="ln" x1="18" x2="18" y1="80" y2="160" />
    <line className="ln" x1="382" x2="382" y1="80" y2="160" />
    {v.clef !== false && <path className="ln5 s-ink" d={TREBLE} style={{ strokeWidth: 4.5 }} />}
    {[...ledgers].map((l) => { const [x, y] = l.split("|").map(Number); return <line key={l} className="ln" x1={x - 18} x2={x + 18} y1={y} y2={y} />; })}
    {notes.map((n, i) => {
      const x = xs[i], y = yOf(steps[i]), up = steps[i] < 4;
      const top = v.chord ? Math.max(...steps) : steps[i];
      return <g key={`${n}${i}`}>
        <Notehead x={x} y={y} open={v.open} />
        {!v.open && (!v.chord || i === 0) && <line className="ln" x1={up ? x + 10 : x - 10} x2={up ? x + 10 : x - 10} y1={y} y2={up ? yOf(top) - 46 : y + 46} />}
        {v.names && !v.chord && <Chip x={x} y={226} w={28}>{n[0]}</Chip>}
        {v.names && v.chord && <g><line className="ln1 s-mute" x1={x + 14} y1={y} x2={x + 38} y2={chordY(steps, i)} /><Chip x={x + 52} y={chordY(steps, i)} w={36}>{n[0]}</Chip></g>}
      </g>;
    })}
    {v.numbers && [1, 2, 3, 4, 5].map((n) => <Txt key={n} x={394} y={yOf((n - 1) * 2) + 5} anchor="end" bold>{n}</Txt>)}
  </Figure>;
}

// Chord letters sit in a tidy column to the right, 30 units apart, highest note on top.
const chordY = (steps, i) => {
  const rank = [...steps].sort((a, b) => b - a).indexOf(steps[i]);
  const mid = yOf((Math.max(...steps) + Math.min(...steps)) / 2);
  return mid + (rank - (steps.length - 1) / 2) * 30;
};

function describe(step) {
  if (step === -2) return "on a ledger line below the stave";
  if (step === -1) return "hanging below the bottom line";
  if (step > 8) return step === 9 ? "just above the top line" : "on a ledger line above the stave";
  return step % 2 === 0 ? `on line ${step / 2 + 1}` : `in space ${(step + 1) / 2}`;
}

// ---- Rhythm ---------------------------------------------------------------
const BEATS = { semibreve: 4, minim: 2, crotchet: 1, crotchetRest: 1, minimRest: 2, semibreveRest: 4, quavers: 1, quaver: 0.5, semiquavers: 1 };
const NAMES = { semibreve: "semibreve", minim: "minim", crotchet: "crotchet", crotchetRest: "rest", minimRest: "minim rest", semibreveRest: "rest", quavers: "quavers", quaver: "quaver", semiquavers: "semiquavers" };

function RhythmItem({ kind, x, y, beat }) {
  const hx = x + 10, sx = hx + 9;
  const head = (cx, open) => <ellipse cx={cx} cy={y} rx="9" ry="6.5" transform={`rotate(-20 ${cx} ${y})`} className={open ? "paper k" : "ink"} />;
  const stem = (cx, h = 38) => <line className="ln" style={{ strokeWidth: 2.5 }} x1={cx + 8} x2={cx + 8} y1={y - 2} y2={y - h} />;
  switch (kind) {
    case "semibreve": return <ellipse cx={hx} cy={y} rx="12" ry="8" className="paper k" />;
    case "minim": return <g>{head(hx, true)}{stem(hx)}</g>;
    case "crotchet": return <g>{head(hx)}{stem(hx)}</g>;
    case "quaver": return <g>{head(hx)}{stem(hx)}<path className="ln" fill="none" d={`M${sx - 1} ${y - 38} C${sx + 4} ${y - 26} ${sx + 16} ${y - 24} ${sx + 12} ${y - 10}`} /></g>;
    case "quavers": {
      const x2 = hx + beat / 2;
      return <g>{head(hx)}{stem(hx)}{head(x2)}{stem(x2)}<line className="ln5" style={{ strokeWidth: 5 }} x1={hx + 8} x2={x2 + 8} y1={y - 38} y2={y - 38} /></g>;
    }
    case "semiquavers": {
      const xs = [0, 1, 2, 3].map((k) => hx + (k * beat) / 4);
      return <g>{xs.map((cx) => <g key={cx}>{head(cx)}{stem(cx)}</g>)}
        <line className="ln5" style={{ strokeWidth: 4 }} x1={xs[0] + 8} x2={xs[3] + 8} y1={y - 38} y2={y - 38} />
        <line className="ln5" style={{ strokeWidth: 4 }} x1={xs[0] + 8} x2={xs[3] + 8} y1={y - 28} y2={y - 28} /></g>;
    }
    case "crotchetRest": return <path className="ln" fill="none" d={`M${hx - 5} ${y - 18} L${hx + 5} ${y - 7} L${hx - 5} ${y + 3} Q${hx + 7} ${y + 6} ${hx - 1} ${y + 18}`} />;
    case "minimRest": return <rect className="ink" x={hx - 10} y={y - 8} width="20" height="8" />;
    case "semibreveRest": return <rect className="ink" x={hx - 10} y={y} width="20" height="8" />;
    default: return null;
  }
}

function Rhythm({ v }) {
  const rows = v.rows ?? [{ time: v.time ?? "4/4", bars: v.bars ?? [v.items ?? []] }];
  const ys = rows.length === 1 ? [112] : rows.length === 2 ? [88, 186] : [50, 120, 190];
  const label = rows.map((r) => `Time signature ${r.time}: ${r.bars.map((b) => (b.length ? b.map((i) => NAMES[i]).join(", ") : "empty bar")).join(" | ")}.`).join(" ");
  return <Figure root={ROOT} label={`Rhythm line. ${label}`} caption={v.caption}>
    {rows.map((row, ri) => {
      const [top, bottom] = row.time.split("/");
      const y = ys[ri], nb = row.bars.length, W = (382 - 74) / nb;
      return <g key={ri}>
        <Txt x={38} y={y - 2} big bold>{top}</Txt><Txt x={38} y={y + 25} big bold>{bottom}</Txt>
        <line className="ln" style={{ strokeWidth: 2 }} x1="66" x2="382" y1={y} y2={y} />
        <line className="ln" x1="66" x2="66" y1={y - 20} y2={y + 20} />
        {row.bars.map((bar, bi) => {
          const total = bar.reduce((s, i) => s + BEATS[i], 0);
          const bw = (W - 30) / Math.max(Number(top), total);
          let at = 74 + bi * W + 14;
          const parts = bar.map((kind, k) => {
            const x = at; at += BEATS[kind] * bw;
            return <g key={k}><RhythmItem kind={kind} x={x} y={y} beat={bw} />
              {v.labels && BEATS[kind] >= 1 && <Txt x={x + 10} y={y + 60} bold>{NAMES[kind]}</Txt>}</g>;
          });
          return <g key={bi}>{parts}
            {v.counts && Array.from({ length: Number(top) }, (_, b) => <Txt key={b} x={74 + bi * W + 24 + b * bw} y={y + 36}>{b + 1}</Txt>)}
            <line className="ln" x1={74 + (bi + 1) * W - 8} x2={74 + (bi + 1) * W - 8} y1={y - 20} y2={y + 20} /></g>;
        })}
        <line className="ln5" style={{ strokeWidth: 5 }} x1="379" x2="379" y1={y - 20} y2={y + 20} />
      </g>;
    })}
  </Figure>;
}

// ---- Note values as bars --------------------------------------------------
function NoteTree() {
  const rows = [["semibreve", 1, "4 beats", "roof"], ["minim", 2, "2 beats", "sun"], ["crotchet", 4, "1 beat", "leaf"], ["quavers", 8, "", "sea"], ["semiquavers", 16, "", "door"]];
  return <Figure root={ROOT} label="Note values drawn as bars of the same total length. A semibreve is 4 beats and one bar. A minim is half of it, 2 beats. A crotchet is a quarter, 1 beat. Quavers are eighths, so a pair of quavers is 1 beat. Semiquavers are sixteenths, so four make 1 beat." caption="Every row is the same length. Each box in a row lasts the same time.">
    {rows.map(([name, n, text, col], r) => {
      const y = 12 + r * 44, w = 244 / n;
      return <g key={name}>
        <Txt x={12} y={y + 26} anchor="start" bold>{name}</Txt>
        {Array.from({ length: n }, (_, i) => <rect key={i} className={`f-${r === 3 && Math.floor(i / 2) % 2 ? "cloud" : col} k1`} x={142 + i * w} y={y} width={w} height="36" rx={n > 8 ? 2 : 6} />)}
        {text && Array.from({ length: n }, (_, i) => <text key={i} x={142 + i * w + w / 2} y={y + 24} textAnchor="middle" className="v-t v-b v-on">{text}</text>)}
        {r === 3 && [0, 2, 4, 6].map((i) => <path key={i} className="ln" fill="none" style={{ strokeWidth: 2 }} d={`M${144 + i * w} ${y + 40} h${2 * w - 4}`} />)}
      </g>;
    })}
  </Figure>;
}

// ---- Tempo ------------------------------------------------------------------
function Tempo({ v }) {
  if (v.kind === "metronome") {
    return <Figure root={ROOT} label={`A metronome with a swinging arm.${v.value === undefined ? "" : ` The number ${v.value} is written beside it.`}`} caption="A metronome clicks the steady beat.">
      <path className="f-wall2 k" d="M160 200 L185 40 H215 L240 200 Z" />
      <line className="ln5" x1="200" x2="228" y1="190" y2="62" />
      <rect className="f-roof k" x="216" y="86" width="26" height="16" rx="4" transform="rotate(12 229 94)" />
      <circle className="f-sun k" cx="200" cy="196" r="9" />
      {v.value !== undefined && <><Chip x={310} y={120} w={84}>{`${v.value}`}</Chip>
        <Arrow x1={270} y1={120} x2={238} y2={104} cls="ln1" head={7} /></>}
    </Figure>;
  }
  if (v.kind === "dots") {
    const gaps = v.dir === "faster" ? [70, 58, 48, 40, 33, 27] : [27, 33, 40, 48, 58, 70];
    let x = 24;
    return <Figure root={ROOT} label={`A row of beats where the gaps ${v.dir === "faster" ? "get smaller, so the beats come faster" : "get bigger, so the beats come slower"}.`} caption={v.dir === "faster" ? "Gaps shrinking: the beats are coming closer together." : "Gaps growing: the beats are spreading further apart."}>
      {[0, ...gaps].map((g, i) => { x += g; return <circle key={i} className="f-roof k" cx={x} cy="110" r="9" />; })}
      <Arrow x1={30} y1={170} x2={370} y2={170} cls="ln" />
      <Txt x={200} y={206} bold>time</Txt>
    </Figure>;
  }
  const words = [["adagio", "slow"], ["andante", "walking"], ["allegro", "fast"], ["presto", "very fast"]];
  return <Figure root={ROOT} label="A tempo scale from slow to fast: adagio is slow, andante is a walking pace, allegro is fast and presto is very fast." caption="Tempo is the speed of the music. Rushing ahead is accelerando; slowing down is rallentando.">
    {words.map(([w, d], i) => <g key={w}>
      <rect className={`f-${["sea", "leaf", "sun", "roof"][i]} k`} x={18 + i * 94} y={92 - i * 12} width="86" height={70 + i * 12} rx="12" />
      <Chip x={61 + i * 94} y={118 - i * 12} w={80}>{w}</Chip>
      <text x={61 + i * 94} y={158 - i * 10} textAnchor="middle" className="v-t v-on">{d}</text>
    </g>)}
    <Arrow x1={24} y1={196} x2={376} y2={196} cls="ln" />
    <Txt x={24} y={222} anchor="start" bold>slower</Txt><Txt x={376} y={222} anchor="end" bold>faster</Txt>
  </Figure>;
}

// ---- Dynamics ---------------------------------------------------------------
const DYN = [["pp", "very quiet"], ["p", "quiet"], ["mp", "moderately quiet"], ["mf", "moderately loud"], ["f", "loud"], ["ff", "very loud"]];
function Dynamics({ v }) {
  return <Figure root={ROOT} label={`A ladder of dynamic marks from the quietest to the loudest: ${DYN.map(([m, w]) => `${m}${v.hideWords ? "" : `, ${w}`}`).join("; ")}. The bars get longer as the music gets louder.`} caption="Longer bars mean louder music.">
    {DYN.map(([m, w], i) => {
      const y = 14 + i * 36, len = 24 + i * 26;
      return <g key={m}>
        <Chip x={34} y={y + 14} w={52}>{m}</Chip>
        <rect className={`f-${["sea", "leaf", "grass", "sun", "autumn", "roof"][i]} k`} x="72" y={y} width={len} height="28" rx="8" />
        {!v.hideWords && <Txt x={72 + len + 10} y={y + 20} anchor="start">{w}</Txt>}
      </g>;
    })}
  </Figure>;
}

function Hairpin({ v }) {
  const open = v.dir === "open";
  return <Figure root={ROOT} label={`A hairpin sign under a line of notes. It ${open ? "starts narrow and opens wider" : "starts wide and closes to a point"}.`} caption={v.caption}>
    {[70, 130, 190, 250, 310].map((x) => <g key={x}><ellipse cx={x} cy="78" rx="11" ry="8" transform={`rotate(-20 ${x} 78)`} className="ink" /><line className="ln" x1={x + 10} x2={x + 10} y1="76" y2="34" /></g>)}
    <line className="ln" style={{ strokeWidth: 2 }} x1="30" x2="370" y1="78" y2="78" />
    <path className="ln5" fill="none" d={open ? "M50 160 L350 136 M50 160 L350 184" : "M50 136 L350 160 M50 184 L350 160"} />
  </Figure>;
}

function Articulation({ v }) {
  const xs = [70, 150, 230, 310];
  return <Figure root={ROOT} label={v.style === "staccato" ? "A line of four notes with a short dot above each one." : "A line of four notes joined by one curved line over the top."} caption={v.caption}>
    <line className="ln" style={{ strokeWidth: 2 }} x1="30" x2="370" y1="140" y2="140" />
    {xs.map((x) => <g key={x}><ellipse cx={x} cy="140" rx="11" ry="8" transform={`rotate(-20 ${x} 140)`} className="ink" /><line className="ln" x1={x + 10} x2={x + 10} y1="138" y2="92" />
      {v.style === "staccato" && <circle className="ink" cx={x} cy="168" r="5" />}</g>)}
    {v.style === "legato" && <path className="ln" fill="none" d="M70 70 Q190 20 310 70" />}
  </Figure>;
}

// ---- Keyboard -----------------------------------------------------------------
const SOLFEGE = { C: "do", D: "re", E: "mi", F: "fa", G: "so", A: "la", B: "ti" };
function Keyboard({ v }) {
  const from = LETTERS.indexOf(v.from ?? "C");
  const keys = Array.from({ length: 8 }, (_, i) => LETTERS[(from + i) % 7]);
  const w = 44, x0 = 24, marked = new Set(v.marked ?? []);
  return <Figure root={ROOT} label={`A piano keyboard showing eight white keys from ${keys[0]} up to ${keys[7]}${v.names ? `: ${keys.join(", ")}` : ""}. ${marked.size ? `${marked.size} keys are marked.` : ""}`} caption={v.caption}>
    {keys.map((k, i) => <g key={i}>
      <rect className={marked.has(i) ? "f-sun k" : "paper k"} x={x0 + i * w} y="50" width={w} height="130" rx="5" />
      {marked.has(i) && <circle className="ink" cx={x0 + i * w + w / 2} cy="68" r="5" />}
      {v.names && <Txt x={x0 + i * w + w / 2} y={168} bold>{k}</Txt>}
      {v.solfege && <Txt x={x0 + i * w + w / 2} y={142}>{SOLFEGE[k]}</Txt>}
    </g>)}
    {keys.slice(0, 7).map((k, i) => !"EB".includes(k) && <rect key={i} className="ink" x={x0 + (i + 1) * w - 13} y="50" width="26" height="78" rx="4" />)}
    {v.octave && <g><path className="ln" fill="none" d={`M${x0 + w / 2} 196 V206 H${x0 + 7.5 * w} V196`} /><Txt x={200} y={230} bold>{v.octave === true ? "one octave" : v.octave}</Txt></g>}
  </Figure>;
}

// ---- Structure and texture ----------------------------------------------------
const BLOCK_COLOURS = ["roof", "sea", "leaf", "sun", "door", "autumn"];
function Structure({ v }) {
  const rows = v.rows ?? [{ title: v.title, blocks: v.blocks }];
  const rowH = rows.length === 1 ? 120 : 70;
  const seen = [];
  return <Figure root={ROOT} label={`Song plans drawn as blocks: ${rows.map((r) => `${r.title ? `${r.title}: ` : ""}${r.blocks.map((b, i) => (r.hide?.includes(i) ? "unknown section" : b)).join(", ")}`).join("; ")}.`} caption={v.caption}>
    {rows.map((r, ri) => {
      const n = r.blocks.length, bw = Math.min(84, (360 - (n - 1) * 8) / n), x0 = 200 - (n * bw + (n - 1) * 8) / 2;
      const y = rows.length === 1 ? 60 : 14 + ri * rowH;
      return <g key={ri}>
        {r.title && <Txt x={200} y={y + (rows.length === 1 ? -6 : 16)} bold>{r.title}</Txt>}
        {r.blocks.map((b, i) => {
          if (!seen.includes(b)) seen.push(b);
          const hidden = r.hide?.includes(i);
          return <g key={i}>
            <rect className={hidden ? "soft k" : `f-${BLOCK_COLOURS[seen.indexOf(b) % 6]} k`} x={x0 + i * (bw + 8)} y={y + (r.title ? 24 : 0)} width={bw} height={rows.length === 1 ? 70 : 38} rx="10" />
            <text x={x0 + i * (bw + 8) + bw / 2} y={y + (r.title ? 24 : 0) + (rows.length === 1 ? 44 : 26)} textAnchor="middle" className="v-t v-b v-on" style={{ fontSize: b.length > 2 ? 18 : 24 }}>{hidden ? "?" : b}</text>
          </g>;
        })}
      </g>;
    })}
  </Figure>;
}

function Texture({ v }) {
  const layers = v.layers;
  const rowH = Math.min(52, 190 / layers.length);
  const wave = (y, kind, a = 12) => {
    if (kind === "flat") return `M170 ${y} H380`;
    if (kind === "repeat") return Array.from({ length: 5 }, (_, i) => `M${170 + i * 42} ${y} q10 -${a} 20 0 t20 0`).join(" ");
    if (kind === "tune2") return [0, 1, 2, 3].map((i) => `M${172 + i * 52} ${y} h38`).join(" ");
    return `M170 ${y} q14 -${a} 28 0 t28 0 t28 0 t28 0 t28 0 t28 0 t28 0`;
  };
  return <Figure root={ROOT} label={`Layers of sound shown as lines: ${layers.map((l) => l.label).join(", ")}.`} caption={v.caption}>
    {layers.map((l, i) => {
      const y = 28 + i * rowH + rowH / 2;
      return <g key={i}>
        <Txt x={12} y={y + 5} anchor="start" bold>{l.label}</Txt>
        <path className={`ln5 s-${["roof", "sea", "leaf", "door"][i % 4]}`} fill="none" d={wave(y, l.kind)} />
      </g>;
    })}
  </Figure>;
}

// ---- Instruments ---------------------------------------------------------------
function Violin({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect className="f-trunk k" x="-4" y="-52" width="8" height="40" rx="3" />
    <circle className="f-trunk k" cx="0" cy="-56" r="6" />
    <ellipse className="f-wall2 k" cx="0" cy="16" rx="19" ry="22" /><ellipse className="f-wall2 k" cx="0" cy="-8" rx="14" ry="14" />
    <path className="ln1" d="M-4 -50 V30 M0 -50 V30 M4 -50 V30" /><rect className="ink" x="-8" y="26" width="16" height="4" />
  </g>;
}
function Flute({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s}) rotate(-35)`}>
    <rect className="f-stone k" x="-42" y="-5" width="84" height="10" rx="5" />
    {[-24, -10, 4, 18, 30].map((c) => <circle key={c} className="ink" cx={c} cy="0" r="3" />)}
    <circle className="paper k1" cx="-34" cy="0" r="3" />
  </g>;
}
function Trumpet({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path className="f-sun k" d="M26 -6 L46 -22 V26 L26 10 Z" />
    <rect className="f-sun k" x="-40" y="-5" width="68" height="12" rx="5" />
    <rect className="f-sun k" x="-24" y="8" width="44" height="24" rx="12" />
    {[-12, 0, 12].map((c) => <g key={c}><line className="ln" x1={c} x2={c} y1="-5" y2="-18" /><circle className="ink" cx={c} cy="-20" r="3.5" /></g>)}
  </g>;
}
function Drum({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect className="f-roof k" x="-30" y="-8" width="60" height="38" />
    <ellipse className="paper k" cx="0" cy="-8" rx="30" ry="10" /><ellipse className="f-roof k" cx="0" cy="30" rx="30" ry="10" />
    <path className="ln1" d="M-30 -8 L-10 30 L10 -8 L30 30" />
    <path className="ln5" d="M-24 -44 L8 -14 M26 -44 L-6 -14" style={{ strokeWidth: 4 }} />
  </g>;
}
function Sax({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path className="ln5 s-sun" fill="none" d="M10 -42 L10 16 Q10 36 -10 36 Q-30 36 -30 12" style={{ strokeWidth: 13 }} />
    <path className="ln" fill="none" d="M10 -42 L10 16 Q10 36 -10 36 Q-30 36 -30 12" style={{ strokeWidth: 15, stroke: "var(--v-ink)", opacity: 0.25 }} />
    <ellipse className="f-sun k" cx="-30" cy="10" rx="12" ry="6" />
    {[-24, -12, 0, 12].map((c) => <circle key={c} className="ink" cx="10" cy={c} r="3" />)}
    <path className="ln" fill="none" d="M10 -42 L22 -50" />
  </g>;
}
function Guitar({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s}) rotate(-35)`}>
    <rect className="f-trunk k" x="-6" y="-58" width="12" height="52" rx="3" />
    <rect className="f-trunk k" x="-8" y="-68" width="16" height="14" rx="3" />
    <ellipse className="f-roof k" cx="0" cy="8" rx="24" ry="18" /><ellipse className="f-roof k" cx="0" cy="-8" rx="15" ry="14" />
    <rect className="ink" x="-8" y="10" width="16" height="4" />
    <path className="ln1" d="M-2 -60 V10 M2 -60 V10" />
  </g>;
}
function DiscoBall({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <line className="ln" x1="0" x2="0" y1="-46" y2="-30" />
    <circle className="f-stone k" cx="0" cy="0" r="30" />
    <path className="ln1" d="M-30 0 H30 M-26 -15 H26 M-26 15 H26 M0 -30 V30 M-15 -28 V28 M15 -28 V28" />
    <path className="f-sun k1" d="M36 -30 l4 8 8 4 -8 4 -4 8 -4 -8 -8 -4 8 -4Z" />
  </g>;
}
function Synth({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect className="f-sea k" x="-42" y="-24" width="84" height="48" rx="6" />
    <rect className="paper k1" x="-38" y="-2" width="76" height="22" />
    {[-27, -16, -5, 6, 17, 28].map((c) => <line key={c} className="ln1" x1={c} x2={c} y1="-2" y2="20" />)}
    {[-24, -13, 8, 19].map((c) => <rect key={c} className="ink" x={c} y="-2" width="6" height="12" />)}
    {[-30, -16].map((c) => <circle key={c} className="f-sun k1" cx={c} cy="-12" r="4" />)}
  </g>;
}
function Notes({ x, y, s = 1 }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse className="ink" cx="-14" cy="22" rx="10" ry="7.5" transform="rotate(-20 -14 22)" /><ellipse className="ink" cx="16" cy="14" rx="10" ry="7.5" transform="rotate(-20 16 14)" />
    <path className="ln" fill="none" d="M-5 20 V-26 L25 -34 V12" /><path className="ln5" d="M-5 -24 L25 -32" style={{ strokeWidth: 7 }} />
  </g>;
}
const ICONS = { violin: Violin, flute: Flute, trumpet: Trumpet, drum: Drum, sax: Sax, guitar: Guitar, disco: DiscoBall, synth: Synth, notes: Notes };

function Orchestra() {
  const fams = [["Strings", ["bowed or", "plucked"], "violin"], ["Woodwind", ["blown"], "flute"], ["Brass", ["buzz the", "lips"], "trumpet"], ["Percussion", ["hit, shake", "or scrape"], "drum"]];
  return <Figure root={ROOT} label="The four families of the orchestra. Strings are bowed or plucked, shown by a violin. Woodwind are blown, shown by a flute. Brass are played by buzzing the lips, shown by a trumpet. Percussion are struck, shaken or scraped, shown by a drum." caption="Four families, four ways to make a sound.">
    {fams.map(([name, how, icon], i) => {
      const X = 8 + (i % 2) * 192, Y = 10 + Math.floor(i / 2) * 112, Icon = ICONS[icon];
      return <g key={name}>
        <rect className="soft k1" x={X} y={Y} width="184" height="104" rx="14" />
        <Icon x={X + 40} y={Y + 54} s={0.7} />
        <Txt x={X + 84} y={Y + 36} anchor="start" bold>{name}</Txt>
        {how.map((line, k) => <Txt key={line} x={X + 84} y={Y + 62 + k * 22} anchor="start">{line}</Txt>)}
      </g>;
    })}
  </Figure>;
}

function Strings({ v }) {
  return <Figure root={ROOT} label={{ bow: "A violin with a bow drawn across the strings.", pluck: "A violin with a finger pulling one string.", tremolo: "A violin with a bow moving back and forth very fast, shown by small zigzag marks." }[v.action]} caption={v.caption}>
    <Violin x={190} y={125} s={1.9} />
    {v.action === "pluck" && <g><circle className="f-wall k" cx="262" cy="118" r="14" /><path className="ln" fill="none" d="M196 90 Q240 118 262 118" /><Arrow x1={290} y1={80} x2={270} y2={102} cls="ln1" head={7} /></g>}
    {v.action !== "pluck" && <g>
      <line className="ln5" x1="80" x2="310" y1="168" y2="150" style={{ strokeWidth: 6 }} />
      {v.action === "bow" && <Arrow x1={300} y1={196} x2={350} y2={192} cls="ln1" head={8} />}
      {v.action === "tremolo" && <g>
        <path className="ln" fill="none" d="M318 150 l10 -12 -10 -12 10 -12 -10 -12" /><path className="ln" fill="none" d="M338 150 l10 -12 -10 -12 10 -12 -10 -12" /></g>}
    </g>}
  </Figure>;
}

// ---- Periods, world and styles -----------------------------------------------------
function Timeline({ v }) {
  const periods = ["Early", "Baroque", "Classical", "Romantic", "20th Century", "21st Century"];
  const marks = v.marks ? { Baroque: ["Handel"], Classical: ["Mozart", "Beethoven"], "20th Century": ["Holst"] } : {};
  return <Figure root={ROOT} label={`The periods of music in order from the earliest: ${periods.join(", ")}.${v.marks ? " Handel is in the Baroque period, Mozart and Beethoven are Classical, and Holst is 20th Century." : ""}`} caption="Read along the top row, then the bottom row: earliest to latest.">
    {periods.map((p, i) => {
      const X = 10 + (i % 3) * 130, Y = 12 + Math.floor(i / 3) * 110;
      return <g key={p}>
        <rect className={`f-${["sand", "sun", "leaf", "sea", "door", "roof"][i]} k`} x={X} y={Y} width="118" height="38" rx="12" />
        <Chip x={X + 59} y={Y + 18} w={116}>{p}</Chip>
        {(marks[p] ?? []).map((m, k) => <Txt key={m} x={X + 59} y={Y + 78 + k * 22} bold>{m}</Txt>)}
        {i % 3 < 2 && <Arrow x1={X + 120} y1={Y + 19} x2={X + 132} y2={Y + 19} cls="ln1" head={6} />}
      </g>;
    })}
    <path className="ln1 dash" fill="none" d="M376 52 V60 H70 V122" />
  </Figure>;
}

const PLACES = {
  nigeria: ["Nigeria", [8, 9]], southAfrica: ["South Africa", [25, -29]], brazil: ["Brazil", [-52, -12]], indonesia: ["Indonesia", [113, -2]],
  india: ["India", [80, 14]], punjab: ["Punjab", [72, 35]], trinidad: ["Trinidad", [-61, 10.5]],
};
const LEGEND = { nigeria: "drumming", southAfrica: "choral singing", brazil: "samba", indonesia: "gamelan", india: "Indian classical music", punjab: "bhangra", trinidad: "calypso and steel band" };
function Traditions({ v }) {
  const W = 400, H = 157, at = ([lon, lat]) => [((lon + 180) / 360) * W, 6 + ((80 - lat) / 140) * H];
  const ring = (r) => `M${r.map((p) => at(p).map((n) => n.toFixed(1)).join(" ")).join(" L")}Z`;
  const shown = v.places ?? Object.keys(PLACES);
  const ids = Object.keys(PLACES);
  const withLegend = v.legend !== false;
  return <Figure root={ROOT} h={withLegend ? 296 : 190} label={`A world map with ${shown.length === 1 ? "one place marked" : "places marked"}: ${shown.map((p) => `${PLACES[p][0]}${withLegend ? `, ${LEGEND[p]}` : ""}`).join("; ")}.`} caption={v.caption}>
    <rect className="f-sky" x="8" y="8" width="384" height="170" rx="12" opacity="0.45" />
    <g transform="translate(8 10) scale(.96)">
      {Object.entries(worldMaps.world.continents).filter(([id]) => id !== "antarctica").map(([id, rings]) => <path key={id} className="f-grass k1" d={rings.map(ring).join(" ")} />)}
    </g>
    {shown.map((p) => { const [x0, y0] = at(PLACES[p][1]), x = 8 + x0 * 0.96, y = 6 + y0 * 0.96, n = ids.indexOf(p) + 1;
      return <g key={p}><circle className="f-roof k" cx={x} cy={y + 4} r="13" />
        {withLegend ? <text x={x} y={y + 10} textAnchor="middle" className="v-t v-b v-on">{n}</text> : <Chip x={Math.min(Math.max(x, 60), 340)} y={y + 28} w={String(PLACES[p][0]).length * 10.4 + 20}>{PLACES[p][0]}</Chip>}
      </g>; })}
    {withLegend && shown.map((p, i) => <g key={p}><Txt x={14 + (i % 2) * 196} y={196 + Math.floor(i / 2) * 25} anchor="start"><tspan className="v-b">{ids.indexOf(p) + 1}</tspan> {PLACES[p][0]}</Txt></g>)}
  </Figure>;
}

function Styles() {
  const cards = [[["Jazz"], "sax"], [["Rock and", "roll"], "guitar"], [["Funk"], "notes"], [["Disco"], "disco"], [["Synth pop"], "synth"]];
  return <Figure root={ROOT} h={250} label="Five styles of popular music, each with a picture: jazz with a saxophone, rock and roll with a guitar, funk with music notes, disco with a mirror ball and synth pop with a synthesizer keyboard." caption="Pop music has many styles.">
    {cards.map(([name, icon], i) => {
      const Icon = ICONS[icon], X = i < 3 ? 10 + i * 130 : 75 + (i - 3) * 130, Y = i < 3 ? 10 : 130;
      return <g key={name[0]}><rect className="soft k1" x={X} y={Y} width="118" height="112" rx="14" />
        <Icon x={X + 59} y={Y + 38} s={0.7} />{name.map((l, k) => <Txt key={l} x={X + 59} y={Y + 84 + k * 22} bold>{l}</Txt>)}</g>;
    })}
  </Figure>;
}

function Icons({ v }) {
  const items = v.names;
  return <Figure root={ROOT} label={`Picture${items.length === 1 ? "" : "s"} of ${items.join(" and ")}.`} caption={v.caption}>
    {items.map((n, i) => { const Icon = ICONS[n]; return <Icon key={n} x={200 + (i - (items.length - 1) / 2) * 120} y={115} s={1.6} />; })}
  </Figure>;
}

const DRAW = { stave: Stave, rhythm: Rhythm, noteTree: NoteTree, tempo: Tempo, dynamics: Dynamics, hairpin: Hairpin, articulation: Articulation, keyboard: Keyboard, structure: Structure, texture: Texture, strings: Strings, orchestra: Orchestra, timeline: Timeline, traditions: Traditions, styles: Styles, icons: Icons, pictogram: ({ v }) => <PictogramFigure root={ROOT} v={v} />, blocks: ({ v }) => <BlocksFigure root={ROOT} v={v} /> };

export default function Year5MusicVisual({ question }) {
  const v = question?.visual;
  const Draw = v && DRAW[v.type];
  return Draw ? <Draw v={v} /> : null;
}
