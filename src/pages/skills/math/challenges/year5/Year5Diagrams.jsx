// Drawings for the Year 5 Maths questions. Each is a plain SVG that takes its data as props.
// Colours come from CSS classes in Year5Math.css, which read the theme tokens.

const rad = degrees => (degrees * Math.PI) / 180;

export function Frame({ label, children, viewBox, className = '' }) {
  return <svg className={`year5-diagram ${className}`} role="img" aria-label={label} viewBox={viewBox}>{children}</svg>;
}

/* ---------- number line, fractions, percentages ---------- */

export function NumberLine5({ min, max, marks = [] }) {
  const spacing = 32, width = (max - min) * spacing + 60, x = value => 30 + (value - min) * spacing;
  return <div className="year5-scroll"><Frame label={`Number line from ${min} to ${max}${marks.length ? `, with ${marks.map(m => m.value).join(' and ')} marked` : ''}`} viewBox={`0 0 ${width} 90`} className="year5-wide">
    <path className="year5-stroke" d={`M 14 40 H ${width - 14}`} />
    {Array.from({ length: max - min + 1 }, (_, k) => min + k).map(v => <g key={v}>
      <path className="year5-stroke" d={`M ${x(v)} ${v === 0 ? 28 : 33} V ${v === 0 ? 52 : 47}`} />
      <text x={x(v)} y="72">{v < 0 ? `−${Math.abs(v)}` : v}</text>
    </g>)}
    {marks.map(m => <circle key={m.value} className="year5-fill year5-accent-fill" cx={x(m.value)} cy="40" r="7" />)}
  </Frame></div>;
}

export function FractionBars({ rows }) {
  const cell = (d, bars) => ({ w: 280 / d, h: 28, bars });
  const total = rows.reduce((sum, row) => sum + (row.bars ?? 1), 0);
  let y = 8;
  const label = rows.map(row => `a bar split into ${row.d} equal parts, ${row.n} shaded${(row.bars ?? 1) > 1 ? ` across ${row.bars} bars` : ''}`).join('; ');
  return <Frame label={`Fraction bars: ${label}`} viewBox={`0 0 300 ${total * 38 + 12}`}>
    {rows.map((row, ri) => {
      const bars = row.bars ?? 1, out = [];
      for (let b = 0; b < bars; b++) {
        out.push(Array.from({ length: row.d }, (_, k) => {
          const index = b * row.d + k, c = cell(row.d, bars);
          return <rect key={`${ri}-${b}-${k}`} x={10 + k * c.w} y={y} width={c.w} height={c.h} className={index < row.n ? 'year5-filled' : 'year5-empty'} />;
        }));
        y += 38;
      }
      return <g key={ri}>{out}</g>;
    })}
  </Frame>;
}

export function HundredGrid({ n }) {
  return <Frame label={`A grid of 100 squares with ${n} shaded`} viewBox="0 0 230 230" className="year5-square">
    {Array.from({ length: 100 }, (_, k) => <rect key={k} x={10 + (k % 10) * 21} y={10 + Math.floor(k / 10) * 21} width="21" height="21" className={k < n ? 'year5-filled' : 'year5-empty'} />)}
  </Frame>;
}

/* ---------- measures ---------- */

export function RectDiagram({ w, h, unit, labels }) {
  const s = Math.min(280 / w, 150 / h, 26), W = w * s, H = h * s, x = 50, y = 30, mark = 10;
  return <Frame label={`Rectangle. Top side ${labels.w} ${unit}, left side ${labels.h} ${unit}${labels.hideBottom ? ', bottom side unknown' : ''}${labels.hideRight ? ', right side unknown' : ''}`} viewBox={`0 0 ${W + 110} ${H + 80}`}>
    <rect x={x} y={y} width={W} height={H} className="year5-empty" />
    {[[x, y, 1, 1], [x + W, y, -1, 1], [x + W, y + H, -1, -1], [x, y + H, 1, -1]].map(([cx, cy, dx, dy], k) =>
      <path key={k} className="year5-thin" d={`M ${cx + dx * mark} ${cy} V ${cy + dy * mark} H ${cx}`} />)}
    <text x={x + W / 2} y={y - 8}>{labels.w} {unit}</text>
    <text x={x - 8} y={y + H / 2 + 5} textAnchor="end">{labels.h}</text>
    {labels.hideBottom && <text x={x + W / 2} y={y + H + 24}>?</text>}
    {labels.hideRight && <text x={x + W + 22} y={y + H / 2 + 5}>?</text>}
  </Frame>;
}

