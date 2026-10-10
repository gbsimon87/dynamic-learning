import test from "node:test";
import assert from "node:assert/strict";
import { composeReadAloud, joinSegments, mathToSpeech, optionsSentence } from "./mathSpeech.js";

const says = (pairs) => {
  for (const [shown, spoken] of pairs) assert.equal(mathToSpeech(shown), spoken, shown);
};

test("sums are read as a teacher says them, the blank as a question", () => {
  says([
    ["6 × 5 = ?", "6 times 5 equals what?"],
    ["? + 38 = 90", "what plus 38 equals 90?"],
    ["15 - 6 = ?", "15 minus 6 equals what?"],
    ["24 ÷ 4 = ?", "24 divided by 4 equals what?"],
    ["3, 6, ?, 12", "3, 6, blank, 12"],
    ["-5", "minus 5"],
  ]);
});

test("hyphens in words are never minus", () => {
  says([["3-digit numbers", "3-digit numbers"], ["seventy-five", "seventy-five"]]);
});

test("money, fractions, plurals and units", () => {
  says([
    ["£3.50", "3 pounds 50"],
    ["£1", "1 pound"],
    ["£0.45", "45 pence"],
    ["45p", "45 pence"],
    ["1/2 of 10", "one half of 10"],
    ["3/4", "three quarters"],
    ["2/5 km", "two fifths of a kilometre"],
    ["Counting in 4s", "Counting in fours"],
    ["The 100s column", "The hundreds column"],
    ["250 ml", "250 millilitres"],
    ["1 kg", "1 kilogram"],
    ["45 s", "45 seconds"],
    ["20°C", "20 degrees Celsius"],
    ["What is 12 m in cm?", "What is 12 metres in centimetres?"],
  ]);
});

test("comparisons name the relation once", () => {
  says([
    ["24 < 30", "24 is less than 30"],
    ["Is 7 > 3?", "Is 7 greater than 3?"],
    ["Make every < true", "Make every less-than sign true"],
  ]);
});

test("what the voice already reads well is left alone", () => {
  says([
    ["3:15", "3:15"],
    ["5 more than 3", "5 more than 3"],
    ["Step 1: add the ones", "Step 1: add the ones"],
    ["I have 3 apples and 2 pears", "I have 3 apples and 2 pears"],
  ]);
});

test("emoji become their names without doubling, shouting is lowered", () => {
  says([
    ["Where is the 🌸?", "Where is the flower?"],
    ["How many 🐶 dogs?", "How many dogs?"],
    ["Type the SMALLEST number", "Type the smallest number"],
    ["Write it in Roman numerals: XII", "Write it in Roman numerals: XII"],
  ]);
});

test("arrows read as steps", () => {
  says([["56 → 46", "56 goes to 46"], ["508 → 10 less → ?", "508, then 10 less, then what?"]]);
});

test("options are gathered into one question", () => {
  assert.equal(optionsSentence(["18", "20", "16"]), "Is it 18, 20 or 16?");
  assert.equal(optionsSentence(["yes", "no"]), "Yes or no?");
  assert.equal(optionsSentence(["<", ">", "="]), "Is it less than, greater than or equals?");
  assert.equal(optionsSentence([]), "");
});

test("segments join as one sum, a row, or sentences", () => {
  assert.equal(joinSegments([{ text: "12" }, { text: "+" }, { text: "?" }, { text: "= 20" }]), "12 + ? = 20");
  assert.equal(joinSegments([{ text: "58", list: true }, { text: "59", list: true }, { text: "?", list: true }]), "58, 59, ?");
  assert.equal(joinSegments([{ text: "Look at the line" }, { text: "Which is bigger?" }]), "Look at the line. Which is bigger?");
  assert.equal(
    composeReadAloud({ title: "Missing numbers", segments: [{ text: "12" }, { text: "+" }, { text: "?" }, { text: "= 20" }], options: ["6", "8", "10"] }),
    "Missing numbers. 12 plus what equals 20? Is it 6, 8 or 10?"
  );
});
