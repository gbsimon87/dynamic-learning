# Topic brief: Year 6 English — Year 6 Word List Part 2

- Registry identity: Year 6 / English / `spelling---advanced-patterns` / `year-6-word-list-part-2`
- Context command: `npm run topic:context -- --year 6 --subject english --topic year-6-word-list-part-2`
- Statutory source and exact mapping row: `docs/curriculum/year-5-and-6-english.md`, Year 6 Spelling – Advanced Patterns; Appendix 1 statutory Years 5 and 6 word list, Year 6 half, queue to yacht (25 entries; `sincere(ly)` taught as two words).
- In scope / excluded: Spelling the 26 statutory words in this half. No other word-list words are taught.
- Recipe: Year 6 authored English topic bank, `DataChallenge`, `EnglishQuestionVisual`, Bix lesson registry (`spellingAdvancedPatterns.js`) and the Advanced Patterns playthrough.
- Built-year visual reference: `EnglishPracticeGame.jsx` and `EnglishQuestionVisual.jsx`; word-part models show visible givens and leave the answer unknown.

| Slot | Learner outcome | Illustrated example and question model / interaction | Misconception and retry support |
|---|---|---|---|
| 1 | Choose the spelling from spelling chunks and a meaning. | Chunk model, then choices with two misspellings. | Silent or unexpected letters (rhythm, yacht); the hint is the memory tip. |
| 2 | Sort spellings into correct and incorrect. | Two bins, three right and three wrong spellings per set. | Trusting a familiar-looking misspelling; the hint says to say the word in chunks. |
| 3 | Build the word from letter tiles using its meaning and tip. | Letter tiles plus a memory tip. | Losing doubled or silent letters; the hint says to check the tricky part. |
| 4 | Type the missing word in a sentence. | Sentence gap on the letter keyboard; the clue gives meaning, first letter and letter count. | Spelling by sound; the hint is the memory tip. |

| Status | Evidence / remaining work |
|---|---|
| Implemented | Four wrappers, an authored bank for every slot and four Bix lessons. |
| Technically validated | Focused lint, 50-seed bank checker, bank tests (words verified against the saved appendix data) and a completion playthrough of every slot, with retry/hint on each choice slot 1, pass. Full course validation remains pending. |
| Content reviewed | Implementer review of answers, misspellings and sentences only; teacher/owner review remains open. |
| Device reviewed | Browser/layout and physical touch checks remain open. |
| Owner/learner review | Observe whether learners use the model (rhyme word, chunks, meanings) rather than guessing. |
