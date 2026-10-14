import { choice, int, pick, plot, position } from '../kit.js';

// Keeps one run (five calls sharing an rng) free of repeated questions.
const seen = new WeakMap();
function fresh(rng, index, make) {
  if (index === 0 || !seen.has(rng)) seen.set(rng, new Set());
  const used = seen.get(rng);
  let q;
  for (let tries = 0; tries < 40; tries++) {
    q = make();
    const key = `${q.prompt}|${q.answer}|${JSON.stringify(q.visual?.points ?? [])}`;
    if (!used.has(key)) { used.add(key); return q; }
  }
  return q;
}

// Picks only from moves that are known to work, so even a stuck rng (always 0) finishes.
const pickOk = (rng, values, ok) => pick(rng, values.filter(ok));
const DIRS = { right: [1, 0], left: [-1, 0], up: [0, 1], down: [0, -1] };

const at = (x, y) => `(${x}, ${y})`;
const squares = n => `${n} square${n === 1 ? '' : 's'}`;
const inGrid = p => p.x >= 0 && p.x <= 5 && p.y >= 0 && p.y <= 5;
const describe = (dx, dy) => [dx ? `${squares(Math.abs(dx))} ${dx > 0 ? 'right' : 'left'}` : '', dy ? `${squares(Math.abs(dy))} ${dy > 0 ? 'up' : 'down'}` : ''].filter(Boolean).join(' and ');

/** Choice of a point, with distractors that are real slips (swapped, one off) and never a tie. */
function pointChoice(prompt, ans, rng, slips, extra, avoid = []) {
  const taken = new Set([ans, ...avoid].map(p => at(p.x, p.y)));
  const wrong = [...slips, { x: ans.y, y: ans.x }, { x: ans.x + 1, y: ans.y }, { x: ans.x, y: ans.y + 1 }, { x: ans.x - 1, y: ans.y }, { x: ans.x, y: ans.y - 1 }, { x: ans.x + 1, y: ans.y + 1 }, { x: ans.x - 1, y: ans.y - 1 }]
    .filter(inGrid).map(p => at(p.x, p.y)).filter(t => !taken.has(t));
  return choice(prompt, at(ans.x, ans.y), [...new Set(wrong)].slice(0, 3), rng, extra);
}

/** A parallelogram ABCD (square, rectangle or slanted) that fits the 0–5 grid. */
function quad(rng, kinds) {
  const kind = pick(rng, kinds);
  const w = int(rng, 2, 3), h = kind === 'square' ? w : int(rng, 2, 3), s = kind === 'parallelogram' ? pick(rng, [1, -1]) : 0;
  const x = int(rng, Math.max(0, -s), 5 - w - Math.max(0, s)), y = int(rng, 0, 5 - h);
  const pts = [{ x, y }, { x: x + w, y }, { x: x + w + s, y: y + h }, { x: x + s, y: y + h }].map((p, i) => ({ ...p, label: 'ABCD'[i] }));
  return { kind, pts };
}
/** Given the missing corner index, lists the other three so that missing = first + last − middle. */
function withMissing(pts, m) {
  const given = [1, 2, 3].map(k => pts[(m + k) % 4]);
  return { missing: pts[m], given };
}

