import { year6MathCurriculum } from "./year6MathCurriculum.js";
import { year6ScienceCurriculum } from "./year6ScienceCurriculum.js";
import { year6EnglishCurriculum } from "./year6EnglishCurriculum.js";
import { year6HistoryCurriculum } from "./year6HistoryCurriculum.js";
import { year6GeographyCurriculum } from "./year6GeographyCurriculum.js";
import { year5MathCurriculum } from "./year5MathCurriculum.js";
import { year5EnglishCurriculum } from "./year5EnglishCurriculum.js";
import { year5ScienceCurriculum } from "./year5ScienceCurriculum.js";
import { year5HistoryCurriculum } from "./year5HistoryCurriculum.js";
import { year5GeographyCurriculum } from "./year5GeographyCurriculum.js";
import { year5ArtCurriculum } from "./year5ArtCurriculum.js";
import { year5ComputingCurriculum } from "./year5ComputingCurriculum.js";
import { year5DesignCurriculum } from "./year5DesignCurriculum.js";
import { year5FrenchCurriculum } from "./year5FrenchCurriculum.js";
import { year5MusicCurriculum } from "./year5MusicCurriculum.js";
import { year5PeCurriculum } from "./year5PeCurriculum.js";
import { year5WellbeingCurriculum } from "./year5WellbeingCurriculum.js";
import { year3ScienceCurriculum } from "./year3ScienceCurriculum.js";
import test from "node:test";
import assert from "node:assert/strict";
import { year2MathCurriculum } from "./year2MathCurriculum.js";
import { year3MathCurriculum } from "./year3MathCurriculum.js";
import { year3EnglishCurriculum } from "./year3EnglishCurriculum.js";
import { year4EnglishCurriculum } from "./year4EnglishCurriculum.js";
import { year1EnglishCurriculum } from "./year1EnglishCurriculum.js";

/**
 * Category and topic ids are keys inside every learner's saved progress, so a
 * change here silently orphans completed work. This list is the ids as they
 * stood on 2026-09-29, when topic icons were added; an edit that moves one
 * should fail loudly here and be treated as a migration, not an update.
 */
