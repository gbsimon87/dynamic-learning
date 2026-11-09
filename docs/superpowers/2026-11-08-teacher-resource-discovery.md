# Teacher resource discovery — Year 3 pilot

Date: 2026-11-08. Branch: `feat/teacher-planning-playlists`.

## Delivered behaviour

The planning preview now accepts classroom vocabulary instead of requiring a
teacher to recognise Bix's quest names or inspect every challenge. Nine learning
focuses map to the existing twenty pilot curriculum challenges and Fraction Fun.
Teachers can find activities before drafting a plan or inside an individual
lesson. A discovered objective can be included in planning focus; a discovered
activity can be added to a lesson without changing its objective, notes or order.
Changing planning focus does not regenerate an existing draft.

Each activity has an additional teacher title, learning objective, description
of the child's actions, starting knowledge, teaching use, scope and any important
limits. Existing curriculum titles, IDs, URLs and learner progress remain intact.
The original identity and child-facing title are visible in the description.
Selected activities retain their description and alignment explanation in print.

## Matching and teacher decisions

- Reviewed aliases include fractions of amounts/quantities/sets and units/ones
  or Dienes/base ten. Normalisation handles case, punctuation and simple plurals.
  Exact reviewed phrases take priority over loose word matches.
- “Finding halves” offers shapes, quantities or number lines; no activities are
  shown until the teacher resolves this ambiguity. Unknown vocabulary produces
  an explicit no-match state, with a route back to the available focuses.
- Search only covers this pilot. There is no inferred mapping to an unreviewed
  challenge, external AI service or confidence percentage.
- Representation and availability matter. Fraction Fun is shape practice and is
  excluded from quantity/number-line matches. Unbuilt challenges are excluded;
  an empty match remains empty. Different-objective additions are explained.
- Number-line activities use thirds, quarters, fifths and sixths, not halves;
  this limitation is visible when choosing the number-line focus.
- Scope describes part of an objective, not complete coverage or mastery. A
  broad objective can have several representations; adding an objective does
  not constrain the entire generated sequence to a single search term.

## Content review evidence

Reviewed the [Year 3 fractions and mental arithmetic statutory mappings](../curriculum/year-3-maths.md),
all twenty wrapper topic/level bindings, and their actual banks/renderers:

- [Fractions bank](../../src/data/challenges/year3Fractions.js) and
  [renderer](../../src/pages/skills/math/challenges/year3/Year3FractionGame.jsx).
- [Place-change bank](../../src/data/challenges/addingAndSubtractingPlaces.js)
  and [renderer](../../src/pages/skills/math/challenges/year3/adding-and-subtracting-ones-tens-and-hundreds/PlaceChangeGame.jsx).
- [Fraction Fun bank](../../src/data/freePlay/fractionFun.js),
  [shape geometry](../../src/data/freePlay/fractionShapes.js) and
  [game](../../src/pages/skills/math/FractionFun.jsx). The reviewed starting
  choice is Easy; levels/types must still be selected manually in the game.

Descriptions record differences that broad topic labels obscure: fractions of a
set Challenge 3 asks for a numerator, not the count of objects; fractions as
numbers Challenge 4 is a written ribbon-length problem; comparing Challenge 3
orders cards sharing a denominator; Equivalent Fractions Challenges 1 and 2 use
the same bank and interaction and are not successive difficulty levels.

The [catalogue](../../src/data/teacherResourceCatalogue.js) holds teacher
descriptions and reviewed vocabulary. The existing resource adapter preserves
stable curriculum identities and injects built availability. Read-only examples
come from the actual pure question builders with a deterministic random source,
not copied question banks or mounted challenge runners. Their simplified SVG
models are illustrative previews; they do not submit answers, use a child profile
or write assessment, progress or reward records.

This is a source/content comparison by the implementing agent. Teacher review,
teaching effectiveness, physical devices and assistive technology still require
separate review.

## Verification

| Review | Evidence and limits |
|---|---|
| Implemented | Reviewed metadata for 20 curriculum activities and Fraction Fun; nine learning focuses, aliases and ambiguity handling; global discovery/objective inclusion; per-lesson discovery/addition, duplicate prevention and mismatch explanation; read-only bank-backed examples; resource context in print. No new routes, dependencies or store writes. |
| Technically validated | Full lint and production build pass. Ten focused planner/catalogue tests pass. All 101 component files / 947 tests pass, including five new discovery workflows and the existing six planning workflows. Tests cover synonyms, ambiguous/unknown terms, representation boundaries, missing availability, bank-backed examples, preservation of edits and absence of storage writes during preview. |
| Full suite limits | `npm test`: 2,787 Node tests pass, four MongoDB-dependent tests skip and three unchanged content tests fail: Year 6 English lesson formatting; expected six stories versus 18; `mountain-hut` 86 words versus its 96–140 band. Components ran separately because the Node failure stops the combined command. The failing source/test files are unchanged from HEAD. Logs: `/private/tmp/bix-teacher-discovery-{lint,build,alltests,components}.log`. |
| Browser/layout | One batched local Chrome pass at 1280, 768 and 360 pixels, light and dark: no catalogue or lesson-finder horizontal overflow; ambiguity selection, examples, add/duplicate controls and retained notes work; sampled text contrast exceeds 4.5:1; no page errors. Checked number-line, counter, bar, shape and base-ten example models. Print includes all 15 lessons, resource context and newly added activity; an A4 PDF was generated. Artifacts: `/private/tmp/bix-teacher-discovery-qa/`. In-app Node REPL/browser tools were unavailable, so the repository Playwright dependency drove isolated local Chrome. |
| Remaining review | Physical touch devices, screen readers, teacher review and teaching effectiveness are unverified. No full challenge completion was performed in this browser pass: examples are read-only, and the actual challenge runners are unchanged. SEO validation was not repeated: no public route, public catalogue, guide or SEO output changed; the prior milestone records its stale Number Bonds script assertion. |

## Evidence input follow-up

Quick class needs, pasted topic totals and fuzzy spelling suggestions were
subsequently implemented in the same worktree. See the
[class-input record](2026-11-08-teacher-class-input.md) for current behaviour and
checks; the sections above record the earlier discovery milestone.

The agreed direction was three entry routes: quick teacher judgement by topic;
paste existing class-topic totals or pupil/question results; later run a Bix
pre-test. Quick entry needs no roster. Ask teachers to confirm ambiguous topic
headings using the same reviewed vocabulary. Keep teacher judgement distinct
from measured results; preserve incorrect/skipped/not-assessed distinctions.
Class totals support class priorities; pupil grouping requires individual
evidence. A total test score cannot identify topic gaps. Saving/reopening must
accompany real teacher use so entry and edits are not lost on refresh.
