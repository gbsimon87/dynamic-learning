# Teacher everyday tools — design record (2026-11-09)

Three teacher-facing tools that save time on jobs outside lesson planning.
Lesson planning (`/teachers/planning`) is a separate workstream; these pages do
not change its files beyond a link.

The owner asked for topic briefings, a report comment builder and parent
explainers, and handed every design decision to the agent. Everything below is
the agent's call unless marked otherwise.

## Shared decisions

- New routes under `/teachers`: a hub at `/teachers`, plus `/teachers/briefings`
  and `/teachers/reports`, all `noindex`. The footer's "Teacher tools" link opens
  the hub, which also links to the planning pilot; the separate footer planning
  link was removed (owner decision 2026-11-09).
- No accounts and **no pupil data stored**. Nothing typed into these pages is
  saved, sent or written to browser storage; refreshing clears it.
- The pages reuse the planning pilot's scoped styles (`.teacher-planning`) and
  icons, plus `TeacherTools.css` for anything new. Both themes come from the
  existing `--light-*` / `--dark-*` tokens.
- Content is authored, not AI-generated at runtime. Its status is
  **technically validated, not content-reviewed**: a teacher must review the
  wording before it is called reviewed.

## 1. Topic briefings

A one-page subject-knowledge briefing for a teacher about to teach a topic.

- Every built topic in every year/subject gets a briefing page built from
  existing data: the topic, its strand, Bix's four introductions and worked
  examples, and links to the four challenges.
- **Pilot:** Year 3 Maths (44 topics, matching the planning pilot) also has
  authored teacher notes: the statutory requirement quoted verbatim from
  `docs/curriculum/year-3-maths.md`, the idea in brief, key subject knowledge,
  2–3 common misconceptions (mistake, why, response), vocabulary, prior
  learning and what comes next.
- Other topics say plainly that detailed teacher notes are not written yet.
- **Extended 2026-11-09 (owner decision):** Science, History and Geography are
  listed for every built year, and full teacher notes are being written for all
  327 of their topics, one course file at a time. Brief and rules:
  [briefing notes brief](2026-11-09-briefing-notes-brief.md). The tests check
  every registered course against its own programme of study
  (`programmeOfStudy` in `src/data/teacherBriefings/index.js`). Topics without
  Bix introductions no longer show an empty "How Bix teaches it" section.
- Data: `src/data/teacherBriefings/` (pure, Node-testable). A test checks that
  every Year 3 Maths topic has notes and that every statutory quote appears
  verbatim in the programme of study.

### Briefings feed the lesson plans (2026-11-09, owner approved)

The planning pilot and the briefings described the same topics twice. Briefing
notes are now the single source of subject knowledge, and
`teachingFromBriefing` in `teacherPlanningResources.js` derives each plan's
teach, support and checkpoint text from them. The order of precedence is:
hand-written pilot objective (practical activities kept, plus vocabulary and
link), then briefing notes, then the generic fallback. The briefing is the
reference ("what to know"); the plan is the sequence ("what to do in each
lesson"); they link to each other rather than repeat. Planning accepts
`?year=&subject=&topic=` to start with that topic added.

## 2. Report comment builder

Drafts an end-of-year report comment for one pupil at a time.

- The teacher picks the year, then for each subject: a band (working towards,
  expected or greater depth, or "not reported"), up to two strengths and one
  next step, chosen from that year's curriculum topics. They also pick up to
  three learning behaviours and an optional general target.
- They can type the pupil's first name and choose they/she/he; without a name,
  `[Name]` stays in the draft.
- The draft is template-built, deterministic and editable. "Reword" cycles the
  sentence variants so a class set does not read identically. A character and
  word count supports school length limits. Copy and "Next pupil" (which clears
  the name and the choices but keeps the year and subjects) finish the loop.
- Topic names are lowercased for prose, except proper nouns from a curated list.
- Data: `src/data/teacherReports.js`, pure with tests.

## 3. Parent explainers (public "parent guides")

Plain-English pages a teacher sends to parents or prints for a newsletter.

**Revised 2026-11-09 (owner approved):** the explainers overlapped with the
public curriculum guides (same audience, both offering help at home), so they
became the "how it's taught" layer beneath them:

- They live at `/parent-guides` and `/parent-guides/:slug`, with breadcrumbs
  Home / What we teach / Parent guides, and the data is in
  `shared/parentExplainers.js` so SEO and prerendering can read it.
- Each curriculum-guide area links to its explainers ("How it's taught: …") via
  one pattern per explainer (`GUIDE_STRANDS`). `/what-we-teach` lists every
  guide. Each explainer links back to the year guides it applies to, and the
  teacher hub links to the list.
- An explainer becomes a public, indexed and prerendered page only once its slug
  is added to `REVIEWED` after a teacher's content review. Until then the pages
  work by link but stay `noindex`.
- No help-at-home content was removed from the curriculum guides: the Maths and
  English guides offer free games rather than "little ideas", so the explainers
  don't duplicate them.

- Twelve explainers for the questions parents ask most: number bonds, place
  value, column addition, column subtraction, times tables (including the
  Year 4 check), short multiplication, short division, fractions, telling the
  time, phonics (including the Year 1 check), reading at home and grammar words.
- Each has what it is, how it is taught (steps plus worked examples drawn with
  the existing `LessonExample` renderer), the words your child will use, quick
  activities at home (no purchases, about five minutes each), common mix-ups,
  and links to free Bix practice.
- Calculation explainers say that methods vary between schools.
- The teacher can add a note and print it; the note is not saved and is not part
  of the shared link. Each explainer has its own URL to send to parents.
- Tests check the structure, the example shapes, that every practice link is a
  real route, that each explainer is linked from a guide in every year it
  covers, and that nothing goes public before review.

## Not in scope

Teacher accounts, saved reports or class lists, and AI-generated text at
runtime. Briefing notes for Maths beyond Year 3 and for English are not yet
planned.
