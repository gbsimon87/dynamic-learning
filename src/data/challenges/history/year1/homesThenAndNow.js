// Year 1 History, Homes Then and Now (docs/curriculum/key-stage-1-history.md,
// "changes within living memory"; docs/history-curriculum/year-1-design-spec.md).
// Every template names the words on its story card that answer it.
// Grandparents were children about the 1960s–70s: they had TVs, washing
// machines and cars, so this topic only compares what was common ("many").

/* ---------- Level 1: Meet it ---------- */
const meetStory = {
  lines: [
    "When grandparents were little, many homes had coal fires.",
    "Many had one TV with a few channels.",
    "There was no internet.",
    "Today many homes have internet and lots of screens.",
  ],
  picture: "🏠", pictureLabel: "a house",
};
const facts = [
  { type: "choice", prompt: "What kept many homes warm when grandparents were little?", answer: "a coal fire", wrong: ["a fridge", "a tablet"], answeredBy: "coal fires", hint: "Bix said many homes had **coal fires**." },
  { type: "choice", prompt: "How many TVs did many homes have?", answer: "one", wrong: ["ten", "twenty"], answeredBy: "one TV", hint: "Look for the word **TV**." },
  { type: "choice", prompt: "How many channels did the TV have?", answer: "a few", wrong: ["hundreds", "thousands"], answeredBy: "a few channels", hint: "It had **a few** channels." },
  { type: "choice", prompt: "Was there internet when grandparents were little?", answer: "no", wrong: ["yes"], answeredBy: "There was no internet", hint: "Bix said there was **no internet**." },
  { type: "choice", prompt: "What did many homes burn to keep warm?", answer: "coal", wrong: ["sand", "snow"], answeredBy: "coal fires", hint: "They had **coal** fires." },
  { type: "choice", prompt: "What do many homes have today?", answer: "lots of screens", wrong: ["no internet", "no TV at all"], answeredBy: "lots of screens", hint: "Look at Bix's last sentence." },
];
const thenOrNow = [{
  type: "sort", prompt: "Did Bix say grandparents' homes, or today?",
  bins: [{ id: "then", label: "When grandparents were little" }, { id: "now", label: "Today" }],
  cards: [["a coal fire", "then"], ["one TV", "then"], ["a few TV channels", "then"], ["the internet at home", "now"], ["lots of screens", "now"]],
  answeredBy: ["coal fires", "one TV with a few channels", "Today many homes have internet and lots of screens"],
  hint: "Grandparents: coal fires and one TV. Today: internet and lots of screens.",
}];

/* ---------- Level 2: Old or new? ---------- */
// Ordered by when each KIND of phone first appeared: phones with a cord,
// then mobile phones, then touch screen phones.
const phoneStory = {
  lines: [
    "Phones have changed a lot.",
    "When grandparents were little, phones had a cord.",
    "Later, people carried mobile phones.",
    "Today many phones have touch screens and cameras.",
  ],
  picture: "☎️", pictureLabel: "an old phone",
};
const oldNew = [
  { type: "choice", prompt: "Which kind of phone is the oldest?", answer: "phone with a cord", wrong: ["mobile phone", "touch screen phone"], answeredBy: "phones had a cord", hint: "Grandparents' phones had a **cord**." },
  { type: "choice", prompt: "Which kind of phone is the newest?", answer: "touch screen phone", wrong: ["phone with a cord", "first mobile phone"], answeredBy: "Today many phones have touch screens", hint: "Which one is from **today**?" },
  { type: "choice", prompt: "What did phones have when grandparents were little?", answer: "a cord", wrong: ["a touch screen", "a camera"], answeredBy: "phones had a cord", hint: "Look for the word **cord**." },
  { type: "choice", prompt: "What did people carry later?", answer: "mobile phones", wrong: ["coal fires", "big desks"], answeredBy: "carried mobile phones", hint: "Look for the word **later**." },
  { type: "choice", prompt: "Have phones changed?", answer: "yes", wrong: ["no"], answeredBy: "Phones have changed a lot", hint: "Bix's first sentence tells you." },
  { type: "choice", prompt: "What do many phones have today?", answer: "touch screens", wrong: ["a cord", "no screen"], answeredBy: "touch screens and cameras", hint: "Look at Bix's last sentence." },
];
const phoneOrder = [
  { type: "order", prompt: "Put the phones in order. Oldest first.", labels: ["phone with a cord", "first mobile phone", "touch screen phone"], answeredBy: ["phones had a cord", "mobile phones", "touch screens"], hint: "A cord, then mobile, then touch screen." },
  { type: "order", prompt: "Put the times in order. Oldest first.", labels: ["when grandparents were little", "later", "today"], answeredBy: ["When grandparents were little", "Later", "Today"], hint: "Grandparents first, today last." },
];