const LOCKED_IDS = {
  "2": [
    [
      "number---number-and-place-value",
      [
        "numbers-and-counting",
        "counting-forwards-and-backwards",
        "counting-in-steps-of-2-3-5-and-10",
        "counting-more-and-less",
        "place-value",
        "less-than-greater-than-and-equal-to"
      ]
    ],
    [
      "number---addition-and-subtraction",
      [
        "doubling-and-halving-using-addition-and-subtraction",
        "solving-number-problems",
        "using-two-digit-numbers",
        "solving-missing-number-problems"
      ]
    ],
    [
      "number---multiplication-and-division",
      [
        "what-is-multiplication",
        "what-is-division",
        "2-5-and-10-multiplication-tables",
        "division-problems",
        "connecting-multiplication-and-division",
        "doubling-and-halving-using-multiplication-and-division",
        "solving-multiplication-and-division-problems"
      ]
    ],
    [
      "number---fractions",
      [
        "what-is-a-fraction",
        "fractions-of-numbers",
        "finding-fractions-of-larger-groups"
      ]
    ],
    [
      "measurement",
      [
        "measuring-length-and-height",
        "measuring-weight-and-volume",
        "comparing-measurements",
        "measuring-temperature",
        "measuring-time",
        "standard-units-of-money",
        "money-problems"
      ]
    ],
    [
      "geometry-properties-of-shapes",
      [
        "2-d-shapes",
        "3-d-shapes",
        "different-shapes"
      ]
    ],
    [
      "geometry-position-and-direction",
      [
        "patterns",
        "sequences",
        "quarter-turns-and-half-turns",
        "right-angle-turns"
      ]
    ],
    [
      "statistics",
      [
        "pictograms",
        "tally-charts",
        "block-diagrams",
        "tables",
        "gathering-information-and-using-data"
      ]
    ]
  ],
  "3": [
    [
      "number---number-and-place-value",
      [
        "counting-in-multiples-of-4-8-50-and-100",
        "finding-10-or-100-more-or-less",
        "place-value-in-3-digit-numbers",
        "comparing-and-ordering-numbers-to-1000",
        "representing-and-estimating-numbers",
        "reading-and-writing-numbers-to-1000",
        "number-and-place-value-problems"
      ]
    ],
    [
      "number---addition-and-subtraction",
      [
        "adding-and-subtracting-ones-tens-and-hundreds",
        "column-addition",
        "column-subtraction",
        "estimating-and-checking-answers",
        "missing-number-problems",
        "addition-and-subtraction-problems"
      ]
    ],
    [
      "number---multiplication-and-division",
      [
        "3-and-4-times-tables",
        "the-8-times-table",
        "multiplying-and-dividing-two-digit-numbers",
        "scaling-and-correspondence-problems",
        "multiplication-and-division-problems"
      ]
    ],
    [
      "number---fractions",
      [
        "tenths",
        "fractions-of-a-set-of-objects",
        "fractions-as-numbers",
        "equivalent-fractions",
        "adding-and-subtracting-fractions",
        "comparing-and-ordering-fractions",
        "fraction-problems"
      ]
    ],
    [
      "measurement",
      [
        "measuring-length-in-mm-cm-and-m",
        "measuring-mass",
        "measuring-volume-and-capacity",
        "adding-and-subtracting-measurements",
        "perimeter-of-2-d-shapes",
        "money-and-giving-change",
        "telling-the-time-to-the-minute",
        "roman-numerals-and-24-hour-clocks",
        "units-of-time-and-durations"
      ]
    ],
    [
      "geometry-properties-of-shapes",
      [
        "drawing-2-d-shapes",
        "making-and-recognising-3-d-shapes",
        "angles-as-turns",
        "right-angles",
        "comparing-angles-to-a-right-angle",
        "horizontal-vertical-parallel-and-perpendicular-lines"
      ]
    ],
    [
      "statistics",
      [
        "bar-charts",
        "scaled-pictograms",
        "tables",
        "one-step-and-two-step-questions"
      ]
    ]
  ],
  // Year 1 English, approved 2026-10-11.
  "1-english": [
    [
      "spelling---letters-and-sounds",
      [
        "the-alphabet",
        "double-letters-and-ck",
        "the-sounds-nk-and-tch",
        "words-ending-in-ve-and-y",
        "the-spellings-ph-wh-and-k"
      ]
    ],
    [
      "reading---phonics",
      [
        "blending-sounds",
        "same-letters-different-sounds",
        "tricky-words",
        "longer-words",
        "contractions"
      ]
    ],
    [
      "grammar---words",
      [
        "singular-and-plural",
        "adding-ing-ed-and-er",
        "adding-er-and-est",
        "the-prefix-un",
        "compound-words"
      ]
    ],
    [
      "reading---stories",
      [
        "traditional-tales",
        "titles-and-events",
        "thinking-about-characters",
        "what-happens-next"
      ]
    ],
    [
      "spelling---vowel-sounds",
      [
        "the-spellings-ai-ay-oi-and-oy",
        "split-digraphs",
        "the-spellings-ee-ea-ie-and-igh",
        "the-spellings-oo-oa-ow-and-ew",
        "the-spellings-ar-or-er-ir-and-ur",
        "the-spellings-air-ear-and-are"
      ]
    ],
    [
      "grammar---sentences",
      [
        "words-and-sentences",
        "joining-with-and",
        "capital-letters",
        "days-of-the-week",
        "ending-a-sentence"
      ]
    ],
    [
      "reading---poems-and-facts",
      [
        "rhymes-and-poems",
        "repeated-phrases",
        "what-words-mean",
        "facts-and-stories"
      ]
    ],
    [
      "writing---composition",
      [
        "building-sentences",
        "ordering-a-story",
        "checking-it-makes-sense",
        "dictation"
      ]
    ]
  ],
  // Year 3 English, approved 2026-10-01.
  "3-english": [
    [
      "spelling---prefixes-and-suffixes",
      [
        "adding-prefixes",
        "the-prefixes-super-anti-and-auto",
        "the-suffixes-ation-and-ly",
        "doubling-before-a-suffix"
      ]
    ],
    [
      "reading---words-and-meanings",
      [
        "root-words",
        "exception-words",
        "using-a-dictionary",
        "words-in-context"
      ]
    ],
    [
      "grammar---words",
      [
        "a-or-an",
        "word-families"
      ]
    ],
    [
      "reading---stories",
      [
        "does-it-make-sense",
        "characters-feelings",
        "predicting-what-happens-next",
        "fairy-stories-myths-and-legends"
      ]
    ],
    [
      "spelling---sounds-and-homophones",
      [
        "the-sure-and-ture-endings",
        "tricky-sounds-y-and-ou",
        "homophones",
        "words-often-misspelt"
      ]
    ],
    [
      "grammar---sentences",
      [
        "conjunctions",
        "time-and-cause-words",
        "the-present-perfect",
        "inverted-commas"
      ]
    ],
    [
      "reading---non-fiction-and-poetry",
      [
        "finding-information",
        "asking-questions-about-a-text",
        "kinds-of-writing",
        "words-that-spark-the-imagination",
        "poetry-forms"
      ]
    ],
    [
      "writing---composition",
      [
        "paragraphs",
        "headings-and-sub-headings",
        "settings-characters-and-plot",
        "proofreading",
        "dictation"
      ]
    ]
  ],
  // Year 4 English, approved 2026-10-01.
  "4-english": [
    [
      "spelling---prefixes-suffixes-and-apostrophes",
      [
        "the-prefixes-il-im-and-ir",
        "the-suffix-ous",
        "more-ly-adverbs",
        "apostrophes-for-plural-possession"
      ]
    ],
    [
      "reading---understanding-texts",
      [
        "main-ideas-and-summaries",
        "justifying-inferences",
        "how-language-creates-meaning",
        "how-structure-and-presentation-help"
      ]
    ],
    [
      "grammar---words-and-phrases",
      [
        "plural-or-possessive",
        "standard-english-verbs",
        "determiners",
        "expanded-noun-phrases"
      ]
    ],
    [
      "spelling---word-endings",
      [
        "the-shun-endings",
        "the-zhun-ending",
        "the-endings-gue-and-que",
        "more-words-often-misspelt"
      ]
    ],
    [
      "reading---stories-and-poems",
      [
        "themes-in-stories",
        "predicting-from-clues",
        "myths-and-legends-from-around-the-world",
        "comparing-forms-of-poetry"
      ]
    ],
    [
      "grammar---sentences-and-speech",
      [
        "fronted-adverbials",
        "commas-after-fronted-adverbials",
        "punctuating-direct-speech",
        "pronouns-and-possessive-pronouns"
      ]
    ],
    [
      "spelling---sounds-and-homophones",
      [
        "greek-and-french-ch",
        "the-letters-sc",
        "the-sounds-ei-eigh-and-ey",
        "more-homophones"
      ]
    ],
    [
      "writing---composition-and-editing",
      [
        "paragraphs-around-a-theme",
        "nouns-or-pronouns-for-clarity",
        "editing-for-consistency",
        "proofreading-longer-texts",
        "dictation"
      ]
    ]
  ]
};

