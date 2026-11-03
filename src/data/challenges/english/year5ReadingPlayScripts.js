import { readingQuestions } from "./year5Practice.js";
/** Reading Play Scripts: docs/curriculum/year-5-and-6-english.md, Year 5 mapping. */
export const RULE = "In a play script, each speaker’s name comes before their words, stage directions (instructions in brackets) say how to speak or move, and there are no speech marks.";
export const BANK = [
  {
    "title": "The Treasure Box",
    "short": "LEO: (whispering) Is anyone there? (Biscuit barks from behind the door.) ELLIE: (laughing) It is only Biscuit!",
    "intro": [
      {
        "prompt": "Who is whispering?",
        "answer": "Leo",
        "wrong": [
          "Ellie",
          "Biscuit"
        ]
      },
      {
        "prompt": "What does the word (laughing) tell Ellie to do?",
        "answer": "Laugh as she speaks",
        "wrong": [
          "Leave the room",
          "Speak in a whisper"
        ]
      },
      {
        "prompt": "Which part is a stage direction?",
        "answer": "(Biscuit barks from behind the door.)",
        "wrong": [
          "Is anyone there?",
          "It is only Biscuit!"
        ]
      }
    ],
    "evidence": [
      "Scene 1: The school garden",
      "On a sunny morning, Amara and Zayn are digging by the school wall.",
      "AMARA: (excitedly) Look what I found!",
      "(She holds up a rusty tin.)",
      "ZAYN: (leaning closer) Is it treasure?",
      "(Amara lifts the lid slowly.)",
      "AMARA: (disappointed) It is only a spoon.",
      "(Zayn laughs and sits down on the grass.)",
      "ZAYN: (grinning) It is a very old spoon.",
      "(Amara smiles and tucks the spoon into her bag.)"
    ],
    "blocks": [
      {
        "type": "h",
        "text": "Scene 1: The school garden"
      },
      {
        "type": "p",
        "text": "On a sunny morning, Amara and Zayn are digging by the school wall."
      },
      {
        "type": "p",
        "text": "AMARA: (excitedly) Look what I found!"
      },
      {
        "type": "p",
        "text": "(She holds up a rusty tin.)"
      },
      {
        "type": "p",
        "text": "ZAYN: (leaning closer) Is it treasure?"
      },
      {
        "type": "p",
        "text": "(Amara lifts the lid slowly.)"
      },
      {
        "type": "p",
        "text": "AMARA: (disappointed) It is only a spoon."
      },
      {
        "type": "p",
        "text": "(Zayn laughs and sits down on the grass.)"
      },
      {
        "type": "p",
        "text": "ZAYN: (grinning) It is a very old spoon."
      },
      {
        "type": "p",
        "text": "(Amara smiles and tucks the spoon into her bag.)"
      }
    ],
    "groups": [
      {
        "label": "Lines to speak (with a speaker’s name)",
        "cards": [
          "AMARA: (excitedly) Look what I found!",
          "ZAYN: (leaning closer) Is it treasure?",
          "AMARA: (disappointed) It is only a spoon.",
          "ZAYN: (grinning) It is a very old spoon."
        ]
      },
      {
        "label": "Stage directions (actions only)",
        "cards": [
          "(She holds up a rusty tin.)",
          "(Amara lifts the lid slowly.)",
          "(Zayn laughs and sits down on the grass.)",
          "(Amara smiles and tucks the spoon into her bag.)"
        ]
      }
    ],
    "sortPrompt": "Sort the lines of the script. Is each one a line for an actor to speak, or a stage direction?",
    "questions": [
      {
        "prompt": "Who says, “Is it treasure?”",
        "answer": "Zayn",
        "wrong": [
          "Amara",
          "A narrator"
        ],
        "evidencePrompt": "Tap the line spoken by Zayn while he leans closer.",
        "evidence": "ZAYN: (leaning closer) Is it treasure?"
      },
      {
        "prompt": "What does the stage direction (disappointed) tell the actor playing Amara?",
        "answer": "To speak in a let-down voice",
        "wrong": [
          "To walk off the stage",
          "To whisper a secret"
        ],
        "evidencePrompt": "Tap the line where Amara must sound disappointed.",
        "evidence": "AMARA: (disappointed) It is only a spoon."
      },
      {
        "prompt": "Where does Scene 1 take place?",
        "answer": "In the school garden",
        "wrong": [
          "In a classroom",
          "In a library"
        ],
        "evidencePrompt": "Tap the line that tells you when the scene happens and who is there.",
        "evidence": "On a sunny morning, Amara and Zayn are digging by the school wall."
      },
      {
        "prompt": "What does the stage direction “(Amara lifts the lid slowly.)” tell the actor?",
        "answer": "To open the tin slowly",
        "wrong": [
          "To say her next line slowly",
          "To leave the stage"
        ],
        "evidencePrompt": "Tap the stage direction that tells Amara to open the tin.",
        "evidence": "(Amara lifts the lid slowly.)"
      }
    ]
  },
  {
    "title": "The Broken Telescope",
    "short": "ZAYN: (excited) The rocket is ready! (Priya checks the clock.) PRIYA: (counting) Five, four, three...",
    "intro": [
      {
        "prompt": "Who is counting?",
        "answer": "Priya",
        "wrong": [
          "Zayn",
          "Nobody"
        ]
      },
      {
        "prompt": "What does the word (excited) tell Zayn to do?",
        "answer": "Speak in an excited voice",
        "wrong": [
          "Walk very slowly",
          "Say nothing"
        ]
      },
      {
        "prompt": "Which part is a stage direction?",
        "answer": "(Priya checks the clock.)",
        "wrong": [
          "The rocket is ready!",
          "Five, four, three..."
        ]
      }
    ],
    "evidence": [
      "Scene 2: Space Club",
      "It is Friday afternoon, and Priya and Leo stand beside a telescope with a cracked lens.",
      "PRIYA: (worried) Mr Bell will be so cross.",
      "(Leo kneels and studies the crack.)",
      "LEO: (calmly) We could fix it with clear tape.",
      "(Priya shakes her head.)",
      "PRIYA: (firmly) No. We must tell him the truth.",
      "(Mr Bell enters, carrying a box of pens.)",
      "MR BELL: (puzzled) Why are you two so quiet?",
      "(Priya takes a deep breath and steps forward.)",
      "PRIYA: (nervously) I dropped the telescope, Mr Bell."
    ],
    "blocks": [
      {
        "type": "h",
        "text": "Scene 2: Space Club"
      },
      {
        "type": "p",
        "text": "It is Friday afternoon, and Priya and Leo stand beside a telescope with a cracked lens."
      },
      {
        "type": "p",
        "text": "PRIYA: (worried) Mr Bell will be so cross."
      },
      {
        "type": "p",
        "text": "(Leo kneels and studies the crack.)"
      },
      {
        "type": "p",
        "text": "LEO: (calmly) We could fix it with clear tape."
      },
      {
        "type": "p",
        "text": "(Priya shakes her head.)"
      },
      {
        "type": "p",
        "text": "PRIYA: (firmly) No. We must tell him the truth."
      },
      {
        "type": "p",
        "text": "(Mr Bell enters, carrying a box of pens.)"
      },
      {
        "type": "p",
        "text": "MR BELL: (puzzled) Why are you two so quiet?"
      },
      {
        "type": "p",
        "text": "(Priya takes a deep breath and steps forward.)"
      },
      {
        "type": "p",
        "text": "PRIYA: (nervously) I dropped the telescope, Mr Bell."
      }
    ],
    "groups": [
      {
        "label": "Lines to speak (with a speaker’s name)",
        "cards": [
          "PRIYA: (worried) Mr Bell will be so cross.",
          "LEO: (calmly) We could fix it with clear tape.",
          "PRIYA: (firmly) No. We must tell him the truth.",
          "MR BELL: (puzzled) Why are you two so quiet?"
        ]
      },
      {
        "label": "Stage directions (actions only)",
        "cards": [
          "(Leo kneels and studies the crack.)",
          "(Priya shakes her head.)",
          "(Mr Bell enters, carrying a box of pens.)",
          "(Priya takes a deep breath and steps forward.)"
        ]
      }
    ],
    "sortPrompt": "Sort the lines of the script. Is each one a line for an actor to speak, or a stage direction?",
    "questions": [
      {
        "prompt": "Which character suggests using clear tape?",
        "answer": "Leo",
        "wrong": [
          "Priya",
          "Mr Bell"
        ],
        "evidencePrompt": "Tap the line where Leo says how they could mend the lens.",
        "evidence": "LEO: (calmly) We could fix it with clear tape."
      },
      {
        "prompt": "What does the stage direction (firmly) tell the actor playing Priya?",
        "answer": "To speak in a strong, certain voice",
        "wrong": [
          "To speak very quietly",
          "To speak while running"
        ],
        "evidencePrompt": "Tap the line where Priya must speak firmly.",
        "evidence": "PRIYA: (firmly) No. We must tell him the truth."
      },
      {
        "prompt": "Which character comes into the scene later?",
        "answer": "Mr Bell",
        "wrong": [
          "Leo",
          "Priya"
        ],
        "evidencePrompt": "Tap the stage direction that shows a new character arriving.",
        "evidence": "(Mr Bell enters, carrying a box of pens.)"
      },
      {
        "prompt": "What is the setting at the start of the scene?",
        "answer": "A telescope with a cracked lens on Friday afternoon",
        "wrong": [
          "A broken bus on Friday morning",
          "A new telescope in the school hall"
        ],
        "evidencePrompt": "Tap the line that sets the scene.",
        "evidence": "It is Friday afternoon, and Priya and Leo stand beside a telescope with a cracked lens."
      }
    ]
  },
  {
    "title": "The Missing Bone",
    "short": "AMARA: (whispering) Do not wake the baby. (Zayn tiptoes across the room.) ZAYN: (cheerfully) I am being quiet!",
    "intro": [
      {
        "prompt": "Why is (whispering) written in brackets?",
        "answer": "It tells the actor how to speak.",
        "wrong": [
          "It is the name of a character.",
          "It is what Amara says aloud."
        ]
      },
      {
        "prompt": "Which stage direction tells Zayn how to move?",
        "answer": "(Zayn tiptoes across the room.)",
        "wrong": [
          "(whispering)",
          "I am being quiet!"
        ]
      },
      {
        "prompt": "How is this different from a story?",
        "answer": "Names come before the words, and there are no speech marks.",
        "wrong": [
          "Every line is inside speech marks.",
          "It is written in one long paragraph."
        ]
      }
    ],
    "evidence": [
      "Scene 3: The park at sunset",
      "Long shadows stretch across the grass.",
      "Ellie searches under a bench while Amara holds an empty lead.",
      "ELLIE: (calling) Biscuit! Where are you?",
      "(She peers behind a hedge.)",
      "AMARA: (softly) Listen. Can you hear that rustling?",
      "(They both freeze. A tail pokes out of the bushes.)",
      "ELLIE: (relieved) There you are, you silly dog!",
      "(Biscuit trots out with a muddy sock in his mouth.)",
      "AMARA: (giggling) That is not a bone.",
      "ELLIE: (sternly, but smiling) Drop it, Biscuit.",
      "(Biscuit wags his tail and runs in a circle.)"
    ],
    "blocks": [
      {
        "type": "h",
        "text": "Scene 3: The park at sunset"
      },
      {
        "type": "p",
        "text": "Long shadows stretch across the grass. Ellie searches under a bench while Amara holds an empty lead."
      },
      {
        "type": "p",
        "text": "ELLIE: (calling) Biscuit! Where are you?"
      },
      {
        "type": "p",
        "text": "(She peers behind a hedge.)"
      },
      {
        "type": "p",
        "text": "AMARA: (softly) Listen. Can you hear that rustling?"
      },
      {
        "type": "p",
        "text": "(They both freeze. A tail pokes out of the bushes.)"
      },
      {
        "type": "p",
        "text": "ELLIE: (relieved) There you are, you silly dog!"
      },
      {
        "type": "p",
        "text": "(Biscuit trots out with a muddy sock in his mouth.)"
      },
      {
        "type": "p",
        "text": "AMARA: (giggling) That is not a bone."
      },
      {
        "type": "p",
        "text": "ELLIE: (sternly, but smiling) Drop it, Biscuit."
      },
      {
        "type": "p",
        "text": "(Biscuit wags his tail and runs in a circle.)"
      }
    ],
    "groups": [
      {
        "label": "Lines to speak (with a speaker’s name)",
        "cards": [
          "ELLIE: (calling) Biscuit! Where are you?",
          "AMARA: (softly) Listen. Can you hear that rustling?",
          "AMARA: (giggling) That is not a bone.",
          "ELLIE: (sternly, but smiling) Drop it, Biscuit."
        ]
      },
      {
        "label": "Stage directions (actions only)",
        "cards": [
          "(She peers behind a hedge.)",
          "(They both freeze. A tail pokes out of the bushes.)",
          "(Biscuit trots out with a muddy sock in his mouth.)",
          "(Biscuit wags his tail and runs in a circle.)"
        ]
      }
    ],
    "sortPrompt": "Sort the lines of the script. Is each one a line for an actor to speak, or a stage direction?",
    "questions": [
      {
        "prompt": "Why is Ellie told to sound relieved?",
        "answer": "She has found Biscuit.",
        "wrong": [
          "She has lost the lead.",
          "She has found a bone."
        ],
        "evidencePrompt": "Tap the line where Ellie must sound relieved.",
        "evidence": "ELLIE: (relieved) There you are, you silly dog!"
      },
      {
        "prompt": "Which stage direction shows where Biscuit is hiding?",
        "answer": "A tail pokes out of the bushes.",
        "wrong": [
          "Biscuit wags his tail and runs in a circle.",
          "Biscuit trots out with a muddy sock in his mouth."
        ],
        "evidencePrompt": "Tap the stage direction that shows where Biscuit is hiding.",
        "evidence": "(They both freeze. A tail pokes out of the bushes.)"
      },
      {
        "prompt": "How should the actor say “Drop it, Biscuit”?",
        "answer": "Sternly but smiling",
        "wrong": [
          "Sadly and slowly",
          "Loudly and angrily"
        ],
        "evidencePrompt": "Tap the line that tells the actor to speak sternly but smiling.",
        "evidence": "ELLIE: (sternly, but smiling) Drop it, Biscuit."
      },
      {
        "prompt": "What has Biscuit found?",
        "answer": "A muddy sock",
        "wrong": [
          "A bone",
          "An empty lead"
        ],
        "evidencePrompt": "Tap the stage direction that shows what Biscuit has in his mouth.",
        "evidence": "(Biscuit trots out with a muddy sock in his mouth.)"
      }
    ]
  }
];
export function buildReadingPlayScriptsQuestions(level, rng) {
  return readingQuestions(BANK, RULE, level, rng);
}
