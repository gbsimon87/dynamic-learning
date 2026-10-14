import ArrayGrid from "../../../../../components/challenge/ArrayGrid";
import PlaceValueBlocks from "../../../../../components/challenge/PlaceValueBlocks";
import PositionBoard from "../../../../../components/challenge/PositionBoard";
import ScaleReader from "../../../../../components/challenge/ScaleReader";
import ShapeFigure from "../../../../../components/challenge/ShapeFigure";
import SolidFigure from "../../../../../components/challenge/SolidFigure";
import { findShape, findSolid } from "../../../../../data/challenges/shapes";
import "./Year1MathVisual.css";

export default function Year1MathVisual({ visual: v }) {
  if (!v) return null;
  return <div className="y1-math-visual">{draw(v)}</div>;
}

function draw(v) {
  switch (v.type) {
    case "objects": return <div className="y1-groups">{v.groups.map((group, i) => (
      <div key={i} className="y1-counter-group" role={v.countable ? "group" : "img"} aria-label={v.countable ? group.label : `${group.label}: ${group.count} ${group.noun ?? "counters"}${group.crossed ? `, ${group.crossed} crossed out` : ""}${group.marked ? `, ${group.marked} coloured in` : ""}`}>
        <p>{group.label}</p>
        <div className={`y1-counters ${group.rowSize ? "rows" : ""}`} style={group.rowSize ? { "--y1-row": group.rowSize } : undefined}>{Array.from({ length: group.count }, (_, j) => <span key={j} className={`y1-counter ${j < (group.crossed ?? 0) ? "crossed" : ""} ${j < (group.marked ?? 0) ? "marked" : ""}`} {...counterA11y(v, group)}>{group.icon ?? "●"}</span>)}
          {group.count === 0 && <span>empty</span>}
        </div>
      </div>
    ))}</div>;
    case "numberTrack": return <NumberTrack visual={v} />;
    case "groups": return <ArrayGrid rows={Array.from({ length: v.rows }, (_, i) => Array.from({ length: v.columns }, (_, j) => `${i}-${j}`))} label={`${v.rows} equal rows of ${v.columns} counters`} />;
    case "blocks": return <PlaceValueBlocks blocks={{ hundreds: Math.floor(v.number / 100), tens: Math.floor(v.number / 10) % 10, ones: v.number % 10 }} showCounts={false} columns={v.number >= 100 ? undefined : ["tens", "ones"]} label="Count the base-ten blocks" />;
    // `strips` lists each strip's part widths; labels never say which strip is equal.
    case "equalParts": if (v.strips) return <div className="y1-groups">{v.strips.map((widths, i) => {
      const name = String.fromCharCode(65 + i);
      return <div key={i} className="y1-fraction-example"><p>{name}</p>
        <div className={`y1-parts ${v.rotation ? "vertical" : ""}`} role="img" aria-label={`Strip ${name} cut into ${widths.length} parts with one shaded`}>
          {widths.map((width, j) => <span key={j} className={j === 0 ? "shaded" : ""} style={{ flex: width }} />)}
        </div>
      </div>;
    })}</div>;
    return <div className="y1-groups">{[true, false].map((equal, i) => {
      const correct = v.correctFirst ? equal : !equal;
      const actual = correct ? Array(v.parts).fill(1) : v.parts === 2 ? [1, 3] : [1, 1, 1, 5];
      return <div key={i} className="y1-fraction-example"><p>{i === 0 ? "A" : "B"}</p>
        <div className={`y1-parts ${v.rotation ? "vertical" : ""}`} role="img" aria-label={`Strip ${i === 0 ? "A" : "B"} cut into ${v.parts} parts with one shaded`}>
          {actual.map((width, j) => <span key={j} className={j === 0 ? "shaded" : ""} style={{ flex: width }} />)}
        </div>
      </div>;
    })}</div>;
    // Rows are a group named only by their label; each unit is read out singly, never the total being asked for.
    case "measure": return <div className="y1-measures">{v.rows.map(row => {
      const unit = v.measure === "length" ? "block" : v.measure === "mass" ? "cube" : "cup";
      const units = className => <div className={className}>{Array.from({ length: row.value }, (_, j) => <span key={j} className={className === "y1-cups" ? "y1-cup" : undefined} role="img" aria-label={unit} />)}</div>;
      return <div className="y1-measure-row" key={row.label} role="group" aria-label={row.label}>
        <p>{row.label}</p>
        {v.measure === "length" ? <div className="y1-length">
          <div className="y1-ribbon" style={{ width: `${row.value * 24}px` }} />
          {units("y1-units")}
        </div> : v.measure === "mass" ? <div className="y1-balance">
          <div className="y1-pans"><span aria-hidden="true">🎒</span>{units("y1-units")}</div>
          <div className="y1-beam" /><span className="y1-fulcrum" aria-hidden="true">▲</span>
        </div> : <div className="y1-cup-measure">
          <span className="y1-jug-icon" aria-hidden="true">▱</span><span>holds</span>{units("y1-cups")}
        </div>}
        <small>{v.measure === "mass" ? "Balanced with equal cubes" : `Each ${unit} is the same size`}</small>
      </div>;
    })}</div>;
    // `jugs` draws several labelled jugs; the label never says how full a jug is.
    case "capacity": return v.jugs ? <div className="y1-groups">{v.jugs.map(jug => <div key={jug.label} className="y1-fraction-example"><p>{jug.label}</p><Jug fill={jug.fill} label={`Jug ${jug.label}`} /></div>)}</div>
      : <Jug fill={v.fill} label="A jug with water in it" />;
    case "ruler": {
      const max = v.max ?? 10, percent = `${(v.value / max) * 100}%`;
      return <div className={`y1-ruler ${v.vertical ? "vertical" : ""}`}>
        <ScaleReader min={0} max={max} majorStep={1} value={v.value} unit="cm" orientation={v.vertical ? "vertical" : "horizontal"} label={`A ruler marked from 0 to ${max} centimetres`}>
          <div className="y1-measured-object" role="img" aria-label={`A ${v.object ?? (v.vertical ? "tower" : "ribbon")} alongside the ruler`} style={v.vertical ? { height: percent } : { width: percent }} />
        </ScaleReader>
      </div>;
    }
    case "instrument": return <div className="y1-instrument">
      {v.icon && <span className="y1-instrument-icon" aria-hidden="true">{v.icon}</span>}
      <ScaleReader min={0} max={v.max ?? 10} majorStep={v.step ?? 1} value={v.value} unit={v.unit} orientation={v.vertical ? "vertical" : "horizontal"} variant={v.vertical ? "jug" : ""} label={v.label ?? (v.vertical ? "A measuring jug with a litre scale" : "A kitchen scale marked in grams")} />
    </div>;
    case "timer": return <div className="y1-timer" role="img" aria-label={`Timer showing ${v.seconds} seconds`}>⏱ <strong>00:{String(v.seconds).padStart(2, "0")}</strong> seconds</div>;
    case "money": return <Money value={v.value} note={v.note} />;
    // `items` mixes coins and notes; `labels` names each piece (A, B, C) for "which one" questions.
    case "moneySet": return <div className="y1-groups">{(v.items ?? v.values.map(value => ({ value, note: v.notes }))).map((item, i) => v.labels
      ? <div key={i} className="y1-fraction-example"><p>{v.labels[i]}</p><Money value={item.value} note={item.note} /></div>
      : <Money key={i} value={item.value} note={item.note} />)}</div>;
    case "shapes": return <div className="y1-groups">{v.shapes.map((shape, i) => <div key={i} className="y1-shape-card">
      {shape.label && <p>{shape.label}</p>}
      <div style={{ transform: `scale(${shape.scale ?? 1})${v.solid ? "" : ` rotate(${shape.rotation ?? 0}deg)`}` }}>
        {/* The label names the card, never the shape: naming it is the question. */}
        {v.solid ? <SolidFigure solid={findSolid(shape.id)} rotation={shape.rotation} label={shape.label ?? "a solid shape"} /> : <ShapeFigure shape={findShape(shape.id)} label={shape.label ?? "a flat shape"} />}
      </div>
    </div>)}</div>;
    case "position": return <PositionBoard size={v.size ?? 3} objects={v.objects} label={v.label ?? "Look at where the objects are compared with the bear"} />;
    // `place` is inside, on top of, under or next to; the label never says which.
    case "place": return <div className="y1-place" role="img" aria-label={`${/^[aeiou]/.test(v.name) ? "An" : "A"} ${v.name} and a box`}>
      <span className="y1-place-top" aria-hidden="true">{v.place === "on top of" && v.emoji}</span>
      <div className="y1-box" aria-hidden="true">{v.place === "inside" && v.emoji}</div>
      <span className="y1-place-side" aria-hidden="true">{v.place === "next to" && v.emoji}</span>
      <span className="y1-place-under" aria-hidden="true">{v.place === "under" && v.emoji}</span>
    </div>;
    case "inside": return <div className="y1-box-scene" role="img" aria-label={`A ball ${v.inside ? "inside" : "outside"} a box`}><div className="y1-box">{v.inside && "⚽"}</div>{!v.inside && <span>⚽</span>}</div>;
    case "movement": return <Movement visual={v} />;
    case "turn": return <Turn visual={v} />;
    default: return null;
  }
}

