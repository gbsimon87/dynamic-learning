import { sample, shuffle } from "./shared.js";
import { choiceQuestion, hintedWith } from "./readingKit.js";
export const RHYMES = [
  [
    "cat",
    "hat",
    "cup",
    "dog"
  ],
  [
    "tree",
    "bee",
    "boat",
    "bird"
  ],
  [
    "night",
    "light",
    "leaf",
    "rain"
  ],
  [
    "boat",
    "coat",
    "boot",
    "fish"
  ],
  [
    "rain",
    "train",
    "tree",
    "ring"
  ],
  [
    "star",
    "car",
    "sun",
    "storm"
  ],
  [
    "mouse",
    "house",
    "moon",
    "moss"
  ],
  [
    "cake",
    "lake",
    "cook",
    "kite"
  ],
  [
    "blue",
    "shoe",
    "black",
    "bird"
  ],
  [
    "day",
    "play",
    "door",
    "dog"
  ],
  [
    "bear",
    "chair",
    "book",
    "bee"
  ],
  [
    "fox",
    "box",
    "fish",
    "foot"
  ],
  [
    "moon",
    "spoon",
    "mouse",
    "mountain"
  ],
  [
    "king",
    "ring",
    "cat",
    "clock"
  ],
  [
    "snow",
    "glow",
    "sun",
    "sand"
  ]
];
export const POEMS = [
  {
    "title": "The Kite",
    "lines": [
      "A red kite glows above the park,",
      "Its tail a streak against the dark.",
      "Its paper wings against the sky,",
      "A dancing dot that catches my eye."
    ],
    "form": "rhyming poem",
    "summary": "A red kite against the evening sky"
  },
  {
    "title": "The Window",
    "lines": [
      "Rain beads on the glass.",
      "Priya traces a winding path",
      "with one quiet finger."
    ],
    "form": "free verse",
    "summary": "Rain on a window"
  },
  {
    "title": "The Lost Sock",
    "lines": [
      "Biscuit stole a sock at dawn.",
      "Ellie followed him outside.",
      "She found it underneath a rose",
      "and carried it back home."
    ],
    "form": "narrative poem",
    "summary": "Biscuit steals a sock and Ellie finds it"
  },
  {
    "title": "The Bee",
    "lines": [
      "A busy bee flew past my knee,",
      "Then settled in the apple tree."
    ],
    "form": "rhyming poem",
    "summary": "A bee settling in a tree"
  },
  {
    "title": "Leaves",
    "lines": [
      "Amara lifts a leaf.",
      "Green veins spread out",
      "like roads on a tiny map."
    ],
    "form": "free verse",
    "summary": "The patterns in a leaf"
  },
  {
    "title": "The Boat",
    "lines": [
      "Zayn folded a boat from paper.",
      "He set it on the pond.",
      "It sailed past the reeds",
      "until Leo caught it."
    ],
    "form": "narrative poem",
    "summary": "Zayn’s paper boat crosses a pond"
  },
  {
    "title": "The Cat",
    "lines": [
      "The sleepy cat lay on the mat,",
      "Beside a bright red woolly hat."
    ],
    "form": "rhyming poem",
    "summary": "A cat sleeping beside a hat"
  },
  {
    "title": "Morning",
    "lines": [
      "The curtain moves.",
      "A stripe of sunlight",
      "rests on Ellie’s pillow."
    ],
    "form": "free verse",
    "summary": "Sunlight reaching a pillow"
  },
  {
    "title": "The Seed",
    "lines": [
      "Priya planted a seed.",
      "Each morning she watered the pot.",
      "One day a tiny shoot appeared.",
      "She carried it into the light."
    ],
    "form": "narrative poem",
    "summary": "Priya plants a seed and watches it grow"
  },
  {
    "title": "Snow",
    "lines": [
      "The snow is white, the stars are bright,",
      "The garden glows beneath the night."
    ],
    "form": "rhyming poem",
    "summary": "A snowy garden under stars"
  },
  {
    "title": "The Station",
    "lines": [
      "Leo stands beside the tracks.",
      "A rumble fills the platform.",
      "Warm air brushes his face."
    ],
    "form": "free verse",
    "summary": "Sounds and air at a station"
  },
  {
    "title": "The Hill",
    "lines": [
      "Amara packed a picnic.",
      "She climbed the hill with Gran.",
      "At the top they shared the bread",
      "and walked back down together."
    ],
    "form": "narrative poem",
    "summary": "Amara and Gran share a picnic on a hill"
  },
  {
    "title": "The Stream",
    "lines": [
      "A little stream runs past the green,",
      "The clearest water ever seen."
    ],
    "form": "rhyming poem",
    "summary": "A stream running past the green"
  },
  {
    "title": "Sand",
    "lines": [
      "Zayn holds a shell.",
      "The sea murmurs inside it.",
      "Sand sticks to his thumb."
    ],
    "form": "free verse",
    "summary": "Zayn holds a shell at the seaside"
  },
  {
    "title": "The Card",
    "lines": [
      "Ellie made a card for Mum.",
      "She painted flowers on the front.",
      "She left it by the kitchen door.",
      "Mum found it and smiled."
    ],
    "form": "narrative poem",
    "summary": "Ellie makes a card and Mum finds it"
  }
];
const FORMS = ["rhyming poem", "free verse", "narrative poem"];
export function buildPoetryFormsQuestions(level, rng) {
  if (level === 1) return sample(RHYMES, 5, rng).map(([word, answer, ...wrong]) => {
    const tokens = shuffle([answer, ...wrong], rng);
    const index = tokens.indexOf(answer);
    return { kind: "pick", prompt: `Tap the word that rhymes with ${word}.`, tokens, answer: index,
      hinted: hintedWith(index, [0, 1, 2], rng), hint: "Say both words. Listen to their endings." };
  });
  if (level === 2) return sample(POEMS, 5, rng).map((poem) => ({ kind: "sort",
    prompt: "Sort the clues: rhyming poem or free verse?",
    bins: [{ id: "rhyme", label: "Rhyming poem" }, { id: "free", label: "Free verse" }],
    cards: shuffle([
      { id: "a", label: "End words follow a rhyme pattern.", bin: "rhyme" },
      { id: "b", label: RHYMES[POEMS.indexOf(poem)][0] + " / " + RHYMES[POEMS.indexOf(poem)][1], bin: "rhyme" },
      { id: "c", label: "Lines do not follow a regular rhyme pattern.", bin: "free" },
      { id: "d", label: "The poet chooses line lengths freely.", bin: "free" }
    ], rng), hint: "Read the end words aloud. A rhyme has the same ending sound." }));
  if (level === 3) return sample(POEMS, 5, rng).map((poem) => choiceQuestion({
    passage: { title: poem.title, blocks: poem.lines.map((text) => ({ type: "line", text })) },
    prompt: "Choose narrative poem for events in order; otherwise choose rhyming poem or free verse.", answer: poem.form,
    wrong: FORMS.filter((form) => form !== poem.form),
    hint: "Look for a rhyme pattern, or a sequence of events that tells a story.", rng }));
  if (level === 4) {
    const poem = sample(POEMS, 1, rng)[0];
    const passage = { title: poem.title, blocks: poem.lines.map((text) => ({ type: "line", text })) };
    return [
      choiceQuestion({ passage, prompt: "Choose narrative poem for events in order; otherwise choose rhyming poem or free verse.", answer: poem.form,
        wrong: FORMS.filter((form) => form !== poem.form), hint: "Think about its sounds and whether it tells a story.", rng }),
      choiceQuestion({ passage, prompt: "Which feature supports your choice of form?", answer: {
        "rhyming poem": "The end words follow a rhyme pattern.",
        "free verse": "The lines capture a moment without a regular rhyme pattern.",
        "narrative poem": "The lines tell events in order."
      }[poem.form], wrong: Object.entries({
        "rhyming poem": "The end words follow a rhyme pattern.",
        "free verse": "The lines capture a moment without a regular rhyme pattern.",
        "narrative poem": "The lines tell events in order."
      }).filter(([form]) => form !== poem.form).map(([, description]) => description),
        hint: "Check what happens in the lines and listen to their endings.", rng }),
      choiceQuestion({ passage, prompt: "Which short summary matches the poem?", answer: poem.summary,
        wrong: sample(POEMS.filter((p) => p !== poem), 2, rng).map((p) => p.summary),
        hint: "Read every line and think about the whole poem.", rng })
    ];
  }
  throw new Error(`no poetry forms level ${level}`);
}
