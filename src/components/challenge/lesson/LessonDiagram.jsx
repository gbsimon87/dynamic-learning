/** Small, labelled teaching diagrams. All measurements come from the example;
 * these never read a challenge's answer or response.
 */
export default function LessonDiagram({ kind, label, ...data }) {
  return <svg className="lesson-diagram" viewBox="0 0 360 230" role="img" aria-label={label}>
    {kind === "rectangle" && <Rectangle {...data} />}
    {kind === "angle" && <Angle {...data} />}
    {kind === "polygon" && <Polygon {...data} />}
    {kind === "coordinates" && <Coordinates {...data} />}
    {kind === "graph" && <Graph {...data} />}
    {kind === "cuboid" && <Cuboid {...data} />}
    {kind === "grid" && <Grid {...data} />}
  </svg>;
}

function Rectangle({ width, height, unit = "cm", cells = false }) {
  const scale = Math.min(250 / width, 140 / height, 35);
  const w = width * scale, h = height * scale, x = (360 - w) / 2, y = (220 - h) / 2;
  return <g>
    <rect className="lesson-diagram-shape" x={x} y={y} width={w} height={h} />
    {cells && <g className="lesson-diagram-grid">
      {Array.from({ length: width - 1 }, (_, i) => <path key={`x${i}`} d={`M${x + (i + 1) * scale},${y}v${h}`} />)}
      {Array.from({ length: height - 1 }, (_, i) => <path key={`y${i}`} d={`M${x},${y + (i + 1) * scale}h${w}`} />)}
    </g>}
    <text x="180" y={y - 12}>{width} {unit}</text>
    <text x={x + w + 10} y={y + h / 2 + 5} textAnchor="start">{height} {unit}</text>
  </g>;
}

function Angle({ degrees }) {
  const rad = degrees * Math.PI / 180, cx = 175, cy = 125, r = 85, arc = 42;
  const end = [cx + r * Math.cos(rad), cy - r * Math.sin(rad)];
  return <g>
    <path className="lesson-diagram-line" d={`M${cx + r},${cy}H${cx}L${end}`} />
    <path className="lesson-diagram-accent" d={`M${cx + arc},${cy}A${arc},${arc} 0 ${degrees > 180 ? 1 : 0} 0 ${cx + arc * Math.cos(rad)},${cy - arc * Math.sin(rad)}`} />
    <circle className="lesson-diagram-dot" cx={cx} cy={cy} r="4" />
    <text x="180" y="218">{degrees}°</text>
  </g>;
}

function Polygon({ points, caption }) {
  return <g><polygon className="lesson-diagram-shape" points={points.map(p => p.join(",")).join(" ")} />
    {points.map(([x, y], i) => <circle key={i} className="lesson-diagram-dot" cx={x} cy={y} r="4" />)}
    <text x="180" y="218">{caption}</text>
  </g>;
}

const point = ([x, y]) => [55 + x * 30, 185 - y * 30];
function Coordinates({ before, after, mirror }) {
  return <g>
    <g className="lesson-diagram-grid">{Array.from({ length: 6 }, (_, i) => <g key={i}>
      <path d={`M55,${185 - i * 30}H205M${55 + i * 30},35V185`} />
      <text x={55 + i * 30} y="205">{i}</text><text x="38" y={190 - i * 30}>{i}</text>
    </g>)}</g>
    <text x="225" y="190">x</text><text x="45" y="22">y</text>
    {mirror !== undefined && <path className="lesson-diagram-line lesson-diagram-dashed" d={`M${55 + mirror * 30},25V195`} />}
    <polygon className="lesson-diagram-shape" points={before.map(p => point(p).join(",")).join(" ")} />
    <polygon className="lesson-diagram-line lesson-diagram-dashed" points={after.map(p => point(p).join(",")).join(" ")} />
    <text x="280" y="80">Original</text><path className="lesson-diagram-accent" d="M250,95h60" />
    <text x="280" y="135">Image</text><path className="lesson-diagram-line lesson-diagram-dashed" d="M250,150h60" />
  </g>;
}

function Graph({ labels, values, unit, step = 5 }) {
  const top = Math.ceil(Math.max(...values) / step) * step;
  const xy = (v, i) => [60 + i * 240 / (values.length - 1), 180 - v / top * 140];
  return <g>
    {Array.from({ length: top / step + 1 }, (_, i) => <g key={i} className="lesson-diagram-grid">
      <path d={`M60,${180 - i * step / top * 140}H300`} />
      <text x="40" y={185 - i * step / top * 140}>{i * step}</text>
    </g>)}
    <text x="180" y="20">{unit}</text>
    <polyline className="lesson-diagram-accent" points={values.map((v, i) => xy(v, i).join(",")).join(" ")} />
    {values.map((v, i) => <g key={i}><circle className="lesson-diagram-dot" cx={xy(v, i)[0]} cy={xy(v, i)[1]} r="5" />
      <text x={xy(v, i)[0]} y="208">{labels[i]}</text></g>)}
  </g>;
}

function Cuboid({ length, width, height }) {
  const scale = Math.min(120 / length, 70 / width, 110 / height);
  const p = (x, y, z) => [95 + x * scale + y * scale * .65, 180 - z * scale - y * scale * .45];
  const points = list => list.map(([x, y, z]) => p(x, y, z).join(",")).join(" ");
  return <g>
    <polygon className="lesson-diagram-shape" points={points([[0, 0, 0], [length, 0, 0], [length, 0, height], [0, 0, height]])} />
    <polygon className="lesson-diagram-shape" points={points([[length, 0, 0], [length, width, 0], [length, width, height], [length, 0, height]])} />
    <polygon className="lesson-diagram-shape" points={points([[0, 0, height], [length, 0, height], [length, width, height], [0, width, height]])} />
    <text x={95 + length * scale / 2} y="207">{length} cm</text>
    <text x="55" y={180 - height * scale / 2}>{height} cm</text>
    <text x={110 + length * scale + width * scale * .4} y={190 - width * scale * .2}>{width} cm</text>
  </g>;
}

function Grid({ columns, rows, shaded }) {
  const size = Math.min(250 / columns, 175 / rows), left = (360 - columns * size) / 2;
  return <g>{Array.from({ length: columns * rows }, (_, i) => <rect key={i}
    className={i < shaded ? "lesson-diagram-shape" : "lesson-diagram-empty"}
    x={left + i % columns * size} y={15 + Math.floor(i / columns) * size} width={size} height={size} />)}
    <text x="180" y="218">{shaded} of {columns * rows} equal squares shaded</text>
  </g>;
}
