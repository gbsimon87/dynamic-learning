# History, Years 1–4: shared design spec

**Status:** Approved by the owner, 2026-10-12.
**Tracker:** [HISTORY_TRACKER.md](HISTORY_TRACKER.md). Read it first when resuming.
**Year specs:** [Year 1](year-1-design-spec.md) · [Year 2](year-2-design-spec.md) ·
[Year 3](year-3-design-spec.md) · [Year 4](year-4-design-spec.md)

This file holds everything the four years share: the teaching model, the engine,
images, tone, accuracy, registration and testing. Each year spec holds only its
units, topics, level design and age settings. Where a year spec and this file
disagree, the year spec wins for that year.

## 1. Goal

Add History to Curriculum Mode for Years 1–4, aligned to the national curriculum
for England. It must teach children who have not met a topic at school yet, use real
historical sources, and leave every existing subject's progress untouched.

**Out of scope:** Years 5 and 6; Skills Mode History games; History jokes for Bix.

## 2. Decisions (approved 2026-10-12)

| Decision | Choice |
|---|---|
| Years | 1, 2, 3 and 4. All four specs are written before any implementation plan |
| KS1 split (Years 1–2) | Every statutory strand in both years, Year 2 deeper; local history taught as "how to find history near you" |
| KS2 split (Years 3–4) | Y3: Stone Age to Iron Age, Roman Britain, first civilisations (overview + Ancient Egypt). Y4: Anglo-Saxons and Scots, Vikings. Ancient Greece, a non-European society, the local history study and the "beyond 1066" theme are left for Years 5–6 |
| Visuals | Real artefact and document images under CC0 or public domain only, plus drawn SVG scenes, maps, timelines and portraits |
| Teaching | Each challenge opens with a "Bix explains" story card; every question can be answered from it |
| Tone | Honest but gentle; see §5 and each year's age rules |
| Build | One shared engine: a story-card phase in front of the existing `DataChallenge`; topics are content data |

## 3. Learning model

### Story card, then rounds

Every challenge is **one story card followed by a short run of rounds**.

- The card holds a few short sentences, one picture or source, and a 🔊 button.
  Word and sentence limits are set per year (§3.4).
- The child taps "Let's go!" to start the rounds.
- During the rounds a "📖 Bix's story" button reopens the card, so a child can check
  rather than guess. Reopening it never costs anything.
- **A level's bank only asks what its card (and source) shows.** Each round names the
  phrase on the card that answers it, and a test checks that the phrase is there (§9).

### The four challenges

The four slots follow the historical concepts the curriculum names (chronology,
sources, similarity and difference, change, cause, significance). The exact focus of
each slot is set per key stage in the year specs; the shape is always:

| Slot | Shape |
|---|---|
| 1 | Meet it: key facts and words, with the most support |
| 2 | Time: order, then and now, or where it sits on a timeline |
| 3 | History detective: what a source tells us, and what it can't |
| 4 | Think like a historian: compare, explain or judge why it matters |

### Round types

All rounds are existing `DataChallenge` question kinds (`src/data/challenges/questionKinds.js`),
so their rules and fairness checks already exist and are tested.

| Round | Kind | Used for |
|---|---|---|
| Choice | `choice` | Facts, vocabulary, "which source shows…", "why…" (2–3 options in KS1, 3 in KS2) |
| Sort | `sort` | Then / now; old / new; Stone / Bronze / Iron; Roman / Briton |
| Order | `order` | Put 3–5 events, objects or pictures in time order |
| Timeline | `choice` + timeline visual | Tap the band where an event belongs; the timeline is a read-only visual from `renderVisual` |
| Source | `choice` + source visual | A real image or document with "What does this tell us?" / "What can't it tell us?" |

A topic that needs something richer (for example a map) adds a visual through
`renderVisual`, not a new engine.

### Age settings

| Setting | Year 1 | Year 2 | Year 3 | Year 4 |
|---|---|---|---|---|
| Story card | ≤ 30 words | ≤ 45 words | ≤ 60 words | ≤ 70 words |
| Longest sentence | 10 words | 12 words | 16 words | 18 words |
| Rounds per run | 4 | 5 | 5 | 5 |
| Options per choice | 2–3 | 3 | 3 | 3 |
| Bank per level | ≥ 6 | ≥ 7 | ≥ 7 | ≥ 7 |
| 🔊 on every round | yes | yes | yes | yes |
| Dates shown | none; "long ago", "when grandparents were young" | a few famous years as labels (1666) | years and BC/AD as labels | years and BC/AD as labels |
| Date arithmetic | never | never | never | never |

