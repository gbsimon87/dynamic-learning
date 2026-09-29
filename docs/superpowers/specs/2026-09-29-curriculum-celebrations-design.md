# Curriculum celebrations + Trophy Room

> **Status: implemented, then amended** (2026-09-29/30). The body below is the
> design as first approved. Several decisions were changed afterwards at the
> user's request; **where they conflict, the Amendments section at the end
> wins.** Current behaviour is described in `docs/PROJECT_KNOWLEDGE.md` §4.5
> ("Celebrations") and §5, and the sound set in `docs/sounds/README.md`.

## Context

Curriculum Mode's success moments are understated for 6–8 year olds:

- A correct answer shows one line of text ([ChallengeShell.jsx](src/components/challenge/ChallengeShell.jsx)).
- Every completion uses one card with a medal emoji and 8–24 CSS confetti pieces ([CompletionCelebration.jsx](src/components/celebration/CompletionCelebration.jsx)).
- New badges are a dashed list inside that card.
- A child can only see their badges inside `/parent`.

The goal is Duolingo-style reinforcement that grows with the size of the achievement, plus a child-facing **Trophy Room**. Skills Mode is out of scope. So are streaks/XP (they need day stamps, which is a stored-data change) and a mascot.

**Hard constraint: no stored learner data changes shape.** Awarding stays exactly as it is (`getCompletionMilestones` → `earnBadges` via `useRewards.award`). Stickers are *derived* from existing progress. The only new storage is a device preference, `dl.soundMuted`, which is not learner data. Before editing ProblemView, read the `curriculum-progress` skill.

## Decisions (agreed with user)

| Topic | Decision |
|---|---|
| Big moments | **Step-by-step sequence**, one reward per full-screen step, "Continue" to advance; "Skip to next challenge" on every step |
| Per answer | Tick pop + sparkle burst + chime + segmented progress bar (≤1s, timing unchanged) |
| Wrong answer | Gentle wobble + kind rotating message; **no sound** |
| Sound | On by default. Mute button in the navbar, stored in `localStorage` `dl.soundMuted`. **Synthesised with Web Audio for now**, behind a named-cue registry so recorded files can replace them later without touching callers |
| Haptics | None |
| Effects | Add the `canvas-confetti` dependency |
| Collection | 5 existing badges + **one sticker per topic**, derived from progress |
| Sticker art | A hand-picked `icon` emoji added to every topic in `year2/year3MathCurriculum.js` (IDs unchanged) |
| Messages | A rotating pool with the child's name in some lines, never the same line twice in a row |
| Practice replay | A small single step: sparkle, chime, "Great practice!" |
| Year finale | Fireworks + a certificate step (name, year, date, Print) |
| Trophy Room | Route `/trophies`. Navbar 🏆 + "See your trophies" on the final step. **Child picker** for parents with several children. Locked badges shown with hints. Per-year rings. Stickers grouped by quest. **"Next up" card** |

## Celebration tiers

| Level | Effect | Sound cue | Steps |
|---|---|---|---|
| practice | small sparkle | `chime` | Headline+Next (one screen) |
| challenge | sparkle burst + star shower | `success` | Headline+Next (one screen) |
| topic | confetti cannon ×2 | `fanfareSmall` | Headline → Progress → Sticker → Badge(s)* → Unlock* → Next |
| category | confetti + stars, longer | `fanfare` | same as topic |
| subject | fireworks | `fanfareBig` | same as topic |
| year | fireworks finale | `fanfareBig` | …→ Certificate → Next |

\* only when earned. A badge step always fires its own `reveal` cue + star burst, whatever the tier.

## Units (each small, one purpose)

**Pure logic, tested with `node:test`**

- `src/data/celebrationSteps.js`: `buildCelebrationSteps({ result, badges, sticker, yearBefore, yearAfter, isYear })` → an ordered array of step descriptors (`{ type: "headline"|"progress"|"sticker"|"badge"|"unlock"|"certificate"|"next", ... }`). It holds the tier → effect/cue map as data.
- `src/data/celebrationMessages.js`: `pickMessage(level, { name, previousId, random })` → `{ id, text }`. The pools are per level, with `{name}` in some lines. It never returns `previousId`. The last id is kept in module memory (not storage).
- `src/data/stickers.js`: `topicStickers(curriculum, progress, isBuilt)` → per category `{ categoryId, title, stickers: [{ topicId, name, icon, earned, remaining }] }`. "Earned" uses the **same strict rule as the topic milestone**, so export `fullTopicComplete` from [completionMilestones.js](src/data/completionMilestones.js) rather than re-deriving it. `remaining` comes from `getTopicStats` ([curriculumProgressStats.js](src/data/curriculumProgressStats.js)).
- [badges.js](src/data/badges.js): add static display metadata only, a `hint` per badge ("Finish 5 topics"). The stored shape, `earnBadges` and ids stay untouched. Topic master progress comes from the existing `countAtLevel(rewards, "topic")`.
- Curriculum data: add `icon` to each topic in [year2MathCurriculum.js](src/data/year2MathCurriculum.js) / [year3MathCurriculum.js](src/data/year3MathCurriculum.js). A test asserts every topic has an icon **and that topic ids are unchanged** (snapshot of the id list).

