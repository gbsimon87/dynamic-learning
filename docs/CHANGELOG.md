# Delivered changes

Record delivered outcomes here, newest first, with useful verification and
remaining review limits. Keep current architecture/scope in
[PROJECT_KNOWLEDGE.md](PROJECT_KNOWLEDGE.md) and its focused references; upcoming
work belongs in [PROJECT_IDEAS.md](PROJECT_IDEAS.md). Implementation history before
2026-11-03 is in git history (`docs/PROJECT_KNOWLEDGE.md` at commit `fd4bc37`).

## 2026-11-11 — More lifelike Ocean Explorer animals

- Refined all twelve species with individual skin/scale patterns, micro-normal relief, subtle rim light and approximate thin-tissue sunlight scattering. Added three-band clownfish, finer porcupinefish spines, paired whale blowhole recesses and tapered turtle/whale flippers. Caustics follow the final deformed surface and favour upward-facing anatomy.
- Added flexible body/tail swimming, fin-tip flex, rippling ray wings, curling octopus arms with attached suckers and delayed jellyfish tentacle motion. Independent phases and gentle hovering retain the existing pause/reduced-motion behaviour and discovery anchors. Shared morph buffers, batched anatomy and distance detail/animation limits keep the models within explicit geometry budgets.
- All 21 focused model checks, 16 page checks, nine final affected scene rechecks, lint and production build pass (70 public pages prerendered). The broader affected scene run retains two existing submarine/framing failures; two initial setup timeouts pass after geometry sharing, without raising timeouts. Full Node checks still report the same eight server/content failures. Browser/GPU appearance and physical-device performance remain unverified because browser tools are unavailable. See the [implementation and validation record](superpowers/2026-11-11-ocean-explorer-animal-realism.md).

## 2026-11-11 — Detailed 3D submarine cockpit

- Rebuilt the cockpit in the app from the owner's futuristic-submarine prompt: bevelled pressure frame and curved glass, lit metal instrument consoles, switch banks and gauges, twin articulated pilot joysticks and paired throttle levers. The windshield shows the live ocean, and **C** retains the camera toggle.
- Added telemetry for scene-relative depth, heading, drive input and nearby discoveries. Fixed geometry is batched, fasteners are instanced, textures refresh at most five times per second, and the cabin is created on first use. Existing keyboard/touch driving remains available; both themes have paired cabin colours.
- Five new model/resource checks, all 16 Ocean page tests, three camera scene playthroughs, full lint and the production build pass (70 public pages prerendered). Two initial scene timeouts during concurrent build/unit work pass on isolated rerun. The full unit run reports 2,854 passes, four skips and the same eight earlier failures; the broader component sweep was not repeated beyond the affected checks. Actual WebGL lighting, both themes, touch layout and performance remain visually unverified because browser controls are unavailable. See the [3D cockpit record](superpowers/2026-11-11-ocean-explorer-3d-cockpit.md).

## 2026-11-11 — Ocean Explorer cockpit camera

- Press **C** to toggle between the outside view and a simple forward-facing submarine cockpit. The Controls menu offers the same action for touch users. A curved window frame and small decorative instrument panel follow the owner's reference images, using the existing ocean theme tokens.
- The cockpit follows driving, turns, ascent/descent, tours and discovery orbits. Switching back preserves the outside viewing angle; switching while paused redraws immediately. No saved-data or progress changes.
- The four new camera/input checks, all 16 Ocean page checks, full lint, affected follow-up lint and production build pass (70 public pages prerendered). Across all component files, 1,007 checks pass; three existing Ocean model/framing assertions still fail. Full unit checks report 2,849 passes, four skips and eight failures: five sandbox-blocked server tests and three unrelated content checks. Browser/Node REPL controls are unavailable; WebGL appearance, both themes and physical-device layout remain visually unverified. See the [implementation record](superpowers/2026-11-11-ocean-explorer-camera.md).

## 2026-11-11 — Full-screen Ocean Explorer and more natural sea life

- Ocean Explorer now fills the viewport like Solar System, with a compact overlaid back link, title, reef-tour button and Controls menu. The navbar and shared back bar are hidden on this route; discovery cards, tours and touch controls use responsive overlay positions in both themes.
- Reworked sea life with continuous tapered bodies, natural colours, scale/skin detail, shark gills, whale grooves, turtle scutes, swept ray wings, curling octopus arms and translucent jellyfish. Rebuilt reefs with branching coral, open sea fans, grooved brain coral and hollow sponges. Added reflective submarine glass, hull seams, ballast tanks, window bolts and lamps, underwater environment lighting, textured rocks/sand, depth-softened caustics and swaying seagrass.
- Created `feat/ocean-explorer-immersive` from `dev` (`163406c`). Production build passes and prerenders 70 public pages; diff whitespace check passes. Tests, lint and browser/device review are deferred at the owner's request. Implementation and remaining review limits are recorded in the [build record](superpowers/2026-11-11-ocean-explorer-immersive.md).

## 2026-11-11 — Years 1–6 core-subject practice builder

- Added all 579 remaining Maths, English, Science and History topics in Years 1, 2, 4, 5 and 6. The builder now has 714 topics across 25 collections, including existing Year 3 Geography. The owner narrowed this expansion to these four core subjects; other subjects stay outside its scope.
- Added year/subject controls and year-correct search, briefings, examples, vocabulary and print labels. Each year's edited draft is kept in the current tab when switching years. Cross-subject sheets stay within one year. Written tasks retain essential diagrams, passages, tables and source evidence; dictation scripts stay in the separate teacher key.
- Addressed all seven findings from the Year 3 review, including missing science observations/tests, ambiguous word-building clues, empty sunlight practice, fossil ordering, unsupported fraction bars and outdated component queries. Curriculum registrations, permanent IDs and learner storage remain unchanged.
- Focused data/component checks, full lint and production compilation pass. Full-suite baseline failures and representative browser/PDF results are recorded separately in the [implementation and validation record](superpowers/2026-11-11-all-years-practice-builder.md). Independent teacher/content and physical-device/photocopy review remain outstanding.

## 2026-11-11 — Year 3 practice across all five subjects

- Extended `/teachers/practice` from eight Maths topics to all 135 existing Year 3 topics: Maths 44, English 32, Science 21, History 22 and Geography 16. Reuses the existing subject question banks and teacher search, with separate paper adapters and compact eight-at-a-time browsing. Subject selection retains chosen topics and teacher edits; mixed sheets can span up to three topics across subjects.
- Added essential printable maths diagrams, passages and dictionary material, science observation records, history stories/photos/timelines, and geography maps/grids/charts/evidence. Dictation sentences stay in the teacher answer key. Existing briefing links now open the matching subject/topic. Pools are deduplicated and report actual finite availability rather than repeating tasks.
- Extracted lightweight catalogue metadata from question banks, retained original curriculum IDs, and added marking-length-aware answer pagination. No curriculum games, saved progress, account data or storage rules changed. Existing unrelated signup changes were left untouched.
- Tests are **deferred at the owner's explicit request for a different model**. Expanded regression and coverage tests were authored but not executed. Full lint, affected follow-up lint and the final production build pass (70 public pages prerendered); details are in the [expansion and test handoff](superpowers/2026-11-11-year3-practice-expansion.md). Content correctness, browser layouts and A4/PDF output still require independent review; no expanded-suite pass is claimed.

