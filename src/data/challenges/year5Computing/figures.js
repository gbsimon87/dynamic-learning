import { rule } from "../figures.js";

// Pictures for Year 5 Computing. A topic visual shows on the start screen and on level 1, so
// it only sets the scene and never shows an answer. Question rules draw the program, numbers
// or situation the question itself states: the blocks come straight from the question's own
// lines, so a picture can never disagree with the text.
const spread = (emojis) => {
  const n = emojis.length;
  const size = n === 1 ? 100 : n === 2 ? 86 : 72;
  const xs = n === 1 ? [200] : n === 2 ? [130, 270] : [90, 200, 310];
  return emojis.map((e, i) => [e, xs[i], 118, size]);
};
const scene = (alt, emojis, extra = {}) => ({ type: "scene", backdrop: "plain", alt, items: spread(emojis), caption: "", ...extra });
const counters = (icon, total, label) => ({ type: "counters", icon, total, label, alt: `${total} pictures in a row. ${label}.`, caption: label });

const isCode = (q) => q.passage?.kind === "code";
const title = (q) => q.passage?.title;
const lines = (q) => q.passage.blocks.map((b) => b.text);
const blocks = (q) => ({ type: "blocks", lines: lines(q), caption: title(q), alt: `${title(q)} drawn as command blocks, from the top block to the bottom block: ${lines(q).map((l) => l.trim()).join("; ")}.` });
const robot = () => ({ type: "robotGrid", alt: "A grid with the robot at the start square, which is (0, 0), facing north. The x numbers grow going east and the y numbers grow going north. The grid goes on in every direction.", caption: "The grid the robot moves on. It goes on past the edges, in every direction." });

const codeRule = rule((q) => isCode(q) && !["Robot program", "The pages", "The page"].includes(title(q)), blocks);
const robotRule = rule((q) => isCode(q) && title(q) === "Robot program", robot);

const STEPS = { toast: "🍞", "brushing teeth": "🪥", "crossing a road safely": "🚦", "watering a plant": "🪴", "making a cup of tea": "☕", "getting dressed": "👕", "planting a seed": "🌱", "making a paper plane": "✈️", "washing your hands": "🧼" };
const PROBLEMS = { "Plan a birthday party": "🎂", "Make a quiz game": "❓", "Make a robot draw a square": "🤖", "Write a story": "📖", "Make a school website": "🌐", "Run a bake sale": "🧁", "Design a game level": "🎮", "Set up a class library": "📚" };
const PARTS = [[/bake sale/, "🧁"], [/school poster/, "🖼️"], [/class party/, "🎉"], [/making a game/, "🎮"], [/robot square/, "🤖"], [/quiz game/, "❓"]];

const ifElse = (condition, yes, no) => ({ type: "flowchart", mode: "ifelse", condition, yes, no, alt: `A flow chart. The question is: ${condition}? If yes, the program says ${yes}. If no, it says ${no}.`, caption: "" });
const ioRow = { type: "flowchart", mode: "row", boxes: ["Input", "Computer", "Output"], alt: "A flow chart with three boxes joined by arrows: input, then computer, then output.", caption: "Information goes in, the computer works on it, and a result comes out." };

