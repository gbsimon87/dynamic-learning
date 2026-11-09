import { ch, bd, od, st, nm } from "../topicBank.js";
import { int, pick, times, showing, numberChoice } from "../year5Computing/shared.js";

// Year 6 Programming Projects. Builds on Year 5 Programming Basics: programs are longer and
// combine loops, decisions, changing variables and named procedures. Every answer is worked out
// here from the same numbers the program shows, never typed by hand.

/* ====================================================================
   Combining loops and decisions
   ==================================================================== */
const evenOddLines = (r) => ["set n to 1", `repeat ${r} times`, "  if n is even", '    say "Even"', "  else", '    say "Odd"', "  add 1 to n"];
const countAbove = (list, k) => list.filter((n) => n > k).length;
const listLines = (list, k, word) => [`set list to [${list.join(", ")}]`, "for each number in list", `  if number > ${k}`, `    say "${word}"`];
const multiplesUpTo = (n, k) => Math.floor(n / k);

export const loopsAndDecisions = {
  rule: "A decision can sit inside a loop. Every time the loop goes round, the program asks the 'if' question again, so the answer can be different each time.",
  hint: "Go round the loop one time at a time. Each time, check the 'if' question for the value right now.",
  levels: {
    1: [
      ...times(6, () => (rng) => { const r = int(rng, 3, 9); return numberChoice(rng, 'How many times does this program say "Even"?', Math.floor(r / 2), "Program", evenOddLines(r)); }),
      ...times(6, () => (rng) => {
        const list = Array.from({ length: 5 }, () => int(rng, 1, 12)); const k = int(rng, 4, 8);
        return numberChoice(rng, 'How many times does this program say "Big"?', countAbove(list, k), "Program", listLines(list, k, "Big"));
      }),
      ch("A loop repeats 5 times and has an 'if' inside it. How many times is the 'if' question asked?", "5 times", ["Once", "10 times", "It depends on the answer"]),
      ch("Why put an 'if' inside a loop?", "To make a new choice each time the loop goes round", ["To stop the loop running", "To make the loop run faster", "To store a number"]),
      ch("In a loop with an 'if' and an 'else' inside, what happens each time round?", "Exactly one of the two branches runs", ["Both branches run", "Neither branch runs", "The loop stops"]),
    ],
    2: [
      ...times(6, () => (rng) => {
        const list = Array.from({ length: 5 }, () => int(rng, 1, 12)); const k = int(rng, 4, 8);
        const said = list.map((n) => (n > k ? "Big" : "Small")).join(" ");
        const flip = list.map((n) => (n > k ? "Small" : "Big")).join(" ");
        const allBig = list.map(() => "Big").join(" "); const allSmall = list.map(() => "Small").join(" ");
        const wrong = [...new Set([flip, allBig, allSmall])].filter((w) => w !== said);
        if (wrong.length < 2) return null;
        return ch("What does this program say, in order?", said, wrong, showing("Program", [`set list to [${list.join(", ")}]`, "for each number in list", `  if number > ${k}`, '    say "Big"', "  else", '    say "Small"']));
      }),
      ...times(6, () => (rng) => {
        const r = int(rng, 6, 15); const k = pick(rng, [2, 3, 4, 5]);
        return numberChoice(rng, `How many times does this program say "Clap"?`, multiplesUpTo(r, k), "Program", ["set n to 1", `repeat ${r} times`, `  if n is a multiple of ${k}`, '    say "Clap"', "  add 1 to n"]);
      }),
      ...times(6, () => (rng) => {
        const lim = int(rng, 5, 12); const step = int(rng, 2, 4); const r = int(rng, 4, 7);
        let x = 0; for (let i = 0; i < r; i += 1) if (x < lim) x += step;
        return numberChoice(rng, "What does the program say at the end?", x, "Program", ["set x to 0", `repeat ${r} times`, `  if x < ${lim}`, `    add ${step} to x`, "say x"]);
      }),
    ],
    3: [
      od("Put the lines in order. The program says Even or Odd for the numbers 1 to 4.", ["set n to 1", "repeat 4 times", "  if n is even", '    say "Even"', "  else", '    say "Odd"', "  add 1 to n"]),
      od("Put the lines in order. The program counts the numbers in the list that are bigger than 5.", ["set count to 0", "for each number in list", "  if number > 5", "    add 1 to count", "say count"]),
      od("Put the lines in order. The robot moves forward 4 times and beeps when it reaches a wall.", ["repeat 4 times", "  forward 1", "  if touching wall", '    say "Beep"']),
      ...times(4, () => (rng) => {
        const k = pick(rng, [3, 4, 5]); const values = Array.from({ length: 8 }, (_, i) => i + int(rng, 1, 6));
        const unique = [...new Set(values)];
        if (!unique.some((v) => v % k === 0) || unique.every((v) => v % k === 0)) return null;
        return st(`Inside the loop: if n is a multiple of ${k}, say "Fizz", else say n. What does it say for each value of n?`, ['Says "Fizz"', "Says the number"], unique.map((v) => [String(v), v % k === 0 ? 0 : 1]));
      }),
      ...times(4, () => (rng) => {
        const r = int(rng, 3, 5);
        const answer = Array.from({ length: r }, (_, i) => ((i + 1) % 2 === 0 ? "Even" : "Odd")).join(" ");
        return bd("What does this program say? Build the words in order.", answer, showing("Program", evenOddLines(r)));
      }),
    ],
    4: [
      ...times(4, () => (rng) => { const list = Array.from({ length: 6 }, () => int(rng, 1, 15)); const k = int(rng, 5, 9); return nm("What does the program say at the end?", countAbove(list, k), showing("Program", ["set count to 0", `set list to [${list.join(", ")}]`, "for each number in list", `  if number > ${k}`, "    add 1 to count", "say count"])); }),
      ...times(4, () => (rng) => { const list = Array.from({ length: 6 }, () => int(rng, 1, 15)); return nm("What does the program say at the end?", list.filter((n) => n % 2 === 1).reduce((s, n) => s + n, 0), showing("Program", ["set total to 0", `set list to [${list.join(", ")}]`, "for each number in list", "  if number is odd", "    add number to total", "say total"])); }),
      ...times(4, () => (rng) => { const r = int(rng, 10, 30); const k = pick(rng, [3, 4, 5, 6]); return nm(`The loop counts n from 1 to ${r}. How many times does it say "Clap"?`, multiplesUpTo(r, k), showing("Program", ["set n to 1", `repeat ${r} times`, `  if n is a multiple of ${k}`, '    say "Clap"', "  add 1 to n"])); }),
      ...times(4, () => (rng) => {
        const r = int(rng, 4, 8); const up = int(rng, 2, 5); const down = int(rng, 1, 3);
        let score = 0; for (let n = 1; n <= r; n += 1) score += n % 2 === 0 ? up : -down;
        if (score < 0) return null;
        return nm("What does the program say at the end?", score, showing("Program", ["set score to 0", "set n to 1", `repeat ${r} times`, "  if n is even", `    add ${up} to score`, "  else", `    subtract ${down} from score`, "  add 1 to n", "say score"]));
      }),
    ],
  },
};