const ids = (curriculum) =>
  curriculum.map((category) => [category.id, category.topics.map((topic) => topic.id)]);

test("Year 2 category and topic ids are unchanged", () => {
  assert.deepEqual(ids(year2MathCurriculum), LOCKED_IDS[2]);
});

test("Year 3 category and topic ids are unchanged", () => {
  assert.deepEqual(ids(year3MathCurriculum), LOCKED_IDS[3]);
});

test("Year 1 English category and topic ids are unchanged", () => {
  assert.deepEqual(ids(year1EnglishCurriculum), LOCKED_IDS["1-english"]);
});

test("Year 3 English category and topic ids are unchanged", () => {
  assert.deepEqual(ids(year3EnglishCurriculum), LOCKED_IDS["3-english"]);
});

test("Year 4 English category and topic ids are unchanged", () => {
  assert.deepEqual(ids(year4EnglishCurriculum), LOCKED_IDS["4-english"]);
});

test("every topic has a sticker icon", () => {
  for (const curriculum of [year1EnglishCurriculum, year2MathCurriculum, year3MathCurriculum, year3EnglishCurriculum, year4EnglishCurriculum, year3ScienceCurriculum]) {
    for (const category of curriculum) {
      for (const topic of category.topics) {
        assert.ok(topic.icon, `${topic.name} has no icon`);
      }
    }
  }
});

const SCIENCE_IDS = [
  [
    "plants",
    [
      "parts-of-flowering-plants",
      "what-plants-need-to-grow",
      "water-transport-in-plants",
      "pollination-and-seed-formation",
      "seed-dispersal"
    ]
  ],
  [
    "animals-including-humans",
    [
      "nutrition-for-animals-and-humans",
      "skeletons-for-support-and-protection",
      "muscles-and-movement"
    ]
  ],
  [
    "rocks",
    [
      "comparing-and-grouping-rocks",
      "how-fossils-form",
      "what-soil-is-made-from"
    ]
  ],
  [
    "light",
    [
      "light-and-darkness",
      "reflected-light",
      "protecting-our-eyes-from-sunlight",
      "how-shadows-form",
      "changing-shadow-size"
    ]
  ],
  [
    "forces-and-magnets",
    [
      "movement-on-different-surfaces",
      "contact-and-magnetic-forces",
      "magnetic-materials",
      "magnets-and-their-poles",
      "predicting-attraction-and-repulsion"
    ]
  ]
];
test("Year 3 Science identifiers remain stable", () => {
  assert.deepEqual(ids(year3ScienceCurriculum), SCIENCE_IDS);
});