## 2026-11-11 — Compact signup birth-year picker

- Centred the birth-year picker on `/signup` and capped its width at 20rem so desktop year rows are easier to scan. It shrinks to fit narrow screens and retains the existing large touch targets, theme tokens and keyboard controls.
- All four signup component tests, full lint and the production build pass. The full unit run retains three documented content failures and five sandbox-blocked server checks; the full component run passes 996 of 997 tests, retaining the documented Year 6 English timeout. Browser controls are unavailable in this session, so desktop/mobile appearance and both themes remain visually unverified.

## 2026-11-11 — Printable Year 3 Maths practice builder

- Added `/teachers/practice`, linked from the teacher hub and supported topic briefings. Reuses the planner's fuzzy/alias/lesson-text topic search with eight paper-supported Year 3 Maths topics. Teachers can mix up to three topics and request 4, 8, 12 or 16 questions, with practice, word problems or a balanced mixture.
- Live paper previews include editable titles/instructions, optional existing Bix worked examples, a vocabulary strip, extra visual models and working space. Replace one question without changing the others, reorder or remove it; numbering and the separate answer key stay aligned. Topic/count/mix changes create a new set, while support changes retain the chosen questions.
- Monochrome fraction hatching, base-ten blocks, number lines, column grids and grouped counters suit photocopies. Essential question pictures remain visible. Explicit A4 page groups keep question models with their prompts. Print/save PDF can include pupil sheets, answer keys or both, independently of the current preview. Drafts stay in memory; no learner records, progress rules or storage contracts changed.
- Focused validation: affected lint, 20 data/search/SEO tests and 49 teacher/parent-guide component tests pass. Tests independently check every generated answer and picture, all-topic/all-mix 16-question capacity, search, replacement, pagination budgets, editing, printing controls and empty-state recovery. Full lint and production build pass (70 public pages prerendered). The full unit run retains three previously documented content failures and five sandbox-blocked server checks; the full component run passed 996 of 997 tests, retaining the known Year 6 English timeout, which passed on an isolated rerun (both tests). SEO HTTP/browser checks are blocked by sandbox port binding. Full validation details are recorded in the [build record](superpowers/2026-11-11-teacher-practice-builder.md).
- The eight-topic scope follows its Year 3 statutory mapping. Teacher content review, classroom usability and browser/device review remain outstanding. Browser controls are unavailable, so actual A4 pagination, PDF/photocopy output, layout and computed contrast remain visually unverified. Remaining expansion/review work is retained under #46 in `PROJECT_IDEAS.md`.

## 2026-11-11 — Adult reading layouts for teacher tools and parent guides

- Refreshed `/teachers` with restrained tool cards, a consistent stroke icon set, concise purpose labels and more space. The briefing directory and parent-guide directory use adult system typography, clearer headings and theme-aware surfaces.
- Reworked every topic briefing and parent-guide article around a readable content column and an “On this page” navigator, sticky on desktop and wrapping above the article on mobile. Briefings lead with the short summary; statutory quotations, vocabulary, misconceptions, teaching steps and worked examples have distinct treatments. Teaching content and statutory wording are retained.
- Supplied missing lesson-example colour variables outside the learner lesson shell, with scoped light/dark colours, simpler example frames and contained horizontal scrolling for wide diagrams. Printed guides retain teacher notes, omit navigation, and use light-theme colours even when opened in dark mode.
- Validation: affected lint and 13 focused teacher/parent-guide tests pass, including section-navigation targets and existing report, filtering, sharing and print-note interactions. A further 30 planner/resource/class-input/search component tests pass. Full lint passes. The full unit run passed 2,826 tests, with three previously documented Year 6 English/story-content failures and five server tests blocked by sandbox port binding (`listen EPERM 127.0.0.1`). The full component run passed 990 of 991 tests; the previously documented Year 6 English cohesion/punctuation timeout passed on an isolated rerun (both tests). The final production build passes and prerenders 70 public pages. `npm run check:seo` is blocked before HTTP/browser checks by sandbox port binding (`listen EPERM 127.0.0.1`).
- Browser controls are unavailable in this session. Desktop/mobile appearance, computed contrast, both themes and print pagination remain visually unverified; no content or device review is claimed. No learner progress or persistence contracts changed.

## 2026-11-10 — One visual standard across teacher tools

- Applied the compact planning page's width, header, back navigation, typography, theme tokens and panel styling across `/teachers`, `/teachers/planning`, `/teachers/briefings`, individual topic briefings (including missing topics) and `/teachers/reports`. A shared `TeacherWorkspace` and `TeacherHeader` now provide that common frame.
- The hub uses concise two-column tool cards. Briefings use labelled year/subject dropdowns and search in a compact filter panel, with quiet category headers and topic lists. Individual briefings keep their full teaching content and place planning/print actions beside the title.
- The report builder matches the planner's workspace width and compact controls, removes numbered setup captions and repeated introductions, and uses a short unsaved reminder. Year selection is a dropdown; report drafting, editing, copy, reword and next-pupil behaviour remain covered. Mobile judgement controls wrap into two columns with large touch targets, and the draft's sticky position follows navbar height.
- Teacher-specific styles are scoped to `.teacher-workspace`; parent guides keep their own layout. No curriculum, storage or progress contracts changed.
- Technical validation: affected lint and all 42 focused teacher/parent-guide component tests pass, including switching report year, clearing subject judgements while retaining the pupil, next-pupil year retention, briefing course selection, planning and parent-guide use. Full lint and production build pass. The full component run passed 989 of 990 tests; the documented Year 6 English cohesion/punctuation timeout passed on an isolated rerun (both tests). The full `npm test` unit stage passed 2,826 tests, retaining three documented Year 6 English/story-content failures and five server failures caused by sandbox-blocked local-port binding; components ran separately. `npm run check:seo` was also blocked at local-port binding (`listen EPERM 127.0.0.1`), before HTTP/browser checks. Browser controls are unavailable, so desktop/mobile appearance, both themes, actual overlap and print rendering remain visually unverified. No content/device review is claimed.

## 2026-11-10 — A quieter, more compact planning page