export function Rectilinear({ points, labels, unit }) {
  const xs = points.map(p => p[0]), ys = points.map(p => p[1]), W = Math.max(...xs), H = Math.max(...ys);
  const s = Math.min(24, 240 / W, 170 / H), ox = 45, oy = 36, at = ([x, y]) => [ox + x * s, oy + y * s];
  const said = labels.map(t => (t ? `${t} ${unit}` : 'not labelled')).join(', ');
  return <Frame label={`Shape made of rectangles. Going round the edges clockwise from the top left: ${said}`} viewBox={`0 0 ${W * s + 100} ${H * s + 90}`}>
    <polygon points={points.map(p => at(p).join(',')).join(' ')} className="year5-empty" />
    {points.map((p, k) => {
      if (!labels[k]) return null;
      const q = points[(k + 1) % points.length], [x1, y1] = at(p), [x2, y2] = at(q), len = Math.hypot(x2 - x1, y2 - y1) || 1;
      return <text key={k} x={(x1 + x2) / 2 + ((y2 - y1) / len) * 15} y={(y1 + y2) / 2 - ((x2 - x1) / len) * 15 + 5}>{labels[k]}</text>;
    })}
    <text x={ox + (W * s) / 2} y={oy + H * s + 36} className="year5-small">All lengths are in {unit}</text>
  </Frame>;
}

export function CellsEstimate({ width, height, full, part }) {
  const has = (list, x, y) => list.some(([a, b]) => a === x && b === y);
  return <figure className="year5-figure"><Frame label={`Grid of squares with an irregular shape: ${full.length} whole squares and ${part.length} part squares`} viewBox={`0 0 ${width * 30 + 20} ${height * 30 + 20}`}>
    {Array.from({ length: width * height }, (_, k) => {
      const x = k % width, y = Math.floor(k / width);
      return <rect key={k} x={10 + x * 30} y={10 + y * 30} width="30" height="30" className={has(full, x, y) ? 'year5-filled' : has(part, x, y) ? 'year5-part' : 'year5-empty'} />;
    })}
  </Frame><figcaption>Dark squares are whole squares. Pale squares are part squares.</figcaption></figure>;
}

const ISO = { c: Math.cos(rad(30)), s: Math.sin(rad(30)) };
/** Isometric cuboid of l × w × h cubes. grid: draw the cube lines; hidden: show the hidden edges dashed. */
export function Cuboid({ l, w, h, grid = false, hidden = false, label }) {
  const u = Math.min(28, 250 / ((l + w) * ISO.c), 200 / ((l + w) * ISO.s + h)), { c, s } = ISO;
  const ox = w * c * u + 12, oy = (l + w) * s * u + h * u + 12;
  const P = (a, b, z) => [ox + (a - b) * c * u, oy - (a + b) * s * u - z * u];
  const poly = pts => pts.map(p => p.join(',')).join(' ');
  const lines = [];
  if (grid) {
    for (let k = 1; k < l; k++) { lines.push([P(k, 0, 0), P(k, 0, h)], [P(k, 0, h), P(k, w, h)]); }
    for (let k = 1; k < h; k++) { lines.push([P(0, 0, k), P(l, 0, k)], [P(0, 0, k), P(0, w, k)]); }
    for (let k = 1; k < w; k++) { lines.push([P(0, k, 0), P(0, k, h)], [P(0, k, h), P(l, k, h)]); }
  }
  return <Frame label={label ?? `A cuboid made of ${l} by ${w} by ${h} cubes`} viewBox={`0 0 ${(l + w) * c * u + 24} ${oy + 12}`}>
    <polygon points={poly([P(0, 0, 0), P(0, w, 0), P(0, w, h), P(0, 0, h)])} className="year5-face-left" />
    <polygon points={poly([P(0, 0, 0), P(l, 0, 0), P(l, 0, h), P(0, 0, h)])} className="year5-face-right" />
    <polygon points={poly([P(0, 0, h), P(l, 0, h), P(l, w, h), P(0, w, h)])} className="year5-face-top" />
    {hidden && <g className="year5-dashed"><path d={`M ${P(l, w, 0)} L ${P(l, 0, 0)} M ${P(l, w, 0)} L ${P(0, w, 0)} M ${P(l, w, 0)} L ${P(l, w, h)}`} /></g>}
    {lines.map(([a, b], k) => <path key={k} className="year5-grid" d={`M ${a} L ${b}`} />)}
  </Frame>;
}