// Year 5, all twelve subjects, built 2026-11-03.
const YEAR5_IDS = {
  "Math": [
    [
      "number---number-and-place-value",
      [
        "place-value-to-a-million",
        "ordering-and-comparing-numbers-to-a-million",
        "counting-in-steps-and-number-sequences",
        "negative-numbers-and-counting-through-zero",
        "rounding-large-numbers",
        "roman-numerals-to-1000",
        "large-number-problems"
      ]
    ],
    [
      "number---addition-and-subtraction",
      [
        "column-addition-and-subtraction-with-large-numbers",
        "mental-addition-and-subtraction-with-large-numbers",
        "rounding-to-check-answers",
        "multi-step-addition-and-subtraction-problems"
      ]
    ],
    [
      "number---multiplication-and-division",
      [
        "multiples-and-factors",
        "prime-and-composite-numbers",
        "written-multiplication",
        "long-multiplication",
        "mental-multiplication-and-division",
        "short-division-and-remainders",
        "multiplying-and-dividing-by-10-100-and-1000",
        "square-and-cube-numbers",
        "scaling-and-rate-problems",
        "four-operations-and-the-equals-sign"
      ]
    ],
    [
      "number---fractions-including-decimals-and-percentages",
      [
        "comparing-and-ordering-fractions",
        "equivalent-fractions",
        "mixed-numbers-and-improper-fractions",
        "adding-and-subtracting-fractions",
        "multiplying-fractions-by-whole-numbers",
        "decimals-as-fractions-and-thousandths",
        "rounding-ordering-and-comparing-decimals",
        "adding-and-subtracting-decimals",
        "percentages-fractions-and-decimals"
      ]
    ],
    [
      "measurement",
      [
        "converting-metric-units",
        "metric-and-imperial-equivalents",
        "perimeter-of-composite-rectilinear-shapes",
        "area-of-rectangles",
        "estimating-area-volume-and-capacity",
        "converting-units-of-time",
        "measurement-problems"
      ]
    ],
    [
      "geometry-properties-of-shapes",
      [
        "3-d-shapes-from-2-d-drawings",
        "estimating-measuring-and-drawing-angles",
        "angles-at-a-point-and-on-a-straight-line",
        "properties-of-rectangles",
        "regular-and-irregular-polygons"
      ]
    ],
    [
      "geometry-position-and-direction",
      [
        "reflecting-shapes",
        "translating-shapes"
      ]
    ],
    [
      "statistics",
      [
        "reading-line-graphs",
        "tables-and-timetables"
      ]
    ]
  ],
  "English": [
    [
      "spelling---word-endings",
      [
        "the-endings-cious-and-tious",
        "the-endings-cial-and-tial",
        "the-endings-ant-ance-ent-and-ence",
        "the-endings-able-and-ible"
      ]
    ],
    [
      "reading---words-and-meanings",
      [
        "roots-and-origins",
        "using-a-dictionary-and-thesaurus",
        "similes-and-metaphors"
      ]
    ],
    [
      "grammar---verbs-and-possibility",
      [
        "making-verbs-with-ate-ise-and-ify",
        "verb-prefixes",
        "modal-verbs-and-possibility"
      ]
    ],
    [
      "spelling---silent-letters-and-tricky-words",
      [
        "silent-letters",
        "the-letters-ei-after-c",
        "homophones-and-confusing-words",
        "words-often-misspelt",
        "more-words-often-misspelt"
      ]
    ],
    [
      "reading---understanding-texts",
      [
        "thoughts-and-motives",
        "comparing-characters-and-settings",
        "fact-or-opinion",
        "retrieving-and-recording-information",
        "reading-play-scripts"
      ]
    ],
    [
      "grammar---clauses-and-punctuation",
      [
        "relative-pronouns",
        "relative-clauses",
        "brackets-dashes-and-commas",
        "commas-to-avoid-ambiguity"
      ]
    ],
    [
      "grammar---cohesion-and-tense",
      [
        "cohesion-within-paragraphs",
        "linking-paragraphs",
        "the-past-perfect"
      ]
    ],
    [
      "writing---composition-and-editing",
      [
        "audience-purpose-and-form",
        "characters-settings-and-atmosphere",
        "summarising-a-passage",
        "headings-bullet-points-and-underlining",
        "tense-and-agreement",
        "proofreading-spelling-and-punctuation",
        "dictation"
      ]
    ],
    [
      "reading---discussion-and-debate",
      [
        "giving-reasons-for-your-views",
        "challenging-views-courteously"
      ]
    ]
  ],
  "Science": [
    [
      "living-things-and-their-habitats",
      [
        "mammal-and-bird-life-cycles",
        "amphibian-and-insect-life-cycles",
        "comparing-life-cycles",
        "reproduction-in-plants",
        "reproduction-in-animals"
      ]
    ],
    [
      "animals-including-humans",
      [
        "stages-of-human-growth",
        "changes-during-puberty",
        "growing-older"
      ]
    ],
    [
      "properties-and-changes-of-materials",
      [
        "properties-of-materials",
        "conductors-of-heat-and-electricity",
        "choosing-materials-for-a-job",
        "dissolving-and-solutions",
        "separating-mixtures",
        "reversible-changes",
        "irreversible-changes"
      ]
    ],
    [
      "earth-and-space",
      [
        "the-solar-system",
        "planets-and-orbits",
        "sun-earth-and-moon",
        "day-and-night",
        "phases-of-the-moon"
      ]
    ],
    [
      "forces",
      [
        "gravity",
        "air-and-water-resistance",
        "friction",
        "levers-pulleys-and-gears"
      ]
    ]
  ],
  "History": [
    [
      "ancient-greece---land-and-cities",
      [
        "where-ancient-greece-was",
        "athens-and-sparta",
        "everyday-life-in-athens",
        "democracy-in-athens"
      ]
    ],
    [
      "ancient-greece---beliefs-and-games",
      [
        "greek-gods-and-myths",
        "the-parthenon-and-greek-temples",
        "the-olympic-games"
      ]
    ],
    [
      "ancient-greece---wars-ideas-and-legacy",
      [
        "greeks-and-persians",
        "alexander-the-great",
        "greek-thinkers-and-theatre",
        "greek-ideas-we-still-use"
      ]
    ],
    [
      "the-maya---land-and-cities",
      [
        "where-the-maya-lived",
        "maya-farming-and-food",
        "maya-cities-and-kings",
        "chichen-itza-and-maya-pyramids"
      ]
    ],
    [
      "the-maya---ideas-and-change",
      [
        "maya-writing-and-books",
        "maya-numbers-and-the-calendar",
        "maya-gods-and-the-ball-game",
        "the-classic-maya-collapse"
      ]
    ],
    [
      "connections-and-chronology",
      [
        "one-long-timeline",
        "sources-and-interpretations",
        "comparing-past-societies"
      ]
    ]
  ],
  "Geography": [
    [
      "regions-in-depth",
      [
        "scotland-and-the-highlands",
        "andalusia-in-spain",
        "the-amazon-region-of-brazil"
      ]
    ],
    [
      "coasts-rivers-and-hazards",
      [
        "coasts-and-coastal-landforms",
        "rivers-in-flood",
        "living-with-natural-hazards"
      ]
    ],
    [
      "climate-and-environments",
      [
        "climate-graphs-and-patterns",
        "biomes-and-sustainability"
      ]
    ],
    [
      "resources-trade-and-settlement",
      [
        "natural-resources-around-the-world",
        "trade-links-and-global-connections",
        "settlement-growth-and-change",
        "economic-activity-and-jobs"
      ]
    ],
    [
      "coordinates-time-and-maps",
      [
        "latitude-and-longitude-in-practice",
        "time-zones-and-journeys",
        "contours-scale-and-os-maps",
        "designing-a-fieldwork-enquiry"
      ]
    ]
  ],
  "Art": [
    [
      "sketchbooks-and-drawing",
      [
        "sketchbooks-and-observation",
        "line-and-tone",
        "perspective-and-proportion",
        "talking-about-art"
      ]
    ],
    [
      "colour-and-painting",
      [
        "the-colour-wheel",
        "colour-mood-and-mixing",
        "painting-techniques"
      ]
    ],
    [
      "printing-sculpture-and-pattern",
      [
        "printmaking",
        "sculpture-and-clay",
        "pattern-and-texture"
      ]
    ],
    [
      "artists-architects-and-designers",
      [
        "artists-and-their-famous-works",
        "famous-sculptors",
        "craft-makers-and-designers",
        "architects-and-buildings"
      ]
    ]
  ],
  "Computing": [
    [
      "programming-basics",
      [
        "sequences-of-instructions",
        "repeat-loops",
        "if-and-else-decisions",
        "variables",
        "inputs-and-outputs",
        "finding-and-fixing-bugs"
      ]
    ],
    [
      "algorithms-and-logic",
      [
        "breaking-problems-into-parts",
        "how-algorithms-work",
        "logic-with-and-or-and-not"
      ]
    ],
    [
      "networks-and-the-web",
      [
        "computer-networks",
        "how-data-travels",
        "the-internet-and-the-web"
      ]
    ],
    [
      "search-and-information",
      [
        "using-search-engines",
        "how-results-are-ranked",
        "judging-websites"
      ]
    ],
    [
      "safe-and-responsible-use",
      [
        "keeping-information-safe",
        "kind-and-responsible-online"
      ]
    ]
  ],
  "Design": [
    [
      "designing-and-evaluating",
      [
        "design-criteria-and-research",
        "sketches-and-models",
        "evaluating-products",
        "inventors-and-designers"
      ]
    ],
    [
      "making",
      [
        "tools-and-safety",
        "materials-and-joining"
      ]
    ],
    [
      "technical-knowledge",
      [
        "strong-structures",
        "levers-and-linkages",
        "gears-pulleys-and-cams",
        "electrical-systems",
        "computing-to-monitor-and-control"
      ]
    ],
    [
      "cooking-and-nutrition",
      [
        "a-healthy-and-varied-diet",
        "seasonality-and-food-sources",
        "cooking-skills-and-kitchen-hygiene"
      ]
    ]
  ],
  "French": [
    [
      "sounds-and-spelling",
      [
        "silent-letters-and-liaison",
        "nasal-sounds",
        "accents-and-sound-patterns"
      ]
    ],
    [
      "everyday-words",
      [
        "greetings-and-family",
        "numbers-to-100",
        "days-months-and-weather",
        "food-and-ordering",
        "school-and-town",
        "hobbies-and-opinions",
        "clothes-and-colours"
      ]
    ],
    [
      "grammar",
      [
        "gender-articles-and-plurals",
        "adjectives-agreement-and-position",
        "be-have-go-and-do",
        "verbs-ending-in-er",
        "saying-no-and-asking-questions"
      ]
    ],
    [
      "reading-and-writing",
      [
        "reading-short-texts",
        "building-and-translating-sentences"
      ]
    ]
  ],
  "Music": [
    [
      "rhythm-and-metre",
      [
        "note-values-and-rests",
        "time-signatures",
        "counting-beats-in-a-bar",
        "tempo-and-rhythm-words"
      ]
    ],
    [
      "pitch-and-notation",
      [
        "the-stave-and-treble-clef",
        "reading-notes-in-an-octave",
        "scales-and-tonality",
        "chords-and-triads"
      ]
    ],
    [
      "dynamics-and-structure",
      [
        "dynamics-and-articulation",
        "musical-structure-and-texture"
      ]
    ],
    [
      "instruments-and-listening",
      [
        "instruments-of-the-orchestra",
        "composers-and-periods",
        "musical-traditions-of-the-world",
        "popular-music-styles"
      ]
    ]
  ],
  "Pe": [
    [
      "team-games",
      [
        "football-hockey-and-rugby-tag",
        "netball-and-basketball",
        "attacking-and-defending",
        "net-and-wall-games",
        "cricket-and-rounders"
      ]
    ],
    [
      "athletics-gymnastics-and-dance",
      [
        "track-and-field-events",
        "times-and-distances",
        "gymnastics-and-dance"
      ]
    ],
    [
      "outdoors-and-swimming",
      [
        "orienteering-and-teamwork",
        "swimming-and-water-safety"
      ]
    ],
    [
      "fitness-and-fair-play",
      [
        "warming-up-and-fitness",
        "fair-play-and-personal-best"
      ]
    ]
  ],
  "Wellbeing": [
    [
      "friends-and-families",
      [
        "families-who-care",
        "good-friends",
        "sorting-out-a-falling-out",
        "courtesy-and-respect"
      ]
    ],
    [
      "feelings-and-wellbeing",
      [
        "naming-feelings",
        "calming-down-and-talking",
        "active-outdoors-and-hobbies"
      ]
    ],
    [
      "staying-safe",
      [
        "online-safety-and-screen-time",
        "roads-water-and-sun-safety",
        "first-aid-and-999"
      ]
    ],
    [
      "healthy-habits",
      [
        "healthy-eating",
        "sleep-and-rest",
        "teeth-hands-and-germs"
      ]
    ]
  ]
};