- Removed repeated setup instructions, numbered section captions, the editable-draft badge and repeated week totals. The page keeps one title, a short unsaved reminder, labelled controls and the guidance needed to resolve blocked actions. Accessible section headings and live plan-ready announcements remain available to assistive technology.
- The first eight topics use two columns on wider screens and one on mobile. Schedule controls pair the start date/time; setup hides its repeated year/subject summary while open. Shorter lesson rows keep subject, duration and scheduling, while the teaching sequence, vocabulary, briefing link and support remain available when opened.
- The finished draft leads with its editable name and print action. Calendar cards show subject without repeating the learning objective; calendar settings and the scheduled count share a compact row. All controls retain large touch targets and existing theme tokens. Scheduling, topic selection, lesson editing and print content retain their behaviour.
- Technical validation: all 31 focused teacher-tool component tests and affected lint pass. Full lint and the production build pass. The full component run passed 989 of 990 tests; the previously documented Year 6 English cohesion/punctuation timeout passed on an isolated rerun (both tests). The full `npm test` unit stage passed 2,826 tests and retained three documented Year 6 English/story-content failures plus five sandbox-blocked local-port server tests; components were run separately. Browser controls are unavailable in this session, so desktop/mobile layout, overlap, both theme appearances and print rendering remain visually unverified. No curriculum content changed or teaching/device review is claimed.

## 2026-11-10 — Show initial teaching topics immediately

- Picking topics now shows the first eight topics for the selected year/subject immediately, without a separate browse action. “Show 8 more” expands the list; adding a topic or clearing search returns to the first eight so teachers can keep picking.
- Affected lint and all 25 planner, class-input and curriculum-search component tests pass, including immediate browsing, expansion, adding and clearing search. Full lint/test/build were not repeated for this narrow follow-up; the final merge/release checks remain due for this revision. Browser/device layout was not checked.

## 2026-11-10 — Automatic teaching-plan scheduling

- Plan settings now include a start date and editable lesson start time. Creating or rebuilding a plan assigns all lessons automatically, respecting lessons per week and skipping weekends; the separate fixed-9:00-am placement button is removed.
- The calendar retains the actual chosen date. Each teaching week is five school days from that date, so a Wednesday start shows Wednesday through Tuesday, with the next teaching week starting the following Wednesday. Weekend starts use the next Monday. Individual dates/times remain editable and appear in print; moving the calendar start preserves custom times and relative school-day positions.
- Existing drafts and edits remain until confirmed replacement. Changing the calendar start also updates the setup date for subsequent rebuilds. No storage or learner-progress changes.
- Technical validation: 18 focused planner and mixed-subject component tests pass, covering Wednesday/weekend starts, chosen times, sparse weekly schedules, start-date movement, retained individual times, printed scheduling and overlap warnings. Full lint and production build pass. The full component run passed 988 of 989 tests; the previously documented Year 6 English cohesion/punctuation timeout passed on an isolated rerun (both tests). The full `npm test` unit stage passed 2,826 tests but retains three previously documented Year 6 English/story-content failures and five server failures from sandbox-blocked local-port binding; its component stage was therefore run separately. Browser/device layout, both theme appearances and print rendering have not been visually checked; no teaching-content review was needed.

## 2026-11-10 — Two-step planning setup for first-time teachers

- Consolidated setup around two actions: **Add your teaching topics**, then **Build the plan**. Compact year/subject selectors replace the large button groups; the smaller header includes one inline reminder to keep a PDF. Guidance explains mixed-subject topic selection beside the selectors.
- Picked topics now have their inclusion checkbox beside their class-status controls, removing the repeated selection list. Pasted results and the fictional sample retain their evidence review. The empty review panel is removed entirely.
- Lesson settings show the resulting lesson count and duration, explain exactly what blocks creation, and tuck optional class size into a disclosure. The finished draft explains how to read/edit lessons, schedule dates and keep a copy. Layout rules keep the two selectors together on mobile and place building after topic entry.
- Technical validation: all 32 focused planning/teacher-tool component tests pass, including mixed-subject selection, excluded topics, changed class status, year-change confirmation, rebuilding, scheduling and retained edits. Full lint and the production build pass. The full unit run has 2,826 passes, the three documented Year 6 English/story-content failures and five server failures caused by sandbox restrictions on local-port binding. The full component suite has 985 passes and one Year 6 English cohesion/punctuation timeout; both tests in that file pass on an isolated rerun. Browser/device checks remain out of scope at the owner’s request; this iteration used their supplied desktop/mobile screenshots. No teaching content changed.

## 2026-11-10 — Teaching plans across subjects

- Teachers can add topics from multiple subjects to one three-week plan for the same year. The subject picker now scopes topic search while retaining all chosen topics, pasted-result reviews and existing draft edits. Changing year still requires confirmation; rebuilding still confirms replacement of edits.
- Topic selections, lessons, calendar cards and printouts identify their subject. Pasted class results can map to needs across subjects. Plan titles list the subjects actually included, and retrieval starters use secure topics from the lesson's subject.
- Combined catalogues scope objective identities to subject without changing curriculum IDs, activity URLs or learner progress. Added regression coverage exercises mixed-subject plans and imports, retained edits, year changes, duplicate topic IDs, resource alignment and subject-specific retrieval.
- Technical validation: focused planner/data/component checks, full lint and production build pass. All eight server checks pass when rerun with local-port access after sandbox restrictions blocked five checks. The full unit run retains three previously documented Year 6 English/story-content failures. Full component results: 985 pass and one Year 6 English cohesion/punctuation playthrough times out during the concurrent checks; both tests in that file pass on a focused rerun. Browser controls are unavailable; layout, both themes and print rendering have not been checked in a browser. No new teaching content or device review is claimed.

## 2026-11-10 — A more compact teacher planning workspace

- Rebalanced `/teachers/planning` with a wider workspace, clearly labelled year/subject choices, topic entry beside priorities and lesson settings, and a stronger primary action. Setup collapses once a plan is built and can be reopened without losing lesson edits; keyboard focus moves to the draft.
- The lesson list starts with three compact week columns on wide screens. Opening a lesson gives the teaching sequence room across the page, with paired teaching stages. A dedicated toolbar groups list/calendar selection, reordering and plan totals; printing stays beside the editable plan title.
- Calendar cards lead with time, duration and lesson title. Day/time fields and move buttons sit behind “Change schedule”; overlap warnings remain visible. Unscheduled lessons use a compact grid, desktop timetables support keyboard scrolling, and small screens show days vertically. All colours reuse paired light/dark theme tokens.
- Technical checks: all 30 focused teacher-tool tests and full lint pass. The full unit run retains the three existing Year 6 English/story-content failures; the eight server checks pass with local-port access. The full component run passed 983 of 984 tests, with one Year 6 English timeout that passed on a focused rerun (both tests). The production build passes; a final rebuild also covers the focus adjustment. The planner’s nine component tests and affected lint pass after that adjustment. Browser/device checks were left out of scope at the owner’s request; layout, theme appearance and print rendering have not been visually verified. No teaching content was changed or device review claimed.

