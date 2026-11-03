import { ch, bd, od, st, ty, nm, some } from "../topicBank.js";
import { shuffle } from "../year1Math/shared.js";
import { int, pick, times, showing, numberChoice } from "./shared.js";

/* ====================================================================
   Sequences of instructions
   ==================================================================== */
const SAYINGS = [["I", "like", "robots"], ["Bix", "loves", "maths"], ["We", "code", "together"], ["Cats", "chase", "mice"], ["Stars", "shine", "brightly"], ["Dogs", "chase", "cats"]];
const DIRECTIONS = ["north", "east", "south", "west"];
const text = (cmd) => (cmd === "R" ? "turn right" : cmd === "L" ? "turn left" : `forward ${cmd.slice(1)}`);
/** Where the robot ends if it starts at (0, 0) facing north. x grows east, y grows north. */
export function robot(commands) {
  let x = 0; let y = 0; let heading = 0;
  for (const c of commands) {
    if (c === "R") heading = (heading + 1) % 4;
    else if (c === "L") heading = (heading + 3) % 4;
    else {
      const n = Number(c.slice(1));
      if (heading === 0) y += n; else if (heading === 1) x += n; else if (heading === 2) y -= n; else x -= n;
    }
  }
  return { x, y, heading };
}
const spot = ({ x, y }) => `(${x}, ${y})`;
const randomProgram = (rng, length = 3, turns = ["R", "L"]) => {
  const out = [];
  for (let i = 0; i < length; i += 1) out.push(i % 2 === 0 ? `F${int(rng, 1, 4)}` : pick(rng, turns));
  return out;
};
const ROBOT_TITLE = "Robot program";
const robotStart = "The robot starts at (0, 0) facing north. x grows going east and y grows going north.";
const wrongSpots = (rng, end) => some(rng, [...new Set([[end.y, end.x], [end.x + 1, end.y], [end.x, end.y + 1], [end.x - 1, end.y], [end.x, end.y - 1], [end.x + 2, end.y]].map(([a, b]) => spot({ x: a, y: b })))].filter((s) => s !== spot(end)), 3);
const TASKS = [
  ["Order the steps for making toast.", ["Put bread in the toaster", "Push the lever down", "Wait for it to pop up", "Spread butter on the toast"]],
  ["Order the steps for brushing teeth.", ["Put toothpaste on the brush", "Brush every tooth", "Spit out the toothpaste", "Rinse the brush"]],
  ["Order the steps for crossing a road safely.", ["Stop at the kerb", "Look both ways", "Walk across when it is clear", "Reach the other side"]],
  ["Order the steps for watering a plant.", ["Fill the watering can", "Carry it to the plant", "Pour water on the soil", "Put the can away"]],
  ["Order the steps for making a cup of tea.", ["Put a tea bag in the cup", "Pour boiling water on it", "Wait a minute", "Take out the tea bag"]],
  ["Order the steps for getting dressed.", ["Put on your socks", "Put on your shoes", "Tie the laces", "Stand up and walk out"]],
  ["Order the steps for planting a seed.", ["Dig a small hole", "Drop in the seed", "Cover it with soil", "Wait for it to grow"]],
  ["Order the steps for making a paper plane.", ["Fold the paper in half", "Fold the corners to the middle", "Fold the wings down", "Throw the plane"]],
  ["Order the steps for washing your hands.", ["Wet your hands", "Rub soap on them", "Rinse off the soap", "Dry your hands"]],
];