const YEAR5_DATASETS = {
  Math: year5MathCurriculum,
  English: year5EnglishCurriculum,
  Science: year5ScienceCurriculum,
  History: year5HistoryCurriculum,
  Geography: year5GeographyCurriculum,
  Art: year5ArtCurriculum,
  Computing: year5ComputingCurriculum,
  Design: year5DesignCurriculum,
  French: year5FrenchCurriculum,
  Music: year5MusicCurriculum,
  Pe: year5PeCurriculum,
  Wellbeing: year5WellbeingCurriculum,
};

for (const [subject, curriculum] of Object.entries(YEAR5_DATASETS)) {
  test(`Year 5 ${subject} category and topic ids are unchanged`, () => {
    assert.deepEqual(ids(curriculum), YEAR5_IDS[subject]);
  });
}

// Year 6 Science, built 2026-11-04. These ids are now URL and progress keys.
const YEAR6_SCIENCE_IDS = [
  ["living-things-and-their-habitats", ["classifying-living-things", "vertebrate-groups", "invertebrate-groups", "micro-organisms", "classification-keys"]],
  ["animals-including-humans", ["the-circulatory-system", "the-heart-and-pulse", "blood-and-blood-vessels", "diet-exercise-and-health", "drugs-medicines-and-lifestyle", "transporting-nutrients-and-water"]],
  ["evolution-and-inheritance", ["fossils-as-evidence", "inheritance-and-variation", "adaptation", "adapting-to-extreme-places", "evolution"]],
  ["light", ["how-light-travels", "how-we-see-things", "mirrors-and-periscopes", "shadow-shapes"]],
  ["electricity", ["circuit-symbols", "cells-and-brightness", "comparing-components", "switches-and-circuit-faults"]],
];

