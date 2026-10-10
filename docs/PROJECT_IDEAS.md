# 💡 Project Ideas — Learn with Bix

> **⚠️ AI-MAINTAINED DOCUMENT — UPCOMING WORK ONLY.**
> Nothing that is finished belongs in this file. When an idea ships, **delete its
> row** — do not mark it done and leave it behind — and record the outcome in
> [PROJECT_KNOWLEDGE.md](PROJECT_KNOWLEDGE.md), which is where history lives.
> The same goes for bugs: a fixed bug is deleted here and written up there.

**Last reviewed:** 2026-10-10

Item-by-item source evidence: [backlog audit in PROJECT_KNOWLEDGE.md](PROJECT_KNOWLEDGE.md#backlog-source-audit-2026-10-09).

## Context for prioritisation
- Curriculum Mode ships **UK Year 2 Maths** and **Year 3 Maths** (44 topics,
  176 challenges), **Year 3 and Year 4 English** (2026-10-01) and **Year 3
  Science** (21 topics, 84 challenges, 2026-10-03), plus standalone Skills Mode
  games. English and Science are still waiting on an owner's interactive review;
  see their trackers in `docs/english-curriculum/` and `docs/science-curriculum/`.
- Production accounts and progress use the live API + MongoDB backend. Local
  development still defaults to browser storage unless `VITE_USE_API=true`; new
  persistence features must account for both store drivers.
- **Two kinds of account exist** as of 2026-09-19: a grown-up's, holding profiles
  for their children, and a **learner's**, an older child who signed up for
  themselves and owns their own profile. `accountType` distinguishes them and
  `isLearner` is exposed on the auth context. Any screen written for "the parent"
  now needs an answer for the learner case.
- **Progress is now readable from anywhere** (shipped 2026-09-19). Any new
  feature that needs "how far is this child?" should go through
  `curriculumProgressStats` (year / category / topic counts, built-only) and
  `curriculumResume` (most recently played curriculum, its breakdown, the next
  challenge) — via `useProgress` for the active child or `useChildrenProgress`
  for a list. Do not read the progress store directly; four screens agree today
  precisely because none of them does.
- **A child profile is editable now.** `store.updateChild(childId, patch)` and
  `PATCH /api/children/:childId` exist as of 2026-09-19, with the writable
  fields whitelisted in `src/data/childFields.js`. Names, pictures and school
  years can be changed from `/parent` ("My account" for learners). Anything that
  needs to change a profile goes through the update path — never a direct write,
  which could rewrite `parentId` or `_id`.
- **Nothing records per-attempt data.** The progress document stores completions
  only — no timestamps per challenge, no attempt counts, no wrong answers. #9
  and #10 need a new recording path rather than just a new view. Wrong-answer
  evidence must be captured during the run in `ChallengeShell` / the game,
  not reconstructed from completion totals. Treat this as their shared
  prerequisite; keep it separate from existing completion data.
- **Badges shipped 2026-09-19; streaks, XP and levels shipped 2026-09-30.**
  Badges hang off `completionMilestones` and live in a rewards document per
  child (`src/data/badges.js`). Streaks did not need the per-attempt write path
  after all: the day stamps live in that same rewards document (v2), so
  progress was not touched. See PROJECT_KNOWLEDGE §5, "Badges, XP & streaks".
- **`npm run seed` exists** (2026-09-19) and creates a test parent with two
  children who have different progress through both years. Use it rather than
  clicking through the curriculum by hand to reach a state worth looking at.
- **Celebrations + Trophy Room shipped 2026-09-29** (Curriculum Mode only), with
  Bix the mascot joining combos and the Trophy Room. **Streaks, XP, levels and
  a "something new" dot shipped 2026-09-30**. Still
  open: the same kit for Skills Mode games. Recorded sounds shipped the same day (Mixkit,
  see docs/sounds/README.md). The Mixkit licence covers use in the app;
  keeping the MP3s in the public repo was cleared with a lawyer.
- **Domain and sign-up email verification are live** as recorded in
  PROJECT_KNOWLEDGE on 2026-10-09. The sending-domain prerequisite is closed;
  sign-up fixes and their interactive checks are done (2026-10-10). The app was renamed
  **Learn with Bix** on 2026-10-10.
- Ideas should serve the **registered curricula (Years 2–4)** and both account
  types where relevant, while keeping the core experience suitable for 6–8 year olds.

## What 6–8 year olds enjoy (the lens for #22 onwards)
- **Doing, not reading.** They learn an app by tapping it. A screen of text is
  skipped; one spoken sentence plus one thing to tap is not.
- **Wins in seconds.** Under a minute to the first success, and short rounds
  after that. Attention runs in minutes, not quarter-hours.
- **A character who cares.** Bix reacting to *them* — by name, about what they
  just did — does more than any points total.
- **Collecting and choosing.** Stickers, outfits, a room to decorate. Ownership
  and small choices keep them coming back far better than pressure does.
- **Silliness and surprise.** Jokes, funny sounds, the occasional unexpected
  thing.
- **Showing a grown-up.** Something to print, show or play together turns
  progress into a conversation at home.
- **Hard limits:** no countdown pressure on learning, no losing what they've
  earned, no guilt-tripping, no random rewards that feel like a slot machine,
  nothing that sells. Every idea below has to work with touch, mouse and
  keyboard, and with sound off.

## Status key
| Status | Meaning |
|---|---|
| 🟡 Partial | Started; some of it exists |
| 🔵 Planned | Agreed as the next work, not started |
| ⚪ Idea | Captured, not yet committed to |

IDs are stable references, not an effort ranking. Gaps are intentional: shipped
ideas are removed without renumbering the remaining rows. The suggested order
below reflects current risks and dependencies; it does not commit ideas to work.

---

## 💡 Ideas

| # | Idea | Description | Status |
|---|---|---|---|
| 5 | **Free-play Skills Mode games from the challenge kit** | Wrap the existing challenge-kit components (`src/components/challenge/` — 83 JSX components, including English and Science) in free-play Skills Mode games: money (`CoinTray`), measurement (`ScaleReader`, `MeasureDrag`), position and direction (`RobotGrid`, `PositionBoard`), statistics (`BarChart`, `PictogramChart`, `TallyChart`) and place value (`PlaceValueBlocks`). The kit already exists in Curriculum Mode, but **free-play wrappers have not started**. Keep games ungated and independent of curriculum completions. | ⚪ Idea |
| 6 | **Extend the shared content authoring format** | Extend the data-driven pattern beyond the question types supported by `EnglishPracticeGame.jsx`: it already renders choice, sort, build and type questions from JS banks in `src/data/challenges/english/`. Remaining: reusable rendering for the other Maths, English and Science interactions, which still need topic-specific JSX, so their new challenges can also be authored as data. Makes #16 and future curriculum years substantially cheaper. | 🟡 Partial |
| 7 | **Accessibility & keyboard pass** | Audit real keyboard/touch playthroughs, screen-reader labels, focus management, reduced motion and computed contrast across both themes. Existing support includes native buttons in `TileBuilder`, `SortBins` and `PlaceValueBlocks`, key handlers in `MeasureDrag` / `LetterInput`, and drag handles supplied by `@hello-pangea/dnd` in `DragToOrder`. Counting `onKeyDown` handlers is not a keyboard audit. Identify actual gaps, add alternatives where needed and verify every interaction end to end. | ⚪ Idea |
| 8 | **Audio & read-aloud support** | Extend `src/utils/speech.js` and `SpeakButton` to Year 2–3 Maths and the remaining Skills Mode games. Years 3–4 English and Year 3 Science already use the shared speech kit; **Solar System and its constellation card already have narration in Skills Mode**. Preserve visible text and a sound-off path, and check speech on real devices as part of #38. Phonics (#12) additionally needs reliable letter/phoneme audio; whole-word speech alone is not its content source. | 🟡 Partial |
| 9 | **Parent / teacher summary view** | `/parent` already shows per-child year/category/topic breakdowns, badges and profile editing; learner accounts see “My account”. Remaining work: **active time spent** and **topics needing more practice**, using new session/attempt recording shared with #10. Completion counts cannot provide either. Consider a reset-progress control separately: `updateChild` edits profile fields and does not reset progress. Any reset needs an explicit scope, confirmation and a decision about linked rewards, following the `curriculum-progress` skill. | 🟡 Partial |
| 10 | **Adaptive difficulty** | Use attempt accuracy and active response time to adapt practice within the topic’s statutory scope. Shares the new recording prerequisite with #9. Existing pure generators provide reusable question building, but their `level` commonly selects one of the four fixed challenge designs; it is not an existing adaptive difficulty setting. Define suitable difficulty controls and test them before adapting ranges automatically. | ⚪ Idea |
| 11 | **Child-account safeguards & consent review** | The under-13 self-signup gate relies on the entered age; it does not verify age or parental consent. The app is already deployed, so replace the old “before publication” assumption with a review of the actual audience, account flows and intended wider rollout. Confirm applicable privacy/consent requirements through qualified review, then define any grown-up confirmation and consent record needed. The live email transport can support a confirmation round trip. Coordinate with #36 before adding analytics. | ⚪ Idea |
| 12 | **Phonics & rhyming pack** | Sound-it-out, rhyming match, and syllable splitter. Requires the audio work in #8. Adds early reading practice alongside the Years 3–4 English curriculum. | ⚪ Idea |
| 13 | **Story Maker & Story Sequencer** | Add standalone creative story-building and picture-card sequencing games. Curriculum English already orders authored plot sentences and chooses fitting story parts in `SettingsCharactersAndPlotGame.jsx`; reuse that material where suitable. Remaining: freely choosing characters/setting/action to generate a story, a picture-card content shape and ungated Skills Mode entry points. `stories.json` feeds `SpeedReader` only. | ⚪ Idea |
| 14 | **Offline / PWA support** | Service worker plus manifest so the app installs and works without a connection — valuable on shared or low-connectivity school devices. No manifest, service worker, or PWA plugin exists today. Note this interacts with the API store: offline progress would need a queue and a conflict rule. | ⚪ Idea |
| 15 | **Geography curriculum expansion** | Turn continents, oceans, landforms, habitats, weather and day/night into a structured topic path. Use `docs/curriculum/` as the authority and map topics to the statutory requirements before implementation; source game ideas in [notes_geography.md](notes_geography.md). [Flag Finder](../src/pages/skills/geography/FlagFinder.jsx) could support continent-focused practice, subject to adding and validating the required country metadata. | ⚪ Idea |
| 16 | **Year 1–2 English curriculum** | Years 3 and 4 are implemented (2026-10-01), with interactive review tracked in [IMPLEMENTATION_TRACKER.md](english-curriculum/IMPLEMENTATION_TRACKER.md). Remaining expansion: Year 1–2 English; programmes of study are already saved in `docs/curriculum/`. | ⚪ Idea |
| 17 | **Solar System meteor: physical-device benchmark** | The meteor experiment is implemented and locally verified: pure tests T1–T10 pass, desktop browser checks and ten-cycle resource checks are recorded, and the production preview ran at a median 8.3 ms. **Remaining: physical phone/tablet performance evidence**; simulated phone viewports do not close it. Follow the [implementation plan](solar-system-meteor/IMPLEMENTATION_PLAN.md) and [progress tracker](solar-system-meteor/IMPLEMENTATION_TRACKER.md). | 🟡 Partial |
| 19 | **Constellations in the 3D sky (stage two)** | The constellation card ships as a flat projection. Stage two adds a `constellationSky.js` module shaped like `meteorExperiment.js` (`enter / update / resize / exit / dispose / isActive`): a `THREE.Group` on a celestial sphere at radius ≈2700 from the same RA/Dec via `raDecToUnitVector`, with `Points` for stars, `LineSegments` for the figure and a `createLabel()` sprite. To solve: framing a point outward on the sphere within `controls.minDistance` 1.5 / `maxDistance` 3000 and a far plane of 5000; `depthTest: false` plus a `renderOrder` so planets do not slice through the figure; dimming the random star field at radius 3000 while active. The card gains a "Find it in the real sky →" button. | ⚪ Idea |
| 20 | **Unbuilt Skills Mode game ideas** | From the original notes; intended routes in brackets. **Maths:** Math Sentence Builder (`/math-sentences`, word problem → equation), Compare the Numbers (`/compare-numbers`), Math Maze (`/math-maze`, solve to move through a maze), Clock Quiz (`/clock-quiz`, match analogue/digital times), Skip Count Jump (`/skip-count`), Estimate It! (`/estimate`, guess how many then reveal), Magic Squares (`/magic-squares`, 3×3 equal sums), Number Line Jump (`/number-line`, animated +2/−3 jumps), Odd or Even Sort (`/odd-even-sort`), Shape Sorter 3D (`/shape-sorter`), Pattern Play (`/pattern-play`, ABAB/AABB), Tally Marks Trainer (`/tally-trainer`), Math Bingo (`/math-bingo`). **English:** Sentence Fixer (`/sentence-fixer`, correct “the dog run fast”), Word Picture Puzzle (`/word-picture-puzzle`, fill a part-hidden word), Riddle Time (`/riddle-time`), Emoji Sentences (`/emoji-sentences`, decode emojis into words), Picture Vocabulary (`/picture-vocabulary`, pick the word for an image), Alphabet Adventure (`/alphabet-adventure`, letter order), Listening & Repeat (`/listening-repeat`, needs #8). **Geography:** Country Puzzle (`/country-puzzle`, assemble a continent). Money (`/money`, `/money-basics`), Measurement Match and Place Value Blocks are #5; phonics games are #12; stories are #13; other geography is #15. | ⚪ Idea |
| 22 | **Topic/category certificates & personalisation** | A **year-completion certificate with the child’s name, date and “Print or save” already ships** in `CertificateStep.jsx`; the year milestone requires all registered subjects. Remaining: topic/category certificates, the child’s avatar, a kid-friendly skill statement and Bix’s signature. Reuse the existing print stylesheet and milestone calculations, and provide a way to reprint after leaving the celebration. | 🟡 Partial |
| 23 | **Bix's jokes & silly reactions** | Extend the existing tap-to-cheer bounce and emoji burst in `Mascot.jsx` with an age-appropriate maths, science and word joke pool, read aloud at the end of a topic or on a long tap. Add a few silly secrets: tap Bix five times and he sneezes, wobbles or changes hat. Jokes live in a data file so they can be checked like any other content. Keep a visible-text and sound-off path. | ⚪ Idea |
| 24 | **Avatar wardrobe** | **Badges already unlock profile pictures**; XP levels and topic stickers are separate rewards. Add wearables — hats, glasses, capes, a pet on the shoulder — earned from chosen milestones and shown wherever the avatar appears (navbar chip, profile picker, certificates). Earned only, never bought; define unlock rules and store equipped items through a lossless rewards-schema extension. | ⚪ Idea |
| 25 | **Bix's den** | A room the child decorates for Bix with furniture and toys earned from finished topics: a telescope from the Solar System, a rock shelf from Rocks, a plant pot from Plants. Learning becomes something you can **see and arrange**. Tap an object to replay a one-line fact from the topic it came from, which is also gentle revision. Build it on #24's unlock data. | ⚪ Idea |
| 26 | **Boss rounds** | At the end of each category, a friendly cartoon "boss" (a grumpy cloud, a number-muncher) who shrinks with every right answer. Questions are **mixed review across the whole category**, which is retrieval practice dressed as a game. Wrong answers make the boss laugh, not the child lose. Never timed, can't be failed — it just takes longer — and it ends with a big victory animation. Reuses existing generators; needs a mixed-question picker and boss art. | ⚪ Idea |
| 27 | **Real-world missions: confirmation & rewards** | Optional grown-up activities already appear after completed Year 3 Science topics, from `scienceActivities.js` through `PracticalActivityCard.jsx`. Remaining: child tick-off, a grown-up's "We did it!" confirmation and a mission sticker, plus activity cards for the other topics/subjects. Reuse the existing read-only cards and eligibility checks; define mission awards separately from curriculum completions. | 🟡 Partial |
| 28 | **Teach the grown-up** | The child picks a topic they've finished and **sets a quiz for a parent** (choosing from generated questions, or making up the numbers), then hands over the device and marks the grown-up's answers — with Bix cheering the child on as the teacher. Explaining things to someone else is one of the strongest ways to learn, and catching a grown-up out is hugely motivating at this age. | ⚪ Idea |
| 29 | **Pass-and-play for two** | Siblings, or a child and a grown-up, take turns on one device: same question style, each with their own avatar and score, and a "pass the tablet" screen between turns. Co-operative mode as well as head-to-head, so a younger sibling isn't always losing. Skills Mode only, so curriculum progress isn't affected. | ⚪ Idea |
| 30 | **Brain breaks** | After about 15 minutes, Bix suggests a 60-second movement break: "Jump like a kangaroo 5 times!", "Stretch as tall as a giraffe!", with a fun animation to copy. Optional and skippable. It also gives grown-ups a gentle cue about session length, which helps families trust the app. A grown-up setting can change the interval or turn it off. | ⚪ Idea |
| 31 | **Science field notebook & geography passport** | Collecting is a big draw at this age. **Science:** finishing a topic adds an illustrated specimen card to a notebook — the posed skeletons, rocks, fossils and flowers already drawn for Year 3 Science — each with one tap-to-hear fact. **Geography:** Flag Finder and the Solar System stamp a passport for each country or planet explored. Reuses existing art; mostly a collection view plus unlock rules. | ⚪ Idea |
| 32 | **Seasonal events** | Short, time-limited packs reskinning existing generators: Halloween counting with pumpkins and bats (October), an Advent calendar of daily puzzles (December), Easter-egg hunting with position and direction. Nothing is lost when an event ends — its stickers stay in the Trophy Room. A reason to come back that isn't a streak. Needs an event config with dates and theme assets. | ⚪ Idea |
| 33 | **Story adventure across the curriculum** | Give each year a light storyline: "Bix's rocket is broken — finish topics to find the parts." Short animated scenes (a few frames plus speech) play between categories, and the topic map becomes a **world map** the child's avatar walks along. Turns a list of topics into a journey with a goal. Ties into the Solar System scene for the finale. Big on art and writing, small on logic; needs the read-aloud work in #8. | ⚪ Idea |
| 34 | **Daily Bix puzzle** | One special puzzle a day — a logic riddle, a "what comes next", an odd one out — answerable in under two minutes, with a small fixed reward (no random prizes). Something new each day without the pressure of a streak. A seeded generator per date means no backend work is needed to choose the puzzle. | ⚪ Idea |
| 35 | **First-play intro with Bix** | The child-facing half of the question-led sign-up (shipped 2026-10-07; the hand-over ends where this starts): the first time a **child** opens their profile, nothing welcomes them. Add a **90-second playable intro**, the same on phone and desktop, where every step is something to do rather than read. (1) Bix pops up and says hello **using their name**, read aloud with a caption. (2) "Tap me!" teaches tapping; Bix giggles. (3) "Drag the star into my basket" teaches dragging, with a tap alternative, with a working keyboard path (arrow keys plus Enter) shown on desktop. (4) Teach controls actually present in the chosen challenge: back and, where available, read-aloud. Hints currently appear after two misses rather than through a hint button; Maths read-aloud depends on #8. (5) One warm-up question they can't get wrong, with the full celebration and a **"First Steps" sticker**. (6) Bix walks them to their first topic. A **Skip** button is always visible; a grown-up can replay the intro from `/parent`. Layout: one column and thumb-reachable buttons in portrait, side by side on wide screens, 64 px targets, honours reduced motion. The "has done the intro" flag is **per child** and belongs in the rewards document or a whitelisted child field (`childFields.js`) — **never** the progress document. Follow-on: **first-visit coach marks** on the topic map and the Trophy Room ("Your stickers live here!"), each shown once. | ⚪ Idea |
| 36 | **Wire privacy-hardened analytics (PostHog)** | The sign-up funnel already calls `track()` in `src/utils/analytics.js`, with event/property allow-lists and tests; it sends nothing. Remaining: install and wire PostHog through that wrapper, consent gating and deployment configuration for an audience of children: **EU Cloud** (Frankfurt) and a signed **DPA**; **IP capture off** at project level; **autocapture off** (explicit events only); **session replay off**; `person_profiles: 'identified_only'` and never `identify()` with an email or a child's name — use a random app-generated id, which is still pseudonymous personal data, not "zero-PII". Track **grown-ups' and learners' actions, not children's**, unless a grown-up has opted in; capture starts opted out on child profiles. Tie the consent wording to #11. | 🟡 Partial |
| 38 | **Finish English & Science interactive review** | Implementation and automated checks exist, but broad interactive and owner review remains open in the [English tracker](english-curriculum/IMPLEMENTATION_TRACKER.md) and [Science tracker](science-curriculum/y3-science-tracker.md). Use disposable profiles to check wrong answers/hints, keyboard/touch controls, guided enquiries/reset, full completions, celebrations, saved progress/reload/replay, child switching, phone layouts, both themes and real-device speech. Initial React renders are not playthrough evidence. | 🟡 Partial |
| 41 | **Skills Mode celebrations** | Reuse the shared answer effects, gentle retry feedback, combos, sounds and Bix reactions in existing standalone games. Define suitable game events rather than assuming the curriculum’s four-challenge completion contract. Keep Skills Mode ungated; decide any persistent rewards separately before extending XP/streak rules. Honour mute, reduced motion, keyboard/touch use and both themes. | ⚪ Idea |

---

## 🎯 Suggested Order

Ordered by risk to real users first, then by what unblocks the most later work.
Step 1 can run alongside the others: #11 is mostly outside review, not code.

1. **Start the safeguarding review now:** #11. The app is live for children and
   the under-13 gate trusts the entered age. Qualified review takes calendar
   time and its outcome constrains #36 (analytics) and the attempt recording in
   step 5, so begin it before building either.
2. **Finish reviewing shipped content:** #38 (English/Science playthroughs and
   owner review), with #7 (accessibility) fixed in the same interactions rather
   than as a separate pass. Run #17's physical-device benchmark whenever a
   phone/tablet is to hand; it needs no more code.
3. **Make the first visit welcoming:** #8 (Maths read-aloud) **before** #35
   (playable child intro), whose Bix greeting and controls step rely on it.
   Quick wins alongside: #23 (Bix's jokes) and #22 (topic certificates, reprint).
4. **Reduce the cost of expansion:** #6 (authoring format) first, because it
   makes #16 (Year 1–2 English) and #15 (Geography) much cheaper. Then #5
   (free-play wrappers) with #41 (Skills celebrations) so new games launch with
   feedback, then picks from #20.
5. **Add evidence before adapting:** once #11 has settled what may be recorded,
   build session/attempt recording, separate from the completion store, then #9
   (time spent, topics needing practice) and #10 (adaptive difficulty). #36
   (analytics) follows the same consent decision.
6. **Delight backlog, by dependency:**
   - **Reuses what exists (cheapest):** #31 (notebook/passport from existing
     art), #27 (mission tick-off), #34 (daily puzzle, no backend), #26 (boss
     rounds; needs a mixed-question picker).
   - **Chains:** #24 (wardrobe) → #25 (Bix's den); #8 → #12 (phonics) and #33
     (story adventure).
   - **Standalone:** #13 (stories), #28 (teach the grown-up), #29
     (pass-and-play), #30 (brain breaks), #19 (3D constellations).
   - **Date-bound:** #32 (seasonal events) — plan a pack a term ahead of its
     season; this year's October slot has passed.
   - **Needs a design decision first:** #14 (offline/PWA) — agree the offline
     progress queue and conflict rule before any service worker, because a
     bad merge loses learner progress.
