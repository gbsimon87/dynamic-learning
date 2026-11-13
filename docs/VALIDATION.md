# Validation for Curriculum and Skills builds

Use focused checks while developing and at intermediate handoffs. Run the full
validation set once when the final implementation is ready for merge or release.
A pilot, wording fix or individual strand does not require another full run.

## Choose checks by the change

| Change | During development / intermediate handoff |
|---|---|
| Documentation only | Review the diff and relevant links/examples; no app test suite or build required |
| Wording, capitalisation or styling | Lint affected code and run relevant existing tests; check real layout only when needed |
| Curriculum bank/topic or Skills game | Generator/bank checks and a meaningful component playthrough; relevant route/catalogue/lesson tests |
| Course registration | Registry/ID, award membership, signup/selector and guide availability tests; scoped topic/course checker as applicable |
| Progress, persistence, accounts, routing, shared engines/components or build configuration | Broader regression checks immediately across affected consumers; do not wait for the final merge check |

Choose actual affected files and tests; these are command patterns:

```sh
npx eslint src/path/to/changed.js src/path/to/ChangedGame.jsx
node --test src/path/to/relevant.test.js
npx vitest run tests/components/relevant.test.jsx
npm run check:topic -- --year N --subject SUBJECT --topic TOPICID
```

Create or extend tests for meaningful risks: independently correct answers,
answerable questions, boundary/input capacity, retry/reset/completion, registration
and preserved learner progress. Reuse existing coverage for cosmetic edits.
Do not add tests that merely repeat implementation details or assert wording
without a behavioural reason. Curriculum checkers can have adapter gaps; report
them rather than treating unsupported validation as a pass.

## Final merge / release check

Once the implementation is ready, run:

```sh
npm run lint
npm test
npm run build
```

For changes to public routes, catalogues, guides or SEO output, also run the
required `npm run check:seo` before release, following the Skills/SEO guides.
If tooling is unavailable, record that specific gap.

Report the results and checked scope. Reuse a passing
result while the relevant code is unchanged. After a fix, rerun the failing check
and other checks affected by that fix; repeat the full set only if shared changes,
failures or unresolved risk warrant it. A later merge/rebase that changes tested
code needs the affected validation again. Documentation-only follow-up does not
invalidate app checks. Do not merge or deploy with known failures.

An intermediate handoff must say what was checked and which final checks are
still pending; focused validation is not a claim that the full suite passed.

## Keep output and browser work focused

Redirect long test/build output to a temporary log. Inspect failures and the
summary instead of loading successful test listings into the conversation. Run
independent checks together when practical; do not repeat checks just to generate
another summary.

Follow `AGENTS.md` for browser checks: first use affected tests and lint, and
build when the browser target needs it. A browser is for gaps such as layout,
drag, canvas, WebGL and maps; use one batched pass across relevant viewports and
both themes. Automated checks do not certify teaching quality or a child's
experience.