/* ====================================================================
   Variables that change
   ==================================================================== */
export const changingVariables = {
  rule: "A variable can change every time a loop goes round. A counter goes up by 1 each time. A total adds a new amount each time. Keep track of the value after each pass, like filling in a table.",
  hint: "Write down the value after each time round the loop. The last value is the answer.",
  levels: {
    1: [
      ...times(6, () => (rng) => { const s = int(rng, 0, 5); const r = int(rng, 3, 7); return numberChoice(rng, "What does the program say at the end?", s + r, "Program", [`set counter to ${s}`, `repeat ${r} times`, "  add 1 to counter", "say counter"]); }),
      ...times(6, () => (rng) => { const s = int(rng, 20, 40); const r = int(rng, 3, 6); const k = int(rng, 2, 4); return numberChoice(rng, "What does the program say at the end?", s - r * k, "Program", [`set fuel to ${s}`, `repeat ${r} times`, `  subtract ${k} from fuel`, "say fuel"]); }),
      ch("What is a **counter** in a program?", "A variable that goes up by 1 each time something happens", ["A line that is never run", "A loop that never ends", "A message shown on the screen"]),
      ch("What is a **running total**?", "A variable that adds each new amount to what it already holds", ["A variable that is set once and never changes", "The number of lines in a program", "A loop that runs backwards"]),
      ch("Why is it useful to write a table of values while you trace a loop?", "So you can see the variable's value after each time round", ["So the program runs faster", "So the loop stops early", "So you do not need to read the program"]),
    ],
    2: [
      ...times(6, () => (rng) => { const s = int(rng, 1, 5); const k = int(rng, 2, 5); const after = int(rng, 2, 3); return numberChoice(rng, `What is x after the loop has gone round ${after} times?`, s + k * after, "Program", [`set x to ${s}`, "repeat 5 times", `  add ${k} to x`]); }),
      ...times(6, () => (rng) => {
        const r = int(rng, 3, 5); const k = int(rng, 2, 4); const lives = int(rng, 5, 9);
        return numberChoice(rng, "What is score + lives at the end?", r * k + (lives - r), "Program", ["set score to 0", `set lives to ${lives}`, `repeat ${r} times`, `  add ${k} to score`, "  subtract 1 from lives"]);
      }),
      ...times(6, () => (rng) => { const n = int(rng, 3, 6); return numberChoice(rng, "What does the program say at the end?", (n * (n + 1)) / 2, "Program", ["set total to 0", "set n to 1", `repeat ${n} times`, "  add n to total", "  add 1 to n", "say total"]); }),
    ],
    3: [
      ...times(5, () => (rng) => {
        const s = int(rng, 1, 3); const r = int(rng, 3, 4);
        const answer = Array.from({ length: r }, (_, i) => String(s * 2 ** (i + 1))).join(" ");
        return bd("What does the program say? Build the numbers in order.", answer, showing("Program", [`set x to ${s}`, `repeat ${r} times`, "  multiply x by 2", "  say x"]));
      }),
      ...times(5, () => (rng) => {
        const s = int(rng, 20, 30); const k = int(rng, 3, 5); const r = 4;
        const answer = Array.from({ length: r }, (_, i) => String(s - k * (i + 1))).join(" ");
        return bd("What does the program say? Build the numbers in order.", answer, showing("Program", [`set timer to ${s}`, `repeat ${r} times`, `  subtract ${k} from timer`, "  say timer"]));
      }),
      od("Put the lines in order. The program adds up five scores.", ["set total to 0", "repeat 5 times", '  ask "Score?"', "  add answer to total", "say total"]),
      od("Put the lines in order. The program counts down from 10 to 1.", ["set n to 10", "repeat 10 times", "  say n", "  subtract 1 from n"]),
      st("In this game loop, which variables change each time round and which stay the same?", ["Changes each time", "Stays the same"], [["score", 0], ["lives", 0], ["timeLeft", 0], ["playerName", 1], ["maxLevel", 1], ["gravity", 1]], showing("Game loop", ["set playerName to \"Bix\"", "set maxLevel to 10", "set gravity to 2", "repeat until lives = 0", "  add 10 to score", "  subtract 1 from timeLeft", "  if hit by meteor", "    subtract 1 from lives"])),
    ],
    4: [
      ...times(4, () => (rng) => { const n = int(rng, 5, 12); return nm("What does the program say at the end?", (n * (n + 1)) / 2, showing("Program", ["set total to 0", "set n to 1", `repeat ${n} times`, "  add n to total", "  add 1 to n", "say total"])); }),
      ...times(4, () => (rng) => { const list = Array.from({ length: 6 }, () => int(rng, 1, 40)); return nm("What does the program say at the end?", Math.max(...list), showing("Program", ["set biggest to 0", `set list to [${list.join(", ")}]`, "for each number in list", "  if number > biggest", "    set biggest to number", "say biggest"])); }),
      ...times(4, () => (rng) => { const s = int(rng, 1, 3); const r = int(rng, 3, 5); return nm("What does the program say at the end?", s * 3 ** r, showing("Program", [`set x to ${s}`, `repeat ${r} times`, "  multiply x by 3", "say x"])); }),
      ...times(4, () => (rng) => { const a = int(rng, 2, 6); const r = int(rng, 3, 5); let x = a; let y = 0; for (let i = 0; i < r; i += 1) { y += x; x += 1; } return nm("What does the program say at the end?", y, showing("Program", [`set x to ${a}`, "set y to 0", `repeat ${r} times`, "  add x to y", "  add 1 to x", "say y"])); }),
    ],
  },
};

