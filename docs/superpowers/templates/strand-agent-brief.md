# Strand agent brief: Year <N> <subject>, <strand(s)>

Fill in the angle brackets and send this as the content agent's whole prompt.
It is the brief that wrote 20 Year 6 Science topics that passed their tests the
first time (see [the course record](../2026-11-04-year6-science-course-build.md)).
Remove any section the subject does not use.

---

You are writing question banks for Year <N> <subject> in "Learn with Bix", a
React learning app for children (repo: <absolute repo path>). The
infrastructure exists; you only write content in:

- `<bank file 1>` (strand "<strand title>")
- `<bank file 2>` (strand "<strand title>")

Do not edit any other file. Another agent is writing `<other files>` at the
same time. Do not commit.

## Read first

1. `<pilot strand file>`: the finished model strand. Copy its structure and
   style, including how questions carry their own `visual` or `table`.
2. `<engine file>`: the helpers, and how a level's questions are drawn
   (`<level recipe, e.g. level 1 = 5 facts; level 2 = 3 facts + 2 sorts …>`).
3. `<an earlier year's strand and its figures file>`, for tone and picture
   conventions.
4. `docs/curriculum/<statutory file>` lines <from–to>: the statutory text for
   your strands. It is the teaching boundary.
5. `<visual renderer>`: the figure types and their props, especially
   `<new types for these strands>`.

## Each file exports three things

```js
export const <strand> = { "<topic-id>": { rule, hint, facts, sorts, structures, enquiries }, ... };
export const <strand>Visuals = { "<topic-id>": <topic picture>, ... }; // one per topic
export const <strand>Rules = { "<topic-id>": [rule(/regex/, visual), ...] }; // optional
```

Per topic, match the pilot: <12 facts; 3 sorts of 6 cards with at least one
per group; 5 structures (orders of exactly 4, sentences, a sort); 12 enquiries
with at least 6 choice/number and at least 4 others>. `rule` is a 1–3 sentence
teaching note for the age group; `hint` helps without giving the answer.

## Topics (IDs are permanent; use exactly these keys)

<For each file: each topic ID, then one line of what it covers. Then the
statutory bullets, quoted verbatim.>

<Safeguarding limits for any sensitive topic: what to cover, what never to
name, and that the safe answer is "tell a trusted adult".>

## Pictures

Every topic needs a topic picture for the start screen and level 1. It sets
the scene and never labels or shows the answer to a level 1 question. Questions
that need a diagram may carry `visual` directly. Each figure rule must fire at
least once (the test checks), must draw only what the question text states and
must never reveal an answer.

## Content rules

- Correct facts, British spelling and plain sentences for the age group. The
  US-spelling check flags "meter" even for an instrument: say "sensor".
- Exactly one defensible answer; wrong options clearly wrong, not partly true.
  Keep option lengths similar, so the answer is not simply the longest.
- An order task needs one defensible order. A sort's cards must fit its prompt's
  starting point.
- Sentence answers are 4–9 words with no commas and a full stop; add
  `alternatives` only for genuinely equivalent word orders.
- No two prompts may be the same within facts, sorts, structures or enquiries.
  Name a child (Leo, Maya, Ellie) to keep them distinct.
- Number answers are whole numbers from 0 to 999.
- Stay inside the statutory bullets and their notes. <Subject exclusions, e.g.
  series circuits only; no genes or chromosomes.>

## Verify before finishing

Run `node --test --test-reporter=spec <subject test file>`. The shape test
fails until every strand is written; ignore only that one. Run
`npx eslint <your files>`. Then reread every question once as a careful
teacher would: recompute numbers, follow each key or diagram, remove ambiguity.

## Report back (concisely)

Topic IDs with their counts, judgement calls (especially sensitive topics),
test and eslint results, and every fact you were unsure of.
