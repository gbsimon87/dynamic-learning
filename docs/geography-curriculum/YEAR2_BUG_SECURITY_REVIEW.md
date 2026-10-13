# Year 2 Geography — bug and security review

**Date:** 2026-10-13. **Scope:** Year 2 Geography's 14 topics, 56 challenge
wrappers and 403 authored templates, plus the shared controls and persistence
paths they use. Other years' implementation is outside this review.

## Findings fixed

| Finding | Impact | Fix and regression evidence |
|---|---|---|
| Ambiguous relative-position questions | A child could correctly choose a diagonal feature as “right of” or “below” the building and be marked wrong. | Both prompts now specify **directly**. Independent coordinate tests prove exactly one aligned answer among the options. |
| Missing shape descriptions in map equivalents | Map-key construction depended on seeing decorative shapes; spoken descriptions named positions but omitted shapes. | Year 2 plan descriptions and visible legends now pair every feature with its shape name. Every map-key construction template is checked against explicit shape/meaning pairs. |
| Tally choices read as punctuation | A voice could skip the pipes, leaving the spoken options indistinguishable. | A Year 2 narrator reads “1 tally mark”, “2 tally marks”, etc., without changing the visible choices or answers. Sorting and ordering keep the existing response-aware narration. |
| Unsupported compass orientation on photo arrangement | A schematic match to an oblique photograph asserted “north is up” without a checked compass bearing. | The arrangement sketch explicitly has no assigned compass orientation; its arrow is omitted. Direction exercises retain their checked north arrows. |
| Missing/inherited topic lookup | Direct use of the Year 2 game with `constructor`, `__proto__`, an unknown topic or invalid slot could crash instead of showing an unavailable state. | Own-property/type/range checks show a fixed internal return link and never call completion. Normal routes already reject unknown topics; this is defensive hardening, not a demonstrated authentication bypass. |
| State carried across direct game prop changes | Changing topic/slot on the same mounted game could retain the old round or delayed completion. Normal curriculum routing already remounts by profile/position. | The Year 2 wrapper also keys its inner run by topic/slot. Tests switch during the last success pause and confirm cancellation, fresh notes and Question 1. Abandoning a run also cancels completion. |
| Overbroad country/continent wording | “A country belongs to a continent” and “smaller than its continent” suggested a universal one-continent rule, overlooking countries spanning continents. | Notes use the actual taught examples: UK within Europe, Brunei within Asia. Topic names, IDs and certificate outcomes are unchanged. |

The new unavailable-state return link uses the shared large button styling
and a short label. Map descriptions use plain relative positions, without
introducing numeric grid-reference tasks.

## Security checks

- Year 2 banks, wrappers and KS1 drawing introduce no `eval`, dynamic code
  execution, HTML injection, upload, location lookup or direct storage writes.
  Strings render through React, including map labels and captions.
- HTML/script payload tests confirm literal rendering. Inherited source IDs
  and a URL supplied as a source ID do not turn into fetched images or links.
  Unknown/inherited topic IDs cannot invoke object-prototype functions.
- Photographs resolve through the bundled manifest and own-property lookups.
  Their SHA-256 checksums, dates, licences, credits and descriptions pass.
  Image failure retains evidence and offers a retry for the bundled image.
- Normal learner routes reject a locked slot, unknown challenge, inherited
  topic and inherited category. The route tests explicitly disable the local
  opt-in developer-unlock setting; that existing setting is not changed.
- A real Year 2 route completes only after all five answers, writes numeric
  completion once to the active child's Year 2 Geography document, awards once
  and offers the next slot. Year 2 Geography remains outside the year award.
- Progress-hook tests check unwritable failed/unresolved loads, late profile
  reads and save acknowledgements, existing sibling metadata, numeric saves,
  remount and replay without a duplicate write. No progress schema, ID,
  storage key, unlock rule or reward rule was changed.
- Optional fieldwork remains paper-based, with grown-up/window alternatives.
  No address, school name, GPS, photo or fieldwork completion is collected.
- `npm audit --omit=dev --json` reports **zero known production dependency
  vulnerabilities**. This is an advisory-registry check, not a guarantee that
  dependencies or all backend paths are free of vulnerabilities.

No exploitable injection or new data-access/privacy issue was found in the
reviewed Year 2 path. The invalid-lookup fix is classified as defensive
hardening; completion-state fixes are verified independently of route remounts.

## Verification and remaining limits

Year 2 checks cover all 403 templates through rendered answer controls, all 56
five-round runs, wrong answers/hints, notes preservation, source fallbacks,
requested narration, safe unknown-ID handling, abandoned runs, real curriculum
routes and progress-hook races. Unit banks also run deterministic seeds and
frozen-data/all-template-reachability checks.

Final results:

- `npm run lint`: passed, including repository-wide lint.
- `npm test`: 1,785 unit and 349 component tests passed; four database-dependent
  tests skipped because no test database is configured.
- Year 2 focused checks: **29 unit + 32 component tests passed**. All 403
  authored templates are exercised through controls, plus all 56 complete runs.
- `npm run build`: passed; the existing large-chunk warning remains.
- `npm audit --omit=dev --json`: zero known production vulnerabilities.
- `git diff --check`: passed.

Browser controls are unavailable in this session, so the UI checks use jsdom. Drag
ordering is mocked because jsdom has no drag geometry; actual keyboard/drag,
phone layout, visual theme contrast and physical-device voice/touch remain
pending. Theme classes and markup are exercised, not claimed as visual QA.
Backend database-dependent tests require a configured test database; this
review does not claim a live-account penetration test.