test("Year 6 Science category and topic ids are unchanged", () => {
  assert.deepEqual(ids(year6ScienceCurriculum), YEAR6_SCIENCE_IDS);
});

const YEAR6_ENGLISH_IDS = [
  ["spelling---advanced-patterns", ["adding-endings-to-fer", "hyphens-in-words", "the-letter-string-ough", "confusing-word-pairs", "year-6-word-list-part-1", "year-6-word-list-part-2"]],
  ["reading---interpretation-and-comparison", ["exploring-meaning-in-context", "predicting-from-details", "summarising-across-paragraphs", "figurative-language-and-its-effect", "comparing-accounts-and-viewpoints", "themes-and-conventions", "asking-questions-about-texts"]],
  ["grammar---formal-language-and-sentence-choices", ["formal-and-informal-vocabulary", "synonyms-and-antonyms", "active-and-passive-voice", "formal-structures-and-the-subjunctive", "expanded-noun-phrases-for-information"]],
  ["grammar---cohesion-layout-and-punctuation", ["cohesive-devices-across-paragraphs", "ellipsis", "layout-devices", "semicolons-colons-and-dashes", "punctuation-in-lists", "bullet-point-punctuation", "hyphens-to-avoid-ambiguity"]],
  ["writing---composition-and-editing", ["formal-register-for-audience-and-purpose", "precising-longer-passages", "passive-voice-in-writing", "subjunctive-forms-in-writing", "proofreading-for-clarity-and-effect", "year-6-dictation"]],
];

