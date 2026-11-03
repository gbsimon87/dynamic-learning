import { ch, bd, od, st, ty, nm, some } from "../topicBank.js";
import { shuffle } from "../year1Math/shared.js";
import { int, pick, times, showing, termTopic } from "./shared.js";

/* ====================================================================
   Breaking problems into parts
   ==================================================================== */
const PROBLEMS = [
  ["Plan a birthday party", ["Choose the food", "Write the guest list", "Pick the games", "Send the invitations"]],
  ["Make a quiz game", ["Write the questions", "Keep the score", "Show the correct answers", "Show the final result"]],
  ["Make a robot draw a square", ["Move forward", "Turn right", "Repeat four times", "Lift the pen at the end"]],
  ["Write a story", ["Create the characters", "Plan the beginning", "Plan the middle", "Write the ending"]],
  ["Make a school website", ["Choose the pages", "Write the words", "Pick the pictures", "Add the menu links"]],
  ["Run a bake sale", ["Bake the cakes", "Make the price list", "Set up the table", "Count the money"]],
  ["Design a game level", ["Draw the background", "Place the platforms", "Add the enemies", "Add the exit door"]],
  ["Set up a class library", ["Sort the books", "Make a borrowing list", "Choose a shelf", "Make the labels"]],
];
const PLAN = [
  ["Order the parts of a bake sale.", ["Bake the cakes", "Set up the table", "Sell the cakes", "Count the money"]],
  ["Order the parts of making a school poster.", ["Decide the message", "Draw the pictures", "Add the words", "Put the poster on the wall"]],
  ["Order the parts of a class party.", ["Choose a date", "Invite the class", "Hold the party", "Tidy up"]],
  ["Order the parts of making a game.", ["Plan the idea", "Make the characters", "Write the code", "Test and fix the bugs"]],
];
const parts = PROBLEMS.flatMap(([problem, list]) => list.map((part) => [problem, part]));
// Problems whose parts could be mistaken for each other are never offered together.
const RELATED = [["Plan a birthday party", "Run a bake sale"], ["Make a quiz game", "Design a game level"]];
const related = (a, b) => RELATED.some(([x, y]) => (x === a && y === b) || (x === b && y === a));
const unrelated = (problem) => PROBLEMS.filter((p) => p[0] !== problem && !related(p[0], problem));
const asPair = (rng) => { const a = pick(rng, PROBLEMS); const b = pick(rng, unrelated(a[0])); return { a, b }; };

export const decomposition = {
  rule: "Decomposition means breaking a big problem into smaller parts that are easier to solve. Each part can be done on its own, and together they solve the whole problem.",
  hint: "Ask: does this part help to solve the big problem, or does it belong to a different one?",
  levels: {
    1: parts.map(([problem, part]) => (rng) => ch(`Which is a smaller part of the problem **${problem}**?`, part, some(rng, parts.filter((p) => p[0] !== problem && !related(p[0], problem)).map((p) => p[1]), 3))),
    2: parts.map(([problem, part]) => (rng) => ch(`Which big problem does this part belong to? **${part}**`, problem, some(rng, unrelated(problem).map((p) => p[0]), 3))),
    3: [
      ...times(8, () => (rng) => {
        const { a, b } = asPair(rng);
        return st("Sort the parts into the right problem.", [a[0], b[0]], [...a[1].map((p) => [p, 0]), ...b[1].map((p) => [p, 1])]);
      }),
      ...PLAN.map(([prompt, labels]) => od(prompt, labels)),
      od("Put the parts of a robot square in order.", ["Move forward", "Turn right", "Move forward again", "Turn right again"]),
      od("Put the parts of a quiz game in order.", ["Ask a question", "Wait for the answer", "Check the answer", "Update the score"]),
    ],
    4: [
      ...times(3, () => (rng) => { const l = int(rng, 3, 6); const e = int(rng, 2, 5); return nm(`A game has ${l} levels. Each level has ${e} enemies and 1 boss. How many characters need drawing altogether?`, l * (e + 1)); }),
      ...times(3, () => (rng) => { const c = int(rng, 4, 8); const g = pick(rng, [3, 4, 5]); return nm(`A class of ${c * g} pupils works in groups of ${g}. How many groups are there?`, c); }),
      ...times(3, () => (rng) => { const p = int(rng, 3, 6); const d = int(rng, 2, 4); return nm(`A project has ${p} parts. Each part takes ${d} days. How many days does it take if the parts are done one after another?`, p * d); }),
      ...times(3, () => (rng) => { const p = int(rng, 2, 4); const d = int(rng, 6, 12); return nm(`A job takes ${p * d} minutes. It is split into ${p} equal parts. How many minutes is each part?`, d); }),
      ...times(3, () => (rng) => { const pages = int(rng, 3, 6); const pics = int(rng, 2, 4); const words = int(rng, 1, 3); return nm(`A website has ${pages} pages. Each page needs ${pics} pictures and ${words} paragraphs to be made. How many pictures and paragraphs altogether?`, pages * (pics + words)); }),
    ],
  },
};

