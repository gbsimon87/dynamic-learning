import { choice, int, numericOptions, order, pick, shuffle } from "./shared.js";

export const TWO_D = ["circle", "triangle", "square", "rectangle", "scalene-triangle", "right-triangle"];
export const THREE_D = ["cube", "cuboid", "square-pyramid", "sphere"];
export const shapeName = id => ["scalene-triangle", "right-triangle"].includes(id) ? "triangle" : id === "square-pyramid" ? "pyramid" : id;

/** Build `count` questions with `make(r, i)`, retrying any whose `key` repeats an earlier one. */
function distinct(rng, count, make, key) {
  const seen = new Set(), result = [];
  for (let i = 0, tries = 0; result.length < count; tries++) {
    const q = make(rng, i);
    const k = key(q);
    if (seen.has(k) && tries < 200) continue;
    seen.add(k); result.push(q); i++;
  }
  return result;
}
/** Every item once, then one more that is not the last item, so a run covers them all. */
const coverPlusOne = (rng, items) => {
  const first = shuffle(rng, items);
  return [...first, pick(rng, first.slice(0, -1))];
};
const plural = (n, word) => `${n} ${word}${n === 1 ? "" : "s"}`;

/* ---------- Properties of shapes ---------- */

const NAMES = { false: ["circle", "triangle", "square", "rectangle"], true: ["cube", "cuboid", "pyramid", "sphere"] };
// Extra wrong names (never drawn) so every naming question has four options.
const EXTRA_NAMES = { false: ["pentagon", "hexagon"], true: ["cylinder", "cone"] };
const idsFor = (solid, name) => (solid ? THREE_D : TWO_D).filter(id => shapeName(id) === name);
/** A square is a rectangle and a cube is a cuboid, so never offer the wider name as "wrong". */
const wider = name => name === "square" ? "rectangle" : name === "cube" ? "cuboid" : null;
const fits = (name, family) => name === family || wider(name) === family;

export function nameOptions(rng, solid, answer) {
  const pool = [...NAMES[solid], ...EXTRA_NAMES[solid]].filter(n => n !== answer && n !== wider(answer));
  return [answer, ...shuffle(rng, pool).slice(0, 3)];
}
const turned = (rng, solid) => solid ? pick(rng, [-25, -15, 15, 25]) : pick(rng, [30, 45, 90, 135, 180, 225]);

/** Everyday things for slot 4. The emoji is the object, never a shape diagram. */
const OBJECTS = {
  false: {
    circle: [["a clock", "🕐"], ["a biscuit", "🍪"], ["a full moon", "🌕"], ["a button", "🔘"]],
    triangle: [["a road sign", "⚠️"], ["a slice of pizza", "🍕"], ["a boat's sail", "⛵"]],
    square: [["a window", "🪟"], ["a sticky note", "🟨"]],
    rectangle: [["a door", "🚪"], ["a book", "📕"], ["a phone", "📱"], ["an envelope", "✉️"]],
  },
  true: {
    sphere: [["a football", "⚽"], ["an orange", "🍊"], ["a globe", "🌍"], ["a basketball", "🏀"]],
    cube: [["a dice", "🎲"], ["a gift box", "🎁"]],
    cuboid: [["a box", "📦"], ["a brick", "🧱"], ["a bar of chocolate", "🍫"]],
  },
};