test("Year 6 English category and topic ids are unchanged", () => {
  assert.deepEqual(ids(year6EnglishCurriculum), YEAR6_ENGLISH_IDS);
});

// Year 6 Maths approved tree: these IDs are URL and progress keys.
const YEAR6_MATH_IDS = [
  [
    "number-number-and-place-value",
    [
      "place-value-to-ten-million",
      "rounding-whole-numbers",
      "negative-numbers-and-intervals",
      "place-value-problems"
    ]
  ],
  [
    "number-addition-subtraction-multiplication-and-division",
    [
      "long-multiplication",
      "long-division-and-remainders",
      "short-division-and-remainders",
      "mental-calculation-strategies",
      "factors-multiples-and-primes",
      "order-of-operations",
      "multi-step-addition-and-subtraction",
      "four-operation-problems",
      "estimating-and-checking-answers"
    ]
  ],
  [
    "number-fractions-including-decimals-and-percentages",
    [
      "simplifying-fractions-and-common-denominators",
      "comparing-and-ordering-fractions",
      "adding-and-subtracting-fractions-and-mixed-numbers",
      "multiplying-proper-fractions",
      "dividing-fractions-by-whole-numbers",
      "fractions-as-division-and-decimals",
      "decimal-place-value-and-powers-of-ten",
      "multiplying-decimals",
      "written-division-with-decimal-answers",
      "rounding-decimal-answers",
      "fraction-decimal-and-percentage-equivalences"
    ]
  ],
  [
    "ratio-and-proportion",
    [
      "ratio-and-missing-quantities",
      "percentages-of-amounts-and-comparisons",
      "similar-shapes-and-scale-factors",
      "unequal-sharing-and-grouping"
    ]
  ],
  [
    "algebra",
    [
      "using-formulae",
      "linear-number-sequences",
      "missing-numbers-and-expressions",
      "equations-with-two-unknowns",
      "finding-all-combinations"
    ]
  ],
  [
    "measurement",
    [
      "measurement-problems",
      "converting-standard-units",
      "miles-and-kilometres",
      "area-and-perimeter-relationships",
      "area-and-volume-formulae",
      "areas-of-triangles-and-parallelograms",
      "volumes-of-cubes-and-cuboids"
    ]
  ],
  [
    "geometry-properties-of-shapes",
    [
      "drawing-shapes-from-dimensions-and-angles",
      "3-d-shapes-and-nets",
      "classifying-shapes-and-finding-angles",
      "parts-of-circles",
      "missing-angles"
    ]
  ],
  [
    "geometry-position-and-direction",
    [
      "coordinates-in-four-quadrants",
      "drawing-translating-and-reflecting-shapes"
    ]
  ],
  [
    "statistics",
    [
      "pie-charts-and-line-graphs",
      "the-mean"
    ]
  ]
];