/* ---------- Level 3: Picture detective ---------- */
// No photo of a 1960s–70s home is available, so this level is about how we
// find out: memories, old photos, objects and museums.
const detectiveStory = {
  lines: [
    "How do we know about old homes?",
    "We can ask grandparents what they remember.",
    "We can look at old photos and objects.",
    "Museums keep old things for us to see.",
  ],
  picture: "👵", pictureLabel: "a grandma",
};
const detective = [
  { type: "choice", prompt: "Who can tell us about homes when they were little?", answer: "grandparents", wrong: ["new babies", "puppies"], answeredBy: "ask grandparents", hint: "Who can we **ask**?" },
  { type: "choice", prompt: "What can we look at to learn about old homes?", answer: "old photos", wrong: ["a new cartoon", "a weather map"], answeredBy: "old photos", hint: "Bix said we can look at **old photos**." },
  { type: "choice", prompt: "Where are old things kept for us to see?", answer: "a museum", wrong: ["a bin", "a car park"], answeredBy: "Museums keep old things", hint: "Look at Bix's last sentence." },
  { type: "choice", prompt: "When you ask grandparents, what do they tell you?", answer: "what they remember", wrong: ["tomorrow's weather", "a shopping list"], answeredBy: "what they remember", hint: "They tell you what they **remember**." },
  { type: "choice", prompt: "Can old objects help us learn about old homes?", answer: "yes", wrong: ["no"], answeredBy: "old photos and objects", hint: "Bix said we can look at **objects**." },
  { type: "choice", prompt: "Can an old photo tell us how a room smelled?", answer: "no", wrong: ["yes"], answeredBy: "old photos", hint: "A photo shows how things looked. It can't smell!" },
  { type: "choice", prompt: "Which is a good way to learn about old homes?", answer: "ask grandparents", wrong: ["just guess", "watch a cartoon"], answeredBy: "ask grandparents what they remember", hint: "Who can we **ask**?" },
];

/* ---------- Level 4: Same or different? ---------- */
// About a third of homes had central heating around 1970; nearly all do now.
const compareStory = {
  lines: [
    "Grandparents' homes had beds and kitchens too.",
    "Families ate meals together then and now.",
    "Then, many homes had no central heating.",
    "Now most homes have central heating and the internet.",
  ],
  picture: "🛋️", pictureLabel: "a sofa",
};
const sameDifferent = [{
  type: "sort", prompt: "Is it the same as then, or different now?",
  bins: [{ id: "same", label: "Same as then" }, { id: "different", label: "Different now" }],
  cards: [["homes have beds", "same"], ["homes have kitchens", "same"], ["families eat together", "same"], ["most homes have central heating", "different"], ["most homes have the internet", "different"]],
  answeredBy: ["beds and kitchens too", "together then and now", "Now most homes have central heating and the internet"],
  hint: "Beds, kitchens and meals together are the **same**.",
}];
const compare = [
  { type: "choice", prompt: "What is the same, then and now?", answer: "homes have beds", wrong: ["most homes have the internet", "most homes have central heating"], answeredBy: "beds and kitchens too", hint: "Grandparents' homes had **beds** too." },
  { type: "choice", prompt: "What did many homes not have then?", answer: "central heating", wrong: ["beds", "kitchens"], answeredBy: "many homes had no central heating", hint: "Look for the word **no**." },
  { type: "choice", prompt: "Do most homes have central heating now?", answer: "yes", wrong: ["no"], answeredBy: "Now most homes have central heating", hint: "Look at Bix's last sentence." },
  { type: "choice", prompt: "Did families eat meals together then?", answer: "yes", wrong: ["no"], answeredBy: "ate meals together then and now", hint: "Bix said **then and now**." },
  { type: "choice", prompt: "What do most homes have now?", answer: "the internet", wrong: ["no heating", "no kitchen"], answeredBy: "central heating and the internet", hint: "Look at Bix's last sentence." },
  { type: "choice", prompt: "Families eating together: same or different?", answer: "the same", wrong: ["different"], answeredBy: "together then and now", hint: "Bix said **then and now**." },
];

export const homesThenAndNow = {
  year: 1,
  references: [
    "BBC Bitesize KS1 History: homes in the past.",
    "Office for National Statistics, Social Trends: about a third of homes had central heating around 1970; most homes have it today.",
    "BBC history: three TV channels (BBC One, BBC Two, ITV) until Channel 4 in 1982.",
    "Science Museum Group collection: corded home telephones, early mobile phones and smartphones.",
  ],
  levels: {
    1: { story: meetStory, rounds: ["facts", "thenOrNow", "facts", "facts"] },
    2: { story: phoneStory, rounds: ["oldNew", "phoneOrder", "oldNew", "phoneOrder"] },
    3: { story: detectiveStory, rounds: ["detective", "detective", "detective", "detective"] },
    4: { story: compareStory, rounds: ["sameDifferent", "compare", "compare", "compare"] },
  },
  banks: { facts, thenOrNow, oldNew, phoneOrder, detective, sameDifferent, compare },
};
