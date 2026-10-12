// A small, valid Year 1 topic for the engine and component tests. Not shipped:
// nothing in the app imports it.
const story = { lines: ["Grandparents had wooden trains.", "Today some trains use an app."], picture: "🚂", pictureLabel: "a toy train" };
const sourceStory = { lines: ["This photo is very, very old."], image: "cma-child-with-drum" };

const choices = [
  { type: "choice", prompt: "What were old trains made of?", answer: "wood", wrong: ["glass", "paper"], answeredBy: "wooden trains", hint: "Look at Bix's story." },
  { type: "choice", prompt: "Who had wooden trains?", answer: "grandparents", wrong: ["babies", "robots"], answeredBy: "Grandparents had" },
  { type: "choice", prompt: "What can some trains use today?", answer: "an app", wrong: ["coal", "a candle"], answeredBy: "use an app" },
  { type: "choice", prompt: "When do some trains use an app?", answer: "today", wrong: ["long ago", "never"], answeredBy: "Today" },
];
const sorts = [{
  type: "sort", prompt: "Long ago or today?",
  bins: [{ id: "then", label: "Long ago" }, { id: "now", label: "Today" }],
  cards: [["wooden train", "then"], ["train with an app", "now"]],
  answeredBy: ["wooden trains", "use an app"],
}];
const orders = [{ type: "order", prompt: "Put them in order, oldest first.", labels: ["wooden train", "train with an app"], answeredBy: ["wooden trains", "use an app"] }];
const photo = [
  { type: "choice", prompt: "What is the child holding?", answer: "a drum", wrong: ["a ball", "a kite"], answeredBy: "holding a drum", visual: { type: "source", image: "cma-child-with-drum" } },
  { type: "choice", prompt: "How many drumsticks are there?", answer: "two", wrong: ["one", "five"], answeredBy: "two drumsticks", visual: { type: "source", image: "cma-child-with-drum" } },
  { type: "choice", prompt: "Is this photo old or new?", answer: "very old", wrong: ["new", "made today"], answeredBy: "very old", visual: { type: "source", image: "cma-child-with-drum" } },
  { type: "choice", prompt: "What does this photo show?", answer: "a child", wrong: ["a dog", "a car"], answeredBy: "a child", visual: { type: "source", image: "cma-child-with-drum" } },
];
const sourceSorts = [{
  type: "sort", prompt: "What can you see in the photo?",
  bins: [{ id: "yes", label: "In the photo" }, { id: "no", label: "Not in the photo" }],
  cards: [["a drum", "yes"], ["drumsticks", "yes"], ["a tablet", "no"]],
  answeredBy: ["a drum", "drumsticks"], visual: { type: "source", image: "cma-child-with-drum" },
}];
const sourceOrders = [{
  type: "order", prompt: "Which came first?", labels: ["this photo", "you"],
  answeredBy: "very, very old", visual: { type: "source", image: "cma-child-with-drum" },
}];

export const HISTORY_TEST_TOPIC = {
  year: 1,
  references: ["Test fixture only."],
  levels: {
    1: { story, rounds: ["choices", "sorts", "choices", "orders"] },
    2: { story, rounds: ["orders", "choices", "sorts", "choices"] },
    3: { story: sourceStory, rounds: ["photo", "sourceSorts", "photo", "sourceOrders"] },
    4: { story, rounds: ["choices", "choices", "sorts", "orders"] },
  },
  banks: { choices, sorts, orders, photo, sourceSorts, sourceOrders },
};
