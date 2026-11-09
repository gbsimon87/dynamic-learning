# Teacher briefing notes: authoring brief (2026-11-09)

Owner decision 2026-11-09: write full teacher notes for **every** Science,
History and Geography topic in Years 1–6 (327 topics), in the same shape as the
Year 3 Maths pilot. Design record: [teacher everyday tools](2026-11-09-teacher-everyday-tools.md).

Status of all notes: **technically validated, not content-reviewed.** A teacher
must review the wording before it is called reviewed.

## One file per course

`src/data/teacherBriefings/year{N}{Subject}.js`, for example `year3Science.js`,
exporting one object `YEAR{N}_{SUBJECT}_BRIEFINGS` keyed by every topic id in
`loadCurriculum(N, subject)`, and nothing else. Register it in `NOTES` in
`src/data/teacherBriefings/index.js` as `"N:subject"`. Copy the header comment
style of `year3Math.js`, naming the programme-of-study file it quotes.

## Entry shape

| Field | Content |
|---|---|
| `statutory` | 1–2 strings copied **exactly** from the statutory text in the programme-of-study file (`programmeOfStudy(year, subject)` in `index.js`): the requirement the topic's mapping row serves. Quote statutory bullets or statutory aims, never non-statutory guidance, mapping-table "focus" columns or app wording. The test checks each quote against the file (whitespace and curly quotes are normalised). |
| `inBrief` | 1–2 sentences: the essential idea and why it matters. |
| `keyFacts` | 3–5 accurate subject-knowledge points a teacher needs, ending with the boundary: what this year does not expect (take it from the non-statutory notes and the mapping row). |
| `misconceptions` | 2–3 `{ mistake, why, response }`: real pupil errors, why they happen, and a practical classroom response. |
| `vocabulary` | 4–8 `{ term, meaning }`, defined in words a teacher can say to the class. |
| `before` | What pupils met before: the previous year's topic, or EYFS for Year 1. |
| `next` | Where this leads: the next year or key stage. |

## Rules

- **Match what children see.** Read the topic's challenge data first (story
  lines, field notes, rules, glossaries) so names, dates and terms agree with
  Bix. Locations:
  - Science Y1–Y2: `src/data/challenges/year{1,2}Science/` (`rule`, `hint` per question).
  - Science Y3: `src/data/challenges/science/<camelCaseTopic>.js` (`GLOSS`), `shadowModel.js`, `magnetModel.js`.
  - Science Y4: `src/data/lessons/science/year4.js` and `src/data/challenges/year4Science/`.
  - Science Y5–Y6: `src/data/challenges/year{5,6}Science/` (`rule`, `hint`, `facts`).
  - History: `src/data/challenges/history/year{N}/` (`levels[n].story.lines`, `references`).
  - Geography: `src/data/challenges/geography/year{N}/` (`lessons[n].notes.lines`).
- **Statutory mapping:** science `docs/curriculum/year-N-science.md` (topic
  mapping table at the end); history `key-stage-1-history.md` /
  `key-stage-2-history.md` (topic crosswalks); geography
  `key-stage-1-geography.md` / `key-stage-2-geography.md` (requirement key and
  topic mapping) plus `docs/geography-curriculum/year-N-design-spec.md`.
- **Accuracy first.** Dates, names and scientific facts must be right. Mark
  legends and contested claims as such. Avoid figures that go out of date
  (populations, records); use "about" where a rounded figure is needed.
- **Sensitive history** (conquest, slavery, sacrifice, punishment) is stated
  soberly, in a way a teacher can use with 5–11 year olds.
- **Voice:** UK English, plain and practical, written for teachers. No em
  dashes. No claims of review, approval or outcomes.
- **Checks:** `node --test src/data/teacherBriefings/teacherBriefings.test.js`
  runs the shape and verbatim checks for every registered course.
