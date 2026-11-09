import { ch, od, st, nm } from "../topicBank.js";
import { int, pick, times, showing, numberChoice, termTopic } from "../year5Computing/shared.js";

// Year 6 Physical Systems: sensors as input, programs that control devices, and simple
// simulations. Readings and outcomes are computed from the numbers each question shows.

/* ====================================================================
   Sensors and inputs
   ==================================================================== */
// [device, the sensor reading, threshold, comparison, what turns on]
const SENSOR_RULES = [
  { device: "night light", sensor: "light", op: "<", range: [0, 100], limit: [20, 50], yes: "turn lamp on", no: "turn lamp off" },
  { device: "greenhouse fan", sensor: "temperature", op: ">", range: [10, 40], limit: [22, 30], yes: "turn fan on", no: "turn fan off" },
  { device: "plant waterer", sensor: "moisture", op: "<", range: [0, 100], limit: [25, 45], yes: "turn pump on", no: "turn pump off" },
  { device: "parking sensor", sensor: "distance", op: "<", range: [5, 200], limit: [30, 60], yes: "sound beeper", no: "stay quiet" },
];
const holds = (op, v, l) => (op === "<" ? v < l : v > l);
const sensorLines = (r, value, limit) => [`set ${r.sensor} to ${value}`, `if ${r.sensor} ${r.op} ${limit}`, `  ${r.yes}`, "else", `  ${r.no}`];

export const sensors = termTopic({
  subject: "sensors",
  rule: "A sensor measures something in the world, such as light, heat or distance, and sends the reading to a computer as input. The program uses the reading to decide what to do.",
  hint: "Ask what the sensor measures, then check the reading against the number in the 'if'.",
  terms: [
    ["light sensor", "measures how bright or dark it is"], ["temperature sensor", "measures how hot or cold something is"],
    ["sound sensor", "measures how loud it is"], ["motion sensor", "notices when something moves nearby"],
    ["distance sensor", "measures how far away an object is"], ["moisture sensor", "measures how wet the soil is"],
    ["button", "sends a signal when it is pressed"], ["reading", "the number a sensor gives at one moment"],
  ],
  facts: [
    ch("Is a sensor an input or an output?", "An input", ["An output", "A loop", "A variable name"]),
    ch("What does a program do with a sensor reading?", "Uses it to decide what to do", ["Prints it on paper every time", "Deletes it", "Turns it into a sound"]),
    ch("Which sensor would an automatic door use to see a person coming?", "A motion sensor", ["A moisture sensor", "A sound sensor", "A temperature sensor"]),
    ch("Why do sensor programs often use a loop?", "So they keep checking the reading again and again", ["So they only check once", "So the sensor gets bigger", "So the screen stays dark"]),
  ],
  sorts: [
    st("Is it a sensor (input) or something the computer controls (output)?", ["Sensor: input", "Controlled: output"], [["light sensor", 0], ["temperature sensor", 0], ["motion sensor", 0], ["button", 0], ["lamp", 1], ["fan", 1], ["motor", 1], ["buzzer", 1]]),
    st("Which sensor would you use?", ["Light sensor", "Temperature sensor"], [["Turn on street lights at dusk", 0], ["Close blinds when the sun is bright", 0], ["Switch on a heater when it is cold", 1], ["Warn when a fridge gets too warm", 1]]),
  ],
  builds: ["A light sensor measures how bright it is.", "A sensor sends input to the computer.", "The program checks the reading in a loop."],
  orders: [
    od("Put the steps in order for a night light.", ["The light sensor takes a reading", "The program checks if it is dark", "The program turns the lamp on", "The loop checks the sensor again"]),
  ],
  scenes: [
    ...SENSOR_RULES.map((r) => (rng) => {
      const limit = int(rng, ...r.limit); const value = int(rng, ...r.range);
      if (value === limit) return null;
      const does = holds(r.op, value, limit) ? r.yes : r.no;
      return ch(`This program runs a ${r.device}. What does it do?`, does, [does === r.yes ? r.no : r.yes, "nothing at all", "both things"], showing("Program", sensorLines(r, value, limit)));
    }),
    ch("A plant waterer must water the soil when it gets dry. Which sensor does it need?", "A moisture sensor", ["A sound sensor", "A light sensor", "A button"]),
    ch("A car beeps faster as it gets closer to a wall. Which sensor does it use?", "A distance sensor", ["A moisture sensor", "A temperature sensor", "A light sensor"]),
  ],
  gens: {
    2: times(4, () => (rng) => {
      const r = pick(rng, SENSOR_RULES); const limit = int(rng, ...r.limit);
      const yes = r.op === "<" ? int(rng, r.range[0], limit - 1) : int(rng, limit + 1, r.range[1]);
      const noVals = [limit, limit + 5, limit + 10].map((n) => (r.op === "<" ? n : limit - (n - limit)));
      return ch(`The ${r.device} program says: if ${r.sensor} ${r.op} ${limit}, ${r.yes}. Which reading makes it ${r.yes}?`, String(yes), [...new Set(noVals.map(String))].filter((v) => v !== String(yes)));
    }),
    4: times(6, () => (rng) => {
      const readings = Array.from({ length: 6 }, () => int(rng, 0, 100)); const limit = int(rng, 30, 60);
      return nm(`The light sensor gives these readings, one per minute. How many minutes is the lamp on?`, readings.filter((v) => v < limit).length, showing("Program", [`for each reading in [${readings.join(", ")}]`, `  if reading < ${limit}`, "    turn lamp on", "  else", "    turn lamp off"]));
    }),
  },
});