function shapesBuilder(solid) {
  const names = NAMES[solid];
  const word = solid ? "solid" : "shape";

  // Slot 1: one upright shape, named with a clue on screen.
  const nameIt = rng => {
    const ids = solid ? coverPlusOne(rng, THREE_D) : shuffle(rng, ["circle", "square", "rectangle", ...shuffle(rng, ["triangle", "scalene-triangle", "right-triangle"]).slice(0, 2)]);
    return ids.map((id, i) => {
      const repeat = ids.indexOf(id) < i; // a 3-D run shows one solid twice: tipped and smaller the second time
      return choice(rng, `What is this ${word} called?`, shapeName(id), nameOptions(rng, solid, shapeName(id)), {
        rule: solid ? "Is it round? Does it have a point? Is it like a box?" : "Count the sides. Is it round?",
        visual: { type: "shapes", solid, shapes: [{ id, rotation: repeat ? turned(rng, solid) : 0, scale: repeat ? 0.75 : 1 }] },
        hint: solid ? "A cube has square faces. A cuboid is like a long box." : "A triangle has 3 sides. A square has 4 sides the same.",
      });
    });
  };

  // Slot 2: find every one of a kind in a mixed, turned, resized set.
  const countThem = rng => {
    const targets = coverPlusOne(rng, names);
    return distinct(rng, 5, (r, i) => {
      const target = targets[i], total = solid ? 5 : 6, count = int(r, 1, 4);
      // Cubes are cuboids and squares are rectangles: leave them out when counting the wider family.
      const others = names.filter(n => n !== target && !fits(n, target));
      const ids = shuffle(r, [
        ...Array.from({ length: count }, () => pick(r, idsFor(solid, target))),
        ...Array.from({ length: total - count }, () => pick(r, idsFor(solid, pick(r, others)))),
      ]);
      return { kind: "choice", prompt: `How many ${target}s can you see?`, answer: count,
        options: numericOptions(r, count, total, { min: 1 }), variant: "wordy",
        rule: `Some ${word}s are turned or small. They keep their name.`,
        visual: { type: "shapes", solid, shapes: ids.map(id => ({ id, rotation: r() < 0.6 ? turned(r, solid) : 0, scale: pick(r, [0.6, 0.8, 1]) })) },
        hint: target === "cube" ? "A cube has all square faces. A long box is a cuboid." : target === "square" ? "A square has 4 sides all the same length." : "Turn your head. Is it still the same shape?" };
    }, q => `${q.prompt}|${q.answer}`);
  };

  // Slot 3: sort a fresh set of shapes into their groups.
  const sortThem = rng => distinct(rng, 5, r => {
    const bins = solid ? ["cuboid", "pyramid", "sphere"] : ["circle", "triangle", "rectangle"];
    const special = solid ? "cube" : "square";
    const count = solid ? 4 : 5;
    // The square/cube-in-the-wider-group idea turns up in some sets, not every one.
    const withSpecial = r() < 0.4, pool = (solid ? THREE_D : TWO_D).filter(id => id !== special);
    let ids;
    do {
      ids = Array.from({ length: count }, () => pick(r, pool));
      if (withSpecial) ids[int(r, 0, count - 1)] = special;
    } while (!bins.every(bin => ids.some(id => fits(shapeName(id), bin))));
    const cards = ids.map((id, i) => ({ id: `shape-${i}`, label: `Shape ${String.fromCharCode(65 + i)}`, bin: bins.find(bin => fits(shapeName(id), bin)) }));
    return { kind: "sort", prompt: `Put each ${word} in its group.`, cards: shuffle(r, cards),
      bins: bins.map(bin => ({ id: bin, label: bin })),
      ...(ids.includes(special) ? { rule: solid ? "A cube is a cuboid too." : "A square is a rectangle too." } : {}),
      visual: { type: "shapes", solid, shapes: ids.map((id, i) => ({ id, label: cards[i].label, rotation: r() < 0.5 ? turned(r, solid) : 0 })) },
      hint: solid ? "Round all over: sphere. A point at the top: pyramid. Like a box: cuboid." : "Round: circle. 3 sides: triangle. 4 sides and square corners: rectangle." };
  }, q => q.visual.shapes.map(s => s.id).join(","));

  // Slot 4: a real thing, no diagram — which shape is it like?
  const everyday = rng => {
    const bank = OBJECTS[solid];
    // Every answer once, then more (never the same twice in a row) until there are five.
    const answers = shuffle(rng, Object.keys(bank)), left = Object.fromEntries(Object.entries(bank).map(([k, v]) => [k, v.length - 1]));
    while (answers.length < 5) {
      const next = pick(rng, Object.keys(bank).filter(k => k !== answers.at(-1) && left[k] > 0));
      left[next]--; answers.push(next);
    }
    const used = new Set();
    return answers.map(name => {
      const [thing, emoji] = pick(rng, bank[name].filter(([t]) => !used.has(t)));
      used.add(thing);
      return choice(rng, `Bix sees ${thing}. Which ${word} is it like?`, name, nameOptions(rng, solid, name), {
        picture: emoji, pictureLabel: thing,
        hint: solid ? "Does it roll? Does it have flat faces?" : "Think about its outline. Is it round? How many sides?",
      });
    });
  };

  return (level, rng) => [nameIt, countThem, sortThem, everyday][level - 1](rng);
}