/* ====================================================================
   Procedures
   ==================================================================== */
const STAMPS = ["star", "heart", "moon", "flower"];

export const procedures = {
  rule: "A procedure is a block of steps with a name. You define it once, then call it by its name whenever you need those steps. A procedure can take an input, such as 'square 3', which changes what it does.",
  hint: "When the program calls a procedure, jump to its definition, run every step inside it, then come back.",
  levels: {
    1: [
      ...times(6, () => (rng) => { const c = int(rng, 2, 5); return numberChoice(rng, 'How many times does this program say "Hello"?', c, "Program", ["define greet", '  say "Hello"', '  say "Welcome"', ...Array.from({ length: c }, () => "greet")], 1); }),
      ...times(6, () => (rng) => { const c = int(rng, 2, 4); const w = pick(rng, STAMPS); return numberChoice(rng, `How many ${w}s does this program draw?`, c * 2, "Program", [`define stamp`, `  draw ${w}`, `  draw ${w}`, ...Array.from({ length: c }, () => "stamp")], 1); }),
      ch("What is a **procedure**?", "A named block of steps that you can use again", ["A mistake in a program", "A number stored in a box", "A device that sends input"]),
      ch("What does it mean to **call** a procedure?", "To use its name so its steps run", ["To delete it", "To give it a phone number", "To write its steps again"]),
      ch("Why do programmers use procedures?", "So they write the steps once and reuse them", ["So the program has more lines", "So the computer forgets the steps", "So loops are not needed"]),
    ],
    2: [
      ...times(6, () => (rng) => { const s = int(rng, 2, 7); return numberChoice(rng, `The program calls square ${s}. How many squares does the robot move forward altogether?`, 4 * s, "Program", ["define square size", "  repeat 4 times", "    forward size", "    turn right", `square ${s}`]); }),
      ...times(6, () => (rng) => { const a = int(rng, 2, 9); const b = int(rng, 2, 9); return numberChoice(rng, "What does the program say at the end?", a * 2 + b * 2, "Program", ["set total to 0", "define addDouble n", "  add n * 2 to total", `addDouble ${a}`, `addDouble ${b}`, "say total"]); }),
      ...times(6, () => (rng) => { const s = int(rng, 2, 4); const t = int(rng, 2, 4); return numberChoice(rng, "How many squares does the robot move forward altogether?", 3 * s + 3 * t, "Program", ["define triangle size", "  repeat 3 times", "    forward size", "    turn 120 degrees", `triangle ${s}`, `triangle ${t}`]); }),
    ],
    3: [
      od("Put the lines in order. First define the procedure, then call it.", ["define cheer", '  say "Hip"', '  say "Hooray"', "cheer"]),
      od("Put the lines in order. The procedure draws a square of any size, then it is called for size 5.", ["define square size", "  repeat 4 times", "    forward size", "    turn right", "square 5"]),
      st("Is the line part of the procedure's definition, or a call to it?", ["Inside the definition", "A call"], [["say \"Hip\"", 0], ["forward size", 0], ["turn right", 0], ["cheer", 1], ["square 5", 1], ["square 2", 1]], showing("Program", ["define cheer", '  say "Hip"', "define square size", "  forward size", "  turn right", "cheer", "square 5", "square 2"])),
      ...times(4, () => (rng) => {
        const w = pick(rng, ["Hip", "Go", "Yay"]); const c = int(rng, 2, 3);
        return bd("What does this program say? Build the words in order.", Array.from({ length: c }, () => `${w} team`).join(" "), showing("Program", ["define chant", `  say "${w}"`, '  say "team"', ...Array.from({ length: c }, () => "chant")]));
      }),
      ch("A program draws 6 squares, each with 4 sides. Which version is best?", "Define a square procedure once and call it 6 times", ["Write all 24 sides out line by line", "Draw one square and stop", "Use 6 separate programs"]),
    ],
    4: [
      ...times(4, () => (rng) => { const r = int(rng, 2, 5); const k = int(rng, 2, 4); return nm("How many stars does this program draw altogether?", r * k, showing("Program", ["define row n", "  repeat n times", "    draw star", `repeat ${r} times`, `  row ${k}`])); }),
      ...times(4, () => (rng) => { const a = int(rng, 2, 5); const b = int(rng, 2, 5); return nm("How many squares does the robot move forward altogether?", 4 * a + 4 * b, showing("Program", ["define square size", "  repeat 4 times", "    forward size", "    turn right", `square ${a}`, `square ${b}`])); }),
      ...times(4, () => (rng) => { const p = int(rng, 2, 9); const c = int(rng, 2, 5); return nm("What does the program say at the end?", p * c, showing("Program", ["set coins to 0", "define collect amount", "  add amount to coins", `repeat ${c} times`, `  collect ${p}`, "say coins"])); }),
      ...times(4, () => (rng) => { const n = int(rng, 2, 9); return nm(`What does the program say?`, n * n + 1, showing("Program", ["define squarePlusOne n", "  say n * n + 1", `squarePlusOne ${n}`])); }),
    ],
  },
};

