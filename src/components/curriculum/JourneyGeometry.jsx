export default function JourneyGeometry({ renderer, data }) {
  if (renderer === "cartesian") return <Cartesian {...data} />;
  if (renderer === "circle") return <Circle {...data} />;
  if (renderer === "pie-chart") return <PieChart {...data} />;
  if (renderer === "net") return <Net {...data} />;
  return null;
}

function Cartesian({ min, max, points }) {
  const size = 280, pad = 30, span = max - min, step = size / span;
  const x = (value) => pad + (value - min) * step;
  const y = (value) => pad + (max - value) * step;
  return <svg className="cj-geometry" viewBox="0 0 350 350" aria-hidden="true">
    {Array.from({ length: span + 1 }, (_, i) => min + i).map((value) => <g key={value}>
      <path className={value === 0 ? "cj-geo-axis" : "cj-geo-grid"} d={`M${x(value)},${pad}V${pad + size}M${pad},${y(value)}H${pad + size}`} />
      <text className="cj-geo-tick" x={x(value)} y={y(0) + 14}>{value}</text>
      {value !== 0 && <text className="cj-geo-tick" x={x(0) - 14} y={y(value) + 4}>{value}</text>}
    </g>)}
    <text x={pad + size + 18} y={y(0) + 5}>x</text><text x={x(0)} y={pad - 14}>y</text>
    {points.map((p) => <g key={p.label}><circle className="cj-geo-point" cx={x(p.x)} cy={y(p.y)} r="4" />
      <text className="cj-geo-label" x={x(p.x) + 10} y={y(p.y) - 8}>{p.label}</text></g>)}
  </svg>;
}

function Circle({ given, value, unit }) {
  return <svg className="cj-geometry" viewBox="0 0 300 250" aria-hidden="true">
    <circle className="cj-geo-outline" cx="150" cy="125" r="95" />
    <path className="cj-geo-axis" d={given === "radius" ? "M150,125H245" : "M55,125H245"} />
    <circle className="cj-geo-point" cx="150" cy="125" r="4" />
    <text className="cj-geo-label" x={given === "radius" ? 198 : 150} y="112">{value} {unit}</text>
  </svg>;
}

function PieChart({ sectors }) {
  const total = sectors.reduce((sum, sector) => sum + sector.value, 0);
  let cursor = -Math.PI / 2;
  const slices = sectors.map((sector, i) => {
    const start = cursor, angle = sector.value / total * Math.PI * 2;
    cursor += angle;
    const sx = 150 + 100 * Math.cos(start), sy = 120 + 100 * Math.sin(start);
    const ex = 150 + 100 * Math.cos(cursor), ey = 120 + 100 * Math.sin(cursor);
    return <g key={sector.label}>
      <path className="cj-geo-sector" fillOpacity={0.22 + i * 0.08} d={`M150,120L${sx},${sy}A100,100 0 ${angle > Math.PI ? 1 : 0},1 ${ex},${ey}Z`} />
      <text className="cj-geo-label" x={150 + 72 * Math.cos(start + angle / 2)} y={125 + 72 * Math.sin(start + angle / 2)}>{i + 1}</text>
    </g>;
  });
  return <div className="cj-pie-model"><svg className="cj-geometry" viewBox="0 0 300 240" aria-hidden="true">{slices}</svg>
    <ol className="cj-pie-key">{sectors.map((sector) => <li key={sector.label}>{sector.label}</li>)}</ol></div>;
}

function Net({ cells }) {
  const maxX = Math.max(...cells.map(([x]) => x)), maxY = Math.max(...cells.map(([, y]) => y));
  return <svg className="cj-geometry" viewBox={`0 0 ${(maxX + 1) * 50 + 20} ${(maxY + 1) * 50 + 20}`} aria-hidden="true">
    {cells.map(([x, y]) => <rect key={`${x},${y}`} className="cj-geo-net-square" x={10 + x * 50} y={10 + y * 50} width="50" height="50" />)}
  </svg>;
}