/* ---------- Position and direction ---------- */

const DIRECTIONS = ["up", "right", "down", "left"];
const STEP = { up: [0, -1], right: [1, 0], down: [0, 1], left: [-1, 0] };
const THINGS = [["🍎", "apple"], ["⭐", "star"], ["🌳", "tree"], ["⚽", "ball"], ["🎂", "cake"], ["🚗", "car"], ["🐟", "fish"], ["🌸", "flower"], ["🐱", "cat"], ["🎈", "balloon"]];
const inside = (x, y, size) => x >= 0 && y >= 0 && x < size && y < size;

const POSITION_WORDS = { up: "above", down: "below", left: "to the left of", right: "to the right of" };
const PLACES = ["inside", "on top of", "under", "next to"];
const PLACE_THINGS = [["⚽", "ball"], ["🐱", "cat"], ["🍎", "apple"], ["🐶", "dog"], ["🐭", "mouse"]];
const PEOPLE = ["Leo", "Maya", "Sam", "Ava", "Zara", "Tom"];
const STACK = ["cup", "book", "box", "plate", "hat", "bag"];

/** Slot 4 stories: a line of three people or a stack of three things, told without a picture. */
function positionStory(r) {
  if (r() < 0.5) {
    const [front, middle, back] = shuffle(r, PEOPLE).slice(0, 3);
    const story = `${middle} is behind ${front}. ${back} is behind ${middle}.`;
    const [ask, answer] = pick(r, [["Who is at the front?", front], ["Who is at the back?", back], ["Who is in the middle?", middle], [`Who is in front of ${middle}?`, front], [`Who is between ${front} and ${back}?`, middle]]);
    return choice(r, `${story} ${ask}`, answer, [front, middle, back], { speak: `${story} ${ask}`, hint: "Draw the line with your finger. Who comes first?" });
  }
  const [top, middle, bottom] = shuffle(r, STACK).slice(0, 3);
  const story = `The ${top} is on top of the ${middle}. The ${middle} is on top of the ${bottom}.`;
  const [ask, answer] = pick(r, [["What is at the top?", top], ["What is at the bottom?", bottom], ["What is in the middle?", middle], [`What is under the ${top}?`, middle], [`What is on top of the ${bottom}?`, middle]]);
  return choice(r, `${story} ${ask}`, `the ${answer}`, [top, middle, bottom].map(t => `the ${t}`), { speak: `${story} ${ask}`, hint: "Build the pile in your head, from the bottom up." });
}

