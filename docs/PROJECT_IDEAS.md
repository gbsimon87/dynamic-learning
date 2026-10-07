# 💡 Project Ideas — Dynamic Learning App

> **⚠️ AI-MAINTAINED DOCUMENT — UPCOMING WORK ONLY.**
> Nothing that is finished belongs in this file. When an idea ships, **delete its
> row** — do not mark it done and leave it behind — and record the outcome in
> [PROJECT_KNOWLEDGE.md](PROJECT_KNOWLEDGE.md), which is where history lives.
> The same goes for bugs: a fixed bug is deleted here and written up there.

**Last reviewed:** 2026-10-07

### Context for prioritisation
- Curriculum Mode ships **UK Year 2 Maths** and **Year 3 Maths** (44 topics,
  176 challenges), **Year 3 and Year 4 English** (2026-10-01) and **Year 3
  Science** (21 topics, 84 challenges, 2026-10-03), plus standalone Skills Mode
  games. English and Science are still waiting on an owner's interactive review;
  see their trackers in `docs/english-curriculum/` and `docs/science-curriculum/`.
- Accounts and progress are served by a live backend, so ideas here can assume
  per-child persistence rather than device-local state.
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
  and #10 both need that, and it is a new write path on the `onComplete`
  contract rather than a new view. Treat it as their shared prerequisite.
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
- Ideas are scoped to serve **both Year 2 and Year 3** where possible.

### What 6–8 year olds enjoy (the lens for #21 onwards)
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

### Status key
| Status | Meaning |
|---|---|
| 🟡 Partial | Started; some of it exists |
| 🔵 Planned | Agreed as the next work, not started |
| ⚪ Idea | Captured, not yet committed to |

Ordered **easiest → hardest** to implement.

---

## 💡 Ideas