/* ====================================================================
   How algorithms work
   ==================================================================== */
const distinctList = (rng, n, lo = 1, hi = 20) => shuffle(rng, Array.from({ length: hi - lo + 1 }, (_, i) => lo + i)).slice(0, n);
const bubblePass = (list) => {
  const out = [...list]; let swaps = 0;
  for (let i = 0; i < out.length - 1; i += 1) if (out[i] > out[i + 1]) { [out[i], out[i + 1]] = [out[i + 1], out[i]]; swaps += 1; }
  return { out, swaps };
};
const bubbleLines = (list) => [`list = [${list.join(", ")}]`, "look at each pair of neighbours, left to right", "  if the left one is bigger, swap them", "say the list"];
const biggestLines = (list, word = "biggest", cmp = ">") => [`list = [${list.join(", ")}]`, `${word} = the first number`, "for each number in the list", `  if number ${cmp} ${word}`, `    ${word} = number`, `say ${word}`];
const listText = (list) => list.join(" ");
const HALVES = [[8, 3], [16, 4], [20, 5], [32, 5], [64, 6], [100, 7], [1000, 10]];

export const algorithms = termTopic({
  rule: "An algorithm is a list of clear steps that solves a problem. You can follow an algorithm by tracing it: do each step in order and write down what changes.",
  hint: "Trace it slowly. Write down the list or the number after every step.",
  subject: "algorithms",
  terms: [
    ["algorithm", "a list of clear steps that solves a problem"], ["sequence", "steps that happen one after another in order"],
    ["decomposition", "breaking a big problem into smaller parts"], ["trace", "following a program step by step to see what it does"],
    ["bug", "a mistake in a program or algorithm"], ["debug", "to find and fix mistakes"], ["loop", "a way to repeat steps"],
    ["selection", "a choice between actions, made with if"], ["variable", "a named box that holds a value"],
  ],
  builds: [
    "An algorithm is a list of steps.", "Follow the steps in the right order.", "Tracing shows what an algorithm does.", "A loop repeats steps.",
    "An algorithm can be written as a list of instructions.", "Testing an algorithm helps to find bugs.", "Good algorithms have clear steps.", "A computer follows an algorithm exactly.",
  ],
  sorts: [
    st("Is it an algorithm?", ["An algorithm: steps to follow", "Not an algorithm"], [["A recipe", 0], ["Directions to the library", 0], ["Rules for a board game", 0], ["Steps for tying shoelaces", 0], ["How to log in", 0], ["A single word", 1], ["A holiday photo", 1], ["A favourite colour", 1], ["A pet's name", 1], ["A cartoon picture", 1]]),
    st("Which words go with which idea?", ["Repeating steps", "Making a choice"], [["loop", 0], ["repeat 5 times", 0], ["for each number", 0], ["if", 1], ["else", 1], ["selection", 1]]),
  ],
  orders: [
    od("Put the steps in order to find the biggest number in a list.", ["Look at the first number and remember it", "Look at the next number", "If it is bigger, remember it instead", "When the list ends, say the number you remember"]),
    od("Put the steps in order for a number guessing game.", ["Think of a number", "Make a guess", "Say higher or lower", "Guess again until it is right"]),
    od("Put the steps in order for one pass of sorting.", ["Look at the first two numbers", "Swap them if the left one is bigger", "Move on one place", "Stop at the end of the list"]),
  ],
  scenes: [
    ch("A friend gives you steps for making a paper boat but says them in a mixed-up order. What is wrong?", "The sequence is wrong", ["It is not an algorithm at all", "The paper is too small", "It needs a loop"]),
    ch("You test an algorithm and it gives the wrong answer for one number. What do you do?", "Trace it to find the bug, then fix it", ["Throw it away", "Run it again and hope", "Add more numbers"]),
    ch("An algorithm says 'repeat 10 times: add 1'. Which idea is it using?", "A loop", ["A bug", "A variable only", "Decomposition"]),
    ch("An algorithm says 'if it is raining, take an umbrella'. Which idea is it using?", "Selection", ["A loop", "A bug", "A sequence only"]),
  ],
  gens: {
    1: times(8, () => (rng) => {
      const list = distinctList(rng, 5); const answer = Math.max(...list);
      return ch("Follow the algorithm. What does it say?", String(answer), some(rng, list.filter((n) => n !== answer), 3).map(String), showing("Algorithm", biggestLines(list)));
    }),
    2: [
      ...times(5, () => (rng) => {
        const list = distinctList(rng, 5); const answer = Math.min(...list);
        return ch("Follow the algorithm. What does it say?", String(answer), some(rng, list.filter((n) => n !== answer), 3).map(String), showing("Algorithm", biggestLines(list, "smallest", "<")));
      }),
      ...times(6, () => (rng) => {
        const list = distinctList(rng, 5); const { out } = bubblePass(list);
        if (listText(out) === listText(list)) return null;
        const wrong = [listText(list), listText([...list].sort((a, b) => a - b)), listText([...out].reverse())].filter((x) => x !== listText(out));
        return ch("Follow the algorithm once. What does it say?", listText(out), [...new Set(wrong)], showing("Algorithm", bubbleLines(list)));
      }),
    ],
    3: times(6, () => (rng) => {
      const list = distinctList(rng, 5); const { out } = bubblePass(list);
      if (listText(out) === listText(list)) return null;
      return bd("Follow the algorithm once. Build the list it says.", listText(out), showing("Algorithm", bubbleLines(list)));
    }),
    4: [
      ...times(5, () => (rng) => {
        const list = distinctList(rng, 5); const { swaps } = bubblePass(list);
        return nm("How many swaps does the algorithm make?", swaps, showing("Algorithm", bubbleLines(list)));
      }),
      ...HALVES.map(([n, guesses]) => nm(`I think of a number from 1 to ${n}. Each guess cuts the choices in half. What is the most guesses you could need?`, guesses)),
      ...times(4, () => (rng) => {
        const list = distinctList(rng, 6, 1, 15); const k = int(rng, 5, 9);
        return nm(`What does the algorithm say? (It adds up the numbers that are bigger than ${k}.)`, list.filter((n) => n > k).reduce((s, n) => s + n, 0), showing("Algorithm", [`list = [${list.join(", ")}]`, "total = 0", "for each number in the list", `  if number > ${k}`, "    add number to total", "say total"]));
      }),
    ],
  },
});

