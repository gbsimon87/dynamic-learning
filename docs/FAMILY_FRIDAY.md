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
finite five-question run, with one submission per question, immediate answer
reveals and explanations, and a shared score out of five. It reuses the shared
read-aloud control and answer sound/effects hook. The endless/retry-based
`FreePlayShell` does not match this finite quiz contract. Focus moves to the next
action after an answer and to the heading when moving to another question or
the result. Replaying or choosing another edition starts a fresh run.

Each edition includes animals, our world, words, numbers and an SVG picture
puzzle. [familyFriday.js](../src/data/familyFriday.js) builds the same mix and
answer order for every family opening that edition. Eight factual/word sets
rotate; number and picture questions use date-seeded generators. This is a new
weekly mix from a bounded bank, not a promise of five never-before-seen questions
forever. The first three editions are available from the launch bank without a
weekly server job or external content API.

The initial facts were checked against linked primary sources from NASA,
the Natural History Museum, London Zoo, the Australian Museum and NOAA. Word,
number and picture items are authored/generated locally. A teacher/parent
content review and a child/family playtest are still needed; automated checks
do not establish teaching quality, enjoyment or a five-minute real-world duration.

**Keep published editions stable.** Version 1's arrays, order, seeding and
generation rules determine existing edition links. For future expansion, add a
separate bank version selected by its first publication Friday; retain version 1
for all earlier dates. Correct factual errors explicitly rather than preserving
an incorrect answer. Include sources with new factual questions, check the
explanation as well as the answer, and verify that each item has exactly three
distinct choices and one defensible answer.

Sharing uses the device's native share sheet where available, then clipboard
copy or a selectable link. A link opens the edition's introduction, never another
family's result. Native share text can include only the current score; no family
names, accounts or individual answers are attached.

## Checks

Pure tests cover UK winter/summer publication boundaries, archive dates,
unpublished links and ten years of deterministic, answerable five-question
editions. Component tests cover the complete run with a miss, repeated taps,
replay, archive switching, the Friday homepage invitation and clipboard fallback.
The standard SEO/browser check includes the actual route and layout at phone,
tablet and desktop widths in both themes. Follow [VALIDATION.md](VALIDATION.md)
for full lint, tests, build and SEO checks before merge/release.

Physical-device touch/voice checks and a family playtest remain separate from
automated browser verification.
