# Teacher planning and playlists

Date: 2026-11-08  
Branch: `feat/teacher-planning-playlists` (from local `dev`)  
Status: milestone 1 and pilot teacher resource discovery implemented; milestones
2–4 pending. See the [discovery record](../2026-11-08-teacher-resource-discovery.md)
for classroom vocabulary and source review. Quick class needs, pasted totals and
generation from confirmed needs are now an additional unsaved pilot; see the
[class-input record](../2026-11-08-teacher-class-input.md). Search now covers all built challenges
in the selected year/subject; see the [full-curriculum search record](../2026-11-08-teacher-full-curriculum-search.md).
Earlier milestone evidence below describes its original scope. Full merge validation
has unrelated existing content-test and SEO-script failures (see evidence below).

## Outcome and pilot

A teacher reviews evidence from a pre-test, identifies class priorities, and
creates an editable three-week teaching plan. Each lesson combines existing
Bix challenges and Skills games with teacher notes, discussion and practical
activities. The underlying playlist is an ordered set of resource references;
the plan supplies objectives, timing, groups and checkpoints around it.

Pilot: Year 3 maths. The example class needs more teaching on fractions and
less on adding/subtracting ones, tens and hundreds. The teacher reviews the
evidence and accepts or changes each recommendation. A three-week plan covers
selected objectives, not an automatic promise to teach the whole fractions strand.

## Repository findings and constraints

- [Year 3 maths](../../../src/data/year3MathCurriculum.js) supplies existing
  curriculum resource identities. Use built availability from
  [challengeAvailability](../../../src/data/challengeAvailability.js), not
  registration alone. [Skills catalogue](../../../shared/skillsCatalog.js)
  supplies existing game routes, but does not establish objective alignment.
- [Year 3 statutory source and topic mapping](../../curriculum/year-3-maths.md)
  decides teaching scope. Read the exact rows before authoring assessment items
  or mapping resources. Review Skills game levels individually for suitability.
- [ChallengeShell](../../../src/components/challenge/ChallengeShell.jsx)
  retries until correct and completes with `{ combos }`. Existing completion
  totals cannot establish first-answer accuracy or a misconception. A diagnostic
  assessment needs its own runner and evidence records.
- [Account types](../../../shared/accountTypes.js) currently cover parents and
  learners. [Database collections](../../../server/db.js) have no school/class
  membership model. Teacher membership and pupil access require explicit design;
  a teacher must not acquire access to family profiles by sharing an identifier.
- Follow the [progress skill](../../../.claude/skills/curriculum-progress/SKILL.md).
  Assessment and planning records stay separate from completion and rewards.
  Use the existing async store seam with equivalent local/API contracts when
  persistence is introduced. Browser storage is a development convenience.

## Teacher workflow

1. Choose Year 3 maths objectives, three weeks, lesson count and lesson duration.
   Suggest five lessons per week as an editable starting value.
2. Review assessment evidence by objective: responses, pupils assessed, omissions
   and coverage. Distinguish incorrect, skipped and not assessed.
3. Review suggested whole-class priorities and pupils needing a follow-up check.
   Class averages must retain the visible distribution of pupil results.
4. Generate a draft plan, with an explanation linking each priority to evidence.
   Use explicit, testable planning rules for the pilot. No external AI service
   is needed to propose or edit the sequence.
5. Edit lesson objectives, notes, activities, durations and order. Add/remove
   existing resources; provide buttons for reordering as well as any drag control.
6. Save and reopen the plan once persistence is implemented. Launch resource links
   using normal child selection for curriculum work. An unsaved draft must be
   labelled clearly in the initial preview.
7. Review a short checkpoint using fresh questions. Updating recommendations
   produces a proposal; it never silently overwrites the teacher's edited plan.

## Evidence and planning rules

- Show correct/answered counts alongside coverage. Do not label a child secure
  or assign a misconception from a single answer. Any pilot thresholds are
  visible, provisional teaching heuristics and require teacher review.
- Distinguish assessment responses from supported practice. Record item/version,
  objective, initial response/outcome, skipped status and any assistance used.
  Assessment submissions must be scored server-side for the live API flow.
- Start with a bounded screen of the selected objectives, followed by optional
  targeted checks where evidence is thin. Decide question counts after content
  review; a very short test cannot diagnose all Year 3 maths objectives reliably.
- Sequence relevant prerequisites before dependent work. Treat equal sharing
  and equal parts as prerequisite checks where appropriate, with their own
  curriculum mapping rather than inventing Year 3 requirements.
- In the sample scenario, focus teaching on supported fractions gaps and include
  brief addition/subtraction retrieval. Give remaining pupils suitable support
  or extension based on their own evidence.
- Each lesson includes an objective, teaching prompt/worked-example reference,
  guided or practical activity, selected Bix practice, and a checkpoint. Display
  missing teaching material honestly instead of generating unreviewed resources.
- Skills games may be endless: use an editable suggested duration and teacher
  instruction. A playlist does not introduce a new completion or mastery rule.

## Proposed records (design boundaries, not shipped schemas)

| Record | Purpose and ownership |
|---|---|
| Resource reference | Curriculum identity tuple or Skills catalogue route, with reviewed objective/level metadata; resolve current availability on use |
| Assessment definition | Versioned authored items, objective mapping and scoring rules; answer keys excluded from pupil-facing API payloads |
| Assessment session/result | Assigned class/pupil, definition version, item responses, submission state and evidence summary; distinct from progress |
| Teaching plan | Teacher owner, evidence reference, year/subject, editable schedule, lesson notes and ordered resource references |
| School/class membership | Authorised teachers and pupils; determines access independently of existing family ownership |