/* ---------- solids and nets ---------- */

export function Solid({ shape, dims }) {
  if (shape === 'cube') return <Cuboid l={2} w={2} h={2} hidden label="A cube drawn as a flat picture" />;
  if (shape === 'cuboid') { const [l, w, h] = dims ?? [3, 2, 2]; return <Cuboid l={l} w={w} h={h} hidden label="A cuboid drawn as a flat picture" />; }
  if (shape === 'triangularPrism') return <Frame label="A triangular prism drawn as a flat picture" viewBox="0 0 250 180">
    <polygon points="130,150 80,70 160,30 210,110" className="year5-face-right" />
    <polygon points="30,150 130,150 80,70" className="year5-face-left" />
    <path className="year5-stroke" d="M 80 70 L 160 30 M 130 150 L 210 110 M 160 30 L 210 110" />
    <path className="year5-dashed" d="M 30 150 L 110 110 L 210 110 M 110 110 L 160 30" />
  </Frame>;
  if (shape === 'squarePyramid') return <Frame label="A square-based pyramid drawn as a flat picture" viewBox="0 0 280 180">
    <polygon points="140,25 60,150 180,150" className="year5-face-left" />
    <polygon points="140,25 180,150 235,115" className="year5-face-right" />
    <path className="year5-stroke" d="M 60 150 H 180 L 235 115 M 140 25 L 60 150 M 140 25 L 180 150 M 140 25 L 235 115" />
    <path className="year5-dashed" d="M 60 150 L 115 115 H 235 M 140 25 L 115 115" />
  </Frame>;
  if (shape === 'cylinder') return <Frame label="A cylinder drawn as a flat picture" viewBox="0 0 240 190">
    <path className="year5-face-right" d="M 50 50 V 140 A 70 22 0 0 0 190 140 V 50 Z" />
    <ellipse cx="120" cy="50" rx="70" ry="22" className="year5-face-top" />
    <path className="year5-dashed" d="M 50 140 A 70 22 0 0 1 190 140" />
  </Frame>;
  return <Frame label="A cone drawn as a flat picture" viewBox="0 0 240 190">
    <path className="year5-face-right" d="M 120 20 L 50 145 A 70 22 0 0 0 190 145 Z" />
    <path className="year5-dashed" d="M 50 145 A 70 22 0 0 1 190 145" />
  </Frame>;
}

export function Net({ shape }) {
  const rect = (x, y, w, h, k) => <rect key={k} x={x} y={y} width={w} height={h} className="year5-empty" />;
  const tri = (pts, k) => <polygon key={k} points={pts} className="year5-empty" />;
  if (shape === 'cube') return <Frame label="A net made of six squares in a cross shape" viewBox="0 0 220 180">
    {[[1, 0], [0, 1], [1, 1], [2, 1], [3, 1], [1, 2]].map(([a, b], k) => rect(15 + a * 48, 12 + b * 48, 48, 48, k))}
  </Frame>;
  if (shape === 'cuboid') return <Frame label="A net made of six rectangles: a strip of four with one above and one below" viewBox="0 0 230 160">
    {[rect(15, 60, 60, 20, 0), rect(75, 60, 40, 20, 1), rect(115, 60, 60, 20, 2), rect(175, 60, 40, 20, 3), rect(15, 20, 60, 40, 4), rect(15, 80, 60, 40, 5)]}
  </Frame>;
  if (shape === 'triangularPrism') return <Frame label="A net made of three rectangles in a row with a triangle above and below the middle one" viewBox="0 0 220 190">
    {[rect(30, 55, 50, 80, 0), rect(80, 55, 50, 80, 1), rect(130, 55, 50, 80, 2), tri('80,55 130,55 105,12', 3), tri('80,135 130,135 105,178', 4)]}
  </Frame>;
  return <Frame label="A net made of one square with a triangle on each side" viewBox="0 0 220 220">
    {[rect(80, 80, 60, 60, 0), tri('80,80 140,80 110,20', 1), tri('80,140 140,140 110,200', 2), tri('80,80 80,140 20,110', 3), tri('140,80 140,140 200,110', 4)]}
  </Frame>;
}