/** Year 4 Maths builders: (level, rng, index) => one question. */
export const BUILDERS = {
  coordinates(l, r, i = 0) {
    return fresh(r, i, () => {
      if (l === 1) {
        let x = int(r, 0, 5), y = int(r, 0, 5);
        if (x === y) y = (y + int(r, 1, 5)) % 6;
        return position('What are the coordinates of A?', x, y, [{ x, y, label: 'A' }], { rule: 'Read x across first, then y up. Write (x, y).' });
      }
      if (l === 2) {
        // Two points are swaps of each other, e.g. (1, 4) and (4, 1), so order really matters.
        const x = int(r, 0, 5), y = pickOk(r, [0, 1, 2, 3, 4, 5], v => v !== x);
        const cells = Array.from({ length: 36 }, (_, k) => ({ x: k % 6, y: Math.floor(k / 6) }));
        const third = pickOk(r, cells, c => !(c.x === x && c.y === y) && !(c.x === y && c.y === x));
        const pts = [{ x, y }, { x: y, y: x }, third];
        if (r() < 0.5) pts.reverse();
        const labelled = pts.map((p, k) => ({ ...p, label: 'ABC'[k] }));
        const target = pick(r, labelled);
        if (r() < 0.5) return choice(`Which point is at ${at(target.x, target.y)}?`, target.label, labelled.filter(p => p !== target).map(p => p.label), r, { visual: { type: 'coordinates', points: labelled } });
        const slips = labelled.filter(p => p !== target);
        return pointChoice(`What are the coordinates of ${target.label}?`, target, r, slips, { visual: { type: 'coordinates', points: labelled } });
      }
      if (l === 3) {
        const x = int(r, 0, 5), y = int(r, 0, 5);
        return plot(`Plot the point ${at(x, y)}.`, x, y);
      }
      const a = { x: int(r, 0, 5), y: int(r, 0, 5), label: 'A' };
      const mode = pickOk(r, ['right', 'left', 'up', 'down', 'row', 'column'], m => !DIRS[m] || inGrid({ x: a.x + DIRS[m][0], y: a.y + DIRS[m][1] }));
      if (mode === 'row' || mode === 'column') {
        const n = pickOk(r, [0, 1, 2, 3, 4, 5], v => v !== (mode === 'row' ? a.x : a.y));
        const b = mode === 'row' ? { x: n, y: a.y } : { x: a.x, y: n };
        return plot(mode === 'row' ? `Bix's den is level with A, on the same row. Its x-coordinate is ${n}. Plot the den.` : `Bix's den is straight above or below A, in the same column. Its y-coordinate is ${n}. Plot the den.`, b.x, b.y, [a]);
      }
      const [ux, uy] = DIRS[mode], n = pickOk(r, [1, 2, 3, 4], k => inGrid({ x: a.x + ux * k, y: a.y + uy * k }));
      const b = { x: a.x + ux * n, y: a.y + uy * n };
      return plot(`The treasure is buried ${squares(n)} ${mode === 'right' || mode === 'left' ? `to the ${mode} of` : mode === 'up' ? 'above' : 'below'} A. Plot the treasure.`, b.x, b.y, [a]);
    });
  },
  translation(l, r, i = 0) {
    return fresh(r, i, () => {
      const a = { x: int(r, 0, 5), y: int(r, 0, 5), label: 'A' };
      const okX = d => a.x + d >= 0 && a.x + d <= 5, okY = d => a.y + d >= 0 && a.y + d <= 5;
      if (l === 1) {
        const n = int(r, 1, 3), dir = pickOk(r, Object.keys(DIRS), d => inGrid({ x: a.x + DIRS[d][0] * n, y: a.y + DIRS[d][1] * n }));
        const dx = DIRS[dir][0] * n, dy = DIRS[dir][1] * n, b = { x: a.x + dx, y: a.y + dy };
        const slip = { x: a.x - dx, y: a.y - dy };
        return pointChoice(`Translate A ${squares(n)} ${dir}. Where does it land?`, b, r, [slip, { x: a.x + dy, y: a.y + dx }], { visual: { type: 'coordinates', points: [a] }, rule: 'Right adds to x; left takes away from x. Up adds to y; down takes away from y.' });
      }
      if (l === 2 || l === 3) {
        const dx = pickOk(r, [-3, -2, -1, 1, 2, 3], okX), dy = pickOk(r, [-3, -2, -1, 1, 2, 3], okY);
        const b = { x: a.x + dx, y: a.y + dy };
        if (l === 2) {
          const slips = [{ x: a.x - dx, y: a.y + dy }, { x: a.x + dx, y: a.y - dy }, { x: a.x + dy, y: a.y + dx }];
          return pointChoice(`Translate A ${describe(dx, dy)}. Where does it land?`, b, r, slips, { visual: { type: 'coordinates', points: [a] } });
        }
        const answer = describe(dx, dy);
        const wrong = [...new Set([describe(-dx, dy), describe(dx, -dy), describe(dy, dx), describe(-dx, -dy)])].filter(t => t !== answer).slice(0, 3);
        return choice('Which translation moves A to B?', answer, wrong, r, { visual: { type: 'coordinates', points: [a, { ...b, label: 'B' }] } });
      }
      // Level 4: translate a whole triangle, then plot one moved corner.
      const tri = [a, { x: a.x + pickOk(r, [-2, -1, 1, 2], okX), y: a.y, label: 'B' }, { x: a.x, y: a.y + pickOk(r, [-2, -1, 1, 2], okY), label: 'C' }];
      const tdx = pickOk(r, [-2, -1, 1, 2], d => tri.every(p => p.x + d >= 0 && p.x + d <= 5));
      const tdy = pickOk(r, [-2, -1, 1, 2], d => tri.every(p => p.y + d >= 0 && p.y + d <= 5));
      const moved = tri.map(p => ({ x: p.x + tdx, y: p.y + tdy }));
      // Never ask for a corner that lands on top of an old corner (it would look unmoved).
      const k = pickOk(r, [0, 1, 2], j => !tri.some(p => p.x === moved[j].x && p.y === moved[j].y)), target = moved[k];
      return plot(`Bix slides triangle ABC ${describe(tdx, tdy)}. Plot where corner ${tri[k].label} lands.`, target.x, target.y, tri, { visual: { type: 'coordinates', points: tri, missing: `${tri[k].label}′` } });
    });
  },
  polygon(l, r, i = 0) {
    return fresh(r, i, () => {
      if (l === 1) {
        const { pts } = quad(r, ['rectangle']);
        const { missing, given } = withMissing(pts, 3);
        // Slips: x and y swapped, or one square out; never a corner that is already drawn.
        return pointChoice('Which coordinates complete rectangle ABCD?', missing, r, [], { visual: { type: 'coordinates', points: given, join: true, missing: 'D' }, rule: 'D has the same x as A and the same y as C.' }, given);
      }
      if (l === 2) {
        const { kind, pts } = quad(r, ['square', 'rectangle']);
        const m = int(r, 0, 3), { missing, given } = withMissing(pts, m);
        const [a, b, c] = given;
        return pointChoice(`Corner ${missing.label} is missing. Which coordinates complete ${kind} ABCD?`, missing, r, [{ x: a.x + b.x - c.x, y: a.y + b.y - c.y }, { x: b.x + c.x - a.x, y: b.y + c.y - a.y }], { visual: { type: 'coordinates', points: given, join: true, missing: missing.label } }, given);
      }
      if (l === 3) {
        const { kind, pts } = quad(r, ['square', 'rectangle']);
        const m = int(r, 0, 3), { missing, given } = withMissing(pts, m);
        return plot(`Plot corner ${missing.label} to complete ${kind} ABCD.`, missing.x, missing.y, given, { visual: { type: 'coordinates', points: given, join: true, missing: missing.label } });
      }
      const { pts } = quad(r, ['parallelogram']);
      const m = int(r, 0, 3), { missing, given } = withMissing(pts, m);
      const list = given.map(p => `${p.label} ${at(p.x, p.y)}`).join(', ');
      return plot(`Bix is drawing a parallelogram-shaped flag ABCD with corners ${list}. Opposite sides are equal and parallel. Plot corner ${missing.label}.`, missing.x, missing.y, given, { visual: { type: 'coordinates', points: given, join: true, missing: missing.label } });
    });
  },
};

/** Optional per-topic challenge titles: { builderKey: [four titles] }. */
export const TOPIC_TITLES = {
  coordinates: ['Read the coordinates.', 'Find points on the grid.', 'Plot a point.', 'Plot the hidden treasure.'],
  translation: ['Slide a point one way.', 'Slide across and up.', 'Describe the slide.', 'Slide a triangle.'],
  polygon: ['Find the missing corner.', 'Complete squares and rectangles.', 'Plot the missing corner.', 'Finish the parallelogram flag.'],
};
