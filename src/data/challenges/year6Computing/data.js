import { ch, od, st, nm } from "../topicBank.js";
import { shuffle } from "../year1Math/shared.js";
import { int, pick, times, nearNumbers, termTopic } from "../year5Computing/shared.js";

// Year 6 Data and Information: collecting, analysing (tables, filters, simple formulas) and
// presenting data. Every count and total is computed from the table the question shows.

const numberPick = (rng, prompt, answer, extra = {}) => ch(prompt, String(answer), nearNumbers(rng, answer, 3, 0), extra);
/** A small table, shown as text lines (one record per line). */
const tableOf = (title, header, rows) => ({ passage: { title, kind: "code", blocks: [header, ...rows].map((r) => ({ type: "line", text: r.join(" | ") })) }, readTextAloud: false });

/* ====================================================================
   Collecting data
   ==================================================================== */
const TALLY = ["cat", "dog", "fish", "rabbit"];
export const collecting = termTopic({
  subject: "collecting data",
  rule: "Data is information we collect to answer a question. Plan first: decide what you want to find out, then what to record and how. Clear questions with set answers give data that is easy to count and compare.",
  hint: "Ask: will this help answer the question, and can the answers be counted and compared?",
  terms: [
    ["data", "facts or numbers collected to answer a question"], ["survey", "asking many people the same questions"],
    ["field", "one box in a form or record, such as name or age"], ["record", "all the information about one thing, such as one pupil"],
    ["tally", "a quick way of counting using marks in groups of five"], ["form", "a set of boxes people fill in to give information"],
    ["sensor", "a device that collects readings automatically"], ["data logger", "a device that saves sensor readings over time"],
  ],
  apart: [["sensor", "data logger"]],
  facts: [
    ch("Which survey question gives answers that are easiest to count?", "Which is your favourite fruit: apple, banana or orange?", ["Tell me about food.", "What do you think?", "Do you like things?"]),
    ch("Why is it useful to give set choices on a form?", "The answers are easy to count and compare", ["It makes the form longer", "People can write anything", "It stops anyone answering"]),
    ch("A class wants to find out how warm the classroom gets each hour of the day. What is the best way to collect the data?", "Use a data logger with a temperature sensor", ["Ask one pupil how they feel", "Guess the numbers", "Look at the sky"]),
    ch("What should you decide FIRST when collecting data?", "The question you want to answer", ["The colour of the chart", "The font for the title", "How many pages to print"]),
  ],
  sorts: [
    st("Is it a good survey question?", ["Clear and countable", "Too vague"], [["How many pets do you have?", 0], ["Which day is your swimming lesson?", 0], ["Do you walk to school: yes or no?", 0], ["What is life like?", 1], ["Tell me stuff.", 1], ["Is it good?", 1]]),
    st("Should this be a field on a school club sign-up form?", ["Useful field", "Not needed"], [["Name", 0], ["Class", 0], ["Which club", 0], ["Favourite cloud shape", 1], ["Shoe size", 1], ["Home password", 1]]),
  ],
  builds: ["A survey asks people the same questions.", "A data logger saves readings over time.", "Plan your question before collecting data."],
  orders: [
    od("Put the steps of a data project in order.", ["Choose a question to answer", "Decide what data to collect", "Collect the data", "Look for patterns in the data"]),
  ],
  scenes: [
    ...times(6, () => (rng) => {
      const counts = TALLY.map(() => int(rng, 2, 14)); const i = int(rng, 0, 3);
      return numberPick(rng, `A tally of favourite pets: ${TALLY.map((p, k) => `${p} ${counts[k]}`).join(", ")}. How many more votes did ${TALLY[i]} get than the pet with the fewest?`, counts[i] - Math.min(...counts));
    }),
  ],
  gens: {
    4: [
      ...times(4, () => (rng) => { const counts = TALLY.map(() => int(rng, 3, 20)); return nm(`A survey result: ${TALLY.map((p, k) => `${p} ${counts[k]}`).join(", ")}. How many people answered altogether?`, counts.reduce((a, b) => a + b, 0)); }),
      ...times(4, () => (rng) => { const per = int(rng, 2, 6); const hours = int(rng, 3, 8); return nm(`A data logger saves ${per} readings every hour. How many readings after ${hours} hours?`, per * hours); }),
    ],
  },
});