/* ====================================================================
   Logic with and, or and not
   ==================================================================== */
const world = (rng) => ({ age: int(rng, 6, 12), sunny: rng() < 0.5, hasBike: rng() < 0.5, score: int(rng, 30, 90) });
const worldLines = (w) => [`set age to ${w.age}`, `set sunny to ${w.sunny}`, `set hasBike to ${w.hasBike}`, `set score to ${w.score}`];
const PREDICATES = [
  ["age > 8", (w) => w.age > 8], ["age < 10", (w) => w.age < 10], ["sunny", (w) => w.sunny], ["hasBike", (w) => w.hasBike], ["score >= 50", (w) => w.score >= 50], ["score < 70", (w) => w.score < 70],
];
const pair = (rng) => { const [p, q] = some(rng, PREDICATES, 2); return [p, q]; };
const truth = (value) => String(value);

export const logic = {
  rule: "A condition is either true or false. 'A and B' is true only when BOTH A and B are true. 'A or B' is true when AT LEAST ONE of them is true. 'not A' flips it: true becomes false and false becomes true.",
  hint: "Work out whether each small part is true or false first, then combine them with and, or, not.",
  levels: {
    1: [
      ...times(6, () => (rng) => {
        const w = world(rng); const [p, q] = pair(rng);
        return ch("Is the condition true or false?", truth(p[1](w) && q[1](w)), [truth(!(p[1](w) && q[1](w)))], showing("Program", [...worldLines(w), `condition: ${p[0]} and ${q[0]}`]));
      }),
      ...times(6, () => (rng) => {
        const w = world(rng); const [p] = pair(rng);
        return ch("Is the condition true or false?", truth(p[1](w)), [truth(!p[1](w))], showing("Program", [...worldLines(w), `condition: ${p[0]}`]));
      }),
      ch("When is 'A and B' true?", "Only when both A and B are true", ["When either one is true", "When both are false", "Always"]),
      ch("When is 'A or B' true?", "When at least one of them is true", ["Only when both are false", "Only when both are true", "Never"]),
      ch("What does 'not' do to true?", "It makes it false", ["It keeps it true", "It makes it a number", "It repeats it"]),
      ch("How many different values can a condition have?", "Two: true or false", ["One", "Three", "Ten"]),
    ],
    2: [
      ...times(8, () => (rng) => {
        const w = world(rng); const [p, q] = pair(rng);
        const value = p[1](w) || q[1](w);
        return ch("Is the condition true or false?", truth(value), [truth(!value)], showing("Program", [...worldLines(w), `condition: ${p[0]} or ${q[0]}`]));
      }),
      ...times(8, () => (rng) => {
        const w = world(rng); const [p, q] = pair(rng);
        const value = !p[1](w) && q[1](w);
        return ch("Is the condition true or false?", truth(value), [truth(!value)], showing("Program", [...worldLines(w), `condition: not (${p[0]}) and ${q[0]}`]));
      }),
    ],
    3: [
      ...times(4, () => (rng) => {
        const w = world(rng);
        const cards = [];
        for (let i = 0; i < 8; i += 1) {
          const [p, q] = pair(rng); const op = pick(rng, ["and", "or"]);
          const value = op === "and" ? p[1](w) && q[1](w) : p[1](w) || q[1](w);
          cards.push([`${p[0]} ${op} ${q[0]}`, value ? 0 : 1]);
        }
        const unique = [...new Map(cards.map((c) => [c[0], c])).values()];
        if (!unique.some((c) => c[1] === 0) || !unique.some((c) => c[1] === 1)) return null;
        return st(`Sort the conditions: are they true or false?`, ["True", "False"], unique, showing("The values", worldLines(w)));
      }),
      ...times(8, () => (rng) => {
        const w = world(rng);
        const options = [];
        for (let tries = 0; tries < 60 && options.length < 4; tries += 1) {
          const [p, q] = pair(rng); const op = pick(rng, ["and", "or"]);
          const value = op === "and" ? p[1](w) && q[1](w) : p[1](w) || q[1](w);
          const text = `${p[0]} ${op} ${q[0]}`;
          if (options.some((o) => o.text === text)) continue;
          if (value && options.some((o) => o.value)) continue;
          if (!value && options.filter((o) => !o.value).length >= 3) continue;
          options.push({ text, value });
        }
        const right = options.filter((o) => o.value);
        if (right.length !== 1 || options.length < 3) return null;
        return ch("Which condition is true?", right[0].text, options.filter((o) => !o.value).map((o) => o.text), showing("The values", worldLines(w)));
      }),
      bd("Put the tiles in order to make a true sentence about logic.", "Both parts of an and must be true."),
      bd("Put the tiles in order to make a true sentence about logic.", "An or needs only one part to be true."),
      bd("Put the tiles in order to make a true sentence about logic.", "Not flips true into false."),
      bd("Put the tiles in order to make a true sentence about logic.", "A condition is either true or false."),
    ],
    4: [
      ...times(8, () => (rng) => {
        const w = world(rng); const [p, q] = pair(rng); const op = pick(rng, ["and", "or"]);
        const value = op === "and" ? p[1](w) && q[1](w) : p[1](w) || q[1](w);
        return ty("Type true or false: is the condition true?", truth(value), { ...showing("Program", [...worldLines(w), `condition: ${p[0]} ${op} ${q[0]}`]) });
      }),
      ...times(6, () => (rng) => {
        const list = Array.from({ length: 6 }, () => int(rng, 1, 12)); const lo = int(rng, 2, 4); const hi = int(rng, 8, 10);
        return nm(`How many numbers in the list are bigger than ${lo} and smaller than ${hi}?`, list.filter((n) => n > lo && n < hi).length, showing("Program", [`set list to [${list.join(", ")}]`, "set count to 0", "for each number in list", `  if number > ${lo} and number < ${hi}`, "    add 1 to count", "say count"]));
      }),
      ch("A park gate opens when it is daytime AND the park is not full. It is daytime and the park is full. Does it open?", "No", ["Yes", "Only on Sundays", "The gate does not know"]),
      ch("A lamp turns on if it is dark OR a button is pressed. It is light and the button is pressed. Does it turn on?", "Yes", ["No", "Only if it is dark", "Only after a minute"]),
      ch("A game is won if score > 50 AND lives > 0. The score is 80 and lives is 0. Is the game won?", "No", ["Yes", "Only if the score is 100", "Nobody can tell"]),
      ch("An alarm sounds if the door is open OR the window is open. Both are closed. Does it sound?", "No", ["Yes", "Only at night", "Always"]),
    ],
  },
};
