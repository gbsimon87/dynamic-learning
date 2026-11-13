# 💡 Project Ideas — Learn with Bix

Upcoming work only: remove an item when it ships (git history keeps delivered work).

🟡 In progress · 🔵 Planned · ⚪ Idea. IDs are stable references, not rankings.

## Teacher tools

### Everyday classroom jobs

| # | Idea | What it helps teachers do | Status |
|---|---|---|---|
| 48 | **Whole-class teaching display** | Present an illustrated worked example, edit the explanation, reveal steps and show a follow-up question with a hidden answer. Start with Year 3 Maths. | ⚪ |
| 51 | **Whole-class feedback sheet** | Turn teacher-observed mistakes and successes into a class feedback sheet with corrections, worked examples, follow-up questions and a separate key. | ⚪ |
| 57 | **Weekly preparation checklist** | Combine planner lessons' equipment and printing needs into an editable checklist with quantities and preparation dates. | ⚪ |
| 58 | **Morning starters and retrieval practice** | Make a short starter from previously taught topics, with printable or projected questions and separate answers. | ⚪ |
| 59 | **Support and stretch versions** | Prepare supported, core and reasoning versions for the same objective, using reviewed models and prompts. | ⚪ |
| 60 | **Vocabulary cards and working-wall prompts** | Print topic vocabulary with child-friendly definitions, examples and diagrams as display or desk cards. | ⚪ |
| 61 | **Independent and teaching-assistant task cards** | Turn a planner activity into pupil instructions and adult prompts, with equipment, a worked example and answers. | ⚪ |
| 62 | **Writing planning frames** | Prepare a writing stimulus, planning frame, vocabulary bank and pupil editing checklist for selected English genres. | ⚪ |
| 63 | **Pupil topic organisers** | Turn reviewed briefings into one-page pupil references with key facts, vocabulary, labelled diagrams and discussion questions. | ⚪ |
| 64 | **Exit tickets and hinge questions** | Check understanding with three printable questions or one projected question, plus answers and teacher follow-up prompts. Start within the assessment workflow. | ⚪ |
| 65 | **Homework and home-practice packs** | Combine a short practice sheet, illustrated reminder, parent-guide link, answers and an optional offline activity. | ⚪ |
| 66 | **Cover and lesson handover sheets** | Export planner lessons with timings, teaching points, resources, answers and a fallback activity for a colleague or supply teacher. | ⚪ |
| 67 | **Practical activity instruction cards** | Prepare illustrated Science or Geography steps, equipment lists and observation sheets from reviewed activities. | ⚪ |
| 68 | **Parents' evening conversation prompts** | Turn teacher-selected strengths and practice needs into a short agenda, family questions and an agreed next step. | ⚪ |

### Planning and resources

- **Saved plans:** add teacher access so plans can be saved and reopened.
- **Class pre-tests:** collect separate assessment evidence to inform teacher-reviewed plans; completion totals cannot diagnose gaps.
- **School sharing:** let authorised colleagues share and copy plans and resources privately.
- **More teacher notes:** Years 1–4 Science, History and Geography and Year 3 Maths have notes. Years 5–6, all English and Maths outside Year 3 are unwritten.
- **Practice sheet options:** consider page presets and better exports after #46's review.
- **Shared topic picker:** reuse year/subject topic lists across guides, briefings and planning.

