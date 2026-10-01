# Brief: building Year 4 English curriculum topics (Dynamic Learning app)

> The brief given to each agent (or person) building Year 4 English topics.
> It is self-contained: hand it over together with a list of topics (category
> id · name · topic id · PascalId, from the tracker) and any design notes.

Repo: /Users/simoncordova/Desktop/Simon/dynamic-learning (React 19 + Vite, plain CSS, node:test). Branch feat/english-year-3-and-4. Audience: children aged 8–9 (UK Year 4). British English throughout.

## Read first (required)
- `AGENTS.md`, then `.claude/skills/building-curriculum-topics/SKILL.md` and `.claude/skills/add-curriculum-challenge/SKILL.md`.
- `docs/curriculum/year-3-and-4-english.md`: the statutory text plus, at the end, "Mapping to our curriculum dataset", which gives each topic's statutory requirement, the Year 3/Year 4 split of Appendix 1, and "Year 3 boundaries that are easy to overshoot". Read the "Year 4 boundaries" section and your topics' rows in "Year 4 topics" before designing anything. Year 4 takes the YEAR 4 column of "How we split Appendix 1". Year 3 patterns may appear only as revision or as distractors, never as the topic. Year 4 terms: determiner, pronoun, possessive pronoun, adverbial (plus the Year 3 terms).
- `docs/curriculum/english-appendix-1-years-3-and-4.md`: the statutory spelling appendix (verbatim).
- The finished Year 3 topics (all 32 are built). Copy their patterns exactly, especially:
  - `src/data/challenges/english/homophones.js` + `.test.js`, `src/pages/skills/english/challenges/year3/HomophonesGame.jsx` + `homophones/HomophonesChallenge{1..4}.jsx`
  - `conjunctions.js` / `ConjunctionsGame.jsx`, `charactersFeelings.js` / `CharactersFeelingsGame.jsx`, `paragraphs.js` / `ParagraphsGame.jsx`