export const sequences = {
  rule: "A sequence is a set of instructions that the computer follows one after another, in order. Changing the order can change what happens.",
  hint: "Follow the instructions in order, one line at a time. Do not skip ahead.",
  levels: {
    1: [
      ...SAYINGS.map((words) => (rng) => {
        const answer = words.join(" ");
        const wrong = shuffle(rng, [[1, 0, 2], [2, 1, 0], [0, 2, 1], [1, 2, 0], [2, 0, 1]]).slice(0, 3).map((p) => p.map((i) => words[i]).join(" "));
        return ch("What does this program say?", answer, wrong, showing("Program", words.map((w) => `say "${w}"`)));
      }),
      ...times(8, () => (rng) => {
        const commands = randomProgram(rng, 3, ["R"]);
        return ch(`${robotStart} Where does it end?`, spot(robot(commands)), wrongSpots(rng, robot(commands)), showing(ROBOT_TITLE, commands.map(text)));
      }),
      ...times(4, () => (rng) => {
        const commands = randomProgram(rng, 3);
        const answer = DIRECTIONS[robot(commands).heading];
        return ch(`${robotStart} Which way does it face at the end?`, answer, DIRECTIONS.filter((d) => d !== answer), showing(ROBOT_TITLE, commands.map(text)));
      }),
    ],
    2: [
      ...times(8, () => (rng) => {
        const target = randomProgram(rng, 3);
        const end = robot(target);
        const options = [target];
        for (let tries = 0; options.length < 4 && tries < 40; tries += 1) {
          const copy = [...target];
          const at = int(rng, 0, 2);
          copy[at] = at % 2 === 0 ? `F${int(rng, 1, 4)}` : pick(rng, ["R", "L"]);
          const other = robot(copy);
          if (copy.join("") !== target.join("") && (other.x !== end.x || other.y !== end.y) && !options.some((o) => o.join("") === copy.join(""))) options.push(copy);
        }
        const label = (c) => c.map(text).join(", ");
        return ch(`${robotStart} Which program ends at ${spot(end)}?`, label(target), options.slice(1).map(label));
      }),
      ...times(6, () => (rng) => {
        const first = int(rng, 1, 4); const second = int(rng, 1, 4);
        const commands = [`F${first}`, "R", `F${second}`];
        const end = robot(commands);
        return ch(`${robotStart} The robot must end at ${spot(end)}. Which command is missing?`, text(`F${second}`),
          some(rng, [1, 2, 3, 4, 5].filter((n) => n !== second).map((n) => `forward ${n}`), 3),
          showing(ROBOT_TITLE, [text(commands[0]), text(commands[1]), "?"]));
      }),
      ...[
        ["Wash hands", "dry hands", "Which step is missing? Wash hands, ___, dry hands.", "rub in soap", ["put on a coat", "turn the page", "open the door"]],
        ["Open the app", "type a message", "Which step is missing? Open the app, type a message, ___.", "press send", ["close the box", "plug in the cable", "put on socks"]],
        ["Fill the kettle", "pour the water", "Which step is missing? Fill the kettle, ___, pour the water.", "boil the water", ["paint the wall", "feed the cat", "ride a bike"]],
        ["Put on your shoes", "go outside", "Which step is missing? Put on your shoes, tie the laces, ___.", "go outside", ["go to bed", "take your shoes off", "wash the car"]],
      ].map(([, , prompt, answer, wrong]) => ch(prompt, answer, wrong)),
    ],
    3: [
      ...TASKS.map(([prompt, labels]) => od(prompt, labels)),
      ...SAYINGS.map((words) => () => od(`Put the lines in order so the program says: ${words.join(" ")}`, words.map((w) => `say "${w}"`))),
    ],
    4: [
      ...times(6, () => (rng) => {
        const commands = randomProgram(rng, 5);
        return ty(`${robotStart} Which way does the robot face at the end? Type north, east, south or west.`, DIRECTIONS[robot(commands).heading], { ...showing(ROBOT_TITLE, commands.map(text)) });
      }),
      ...times(6, () => (rng) => {
        const commands = [`F${int(rng, 1, 4)}`, "R", `F${int(rng, 1, 4)}`, "L", `F${int(rng, 1, 4)}`];
        const total = commands.filter((c) => c[0] === "F").reduce((sum, c) => sum + Number(c.slice(1)), 0);
        return nm(`How many squares does the robot move forward altogether?`, total, showing(ROBOT_TITLE, commands.map(text)));
      }),
      ...times(6, () => (rng) => {
        const a = int(rng, 2, 5);
        const commands = [`F${a}`, "R", `F${int(rng, 1, 4)}`, "L", `F${int(rng, 1, 4)}`];
        const end = robot(commands);
        return nm(`${robotStart} What is the y number of the square where it ends? (y is how far north.)`, end.y, showing(ROBOT_TITLE, commands.map(text)));
      }),
    ],
  },
};

/* ====================================================================
   Repeat loops
   ==================================================================== */
const WORDS = ["Hip", "Hooray", "Clap", "Jump", "Spin", "Beep", "Go", "Ping"];
const PAIRS = [["clap", "jump"], ["beep", "boop"], ["tick", "tock"], ["ping", "pong"], ["hop", "skip"], ["la", "di"]];