Constraint for accounts and sharing: a teacher must never reach family profiles by sharing an identifier. Teacher accounts need an explicit school/class membership model (none exists in `server/db.js`), and evidence records stay separate from progress and rewards. Current tool contracts: [ARCHITECTURE.md](ARCHITECTURE.md#teacher-tools).

**Suggested next:** finish #46's review, then pilot #48. Test demand for #58, #60 and #65 as small extensions to existing tools. Keep preparation and handover outputs in the planner; prioritise saved plans if lost drafts prevent repeat use.

## Learner experiences

- **Year 3 wording review:** Maths and Science done; English (32 topics), History (22) and Geography (16) remain, in that order, against the learner-language standard in [AUTHORING.md](AUTHORING.md#review-content). Teacher/child and device review remain separate.

| # | Idea | Upcoming work | Status |
|---|---|---|---|
| 9 | **Richer grown-up progress reports** | Show time spent and practice needs using a separate per-attempt record; define any reset scope carefully. | 🟡 |
| 10 | **Adaptive questions** | Adjust difficulty within the child's year. Depends on #9 and tested difficulty controls. | ⚪ |
| 12 | **Phonics and rhyming games** | Practise sounds, rhymes and syllables using suitable letter-sound recordings. | ⚪ |
| 13 | **Story Maker and Story Sequencer** | Build silly stories or order picture cards, reusing suitable Year 3 English material. | ⚪ |
| 14 | **Offline, installable app** | Support play without a connection after defining a safe progress queue and merge policy. | ⚪ |
| 20 | **More Skills games** | Add short, replayable Maths, English or Geography practice; shortlist below. | ⚪ |
| 24 | **Avatar wardrobe** | Unlock hats, glasses, capes or a pet through achievements while preserving existing rewards. | ⚪ |
| 25 | **Bix's den** | Decorate Bix's room with earned topic objects that replay revision facts. Depends on #24. | ⚪ |
| 26 | **Boss rounds** | Add friendly mixed-topic finales with new art, without time pressure or failure. | ⚪ |
| 27 | **More real-world missions** | Expand grown-up-confirmed activities and mission stickers into more subjects, separate from curriculum completion. | 🟡 |
| 28 | **Teach the grown-up** | Let children set and mark a topic quiz for a grown-up. | ⚪ |
| 29 | **Pass-and-play for two** | Add cooperative or turn-taking Skills games on one device, independent of curriculum progress. | ⚪ |
| 31 | **Science notebook and geography passport** | Collect topic cards and exploration stamps with revision facts. Define earning rules. | ⚪ |
| 32 | **Seasonal events** | Offer themed activity packs with permanent stickers; plan at least a term ahead. | ⚪ |
| 33 | **Story adventure** | Turn each year's topics into a Bix storyline and map. Needs art, writing and completed read-aloud work (#8). | ⚪ |
| 69 | **Review curriculum introductions and quizzes** | Live for all 39 pathways (rollback switches in OPERATIONS.md). Awaits owner/teacher review (use `npm run journey:review`), device read-aloud checks and learner review; gates in [OPERATIONS.md](OPERATIONS.md#outstanding-review-and-known-limits). | 🟡 |

**Skills game shortlist (#20):**

- **Maths:** Math Sentence Builder, Compare the Numbers, Math Maze, Clock Quiz, Skip Count Jump, Estimate It!, Magic Squares, Number Line Jump, Odd or Even Sort, Shape Sorter 3D, Pattern Play, Tally Marks Trainer, Math Bingo.
- **English:** Sentence Fixer, Word Picture Puzzle, Riddle Time, Emoji Sentences, Picture Vocabulary, Alphabet Adventure, Listening & Repeat.
- **Geography:** Find the Ocean, Country Puzzle, Map Memory Match (country ↔ landmark), Find My Neighbour, Landform Adventure, Weather Around the World, Where Animals Live, Earth Layers Explorer, Natural Wonders Quest, Travel Routes, Around My Home, People & Languages, Seasons Around the World, Save Our Planet, Day & Night Map, Water vs Land Sort, Earth from Space.

### Playful learning shortlist (future "Bix's Workshop")

Prototype through Skills Mode, one at a time; playtest each before the next.
Secret Rule Zoo (`/rule-zoo`, #43) is built and awaits a playtest.

| Idea | Experience |
|---|---|
| Bix's Repair Shed | Choose lengths, supports and materials to repair a toy vehicle's crossing, test it and inspect what happened. Strongest product candidate. |
| Word Wizard Theatre | Build a sentence from tiles; characters act it out; change a word or mark to change the scene. |
| Monster Picnic | Portion food, fill cups and rearrange seats to meet creatures' visible needs; no timer. |
| Bix Gets It Wrong | Bix makes one visible mistake; the child corrects it and Bix retries. Low-cost test of a responsive Bix. |
| Balance Beasts | Balance weighted creatures on an equal-arm balance; swap equivalent groups. |
| Parcel Pals | Rotate and pack grid-footprint gifts into a box. |
| Fold-a-Friend | Decorate half a sheet, predict, unfold a symmetrical creature. Next small experiment. |
| Secret Message Club | Decode a picture-symbol note with a visible key, then write one. |
| Copycat Club | Describe a hidden arrangement for a partner to rebuild; test with pairs first. |

Design rules: first meaningful action within 10–20 seconds; 2–5 minute activities
with an obvious ending; nothing deteriorates while away (no expiring events,
attendance rewards or loot); tap-to-place and keyboard alternatives to dragging;
"show me / let me try / make it trickier" without secretly classifying the
child; no automatic curriculum completions. Each idea's playtest targets its
central action, not more animation.

## Technical improvements

| # | Idea | Upcoming work | Status |
|---|---|---|---|
| 6 | **Shared English question data** | Migrate earlier English games to shared formats and renderers, preserving interactions through side-by-side replay. | 🟡 |
| 8 | **Read-aloud coverage** | Add missing Maths tile-list reading. | 🟡 |
| 11 | **Safeguarding and parental consent** | Confirm hosting/supplier agreements and implement requirements from the qualified review. | 🟡 |
| 15 | **Geography expansion** | Replace secondary Year 4 sources and agree further Years 5–6 depth after review. | 🟡 |
| 36 | **Privacy-safe analytics** | After #11, configure PostHog EU with agreed consent, a signed DPA and named events; disable IP capture, autocapture and replay. | 🟡 |
| 42 | **History awards** | Decide Year 2/4 award membership without changing earned awards. | 🟡 |
| 44 | **Ocean Explorer expansion** | Scope travel to new areas after fact and device review. | 🟡 |
| 45 | **Course-checker coverage** | Add bank adapters for Years 2–3 Maths, Year 3 English/Science and dictation in Years 1, 2, 4 and 5. | ⚪ |

## Manual reviews

| # | Review | What to check | Status |
|---|---|---|---|
| 7 | **Accessibility and keyboard audit** | Play every interaction with keyboard and screen-reader support; check reduced motion and both themes. | ⚪ |
| 17 | **Solar System meteor** | Measure touch behaviour and performance on a real phone and tablet. | 🟡 |
| 38 | **English and Science playthroughs** | Check answers, hints, saving, celebrations, touch, keyboard, themes and read-aloud using disposable profiles. | 🟡 |
| 43 | **Secret Rule Zoo playtest** | Observe children before choosing two-feature rules or child-made creatures. | 🟡 |
| 46 | **Printable practice** | Get teacher feedback on Years 1–6 content, classroom use and photocopy quality. | 🟡 |
| — | **Teacher notes and parent guides** | Obtain teacher review of the teacher notes (Years 1–4 Science, History and Geography; Year 3 Maths) and each parent guide. | ⚪ |
| — | **Read-aloud devices (#8)** | Verify voices on real phones and tablets. | 🟡 |
| — | **Safeguarding (#11)** | Obtain qualified advice on sign-up, data handling and consent. | 🟡 |
| — | **Geography (#15)** | Play Years 2 and 4 and review Years 1–4 on phones and tablets. | 🟡 |
| — | **History (#42)** | Review Years 2–4 on physical devices. | 🟡 |
| — | **Ocean Explorer (#44)** | Review facts, controls and device performance before expanding travel. | 🟡 |

**Suggested order:** safeguarding review (#11); accessibility and device reviews; authoring improvements (#6, #45); then a new Skills game. Design per-attempt records (#9) and analytics (#36) after the consent review.