## 2026-11-10 — Lesson plan calendar scheduling

- The teacher planning pilot now has an optional **Calendar** view alongside its lesson list. Teachers choose the Monday of Week 1, assign each lesson a school day and start time, move it one school day earlier/later with keyboard-accessible controls, and see an explicit overlap warning when timed lessons collide.
- Plans begin with no dates assigned. A clearly labelled shortcut places only unscheduled lessons at 9:00 am on the first teaching days of each week; teachers can then adjust every date and time. Changing the starting Monday moves scheduled lessons with the three-week calendar instead of stranding them outside the view.
- Dates and times are part of the in-memory draft only, appear in the printed plan, and are still lost on refresh. There is no teacher account, saved plan, school timetable integration, automatic scheduling, room booking or holiday calendar.
- Focused planner and component checks (including placement, start-date movement and collision warnings), full lint and the production build pass. The full `npm test` command remains blocked before component tests by the existing Year 6 lesson-format and story-content failures. In-app browser automation was unavailable, so desktop/mobile layout, both themes and print rendering still need a browser/device pass.

## 2026-11-09 — Lesson plans and topic briefings share one body of subject knowledge

- Where a topic briefing has authored notes, its generated lessons now take their text from them, instead of the planning pilot's generic line or Bix's child-facing tips. "Teach" uses the notes in brief and the first key idea; "Support" names a common misconception and the response to it; "Check understanding" asks pupils to judge a second misconception. All 44 Year 3 Maths topics now get topic-specific plans, and later notes (for example Science and History) are picked up automatically. The five hand-written pilot objectives keep their practical activities.
- Every lesson for a topic with notes shows its key vocabulary and a "Read the topic briefing" link, which opens in a new tab so the unsaved plan is kept. The printed plan includes the vocabulary. Each briefing has "Plan lessons for this topic", which opens planning with that course chosen and the topic already added in step 1.
- The planning page's back link now goes to Teacher tools.
- Planning tests now expect the briefing-based text. They also expect 39 courses (the stale count of 37 is fixed) and the renamed "Learn About Fractions" activity. New tests cover the shared notes, the pilot overlay, the generic fallback and the briefing-to-plan round trip.
- Lint, the build and all 982 component tests pass. Unit tests still show only the 3 earlier Year 6 English and story failures. Not browser-checked.

## 2026-11-09 — Teacher tools: briefings, report comments and parent explainers

