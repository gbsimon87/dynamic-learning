import { readingQuestions } from "./year5Practice.js";
/** Thoughts and Motives: docs/curriculum/year-5-and-6-english.md, Year 5 mapping. */
export const RULE = "A character’s feelings and motives (the reasons they act) are not always stated, so we work them out from what they say and do.";
export const BANK = [
  {
    "title": "The Missing Cake",
    "short": "Zayn’s hands shook as he held his project. He looked at the clock again and again. When his name was called, he took a deep breath and walked to the front.",
    "intro": [
      {
        "prompt": "How does Zayn probably feel?",
        "answer": "Nervous",
        "wrong": [
          "Bored",
          "Angry"
        ]
      },
      {
        "prompt": "Why does Zayn take a deep breath?",
        "answer": "To calm himself before he presents",
        "wrong": [
          "To tell everyone to be quiet",
          "Because he is tired from running"
        ]
      },
      {
        "prompt": "Which detail shows that Zayn is nervous?",
        "answer": "His hands shook.",
        "wrong": [
          "He held his project.",
          "His name was called."
        ]
      }
    ],
    "evidence": [
      "Leo stared at the empty plate on Ellie’s kitchen table.",
      "Her lemon cake had been there a minute ago.",
      "Now only crumbs were left, and Biscuit sat beside the table, licking his lips.",
      "Leo’s cheeks turned hot.",
      "His tummy felt as heavy as a stone.",
      "He quickly wiped a crumb from his chin.",
      "When Ellie came in, Leo pointed at Biscuit and said, “It must have been him.”",
      "Ellie frowned at the crumbs on Leo’s shirt.",
      "Leo let out a long, shaky sigh.",
      "His voice wobbled as he spoke.",
      "“Actually, it was me,” he admitted.",
      "“I’ll bake you another one.”"
    ],
    "blocks": [
      {
        "type": "p",
        "text": "Leo stared at the empty plate on Ellie’s kitchen table. Her lemon cake had been there a minute ago. Now only crumbs were left, and Biscuit sat beside the table, licking his lips. Leo’s cheeks turned hot. His tummy felt as heavy as a stone. He quickly wiped a crumb from his chin."
      },
      {
        "type": "p",
        "text": "When Ellie came in, Leo pointed at Biscuit and said, “It must have been him.” Ellie frowned at the crumbs on Leo’s shirt. Leo let out a long, shaky sigh. His voice wobbled as he spoke. “Actually, it was me,” he admitted. “I’ll bake you another one.”"
      }
    ],
    "groups": [
      {
        "label": "Clues about how Leo feels",
        "cards": [
          "Leo’s cheeks turned hot.",
          "His tummy felt as heavy as a stone.",
          "Leo let out a long, shaky sigh.",
          "His voice wobbled as he spoke."
        ]
      },
      {
        "label": "Clues about why Leo acts",
        "cards": [
          "He quickly wiped a crumb from his chin.",
          "When Ellie came in, Leo pointed at Biscuit and said, “It must have been him.”",
          "“Actually, it was me,” he admitted.",
          "“I’ll bake you another one.”"
        ]
      }
    ],
    "sortPrompt": "Sort the clues. Does each one show how Leo feels, or why Leo acts as he does?",
    "questions": [
      {
        "prompt": "Why does Leo point at Biscuit?",
        "answer": "He wants to avoid getting the blame.",
        "wrong": [
          "He wants to play with Biscuit.",
          "He thinks Biscuit is hungry."
        ],
        "evidencePrompt": "Tap the sentence where Leo tries to put the blame on Biscuit.",
        "evidence": "When Ellie came in, Leo pointed at Biscuit and said, “It must have been him.”"
      },
      {
        "prompt": "How does Leo feel after the cake vanishes?",
        "answer": "Guilty and embarrassed",
        "wrong": [
          "Proud and excited",
          "Bored and sleepy"
        ],
        "evidencePrompt": "Tap the sentence that shows Leo’s face changing.",
        "evidence": "Leo’s cheeks turned hot."
      },
      {
        "prompt": "Why does Leo offer to bake another cake?",
        "answer": "He wants to make up for what he did.",
        "wrong": [
          "He wants to practise baking.",
          "He is angry with Ellie."
        ],
        "evidencePrompt": "Tap the sentence where Leo offers to put things right.",
        "evidence": "“I’ll bake you another one.”"
      },
      {
        "prompt": "What does Ellie’s frown suggest?",
        "answer": "She suspects Leo ate the cake.",
        "wrong": [
          "She is pleased with Biscuit.",
          "She wants more cake."
        ],
        "evidencePrompt": "Tap the sentence that shows Ellie noticing something about Leo.",
        "evidence": "Ellie frowned at the crumbs on Leo’s shirt."
      }
    ]
  },
  {
    "title": "The New Glasses",
    "short": "Ellie reached for the last slice of pizza. Then she noticed Zayn staring at it, his tummy rumbling. Ellie pushed the plate towards him. “I’m full,” she said, but her stomach grumbled too.",
    "intro": [
      {
        "prompt": "Why does Ellie push the plate towards Zayn?",
        "answer": "She sees he is hungry and wants him to have it.",
        "wrong": [
          "She dislikes pizza.",
          "She wants to throw it away."
        ]
      },
      {
        "prompt": "Which clue shows that Ellie is not really full?",
        "answer": "Her stomach grumbled.",
        "wrong": [
          "Zayn’s tummy rumbled.",
          "The plate was on the table."
        ]
      },
      {
        "prompt": "Which word best describes Ellie?",
        "answer": "Generous",
        "wrong": [
          "Greedy",
          "Bossy"
        ]
      }
    ],
    "evidence": [
      "Priya’s new glasses were bright red.",
      "She loved them at the shop.",
      "At school, though, she kept them hidden in her coat pocket.",
      "Every time Mr Bell wrote on the board, she squinted until her head ached.",
      "At break, Ellie spotted the red case poking out.",
      "“Why don’t you wear them?” she asked.",
      "Priya’s voice came out small.",
      "Her cheeks glowed pink.",
      "“Everyone will stare at me.”",
      "Ellie grinned and put on a pair of enormous sunglasses.",
      "“Now they’ll be staring at me instead,” she said.",
      "Priya burst out laughing.",
      "Slowly, she slid the glasses onto her nose, and the board sprang into focus."
    ],
    "blocks": [
      {
        "type": "p",
        "text": "Priya’s new glasses were bright red. She loved them at the shop. At school, though, she kept them hidden in her coat pocket. Every time Mr Bell wrote on the board, she squinted until her head ached."
      },
      {
        "type": "p",
        "text": "At break, Ellie spotted the red case poking out. “Why don’t you wear them?” she asked. Priya’s voice came out small. Her cheeks glowed pink. “Everyone will stare at me.” Ellie grinned and put on a pair of enormous sunglasses. “Now they’ll be staring at me instead,” she said. Priya burst out laughing. Slowly, she slid the glasses onto her nose, and the board sprang into focus."
      }
    ],
    "groups": [
      {
        "label": "Clues about how Priya feels",
        "cards": [
          "She loved them at the shop.",
          "Priya’s voice came out small.",
          "Her cheeks glowed pink.",
          "Priya burst out laughing."
        ]
      },
      {
        "label": "Clues about why Priya acts",
        "cards": [
          "At school, though, she kept them hidden in her coat pocket.",
          "“Everyone will stare at me.”",
          "Every time Mr Bell wrote on the board, she squinted until her head ached.",
          "Slowly, she slid the glasses onto her nose, and the board sprang into focus."
        ]
      }
    ],
    "sortPrompt": "Sort the clues. Does each one show how Priya feels, or why Priya acts as she does?",
    "questions": [
      {
        "prompt": "Why does Priya keep her glasses in her pocket at school?",
        "answer": "She is worried that people will stare.",
        "wrong": [
          "She is afraid of losing them.",
          "She can see well without them."
        ],
        "evidencePrompt": "Tap the sentence where Priya says why she hides her glasses.",
        "evidence": "“Everyone will stare at me.”"
      },
      {
        "prompt": "Why does Ellie put on enormous sunglasses?",
        "answer": "To take the attention away from Priya",
        "wrong": [
          "Because the sun is too bright",
          "To hide from Mr Bell"
        ],
        "evidencePrompt": "Tap the sentence where Ellie explains her plan.",
        "evidence": "“Now they’ll be staring at me instead,” she said."
      },
      {
        "prompt": "What does Priya’s squinting tell the reader?",
        "answer": "She cannot see the board clearly without her glasses.",
        "wrong": [
          "She is cross with Mr Bell.",
          "She is pretending to be sleepy."
        ],
        "evidencePrompt": "Tap the sentence that shows Priya struggling to see.",
        "evidence": "Every time Mr Bell wrote on the board, she squinted until her head ached."
      },
      {
        "prompt": "What makes Priya change her mind and wear her glasses?",
        "answer": "Ellie’s joke makes her feel braver.",
        "wrong": [
          "Mr Bell tells her off.",
          "Ellie takes the glasses from her."
        ],
        "evidencePrompt": "Tap the sentence that shows Priya laughing at Ellie’s joke.",
        "evidence": "Priya burst out laughing."
      }
    ]
  },
  {
    "title": "Leo’s Early Mornings",
    "short": "Amara waited until the corridor was empty. She slid a thank-you card under Mr Bell’s door, then tiptoed away, glancing over her shoulder.",
    "intro": [
      {
        "prompt": "Why does Amara wait until the corridor is empty?",
        "answer": "She does not want anyone to see her.",
        "wrong": [
          "She wants Mr Bell to catch her.",
          "She has forgotten the card."
        ]
      },
      {
        "prompt": "What does the thank-you card show about how Amara feels?",
        "answer": "Grateful",
        "wrong": [
          "Annoyed",
          "Jealous"
        ]
      },
      {
        "prompt": "Which detail shows that Amara is being secretive?",
        "answer": "She glances over her shoulder.",
        "wrong": [
          "She chats with her classmates.",
          "She says goodbye to Mr Bell."
        ]
      }
    ],
    "evidence": [
      "Every morning before school, Leo crept out of his house with a bag of dog biscuits.",
      "He glanced up and down the street, checking that no one from his class was around.",
      "Then he knocked softly at Mrs Hale’s door.",
      "Mrs Hale had broken her ankle in January, and her old spaniel, Pepper, needed walking.",
      "Leo had overheard the news at the bus stop.",
      "He had not told Amara or Zayn.",
      "He always handed back the lead before Mrs Hale could thank him.",
      "Pepper trotted happily at his side.",
      "Leo’s steps felt light.",
      "A warm glow spread through his chest whenever Pepper wagged his tail.",
      "He found himself whistling all the way round the park.",
      "His heart gave a nervous thump if a classmate’s voice carried down the road."
    ],
    "blocks": [
      {
        "type": "p",
        "text": "Every morning before school, Leo crept out of his house with a bag of dog biscuits. He glanced up and down the street, checking that no one from his class was around. Then he knocked softly at Mrs Hale’s door."
      },
      {
        "type": "p",
        "text": "Mrs Hale had broken her ankle in January, and her old spaniel, Pepper, needed walking. Leo had overheard the news at the bus stop. He had not told Amara or Zayn. He always handed back the lead before Mrs Hale could thank him. Pepper trotted happily at his side. Leo’s steps felt light. A warm glow spread through his chest whenever Pepper wagged his tail. He found himself whistling all the way round the park. His heart gave a nervous thump if a classmate’s voice carried down the road."
      }
    ],
    "groups": [
      {
        "label": "Clues about how Leo feels",
        "cards": [
          "Leo’s steps felt light.",
          "A warm glow spread through his chest whenever Pepper wagged his tail.",
          "He found himself whistling all the way round the park.",
          "His heart gave a nervous thump if a classmate’s voice carried down the road."
        ]
      },
      {
        "label": "Clues about why Leo acts",
        "cards": [
          "He glanced up and down the street, checking that no one from his class was around.",
          "Leo had overheard the news at the bus stop.",
          "He had not told Amara or Zayn.",
          "He always handed back the lead before Mrs Hale could thank him."
        ]
      }
    ],
    "sortPrompt": "Sort the clues. Does each one show how Leo feels, or why Leo acts as he does?",
    "questions": [
      {
        "prompt": "Why does Leo check that nobody from his class is around?",
        "answer": "He wants to keep his kindness a secret.",
        "wrong": [
          "He is afraid of Pepper.",
          "He is running late for school."
        ],
        "evidencePrompt": "Tap the sentence that shows Leo checking that he is not seen.",
        "evidence": "He glanced up and down the street, checking that no one from his class was around."
      },
      {
        "prompt": "What made Leo decide to help Mrs Hale?",
        "answer": "He heard that she had hurt her ankle.",
        "wrong": [
          "Mrs Hale paid him.",
          "Amara asked him to."
        ],
        "evidencePrompt": "Tap the sentence that tells how Leo found out Mrs Hale needed help.",
        "evidence": "Leo had overheard the news at the bus stop."
      },
      {
        "prompt": "Why does Leo hand back the lead before Mrs Hale can thank him?",
        "answer": "He does not want praise.",
        "wrong": [
          "He wants a reward.",
          "He is bored with the dog."
        ],
        "evidencePrompt": "Tap the sentence that shows Leo avoiding thanks.",
        "evidence": "He always handed back the lead before Mrs Hale could thank him."
      },
      {
        "prompt": "What does Leo’s whistling suggest about his thoughts?",
        "answer": "He is pleased with what he is doing.",
        "wrong": [
          "He is bored by the walk.",
          "He wants Pepper to run faster."
        ],
        "evidencePrompt": "Tap the sentence that shows Leo making a happy sound.",
        "evidence": "He found himself whistling all the way round the park."
      }
    ]
  }
];
export function buildThoughtsAndMotivesQuestions(level, rng) {
  return readingQuestions(BANK, RULE, level, rng);
}
