# Topic brief: Year 6 English — The Letter String ough

- Registry identity: Year 6 / English / `spelling---advanced-patterns` / `the-letter-string-ough`
- Context command: `npm run topic:context -- --year 6 --subject english --topic the-letter-string-ough`
- Statutory source and exact mapping row: `docs/curriculum/year-5-and-6-english.md`, Year 6 Spelling – Advanced Patterns; Appendix 1, “Words containing the letter-string ough” (ought, bought, thought, nought, brought, fought, rough, tough, enough, cough, though, although, dough, through, thorough, borough, plough, bough).
- In scope / excluded: Spelling the statutory ough words by sound family and meaning. `though` is taught in the sound sort; its near-twin `although` carries the sentence slots so no sentence admits two offered words.
- Recipe: Year 6 authored English topic bank, `DataChallenge`, `EnglishQuestionVisual`, Bix lesson registry (`spellingAdvancedPatterns.js`) and the Advanced Patterns playthrough.
- Built-year visual reference: `EnglishPracticeGame.jsx` and `EnglishQuestionVisual.jsx`; word-part models show visible givens and leave the answer unknown.

| Slot | Learner outcome | Illustrated example and question model / interaction | Misconception and retry support |
|---|---|---|---|
| 1 | Spell the word from a visible rhyme word and a meaning. | Rhyme-word model (`Rhymes with ‘short’ → ?`), then large spelling choices. | Writing ough with the wrong sound pattern (`brougt`, `enuff`); the hint asks which ough family the word belongs to. |
| 2 | Sort words by the sound ough makes. | Three bins: rhymes with ‘short’, ‘stuff’ and ‘show’. | Sorting by spelling instead of sound; the hint says to say each word aloud. |
| 3 | Build the word from letter tiles in a sentence. | Rhyme-word model and letter tiles (one extra tile). | Splitting or reordering ough; the hint names the ough family. |
| 4 | Choose the right ough word in a sentence. | Sentence gap with real ough-word options, none of which could also fit. | Choosing a look-alike (`through` for `though`); the sentence stays visible on retry. |

| Status | Evidence / remaining work |
|---|---|
| Implemented | Four wrappers, an authored bank for every slot and four Bix lessons. |
| Technically validated | Focused lint, 50-seed bank checker, bank tests (words verified against the saved appendix data) and a completion playthrough of every slot, with retry/hint on each choice slot 1, pass. Full course validation remains pending. |
| Content reviewed | Implementer review of answers, misspellings and sentences only; teacher/owner review remains open. |
| Device reviewed | Browser/layout and physical touch checks remain open. |
| Owner/learner review | Observe whether learners use the model (rhyme word, chunks, meanings) rather than guessing. |