/* ---------- angles ---------- */

/**
 * An angle at a vertex, drawn from a base arm. `from` says which end of the protractor the base arm lies on:
 * "right" measures anticlockwise from the right-hand 0, "left" measures clockwise from the left-hand 0.
 * With `protractor`, a protractor with both scales is drawn behind it.
 */
export function AngleDiagram({ degrees, from = 'right', protractor = false, label, children }) {
  const cx = 170, cy = 160, R = protractor ? 148 : 120, Rp = 138;
  const sign = from === 'right' ? 1 : -1, end = (r, deg) => [cx + sign * r * Math.cos(rad(deg)), cy - r * Math.sin(rad(deg))];
  const reflex = degrees > 180, arcR = 36, [ax, ay] = end(arcR, degrees);
  const ticks = [];
  if (protractor) {
    // The protractor is fixed: outer numbers count from the right-hand 0, inner numbers from the left-hand 0.
    const at = (r, d) => [cx + r * Math.cos(rad(d)), cy - r * Math.sin(rad(d))];
    for (let d = 0; d <= 180; d += 5) {
      const major = d % 10 === 0, [x1, y1] = at(Rp, d), [x2, y2] = at(Rp - (major ? 12 : 7), d);
      ticks.push(<path key={d} className="year5-thin" d={`M ${x1} ${y1} L ${x2} ${y2}`} />);
      if (major) {
        const [ox, oy] = at(Rp - 23, d), [ix, iy] = at(Rp - 41, d);
        ticks.push(<text key={`o${d}`} x={ox} y={oy + 3} className="year5-tick">{d}</text>,
          <text key={`i${d}`} x={ix} y={iy + 3} className="year5-tick year5-tick-inner">{180 - d}</text>);
      }
    }
  }
  const [ex, ey] = end(R, degrees), [bx, by] = end(R, 0);
  return <Frame label={label ?? `An angle of ${degrees} degrees`} viewBox={`0 0 340 ${reflex ? 330 : 190}`} className="year5-angle">
    {protractor && <>
      <path className="year5-protractor" d={`M ${cx - Rp} ${cy} A ${Rp} ${Rp} 0 0 1 ${cx + Rp} ${cy} Z`} />
      <path className="year5-thin" d={`M ${cx - Rp - 8} ${cy} H ${cx + Rp + 8}`} />
      {ticks}
    </>}
    <path className="year5-stroke" d={`M ${bx} ${by} L ${cx} ${cy} L ${ex} ${ey}`} />
    {!protractor && <path className="year5-accent-stroke" d={`M ${end(arcR, 0)[0]} ${end(arcR, 0)[1]} A ${arcR} ${arcR} 0 ${reflex ? 1 : 0} ${from === 'right' ? 0 : 1} ${ax} ${ay}`} />}
    <circle cx={cx} cy={cy} r="4" className="year5-fill" />
    {children}
  </Frame>;
}