- Added a `/teachers` hub (the footer's single teacher link; the separate planning link was removed) and three account-free tools; nothing typed into them is saved or sent. See the [design record](superpowers/2026-11-09-teacher-everyday-tools.md).
- **Topic briefings** (`/teachers/briefings`): every Maths and English topic with Bix introductions shows its four worked examples and challenge links. All 44 Year 3 Maths topics also have authored teacher notes: the statutory text quoted verbatim, the idea in brief, key ideas, common misconceptions, vocabulary, and the links to Year 2 and Year 4.
- **Report comment builder** (`/teachers/reports`): judgement bands, curriculum-topic strengths and next steps, learning behaviours and a target produce an editable draft, with pronoun agreement, Reword, character/word counts, Copy and Next pupil.
- **Parent guides** (`/parent-guides`): 12 plain-English explainers (number bonds to grammar words) with worked examples drawn by the lesson renderer, home activities, mix-ups and free Bix practice links. Each can be shared as a link or printed with an unsaved teacher note. They sit beneath the public curriculum guides: each guide area links to its matching explainers, `/what-we-teach` lists them all, and each explainer links back to its year guides. They stay `noindex` until a teacher reviews each one and adds it to `REVIEWED`.
- 28 new data and component tests pass, as do the extended SEO tests, lint and the production build. Repository-wide tests still show earlier failures outside this work: the Year 6 English lesson lint, the story bands, the planning search's expected count of 37 courses (there are now 39), and one planning-page playthrough ("Remove Fraction Fun"). Not yet browser-checked for real layout or print output. The teacher notes and explainers are not yet content-reviewed, and nothing has been device-reviewed.

## 2026-11-09 — Skills Mode names explain the learning goal

- Renamed every Skills Mode card with an action-focused, child-friendly description of what it teaches, from “Clock Generator” to “Learn to Read Time”. The same labels now appear on the linked public guides; existing routes, game behaviour, saved progress and content are unchanged.
- Reordered the Skills hub so learners see calculation and times-table practice first in Maths, story reading first in English, and Solar System exploration first in Geography; the remaining games progress from foundational recognition to broader application.
- The homepage's “Fancy a quick play?” cards now draw their titles from the same Skills catalogue, so they show the current names and stay aligned with future renames.
- Curriculum-guide free-game recommendations now draw their labels from that same catalogue too, updating every affected Year 1–6 guide while retaining the specific activity descriptions and links.
- Focused catalogue, hub and public-guide checks pass (34 component tests and 9 catalogue/SEO tests), as does the production build. The SEO check's HTTP pass covers all 70 public URLs; its browser phase remains blocked by the pre-existing `🔢 Number Bonds` heading assertion after it opens the unchanged game page. Full lint and tests are separately blocked by the concurrent Year 6 French work and existing Year 6 English/story-content failures. Device review was not needed for this wording-only change.

## 2026-11-09 — Times Tables Race clock control

- Both Beat the clock and Finish the race now let learners hide or show the live clock during a race. Hiding it does not pause, reset or otherwise alter the race.
- The focused component playthrough covers the control in both race types, and the production build passes. Repository-wide lint and tests are currently blocked outside this change by active French work and existing Year 6 English/story-content failures.

## 2026-11-09 — Year 6 French

- Registered Year 6 French (`countsTowardYear: false`; the Year 6 award stays Maths, English and Science): 17 topics / 68 challenges in Listening and Sounds, Conversations, Describing, Grammar, and Reading and Writing, mapped in `docs/curriculum/key-stage-2-languages.md`. It covers the key stage 2 bullets Year 5 left for Year 6 (listening and responding, songs, rhymes and poems, pronunciation and intonation, dictionary use, describing in writing, comparing French with English) plus possessives, vouloir/pouvoir/devoir and the near future. Speaking aloud is served on screen only, with an optional French voice.
- Added certificate lines, the public guide, permanent-ID tests and a test that opens every challenge; reuses the Year 5 French picture renderer. `check:course` passes 17/17. Teacher content review and device review are still pending.

## 2026-11-09 — Year 6 Computing

- Registered Year 6 Computing (`countsTowardYear: false`; the Year 6 award stays Maths, English and Science): 17 topics / 68 challenges in Programming Projects, Physical Systems, Algorithms, Data and Information, and Online World, mapped in `docs/curriculum/key-stage-2-computing.md`. It covers the key stage 2 bullets Year 5 left out (controlling or simulating physical systems; collecting, analysing, evaluating and presenting data). Questions stay unplugged and every output is computed by its builder; pictures reuse the Year 5 Computing renderer.
- Added certificate lines, the public guide, permanent-ID tests and a test that opens every challenge. `check:course` passes 17/17, lint and build pass, and full tests pass except three existing Year 6 English lesson and story failures that also fail on `dev`. Teacher content review, a check of the longer program pictures in a real browser, and device review are still pending.

## 2026-11-09 — Ocean Explorer Reef neighbours tour

- Added an optional three-stop guided tour at `/skills/ocean-explorer`: assisted travel, normal orbit/card views and short narration for the coral reef, parrotfish and green sea turtle. Children can pause/resume or skip it at any point, use previous/next and narration controls at a stop, or keep exploring manually; no Skills or curriculum progress is saved.
- Reduced-motion users arrive directly at each stop. The public guide and Ocean Explorer roadmap now describe Phase 5. Focused page/card and scene tests pass; physical-device performance/touch review and owner review of the underlying reef and sea-life facts remain open.

## 2026-11-09 — Lesson plans open as a readable teaching sequence

- Generated plans start with a compact outline grouped by week, including lesson/activity counts and timings. Only one lesson opens at a time. Opening shows Warm up → Teach and model → Practise → Check understanding, with direct activity links; support/stretch, evidence and activity previews remain available through disclosures.
- Editing fields appear only after “Edit lesson”; lesson movement controls appear only after “Reorder lessons”. Edits update the reading and full print views, survive closing/reopening and move with lessons across weeks. The sample desktop outline is approximately half its previous height; the opened first lesson shrank from 1,321px to 820px without removing teaching content.
- Full lint/build and all 958 component tests pass, including 22 teacher workflows. Full Node tests retain the same three existing Year 6 English/story-content failures and four skips. Chrome layout checks covered 1280/768/360px in both themes, reading/editing/reordering, disclosures, preserved progress and all 15 printed lessons, with no horizontal overflow or page errors; sampled text contrast exceeds 4.5:1. Physical-device, assistive-technology and teacher usability reviews remain pending.

## 2026-11-09 — Teacher planning page simplified into three steps

- Fixed class selection: year and subject are now one-tap chips that apply immediately (with a confirmation only when topics or a plan would be lost). Previously a changed year did nothing until a separate "Use this year and subject" button was found, so the header and search stayed on the old year. Year chips only list years that have a curriculum.
- Fixed input-state bugs: topics now apply as soon as they are added (no "Use these class needs" step), re-pressing the active input tab no longer blocks planning, switching between topics, pasted results and the sample keeps each tab's evidence, and a teacher's untick survives status changes. Each topic gets a Teach / Practise / Secure / Not sure control.
- Rebuilt the hierarchy as header → 1 What does your class need? → 2 Choose what to plan → 3 Build the plan → plan. Removed the hero metrics, duplicate "Find the right activity" section, eyebrow labels, rules essay and most helper copy. Lessons are collapsible rows; activity instructions and previews sit behind one disclosure. Learner progress and storage are untouched.
- Full lint/build and all 957 component tests pass; Node tests retain the same three content failures and four skips. One Chromium pass (plus one confirmation pass) covered desktop and phone in both themes with no overflow or console errors. Print layout, teacher review and physical devices were not rechecked.

## 2026-11-08 — Teacher search across the whole selected curriculum

- Quick class overview now searches every built challenge in the selected year and subject, using curriculum names, actual lesson titles/text, classroom terms, prefixes and spelling suggestions. The default Year 3 Maths course has 176 challenges across 44 topics; selectors cover all 37 registered pathways. Wider source-derived metadata supplements the original pilot's detailed descriptions.
- Search shows matching activities and lets teachers choose a particular challenge directly. Those IDs are retained in generated lessons and validated against the selected focus/availability. Imports and the general resource finder share the same catalogue. Curriculum changes protect unsaved work with confirmation; plan/print labels retain their own context. Closed lesson editors render on demand.
- Full lint/build, focused logic/workflow checks and all 956 component tests pass. Node tests retain three unchanged content failures and four database-dependent skips. One Chrome pass covers desktop, tablet and phone in both themes, Maths/Science/English context changes and printing. See the [coverage and review record](superpowers/2026-11-08-teacher-full-curriculum-search.md).

## 2026-11-08 — Teacher class input, fuzzy search and automatic plans

- `/teachers/planning` now starts with class-needs entry instead of loading fictional evidence. Teachers can describe needs and choose a class status, or paste CSV/TSV topic-response totals and confirm their mappings. Sample data is an explicit opt-in. Inputs stay in the current tab; refresh clears them, and saved accounts/plans remain pending.
- Added typo/transposition suggestions to reviewed classroom vocabulary. Uncertain matches require confirmation. Automatic plans use the entered evidence and representation, choose matching resources, favour teaching needs when allocating extra lessons, and use confident topics for retrieval. No sample scores fill gaps, class totals do not infer individual groups, and existing edits require explicit draft replacement.
- Full lint/build and all 952 component tests pass; final focused checks cover the mobile/vocabulary refinements. Full Node tests retain three unchanged content failures and four database-dependent skips. Chrome checks cover both input routes and generated plans at desktop/tablet/phone widths in both themes, plus print. See the [class-input record](superpowers/2026-11-08-teacher-class-input.md) for validation and remaining review.

## 2026-11-08 — Find teacher activities by learning need

- Added reviewed teacher descriptions for the Year 3 pilot's 20 curriculum challenges and Fraction Fun: learning objective, child actions, starting knowledge, teaching use, scope and limits. Existing curriculum names, IDs and progress remain intact.
- Teachers can search classroom terms, resolve ambiguous needs such as “finding halves”, inspect read-only examples from actual question banks, include objectives in planning focus and add activities within a lesson. Resource explanations also appear in printed plans. Missing activities and supporting-only matches are explicit; edited drafts are preserved.
- Full lint/build and all 947 component tests pass. The full Node suite retains three existing content failures and four database-dependent skips. One Chrome pass covers desktop, tablet and phone in both themes, five example model types and print. Teacher, physical-device and assistive-technology review remain pending. See the [discovery record](superpowers/2026-11-08-teacher-resource-discovery.md) for scope and evidence.

## 2026-11-08 — Teacher planning and playlists preview

- Added `/teachers/planning`, linked from the footer, with clearly fictional Year 3 maths evidence. The preview distinguishes correct/incorrect/skipped/not-assessed responses, shows pupil distributions and explains its provisional teaching priorities.
- Teachers can choose objectives, generate 3–15 lessons over three weeks, edit titles/objectives/timings/teaching notes, reorder lessons and Bix resources, and print/save a complete PDF. Twenty existing curriculum challenges and supporting Fraction Fun are resolved from current catalogues/availability. Replacing a draft requires explicit confirmation; refreshing loses edits. Teacher accounts, saved plans, live assessments and school sharing remain future milestones.
- Full lint/build, all 941 component tests, planner/resource unit tests and HTTP route regressions pass. Browser layout/contrast checks cover desktop, tablet and phone in both themes, plus complete print output. Full `npm test` has three pre-existing failures in Year 6 English lesson lint and story content; four database tests skip without MongoDB. SEO HTTP checks pass, but its browser script stops at an unchanged Number Bonds heading mismatch. Physical-device, assistive-technology and teacher review remain pending. See the [plan and evidence](superpowers/plans/2026-11-08-teacher-planning-playlists.md).

## 2026-11-08 — Times Tables Race: simpler setup screen

- Replaced the From/To dropdowns and quick-choice buttons with numbered steps: tap any mix of 1–12 times-table tiles (with All and Clear), then pick one of two picture cards, Beat the clock or Finish the race. Start stays disabled until a table is chosen. Tables 0 and 13–20 are no longer offered. The play and results screens are unchanged. Skills Mode stays untracked.
- Data and component tests updated and passing. Full lint and production build pass. Full `npm test` reports three failures already on `dev`, in files this change does not touch: Year 6 English lesson lint and two `stories.test.js` checks. One browser pass at 375px and 1280px in both themes found no horizontal scroll and 64px+ tiles. The play and results screens and a real device were not checked.

## 2026-11-08 — Shape Explorer moved to Maths

- Moved the Shape Explorer card into Maths on the Skills hub and removed the now-empty Shapes category. Its existing `/skills/shapes` game route and public guide are unchanged.
- Skills hub/guide tests, full lint, production build and public SEO validation pass. The concurrent Year 6 English lesson-content validation failure remains outside this change.

## 2026-11-08 — Year 6 Geography complete course implementation

- Built the 16-topic, 64-challenge Year 6 Geography pathway: regional comparison; glaciers, river/coast management and climate responses; energy, migration, trade and UK land use; then six-figure references, digital layers and fieldwork planning/evaluation. Every topic uses the established Geography field-note presentation and a visible evidence card for its answer.
- Registered the course, permanent IDs, certificate outcomes, public guide and Year 6 selector/signup availability. Geography is explicitly `countsTowardYear: false`, so it does not alter the Year 6 Maths/English/Science certificate or any saved learner progress.
- The Geography data test, 16-topic course checker (20 deterministic seeds) and a 64-wrapper/retry/hint/completion component playthrough pass. Full repository lint, tests and production build remain to be run; browser layout, physical-device, content specialist and learner review remain pending.

## 2026-11-08 — Year 6 History built; Year 6 award switched on

- Built **Year 6 History**: 5 categories, 20 topics, 80 challenges. Local history (method topics with made-up examples, plus Jarrow through time: Bede, Palmer's shipyard, the 1936 march), crime and punishment from the Anglo-Saxons to today, and change/cause/significance skills. Registered with `countsTowardYear: false`; public guide, certificate lines, permanent IDs and the statutory crosswalk added. See [the course record](superpowers/2026-11-08-year6-history-course-build.md).
- **Owner decision:** Year 6 Maths, English and Science now count toward the Year 6 award (staged exclusion removed; no earned award can be lost). Registry and dataset tests updated.
- Checks: lint, 20/20 `check:course`, a 80-challenge component playthrough, build and node/component suites pass, except one Year 6 English lesson lint failure from concurrent English work. Not checked in a browser or on a device; content, Jarrow fact-check and sensitive-topic reviews are pending.

## 2026-11-08 — Year 6 English: Composition and Editing completed

- Built all four Curriculum slots and matching Bix lessons for **Formal Register for Audience and Purpose**, **Precising Longer Passages**, **Passive Voice in Writing**, **Subjunctive Forms in Writing**, **Proofreading for Clarity and Effect**, and **Year 6 Dictation**. The quest uses visible context, choice/sort/sentence-tile practice and the existing sound-off look-cover-write dictation route; progress, unlocks and Year 6 award membership are unchanged.
- Five authored banks pass 30-seed topic checks, bank lint and a retry/hint/choice/sort/tile completion playthrough. Dictation has its own Appendix 1 bank test and a structure-only loader check because its specialised response kinds are unsupported by the generic checker. Lint and the production build pass; full tests currently report broader API/public-page failures. Browser layout, physical-device, teacher/content and owner/learner review remain pending.

## 2026-11-08 — Year 6 English: Cohesion, Layout and Punctuation completed

- Built all four curriculum slots and Bix lessons for the seven topics: **Cohesive Devices across Paragraphs** (contrast, result and repeated-phrase links), **Ellipsis** (spotting and building omissions), **Layout Devices** (device matching, leaflet sub-heading tapping), **Semicolons, Colons and Dashes**, **Punctuation in Lists** and **Bullet Point Punctuation** (tap-the-gap and tap-the-line controls), and **Hyphens to Avoid Ambiguity**. The course remains explicitly excluded from Year 6 awards.
- Each bank has 15 authored templates per slot. Bank lint, semantic bank tests (for example: only the repeating opener repeats paragraph 1's words; every bullet list is internally consistent), 50-seed topic checks and a playthrough of all 28 slots (retry, hint, choice, sort, tiles, tap) pass; focused lint is clean. Bullet-point style is one taught convention that the statutory text does not specify, so owner review is advised. Full-course lint/test/build, browser layout, physical-device and content/owner review remain pending.

## 2026-11-08 — Year 6 English: Interpretation and Comparison completed

- Built all four Curriculum slots and matching Bix lessons for **Exploring Meaning in Context**, **Predicting from Details**, **Summarising across Paragraphs**, **Figurative Language and its Effect**, **Comparing Accounts and Viewpoints**, **Themes and Conventions**, and **Asking Questions about Texts**. Each topic uses visible reading evidence, then progresses through choices, claim sorting, response tiles and independent application; learner progress, unlocks and Year 6 award membership are unchanged.
- Every reading bank has 15 authored templates per slot. Deterministic bank validation, a retry/hint/choice/sort/tile/completion playthrough and the production build pass. The full lint run remains blocked by an in-progress cohesion-topic lint error; full test runs also report unfinished lessons in the concurrently built cohesion/writing scope. Browser, touch-device, teacher/content and owner/learner review remain pending.

## 2026-11-07 — Year 6 English: Spelling - Advanced Patterns completed

- Built all four curriculum slots and Bix lessons for **The Letter String ough** (rhyme-word models, sound sorting, letter tiles, sentence choices), **Confusing Word Pairs** (the eleven Year 6 pairs: meaning choices, clue sorting, tiles and sentence checks) and **Year 6 Word List Parts 1 and 2** (spelling-chunk models, right/wrong sorting, tiles and typed sentence gaps for every statutory word from identity to yacht). The quest now has six playable topics; the course remains explicitly excluded from Year 6 awards.
- Bank tests check every word against the saved Appendix 1 data; the node test caught and fixed identical sentence-check prompts in Confusing Word Pairs. Focused lint, 50-seed topic checks and completion playthroughs of all 16 new slots pass. Full-course lint/test/build, browser layout, physical-device and content/owner review remain pending.

## 2026-11-07 — Year 6 English: Formal Language and Sentence Choices

- Completed all four curriculum slots and Bix lessons for **Active and Passive Voice**, **Formal Structures and the Subjunctive**, and **Expanded Noun Phrases for Information**. The quest now also includes the already-built Formal and Informal Vocabulary and Synonyms and Antonyms topics.
- Topic checks (four slots × 50 deterministic seeds), bank tests and a component playthrough for retry, hint, choice, sort and tile-build completion pass. Browser layout, physical-device, content/owner review and full-course validation remain pending.

## 2026-11-06 — Year 6 English: Synonyms and Antonyms

- Built all four curriculum slots and Bix lessons for **Synonyms and Antonyms**: choosing synonyms and antonyms, sorting around one headword, swapping a word in a sentence with word tiles, and odd-one-out and same/opposite-meaning sentence choices. The course remains explicitly excluded from Year 6 awards.
- Focused lint, deterministic four-slot bank checking (50 seeds), topic-loader checking and component playthroughs of all four slots pass. Full-course lint/test/build, browser layout, physical-device and content/owner review remain pending.

## 2026-11-06 — Year 6 English: Hyphens in Words

- Built all four curriculum slots and Bix lessons for **Hyphens in Words**: visible prefix-and-base models, prefix sorting, letter-tile spelling and sentence choices teach the Appendix 1 forms `co-ordinate` and `re-enter` without conflating them with the later punctuation topic about avoiding ambiguity. The course remains explicitly excluded from Year 6 awards.
- Focused lint, deterministic four-slot bank checking (50 seeds), topic-loader checking and a retry/hint/completion component playthrough pass. Full-course lint/test/build, browser layout, physical-device and content/owner review remain pending.

## 2026-11-05 — Year 6 English: Adding Endings to fer

- Built all four curriculum slots and Bix lessons for **Adding Endings to fer**: visible root-and-suffix models, spelling choices, sorting, letter tiles and sentence spelling all teach when vowel-led suffixes do or do not double the `r` in `-fer` words. The course remains explicitly excluded from Year 6 awards.
- Focused lint, deterministic four-slot bank checking (50 seeds), topic-loader checking and a retry/hint/completion component playthrough pass. Full-course lint/test/build, browser layout, physical-device and content/owner review remain pending.

## 2026-11-04 — Year 6 English course integration and pilot

- Registered the approved 31-topic / 124-slot Year 6 English tree, mapped each permanent topic ID to the Years 5–6 statutory programme and retained `countsTowardYear: false`. No learner-progress, persistence or unlock rule changed.
- Built the four-slot Formal and Informal Vocabulary pilot with Bix lessons, touch-friendly choice/sort/tile activities, 15 authored templates per slot and a retry/hint/completion playthrough. The public guide now identifies the other 30 topics as unavailable while they are built.
- Focused lint, bank, registration, selector, guide and component checks pass. Full lint, test, build, course-wide checker, browser-layout and device/content review are intentionally pending the complete course.

## 2026-11-04 — Year 6 Maths regression coverage and fixes

- Extended focused bank checks and all-slot playthroughs, including decimal tile entry, incorrect-answer retry and independent arithmetic checks. Fixed input, arithmetic, distractor and lesson-format failures found during validation.
- Full validation evidence and remaining teaching/device review are in the [course record](superpowers/2026-11-04-year6-math-course-build.md#follow-up-validation--2026-11-04).

## 2026-11-04 — Year 6 Maths complete course implementation

- Completed all 49 Year 6 Maths topics and 196 challenge slots in the existing Year 6 Maths teaching frame. The course now includes the four operations, fractions and decimals, ratio, algebra, measurement, geometry, position and statistics alongside the place-value pilot.
- Added a Bix lesson for every challenge slot, updated the public guide and curriculum inventory, and retained the staged award setting (`countsTowardYear: false`) without changing learner progress or stored IDs.
- Final build result and remaining content/device review are recorded in the [course record](superpowers/2026-11-04-year6-math-course-build.md).

## 2026-11-04 — Focused development checks and one final validation pass

- Added [validation policy](VALIDATION.md) for Curriculum and Skills: focused
  checks at intermediate handoffs; full lint/tests/build once before merge/release.
  Rerun checks affected by subsequent fixes and broaden immediately for progress,
  accounts, routing, shared engines/components or build configuration changes.
- Aligned AGENTS.md, both authoring guides, course/topic/strand templates and
  relevant agent skills. Keep meaningful bank/playthrough coverage, explicit
  pending final checks and short log summaries. Documentation-only changes do
  not require application suites/builds.
- Validated this documentation-only change with diff, local-link and skill
  metadata checks; application tests/build were not rerun.

## 2026-11-04 — Automatic course usage records and build feedback

- Added `course:usage` for Claude Code logs: branch/timer filtering, global
  message-ID deduplication, per-model/role counters, subagent/resumed-session
  support and explicit unknown fields. Raw transcripts stay outside the repo.
- A completed build can update its course record and Measured builds row in one
  command. Repeated collection refreshes the same entry; ambiguous/missing sources
  fail clearly, and unfinished pilots cannot write completed-build rows.
- Updated the start prompt, course record and strand brief to collect usage
  automatically, check integration fixtures before scaling, preserve pilot
  corrections and record concrete next-build improvements. Parameterised subject
  numeric/lesson contracts instead of imposing Science defaults.
- Collector tests cover duplicate/cumulative rows, branch/time filtering,
  unknown counters, malformed logs, ambiguous discovery and idempotent records.
  A read-only Science check documents its timer-versus-branch-start difference;
  the original baseline is preserved.
- Validation: lint, full tests (2,680 Node and 750 component tests; four MongoDB
  tests skipped without configuration) and build pass. No browser check needed
  for this tooling/documentation change.

## 2026-11-04 — Year 6 Maths place-value pilot

- Owner pilot feedback: capitalised each displayed quest title’s first letter;
  permanent category IDs remain unchanged.

- Registered the approved 49-topic / 196-slot Maths tree with year-award inclusion
  explicitly disabled. Only the four place-value topics are playable so far:
  16 challenges and 16 illustrated, separately registered Bix lessons.
- Added place-value charts through ten million, rounding and negative-number
  models, ordering/sorting tasks and contextual problems. Uses existing theme
  styles and interaction controls; no learner data is reset or migrated.
- Bank tests independently recompute visible calculations; playthroughs cover
  all 16 challenges in both themes, retry/hints and completion, plus real loader
  entry through every lesson. Full validation and remaining owner trial are
  recorded in the [course record](superpowers/2026-11-04-year6-math-course-build.md).
- The other 45 topics remain unavailable pending the requested pilot review.

## 2026-11-04 — Ocean Explorer merged into dev

The `feat/underwater` branch (built 2026-10-29) is merged. Ocean Explorer is a
3D Skills Mode world at `/skills/ocean-explorer`, with its preview guide at
`/learn/ocean-explorer`. It is the second explorable world on the Solar System's
concept, sharing the new world kit in `src/components/worlds/`:

- **Phase 1:** a stationary submarine you can view, zoom and reset.
- **Phase 2:** manual steering with the Solar System's joystick and keys.
- **Phase 3:** orbit a coral reef and read its card.
- **Phase 4:** swimming sea life, now 12 species and 85 animals across nine reefs.

How it works is in [EXPLORABLE_WORLDS.md](EXPLORABLE_WORLDS.md); the
[design](superpowers/specs/2026-10-29-ocean-explorer-design.md) and phase plans
are in `docs/superpowers/`. Remaining work is idea #44. The course-checker
backlog item it collided with is now #45. Owner review of the sea-life facts and
physical-device review are pending.

## 2026-11-04 — Year 6 Science, and Years 5–6 award membership

- Registered Year 6 (Science only so far): 5 strands, 24 topics, 96 challenges
  in the Science adventure frame, mapped verbatim in
  [year-6-science.md](curriculum/year-6-science.md). New figures: circuit
  diagrams with standard symbols, light paths, a periscope, shadows and the
  circulatory system. Year 6 is offered in profiles, signup and the picker, with
  a public guide. [Course record](superpowers/2026-11-04-year6-science-course-build.md).
- Year awards (owner decision): Years 5 and 6 count Maths, English and Science.
  Year 5 History no longer counts, which removes a requirement and revokes
  nothing. Year 6 Science stays excluded until Year 6 Maths and English exist.
- Lint, full tests (2,634 unit/API and 662 component passes; four existing
  skips), build and `check:course --year 6 --subject science` (24/24) passed.
  The new figures had one batched browser pass, at desktop and phone widths in
  both themes. No teacher content review, safeguarding read or device review yet.
- Token usage was counted from the session logs, one entry per message. It is
  recorded in the course record and as the first row of
  [Measured builds](BUILD_MEASUREMENT.md#measured-builds). From it,
  [AUTHORING.md](AUTHORING.md#course-builds-with-content-agents) gained a
  recipe for building a course with content agents and a checklist for adding
  another Year 6 subject. There is also a reusable
  [strand agent brief](superpowers/templates/strand-agent-brief.md).

## 2026-11-04 — Authoring follow-ups

- `BUILD_MEASUREMENT.md` now gives tool-neutral token-recording rules instead
  of OpenAI/Codex-specific commands.
- Course timer records in `docs/authoring/timings/` are git-ignored; final
  totals go in the course record.
- Removed the skill's `references/visual-recipes.md` pointer; links now go
  straight to `docs/VISUAL_RECIPES.md`.
- Backlog #45 tracks bank-checker adapters for the 140 structure-only topics.
- Removed the dated `docs/history/` project-knowledge archive and the branch
  review record; links now point to current docs. The archive's still-current
  coding rules moved to `ENGINEERING_RULES.md`. Earlier detail remains in git
  history (`docs/PROJECT_KNOWLEDGE.md` at `fd4bc37`).

## 2026-11-03 — Full course-building branch review

Reviewed all tracked and untracked work on `feat/improve-course-builds` against
`dev`. Fixed History image-root false failures, internal game-topic aliases,
incompatible envelope/custom-control scaffolds and the existing statutory
licence/license spelling exception. Added regression coverage and corrected
stale progress/deployment guidance.

The first-context guide now has direct, AI-tool-neutral paths for Curriculum
courses and standalone Skills Mode games. Added `SKILLS_AUTHORING.md`, promoted
the visual catalogue into `VISUAL_RECIPES.md`, and documented complete new-course
integration. The entry guide is 1,590 words; the full earlier content remains in
the archive. Bank-checker coverage gaps are tracked as backlog #45.

Lint, full tests (2,627 unit/API and 655 component passes; four existing skips)
and build passed. All 749 topics were swept: 609 passed bank checks over 50
seeds per slot; 140 bespoke topics passed structural checks with their generic
bank-coverage limits explicit. No unexpected failures remained. Source comments
changed in `render.yaml`/`server/email.js`; runtime configuration/behaviour did
not. No commit, deployment, live-data write or new browser/device review occurred.

## 2026-11-03 — Focused project knowledge and build measurement

- Replaced the 45,713-word project knowledge file with a 1,457-word current
  builder guide. Preserved the complete earlier content, with relative links
  rebased, in a clearly labelled historical archive. Split out current
  architecture, curriculum inventory and operations/outstanding review.
- Added direct routes to subject skills, maintained implementation examples,
  visual teaching recipes, commands and exact statutory context. Updated
  maintenance instructions so future outcomes go here instead of growing the
  entry guide into a chronology again.
- Documented official OpenAI token reporting: CLI session/account commands,
  completed-turn JSON usage events, app/IDE context-versus-token distinctions
  and the limits of the local duration timer. No previous or current unobserved
  token counts were inferred.
- Documentation/source review only; no app behaviour, learner records,
  deployment settings or live services changed. Full pre-split content was
  checked against the archive after declared link rebasing; local guide links
  and anchors resolve, and all 32 pathways/749 topics/2,996 slots match the
  current source inventory. Six skill frontmatters are valid. Lint, the full
  suite (2,625 unit/API and 655 component passes, four existing skips) and the
  build (62 public pages prerendered) passed. No browser pass was needed for
  documentation-only changes; live services and physical devices were not checked.

## 2026-11-03 — Curriculum authoring workflow and tools

The authoring work immediately preceding the documentation split delivered
`topic:context`, `scaffold:topic`, `check:topic`, `check:course` and `course:timer`.
The matching skills, compact topic/course templates and visual recipes now guide
future builds through existing subject engines and current illustrated teaching.
Scaffolds preview first, refuse overwrites and preserve subject visuals; empty
generic banks fail tests. Bank adapters reuse available subject validators;
unsupported checks and remaining review gaps are explicit.

The timer persists work/pause intervals across sessions without claiming token
usage. An existing Opposite Match test was made deterministic after a random
positional assumption produced a false failure. Immediately before this split,
lint, build and the full suite passed: 2,625 unit/API checks, four existing skips
and 655 component checks. All 749 topic mappings were found, representative
Year 5 checks covered twelve subjects, and a full Year 5 Science check passed.
No browser pass was needed for tooling/docs; course device/content review is
separate. The current workflow is in [AUTHORING.md](AUTHORING.md).