/** `countable` objects: a screen reader hears each item, never the total it is asked to count. */
function counterA11y(v, group) {
  return v.countable ? { role: "img", "aria-label": group.noun ?? "counter" } : { "aria-hidden": "true" };
}

/** `blanks` draws the start, that many empty steps, then "?" — the hops, not the numbers. `reverse` for counting back. */
function NumberTrack({ visual: v }) {
  if (v.blanks === undefined) return <div className="y1-track" aria-label="Counting path">{v.terms.map(n => <span key={n}>{n}</span>)}<span>?</span></div>;
  const cells = [String(v.terms[0]), ...Array(v.blanks).fill(""), "?"];
  if (v.reverse) cells.reverse();
  return <div className="y1-track" role="img" aria-label={`Number track from ${v.terms[0]}, ${v.blanks + 1} jumps ${v.reverse ? "back" : "forwards"}`}>
    {cells.map((cell, i) => <span key={i} className={cell === "" ? "blank" : ""} aria-hidden="true">{cell}</span>)}
  </div>;
}

function Jug({ fill, label }) {
  return <div className="y1-capacity" role="img" aria-label={label}>
    <div className="y1-water" style={{ height: `${fill * 25}%` }} />{[25, 50, 75].map(n => <span key={n} className="y1-jug-mark" style={{ bottom: `${n}%` }} />)}
  </div>;
}

