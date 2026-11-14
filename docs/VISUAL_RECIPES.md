# Visual teaching recipes

Project reference for both Curriculum and standalone Skills Mode; no AI-tool
integration is required. Use [Curriculum authoring](AUTHORING.md) or
[Skills game authoring](SKILLS_AUTHORING.md) for the appropriate game lifecycle.

Use the currently built years as the presentation and interaction reference.
Read the nearest matching subject/year game, lesson and visual renderer before
building. `topic:context` lists existing references, including an earlier built
year when the requested year has no shared game yet. Keep the new year's content,
age limits and banks; a reference is not a registration or permission to reuse
older questions unchanged.

## Interface icons and brand

Children aged 6–8 are the primary audience; parent accounts and teacher tools
support their learning. Favour recognisable objects, rounded forms and soft
colour that sit comfortably beside Bix. Keep useful controls large, labelled
for assistive technology and legible in both themes, including at small sizes.

The navbar currently uses native emoji: 🎯 Skills, 🎒 Curriculum, 🏆 Trophies and
👥 Parent area (account management). Their appearance follows the device's emoji
font. The profile switcher keeps the active child's chosen avatar, name and
colour: it identifies who is playing, while the parent link opens account
management. The empty profile slot uses ➕ alongside “Pick profile”, linking to
the profile picker; keep it distinct from the parent link.
Show each learner's level and streak below their name in the `/profiles` cards;
keep these indicators out of the navbar, including the small-screen avatar chip.

### Icon families to consider

These are researched options for a future selection, not an adopted replacement
for the current navbar. Compare actual assets beside Bix at 24–32 px and at
larger hub sizes, on both light and dark surfaces.

