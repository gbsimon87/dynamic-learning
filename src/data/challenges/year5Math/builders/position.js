import { choice, int, number, pick, shuffle } from '../kit.js';

const SIZE = 8;
const at = (x, y) => `(${x}, ${y})`;
const inGrid = p => p.x >= 0 && p.x <= SIZE && p.y >= 0 && p.y <= SIZE;
const LATTICE = Array.from({ length: (SIZE + 1) ** 2 }, (_, k) => at(k % (SIZE + 1), Math.floor(k / (SIZE + 1))));
const squares = n => `${n} square${n === 1 ? '' : 's'}`;
const LETTERS = 'ABCD';

/** The pair of corner points of a small triangle or rectangle in (u, v) space, with u in [uLo, uHi]. */
function cornersUV(r, uLo, uHi, wMax = 2) {
  const w = int(r, 1, Math.min(wMax, uHi - uLo)), h = int(r, 1, 3), u0 = int(r, uLo, uHi - w), v0 = int(r, 1, 7 - h);
  return pick(r, [true, false])
    ? [[u0, v0], [u0 + w, v0], [u0, v0 + h]]
    : [[u0, v0], [u0 + w, v0], [u0 + w, v0 + h], [u0, v0 + h]];
}

/** A shape and its mirror line, as { shape: [{x,y}], image: [{x,y}], mirror: { axis: 'x'|'y', at } }. */
function reflectionCase(r) {
  const vertical = pick(r, [true, false]), m = pick(r, [3, 4, 5]), flip = pick(r, [true, false]);
  // Work on the low side of the line (u < m), then mirror the whole picture to the other side if flipped.
  const uPts = cornersUV(r, Math.max(0, 2 * m - SIZE), m - 1);
  const place = ([u, v]) => (vertical ? { x: u, y: v } : { x: v, y: u });
  const shapeU = uPts.map(([u, v]) => [flip ? SIZE - u : u, v]), mm = flip ? SIZE - m : m;
  const shape = shapeU.map(p => place(p)), image = shapeU.map(([u, v]) => place([2 * mm - u, v]));
  return { shape: shape.map((p, k) => ({ ...p, label: LETTERS[k] })), image: image.map((p, k) => ({ ...p, label: `${LETTERS[k]}′` })), mirror: { axis: vertical ? 'x' : 'y', at: mm } };
}
const mirrorText = m => `${m.axis} = ${m.at}`;
const gridVisual = (shape, image, mirror, extra = {}) => ({ type: 'grid5', size: SIZE, shapes: [{ points: shape, variant: 'original' }, ...(image ? [{ points: image, variant: 'image' }] : [])], mirror, ...extra });

/** Choice of a point, with slips that are real mistakes and never a repeat of the answer. */
function pointChoice(prompt, answer, rng, slips, extra) {
  const wrong = [...slips, { x: answer.y, y: answer.x }, { x: answer.x + 1, y: answer.y }, { x: answer.x, y: answer.y + 1 }, { x: answer.x - 1, y: answer.y }, { x: answer.x, y: answer.y - 1 }]
    .filter(inGrid).map(p => at(p.x, p.y)).filter(t => t !== at(answer.x, answer.y));
  return choice(prompt, at(answer.x, answer.y), [...new Set(wrong)].slice(0, 3), rng, extra);
}
const plotQuestion = (prompt, answer, visual, extra = {}) => ({ kind: 'choice', prompt, answer: at(answer.x, answer.y), options: LATTICE, interaction: 'plot', visual, ...extra });