function Money({ value, note }) {
  const name = note ? `£${value}` : value < 100 ? `${value}p` : `£${value / 100}`;
  return <div className={`y1-money ${note ? "note" : `coin coin-${value}`}`} role="img" aria-label={`${name} ${note ? "note" : "coin"}`}>
    {note && <small>Bank of England</small>}<strong>{name}</strong>{note && <small>Pounds</small>}
  </div>;
}

function Movement({ visual: v }) {
  if (v.towards !== undefined) return <div className="y1-distance" role="img" aria-label={`Maya moves ${v.towards ? "towards" : "away from"} Bix`}>🧒 <span>{v.towards ? "→" : "←"}</span> 🧸</div>;
  const point = p => [40 + p.x * 70, 40 + p.y * 70];
  const [x1, y1] = point(v.from), [x2, y2] = point(v.to);
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const tipX = x2 - 22 * Math.cos(angle), tipY = y2 - 22 * Math.sin(angle);
  return <svg className="y1-move-board" viewBox="0 0 220 220" role="img" aria-label="Arrow from the bear to the star">
    {[0, 1, 2].flatMap(y => [0, 1, 2].map(x => <rect key={`${x}-${y}`} className="y1-grid-square" x={x * 70 + 5} y={y * 70 + 5} width="70" height="70" />))}
    <line className="y1-move-line" x1={x1} y1={y1} x2={tipX} y2={tipY} />
    <path className="y1-move-tip" d="M-10 -8 L0 0 L-10 8" transform={`translate(${tipX} ${tipY}) rotate(${angle * 180 / Math.PI})`} />
    <text x={x1} y={y1 + 10} textAnchor="middle">🧸</text><text x={x2} y={y2 + 10} textAnchor="middle">⭐</text>
  </svg>;
}

function Turn({ visual: v }) {
  const end = (v.start + (v.clockwise ? v.quarters : -v.quarters) + 4) % 4;
  const point = quarter => {
    const angle = quarter * Math.PI / 2 - Math.PI / 2;
    return [100 + 72 * Math.cos(angle), 100 + 72 * Math.sin(angle)];
  };
  const arcs = Array.from({ length: v.quarters }, (_, i) => {
    const start = v.start + (v.clockwise ? i : -i), finish = start + (v.clockwise ? 1 : -1);
    const [x1, y1] = point(start), [x2, y2] = point(finish);
    return <path key={i} className="y1-turn-arc" d={`M${x1} ${y1} A72 72 0 0 ${v.clockwise ? 1 : 0} ${x2} ${y2}`} />;
  });
  const [tipX, tipY] = point(v.start + (v.clockwise ? v.quarters : -v.quarters));
  return <svg className="y1-turn-board" viewBox="0 0 200 200" role="img" aria-label={turnLabel(v, end)}>
    <circle className="y1-turn-guide" cx="100" cy="100" r="72" />
    {[0, 1, 2, 3].map(n => { const [x, y] = point(n); return <circle key={n} className="y1-turn-mark" cx={x} cy={y} r="4" />; })}
    <path className="y1-start-arrow" d="M100 135 L100 60 M85 75 L100 60 L115 75" transform={`rotate(${v.start * 90} 100 100)`} />
    {v.showEnd && <>{v.arcs !== false && <>{arcs}<path className="y1-move-tip" d="M-9 -7 L0 0 L-9 7" transform={`translate(${tipX} ${tipY}) rotate(${end * 90 + (v.clockwise ? 0 : 180)})`} /></>}
      <path className="y1-end-arrow" d="M100 135 L100 60 M85 75 L100 60 L115 75" transform={`rotate(${end * 90} 100 100)`} /></>}
  </svg>;
}

/** Says where the arrows face, never how many quarter turns: that count is the answer. */
function turnLabel(v, end) {
  const face = n => ["up", "right", "down", "left"][n];
  if (!v.showEnd) return `An arrow facing ${face(v.start)}`;
  const curve = v.arcs === false ? "" : `, a curved arrow going ${v.clockwise ? "clockwise" : "anti-clockwise"},`;
  return `A dotted arrow facing ${face(v.start)}${curve} and a solid arrow facing ${face(end)}`;
}
