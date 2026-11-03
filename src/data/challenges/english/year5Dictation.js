import { bareWord, sample, shuffle, tokenise } from "./shared.js";
/** Dictation: docs/curriculum/year-5-and-6-english.md, Year 5 mapping. Sentences use Year 5 words and punctuation. */
export const BANK = [
  {"text": "Leo asked whether the restaurant was open.", "key": "restaurant", "swap": ["restaurant", "restarant"]},
  {"text": "Amara (who loves science) won the competition.", "key": "competition", "swap": ["competition", "compitition"]},
  {"text": "The government announced a new programme for schools.", "key": "government", "swap": ["government", "goverment"]},
  {"text": "Priya’s answer was definitely correct.", "key": "definitely", "swap": ["definitely", "definately"]},
  {"text": "Zayn, who is very determined, finished the marvellous model.", "context": "Zayn built a model.", "key": "marvellous", "swap": ["marvellous", "marvelus"]},
  {"text": "Ellie felt embarrassed when she dropped the tray.", "key": "embarrassed", "swap": ["embarrassed", "embarassed"]},
  {"text": "Our neighbour, who works at the hospital, waved to us.", "key": "neighbour", "swap": ["neighbour", "nieghbour"]},
  {"text": "After that, the explorers found the ancient temple.", "key": "ancient", "swap": ["ancient", "ancent"]},
  {"text": "Leo asked politely, “Could you suggest a good book?”", "key": "suggest", "swap": ["suggest", "sugest"]},
  {"text": "The vegetable soup, which was hot, smelt delicious.", "key": "vegetable", "swap": ["vegetable", "vegtable"]},
  {"text": "The thunder and lightning frightened Biscuit.", "key": "lightning", "swap": ["lightning", "lightening"]},
  {"text": "Priya used a dictionary to check the pronunciation.", "key": "pronunciation", "swap": ["pronunciation", "pronounciation"]},
  {"text": "The boy who won the race is my cousin.", "key": "cousin", "swap": ["cousin", "cuzin"]},
  {"text": "Amara’s excellent report was shown to the whole community.", "key": "community", "swap": ["community", "comunity"]},
  {"text": "Mum said, “You must be sincere when you apologise.”", "key": "sincere", "swap": ["sincere", "sincear"]},
  {"text": "The team’s achievement — a gold medal — made everyone proud.", "key": "achievement", "swap": ["achievement", "acheivement"]},
  {"text": "It was a bright morning; the sunshine felt wonderful.", "key": "wonderful", "swap": ["wonderful", "wonderfull"]},
  {"text": "Ellie’s cat, which is called Pepper, caught a mouse.", "key": "caught", "swap": ["caught", "cought"]},
];
// Words (with inner apostrophes or hyphens), then single punctuation marks, each its own tile.
const parts = (text) => text.match(/[A-Za-z]+(?:[’'-][A-Za-z]+)*[’']?|[“”,.!?;:()–—]/g);
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