Persist stable resource identities, not copied question banks. Freeze the evidence
summary/version used for a generated draft so its rationale stays explainable.
Plan edits need a revision/conflict policy; immutable assessment submissions need
duplicate-submission protection. Define both before adding live writes.

## Implementation milestones

### 1. Reviewable planning preview — implemented 2026-11-08

- Add a teacher planning preview at `/teachers/planning`, clearly marked as a
  preview with sample data and an unsaved draft. It accepts no real pupil data.
- Create an authored sample class evidence fixture showing weak fractions,
  stronger addition/subtraction, incomplete evidence and differing pupil needs.
- Build a reviewed Year 3 resource adapter from existing catalogues/availability
  and a pure, deterministic three-week draft generator.
- Build objective evidence, editable lesson schedule and resource-picker views.
  Label unverified resource durations as estimates. Print using browser print CSS.
- Keep the preview isolated from account/progress writes. Do not expose it as a
  finished school offer or add it to the child Skills catalogue.

Done when: the sample evidence leads to explained priorities; the teacher can
change lesson count, durations, notes and resource order; unavailable resources
are handled; printing works; refresh behaviour is honestly described. Sample
results and demonstration pupil labels remain visibly fictional.

### 2. Teacher access and saved plans

Define teacher membership, account compatibility and plan ownership. Implement
create/read/update/list through both store drivers and authenticated API routes.
Test denied access, failed reads, ordered saves, revision conflicts, remount and
account switching. Family/learner accounts retain their existing behaviour.

Done when: an authorised teacher can save/reopen their plans and another account
cannot read or change them. This milestone makes planning usable with teacher
judgement, before claiming automated assessment integration.

### 3. Class assessment to live plan

Define class membership and pupil entry on shared devices. Author and review a
bounded Year 3 pre-test; implement its independent runner and submission records.
Connect objective summaries to the same plan generator, including partial tests
and targeted follow-up checks. Add a fresh-question checkpoint and explicit
teacher-reviewed plan revision. Do not retrofit all curriculum games with
attempt telemetry as a prerequisite for this pilot.

Done when: a class can take the assessment, the authorised teacher sees evidence
by objective/pupil, and a saved plan records why its teaching priorities were
chosen. Verify this end-to-end with isolated fixtures in local and API modes.

### 4. School sharing and reuse

Add explicit school membership and share/copy controls. Share resource sequences
and teaching notes without pupil results, pupil names or links to private
assessment records. Copies have their own owner and revision history. Expand to
other subjects/years only after reviewing their resource and assessment mappings.

## Verification and delivery evidence

- During development: test priority selection with full/partial/missing evidence,
  prerequisite ordering, schedule capacity and preservation of teacher edits.
  Test resource resolution against actual catalogue IDs and built availability.
- Component playthrough: evidence → draft → edit/reorder → launch/print controls;
  test save/load/failure/account isolation when those features exist.
- Account, route and persistence work requires immediate broader regression
  checks under [validation policy](../../VALIDATION.md), including existing
  family accounts, progress and rewards. Run full lint, tests and build once
  each completed implementation milestone is ready for merge/release.
- Use one batched browser pass only for real layout/print/drag gaps, covering
  both themes and desktop/tablet/phone. Technical checks do not certify teaching
  quality; record content, teacher and device review separately.
- Record shipped outcomes in `docs/CHANGELOG.md`; remove completed upcoming work
  from `docs/PROJECT_IDEAS.md`. This plan is not evidence of shipped functionality.

## Milestone 1 evidence — 2026-11-08

| Review | Evidence and limits |
|---|---|
| Implemented | `/teachers/planning`, footer link, fictional eight-pupil evidence across five objectives, transparent priority rules, 3–15 editable lessons, 20 curriculum resource references plus supporting Fraction Fun, lesson/resource reordering, replacement confirmation and complete print view. No persistence or live assessment collection. |
| Technically validated | Six pure planner/resource tests and six component workflows pass. Full lint/build pass; 100 component files / 941 tests pass. HTTP route regression tests pass, including direct preview visits and `noindex`. |
| Full suite limits | `npm test`: 2,782 Node tests pass, four MongoDB-dependent tests skip, three tests fail in unchanged source: Year 6 English lesson lint; story count (18 vs expected six); `mountain-hut` length (86 vs 96–140). The failing files are unchanged from branch HEAD. Components ran separately because the Node failure short-circuits `npm test`. |
| SEO limits | `npm run check:seo` verifies all 68 public URLs over HTTP, then its browser step stops at a stale `🔢 Number Bonds` heading assertion; the current unchanged game heading is `Number Bonds`. Remaining SEO browser steps are unverified by that script. |
| Browser/device | Batched local Chrome at 1280, 768 and 360 pixels in both themes: evidence/plan layouts have no horizontal overflow, resource editing works, sampled text contrast exceeds 4.5:1, no page errors. Print exposes all 15 lessons and edited notes and produces an A4 PDF. Print confirmation follows a fix suppressing theme background transitions. Artifacts: `/private/tmp/bix-teacher-planning-qa/`. Physical touch devices and assistive technology remain untested. |
| Content reviewed | Resource references checked against actual Year 3 wrappers and statutory mapping. Fraction Fun manually requires Easy/Medium selection and is explicitly supporting shape practice, not a number-line assessment. Teacher-led suggestions are draft material; no assessment bank or diagnostic validity is claimed. |
| Teacher/learner review | Pending. Review planning rules, suggested timings, repeated practice and curriculum-resource launches with a teacher before school use. |

The progress skill informed the separation of preview state and assessment
evidence from completion/rewards. Milestone 2 is the next implementation step;
this preview must not be represented as saved planning or live class assessment.