test("Year 6 Maths category and topic ids are unchanged", () => {
  assert.deepEqual(ids(year6MathCurriculum), YEAR6_MATH_IDS);
});

// Year 6 History, built 2026-11-08. These ids are now URL and progress keys.
const YEAR6_HISTORY_IDS = [
  ["local-history---investigating-your-area", ["what-is-local-history", "maps-through-time", "buildings-and-streets-as-evidence", "census-photos-and-memories", "planning-a-local-study"]],
  ["local-history---jarrow-through-time", ["jarrow-and-the-venerable-bede", "palmers-shipyard-and-the-iron-ships", "the-jarrow-march-1936"]],
  ["crime-and-punishment---anglo-saxons-to-1700", ["law-and-order-before-1066", "norman-law-and-the-forest", "magna-carta-and-trial-by-jury", "vagabonds-plots-and-the-poor-law"]],
  ["crime-and-punishment---1700-to-today", ["highwaymen-and-the-bloody-code", "transportation-to-australia", "peels-police", "prisons-and-reformers", "crime-fighting-today"]],
  ["thinking-like-a-historian", ["change-and-continuity", "cause-and-consequence", "who-and-what-mattered"]],
];

test("Year 6 History category and topic ids are unchanged", () => {
  assert.deepEqual(ids(year6HistoryCurriculum), YEAR6_HISTORY_IDS);
});

// Year 6 Geography, built 2026-11-08. These ids are URL and progress keys.
const YEAR6_GEOGRAPHY_IDS = [
  ["regions-and-comparison", ["belize-and-the-caribbean-coast", "comparing-four-regions", "europe-the-americas-and-russia", "changing-uk-counties-and-cities"]],
  ["environmental-change", ["glaciers-and-mountain-environments", "managing-rivers", "managing-coasts", "climate-change-responses"]],
  ["people-resources-and-connections", ["energy-choices-and-trade-offs", "population-and-migration", "global-trade-networks", "changing-uk-land-use"]],
  ["maps-data-and-fieldwork", ["six-figure-references-and-scale", "digital-map-layers", "planning-a-fieldwork-enquiry", "presenting-and-evaluating-fieldwork"]],
];

test("Year 6 Geography category and topic ids are unchanged", () => {
  assert.deepEqual(ids(year6GeographyCurriculum), YEAR6_GEOGRAPHY_IDS);
});
