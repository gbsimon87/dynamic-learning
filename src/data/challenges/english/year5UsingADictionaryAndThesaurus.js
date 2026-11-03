import { sentenceQuestions } from "./year5Practice.js";
/** Using a dictionary and a thesaurus: docs/curriculum/year-5-and-6-english.md, Year 5 mapping. */
export const RULE = "A dictionary (a book of words in alphabetical order with their meanings) checks spelling and meaning. A thesaurus (a book of words grouped by similar meaning) helps you find other words.";
const DEFAULT_HINT = "Think about what a dictionary and a thesaurus are each used for.";
export const BANK = [
  {
    "context": "Priya checks which comes first in the dictionary.",
    "sentence": "In the dictionary, ‘thorough’ comes ___ ‘thought’.",
    "answer": "before",
    "wrong": [
      "after",
      "level with"
    ],
    "prompt": "Compare th-o-r with th-o-u. Which comes first in the dictionary?",
    "hint": "Compare the words letter by letter. Find the first letter that is different, then see which comes first in the alphabet."
  },
  {
    "context": "Zayn is putting three words in dictionary order.",
    "sentence": "Of chart, chase and check, you would find ‘___’ first.",
    "answer": "chart",
    "wrong": [
      "chase",
      "check"
    ],
    "prompt": "Which word comes first in alphabetical order?",
    "hint": "Compare the words letter by letter. Find the first letter that is different, then see which comes first in the alphabet."
  },
  {
    "context": "Ellie is putting three words in dictionary order.",
    "sentence": "Of fresh, friend and frog, you would find ‘___’ first.",
    "answer": "fresh",
    "wrong": [
      "friend",
      "frog"
    ],
    "prompt": "Which word comes first in alphabetical order?",
    "hint": "Compare the words letter by letter. Find the first letter that is different, then see which comes first in the alphabet."
  },
  {
    "context": "Amara is putting three words in dictionary order.",
    "sentence": "Of plane, plant and plan, you would find ‘___’ first.",
    "answer": "plan",
    "wrong": [
      "plane",
      "plant"
    ],
    "prompt": "Which word comes first? A short word that is the start of a longer word comes first.",
    "hint": "When one word is just the beginning of another word, the shorter word comes first."
  },
  {
    "context": "Leo is putting three words in dictionary order.",
    "sentence": "Of storm, story and stove, you would find ‘___’ last.",
    "answer": "stove",
    "wrong": [
      "storm",
      "story"
    ],
    "prompt": "Which word comes last in alphabetical order?",
    "hint": "Compare the words letter by letter. Find the first letter that is different, then see which comes first in the alphabet."
  },
  {
    "context": "Priya is putting three words in dictionary order.",
    "sentence": "Of brick, bridge and bright, you would find ‘___’ last.",
    "answer": "bright",
    "wrong": [
      "brick",
      "bridge"
    ],
    "prompt": "Which word comes last in alphabetical order?",
    "hint": "Compare the words letter by letter. Find the first letter that is different, then see which comes first in the alphabet."
  },
  {
    "context": "Zayn is putting three words in dictionary order.",
    "sentence": "Of dolphin, doll and dove, you would find ‘___’ second.",
    "answer": "dolphin",
    "wrong": [
      "doll",
      "dove"
    ],
    "prompt": "Which word comes in the middle in alphabetical order?",
    "hint": "Compare the words letter by letter. Find the first letter that is different, then see which comes first in the alphabet."
  },
  {
    "context": "The top of a dictionary page shows two guide words: cave – cell. Every word on the page comes between them.",
    "sentence": "You would find ‘___’ on that page.",
    "answer": "ceiling",
    "wrong": [
      "cart",
      "chair"
    ],
    "prompt": "Which word is on a page headed ‘cave – cell’?",
    "hint": "Check the first guide word and the last guide word. The right word falls between them in alphabetical order."
  },
  {
    "context": "A dictionary page is headed with the guide words mist – moon.",
    "sentence": "You would find ‘___’ on that page.",
    "answer": "money",
    "wrong": [
      "mouse",
      "mask"
    ],
    "prompt": "Which word is on a page headed ‘mist – moon’?",
    "hint": "Check the first guide word and the last guide word. The right word falls between them in alphabetical order."
  },
  {
    "context": "A dictionary page is headed with the guide words pear – pin.",
    "sentence": "You would find ‘___’ on that page.",
    "answer": "pencil",
    "wrong": [
      "plum",
      "paper"
    ],
    "prompt": "Which word is on a page headed ‘pear – pin’?",
    "hint": "Check the first guide word and the last guide word. The right word falls between them in alphabetical order."
  },
  {
    "context": "A dictionary page is headed with the guide words fan – fig.",
    "sentence": "You would find ‘___’ on that page.",
    "answer": "fern",
    "wrong": [
      "fox",
      "flag"
    ],
    "prompt": "Which word is on a page headed ‘fan – fig’?",
    "hint": "Check the first guide word and the last guide word. The right word falls between them in alphabetical order."
  },
  {
    "context": "Priya wants to check how to spell ‘disastrous’.",
    "sentence": "She looks under the first three letters, ‘___’.",
    "answer": "dis",
    "wrong": [
      "das",
      "dys"
    ],
    "prompt": "Which first three letters should she look up?",
    "hint": "Look at the first letters of the word, including any silent ones. Use only the number of letters the sentence asks for."
  },
  {
    "context": "Zayn wants to check the spelling of ‘knowledge’. It begins with a silent k.",
    "sentence": "He looks under the first three letters, ‘___’.",
    "answer": "kno",
    "wrong": [
      "nol",
      "now"
    ],
    "prompt": "Which first three letters should he look up?",
    "hint": "Look at the first letters of the word, including any silent ones. Use only the number of letters the sentence asks for."
  },
  {
    "context": "Amara wants to check the spelling of ‘rhythm’.",
    "sentence": "She looks under the first three letters, ‘___’.",
    "answer": "rhy",
    "wrong": [
      "rit",
      "rhi"
    ],
    "prompt": "Which first three letters should she look up?",
    "hint": "Look at the first letters of the word, including any silent ones. Use only the number of letters the sentence asks for."
  },
  {
    "context": "Leo wants to check the spelling of ‘conscience’.",
    "sentence": "He looks under the first three letters, ‘___’.",
    "answer": "con",
    "wrong": [
      "kon",
      "cos"
    ],
    "prompt": "Which first three letters should he look up?",
    "hint": "Look at the first letters of the word, including any silent ones. Use only the number of letters the sentence asks for."
  },
  {
    "context": "Ellie wants to check the spelling of ‘separate’.",
    "sentence": "She looks under the first three letters, ‘___’.",
    "answer": "sep",
    "wrong": [
      "sap",
      "sip"
    ],
    "prompt": "Which first three letters should she look up?",
    "hint": "Look at the first letters of the word, including any silent ones. Use only the number of letters the sentence asks for."
  },
  {
    "context": "Many words begin dis, so the dictionary needs the first four letters to find ‘disappear’.",
    "sentence": "The first four letters of ‘disappear’ are ‘___’.",
    "answer": "disa",
    "wrong": [
      "disc",
      "dise"
    ],
    "prompt": "Which first four letters narrow down the search for ‘disappear’?",
    "hint": "Look at the first letters of the word, including any silent ones. Use only the number of letters the sentence asks for."
  },
  {
    "context": "A dictionary entry reads: cautious (adj.) taking care to avoid danger.",
    "sentence": "‘Cautious’ means ___.",
    "answer": "taking care to avoid danger",
    "wrong": [
      "full of energy",
      "friendly and kind"
    ],
    "prompt": "Read the entry. What does ‘cautious’ mean?",
    "hint": "The meaning comes straight after the word class label.",
    "build": {
      "sentence": "‘Cautious’ means taking care to avoid ___.",
      "answer": "danger",
      "spare": [
        "pizza",
        "homework"
      ],
      "prompt": "Build the missing word from the entry."
    }
  },
  {
    "context": "A dictionary entry reads: ancient (adj.) very old.",
    "sentence": "The label ‘adj.’ tells us that ‘ancient’ is an ___.",
    "answer": "adjective",
    "wrong": [
      "adverb",
      "action"
    ],
    "prompt": "What does the short label ‘adj.’ stand for?",
    "hint": "‘Adj.’ is short for the word class that describes a noun."
  },
  {
    "context": "A dictionary entry reads: bargain (n.) something bought for less than its usual price.",
    "sentence": "The label ‘n.’ shows that ‘bargain’ is a ___.",
    "answer": "noun",
    "wrong": [
      "verb",
      "adverb"
    ],
    "prompt": "What does the short label ‘n.’ stand for?",
    "hint": "A bargain is a thing, so which word class names things?"
  },
  {
    "context": "A dictionary entry reads: quickly (adv.) in a fast way.",
    "sentence": "The label ‘adv.’ shows that ‘quickly’ is an ___.",
    "answer": "adverb",
    "wrong": [
      "adjective",
      "article"
    ],
    "prompt": "What does the short label ‘adv.’ stand for?",
    "hint": "‘Adv.’ is short for a word that tells you how something is done."
  },
  {
    "context": "A dictionary entry reads: sharpen (v.) to make something sharp.",
    "sentence": "The label ‘v.’ shows that ‘sharpen’ is a ___.",
    "answer": "verb",
    "wrong": [
      "noun",
      "adverb"
    ],
    "prompt": "What does the short label ‘v.’ stand for?",
    "hint": "To sharpen is something you do."
  },
  {
    "context": "A dictionary entry gives the word, its word class, its meaning and often a sentence showing how to use it.",
    "sentence": "That extra sentence is called an ___ sentence.",
    "answer": "example",
    "wrong": [
      "opposite",
      "unknown"
    ],
    "prompt": "What do we call the sentence that shows a word in use?",
    "hint": "It is an example of the word used well."
  },
  {
    "context": "The dictionary entry for ‘bat’ says: 1. a small animal that flies at night. 2. a wooden club used to hit a ball.",
    "sentence": "In ‘A bat flew out of the dark cave’, the meaning that fits is number ___.",
    "answer": "1",
    "wrong": [
      "2",
      "3"
    ],
    "prompt": "Which numbered meaning fits this sentence?",
    "hint": "Which kind of bat can fly out of a cave?"
  },
  {
    "context": "The dictionary entry for ‘bark’ says: 1. the rough outside of a tree. 2. the loud sound a dog makes.",
    "sentence": "In ‘Biscuit began to bark at the postman’, the meaning that fits is number ___.",
    "answer": "2",
    "wrong": [
      "1",
      "3"
    ],
    "prompt": "Which numbered meaning fits this sentence?",
    "hint": "Who is making a noise at the postman?"
  },
  {
    "context": "A thesaurus lists words with similar meanings next to each other.",
    "sentence": "Words with a similar meaning are called ___.",
    "answer": "synonyms",
    "wrong": [
      "antonyms",
      "homophones"
    ],
    "prompt": "What do we call words that mean almost the same?",
    "hint": "A thesaurus is a book of these words."
  },
  {
    "context": "Bix is learning dictionary and thesaurus words.",
    "sentence": "A word with the opposite meaning is called an ___.",
    "answer": "antonym",
    "wrong": [
      "synonym",
      "anagram"
    ],
    "prompt": "What do we call a word that means the opposite?",
    "hint": "Think of ‘hot’ and ‘cold’."
  },
  {
    "context": "Priya wants to check how to spell a word and find out what it means.",
    "sentence": "She should use a ___.",
    "answer": "dictionary",
    "wrong": [
      "thesaurus",
      "calendar"
    ],
    "prompt": "Which book gives spellings and meanings?",
    "hint": "Pick the book of words in alphabetical order with their meanings."
  },
  {
    "context": "Leo wants a more interesting word than ‘nice’.",
    "sentence": "He should use a ___.",
    "answer": "thesaurus",
    "wrong": [
      "calendar",
      "timetable"
    ],
    "prompt": "Which book lists words with similar meanings?",
    "hint": "Pick the book that groups words by similar meaning."
  },
  {
    "context": "The words in a dictionary follow a set order.",
    "sentence": "They are listed in ___ order.",
    "answer": "alphabetical",
    "wrong": [
      "random",
      "length"
    ],
    "prompt": "How are the words in a dictionary arranged?",
    "hint": "A comes first and Z comes last."
  },
  {
    "context": "Leo felt very low when his team lost the match.",
    "sentence": "Leo felt ___ after the match.",
    "answer": "miserable",
    "wrong": [
      "delighted",
      "cheerful"
    ],
    "prompt": "Which synonym (a word with a similar meaning) of ‘sad’ fits best?",
    "hint": "Look for a word that means unhappy, not the opposite."
  },
  {
    "context": "The cave had no light at all.",
    "sentence": "The ___ cave echoed with strange noises.",
    "answer": "gloomy",
    "wrong": [
      "bright",
      "sunny"
    ],
    "prompt": "Which synonym of ‘dark’ fits best?",
    "hint": "Look for a word that means almost dark."
  },
  {
    "context": "The blue whale is the biggest animal in the sea.",
    "sentence": "The whale was ___.",
    "answer": "enormous",
    "wrong": [
      "tiny",
      "minute"
    ],
    "prompt": "Which synonym of ‘big’ fits best?",
    "hint": "Look for a word that means very, very big."
  },
  {
    "context": "Biscuit saw the ball and ran very fast.",
    "sentence": "Biscuit ___ across the park after the ball.",
    "answer": "dashed",
    "wrong": [
      "strolled",
      "crawled"
    ],
    "prompt": "Which synonym of ‘ran’ fits best?",
    "hint": "The dog is in a hurry. Which word shows speed?"
  },
  {
    "context": "Amara had won first prize in the art show.",
    "sentence": "Amara was ___ to hear the news.",
    "answer": "thrilled",
    "wrong": [
      "furious",
      "miserable"
    ],
    "prompt": "Which synonym of ‘happy’ fits best?",
    "hint": "Look for a word that means very pleased."
  },
  {
    "context": "The firefighter was not afraid of the flames.",
    "sentence": "The ___ firefighter rushed into the burning house.",
    "answer": "courageous",
    "wrong": [
      "timid",
      "cowardly"
    ],
    "prompt": "Which synonym of ‘brave’ fits best?",
    "hint": "Look for a word that means not afraid."
  },
  {
    "context": "The crossing guard needed everyone to hear her.",
    "sentence": "‘Stop!’ ___ the crossing guard in a very loud voice.",
    "answer": "shouted",
    "wrong": [
      "whispered",
      "muttered"
    ],
    "prompt": "Which synonym of ‘said’ fits best?",
    "hint": "Look for a word that means said loudly."
  }
];
export function buildUsingADictionaryAndThesaurusQuestions(level, rng) {
  return sentenceQuestions(BANK, RULE, level, rng, DEFAULT_HINT);
}
