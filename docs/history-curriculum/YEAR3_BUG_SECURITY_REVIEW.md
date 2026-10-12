# Year 3 History bug and security review

Reviewed 2026-10-12 against the current branch, including the shared History
changes from Year 4. Scope: all 22 topics, 88 story cards, 617 templates, 88
wrappers, source assets, loader/route boundaries, controls, saved progress,
profile isolation, certificates and the approved four-subject Year 3 award.

## Fixed findings

| Severity | Finding and trigger | Result |
| --- | --- | --- |
| Medium | The last History run could finish while the other subjects' progress was still loading or had failed. That saved the subject without its year milestone; replay could not recover the missed award. Invalid responses were also treated as empty progress. | The final run of an eligible subject waits for those reads. Failed/invalid reads offer retry; only an explicit missing document means unstarted work. Ordinary runs, practice and excluded History years stay playable. |
| Medium | Other-subject progress was read once per child/year/subject. Opening the final challenge could reuse an old snapshot even after another subject was completed. | Opening a new challenge refreshes the read-only snapshot. Retry and profile changes use distinct request identities; old requests cannot award another child's year. |

The fix uses the existing full-subject completion predicate and year-award
eligibility. It changes no curriculum IDs, storage keys/shapes, progress reducer,
challenge unlock rules or reward records. There is no retrospective award repair.

## Security conclusions

No confirmed exploitable vulnerability was found in the Year 3 implementation.

- Story lines, choices, source descriptions and credits render as React text;
  the Year 3 path introduces no HTML injection, evaluation or executable input.
- The loader resolves through a static Vite module map and canonical curriculum
  entries. Unknown/prototype topic names, unknown categories and invalid
  challenge numbers redirect without completing anything.
- All 17 Year 3 source images use safe bundled WebP filenames and pinned SHA-256
  provenance with permitted CC0/public-domain licences. Museum/reference URLs
  are HTTPS; lessons do not fetch those sites or remote images at runtime.
- Completion is owned by the shared progress hook and route handler. Hydration,
  document identity, merging saves, cleaned-up completion timers and duplicate
  submission guards remain intact. Failure tests keep stored data untouched.
- API progress routes require authentication and child ownership before access.
  The shared API JSON boundary rejects Mongo operators and prototype keys;
  write-origin guards and security-header tests pass. Year 3 adds no API route.
- The dependency audit reports zero known vulnerabilities in the installed tree.

## Verification

- `npm run lint`, `npm test` and `npm run build` pass: **1,670 unit tests and
  235 component tests**, zero failed. Four MongoDB-dependent tests are skipped
  because `MONGODB_URI` is unset; the existing large-chunk warning remains.
- All topic banks pass the story/evidence and question-kind lints. An additional
  44,000 seeded runs (500 per level) use deeply frozen topic banks: no mutation,
  no initially correct response, three unique choice options with the answer.
- Component tests play all 88 complete runs through retries, hints, story
  reopening and exactly-once completion. Fourteen award integration cases cover
  slow, failed and malformed reads, retries, missing subjects, refreshed reads,
  profile switching, practice and excluded History years.
- Isolated local Chrome with normal locks and browser-only fixtures loads and
  starts all 88 routes, then reopens their stories in the actual app themes at
  390/320 px. All source images decode; no page overflow or progress writes.
- Chrome verifies failed-image descriptions/retry, invalid routes and corrupt
  storage. Corrupt saved data remains untouched; no uncaught page errors.
- Chrome also deliberately fails and delays the Maths progress read: the final
  run stays unavailable without writing progress; retry and read completion
  restore it and earn the expected award.
- The final History run and a complete replay earn exactly one year award and
  show a certificate naming Maths, English, Science and History. Reload retains
  all 88 numeric completions. Existing Year 2 Maths and all three other Year 3
  subject documents remain unchanged.

## Limits and handoff

Live MongoDB ownership/isolation tests were not run, and this is not an external
penetration test. Browser checks use isolated fixtures, never real accounts or
progress. Physical-device touch/read-aloud voice review remains separate.
No deployment was made. The shared award fix also protects other eligible years;
Years 2/4 History retain their existing year-award exclusions.
