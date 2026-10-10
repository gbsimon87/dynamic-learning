/**
 * On-screen maths text → what a British teacher would say out loud.
 *
 * Pure, so it is unit-tested with node:test. `ChallengeShell` runs every Maths
 * "Read it to me" through `mathToSpeech`; the browser voice reads symbols
 * badly ("6 × 5 = ?" comes out as "6 multiplication sign 5 equals question
 * mark") or not at all.
 *
 * Correctness beats cleverness: anything not recognised is left for the voice
 * rather than guessed at. In particular
 *   - clock times ("3:15", "19:15") are left alone, because voices read them
 *     well and "quarter past" would be a guess about how the child was taught;
 *   - an ASCII hyphen only becomes "minus" when spaced ("15 - 6") or in front
 *     of a lone number ("-5"), so "3-digit" and "seventy-five" survive;
 *   - a unit only expands straight after a number, so "m" in prose is safe.
 */

const NUMBER_WORDS = [
  "zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten",
  "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen",
  "eighteen", "nineteen", "twenty",
];

/** Denominator → [singular, plural]. Anything else is read "a over b". */
const FRACTION_NAMES = {
  2: ["half", "halves"],
  3: ["third", "thirds"],
  4: ["quarter", "quarters"],
  5: ["fifth", "fifths"],
  6: ["sixth", "sixths"],
  7: ["seventh", "sevenths"],
  8: ["eighth", "eighths"],
  9: ["ninth", "ninths"],
  10: ["tenth", "tenths"],
  11: ["eleventh", "elevenths"],
  12: ["twelfth", "twelfths"],
  100: ["hundredth", "hundredths"],
};

/** "Counting in 4s", "the 100s column". */
const PLURAL_NUMBERS = {
  1: "ones", 2: "twos", 3: "threes", 4: "fours", 5: "fives", 6: "sixes",
  7: "sevens", 8: "eights", 9: "nines", 10: "tens", 11: "elevens", 12: "twelves",
  25: "twenty-fives", 50: "fifties", 100: "hundreds", 1000: "thousands",
};

/** Symbol → [singular, plural]. Only expanded straight after a number. */
const UNITS = {
  mm: ["millimetre", "millimetres"],
  cm: ["centimetre", "centimetres"],
  km: ["kilometre", "kilometres"],
  m: ["metre", "metres"],
  kg: ["kilogram", "kilograms"],
  g: ["gram", "grams"],
  ml: ["millilitre", "millilitres"],
  l: ["litre", "litres"],
  "°C": ["degree Celsius", "degrees Celsius"],
  min: ["minute", "minutes"],
  // Only with a space ("45 s"): "4s" means fours.
  s: ["second", "seconds"],
  h: ["hour", "hours"],
};

/** Emoji that stand for a thing in a question ("Where is the 🌸?"). */
const EMOJI_NAMES = {
  "🍎": "apple", "🍏": "apple", "🍐": "pear", "🍌": "banana", "🍇": "grapes",
  "🍓": "strawberry", "🍪": "biscuit", "🍕": "pizza", "🍄": "mushroom",
  "🫒": "olive", "🧀": "cheese", "🍞": "bread", "🍦": "ice cream",
  "🐟": "fish", "🐠": "fish", "🐶": "dog", "🐱": "cat", "🐰": "rabbit",
  "🐻": "bear", "🐼": "panda", "🐦": "bird", "🐝": "bee",
  "⭐": "star", "★": "star", "🌙": "moon", "☀": "sun", "❤": "heart",
  "🌸": "flower", "🌷": "tulip", "🌹": "rose", "🌻": "sunflower", "🌼": "daisy",
  "🌳": "tree", "🚗": "car", "🚌": "bus", "🚲": "bike", "🚚": "lorry",
  "⚽": "football", "🎈": "balloon", "🔴": "red circle", "🔵": "blue circle",
  "🟡": "yellow circle", "🟢": "green circle",
};

/** A whole option or segment that is only a symbol reads as a name. */
const LONE_SYMBOLS = {
  "<": "less than", ">": "greater than", "=": "equals", "+": "plus",
  "−": "minus", "-": "minus", "×": "times", "÷": "divided by",
};

/** Marks a blank that is asked about ("what"), until the sentence is known. */
const ASKED = "\uE000";

const OPERATOR_WORDS = new Set([
  "plus", "minus", "times", "by", "equals", "than", "then", "of", "is", "about", "to",
]);

const numberWord = (n) => NUMBER_WORDS[n] ?? String(n);

function unitName(symbol, amount) {
  const [one, many] = UNITS[symbol];
  return amount === "1" ? one : many;
}

function fractionWords(top, bottom) {
  const names = FRACTION_NAMES[Number(bottom)];
  if (top === "?") return `blank over ${bottom}`;
  if (!names) return `${top} over ${bottom}`;
  return `${numberWord(Number(top))} ${Number(top) === 1 ? names[0] : names[1]}`;
}

