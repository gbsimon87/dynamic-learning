# Topic brief: Year 6 English — Hyphens in Words

- Registry identity: Year 6 / English / `spelling---advanced-patterns` / `hyphens-in-words`
- Context command: `npm run topic:context -- --year 6 --subject english --topic hyphens-in-words`
- Statutory source and exact mapping row: `docs/curriculum/year-5-and-6-english.md`, Year 6 Spelling – Advanced Patterns; Appendix 1, “Use of the hyphen” (`co-ordinate`, `re-enter`).
- In scope / excluded: Learn familiar conventional hyphenated prefix forms by locating the join between a prefix and base word. The later `hyphens-to-avoid-ambiguity` topic covers the separate Appendix 2 punctuation purpose; this topic does not claim every prefixed word uses a hyphen.
- Recipe: Year 6 authored English topic bank, `DataChallenge`, `EnglishQuestionVisual`, Bix lesson registry, and the Year 6 English playthrough.
- Built-year visual reference: `EnglishPracticeGame.jsx` and `EnglishQuestionVisual.jsx`; word-part models show the supplied prefix and base word while leaving the completed spelling unknown.

| Slot | Learner outcome | Illustrated example and question model / interaction | Misconception and retry support |
|---|---|---|---|
| 1 | Choose a familiar hyphenated spelling from visible word parts. | Prefix-plus-base word model, then large spelling choices. | Treating the hyphen as a loose dash; the hint points to the single join between the two parts. |
| 2 | Identify the prefix in familiar hyphenated forms. | Sort complete spellings by `co-`, `re-`, or another prefix. | Looking only at the base word; the hint asks the learner to read the letters before the hyphen. |
| 3 | Construct a hyphenated spelling. | Visible word-part model and large letter tiles including the hyphen. | Adding more than one joining line or placing it inside the base word; the hint names the two word parts. |
| 4 | Select the right spelling in a meaningful sentence. | Sentence blank with a matching prefix/base model and choice controls. | Choosing a different taught word rather than reading the supplied word parts; retry keeps the same context visible. |

Pilot: Slot 1 is covered by the focused retry/hint/completion playthrough before the four-slot bank check.

Visual evidence: The prefix and base are visible input data; `EnglishQuestionVisual` shows those given parts and leaves the completed spelling unknown. Letter tiles deliberately include the hyphen because a native spelling input cannot safely supply that punctuation.

Content review: Appendix examples `co-ordinate` and `re-enter` appear in the bank. All variants use a conventional taught hyphenated form; no alternate acceptable spelling is offered as a wrong answer. Sentence contexts and options were independently checked against their visible prefix/base pair.

| Status | Evidence / remaining work |
|---|---|
| Implemented | Four wrappers, 15 templates per slot and four Bix lessons. |
| Technically validated | Focused lint, 50-seed bank checker, topic-loader checker and retry/hint/completion playthrough pass. Full course validation remains pending. |
| Content reviewed | Appendix boundary, variants, distractors and lesson alignment reviewed by the implementer; teacher/owner review remains open. |
| Device reviewed | Browser/layout and physical touch/voice checks remain open. |
| Owner/learner review | Observe whether learners distinguish a hyphen from a dash and can locate the prefix/base join independently. |
