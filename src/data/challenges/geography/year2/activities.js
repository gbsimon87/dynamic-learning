const common = {
  materials: "paper, pencil and a grown-up",
  alternative: "Observe from a window with a grown-up, or use the example plan. Describe only the smaller area you can see.",
};
export const WEATHER_ACTIVITY = {
  ...common, summary: "With a grown-up: keep a weather log",
  question: "What weather can we see over five days?",
  steps: ["Choose the same safe observation place and time each day.", "Record the day and every weather type you notice.", "Use the same symbols each day. Count the days with rain.", "Describe your five days. Another week might be different."],
  paper: "Day / time / sunny / cloudy / rainy / windy. Tick every type seen.",
  present: "Draw a small pictogram. One picture stands for one day. Describe this record, not the whole climate.",
};
export const GROUNDS_ACTIVITY = {
  ...common, summary: "With a grown-up: observe familiar grounds",
  question: "Which human and physical features can we see?",
  steps: ["Choose school or home grounds with a grown-up.", "Stay together. Observe trees, paths and buildings from a suitable place.", "Tally selected features on paper. Record unsure when needed.", "Sketch their positions. Add a different symbol for each feature.", "Describe your map. It shows only the area you observed."],
  paper: "Feature / tally / position. Key: symbol / meaning.",
  present: "Share your paper map and explain its key to a grown-up.",
};
export const LOCAL_ACTIVITY = {
  ...common, summary: "With a grown-up: explore a familiar route",
  question: "How do the features at two observation points compare?",
  steps: ["Choose a familiar short route with a grown-up.", "Stay together. Observe roads and water from an appropriate place.", "At two points, tally the same features in similar viewing areas.", "Draw the route, landmarks and a key on paper.", "Compare your two points. Another route may show different features."],
  paper: "Point A / Point B; trees / buildings / paths. Route landmarks / key.",
  present: "Give two findings and explain what your small observation leaves out.",
};
export const MAP_ACTIVITY = {
  ...common, summary: "With a grown-up: draw your own simple map",
  question: "Can someone use your landmarks and key to follow a route?",
  steps: ["Look at a familiar small area together.", "Sketch the positions of three useful landmarks on paper.", "Invent one clear symbol for each feature. Add a key.", "Mark a start and finish. Describe the route to your grown-up."],
  paper: "Landmarks / positions / symbols / route start / route finish.",
  present: "Explain your original map. The screen practice does not mark drawing as done.",
};
