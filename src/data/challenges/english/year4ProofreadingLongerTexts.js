import { bareWord, sample, shuffle } from "./shared.js";
import { choiceQuestion, hintedWith } from "./readingKit.js";
export const BANK = [
  {
    "title": "At the Library",
    "sentences": [
      "Priya walked to the libary with Amara after school.",
      "They returned the books they had borrowed and looked for something new to read.",
      "A librarian helped them find an interesting story about a missing map.",
      "Leo asked whether they could also borrow a book about island.",
      "The children carried their choices to the desk, where each book was checked.",
      "Amara thanked the librarian for her help.",
      "They all were ready to leave, but Zayn had one more question",
      "Outside, Ellie opened her bag and saw that her ticket had fell behind the books."
    ],
    "fixes": [
      {
        "wrong": "libary",
        "right": "library",
        "sentence": 0
      },
      {
        "wrong": "island",
        "right": "islands",
        "sentence": 3
      },
      {
        "wrong": "question",
        "right": "question.",
        "sentence": 6
      },
      {
        "wrong": "fell",
        "right": "fallen",
        "sentence": 7
      }
    ]
  },
  {
    "title": "The School Garden",
    "sentences": [
      "Zayn brought three small pots to the garden and set them on a bench.",
      "Amara had promised to help him plant seeds before the afternoon lesson.",
      "They counted the seeds and read the instructions on each packet.",
      "Priya noticed that one pot had a hole in the botom.",
      "The hole would let extra water escape, so they left it uncovered.",
      "Leo filled the pots with soil and made a shallow space for each seed.",
      "The children put a seperate label beside each plant.",
      "Before returning to class, Ellie checked that the tools was safely put away.",
      "They planned to visit the garden again next week"
    ],
    "fixes": [
      {
        "wrong": "botom",
        "right": "bottom",
        "sentence": 3
      },
      {
        "wrong": "seperate",
        "right": "separate",
        "sentence": 6
      },
      {
        "wrong": "was",
        "right": "were",
        "sentence": 7
      },
      {
        "wrong": "week",
        "right": "week.",
        "sentence": 8
      }
    ]
  },
  {
    "title": "The Model Show",
    "sentences": [
      "Leo carried his model bridge into the school hall with both hands.",
      "He had worked on it for several evenings and wanted it to arrive safely.",
      "Priya placed her model island on the table beside his bridge.",
      "Zayn’s rocket was nearly ready, but he needed one final piece.",
      "Amara offered to help him look through the box of spare parts.",
      "Ellie found the right part and gave it to Zayn, who thanked her.",
      "When the doors opened, the childrens’ families came to see the models.",
      "Everyone was suprised by how much the class had made.",
      "The teacher said the models was wonderful",
      "Leo smiled and carefully placed his bridge back in its box."
    ],
    "fixes": [
      {
        "wrong": "childrens’",
        "right": "children’s",
        "sentence": 6
      },
      {
        "wrong": "suprised",
        "right": "surprised",
        "sentence": 7
      },
      {
        "wrong": "was",
        "right": "were",
        "sentence": 8
      },
      {
        "wrong": "wonderful",
        "right": "wonderful.",
        "sentence": 8
      }
    ]
  }
];
const slips = {
  library: "librery", islands: "island’s", "question.": "question,", fallen: "falled",
  bottom: "bottem", separate: "seperrate", were: "is", "week.": "week,",
  "children’s": "childrens", surprised: "surprized", "wonderful.": "wonderful,"
};
function category(fix) { return fix.right.endsWith(".") ? "end punctuation" : ["were", "fallen"].includes(fix.right) ? "verb form" : fix.right === "islands" ? "noun form" : "spelling or apostrophe"; }
export function buildProofreadingLongerTextsQuestions(level, rng) {
  if (![1, 2, 3, 4].includes(level)) throw new Error(`no proofreading level ${level}`);
  const [set] = sample(BANK, 1, rng);
  const passage = { title: set.title, blocks: [
    { type: "p", text: set.sentences.slice(0, 4).join(" ") },
    { type: "p", text: set.sentences.slice(4).join(" ") }
  ] };
  return set.fixes.map((fix) => {
    const sentence = set.sentences[fix.sentence];
    const hint = "Check the highlighted sentence. Look at each letter, the verb form and the end mark.";
    if (level === 2) return { kind: "sort", prompt: "Sort the sentences: correct or needs fixing?",
      bins: [{ id: "right", label: "Correct" }, { id: "wrong", label: "Needs fixing" }],
      cards: shuffle([
        ...set.sentences.filter((_, index) => !set.fixes.some((f) => f.sentence === index)).slice(0, 2)
          .map((label, index) => ({ id: `r${index}`, label, bin: "right" })),
        ...sample(set.fixes.filter((f, index) => set.fixes.findIndex((other) => other.sentence === f.sentence) === index), 2, rng).map((f, index) => ({ id: `w${index}`, label: set.sentences[f.sentence], bin: "wrong" }))
      ], rng), hint: "Two sentences need fixing. Check spelling, agreement and end punctuation." };
    if (level === 3) {
      const tokens = sentence.split(" ");
      const answer = tokens.findIndex((token) => bareWord(token) === bareWord(fix.wrong));
      return { kind: "pick", tokens, answer, prompt: `Tap the word with an error in its ${category(fix)}.`,
        hinted: hintedWith(answer, tokens.map((_, i) => i), rng),
        hint: "Compare the underlined words. Which one needs fixing for the check named in the question?" };
    }
    return choiceQuestion({ passage: level === 4 ? passage : undefined, text: level === 1 ? sentence : undefined,
      prompt: `In “${sentence}”, which change fixes the ${category(fix)} error?`,
      answer: fix.right, wrong: [fix.wrong, slips[fix.right]],
      para: [fix.sentence < 4 ? 0 : 1], hint, rng });
  });
}