/* ====================================================================
   Debugging longer programs
   ==================================================================== */
// [goal, lines, index of the buggy line, the fixed line, three wrong fixes]
const LONG_BUGS = [
  ["Say the total of 1, 2, 3, 4 and 5", ["set total to 0", "set n to 1", "repeat 5 times", "  add n to total", "  add 2 to n", "say total"], 4, "  add 1 to n", ["  add 5 to n", "  add n to n", "  subtract 1 from n"]],
  ["Count how many numbers in the list are bigger than 5", ["set count to 0", "for each number in list", "  if number < 5", "    add 1 to count", "say count"], 2, "  if number > 5", ["  if number = 5", "  if count > 5", "  if number < 6"]],
  ["Draw a square of size 3", ["define square size", "  repeat 4 times", "    forward size", "    turn left twice", "square 3"], 3, "    turn right", ["    forward 3", "    turn around", "    repeat 4 times"]],
  ["Find the biggest number in the list", ["set biggest to 0", "for each number in list", "  if number > biggest", "    set number to biggest", "say biggest"], 3, "    set biggest to number", ["    add 1 to biggest", "    set biggest to 0", "    say number"]],
  ["Add 10 points each time a coin is collected, 5 times", ["set score to 0", "repeat 5 times", "  set score to 10", "say score"], 2, "  add 10 to score", ["  add 5 to score", "  set score to 50", "  subtract 10 from score"]],
  ["Lose a life only when hit, starting with 3 lives", ["set lives to 3", "repeat until lives = 0", "  if hit by meteor", "    add 1 to lives"], 3, "    subtract 1 from lives", ["    set lives to 3", "    add 3 to lives", "    say lives"]],
  ["Say the 3 times table from 3 to 30", ["set n to 3", "repeat 10 times", "  say n", "  multiply n by 3"], 3, "  add 3 to n", ["  add 1 to n", "  multiply n by 2", "  set n to 3"]],
  ["Turn the fan on only when it is hotter than 25 degrees", ["repeat forever", "  set temp to sensor", "  if temp < 25", "    turn fan on", "  else", "    turn fan off"], 2, "  if temp > 25", ["  if temp = 25", "  if temp < 30", "  if fan > 25"]],
  ["Call the cheer procedure 3 times", ["define cheer", '  say "Hooray"', "repeat 2 times", "  cheer"], 2, "repeat 3 times", ["repeat 4 times", "repeat 1 time", "define cheer twice"]],
  ["Count down from 5 to 1", ["set n to 5", "repeat 5 times", "  say n", "  add 1 to n"], 3, "  subtract 1 from n", ["  add 5 to n", "  set n to 1", "  say 1"]],
  ["Give a gold star when the score is 90 or more", ["set score to 95", "if score > 100", '  say "Gold star"', "else", '  say "Keep going"'], 1, "if score >= 90", ["if score < 90", "if score = 100", "if score > 95"]],
];
const lineOf = (line) => line.trim();

