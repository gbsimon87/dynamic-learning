import { bareWord, sample, shuffle, tokenise } from "./shared.js";
export const BANK = [
  {
    "text": "Later that day, Leo visited the library.",
    "key": "library",
    "swap": [
      "library",
      "libary"
    ]
  },
  {
    "text": "Priya asked, “Where is my medicine?”",
    "key": "medicine",
    "swap": [
      "medicine",
      "medecine"
    ]
  },
  {
    "text": "The children’s favourite game was over.",
    "key": "children’s",
    "swap": [
      "children’s",
      "childrens’"
    ]
  },
  {
    "text": "Amara remembered the important question.",
    "key": "question",
    "swap": [
      "question",
      "queston"
    ]
  },
  {
    "text": "The girls’ coats were on the bench.",
    "context": "The coats belong to two girls.",
    "key": "girls’",
    "swap": [
      "girls’",
      "girl’s"
    ]
  },
  {
    "text": "Zayn wondered whether it would rain.",
    "key": "whether",
    "swap": [
      "whether",
      "weather"
    ]
  },
  {
    "text": "Ellie won a medal at the sports day.",
    "key": "medal",
    "swap": [
      "medal",
      "meddle"
    ]
  },
  {
    "text": "After breakfast, we walked through the park.",
    "key": "through",
    "swap": [
      "through",
      "throug"
    ]
  },
  {
    "text": "The narrow wooden bridge was beside the island.",
    "key": "island",
    "swap": [
      "island",
      "iland"
    ]
  },
  {
    "text": "This heavy blue bag is mine.",
    "key": "mine",
    "swap": [
      "mine",
      "min"
    ]
  },
  {
    "text": "We were surprised by the enormous model.",
    "key": "surprised",
    "swap": [
      "surprised",
      "suprised"
    ]
  },
  {
    "text": "The electrician checked the machine.",
    "key": "machine",
    "swap": [
      "machine",
      "mashine"
    ]
  },
  {
    "text": "Leo has written a very strange story.",
    "key": "strange",
    "swap": [
      "strange",
      "strainge"
    ]
  },
  {
    "text": "The women carried the boxes carefully.",
    "key": "women",
    "swap": [
      "women",
      "wimin"
    ]
  },
  {
    "text": "Priya said, “I accept your invitation.”",
    "key": "accept",
    "swap": [
      "accept",
      "except"
    ]
  },
  {
    "text": "The teacher made a difficult decision.",
    "key": "decision",
    "swap": [
      "decision",
      "decission"
    ]
  },
  {
    "text": "Before sunset, the neighbours came home.",
    "key": "neighbours",
    "swap": [
      "neighbours",
      "nieghbours"
    ]
  },
  {
    "text": "Zayn gently moved the fragile vase.",
    "key": "gently",
    "swap": [
      "gently",
      "gentlely"
    ]
  }
];
const parts = (text) => text.match(/[A-Za-z]+(?:[’'][A-Za-z]+|[’'])?|[“”,.!?]/g);
export function buildDictationQuestions(level, rng) {
  if (![1, 2, 3, 4].includes(level)) throw new Error(`no dictation level ${level}`);
  return sample(BANK, 5, rng).map((row) => {
    if (level === 1) {
      const slip = row.text[0].toLowerCase() + row.text.slice(1);
      const wrong = row.text.replace(row.swap[0], row.swap[1]);
      return { kind: "choose", text: row.text, context: row.context, answer: row.text, struck: slip, options: shuffle([row.text, slip, wrong], rng) };
    }
    if (level === 2) {
      const tokens = tokenise(row.text);
      const at = tokens.findIndex((token) => bareWord(token) === row.key);
      const token = tokens[at];
      const start = token.indexOf(row.key);
      const head = tokens.slice(0, at).join(" ");
      const tail = tokens.slice(at + 1).join(" ");
      return { kind: "type", text: row.text, context: row.context, answer: row.key,
        before: `${head}${head ? " " : ""}${token.slice(0, start)}`,
        after: `${token.slice(start + row.key.length)}${tail ? " " : ""}${tail}`,
        hint: row.key[0] + " _".repeat(row.key.length - 1) };
    }
    const answer = parts(row.text);
    const extra = [row.swap[1], ...[".", "?", "!"].filter((mark) => !answer.includes(mark))];
    if (level === 4) extra.push(answer[0].toLowerCase());
    return { kind: level === 3 ? "build" : "write", text: row.text, context: row.context, answer, swap: row.swap,
      tiles: shuffle([...answer, ...extra].map((label, i) => ({ id: String(i), label })), rng) };
  });
}
