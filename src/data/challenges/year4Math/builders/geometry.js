import { allCells, choice, int, number, order, pick, shuffle, sort } from '../kit.js';

// Keeps one run (five calls sharing an rng) free of repeated questions.
const seen = new WeakMap();
function fresh(rng, index, make, keyOf = q => JSON.stringify(q)) {
  if (index === 0 || !seen.has(rng)) seen.set(rng, new Set());
  const used = seen.get(rng);
  let q;
  for (let tries = 0; tries < 60; tries++) {
    q = make();
    const key = keyOf(q);
    if (!used.has(key)) { used.add(key); return q; }
  }
  return q;
}

// Triangles and quadrilaterals: drawn key, name, defining clue, near-miss names.
export const SHAPES = {
  equilateral: { name: 'Equilateral triangle', clue: '3 equal sides and 3 equal angles', near: ['Isosceles triangle', 'Scalene triangle', 'Rhombus'] },
  isosceles: { name: 'Isosceles triangle', clue: 'exactly 2 equal sides', near: ['Equilateral triangle', 'Scalene triangle', 'Kite'] },
  scalene: { name: 'Scalene triangle', clue: 'no equal sides', near: ['Isosceles triangle', 'Equilateral triangle', 'Trapezium'] },
  rhombus: { name: 'Rhombus', clue: '4 equal sides and no right angles', near: ['Square', 'Parallelogram', 'Kite'] },
  trapezium: { name: 'Trapezium', clue: 'exactly 1 pair of parallel sides', near: ['Parallelogram', 'Rectangle', 'Kite'] },
  parallelogram: { name: 'Parallelogram', clue: '2 pairs of parallel sides, no right angles and unequal neighbouring sides', near: ['Rhombus', 'Rectangle', 'Trapezium'] },
  rectangle: { name: 'Rectangle', clue: '4 right angles and unequal neighbouring sides', near: ['Square', 'Parallelogram', 'Rhombus'] },
  square: { name: 'Square', clue: '4 equal sides and 4 right angles', near: ['Rectangle', 'Rhombus', 'Parallelogram'] },
};
// Property statements a learner can check on the drawn shape (level 2).
const FACTS = {
  equilateral: 'It is a regular triangle: all sides and angles are equal.',
  isosceles: 'It has exactly 2 equal sides.',
  scalene: 'All 3 sides are different lengths.',
  rhombus: 'It has 4 equal sides but no right angles.',
  trapezium: 'It has exactly 1 pair of parallel sides.',
  parallelogram: 'It has 2 pairs of parallel sides but no right angles.',
  rectangle: 'It has 4 right angles but not all sides are equal.',
  square: 'It is a regular quadrilateral: 4 equal sides and 4 right angles.',
};
const FACT_NEAR = {
  equilateral: ['isosceles', 'scalene', 'square'], isosceles: ['equilateral', 'scalene', 'trapezium'],
  scalene: ['isosceles', 'equilateral', 'parallelogram'], rhombus: ['square', 'rectangle', 'trapezium'],
  trapezium: ['parallelogram', 'rectangle', 'equilateral'], parallelogram: ['rhombus', 'rectangle', 'trapezium'],
  rectangle: ['square', 'parallelogram', 'rhombus'], square: ['rectangle', 'rhombus', 'equilateral'],
};
// Sorting rules with only definite members (an isosceles triangle may or may not have a right angle, so it never appears there).
export const PROPERTY_SORTS = [
  { prompt: 'Sort the shapes: do they have a right angle?', bins: ['Has a right angle', 'No right angles'],
    yes: ['Square', 'Rectangle'], no: ['Equilateral triangle', 'Rhombus', 'Parallelogram'] },
  { prompt: 'Sort the shapes: do they have parallel sides?', bins: ['Has parallel sides', 'No parallel sides'],
    yes: ['Square', 'Rectangle', 'Rhombus', 'Parallelogram', 'Trapezium'], no: ['Equilateral triangle', 'Scalene triangle', 'Isosceles triangle', 'Kite'] },
  { prompt: 'Sort the shapes: are all their sides equal?', bins: ['All sides equal', 'Not all sides equal'],
    yes: ['Square', 'Rhombus', 'Equilateral triangle'], no: ['Rectangle', 'Parallelogram', 'Scalene triangle', 'Isosceles triangle', 'Trapezium'] },
  { prompt: 'Sort the polygons: regular or irregular?', bins: ['Regular', 'Irregular'],
    yes: ['Square', 'Equilateral triangle'], no: ['Rhombus', 'Rectangle', 'Isosceles triangle', 'Scalene triangle', 'Parallelogram', 'Kite'] },
];
const WORD_CLUES = [
  ['equilateral', 'a triangle with 3 equal sides'], ['isosceles', 'a triangle with exactly 2 equal sides'],
  ['scalene', 'a triangle where every side is a different length'], ['rhombus', 'a quadrilateral with 4 equal sides but no right angles'],
  ['trapezium', 'a quadrilateral with exactly 1 pair of parallel sides'], ['parallelogram', 'a quadrilateral with 2 pairs of parallel sides, no right angles and neighbouring sides of different lengths'],
  ['rectangle', 'a quadrilateral with 4 right angles and neighbouring sides of different lengths'], ['square', 'a regular quadrilateral'],
  ['kite', 'a quadrilateral with 2 pairs of equal neighbouring sides and no parallel sides'],
];
const MAKERS = [['Amira', 'cuts out'], ['Leo', 'draws'], ['Priya', 'builds with straws'], ['Sam', 'folds'], ['Noah', 'makes on a pinboard']];