export const loops = {
  rule: "A loop repeats instructions. 'repeat 3 times' runs the lines inside it three times, so you do not have to write them out again and again.",
  hint: "Run the lines inside the loop once, then count how many times it repeats.",
  levels: {
    1: [
      ...times(8, () => (rng) => {
        const n = int(rng, 2, 7); const w = pick(rng, WORDS);
        return numberChoice(rng, `How many times does this program say ${w}?`, n, "Program", [`repeat ${n} times`, `  say "${w}"`], 1);
      }),
      ...times(8, () => (rng) => {
        const n = int(rng, 2, 6); const w = pick(rng, WORDS);
        const wrong = [n + 1, n - 1, n + 2].filter((k) => k >= 1);
        const again = (k) => (k === 1 ? "repeat 1 time" : `repeat ${k} times`);
        return ch(`Which program says ${w} ${n} times?`, `${again(n)}: say ${w}`, wrong.map((k) => `${again(k)}: say ${w}`));
      }),
      ch("Why do programmers use a loop?", "To repeat instructions without writing them again", ["To make the screen brighter", "To stop the program", "To save the file"]),
      ch("What does 'repeat 5 times' do?", "Runs the lines inside it five times", ["Runs them once", "Runs them five hundred times", "Skips the lines"]),
      ch("Which program uses a loop?", "repeat 3 times: say Hi", ["say Hi, say Hi, say Hi", "say Hi", "say Hi, say Bye"]),
    ],
    2: [
      ...times(8, () => (rng) => {
        const [a, b] = pick(rng, PAIRS); const n = int(rng, 2, 4);
        const answer = Array.from({ length: n }, () => `${a} ${b}`).join(" ");
        return ch("What does this program say?", answer,
          [`${Array(n).fill(a).join(" ")} ${Array(n).fill(b).join(" ")}`, Array.from({ length: n + 1 }, () => `${a} ${b}`).join(" "), Array.from({ length: n - 1 || 1 }, () => `${a} ${b}`).join(" ")].filter((x, i, all) => x !== answer && all.indexOf(x) === i),
          showing("Program", [`repeat ${n} times`, `  say "${a}"`, `  say "${b}"`]));
      }),
      ...times(8, () => (rng) => {
        const start = int(rng, 0, 5); const r = int(rng, 2, 5); const k = int(rng, 2, 4);
        return numberChoice(rng, "What number is said at the end?", start + r * k, "Program", [`set score to ${start}`, `repeat ${r} times`, `  add ${k} to score`, "say score"]);
      }),
      ...times(6, () => (rng) => {
        const r = int(rng, 2, 5);
        return numberChoice(rng, "How many times is 'clap' said in total?", r * 2, "Program", [`repeat ${r} times`, '  say "clap"', '  say "clap"'], 1);
      }),
    ],
    3: [
      ...times(8, () => (rng) => {
        const [a, b] = pick(rng, PAIRS); const n = int(rng, 2, 3);
        return bd("What does this program say? Build the words in order.", Array.from({ length: n }, () => `${a} ${b}`).join(" "), showing("Program", [`repeat ${n} times`, `  say "${a}"`, `  say "${b}"`]));
      }),
      ...times(4, () => (rng) => {
        const counts = shuffle(rng, [2, 3, 4, 5, 6, 7, 8]).slice(0, 4).sort((x, y) => x - y);
        return od("Put the programs in order, from the one that says Hi the fewest times to the most.", counts.map((c) => `repeat ${c} times: say Hi`));
      }),
      st("Does the program say Hi fewer than 5 times?", ["Fewer than 5 times", "5 times or more"], [2, 3, 4, 5, 6, 7, 8].map((n) => [`repeat ${n} times: say Hi`, n < 5 ? 0 : 1])),
      st("Which programs say Go an even number of times?", ["Even number", "Odd number"], [2, 3, 4, 5, 6, 7, 8, 9].map((n) => [`repeat ${n} times: say Go`, n % 2 === 0 ? 0 : 1])),
    ],
    4: [
      ...times(3, () => (rng) => { const k = int(rng, 2, 5); const r = int(rng, 3, 6); return nm("How many squares does the robot move forward altogether?", k * r, showing("Program", [`repeat ${r} times`, `  forward ${k}`])); }),
      ...times(3, () => (rng) => { const s = int(rng, 2, 6); return nm("The robot draws a square. How many squares does it move forward altogether?", 4 * s, showing("Program", ["repeat 4 times", `  forward ${s}`, "  turn right"])); }),
      ...times(3, () => (rng) => { const k = int(rng, 2, 5); const r = int(rng, 3, 8); return nm(`The robot must move forward ${k * r} squares. How many times must it repeat?`, r, showing("Program", ["repeat ? times", `  forward ${k}`])); }),
      ...times(3, () => (rng) => { const a = int(rng, 2, 4); const b = int(rng, 2, 4); return nm("How many times is 'beep' said in total?", a * b, showing("Program", [`repeat ${a} times`, `  repeat ${b} times`, '    say "beep"'])); }),
      ...times(3, () => (rng) => { const s = int(rng, 10, 30); const r = int(rng, 2, 5); const a = int(rng, 3, 6); const b = int(rng, 1, 2); return nm("What does the program say at the end?", s + r * a - r * b, showing("Program", [`set points to ${s}`, `repeat ${r} times`, `  add ${a} to points`, `  subtract ${b} from points`, "say points"])); }),
    ],
  },
};