/** Slot 2 of movement: what is `steps` squares away on a 4 × 4 board, with near-miss decoys. */
function landingQuestion(r) {
  const size = 4;
  for (;;) {
    const dir = pick(r, DIRECTIONS), steps = int(r, 1, 3), [dx, dy] = STEP[dir];
    const bx = int(r, 0, 3), by = int(r, 0, 3), tx = bx + dx * steps, ty = by + dy * steps;
    if (!inside(tx, ty, size)) continue;
    const near = [[bx + dx * (steps + 1), by + dy * (steps + 1)], [bx + dx * (steps - 1), by + dy * (steps - 1)], [bx - dx * steps, by - dy * steps],
      [bx + dy * steps, by + dx * steps], [bx - dy * steps, by - dx * steps]];
    const cells = [[tx, ty]];
    for (const [x, y] of [...near, ...shuffle(r, Array.from({ length: 16 }, (_, k) => [k % 4, Math.floor(k / 4)]))]) {
      if (cells.length < 4 && inside(x, y, size) && !(x === bx && y === by) && !cells.some(([cx, cy]) => cx === x && cy === y)) cells.push([x, y]);
    }
    const things = shuffle(r, THINGS).slice(0, 4);
    return choice(r, `The bear moves ${plural(steps, "square")} ${dir}. What does it land on?`, things[0][1], things.map(t => t[1]), {
      visual: { type: "position", size, label: "A bear and four things on a grid", objects: [{ x: bx, y: by, emoji: "🧸" }, ...cells.map(([x, y], k) => ({ x, y, emoji: things[k][0] }))] },
      hint: `Put your finger on the bear. Move one square at a time, ${dir}.` });
  }
}

/** Slot 3 of movement: follow three one-square moves and order the things met. */
function routeQuestion(r) {
  const size = 4;
  for (;;) {
    let x = int(r, 0, 3), y = int(r, 0, 3);
    const start = [x, y], path = [], dirs = [];
    for (let k = 0; k < 3; k++) {
      const options = DIRECTIONS.filter(d => inside(x + STEP[d][0], y + STEP[d][1], size)
        && ![start, ...path].some(([px, py]) => px === x + STEP[d][0] && py === y + STEP[d][1]));
      if (!options.length) break;
      const d = pick(r, options);
      x += STEP[d][0]; y += STEP[d][1];
      dirs.push(d); path.push([x, y]);
    }
    if (path.length < 3) continue;
    const things = shuffle(r, THINGS).slice(0, 4);
    // A decoy one square from the bear in a direction it did not take first.
    const decoyDir = pick(r, DIRECTIONS.filter(d => d !== dirs[0] && inside(start[0] + STEP[d][0], start[1] + STEP[d][1], size)
      && !path.some(([px, py]) => px === start[0] + STEP[d][0] && py === start[1] + STEP[d][1])));
    const objects = [{ x: start[0], y: start[1], emoji: "🧸" }, ...path.map(([px, py], k) => ({ x: px, y: py, emoji: things[k][0] }))];
    if (decoyDir) objects.push({ x: start[0] + STEP[decoyDir][0], y: start[1] + STEP[decoyDir][1], emoji: things[3][0] });
    return { ...order(r, `The bear goes ${dirs[0]}, then ${dirs[1]}, then ${dirs[2]}. Put the things it meets in order.`, things.slice(0, 3).map(([e, n]) => `${e} ${n}`)),
      visual: { type: "position", size, label: "A bear and some things on a grid", objects },
      hint: "Move one square for each word. Say what you land on each time." };
  }
}

/** Slot 4 of movement: steps towards or away, or hops forwards or backwards, typed. */
function moveStory(r) {
  if (r() < 0.5) {
    const who = pick(r, ["Maya", "Leo", "Sam", "Ava"]), towards = r() < 0.5;
    const n = towards ? int(r, 3, 9) : int(r, 1, 6), k = towards ? int(r, 1, n - 1) : int(r, 1, 4);
    const text = `${who} is ${plural(n, "step")} from Bix. ${who} takes ${plural(k, "step")} ${towards ? "towards" : "away from"} Bix. How many steps away is ${who} now?`;
    return { kind: "number", prompt: text, speak: text, answer: towards ? n - k : n + k, maxDigits: 2,
      hint: towards ? "Towards makes the gap smaller. Count back." : "Away makes the gap bigger. Count on." };
  }
  const [animal, hop] = pick(r, [["frog", "hops"], ["rabbit", "jumps"], ["kangaroo", "jumps"]]), forwards = r() < 0.5;
  const s = forwards ? int(r, 1, 12) : int(r, 4, 15), k = forwards ? int(r, 1, 5) : int(r, 1, Math.min(5, s - 1));
  const text = `A ${animal} is on stone ${s}. It ${hop} ${plural(k, "stone")} ${forwards ? "forwards" : "backwards"}. Which stone is it on now?`;
  return { kind: "number", prompt: text, speak: text, answer: forwards ? s + k : s - k, maxDigits: 2,
    hint: forwards ? "Forwards goes to bigger numbers. Count on." : "Backwards goes to smaller numbers. Count back." };
}