**Effects & sound (`src/components/celebration/`)**

- `fx/effects.js`: `playEffect(name, { origin })` wraps `canvas-confetti`, which is loaded lazily with `import()`. It supports `sparkle | burst | confetti | stars | fireworks`. It is a no-op when `prefers-reduced-motion` is set, and particle counts are scaled down under 500px width. It returns a stop function that the Skip button and unmount can call.
- `sound/cues.js`: a registry `{ chime, success, reveal, fanfareSmall, fanfare, fanfareBig }`. Each cue is `{ synth(ctx, t) }` today, with an optional future `src` for a file. `sound/player.js`: one shared `AudioContext` created on the first user gesture, plus `playCue(name)`, `isMuted()`, `setMuted()` and `subscribe()`. `localStorage` is always read inside try/catch (defaults to on). `sound/useSoundMuted.js` is a hook for the navbar button.

**UI**

- [ChallengeShell.jsx](src/components/challenge/ChallengeShell.jsx): add a segmented progress bar above the question. On a correct answer: tick pop animation, `playEffect("sparkle", { origin: feedback element })`, `playCue("chime")`. On a wrong answer: a `.is-wobbling` class on the container plus a rotating kind message. The `submit`/`onComplete` contract and the 1000ms timing are unchanged. All 332 challenges route through this shell (verified), so one change covers the whole curriculum.
- `CelebrationSequence.jsx` + `.css` replaces the body of `CompletionCelebration`. The component keeps the file and its props, adding `sticker`, `yearBefore`, `yearAfter` and `childName`. It holds `stepIndex`, fires each step's effect and cue on entry, and focuses each step's heading. It reuses the current tokens, the existing next/topics link logic and the headline focus pattern.
- Step components live in `celebration/steps/`: `HeadlineStep`, `ProgressStep` (reuses [ProgressRing](src/components/ProgressRing.jsx) filling before→after), `StickerStep` (a peel/drop-in animation), `BadgeStep` (silhouette → flip → reveal, text in the DOM from the start for screen readers), `UnlockStep`, `CertificateStep` (`@media print` hides everything else; `window.print()` button) and `NextStep` (Next challenge / Back to topics / See your trophies).
- [ProblemView.jsx](src/pages/curriculum/ProblemView.jsx): compute `yearBefore`/`yearAfter` with `getYearStats` on `progress` and on the pure `completeChallenge(progress, …)` from [progressRules.js](src/data/progressRules.js). This is read-only, and the existing `completeChallenge` hook call and the `award` call stay exactly where they are. It also works out the topic's sticker, and gets the child's name from `AuthContext`.
- `src/pages/trophies/TrophyRoom.jsx` + `.css`: route `/trophies` under `RequireChild` in [main.jsx](src/main.jsx).
  - **Picker**: `childProfiles` from AuthContext, defaulting to the active child, and hidden when there is only one child (learner accounts).
  - **Data**: a new read-only hook `useTrophyData(childId)`, which reads `store.getRewards` + `loadResumeCandidates` ([resumeCandidates.js](src/data/resumeCandidates.js)) and never writes.
  - **Next up card**: `pickResume` ([curriculumResume.js](src/data/curriculumResume.js)) plus the remaining challenges from the sticker data. The Play button only appears for the active child; for a sibling it reads "Switch to <name> to play" → `/profiles`.
  - **Badges**: all 5; held ones in colour, locked ones as silhouettes with their `hint` and "3 of 5" where the badge has a threshold.
  - **Per year**: a `ProgressRing` + stickers grouped by quest; locked stickers shown as a grey outline with "N to go".
- [Navbar.jsx](src/components/ui/Navbar.jsx): a 🏆 link when `status === "ready"` and a 🔊/🔇 mute button (with `aria-pressed` and a label). Both are ≥44px and styled with tokens.
- Remove the old per-card badge list and the CSS confetti from `CompletionCelebration.css`. Everything moves into the steps.

## Accessibility, mobile, both themes