Because a run draws from a bigger bank, replays differ but stay answerable from the
same card. Each topic uses at least three round types across its four slots.

## 4. Engine

### Files

```
src/components/challenge/history/HistoryChallenge.jsx   story phase, then DataChallenge
src/components/challenge/history/StoryCard.jsx
src/components/challenge/history/TimelineVisual.jsx     read-only bands; theme tokens
src/components/challenge/history/SourceVisual.jsx       image/document + caption + credit
src/components/challenge/history/HistoryVisual.jsx      renderVisual switch (timeline, source, scene, map)
src/data/challenges/history/engine.js                   builds { story, questions } from a topic's data
src/data/challenges/history/engine.test.js
src/data/challenges/history/year<N>/<camelTopic>.js     one topic: four cards, four banks, references
src/data/challenges/history/year<N>/index.js            BUILDERS keyed by topic id, TITLES
src/data/year<N>HistoryCurriculum.js                    dataset per year
src/data/year<N>HistoryCertificateSkills.js             "I can…" line per topic
src/pages/skills/history/challenges/year<N>/<topic-id>/<Pascal>Challenge1–4.jsx
src/assets/history/images/<image-id>.webp
src/assets/history/manifest.json
scripts/history-assets/                                 fetch, verify, resize and pin images
```

### Data flow

1. A wrapper renders `HistoryChallenge` with `year`, `topicId`, `level` and `onComplete`
   (the same shape as `Year1ScienceGame`).
2. `HistoryChallenge` looks up the topic's builder and calls `build(level, rng)` once,
   memoised, to get `{ story, questions }`.
3. Phase `story`: `StoryCard`. "Let's go!" moves to phase `rounds`.
4. Phase `rounds`: `DataChallenge` runs the questions, with `readAloud` on and
   `renderVisual` set to `HistoryVisual`. The "📖 Bix's story" button sits above it.
5. `ChallengeShell` calls `onComplete({ combos })` once, unchanged. Nothing in History
   touches progress.

`DataChallenge` currently calls `build` itself. The engine either passes a builder
that returns the memoised questions, or `DataChallenge` gains an optional
`questions` prop. The implementation plan picks one; both keep other subjects unchanged.

Wrappers follow the loader convention exactly (`challengeAvailability.js` and
`Challenge.jsx` glob `skills/*/challenges/year*/*/*Challenge*.jsx`). Compute names with
the snippet in the `building-curriculum-topics` skill; never type them.

## 5. Tone

Applies to every year; the year specs tighten it for younger children.

- Name hard things plainly and briefly: conquest, war, slavery, unfairness, death.
  One short sentence, no detail of how anyone was hurt.
- No gore and no graphic images. No images of human remains apart from wrapped
  mummies, coffins and masks.
- Prefer "how do we know?" framing over drama.
- Never mock people in the past. Different is "different", not "silly" or "stupid".
- Present people fairly: say what they did and why they are remembered, and where
  something they did hurt others, say so plainly (for example Columbus).

## 6. Images and licences

- **Allowed:** CC0 or public domain only, from sources that state it: Met Museum Open
  Access, Cleveland Museum of Art, Rijksmuseum, Library of Congress (no known
  restrictions), Smithsonian Open Access (CC0), Wikimedia Commons files marked public
  domain or CC0. Not CC BY, BY-SA or NC, so no attribution-only, share-alike or
  non-commercial terms to manage.
- **UK-held 2D artworks:** some UK institutions claim copyright in photographs of old
  paintings. Use a copy the holder itself releases as CC0/PD, or a Wikimedia file with
  no institutional claim recorded; otherwise draw it.
- **Modern people and in-copyright works** (for example Tim Berners-Lee, L. S. Lowry's
  paintings): use a drawn portrait or scene, never a copied photo.
- **Manifest entry per image:** `id`, `title`, `institution`, `objectUrl`, `fileUrl`,
  `licence`, `creator` if known, `date` if known, `retrieved`, `sha256`, and child-friendly
  `alt` text.
- **Pipeline:** `scripts/history-assets/` downloads each pinned URL, checks the hash,
  resizes to at most 800 px on the long edge, and writes WebP of at most 120 KB,
  following `scripts/science-assets/pinned.mjs`.
