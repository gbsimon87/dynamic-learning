// Year 1 History, School Then and Now (docs/curriculum/key-stage-1-history.md,
// "changes within living memory"; docs/history-curriculum/year-1-design-spec.md).
// Every template names the words on its story card that answer it.
// Some things are the same (reading, writing, playtime, teachers), and school
// milk still exists for young children, so it is never called "then only".

/* ---------- Level 1: Meet it ---------- */
const meetStory = {
  lines: [
    "When grandparents were little, they went to school too.",
    "Teachers wrote with chalk on a blackboard.",
    "Children sat at desks in rows.",
    "Many children drank a small bottle of milk.",
  ],
  picture: "🏫", pictureLabel: "a school",
};
const facts = [
  { type: "choice", prompt: "What did teachers write with?", answer: "chalk", wrong: ["a tablet", "a paintbrush"], answeredBy: "wrote with chalk", hint: "Bix said teachers wrote with **chalk**." },
  { type: "choice", prompt: "What did teachers write on?", answer: "a blackboard", wrong: ["a tablet", "a phone"], answeredBy: "on a blackboard", hint: "Look for the word **board**." },
  { type: "choice", prompt: "Where did children sit?", answer: "at desks in rows", wrong: ["on the roof", "up a tree"], answeredBy: "sat at desks in rows", hint: "They sat at **desks**." },
  { type: "choice", prompt: "What did many children drink?", answer: "milk", wrong: ["cola", "coffee"], answeredBy: "bottle of milk", hint: "Look at Bix's last sentence." },
  { type: "choice", prompt: "Did grandparents go to school?", answer: "yes", wrong: ["no"], answeredBy: "they went to school too", hint: "Bix's first sentence tells you." },
  { type: "choice", prompt: "How big was the bottle of milk?", answer: "small", wrong: ["huge", "as big as a bucket"], answeredBy: "a small bottle of milk", hint: "It was a **small** bottle." },
];
const whoUsed = [{
  type: "sort", prompt: "Who used it? The teacher, or the children?",
  bins: [{ id: "teacher", label: "The teacher" }, { id: "children", label: "The children" }],
  cards: [["chalk", "teacher"], ["blackboard", "teacher"], ["desks in rows", "children"], ["small bottle of milk", "children"]],
  answeredBy: ["Teachers wrote with chalk on a blackboard", "Children sat at desks in rows", "Many children drank a small bottle of milk"],
  hint: "Teachers used chalk. Children sat at desks.",
}];

/* ---------- Level 2: Old or new? ---------- */
// Ordered by when each KIND of board became common in classrooms: chalk
// blackboards, then whiteboards with pens, then interactive whiteboards.
const boardStory = {
  lines: [
    "Classroom boards have changed over time.",
    "Long ago, teachers wrote on blackboards with chalk.",
    "Later, many schools had whiteboards and pens.",
    "Today many have boards that work like screens.",
  ],
  picture: "🧑‍🏫", pictureLabel: "a teacher at a board",
};
const oldNew = [
  { type: "choice", prompt: "Which kind of board is the oldest?", answer: "blackboard", wrong: ["whiteboard", "board like a screen"], answeredBy: "Long ago, teachers wrote on blackboards", hint: "Look for **long ago**." },
  { type: "choice", prompt: "Which kind of board is the newest?", answer: "board like a screen", wrong: ["blackboard", "whiteboard"], answeredBy: "Today many have boards that work like screens", hint: "Which one is from **today**?" },
  { type: "choice", prompt: "What did teachers use on blackboards?", answer: "chalk", wrong: ["paint", "a tablet"], answeredBy: "blackboards with chalk", hint: "Look for the word **chalk**." },
  { type: "choice", prompt: "What came after blackboards?", answer: "whiteboards", wrong: ["chalk", "desks"], answeredBy: "Later, many schools had whiteboards", hint: "Look for the word **later**." },
  { type: "choice", prompt: "Have classroom boards changed?", answer: "yes", wrong: ["no"], answeredBy: "boards have changed over time", hint: "Bix's first sentence tells you." },
];
const oldOrNew = [{
  type: "sort", prompt: "Is it the older kind, or the newer kind?",
  bins: [{ id: "old", label: "Older" }, { id: "new", label: "Newer" }],
  cards: [["blackboard", "old"], ["chalk", "old"], ["whiteboard", "new"], ["board like a screen", "new"]],
  answeredBy: ["Long ago, teachers wrote on blackboards with chalk", "Later, many schools had whiteboards", "boards that work like screens"],
  hint: "Blackboards and chalk came first.",
}];
const boardOrder = [
  { type: "order", prompt: "Put the boards in order. Oldest first.", labels: ["blackboard", "whiteboard", "board like a screen"], answeredBy: ["blackboards", "whiteboards", "work like screens"], hint: "Black, then white, then screen." },
  { type: "order", prompt: "Put the times in order. Oldest first.", labels: ["long ago", "later", "today"], answeredBy: ["Long ago", "Later", "Today"], hint: "Long ago first, today last." },
];