- Every step is a `<section>` whose heading takes focus. Continue is a ≥56px button, Enter/Space works, and the Skip link is always reachable. Badge and sticker names are in the DOM from the start (the animation only changes the look).
- `prefers-reduced-motion`: no canvas effects, and flips/peels become fades. Sound still follows mute only.
- All colours come from `--light-*`/`--dark-*` tokens with `body.dark` overrides, following the existing `CompletionCelebration.css` pattern.
- Mobile: each step fills `100dvh - --navbar-height`, buttons go full-width under 500px with a safe-area bottom inset, and particle counts are reduced. Desktop: the card is centred at max 690px.
- `aria-live="polite"` on the per-answer feedback stays as it is.

## Build order

1. Save this design as `docs/superpowers/specs/2026-09-29-curriculum-celebrations-design.md` and commit.
2. Pure units + tests: `celebrationMessages`, `stickers` (+ export `fullTopicComplete`), `celebrationSteps`, badge `hint`s, topic `icon`s + id-snapshot test.
3. Sound player + cues, the effects wrapper, and `npm i canvas-confetti`.
4. ChallengeShell per-answer feedback.
5. CelebrationSequence + steps, then ProblemView wiring.
6. The Trophy Room + `useTrophyData` + route + navbar link/mute.
7. Docs: [PROJECT_KNOWLEDGE.md](docs/PROJECT_KNOWLEDGE.md) (the celebration section, folder tree, `canvas-confetti` dependency, `dl.soundMuted` key, Trophy Room) and [PROJECT_IDEAS.md](docs/PROJECT_IDEAS.md) (streaks/XP/mascot/richer sounds as follow-ups).

## Verification

- `npm run lint`, `npm test`, `npm run build` all pass. The new tests cover step building per tier, message no-repeat, sticker earned/remaining (including partially built topics never showing as earned), and topic ids unchanged.
- `npm run seed`, then `npm run dev`, and drive the app with Playwright MCP:
  - A right and a wrong answer (the bar fills, the wobble appears, the chime plays with no console errors).
  - A plain challenge completion (one screen).
  - A topic-completing challenge (the full sequence including sticker + badge).
  - Replaying a finished challenge (a practice step, and no award: the rewards doc is unchanged in localStorage before and after).
  - Skip mid-sequence.
  - The Trophy Room for each seeded child via the picker, and the Next up card.
  - The mute toggle persisting across a reload.
- Screenshot at 390×844 and 1280×800, in both light and dark, and with `emulate_media reducedMotion: reduce`.
- The year certificate step: reach it with devUnlock/seed data and check the print preview.

## Amendments since approval

| # | Original decision | Now | Why |
|---|---|---|---|
| A1 | Synthesised sounds, 6 cues (`chime`, `success`, `reveal`, `fanfareSmall`, `fanfare`, `fanfareBig`) | **13 recorded Mixkit files, 14 scenario cues** (`correct`, `correctLast`, `success`, `practice`, `topic`, `quest`, `subjectYear`, `sticker`, `badge`, `unlock`, `certificate`, `combo`, `wrong`, `progress`), loudness-matched, each with a synth fallback | The user found the synth tones cheap and picked each sound by ear |
| A2 | Wrong answer: no sound | A **soft boop** at the lowest volume in the app (-24 LUFS) | User's choice |
| A3 | No combos | **"3 in a row" combo**, every 3 first-try right answers (`answerStreak.js`), with its own sound, a bigger burst and a cheering Bix | User's choice |
| A4 | Sound loads on first tap anywhere | **Only on curriculum challenge pages** (`preloadSounds()` in `ProblemView`) | Skills Mode and the homepage were downloading ~600 KB they never use |
| A5 | Answer and celebration sounds independent | **One answer sound at a time; the last one fades when the celebration starts**; each celebration step fades the previous step's sound | `correct-last` and the combo overlapped the celebration's opening sound |
| A6 | Trophy Room picker for siblings | **The Trophy Room shows only the active child**; grown-ups see each child's room read-only at `/parent/trophies/:childId`, linked from `/parent`. No grown-up gate on `/parent` (user's choice) | A child should only see their own trophies |
| A7 | Unlocked picture only announced | **"Make it my picture" button** on the unlock step (same `updateChild` path as `/parent`) | The reward was not claimable by the child |
| A8 | Stickers only in the Trophy Room | Earned stickers **also replace the stop number on the Curriculum Mode map** | Show the collection where children play |
| A9 | No mascot | **Bix** (moved to `src/components/mascot/`) beside combos and by the Trophy Room's "Next up" | User's choice; not on the celebration headline |
| A10 | — | `/parent` gained a **Sound** section explaining the 🔊 button and the iOS silent switch, which silences web audio and is deliberately not overridden | Families on muted iPads would think the app is silent |
| A11 | The steps list included a `NextStep` file | `NextStep` lives inside `CompletionCelebration.jsx` | Too small for its own file |

Streaks, XP, levels and the "something new" dot were out of scope here; they are
designed in `2026-09-30-streaks-xp-whats-new-design.md`.
