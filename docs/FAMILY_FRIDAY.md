# Family Friday Quiz

Five questions for a child and grown-up or siblings to answer together in about
3–5 minutes. The quiz is ungated, has no countdown and keeps no saved scores or
curriculum/reward records.

## Entry points and publication

- Play at `/skills/family-friday`, also listed under **Play together** in Skills.
- The homepage invitation appears **on Fridays only, in Europe/London time**,
  for visitors with or without an account. It sits below the welcome section.
- New editions become available at UK Friday midnight, beginning 13 November
  2026. The latest quiz is playable all week; earlier editions remain available
  in the page's archive. A dated public link uses `?week=YYYY-MM-DD`.
- Invalid, non-Friday, pre-launch and future edition links show an unavailable
  message with a route to the latest available quiz. They never silently show
  another edition under the requested date.
- [familyFridaySchedule.js](../shared/familyFridaySchedule.js) owns publication
  rules. [useFamilyFridayDay.js](../src/hooks/useFamilyFridayDay.js) refreshes on
  a 30-second interval and tab focus/visibility changes. A tab left open at
  midnight updates its homepage invitation within that interval.
- The date-dependent homepage invitation is client-rendered. It is deliberately
  absent from build-time prerendered HTML so an old build cannot leave a Friday
  invitation visible all week. The ordinary homepage and the public guide at
  `/learn/family-friday` remain prerendered under the existing SEO policy.

## Quiz and content

[FamilyFridayQuiz.jsx](../src/pages/skills/family/FamilyFridayQuiz.jsx) owns a
finite five-question run with editable draft choices and one final submission.
Families choose an answer before moving forward and can use **Previous question**
to revisit and change any earlier choice without losing later answers. Choosing
an option highlights only that choice; it gives no correctness cues, answer
sounds, explanations or score. **Submit quiz** on the fifth question requires all
five answers and locks the run. The result reveals the shared score and an open
answer review with every chosen answer, correct answer and explanation. Numbered
discovery cards group the question, family pick, encouraging result badge and
explanation. Misses show the correct answer alongside the family pick. Read-aloud
and sourced discovery links sit together on each card, followed by a family chat
prompt. Both themes use the shared colour tokens.

The quiz reuses the shared read-aloud control for questions and, after submission,
answer explanations. The endless/retry-based `FreePlayShell` does not match this
finite quiz contract. Focus moves to the heading when moving between questions
or to the result, while selecting an answer keeps focus on the selected control.
Replaying or choosing another edition starts a fresh run.

[familyFriday.js](../src/data/familyFriday.js) selects a publication version by
the edition's Friday, with identical questions and answer order for every family.
The 13 November launch edition retains its animals, world, words, numbers and SVG
picture puzzle. Editions from **20 November 2026** automatically select:

- **Four curriculum questions** from Years **1–6**, each from a different subject.
  One comes from Years 1–2, one from Years 3–4 and one from Years 5–6. The fourth
  rotates between these year pairs. Subjects are sampled before questions, so
  larger banks do not dominate the quiz. Harder questions invite family help.
- **One family discovery**, rotating through the 16 sourced animal/world facts.

The frozen publication pool contains **1,748 questions from 814 topics** across
Maths, English, Science, History, Geography, Art, Computing, Design, French,
Music, PE and Wellbeing, wherever those subjects are built. It is derived from
the shared curriculum assessment banks, which already provide short prompts,
distractors, scored answers, explanations and statutory source references.
Questions that need a model, passage, listening or other missing context are
excluded; short independent multiple-choice items become three-choice questions.
This reuses existing curriculum content rather than separately authoring quizzes.

The deterministic selector avoids curriculum questions used in the previous
**12 editions**, reconstructing the same history for every visitor without saved
state. Selection searches are bounded. If a future smaller bank cannot meet the
preferred year/subject balance, it first broadens the years, then relaxes recent
repeat avoidance, then subject uniqueness; it still requires four different
questions. The current pool meets all preferred rules in the ten-year test.

The pool has **no expiry or last edition**: questions return to circulation after
the repeat window, so every future Friday can assemble a quiz without an upload,
weekly authoring, background job, external API or AI service. A new weekly mix
does not mean five never-before-seen questions forever. The discovery facts
repeat after 16 editions.

The initial facts were checked against linked primary sources from NASA,
the Natural History Museum, London Zoo, the Australian Museum and NOAA. Word,
number and picture items are authored/generated locally. A teacher/parent
content review and a child/family playtest are still needed; automated checks
do not establish teaching quality, enjoyment or a five-minute real-world duration.

**Keep published editions stable.**
[v1.js](../src/data/familyFriday/v1.js) retains the launch algorithm.
[v2.js](../src/data/familyFriday/v2.js) uses the immutable
[curriculum-v2.js](../src/data/familyFriday/curriculum-v2.js) snapshot, including
each question's year, subject, topic, challenge, source item and curriculum
reference. It does not import changing curriculum builders at runtime. Later
curriculum improvements therefore cannot silently rewrite an archived quiz.
Keep each published version's data, seeding and selection algorithm unchanged.

Optional content releases can expand the pool automatically from all registered
curriculum assessment banks, without choosing questions or making editions:

```sh
node scripts/familyFridayPool.js src/data/familyFriday/curriculum-v3.js
```

The tool validates the source items, filters unsuitable formats, deduplicates
questions and refuses to overwrite an existing snapshot. Register a new version
with a future effective Friday in `familyFriday.js`, retaining earlier versions
and their regression fixtures. This command is **not** a weekly or normal build
requirement. Correct factual errors explicitly rather than preserving an
incorrect answer. Include sources with new factual questions, check the
explanation as well as the answer, and verify that each item has exactly three
distinct choices and one defensible answer.

Sharing uses the device's native share sheet where available, then clipboard
copy or a selectable link. A link opens the edition's introduction, never another
family's result. Native share text can include only the current score; no family
names, accounts or individual answers are attached.

## Checks

Pure tests cover UK winter/summer publication boundaries, archive dates,
unpublished links, the preserved launch edition, all six years and 12 subjects,
adapter eligibility, and ten years of deterministic balanced quizzes without
recent curriculum repeats, plus availability a century ahead. Component tests
cover both publication versions, hidden answers before submission, backward
navigation and revised choices, final submission, repeated taps, replay, archive
switching, the Friday homepage invitation and clipboard fallback.
The standard SEO/browser check includes the actual route and layout at phone,
tablet and desktop widths in both themes. Follow [VALIDATION.md](VALIDATION.md)
for full lint, tests, build and SEO checks before merge/release.

Physical-device touch/voice checks and a family playtest remain separate from
automated browser verification.