/* ====================================================================
   Databases and spreadsheets
   ==================================================================== */
const PUPILS = ["Amir", "Bea", "Cal", "Dina", "Eli", "Fay", "Gus", "Hana"];
const CLUBS = ["chess", "football", "art"];
function pupilTable(rng, size = 6) {
  return shuffle(rng, PUPILS).slice(0, size).map((name) => ({ name, club: pick(rng, CLUBS), score: int(rng, 1, 20) }));
}
const pupilLines = (rows) => tableOf("Club database", ["Name", "Club", "Points"], rows.map((r) => [r.name, r.club, String(r.score)]));

export const databases = {
  rule: "A database stores records. Each record has the same fields, such as name and score. You can sort records, filter them to show only the ones you want, and use a spreadsheet formula such as =SUM(B2:B4) to calculate.",
  hint: "Read the field you need in every record. Filter keeps only the records that match; sort puts them in order.",
  levels: {
    1: [
      ...times(6, () => (rng) => { const rows = pupilTable(rng); const club = pick(rng, CLUBS); return numberPick(rng, `Filter the database to show only the ${club} club. How many records are left?`, rows.filter((r) => r.club === club).length, pupilLines(rows)); }),
      ch("What is a **record** in a database?", "All the information about one thing, such as one pupil", ["One letter in a name", "The whole computer", "A chart of the data"]),
      ch("What does a **filter** do?", "Shows only the records that match a rule", ["Deletes the whole database", "Adds up every number", "Changes the field names"]),
      ch("In a spreadsheet, what is the cell B3?", "Column B, row 3", ["Row B, column 3", "The third sheet", "Box number 23"]),
      ch("What does =SUM(A1:A4) do?", "Adds up the cells A1, A2, A3 and A4", ["Multiplies A1 by 4", "Counts the letters in A1", "Sorts column A"]),
    ],
    2: [
      ...times(6, () => (rng) => { const rows = pupilTable(rng); const top = [...rows].sort((a, b) => b.score - a.score); if (top[0].score === top[1].score) return null; return ch("Sort by points, highest first. Who is at the top?", top[0].name, rows.filter((r) => r.name !== top[0].name).slice(0, 3).map((r) => r.name), pupilLines(rows)); }),
      ...times(6, () => (rng) => { const rows = pupilTable(rng); const k = int(rng, 6, 14); return numberPick(rng, `Filter: points more than ${k}. How many records match?`, rows.filter((r) => r.score > k).length, pupilLines(rows)); }),
      ...times(4, () => (rng) => { const v = [int(rng, 2, 20), int(rng, 2, 20), int(rng, 2, 20)]; return numberPick(rng, `A2 is ${v[0]}, A3 is ${v[1]} and A4 is ${v[2]}. What does =SUM(A2:A4) show?`, v[0] + v[1] + v[2]); }),
    ],
    3: [
      ...times(4, () => (rng) => { const rows = pupilTable(rng, 5); const sorted = [...rows].sort((a, b) => a.score - b.score); if (new Set(rows.map((r) => r.score)).size < 5) return null; return od(`Sort the records by points, lowest first. Points: ${rows.map((r) => `${r.name} ${r.score}`).join(", ")}.`, sorted.map((r) => r.name)); }),
      st("Is it a field name or a value stored in a record?", ["Field name", "Value"], [["Name", 0], ["Club", 0], ["Points", 0], ["Bea", 1], ["chess", 1], ["14", 1]]),
      st("Is it a formula or a value?", ["Formula", "Value"], [["=SUM(A1:A3)", 0], ["=B2*C2", 0], ["=AVERAGE(A1:A4)", 0], ["12", 1], ["chess", 1], ["Bea", 1]]),
      od("Put the steps in order to add up a column in a spreadsheet.", ["Click an empty cell", "Type =SUM(", "Choose the cells to add", "Press Enter"]),
      od("Put the steps in order to find who scored most in chess.", ["Open the club database", "Filter to show only chess", "Sort by points, highest first", "Read the top record"]),
      ...times(4, () => (rng) => { const club = pick(rng, CLUBS); const rows = pupilTable(rng, 7); if (!rows.some((r) => r.club === club) || rows.every((r) => r.club === club)) return null; return st(`Filter: club is ${club}. Which records stay?`, ["Stays", "Hidden"], rows.map((r) => [`${r.name}, ${r.club}`, r.club === club ? 0 : 1])); }),
    ],
    4: [
      ...times(5, () => (rng) => { const rows = pupilTable(rng); const club = pick(rng, CLUBS); return nm(`What is the total of the points for the ${club} club?`, rows.filter((r) => r.club === club).reduce((s, r) => s + r.score, 0), pupilLines(rows)); }),
      ...times(5, () => (rng) => { const a = int(rng, 2, 12); const b = int(rng, 2, 9); return nm(`B2 holds ${a} and C2 holds ${b}. What does =B2*C2 show?`, a * b); }),
      ...times(5, () => (rng) => { const v = Array.from({ length: 4 }, () => int(rng, 1, 10) * 2); const sum = v.reduce((x, y) => x + y, 0); if (sum % 4 !== 0) return null; return nm(`A1 to A4 hold ${v.join(", ")}. What does =AVERAGE(A1:A4) show?`, sum / 4); }),
    ],
  },
};

