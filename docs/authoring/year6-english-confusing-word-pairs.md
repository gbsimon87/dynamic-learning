# Topic brief: Year 6 English — Confusing Word Pairs

- Registry identity: Year 6 / English / `spelling---advanced-patterns` / `confusing-word-pairs`
- Context command: `npm run topic:context -- --year 6 --subject english --topic confusing-word-pairs`
- Statutory source and exact mapping row: `docs/curriculum/year-5-and-6-english.md`, Year 6 Spelling – Advanced Patterns; Appendix 1, Year 6 half of homophones and other words often confused: descent/dissent, desert/dessert, draft/draught, farther/father, past/passed, precede/proceed, principal/principle, profit/prophet, stationary/stationery, steal/steel, wary/weary.
- In scope / excluded: The eleven Year 6 pairs only (the Year 5 pairs belong to `homophones-and-confusing-words`). The noun `desert` is used; the verb sense (abandon) is not taught. Slot 3 tiles exclude `further` so `farther` is the only buildable fit.
- Recipe: Year 6 authored English topic bank, `DataChallenge`, `EnglishQuestionVisual`, Bix lesson registry (`spellingAdvancedPatterns.js`) and the Advanced Patterns playthrough.
- Built-year visual reference: `EnglishPracticeGame.jsx` and `EnglishQuestionVisual.jsx`; word-part models show visible givens and leave the answer unknown.

| Slot | Learner outcome | Illustrated example and question model / interaction | Misconception and retry support |
|---|---|---|---|
| 1 | Choose the word for a meaning with the pair visible. | Word-pair model (`Word pair: ‘x’ and ‘y’ → ?`) and large choices. | Choosing by sound; the hint gives both meanings, not the answer. |
| 2 | Sort clue phrases under the pair word they describe. | Two bins named by the pair words; clues never contain either word. | Matching on one familiar word; the hint repeats both meanings. |
| 3 | Build the word that completes a sentence. | Letter tiles; no pair model (reduced support). | Building the partner word; the hint gives both meanings. |
| 4 | Complete or judge a sentence. | Sentence gap with the pair plus two unrelated words, and “which sentence is correct” with one right and two wrong. | Swapping the pair; the sentence stays visible on retry. |

| Status | Evidence / remaining work |
|---|---|
| Implemented | Four wrappers, an authored bank for every slot and four Bix lessons. |
| Technically validated | Focused lint, 50-seed bank checker, bank tests (words verified against the saved appendix data) and a completion playthrough of every slot, with retry/hint on each choice slot 1, pass. Full course validation remains pending. |
| Content reviewed | Implementer review of answers, misspellings and sentences only; teacher/owner review remains open. |
| Device reviewed | Browser/layout and physical touch checks remain open. |
| Owner/learner review | Observe whether learners use the model (rhyme word, chunks, meanings) rather than guessing. |