export const TOPIC_VISUALS = {
  "sequences-of-instructions": { type: "blocks", lines: ["forward 2", "turn right", "forward 1"], alt: "Three command blocks stacked in order: forward 2, turn right, forward 1.", caption: "Blocks run from the top to the bottom." },
  "repeat-loops": scene("A friendly robot and a pair of arrows going round in a circle.", ["🤖", "🔁"]),
  "if-and-else-decisions": scene("A traffic light and a thinking face.", ["🚦", "🤔"]),
  variables: scene("A game controller and a trophy.", ["🎮", "🏆"]),
  "inputs-and-outputs": scene("A laptop and a friendly robot.", ["💻", "🤖"]),
  "finding-and-fixing-bugs": scene("A ladybird bug under a magnifying glass.", ["🐞", "🔍"]),
  "breaking-problems-into-parts": scene("A jigsaw puzzle piece and a big picture.", ["🧩", "🖼️"]),
  "how-algorithms-work": scene("A checklist and a pencil.", ["📋", "✏️"]),
  "logic-with-and-or-and-not": scene("A thinking face and a magnifying glass.", ["🤔", "🔍"]),
  "computer-networks": scene("Three computers and a printer in a school.", ["💻", "💻", "🖨️"], { backdrop: "room" }),
  "how-data-travels": scene("A phone, a cloud and a laptop.", ["📱", "☁️", "💻"]),
  "the-internet-and-the-web": scene("The Earth and a laptop.", ["🌍", "💻"]),
  "using-search-engines": { type: "searchResults", query: "search for…", results: [], alt: "An empty search box with a magnifying glass, ready for some words.", caption: "A search box." },
  "how-results-are-ranked": scene("A golden trophy cup.", ["🏆"]),
  "judging-websites": scene("A magnifying glass over a web page.", ["🔍", "🌐"]),
  "keeping-information-safe": scene("A padlock and a shield.", ["🔒", "🛡️"]),
  "kind-and-responsible-online": scene("A speech bubble and a smiling face.", ["💬", "🙂"]),
};

const sceneRule = (when, alt, emojis, extra) => rule(when, scene(alt, emojis, extra));