| Option | Fit for Learn with Bix | Formats and licence |
|---|---|---|
| [Microsoft Fluent Emoji — 3D](https://github.com/microsoft/fluentui-emoji) | Preferred direction for child-facing navigation: soft, rounded, shaded objects closest to Bix. Samples include Bullseye, Backpack, Trophy, Identification card and Books. | PNG; [MIT](https://github.com/microsoft/fluentui-emoji/blob/main/LICENSE), retaining the copyright and licence notice. |
| [Microsoft Fluent Emoji — Colour](https://github.com/microsoft/fluentui-emoji) | Vector alternative from the same family for comparison at smaller sizes. This variant is already used in Science illustrations. | SVG; the same MIT licence. Existing pinned sources and checksums are in [the Science asset manifest](../scripts/science-assets/sources.json). |
| [Icons8 — 3D Fluency](https://icons8.com/icons/3d-fluency) | Alternative soft 3D family with learning objects and a circular account badge. Samples include Goal, School Backpack, Trophy, User Male Circle and Books. | Download formats and sizes depend on the asset and plan. [Free use requires credit links](https://icons8.com/license); paid licensing offers attribution-free use. |

For any broader icon selection:

- Use familiar learning and reward objects in the main child-facing navigation
  and hubs. Preserve a consistent family across these destinations.
- Give the parent account an administrative identity, such as an account card
  or account badge, with an accessible “Parent area” label. A visible “Parents”
  label is a candidate when layout permits.
- Preserve children's chosen profile avatars. They are personal identity and
  profile-switching cues, not an icon-library replacement opportunity.
- Use quieter utility icons for printing, editing, search and similar actions
  within teacher and parent tools; those tools should not set the tone of the
  child-facing navigation.
- Bundle selected assets locally, retain their source/licence information and
  add required credits. Follow the image-source rules below.

## Choose the subject's established approach

| Subject / task | Existing approach and source |
|---|---|
| Standalone Skills Mode | [Money Match](../src/pages/skills/math/MoneyMatch.jsx) combines visible coins and a tappable coin tray with [FreePlayShell](../src/components/skills/FreePlayShell.jsx). Reuse the relevant model for each round type/level; a custom map/explorer loop can keep its controls and share answer feedback. |
| Maths | `math/challenges/year4/Year4MathGame.jsx` and `year5/Year5MathGame.jsx`: authored diagrams and manipulatives, column working, coordinate/angle controls; `MathQuestionVisual.jsx` adds source-quantity arrays, part–whole/sharing models, fraction bars, place-value charts and rounding number lines. Preserve custom interactions and answer checkers. |
| English | `english/challenges/EnglishPracticeGame.jsx` and the current reading-topic games use `EnglishQuestionVisual.jsx`: visible word parts, literal picture references, building tiles and marked text. Keep passages and text that the child must actually read; never illustrate hidden dictation answers or infer a character's feelings/actions. |
| Science | The current subject game and `YearNScienceVisual.jsx` render diagrams, apparatus, classification keys and numeric evidence charts. Years 4–5 use `AdventureChallenge` for illustrated Bix notes and `ScienceRound` for the wide layout: picture → clue card → question → equal-width answer rows → Check, with the question always directly above its answers. `ChallengeShell` `wide` gives the roomy card (~1120px) with feedback beside Check; two columns start at 1024px (`science-round.css`), the figure sticky only when it fits; a game with no figure keeps the 760px column. Year 3's bespoke enquiries retain their controls and specialised illustrations. |
| History | `HistoryChallenge.jsx`, `HistoryVisual.jsx`, `SourceVisual.jsx` and `TimelineVisual.jsx`: illustrated story cards, source pictures with credits and chronology. Keep evidence and its provenance available during the round. |
| Geography | `GeographyChallenge.jsx`, `GeographyVisual.jsx` and the current year game: illustrated notes, maps, source pictures, routes, compass/coordinate work and charts. Preserve map controls, keys, units and evidence. |
| Art, Computing, D&T, French, Music, PE, Wellbeing | The built Year 5 `Year5<Subject>Game.jsx`/`Visual.jsx` pairs use `AdventureChallenge`: subject banner, Bix's illustrated notes, large start button and wide rounds. Retain the subject's own figure types, narration settings and interactions. |
| Teaching introductions | `lesson/LessonFrame.jsx`, `LessonExample.jsx`, `LessonDiagram.jsx` and current `src/data/lessons/` banks: Bix's short tips, a separately authored worked example and large start button. History/Geography/Adventure supply their own illustrated introductions. |

Paths above are relative to `src/pages/skills/` for games and
`src/components/challenge/` for shared components. Maths/English fallbacks live
under `visual/`; model helpers are in `src/data/challenges/questionVisuals.js`
and `literalPictures.js`. Use existing SVG/CSS assets and paired theme tokens.

## Story/notes cards, maps and reading limits

- Every History story card and Geography notes card is followed by a run of
  rounds. Reopening the card never regenerates the bank or loses the round.
- The bank asks only what the card or source shows: each History template names
  an `answeredBy` phrase that `lintHistoryTopic` finds on the card; each
  Geography question carries `evidence` and `sources`, checked by
  `lintGeographyTopic`.
- Reading limits live in code, not docs: `GEOGRAPHY_AGES`
  (`geography/engine.js`), `HISTORY_AGE` (`history/engine.js`) and `LESSON_AGES`
  (`lintLessons.js`).
- Map questions are never memory tasks: keep the source visible. Use labelled
  markers A/B/C with ordinary answer buttons; never grade a fingertip position.
  Give every map, diagram and chart a text equivalent that does not reveal the
  answer, and never rely on colour alone.
- No timer, speed score or leaderboard. A wrong answer keeps the round open;
  two misses reveal the hint.

## Sources and images

- History images are CC0-1.0 or PDM-1.0 only (`ALLOWED` in
  `scripts/history-assets/fetch.mjs`); never CC BY, BY-SA or NC. Draw
  in-copyright works and modern people. Each manifest entry needs id, title,
  institution, objectUrl, fileUrl, licence, retrieved, sha256 and child-friendly
  alt text.
- Geography photos and aerials are CC0, public domain or OGL; an Ordnance Survey
  extract must be licensed, and practice grids show the real OS key.
- Science "illustrated" artwork is third-party, pinned to a commit with sha256
  in `scripts/science-assets/sources.json`, fetched only by those scripts and
  listed in `src/assets/science/manifest.json`. The hand-built SVG `*Figure`
  components stay as the "classic" fallback, including when an image fails.
- Bundle every image and list it on `/credits`. Never fetch third-party images or
  map tiles at runtime, and never use geolocation.
- Drawn maps, timelines and scenes are SVG on `--light-*`/`--dark-*` tokens.

## Match visuals to Curriculum slots or Skills rounds

For Curriculum, the brief must name each slot's learning representation, its reference renderer,
the illustrated introduction/worked example and the in-question visual or
manipulative. Introduction and challenge should use the same representation.
Retain progressively reduced support and application; do not flatten a course
into interchangeable text questions or add a decorative picture in place of a
useful learning model. A deliberately text-only reading/dictation assessment can
be appropriate: state why and preserve the skill being assessed.

For standalone Skills Mode, plan the visual model/interaction for each round
type and level. Retain its endless or custom game loop; do not introduce four
Curriculum completion slots, progress writes or certificate awards.

Author introductory examples separately from the live generated question.
Their own worked answers can demonstrate the method. In a live question,
derive supplemental pictures from visible givens (or the authored evidence
schema), never hidden `answer`, hints, correct bin assignments or expected
responses. Leave the unknown unknown. Literal references illustrate supplied
nouns only. Existing authored diagrams take precedence over generic fallbacks.

`MathQuestionVisual` and `EnglishQuestionVisual` return `null` for unsupported
material. Their presence in JSX does not establish that a question has a useful
picture. Inspect every representation/variant; extend a reusable renderer or
author the missing diagram when needed. Native clock, coins, chart, fraction
and place-value question kinds already supply their own visual controls.

For Curriculum, prefer `scaffold:topic --game ...` for a subject's existing visual game.
Generic scaffolding is limited to Maths/English and wires their shared question
visuals and pictured controls; other subjects require `--game` to preserve their
illustrated story/notes/evidence frame. Complete the game adapter and connect
the new topic's own banks before shipping.

## Evidence

Extend `tests/components/questionVisuals.test.jsx`, relevant subject
playthroughs, `lessonFrame.test.jsx` and/or `year5Adventure.test.jsx` as appropriate.
For Skills Mode, extend its pure generator tests and `freePlay.test.jsx` or the
game's own component playthrough.
Check rendered counts/labels against independent expected givens, keep pictures
with moved cards, exercise wrong-answer retry and locked controls, and verify
that changing a hidden answer does not change a supplemental model. Preserve
accessible names, text equivalents and sound-off play. Follow `AGENTS.md` for
real layout/drag/browser checks across both themes and appropriate viewports;
record physical-device and browser gaps honestly.
