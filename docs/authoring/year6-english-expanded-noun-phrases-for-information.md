# Expanded Noun Phrases for Information — Year 6 english

Status: implemented; browser/device review and final-course validation pending.
Permanent category/topic: `grammar---formal-language-and-sentence-choices` / `expanded-noun-phrases-for-information`.

## Curriculum boundary

Source: docs/curriculum/year-5-and-6-english.md. Read the original statutory bullet and notes there.
| Expanded Noun Phrases for Information | `expanded-noun-phrases-for-information` | using expanded noun phrases to convey complicated information concisely |

## Teaching plan

| Slot | Learning goal and Bix's explanation | Interaction | Evidence the learner can use | Misconception and hint |
|---|---|---|---|---|
| 1 | Pick the phrase that identifies an exact noun. | Choose | Main noun and two useful details. | Choosing a phrase with only one of the needed details. |
| 2 | Decide which details belong with a noun phrase. | Sort | Noun, useful descriptors and clearly unrelated cards. | Adding every interesting card; hint asks whether it identifies this noun. |
| 3 | Build an expanded noun phrase. | Word tiles | Main noun plus the exact identifying details. | Adding vague time words or omitting a required detail. |
| 4 | Select concise information writing. | Choose | Required noun/action and a concise versus repetitive alternative. | Equating more sentences with clearer information. |

Content exclusions: simple adjective-only noun phrases from earlier years and open composition assessment. The fictional examples are internally complete; each incorrect option either omits a needed detail, is irrelevant, or splits the same detail into a less concise sentence. All evidence is readable without audio.

## Visual teaching recipe

Use the existing built-year approach for the same subject and interaction.
References:
- src/components/challenge/visual/EnglishQuestionVisual.jsx
- src/components/challenge/lesson/LessonExample.jsx
- src/pages/skills/english/challenges/EnglishPracticeGame.jsx
- tests/components/questionVisuals.test.jsx
- tests/components/lessonFrame.test.jsx

The lesson begins with the same weather-station phrase used by practice, then separates useful and irrelevant detail and recombines it in a worked information sentence. Practice deliberately uses visible phrase cards rather than a decorative picture: the noun and its modifiers are the representation being taught.

## Verification record

- [x] Four slots teach concise, information-bearing expanded noun phrases.
- [x] Explanations teach the same noun-plus-detail representation used in practice.
- [x] Pure bank checks and real-control playthrough cover wrong answer, hint, retry and completion once.
- [ ] npm run lint; npm test; npm run build (due once for the whole course).
- [ ] Layout/drag/browser checks where needed: record topics, sizes, both themes and omissions.
- [ ] Physical-device speech/touch and owner/child feedback, where still outstanding.

Builder: src/data/challenges/authored/year6/english/expanded-noun-phrases-for-information.js export buildExpandedNounPhrasesForInformation.
Focused check: npm run check:topic -- --year 6 --subject english --topic expanded-noun-phrases-for-information --builder src/data/challenges/authored/year6/english/expanded-noun-phrases-for-information.js --export buildExpandedNounPhrasesForInformation

Read docs/AUTHORING.md for the full workflow. This scaffold does not register lessons,
certificate lines or award inclusion, and does not establish teaching quality.