export const FIGURE_RULES = {
  "sequences-of-instructions": [
    robotRule,
    codeRule,
    rule(/^Order the steps for (.+?)\./, (q, m) => (STEPS[m[1]] ? scene(`A picture for: ${m[1]}.`, [STEPS[m[1]]]) : null)),
    rule(/^Put the lines in order so the program says: (.+)$/, (q, m) => scene(`A robot says: ${m[1]}`, ["🤖"], { items: [["🤖", 110, 170, 70]], bubbles: [{ x: 250, y: 90, text: m[1], tail: "bl", max: 16 }] })),
  ],
  "repeat-loops": [
    codeRule,
    rule(/^Which program says (\w+) (\d+) times\?/, (q, m) => counters("💬", Number(m[2]), `${m[2]} times`)),
  ],
  "if-and-else-decisions": [
    rule(/^The program says "(.+?)" if (\w+) ([><=]) (\d+), and "(.+?)" if not/, (q, m) => ifElse(`${m[2]} ${m[3]} ${m[4]}`, m[1], m[5])),
    rule(/^Which number makes the program say "(.+?)"\?/, (q, m) => { const c = q.prompt.match(/if (\w+) ([><=]) (\d+)/); return c ? ifElse(`${c[1]} ${c[2]} ${c[3]}`, m[1], "something else") : null; }),
    codeRule,
  ],
  variables: [
    codeRule,
  ],
  "inputs-and-outputs": [
    rule(/^Is a \*\*(.+?)\*\* an input device or an output device\?/, ioRow),
    rule(/^Which of these is an? \*\*(input|output)\*\* device\?/, ioRow),
    codeRule,
  ],
  "finding-and-fixing-bugs": [
    codeRule,
  ],
  "breaking-problems-into-parts": [
    rule(/^Which is a smaller part of the problem \*\*(.+?)\*\*/, (q, m) => (PROBLEMS[m[1]] ? scene(`A picture for the big problem: ${m[1]}.`, [PROBLEMS[m[1]]]) : null)),
    rule(/^(?:Order|Put) the parts of (.+?)\.?$/, (q) => { const found = PARTS.find(([re]) => re.test(q.prompt)); return found ? scene("A picture of the project whose parts are being put in order.", [found[1]]) : null; }),
    rule(/^A class of (\d+) pupils works in groups of (\d+)/, (q, m) => counters("🧒", Number(m[1]), `${m[1]} pupils`)),
    rule(/^A project has (\d+) parts\. Each part takes (\d+) days/, (q, m) => counters("🧩", Number(m[1]), `${m[1]} parts, ${m[2]} days each`)),
  ],
  "how-algorithms-work": [
    codeRule,
    sceneRule(/^Put the steps in order to find the biggest number/, "A list of numbers on a page.", ["🔢"]),
    sceneRule(/^Put the steps in order for a number guessing game/, "A dice and a question mark for a guessing game.", ["🎲", "❓"]),
  ],
  "logic-with-and-or-and-not": [
    codeRule,
  ],
  "computer-networks": [
    rule(/^A switch has (\d+) ports\. (\d+) of them have cables plugged in/, (q, m) => ({ type: "ports", total: Number(m[1]), used: Number(m[2]), alt: `A switch with ${m[1]} ports. ${m[2]} of the ports have a cable plugged in, shown with a tick.`, caption: "" })),
    sceneRule(/^A school wants every classroom to share one printer/, "Three classrooms, each with a computer, and one printer that none of them is joined to yet.", ["💻", "💻", "🖨️"], { backdrop: "room" }),
    sceneRule(/^Your tablet shows a web page\. Which computer sent the page/, "A tablet showing a web page, and a question mark for the computer that sent it.", ["📱", "❓"]),
    rule(/^Which device passes data from the school network out to the internet/, { type: "network", ask: true, alt: "Computers in a school network are joined to a switch. A box with a question mark joins the switch to the internet cloud.", caption: "" }),
    sceneRule(/^Two classrooms need to share files/, "Two classrooms, each with a computer, that want to share files.", ["💻", "💻"], { backdrop: "room" }),
  ],
  "how-data-travels": [
    rule(/^A file of (\d+) KB is sent\. Each packet holds (\d+) KB/, (q, m) => ({ type: "packets", mode: "size", file: Number(m[1]), packet: Number(m[2]), alt: `A whole file of ${m[1]} KB, and one packet that holds ${m[2]} KB.`, caption: "" })),
    rule(/^Two packets from one message arrive in the wrong order/, { type: "packets", mode: "order", order: [2, 1], alt: "Two numbered packets in the order they arrived: packet 2 came first, then packet 1.", caption: "" }),
    sceneRule(/^Put these in order when you send a photo to a friend/, "A camera and a phone.", ["📷", "📱"]),
    sceneRule(/^Put these in order when you visit a website/, "A laptop showing a web page.", ["💻", "🌐"]),
  ],
  "the-internet-and-the-web": [
    sceneRule(/^Aisha sends an email to her aunt/, "A girl sends an email to her aunt.", ["📧", "👩"]),
    sceneRule(/^Jack reads a news page in his browser/, "A boy reads a news page on a laptop.", ["💻", "📰"]),
    sceneRule(/^A class edits one story together from different homes/, "Two homes with a story that everyone edits together.", ["🏠", "📝", "🏡"]),
    sceneRule(/^Maya wants to see her cousin live on a screen/, "A girl looking at a screen, wanting to see her cousin live.", ["🧒", "📺"]),
    sceneRule(/^A pupil puts a photo into a shared school album/, "A photo going into a shared school album.", ["📷", "🖼️"]),
    sceneRule(/^A pupil saves a worksheet from the school website/, "A worksheet on a school website.", ["🏫", "📄"]),
    sceneRule(/^Put these in order when you visit a website/, "A laptop showing a web page.", ["💻", "🌐"]),
  ],
  "using-search-engines": [
    rule(/^The search engine shows 10 results on each page/, { type: "searchResults", query: "volcanoes", note: "Results 1 to 10 are on page 1.", results: [], pager: true, alt: "A search results page. It says that results 1 to 10 are on page 1. Page numbers 1 to 5 are shown at the bottom.", caption: "" }),
    rule(/Which search is best\?$/, { type: "searchResults", query: "?", results: [], alt: "A search box with a question mark in it, waiting for the best words.", caption: "" }),
    rule(/^You search for 'dog' and get millions of results/, { type: "searchResults", query: "dog", results: [{ title: "Dog breeds" }, { title: "Dog films" }, { title: "Dog food and toys" }], alt: "A search for dog with a long list of results about many different things.", caption: "" }),
    rule(/^The search engine suggests words as you type/, { type: "searchResults", query: "how to dr", results: [{ title: "how to draw a cat" }, { title: "how to draw a dog" }, { title: "how to drive" }], alt: "A search box with the words how to dr typed in it and a list of suggested words underneath.", caption: "" }),
    sceneRule(/^You only want pictures of castles/, "A castle.", ["🏰"]),
  ],
  "how-results-are-ranked": [
    rule((q) => ["The pages", "The page"].includes(title(q)), (q) => ({ type: "searchResults", query: "your keywords", results: lines(q).map((l) => { const [name, rest = ""] = l.split(": "); return { title: name, snippet: rest }; }), alt: `A results page for a search. ${lines(q).join(". ")}.`, caption: "Each page and what it has." })),
    rule(/^A result has the word 'Sponsored' above it/, { type: "searchResults", query: "trainers", results: [{ title: "Super Trainers Shop", tag: "Sponsored", snippet: "Buy now" }, { title: "How trainers are made" }], alt: "A results page with two results. The first one has the word Sponsored on it.", caption: "" }),
    sceneRule(/^A new page has no links to it yet/, "A brand new web page with no links.", ["🆕", "📄"]),
  ],
  "judging-websites": [
    sceneRule(/^A website says a miracle cure works but gives no evidence and no author/, "A web page with a big claim and nobody named as the writer.", ["🌐", "❓"]),
    sceneRule(/^Two websites disagree about a fact/, "Two laptops that show different facts.", ["💻", "💻"]),
    sceneRule(/^A page for homework was last changed ten years ago/, "A calendar and a web page that was last changed ten years ago.", ["📅", "🌐"]),
    sceneRule(/^A page tries to sell you a product/, "A web page that tries to sell a product.", ["🛒", "🌐"]),
    sceneRule(/^A friend sends you a surprising claim online/, "A friend sends a surprising message to a phone.", ["📱", "💬"]),
  ],
  "keeping-information-safe": [
    sceneRule(/^Which password is the (strongest|best|weakest)|Which password is the best to choose/, "A padlock on a password box.", ["🔐"]),
    sceneRule(/^A game asks for your full name, address and school/, "A game asking for a name, an address and a school.", ["🎮", "📝"]),
    sceneRule(/^A message from someone you do not know asks for your home address/, "A message from a stranger on a phone.", ["📱", "✉️"]),
    sceneRule(/^A friend asks for your password so they can play your game/, "A friend who asks for a password to play a game.", ["🧒", "🔑"]),
    sceneRule(/^A pop-up says you have won a prize/, "A pop-up on a screen that says you have won a prize.", ["🖥️", "🎁"]),
    sceneRule(/^You think someone has found out your password/, "A worried face and a key.", ["😟", "🔑"]),
  ],
  "kind-and-responsible-online": [
    sceneRule(/^A classmate posts an unkind comment about your drawing/, "A drawing with an unkind comment under it.", ["🖼️", "💬"]),
    sceneRule(/^You want to use a picture from the internet in your project/, "A picture from the internet going into a school project.", ["🌐", "🖼️"]),
    sceneRule(/^A friend wants to post a photo of you/, "A friend with a camera, wanting to post a photo.", ["📷", "🧒"]),
    sceneRule(/^Someone online keeps sending you messages you do not like/, "A phone showing many messages.", ["📱", "💬"]),
    sceneRule(/^A pupil copies a whole web page into her homework/, "A web page being copied into a homework book.", ["🌐", "📓"]),
    sceneRule(/^Where can you find a report button/, "A flag for reporting something online.", ["🚩"]),
  ],
};