/* ====================================================================
   If and else
   ==================================================================== */
const RULES = [
  { name: "temperature", op: ">", yes: "T-shirt", no: "Coat", range: [5, 35], limit: [12, 25] },
  { name: "score", op: ">", yes: "Pass", no: "Try again", range: [10, 90], limit: [30, 70] },
  { name: "age", op: "<", yes: "Child ticket", no: "Adult ticket", range: [5, 16], limit: [9, 13] },
  { name: "coins", op: "=", yes: "Buy it", no: "Save up", range: [1, 9], limit: [3, 7] },
];
const holds = (op, value, limit) => (op === ">" ? value > limit : op === "<" ? value < limit : value === limit);
function ruleCase(rng) {
  const rule = pick(rng, RULES);
  const limit = int(rng, ...rule.limit);
  const value = rule.op === "=" && rng() < 0.5 ? limit : int(rng, ...rule.range);
  return { rule, limit, value, says: holds(rule.op, value, limit) ? rule.yes : rule.no };
}
const ifLines = ({ rule, limit, value }) => [`set ${rule.name} to ${value}`, `if ${rule.name} ${rule.op} ${limit}`, `  say "${rule.yes}"`, "else", `  say "${rule.no}"`];
const grade = (score) => (score >= 90 ? "Gold" : score >= 50 ? "Silver" : "Bronze");
const gradeLines = (score) => [`set score to ${score}`, "if score >= 90", '  say "Gold"', "else if score >= 50", '  say "Silver"', "else", '  say "Bronze"'];

export const decisions = {
  rule: "'if' asks a question. If the answer is yes, the lines under it run. If it is no, the computer skips them and runs the lines under 'else' instead. Only one of the two ever runs.",
  hint: "Work out whether the question after 'if' is true or false for this number, then pick the branch.",
  levels: {
    1: [
      ...times(12, () => (rng) => { const c = ruleCase(rng); return ch("What does this program say?", c.says, [c.says === c.rule.yes ? c.rule.no : c.rule.yes, "Nothing", "Both messages"], showing("Program", ifLines(c))); }),
      ch("When does the 'else' part of a program run?", "When the 'if' question is false", ["When the 'if' question is true", "Every time", "Never"]),
      ch("How many of the two choices does an if-else program run each time?", "One", ["Both", "None", "Three"]),
      ch("What does 'if' do in a program?", "It makes a choice using a question", ["It repeats lines", "It stores a number", "It ends the program"]),
    ],
    2: [
      ...times(10, () => (rng) => { const score = int(rng, 10, 100); return ch("What does this program say?", grade(score), ["Gold", "Silver", "Bronze"].filter((g) => g !== grade(score)), showing("Program", gradeLines(score))); }),
      ...times(8, () => (rng) => {
        const age = int(rng, 4, 14); const money = int(rng, 1, 8);
        const says = age >= 8 && money >= 5 ? "Come in" : "Not today";
        return ch("What does this program say?", says, [says === "Come in" ? "Not today" : "Come in", "Nothing", "Both messages"],
          showing("Program", [`set age to ${age}`, `set money to ${money}`, "if age >= 8 and money >= 5", '  say "Come in"', "else", '  say "Not today"']));
      }),
    ],
    3: [
      ...RULES.map((rule) => (rng) => {
        const limit = int(rng, ...rule.limit);
        const values = shuffle(rng, Array.from({ length: rule.range[1] - rule.range[0] + 1 }, (_, i) => rule.range[0] + i)).slice(0, 8);
        const pass = values.filter((v) => holds(rule.op, v, limit));
        if (pass.length < 1 || pass.length === values.length) return null;
        return st(`The program says "${rule.yes}" if ${rule.name} ${rule.op} ${limit}, and "${rule.no}" if not. What does it say for each number?`, [`Says "${rule.yes}"`, `Says "${rule.no}"`], values.map((v) => [String(v), holds(rule.op, v, limit) ? 0 : 1]));
      }),
      od("Put the lines in order to make a working decision program.", ["set age to 9", "if age < 10", '  say "Child ticket"', "else", '  say "Adult ticket"']),
      od("Put the lines in order to make a working decision program.", ["set score to 60", "if score > 50", '  say "Pass"', "else", '  say "Try again"']),
      od("Put the lines in order to make a working decision program.", ["set temperature to 30", "if temperature > 20", '  say "T-shirt"', "else", '  say "Coat"']),
      od("Put the lines in order to make a working decision program.", ["set coins to 5", "if coins = 5", '  say "Buy it"', "else", '  say "Save up"']),
      ...times(8, () => (rng) => {
        const rule = pick(rng, RULES.filter((r) => r.op !== "="));
        const limit = int(rng, ...rule.limit);
        const [lo, hi] = rule.range;
        const yes = rule.op === ">" ? int(rng, limit + 1, hi) : int(rng, lo, limit - 1);
        const noPool = Array.from({ length: hi - lo + 1 }, (_, i) => lo + i).filter((v) => !holds(rule.op, v, limit));
        const no = shuffle(rng, noPool).slice(0, 3);
        return ch(`Which number makes the program say "${rule.yes}"? It says "${rule.yes}" if ${rule.name} ${rule.op} ${limit}.`, String(yes), no.map(String));
      }),
    ],
    4: [
      ...times(4, () => (rng) => { const k = int(rng, 4, 8); const list = Array.from({ length: 5 }, () => int(rng, 1, 12)); return nm(`How many numbers in the list are bigger than ${k}?`, list.filter((n) => n > k).length, showing("Program", [`set list to [${list.join(", ")}]`, "set count to 0", "for each number in list", `  if number > ${k}`, "    add 1 to count", "say count"])); }),
      ...times(4, () => (rng) => { const list = Array.from({ length: 5 }, () => int(rng, 1, 12)); return nm("What does the program say at the end?", list.filter((n) => n % 2 === 0).reduce((s, n) => s + n, 0), showing("Program", [`set list to [${list.join(", ")}]`, "set total to 0", "for each number in list", "  if number is even", "    add number to total", "say total"])); }),
      ...times(4, () => (rng) => { const lim = int(rng, 5, 9); const step = int(rng, 2, 3); let x = 0; for (let i = 0; i < 6; i += 1) if (x < lim) x += step; return nm("What does the program say at the end?", x, showing("Program", ["set x to 0", "repeat 6 times", `  if x < ${lim}`, `    add ${step} to x`, "say x"])); }),
      ...times(4, () => (rng) => { const a = int(rng, 20, 90); const b = int(rng, 20, 90); const both = a >= 50 && b >= 50 ? 2 : a >= 50 || b >= 50 ? 1 : 0; return nm("What does the program say at the end?", both, showing("Program", [`set a to ${a}`, `set b to ${b}`, "set passes to 0", "if a >= 50", "  add 1 to passes", "if b >= 50", "  add 1 to passes", "say passes"])); }),
    ],
  },
};

