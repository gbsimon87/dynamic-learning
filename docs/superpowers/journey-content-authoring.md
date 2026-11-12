# Curriculum journey — content authoring guide

How to author introductions and Quest Mastery / Subject Final Test items for one
pathway (year + subject). Read with the [technical contract](plans/2026-11-11-curriculum-journey-technical-contract.md).
Reference example: Year 3 Maths Fractions in
`src/data/curriculumIntroductions/math/year3.js` and `shared/curriculumAssessments/math/year3.js`.

## Files

Each pathway has exactly two files. No index edits are needed: loaders import
`<subject>/year<N>.js` by convention.

| File | Helper | Contains |
|---|---|---|
| `src/data/curriculumIntroductions/<subject>/year<N>.js` | `defineIntroductions` | One subject intro, one intro per quest, one per built topic |
| `shared/curriculumAssessments/<subject>/year<N>.js` | `defineAssessmentBank` | At least three candidate items per built topic |

Use the exact quest (`categoryId`) and topic IDs from
`npm run journey:brief -- --year N --subject ID`. Include **every** built quest
and topic listed there, nothing else. Statutory source references are added
automatically from the generated mapping index (`shared/curriculumJourneySources.js`).

## Before writing

1. Run `npm run journey:brief -- --year N --subject ID`: IDs, names, built challenge
   slots, each topic's statutory mapping row and existing lesson titles.
2. For each topic, read what its four existing challenges actually ask:
   `npm run topic:context -- --year N --subject ID --topic TOPIC` lists the bank,
   lesson and game files. Match their year level, vocabulary and contexts.
   Never borrow content from another year or go beyond the mapping row.
3. Pick each item's `practice` challenge slot (1–4, built only) so a child who
   misses the item is sent to the challenge that teaches that skill.

## Introductions

```js
{ title, learn: ["…", "…"], use: "…", ex: "…", model: { renderer, data, alt } }
```

- `title`: short child-friendly heading. `learn`: 1–3 short statements of what
  they will learn. `use`: one concrete everyday use. `ex`: one simple
  illustrative example. Target 40–80 words for subject/quest, 25–60 for topic.
- Purpose and usefulness, not method: the challenge's own lesson still teaches
  the method. Do not copy the lesson screen.
- Use the year's reading level: Year 1–2 very short sentences and common words;
  Year 5–6 can be fuller. British English.
- `model` must be a useful picture with a full text equivalent in `alt`.

## Models (`model` on intros and items)

| Renderer | `data` | Use for |
|---|---|---|
| `lesson` | A LessonFrame example: `{ type, title, note?, … }` with type `equation` (`parts`), `column` (`top, bottom, op, answer`), `steps` (2–5 `steps`), `jumps` (`terms`, `step?`), `bar` (`bars: [{parts, shaded, label}]`), `groups` (`groups`, `label`), `table` (`headers`, `rows`), `sentence` (`text` with a `**marked**` part), `fix` (`wrong`, `right`), `diagram` (`kind` rectangle/angle/polygon/coordinates/graph/cuboid/grid + fields as in `LessonDiagram.jsx`) | Maths, grammar, spelling, any worked idea |
| `pictures` | `{ title?, items: [{ icon: "🌱", label: "Seed" }] }` (1–12) | Science, geography, history, art, music, PE, wellbeing, French vocabulary |
| `timeline` | `{ events: [{ date, label }] }` (2–10) | History chronology |
| `clock` | `{ hour: 1–12, minute: 0–59 }` | Telling the time (analogue face, hands only) |
| `bar-chart` | `{ title?, unit?, step, bars: [{ label, value }] }` (2–8 bars, ≤20 gridlines) | Bar charts and data reading |
| `table` | `{ caption?, headings: [], rows: [[]] }` | Data, comparisons, keys |
| `groups` / `number-line` / `fraction-bars` | see `shared/curriculumJourneyModels.js` | simple counts |
| `text` | `{ title?, lines: [] }` | Last resort only, never instead of a needed diagram |

**A quiz model shows givens only.** Its `alt` text is shown as a visible
caption too, so it describes the givens ("An analogue clock.") and never states
the answer ("A clock showing half past 3"). Never draw the answer: a `bar` without an
explicit `label` prints `shaded/parts`; pre-split `groups` show a share; a
labelled diagram may give the answer away. The checker rejects a model that
contains the answer text, and equations that are false.

## Items

```js
{ q: "Prompt", a: "right", d: ["wrong", "wrong"], why: "Explanation shown after answering" }   // choice
{ q, n: 12 | "3.5" | -4, unit?, label?, why }   // number (digits/decimal/sign handled)
{ q, t: "word" | ["word", "alternative"], why } // short text, case-insensitive
{ q, order: ["first", "second", "third"], why } // order cards (stored order is the answer)
{ q, sort: { bins: ["Living", "Never alive"], cards: [["Cat", "Living"], ["Rock", "Never alive"]] }, why }
```

Optional: `model`, `evidence: [{ title, text, credit? }]` (passages, sources),
`practice` (challenge slot, default topic `practice` or 1), `say` (`false` or the
exact words to read aloud), `obj` (overrides the topic objective).

Topic entry: `{ objective: "What these items sample", practice?, items: [...] }`.

Rules:

- **At least three distinct items per topic.** Vary facts, contexts and
  representations, not only numbers or option order. Prefer a mix of input kinds
  where it suits the skill; do not flatten everything into choice questions.
- **Recompute every answer independently** after writing, then check that every
  distractor is unambiguously wrong and plausible for a child of that year.
  Exactly one option may be correct. Options are shuffled automatically.
- Stay inside the topic's mapping row and the year. No trick questions.
- `why` explains the reasoning in one or two short sentences, kindly.
- Speech: Maths and most subjects read the prompt aloud by default; give `say`
  with words when symbols read badly (e.g. `"2/7"` → "two sevenths"). English and
  French default to **no speech**: never read out a reading passage's answer or a
  spelling. Give `say` only for an instruction that reveals nothing.
- Spelling without dictation: use "Which word is spelt correctly?" choices or a
  `t` item where the word is not shown or spoken anywhere.
- French: prompts in English with French words; text items get
  `chars: FRENCH_CHARACTERS` (import from the helper) so accents can be typed.
- Art, design, music, PE, wellbeing and computing: knowledge and application
  questions only. State this honestly in `objective`, e.g. "Knows how tone shows
  light and shadow (knowledge check, not a drawing assessment)". Music items must
  not depend on hearing a sound.
- History/Geography: keep sources and evidence (`evidence` cards with credits,
  `timeline`, `table`) where the challenge used them.

## Checks

```sh
npm run check:journey -- --year N --subject ID   # must end with 0 gaps
npx eslint <your two files>
```

The checker validates schemas, IDs, sources, pool sizes, quiz selection and
some answer leaks. It does **not** check facts or answers: that is your review.
Record any limitation (e.g. a skill that cannot be sampled on screen) in your
report.