- Shared data: `src/data/english/appendix1.js` (Year 3 / Year 4 word lists, homophone groups and pattern examples, all from the appendix), `src/data/english/cast.js` (the recurring characters and their pronouns: Amara she, Leo he, Priya she, Zayn he, Ellie she, Biscuit he, Ellie's dog; Year 4 uses the same cast, a year older), `src/data/english/passages.js`, `src/data/english/textChecks.js` (findUsSpellings, wordCount, sentenceCount, passageText), `src/data/challenges/english/shared.js` (shuffle, sample, normaliseAnswer, isSameAnswer, tokenise, bareWord).

## The kit (src/components/challenge/), already built
- `ChallengeShell` ({ title, questions, render, onComplete }); render receives { question, submit, locked, index, misses }. Call `submit(isCorrect)`. Always key the round on `index`.
- `hints.js`: `showHint(misses)` is true after 2 misses on one question. Every round shows a `HintNote` hint then. A hint narrows the question (strikes out a wrong option, underlines candidate words, highlights the right paragraph, shows the first letter and the letter count). It NEVER gives the answer away (never strike an option when only 2 remain).
- `ChoiceGrid` ({ options, selected, onSelect, disabled, variant: "wordy" for phrases }) has string options and must have unique labels.
- `LetterInput` ({ value, onChange: setState, disabled, label, maxLength, apostrophe, hideLine }) is an on-screen a–z keyboard. Compare answers with `isSameAnswer`.
- `TileBuilder` ({ tiles: [{id,label}], placed: ids, onChange: setState, disabled, kind: "letters"|"words", fixed: {before, after} }).
- `WordPicker` ({ tokens, selected, onSelect, disabled, mode: "word"|"gap", pickable, hinted: Set, variant: "sentences", innerGaps }).
- `ReadingPassage` ({ passage: { title?, kind?, blocks: [{type: "p"|"h"|"line"|"item", text, label?}] }, speak, highlight: Set }). "h" is a heading, "line" a poem line, "item" a numbered step.
- `SortBins` ({ bins: [{id,label}], cards: [{id,label}], placement: {cardId: binId}, onPlace(cardId, binId|null), disabled }).
- `DragToOrder` ({ items: [{id,label}], onReorder, disabled, direction: "vertical" }).
- `SpeakButton` ({ text, label, compact }) is tap-to-hear (British voice) and renders nothing when the device has no speech. Never autoplay. Never make a question impossible without speech: there must always be a visual way to answer.
- `HintNote` ({ children }).
- `NumberInput` exists but you will rarely need it.
- Styles live in `challenge-kit.css` and `english-kit.css`. Useful classes: `challenge-prompt`, `english-prompt-row`, `english-focus`, `english-blank`, `english-blank-empty`, `english-picture`, `english-mark` (highlight letters), `submit-btn` (the Check button).

## Rules (decided with the product owner; do not deviate)
1. Each topic has exactly 4 challenges that escalate: (1) the rule is stated and shown, child chooses; (2) the rule must be inferred (sort / odd one out); (3) whole-structure work (build with tiles, tap in a sentence, order); (4) applied in context with no gloss (a passage, typing on LetterInput, a mini-story). Use at least 3 different interactions across the 4.
2. 5 questions per challenge. A challenge built on ONE passage asks 3–4 questions about it.
3. Each run draws from a bank at least 3× the questions needed (≥15 items per level, or ≥3 passages for a passage level), with options shuffled. Randomise with `rng` passed in; components call `build(level, Math.random)` inside `useMemo`.
4. Grammar terms: the statutory term with a friendly gloss in challenges 1–3 ("conjunction (joining word)"); challenge 4 drops the gloss.
5. Passages are ORIGINAL texts, 60–200 words (slot 1: 2–4 sentences; up to ~200 words in slot 4, with more than one paragraph where the skill needs it). Use the recurring cast with their pronouns. British spelling (colour, favourite, mum, centre, metre).
6. Emoji picture clues and CSS only. No image files.
7. Composition: only choices and building, all marked by the app. No free writing.
8. Every right answer must be the ONLY right answer. If two options could be defended, change the item. Choose wrong options by hand so they are clearly wrong, never "also fits". "An ambiguous dataset must answer null, not a guess."
9. Distractors are plausible near-misses (a common misspelling, the other homophone, the wrong suffix rule), not random words.

## Files per topic (names are COMPUTED, the loader depends on them)
- Pure builder: `src/data/challenges/english/<camelTopic>.js`, exporting the banks and a `build<Topic>Questions(level, rng)`. No React. Plus `<camelTopic>.test.js` beside it, which must cover:
  - bank sizes;
  - each option list contains its answer exactly once, with distinct options;
  - every level builds 5 answerable questions across ~30 seeds (copy the `seeded` helper from homophones.test.js);
  - British spelling via `findUsSpellings`;
  - Appendix 1 words drawn from `appendix1.js` where the topic is a spelling pattern (test that the appendix's example words are included);
  - any structural invariants (one blank per sentence, the tapped word appears exactly once, and so on).
- Pure builder: name it `src/data/challenges/english/year4<CamelTopic>.js` (with `year4` in front, so Year 4 modules never collide with Year 3 ones such as `dictation.js`), plus its `.test.js`.
- Game component: `src/pages/skills/english/challenges/year4/<Pascal>Game.jsx` (shared by the 4 challenges, like year3/HomophonesGame.jsx).
- Four thin files: `src/pages/skills/english/challenges/year4/<topic-id>/<PascalId>Challenge{1..4}.jsx`, each exactly:
  ```jsx
  import XGame from "../XGame";

  export default function <PascalId>ChallengeN({ onComplete }) {
    return <XGame level={N} onComplete={onComplete} />;
  }
  ```
  If a PascalId would start with a digit, the function name must differ; the file name must not.

## Constraints for parallel work (important)
- Other agents are building other topics in the same working tree at the same time.
- Do NOT edit any existing file: not the kit components, `english-kit.css`, `challenge-kit.css`, `passages.js`, `cast.js`, `appendix1.js`, `shared.js`, the curriculum dataset, docs, or the other topics.
- If you need a passage, put it in your own builder module (or a new file `src/data/english/passages<Topic>.js`).
- If you need extra styling, add a new CSS file next to your Game component (e.g. `year4/<Pascal>Game.css`), using only the `--ck-*` tokens (e.g. `var(--ck-accent)`, `var(--ck-muted)`, `var(--ck-text)`, `var(--ck-border)`, `var(--ck-panel)`, `var(--ck-on-accent)`), so both light and dark themes work. Any button you style needs two classes.
- If you believe a kit component needs changing, do NOT change it. Work around it in your Game component and list the suggestion in your final report.
- Do NOT use a browser (another process is driving it). Do NOT commit. Do NOT run the dev server.
- Verify with: `node --test src/data/challenges/english/<yourfile>.test.js`, `npx eslint <your files>`, and at the end `npm test` and `npm run build` (both must pass; if a failure is in someone else's in-progress file, say so rather than touching it).

## Final report (keep it compact)
For each topic: the files created; a one-line design of each of the 4 challenges (the interaction and what it asks); the bank sizes; anything you were unsure about in the curriculum boundary; and any kit suggestions. Also give the exact DOM-driving hints I need to play each level in a browser (which selectors hold the prompt, and how to compute the right answer from the bank given what is on screen), because I will drive every challenge in the browser afterwards.