/* ====================================================================
   Variables
   ==================================================================== */
const NAMES = ["score", "lives", "coins", "points", "stars"];
export const variables = {
  rule: "A variable is a named box that holds a value. 'set score to 5' puts 5 in the box. 'add 2 to score' changes what is in the box to 7. The box keeps only its newest value.",
  hint: "Keep track of the value after every line, like writing it on paper.",
  levels: {
    1: [
      ...times(6, () => (rng) => { const n = pick(rng, NAMES); const a = int(rng, 1, 9); const b = int(rng, 1, 9); return numberChoice(rng, `What does the program say?`, a + b, "Program", [`set ${n} to ${a}`, `add ${b} to ${n}`, `say ${n}`], 0); }),
      ...times(6, () => (rng) => { const n = pick(rng, NAMES); const a = int(rng, 1, 9); const b = int(rng, 10, 19); return numberChoice(rng, "What does the program say?", b, "Program", [`set ${n} to ${a}`, `set ${n} to ${b}`, `say ${n}`], 0); }),
      ...times(6, () => (rng) => { const a = int(rng, 2, 9); const b = int(rng, 2, 9); return numberChoice(rng, "What does the program say?", a + b, "Program", [`set a to ${a}`, `set b to ${b}`, "set total to a + b", "say total"], 0); }),
    ],
    2: [
      ...times(6, () => (rng) => { const a = int(rng, 1, 9); const b = int(rng, 10, 19); return numberChoice(rng, "What does the program say?", b, "Program", ["set x to " + a, "set y to " + b, "set temp to x", "set x to y", "set y to temp", "say x"]); }),
      ...times(6, () => (rng) => { const start = int(rng, 0, 5); const k = int(rng, 2, 6); const lv = int(rng, 3, 5); return numberChoice(rng, `A game adds ${k} points for each level. What is the score after level ${lv}?`, start + k * lv, "Program", [`set score to ${start}`, `repeat ${lv} times`, `  add ${k} to score`, "say score"]); }),
      ...times(6, () => (rng) => { const l = int(rng, 7, 12); const lost = int(rng, 1, 3); return numberChoice(rng, "What does the program say?", l - lost * 2, "Program", [`set lives to ${l}`, `subtract ${lost} from lives`, `subtract ${lost} from lives`, "say lives"]); }),
    ],
    3: [
      st("Is it the name of a variable, or a value it holds?", ["A variable name", "A value"], [["score", 0], ["lives", 0], ["coins", 0], ["points", 0], ["playerName", 0], ["level", 0], ["7", 1], ["25", 1], ['"Max"', 1], ["100", 1], ["true", 1], ["3.5", 1]]),
      ...times(6, () => (rng) => {
        const start = int(rng, 2, 5); const add = int(rng, 2, 4); const mul = int(rng, 2, 4);
        const target = (start + add) * mul;
        return od(`Put the lines in order so the program says ${target}.`, [`set x to ${start}`, `add ${add} to x`, `multiply x by ${mul}`, "say x"]);
      }),
      ...times(6, () => (rng) => {
        const k = int(rng, 2, 4); const s = int(rng, 1, 3);
        const answer = [1, 2, 3].map((i) => s + k * i).join(" ");
        return bd("What does the program say? Build the numbers in order.", answer, showing("Program", [`set x to ${s}`, "repeat 3 times", `  add ${k} to x`, "  say x"]));
      }),
    ],
    4: [
      ...times(3, () => (rng) => { const a = int(rng, 2, 9); const b = int(rng, 2, 9); const c = int(rng, 2, 5); return nm("What does the program say?", (a + b) * c, showing("Program", [`set a to ${a}`, `set b to ${b}`, "set total to a + b", `multiply total by ${c}`, "say total"])); }),
      ...times(3, () => (rng) => { const s = int(rng, 35, 60); const l = int(rng, 3, 6); const k = int(rng, 2, 5); return nm("What does the program say?", s - l * k, showing("Program", [`set money to ${s}`, `repeat ${l} times`, `  subtract ${k} from money`, "say money"])); }),
      ...times(3, () => (rng) => { const a = int(rng, 2, 6); const b = int(rng, 2, 6); return nm("What does the program say?", a * b + a, showing("Program", [`set width to ${a}`, `set height to ${b}`, "set area to width * height", "add width to area", "say area"])); }),
      ...times(3, () => (rng) => { const a = int(rng, 10, 30); const b = int(rng, 1, 9); return nm("What does the program say?", a - b, showing("Program", [`set x to ${a}`, `set y to ${b}`, "set x to x - y", "say x"])); }),
      ...times(3, () => (rng) => { const a = int(rng, 1, 5); const r = int(rng, 3, 5); let x = a; for (let i = 0; i < r; i += 1) x *= 2; return nm("What does the program say?", x, showing("Program", [`set x to ${a}`, `repeat ${r} times`, "  multiply x by 2", "say x"])); }),
    ],
  },
};

