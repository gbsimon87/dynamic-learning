import { sentenceQuestions } from "./year1Practice.js";

/** Year 1: "leaving spaces between words".
 * Source: docs/curriculum/year-1-english.md and english-appendix-1-year-1.md.
 * 1 supported choice; 2 independent choice; 3 whole-structure work; 4 applied building/spelling.
 */
export const TITLES = [
  "Read the clue.",
  "Try without the rule.",
  "Build it with tiles.",
  "Use what you know."
];
export const BANK = [
  {
    "prompt": "Put spaces between the words.",
    "context": "Amarafeedsthecat.",
    "source": "Amarafeedsthecat.",
    "answer": "Amara feeds the cat.",
    "wrong": [
      "Amarafeedsthecat.",
      "Amarafeeds the cat."
    ],
    "caseSensitive": true,
    "speak": "Put spaces between the words.",
    "hint": "Each whole word needs a space after it."
  },
  {
    "prompt": "Put spaces between the words.",
    "context": "Leokickstheball.",
    "source": "Leokickstheball.",
    "answer": "Leo kicks the ball.",
    "wrong": [
      "Leokickstheball.",
      "Leokicks the ball."
    ],
    "caseSensitive": true,
    "speak": "Put spaces between the words.",
    "hint": "Each whole word needs a space after it."
  },
  {
    "prompt": "Put spaces between the words.",
    "context": "Priyareadsabook.",
    "source": "Priyareadsabook.",
    "answer": "Priya reads a book.",
    "wrong": [
      "Priyareadsabook.",
      "Priyareads a book."
    ],
    "caseSensitive": true,
    "speak": "Put spaces between the words.",
    "hint": "Each whole word needs a space after it."
  },
  {
    "prompt": "Put spaces between the words.",
    "context": "Zaynshutsthegate.",
    "source": "Zaynshutsthegate.",
    "answer": "Zayn shuts the gate.",
    "wrong": [
      "Zaynshutsthegate.",
      "Zaynshuts the gate."
    ],
    "caseSensitive": true,
    "speak": "Put spaces between the words.",
    "hint": "Each whole word needs a space after it."
  },
  {
    "prompt": "Put spaces between the words.",
    "context": "ElliehugsBiscuit.",
    "source": "ElliehugsBiscuit.",
    "answer": "Ellie hugs Biscuit.",
    "wrong": [
      "ElliehugsBiscuit.",
      "Elliehugs Biscuit."
    ],
    "caseSensitive": true,
    "speak": "Put spaces between the words.",
    "hint": "Each whole word needs a space after it."
  },
  {
    "prompt": "Put spaces between the words.",
    "context": "Biscuitwagshistail.",
    "source": "Biscuitwagshistail.",
    "answer": "Biscuit wags his tail.",
    "wrong": [
      "Biscuitwagshistail.",
      "Biscuitwags his tail."
    ],
    "caseSensitive": true,
    "speak": "Put spaces between the words.",
    "hint": "Each whole word needs a space after it."
  },
  {
    "prompt": "Put spaces between the words.",
    "context": "Thefrogjumpsup.",
    "source": "Thefrogjumpsup.",
    "answer": "The frog jumps up.",
    "wrong": [
      "Thefrogjumpsup.",
      "Thefrog jumps up."
    ],
    "caseSensitive": true,
    "speak": "Put spaces between the words.",
    "hint": "Each whole word needs a space after it."
  },
  {
    "prompt": "Put spaces between the words.",
    "context": "Thebirdsingsasong.",
    "source": "Thebirdsingsasong.",
    "answer": "The bird sings a song.",
    "wrong": [
      "Thebirdsingsasong.",
      "Thebird sings a song."
    ],
    "caseSensitive": true,
    "speak": "Put spaces between the words.",
    "hint": "Each whole word needs a space after it."
  },
  {
    "prompt": "Put spaces between the words.",
    "context": "Thefishswimsinwater.",
    "source": "Thefishswimsinwater.",
    "answer": "The fish swims in water.",
    "wrong": [
      "Thefishswimsinwater.",
      "Thefish swims in water."
    ],
    "caseSensitive": true,
    "speak": "Put spaces between the words.",
    "hint": "Each whole word needs a space after it."
  },
  {
    "prompt": "Put spaces between the words.",
    "context": "Theducksitsongrass.",
    "source": "Theducksitsongrass.",
    "answer": "The duck sits on grass.",
    "wrong": [
      "Theducksitsongrass.",
      "Theduck sits on grass."
    ],
    "caseSensitive": true,
    "speak": "Put spaces between the words.",
    "hint": "Each whole word needs a space after it."
  },
  {
    "prompt": "Put spaces between the words.",
    "context": "Mumopensthedoor.",
    "source": "Mumopensthedoor.",
    "answer": "Mum opens the door.",
    "wrong": [
      "Mumopensthedoor.",
      "Mumopens the door."
    ],
    "caseSensitive": true,
    "speak": "Put spaces between the words.",
    "hint": "Each whole word needs a space after it."
  },
  {
    "prompt": "Put spaces between the words.",
    "context": "Dadcooksthelunch.",
    "source": "Dadcooksthelunch.",
    "answer": "Dad cooks the lunch.",
    "wrong": [
      "Dadcooksthelunch.",
      "Dadcooks the lunch."
    ],
    "caseSensitive": true,
    "speak": "Put spaces between the words.",
    "hint": "Each whole word needs a space after it."
  },
  {
    "prompt": "Put spaces between the words.",
    "context": "Thesunshinestoday.",
    "source": "Thesunshinestoday.",
    "answer": "The sun shines today.",
    "wrong": [
      "Thesunshinestoday.",
      "Thesun shines today."
    ],
    "caseSensitive": true,
    "speak": "Put spaces between the words.",
    "hint": "Each whole word needs a space after it."
  },
  {
    "prompt": "Put spaces between the words.",
    "context": "Therainwetsmycoat.",
    "source": "Therainwetsmycoat.",
    "answer": "The rain wets my coat.",
    "wrong": [
      "Therainwetsmycoat.",
      "Therain wets my coat."
    ],
    "caseSensitive": true,
    "speak": "Put spaces between the words.",
    "hint": "Each whole word needs a space after it."
  },
  {
    "prompt": "Put spaces between the words.",
    "context": "Weplantaseed.",
    "source": "Weplantaseed.",
    "answer": "We plant a seed.",
    "wrong": [
      "Weplantaseed.",
      "Weplant a seed."
    ],
    "caseSensitive": true,
    "speak": "Put spaces between the words.",
    "hint": "Each whole word needs a space after it."
  },
  {
    "prompt": "Put spaces between the words.",
    "context": "Idrawastar.",
    "source": "Idrawastar.",
    "answer": "I draw a star.",
    "wrong": [
      "Idrawastar.",
      "Idraw a star."
    ],
    "caseSensitive": true,
    "speak": "Put spaces between the words.",
    "hint": "Each whole word needs a space after it."
  }
];
export function buildWordsAndSentences(level, rng) {
  return sentenceQuestions(BANK, "Put a space between each whole word.", level, rng);
}
