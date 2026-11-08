# Synonyms and Antonyms — Year 6 english

Status: implemented; browser/device review and final-course validation pending.
Permanent category/topic: `grammar---formal-language-and-sentence-choices` / `synonyms-and-antonyms`.

## Curriculum boundary

Source: docs/curriculum/year-5-and-6-english.md (Appendix 2, Year 6, Word).
| Synonyms and Antonyms | `synonyms-and-antonyms` | Appendix 2, Year 6, Word: How words are related by meaning as synonyms and antonyms |

Statutory example: *big, large, little*. Terminology for pupils: synonym, antonym.

## Teaching plan

| Slot | Learning goal and Bix's explanation | Interaction | Evidence the learner can use | Misconception and hint |
|---|---|---|---|---|
| 1 | Pick the synonym or antonym of a given word. | Choose | A visible headword with the term glossed, plus three options (the opposite relation and two unrelated words). | Mixing up "same" and "opposite"; hint asks which relation is wanted. |
| 2 | Sort several words by how they relate to one headword. | Sort | Six cards and two bins named with the headword. | Sorting by topic rather than meaning relation; hint says to say each word beside the headword. |
| 3 | Swap one word in a sentence for a synonym or antonym. | Word tiles | The original sentence in the prompt; the tiles include the opposite relation and an unrelated word. | Choosing the wrong relation; hint says which relation to leave out. |
| 4 | Odd one out in a group, and choose the sentence that keeps or reverses meaning. | Choose | Four words, or three complete candidate sentences. | Treating a synonym as an opposite in context; hint names the single change that matters. |

Content exclusions: shades of meaning between near-synonyms (for example *furious* versus *annoyed*), thesaurus use (Year 5 topic) and formal/informal register (separate Year 6 topic). Every wrong option is unrelated or the opposite relation, never a second valid answer. All wording is readable on screen; sound is not needed.

## Visual teaching recipe

Same approach as the built Year 6 English topics: Bix's illustrated lesson with a worked sentence, a sort table, a fix example and a steps card; practice uses `EnglishQuestionVisual` and the shared choice, sort and tile controls. The shared English visual has no picture for this topic, so the models are the visible headword, bins named with the headword, and the sentence itself. This is a deliberate text-only assessment; no picture is drawn because it would not teach the relation.

## Verification record

- [x] Four slots teach the mapped requirement; 16 headwords, a/an agreement checked by test.
- [x] Pure bank checks (50 seeds × 4 slots, deterministic) and real-control playthrough (wrong answer, hint, retry, completion once; sort, tiles and odd-one-out slots).
- [x] Focused lint.
- [ ] Content review of synonym/antonym choices (for example *trim*, *needy*, *bone-dry*) by the owner.
- [ ] Layout/touch/browser checks and physical-device review.
- [ ] npm run lint; npm test; npm run build (due once for the whole course).

Builder: src/data/challenges/authored/year6/english/synonyms-and-antonyms.js export buildSynonymsAndAntonyms.
Focused check: npm run check:topic -- --year 6 --subject english --topic synonyms-and-antonyms --builder src/data/challenges/authored/year6/english/synonyms-and-antonyms.js --export buildSynonymsAndAntonyms
