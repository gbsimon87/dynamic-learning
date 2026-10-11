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
      <div key={i} className="y1-counter-group" role="img" aria-label={`${group.label}: ${group.count} counters${group.crossed ? `, ${group.crossed} crossed out` : ""}`}>
        <p>{group.label}</p>
        <div className="y1-counters">{Array.from({ length: group.count }, (_, j) => <span key={j} className={`y1-counter ${j < (group.crossed ?? 0) ? "crossed" : ""}`} aria-hidden="true">●</span>)}
          {group.count === 0 && <span>empty</span>}
        </div>
      </div>
    ))}</div>;
    case "numberTrack": return <div className="y1-track" aria-label="Counting path">{v.terms.map(n => <span key={n}>{n}</span>)}<span>?</span></div>;
    case "groups": return <ArrayGrid rows={Array.from({ length: v.rows }, (_, i) => Array.from({ length: v.columns }, (_, j) => `${i}-${j}`))} label={`${v.rows} equal rows of ${v.columns} counters`} />;
    case "blocks": return <PlaceValueBlocks blocks={{ hundreds: Math.floor(v.number / 100), tens: Math.floor(v.number / 10) % 10, ones: v.number % 10 }} showCounts={false} label="Count the base-ten blocks" />;
    case "equalParts": return <div className="y1-groups">{[true, false].map((equal, i) => {
      const correct = v.correctFirst ? equal : !equal;
      const actual = correct ? Array(v.parts).fill(1) : v.parts === 2 ? [1, 3] : [1, 1, 1, 5];
      return <div key={i} className="y1-fraction-example"><p>{i === 0 ? "A" : "B"}</p>
        <div className={`y1-parts ${v.rotation ? "vertical" : ""}`} role="img" aria-label={`Strip ${i === 0 ? "A" : "B"} in ${v.parts} ${correct ? "equal" : "unequal"} parts with one shaded`}>
          {actual.map((width, j) => <span key={j} className={j === 0 ? "shaded" : ""} style={{ flex: width }} />)}
        </div>
      </div>;
    })}</div>;
    case "measure": return <div className="y1-measures">{v.rows.map(row => (
      <div className="y1-measure-row" key={row.label}>
        <p>{row.label}</p>
        {v.measure === "length" ? <div className="y1-length" role="img" aria-label={`${row.label} spans ${row.value} equal blocks`}>
          <div className="y1-ribbon" style={{ width: `${row.value * 24}px` }} />
          <div className="y1-units">{Array.from({ length: row.value }, (_, j) => <span key={j} />)}</div>
        </div> : v.measure === "mass" ? <div className="y1-balance" role="img" aria-label={`${row.label} balances ${row.value} equal cubes`}>
          <div className="y1-pans"><span aria-hidden="true">🎒</span><div className="y1-units">{Array.from({ length: row.value }, (_, j) => <span key={j} />)}</div></div>
          <div className="y1-beam" /><span className="y1-fulcrum" aria-hidden="true">▲</span>
        </div> : <div className="y1-cup-measure" role="img" aria-label={`${row.label} holds ${row.value} equal cups of water`}>
          <span className="y1-jug-icon" aria-hidden="true">▱</span><span>holds</span><div className="y1-cups">{Array.from({ length: row.value }, (_, j) => <span key={j} className="y1-cup" />)}</div>
        </div>}
        <small>{v.measure === "mass" ? "Balanced with equal cubes" : `Each ${v.unit === "cups" ? "cup" : "block"} is the same size`}</small>
      </div>
    ))}</div>;
    case "capacity": return <div className="y1-capacity" role="img" aria-label={`Jug ${v.fill === 0 ? "empty" : v.fill === 4 ? "full" : v.fill === 2 ? "half full" : "quarter full"}`}>
      <div className="y1-water" style={{ height: `${v.fill * 25}%` }} />{[25, 50, 75].map(n => <span key={n} className="y1-jug-mark" style={{ bottom: `${n}%` }} />)}
    </div>;
    case "ruler": return <div className={`y1-ruler ${v.vertical ? "vertical" : ""}`}>
      <ScaleReader min={0} max={10} majorStep={1} value={v.value} unit="cm" orientation={v.vertical ? "vertical" : "horizontal"} label="A ruler marked from zero to ten centimetres">
        <div className="y1-measured-object" role="img" aria-label={v.vertical ? "A tower alongside the ruler" : "A ribbon alongside the ruler"} style={v.vertical ? { height: `${v.value * 10}%` } : { width: `${v.value * 10}%` }} />
      </ScaleReader>
    </div>;
    case "instrument": return <ScaleReader min={0} max={10} majorStep={1} value={v.value} unit={v.unit} orientation={v.vertical ? "vertical" : "horizontal"} variant={v.vertical ? "jug" : ""} label={v.vertical ? "A measuring jug with a litre scale" : "A kitchen scale marked in grams"} />;
    case "timer": return <div className="y1-timer" role="img" aria-label={`Timer showing ${v.seconds} seconds`}>⏱ <strong>00:{String(v.seconds).padStart(2, "0")}</strong> seconds</div>;
    case "money": return <Money value={v.value} note={v.note} />;
    case "moneySet": return <div className="y1-groups">{v.values.map(value => <Money key={value} value={value} note={v.notes} />)}</div>;
    case "shapes": return <div className="y1-groups">{v.shapes.map((shape, i) => <div key={i} className="y1-shape-card">
      {shape.label && <p>{shape.label}</p>}
      <div style={{ transform: `scale(${shape.scale ?? 1})${v.solid ? "" : ` rotate(${shape.rotation ?? 0}deg)`}` }}>
        {v.solid ? <SolidFigure solid={findSolid(shape.id)} rotation={shape.rotation} /> : <ShapeFigure shape={findShape(shape.id)} />}
      </div>
    </div>)}</div>;
    case "position": return <PositionBoard size={3} objects={v.objects} label="Look at where the objects are compared with the bear" />;
    case "inside": return <div className="y1-box-scene" role="img" aria-label={`A ball ${v.inside ? "inside" : "outside"} a box`}><div className="y1-box">{v.inside && "⚽"}</div>{!v.inside && <span>⚽</span>}</div>;
    case "movement": return <Movement visual={v} />;
    case "turn": return <Turn visual={v} />;
    default: return null;
  }
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
  return <svg className="y1-turn-board" viewBox="0 0 200 200" role="img" aria-label={`Arrow starts facing ${["up", "right", "down", "left"][v.start]}${v.showEnd ? ` and makes ${v.quarters} quarter turns ${v.clockwise ? "clockwise" : "anti-clockwise"}` : ""}`}>
    <circle className="y1-turn-guide" cx="100" cy="100" r="72" />
    {[0, 1, 2, 3].map(n => { const [x, y] = point(n); return <circle key={n} className="y1-turn-mark" cx={x} cy={y} r="4" />; })}
    <path className="y1-start-arrow" d="M100 135 L100 60 M85 75 L100 60 L115 75" transform={`rotate(${v.start * 90} 100 100)`} />
    {v.showEnd && <>{arcs}<path className="y1-move-tip" d="M-9 -7 L0 0 L-9 7" transform={`translate(${tipX} ${tipY}) rotate(${end * 90 + (v.clockwise ? 0 : 180)})`} />
      <path className="y1-end-arrow" d="M100 135 L100 60 M85 75 L100 60 L115 75" transform={`rotate(${end * 90} 100 100)`} /></>}
  </svg>;
}