/** Angles that share a vertex. `parts` lists the sizes in order; one '?' takes whatever is left of `total`. */
export function SharedAngles({ parts, total }) {
  const known = parts.filter(p => p !== '?').reduce((a, b) => a + b, 0), unknown = total - known;
  const sizes = parts.map(p => (p === '?' ? unknown : p)), cx = 170, cy = total === 180 ? 150 : 160, R = 120;
  const full = total === 360;
  let start = 0;
  const rays = [0], sectors = sizes.map((size, k) => {
    const a0 = start, a1 = start + size, mid = (a0 + a1) / 2;
    start = a1; rays.push(a1);
    const p = (r, deg) => [cx + r * Math.cos(rad(deg)), cy - r * Math.sin(rad(deg))];
    const [sx, sy] = p(34 + (k % 2) * 10, a0), [ex, ey] = p(34 + (k % 2) * 10, a1), [tx, ty] = p(70 + (size < 40 ? 14 : 0), mid);
    return <g key={k}>
      <path className="year5-accent-stroke" d={`M ${sx} ${sy} A ${34 + (k % 2) * 10} ${34 + (k % 2) * 10} 0 ${size > 180 ? 1 : 0} 0 ${ex} ${ey}`} />
      <text x={tx} y={ty + 5} className={parts[k] === '?' ? 'year5-unknown' : ''}>{parts[k] === '?' ? '?' : `${parts[k]}°`}</text>
    </g>;
  });
  return <Frame label={`Angles meeting at a point${full ? '' : ' on a straight line'}: ${parts.map(p => (p === '?' ? 'one unknown angle' : `${p} degrees`)).join(', ')}`} viewBox={`0 0 340 ${full ? 320 : 190}`}>
    {!full && <path className="year5-stroke" d={`M ${cx - R} ${cy} H ${cx + R}`} />}
    {rays.map((deg, k) => (!full && (deg === 0 || deg === 180)) ? null : <path key={k} className="year5-stroke" d={`M ${cx} ${cy} L ${cx + R * Math.cos(rad(deg))} ${cy - R * Math.sin(rad(deg))}`} />)}
    {sectors}
    <circle cx={cx} cy={cy} r="4" className="year5-fill" />
  </Frame>;
}

export function RectDiagonal({ angle }) {
  return <Frame label={`A rectangle with a diagonal. One angle between the diagonal and the bottom side is ${angle} degrees. The angle between the diagonal and the left side is marked with a question mark. Not drawn to scale.`} viewBox="0 0 320 210">
    <rect x="40" y="30" width="240" height="130" className="year5-empty" />
    <path className="year5-stroke" d="M 40 160 L 280 30" />
    <path className="year5-accent-stroke" d="M 90 160 A 50 50 0 0 0 83 140" />
    <path className="year5-accent-stroke" d="M 40 110 A 50 50 0 0 1 83 140" />
    <text x="120" y="152">{angle}°</text>
    <text x="68" y="108" className="year5-unknown">?</text>
    <text x="160" y="196" className="year5-small">Not drawn to scale</text>
  </Frame>;
}

/* ---------- position ---------- */

const CELL = 44, MARGIN = 34;
export function GridDiagram({ size, shapes, mirror, selected, missing, onPoint, disabled }) {
  const W = size * CELL + MARGIN * 2, H = size * CELL + MARGIN * 2, X = x => MARGIN + x * CELL, Y = y => MARGIN + (size - y) * CELL;
  const match = /^\((\d+), (\d+)\)$/.exec(selected ?? '');
  const extra = match ? [{ x: Number(match[1]), y: Number(match[2]), label: missing ?? 'P' }] : [];
  const said = shapes.map(s => `${s.variant === 'image' ? 'image' : 'shape'} with corners ${s.points.map(p => `${p.label ?? ''} at (${p.x}, ${p.y})`).join(', ')}`).join('; ');
  return <div className="year5-scroll"><div className="year5-grid-wrap" style={{ aspectRatio: `${W} / ${H}` }}>
    <Frame label={`Coordinate grid from 0 to ${size} on both axes. ${said}${mirror ? `. Mirror line ${mirror.axis} = ${mirror.at}` : ''}`} viewBox={`0 0 ${W} ${H}`} className="year5-coordinates">
      {Array.from({ length: size + 1 }, (_, k) => <g key={k}>
        <path className="year5-gridline" d={`M ${X(k)} ${Y(0)} V ${Y(size)} M ${X(0)} ${Y(k)} H ${X(size)}`} />
        <text x={X(k)} y={Y(0) + 22}>{k}</text><text x={X(0) - 12} y={Y(k) + 5}>{k}</text>
      </g>)}
      <path className="year5-stroke" d={`M ${X(0)} ${Y(size)} V ${Y(0)} H ${X(size)}`} />
      {mirror && <g><path className="year5-mirror" d={mirror.axis === 'x' ? `M ${X(mirror.at)} ${Y(0)} V ${Y(size) - 6}` : `M ${X(0)} ${Y(mirror.at)} H ${X(size) + 6}`} />
        <text x={mirror.axis === 'x' ? X(mirror.at) : X(size) + 4} y={mirror.axis === 'x' ? Y(size) - 12 : Y(mirror.at) - 8} className="year5-mirror-label">{mirror.axis} = {mirror.at}</text></g>}
      {shapes.map((shape, si) => <g key={si}>
        {shape.points.length > 2 && <polygon points={shape.points.map(p => `${X(p.x)},${Y(p.y)}`).join(' ')} className={shape.variant === 'image' ? 'year5-shape-image' : 'year5-shape'} />}
        {shape.points.map(p => <g key={p.label ?? `${p.x}${p.y}`}><circle cx={X(p.x)} cy={Y(p.y)} r="6" className="year5-fill" />
          <text x={X(p.x) + 14} y={Y(p.y) - 9} className="year5-point-label">{p.label}</text></g>)}
      </g>)}
      {extra.map(p => <g key="selected"><circle cx={X(p.x)} cy={Y(p.y)} r="9" className="year5-fill year5-accent-fill" /><text x={X(p.x) + 14} y={Y(p.y) - 9} className="year5-point-label">{p.label}</text></g>)}
    </Frame>
    {onPoint && <div className="year5-lattice" style={{ left: `${((MARGIN - CELL / 2) / W) * 100}%`, top: `${((MARGIN - CELL / 2) / H) * 100}%`, width: `${((size + 1) * CELL / W) * 100}%`, height: `${((size + 1) * CELL / H) * 100}%`, gridTemplateColumns: `repeat(${size + 1}, 1fr)` }}>
      {Array.from({ length: (size + 1) ** 2 }, (_, k) => {
        const x = k % (size + 1), y = size - Math.floor(k / (size + 1)), value = `(${x}, ${y})`;
        return <button key={value} type="button" aria-label={`Plot ${value}`} aria-pressed={selected === value} disabled={disabled} onClick={() => onPoint(value)}>{selected === value ? '●' : '·'}</button>;
      })}
    </div>}
  </div></div>;
}