const TURN_NAMES = ["a quarter turn", "a half turn", "a three-quarter turn", "a whole turn"];
const QUARTER_WORDS = ["1 quarter turn", "2 quarter turns", "3 quarter turns", "4 quarter turns"];
const way = clockwise => clockwise ? "clockwise" : "anti-clockwise";
const endFacing = (start, quarters, clockwise) => (start + (clockwise ? quarters : -quarters) + 4) % 4;

export const geometryBuilders = {
  "recognising-2-d-shapes": shapesBuilder(false),
  "recognising-3-d-shapes": shapesBuilder(true),

  "describing-position": (level, rng) => {
    if (level === 1) {
      // Each of the four words once, plus one more; the bear moves around the board.
      const dirs = coverPlusOne(rng, DIRECTIONS);
      return distinct(rng, 5, (r, i) => {
        const [dx, dy] = STEP[dirs[i]];
        let bx, by;
        do { bx = int(r, 0, 2); by = int(r, 0, 2); } while (!inside(bx + dx, by + dy, 3));
        return choice(r, "The star is … the bear.", POSITION_WORDS[dirs[i]], Object.values(POSITION_WORDS), {
          rule: "Above is higher up. Below is lower down.",
          visual: { type: "position", objects: [{ x: bx, y: by, emoji: "🧸" }, { x: bx + dx, y: by + dy, emoji: "⭐" }] },
          hint: "Start at the bear. Look towards the star." });
      }, q => JSON.stringify(q.visual.objects));
    }
    if (level === 2) {
      const places = coverPlusOne(rng, PLACES);
      return distinct(rng, 5, (r, i) => {
        const [emoji, name] = pick(r, PLACE_THINGS);
        return choice(r, `The ${name} is … the box.`, places[i], PLACES, {
          visual: { type: "place", place: places[i], emoji, name },
          hint: "Look at the box. Where is it compared with the box?" });
      }, q => `${q.prompt}|${q.answer}`);
    }
    if (level === 3) return distinct(rng, 5, r => {
      const across = r() < 0.5;
      const sides = across ? [["left", "Left of the bear"], ["right", "Right of the bear"]] : [["above", "Above the bear"], ["below", "Below the bear"]];
      const cells = Array.from({ length: 9 }, (_, k) => [k % 3, Math.floor(k / 3)]).filter(([x, y]) => across ? x !== 1 : y !== 1);
      let chosen;
      do { chosen = shuffle(r, cells).slice(0, 4); } while (new Set(chosen.map(([x, y]) => across ? x : y)).size < 2);
      const things = shuffle(r, THINGS).slice(0, 4);
      const binOf = ([x, y]) => across ? (x === 0 ? "left" : "right") : (y === 0 ? "above" : "below");
      return { kind: "sort", prompt: `Is each thing ${across ? "left or right of" : "above or below"} the bear?`,
        bins: sides.map(([id, label]) => ({ id, label })),
        cards: shuffle(r, things.map(([e, n], k) => ({ id: n, label: `${e} ${n}`, bin: binOf(chosen[k]) }))),
        visual: { type: "position", objects: [{ x: 1, y: 1, emoji: "🧸" }, ...chosen.map(([x, y], k) => ({ x, y, emoji: things[k][0] }))] },
        hint: across ? "Up or down does not matter. Is it on the bear's left side or right side?" : "Left or right does not matter. Is it higher or lower than the bear?" };
    }, q => JSON.stringify(q.visual.objects));
    return distinct(rng, 5, positionStory, q => q.prompt);
  },

  "describing-movement": (level, rng) => {
    if (level === 1) {
      const dirs = coverPlusOne(rng, DIRECTIONS);
      return distinct(rng, 5, (r, i) => {
        const [dx, dy] = STEP[dirs[i]];
        let x, y;
        do { x = int(r, 0, 2); y = int(r, 0, 2); } while (!inside(x + dx, y + dy, 3));
        return choice(r, "The arrow goes from the bear to the star. Which way?", dirs[i], DIRECTIONS, {
          rule: "Follow the arrow to its pointy tip.",
          visual: { type: "movement", from: { x, y }, to: { x: x + dx, y: y + dy } }, hint: "Follow the arrow from its start to its point." });
      }, q => JSON.stringify(q.visual));
    }
    if (level === 2) return distinct(rng, 5, landingQuestion, q => q.prompt + JSON.stringify(q.visual.objects[0]));
    if (level === 3) return distinct(rng, 5, routeQuestion, q => q.prompt);
    return distinct(rng, 5, moveStory, q => q.prompt);
  },

  "whole-half-quarter-and-three-quarter-turns": (level, rng) => {
    if (level === 3) return distinct(rng, 5, r => {
      const values = shuffle(r, [1, 2, 3, 4]).slice(0, int(r, 3, 4)).sort((a, b) => a - b);
      const biggestFirst = r() < 0.5;
      if (biggestFirst) values.reverse();
      const labels = values.map(q => (r() < 0.3 ? QUARTER_WORDS : TURN_NAMES)[q - 1]);
      return { ...order(r, biggestFirst ? "Put the turns in order. Biggest turn first." : "Put the turns in order. Smallest turn first.", labels, values),
        hint: "Count the quarter turns in each one. A half turn is 2 quarter turns." };
    }, q => `${q.prompt}|${q.items.map(item => item.label).sort().join(",")}`);
    if (level === 4) return distinct(rng, 5, r => {
      const start = int(r, 0, 3), quarters = int(r, 1, 4), clockwise = r() < 0.5;
      return choice(r, `Face ${DIRECTIONS[start]}. Make ${TURN_NAMES[quarters - 1]} ${way(clockwise)}. Which way do you face now?`, DIRECTIONS[endFacing(start, quarters, clockwise)], DIRECTIONS, {
        visual: { type: "turn", start, quarters, clockwise, showEnd: false },
        hint: "Clockwise goes the way clock hands move. Turn one quarter at a time." });
    }, q => q.prompt);
    // Slots 1 and 2: every turn size once, plus one more, in either direction.
    const sizes = coverPlusOne(rng, [1, 2, 3, 4]);
    return distinct(rng, 5, (r, i) => {
      const quarters = sizes[i], clockwise = r() < 0.5, start = level === 1 ? 0 : int(r, 0, 3);
      if (level === 1) return choice(r, "Follow the curved arrow. What turn is it?", TURN_NAMES[quarters - 1], TURN_NAMES, {
        rule: "Four quarter turns make one whole turn.",
        visual: { type: "turn", start, quarters, clockwise, showEnd: true },
        hint: "Count how many quarter turns the curved arrow travels." });
      return choice(r, `The arrow turns ${way(clockwise)}, from the dotted arrow to the solid one. What turn is it?`, TURN_NAMES[quarters - 1], TURN_NAMES, {
        visual: { type: "turn", start, quarters, clockwise, showEnd: true, arcs: false },
        hint: `Start at the dotted arrow. Turn ${way(clockwise)} one quarter at a time until you reach the solid arrow.` });
    }, q => `${q.prompt}|${JSON.stringify(q.visual)}`);
  },
};