// Lines of symmetry for each drawable figure.
export const SYMMETRY = {
  scalene: 0, parallelogram: 0, zshape: 0, isosceles: 1, trapezium: 1, kite: 1, arrow: 1, house: 1, tshape: 1,
  rectangle: 2, rhombus: 2, equilateral: 3, square: 4, plus: 4, pentagon: 5, hexagon: 6, octagon: 8,
};
const SYMMETRY_NAMES = {
  scalene: 'Scalene triangle', parallelogram: 'Parallelogram', isosceles: 'Isosceles triangle', kite: 'Kite',
  rectangle: 'Rectangle', rhombus: 'Rhombus', equilateral: 'Equilateral triangle', square: 'Square',
  pentagon: 'Regular pentagon', hexagon: 'Regular hexagon', octagon: 'Regular octagon',
};
const BADGES = [
  ['arrow', 'This road sign is shaped like an arrow.'], ['plus', 'This first-aid badge is shaped like a plus sign.'],
  ['house', 'This window card is shaped like a house.'], ['tshape', 'This tile is shaped like a letter T.'],
  ['zshape', 'This sticker is shaped like a letter Z.'], ['hexagon', 'This floor tile is a regular hexagon.'],
  ['octagon', 'This stop sign is a regular octagon.'], ['kite', 'This paper kite has 2 pairs of equal sides.'],
];
const lines = n => `${n} line${n === 1 ? '' : 's'}`;
const symmetryBin = n => n === 0 ? 'No lines' : n === 1 ? '1 line' : 'More than 1 line';