/* ---------- statistics ---------- */

export function LineGraph({ title, labels, axis, step, series }) {
  const all = series.flatMap(s => s.values), top = Math.ceil((Math.max(...all) + 0.001) / step) * step;
  const L = 56, T = 44, Wd = 300, Ht = 190, X = k => L + 14 + k * ((Wd - 28) / (labels.length - 1)), Y = v => T + Ht - (v / top) * Ht;
  const gridlines = Array.from({ length: top / step + 1 }, (_, k) => k * step);
  const said = series.map(s => `${s.name}: ${s.values.map((v, k) => `${labels[k]} ${v}`).join(', ')}`).join('. ');
  return <figure className="year5-figure"><Frame label={`Line graph. ${title}. ${axis}. ${said}`} viewBox={`0 0 ${L + Wd + 14} ${T + Ht + 62}`} className="year5-wide year5-linegraph">
    <text x={L} y="16" className="year5-left year5-small">{axis}</text>
    {gridlines.map(v => <g key={v}><path className="year5-gridline" d={`M ${L} ${Y(v)} H ${L + Wd}`} /><text x={L - 8} y={Y(v) + 4} textAnchor="end" className="year5-small">{v}</text></g>)}
    <path className="year5-stroke" d={`M ${L} ${T} V ${T + Ht} H ${L + Wd}`} />
    {series.map((s, si) => <g key={s.name}>
      <polyline className={si ? 'year5-stroke year5-dashed-line' : 'year5-stroke year5-accent-stroke'} points={s.values.map((v, k) => `${X(k)},${Y(v)}`).join(' ')} />
      {s.values.map((v, k) => si ? <rect key={k} x={X(k) - 5} y={Y(v) - 5} width="10" height="10" className="year5-fill" /> : <circle key={k} cx={X(k)} cy={Y(v)} r="5" className="year5-fill year5-accent-fill" />)}
    </g>)}
    {labels.map((t, k) => <text key={t} x={X(k)} y={T + Ht + 20} className="year5-small">{t}</text>)}
  </Frame>
    <figcaption>{title}{series.length > 1 ? <>. Line with circles: {series[0].name}. Dashed line with squares: {series[1].name}.</> : ''}</figcaption>
  </figure>;
}
