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

## Choose the subject's established approach

| Subject / task | Existing approach and source |
|---|---|
| Standalone Skills Mode | [Money Match](../src/pages/skills/math/MoneyMatch.jsx) combines visible coins and a tappable coin tray with [FreePlayShell](../src/components/skills/FreePlayShell.jsx). Reuse the relevant model for each round type/level; a custom map/explorer loop can keep its controls and share answer feedback. |
| Maths | `math/challenges/year4/Year4MathGame.jsx` and `year5/Year5MathGame.jsx`: authored diagrams and manipulatives, column working, coordinate/angle controls; `MathQuestionVisual.jsx` adds source-quantity arrays, part–whole/sharing models, fraction bars, place-value charts and rounding number lines. Preserve custom interactions and answer checkers. |
| English | `english/challenges/EnglishPracticeGame.jsx` and the current reading-topic games use `EnglishQuestionVisual.jsx`: visible word parts, literal picture references, building tiles and marked text. Keep passages and text that the child must actually read; never illustrate hidden dictation answers or infer a character's feelings/actions. |
| Science | The current subject game and `YearNScienceVisual.jsx` render diagrams, apparatus, classification keys and numeric evidence charts. Years 4–5 use `AdventureChallenge` for illustrated Bix notes and `ScienceRound` for the wide figure/evidence/answer layout. Year 3's bespoke enquiries retain their controls and specialised illustrations. |
| History | `HistoryChallenge.jsx`, `HistoryVisual.jsx`, `SourceVisual.jsx` and `TimelineVisual.jsx`: illustrated story cards, source pictures with credits and chronology. Keep evidence and its provenance available during the round. |
| Geography | `GeographyChallenge.jsx`, `GeographyVisual.jsx` and the current year game: illustrated notes, maps, source pictures, routes, compass/coordinate work and charts. Preserve map controls, keys, units and evidence. |
| Art, Computing, D&T, French, Music, PE, Wellbeing | The built Year 5 `Year5<Subject>Game.jsx`/`Visual.jsx` pairs use `AdventureChallenge`: subject banner, Bix's illustrated notes, large start button and wide rounds. Retain the subject's own figure types, narration settings and interactions. |
| Teaching introductions | `lesson/LessonFrame.jsx`, `LessonExample.jsx`, `LessonDiagram.jsx` and current `src/data/lessons/` banks: Bix's short tips, a separately authored worked example and large start button. History/Geography/Adventure supply their own illustrated introductions. |

Paths above are relative to `src/pages/skills/` for games and
`src/components/challenge/` for shared components. Maths/English fallbacks live
under `visual/`; model helpers are in `src/data/challenges/questionVisuals.js`
and `literalPictures.js`. Use existing SVG/CSS assets and paired theme tokens.

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
