# Development branch and workspace integration

Date: 2026-11-11. Owner request: merge every branch except `main`, including
uncommitted work in every repository workspace, into `dev`.

## Integrated work

Fetched all remote refs before inventorying. The repository has one remote
(`origin`) with `dev` and `main`, and three registered worktrees. All local
feature/review branches originally pointed at `163406c`; the substantive
workspace changes were uncommitted.

| Source branch | Preserved workspace work | Checkpoint | Integration |
| --- | --- | --- | --- |
| `feat/ocean-explorer-immersive` | Full-screen Ocean Explorer, cockpit cameras/interior, animal realism, tests and feature records | `a7bd496` | `cf6253e` |
| `feat/curriculum-all-subjects` | All-subject curriculum picker and its tests/record | `29336ef` | `eb7ea58` |
| `review/year3-wording` | Maths wording/lesson review, optional shared-control presentation props, tests, review tracker and workspace file | `24d6633` | `48d814d` |
| `feat/teacher-planning-playlists` | Its tip `163406c` was already contained in `dev` | Existing history | Already integrated |

Only `docs/CHANGELOG.md` conflicted. Both merges retained every added entry
and the full existing changelog body. Every other source-branch file matches
its checkpoint blob exactly in the combined tree. This was verified across
all 30 Ocean, three selector and 35 Year 3 changed paths, permitting only the
combined changelog to differ.

The older stash labelled `feat/teacher-planning-playlists` actually contains
the previously integrated Ocean reef-tour work. Its source changes are already
present in the original `dev` tree; the saved Ocean page test predates the
catalogue's name change. The stash remains intact and was not applied over
newer work.

## Repository state

- Primary checkout is on `dev`; both other worktrees remain available on their
  original source branches. All three have clean indexes and working trees
  after checkpoint/integration.
- Every non-`main` local branch and `origin/dev` is an ancestor of local `dev`.
- Local `main` and `origin/main` remain at
  `ccdf7dccda7b3f9db7043611782f0f5d59429293`.
- No branch/worktree/stash was deleted, no history was rewritten, and no remote
  push or deployment was performed.
- Progress rules, storage, curriculum IDs and award membership are unchanged.
  The selector change only affects which subject cards stay visible.

This is the requested local consolidation, with the source branches' previously
reported validation failures retained below. It is not a release approval.

## Combined-tree validation

Implementation checked at `48d814d`; the subsequent integration record commit
changes documentation only.

- `npm run lint`: passed.
- `npm run build`: passed, prerendering 70 public pages. Existing mixed JSON
  import-attribute and large-chunk notices remain.
- `npm test` with local loopback permission: 2,868 passed, four skipped, three
  failed out of 2,875 Node checks. All server checks ran without the sandbox's
  earlier `listen EPERM` errors. The three failures are the previously recorded
  Year 6 English lesson lint, six-versus-eighteen story count and `mountain-hut`
  length-band assertions. Their source/test files are unchanged by integration.
  Those failures stop the chained component command, so components were run
  separately with two workers.
- `npm run test:components -- --maxWorkers=2`: 1,021 passed and two failed
  across 109 files (108 passing files). The failures are the already-recorded
  Ocean source-branch assertions about porthole first-hit geometry and the
  turtle's starting-camera clearance (4.94008 versus greater than five).
  There are no timeouts. All selector, Year 3 wording/shared-control, camera,
  tour, progress and other component checks pass.
- `git diff --check`: passed. Ancestry, unchanged main refs, clean worktrees and
  preserved source blobs were independently checked.
- No browser/device check was performed; no new visual, content or device
  review is claimed by this merge.

Temporary diagnostics: `/tmp/dev-workspace-merge-{lint,test,build,components}.log`.
The durable outcome and validation limits are in this record.
