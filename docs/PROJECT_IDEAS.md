# 💡 Project Ideas — Learn with Bix

> **⚠️ AI-MAINTAINED DOCUMENT — UPCOMING WORK ONLY.**
> Nothing that is finished belongs in this file. When an idea ships, **delete its
> row** — do not mark it done and leave it behind — and record the outcome in
> [PROJECT_KNOWLEDGE.md](PROJECT_KNOWLEDGE.md), which is where history lives.
> The same goes for bugs: a fixed bug is deleted here and written up there.

**Last reviewed:** 2026-10-15

Item-by-item source evidence: [backlog audit in PROJECT_KNOWLEDGE.md](PROJECT_KNOWLEDGE.md#backlog-source-audit-2026-10-09).

## Context for prioritisation
- Curriculum Mode ships **UK Years 1–4 Maths** (Year 1: 32 topics, 128 challenges; Year 3: 44 topics,
  176 challenges; Year 4: 42 topics, 168 challenges), **Years 1–4 English** (Years 1–2 completed 2026-10-11) and **Years 1–4
  Science** (Year 1: 16 topics, 64 challenges, 2026-10-11; Year 2: 19 topics, 76 challenges, 2026-10-11; Year 3: 21 topics, 84 challenges, 2026-10-03; Year 4: 20 topics, 80 challenges, 2026-10-11), plus standalone Skills Mode
  games. English and Science are still waiting on an owner's interactive review;
  see their trackers in `docs/english-curriculum/` and `docs/science-curriculum/`.
  Year 1 Maths is implemented (2026-10-11), with visual browser review still
  pending because browser controls were unavailable in the implementation session.
  Year 4 Maths is implemented (2026-10-11); visual browser review is also pending.
  Year 1 Science (2026-10-11) was played through in headless Chrome, all 64
  challenges in both themes; touch, the read-aloud voice and the owner's review are pending.
  Year 2 Science (2026-10-11) was played through the same way, all 76
  challenges; the same three items are pending.
  **Year 1 History** (2026-10-12): 14 topics, 56 challenges, counted toward the
  Year 1 certificate; played through the same way; the same three items are
  pending. Year 2 History is also complete; Year 3 History has
  all 22 topics and 88 challenges built. Year 4 History is also complete (18 topics / 72 challenges), preserving existing
  year awards pending a separate inclusion decision.
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
- **Celebrations + Trophy Room shipped 2026-09-29** (Curriculum Mode), with
  Bix the mascot joining combos and the Trophy Room. **Streaks, XP, levels and
  a "something new" dot shipped 2026-09-30**. Skills Mode has the answer
  feedback kit since 2026-10-10, used by the free-play games; the older games
  now use it too (2026-10-15). Recorded sounds shipped 2026-10-10 (Mixkit,
  see docs/sounds/README.md). The Mixkit licence covers use in the app;
  keeping the MP3s in the public repo was cleared with a lawyer.
- **Domain and sign-up email verification are live** as recorded in
  PROJECT_KNOWLEDGE on 2026-10-09. The sending-domain prerequisite is closed;
  sign-up fixes and their interactive checks are done (2026-10-10). The app was renamed
  **Learn with Bix** on 2026-10-10.
- **Shipped 2026-10-10:** the first-play kit (Bix's intro at `/hello`,
  first-visit coach marks, the Daily Bix puzzle, brain breaks), Maths
  read-aloud, Bix's jokes, certificates, questions as data and five free-play
  games. Rewards are now **v3** (`intro`, `tips`, `puzzles`); see
  PROJECT_KNOWLEDGE §5. New per-child flags belong in the rewards document the
  same way; a new modal uses `src/components/ui/Dialog.jsx` (or the
  `useModalDialog` hook).
- Ideas should serve the **registered curricula (Years 1–4)** and both account
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

Each idea says what a child or grown-up would get, then what is already done
and what is left. File names and engineering detail are in
[Notes for builders](#-notes-for-builders) at the end.

| # | Idea | What it is | Done so far / what's left | Status |
|---|---|---|---|---|
| 6 | **Write new questions as data** | Most challenges today are hand-built screens. A shared format lets us write a question as a few lines of data, for example "a clock showing half past 3, pick the time", and the app draws it. New topics become much quicker to build. | **Done:** the format and the screen for 13 question types (multiple choice, typed numbers, spelling, sorting, ordering, charts, clocks, coins, fractions and more). **Done:** Year 1 and Year 2 English use it for 37 and 38 topics respectively (dictation reuses its existing memory game). **Left:** move the earlier English games onto it. | 🟡 Partial |
| 7 | **Accessibility and keyboard check** | Make sure every game works for a child using a keyboard or a screen reader, or who needs less motion, and that text is readable in both colour themes. | **Left:** nobody has played every interaction with a keyboard only and with a screen reader. Do that, and fix what breaks. | ⚪ Idea |
| 8 | **Read-aloud everywhere** | A "Read it to me" button, so a child who can't yet read fluently can still play. | **Done:** every curriculum subject (Maths added 2026-10-10), the Solar System, the daily puzzle, the new free-play games and the older Skills games (2026-10-15), including visible word banks/options and optional Speed Reader story narration. **Left:** drag-and-build Maths questions that read their tiles out as a list; checking the voice on real phones and tablets. | 🟡 Partial |
| 9 | **Progress report for grown-ups** | Parents (and later teachers) see how a child is getting on. | **Done:** the Parent area shows each child's progress, badges and profile settings. **Left:** "time spent learning" and "topics to practise more". Both need the app to start recording each attempt (step 5 of the order below). Maybe a "reset progress" button, designed carefully so nothing is lost by accident. | 🟡 Partial |
| 10 | **Questions that adjust to the child** | If a child keeps getting answers right, the questions get a little harder; if they struggle, a little easier. Always within what their year group should learn. | **Left:** all of it. Needs the same attempt recording as #9. The "levels" that exist today choose between a topic's four fixed challenges; they are not a difficulty dial. | ⚪ Idea |
| 11 | **Safeguarding and parental consent** | A child under 13 can sign up by typing an age. Nothing checks it or records a parent's permission. A qualified person needs to say what the law requires for a live children's app. | **Done:** a brief for the reviewer ([safeguarding/REVIEW_BRIEF.md](safeguarding/REVIEW_BRIEF.md)). **Left:** send it to a qualified reviewer; confirm where the database is hosted and the data agreements with suppliers; then build whatever consent step they ask for (the app can already send confirmation emails). | 🟡 Partial |
| 12 | **Phonics and rhyming games** | Sound out words, match rhymes, split words into syllables: early reading practice. | **Left:** all of it. Needs proper letter-sound recordings first; the browser voice reads whole words, not phonics sounds. | ⚪ Idea |
| 13 | **Story Maker and Story Sequencer** | Pick a character, a place and an action to build a silly story, or put picture cards in the right order. | **Left:** all of it. Some story material in Year 3 English could be reused. | ⚪ Idea |
| 14 | **Works offline, installs like an app** | Install it on a tablet and keep playing without internet. Useful on shared school devices. | **Left:** all of it. The risk: progress made offline has to merge safely once back online, or a child loses work. Decide how before building anything. | ⚪ Idea |
| 15 | **Geography curriculum, Years 1–4** | A topic path for local places, the UK/world, regions, weather, processes, resources and map/fieldwork skills. | **Left:** review Years 1–4 on physical phones/tablets and play Years 2 and 4 through in the app; swap secondary Year 4 sources for primary ones; deepen Years 5–6 and practical coverage later. Years 1–4 are implemented: Year 1 has 12 topics / 48 slots and 352 templates (2026-10-13); Year 2 has 14 topics / 56 slots and 403 templates; Years 3–4 have 16 / 64 each. See their trackers/source packs. | 🟡 Partial |
| 17 | **Solar System meteor: test on real devices** | The meteor shower in the Solar System is built and runs smoothly on a computer. | **Left:** measure how smoothly it runs on a real phone and a real tablet. No more code needed. | 🟡 Partial |
| 19 | **Constellations in the 3D sky** | Real-coordinate star patterns open directly in the Solar System with compact collapsible facts, drag-to-look and recenter; duplicate charts removed. | **Built 2026-10-22:** five patterns, phone framing and calm reduced-motion path. Join-the-dots with collection rewards added 2026-10-23; main-scene free flight has 25 clues, arrival checks and session stars/badges (see Solar System roadmap). Physical-device checks remain. | ✅ Built |
| 20 | **More Skills games (from the original notes)** | **Maths:** Math Sentence Builder, Compare the Numbers, Math Maze, Clock Quiz, Skip Count Jump, Estimate It!, Magic Squares, Number Line Jump, Odd or Even Sort, Shape Sorter 3D, Pattern Play, Tally Marks Trainer, Math Bingo. **English:** Sentence Fixer, Word Picture Puzzle, Riddle Time, Emoji Sentences, Picture Vocabulary, Alphabet Adventure, Listening & Repeat. **Geography:** Country Puzzle. | **Left:** pick any and build it on the free-play game frame, so it gets levels, read-aloud and celebrations for free. | ⚪ Idea |
| 24 | **Avatar wardrobe** | Earn hats, glasses, capes or a pet for your avatar, shown wherever your picture appears. Earned only, never bought. | **Left:** all of it. Decide which achievements unlock what. | ⚪ Idea |
| 25 | **Bix's den** | A room for Bix that the child decorates with things earned from topics: a telescope from the Solar System, a rock shelf from Rocks. Tapping an object replays a fact from that topic, which doubles as gentle revision. | **Left:** all of it. Comes after #24, which sets up the unlocking. | ⚪ Idea |
| 26 | **Boss rounds** | At the end of each quest, a friendly cartoon "boss" shrinks with every right answer, using mixed questions from the whole quest. Never timed and can't be failed; it just takes a little longer. | **Left:** all of it. Needs a way to mix questions from several topics, and boss art. | ⚪ Idea |
| 27 | **Real-world missions** | After a Science topic, the app suggests something to try at home. | **Done:** the suggestions appear after Year 3 Science topics. **Left:** the child ticks the mission off, a grown-up confirms "We did it!", and a mission sticker is awarded. Then missions for other subjects. | 🟡 Partial |
| 28 | **Teach the grown-up** | The child sets a quiz on a topic they've finished, hands over the device, and marks the grown-up's answers, with Bix cheering them on as the teacher. | **Left:** all of it. | ⚪ Idea |
| 29 | **Pass-and-play for two** | Two children, or a child and a grown-up, take turns on one device, competing or as a team, so a younger sibling isn't always losing. Skills Mode only, so curriculum progress is never touched. | **Left:** all of it. | ⚪ Idea |
| 31 | **Science notebook and geography passport** | Finishing a Science topic adds an illustrated card (skeletons, rocks, fossils, flowers) with a tap-to-hear fact. Exploring countries and planets stamps a passport. | **Left:** all of it. The drawings already exist; this is mostly a collection screen. | ⚪ Idea |
| 32 | **Seasonal events** | Short themed packs: Halloween counting, an Advent calendar of puzzles, an Easter egg hunt. Stickers stay after the event ends. | **Left:** all of it. Plan each pack a term ahead; this October has passed. | ⚪ Idea |
| 33 | **Story adventure** | Each year gets a light storyline ("Bix's rocket is broken: finish topics to find the parts"), and the topic list becomes a world map the child's avatar walks along. | **Left:** all of it. Mostly art and writing rather than code. | ⚪ Idea |
| 36 | **Privacy-safe analytics** | Learn how grown-ups use the app, for example where sign-up loses people, without tracking children. | **Done:** the sign-up steps are already labelled, but nothing is sent anywhere. **Left:** connect an analytics service (PostHog) with strict privacy settings, after #11 decides what consent is needed. | 🟡 Partial |
| 38 | **Play-test English and Science** | Both are built and pass the automated tests, but nobody has played every topic through. | **Done:** Years 1 and 2 Science, all 64 and 76 challenges played by a headless browser through the real controls (2026-10-11). Year 4 Science also passed a full content/interaction review and all 80 challenges sequentially from fresh progress, including retries, hints, awards and both themes at desktop/phone widths; see `science-curriculum/y4-science-tracker.md`. **Left:** play every topic as a child would: wrong answers, hints, keyboard and touch, finishing topics, celebrations, saving, phones, both themes, the read-aloud voice. Then the owner's review. | 🟡 Partial |
| 42 | **History, Years 1–4** | A History path for every year: Years 1–2 from key stage 1 (then and now, famous people and events, history near you), Year 3 Stone Age to Iron Age, Romans and Ancient Egypt, Year 4 Anglo-Saxons and Vikings. Each challenge opens with a short "Bix explains" story and real museum photos. | **Done (2026-10-12):** specs for all four years approved; **Years 1–4 implemented** (Year 1: 14 topics / 56 challenges; Year 2: 17 / 68); **Year 3 complete** (22 topics / 88 challenges), with a [bug/security review](history-curriculum/YEAR3_BUG_SECURITY_REVIEW.md) fixing year-award read races; **Year 4 complete** (18 / 72), with a [bug/security review](history-curriculum/YEAR4_BUG_SECURITY_REVIEW.md). Years 1 and 3 History count toward their year certificates (owner-approved); Year 2 preserves existing year awards pending its own approval. **Left:** device review of Years 2–4 and Year 2 / Year 4 year-award inclusion. Tracker: `history-curriculum/HISTORY_TRACKER.md`. | 🟡 Partial |
| 43 | **Secret Rule Zoo** | From `PLAYFUL_LEARNING_EXPLORATION.md`: test invented creatures to discover the keeper's hidden sorting rule, then set a rule for Bix to work out. Reasoning, classification and counterexamples. | **Done (2026-10-22):** prototype at `/rule-zoo` (one-feature rules, Easier/Trickier, Stump Bix). **Left:** playtest with 6–8 children as the exploration doc describes; then decide on two-feature rules or child-made creatures. | 🟡 Partial |

---

## 🎯 Suggested Order

Most urgent first: what could affect children using the app today, then what
makes later work cheaper. Step 1 is mostly emails and waiting, so run it
alongside everything else.

1. **Get the safeguarding review started (#11).** The app is live for children,
   and the age check just trusts what is typed. The reviewer's answer also
   decides what we're allowed to record, which the ideas in step 5 depend on.
2. **Check that what's built really works (#38, #7, #17).** Play through English
   and Science, and fix keyboard and screen-reader problems in the same pass
   rather than a separate one. Test the meteor on a real phone whenever one is
   handy.
3. **Finish read-aloud verification (#8).** The older Skills games now have
   read-aloud and shared answer celebrations (2026-10-15). Check actual device
   voices and the remaining drag-and-build Maths readings.
4. **Add new content the quicker way (#15, #20).** Build Geography
   in the new question format (#6), and new Skills games on the
   free-play frame.
5. **Start recording each attempt, once #11 allows it.** That unlocks the
   grown-ups' report (#9), questions that adjust (#10) and analytics (#36).
6. **Fun extras, roughly cheapest first:**
   - **Mostly reuse what exists:** science notebook and passport (#31),
     ticking off missions (#27), boss rounds (#26).
   - **Do in order:** avatar wardrobe (#24) before Bix's den (#25); read-aloud
     (#8) before phonics (#12) and the story adventure (#33).
   - **Any time:** Story Maker (#13), teach the grown-up (#28), pass-and-play
     (#29). Constellations in 3D (#19) are built.
   - **Tied to a date:** seasonal events (#32). Plan each a term ahead.
   - **Decide first, then build:** offline mode (#14). Agree how offline
     progress merges before writing any code, because a bad merge loses a
     child's work.

---

## 🔧 Notes for builders

The detail behind the rows above, for whoever picks one up.

- **#6** Kinds and their rules: `src/data/challenges/questionKinds.js` (lint a
  bank with `lintBuild`); renderer: `src/components/challenge/data/DataChallenge.jsx`;
  how-to and field table: the `building-curriculum-topics` skill. Move
  `EnglishPracticeGame` over only once its challenges can be replayed side by
  side to prove nothing changed. Interactions outside the 13 kinds (scales,
  robot grids, science enquiries) still need their own JSX.
- **#7** Existing support: native buttons in `TileBuilder`, `SortBins` and
  `PlaceValueBlocks`; key handlers in `MeasureDrag` and `LetterInput`; drag
  handles from `@hello-pangea/dnd` in `DragToOrder`. Counting `onKeyDown`
  handlers is not an audit; play each interaction end to end.
- **#8** Speech: `src/utils/speech.js`, `SpeakButton`; Maths readings go through
  `data/mathSpeech.js` and `components/challenge/readAloud.js` (PROJECT_KNOWLEDGE
  §5, "Maths read-aloud"). Always keep the visible text and a sound-off path.
- **#9 / #10** Progress stores completions only: no per-challenge timestamps,
  attempt counts or wrong answers. Record attempts during the run in
  `ChallengeShell` (or the game), in a new store kept separate from
  completions. A reset-progress control needs an explicit scope, a
  confirmation and a decision about linked rewards: read the
  `curriculum-progress` skill first. `updateChild` edits profile fields only.
  For #10, the generators' `level` picks one of four fixed challenge designs;
  define and test real difficulty controls before adapting automatically.
- **#13** Reusable material: `SettingsCharactersAndPlotGame.jsx` (ordering plot
  sentences, choosing story parts). `stories.json` feeds only `SpeedReader`.
- **#14** Offline progress needs a queue and a conflict rule that works with the
  API store. No manifest, service worker or PWA plugin exists yet.
- **#15** Sources: [key-stage-1-geography.md](curriculum/key-stage-1-geography.md)
  and [key-stage-2-geography.md](curriculum/key-stage-2-geography.md); proposed
  year split and all 58 topics are mapped there. Read the
  [Geography specs](geography-curriculum/README.md) and the relevant year's
  embedded implementation tracker before building. Years 3 and 4 now have a registered
  curriculum, 16 banks and 64 slots each; their IDs are permanent. Year 2 now has 14 banks / 56 slots, and Year 1
  12 banks / 48 slots (2026-10-13). Geography stays outside current overall year awards. [Flag Finder](../src/pages/skills/geography/FlagFinder.jsx)
  remains standalone; flags cannot replace locational/place/fieldwork requirements.
  Year 2's [bug/security review](geography-curriculum/YEAR2_BUG_SECURITY_REVIEW.md)
  now covers all 403 templates and 56 runs; 29 unit / 32 component tests,
  repository-wide lint and build pass. Browser/device review remains pending.
- **#17** Pure tests T1–T10 pass; desktop checks and a production preview
  (median 8.3 ms per frame) are recorded. Simulated phone viewports don't count.
  See the [implementation plan](solar-system-meteor/IMPLEMENTATION_PLAN.md) and
  [tracker](solar-system-meteor/IMPLEMENTATION_TRACKER.md).
- **#19** Built in `constellationSky.js`; pure layout in
  `constellationSkyLayout.js`. Reuses catalogue RA/Dec, converts to a right-handed
  ecliptic sky sphere and frames all five patterns above the compact card. The
  main camera/sky restore on exit; actual star distances and tonight’s local sky
  remain separate roadmap ideas (#70 and #100).
- **#20** Intended routes: `/math-sentences` (word problem → equation),
  `/compare-numbers`, `/math-maze`, `/clock-quiz` (analogue ↔ digital),
  `/skip-count`, `/estimate`, `/magic-squares` (3×3 equal sums), `/number-line`
  (animated +2/−3 jumps), `/odd-even-sort`, `/shape-sorter`, `/pattern-play`
  (ABAB/AABB), `/tally-trainer`, `/math-bingo`; `/sentence-fixer` ("the dog run
  fast"), `/word-picture-puzzle`, `/riddle-time`, `/emoji-sentences`,
  `/picture-vocabulary`, `/alphabet-adventure`, `/listening-repeat` (needs #8);
  `/country-puzzle`. Start from `FreePlayShell` (the `add-skill-game` skill).
- **#24** Badges already unlock profile pictures; XP levels and stickers are
  separate rewards. Store what's worn through a rewards-schema change that
  keeps every existing field (see the `curriculum-progress` skill).
- **#27** Existing cards: `scienceActivities.js` → `PracticalActivityCard.jsx`.
  Keep mission awards separate from curriculum completions.
- **#36** The wrapper is `src/utils/analytics.js` (`track()`, with event and
  property allow-lists and tests). Settings for a children's audience: PostHog
  **EU Cloud** (Frankfurt) with a signed **DPA**; **IP capture off** at project
  level; **autocapture off** (named events only); **session replay off**;
  `person_profiles: 'identified_only'`; never `identify()` with an email or a
  child's name: use a random app-made id, which still counts as personal data.
  Track grown-ups' and learners' actions only; child profiles start opted out
  unless a grown-up opts in. Consent wording comes from #11.
- **#38** Trackers: [English](english-curriculum/IMPLEMENTATION_TRACKER.md),
  [Science](science-curriculum/y3-science-tracker.md). Use disposable profiles;
  a first React render is not a playthrough.