- **Credits:** the `/credits` page lists every History image from the manifest.
- **Drawn work** (timelines, maps, scenes, portraits) is in-house SVG using
  `--light-*` / `--dark-*` tokens so it works in both themes.

## 7. Accuracy

- Every topic file carries a `references` list of reputable sources (for example the
  British Museum, English Heritage, Historic Environment Scotland, the Museum of London,
  the National Archives, Royal Museums Greenwich, BBC Bitesize). Reviewers check every
  fact against it.
- Use the dates schools teach. Where historians disagree, say "about".
- British English throughout (`lintBuild` already flags US spelling).

## 8. Registration

Done once, with whichever year is built first.

| Where | Change |
|---|---|
| `src/data/curriculumRegistry.js` | Add `{ id: "history", name: "History", icon: "🏛️" }` to `CURRICULUM_SUBJECTS`; add one `CURRICULA` entry per year with `countsTowardYear: false` until all its topics ship, so finished years keep their certificate |
| `src/data/childFields.js` | Add `"history"` to `CHILD_SUBJECTS`, or sign-up and profile edits reject it with `INVALID_SUBJECTS`. `childFields.test.js` holds this in step with `CURRICULUM_SUBJECTS` |
| `server/signup.test.js` | Its invalid-subject case uses `"history"`; change it to a subject that will never exist (for example `"astrology"`) |
| `src/data/certificateSkills.js` | Import each year's topic skills; `certificateSkills.test.js` requires a line for every registered topic |
| `src/data/year<N>HistoryCurriculum.test.js` | Lock each year's IDs in its own `LOCKED_IDS`, as `year1ScienceCurriculum.test.js` does |
| `docs/curriculum/key-stage-1-history.md`, `key-stage-2-history.md` | Fill the mapping sections: the year split, each topic → statutory bullet, and what is deliberately not covered |
| `src/pages/credits/Credits.jsx` | History image credits from the manifest |

The progress API and store already accept any subject, so History progress lives in its
own `(childId, year, "history")` progress documents and cannot touch other subjects. **No progress
shape, storage key or unlock rule changes.**

Adding History to `CURRICULUM_SUBJECTS` shows it for every year, including years not
yet built, which show it the way Geography appears today. Verify that state.

### Titles are permanent

Category and topic titles become IDs through `toKebabCase()` and are used in URLs and as
progress keys. Once a year ships, renaming one is a progress migration
(`curriculum-progress` skill), not an edit.

Titles use plain English letters only. `toKebabCase()` deletes anything outside a–z and
0–9, so "Æthelred" would become `thelred`. Write "Aethelred" or leave the name to the
story card. The dataset test checks that every title produces the ID expected.

### Release order

A challenge becomes available when its file exists, and adding an earlier missing slot
after a later topic has been played can re-lock it. So: register a year's dataset first
(every topic shows "Coming soon"), then build topics strictly in dataset order and
release all four wrappers of a topic together. No placeholder wrappers.

## 9. Testing and verification

**Automated (`npm test`):**

- Per year: dataset shape and topic count; IDs locked.
- Every builder: `assert.deepEqual(lintBuild(build, { titles, year }), [])`, which covers
  answers present, no duplicate options, orders not already sorted, US spelling.
- Story cards: within the year's word and sentence limits; every round's answering
  phrase is on its card.
- Each topic uses at least three round types.
- Every image id used exists in the manifest with an allowed licence and alt text.
- `CHILD_SUBJECTS` matches `CURRICULUM_SUBJECTS`; a certificate line for every topic.
- All wrappers exist and forward `onComplete` with the right level.

**Manual, per topic:** all four challenges in the browser with a child of that year, both
themes, phone width: story card, reopening it, every round type, two misses showing the
hint, completion, progress after reload, the next topic unlocking. If browser tooling is
unavailable in a session, record that in the tracker.

**Regression, once per year:** existing progress in every other subject and year still
loads unchanged.

## 10. Delivery shape

Each year is delivered the same way, after its implementation plan is approved:

1. Groundwork: mapping section, dataset, registry entry, certificate lines, tests;
   "Coming soon" verified. (The first year built also does §8's one-off registration
   and builds the engine.)
2. The year's first topic end to end as a pilot. **Owner review before more topics.**
3. Remaining topics in order, one category at a time, with owner review at each
   category's end.
4. Full regression; docs (`PROJECT_KNOWLEDGE.md` §4.2, §5, §7; `PROJECT_IDEAS.md`);
   tracker updated.

The tracker is updated after every topic and at every pause.
