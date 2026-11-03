import { choice, choiceN, int, number, others, pick, shuffle, sort, build, NAMES } from '../kit.js';

const NAME = r => pick(r, NAMES);
// Solids with a drawing: name, faces, edges, vertices.
const SOLIDS = {
  cube: { name: 'cube', f: 6, e: 12, v: 8 },
  cuboid: { name: 'cuboid', f: 6, e: 12, v: 8 },
  triangularPrism: { name: 'triangular prism', f: 5, e: 9, v: 6 },
  squarePyramid: { name: 'square-based pyramid', f: 5, e: 8, v: 5 },
  cylinder: { name: 'cylinder' }, cone: { name: 'cone' },
};
const POLY = ['cube', 'cuboid', 'triangularPrism', 'squarePyramid'];
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const an = name => `${/^[aeiou]/i.test(name) ? 'an' : 'a'} ${name}`;
const NETS = ['cube', 'cuboid', 'triangularPrism', 'squarePyramid'];

// Regular polygons: sides; irregular drawings with the fact that shows why.
const REGULAR = [['equilateral', 'equilateral triangle', 3], ['square', 'square', 4], ['pentagon', 'regular pentagon', 5], ['hexagon', 'regular hexagon', 6], ['octagon', 'regular octagon', 8]];
const IRREGULAR = [
  ['rectangle', 'rectangle', 'all 4 angles are equal, but the sides are not all equal'],
  ['rhombus', 'rhombus', 'all 4 sides are equal, but the angles are not all equal'],
  ['kite', 'kite', 'two pairs of equal sides, and the sides and angles are not all equal'],
  ['parallelogram', 'parallelogram', 'opposite sides are equal, but not all the sides or angles are equal'],
  ['scalene', 'scalene triangle', 'all 3 sides are different'],
  ['trapezium', 'trapezium', 'the sides and angles are not all equal'],
];