/* ====================================================================
   Inputs and outputs
   ==================================================================== */
const INPUTS = ["keyboard", "mouse", "microphone", "camera", "joystick", "scanner", "light sensor", "temperature sensor", "touch sensor"];
const OUTPUTS = ["monitor", "speaker", "printer", "headphones", "projector", "buzzer", "LED light", "motor", "vibrating motor"];
const IO_INPUT_ACTIONS = ["Pressing a key", "Speaking to a voice assistant", "Tapping the screen", "Moving the mouse", "Taking a photo", "Pushing a joystick"];
const IO_OUTPUT_ACTIONS = ["Showing a picture on the screen", "Playing a sound", "Printing a page", "Lighting an LED", "Making a motor turn", "Buzzing an alarm"];
const FLOW = [
  ["Order how a calculator program works.", ["Input: you type 6 and 7", "Process: the program multiplies them", "Output: the screen shows 42"]],
  ["Order how a game responds to a key press.", ["Input: you press the space bar", "Process: the program makes the character jump", "Output: the character jumps on the screen"]],
  ["Order how a night light works.", ["Input: the light sensor notices it is dark", "Process: the program decides to turn on the light", "Output: the lamp switches on"]],
  ["Order how a voice assistant works.", ["Input: you ask a question out loud", "Process: the program works out an answer", "Output: the speaker says the answer"]],
  ["Order how a robot stops at a wall.", ["Input: the touch sensor is pressed", "Process: the program decides to stop", "Output: the motors switch off"]],
  ["Order how a paint program draws a line.", ["Input: you drag the mouse", "Process: the program works out the pixels", "Output: a line appears on the screen"]],
  ["Order how a smart doorbell works.", ["Input: a person presses the button", "Process: the program sends a message", "Output: the phone plays a chime"]],
];

