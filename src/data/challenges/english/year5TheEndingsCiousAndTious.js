import { wordQuestions } from "./year5Practice.js";
/** The endings cious and tious: docs/curriculum/year-5-and-6-english.md, Year 5 mapping. */
export const RULE = "The ending that sounds like “shus” is spelt –cious or –tious. If the root word ends in –ce, use c (vice, vicious). Often it is –tious. Exception: anxious.";
export const BANK = [
  {
    "word": "vicious",
    "meaning": "cruel and violent",
    "sentence": "The ___ dog snarled and showed its teeth.",
    "wrong": [
      "vishious",
      "visious"
    ],
    "tip": "The root ends in –ce, so the “sh” sound is spelt with a c."
  },
  {
    "word": "precious",
    "meaning": "very valuable or dearly loved",
    "sentence": "Grandma’s ring is very ___ to her.",
    "wrong": [
      "preshous",
      "pretious"
    ]
  },
  {
    "word": "conscious",
    "meaning": "awake and aware of what is happening",
    "sentence": "The goalkeeper was still ___ after the bump.",
    "wrong": [
      "conshous",
      "consious"
    ],
    "tip": "Hidden inside is the word science."
  },
  {
    "word": "delicious",
    "meaning": "tasting very good",
    "sentence": "Mum’s lentil soup was ___.",
    "wrong": [
      "delishous",
      "delitious"
    ]
  },
  {
    "word": "malicious",
    "meaning": "meant to hurt or upset someone",
    "sentence": "The ___ rumour upset the whole class.",
    "wrong": [
      "malishous",
      "malitious"
    ],
    "tip": "Malice ends in –ce, so the “sh” sound is spelt with a c."
  },
  {
    "word": "suspicious",
    "meaning": "feeling that something is not quite right",
    "sentence": "Ellie was ___ when the biscuits vanished.",
    "wrong": [
      "suspishous",
      "suspicous"
    ]
  },
  {
    "word": "ambitious",
    "meaning": "wanting very much to succeed",
    "sentence": "Zayn is ___ and wants to be an astronaut.",
    "wrong": [
      "ambishous",
      "ambicious"
    ]
  },
  {
    "word": "cautious",
    "meaning": "careful to avoid danger",
    "sentence": "Leo took ___ steps across the icy path.",
    "wrong": [
      "caushous",
      "cautous"
    ]
  },
  {
    "word": "fictitious",
    "meaning": "made up and not real",
    "sentence": "Sherlock Holmes is a ___ detective.",
    "wrong": [
      "fictishous",
      "ficticious"
    ]
  },
  {
    "word": "infectious",
    "meaning": "spreading easily from one person to another",
    "sentence": "Amara’s giggle was so ___ that everyone joined in.",
    "wrong": [
      "infectius",
      "infecshous"
    ]
  },
  {
    "word": "nutritious",
    "meaning": "full of the goodness that helps you grow",
    "sentence": "A bowl of beans and vegetables is a ___ lunch.",
    "wrong": [
      "nutrishous",
      "nutricious"
    ]
  },
  {
    "word": "gracious",
    "meaning": "polite, kind and elegant",
    "sentence": "The queen gave a ___ smile to the crowd.",
    "wrong": [
      "grashous",
      "gratious"
    ],
    "tip": "Grace ends in –ce, so the “sh” sound is spelt with a c."
  },
  {
    "word": "spacious",
    "meaning": "having lots of room",
    "sentence": "The new classroom is bright and ___.",
    "wrong": [
      "spashous",
      "spatious"
    ],
    "tip": "Space ends in –ce, so the “sh” sound is spelt with a c."
  },
  {
    "word": "anxious",
    "meaning": "worried and nervous",
    "sentence": "Priya felt ___ before the spelling test.",
    "wrong": [
      "anxshus",
      "anxous"
    ],
    "tip": "An exception: the first half has an x in it."
  },
  {
    "word": "ferocious",
    "meaning": "fierce and wild",
    "sentence": "The ___ lion roared across the plain.",
    "wrong": [
      "feroshous",
      "ferocius"
    ]
  },
  {
    "word": "superstitious",
    "meaning": "believing in luck, charms and omens",
    "sentence": "Zayn is ___ and never walks under a ladder.",
    "wrong": [
      "superstishous",
      "superstitous"
    ]
  },
  {
    "word": "atrocious",
    "meaning": "shockingly bad",
    "sentence": "The weather was ___, with wind and hail all day.",
    "wrong": [
      "atroshous",
      "atrocius"
    ]
  }
];
export function buildTheEndingsCiousAndTiousQuestions(level, rng) {
  return wordQuestions(BANK, RULE, level, rng);
}