/** Emoji and the decorative marks that mean nothing read aloud. */
function dropDecoration(text) {
  let out = text.replace(/️|‍/g, "");
  // A named emoji is read as its name, unless the next word already says it
  // ("How many 🐶 dogs?" is not "dog dogs").
  out = out.replace(/(\p{Extended_Pictographic}|★)(\s*)(\p{L}*)/gu, (whole, emoji, space, word) => {
    const name = EMOJI_NAMES[emoji];
    if (!name) return `${space}${word}`;
    if (word && word.toLowerCase().startsWith(name.split(" ").at(-1).slice(0, 3))) return word;
    return `${name}${space}${word}`;
  });
  return out
    .replace(/[·•]/g, ", ")
    .replace(/\s[—–]\s/g, ", ")
    .replace(/[—]/g, ", ")
    .replace(/…|\.\.\./g, " ")
    .replace(/[☆✓✔✗✘●○◯▲△▼▽◀▶↺↻↓↑│|⌫]/g, " ")
    .replace(/[\p{Extended_Pictographic}]/gu, " ");
}

/**
 * The normaliser. `text` is any on-screen string: a title, a prompt, an
 * option. Returns a string ready for `speak`.
 */
export function mathToSpeech(text) {
  if (text == null) return "";
  let out = String(text).replace(/[\s\u00a0]+/g, " ").trim();
  if (!out) return "";

  // A lone symbol, e.g. the "<" option in "which symbol makes this true?".
  if (LONE_SYMBOLS[out]) return LONE_SYMBOLS[out];
  if (UNITS[out] && out !== "s" && out !== "h") return UNITS[out][1];

  out = dropDecoration(out);

  // Shouted emphasis ("Type the SMALLEST") can be spelt out by some voices.
  // Roman numerals (only I V X L C D M) are left alone.
  out = out.replace(/\b[A-Z]{3,}\b/g, (word) => (/^[IVXLCDM]+$/.test(word) ? word : word.toLowerCase()));

  // Money. "£3.50" → "3 pounds 50", "£1" → "1 pound", "45p" → "45 pence".
  out = out.replace(/£(\d+)(?:\.(\d{2}))?/g, (_, pounds, pence) => {
    const p = pence && Number(pence) > 0 ? ` ${Number(pence)}` : "";
    if (pounds === "0" && p) return `${Number(pence)} pence`;
    return `${pounds} ${pounds === "1" ? "pound" : "pounds"}${p}`;
  });
  out = out.replace(/(^|[^\d.])(\d+)p\b/g, (_, before, n) => `${before}${n} ${n === "1" ? "penny" : "pence"}`);

  // "how many 4ths" → "quarters"; "Counting in 4s" → "fours".
  out = out.replace(/\b(\d+)(?:ths|rds|nds)\b/g, (whole, n) => FRACTION_NAMES[Number(n)]?.[1] ?? whole);
  out = out.replace(/\b(\d+)s\b/g, (whole, n) => PLURAL_NUMBERS[Number(n)] ?? whole);

  // Fractions, with a unit straight after reading "of a kilometre".
  out = out.replace(
    /(^|[^\d/.:])(\d+|\?)\/(\d+)(?![\d/])(?:\s?(mm|cm|km|kg|ml|m|g|l)\b)?/g,
    (_, before, top, bottom, unit) => {
      const words = fractionWords(top, bottom);
      return `${before}${words}${unit ? ` of a ${UNITS[unit][0]}` : ""}`;
    }
  );

  // Units after a number (or a blank).
  out = out.replace(/(^|[^\d.:])(\d+(?:\.\d+)?|\?) ?°C/g, (_, before, n) => `${before}${n} ${unitName("°C", n)}`);
  out = out.replace(/°/g, " degrees");
  out = out.replace(
    /(^|[^\d.:/])(\d+(?:\.\d+)?|\?) ?(mm|cm|km|kg|ml|min|m|g|l)\b(?!['’])/g,
    (_, before, n, unit) => `${before}${n} ${unitName(unit, n)}`
  );
  out = out.replace(/(^|[^\d.:/])(\d+) (s|h)\b(?!['’])/g, (_, before, n, unit) => `${before}${n} ${unitName(unit, n)}`);
  // A unit asked about on its own: "What is 12 m in cm?". Two-letter symbols
  // only; "in m" or "in g" could be anything.
  out = out.replace(/\b(in|into) (mm|cm|km|kg|ml)\b(?!['’])/g, (_, word, unit) => `${word} ${UNITS[unit][1]}`);

  // Arrows: "56 → 46" goes to; "508 → 10 less → ?" is a chain of steps.
  out = out.replace(/(\d)\s*→\s*(\d+|\?)(?=\s*($|[,.;]))/g, "$1 goes to $2");
  out = out.replace(/\s*→\s*/g, ", then ");

  // Operators. These symbols only ever mean their maths in a challenge.
  out = out
    .replace(/×/g, " times ")
    .replace(/÷/g, " divided by ")
    .replace(/[+＋]/g, " plus ")
    .replace(/≈/g, " is about ")
    // "24 < 30" compares; "Make every < true" names the sign.
    .replace(/([\d?]|\p{L}s?) ?([<>])(?= ?[\d?(-])/gu, (_, left, sign) => `${left} ${sign === "<" ? "is less than" : "is greater than"} `)
    // "Is 7 > 3?" already has its verb: not "Is 7 is greater than 3?".
    .replace(/\b(is|are|Is|Are) (\S+) is (less|greater) than\b/g, "$1 $2 $3 than")
    .replace(/</g, " less-than sign ")
    .replace(/>/g, " greater-than sign ")
    .replace(/=/g, " equals ")
    .replace(/−/g, " minus ")
    // ASCII hyphen: spaced subtraction, or a negative number on its own.
    .replace(/(\S) - (?=\S)/g, "$1 minus ")
    .replace(/(^|[\s(,])-(?=\d)/g, "$1minus ");

  // Blanks. A lone "?", "□" or "___" is the thing to find: "what" next to an
  // operation ("6 times 5 equals what?"), "blank" in a list ("3, 6, blank, 12").
  out = out.replace(/_{3,}|□/g, " ? ");
  out = out.replace(/ +/g, " ");
  out = out.replace(/(^|[\s,(])\?(?=$|[\s,.)!:;])/g, (whole, before, offset) => {
    const left = out.slice(0, offset + before.length).trim().split(/[\s,]+/).at(-1)?.toLowerCase() ?? "";
    const right = out.slice(offset + whole.length).trim().split(/[\s,]+/)[0]?.toLowerCase() ?? "";
    const isSum = OPERATOR_WORDS.has(left) || ["plus", "minus", "times", "divided", "equals", "is"].includes(right);
    return `${before}${isSum ? ASKED : "blank"}`;
  });
  // A sentence with a "what" blank in it is a question: "6 times 5 equals
  // what?", "what plus 38 equals 90?".
  out = out
    .split(/(?<=[.?!])\s+/)
    .map((sentence) => {
      if (!sentence.includes(ASKED)) return sentence;
      const asked = sentence.replace(new RegExp(ASKED, "g"), "what").replace(/[\s,.;:]+$/, "");
      return /[?!]$/.test(asked) ? asked : `${asked}?`;
    })
    .join(" ");

  return tidy(out);
}

/** Collapse whitespace and stray punctuation left by the rules above. */
function tidy(text) {
  return text
    .replace(/\s+/g, " ")
    .replace(/\s+([,.?!;:])/g, "$1")
    .replace(/([,;:])(?:\s*[,;:])+/g, "$1")
    .replace(/,\s*([.?!])/g, "$1")
    .replace(/([.?!])(?:\s*[.,;:])+/g, "$1")
    .replace(/^[\s,.;:]+/, "")
    .replace(/[\s,;:]+$/, "")
    .trim();
}

/**
 * The answer options as one question: "Is it 18, 20 or 16?". Long options
 * (phrases, not numbers) read as a list instead.
 */
export function optionsSentence(options) {
  const spoken = options.map(mathToSpeech).filter(Boolean);
  if (spoken.length === 0) return "";
  if (spoken.length === 1) return `Is it ${spoken[0]}?`;
  const lower = spoken.map((option) => option.toLowerCase());
  if (lower.length === 2 && lower.includes("yes") && lower.includes("no")) return "Yes or no?";
  const list = `${spoken.slice(0, -1).join(", ")} or ${spoken.at(-1)}`;
  const isLong = spoken.some((option) => option.split(" ").length > 5);
  return isLong ? `Choose from: ${spoken.join("; ")}.` : `Is it ${list}?`;
}

const STARTS_WITH_OPERATOR = /^[+＋−×÷=<>≈→]/;
const ENDS_WITH_OPERATOR = /[+＋−×÷=<>≈→]$/;

/**
 * Joins the pieces of text read from a question. Each piece is
 * `{ text, list }`: `list` pieces sit side by side on screen (number-line
 * cells, cards in a row), so they join with commas; others are separate lines
 * and join as sentences. An operator piece ("+", "= 8") joins with a plain
 * space either side, so "12 | + | ? | = | 20" reads as one sum.
 */
export function joinSegments(segments) {
  let out = "";
  let previous = null;
  for (const segment of segments) {
    const text = segment.text.replace(/\s+/g, " ").trim();
    if (!text) continue;
    if (!out) {
      out = text;
    } else if (STARTS_WITH_OPERATOR.test(text) || ENDS_WITH_OPERATOR.test(previous)) {
      out += ` ${text}`;
    } else if (/[.!:;,]$/.test(out) || /\p{L}\?$/u.test(out)) {
      // Already punctuated. A "?" only ends a sentence after a word: after a
      // number or on its own it is a blank ("58, 59, ?").
      out += ` ${text}`;
    } else {
      out += `${segment.list ? "," : "."} ${text}`;
    }
    previous = text;
  }
  return out;
}

/** The whole read-aloud: title, question, then the options as a question. */
export function composeReadAloud({ title = "", segments = [], options = [] }) {
  const parts = [mathToSpeech(title), mathToSpeech(joinSegments(segments)), optionsSentence(options)]
    .filter(Boolean)
    .map((part) => (/[.?!:]$/.test(part) ? part : `${part}.`));
  return parts.join(" ");
}