export const inputsAndOutputs = {
  rule: "Input is information that goes into a computer, such as a key press or a sound. Output is information that comes out, such as a picture, a sound or a movement. A program takes in input, processes it, and gives output.",
  hint: "Ask: is this sending information into the computer, or out of it?",
  levels: {
    1: [...INPUTS.map((d) => ch(`Is a **${d}** an input device or an output device?`, "Input device", ["Output device"])), ...OUTPUTS.map((d) => ch(`Is a **${d}** an input device or an output device?`, "Output device", ["Input device"]))],
    2: [
      ...INPUTS.map((d) => (rng) => ch("Which of these is an **input** device?", d, some(rng, OUTPUTS, 3))),
      ...OUTPUTS.map((d) => (rng) => ch("Which of these is an **output** device?", d, some(rng, INPUTS, 3))),
    ],
    3: [
      st("Sort the devices.", ["Input", "Output"], [...INPUTS.map((d) => [d, 0]), ...OUTPUTS.map((d) => [d, 1])]),
      st("Is it an input or an output?", ["Input: something goes in", "Output: something comes out"], [...IO_INPUT_ACTIONS.map((d) => [d, 0]), ...IO_OUTPUT_ACTIONS.map((d) => [d, 1])]),
      st("Sort the actions.", ["Input", "Output"], [...IO_INPUT_ACTIONS.slice(0, 4).map((d) => [d, 0]), ...IO_OUTPUT_ACTIONS.slice(0, 4).map((d) => [d, 1])]),
      ...FLOW.map(([prompt, labels]) => od(prompt, labels)),
      bd("Put the tiles in order to make a true sentence about input and output.", "A keyboard sends input to the computer."),
      bd("Put the tiles in order to make a true sentence about input and output.", "A screen shows output from the computer."),
    ],
    4: [
      ...times(3, () => (rng) => { const n = int(rng, 2, 9); const k = int(rng, 2, 5); return nm(`The user types ${n}. What does the program say?`, n * k, showing("Program", ['ask "Type a number"', "set n to answer", `say n * ${k}`])); }),
      ...times(3, () => (rng) => { const n = int(rng, 5, 20); const k = int(rng, 2, 4); return nm(`The user types ${n}. What does the program say?`, n + k + 1, showing("Program", ['ask "Type a number"', "set n to answer", `add ${k} to n`, "add 1 to n", "say n"])); }),
      ...times(3, () => (rng) => { const a = int(rng, 2, 9); const b = int(rng, 2, 9); return nm(`The user types ${a} then ${b}. What does the program say?`, a * b, showing("Program", ['ask "First number"', "set a to answer", 'ask "Second number"', "set b to answer", "say a * b"])); }),
      ...times(3, () => (rng) => { const age = int(rng, 6, 12); const says = age >= 9 ? "Older" : "Younger"; return ch(`The user types ${age}. What does the program say?`, says, [says === "Older" ? "Younger" : "Older", "Nothing", "An error"], showing("Program", ['ask "How old are you?"', "set age to answer", "if age >= 9", '  say "Older"', "else", '  say "Younger"'])); }),
      ch("A robot must stop when it bumps into a wall. Which input does it need?", "A touch sensor", ["A speaker", "A printer", "A projector"]),
      ch("A lamp must switch on when a room gets dark. Which input does it need?", "A light sensor", ["A keyboard", "A speaker", "A printer"]),
      ch("A weather display must show the temperature. Which input does it need?", "A temperature sensor", ["A joystick", "A scanner", "A buzzer"]),
      ch("A game should play a sound when you win. Which output is that?", "A speaker", ["A microphone", "A mouse", "A camera"]),
    ],
  },
};

/* ====================================================================
   Finding and fixing bugs
   ==================================================================== */
