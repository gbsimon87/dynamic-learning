# English authoring reference

## Authored banks (Year 3 onwards)

English follows the same four-slot pattern, with three differences.

**Questions come from authored banks, not arithmetic.** That makes "is there
exactly one right answer?" the main risk. Wrong options are chosen by hand
for each item, so they are clearly wrong. An option that "also fits" is left
out, never marked wrong ("Biscuit wagged his tail because Ellie came home" is
fine English, so "because" is not a wrong option there). Every bank holds at
least 3× a run (≥15 items, or ≥3 passages for a passage level). Tests check
the mechanics: one blank per sentence, a tapped word appearing exactly once,
quoted evidence appearing verbatim in its passage.

**Where things live.**

| What | Where |
|---|---|
| Statutory word lists, homophones, pattern examples (with our Year 3 / Year 4 split) | `src/data/english/appendix1.js`, tested word by word against `docs/curriculum/english-appendix-1-years-3-and-4.md` |
| The recurring cast and their pronouns | `src/data/english/cast.js` |
| Shared passages | `src/data/english/passages.js` (≤200 words, tested) |
| British-spelling, word and sentence checks for tests | `src/data/english/textChecks.js` |
| shuffle / sample / isSameAnswer / tokenise / bareWord | `src/data/challenges/english/shared.js` |
| One builder per topic | `src/data/challenges/english/<topic>.js` + `.test.js` |
| One game per topic, shared by its four challenge files | `src/pages/skills/english/challenges/year3/<Pascal>Game.jsx` |
| Year 4 equivalents | Builder `src/data/challenges/english/year4<CamelTopic>.js` (the `year4` prefix stops collisions with Year 3 modules such as `dictation.js`); game and challenges under `challenges/year4/` |

**The English kit** (in `src/components/challenge/`, styled in `english-kit.css`):

| Component | Use for |
|---|---|
| `LetterInput` | Spelling on a big a–z keyboard. Never the native field (autocorrect spells the word). `hideLine` when the letters already show in a sentence's blank. |
| `TileBuilder` | Build a word from letter tiles or a sentence from clause tiles. Tap to place, tap to take back. |
| `WordPicker` | Tap a word (`mode="word"`), a sentence (`variant="sentences"`), or a gap (`mode="gap"`; `innerGaps` when the first and last gaps can't be right). |
| `ReadingPassage` | A text with paragraphs, headings (`h`), poem lines (`line`), numbered steps (`item`) and `label`s; `highlight` for hints. |
| `SortBins` | Two or three labelled bins. Tap a card, then a bin. |
| `SpeakButton` | 🔊 tap to hear, in a British voice. Never automatic. Renders nothing without a voice, so no question may depend on it alone. |
| `HintNote` + `hints.js` | `ChallengeShell` passes `misses`. `showHint(misses)` is true after two misses. A hint narrows (strikes out a wrong option, underlines candidates, highlights the paragraph, shows `m _ _ _`) and never gives the answer, and never strikes when only two options remain. |

**House rules.** These were decided with the product owner on 2026-10-01:

These describe the original Years 3–4 content recipe. The current visual baseline
is the illustrated lesson/word-part/literal-picture approach in
[visual-recipes.md](visual-recipes.md); use the current year's working examples.

- Five questions per challenge. A challenge built on one passage asks 3–4.
- Grammar terms come with a gloss in slots 1–3, "conjunction (joining word)",
  and slot 4 drops the gloss.
- Passages are original, use the cast, and are 2–3 sentences in slot 1 and
  up to ~200 words in slot 4.
- Use the current shared SVG/CSS illustrations and visual lesson examples; the original emoji-only presentation has been superseded.
- Composition is choice-and-build only. Nothing is free writing.
- British spelling, enforced by `findUsSpellings` in every bank's test.

**Verifying in the browser, when it is needed.** A driver can import a topic's bank from the
dev server, `await import('/src/data/challenges/english/<topic>.js')`, and
map what is ON SCREEN (the sentence, the meaning, the clue) back to its
answer. A prompt the driver cannot match is a prompt a child cannot answer
either. Always play two wrong answers on the first question, to see the hint
appear and confirm the question does not advance.