/* ====================================================================
   Presenting data
   ==================================================================== */
export const presenting = termTopic({
  subject: "presenting data",
  rule: "Choose a chart that fits the data. A bar chart compares groups. A line graph shows how something changes over time. A pie chart shows parts of a whole. Check the scale: a chart can mislead if its axis does not start at zero.",
  hint: "Ask what the data is about: groups, change over time, or parts of a whole?",
  terms: [
    ["bar chart", "a chart that compares amounts for different groups"], ["line graph", "a chart that shows how something changes over time"],
    ["pie chart", "a circle split into parts of a whole"], ["axis", "the line along the side or bottom of a chart with the scale"],
    ["scale", "the numbers along an axis that show the size of each step"], ["title", "the words that tell you what a chart is about"],
    ["misleading", "giving the wrong idea even if the numbers are true"],
  ],
  facts: [
    ch("Which chart is best to show a puppy's weight every month for a year?", "A line graph", ["A pie chart", "A tally", "A list of names"]),
    ch("Which chart is best to compare how many pupils chose each sport?", "A bar chart", ["A line graph", "A map", "A clock"]),
    ch("Which chart is best to show how a class's pocket money is split into saving, spending and giving?", "A pie chart", ["A line graph", "A timeline", "A tally"]),
    ch("A bar chart's axis starts at 90, not 0. What could go wrong?", "Small differences look huge", ["Nothing at all", "The bars disappear", "The colours change"]),
  ],
  sorts: [
    st("Which chart fits best?", ["Bar chart", "Line graph"], [["Favourite colours in a class", 0], ["Pets owned by each class", 0], ["Goals scored by each team", 0], ["Temperature every hour today", 1], ["A plant's height each week", 1], ["Visitors to a website each day", 1]]),
    st("Is the chart honest or misleading?", ["Honest", "Misleading"], [["Axis starts at 0", 0], ["Every bar has a label", 0], ["Clear title and scale", 0], ["Axis starts at 95", 1], ["No scale on the axis", 1], ["Bars of different widths for no reason", 1]]),
  ],
  builds: ["A line graph shows change over time.", "A bar chart compares different groups.", "Every chart needs a clear title."],
  orders: [
    od("Put the steps for making a chart in order.", ["Collect the data", "Choose the right type of chart", "Draw the axes and scale", "Add a title and labels"]),
  ],
  scenes: [
    ...times(6, () => (rng) => { const scale = pick(rng, [2, 5, 10]); const squares = int(rng, 2, 9); return ch(`On a bar chart each square is worth ${scale}. A bar is ${squares} squares tall. What does it show?`, String(scale * squares), nearNumbers(rng, scale * squares, 3, 0)); }),
  ],
  gens: {
    4: [
      ...times(4, () => (rng) => { const a = int(rng, 10, 60); const b = int(rng, 10, 60); return nm(`A bar chart shows Monday ${a} visitors and Tuesday ${b}. What is the difference?`, Math.abs(a - b)); }),
      ...times(4, () => (rng) => { const half = int(rng, 6, 20) * 2; return nm(`A pie chart of ${half} pupils shows half chose football. How many pupils chose football?`, half / 2); }),
    ],
  },
});