/** Year 4 Maths builders: (level, rng, index) => one question. */
export const BUILDERS = {
  shapes(l, r, i) {
    return fresh(r, i, () => {
      const key = pick(r, Object.keys(SHAPES)), s = SHAPES[key];
      if (l === 1) return choice('Read the clue. What is the special name for this shape?', s.name, s.near, r,
        { visual: { type: 'shape', shape: key, property: s.clue }, rule: 'Use equal sides, right angles and parallel sides. Pick the name that fits every part of the clue.' });
      if (l === 2) return choice('Look closely. Which fact is true for this shape?', FACTS[key], FACT_NEAR[key].map(k => FACTS[k]), r,
        { visual: { type: 'shape', shape: key, rotate: pick(r, [0, 15, -15, 30, -30]) } });
      if (l === 3) {
        const rule = pick(r, PROPERTY_SORTS), yes = int(r, 1, Math.min(3, rule.yes.length));
        const cards = shuffle([...shuffle(rule.yes, r).slice(0, yes).map(n => [n, rule.bins[0]]), ...shuffle(rule.no, r).slice(0, 4 - yes).map(n => [n, rule.bins[1]])], r);
        return sort(rule.prompt, rule.bins, cards);
      }
      const [answer, clue] = pick(r, WORD_CLUES), [who, verb] = pick(r, MAKERS);
      return { kind: 'type', prompt: `${who} ${verb} ${clue}. What is the special name of this shape? Type one word.`, answer, label: 'Shape name', maxLength: 14, apostrophe: false };
    }, q => l === 3 ? JSON.stringify(q.cards.map(c => c.label).sort()) : `${q.answer}`);
  },
  angles(l, r, i) {
    const acute = () => 5 * int(r, 3, 17), obtuse = () => 5 * int(r, 19, 35);
    return fresh(r, i, () => {
      if (l === 1) {
        const degrees = i === 4 ? 90 : r() < 0.5 ? acute() : obtuse();
        const answer = degrees < 90 ? 'Acute' : degrees === 90 ? 'Right' : 'Obtuse';
        return choice('Classify this angle.', answer, ['Acute', 'Right', 'Obtuse'].filter(x => x !== answer), r,
          { visual: { type: 'angle', degrees }, rule: 'Acute is smaller than a right angle (90°). Obtuse is bigger than a right angle and smaller than 180°.' });
      }
      if (l === 2) {
        const wantObtuse = r() < 0.5, odd = wantObtuse ? obtuse() : acute();
        // Three different angles of the other type (a shuffle, so a stuck random source cannot loop forever).
        const others = shuffle(Array.from({ length: wantObtuse ? 15 : 17 }, (_, k) => 5 * (wantObtuse ? k + 3 : k + 19)), r).slice(0, 3);
        const values = shuffle([odd, ...others], r);
        return choice(`Which angle is ${wantObtuse ? 'obtuse' : 'acute'}?`, `${odd}°`, others.map(n => `${n}°`), r, { visual: { type: 'angleSet', values } });
      }
      if (l === 3) {
        const values = [5 * int(r, 3, 8), 5 * int(r, 10, 17), 5 * int(r, 19, 26), 5 * int(r, 28, 35)];
        return order('Order the angles from smallest to largest.', values, r, n => `${n}°`, { visual: { type: 'angleSet', values: shuffle(values, r) } });
      }
      const thing = pick(r, ['door', 'laptop lid', 'book cover', 'gate']);
      if (r() < 0.5) {
        const open = acute();
        return number(`A ${thing} is open at ${open}°. How many more degrees must it open to make a right angle?`, 90 - open, { label: 'Degrees' });
      }
      const open = obtuse();
      return number(`A ${thing} is open at ${open}°. How many more degrees must it open to make two right angles (180°)?`, 180 - open, { label: 'Degrees' });
    }, q => `${q.prompt}|${JSON.stringify(q.visual ?? '')}|${q.answer}`);
  },
  symmetry(l, r, i) {
    return fresh(r, i, () => {
      if (l === 1) {
        const shape = pick(r, ['isosceles', 'rectangle', 'square', 'equilateral', 'kite', 'parallelogram', 'rhombus', 'trapezium', 'scalene', 'house']);
        return number('How many lines of symmetry does this shape have?', SYMMETRY[shape],
          { visual: { type: 'shape', shape }, rule: 'A line of symmetry is a fold where both halves match exactly. Try folding up, across and corner to corner.' });
      }
      if (l === 2) {
        const shape = pick(r, ['rectangle', 'square', 'equilateral', 'rhombus', 'kite', 'pentagon', 'hexagon', 'parallelogram', 'trapezium', 'tshape']);
        const n = SYMMETRY[shape], rotate = pick(r, [25, 40, 60, 110, -30, -50]);
        const wrong = n === 0 ? [1, 2, 4] : [n + 1, n - 1, n === 2 ? 4 : n + 2];
        return choice('This shape has been turned. How many lines of symmetry does it have?', lines(n), wrong.map(lines), r,
          { visual: { type: 'shape', shape, rotate } });
      }
      if (l === 3) {
        const pool = Object.keys(SYMMETRY_NAMES), byBin = {};
        for (const k of shuffle(pool, r)) (byBin[symmetryBin(SYMMETRY[k])] ??= []).push(k);
        const bins = ['No lines', '1 line', 'More than 1 line'];
        const chosen = bins.map(b => byBin[b][0]);
        const extras = shuffle(pool.filter(k => !chosen.includes(k)), r).slice(0, 2);
        const cards = shuffle([...chosen, ...extras], r).map(k => [SYMMETRY_NAMES[k], symmetryBin(SYMMETRY[k])]);
        return sort('Sort the shapes by their lines of symmetry.', bins, cards);
      }
      const [shape, story] = pick(r, BADGES);
      return number(`${story} How many lines of symmetry does it have?`, SYMMETRY[shape], { visual: { type: 'shape', shape, rotate: pick(r, [0, 0, 20, -20]) } });
    }, q => l === 3 ? JSON.stringify(q.cards.map(c => c.label).sort()) : q.visual.shape);
  },
  reflect(l, r, i) {
    // L1 small vertical; L2 small horizontal; L3 tall vertical; L4 wide horizontal story.
    const horizontal = l === 2 || l === 4, long = l >= 3 ? 5 : 3;
    const [min, max] = [[2, 3], [3, 4], [5, 8], [5, 8]][l - 1];
    return fresh(r, i, () => {
      const halfW = horizontal ? long : 3, halfH = horizontal ? 3 : long;
      const cells = shuffle(allCells(halfW, halfH), r).slice(0, int(r, min, max)).sort((a, b) => a[1] - b[1] || a[0] - b[0]);
      const targets = cells.map(([x, y]) => horizontal ? [x, 5 - y] : [5 - x, y]);
      const width = horizontal ? long : 6, height = horizontal ? 6 : long;
      const editable = allCells(width, height).filter(([x, y]) => horizontal ? y >= 3 : x >= 3);
      const prompt = [
        'Complete the reflection in the dashed mirror line. Tap the matching squares.',
        'Reflect the pattern in the dashed line. Tap squares to colour or clear them.',
        'Reflect this bigger pattern in the dashed line. Tap squares to colour or clear them.',
        `${pick(r, ['Maya', 'Tom', 'Aisha', 'Ben'])} is tiling a symmetric ${pick(r, ['border', 'mosaic', 'quilt'])}. Finish the reflected half below the dashed line.`,
      ][l - 1];
      return sort(prompt, ['Coloured', 'Empty'], editable.map(([x, y]) => [`${x},${y}`, targets.some(([a, b]) => a === x && b === y) ? 'Coloured' : 'Empty']),
        { interaction: 'reflection', visual: { type: 'reflection', width, height, cells, horizontal },
          ...(l === 1 ? { rule: 'Each coloured square has a partner the same distance from the mirror line on the other side.' } : { hint: 'Count the squares between each coloured square and the mirror line.' }) });
    }, q => JSON.stringify(q.visual.cells));
  },
};

/** Per-topic challenge titles: { builderKey: [four titles] }. */
export const TOPIC_TITLES = {
  shapes: ['Name the shape from a clue.', 'Spot the true fact.', 'Sort shapes by property.', 'Solve the shape riddle.'],
  angles: ['Classify an angle.', 'Find the odd angle.', 'Order angles by size.', 'Solve an angle puzzle.'],
  symmetry: ['Count lines of symmetry.', 'Count lines on a turned shape.', 'Sort by lines of symmetry.', 'Check a real-life shape.'],
  reflect: ['Reflect in a vertical mirror.', 'Reflect in a horizontal mirror.', 'Reflect a bigger pattern.', 'Finish the tile pattern.'],
};