/* ====================================================================
   Controlling devices
   ==================================================================== */
const UK_LIGHTS = ["Red", "Red and amber", "Green", "Amber"];
const heaterSays = (t, low, high) => (t < low ? "heater on" : t > high ? "fan on" : "both off");

export const controlling = {
  rule: "A program can control a device, such as a light, motor or buzzer. It reads its inputs, decides with 'if', then switches outputs on or off. A loop keeps it running.",
  hint: "Find the reading, check each 'if' from the top, and stop at the first one that is true.",
  levels: {
    1: [
      ...times(6, () => (rng) => {
        const low = int(rng, 15, 18); const high = int(rng, 22, 26); const t = int(rng, 10, 30);
        const answer = heaterSays(t, low, high);
        return ch("What does this program switch on?", answer, ["heater on", "fan on", "both off"].filter((a) => a !== answer), showing("Program", [`set temperature to ${t}`, `if temperature < ${low}`, "  heater on", `else if temperature > ${high}`, "  fan on", "else", "  both off"]));
      }),
      ch("What is an **output** that a program can control?", "A motor that turns a wheel", ["A light sensor", "A button", "A temperature reading"]),
      ch("Why does a device's control program usually sit inside 'repeat forever'?", "So it keeps checking and reacting", ["So it switches off at once", "So it runs only one time", "So it never reads its sensors"]),
      ch("An automatic door opens when someone comes near. What is the input?", "The motion sensor", ["The door motor", "The door itself", "The floor"]),
      ch("An automatic door opens when someone comes near. What is the output?", "The motor that opens the door", ["The motion sensor", "The person", "The reading"]),
    ],
    2: [
      ...times(6, () => (rng) => {
        const person = rng() < 0.5; const dark = rng() < 0.5;
        const answer = person && dark ? "light on" : "light off";
        return ch("A porch light comes on only when it is dark AND someone is near. What does it do?", answer, [answer === "light on" ? "light off" : "light on", "beep twice", "flash"], showing("Program", [`set dark to ${dark}`, `set personNear to ${person}`, "if dark and personNear", "  light on", "else", "  light off"]));
      }),
      ...times(6, () => (rng) => { const s = int(rng, 1, 4); const r = int(rng, 2, 4); return numberChoice(rng, "How many times does the buzzer beep altogether?", s * r, "Program", [`repeat ${r} times`, `  repeat ${s} times`, "    beep", "  wait 1 second"], 1); }),
      ...times(4, () => (rng) => { const k = int(rng, 0, 3); return ch(`A UK traffic light starts on Red. After ${k} changes, what does it show?`, UK_LIGHTS[k], UK_LIGHTS.filter((_, i) => i !== k)); }),
    ],
    3: [
      od("Put the UK traffic light sequence in order, starting from Red.", UK_LIGHTS),
      od("Put the lines in order. The program turns the fan on when it is hotter than 25 degrees.", ["repeat forever", "  set temp to sensor", "  if temp > 25", "    fan on", "  else", "    fan off"]),
      od("Put the steps in order for a lift.", ["A person presses the button for floor 3", "The program reads which button was pressed", "The motor moves the lift up", "The lift stops and the doors open"]),
      st("In a smart greenhouse, is it an input or an output?", ["Input", "Output"], [["temperature sensor", 0], ["moisture sensor", 0], ["light sensor", 0], ["fan", 1], ["water pump", 1], ["window motor", 1]]),
      od("Put the steps in order for an automatic door.", ["The motion sensor notices a person", "The program decides to open", "The motor opens the door", "The program waits, then closes it"]),
      ...times(4, () => (rng) => {
        const low = int(rng, 15, 18); const high = int(rng, 22, 26);
        const temps = [...new Set(Array.from({ length: 9 }, () => int(rng, 10, 30)))];
        const bins = ["heater on", "fan on", "both off"];
        const cards = temps.map((t) => [`${t} degrees`, bins.indexOf(heaterSays(t, low, high))]);
        if (bins.some((_, i) => !cards.some(([, b]) => b === i))) return null;
        return st(`The heater goes on below ${low} degrees and the fan above ${high} degrees. What happens at each temperature?`, ["Heater on", "Fan on", "Both off"], cards);
      }),
    ],
    4: [
      ...times(4, () => (rng) => { const r = int(rng, 2, 5); const t = [int(rng, 3, 6), 2, int(rng, 3, 6), 2]; return nm("The traffic light program goes round its loop. How many seconds does it run altogether?", r * t.reduce((a, b) => a + b, 0), showing("Program", [`repeat ${r} times`, `  red for ${t[0]} seconds`, `  red and amber for ${t[1]} seconds`, `  green for ${t[2]} seconds`, `  amber for ${t[3]} seconds`])); }),
      ...times(4, () => (rng) => { const temps = Array.from({ length: 6 }, () => int(rng, 15, 32)); const lim = int(rng, 22, 27); return nm("The greenhouse checks the temperature once an hour. For how many of the hours is the fan on?", temps.filter((t) => t > lim).length, showing("Program", [`for each temp in [${temps.join(", ")}]`, `  if temp > ${lim}`, "    fan on", "  else", "    fan off"])); }),
      ...times(4, () => (rng) => { const per = int(rng, 2, 5); const n = int(rng, 3, 8); return nm(`A lift motor moves ${per} metres for each floor. The program sends it up ${n} floors. How many metres does it move?`, per * n, showing("Program", [`repeat ${n} times`, `  motor up ${per} metres`])); }),
    ],
  },
};