export const BUILDERS = {
  reflect(l, r, i) {
    const c = reflectionCase(r), k = i % c.shape.length, a = c.shape[k], a2 = c.image[k], vertical = c.mirror.axis === 'x';
    const visual = gridVisual(c.shape, null, c.mirror);
    const distance = Math.abs(a[vertical ? 'x' : 'y'] - c.mirror.at);
    if (l === 1) {
      const slips = vertical ? [{ x: a.x, y: SIZE - a.y }, { x: 2 * c.mirror.at - a.x + 1, y: a.y }, { x: a.x, y: a.y }] : [{ x: SIZE - a.x, y: a.y }, { x: a.x, y: 2 * c.mirror.at - a.y + 1 }, { x: a.x, y: a.y }];
      return pointChoice(`Shape ${c.shape.map(p => p.label).join('')} is reflected in the mirror line ${mirrorText(c.mirror)}. Where does ${a.label} go?`, a2, r, slips, { visual,
        rule: 'Each point goes the same distance on the other side of the mirror line, straight across. The shape does not change size.' });
    }
    if (l === 2) {
      return [
        () => number(`How many squares is ${a.label} from the mirror line ${mirrorText(c.mirror)}?`, distance, { visual, maxDigits: 1 }),
        () => number(`${c.shape.map(p => p.label).join('')} is reflected in ${mirrorText(c.mirror)}. What is the ${vertical ? 'x' : 'y'}-coordinate of ${a2.label}?`, a2[vertical ? 'x' : 'y'], { visual, maxDigits: 1, hint: `${a.label} is ${squares(distance)} from the line. ${a2.label} is the same distance on the other side.` }),
        () => number(`${c.shape.map(p => p.label).join('')} is reflected in ${mirrorText(c.mirror)}. How many squares is ${a2.label} from the mirror line?`, distance, { visual, maxDigits: 1 }),
        () => number(`${c.shape.map(p => p.label).join('')} is reflected in ${mirrorText(c.mirror)}. What is the ${vertical ? 'y' : 'x'}-coordinate of ${a2.label}?`, a2[vertical ? 'y' : 'x'], { visual, maxDigits: 1, hint: 'A reflection in this line does not change this coordinate.' }),
        () => number(`${c.shape.map(p => p.label).join('')} is reflected in ${mirrorText(c.mirror)}. What is the ${vertical ? 'x' : 'y'}-coordinate of ${a2.label}?`, a2[vertical ? 'x' : 'y'], { visual, maxDigits: 1 }),
      ][i]();
    }
    if (l === 3) {
      return plotQuestion(`Plot ${a2.label}, the reflection of ${a.label} in the mirror line ${mirrorText(c.mirror)}.`, a2, { ...visual, missing: a2.label },
        { hint: `${a.label} is ${squares(distance)} from the mirror line. Count the same distance on the other side.` });
    }
    const name = pick(r, ['Bix', 'Mia', 'Sam', 'Leo']);
    return [
      () => plotQuestion(`${name} reflects shape ${c.shape.map(p => p.label).join('')} in ${mirrorText(c.mirror)}. Plot corner ${a2.label}.`, a2, { ...visual, missing: a2.label }),
      () => number(`A shape has a corner at ${at(a2.x, a2.y)} after it is reflected in ${mirrorText(c.mirror)}. What was the ${vertical ? 'x' : 'y'}-coordinate of the same corner before it was reflected?`, a[vertical ? 'x' : 'y'], { maxDigits: 1 }),
      () => choice(`${name} reflects a triangle in a mirror line. Which sentence is true about the reflected triangle?`, 'It is the same size and shape. Only its position has changed.', ['It is smaller than the first triangle.', 'It is bigger than the first triangle.', 'It has more sides than the first triangle.'], r),
      () => number(`${name} reflects the point ${at(a.x, a.y)} in ${mirrorText(c.mirror)}. What is the ${vertical ? 'x' : 'y'}-coordinate of its reflection?`, a2[vertical ? 'x' : 'y'], { maxDigits: 1 }),
      () => {
        const line = mirrorText(c.mirror), wrong = [`${vertical ? 'x' : 'y'} = ${c.mirror.at + 1}`, `${vertical ? 'x' : 'y'} = ${c.mirror.at - 1}`, `${vertical ? 'y' : 'x'} = ${c.mirror.at}`];
        return choice(`Point ${a.label} at ${at(a.x, a.y)} is reflected to ${a2.label} at ${at(a2.x, a2.y)}. Which mirror line was used?`, line, wrong, r, { visual: gridVisual([a], [a2], null) });
      },
    ][i]();
  },
  translate(l, r, i) {
    const tri = cornersUV(r, 0, 4, 3).map(([x, y], k) => ({ x, y, label: LETTERS[k] }));
    const maxX = Math.max(...tri.map(p => p.x)), minX = Math.min(...tri.map(p => p.x)), maxY = Math.max(...tri.map(p => p.y)), minY = Math.min(...tri.map(p => p.y));
    const dxs = [-3, -2, -1, 1, 2, 3, 4].filter(d => minX + d >= 0 && maxX + d <= SIZE), dys = [-3, -2, -1, 1, 2, 3].filter(d => minY + d >= 0 && maxY + d <= SIZE);
    const dx = pick(r, dxs), dy = pick(r, dys), k = i % tri.length, a = tri[k], moved = tri.map(p => ({ x: p.x + dx, y: p.y + dy, label: `${p.label}′` })), a2 = moved[k];
    const move = (x, y) => [x ? `${squares(Math.abs(x))} ${x > 0 ? 'right' : 'left'}` : '', y ? `${squares(Math.abs(y))} ${y > 0 ? 'up' : 'down'}` : ''].filter(Boolean).join(' and ');
    const visual = gridVisual(tri, null, null);
    const names = tri.map(p => p.label).join('');
    if (l === 1) {
      return pointChoice(`Shape ${names} is translated ${move(dx, dy)}. Where does ${a.label} go?`, a2, r,
        [{ x: a.x - dx, y: a.y - dy }, { x: a.x + dy, y: a.y + dx }, { x: a.x + dx, y: a.y }, { x: a.x - dx, y: a.y + dy }], { visual, rule: 'Right adds to x. Left takes away from x. Up adds to y. Down takes away from y. The shape slides without turning.' });
    }
    if (l === 2) {
      return [
        () => number(`Shape ${names} is translated ${move(dx, dy)}. What is the x-coordinate of ${a2.label}?`, a2.x, { visual, maxDigits: 1 }),
        () => number(`Shape ${names} is translated ${move(dx, dy)}. What is the y-coordinate of ${a2.label}?`, a2.y, { visual, maxDigits: 1 }),
        () => number(`${a.label} at ${at(a.x, a.y)} moves to ${a2.label} at ${at(a2.x, a2.y)}. How many squares has it moved ${dx > 0 ? 'right' : 'left'}?`, Math.abs(dx), { visual: gridVisual([a], [a2], null), maxDigits: 1 }),
        () => number(`${a.label} at ${at(a.x, a.y)} moves to ${a2.label} at ${at(a2.x, a2.y)}. How many squares has it moved ${dy > 0 ? 'up' : 'down'}?`, Math.abs(dy), { visual: gridVisual([a], [a2], null), maxDigits: 1 }),
        () => number(`Shape ${names} is translated ${move(dx, dy)}. What is the x-coordinate of ${moved[(k + 1) % moved.length].label}?`, moved[(k + 1) % moved.length].x, { visual, maxDigits: 1 }),
      ][i]();
    }
    if (l === 3) {
      return plotQuestion(`Shape ${names} is translated ${move(dx, dy)}. Plot ${a2.label}.`, a2, { ...visual, missing: a2.label }, { hint: 'Move x first, then y. Count squares along the grid lines.' });
    }
    const wrongMoves = [move(-dx, dy), move(dx, -dy), move(dy || 1, dx || 1)].filter(t => t !== move(dx, dy));
    return [
      () => choice(`${a.label} at ${at(a.x, a.y)} moves to ${a2.label} at ${at(a2.x, a2.y)}. Which translation is this?`, move(dx, dy), wrongMoves, r, { visual: gridVisual([a], [a2], null) }),
      () => choice('A shape is translated. Which sentence is true about the shape after it is translated?', 'It is the same size and shape, and it has not turned.', ['It is smaller than before.', 'It has been turned round.', 'It has more corners than before.'], r),
      () => number(`A corner is at ${at(a2.x, a2.y)} after a translation of ${move(dx, dy)}. What was its x-coordinate before?`, a.x, { maxDigits: 1 }),
      () => number(`A corner is at ${at(a2.x, a2.y)} after a translation of ${move(dx, dy)}. What was its y-coordinate before?`, a.y, { maxDigits: 1 }),
      () => plotQuestion(`Bix slides shape ${names} ${move(dx, dy)}. Plot ${a2.label}.`, a2, { ...visual, missing: a2.label }),
    ][i]();
  },
};
void shuffle;

export const TOPIC_TITLES = {
  reflect: ['Reflect a point.', 'Find the image coordinates.', 'Plot the reflection.', 'Solve a reflection problem.'],
  translate: ['Slide a point.', 'Find the new coordinates.', 'Plot the translation.', 'Solve a translation problem.'],
};