/* ---------- Level 3: Picture detective ---------- */
// No photo of a 1960s–70s classroom is available, so this level is about how
// we find out: memories, old photos and museum objects.
const detectiveStory = {
  lines: [
    "How do we know about schools long ago?",
    "Grandparents remember their own school days.",
    "Old school photos show children and teachers.",
    "Museums keep old desks, slates and books.",
  ],
  picture: "📷", pictureLabel: "a camera",
};
const detective = [
  { type: "choice", prompt: "Who remembers their own school days?", answer: "grandparents", wrong: ["new babies", "puppies"], answeredBy: "Grandparents remember", hint: "Look at Bix's second sentence." },
  { type: "choice", prompt: "What do old school photos show?", answer: "children and teachers", wrong: ["spaceships", "dinosaurs"], answeredBy: "show children and teachers", hint: "Look for the word **photos**." },
  { type: "choice", prompt: "Where can you see old school desks?", answer: "a museum", wrong: ["a swimming pool", "a bus stop"], answeredBy: "Museums keep old desks", hint: "Look at Bix's last sentence." },
  { type: "choice", prompt: "Can a photo tell us what the children were thinking?", answer: "no", wrong: ["yes"], answeredBy: "photos show children and teachers", hint: "A photo shows how people looked, not what they thought." },
  { type: "choice", prompt: "Can grandparents tell us about their school?", answer: "yes", wrong: ["no"], answeredBy: "remember their own school days", hint: "They **remember** their school days." },
  { type: "choice", prompt: "Which is a good way to learn about old schools?", answer: "ask grandparents", wrong: ["just guess", "watch a cartoon"], answeredBy: "Grandparents remember", hint: "Who **remembers** school long ago?" },
  { type: "choice", prompt: "Which old things do museums keep?", answer: "desks and books", wrong: ["today's tablets", "new phones"], answeredBy: "old desks, slates and books", hint: "Look at Bix's last sentence." },
];

/* ---------- Level 4: Same or different? ---------- */
const compareStory = {
  lines: [
    "Children still read, write and play at school.",
    "Teachers still help children learn.",
    "Then, many classrooms had desks in rows.",
    "Today many children also use computers and tablets.",
  ],
  picture: "📚", pictureLabel: "books",
};
const sameDifferent = [{
  type: "sort", prompt: "Is it the same as then, or different now?",
  bins: [{ id: "same", label: "Same as then" }, { id: "different", label: "Different now" }],
  cards: [["reading", "same"], ["writing", "same"], ["playtime", "same"], ["teachers help", "same"], ["using computers", "different"], ["using tablets", "different"]],
  answeredBy: ["still read, write and play", "Teachers still help", "also use computers and tablets"],
  hint: "Look for the word **still**. That means the same.",
}];
const compare = [
  { type: "choice", prompt: "What do children still do at school?", answer: "read and write", wrong: ["drive cars", "fly planes"], answeredBy: "still read, write and play", hint: "Look for the word **still**." },
  { type: "choice", prompt: "Do teachers still help children learn?", answer: "yes", wrong: ["no"], answeredBy: "Teachers still help children learn", hint: "Look at Bix's second sentence." },
  { type: "choice", prompt: "What do many children also use today?", answer: "computers and tablets", wrong: ["rocks", "leaves"], answeredBy: "use computers and tablets", hint: "Look at Bix's last sentence." },
  { type: "choice", prompt: "Playtime: same or different?", answer: "the same", wrong: ["different"], answeredBy: "still read, write and play", hint: "Children **still** play." },
  { type: "choice", prompt: "How were desks in many classrooms then?", answer: "in rows", wrong: ["on the ceiling", "in the playground"], answeredBy: "desks in rows", hint: "Look for the word **then**." },
  { type: "choice", prompt: "Using tablets at school: same or different?", answer: "different", wrong: ["the same"], answeredBy: "Today many children also use computers and tablets", hint: "Bix said **today**." },
];

export const schoolThenAndNow = {
  year: 1,
  references: [
    "BBC Bitesize KS1 History: schools in the past.",
    "UK Parliament, House of Commons Library: free school milk (third-pint bottles; still free for under-5s today).",
    "Science Museum Group collection: blackboards, chalk, school desks and classroom technology.",
    "Museum of Childhood (Young V&A) and the Ragged School Museum: old classrooms, desks and slates.",
  ],
  levels: {
    1: { story: meetStory, rounds: ["facts", "whoUsed", "facts", "facts"] },
    2: { story: boardStory, rounds: ["oldNew", "boardOrder", "oldOrNew", "boardOrder"] },
    3: { story: detectiveStory, rounds: ["detective", "detective", "detective", "detective"] },
    4: { story: compareStory, rounds: ["sameDifferent", "compare", "compare", "compare"] },
  },
  banks: { facts, whoUsed, oldNew, oldOrNew, boardOrder, detective, sameDifferent, compare },
};
