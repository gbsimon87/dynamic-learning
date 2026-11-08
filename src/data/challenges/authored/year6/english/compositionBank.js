import { bd, ch, st } from "../../../topicBank.js";

/**
 * A shared shape for the Year 6 composition quest. Each row supplies visible
 * evidence and one defensible response; the four slots then change the job
 * from spotting, to sorting, to building, to applying that response.
 */
export function compositionBank({ rule, hint, rows, prompts, bins }) {
  const evidence = row => ({ text: row.text, hint: row.hint ?? hint });
  const extra = row => row.more ?? ["perhaps"];
  return {
    rule,
    hint,
    levels: {
      1: rows.map(row => ch(prompts.one(row), row.answer, row.wrong, evidence(row))),
      2: rows.map(row => st(prompts.two(row), bins, [
        [row.answer, 0], ...row.wrong.map(wrong => [wrong, 1]),
      ], evidence(row))),
      3: rows.map(row => bd(prompts.three(row), row.answer, { ...evidence(row), more: extra(row) })),
      4: rows.map(row => ch(prompts.four(row), row.answer, row.wrong, evidence(row))),
    },
  };
}
