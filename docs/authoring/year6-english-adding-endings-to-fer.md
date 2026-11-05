# Topic brief: Year 6 English — Adding Endings to fer

- Registry identity: Year 6 / English / `spelling---advanced-patterns` / `adding-endings-to-fer`
- Context command: `npm run topic:context -- --year 6 --subject english --topic adding-endings-to-fer`
- Statutory source and exact mapping row: `docs/curriculum/year-5-and-6-english.md`, Year 6 Spelling – Advanced Patterns; Appendix 1, “Adding suffixes beginning with vowel letters to words ending in –fer”.
- In scope / excluded: Double the r when `-fer` stays stressed after a vowel-letter suffix; do not double it when the stress moves. The closely related `refer`, `prefer`, `transfer`, and `defer` forms make the rule visible. Other suffix and spelling rules are excluded.
- Recipe: Year 6 authored English topic bank, `DataChallenge`, `EnglishQuestionVisual`, Bix lesson registry, and the Year 6 English playthrough.
- Built-year visual reference: `EnglishPracticeGame.jsx` and `EnglishQuestionVisual.jsx`; every question shows the given root/suffix as a word-parts model and leaves the completed word unknown.

| Slot | Learner outcome | Illustrated example and question model / interaction | Misconception and retry support |
|---|---|---|---|
| 1 | Choose the correct completed word. | Visible root + suffix, word-parts diagram, then choice. | Doubling every r; the hint directs attention to stress. |
| 2 | Decide whether a completed form needs a doubled r. | Sort completed forms into “Double the r” or “Keep one r”. | Deciding by ending length; the hint asks for the word's strong beat. |
| 3 | Construct a completed spelling. | Visible root + suffix and letter-tile word building. | Omitting or adding a third r; the hint reconnects tiles to the stress rule. |
| 4 | Spell the form in a sentence. | Sentence blank, visible root/suffix model and large spelling keyboard. | Applying a familiar form without hearing stress; retry keeps the same meaningful context. |

Pilot: Slot 1 is covered by the focused retry/hint/completion playthrough before the full four-slot bank is checked.

Visual evidence: Root and suffix are visible input data; `EnglishQuestionVisual` renders word parts without reading the hidden answer. Text spelling is deliberate for the final application slot; the child must supply the letters.

Content review: The Appendix 1 examples (referring, referred, referral, preferring, preferred, transferring, transferred, reference, referee, preference and transference) are included. Distractors are incorrect spellings of the displayed root-plus-suffix form, not other words that could fit.

| Status | Evidence / remaining work |
|---|---|
| Implemented | Four wrappers, 15 templates per slot and four Bix lessons. |
| Technically validated | Focused lint, 50-seed bank checker, topic checker and retry/hint/completion playthrough pass. Full course validation remains pending. |
| Content reviewed | Appendix examples, endings, sentence answers and distractors independently checked by the implementer; teacher/owner review remains open. |
| Device reviewed | Browser/layout and physical touch/voice checks remain open. |
| Owner/learner review | Observe whether children can reliably hear the stress shift without spoken coaching. |