/* ====================================================================
   Simulations
   ==================================================================== */
const grow = (start, factor, steps) => { let x = start; for (let i = 0; i < steps; i += 1) x *= factor; return x; };

export const simulations = termTopic({
  subject: "simulations",
  rule: "A simulation is a computer model of something real. It uses variables and rules to copy how the real thing changes, step by step. You can change the variables to test ideas safely and make predictions.",
  hint: "Find the starting value and the rule, then apply the rule once for every step.",
  terms: [
    ["simulation", "a computer model that copies how something real behaves"], ["model", "a simpler version of something real, used to study it"],
    ["prediction", "what you expect will happen, worked out before it happens"], ["rule", "the instruction that says how the model changes each step"],
    ["step", "one turn of the simulation, such as one day or one minute"], ["test", "run the simulation to check an idea"],
  ],
  apart: [["simulation", "model"]],
  facts: [
    ch("Why do pilots practise in a flight simulator?", "It is safe to make mistakes there", ["Real planes are too small", "It is faster than flying", "Simulators can fly to space"]),
    ch("Why are simulations useful for testing ideas?", "You can try changes without any real danger or cost", ["They are always perfectly correct", "They never need any rules", "They replace all real experiments"]),
    ch("Is a simulation always exactly right?", "No, it is only as good as its rules", ["Yes, computers never get it wrong", "Yes, if the screen is big", "No, simulations are just games"]),
  ],
  sorts: [
    st("Is it a good use for a simulation?", ["Good use", "Not needed"], [["Testing a bridge design in a storm", 0], ["Predicting tomorrow's weather", 0], ["Training a pilot for an engine failure", 0], ["Remembering your friend's birthday", 1], ["Adding 2 and 3", 1], ["Spelling your name", 1]]),
  ],
  builds: ["A simulation copies something real.", "The rule changes the model each step.", "A simulation helps us make predictions."],
  orders: [
    od("Put the steps for using a simulation in order.", ["Choose the starting values", "Run the simulation", "Look at the results", "Change a value and test again"]),
  ],
  scenes: [
    ...times(6, () => (rng) => { const s = int(rng, 2, 6); const d = int(rng, 2, 4); return numberChoice(rng, `A simulation starts with ${s} rabbits and the number doubles every month. How many rabbits after ${d} months?`, grow(s, 2, d), "Rabbit simulation", [`set rabbits to ${s}`, `repeat ${d} times`, "  multiply rabbits by 2", "say rabbits"]); }),
    ...times(4, () => (rng) => { const s = int(rng, 5, 20); const r = int(rng, 3, 8); const m = int(rng, 3, 6); return numberChoice(rng, `A bath has ${s} litres and fills by ${r} litres each minute. How much water after ${m} minutes?`, s + r * m, "Bath simulation", [`set water to ${s}`, `repeat ${m} times`, `  add ${r} to water`, "say water"]); }),
  ],
  gens: {
    4: [
      ...times(4, () => (rng) => { const s = int(rng, 60, 90); const r = int(rng, 3, 6); const m = int(rng, 4, 8); return nm(`A cup of tea starts at ${s} degrees and cools ${r} degrees each minute. What does the simulation say after ${m} minutes?`, s - r * m, showing("Tea simulation", [`set temp to ${s}`, `repeat ${m} times`, `  subtract ${r} from temp`, "say temp"])); }),
      ...times(4, () => (rng) => { const s = int(rng, 1, 4); const d = int(rng, 3, 4); return nm(`Plants start at ${s}. Each week the number triples. How many plants after ${d} weeks?`, grow(s, 3, d), showing("Plant simulation", [`set plants to ${s}`, `repeat ${d} times`, "  multiply plants by 3", "say plants"])); }),
    ],
  },
});
