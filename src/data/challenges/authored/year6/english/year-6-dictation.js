import { bareWord, sample, shuffle, tokenise } from "../../../english/shared.js";

/** Sentences use the Year 6 half of Appendix 1 and familiar punctuation. */
export const BANK = [
  { text: "The secretary signed the relevant document.", key: "secretary", swap: ["secretary", "secretery"] },
  { text: "Mina waited patiently in the queue.", key: "queue", swap: ["queue", "que"] },
  { text: "The scientist recorded the temperature carefully.", key: "temperature", swap: ["temperature", "temprature"] },
  { text: "Our neighbour recommended a new restaurant.", key: "recommended", swap: ["recommended", "reccomended"] },
  { text: "The soldier carried a heavy backpack.", key: "soldier", swap: ["soldier", "solider"] },
  { text: "A vehicle blocked the narrow road.", key: "vehicle", swap: ["vehicle", "vehical"] },
  { text: "Parliament discussed the proposal.", key: "parliament", swap: ["Parliament", "Parliment"] },
  { text: "The programme included a science quiz.", key: "programme", swap: ["programme", "program"] },
  { text: "The yacht moved slowly across the bay.", key: "yacht", swap: ["yacht", "yot"] },
  { text: "The musician kept a steady rhythm.", key: "rhythm", swap: ["rhythm", "rythm"] },
  { text: "Please give a sincere apology.", key: "sincere", swap: ["sincere", "sinceree"] },
  { text: "The reporter asked for a relevant comment.", key: "relevant", swap: ["relevant", "relevent"] },
  { text: "A strong shoulder helped lift the box.", key: "shoulder", swap: ["shoulder", "shouldar"] },
  { text: "The teacher suggested a different strategy.", key: "suggested", swap: ["suggested", "sugested"] },
  { text: "The storm caused sufficient damage.", key: "sufficient", swap: ["sufficient", "sufficent"] },
  { text: "The secretary wrote a clear signature.", key: "signature", swap: ["signature", "signiture"] },
  { text: "The team chose a variety of vegetables.", key: "variety", swap: ["variety", "varity"] },
].filter(({ text, key, swap }) => text.includes(key) && swap[0] !== swap[1]);

const parts = text => text.match(/[A-Za-z]+(?:[’'-][A-Za-z]+)*[’']?|[“”,.!?;:()–—]/g);

export function buildYear6Dictation(level, rng) {
  if (![1, 2, 3, 4].includes(level)) throw new Error(`no Year 6 dictation level ${level}`);
  return sample(BANK, 5, rng).map((row) => {
    if (level === 1) {
      const slip = row.text[0].toLowerCase() + row.text.slice(1);
      const wrong = row.text.replace(row.swap[0], row.swap[1]);
      return { kind: "choose", text: row.text, answer: row.text, struck: slip, options: shuffle([row.text, slip, wrong], rng) };
    }
    if (level === 2) {
      const tokens = tokenise(row.text);
      const at = tokens.findIndex(token => bareWord(token) === row.key);
      const token = tokens[at];
      const start = token.toLowerCase().indexOf(row.key);
      const head = tokens.slice(0, at).join(" ");
      const tail = tokens.slice(at + 1).join(" ");
      return { kind: "type", text: row.text, answer: row.key,
        before: `${head}${head ? " " : ""}${token.slice(0, start)}`,
        after: `${token.slice(start + row.key.length)}${tail ? " " : ""}${tail}`,
        hint: row.key[0] + " _".repeat(row.key.length - 1) };
    }
    const answer = parts(row.text);
    const extra = [row.swap[1], ...[".", "?", "!"].filter(mark => !answer.includes(mark))];
    if (level === 4) extra.push(answer[0].toLowerCase());
    return { kind: level === 3 ? "build" : "write", text: row.text, answer, swap: row.swap,
      tiles: shuffle([...answer, ...extra].map((label, i) => ({ id: String(i), label })), rng) };
  });
}