// [goal, lines, index of the buggy line, the fixed line, three wrong fixes]
const BUGS = [
  ["Say Hello three times", ["repeat 2 times", '  say "Hello"'], 0, "repeat 3 times", ["repeat 4 times", "repeat 1 time", "repeat 2 times"]],
  ["Move forward 3, turn right, then move forward 2", ["forward 3", "turn left", "forward 2"], 1, "turn right", ["turn around", "forward 1", "turn left twice"]],
  ["Add the two scores", ["set a to 4", "set b to 6", "set total to a - b", "say total"], 2, "set total to a + b", ["set total to a * b", "set total to b - a", "set total to a"]],
  ["Say Big when the number is more than 10", ["set n to 15", "if n < 10", '  say "Big"'], 1, "if n > 10", ["if n = 10", "if n < 15", "if n > 15"]],
  ["Say 1 2 3 4 5", ["set n to 1", "repeat 5 times", "  say n", "  add 2 to n"], 3, "  add 1 to n", ["  add 5 to n", "  subtract 1 from n", "  say 1"]],
  ["Draw a square", ["repeat 3 times", "  forward 4", "  turn right"], 0, "repeat 4 times", ["repeat 2 times", "repeat 5 times", "repeat 8 times"]],
  ["Say Pass if the score is 50 or more", ["set score to 72", "if score < 50", '  say "Pass"', "else", '  say "Try again"'], 1, "if score >= 50", ["if score > 50", "if score = 50", "if score < 100"]],
  ["Start with 10 lives and lose one", ["set lives to 10", "add 1 to lives", "say lives"], 1, "subtract 1 from lives", ["add 2 to lives", "set lives to 11", "say lives twice"]],
  ["Greet the user by name", ['ask "What is your name?"', 'say "Hello name"'], 1, 'say join("Hello ", answer)', ['say "Hello answer"', "say answer", 'ask "Hello"']],
  ["Get ready for bed", ["put on pyjamas", "brush teeth", "get out of bed", "read a story"], 2, 'delete the line "get out of bed"', ['move "get out of bed" to the end', 'repeat "get out of bed" twice', 'add "wake up" at the start']],
  ["Say the number doubled", ["set n to 6", "set double to n + 2", "say double"], 1, "set double to n * 2", ["set double to n - 2", "set double to n / 2", "set double to n * 3"]],
  ["Turn the light on when it is dark", ["set dark to true", "if dark = false", "  turn light on"], 1, "if dark = true", ["if dark = 0", "if dark = light", "if light = true"]],
  ["Say Yes if the number is even", ["set n to 8", "if n is odd", '  say "Yes"'], 1, "if n is even", ["if n is big", "if n = 2", "if n is small"]],
  ["Count down 3 2 1", ["set n to 3", "repeat 3 times", "  say n", "  add 1 to n"], 3, "  subtract 1 from n", ["  add 3 to n", "  say 1", "  set n to 3"]],
  ["Turn the robot to face east, then move 3", ["turn left", "forward 3"], 0, "turn right", ["turn around", "forward 3", "turn left twice"]],
  ["Find the cost of 3 apples at 2p each", ["set price to 2", "set apples to 3", "set cost to price + apples", "say cost"], 2, "set cost to price * apples", ["set cost to price - apples", "set cost to apples", "set cost to price + price"]],
  ["Find the average of 4 and 8", ["set total to 4 + 8", "set average to total * 2", "say average"], 1, "set average to total / 2", ["set average to total - 2", "set average to total + 2", "set average to total * 3"]],
];
const GOODS = [
  ["Say Go three times", "repeat 3 times: say Go", ["repeat 2 times: say Go", "say Go repeat 3", "repeat 3: say Go times"]],
  ["Move forward 6 squares", "repeat 3 times: forward 2", ["repeat 3 times: forward 3", "repeat 2 times: forward 2", "forward 2"]],
  ["Finish with x equal to 9", "set x to 4, then add 5 to x", ["set x to 4, then add 4 to x", "set x to 5, then add 5 to x", "set x to 9, then add 5 to x"]],
];
const clean = (line) => line.trim();

export const bugs = {
  rule: "A bug is a mistake in a program. Debugging means testing the program, finding the line that goes wrong, and fixing it. Read each line and check what it really does, not what you meant it to do.",
  hint: "Compare what each line does with the goal. Find the first line that does something different.",
  levels: {
    1: BUGS.map(([goal, lines, bug]) => () => ch(`The goal is: ${goal}. Which line has the bug?`, clean(lines[bug]), lines.filter((_, i) => i !== bug).map(clean), showing("Program with a bug", lines))),
    2: BUGS.map(([goal, lines, bug, fix, wrong]) => () => ch(`The goal is: ${goal}. How do you fix the bug in "${clean(lines[bug])}"?`, clean(fix), wrong.map(clean), showing("Program with a bug", lines))),
    3: [
      ...BUGS.map(([goal, lines, bug]) => st(`The goal is: ${goal}. Which line works, and which line has the bug?`, ["Works", "The bug"], lines.map((line, i) => [clean(line), i === bug ? 1 : 0]), showing("Program with a bug", lines))),
      ...GOODS.map(([goal, answer, wrong]) => () => ch(`Which program does this? ${goal}.`, answer, wrong)),
    ],
    4: [
      ...times(8, () => (rng) => { const k = int(rng, 2, 6); const r = int(rng, 3, 6); return nm(`The program should say ${k * r} but it says ${k * (r - 1)}. How many times should it repeat?`, r, showing("Program with a bug", ["set total to 0", `repeat ${r - 1} times`, `  add ${k} to total`, "say total"])); }),
      ...times(8, () => (rng) => { const a = int(rng, 3, 9); const b = int(rng, 3, 9); const c = int(rng, 3, 9); return nm("This program should say the total of all three numbers, but it has a bug. What does it really say?", a + b, showing("Program with a bug", [`set a to ${a}`, `set b to ${b}`, `set c to ${c}`, "set total to a + b", "say total"])); }),
    ],
  },
};