export const BUILDERS = {
  solids(l, r, i) {
    const key = pick(r, Object.keys(SOLIDS)), solid = SOLIDS[key];
    const dims = key === 'cube' ? [2, 2, 2] : key === 'cuboid' ? pick(r, [[3, 2, 2], [4, 2, 2], [3, 3, 2], [4, 3, 2]]) : undefined;
    if (l === 1) {
      const others2 = Object.keys(SOLIDS).filter(k => k !== key).map(k => SOLIDS[k].name);
      const near = { cube: ['cuboid'], cuboid: ['cube'], triangularPrism: ['square-based pyramid'], squarePyramid: ['triangular prism'], cylinder: ['cone'], cone: ['cylinder'] }[key];
      const wrong = [...near, ...shuffle(others2.filter(n => !near.includes(n)), r)].slice(0, 3);
      return choice('Which 3-D shape is drawn here?', solid.name, wrong, r, { visual: { type: 'solid', shape: key, dims },
        rule: key === 'cube' ? 'A cube has 6 square faces. A cuboid has 6 rectangular faces.' : 'Look at the faces and the edges. Dotted lines are hidden edges at the back.' });
    }
    if (l === 2) {
      const pk = pick(r, POLY), ps = SOLIDS[pk], pdims = pk === 'cube' ? [2, 2, 2] : pk === 'cuboid' ? [3, 2, 2] : undefined;
      const [what, label] = [['f', 'faces'], ['e', 'edges'], ['v', 'vertices (corners)'], ['f', 'faces'], ['e', 'edges']][i];
      return number(`How many ${label} does this ${ps.name} have?`, ps[what], { visual: { type: 'solid', shape: pk, dims: pdims }, maxDigits: 2, hint: 'Count carefully. Dotted lines are edges you cannot see.' });
    }
    if (l === 3) {
      if (i % 2 === 1) {
        const nk = pick(r, NETS), others3 = NETS.filter(k => k !== nk).map(k => SOLIDS[k].name);
        return choice('Which 3-D shape does this net fold up to make?', SOLIDS[nk].name, others3, r, { visual: { type: 'net', shape: nk }, rule: 'A net is a flat pattern. Fold along the edges to make a solid.' });
      }
      const bins = ['Cuboid (or cube)', 'Not a cuboid'];
      const yes = ['A shoe box', 'A dice', 'A brick', 'A cereal box', 'A book', 'A fish tank'], no = ['A tin of beans', 'A football', 'A party hat', 'A tent (a triangular prism)', 'An Egyptian pyramid', 'A traffic cone'];
      return sort('Sort the objects. Is each one a cuboid?', bins, shuffle([...shuffle(yes, r).slice(0, 3).map(x => [x, bins[0]]), ...shuffle(no, r).slice(0, 3).map(x => [x, bins[1]])], r),
        { rule: 'A cuboid has 6 rectangular faces. A cube is a special cuboid.' });
    }
    const a = int(r, 3, 9), b = int(r, 2, 6), c = int(r, 2, 5), name = NAME(r);
    return number([
      `${name} makes a cube from straws. Each edge is ${a} cm long. How many centimetres of straw are used for all the edges?`,
      `A cuboid box is ${a + 3} cm by ${b + 2} cm by ${c} cm. What is the total length of all its edges, in cm?`,
      `A cube has edges of ${a} cm. What is the area of one face, in cm²?`,
      `A cuboid has two square faces, each with sides of ${a} cm, and a length of ${a + b} cm. How many of its faces are rectangles that are not squares?`,
      `${name} paints every face of a cube with edges of ${b + 1} cm. How many square centimetres is that altogether?`,
    ][i], [12 * a, 4 * (a + 3 + b + 2 + c), a * a, 4, 6 * (b + 1) ** 2][i], { maxDigits: 3 });
  },
  rectangles(l, r, i) {
    const w = int(r, 5, 14), h = int(r, 3, 9), diff = w === h ? 1 : 0, H = h + diff;
    if (l === 1) {
      const unknown = ['bottom', 'right', 'bottom', 'right', 'bottom'][i], horizontal = unknown === 'bottom';
      const answer = horizontal ? w : H;
      return choiceN(`This is a rectangle. How long is the ${unknown} side, in cm?`, answer, [horizontal ? H : w, w + H, 2 * answer, answer + 1], r,
        { visual: { type: 'rect', w, h: H, unit: 'cm', labels: horizontal ? { w: String(w), h: String(H), hideBottom: true } : { w: String(w), h: String(H), hideRight: true } },
          rule: 'A rectangle has opposite sides equal, and four right angles (90°).' });
    }
    const deg = pick(r, [20, 25, 28, 32, 35, 38, 40, 42, 55, 58, 62]), name = NAME(r);
    if (l === 2) {
      return [
        () => number('A diagonal is drawn across this rectangle. What is the size of the marked angle, in degrees?', 90 - deg, { visual: { type: 'rectDiag', angle: deg }, maxDigits: 3, hint: 'The corner is 90°. Take away the angle you know.' }),
        () => number(`A rectangle has a perimeter of ${2 * (w + H)} cm and a length of ${w} cm. How wide is it, in cm?`, H, { maxDigits: 3 }),
        () => number('A diagonal is drawn across this rectangle. What is the size of the marked angle, in degrees?', 90 - (deg + 3 < 90 ? deg + 3 : deg - 3), { visual: { type: 'rectDiag', angle: deg + 3 < 90 ? deg + 3 : deg - 3 }, maxDigits: 3 }),
        () => number(`A rectangle has an area of ${w * H} cm² and a length of ${w} cm. How wide is it, in cm?`, H, { maxDigits: 3 }),
        () => number(`A rectangle is ${w} cm long. Its perimeter is ${2 * w + 2 * H} cm. What is the length of one short side, in cm?`, H, { maxDigits: 3 }),
      ][i]();
    }
    if (l === 3) {
      const forms = [
        [String(w), '+', String(H), '+', String(w), '+', String(H), '=', String(2 * (w + H))],
        ['2', '×', '(', String(w), '+', String(H), ')', '=', String(2 * (w + H))],
        [String(w), '×', String(H), '=', String(w * H)],
        [String(deg), '+', String(90 - deg), '=', '90'],
        [String(H), '+', String(w), '+', String(H), '+', String(w), '=', String(2 * (w + H))],
      ];
      const prompts = [`Build the perimeter of a rectangle ${w} cm long and ${H} cm wide.`, `Build a short calculation for the perimeter of a rectangle ${w} cm by ${H} cm.`, `Build the area of a rectangle ${w} cm long and ${H} cm wide.`, 'A diagonal splits a right angle. Build the facts about the two angles.', `Build the perimeter of a rectangle ${H} cm wide and ${w} cm long.`];
      const visual = i === 3 ? { type: 'rectDiag', angle: deg } : { type: 'rect', w, h: H, unit: 'cm', labels: { w: String(w), h: String(H) } };
      return build(prompts[i], forms[i], r, { visual });
    }
    return number([
      `A rectangular playground is ${w + 10} m long. The fence all round is ${2 * (w + 10 + H)} m. How wide is the playground, in metres?`,
      `${name} draws a diagonal in a rectangle. It makes an angle of ${deg}° with the long side. What angle does it make with the short side, in degrees?`,
      `A picture frame is a rectangle that is ${w} cm by ${H} cm. ${name} puts ribbon round the outside edge. How many centimetres of ribbon is needed?`,
      `A rectangular garden has an area of ${w * H} m² and is ${H} m wide. How long is it, in metres?`,
      `A rectangle has sides of ${w} cm and ${H} cm. A diagonal makes an angle of ${deg}° with the ${w} cm side. What angle does it make with the ${H} cm side, in degrees?`,
    ][i], [H, 90 - deg, 2 * (w + H), w, 90 - deg][i], { maxDigits: 3, ...(i === 1 || i === 4 ? { visual: { type: 'rectDiag', angle: deg } } : {}) });
  },
  polygons(l, r, i) {
    if (l === 1) {
      if (i % 2 === 0) {
        const [shape, name, sides] = pick(r, REGULAR);
        return choice(`This shape is ${an(name)}. Is it a regular or an irregular polygon?`, 'Regular', ['Irregular'], r, { visual: { type: 'shape', shape, property: sides === 3 ? 'all 3 sides equal, all 3 angles equal' : `all ${sides} sides equal, all ${sides} angles equal` }, rule: 'A regular polygon has all its sides equal AND all its angles equal.' });
      }
      const [shape, name, fact] = pick(r, IRREGULAR);
      return choice(`This shape is ${an(name)}. Is it a regular or an irregular polygon?`, 'Irregular', ['Regular'], r, { visual: { type: 'shape', shape, property: fact }, rule: 'A regular polygon has all its sides equal AND all its angles equal.' });
    }
    const [shape, name, sides] = pick(r, REGULAR.slice(1)), len = int(r, 3, 12), name2 = NAME(r);
    if (l === 2) {
      return [
        () => number(`A ${name} has sides of ${len} cm. What is its perimeter, in cm?`, sides * len, { maxDigits: 3, visual: { type: 'shape', shape, property: `${sides} equal sides of ${len} cm` } }),
        () => { const [, n2, s2] = pick(r, REGULAR.slice(1)); return number(`How many equal angles does a ${n2} have?`, s2, { maxDigits: 2 }); },
        () => number(`A regular polygon has a perimeter of ${sides * len} cm and each side is ${len} cm. How many sides does it have?`, sides, { maxDigits: 2 }),
        () => { const [, n2, s2] = pick(r, REGULAR.slice(1)); return number(`A regular polygon has ${s2} equal sides of ${len} cm. What is its perimeter, in cm?`, s2 * len, { maxDigits: 3, hint: `This is a ${n2}. Add all the sides, or multiply.` }); },
        () => { const [, , s3] = pick(r, REGULAR.slice(1)); return number(`How many equal sides does a regular polygon with ${s3} angles have?`, s3, { maxDigits: 2 }); },
      ][i]();
    }
    if (l === 3) {
      const bins = ['Regular', 'Irregular'], reg = shuffle(REGULAR, r).slice(0, 3).map(x => x[1]), irr = shuffle(IRREGULAR, r).slice(0, 3).map(x => x[1]);
      return sort('Sort the shapes. Are they regular or irregular polygons?', bins, shuffle([...reg.map(x => [cap(x), bins[0]]), ...irr.map(x => [cap(x), bins[1]])], r), { rule: 'Regular: all sides equal AND all angles equal.' });
    }
    return [
      () => choice('Which of these is a regular polygon?', 'Square', ['Rectangle', 'Rhombus', 'Kite'], r, { rule: 'Regular: all sides equal AND all angles equal.' }),
      () => number(`A regular polygon has sides of ${len} cm and a perimeter of ${sides * len} cm. How many sides does it have?`, sides, { maxDigits: 2 }),
      () => choice(`${name2} says a rhombus is a regular polygon because all its sides are equal. Is ${name2} right?`, 'No, its angles are not all equal', ['Yes, equal sides is enough', 'No, a rhombus has no equal sides', 'Yes, all four angles are 90°'], r),
      () => number(`${name2} makes a ${name} from sticks. Each stick is ${len} cm long. How many centimetres of stick does ${name2} use altogether?`, sides * len, { maxDigits: 3 }),
      () => choice(`${name2} says a rectangle is a regular polygon because all its angles are equal. Is ${name2} right?`, 'No, its sides are not all equal', ['Yes, equal angles is enough', 'No, a rectangle has no right angles', 'Yes, all four sides are equal'], r),
    ][i]();
  },
};
void others;

export const TOPIC_TITLES = {
  solids: ['Name the 3-D shape.', 'Count faces, edges and vertices.', 'Sort and fold.', 'Solve a 3-D shape problem.'],
  rectangles: ['Find a missing side.', 'Find missing lengths and angles.', 'Build rectangle facts.', 'Solve a rectangle problem.'],
  polygons: ['Regular or irregular?', 'Count sides and angles.', 'Sort the polygons.', 'Explain the shapes.'],
};