| # | Idea | Description | Status |
|---|---|---|---|
| 2 | **Automated component test setup** | Add Vitest + React Testing Library; neither is in `package.json` today. The **pure logic is well covered** by `node:test` — unlock rules, progress rules, curriculum navigation, account types, badges, the seed builders, the `dl.lastAccount` record — so the remaining gaps are all things pure tests can't reach: (a) `useProgress` and `useRewards` hydration and save guards — the `hydrated` flag and the loaded-document ref that stop one child's data overwriting another's, currently verified only by hand on irreplaceable data; (b) `Challenge.jsx`'s two failure paths, missing-module vs failed-fetch, and the per-attempt state reset; (c) `src/data/store/apiStore.js`, which has no `fetch`-mocked tests despite being the live data path; (d) the signup wizard's branch logic, including the under-13 dead end. | ⚪ Idea |
| 3 | **Password reset & account recovery** | There is no way back into an account whose password is forgotten — no reset, no email verification, and an email address that is never proved to belong to anyone. That was survivable when only grown-ups held accounts; now that children hold their own it is the likeliest way someone loses their progress for good. Needs an email transport on the server (none exists), a single-use token with an expiry, and two screens. | ⚪ Idea |
| 4 | **Progress schema versioning & migration path** | Progress documents carry `schemaVersion: 1` but there is **no migration step that reads it**, so renaming a category, topic, or challenge ID still silently orphans a learner's completions. Rewards documents already have one (`normaliseRewards` in `src/data/rewardsShape.js`, a lossless read-time v1 → v2 step) and are the pattern to follow. Add the migration hook in the store layer (`src/data/store/`) so IDs can be renamed safely, and a test per version bump. Touches irreplaceable learner data — follow the `curriculum-progress` skill's verification checklist. | ⚪ Idea |
| 5 | **Free-play Skills Mode games from the challenge kit** | Curriculum Mode locks its interactions into a fixed four-challenge structure. Wrap the existing challenge-kit components (`src/components/challenge/` — 83 of them, including the English and Science kits) in free-play Skills Mode games — money (`CoinTray`), measurement (`ScaleReader`, `MeasureDrag`), position and direction (`RobotGrid`, `PositionBoard`), statistics (`BarChart`, `PictogramChart`, `TallyChart`) — so a learner can practise one skill without walking a topic. Skills Mode currently exposes none of the kit. **`PlaceValueBlocks` is built** and used by five Year 3 challenges, including hundreds, so that gap is closed — this is now purely about free-play wrappers. | 🟡 Partial |
| 6 | **Content authoring format** | Move challenge question data out of hand-written JSX into declarative JSON/JS content files, so new challenges can be authored without writing a component each time. The per-topic generator modules in `src/data/challenges/` are a step in this direction already. Makes #16 and future curriculum years substantially cheaper. | ⚪ Idea |
| 7 | **Accessibility & keyboard pass** | Keyboard alternatives for every drag-and-drop challenge, ARIA labels, focus management, and a colour-contrast audit across both themes. **Two of 83 kit components handle keys at all** (`MeasureDrag`, `LetterInput`), so every other drag interaction is mouse- and touch-only. Contrast has been measured per-screen as pages were built, but never swept as a whole. | ⚪ Idea |
| 8 | **Audio & read-aloud support** | Speech synthesis for questions and instructions, so pre-readers aren't blocked by reading ability. `src/utils/speech.js` and the kit's `SpeakButton` (tap-to-hear with a visual fallback) now cover the Solar System, the Year 3–4 English challenges and the Year 3 Science challenges. **Maths has none yet** — neither Year 2 nor Year 3 — and Skills Mode games are uncovered too. Also the foundation for #12. | 🟡 Partial |
| 9 | **Parent / teacher summary view** | `/parent` now shows a per-child breakdown — year figure, category bars, topic counts — plus each child's badges and an avatar picker (shipped 2026-09-19), so the surface and its data path exist. What it still lacks is everything time-based and judgemental: **time spent**, **topics struggled with** (needs per-attempt data, which nothing records today), and a **reset-progress control** — the last of which is now cheap, since `store.updateChild` and the rewards document both exist. The first two still need a new write path on the challenge `onComplete` contract, not just a new view. Note a learner account sees this screen too, titled "My account". | 🟡 Partial |
| 10 | **Adaptive difficulty** | Track accuracy and response time per topic, then adjust number ranges and question difficulty automatically instead of using fixed random ranges. The pure-generator pattern in `src/data/challenges/` is what makes this tractable — difficulty is already a parameter in most generators. | ⚪ Idea |
| 11 | **Verifiable parental consent** | The under-13 gate on signup is an honest speed bump, not a compliance implementation: a child can simply tap an older age. Fine for a family project; **not sufficient if this is ever published**, where UK AADC and COPPA both expect verifiable consent. Would build on #3's email transport: a grown-up's address, a confirmation round trip, and a record of it on the account. Revisit before any public launch, not before. | ⚪ Idea |
| 12 | **Phonics & rhyming pack** | Sound-it-out, rhyming match, and syllable splitter. Requires the audio work in #8. Adds early reading practice alongside the Years 3–4 English curriculum. | ⚪ Idea |
| 13 | **Story Maker & Story Sequencer** | Pick characters/setting/action to generate a story; arrange picture cards into the right order. Creative writing plus comprehension and sequencing. `stories.json` exists but feeds `SpeedReader` only — it is reading material, not a story-building format, so this needs its own content shape. | ⚪ Idea |
| 14 | **Offline / PWA support** | Service worker plus manifest so the app installs and works without a connection — valuable on shared or low-connectivity school devices. No manifest, service worker, or PWA plugin exists today. Note this interacts with the API store: offline progress would need a queue and a conflict rule. | ⚪ Idea |
| 15 | **Geography curriculum expansion** | Turn the geography backlog (continents, oceans, landforms, habitats, weather, day/night) into a structured topic path rather than loose games. Source ideas in `notes_geography.md`. [Flag Finder](../src/pages/skills/geography/FlagFinder.jsx) uses the REST Countries API and could filter by continent — "Which African country?" — enabling continent-focused topics. | ⚪ Idea |
| 16 | **Year 1–2 English curriculum** | Years 3 and 4 are implemented (2026-10-01), with interactive review tracked in [IMPLEMENTATION_TRACKER.md](english-curriculum/IMPLEMENTATION_TRACKER.md). Remaining expansion: Year 1–2 English; programmes of study are already saved in `docs/curriculum/`. | ⚪ Idea |
| 17 | **Solar System meteor experiment** | Launches a meteor, shows impact and textured Earth fragments, and restores the Solar System through Reset. Implemented and verified locally: pure tests T1–T10 and browser checks B1–B12 all pass, resources stay flat over ten cycles, and the desktop production preview runs at a median 8.3 ms. The single remaining requirement is a **physical phone/tablet performance benchmark**, which no device in this workspace can provide. Follow the [implementation plan](solar-system-meteor/IMPLEMENTATION_PLAN.md) and [progress tracker](solar-system-meteor/IMPLEMENTATION_TRACKER.md). | 🟡 Partial |
| 18 | **Science diagram review follow-ups** | Six bugs (the dog card shows no skeleton, the leaf account is drawn underwater, and four smaller ones) and five low-risk asset-script and licence items, found reviewing the illustrated Year 3 Science diagrams on 2026-10-04. Checklist in [DIAGRAM_REVIEW_FOLLOWUPS.md](science-curriculum/DIAGRAM_REVIEW_FOLLOWUPS.md). | 🔵 Planned |
| 19 | **Constellations in the 3D sky (stage two)** | The constellation card ships as a flat projection. Stage two adds a `constellationSky.js` module shaped like `meteorExperiment.js` (`enter / update / resize / exit / dispose / isActive`): a `THREE.Group` on a celestial sphere at radius ≈2700 from the same RA/Dec via `raDecToUnitVector`, with `Points` for stars, `LineSegments` for the figure and a `createLabel()` sprite. To solve: framing a point outward on the sphere within `controls.minDistance` 1.5 / `maxDistance` 3000 and a far plane of 5000; `depthTest: false` plus a `renderOrder` so planets do not slice through the figure; dimming the random star field at radius 3000 while active. The card gains a "Find it in the real sky →" button. | ⚪ Idea |
| 20 | **Unbuilt Skills Mode game ideas** | From the original notes; intended routes in brackets. **Maths:** Math Sentence Builder (`/math-sentences`, word problem → equation), Compare the Numbers (`/compare-numbers`), Math Maze (`/math-maze`, solve to move through a maze), Clock Quiz (`/clock-quiz`, match analogue/digital times), Skip Count Jump (`/skip-count`), Estimate It! (`/estimate`, guess how many then reveal), Magic Squares (`/magic-squares`, 3×3 equal sums), Number Line Jump (`/number-line`, animated +2/−3 jumps), Odd or Even Sort (`/odd-even-sort`), Shape Sorter 3D (`/shape-sorter`), Pattern Play (`/pattern-play`, ABAB/AABB), Tally Marks Trainer (`/tally-trainer`), Math Bingo (`/math-bingo`). **English:** Sentence Fixer (`/sentence-fixer`, correct “the dog run fast”), Word Picture Puzzle (`/word-picture-puzzle`, fill a part-hidden word), Riddle Time (`/riddle-time`), Emoji Sentences (`/emoji-sentences`, decode emojis into words), Picture Vocabulary (`/picture-vocabulary`, pick the word for an image), Alphabet Adventure (`/alphabet-adventure`, letter order), Listening & Repeat (`/listening-repeat`, needs #8). **Geography:** Country Puzzle (`/country-puzzle`, assemble a continent). Money (`/money`, `/money-basics`), Measurement Match and Place Value Blocks are #5; phonics games are #12; stories are #13; other geography is #15. | ⚪ Idea |
| 21 | **Question-led sign-up** | Today's `/signup` wizard (PROJECT_KNOWLEDGE §5, "Accounts") asks for an email and password at step 1, before the app knows anything about the family, then adds **one** child. Replace it with a short, friendly series of **one question per screen**, answered by tapping big illustrated cards, so signing up feels like being welcomed rather than filling in a form. **Grown-up path:** (1) "Who's setting this up?" — a parent or carer / a child signing up for themselves (today's learner branch) / *a teacher* (no classroom support exists, so this records interest and says "coming soon" rather than pretending). (2) "How many children will learn here?" — chips 1, 2, 3, 4+. (3) **One short loop per child:** first name → "How old is Maya?" (age chips; the school year is suggested from the age and editable, since some children are working above or below it) → pick an avatar and colour (the existing `ProfileBuilder` pieces). Finished children line up as a growing row of avatars at the top, so the grown-up can see the family taking shape and tap one to fix it. (4) "What would you like help with?" — Maths / English / Science / Just exploring, multi-select, used to choose the first screen each child sees. (5) "How much time most days?" — 10 / 20 / 30 minutes, which feeds #30's brain-break interval and a gentle daily goal. (6) **Create the account last:** email, password, show/hide, a live strength hint. Asking for credentials after the grown-up has put in effort lowers drop-off, and nothing is saved before they agree. (7) A summary ("Maya, Year 2, Maths and Science · Leo, Year 3, Maths") with Edit links → create → a **"Hand the device to Maya"** screen with her avatar and a big button into #35. **Learner path:** who → age (the under-13 gate stays, but its dead end becomes "Get a grown-up", which switches to the grown-up path with the child's chosen name and avatar already filled in) → name → avatar → year → subjects → account. **Rules:** only ask a question whose answer the app actually uses, and say why in one line ("So we can start Maya at the right level"); a progress bar of dots; Back on every step, keeping answers; answers kept in `sessionStorage` (never the password) so a refresh or a phone call doesn't wipe them. **Phone and desktop:** answer cards stack in one column on phones with Continue pinned in thumb reach, and sit two to three across on wide screens; 64 px targets; Enter continues and number keys pick an option; proper `type`/`autocomplete` on email and `new-password`; works in both themes and with reduced motion. **The catch:** the account is created at step 1 today *because* `addChild` needs an authenticated account. Creating it last means registering and then adding every child in one go — sequential `addChild` calls with a retry screen if one fails, or a new server route that registers and creates the children in one request. Check the age-to-year mapping against `childFields.js`. **Email verification** is part of this: the address is proved with a one-time link or code, which needs the email transport #3 also needs — build it once, here, and #3 reuses it. **Data:** an email, children's first names and their school years are personal data even without surnames, so ask for nothing the app doesn't use — the age only suggests a year and is not stored. Spec in progress 2026-10-07. | 🔵 Planned |
| 22 | **Printable certificates** | When a topic, a category or a year is finished, offer a **"Print my certificate"** button: the child's name and avatar, what they mastered in kid language ("I can add 3-digit numbers!"), Bix's signature and the date. For a 7-year-old, a certificate on the fridge is still the best reward there is, and it starts a conversation with a grown-up. A print stylesheet already exists from the celebrations work. Cheapest idea here. | ⚪ Idea |
| 23 | **Bix's jokes & silly reactions** | A pool of age-appropriate maths, science and word jokes ("Why was 6 afraid of 7?") that Bix tells — read aloud — at the end of a topic or on a long tap on Bix. Add a few silly secrets: tap Bix five times and he sneezes, wobbles or changes hat. Costs little; delight and something to tell friends about. Jokes live in a data file so they can be checked like any other content. | ⚪ Idea |
| 24 | **Avatar wardrobe** | Levels and stickers already unlock pictures. Add **wearables** — hats, glasses, capes, a pet on the shoulder — that unlock with levels and topic stickers and show everywhere the avatar appears (navbar chip, profile picker, certificates). Dressing up is what this age does with any character. Earned only, never bought; equipped items stored in the rewards document. | ⚪ Idea |
| 25 | **Bix's den** | A room the child decorates for Bix with furniture and toys earned from finished topics: a telescope from the Solar System, a rock shelf from Rocks, a plant pot from Plants. Learning becomes something you can **see and arrange**. Tap an object to replay a one-line fact from the topic it came from, which is also gentle revision. Build it on #24's unlock data. | ⚪ Idea |
| 26 | **Boss rounds** | At the end of each category, a friendly cartoon "boss" (a grumpy cloud, a number-muncher) who shrinks with every right answer. Questions are **mixed review across the whole category**, which is retrieval practice dressed as a game. Wrong answers make the boss laugh, not the child lose. Never timed, can't be failed — it just takes longer — and it ends with a big victory animation. Reuses existing generators; needs a mixed-question picker and boss art. | ⚪ Idea |
| 27 | **Real-world missions** | Off-screen tasks a grown-up confirms: "Find 3 things shaped like a cylinder", "Count the legs in your house (people and pets!)", "Find something magnetic in the kitchen". The child ticks it off and the grown-up taps "We did it!" for a sticker. Gets them off the screen, connects topics to the real world, and gives families something to do together. One card per topic as a data file; offered after the topic is finished. | ⚪ Idea |
| 28 | **Teach the grown-up** | The child picks a topic they've finished and **sets a quiz for a parent** (choosing from generated questions, or making up the numbers), then hands over the device and marks the grown-up's answers — with Bix cheering the child on as the teacher. Explaining things to someone else is one of the strongest ways to learn, and catching a grown-up out is hugely motivating at this age. | ⚪ Idea |
| 29 | **Pass-and-play for two** | Siblings, or a child and a grown-up, take turns on one device: same question style, each with their own avatar and score, and a "pass the tablet" screen between turns. Co-operative mode as well as head-to-head, so a younger sibling isn't always losing. Skills Mode only, so curriculum progress isn't affected. | ⚪ Idea |
| 30 | **Brain breaks** | After about 15 minutes, Bix suggests a 60-second movement break: "Jump like a kangaroo 5 times!", "Stretch as tall as a giraffe!", with a fun animation to copy. Optional and skippable. It also gives grown-ups a gentle cue about session length, which helps families trust the app. A grown-up setting can change the interval or turn it off. | ⚪ Idea |
| 31 | **Science field notebook & geography passport** | Collecting is a big draw at this age. **Science:** finishing a topic adds an illustrated specimen card to a notebook — the posed skeletons, rocks, fossils and flowers already drawn for Year 3 Science — each with one tap-to-hear fact. **Geography:** Flag Finder and the Solar System stamp a passport for each country or planet explored. Reuses existing art; mostly a collection view plus unlock rules. | ⚪ Idea |
| 32 | **Seasonal events** | Short, time-limited packs reskinning existing generators: Halloween counting with pumpkins and bats (October), an Advent calendar of daily puzzles (December), Easter-egg hunting with position and direction. Nothing is lost when an event ends — its stickers stay in the Trophy Room. A reason to come back that isn't a streak. Needs an event config with dates and theme assets. | ⚪ Idea |
| 33 | **Story adventure across the curriculum** | Give each year a light storyline: "Bix's rocket is broken — finish topics to find the parts." Short animated scenes (a few frames plus speech) play between categories, and the topic map becomes a **world map** the child's avatar walks along. Turns a list of topics into a journey with a goal. Ties into the Solar System scene for the finale. Big on art and writing, small on logic; needs the read-aloud work in #8. | ⚪ Idea |
| 34 | **Daily Bix puzzle** | One special puzzle a day — a logic riddle, a "what comes next", an odd one out — answerable in under two minutes, with a small fixed reward (no random prizes). Something new each day without the pressure of a streak. A seeded generator per date means no backend work is needed to choose the puzzle. | ⚪ Idea |
| 35 | **First-play intro with Bix** | The child-facing half of #21: the first time a **child** opens their profile, nothing welcomes them. Add a **90-second playable intro**, the same on phone and desktop, where every step is something to do rather than read. (1) Bix pops up and says hello **using their name**, read aloud with a caption. (2) "Tap me!" teaches tapping; Bix giggles. (3) "Drag the star into my basket" teaches dragging, which nearly every challenge uses, with a working keyboard path (arrow keys plus Enter) shown on desktop. (4) "Where's the hint button?" teaches the controls the challenge screen actually has: hint, read-aloud and back. (5) One warm-up question they can't get wrong, with the full celebration and a **"First Steps" sticker**. (6) Bix walks them to their first topic. A **Skip** button is always visible; a grown-up can replay the intro from `/parent`. Layout: one column and thumb-reachable buttons in portrait, side by side on wide screens, 64 px targets, honours reduced motion. The "has done the intro" flag is **per child** and belongs in the rewards document or a whitelisted child field (`childFields.js`) — **never** the progress document. Follow-on: **first-visit coach marks** on the topic map and the Trophy Room ("Your stickers live here!"), each shown once. | ⚪ Idea |
| 36 | **Privacy-hardened analytics (PostHog)** | Planned for the future; nothing is installed today. Set it up for an audience of children from the first commit, not retro-fitted: **EU Cloud** (Frankfurt) and a signed **DPA**; **IP capture off** at project level; **autocapture off** (explicit `posthog.capture('…')` events only, so typed names and emails can never be scraped); **session replay off**; `person_profiles: 'identified_only'` and never `identify()` with an email or a child's name — the distinct id is a random app-generated id, which is still pseudonymous personal data, not "zero-PII". Track **grown-ups' and learners' actions, not children's**, unless a grown-up has opted in, so capture starts opted out on child profiles. One `track(event, props)` wrapper in `src/utils/` so every call goes through the same rules and props can be allow-listed. First use: the #21 sign-up funnel (one event per step) to see where families drop off. Tie the consent wording to #11. | ⚪ Idea |

---

## 🎯 Suggested Order

1. **Unblock quality:** #2 (component tests) and #4 (progress schema migration),
   before more content multiplies the surface area. The auth wizard, the badge
   award path and `updateChild` are all new surface that pure tests only half
   reach.
2. **Close the account gap:** #3 (password reset). Children hold their own
   accounts, and there is currently no way back into a locked-out one.
   **Fix the first five minutes:** #21 (question-led sign-up), then #35 (the
   child's first-play intro). Every new family goes through both, so they come
   before any content or reward work.
   **Quick joy wins** that fit between larger jobs: #22 (certificates) and #23
   (Bix's jokes).
3. **Unblock scale:** #6 (content authoring format) — makes #16 and future
   curriculum years far cheaper.
4. **Then the shared prerequisite:** per-attempt data, which #9 (parent/teacher
   view) and #10 (adaptive difficulty) both need. (Streaks and XP shipped
   2026-09-30 without it.)
5. **Broaden and polish:** #5, #7, #8 and beyond.
6. **Finish the larger visual experiment:** #17 (Solar System meteor) needs only
   a physical-device performance run; everything else is verified in its tracker.
