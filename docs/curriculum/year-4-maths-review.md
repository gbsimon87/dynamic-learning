# Year 4 Maths review — 2026-10-11

Reviewed all 42 mapped topics, 168 challenge wrappers, the generators, answer validation, diagrams, styles, certificate statements, registry and integration tests against [the saved programme of study](year-4-maths.md). Existing category/topic identifiers and persistence rules are unchanged.

## Corrections

- Mathematical tile answers accept equivalent sums, products, inverse checks and perimeter traversals. Expanded numbers now include addition symbols. Whole-calculation builds explicitly ask learners to use all tiles; partial, duplicated, unknown and malformed responses still retry. Numeric tile answers accept leading zeroes. The arithmetic parser handles brackets and fractions without executing answer text.
- Unit-conversion stories now use runs, ribbons, bags, bottles and sessions with meaningful units. Two-step calculation tiles include the quantities in their story.
- Comparisons practise less than, greater than and equality. Derived division, chart differences, fraction families and duration ordering vary between replays. Measures and money include estimation after rounding each cost.
- Later clock levels cover all 60 minutes and all 12 hours, including midnight. Functional clock updates preserve rapid taps and wrap correctly.
- Decimal division includes ones, tenths and hundredths digit-value questions with a place-value table. Angle ordering reaches two right angles; division inputs stay within one or two digits, including ordering questions.
- Selecting a polygon vertex draws and closes its sides. Coordinate axes are distinct. Negative number lines retain equal spacing and readable labels, with scrolling on narrow screens.
- Long shape properties use wrapping captions. Shape questions identify triangles or quadrilaterals, and the input label says Shape name. Rectangles, triangles and quadrilateral drawings are checked independently for side lengths, right angles and reflection symmetry.
- Formal column digits and place headings share a four-column grid. Reflection boards scroll on narrow screens to preserve 44px targets.

## Topic inventory

Each row has four implemented challenge files and five questions per challenge. These are the interaction kinds observed across seeded builds at each level.

| Topic | Challenge 1 | Challenge 2 | Challenge 3 | Challenge 4 |
|---|---|---|---|---|
| Counting in Multiples of 6, 7, 9, 25 and 1000 | sequence | sequence | order | number |
| Finding 1000 More or Less | choice | number | order | number |
| Counting Backwards Through Zero | choice | choice | order | choice |
| Place Value in 4-Digit Numbers | choice | number | build | number |
| Ordering and Comparing Numbers Beyond 1000 | choice | choice | order | number |
| Representing and Estimating Numbers | choice | number | order | number |
| Rounding to 10, 100 and 1000 | choice | number | sort | number |
| Place Value Problems | choice | number | build | number |
| Roman Numerals to 100 | choice | number | order | number |
| Column Addition and Subtraction | number | number | build | number |
| Estimating and Checking Calculations | number | number | build | number |
| Two-Step Addition and Subtraction Problems | choice | number | build | number |
| Multiplication and Division Facts to 12 | choice | number | sort | number |
| Mental Multiplication and Division | number | number | build | number |
| Factor Pairs and Commutativity | choice | number | sort | number |
| Written Multiplication | number | number | build | number |
| Scaling and Correspondence Problems | number | number | build | number |
| Equivalent Fraction Families | choice | choice | fraction | number |
| Counting in Hundredths | sequence | sequence | order | number |
| Fractions of Quantities | number | number | build | number |
| Adding and Subtracting Fractions | choice | choice | build | number |
| Tenths and Hundredths as Decimals | choice | choice | order | number |
| Decimal Equivalents of Quarters and Halves | choice | choice | sort | number |
| Dividing by 10 and 100 | choice | choice | order | number |
| Rounding Decimals | number | number | sort | number |
| Comparing and Ordering Decimals | choice | choice | order | number |
| Fraction and Decimal Problems | number | number | build | number |
| Converting Units of Measure | number | number | sort | number |
| Perimeter of Rectilinear Shapes | number | number | build | number |
| Area by Counting Squares | number | number | sort | number |
| Measures and Money | number | number | order | number |
| Analogue and Digital Time | choice | choice | clock | number |
| Time Conversion Problems | number | number | order | number |
| Classifying Triangles and Quadrilaterals | choice | choice | sort | type |
| Acute and Obtuse Angles | choice | choice | order | sort |
| Lines of Symmetry | number | number | sort | number |
| Completing Symmetric Figures | reflection | reflection | reflection | reflection |
| Coordinates in the First Quadrant | choice | choice | plot | plot |
| Translations on a Grid | choice | choice | plot | plot |
| Plotting Points and Completing Polygons | choice | choice | plot | plot |
| Bar Charts and Time Graphs | chart | number | chartBuild | number |
| Comparing and Calculating with Data | chart | chart | order | chart |

## Verification

- Unit checks validate all banks over 100 seeds and both random-source boundaries, independently recompute stories and diagram answers, test equivalent and incorrect mathematical tile arrangements, and lock all persistent identifiers.
- The Vite loader resolves and React renders all 168 wrappers. Controller playthroughs complete all 168 five-question challenges and confirm exactly one completion callback with combo data. Diagram-based drivers read reflection cells and chart tables from the rendered UI.
- Geometry checks derive side lengths and symmetry counts from the rendered SVG vertices. Interaction regressions cover wrong-answer retry, round resets, rapid clock/bar taps, four-digit keypad answers and completed polygon sides.
- Browser controls are unavailable in this session. Component renders do not verify pixel layout; controller playthroughs use an explicit reorder adapter because jsdom has no drag-collision layout. Physical dragging, visual checks of both themes and real-browser persistence remain pending.

`npm run lint`, `npm test` and `npm run build` pass. The isolated staged-commit suite reports **1,563 unit passes, four existing skips and 113 component passes**. Controller playthroughs cover **840 questions across all 168 challenges**. Detailed app context is recorded in [PROJECT_KNOWLEDGE.md](../PROJECT_KNOWLEDGE.md).