export const debuggingLonger = {
  rule: "In a longer program, test it, then trace it line by line to find where it first goes wrong. Check loops repeat the right number of times, 'if' questions ask the right thing, and variables change in the right way.",
  hint: "Read the goal first. Then trace the program and stop at the first line that does something different from the goal.",
  levels: {
    1: LONG_BUGS.map(([goal, lines, bug]) => () => ch(`The goal is: ${goal}. Which line has the bug?`, lineOf(lines[bug]), [...new Set(lines.filter((_, i) => i !== bug).map(lineOf))].filter((l) => l !== lineOf(lines[bug])).slice(0, 3), showing("Program with a bug", lines))),
    2: LONG_BUGS.map(([goal, lines, bug, fix, wrong]) => () => ch(`The goal is: ${goal}. How do you fix the line "${lineOf(lines[bug])}"?`, lineOf(fix), wrong.map(lineOf), showing("Program with a bug", lines))),
    3: [
      ...LONG_BUGS.map(([goal, lines, bug]) => st(`The goal is: ${goal}. Sort each line: does it work, or is it the bug?`, ["Works", "The bug"], [...new Map(lines.map((line, i) => [lineOf(line), i === bug ? 1 : 0])).entries()].filter(([l]) => l.length), showing("Program with a bug", lines))),
      od("Put the debugging steps in order.", ["Run the program and test it", "Spot that the output is wrong", "Trace the lines to find the bug", "Fix the line", "Test it again"]),
    ],
    4: [
      ...times(5, () => (rng) => { const n = int(rng, 4, 6); let total = 0; let x = 1; for (let i = 0; i < n; i += 1) { total += x; x += 2; } return nm(`This program should add 1 to ${n} but has a bug. What does it really say?`, total, showing("Program with a bug", ["set total to 0", "set n to 1", `repeat ${n} times`, "  add n to total", "  add 2 to n", "say total"])); }),
      ...times(5, () => (rng) => { const r = int(rng, 3, 6); const k = int(rng, 5, 15); return nm(`This program should add ${k} points ${r} times but has a bug. What does it really say?`, k, showing("Program with a bug", ["set score to 0", `repeat ${r} times`, `  set score to ${k}`, "say score"])); }),
      ...times(5, () => (rng) => { const k = int(rng, 2, 6); const r = int(rng, 4, 7); return nm(`The program should say ${k * r}. It says ${k * (r - 1)}. What number should go after 'repeat'?`, r, showing("Program with a bug", ["set total to 0", `repeat ${r - 1} times`, `  add ${k} to total`, "say total"])); }),
    ],
  },
};
